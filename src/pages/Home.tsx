import { Link } from 'react-router-dom';
import { Map, MessageSquare, AlertTriangle, TrendingUp, Shield } from 'lucide-react';

export function Home() {
  const features = [
    {
      icon: Map,
      title: 'Interactive Map',
      description: 'Visualize all city projects, complaints, and alerts on a real-time map',
    },
    {
      icon: MessageSquare,
      title: 'Complaint Management',
      description: 'Efficient system for tracking and resolving citizen complaints',
    },
    {
      icon: AlertTriangle,
      title: 'Risk Monitoring',
      description: 'Real-time alerts for safety and infrastructure concerns',
    },
    {
      icon: TrendingUp,
      title: 'Analytics Dashboard',
      description: 'Data-driven insights for better city planning and decision making',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="animated-bg"></div>
      <nav className="border-b border-[#1a1a1a] bg-[#0a0a0a]/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="UrbanX Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold text-white">UrbanX</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/register" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] mb-6 float hero-glow">
            <img src="/logo.png" alt="UrbanX Logo" className="w-10 h-10 object-contain" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="gradient-text">Smart City Management</span>
            <br />
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-transparent bg-clip-text">
              Made Simple
            </span>
          </h1>
          <p className="text-xl text-[#a1a1aa] max-w-2xl mx-auto mb-8 slide-up">
            UrbanX brings departments together early in the planning stage, spots potential clashes before work begins, and helps coordinate smarter infrastructure projects.
          </p>
          <div className="flex items-center justify-center gap-4 slide-up">
            <Link to="/register" className="btn-primary text-lg px-8 py-4 hover:shadow-2xl hover:shadow-[#3b82f6]/30">
              Get Started
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card stagger-${index + 1}`}
            >
              <div className="flex items-start gap-4">
                <div className="feature-icon">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-[#a1a1aa]">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card-modern bg-gradient-to-br from-[#3b82f6]/10 to-[#8b5cf6]/10 border-[#3b82f6]/20 text-center py-16 slide-up">
          <Shield className="w-16 h-16 text-[#3b82f6] mx-auto mb-6 float" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Reduces Wasted Infrastructure Spending
          </h2>
          <p className="text-xl text-[#a1a1aa] max-w-2xl mx-auto mb-8">
            AI-powered coordination prevents repeated road digging, reduces project delays by 20-40%, and saves millions in unnecessary costs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="stagger-1">
              <p className="text-4xl font-bold gradient-text mb-2">50k-200k</p>
              <p className="text-[#a1a1aa]">Saved per avoided rework</p>
            </div>
            <div className="stagger-2">
              <p className="text-4xl font-bold gradient-text mb-2">20-40%</p>
              <p className="text-[#a1a1aa]">Reduction in project delays</p>
            </div>
            <div className="stagger-3">
              <p className="text-4xl font-bold gradient-text mb-2">30%</p>
              <p className="text-[#a1a1aa]">Less avoidable rework</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-[#1a1a1a] py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-[#71717a]">
          <p>Powered by UrbanX - Smart City Management Platform</p>
        </div>
      </footer>
    </div>
  );
}
