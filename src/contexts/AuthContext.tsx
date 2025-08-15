"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for changes on auth state (signed in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session?.user?.id);
      
      if (session?.user) {
        // Only fetch profile if we're not in an error state
        if (!loading || user === null) {
          await fetchUserProfile(session.user.id);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Add timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (loading) {
        console.log('Auth loading timeout, setting loading to false');
        setLoading(false);
      }
    }, 10000); // 10 second timeout

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [loading]);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('Fetching user profile for ID:', userId);
      
      // Add timeout to prevent hanging
      const profilePromise = supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Profile fetch timeout')), 10000);
      });
      
      const result = await Promise.race([profilePromise, timeoutPromise]);
      const { data, error } = result as any; // Type assertion to avoid TypeScript issues

      if (error) {
        console.error('Error fetching user profile:', error);
        // If user profile doesn't exist, this is a problem for login
        if (error.code === 'PGRST116') {
          console.error('User profile not found - this should not happen for existing users');
          throw new Error('User profile not found. Please contact support.');
        }
        throw error;
      }
      
      console.log('User profile fetched successfully:', data);
      setUser(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setLoading(false);
      throw error; // Re-throw to handle in the calling function
    }
  };

    const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      console.log('Starting signup process...');
      setLoading(true);
      
      // Simple signup without complex email checking
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.log('Auth signup error:', error);
        // Check if it's an email already exists error
        if (error.message.includes('already registered') || error.message.includes('already exists')) {
          throw new Error('An account with this email already exists. Please use a different email or try logging in.');
        }
        throw error;
      }

      console.log('Auth signup successful, user:', data.user?.id);
      
             if (data.user) {
         console.log('Creating user profile...');
         
         // First, let's check if the users table exists and is accessible
         console.log('Checking if users table is accessible...');
         try {
           const { data: tableCheck, error: tableError } = await supabase
             .from('users')
             .select('count')
             .limit(1);
           
           if (tableError) {
             console.error('Table access error:', tableError);
             throw new Error(`Cannot access users table: ${tableError.message}`);
           }
           console.log('Users table is accessible');
         } catch (tableError) {
           console.error('Table check failed:', tableError);
           throw new Error('Database table access failed');
         }
         
         // Create user profile in users table
         console.log('Attempting to insert profile with data:', {
           id: data.user.id,
           email,
           first_name: firstName,
           last_name: lastName,
         });
         
         const { data: profileData, error: profileError } = await supabase
           .from('users')
           .insert([
             {
               id: data.user.id,
               email,
               first_name: firstName,
               last_name: lastName,
             }
           ])
           .select()
           .single();

                 if (profileError) {
           console.error('Profile creation error details:', {
             code: profileError.code,
             message: profileError.message,
             details: profileError.details,
             hint: profileError.hint
           });
           
           // Log the exact data we're trying to insert
           console.error('Failed to insert this data:', {
             id: data.user.id,
             email,
             first_name: firstName,
             last_name: lastName,
           });
           
           // Also log the full error object for debugging
           console.error('Full profile error object:', profileError);
           
           throw new Error('Email already in use, please try logging in');
         }
        
        console.log('Profile created successfully:', profileData);

        // Set user directly
        setUser(profileData);
        
        console.log('User state set, redirecting to dashboard...');
        setLoading(false);
        router.push('/dashboard');
      }
      
    } catch (error) {
      console.error('Error in signup process:', error);
      setLoading(false);
      
      // If there was an error, make sure we're not authenticated
      try {
        await supabase.auth.signOut();
      } catch (signOutError) {
        console.error('Error signing out:', signOutError);
      }
      setUser(null);
      
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Starting signin process...');
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.log('Auth signin error:', error);
        throw error;
      }

      if (data.user) {
        console.log('Auth signin successful, fetching profile...');
        await fetchUserProfile(data.user.id);
        console.log('Profile fetched, redirecting to dashboard...');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setLoading(false);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
