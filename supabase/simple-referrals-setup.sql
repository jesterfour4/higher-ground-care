-- Simple referrals table setup
-- Run this in your Supabase SQL editor if the referrals table doesn't exist

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
  urgency_level TEXT,
  additional_notes TEXT,
  
  -- Contact Preferences
  preferred_contact_method TEXT,
  
  -- System Fields
  referral_date TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

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
