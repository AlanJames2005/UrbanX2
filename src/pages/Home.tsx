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
    <div>
      <div className="animated-bg"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center justify-center mb-6">
            <img src="/logo.png" alt="UrbanX Logo" className="w-20 h-20 object-contain" />
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

          <div className="mt-12 pt-8 border-t border-[#1a1a1a]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#10b981] mb-1">12</p>
                <p className="text-sm text-[#a1a1aa]">Active Projects</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#3b82f6] mb-1">15</p>
                <p className="text-sm text-[#a1a1aa]">Complaints Resolved</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#f59e0b] mb-1">11</p>
                <p className="text-sm text-[#a1a1aa]">Risk Alerts Today</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#8b5cf6] mb-1">3</p>
                <p className="text-sm text-[#a1a1aa]">Departments</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Success Stories</h2>
            <p className="text-[#a1a1aa]">See how UrbanX is transforming cities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-modern text-center stagger-1">
              <div className="w-16 h-16 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Metro City</h3>
              <p className="text-[#a1a1aa] mb-4">
                "UrbanX helped us coordinate 15 infrastructure projects simultaneously, saving $2.3M in avoided rework and reducing completion time by 35%."
              </p>
              <p className="text-sm text-[#71717a]">City Infrastructure Director</p>
            </div>

            <div className="card-modern text-center stagger-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Coastal Town</h3>
              <p className="text-[#a1a1aa] mb-4">
                "Real-time risk monitoring prevented 3 potential safety incidents. Our response time improved from 45 minutes to under 10 minutes."
              </p>
              <p className="text-sm text-[#71717a]">Emergency Services Manager</p>
            </div>

            <div className="card-modern text-center stagger-3">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">River Valley</h3>
              <p className="text-[#a1a1aa] mb-4">
                "Citizen complaints are now resolved 60% faster. The interactive map helps us prioritize issues by location and urgency."
              </p>
              <p className="text-sm text-[#71717a]">Public Services Coordinator</p>
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
