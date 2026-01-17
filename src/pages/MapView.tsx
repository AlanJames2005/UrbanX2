import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { supabase } from '../lib/supabase';
import { MapPin, AlertTriangle, Briefcase } from 'lucide-react';
import { Database } from '../types/database';
import 'leaflet/dist/leaflet.css';

const createCustomIcon = (color: string) => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="32" height="32">
        <path d="M12 0C7.802 0 4.403 3.403 4.403 7.602c0 5.298 7.597 16.398 7.597 16.398s7.597-11.1 7.597-16.398C19.597 3.403 16.198 0 12 0zm0 10.5c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
      </svg>
    `)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const icons = {
  complaint: createCustomIcon('#f59e0b'),
  project: createCustomIcon('#3b82f6'),
  alert: createCustomIcon('#ef4444'),
};

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}

export function MapView() {
  const [complaints, setComplaints] = useState<Database['public']['Tables']['complaints']['Row'][]>([]);
  const [projects, setProjects] = useState<Database['public']['Tables']['projects']['Row'][]>([]);
  const [alerts, setAlerts] = useState<Database['public']['Tables']['risk_alerts']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    complaints: true,
    projects: true,
    alerts: true,
  });
  const [center, setCenter] = useState<[number, number]>([40.7128, -74.0060]);

  useEffect(() => {
    fetchMapData();
  }, []);

  const fetchMapData = async () => {
    try {
      const [complaintsRes, projectsRes, alertsRes] = await Promise.all([
        supabase
          .from('complaints')
          .select('*')
          .not('latitude', 'is', null)
          .not('longitude', 'is', null),
        supabase
          .from('projects')
          .select('*')
          .not('latitude', 'is', null)
          .not('longitude', 'is', null),
        supabase
          .from('risk_alerts')
          .select('*')
          .not('latitude', 'is', null)
          .not('longitude', 'is', null),
      ]);

      const complaintsData = complaintsRes.data as Database['public']['Tables']['complaints']['Row'][] || [];
      const projectsData = projectsRes.data as Database['public']['Tables']['projects']['Row'][] || [];
      const alertsData = alertsRes.data as Database['public']['Tables']['risk_alerts']['Row'][] || [];

      setComplaints(complaintsData);
      setProjects(projectsData);
      setAlerts(alertsData);

      if (complaintsData.length > 0) {
        const firstItem = complaintsData.find(item => item.latitude !== null && item.longitude !== null);
        if (firstItem) {
          setCenter([firstItem.latitude!, firstItem.longitude!]);
        }
      }
    } catch (error) {
      console.error('Error fetching map data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFilter = (key: 'complaints' | 'projects' | 'alerts') => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#3b82f6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#a1a1aa]">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Interactive Map</h1>
          <p className="text-[#a1a1aa]">View all complaints, projects, and alerts</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => toggleFilter('complaints')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              filters.complaints
                ? 'bg-[#f59e0b]/10 border-[#f59e0b]/30 text-[#f59e0b]'
                : 'bg-[#1a1a1a] border-[#1a1a1a] text-[#71717a]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Complaints
          </button>
          <button
            onClick={() => toggleFilter('projects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              filters.projects
                ? 'bg-[#3b82f6]/10 border-[#3b82f6]/30 text-[#3b82f6]'
                : 'bg-[#1a1a1a] border-[#1a1a1a] text-[#71717a]'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Projects
          </button>
          <button
            onClick={() => toggleFilter('alerts')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              filters.alerts
                ? 'bg-[#ef4444]/10 border-[#ef4444]/30 text-[#ef4444]'
                : 'bg-[#1a1a1a] border-[#1a1a1a] text-[#71717a]'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            Alerts
          </button>
        </div>
      </div>

      <div className="card-modern p-0 overflow-hidden" style={{ height: '600px' }}>
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          className="rounded-lg"
        >
          <MapUpdater center={center} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filters.complaints &&
            complaints.map((complaint) => (
              <Marker
                key={`complaint-${complaint.id}`}
                position={[complaint.latitude!, complaint.longitude!]}
                icon={icons.complaint}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-sm mb-1">{complaint.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{complaint.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded">
                        Complaint
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">
                        {complaint.severity}
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

          {filters.projects &&
            projects.map((project) => (
              <Marker
                key={`project-${project.id}`}
                position={[project.latitude!, project.longitude!]}
                icon={icons.project}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-sm mb-1">{project.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{project.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        Project
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Progress: {project.progress}%</p>
                  </div>
                </Popup>
              </Marker>
            ))}

          {filters.alerts &&
            alerts.map((alert) => (
              <Marker
                key={`alert-${alert.id}`}
                position={[alert.latitude!, alert.longitude!]}
                icon={icons.alert}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-sm mb-1">{alert.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{alert.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded">
                        Alert
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">
                        {alert.severity}
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-modern bg-[#f59e0b]/5 border-[#f59e0b]/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#f59e0b]/10">
              <MapPin className="w-5 h-5 text-[#f59e0b]" />
            </div>
            <h3 className="text-lg font-semibold text-white">Complaints</h3>
          </div>
          <p className="text-3xl font-bold text-white mb-2">{complaints.length}</p>
          <p className="text-sm text-[#a1a1aa]">Total on map</p>
        </div>

        <div className="card-modern bg-[#3b82f6]/5 border-[#3b82f6]/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#3b82f6]/10">
              <Briefcase className="w-5 h-5 text-[#3b82f6]" />
            </div>
            <h3 className="text-lg font-semibold text-white">Projects</h3>
          </div>
          <p className="text-3xl font-bold text-white mb-2">{projects.length}</p>
          <p className="text-sm text-[#a1a1aa]">Total on map</p>
        </div>

        <div className="card-modern bg-[#ef4444]/5 border-[#ef4444]/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#ef4444]/10">
              <AlertTriangle className="w-5 h-5 text-[#ef4444]" />
            </div>
            <h3 className="text-lg font-semibold text-white">Risk Alerts</h3>
          </div>
          <p className="text-3xl font-bold text-white mb-2">{alerts.length}</p>
          <p className="text-sm text-[#a1a1aa]">Total on map</p>
        </div>
      </div>
    </div>
  );
}
