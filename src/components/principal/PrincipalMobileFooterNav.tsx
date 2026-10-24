import React from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  FileCheck,
  ShieldAlert,
  Users,
  CreditCard,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PrincipalMobileFooterNav: React.FC = () => {
  const { activeTab, setActiveTab, principalCriticalAlerts, principalExecutiveApprovals } = useApp();

  const activeAlerts = principalCriticalAlerts.filter((a) => a.status === 'ACTIVE').length;
  const pendingApprovalsCount = principalExecutiveApprovals.filter((a) => a.status === 'PENDING').length;

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'academics', label: 'Academics', icon: GraduationCap },
    { id: 'approvals', label: 'Approvals', icon: FileCheck, badge: `${pendingApprovalsCount || 5}` },
    { id: 'safety', label: 'Safety', icon: ShieldAlert, alertDot: activeAlerts > 0 },
    { id: 'staff', label: 'Staff', icon: Users },
    { id: 'finance', label: 'Finance', icon: CreditCard },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E2C48] border-t border-[#16426a] text-white flex items-center justify-around px-1 py-1 shadow-lg pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id || (item.id === 'home' && activeTab === 'dashboard');
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-0.5 rounded-lg transition relative ${
              isActive ? 'text-cyan-300 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
              />
              {item.alertDot && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 border border-[#0E2C48] animate-pulse"></span>
              )}
              {item.badge && (
                <span className="absolute -top-1.5 -right-2 bg-cyan-400 text-[#0E2C48] text-[9px] font-extrabold px-1 py-0.2 rounded-full min-w-[14px] text-center leading-none">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[54px]">
              {item.label}
            </span>
            {isActive && (
              <span className="absolute bottom-0 w-6 h-0.5 rounded-full bg-cyan-400" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
