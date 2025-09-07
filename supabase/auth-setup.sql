-- ========================================
-- AUTHENTICATION & PROFILES SETUP
-- ========================================

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ========================================
-- CONTACT FORM TABLE (UPDATED)
-- ========================================

-- Clean up existing contact_submissions table and policies
DROP POLICY IF EXISTS "Allow public insert on contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated users to view contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated users to update contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow insert for all" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can insert" ON contact_submissions;
DROP POLICY IF EXISTS "Allow public insert" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated read" ON contact_submissions;

-- Create clean contact form policies
CREATE POLICY "Allow public contact insert" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view contacts" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update contacts" ON contact_submissions
  FOR UPDATE USING (auth.role() = 'authenticated');

-- ========================================
-- FEEDBACK TABLE POLICIES
-- ========================================

-- Clean up existing feedback policies
DROP POLICY IF EXISTS "Allow public feedback insertion" ON feedback;
DROP POLICY IF EXISTS "Allow authenticated users to view feedback" ON feedback;
DROP POLICY IF EXISTS "Allow authenticated users to update feedback" ON feedback;

-- Create clean feedback policies
CREATE POLICY "Allow public feedback insert" ON feedback
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view feedback" ON feedback
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update feedback" ON feedback
  FOR UPDATE USING (auth.role() = 'authenticated');

-- ========================================
-- PROFILE MANAGEMENT FUNCTIONS
-- ========================================

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END; $$;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- PERMISSIONS
-- ========================================

-- Grant necessary permissions
GRANT INSERT ON contact_submissions TO anon;
GRANT SELECT ON contact_submissions TO authenticated;
GRANT UPDATE ON contact_submissions TO authenticated;
GRANT INSERT ON feedback TO anon;
GRANT SELECT ON feedback TO authenticated;
GRANT UPDATE ON feedback TO authenticated;
GRANT SELECT ON profiles TO authenticated;
GRANT INSERT ON profiles TO authenticated;
GRANT UPDATE ON profiles TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;

-- ========================================
-- HELPER FUNCTIONS
-- ========================================

-- Function to get user profile
CREATE OR REPLACE FUNCTION public.get_user_profile(user_id UUID DEFAULT auth.uid())
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT p.id, p.full_name, p.avatar_url, p.created_at
  FROM public.profiles p
  WHERE p.id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- COMMENTS
-- ========================================

COMMENT ON TABLE public.profiles IS 'User profiles linked to auth.users';
COMMENT ON FUNCTION public.handle_new_user() IS 'Creates a profile when a new user signs up';
COMMENT ON FUNCTION public.get_user_profile(UUID) IS 'Gets user profile by ID (defaults to current user)';
