-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  emoji TEXT NOT NULL,
  feedback TEXT,
  page TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on timestamp for better query performance
CREATE INDEX IF NOT EXISTS idx_feedback_timestamp ON feedback(timestamp);

-- Create index on page for filtering by page
CREATE INDEX IF NOT EXISTS idx_feedback_page ON feedback(page);

-- Enable Row Level Security (RLS)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert feedback
CREATE POLICY "Allow public feedback insertion" ON feedback
  FOR INSERT WITH CHECK (true);

-- Create policy to allow authenticated users to view feedback (optional, for admin purposes)
CREATE POLICY "Allow authenticated users to view feedback" ON feedback
  FOR SELECT USING (auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT INSERT ON feedback TO anon;
GRANT SELECT ON feedback TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;
