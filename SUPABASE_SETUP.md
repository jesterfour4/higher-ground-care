# Supabase Setup Guide

## 1. Environment Variables

Create a `.env.local` file in your project root with your Supabase credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Optional: Service Role Key (for server-side operations)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### How to get these values:
1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the "Project URL" and "anon public" key
4. Paste them in your `.env.local` file

## 2. Database Setup

Run the SQL script in `supabase-setup.sql` in your Supabase SQL Editor:

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-setup.sql`
4. Click "Run" to execute the script

This will create:
- `contact_submissions` table
- Proper indexes for performance
- Row Level Security (RLS) policies
- Automatic timestamp updates

## 3. Form Features

The contact form now includes:
- ✅ Form validation (required fields, email format)
- ✅ Loading states during submission
- ✅ Success/error messages
- ✅ Form reset on successful submission
- ✅ Server-side processing with Supabase
- ✅ TypeScript types for data safety

## 4. Testing

1. Start your development server: `npm run dev`
2. Navigate to the contact form
3. Fill out and submit the form
4. Check your Supabase dashboard > Table Editor > contact_submissions
5. You should see your test submission

## 5. Security Features

- Row Level Security (RLS) enabled
- Only authenticated users can read submissions (configurable)
- Anyone can submit forms (as needed for public contact forms)
- Input validation on both client and server
- No sensitive data exposed in client-side code

## 6. Customization

### Change table name:
Update the table name in:
- `lib/supabase.ts` (line 25)
- `supabase-setup.sql` (all references)

### Add more fields:
1. Update the `ContactFormData` interface in `lib/supabase.ts`
2. Add the field to the form in `app/page.tsx`
3. Update the database table schema
4. Update the insert query

### Modify validation:
Edit the validation logic in `app/actions/contact.ts`

## 7. Troubleshooting

### Form not submitting:
- Check browser console for errors
- Verify Supabase credentials in `.env.local`
- Ensure database table exists
- Check RLS policies

### Build errors:
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `npm install`
- Check TypeScript errors: `npm run type-check`

### Database connection issues:
- Verify Supabase project is active
- Check if your IP is allowed in Supabase settings
- Ensure environment variables are loaded correctly

## 8. Next Steps

Consider adding:
- Email notifications for new submissions
- Admin dashboard to view submissions
- Export functionality for data analysis
- Rate limiting to prevent spam
- CAPTCHA integration
