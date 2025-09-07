-- ========================================
-- PARENT-CHILD RELATIONSHIP TABLES
-- ========================================

-- Create parent_children table to link parents with their children
CREATE TABLE IF NOT EXISTS public.parent_children (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  child_id UUID NOT NULL, -- This will reference either auth.users or a child profile
  child_name TEXT NOT NULL,
  child_age INTEGER NOT NULL,
  picture_sequence TEXT[] NOT NULL, -- Array of emoji strings for picture login
  current_goals TEXT[], -- Array of learning goals
  avatar_emoji TEXT DEFAULT '👶',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create child_progress table to track each child's progress
CREATE TABLE IF NOT EXISTS public.child_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id UUID NOT NULL, -- References parent_children.id
  date DATE NOT NULL,
  lessons_completed INTEGER DEFAULT 0,
  videos_watched INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  goals_achieved TEXT[], -- Array of goals achieved that day
  notes TEXT, -- Parent or therapist notes
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(child_id, date)
);

-- Create child_activities table to track individual activities
CREATE TABLE IF NOT EXISTS public.child_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id UUID NOT NULL, -- References parent_children.id
  activity_type TEXT NOT NULL CHECK (activity_type IN ('lesson', 'video', 'game', 'assessment')),
  activity_id UUID, -- References lessons.id or videos.id
  activity_name TEXT NOT NULL,
  duration_minutes INTEGER,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER, -- If applicable
  feedback TEXT, -- Child's feedback or parent notes
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create portal_settings table for parental controls
CREATE TABLE IF NOT EXISTS public.portal_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  child_id UUID, -- NULL means applies to all children
  daily_time_limit_minutes INTEGER DEFAULT 30,
  allowed_categories TEXT[] DEFAULT ARRAY['speech', 'language', 'regulation', 'social'],
  require_parent_approval BOOLEAN DEFAULT FALSE,
  weekend_access BOOLEAN DEFAULT TRUE,
  bedtime_restriction BOOLEAN DEFAULT TRUE,
  bedtime_hour INTEGER DEFAULT 20,
  bedtime_minute INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.parent_children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.child_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.child_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portal_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for parent_children
CREATE POLICY "Parents can view own children" ON public.parent_children
  FOR SELECT USING (auth.uid() = parent_id);

CREATE POLICY "Parents can insert own children" ON public.parent_children
  FOR INSERT WITH CHECK (auth.uid() = parent_id);

CREATE POLICY "Parents can update own children" ON public.parent_children
  FOR UPDATE USING (auth.uid() = parent_id);

CREATE POLICY "Parents can delete own children" ON public.parent_children
  FOR DELETE USING (auth.uid() = parent_id);

-- Create RLS policies for child_progress
CREATE POLICY "Parents can view child progress" ON public.child_progress
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM parent_children 
      WHERE parent_children.id = child_progress.child_id 
      AND parent_children.parent_id = auth.uid()
    )
  );

CREATE POLICY "Parents can insert child progress" ON public.child_progress
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM parent_children 
      WHERE parent_children.id = child_progress.child_id 
      AND parent_children.parent_id = auth.uid()
    )
  );

CREATE POLICY "Parents can update child progress" ON public.child_progress
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM parent_children 
      WHERE parent_children.id = child_progress.child_id 
      AND parent_children.parent_id = auth.uid()
    )
  );

-- Create RLS policies for child_activities
CREATE POLICY "Parents can view child activities" ON public.child_activities
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM parent_children 
      WHERE parent_children.id = child_activities.child_id 
      AND parent_children.parent_id = auth.uid()
    )
  );

CREATE POLICY "Parents can insert child activities" ON public.child_activities
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM parent_children 
      WHERE parent_children.id = child_activities.child_id 
      AND parent_children.parent_id = auth.uid()
    )
  );

-- Create RLS policies for portal_settings
CREATE POLICY "Parents can view own settings" ON public.portal_settings
  FOR SELECT USING (auth.uid() = parent_id);

CREATE POLICY "Parents can insert own settings" ON public.portal_settings
  FOR INSERT WITH CHECK (auth.uid() = parent_id);

CREATE POLICY "Parents can update own settings" ON public.portal_settings
  FOR UPDATE USING (auth.uid() = parent_id);

