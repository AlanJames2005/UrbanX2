import { supabase } from '../lib/supabase';

// Additional dummy data for UrbanX platform with Indian locations
const additionalComplaints = [
  {
    title: 'Water Pipeline Burst in Mumbai',
    description: 'Major water pipeline burst on Bandra-Worli Sea Link causing water shortage in surrounding areas. Urgent repair needed.',
    department: 'water',
    severity: 'critical',
    status: 'in-progress',
    location: 'Bandra-Worli Sea Link, Mumbai',
    latitude: 19.0760,
    longitude: 72.8777,
    submitted_by: 'Rajesh Kumar',
    contact_info: 'rajesh.kumar@mumbai.gov.in'
  },
  {
    title: 'Power Outage in Delhi Residential Area',
    description: 'Complete power outage affecting 200+ homes in Rohini sector. Residents report outage started at 2 AM and still ongoing.',
    department: 'electricity',
    severity: 'high',
    status: 'in-progress',
    location: 'Rohini Sector 15, Delhi',
    latitude: 28.7320,
    longitude: 77.0880,
    submitted_by: 'Priya Sharma',
    contact_info: 'priya.sharma@email.com'
  },
  {
    title: 'Potholed Roads in Bangalore',
    description: 'Multiple large potholes on Outer Ring Road causing accidents and vehicle damage. Especially dangerous during monsoon season.',
    department: 'roads',
    severity: 'high',
    status: 'pending',
    location: 'Outer Ring Road, Bangalore',
    latitude: 12.9716,
    longitude: 77.5946,
    submitted_by: 'Arun Patel',
    contact_info: 'arun.patel@bangalore.gov.in'
  },
  {
    title: 'Sewage Overflow in Chennai',
    description: 'Sewage overflowing from manholes in T. Nagar area causing health hazards and foul odor. Mosquito breeding concern.',
    department: 'water',
    severity: 'high',
    status: 'in-progress',
    location: 'T. Nagar, Chennai',
    latitude: 13.0827,
    longitude: 80.2707,
    submitted_by: 'Kavita Singh',
    contact_info: 'kavita.singh@email.com'
  },
  {
    title: 'Street Light Malfunction in Hyderabad',
    description: 'Over 50 street lights not working in Jubilee Hills area. Increased crime and safety concerns at night.',
    department: 'electricity',
    severity: 'medium',
    status: 'pending',
    location: 'Jubilee Hills, Hyderabad',
    latitude: 17.3850,
    longitude: 78.4867,
    submitted_by: 'Mohammed Ali',
    contact_info: 'mohammed.ali@hyderabad.gov.in'
  }
];

const additionalProjects = [
  {
    title: 'Mumbai Metro Line 3 Extension',
    description: 'Extension of Mumbai Metro from Aarey to CSMT. Includes elevated tracks, stations, and integration with existing rail network.',
    department: 'roads',
    status: 'active',
    priority: 'high',
    location: 'Mumbai Suburban',
    latitude: 19.0760,
    longitude: 72.8777,
    start_date: '2025-06-01',
    end_date: '2027-12-31',
    budget: 450000000.00,
    progress: 65
  },
  {
    title: 'Delhi Water Supply Modernization',
    description: 'Upgrade water treatment plants and distribution network in Delhi NCR. Includes smart metering and leak detection systems.',
    department: 'water',
    status: 'active',
    priority: 'high',
    location: 'Delhi NCR',
    latitude: 28.7041,
    longitude: 77.1025,
    start_date: '2025-08-15',
    end_date: '2027-06-30',
    budget: 280000000.00,
    progress: 40
  },
  {
    title: 'Bangalore Solar City Initiative',
    description: 'Install solar panels on 500+ government buildings and create microgrids for energy independence.',
    department: 'electricity',
    status: 'planning',
    priority: 'medium',
    location: 'Bangalore City',
    latitude: 12.9716,
    longitude: 77.5946,
    start_date: '2026-03-01',
    end_date: '2028-02-28',
    budget: 150000000.00,
    progress: 15
  },
  {
    title: 'Chennai Coastal Protection',
    description: 'Build sea walls and flood barriers along Chennai coastline to protect against rising sea levels and storm surges.',
    department: 'water',
    status: 'active',
    priority: 'critical',
    location: 'Chennai Coastline',
    latitude: 13.0827,
    longitude: 80.2707,
    start_date: '2025-09-01',
    end_date: '2027-08-31',
    budget: 320000000.00,
    progress: 55
  },
  {
    title: 'Hyderabad Smart Traffic System',
    description: 'Implement AI-powered traffic management system with 200+ smart signals and real-time congestion monitoring.',
    department: 'roads',
    status: 'active',
    priority: 'high',
    location: 'Hyderabad City',
    latitude: 17.3850,
    longitude: 78.4867,
    start_date: '2025-11-15',
    end_date: '2027-04-30',
    budget: 180000000.00,
    progress: 70
  }
];

