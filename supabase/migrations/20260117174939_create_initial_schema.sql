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
  ('Electricity', 'electricity', 'Manages electrical infrastructure and power distribution')
ON CONFLICT (slug) DO NOTHING;

-- Insert demo complaints
INSERT INTO complaints (title, description, department, severity, status, location, latitude, longitude, submitted_by, contact_info) VALUES
  ('Pothole on Main Street', 'Large pothole causing traffic hazards near the intersection of Main Street and Oak Avenue. Multiple vehicles have reported tire damage.', 'roads', 'high', 'in-progress', 'Main Street & Oak Avenue', 40.7128, -74.0060, 'John Smith', 'john.smith@email.com'),
  ('Street Light Outage', 'Street light at the corner of Elm Street and 5th Avenue has been out for 3 days. Area is very dark at night.', 'electricity', 'medium', 'pending', 'Elm Street & 5th Avenue', 40.7589, -73.9851, 'Sarah Johnson', 'sarah.j@email.com'),
  ('Water Leak in Park', 'Water main leak in Central Park causing flooding and muddy conditions. Children''s playground area affected.', 'water', 'high', 'resolved', 'Central Park Playground', 40.7829, -73.9654, 'Mike Davis', 'mike.davis@city.gov'),
  ('Broken Traffic Signal', 'Traffic signal at busy intersection is malfunctioning. Green light stays on too long causing traffic congestion.', 'roads', 'medium', 'in-progress', 'Broadway & 42nd Street', 40.7580, -73.9855, 'Lisa Chen', 'lisa.chen@email.com'),
  ('Power Outage in Residential Area', 'Complete power outage affecting 50+ homes in the Riverside neighborhood. Residents report outage started at 8 PM.', 'electricity', 'high', 'resolved', 'Riverside Neighborhood', 40.7831, -73.9712, 'Robert Wilson', 'robert.wilson@email.com'),
  ('Sewage Odor in Park', 'Strong sewage odor emanating from storm drains in Riverside Park. Possible backup or broken sewer line.', 'water', 'medium', 'in-progress', 'Riverside Park', 40.7829, -73.9654, 'Maria Garcia', 'maria.garcia@email.com'),
  ('Damaged Sidewalk', 'Large cracks and holes in sidewalk on Oak Street making it hazardous for pedestrians, especially elderly residents.', 'roads', 'low', 'pending', 'Oak Street Sidewalk', 40.7282, -73.7949, 'David Lee', 'david.lee@email.com'),
  ('Overgrown Vegetation', 'Bushes and trees blocking street signs and crosswalks on multiple streets. Visibility issues for drivers and pedestrians.', 'roads', 'low', 'pending', 'Various Streets', 40.7505, -73.9934, 'Jennifer Adams', 'jennifer.adams@email.com'),
  ('Noisy Construction', 'Construction work causing excessive noise pollution during early morning hours. Residents unable to sleep.', 'roads', 'medium', 'in-progress', 'Downtown Construction Site', 40.7589, -73.9851, 'Thomas Brown', 'thomas.brown@email.com'),
  ('Broken Park Bench', 'Multiple park benches in bad condition with broken slats and unstable legs. Safety hazard for park visitors.', 'roads', 'low', 'pending', 'Central Park', 40.7128, -74.0060, 'Linda Martinez', 'linda.martinez@email.com'),
  ('Illegal Parking in Bike Lane', 'Vehicles regularly parking in designated bike lanes, making it dangerous for cyclists and blocking bike traffic.', 'roads', 'medium', 'pending', 'Main Street Bike Lane', 40.7580, -73.9855, 'Kevin Johnson', 'kevin.johnson@email.com'),
  ('Clogged Storm Drain', 'Storm drain completely clogged with debris, causing water to pool on street during rain. Flooding hazard.', 'water', 'high', 'in-progress', 'Elm Street', 40.7831, -73.9712, 'Sarah Davis', 'sarah.davis@email.com'),
  ('Flickering Street Light', 'Street light flickering intermittently, creating safety concerns and potential for accidents at night.', 'electricity', 'medium', 'pending', 'Pine Avenue', 40.7282, -73.7949, 'Michael Wilson', 'michael.wilson@email.com'),
  ('Graffiti on Public Property', 'Extensive graffiti covering public buildings and walls. Detracting from neighborhood appearance.', 'roads', 'low', 'pending', 'Downtown Walls', 40.7505, -73.9934, 'Amanda Taylor', 'amanda.taylor@email.com');