CREATE POLICY "Parents can delete own settings" ON public.portal_settings
  FOR DELETE USING (auth.uid() = parent_id);

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON parent_children TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON child_progress TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON child_activities TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON portal_settings TO authenticated;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_parent_children_parent_id ON parent_children(parent_id);
CREATE INDEX IF NOT EXISTS idx_parent_children_child_id ON parent_children(child_id);
CREATE INDEX IF NOT EXISTS idx_child_progress_child_id ON child_progress(child_id);
CREATE INDEX IF NOT EXISTS idx_child_progress_date ON child_progress(date);
CREATE INDEX IF NOT EXISTS idx_child_activities_child_id ON child_activities(child_id);
CREATE INDEX IF NOT EXISTS idx_child_activities_type ON child_activities(activity_type);
CREATE INDEX IF NOT EXISTS idx_portal_settings_parent_id ON portal_settings(parent_id);
CREATE INDEX IF NOT EXISTS idx_portal_settings_child_id ON portal_settings(child_id);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_parent_children_updated_at BEFORE UPDATE ON parent_children
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_child_progress_updated_at BEFORE UPDATE ON child_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portal_settings_updated_at BEFORE UPDATE ON portal_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to get child progress summary
CREATE OR REPLACE FUNCTION get_child_progress_summary(p_child_id UUID, p_days INTEGER DEFAULT 30)
RETURNS TABLE (
  total_lessons INTEGER,
  total_videos INTEGER,
  total_time_minutes INTEGER,
  avg_daily_time DECIMAL,
  goals_achieved_count INTEGER
) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(SUM(cp.lessons_completed), 0)::INTEGER as total_lessons,
    COALESCE(SUM(cp.videos_watched), 0)::INTEGER as total_videos,
    COALESCE(SUM(cp.time_spent_minutes), 0)::INTEGER as total_time_minutes,
    COALESCE(AVG(cp.time_spent_minutes), 0)::DECIMAL as avg_daily_time,
    COALESCE(SUM(array_length(cp.goals_achieved, 1)), 0)::INTEGER as goals_achieved_count
  FROM child_progress cp
  WHERE cp.child_id = p_child_id
    AND cp.date >= CURRENT_DATE - INTERVAL '1 day' * p_days;
END;
$$;

-- Create function to check if child can access portal
CREATE OR REPLACE FUNCTION can_child_access_portal(p_child_id UUID)
RETURNS BOOLEAN LANGUAGE plpgsql AS $$
DECLARE
  v_settings RECORD;
  v_current_time TIME;
  v_is_weekend BOOLEAN;
  v_daily_time_used INTEGER;
BEGIN
  -- Get current time and check if it's weekend
  v_current_time := CURRENT_TIME;
  v_is_weekend := EXTRACT(DOW FROM CURRENT_DATE) IN (0, 6); -- Sunday = 0, Saturday = 6
  
  -- Get settings for this child (or default if none)
  SELECT * INTO v_settings
  FROM portal_settings
  WHERE child_id = p_child_id AND is_active = TRUE
  ORDER BY created_at DESC
  LIMIT 1;
  
  -- If no specific settings, get parent's default settings
  IF v_settings IS NULL THEN
    SELECT * INTO v_settings
    FROM portal_settings ps
    JOIN parent_children pc ON pc.parent_id = ps.parent_id
    WHERE pc.id = p_child_id AND ps.child_id IS NULL AND ps.is_active = TRUE
    ORDER BY ps.created_at DESC
    LIMIT 1;
  END IF;
  
  -- If still no settings, allow access (default behavior)
  IF v_settings IS NULL THEN
    RETURN TRUE;
  END IF;
  
  -- Check weekend access
  IF v_is_weekend AND NOT v_settings.weekend_access THEN
    RETURN FALSE;
  END IF;
  
  -- Check bedtime restriction
  IF v_settings.bedtime_restriction THEN
    IF v_current_time > TIME(v_settings.bedtime_hour, v_settings.bedtime_minute) THEN
      RETURN FALSE;
    END IF;
  END IF;
  
  -- Check daily time limit
  IF v_settings.daily_time_limit_minutes > 0 THEN
    SELECT COALESCE(SUM(time_spent_minutes), 0) INTO v_daily_time_used
    FROM child_progress
    WHERE child_id = p_child_id AND date = CURRENT_DATE;
    
    IF v_daily_time_used >= v_settings.daily_time_limit_minutes THEN
      RETURN FALSE;
    END IF;
  END IF;
  
  RETURN TRUE;
END;
$$;

-- Add comments
COMMENT ON TABLE public.parent_children IS 'Links parents to their children with picture login sequences';
COMMENT ON TABLE public.child_progress IS 'Daily progress tracking for each child';
COMMENT ON TABLE public.child_activities IS 'Individual activity tracking for detailed monitoring';
COMMENT ON TABLE public.portal_settings IS 'Parental controls and portal access settings';
COMMENT ON FUNCTION get_child_progress_summary IS 'Get progress summary for a child over specified days';
COMMENT ON FUNCTION can_child_access_portal IS 'Check if a child can access the portal based on parental controls';
