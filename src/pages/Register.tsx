import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create account';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)]">
      <div className="animated-bg"></div>
      
      {/* Main Content */}
      <div className="pb-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 slide-up">
            <div className="inline-flex items-center justify-center mb-6">
              <img src="/logo.png" alt="UrbanX Logo" className="w-16 h-16 object-contain" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-[#a1a1aa]">Join the UrbanX platform</p>
          </div>

          <div className="card-modern slide-up" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2 p-4 bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-lg animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-[#ef4444]" />
                  <p className="text-sm text-[#ef4444]">{error}</p>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 p-4 bg-[#10b981]/10 border border-[#10b981]/20 rounded-lg animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-[#10b981]" />
                  <p className="text-sm text-[#10b981]">Account created successfully!</p>
                </div>
              )}

              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#71717a]" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-modern pl-12"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#71717a]" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-modern pl-12"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#71717a]" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-modern pl-12"
                    placeholder="At least 6 characters"
                    required
                  />
                </div>
              </div>

              <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#71717a]" />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-modern pl-12"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="btn-primary w-full animate-fade-in"
                style={{ animationDelay: '0.7s' }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <p className="text-sm text-[#a1a1aa]">
                Welcome to UrbanX Smart City Management Platform
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-[#71717a] mt-8 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            Powered by UrbanX - Smart City Management Platform
          </p>
        </div>
      </div>
    </div>
  );
}
