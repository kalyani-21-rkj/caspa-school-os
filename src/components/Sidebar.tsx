import React from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  ShieldAlert,
  ClipboardCheck,
  Bus,
  Sparkles,
  Lock,
  FileText,
  Clock,
  LogOut,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, currentRole, safetyIncidents, approvals, setRole } = useApp();

  const activeAlerts = safetyIncidents.filter((s) => s.status !== 'RESOLVED' && s.status !== 'CLOSED').length;
  const pendingApprovals = approvals.filter((a) => a.status === 'PENDING').length;

  const navItems = [
    {
      id: 'dashboard',
      label: currentRole === 'PRINCIPAL' ? 'Command Center' : 'Overview Dashboard',
      icon: LayoutDashboard,
      allowed: ['SUPER_ADMIN', 'PRINCIPAL', 'VICE_PRINCIPAL', 'ADMIN', 'TEACHER', 'SAFETY_OFFICER', 'ACCOUNTS', 'STUDENT', 'PARENT'],
    },
    {
      id: 'attendance',
      label: 'Academics & Attendance',
      icon: GraduationCap,
      badge: 'Grade 10-A',
      allowed: ['SUPER_ADMIN', 'PRINCIPAL', 'VICE_PRINCIPAL', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
    },
    {
      id: 'safety',
      label: 'Safety & Anti-Ragging',
      icon: ShieldAlert,
      badge: activeAlerts > 0 ? `${activeAlerts} Active` : undefined,
      badgeDanger: true,
      allowed: ['SUPER_ADMIN', 'PRINCIPAL', 'VICE_PRINCIPAL', 'SAFETY_OFFICER', 'COUNSELLOR'],
    },
    {
      id: 'approvals',
      label: 'Approval Center',
      icon: ClipboardCheck,
      badge: pendingApprovals > 0 ? `${pendingApprovals} Pending` : undefined,
      allowed: ['SUPER_ADMIN', 'PRINCIPAL', 'VICE_PRINCIPAL', 'ADMIN', 'ACCOUNTS', 'TEACHER'],
    },
    {
      id: 'transport',
      label: 'Transport & Fleet GPS',
      icon: Bus,
      badge: '24 Buses',
      allowed: ['SUPER_ADMIN', 'PRINCIPAL', 'ADMIN', 'TRANSPORT', 'PARENT', 'STUDENT'],
    },
    {
      id: 'caspa-ai',
      label: 'CASPA School AI',
      icon: Sparkles,
      highlight: true,
      allowed: ['SUPER_ADMIN', 'PRINCIPAL', 'VICE_PRINCIPAL', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT', 'SAFETY_OFFICER', 'ACCOUNTS'],
    },
    {
      id: 'rbac',
      label: 'RBAC & Audit Matrix',
      icon: Lock,
      allowed: ['SUPER_ADMIN', 'PRINCIPAL', 'ADMIN', 'SAFETY_OFFICER', 'ACCOUNTS'],
    },
    {
      id: 'timetable',
      label: 'Daily Schedule',
      icon: Clock,
      allowed: ['TEACHER', 'STUDENT', 'PARENT'],
    },
  ];

  const visibleItems = navItems.filter((item) => item.allowed.includes(currentRole));

  return (
    <aside className="w-64 bg-white border-r border-fieldBorder flex flex-col justify-between shrink-0 select-none hidden md:flex">
      <div className="py-4">
        <div className="px-5 mb-3">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Workspace · {currentRole.replace('_', ' ')}
          </p>
        </div>

        <nav className="space-x-0 space-y-1 px-3">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition group ${
                  isActive
                    ? item.highlight
                      ? 'bg-caspaPurple text-white shadow-sm'
                      : 'bg-teal text-white shadow-sm'
                    : item.highlight
                    ? 'text-caspaPurple hover:bg-purple-50'
                    : 'text-bodyText hover:bg-slate-100 hover:text-navy'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 transition ${
                      isActive
                        ? 'text-white'
                        : item.highlight
                        ? 'text-caspaPurple'
                        : 'text-slate-500 group-hover:text-navy'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badgeDanger
                        ? 'bg-red-100 text-caspaDanger'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info & Quick Switch */}
      <div className="p-4 border-t border-fieldBorder bg-surface">
        <div className="p-3 bg-white rounded-lg border border-fieldBorder space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">Academic Year</span>
            <span className="text-xs font-bold text-navy">2026-27</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">Term</span>
            <span className="text-xs font-medium text-teal">Term 2 (Autumn)</span>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-caspaSuccess animate-pulse"></span>
              <span>All Systems Normal</span>
            </span>
            <span className="text-slate-400">99.98% SLA</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 px-1">
          <button
            onClick={() => setRole('PRINCIPAL')}
            className="hover:text-teal transition text-[11px]"
          >
            Reset to Principal
          </button>
          <span className="text-slate-300">·</span>
          <span className="text-[11px] text-slate-400">CASPA v4.2</span>
        </div>
      </div>
    </aside>
  );
};
