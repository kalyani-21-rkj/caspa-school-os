import React from 'react';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  CalendarCheck,
  Bus,
  Bell,
  FileText,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CaspaLogo } from '../CaspaLogo';

interface ParentFixedSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const ParentFixedSidebar: React.FC<ParentFixedSidebarProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const {
    activeChild,
    parentChildren,
    switchActiveChild,
    parentFees,
    parentNotices,
    currentUser,
  } = useApp();

  const pendingDues = parentFees
    .filter((f) => f.childId === activeChild?.id && f.status === 'PENDING')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const unreadNoticesCount = parentNotices.filter((n) => !n.isAcknowledged).length;

  const menuItems = [
    {
      id: 'home',
      label: 'Home Dashboard',
      sublabel: 'Overview & daily pulse',
      icon: LayoutDashboard,
    },
    {
      id: 'child',
      label: 'Child Profile Hub',
      sublabel: `${activeChild?.fullName} (${activeChild?.grade}-${activeChild?.section})`,
      icon: Users,
    },
    {
      id: 'fees',
      label: 'Fees & Payments',
      sublabel: pendingDues > 0 ? `₹${pendingDues.toLocaleString('en-IN')} pending` : 'All cleared',
      icon: CreditCard,
      badge: pendingDues > 0 ? `₹${(pendingDues / 1000).toFixed(1)}k Due` : undefined,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    },
    {
      id: 'attendance',
      label: 'Attendance & Marks',
      sublabel: `${activeChild?.attendancePercent || 94.2}% attendance`,
      icon: CalendarCheck,
      badge: `${activeChild?.attendancePercent || 94.2}%`,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    },
    {
      id: 'transport',
      label: 'Live Bus & Telemetry',
      sublabel: 'Route 4B • En route',
      icon: Bus,
      badge: 'Live GPS',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    },
    {
      id: 'notices',
      label: 'Notices & Circulars',
      sublabel: 'Official advisories',
      icon: Bell,
      badge: unreadNoticesCount > 0 ? `${unreadNoticesCount} New` : undefined,
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    },
    {
      id: 'certificates',
      label: 'Certificates & Vault',
      sublabel: 'Bonafide, Fee & NOC',
      icon: FileText,
    },
    {
      id: 'messages',
      label: 'Teacher Messages & PTM',
      sublabel: `${activeChild?.classTeacher || 'Class Teacher'}`,
      icon: MessageSquare,
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-[#0E2C48] text-slate-100 border-r border-[#16426a] shrink-0 select-none h-full overflow-hidden shadow-xl">
      {/* Top Brand Block */}
      <div className="p-4 border-b border-[#16426a] flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#123B5D] to-[#176B87] p-1.5 flex items-center justify-center border border-white/20 shadow-md">
            <CaspaLogo size="sm" showText={false} />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-sm tracking-tight text-white">CASPA</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-teal/20 text-teal-light border border-teal/40">
                PARENT
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Family Care &amp; Ward Portal</p>
          </div>
        </div>

        <button
          onClick={() => onSelectTab('caspa')}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300 transition"
          title="Ask CASPA AI"
        >
          <Sparkles className="w-4 h-4 text-cyan-300" />
        </button>
      </div>

      {/* Child Switcher Selector Widget in Sidebar */}
      <div className="p-3 mx-3 my-2 bg-[#092238] rounded-xl border border-[#16426a]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Active Child
          </span>
          <span className="text-[9px] font-bold text-teal-light px-1.5 py-0.2 rounded bg-teal/10">
            {parentChildren.length} Linked
          </span>
        </div>
        <div className="space-y-1">
          {parentChildren.map((child) => {
            const isSelected = child.id === activeChild?.id;
            return (
              <button
                key={child.id}
                onClick={() => switchActiveChild(child.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs transition ${
                  isSelected
                    ? 'bg-teal text-white font-semibold shadow-xs'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  <img
                    src={child.avatarUrl}
                    alt={child.fullName}
                    className="w-5 h-5 rounded-full object-cover border border-white/20"
                  />
                  <div className="truncate">
                    <p className="truncate leading-tight text-xs">{child.fullName}</p>
                    <p className="text-[9px] opacity-75 leading-none">
                      {child.grade}-{child.section} • {child.curriculum}
                    </p>
                  </div>
                </div>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Menus List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
          Parent Menu
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentTab === item.id ||
            (item.id === 'home' && currentTab === 'dashboard');

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition duration-150 group ${
                isActive
                  ? 'bg-teal text-white shadow-md font-semibold'
                  : 'text-slate-300 hover:bg-[#13385c] hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-cyan-300'
                  }`}
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate leading-tight">{item.label}</p>
                  <p
                    className={`text-[10px] truncate leading-tight ${
                      isActive ? 'text-cyan-100 opacity-90' : 'text-slate-400'
                    }`}
                  >
                    {item.sublabel}
                  </p>
                </div>
              </div>

              {item.badge ? (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border shrink-0 ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              ) : (
                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                    isActive
                      ? 'text-white translate-x-0.5'
                      : 'text-slate-500 opacity-0 group-hover:opacity-100'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Parent Institutional Security & Guardian Footer */}
      <div className="p-3 border-t border-[#16426a] bg-[#092238] m-3 rounded-2xl flex items-center space-x-2.5">
        <img
          src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80'}
          alt={currentUser?.fullName || 'Parent'}
          className="w-9 h-9 rounded-full object-cover border border-teal-light"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-white truncate leading-tight">
            {currentUser?.fullName || 'Mrs. Anita Sharma'}
          </p>
          <div className="flex items-center space-x-1 text-[10px] text-teal-light">
            <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">{currentUser?.designation || 'Verified Guardian'}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