const additionalAlerts = [
  {
    title: 'Monsoon Flood Warning - Mumbai',
    description: 'Heavy monsoon rains expected to cause severe flooding in low-lying areas of Mumbai. Residents advised to secure belongings.',
    severity: 'critical',
    category: 'Weather',
    location: 'Mumbai Coastal Areas',
    latitude: 19.0760,
    longitude: 72.8777,
    status: 'active',
    reported_by: 'India Meteorological Department'
  },
  {
    title: 'Heatwave Alert - Delhi NCR',
    description: 'Extreme heatwave conditions with temperatures exceeding 45°C. Risk of heatstroke and water shortage.',
    severity: 'high',
    category: 'Weather',
    location: 'Delhi NCR Region',
    latitude: 28.7041,
    longitude: 77.1025,
    status: 'active',
    reported_by: 'Delhi Disaster Management'
  },
  {
    title: 'Construction Crane Collapse Risk',
    description: 'Unstable construction crane at Bandra Worli Sea Link project site. High winds pose collapse risk.',
    severity: 'critical',
    category: 'Safety',
    location: 'Bandra Worli Sea Link',
    latitude: 19.0760,
    longitude: 72.8777,
    status: 'monitoring',
    reported_by: 'BMC Safety Inspector'
  },
  {
    title: 'Industrial Chemical Spill - Surat',
    description: 'Chemical spill from textile dyeing unit contaminating groundwater. Health risk to nearby communities.',
    severity: 'critical',
    category: 'Environmental',
    location: 'Surat Industrial Zone',
    latitude: 21.1702,
    longitude: 72.8311,
    status: 'active',
    reported_by: 'Gujarat Pollution Control'
  },
  {
    title: 'Air Pollution Crisis - Delhi',
    description: 'PM2.5 levels exceeding safe limits by 8x. Respiratory health emergency declared.',
    severity: 'critical',
    category: 'Health',
    location: 'Delhi Metropolitan Area',
    latitude: 28.7041,
    longitude: 77.1025,
    status: 'active',
    reported_by: 'Central Pollution Control Board'
  }
];

async function populateAdditionalData() {
  try {
    console.log('Inserting additional complaints...');
    const { error: complaintsError } = await supabase
      .from('complaints')
      .insert(additionalComplaints);

    if (complaintsError) {
      console.error('Error inserting complaints:', complaintsError);
    } else {
      console.log('✅ Additional complaints inserted successfully');
    }

    console.log('Inserting additional projects...');
    const { error: projectsError } = await supabase
      .from('projects')
      .insert(additionalProjects);

    if (projectsError) {
      console.error('Error inserting projects:', projectsError);
    } else {
      console.log('✅ Additional projects inserted successfully');
    }

    console.log('Inserting additional alerts...');
    const { error: alertsError } = await supabase
      .from('risk_alerts')
      .insert(additionalAlerts);

    if (alertsError) {
      console.error('Error inserting alerts:', alertsError);
    } else {
      console.log('✅ Additional alerts inserted successfully');
    }

    console.log('🎉 All additional dummy data inserted successfully!');

  } catch (error) {
    console.error('Error populating data:', error);
  }
}

// Run the population script
populateAdditionalData();