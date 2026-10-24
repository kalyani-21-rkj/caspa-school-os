import React from 'react';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CreditCard,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminMobileFooterNav: React.FC = () => {
  const { activeTab, setActiveTab, safetyIncidents, approvals } = useApp();

  const activeAlerts = safetyIncidents.filter((s) => s.status !== 'RESOLVED' && s.status !== 'CLOSED').length;

  const navItems = [
    { id: 'home', label: 'Overview', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'staff', label: 'Staff', icon: UserCheck },
    { id: 'finance', label: 'Finance', icon: CreditCard },
    { id: 'safety', label: 'Safety', icon: ShieldAlert, badgeAlert: activeAlerts > 0 },
    { id: 'caspa', label: 'AI Copilot', icon: Sparkles, highlight: true },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E2C48] border-t border-[#16426a] text-white flex items-center justify-around px-1 py-1 shadow-lg pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 px-0.5 rounded-lg transition relative ${
              isActive
                ? item.highlight
                  ? 'text-yellow-300 font-bold'
                  : 'text-cyan-300 font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
              />
              {item.badgeAlert && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[54px]">
              {item.label}
            </span>
            {isActive && (
              <span
                className={`absolute bottom-0 w-6 h-0.5 rounded-full ${
                  item.highlight ? 'bg-yellow-400' : 'bg-cyan-400'
                }`}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
};
