-- ========================================
-- PORTAL TABLES FOR KID & PARENT PROFILES
-- ========================================

-- Create kid_profiles table
CREATE TABLE IF NOT EXISTS public.kid_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  age TEXT,
  favorite_color TEXT,
  favorite_animal TEXT,
  favorite_food TEXT,
  favorite_activity TEXT,
  what_makes_me_happy TEXT,
  what_im_good_at TEXT,
  what_i_want_to_learn TEXT,
  my_superpower TEXT,
  my_friends TEXT,
  my_family TEXT,
  my_pets TEXT,
  my_favorite_place TEXT,
  my_dream TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create parent_profiles table
CREATE TABLE IF NOT EXISTS public.parent_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  relationship TEXT,
  child_name TEXT,
  child_age TEXT,
  child_interests TEXT,
  child_challenges TEXT,
  child_strengths TEXT,
  family_goals TEXT,
  concerns TEXT,
  previous_therapy TEXT,
  communication_preferences TEXT,
  availability TEXT,
  emergency_contact TEXT,
  medical_info TEXT,
  additional_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create videos table
CREATE TABLE IF NOT EXISTS public.videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration INTEGER, -- in seconds
  type TEXT CHECK (type IN ('session', 'lesson', 'celebration')),
  category TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  duration INTEGER, -- in seconds
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  category TEXT,
  age_range TEXT,
  skills TEXT[], -- array of skills
  materials TEXT[], -- array of materials needed
  instructions TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user_lesson_progress table
CREATE TABLE IF NOT EXISTS public.user_lesson_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  progress_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Enable RLS on all tables
ALTER TABLE public.kid_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for kid_profiles
CREATE POLICY "Users can view own kid profile" ON public.kid_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own kid profile" ON public.kid_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own kid profile" ON public.kid_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for parent_profiles
CREATE POLICY "Users can view own parent profile" ON public.parent_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own parent profile" ON public.parent_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own parent profile" ON public.parent_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for videos
CREATE POLICY "Users can view own videos" ON public.videos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own videos" ON public.videos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own videos" ON public.videos
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for lessons (public read, admin write)
CREATE POLICY "Anyone can view lessons" ON public.lessons
  FOR SELECT USING (true);

-- Create RLS policies for user_lesson_progress
CREATE POLICY "Users can view own lesson progress" ON public.user_lesson_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own lesson progress" ON public.user_lesson_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lesson progress" ON public.user_lesson_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Grant permissions
GRANT SELECT, INSERT, UPDATE ON kid_profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON parent_profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON videos TO authenticated;
GRANT SELECT ON lessons TO authenticated;
GRANT SELECT, INSERT, UPDATE ON user_lesson_progress TO authenticated;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_kid_profiles_user_id ON kid_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_parent_profiles_user_id ON parent_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_videos_user_id ON videos(user_id);
CREATE INDEX IF NOT EXISTS idx_videos_type ON videos(type);
CREATE INDEX IF NOT EXISTS idx_lessons_category ON lessons(category);
CREATE INDEX IF NOT EXISTS idx_lessons_difficulty ON lessons(difficulty);
CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_user_id ON user_lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_lesson_id ON user_lesson_progress(lesson_id);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_kid_profiles_updated_at BEFORE UPDATE ON kid_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_parent_profiles_updated_at BEFORE UPDATE ON parent_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_lesson_progress_updated_at BEFORE UPDATE ON user_lesson_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample lessons
INSERT INTO lessons (title, description, difficulty, category, age_range, skills, materials, instructions) VALUES
('Fun with Letter Sounds', 'Learn the sounds of letters A, B, and C through fun activities!', 'easy', 'speech', '3-5 years', 
 ARRAY['Letter recognition', 'Sound production', 'Listening'], 
 ARRAY['Letter cards', 'Mirror', 'Fun stickers'],
 '1. Watch the video with your child
2. Practice the sounds together
3. Use the mirror to see mouth movements
4. Celebrate each success!'),

('Story Time Adventures', 'Build language skills through interactive storytelling', 'medium', 'language', '4-6 years',
 ARRAY['Vocabulary', 'Comprehension', 'Imagination'],
 ARRAY['Picture books', 'Story props', 'Coloring sheets'],
 '1. Choose a story together
2. Read with expression
3. Ask questions about the story
4. Act out favorite parts!'),

('Breathing and Relaxation', 'Learn calming techniques for better focus and communication', 'easy', 'regulation', '3-8 years',
 ARRAY['Self-regulation', 'Focus', 'Calm communication'],
 ARRAY['Soft blanket', 'Quiet space', 'Timer'],
 '1. Find a quiet, comfortable space
2. Follow the breathing exercises
3. Practice daily for best results
4. Use when feeling overwhelmed');

-- Add comments
COMMENT ON TABLE public.kid_profiles IS 'Child profile information collected through kid-friendly interface';
COMMENT ON TABLE public.parent_profiles IS 'Parent and caregiver information for therapy coordination';
COMMENT ON TABLE public.videos IS 'Video recordings of sessions and lessons for each user';
COMMENT ON TABLE public.lessons IS 'Mini lessons and activities available to all users';
COMMENT ON TABLE public.user_lesson_progress IS 'Tracks user progress through lessons';
