import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useSidebar } from '../contexts/SidebarContext';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Sidebar />
      <div
        className={`transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}
      >
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
