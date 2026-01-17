import { Bell, Lock, User } from 'lucide-react';

export function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-[#a1a1aa]">Manage your account and preferences</p>
      </div>

      <div className="card-modern">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#1a1a1a]">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6]">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
            <p className="text-sm text-[#a1a1aa]">Update your personal information</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Full Name</label>
            <input type="text" className="input-modern" placeholder="Admin User" />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Email Address</label>
            <input type="email" className="input-modern" placeholder="admin@urbanx.com" />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Department</label>
            <select className="input-modern">
              <option>Administration</option>
              <option>Roads & Transportation</option>
              <option>Water Supply</option>
              <option>Electricity</option>
            </select>
          </div>

          <button className="btn-primary">Save Changes</button>
        </div>
      </div>

      <div className="card-modern">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#1a1a1a]">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6]">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Security</h2>
            <p className="text-sm text-[#a1a1aa]">Manage your password and security settings</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Current Password</label>
            <input type="password" className="input-modern" placeholder="Enter current password" />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">New Password</label>
            <input type="password" className="input-modern" placeholder="Enter new password" />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Confirm New Password</label>
            <input type="password" className="input-modern" placeholder="Confirm new password" />
          </div>

          <button className="btn-primary">Update Password</button>
        </div>
      </div>

      <div className="card-modern">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#1a1a1a]">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6]">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Notifications</h2>
            <p className="text-sm text-[#a1a1aa]">Configure your notification preferences</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-[#0a0a0a]">
            <div>
              <p className="text-white font-medium">New Complaints</p>
              <p className="text-sm text-[#71717a]">Get notified about new complaints</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-[#1a1a1a] peer-focus:ring-2 peer-focus:ring-[#3b82f6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3b82f6]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-[#0a0a0a]">
            <div>
              <p className="text-white font-medium">Risk Alerts</p>
              <p className="text-sm text-[#71717a]">Get notified about new risk alerts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-[#1a1a1a] peer-focus:ring-2 peer-focus:ring-[#3b82f6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3b82f6]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-[#0a0a0a]">
            <div>
              <p className="text-white font-medium">Project Updates</p>
              <p className="text-sm text-[#71717a]">Get notified about project status changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-[#1a1a1a] peer-focus:ring-2 peer-focus:ring-[#3b82f6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3b82f6]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