-- Insert demo projects
INSERT INTO projects (title, description, department, status, priority, location, latitude, longitude, start_date, end_date, budget, progress) VALUES
  ('Downtown Road Resurfacing', 'Complete resurfacing of downtown roads including Main Street, Oak Avenue, and surrounding areas. Includes new traffic signals and pedestrian crossings.', 'roads', 'active', 'high', 'Downtown District', 40.7128, -74.0060, '2026-01-15', '2026-04-30', 2500000.00, 35),
  ('Water Main Replacement', 'Replace aging water mains in the historic district to prevent leaks and improve water pressure. Includes smart metering installation.', 'water', 'planning', 'medium', 'Historic District', 40.7505, -73.9934, '2026-02-01', '2026-06-15', 1800000.00, 10),
  ('Solar Panel Installation', 'Install solar panels on municipal buildings to reduce energy costs and carbon footprint. Phase 1 covers city hall and library.', 'electricity', 'active', 'medium', 'City Hall Complex', 40.7128, -74.0060, '2026-01-01', '2026-03-31', 750000.00, 60),
  ('Traffic Signal Upgrade', 'Upgrade outdated traffic signals to LED technology with pedestrian countdown timers and smart traffic management capabilities.', 'roads', 'completed', 'low', 'Multiple Intersections', 40.7589, -73.9851, '2025-11-01', '2026-01-15', 450000.00, 100),
  ('Smart Street Lighting', 'Install energy-efficient LED street lights with motion sensors and remote monitoring capabilities across downtown area.', 'electricity', 'active', 'high', 'Downtown Lighting Grid', 40.7128, -74.0060, '2025-12-01', '2026-05-30', 1200000.00, 45),
  ('Flood Control System', 'Install automated flood gates and drainage improvements in flood-prone areas to prevent water damage during heavy rain.', 'water', 'planning', 'high', 'Flood Zone A', 40.7831, -73.9712, '2026-03-01', '2026-08-15', 3200000.00, 5),
  ('Public WiFi Network', 'Deploy city-wide public WiFi hotspots in parks, transit stations, and public buildings for citizen connectivity.', 'roads', 'active', 'medium', 'City-wide', 40.7505, -73.9934, '2026-01-20', '2026-07-31', 850000.00, 25),
  ('Green Space Development', 'Convert abandoned lots into community gardens and recreational areas with native plant landscaping.', 'roads', 'planning', 'low', 'Eastside Lots', 40.7282, -73.7949, '2026-04-01', '2026-10-31', 650000.00, 0),
  ('Bike Lane Expansion', 'Add dedicated bike lanes and bike parking facilities throughout the city to promote sustainable transportation.', 'roads', 'active', 'medium', 'City-wide Bike Network', 40.7829, -73.9654, '2025-10-01', '2026-06-30', 950000.00, 70),
  ('Waste Management Upgrade', 'Implement automated waste collection systems and recycling centers to improve efficiency and reduce contamination.', 'roads', 'planning', 'medium', 'Multiple Districts', 40.7580, -73.9855, '2026-02-15', '2026-09-30', 1800000.00, 15),
  ('Historic Building Restoration', 'Restore and modernize historic city buildings while preserving architectural integrity and adding accessibility features.', 'roads', 'active', 'high', 'Historic District', 40.7128, -74.0060, '2025-09-01', '2026-12-31', 4200000.00, 30);

