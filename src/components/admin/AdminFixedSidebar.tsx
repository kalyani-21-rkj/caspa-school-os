import React from 'react';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  BookOpen,
  CreditCard,
  ShieldAlert,
  Bus,
  KeyRound,
  Settings,
  Sparkles,
  LogOut,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CaspaLogo } from '../CaspaLogo';

interface AdminFixedSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const AdminFixedSidebar: React.FC<AdminFixedSidebarProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const {
    currentUser,
    logout,
    setRole,
    students,
    staffMembers,
    safetyIncidents,
    approvals,
  } = useApp();

  const activeAlertsCount = safetyIncidents.filter((s) => s.status !== 'RESOLVED' && s.status !== 'CLOSED').length;
  const pendingApprovalsCount = approvals.filter((a) => a.status === 'PENDING').length;

  const navItems = [
    { id: 'home', label: 'Admin Overview', icon: LayoutDashboard, badge: 'Live' },
    { id: 'students', label: 'Student Admissions', icon: Users, badge: `${students.length}` },
    { id: 'staff', label: 'Faculty & Staff', icon: UserCheck, badge: `${staffMembers.length}` },
    { id: 'academics', label: 'Curriculum & Timetable', icon: BookOpen, badge: 'Term 2' },
    { id: 'finance', label: 'Fee Billing & Accounts', icon: CreditCard, badge: '94.2%' },
    {
      id: 'safety',
      label: 'Safety & Grievance Desk',
      icon: ShieldAlert,
      badge: `${activeAlertsCount} Alert`,
      badgeAlert: activeAlertsCount > 0,
    },
    { id: 'transport', label: 'School Bus Radar', icon: Bus, badge: '24 Bus' },
    { id: 'erp-hub', label: 'CRM, Hostel, Library & ERP', icon: GraduationCap, badge: '76 Scr' },
    {
      id: 'approvals',
      label: 'Approvals & Requests',
      icon: KeyRound,
      badge: `${pendingApprovalsCount} Pending`,
      badgeAlert: pendingApprovalsCount > 0,
    },
    { id: 'rbac', label: 'RBAC, Roles & Workflows', icon: Settings, badge: 'Secured' },
    { id: 'caspa', label: 'CASPA Admin AI', icon: Sparkles, highlight: true },
  ];

  return (
    <aside className="hidden md:flex md:w-64 bg-[#0E2C48] border-r border-[#16426a] flex-col justify-between shrink-0 select-none h-full text-white z-30 sticky top-0">
      {/* Top Profile Summary */}
      <div className="p-4 border-b border-[#16426a] bg-[#092238]/90">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'}
              alt="Arthur Clark"
              className="w-10 h-10 rounded-full object-cover border-2 border-teal shadow-md"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#092238] rounded-full"></span>
          </div>
          <div className="overflow-hidden">
            <h3 className="font-bold text-white text-sm truncate">
              {currentUser?.fullName || 'Arthur Clark'}
            </h3>
            <p className="text-[11px] text-teal-light font-medium truncate">
              {currentUser?.designation || 'Operations Director'}
            </p>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className="text-[9px] bg-teal/40 text-cyan-200 px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                Admin Console
              </span>
              <span className="text-[10px] text-slate-300 font-medium">All Campuses</span>
            </div>
          </div>
        </div>

        {/* Quick Switch Persona Buttons */}
        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Switch View:</span>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setRole('STUDENT')}
              className="bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white px-2 py-0.5 rounded text-[10px] font-medium transition"
              title="Switch to Student Module"
            >
              Student
            </button>
            <button
              onClick={() => setRole('TEACHER')}
              className="bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white px-2 py-0.5 rounded text-[10px] font-medium transition"
              title="Switch to Teacher Module"
            >
              Teacher
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
        <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
          Enterprise Admin
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition text-left ${
                isActive
                  ? item.highlight
                    ? 'bg-caspaPurple text-white shadow-md font-bold'
                    : 'bg-teal text-white shadow-md font-semibold'
                  : item.highlight
                  ? 'text-purple-300 hover:bg-white/10 hover:text-white'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? 'text-white'
                      : item.highlight
                      ? 'text-purple-300'
                      : 'text-slate-400'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.badgeAlert
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
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
      <div className="p-4 border-t border-[#16426a] bg-[#092238]/90">
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
