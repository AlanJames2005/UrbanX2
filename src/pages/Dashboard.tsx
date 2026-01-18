import { useEffect, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Briefcase,
  MessageSquare,
  MapPin,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type Complaint = Database['public']['Tables']['complaints']['Row'];

interface Stats {
  totalProjects: number;
  activeProjects: number;
  totalComplaints: number;
  openComplaints: number;
  activeAlerts: number;
  resolvedToday: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    activeProjects: 0,
    totalComplaints: 0,
    openComplaints: 0,
    activeAlerts: 0,
    resolvedToday: 0,
  });
  const [recentActivities, setRecentActivities] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [
        projectsRes,
        activeProjectsRes,
        complaintsRes,
        openComplaintsRes,
        alertsRes,
        recentComplaintsRes,
      ] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('complaints').select('id', { count: 'exact', head: true }),
        supabase.from('complaints').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('risk_alerts').select('id', { count: 'exact', head: true }).eq('status', 'active'),
        supabase
          .from('complaints')
          .select('*')
          .order('submitted_at', { ascending: false })
          .limit(5),
      ]);

      setStats({
        totalProjects: projectsRes.count || 0,
        activeProjects: activeProjectsRes.count || 0,
        totalComplaints: complaintsRes.count || 0,
        openComplaints: openComplaintsRes.count || 0,
        activeAlerts: alertsRes.count || 0,
        resolvedToday: 12,
      });

      setRecentActivities(recentComplaintsRes.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      total: stats.totalProjects,
      icon: Briefcase,
      color: 'from-[#3b82f6] to-[#2563eb]',
      bgColor: 'bg-[#3b82f6]/10',
      borderColor: 'border-[#3b82f6]/20',
    },
    {
      title: 'Open Complaints',
      value: stats.openComplaints,
      total: stats.totalComplaints,
      icon: MessageSquare,
      color: 'from-[#f59e0b] to-[#d97706]',
      bgColor: 'bg-[#f59e0b]/10',
      borderColor: 'border-[#f59e0b]/20',
    },
    {
      title: 'Active Alerts',
      value: stats.activeAlerts,
      total: stats.activeAlerts,
      icon: AlertTriangle,
      color: 'from-[#ef4444] to-[#dc2626]',
      bgColor: 'bg-[#ef4444]/10',
      borderColor: 'border-[#ef4444]/20',
    },
    {
      title: 'Resolved Today',
      value: stats.resolvedToday,
      total: stats.resolvedToday,
      icon: CheckCircle,
      color: 'from-[#10b981] to-[#059669]',
      bgColor: 'bg-[#10b981]/10',
      borderColor: 'border-[#10b981]/20',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#3b82f6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#a1a1aa]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-[#a1a1aa]">Overview of city operations and activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`card-modern ${stat.bgColor} border ${stat.borderColor} slide-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#a1a1aa] text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs text-[#71717a]">of {stat.total} total</p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-[#10b981]" />
              <span className="text-[#10b981]">+12%</span>
              <span className="text-[#71717a]">from last week</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-modern">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
            <button className="text-[#3b82f6] hover:text-[#2563eb] text-sm transition-colors">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#3b82f6]/30 transition-all"
              >
                <div className="flex-shrink-0 p-2 rounded-lg bg-[#3b82f6]/10">
                  <MessageSquare className="w-5 h-5 text-[#3b82f6]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{activity.title}</p>
                  <p className="text-sm text-[#71717a] mt-1 line-clamp-2">{activity.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-[#71717a]">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      {activity.location || 'No location'}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {new Date(activity.submitted_at).toLocaleDateString()}
                    </span>
                    <span className={`badge badge-${activity.severity === 'high' ? 'error' : activity.severity === 'medium' ? 'warning' : 'info'}`}>
                      {activity.severity}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {recentActivities.length === 0 && (
              <div className="text-center py-12">
                <Activity className="w-12 h-12 text-[#71717a] mx-auto mb-3" />
                <p className="text-[#a1a1aa]">No recent activity</p>
              </div>
            )}
          </div>
        </div>

        <div className="card-modern">
          <h2 className="text-xl font-semibold text-white mb-6">System Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0a0a0a]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></div>
                <span className="text-white">Database</span>
              </div>
              <span className="text-xs text-[#10b981]">Operational</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0a0a0a]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></div>
                <span className="text-white">Map Service</span>
              </div>
              <span className="text-xs text-[#10b981]">Operational</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0a0a0a]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></div>
                <span className="text-white">AI Engine</span>
              </div>
              <span className="text-xs text-[#10b981]">Operational</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0a0a0a]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse"></div>
                <span className="text-white">Analytics</span>
              </div>
              <span className="text-xs text-[#f59e0b]">Degraded</span>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-gradient-to-br from-[#3b82f6]/10 to-[#8b5cf6]/10 border border-[#3b82f6]/20">
            <h3 className="text-white font-medium mb-2">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#3b82f6]/10 text-sm text-[#a1a1aa] hover:text-white transition-all">
                View All Projects
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#3b82f6]/10 text-sm text-[#a1a1aa] hover:text-white transition-all">
                Export Report
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#3b82f6]/10 text-sm text-[#a1a1aa] hover:text-white transition-all">
                System Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