-- Insert demo risk alerts
INSERT INTO risk_alerts (title, description, severity, category, location, latitude, longitude, status, reported_by) VALUES
  ('Flood Warning - River District', 'Heavy rainfall expected to cause flooding in low-lying areas. Residents advised to move valuables to higher floors.', 'high', 'Weather', 'River District', 40.7831, -73.9712, 'active', 'City Emergency Services'),
  ('Construction Site Safety Hazard', 'Unsecured construction materials at the downtown development site pose falling hazard risk to pedestrians.', 'medium', 'Safety', 'Downtown Construction Site', 40.7505, -73.9934, 'monitoring', 'Safety Inspector'),
  ('Gas Leak Reported', 'Natural gas leak detected in residential neighborhood. Evacuation zone established within 500 feet radius.', 'critical', 'Infrastructure', 'Maple Street Area', 40.7580, -73.9855, 'active', 'Fire Department'),
  ('Tree Falling Risk', 'Large oak tree showing signs of instability after recent storms. Risk of falling on nearby homes and power lines.', 'medium', 'Environmental', 'Oakwood Neighborhood', 40.7829, -73.9654, 'resolved', 'Parks Department'),
  ('Sewage Backup Alert', 'Sewage backup reported in multiple homes on Maple Avenue. Possible main line blockage or pump failure.', 'high', 'Infrastructure', 'Maple Avenue District', 40.7282, -73.7949, 'active', 'Water Department'),
  ('Bridge Inspection Required', 'Scheduled inspection of Riverside Bridge shows signs of structural wear. Weight restrictions may be needed.', 'medium', 'Infrastructure', 'Riverside Bridge', 40.7128, -74.0060, 'monitoring', 'Engineering Department'),
  ('Illegal Dumping Site', 'Large illegal dumping site discovered in industrial area. Hazardous materials suspected. Environmental cleanup required.', 'high', 'Environmental', 'Industrial District', 40.7589, -73.9851, 'active', 'Environmental Services'),
  ('Power Grid Overload Warning', 'Substation showing signs of overload during peak hours. Risk of brownouts in surrounding neighborhoods.', 'critical', 'Infrastructure', 'Downtown Substation', 40.7505, -73.9934, 'active', 'Power Company'),
  ('Traffic Accident Hotspot', 'Intersection of 5th and Main has seen 12 accidents in past month. Traffic signal timing needs adjustment.', 'medium', 'Safety', '5th & Main Intersection', 40.7831, -73.9712, 'monitoring', 'Traffic Department'),
  ('Water Quality Alert', 'Elevated lead levels detected in water samples from Westside neighborhood. Immediate testing and filtration upgrade needed.', 'critical', 'Health', 'Westside Neighborhood', 40.7580, -73.9855, 'active', 'Health Department');

-- Insert additional demo complaints with Indian locations
INSERT INTO complaints (title, description, department, severity, status, location, latitude, longitude, submitted_by, contact_info) VALUES
  ('Water Pipeline Burst in Mumbai', 'Major water pipeline burst on Bandra-Worli Sea Link causing water shortage in surrounding areas. Urgent repair needed.', 'water', 'critical', 'in-progress', 'Bandra-Worli Sea Link, Mumbai', 19.0760, 72.8777, 'Rajesh Kumar', 'rajesh.kumar@mumbai.gov.in'),
  ('Power Outage in Delhi Residential Area', 'Complete power outage affecting 200+ homes in Rohini sector. Residents report outage started at 2 AM and still ongoing.', 'electricity', 'high', 'in-progress', 'Rohini Sector 15, Delhi', 28.7320, 77.0880, 'Priya Sharma', 'priya.sharma@email.com'),
  ('Potholed Roads in Bangalore', 'Multiple large potholes on Outer Ring Road causing accidents and vehicle damage. Especially dangerous during monsoon season.', 'roads', 'high', 'pending', 'Outer Ring Road, Bangalore', 12.9716, 77.5946, 'Arun Patel', 'arun.patel@bangalore.gov.in'),
  ('Sewage Overflow in Chennai', 'Sewage overflowing from manholes in T. Nagar area causing health hazards and foul odor. Mosquito breeding concern.', 'water', 'high', 'in-progress', 'T. Nagar, Chennai', 13.0827, 80.2707, 'Kavita Singh', 'kavita.singh@email.com'),
  ('Street Light Malfunction in Hyderabad', 'Over 50 street lights not working in Jubilee Hills area. Increased crime and safety concerns at night.', 'electricity', 'medium', 'pending', 'Jubilee Hills, Hyderabad', 17.3850, 78.4867, 'Mohammed Ali', 'mohammed.ali@hyderabad.gov.in'),
  ('Traffic Signal Failure in Pune', 'Traffic signals at Aundh junction completely malfunctioning. Causing major traffic congestion and accident risk.', 'roads', 'high', 'in-progress', 'Aundh Junction, Pune', 18.5204, 73.8567, 'Sneha Desai', 'sneha.desai@email.com'),
  ('Water Contamination in Kolkata', 'Reports of contaminated water supply in Salt Lake area. Residents experiencing stomach issues and skin rashes.', 'water', 'critical', 'in-progress', 'Salt Lake, Kolkata', 22.5726, 88.3639, 'Amit Banerjee', 'amit.banerjee@kolkata.gov.in'),
  ('Road Construction Delays in Ahmedabad', 'Ongoing road construction on SG Highway causing massive traffic jams. Project timeline exceeded by 3 months.', 'roads', 'medium', 'in-progress', 'SG Highway, Ahmedabad', 23.0225, 72.5714, 'Meera Shah', 'meera.shah@email.com'),
  ('Transformer Failure in Jaipur', 'Main transformer exploded in Malviya Nagar. Power outage affecting entire neighborhood and risk of fire.', 'electricity', 'critical', 'resolved', 'Malviya Nagar, Jaipur', 26.9124, 75.7873, 'Vikram Singh', 'vikram.singh@jaipur.gov.in'),
  ('Drainage Blockage in Surat', 'Heavy monsoon rains causing severe water logging due to blocked drainage system in textile market area.', 'water', 'high', 'in-progress', 'Textile Market, Surat', 21.1702, 72.8311, 'Rashmi Patel', 'rashmi.patel@email.com');

