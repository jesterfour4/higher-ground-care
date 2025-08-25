-- =====================================================
-- QUICK SETUP - SUPABASE FORMS
-- =====================================================
-- Simplified version for quick implementation

-- 1. Create Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    child_age VARCHAR(50),
    message TEXT NOT NULL,
    page_submitted_from VARCHAR(255),
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'new'
);

-- 2. Create Feedback Table
CREATE TABLE IF NOT EXISTS feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    emoji VARCHAR(10) NOT NULL CHECK (emoji IN ('😢', '😐', '😊')),
    feedback TEXT,
    page VARCHAR(255) NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies
-- Contact submissions: anyone can insert, authenticated users can view/update
CREATE POLICY "Allow public insert on contact_submissions" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users to view contact_submissions" ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update contact_submissions" ON contact_submissions FOR UPDATE USING (auth.role() = 'authenticated');

-- Feedback: anyone can insert, authenticated users can view
CREATE POLICY "Allow public insert on feedback" ON feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users to view feedback" ON feedback FOR SELECT USING (auth.role() = 'authenticated');

-- 5. Grant Permissions
GRANT INSERT ON contact_submissions TO anon;
GRANT INSERT ON feedback TO anon;
GRANT SELECT, UPDATE ON contact_submissions TO authenticated;
GRANT SELECT ON feedback TO authenticated;

-- Done! Your forms are now ready to use.
