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
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        // If user profile doesn't exist, create it
        if (error.code === 'PGRST116') {
          console.log('User profile not found, creating one...');
          // We'll handle this in the signup flow instead
          return;
        }
        throw error;
      }
      setUser(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        // Check if it's an email already exists error
        if (error.message.includes('already registered') || error.message.includes('already exists')) {
          throw new Error('An account with this email already exists. Please use a different email or try logging in.');
        }
        throw error;
      }

      if (data.user) {
        // Wait a moment for the auth user to be fully created
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user profile already exists
        const { data: existingProfile, error: checkError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (existingProfile) {
          // Profile already exists, use it
          setUser(existingProfile);
        } else {
          // Create user profile in users table
          const { error: profileError } = await supabase
            .from('users')
            .insert([
              {
                id: data.user.id,
                email,
                first_name: firstName,
                last_name: lastName,
              }
            ]);

          if (profileError) {
            console.error('Profile creation error:', profileError);
            // If profile creation fails, try to get the user profile instead
            try {
              await fetchUserProfile(data.user.id);
            } catch (fetchError) {
              console.error('Failed to fetch user profile:', fetchError);
              throw new Error('Account created but profile setup failed. Please try logging in.');
            }
          } else {
            // Set user directly instead of fetching
            setUser({
              id: data.user.id,
              email,
              first_name: firstName,
              last_name: lastName,
              created_at: new Date().toISOString(),
            });
          }
        }
        
        setLoading(false);
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setLoading(false);
      
      // If there was an error, make sure we're not authenticated
      // This prevents the redirect to dashboard
      await supabase.auth.signOut();
      setUser(null);
      
      // Don't redirect on error - let the signup page handle it
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        await fetchUserProfile(data.user.id);
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