-- Insert additional demo projects with Indian locations
INSERT INTO projects (title, description, department, status, priority, location, latitude, longitude, start_date, end_date, budget, progress) VALUES
  ('Mumbai Metro Line 3 Extension', 'Extension of Mumbai Metro from Aarey to CSMT. Includes elevated tracks, stations, and integration with existing rail network.', 'roads', 'active', 'high', 'Mumbai Suburban', 19.0760, 72.8777, '2025-06-01', '2027-12-31', 450000000.00, 65),
  ('Delhi Water Supply Modernization', 'Upgrade water treatment plants and distribution network in Delhi NCR. Includes smart metering and leak detection systems.', 'water', 'active', 'high', 'Delhi NCR', 28.7041, 77.1025, '2025-08-15', '2027-06-30', 280000000.00, 40),
  ('Bangalore Solar City Initiative', 'Install solar panels on 500+ government buildings and create microgrids for energy independence.', 'electricity', 'planning', 'medium', 'Bangalore City', 12.9716, 77.5946, '2026-03-01', '2028-02-28', 150000000.00, 15),
  ('Chennai Coastal Protection', 'Build sea walls and flood barriers along Chennai coastline to protect against rising sea levels and storm surges.', 'water', 'active', 'critical', 'Chennai Coastline', 13.0827, 80.2707, '2025-09-01', '2027-08-31', 320000000.00, 55),
  ('Hyderabad Smart Traffic System', 'Implement AI-powered traffic management system with 200+ smart signals and real-time congestion monitoring.', 'roads', 'active', 'high', 'Hyderabad City', 17.3850, 78.4867, '2025-11-15', '2027-04-30', 180000000.00, 70),
  ('Kolkata Underground Drainage', 'Replace outdated drainage system in central Kolkata with modern underground network to prevent flooding.', 'water', 'planning', 'high', 'Central Kolkata', 22.5726, 88.3639, '2026-01-01', '2028-12-31', 250000000.00, 10),
  ('Pune EV Charging Network', 'Install 500+ electric vehicle charging stations across Pune city with fast-charging capabilities.', 'electricity', 'active', 'medium', 'Pune Metropolitan', 18.5204, 73.8567, '2025-10-01', '2027-03-31', 95000000.00, 45),
  ('Ahmedabad Riverfront Development', 'Rejuvenate Sabarmati Riverfront with walkways, parks, and flood control measures.', 'roads', 'completed', 'high', 'Sabarmati Riverfront', 23.0225, 72.5714, '2024-01-15', '2026-01-10', 120000000.00, 100),
  ('Jaipur Heritage Lighting', 'Install heritage-appropriate LED lighting for Jaipur''s historic monuments and palaces.', 'electricity', 'active', 'medium', 'Jaipur Heritage Zone', 26.9124, 75.7873, '2025-12-01', '2026-11-30', 45000000.00, 60),
  ('Surat Industrial Waste Treatment', 'Build advanced waste treatment facility for industrial effluents to clean Tapi River.', 'water', 'planning', 'high', 'Surat Industrial Area', 21.1702, 72.8311, '2026-04-01', '2028-03-31', 200000000.00, 5);

