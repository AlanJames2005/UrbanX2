import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const PopulateData: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const populateData = async () => {
    setLoading(true);
    setMessage('Starting data population...');

    try {
      // Additional complaints
      const complaints = [
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
        }
      ];

      // Additional projects
      const projects = [
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
        }
      ];

      // Additional alerts
      const alerts = [
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
        }
      ];

      // Insert complaints
      setMessage('Inserting complaints...');
      const { error: complaintsError } = await supabase
        .from('complaints')
        .insert(complaints);

      if (complaintsError) throw complaintsError;

      // Insert projects
      setMessage('Inserting projects...');
      const { error: projectsError } = await supabase
        .from('projects')
        .insert(projects);

      if (projectsError) throw projectsError;

      // Insert alerts
      setMessage('Inserting alerts...');
      const { error: alertsError } = await supabase
        .from('risk_alerts')
        .insert(alerts);

      if (alertsError) throw alertsError;

      setMessage('✅ All additional dummy data inserted successfully!');

    } catch (error) {
      console.error('Error:', error);
      setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Populate Additional Dummy Data</h2>
      <p className="mb-4 text-gray-600">
        This will add sample complaints, projects, and alerts with Indian locations to the database.
      </p>
      <button
        onClick={populateData}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium"
      >
        {loading ? 'Populating...' : 'Populate Data'}
      </button>
      {message && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <pre className="whitespace-pre-wrap text-sm">{message}</pre>
        </div>
      )}
    </div>
  );
};

export default PopulateData;