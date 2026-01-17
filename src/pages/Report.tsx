import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Report() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: '',
    severity: 'medium',
    location: '',
    latitude: '',
    longitude: '',
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
    { value: 'telecom', label: 'Telecommunications' },
    { value: 'waste', label: 'Waste Management' },
    { value: 'safety', label: 'Public Safety' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.from('complaints').insert({
        title: formData.title,
        description: formData.description,
        department: formData.department,
        severity: formData.severity as 'high' | 'medium' | 'low',
        location: formData.location,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        submitted_by: formData.submittedBy,
        contact_info: formData.contactInfo,
      });

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

  return (
    <div className="max-w-3xl mx-auto fade-in">
      <div className="mb-8">
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

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-white mb-2">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#71717a]" />
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              className="input-modern pl-10"
              placeholder="Street address or landmark"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-white mb-2">
              Latitude (Optional)
            </label>
            <input
              id="latitude"
              name="latitude"
              type="text"
              value={formData.latitude}
              onChange={handleChange}
              className="input-modern"
              placeholder="e.g., 40.7128"
            />
          </div>

          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-white mb-2">
              Longitude (Optional)
            </label>
            <input
              id="longitude"
              name="longitude"
              type="text"
              value={formData.longitude}
              onChange={handleChange}
              className="input-modern"
              placeholder="e.g., -74.0060"
            />
          </div>
        </div>

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
