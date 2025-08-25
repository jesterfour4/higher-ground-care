-- Create feedback and contact form tables for Higher Ground Care
-- This migration sets up both tables with proper security and indexing

-- ========================================
-- FEEDBACK TABLE
-- ========================================

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  emoji TEXT NOT NULL CHECK (emoji IN ('😢', '😐', '😊')),
  feedback TEXT,
  page TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_feedback_timestamp ON feedback(timestamp);
CREATE INDEX IF NOT EXISTS idx_feedback_page ON feedback(page);
CREATE INDEX IF NOT EXISTS idx_feedback_emoji ON feedback(emoji);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at);

-- ========================================
-- CONTACT FORM TABLE
-- ========================================

-- Create contact form table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  preferred_contact_method TEXT CHECK (preferred_contact_method IN ('email', 'phone', 'either')),
  child_age TEXT,
  concerns TEXT,
  insurance TEXT,
  location TEXT,
  referral_source TEXT,
  page_submitted_from TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'no_response'))
);

-- Create indexes for contact form
CREATE INDEX IF NOT EXISTS idx_contact_timestamp ON contact_submissions(timestamp);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_page ON contact_submissions(page_submitted_from);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_submissions(created_at);

-- ========================================
-- SECURITY SETUP
-- ========================================

-- Enable Row Level Security (RLS) on both tables
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- ========================================
-- FEEDBACK TABLE POLICIES
-- ========================================

-- Allow anyone to insert feedback (public access)
CREATE POLICY "Allow public feedback insertion" ON feedback
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view feedback (for admin purposes)
CREATE POLICY "Allow authenticated users to view feedback" ON feedback
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update feedback status if needed
CREATE POLICY "Allow authenticated users to update feedback" ON feedback
  FOR UPDATE USING (auth.role() = 'authenticated');

-- ========================================
-- CONTACT FORM TABLE POLICIES
-- ========================================

-- Allow anyone to insert contact submissions (public access)
CREATE POLICY "Allow public contact insertion" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view contact submissions (for admin purposes)
CREATE POLICY "Allow authenticated users to view contact submissions" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update contact status
CREATE POLICY "Allow authenticated users to update contact submissions" ON contact_submissions
  FOR UPDATE USING (auth.role() = 'authenticated');

-- ========================================
-- PERMISSIONS
-- ========================================

-- Grant necessary permissions for feedback table
GRANT INSERT ON feedback TO anon;
GRANT SELECT ON feedback TO authenticated;
GRANT UPDATE ON feedback TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;

-- Grant necessary permissions for contact table
GRANT INSERT ON contact_submissions TO anon;
GRANT SELECT ON contact_submissions TO authenticated;
GRANT UPDATE ON contact_submissions TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;

-- ========================================
-- HELPER FUNCTIONS (Optional)
-- ========================================

-- Function to get feedback summary by emoji
CREATE OR REPLACE FUNCTION get_feedback_summary()
RETURNS TABLE (
  emoji TEXT,
  count BIGINT,
  percentage NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    f.emoji,
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM feedback), 2) as percentage
  FROM feedback f
  GROUP BY f.emoji
  ORDER BY count DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get contact submissions by status
CREATE OR REPLACE FUNCTION get_contact_summary()
RETURNS TABLE (
  status TEXT,
  count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.status,
    COUNT(*) as count
  FROM contact_submissions c
  GROUP BY c.status
  ORDER BY count DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- COMMENTS
-- ========================================

-- Add helpful comments to tables
COMMENT ON TABLE feedback IS 'User feedback submissions with emoji ratings';
COMMENT ON TABLE contact_submissions IS 'Contact form submissions from potential clients';
COMMENT ON COLUMN feedback.emoji IS 'User selected emoji: 😢 (sad), 😐 (neutral), 😊 (happy)';
COMMENT ON COLUMN contact_submissions.status IS 'Current status of the contact submission';
COMMENT ON COLUMN contact_submissions.preferred_contact_method IS 'User preferred method of contact';

-- ========================================
-- SAMPLE DATA (Optional - for testing)
-- ========================================

-- Uncomment the following lines if you want to insert sample data for testing

/*
-- Sample feedback data
INSERT INTO feedback (emoji, feedback, page, user_agent) VALUES
('😊', 'Great website! Very informative.', '/', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'),
('😐', 'Could use more information about pricing.', '/services', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'),
('😢', 'Site was slow to load on mobile.', '/about', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1)');

-- Sample contact data
INSERT INTO contact_submissions (name, email, phone, message, preferred_contact_method, child_age, concerns, page_submitted_from) VALUES
('Sarah Johnson', 'sarah@example.com', '555-0123', 'Interested in speech therapy for my 4-year-old', 'email', '4 years', 'Speech delay', '/'),
('Mike Chen', 'mike@example.com', '555-0456', 'Looking for bilingual therapy options', 'phone', '6 years', 'Language development', '/services'),
('Lisa Rodriguez', 'lisa@example.com', NULL, 'Questions about insurance coverage', 'either', '3 years', 'Early intervention', '/about');
*/
