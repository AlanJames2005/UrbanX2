import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if using placeholder credentials (development mode)
    if (supabase.supabaseUrl.includes('placeholder')) {
      // In development mode, start with no session
      setSession(null);
      setUser(null);
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        (() => {
          (async () => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
          })();
        })();
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    // Check if using placeholder credentials (development mode)
    if (supabase.supabaseUrl.includes('placeholder')) {
      // Simulate successful login for development
      const mockUser: User = {
        id: 'dev-user-123',
        email: email,
        user_metadata: { name: 'Development User' },
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      };
      const mockSession: Session = {
        user: mockUser,
        access_token: 'dev-token',
        refresh_token: 'dev-refresh-token',
        expires_at: Date.now() / 1000 + 3600,
        token_type: 'bearer',
      };
      setUser(mockUser);
      setSession(mockSession);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    // Check if using placeholder credentials (development mode)
    if (supabase.supabaseUrl.includes('placeholder')) {
      // Simulate successful signup for development
      const mockUser: User = {
        id: 'dev-user-123',
        email: email,
        user_metadata: { name: 'Development User' },
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      };
      const mockSession: Session = {
        user: mockUser,
        access_token: 'dev-token',
        refresh_token: 'dev-refresh-token',
        expires_at: Date.now() / 1000 + 3600,
        token_type: 'bearer',
      };
      setUser(mockUser);
      setSession(mockSession);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    // Check if using placeholder credentials (development mode)
    if (supabase.supabaseUrl.includes('placeholder')) {
      // Simulate logout for development
      setUser(null);
      setSession(null);
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
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
