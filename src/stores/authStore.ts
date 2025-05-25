import { create } from 'zustand';
import { supabase, getCurrentUser } from '../lib/supabase';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  isLoading: false,
  error: null,

  initialize: async () => {
    try {
      set({ isLoading: true });
      
      // Get session data
      const { data: { session } } = await supabase.auth.getSession();
      
      // If we have a session, get the user data
      if (session) {
        const user = await getCurrentUser();
        set({ 
          user, 
          isAuthenticated: true,
          isInitialized: true
        });
      } else {
        set({ 
          user: null, 
          isAuthenticated: false,
          isInitialized: true
        });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ 
        error: 'Failed to initialize authentication',
        isInitialized: true
      });
    } finally {
      set({ isLoading: false });
    }
    
    // Setup auth state change listener
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        set({ 
          user: session.user,
          isAuthenticated: true
        });
      } else if (event === 'SIGNED_OUT') {
        set({ 
          user: null,
          isAuthenticated: false
        });
      }
    });
  },

  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      set({
        user: data.user,
        isAuthenticated: true,
      });
    } catch (error: any) {
      console.error('Login error:', error);
      set({ error: error.message || 'Failed to login' });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Auto-login after successful registration
      if (data.user) {
        set({
          user: data.user,
          isAuthenticated: true,
        });
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      set({ error: error.message || 'Failed to register' });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      set({
        user: null,
        isAuthenticated: false,
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      set({ error: error.message || 'Failed to logout' });
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));

// Initialize auth on import
useAuthStore.getState().initialize();