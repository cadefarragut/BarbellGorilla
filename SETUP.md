# Barbell Gorilla Setup Guide

## Authentication & Database Setup

This app uses Supabase for user authentication and data storage. Follow these steps to set it up:

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Note down your project URL and anon key

### 2. Environment Variables

Create a `.env.local` file in your project root with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Schema

Run these SQL commands in your Supabase SQL editor:

```sql
-- Create users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workout_plans table
CREATE TABLE workout_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create exercises table
CREATE TABLE exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  workout_plan_id UUID REFERENCES workout_plans(id) NOT NULL,
  name TEXT NOT NULL,
  sets INTEGER NOT NULL,
  reps INTEGER NOT NULL,
  weight INTEGER NOT NULL,
  order_index INTEGER NOT NULL
);

-- Create workout_sessions table
CREATE TABLE workout_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  workout_plan_id UUID REFERENCES workout_plans(id) NOT NULL,
  date DATE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  notes TEXT
);

-- Create progress_records table
CREATE TABLE progress_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  exercise_name TEXT NOT NULL,
  one_rep_max INTEGER NOT NULL,
  date DATE NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_records ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own workout plans" ON workout_plans
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own exercises" ON exercises
  FOR ALL USING (
    workout_plan_id IN (
      SELECT id FROM workout_plans WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own workout sessions" ON workout_sessions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own progress records" ON progress_records
  FOR ALL USING (auth.uid() = user_id);
```

### 4. Features Implemented

- **User Authentication**: Sign up, login, logout
- **User Profiles**: Store first name, last name, email
- **Workout Plans**: Create and manage workout routines
- **Exercise Tracking**: Log sets, reps, and weights
- **Progress Tracking**: Record one-rep max improvements
- **Workout Sessions**: Track completed workouts
- **Dashboard**: View stats and recent activity

### 5. How It Works

1. **Sign Up**: Users create accounts with email/password
2. **Login**: Users authenticate and access their dashboard
3. **Data Storage**: All workout data is stored in Supabase tables
4. **User Isolation**: Row Level Security ensures users only see their own data
5. **Real-time Updates**: Supabase provides real-time data synchronization

### 6. Next Steps

- Implement workout plan generation algorithm
- Add progress charts and analytics
- Create mobile-responsive workout tracking interface
- Add social features (sharing workouts, leaderboards)
- Implement workout reminders and notifications

### 7. Testing

1. Start the development server: `npm run dev`
2. Navigate to `/signup` to create an account
3. Login and access the dashboard
4. Test creating workout plans and tracking progress

The app will now store all user data persistently in the database!
