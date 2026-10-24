import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  FileCheck,
  BookOpen,
  CalendarCheck,
  Award,
  Bus,
  Sparkles,
  LogOut,
  ChevronRight,
  UserCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface StudentFixedSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const StudentFixedSidebar: React.FC<StudentFixedSidebarProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const { currentUser, logout, setRole, studentTasks } = useApp();

  const pendingTasksCount = studentTasks.filter(t => t.status === 'PENDING').length;

  const navItems = [
    { id: 'home', label: 'Student Overview', icon: LayoutDashboard, badge: 'Live' },
    { id: 'timetable', label: 'My Timetable', icon: Calendar, badge: '7 Periods' },
    { id: 'tasks', label: 'Tasks & Homework', icon: FileCheck, badge: `${pendingTasksCount} Due`, badgeAlert: pendingTasksCount > 0 },
    { id: 'materials', label: 'Study Material', icon: BookOpen, badge: 'New' },
    { id: 'attendance', label: 'Attendance & Leaves', icon: CalendarCheck, badge: '96.2%' },
    { id: 'achievements', label: 'Honors & Badges', icon: Award, badge: '4' },
    { id: 'transport', label: 'School Bus Radar', icon: Bus, badge: 'Route 12' },
    { id: 'caspa', label: 'CASPA AI Tutor', icon: Sparkles, highlight: true },
  ];

  return (
    <aside className="hidden md:flex md:w-64 bg-[#0E2C48] border-r border-[#16426a] flex-col justify-between shrink-0 select-none h-full text-white z-30">
      {/* Top Profile Summary */}
      <div className="p-4 border-b border-[#16426a] bg-[#092238]/80">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
              alt="Elena Vance"
              className="w-10 h-10 rounded-full object-cover border-2 border-teal-light shadow-md"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#092238] rounded-full"></span>
          </div>
          <div className="overflow-hidden">
            <h3 className="font-bold text-white text-sm truncate">
              {currentUser?.fullName || 'Elena Vance'}
            </h3>
            <p className="text-[11px] text-teal-light font-medium truncate">
              {currentUser?.designation || 'Grade 9B • Roll #14'}
            </p>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className="text-[10px] bg-teal/40 text-cyan-200 px-1.5 py-0.2 rounded font-semibold">
                GPA 3.9
              </span>
              <span className="text-[10px] text-slate-300 font-medium">Term 2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links - Static & Fixed (non-sliding) */}
      <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
          Student Portal
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
                    ? 'bg-caspaPurple text-white shadow-md'
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
