-- =====================================================
-- FIX CONTACT SUBMISSIONS TABLE
-- =====================================================
-- This script fixes the contact_submissions table structure and RLS policies

-- 1. Drop existing table if it exists (WARNING: This will delete existing data)
DROP TABLE IF EXISTS contact_submissions CASCADE;

-- 2. Create Contact Submissions Table with exact structure
CREATE TABLE contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    child_age VARCHAR(50),
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- 4. Drop any existing policies
DROP POLICY IF EXISTS "Allow public insert on contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated users to view contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated users to update contact_submissions" ON contact_submissions;

-- 5. Create RLS Policies
-- Allow ANYONE to insert (this is what we need for public forms)
CREATE POLICY "Allow public insert on contact_submissions" 
ON contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Allow authenticated users to view
CREATE POLICY "Allow authenticated users to view contact_submissions" 
ON contact_submissions 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated users to update contact_submissions" 
ON contact_submissions 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- 6. Grant Permissions
GRANT INSERT ON contact_submissions TO anon;
GRANT SELECT, UPDATE ON contact_submissions TO authenticated;

-- Done! Your contact form should now work.
