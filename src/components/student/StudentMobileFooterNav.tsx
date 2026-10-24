import React from 'react';
import {
  Home,
  BookOpen,
  CheckSquare,
  FileText,
  Award,
  Bus,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentMobileFooterNav: React.FC = () => {
  const { activeTab, setActiveTab, studentTasks } = useApp();

  const pendingCount = studentTasks.filter((t) => t.status === 'PENDING').length;

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'classes', label: 'Classes', icon: BookOpen },
    { id: 'attendance', label: 'Attendance', icon: CheckSquare, badge: '96%' },
    { id: 'tasks', label: 'Tasks', icon: FileText, badge: pendingCount > 0 ? `${pendingCount}` : undefined },
    { id: 'marks', label: 'Marks', icon: Award },
    { id: 'transport', label: 'Bus', icon: Bus },
    { id: 'caspa', label: 'AI', icon: Sparkles, highlight: true },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E2C48] border-t border-[#16426a] text-white select-none shadow-2xl">
      <div className="h-14 px-2 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeTab === item.id ||
            (item.id === 'classes' && activeTab === 'timetable') ||
            (item.id === 'marks' && activeTab === 'achievements') ||
            (item.id === 'transport' && activeTab === 'bus');

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 relative transition ${
                isActive
                  ? item.highlight
                    ? 'text-purple-300 font-bold'
                    : 'text-cyan-300 font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110' : ''
                  }`}
                />
                {item.badge && (
                  <span
                    className={`absolute -top-1.5 -right-2.5 font-extrabold text-[9px] px-1 rounded-full leading-none py-0.5 ${
                      item.id === 'tasks' ? 'bg-amber-500 text-slate-900' : 'bg-emerald-500 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[48px]">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-cyan-300 mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Safe Area bottom bar on iOS/Android */}
      <div className="h-1 bg-[#0E2C48] flex items-center justify-center">
        <div className="w-24 h-0.5 bg-slate-600/60 rounded-full"></div>
      </div>
    </nav>
  );
};
