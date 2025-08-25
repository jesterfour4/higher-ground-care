-- Simple setup for Higher Ground Care feedback and contact tables
-- Run this in your Supabase SQL editor

-- ========================================
-- FEEDBACK TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  emoji TEXT NOT NULL,
  feedback TEXT,
  page TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_feedback_timestamp ON feedback(timestamp);
CREATE INDEX IF NOT EXISTS idx_feedback_page ON feedback(page);

-- ========================================
-- CONTACT FORM TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  preferred_contact_method TEXT,
  child_age TEXT,
  concerns TEXT,
  insurance TEXT,
  location TEXT,
  referral_source TEXT,
  page_submitted_from TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT DEFAULT 'new'
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_contact_timestamp ON contact_submissions(timestamp);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email);

-- ========================================
-- SECURITY SETUP
-- ========================================

-- Enable RLS
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Feedback policies
CREATE POLICY "Allow public feedback insertion" ON feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users to view feedback" ON feedback FOR SELECT USING (auth.role() = 'authenticated');

-- Contact policies
CREATE POLICY "Allow public contact insertion" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users to view contact submissions" ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');

-- ========================================
-- PERMISSIONS
-- ========================================

GRANT INSERT ON feedback TO anon;
GRANT SELECT ON feedback TO authenticated;
GRANT INSERT ON contact_submissions TO anon;
GRANT SELECT ON contact_submissions TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;
