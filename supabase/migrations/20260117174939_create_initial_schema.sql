/*
  # Initial UrbanX Database Schema

  ## Overview
  Creates the complete database schema for UrbanX smart city management platform.
  
  ## New Tables
  
  ### 1. departments
  - `id` (uuid, primary key)
  - `name` (varchar 100) - Department name
  - `slug` (varchar 50, unique) - URL-friendly identifier
  - `description` (text) - Department description
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 2. complaints
  - `id` (uuid, primary key)
  - `title` (varchar 255) - Complaint title
  - `description` (text) - Detailed description
  - `department` (varchar 50) - Assigned department
  - `severity` (enum: high, medium, low) - Priority level
  - `status` (enum: pending, in-progress, resolved, closed) - Current status
  - `location` (varchar 255) - Location description
  - `latitude` (decimal) - GPS latitude
  - `longitude` (decimal) - GPS longitude
  - `submitted_by` (varchar 255) - Submitter name
  - `contact_info` (varchar 255) - Contact information
  - `submitted_at` (timestamptz) - Submission time
  - `updated_at` (timestamptz) - Last update
  - `resolved_at` (timestamptz) - Resolution time
  - `assigned_to` (varchar 255) - Assigned personnel
  
  ### 3. projects
  - `id` (uuid, primary key)
  - `title` (varchar 255) - Project title
  - `description` (text) - Project details
  - `department` (varchar 50) - Owning department
  - `status` (enum: planning, active, completed, on-hold) - Project status
  - `priority` (enum: high, medium, low) - Priority level
  - `location` (varchar 255) - Location description
  - `latitude` (decimal) - GPS latitude
  - `longitude` (decimal) - GPS longitude
  - `start_date` (date) - Project start date
  - `end_date` (date) - Expected completion
  - `budget` (decimal 12,2) - Allocated budget
  - `progress` (integer 0-100) - Completion percentage
  - `created_at` (timestamptz) - Creation time
  - `updated_at` (timestamptz) - Last update
  
  ### 4. risk_alerts
  - `id` (uuid, primary key)
  - `title` (varchar 255) - Alert title
  - `description` (text) - Alert details
  - `severity` (enum: critical, high, medium, low) - Severity level
  - `category` (varchar 50) - Alert category
  - `location` (varchar 255) - Location description
  - `latitude` (decimal) - GPS latitude
  - `longitude` (decimal) - GPS longitude
  - `status` (enum: active, resolved, monitoring) - Current status
  - `reported_by` (varchar 255) - Reporter name
  - `reported_at` (timestamptz) - Report time
  - `resolved_at` (timestamptz) - Resolution time
  - `updated_at` (timestamptz) - Last update
  
  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users to read/write their data
  - Public read access for departments
*/

-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(100) NOT NULL,
  slug varchar(50) UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create complaints table
CREATE TABLE IF NOT EXISTS complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(255) NOT NULL,
  description text NOT NULL,
  department varchar(50) NOT NULL,
  severity varchar(20) DEFAULT 'medium' CHECK (severity IN ('high', 'medium', 'low')),
  status varchar(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'resolved', 'closed')),
  location varchar(255),
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  submitted_by varchar(255),
  contact_info varchar(255),
  submitted_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  resolved_at timestamptz,
  assigned_to varchar(255)
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(255) NOT NULL,
  description text NOT NULL,
  department varchar(50) NOT NULL,
  status varchar(20) DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'completed', 'on-hold')),
  priority varchar(20) DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  location varchar(255),
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  start_date date,
  end_date date,
  budget decimal(12, 2) DEFAULT 0,
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create risk_alerts table
CREATE TABLE IF NOT EXISTS risk_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(255) NOT NULL,
  description text NOT NULL,
  severity varchar(20) DEFAULT 'medium' CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  category varchar(50) NOT NULL,
  location varchar(255),
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  status varchar(20) DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'monitoring')),
  reported_by varchar(255),
  reported_at timestamptz DEFAULT now(),
  resolved_at timestamptz,
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_alerts ENABLE ROW LEVEL SECURITY;

-- Departments policies (public read, authenticated write)
CREATE POLICY "Anyone can view departments"
  ON departments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert departments"
  ON departments FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update departments"
  ON departments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Complaints policies (public read, authenticated write)
CREATE POLICY "Anyone can view complaints"
  ON complaints FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert complaints"
  ON complaints FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update complaints"
  ON complaints FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete complaints"
  ON complaints FOR DELETE
  TO authenticated
  USING (true);

-- Projects policies (public read, authenticated write)
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- Risk alerts policies (public read, authenticated write)
CREATE POLICY "Anyone can view risk alerts"
  ON risk_alerts FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert risk alerts"
  ON risk_alerts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update risk alerts"
  ON risk_alerts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete risk alerts"
  ON risk_alerts FOR DELETE
  TO authenticated
  USING (true);

-- Insert default departments
INSERT INTO departments (name, slug, description) VALUES
  ('Roads & Transportation', 'roads', 'Manages road infrastructure, traffic systems, and public transportation'),
  ('Water Supply', 'water', 'Handles water supply infrastructure and maintenance'),
  ('Electricity', 'electricity', 'Manages electrical infrastructure and power distribution'),
  ('Telecommunications', 'telecom', 'Oversees telecom infrastructure and connectivity'),
  ('Waste Management', 'waste', 'Handles waste collection and disposal systems'),
  ('Public Safety', 'safety', 'Manages public safety and emergency services')
ON CONFLICT (slug) DO NOTHING;