-- Insert additional demo risk alerts with Indian locations
INSERT INTO risk_alerts (title, description, severity, category, location, latitude, longitude, status, reported_by) VALUES
  ('Monsoon Flood Warning - Mumbai', 'Heavy monsoon rains expected to cause severe flooding in low-lying areas of Mumbai. Residents advised to secure belongings.', 'critical', 'Weather', 'Mumbai Coastal Areas', 19.0760, 72.8777, 'active', 'India Meteorological Department'),
  ('Heatwave Alert - Delhi NCR', 'Extreme heatwave conditions with temperatures exceeding 45°C. Risk of heatstroke and water shortage.', 'high', 'Weather', 'Delhi NCR Region', 28.7041, 77.1025, 'active', 'Delhi Disaster Management'),
  ('Construction Crane Collapse Risk', 'Unstable construction crane at Bandra Worli Sea Link project site. High winds pose collapse risk.', 'critical', 'Safety', 'Bandra Worli Sea Link', 19.0760, 72.8777, 'monitoring', 'BMC Safety Inspector'),
  ('Industrial Chemical Spill - Surat', 'Chemical spill from textile dyeing unit contaminating groundwater. Health risk to nearby communities.', 'critical', 'Environmental', 'Surat Industrial Zone', 21.1702, 72.8311, 'active', 'Gujarat Pollution Control'),
  ('Bridge Structural Failure - Lucknow', 'Gomti Bridge showing signs of structural fatigue. Immediate inspection and load restrictions required.', 'high', 'Infrastructure', 'Gomti Bridge, Lucknow', 26.8467, 80.9462, 'active', 'Uttar Pradesh PWD'),
  ('Power Grid Failure Risk - Bangalore', 'Overloaded power grid in tech park area. Risk of cascading blackouts during peak hours.', 'high', 'Infrastructure', 'Electronic City, Bangalore', 12.9716, 77.5946, 'monitoring', 'Karnataka Power Corporation'),
  ('Landslide Warning - Chennai Hills', 'Heavy rains causing landslide risk in hill areas. Evacuation advised for vulnerable zones.', 'high', 'Weather', 'Chennai Hill Stations', 13.0827, 80.2707, 'active', 'Tamil Nadu Disaster Management'),
  ('Air Pollution Crisis - Delhi', 'PM2.5 levels exceeding safe limits by 8x. Respiratory health emergency declared.', 'critical', 'Health', 'Delhi Metropolitan Area', 28.7041, 77.1025, 'active', 'Central Pollution Control Board'),
  ('Dam Overflow Risk - Hyderabad', 'Hussain Sagar lake at 95% capacity. Risk of overflow during forecast rains.', 'critical', 'Weather', 'Hussain Sagar, Hyderabad', 17.3850, 78.4867, 'active', 'Telangana Irrigation Department'),
  ('Traffic Accident Cluster - Pune', 'Multiple fatal accidents at Sinhagad Road junction. Immediate traffic engineering intervention needed.', 'high', 'Safety', 'Sinhagad Road Junction', 18.5204, 73.8567, 'active', 'Pune Traffic Police'),
  ('Water Contamination Alert - Kolkata', 'Bacterial contamination detected in municipal water supply. Boiling advisory issued.', 'critical', 'Health', 'Kolkata Municipal Supply', 22.5726, 88.3639, 'active', 'Kolkata Municipal Corporation');