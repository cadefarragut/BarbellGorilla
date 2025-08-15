import { supabase } from './supabase';
import { WorkoutPlan, Exercise, WorkoutSession, ProgressRecord } from './supabase';

export class WorkoutService {
  // Save a workout session
  static async saveWorkoutSession(session: Omit<WorkoutSession, 'id'>): Promise<WorkoutSession> {
    const { data, error } = await supabase
      .from('workout_sessions')
      .insert([session])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get user's workout sessions
  static async getUserWorkoutSessions(userId: string): Promise<WorkoutSession[]> {
    const { data, error } = await supabase
      .from('workout_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Save progress record (one-rep max)
  static async saveProgressRecord(record: Omit<ProgressRecord, 'id'>): Promise<ProgressRecord> {
    const { data, error } = await supabase
      .from('progress_records')
      .insert([record])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get user's progress records for a specific exercise
  static async getExerciseProgress(userId: string, exerciseName: string): Promise<ProgressRecord[]> {
    const { data, error } = await supabase
      .from('progress_records')
      .select('*')
      .eq('user_id', userId)
      .eq('exercise_name', exerciseName)
      .order('date', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Create a new workout plan
  static async createWorkoutPlan(plan: Omit<WorkoutPlan, 'id' | 'created_at' | 'updated_at'>): Promise<WorkoutPlan> {
    const { data, error } = await supabase
      .from('workout_plans')
      .insert([{
        ...plan,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get user's workout plans
  static async getUserWorkoutPlans(userId: string): Promise<WorkoutPlan[]> {
    const { data, error } = await supabase
      .from('workout_plans')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Add exercises to a workout plan
  static async addExercisesToPlan(exercises: Omit<Exercise, 'id'>[]): Promise<Exercise[]> {
    const { data, error } = await supabase
      .from('exercises')
      .insert(exercises)
      .select();

    if (error) throw error;
    return data || [];
  }

  // Get exercises for a workout plan
  static async getPlanExercises(planId: string): Promise<Exercise[]> {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('workout_plan_id', planId)
      .order('order', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Update workout session completion status
  static async updateWorkoutSession(sessionId: string, updates: Partial<WorkoutSession>): Promise<WorkoutSession> {
    const { data, error } = await supabase
      .from('workout_sessions')
      .update(updates)
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get workout statistics for dashboard
  static async getWorkoutStats(userId: string): Promise<{
    totalWorkouts: number;
    thisMonthWorkouts: number;
    averageWorkoutDuration: number;
    strengthIncrease: number;
  }> {
    // Get total workouts
    const { data: totalWorkouts, error: totalError } = await supabase
      .from('workout_sessions')
      .select('*')
      .eq('user_id', userId);

    if (totalError) throw totalError;

    // Get this month's workouts
    const thisMonth = new Date();
    thisMonth.setDate(1);
    const { data: thisMonthWorkouts, error: monthError } = await supabase
      .from('workout_sessions')
      .select('*')
      .eq('user_id', userId)
      .gte('date', thisMonth.toISOString());

    if (monthError) throw monthError;

    // Calculate strength increase (simplified - you'd want more sophisticated logic)
    const { data: progressRecords, error: progressError } = await supabase
      .from('progress_records')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: true });

    if (progressError) throw progressError;

    let strengthIncrease = 0;
    if (progressRecords && progressRecords.length > 1) {
      const firstRecord = progressRecords[0];
      const lastRecord = progressRecords[progressRecords.length - 1];
      strengthIncrease = ((lastRecord.one_rep_max - firstRecord.one_rep_max) / firstRecord.one_rep_max) * 100;
    }

    return {
      totalWorkouts: totalWorkouts?.length || 0,
      thisMonthWorkouts: thisMonthWorkouts?.length || 0,
      averageWorkoutDuration: 45, // Placeholder - you'd calculate this from actual data
      strengthIncrease: Math.round(strengthIncrease),
    };
  }
}
