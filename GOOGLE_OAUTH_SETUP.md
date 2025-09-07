# Google OAuth Setup Guide

This guide will help you set up Google Sign-In for your Higher Ground Care portal.

## 1. Google Cloud Console Setup

### Step 1: Create a Google Cloud Project
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "Higher Ground Care Portal"
4. Click "Create"

### Step 2: Enable Google+ API
1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API" and enable it
3. Also enable "Google Identity" API

### Step 3: Create OAuth 2.0 Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. If prompted, configure the OAuth consent screen first:
   - Choose "External" user type
   - Fill in required fields:
     - App name: "Higher Ground Care Portal"
     - User support email: your email
     - Developer contact: your email
   - Add scopes: `email`, `profile`, `openid`
   - Add test users (your email for testing)

### Step 4: Configure OAuth Client
1. Application type: "Web application"
2. Name: "Higher Ground Care Portal Web Client"
3. Authorized redirect URIs:
   - For development: `http://localhost:3000/api/auth/callback`
   - For production: `https://yourdomain.com/api/auth/callback`
4. Click "Create"
5. Copy the Client ID and Client Secret

## 2. Supabase Configuration

### Step 1: Configure Google Provider in Supabase
1. Go to your Supabase project dashboard
2. Navigate to "Authentication" → "Providers"
3. Find "Google" and toggle it ON
4. Enter your Google OAuth credentials:
   - Client ID: (from Google Cloud Console)
   - Client Secret: (from Google Cloud Console)
5. Click "Save"

### Step 2: Update Site URL
1. In Supabase, go to "Authentication" → "URL Configuration"
2. Set Site URL to your domain:
   - Development: `http://localhost:3000`
   - Production: `https://yourdomain.com`
3. Add redirect URLs:
   - `http://localhost:3000/api/auth/callback`
   - `https://yourdomain.com/api/auth/callback`

## 3. Database Setup

Run the SQL script to update your profiles table:

1. Go to your Supabase project dashboard
2. Navigate to "SQL Editor"
3. Copy and paste the contents of `supabase/update-profiles-for-google.sql`
4. Click "Run" to execute the script

This will:
- Add new fields to the profiles table (first_name, last_name, phone, provider, etc.)
- Update the profile creation function to handle Google OAuth data
- Add a profile update function

## 4. Environment Variables

Make sure your `.env.local` file includes:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Service Role Key (for server-side operations)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 5. Testing

### Test Google Sign-In
1. Start your development server: `npm run dev`
2. Go to `/login`
3. Click "Continue with Google"
4. Complete the Google OAuth flow
5. Check that you're redirected to the dashboard
6. Go to "Edit Profile" to see the imported Google data

### Test Profile Management
1. After signing in with Google, go to `/profile`
2. Verify that your Google data is populated
3. Try editing and saving your profile
4. Check that changes are saved correctly

## 6. Features Included

### Google Sign-In Button
- Professional Google-branded button on login page
- Handles OAuth flow with proper error handling
- Redirects to dashboard after successful authentication

### Profile Management
- Automatic profile creation from Google data
- Profile editor with all Google fields (name, email, phone, avatar)
- Real-time profile updates
- Visual indication of Google vs email accounts

### Database Integration
- Extended profiles table with Google OAuth fields
- Automatic profile creation/update on OAuth login
- Secure profile management with RLS policies

## 7. Security Features

- Row Level Security (RLS) enabled on profiles table
- Users can only view/edit their own profiles
- Secure OAuth flow with proper redirect handling
- Input validation and sanitization

## 8. Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**
   - Check that your redirect URIs in Google Cloud Console match exactly
   - Ensure no trailing slashes or extra characters

2. **"OAuth consent screen" error**
   - Make sure you've configured the OAuth consent screen
   - Add your email as a test user for development

3. **Profile not created**
   - Check Supabase logs for database errors
   - Verify the profiles table was updated with the SQL script
   - Check that RLS policies are correctly set

4. **Google button not appearing**
   - Check browser console for JavaScript errors
   - Verify Supabase client is properly configured
   - Ensure all environment variables are set

### Debug Steps

1. Check browser console for errors
2. Check Supabase logs in the dashboard
3. Verify Google Cloud Console configuration
4. Test with a fresh browser session
5. Check network tab for failed requests

## 9. Production Deployment

### Before Going Live
1. Update Google OAuth redirect URIs to production domain
2. Update Supabase site URL to production domain
3. Test the complete flow in production
4. Set up proper error monitoring
5. Configure proper CORS settings

### Security Checklist
- [ ] OAuth consent screen configured
- [ ] Redirect URIs properly set
- [ ] RLS policies enabled
- [ ] Environment variables secured
- [ ] HTTPS enabled in production
- [ ] Error handling implemented

## 10. Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Supabase and Google Cloud Console logs
3. Test with a minimal setup first
4. Verify all configuration steps were completed

The Google OAuth integration is now ready to use! Users can sign in with their Google accounts and manage their profiles through the portal.
