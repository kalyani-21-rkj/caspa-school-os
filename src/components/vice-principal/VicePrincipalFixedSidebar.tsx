import React from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Calendar,
  BookOpen,
  ClipboardCheck,
  FileBarChart2,
  Settings,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  LogOut,
  Bell,
  Clock,
} from 'lucide-react';
import { CaspaLogo } from '../CaspaLogo';
import { useApp } from '../../context/AppContext';

interface VicePrincipalFixedSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const VicePrincipalFixedSidebar: React.FC<VicePrincipalFixedSidebarProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const { logout, currentUser, vpLessonPlans, vpConflicts } = useApp();

  const pendingPlansCount = vpLessonPlans.filter(p => p.status === 'SUBMITTED' || p.status === 'NEEDS_REVISION').length;
  const activeConflictsCount = vpConflicts.filter(c => c.status === 'ACTIVE').length;

  const navItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard, badge: null },
    { id: 'academics', label: 'Academic Performance', icon: GraduationCap, badge: null },
    { id: 'teachers', label: 'Faculty Hub', icon: Users, badge: '48 Active' },
    { id: 'timetable', label: 'Timetable & Operations', icon: Calendar, badge: activeConflictsCount > 0 ? `${activeConflictsCount} Alert` : null, badgeColor: 'bg-rose-500 text-white' },
    { id: 'lesson-plans', label: 'Lesson Plans', icon: BookOpen, badge: pendingPlansCount > 0 ? `${pendingPlansCount} Pending` : null, badgeColor: 'bg-amber-500 text-white' },
    { id: 'examinations', label: 'Examinations', icon: ClipboardCheck, badge: 'AY 2026' },
    { id: 'reports', label: 'Reports & Analytics', icon: FileBarChart2, badge: null },
    { id: 'more', label: 'Governance & Profile', icon: Settings, badge: null },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#0E2C48] text-white shrink-0 border-r border-[#16426a] select-none h-full z-20">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#16426a] flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#123B5D] to-[#176B87] p-1 flex items-center justify-center border border-white/20 shadow-xs">
            <CaspaLogo size="sm" showText={false} />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-black text-sm text-white tracking-wide">CASPA</span>
              <span className="text-[9px] font-extrabold text-cyan-200 bg-sky-900/60 px-1.5 py-0.5 rounded-full border border-sky-400/30">
                AY 2025/2026
              </span>
            </div>
            <p className="text-[10px] text-sky-200/70 font-semibold">Vice Principal Workspace</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-none">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 pt-2 pb-1">
          Academic Leadership
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentTab === item.id ||
            (item.id === 'dashboard' && (currentTab === 'home' || currentTab === 'dashboard'));

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition group ${
                isActive
                  ? 'bg-teal text-white shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Icon
                  className={`w-4 h-4 transition ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-cyan-300'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    item.badgeColor || (isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-300')
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* CASPA Copilot Action Button */}
        <div className="pt-3">
          <button
            onClick={() => onSelectTab('caspa')}
            className={`w-full p-3 rounded-2xl bg-gradient-to-r from-[#5B3FA3]/40 to-[#173059] border border-purple-500/30 hover:border-purple-400 text-left transition group relative overflow-hidden ${
              currentTab === 'caspa' ? 'ring-2 ring-purple-400' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-purple-200">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>CASPA Copilot</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Intelligent substitute room & schedule optimization ready.
            </p>
          </button>
        </div>
      </div>

      {/* User Footer Card */}
      <div className="p-3 border-t border-[#16426a] bg-[#092238]/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="relative">
              <img
                src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'}
                alt="Dr. Sarah Jenkins"
                className="w-8 h-8 rounded-full object-cover border border-cyan-400/50"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-[#0E2C48]" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">
                {currentUser?.fullName || 'Dr. Sarah Jenkins'}
              </div>
              <div className="text-[10px] text-cyan-300 truncate">
                {currentUser?.designation || 'VP • Academic Head'}
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-rose-300 transition"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
