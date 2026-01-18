import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';
import { mockSupabase } from '../utils/mockData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder_key';

// Check if we're using placeholder/mock data
const isUsingMockData = supabaseUrl.includes('placeholder') || supabaseAnonKey.includes('placeholder');

export const supabase = isUsingMockData
  ? mockSupabase as SupabaseClient<Database> // Type assertion for mock compatibility
  : createClient<Database>(supabaseUrl, supabaseAnonKey);

export { isUsingMockData };
