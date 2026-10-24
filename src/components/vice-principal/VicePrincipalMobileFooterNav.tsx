import React from 'react';
import { LayoutGrid, GraduationCap, Users, MoreHorizontal } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const VicePrincipalMobileFooterNav: React.FC = () => {
  const { activeTab, setActiveTab, vpConflicts, vpLessonPlans } = useApp();

  const isMoreActive =
    activeTab === 'more' ||
    activeTab === 'timetable' ||
    activeTab === 'lesson-plans' ||
    activeTab === 'examinations' ||
    activeTab === 'reports';

  const pendingCount =
    vpConflicts.filter(c => c.status === 'ACTIVE').length +
    vpLessonPlans.filter(p => p.status === 'SUBMITTED' || p.status === 'NEEDS_REVISION').length;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0E2C48] text-white border-t border-[#16426a] flex items-center justify-around z-40 select-none shadow-2xl">
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition ${
          activeTab === 'dashboard' || activeTab === 'home'
            ? 'text-cyan-300 font-extrabold'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <LayoutGrid className="w-5 h-5 mb-1" />
        <span className="text-[10px] tracking-tight">Dashboard</span>
      </button>

      <button
        onClick={() => setActiveTab('academics')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition ${
          activeTab === 'academics'
            ? 'text-cyan-300 font-extrabold'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <GraduationCap className="w-5 h-5 mb-1" />
        <span className="text-[10px] tracking-tight">Academics</span>
      </button>

      <button
        onClick={() => setActiveTab('teachers')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition ${
          activeTab === 'teachers'
            ? 'text-cyan-300 font-extrabold'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <Users className="w-5 h-5 mb-1" />
        <span className="text-[10px] tracking-tight">Teachers</span>
      </button>

      <button
        onClick={() => setActiveTab('more')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition relative ${
          isMoreActive ? 'text-cyan-300 font-extrabold' : 'text-slate-400 hover:text-white'
        }`}
      >
        <div className="relative">
          <MoreHorizontal className="w-5 h-5 mb-1" />
          {pendingCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-[#0E2C48]" />
          )}
        </div>
        <span className="text-[10px] tracking-tight">More</span>
      </button>
    </nav>
  );
};
