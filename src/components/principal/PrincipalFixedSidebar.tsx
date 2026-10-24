import React from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  CreditCard,
  ShieldAlert,
  Building,
  FileCheck,
  Sparkles,
  LogOut,
  ChevronRight,
  Shield,
  UserCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CaspaLogo } from '../CaspaLogo';

interface PrincipalFixedSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const PrincipalFixedSidebar: React.FC<PrincipalFixedSidebarProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const {
    currentUser,
    logout,
    setRole,
    principalCriticalAlerts,
    principalExecutiveApprovals,
  } = useApp();

  const activeAlertsCount = principalCriticalAlerts.filter((a) => a.status === 'ACTIVE').length;
  const pendingApprovalsCount = principalExecutiveApprovals.filter((a) => a.status === 'PENDING').length;

  const navItems = [
    { id: 'home', label: 'Executive Dashboard', icon: LayoutDashboard, badge: 'Live' },
    { id: 'academics', label: 'Academic Standing', icon: GraduationCap, badge: 'AY 26-27' },
    { id: 'staff', label: 'Staff Directory', icon: Users, badge: '96 Staff' },
    { id: 'finance', label: 'Institutional Finance', icon: CreditCard, badge: '₹18.2L' },
    {
      id: 'safety',
      label: 'Safety & Safeguarding',
      icon: ShieldAlert,
      badge: `${activeAlertsCount} Alerts`,
      badgeAlert: activeAlertsCount > 0,
    },
    { id: 'operations', label: 'Campus Operations', icon: Building, badge: '18 Buses' },
    {
      id: 'approvals',
      label: 'Executive Approvals',
      icon: FileCheck,
      badge: `${pendingApprovalsCount} Queue`,
      badgeAlert: pendingApprovalsCount > 0,
    },
    { id: 'caspa', label: 'CASPA AI Co-Pilot', icon: Sparkles, highlight: true },
  ];

  return (
    <aside className="hidden md:flex h-full w-64 bg-[#0E2C48] text-white flex-col shrink-0 border-r border-[#16426a] select-none sticky top-0 z-30">
      {/* Brand Header Banner with CASPA Logo */}
      <div className="p-4 border-b border-[#16426a] bg-[#092238]/60">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#123B5D] to-[#176B87] p-1.5 flex items-center justify-center border border-white/20 shadow-md">
            <CaspaLogo size="sm" showText={false} />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center space-x-1.5">
              <span className="text-sm font-extrabold tracking-tight truncate">
                {currentUser?.fullName || 'Dr. Mehta'}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            </div>
            <div className="flex items-center space-x-1 text-[10px] text-cyan-300 font-mono font-medium truncate">
              <span className="truncate">{currentUser?.designation || 'Principal & Executive Head'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links - Static & Fixed Sticky non-sliding */}
      <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
          Governance &amp; Executive Command
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id || (item.id === 'home' && currentTab === 'dashboard');
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition text-left ${
                isActive
                  ? item.highlight
                    ? 'bg-caspaPurple text-white shadow-md'
                    : 'bg-teal text-white shadow-md font-bold'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive
                      ? item.highlight
                        ? 'text-yellow-300'
                        : 'text-cyan-200'
                      : item.highlight
                      ? 'text-yellow-400'
                      : 'text-slate-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.badgeAlert
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-white/10 text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Footer Actions */}
      <div className="p-4 border-t border-[#16426a] bg-[#092238]/90 space-y-2">
        <div className="flex items-center space-x-2 px-1 text-slate-300 text-xs">
          <Shield className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
          <span className="text-[10px] text-slate-300 font-medium truncate">
            Campus OS • ISO 27001
          </span>
        </div>

        <button
          onClick={logout}
          className="w-full py-2 px-3 text-slate-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg text-xs font-medium flex items-center space-x-2 transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
