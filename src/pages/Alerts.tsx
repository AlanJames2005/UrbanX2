import { useEffect, useState, useCallback } from 'react';
import { AlertTriangle, MapPin, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type RiskAlert = Database['public']['Tables']['risk_alerts']['Row'];

export function Alerts() {
  const [alerts, setAlerts] = useState<RiskAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const fetchAlerts = useCallback(async () => {
    try {
      let query = supabase.from('risk_alerts').select('*').order('reported_at', { ascending: false });

      if (severityFilter !== 'all') {
        query = query.eq('severity', severityFilter);
      }
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setAlerts(data || []);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  }, [severityFilter, statusFilter]);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-[#ef4444]/10 border-[#ef4444]/30 text-[#ef4444]';
      case 'high':
        return 'bg-[#f59e0b]/10 border-[#f59e0b]/30 text-[#f59e0b]';
      case 'medium':
        return 'bg-[#3b82f6]/10 border-[#3b82f6]/30 text-[#3b82f6]';
      case 'low':
        return 'bg-[#10b981]/10 border-[#10b981]/30 text-[#10b981]';
      default:
        return 'bg-[#71717a]/10 border-[#71717a]/30 text-[#71717a]';
    }
  };

  const getSeverityIcon = (severity: string) => {
    return severity === 'critical' || severity === 'high' ? '🚨' : severity === 'medium' ? '⚠️' : 'ℹ️';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#3b82f6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#a1a1aa]">Loading alerts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Risk Alerts</h1>
          <p className="text-[#a1a1aa]">Monitor and respond to city-wide alerts</p>
        </div>
        <button className="btn-primary">Report Alert</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {['critical', 'high', 'medium', 'low'].map((severity) => (
          <div key={severity} className={`card-modern ${getSeverityColor(severity)} border`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium capitalize">{severity}</span>
              <span className="text-2xl">{getSeverityIcon(severity)}</span>
            </div>
            <p className="text-3xl font-bold">
              {alerts.filter((a) => a.severity === severity).length}
            </p>
          </div>
        ))}
      </div>

      <div className="card-modern">
        <div className="flex gap-4 mb-6">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="input-modern w-auto"
          >
            <option value="all">All Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-modern w-auto"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="monitoring">Monitoring</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getSeverityIcon(alert.severity)}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{alert.title}</h3>
                    <p className="text-sm">
                      <span className="px-2 py-1 rounded text-xs font-medium uppercase">
                        {alert.category}
                      </span>
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#1a1a1a] text-white">
                  {alert.status}
                </span>
              </div>

              <p className="text-[#a1a1aa] text-sm mb-3">{alert.description}</p>

              <div className="flex flex-wrap gap-4 text-xs text-[#71717a]">
                <span className="flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  {alert.location || 'No location'}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  Reported: {new Date(alert.reported_at).toLocaleDateString()}
                </span>
                {alert.reported_by && (
                  <span>Reported by: {alert.reported_by}</span>
                )}
              </div>
            </div>
          ))}

          {alerts.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-[#71717a] mx-auto mb-3" />
              <p className="text-[#a1a1aa]">No alerts found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
