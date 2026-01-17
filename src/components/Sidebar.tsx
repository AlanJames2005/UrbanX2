import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  FileText,
  AlertTriangle,
  Settings,
  MessageSquare,
  Building2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useSidebar } from '../contexts/SidebarContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Map View', href: '/map', icon: Map },
  { name: 'Complaints', href: '/complaints', icon: MessageSquare },
  { name: 'Risk Alerts', href: '/alerts', icon: AlertTriangle },
  { name: 'Report Issue', href: '/report', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const { isOpen, toggle } = useSidebar();

  return (
    <>
      <aside
        className={`fixed left-0 top-0 z-40 h-screen bg-[#111111] border-r border-[#1a1a1a] transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-[#1a1a1a]">
            {isOpen && (
              <div className="flex items-center gap-2">
                <Building2 className="w-8 h-8 text-[#3b82f6]" />
                <span className="text-xl font-bold text-white">UrbanX</span>
              </div>
            )}
            {!isOpen && (
              <Building2 className="w-8 h-8 text-[#3b82f6] mx-auto" />
            )}
            <button
              onClick={toggle}
              className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors absolute right-2"
            >
              {isOpen ? (
                <ChevronLeft className="w-5 h-5 text-[#a1a1aa]" />
              ) : (
                <ChevronRight className="w-5 h-5 text-[#a1a1aa]" />
              )}
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-custom">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''} ${!isOpen ? 'justify-center' : ''}`
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span>{item.name}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-[#1a1a1a]">
            <div className={`${isOpen ? 'flex items-center gap-3' : 'flex justify-center'}`}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-white font-semibold">
                A
              </div>
              {isOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">Admin User</p>
                  <p className="text-xs text-[#71717a] truncate">admin@urbanx.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      <div
        className={`transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}
      />
    </>
  );
}
