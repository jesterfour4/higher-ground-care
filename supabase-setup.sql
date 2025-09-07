-- Create the contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  child_age TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow insert for all users" ON contact_submissions;
DROP POLICY IF EXISTS "Allow read for authenticated users" ON contact_submissions;

-- Create a policy that allows ANYONE to insert new submissions (for the public contact form)
CREATE POLICY "Allow public insert" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows authenticated users to read submissions (for admin purposes)
CREATE POLICY "Allow authenticated read" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT INSERT ON contact_submissions TO anon;
GRANT SELECT ON contact_submissions TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;

-- Optional: Create a view for easier querying
CREATE OR REPLACE VIEW contact_submissions_view AS
SELECT 
  id,
  name,
  email,
  phone,
  child_age,
  message,
  created_at
FROM contact_submissions
ORDER BY created_at DESC;
