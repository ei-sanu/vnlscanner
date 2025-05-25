import { createClient } from '@supabase/supabase-js';

// These will be replaced with environment variables in a real project
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const initSupabase = async () => {
  // Setup listeners for auth state changes
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Supabase auth event:', event);
    
    // You could dispatch actions to your state management here
    if (event === 'SIGNED_IN' && session) {
      console.log('User signed in:', session.user);
    } else if (event === 'SIGNED_OUT') {
      console.log('User signed out');
    }
  });
  
  // Return the current session if any
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

// Helper function to sign up users
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  return { data, error };
};

// Helper function to sign in users
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

// Helper function to sign out users
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Helper function to get the current user
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Helper function to save scan history
export const saveScanResult = async (userId: string, scanResult: any) => {
  const { data, error } = await supabase
    .from('scan_history')
    .insert([
      { 
        user_id: userId,
        url: scanResult.url,
        security_score: scanResult.securityScore,
        risk_level: scanResult.riskLevel,
        vulnerabilities_count: {
          high: scanResult.vulnerabilitiesSummary.high,
          medium: scanResult.vulnerabilitiesSummary.medium,
          low: scanResult.vulnerabilitiesSummary.low
        },
        scan_date: scanResult.scanDate,
        full_report: scanResult
      }
    ]);
  
  return { data, error };
};

// Helper function to get scan history for a user
export const getScanHistory = async (userId: string) => {
  const { data, error } = await supabase
    .from('scan_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};