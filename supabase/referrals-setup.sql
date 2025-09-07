-- ========================================
-- REFERRALS TABLE SETUP
-- ========================================

-- Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Referring Provider Information
  referring_provider TEXT NOT NULL,
  provider_email TEXT NOT NULL,
  provider_phone TEXT,
  clinic_name TEXT NOT NULL,
  clinic_address TEXT,
  
  -- Client Information
  client_name TEXT NOT NULL,
  client_age TEXT,
  client_email TEXT,
  client_phone TEXT,
  
  -- Clinical Information
  primary_concerns TEXT NOT NULL,
  current_services TEXT,
  insurance_info TEXT,
  urgency_level TEXT CHECK (urgency_level IN ('routine', 'moderate', 'urgent')),
  additional_notes TEXT,
  
  -- Contact Preferences
  preferred_contact_method TEXT CHECK (preferred_contact_method IN ('email', 'phone', 'either')),
  
  -- System Fields
  referral_date TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'declined')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Admin Fields
  assigned_to UUID REFERENCES auth.users(id),
  admin_notes TEXT,
  follow_up_date TIMESTAMPTZ
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);
CREATE INDEX IF NOT EXISTS idx_referrals_referral_date ON referrals(referral_date);
CREATE INDEX IF NOT EXISTS idx_referrals_urgency ON referrals(urgency_level);
CREATE INDEX IF NOT EXISTS idx_referrals_provider_email ON referrals(provider_email);
CREATE INDEX IF NOT EXISTS idx_referrals_created_at ON referrals(created_at);
CREATE INDEX IF NOT EXISTS idx_referrals_assigned_to ON referrals(assigned_to);

-- Enable Row Level Security (RLS)
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Create policies for referrals
CREATE POLICY "Allow public referral insert" ON referrals
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view referrals" ON referrals
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update referrals" ON referrals
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT INSERT ON referrals TO anon;
GRANT SELECT ON referrals TO authenticated;
GRANT UPDATE ON referrals TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;

-- ========================================
-- HELPER FUNCTIONS
-- ========================================

-- Function to get referrals by status
CREATE OR REPLACE FUNCTION get_referrals_by_status(status_filter TEXT DEFAULT NULL)
RETURNS TABLE (
  id UUID,
  referring_provider TEXT,
  clinic_name TEXT,
  client_name TEXT,
  urgency_level TEXT,
  referral_date TIMESTAMPTZ,
  status TEXT,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    r.id,
    r.referring_provider,
    r.clinic_name,
    r.client_name,
    r.urgency_level,
    r.referral_date,
    r.status,
    r.created_at
  FROM referrals r
  WHERE (status_filter IS NULL OR r.status = status_filter)
  ORDER BY 
    CASE r.urgency_level
      WHEN 'urgent' THEN 1
      WHEN 'moderate' THEN 2
      WHEN 'routine' THEN 3
      ELSE 4
    END,
    r.referral_date DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update referral status
CREATE OR REPLACE FUNCTION update_referral_status(
  referral_id UUID,
  new_status TEXT,
  admin_notes TEXT DEFAULT NULL,
  assigned_to_user UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE referrals 
  SET 
    status = new_status,
    admin_notes = COALESCE(admin_notes, admin_notes),
    assigned_to = COALESCE(assigned_to_user, assigned_to),
    updated_at = NOW()
  WHERE id = referral_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- TRIGGERS
-- ========================================

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_referrals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update the updated_at column
CREATE TRIGGER update_referrals_updated_at
  BEFORE UPDATE ON referrals
  FOR EACH ROW
  EXECUTE FUNCTION update_referrals_updated_at();

-- ========================================
-- VIEWS
-- ========================================

-- View for referral summary
CREATE OR REPLACE VIEW referral_summary AS
SELECT 
  r.id,
  r.referring_provider,
  r.clinic_name,
  r.client_name,
  r.urgency_level,
  r.status,
  r.referral_date,
  r.created_at,
  CASE 
    WHEN r.urgency_level = 'urgent' THEN 'High Priority'
    WHEN r.urgency_level = 'moderate' THEN 'Medium Priority'
    WHEN r.urgency_level = 'routine' THEN 'Standard Priority'
    ELSE 'Unknown Priority'
  END as priority_label,
  EXTRACT(DAYS FROM NOW() - r.referral_date) as days_since_referral
FROM referrals r
ORDER BY 
  CASE r.urgency_level
    WHEN 'urgent' THEN 1
    WHEN 'moderate' THEN 2
    WHEN 'routine' THEN 3
    ELSE 4
  END,
  r.referral_date DESC;

-- ========================================
-- COMMENTS
-- ========================================

COMMENT ON TABLE referrals IS 'Healthcare provider referrals for speech therapy services';
COMMENT ON COLUMN referrals.urgency_level IS 'Priority level: routine (2-4 weeks), moderate (1-2 weeks), urgent (immediate)';
COMMENT ON COLUMN referrals.status IS 'Current status: new, contacted, scheduled, completed, declined';
COMMENT ON FUNCTION get_referrals_by_status(TEXT) IS 'Get referrals filtered by status with priority ordering';
COMMENT ON FUNCTION update_referral_status(UUID, TEXT, TEXT, UUID) IS 'Update referral status with admin notes and assignment';
