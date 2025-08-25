-- =====================================================
-- SUPABASE FORMS SETUP FOR HIGHER GROUND SPEECH THERAPY
-- =====================================================
-- This file sets up the database tables for contact forms and feedback
-- with proper Row Level Security (RLS) policies

-- =====================================================
-- 1. CREATE TABLES
-- =====================================================

-- Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    child_age VARCHAR(50),
    message TEXT NOT NULL,
    preferred_contact_method VARCHAR(50) DEFAULT 'email',
    concerns TEXT,
    insurance VARCHAR(100),
    location VARCHAR(255),
    referral_source VARCHAR(255),
    page_submitted_from VARCHAR(255),
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_agent TEXT,
    ip_address INET,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'cancelled')),
    
    -- Add constraints
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_phone CHECK (phone IS NULL OR phone ~* '^[\+]?[1-9][\d]{0,15}$'),
    CONSTRAINT valid_status CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'cancelled')),
    CONSTRAINT valid_contact_method CHECK (preferred_contact_method IN ('email', 'phone', 'text', 'mail'))
);

-- Feedback Table
CREATE TABLE IF NOT EXISTS feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    emoji VARCHAR(10) NOT NULL CHECK (emoji IN ('😢', '😐', '😊')),
    feedback TEXT,
    page VARCHAR(255) NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_agent TEXT,
    ip_address INET,
    
    -- Add constraints
    CONSTRAINT valid_emoji CHECK (emoji IN ('😢', '😐', '😊'))
);

-- =====================================================
-- 2. CREATE INDEXES FOR PERFORMANCE
-- =====================================================

-- Contact submissions indexes
CREATE INDEX IF NOT EXISTS idx_contact_submissions_timestamp ON contact_submissions(timestamp);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_page ON contact_submissions(page_submitted_from);

-- Feedback indexes
CREATE INDEX IF NOT EXISTS idx_feedback_timestamp ON feedback(timestamp);
CREATE INDEX IF NOT EXISTS idx_feedback_page ON feedback(page);
CREATE INDEX IF NOT EXISTS idx_feedback_emoji ON feedback(emoji);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at);

-- =====================================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 4. CREATE RLS POLICIES
-- =====================================================

-- Contact Submissions Policies
-- Allow anyone to insert (submit forms)
CREATE POLICY "Allow public insert on contact_submissions" ON contact_submissions
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view all submissions
CREATE POLICY "Allow authenticated users to view contact_submissions" ON contact_submissions
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update status
CREATE POLICY "Allow authenticated users to update contact_submissions" ON contact_submissions
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Feedback Policies
-- Allow anyone to insert (submit feedback)
CREATE POLICY "Allow public insert on feedback" ON feedback
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view all feedback
CREATE POLICY "Allow authenticated users to view feedback" ON feedback
    FOR SELECT USING (auth.role() = 'authenticated');

-- =====================================================
-- 5. GRANT PERMISSIONS
-- =====================================================

-- Grant permissions to anonymous users (for form submissions)
GRANT INSERT ON contact_submissions TO anon;
GRANT INSERT ON feedback TO anon;

-- Grant permissions to authenticated users
GRANT SELECT, UPDATE ON contact_submissions TO authenticated;
GRANT SELECT ON feedback TO authenticated;

-- Grant usage on sequences (if using serial IDs)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- =====================================================
-- 6. HELPER FUNCTIONS (OPTIONAL)
-- =====================================================

-- Function to get feedback summary
CREATE OR REPLACE FUNCTION get_feedback_summary(
    days_back INTEGER DEFAULT 30
)
RETURNS TABLE (
    emoji VARCHAR(10),
    count BIGINT,
    percentage NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        f.emoji,
        COUNT(*) as count,
        ROUND(
            (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM feedback WHERE created_at >= NOW() - INTERVAL '1 day' * days_back)), 
            2
        ) as percentage
    FROM feedback f
    WHERE f.created_at >= NOW() - INTERVAL '1 day' * days_back
    GROUP BY f.emoji
    ORDER BY f.emoji;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get contact submissions summary
CREATE OR REPLACE FUNCTION get_contact_summary(
    days_back INTEGER DEFAULT 30
)
RETURNS TABLE (
    status VARCHAR(50),
    count BIGINT,
    percentage NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cs.status,
        COUNT(*) as count,
        ROUND(
            (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM contact_submissions WHERE created_at >= NOW() - INTERVAL '1 day' * days_back)), 
            2
        ) as percentage
    FROM contact_submissions cs
    WHERE cs.created_at >= NOW() - INTERVAL '1 day' * days_back
    GROUP BY cs.status
    ORDER BY cs.status;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 7. SAMPLE DATA (OPTIONAL - FOR TESTING)
-- =====================================================

-- Uncomment these lines if you want to insert sample data for testing

/*
-- Sample contact submission
INSERT INTO contact_submissions (name, email, message, page_submitted_from) 
VALUES ('Test User', 'test@example.com', 'This is a test message', '/');

-- Sample feedback
INSERT INTO feedback (emoji, feedback, page) 
VALUES ('😊', 'Great site!', '/');
*/

-- =====================================================
-- 8. VERIFICATION QUERIES
-- =====================================================

-- Verify tables were created
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('contact_submissions', 'feedback');

-- Verify RLS is enabled
-- SELECT schemaname, tablename, rowsecurity FROM pg_tables WHERE tablename IN ('contact_submissions', 'feedback');

-- Verify policies exist
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual FROM pg_policies WHERE tablename IN ('contact_submissions', 'feedback');

-- =====================================================
-- NOTES
-- =====================================================
/*
1. RLS is enabled on both tables for security
2. Anonymous users can only INSERT (submit forms)
3. Authenticated users can SELECT and UPDATE contact submissions
4. All form data is properly validated with constraints
5. Indexes are created for optimal performance
6. Helper functions provide easy access to summary data
7. IP addresses and user agents are captured for analytics
8. Status tracking for contact submissions workflow

To use this in your Next.js app:
1. Run this SQL in your Supabase SQL editor
2. Update your environment variables with Supabase credentials
3. The tables will automatically work with your existing form handlers
*/
