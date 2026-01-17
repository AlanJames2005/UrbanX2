export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      departments: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      complaints: {
        Row: {
          id: string;
          title: string;
          description: string;
          department: string;
          severity: 'high' | 'medium' | 'low';
          status: 'pending' | 'in-progress' | 'resolved' | 'closed';
          location: string | null;
          latitude: number | null;
          longitude: number | null;
          submitted_by: string | null;
          contact_info: string | null;
          submitted_at: string;
          updated_at: string;
          resolved_at: string | null;
          assigned_to: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          department: string;
          severity?: 'high' | 'medium' | 'low';
          status?: 'pending' | 'in-progress' | 'resolved' | 'closed';
          location?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          submitted_by?: string | null;
          contact_info?: string | null;
          submitted_at?: string;
          updated_at?: string;
          resolved_at?: string | null;
          assigned_to?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          department?: string;
          severity?: 'high' | 'medium' | 'low';
          status?: 'pending' | 'in-progress' | 'resolved' | 'closed';
          location?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          submitted_by?: string | null;
          contact_info?: string | null;
          submitted_at?: string;
          updated_at?: string;
          resolved_at?: string | null;
          assigned_to?: string | null;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          department: string;
          status: 'planning' | 'active' | 'completed' | 'on-hold';
          priority: 'high' | 'medium' | 'low';
          location: string | null;
          latitude: number | null;
          longitude: number | null;
          start_date: string | null;
          end_date: string | null;
          budget: number;
          progress: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          department: string;
          status?: 'planning' | 'active' | 'completed' | 'on-hold';
          priority?: 'high' | 'medium' | 'low';
          location?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          start_date?: string | null;
          end_date?: string | null;
          budget?: number;
          progress?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          department?: string;
          status?: 'planning' | 'active' | 'completed' | 'on-hold';
          priority?: 'high' | 'medium' | 'low';
          location?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          start_date?: string | null;
          end_date?: string | null;
          budget?: number;
          progress?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      risk_alerts: {
        Row: {
          id: string;
          title: string;
          description: string;
          severity: 'critical' | 'high' | 'medium' | 'low';
          category: string;
          location: string | null;
          latitude: number | null;
          longitude: number | null;
          status: 'active' | 'resolved' | 'monitoring';
          reported_by: string | null;
          reported_at: string;
          resolved_at: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          severity?: 'critical' | 'high' | 'medium' | 'low';
          category: string;
          location?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          status?: 'active' | 'resolved' | 'monitoring';
          reported_by?: string | null;
          reported_at?: string;
          resolved_at?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          severity?: 'critical' | 'high' | 'medium' | 'low';
          category?: string;
          location?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          status?: 'active' | 'resolved' | 'monitoring';
          reported_by?: string | null;
          reported_at?: string;
          resolved_at?: string | null;
          updated_at?: string;
        };
      };
    };
  };
}
