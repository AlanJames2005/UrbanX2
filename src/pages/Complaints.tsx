import { useEffect, useState } from 'react';
import { MessageSquare, MapPin, Clock, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Complaints() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');

  useEffect(() => {
    fetchComplaints();
  }, [statusFilter, severityFilter]);

  const fetchComplaints = async () => {
    try {
      let query = supabase.from('complaints').select('*').order('submitted_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      if (severityFilter !== 'all') {
        query = query.eq('severity', severityFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setComplaints(data || []);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'badge-error';
      case 'medium':
        return 'badge-warning';
      case 'low':
        return 'badge-info';
      default:
        return 'badge-info';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'badge-success';
      case 'in-progress':
        return 'badge-info';
      case 'pending':
        return 'badge-warning';
      case 'closed':
        return 'badge-success';
      default:
        return 'badge-info';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#3b82f6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#a1a1aa]">Loading complaints...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Complaints</h1>
          <p className="text-[#a1a1aa]">Manage citizen complaints and feedback</p>
        </div>
        <button className="btn-primary">New Complaint</button>
      </div>

      <div className="card-modern">
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#71717a]" />
              <input
                type="text"
                placeholder="Search complaints..."
                className="input-modern pl-10"
              />
            </div>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-modern w-auto"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="input-modern w-auto"
          >
            <option value="all">All Severity</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="space-y-4">
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              className="p-6 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#3b82f6]/30 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{complaint.title}</h3>
                    <span className={`badge ${getSeverityColor(complaint.severity)}`}>
                      {complaint.severity}
                    </span>
                    <span className={`badge ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </div>
                  <p className="text-[#a1a1aa] text-sm mb-3">{complaint.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-[#71717a]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {complaint.location || 'No location'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(complaint.submitted_at).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {complaint.department}
                    </span>
                  </div>
                </div>
              </div>

              {complaint.assigned_to && (
                <div className="flex items-center gap-2 text-sm text-[#a1a1aa]">
                  <span>Assigned to:</span>
                  <span className="text-[#3b82f6]">{complaint.assigned_to}</span>
                </div>
              )}
            </div>
          ))}

          {complaints.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-[#71717a] mx-auto mb-3" />
              <p className="text-[#a1a1aa]">No complaints found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
