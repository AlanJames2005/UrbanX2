import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';
import { LocationSelector } from '../components/LocationSelector';

export function Report() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: '',
    severity: 'medium',
    location: '',
    latitude: null as number | null,
    longitude: null as number | null,
    submittedBy: '',
    contactInfo: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const departments = [
    { value: 'roads', label: 'Roads & Transportation' },
    { value: 'water', label: 'Water Supply' },
    { value: 'electricity', label: 'Electricity' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const insertData: Database['public']['Tables']['complaints']['Insert'] = {
        title: formData.title,
        description: formData.description,
        department: formData.department,
        severity: formData.severity as 'high' | 'medium' | 'low',
        location: formData.location,
        latitude: formData.latitude,
        longitude: formData.longitude,
        submitted_by: formData.submittedBy,
        contact_info: formData.contactInfo,
      };

      const { error } = await supabase.from('complaints').insert(insertData);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        navigate('/complaints');
      }, 2000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit complaint';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationSelect = (location: { address: string; latitude: number; longitude: number }) => {
    setFormData({
      ...formData,
      location: location.address,
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };

  return (
    <div className="max-w-3xl mx-auto fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Report an Issue</h1>
        <p className="text-[#a1a1aa]">Submit a complaint or report a problem in your area</p>
      </div>

      {success && (
        <div className="card-modern bg-[#10b981]/10 border-[#10b981]/30 mb-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-[#10b981]" />
            <div>
              <h3 className="text-white font-semibold">Complaint Submitted Successfully!</h3>
              <p className="text-sm text-[#a1a1aa]">Redirecting to complaints page...</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="card-modern bg-[#ef4444]/10 border-[#ef4444]/30 mb-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-[#ef4444]" />
            <div>
              <h3 className="text-white font-semibold">Error</h3>
              <p className="text-sm text-[#a1a1aa]">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card-modern space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
            Issue Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="input-modern"
            placeholder="Brief description of the issue"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
            Detailed Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="input-modern"
            placeholder="Provide detailed information about the issue"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-white mb-2">
              Department
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="input-modern"
              required
            >
              <option value="">Select a department</option>
              {departments.map((dept) => (
                <option key={dept.value} value={dept.value}>
                  {dept.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="severity" className="block text-sm font-medium text-white mb-2">
              Severity
            </label>
            <select
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className="input-modern"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <LocationSelector onLocationSelect={handleLocationSelect} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="submittedBy" className="block text-sm font-medium text-white mb-2">
              Your Name
            </label>
            <input
              id="submittedBy"
              name="submittedBy"
              type="text"
              value={formData.submittedBy}
              onChange={handleChange}
              className="input-modern"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="contactInfo" className="block text-sm font-medium text-white mb-2">
              Contact Information
            </label>
            <input
              id="contactInfo"
              name="contactInfo"
              type="text"
              value={formData.contactInfo}
              onChange={handleChange}
              className="input-modern"
              placeholder="Email or phone number"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/complaints')}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || success}
            className="btn-primary flex-1"
          >
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </div>
      </form>
    </div>
  );
}
