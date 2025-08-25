# Feedback System Setup Guide

## Overview
The feedback system consists of a floating feedback bubble that appears on the right side of every page. Users can click it to open a modal form where they can select an emoji rating and provide written feedback.

## Features
- **Fixed positioning**: Stays in the right middle as users scroll
- **Emoji selection**: 😢 (sad), 😐 (neutral), 😊 (happy)
- **Text input**: Optional written feedback
- **Supabase integration**: Stores feedback in database
- **Responsive design**: Matches existing site styling

## Setup Instructions

### 1. Environment Variables
Create or update your `.env.local` file with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Supabase Database Setup
Run the following SQL in your Supabase SQL editor to create the feedback table:

```sql
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
```

### 3. Component Integration
The `FeedbackBubble` component is already integrated into the root layout (`app/layout.tsx`) and will appear on every page automatically.

## How It Works

### User Experience
1. Users see a floating 💬 bubble on the right side of every page
2. Clicking the bubble opens a modal form
3. Users select an emoji rating (required)
4. Users can optionally provide written feedback
5. Form submits to Supabase and shows success/error messages
6. Modal automatically closes after successful submission

### Technical Details
- **Component**: `components/FeedbackBubble.tsx`
- **Positioning**: Fixed positioning with `right-6 top-1/2`
- **Animation**: Custom CSS animation that expands outward from the bubble
- **State Management**: Local React state for form data and submission status
- **Database**: Supabase with Row Level Security enabled
- **Error Handling**: Comprehensive error handling with user-friendly messages

## Customization

### Styling
The component uses Tailwind CSS classes that match the existing site design:
- Green accent color: `bg-[color:var(--green)]`
- App color scheme: `bg-app-soft`, `border-app-line`, `text-app-ink`
- Rounded corners: `rounded-3xl`, `rounded-2xl`

### Animation
The modal animation can be customized by modifying the CSS keyframes in the component:
```css
@keyframes feedbackModalPop {
  0% {
    opacity: 0;
    transform: scale(0.8) translateX(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateX(0);
  }
}
```

### Emoji Options
To change the emoji options, modify the `emojis` array in the component:
```typescript
const emojis = [
  { value: "😢", label: "Sad", description: "Not satisfied" },
  { value: "😐", label: "Neutral", description: "Okay" },
  { value: "😊", label: "Happy", description: "Very satisfied" }
];
```

## Troubleshooting

### Common Issues
1. **"supabaseUrl is required" error**: Check that environment variables are set correctly
2. **Build errors**: Ensure Supabase client is only initialized on the client side
3. **Database connection issues**: Verify Supabase credentials and table permissions

### Testing
- Test the feedback form on different pages
- Verify that feedback is being stored in the database
- Check that the modal appears and animates correctly
- Test form validation and error handling

## Security Considerations
- Row Level Security (RLS) is enabled on the feedback table
- Only anonymous users can insert feedback (public access)
- Authenticated users can view feedback (for admin purposes)
- No sensitive user data is collected beyond the feedback content
