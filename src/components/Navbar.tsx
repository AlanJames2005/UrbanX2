import { NavLink, Link } from 'react-router-dom';
import { Bell, Search, LogOut, LayoutDashboard, Map, FileText, AlertTriangle, Settings, MessageSquare, Building2, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const navigation = [
  { name: 'dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'map view', href: '/map', icon: Map },
  { name: 'complaints', href: '/complaints', icon: MessageSquare },
  { name: 'risk alerts', href: '/alerts', icon: AlertTriangle },
  { name: 'report issue', href: '/report', icon: FileText },
  { name: 'settings', href: '/settings', icon: Settings },
];

export function Navbar() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAccountClick = () => {
    navigate('/settings'); // Navigate to settings page for account editing
    setIsDropdownOpen(false);
  };

  return (
    <header className="w-full flex justify-center py-8">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 mr-8">
          <Building2 className="w-8 h-8 text-white/80" />
          <span className="navbar-brand">urbanx</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-8">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `navbar-link ${isActive ? 'active' : ''}`
              }
            >
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 ml-8">
          <div className="hidden lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="search..."
                className="navbar-search"
              />
            </div>
          </div>

          <button className="navbar-icon-button">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-400 rounded-full"></span>
          </button>

          {/* Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="navbar-account-button"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                ></div>
                <div className="navbar-dropdown">
                  <button
                    onClick={handleAccountClick}
                    className="navbar-dropdown-item"
                  >
                    <User className="w-4 h-4" />
                    <span>account details</span>
                  </button>
                  <div className="navbar-dropdown-divider"></div>
                  <button
                    onClick={handleSignOut}
                    className="navbar-dropdown-item"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>sign out</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
