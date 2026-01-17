import { Bell, Search, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-[#1a1a1a]">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#71717a]" />
            <input
              type="text"
              placeholder="Search projects, complaints, alerts..."
              className="w-full pl-10 pr-4 py-2 bg-[#111111] border border-[#1a1a1a] rounded-lg text-white placeholder:text-[#71717a] focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 ml-6">
          <button className="relative p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-[#a1a1aa]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#ef4444] rounded-full"></span>
          </button>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 hover:bg-[#1a1a1a] rounded-lg transition-colors text-[#a1a1aa] hover:text-white"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
