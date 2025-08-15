import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  created_at: string
}

export interface WorkoutPlan {
  id: string
  user_id: string
  name: string
  created_at: string
  updated_at: string
}

export interface Exercise {
  id: string
  workout_plan_id: string
  name: string
  sets: number
  reps: number
  weight: number
  order: number
}

export interface WorkoutSession {
  id: string
  user_id: string
  workout_plan_id: string
  date: string
  completed: boolean
  notes?: string
}

export interface ProgressRecord {
  id: string
  user_id: string
  exercise_name: string
  one_rep_max: number
  date: string
}
