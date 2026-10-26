import React from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  ClipboardCheck,
  FileText,
  Award,
  MessageSquare,
  Sparkles,
  LogOut,
  ChevronRight,
  Shield,
  UserCheck,
  Building2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TeacherFixedSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const TeacherFixedSidebar: React.FC<TeacherFixedSidebarProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const { currentUser, logout, teacherTasks } = useApp();

  const submittedTasksCount = teacherTasks.filter((t) => t.latestStudentSubmission).length;

  const navItems = [
    { id: 'home', label: 'Teaching Overview', icon: LayoutDashboard, badge: 'Today' },
    { id: 'classes', label: 'My Classes', icon: GraduationCap, badge: '4' },
    { id: 'attendance', label: 'Mark Attendance', icon: ClipboardCheck, badge: 'Live', badgeLive: true },
    {
      id: 'tasks',
      label: 'Tasks & Homework',
      icon: FileText,
      badge: submittedTasksCount > 0 ? `${submittedTasksCount} New Sub.` : `${teacherTasks.length} Active`,
      badgeLive: submittedTasksCount > 0,
    },
    { id: 'marks', label: 'Marks & Feedback', icon: Award, badge: 'Unit Test 2' },
    { id: 'comms', label: 'Parent Hub (PTM)', icon: MessageSquare, badge: '3 Unread' },
    { id: 'hr', label: 'Leave, Payroll & Approvals', icon: Building2, badge: 'HR Sync' },
    { id: 'caspa', label: 'CASPA Smart AI', icon: Sparkles, highlight: true },
  ];

  return (
    <aside className="hidden md:flex md:w-64 bg-[#0E2C48] border-r border-[#16426a] flex-col justify-between shrink-0 select-none h-full text-white z-30">
      {/* Top Profile Summary */}
      <div className="p-4 border-b border-[#16426a] bg-[#092238]/80">
        <div className="flex items-center space-x-3">
          <img
            src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'}
            alt="Mrs. Oswald"
            className="w-10 h-10 rounded-full object-cover border-2 border-teal-light shadow-md"
          />
          <div className="overflow-hidden">
            <h3 className="font-bold text-white text-sm truncate">
              {currentUser?.fullName || 'Mrs. Oswald'}
            </h3>
            <p className="text-[11px] text-teal-light font-medium truncate">
              {currentUser?.designation || 'Department of Mathematics'}
            </p>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] text-slate-300 font-medium">Teacher · Term 2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links - Static & Fixed (non-sliding) */}
      <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
          Teacher Workspace
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
                      : item.badgeLive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 animate-pulse'
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
