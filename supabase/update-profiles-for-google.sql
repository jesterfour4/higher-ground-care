-- ========================================
-- UPDATE PROFILES TABLE FOR GOOGLE OAUTH
-- ========================================

-- Add additional fields to profiles table for Google OAuth data
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS provider TEXT DEFAULT 'email',
ADD COLUMN IF NOT EXISTS provider_id TEXT,
ADD COLUMN IF NOT EXISTS email TEXT;

-- Update the handle_new_user function to handle Google OAuth data
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    full_name, 
    first_name,
    last_name,
    email,
    phone,
    avatar_url,
    provider,
    provider_id
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.raw_user_meta_data->>'given_name',
    NEW.raw_user_meta_data->>'family_name',
    NEW.email,
    NEW.raw_user_meta_data->>'phone_number',
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.raw_user_meta_data->>'provider', 'email'),
    NEW.raw_user_meta_data->>'provider_id'
  );
  RETURN NEW;
END; $$;

-- Update the get_user_profile function to include new fields
CREATE OR REPLACE FUNCTION public.get_user_profile(user_id UUID DEFAULT auth.uid())
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  provider TEXT,
  provider_id TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id, 
    p.full_name, 
    p.first_name,
    p.last_name,
    p.email,
    p.phone,
    p.avatar_url,
    p.provider,
    p.provider_id,
    p.created_at,
    p.updated_at
  FROM public.profiles p
  WHERE p.id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add function to update user profile
CREATE OR REPLACE FUNCTION public.update_user_profile(
  user_id UUID DEFAULT auth.uid(),
  profile_data JSONB
)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE public.profiles 
  SET 
    full_name = COALESCE(profile_data->>'full_name', full_name),
    first_name = COALESCE(profile_data->>'first_name', first_name),
    last_name = COALESCE(profile_data->>'last_name', last_name),
    email = COALESCE(profile_data->>'email', email),
    phone = COALESCE(profile_data->>'phone', phone),
    avatar_url = COALESCE(profile_data->>'avatar_url', avatar_url),
    updated_at = NOW()
  WHERE id = user_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions for the new function
GRANT EXECUTE ON FUNCTION public.update_user_profile(UUID, JSONB) TO authenticated;

-- Add comments
COMMENT ON COLUMN public.profiles.first_name IS 'User first name from OAuth provider';
COMMENT ON COLUMN public.profiles.last_name IS 'User last name from OAuth provider';
COMMENT ON COLUMN public.profiles.phone IS 'User phone number from OAuth provider';
COMMENT ON COLUMN public.profiles.provider IS 'OAuth provider (google, email, etc.)';
COMMENT ON COLUMN public.profiles.provider_id IS 'Provider-specific user ID';
COMMENT ON FUNCTION public.update_user_profile(UUID, JSONB) IS 'Updates user profile with provided data';
