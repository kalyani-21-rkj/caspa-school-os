import React, { useState } from 'react';
import {
  LogOut,
  ChevronDown,
  Search,
  Sparkles,
  UserCheck,
  Shield,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CaspaLogo } from './CaspaLogo';
import { RoleType } from '../types';

interface HeaderProps {
  onOpenCodeExport?: () => void;
  onOpenCaspa: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCaspa }) => {
  const {
    currentUser,
    authenticatedUser,
    canAccessAllModules,
    currentRole,
    setRole,
    logout,
  } = useApp();

  const [searchVal, setSearchVal] = useState('');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const roleOptions: { role: RoleType; label: string; desc: string; badge: string }[] = [
    { role: 'ADMIN', label: 'Arthur Clark', desc: 'School Admin & Operations Director', badge: 'Admin Console' },
    { role: 'PRINCIPAL', label: 'Dr. Mehta', desc: 'Principal & Executive Head', badge: 'Principal Console' },
    { role: 'VICE_PRINCIPAL', label: 'Dr. Sarah Jenkins', desc: 'Vice Principal & Academic Head', badge: 'VP Module' },
    { role: 'TEACHER', label: 'Mrs. Oswald', desc: 'Dept of Mathematics', badge: 'Teacher Portal' },
    { role: 'STUDENT', label: 'Elena Vance', desc: 'Grade 9B • Roll #14', badge: 'Student Portal' },
    { role: 'PARENT', label: 'Mrs. Anita Sharma', desc: 'Parent of Aarav (10-B) & Ananya (7-A)', badge: 'Parent Portal' },
  ];

  const moduleBadgeLabels: Record<string, string> = {
    ADMIN: 'Admin Master Console',
    PRINCIPAL: 'Principal Module',
    VICE_PRINCIPAL: 'Vice Principal Module',
    TEACHER: 'Teacher Module',
    STUDENT: 'Student Module',
    PARENT: 'Parent Module',
  };

  return (
    <header className="h-16 shrink-0 bg-[#0E2C48] text-white flex items-center justify-between px-4 sm:px-6 select-none z-40 border-b border-[#16426a] shadow-md">
      {/* Brand Logo - Simple, Neat & Clean for All Modules */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#123B5D] to-[#176B87] p-1.5 flex items-center justify-center border border-white/20 shadow-md transition-transform hover:scale-105 duration-200">
          <CaspaLogo size="sm" showText={false} />
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex items-center max-w-sm w-full mx-4">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder={
              currentRole === 'STUDENT'
                ? 'Search timetable, study notes, homework...'
                : 'Search students, classes, records...'
            }
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#092238] text-xs text-slate-100 placeholder-slate-400 border border-[#16426a] focus:outline-none focus:border-teal transition"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2.5">
        {/* Module Access Indicator: Admin sees All-Module Switcher; other roles see locked module authorization */}
        {canAccessAllModules ? (
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#092238] hover:bg-[#13385c] border border-cyan-500/40 text-xs font-semibold transition"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-300" />
              <span className="hidden sm:inline">
                Admin View: <strong className="text-cyan-200">{moduleBadgeLabels[currentRole] || currentRole}</strong>
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#092238] border border-[#16426a] rounded-2xl shadow-2xl p-2 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 border-b border-[#16426a] mb-1">
                  <span className="text-[10px] uppercase font-bold text-cyan-300 block tracking-wider">
                    Admin All-Module Access
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Logged in as {authenticatedUser?.fullName} (Super Admin Authorization)
                  </span>
                </div>
                <div className="space-y-1">
                  {roleOptions.map((opt) => (
                    <button
                      key={opt.role}
                      onClick={() => {
                        setRole(opt.role);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left transition ${
                        currentRole === opt.role
                          ? 'bg-teal text-white shadow-xs font-bold'
                          : 'text-slate-200 hover:bg-white/10'
                      }`}
                    >
                      <div>
                        <div className="font-bold">{opt.badge}</div>
                        <div className="text-[10px] text-slate-300 opacity-80">{opt.label} • {opt.desc}</div>
                      </div>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          currentRole === opt.role ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-300'
                        }`}
                      >
                        {opt.role}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#092238] border border-[#16426a] text-xs font-semibold"
            title="Your session is strictly authorized for this module only. Sign out to switch accounts."
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline text-slate-300">
              Authorized: <strong className="text-emerald-300">{moduleBadgeLabels[currentRole] || currentRole}</strong>
            </span>
          </div>
        )}

        {/* Ask CASPA AI */}
        <button
          onClick={onOpenCaspa}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#5B3FA3] hover:bg-[#6c4bc0] text-white text-xs font-bold transition shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span className="hidden sm:inline">Ask CASPA</span>
        </button>

        {/* User Avatar & Logout */}
        <div className="flex items-center space-x-2 pl-2 border-l border-[#16426a]">
          <img
            src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
            alt={currentUser?.fullName || 'User'}
            className="w-8 h-8 rounded-full object-cover border border-teal-light shrink-0"
          />
          <div className="text-left text-xs max-w-[120px] sm:max-w-[160px] truncate">
            <p className="font-bold text-slate-100 leading-tight truncate">{currentUser?.fullName || 'User'}</p>
            <span className="text-[10px] text-teal-light font-medium block truncate">{currentUser?.designation}</span>
          </div>

          <button
            onClick={logout}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-bold transition shrink-0"
            title="Sign Out to Login Screen"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};
