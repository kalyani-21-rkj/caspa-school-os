import React, { useState } from 'react';
import {
  Calendar,
  BookOpen,
  ClipboardCheck,
  FileBarChart2,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  UserCheck,
  CheckCircle2,
  Lock,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface VicePrincipalMoreScreenProps {
  onNavigate: (tab: string) => void;
}

export const VicePrincipalMoreScreen: React.FC<VicePrincipalMoreScreenProps> = ({
  onNavigate,
}) => {
  const { logout, currentUser, vpLessonPlans, showToast } = useApp();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const pendingPlansCount = vpLessonPlans.filter(p => p.status === 'SUBMITTED' || p.status === 'NEEDS_REVISION').length;

  const menuItems = [
    {
      id: 'timetable',
      title: 'Timetable',
      desc: 'Block schedules, rotations & rooms',
      icon: Calendar,
      color: 'bg-sky-50 text-sky-600',
      badge: null,
    },
    {
      id: 'lesson-plans',
      title: 'Lesson Plans',
      desc: 'Syllabi approvals & departmental filings',
      icon: BookOpen,
      color: 'bg-teal/15 text-teal',
      badge: `${pendingPlansCount} pending`,
      badgeColor: 'bg-sky-100 text-sky-800',
    },
    {
      id: 'examinations',
      title: 'Examinations',
      desc: 'Mid-terms, proctor shifts & grades',
      icon: ClipboardCheck,
      color: 'bg-purple-50 text-purple-600',
      badge: null,
    },
    {
      id: 'reports',
      title: 'Reports & Analytics',
      desc: 'Cohort performance & trends',
      icon: FileBarChart2,
      color: 'bg-indigo-50 text-indigo-600',
      badge: null,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      desc: 'Parent flags & priority directives',
      icon: Bell,
      color: 'bg-amber-50 text-amber-600',
      badgeDot: true,
    },
    {
      id: 'settings',
      title: 'Settings',
      desc: 'Delegation rights, signatures, security',
      icon: Settings,
      color: 'bg-slate-100 text-slate-600',
      badge: null,
    },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Header (Matching Image 5) */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-black text-[#0E2C48] tracking-tight">
          More
        </h1>
        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
          v2.1
        </span>
      </div>

      {/* Profile Hero Card with Curved Navy Gradient (Matching Image 5) */}
      <div className="bg-gradient-to-b from-[#0E2C48] via-[#123B5D] to-[#17456d] rounded-3xl p-6 text-white text-center shadow-lg relative overflow-hidden space-y-3">
        <div className="relative inline-block mx-auto">
          <img
            src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'}
            alt="Dr. Sarah Jenkins"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-3 border-cyan-400/80 shadow-md mx-auto"
          />
          <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center border-2 border-[#0E2C48]">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {currentUser?.fullName || 'Dr. Sarah Jenkins'}
          </h2>
          <p className="text-xs text-cyan-200 font-semibold mt-0.5">
            {currentUser?.designation || 'Vice Principal • Academic Head'}
          </p>
        </div>

        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/20 text-white text-xs font-extrabold border border-white/20 transition inline-flex items-center space-x-1.5 shadow-2xs"
        >
          <span>View Institutional Profile</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Ask CASPA AI Card (Matching Image 5) */}
      <div className="bg-gradient-to-r from-[#2B1B54] via-[#4A2D8B] to-[#1E1238] rounded-2xl p-4 text-white shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-black">
              <span>Ask CASPA</span>
              <span className="text-[9px] bg-purple-400/30 text-purple-200 px-1.5 py-0.5 rounded font-bold">
                AI
              </span>
            </div>
            <p className="text-xs text-purple-200 mt-0.5">Get instant academic insights</p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('caspa')}
          className="px-3.5 py-2 rounded-xl bg-white text-[#2B1B54] hover:bg-purple-50 text-xs font-extrabold flex items-center space-x-1 transition shadow-xs"
        >
          <span>Assist</span>
          <span>🤖</span>
        </button>
      </div>

      {/* Menu Item Cards List (Matching Image 5) */}
      <div className="space-y-2.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'notifications') {
                  showToast('Viewing parent notifications & priority directives');
                } else if (item.id === 'settings') {
                  showToast('Opening delegation rights & cryptographic signature settings');
                } else {
                  onNavigate(item.id);
                }
              }}
              className="w-full bg-white p-4 rounded-2xl border border-slate-200 hover:border-teal transition shadow-2xs flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-extrabold text-sm text-[#0E2C48] group-hover:text-teal transition">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {item.badge && (
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-100 text-slate-700'}`}>
                    {item.badge}
                  </span>
                )}
                {item.badgeDot && (
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                )}
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Sign Out Card (Matching Image 5) */}
      <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 shadow-2xs flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <LogOut className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-sm text-rose-700">Sign Out</div>
            <div className="text-xs text-slate-500 mt-0.5">
              Logged in as {currentUser?.email || 's.jenkins@caspa.edu'}
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-3.5 py-1.5 rounded-xl bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition shadow-2xs"
        >
          Active Session
        </button>
      </div>

      {/* Governance & Certified Session Footer (Matching Image 5) */}
      <div className="text-center text-xs text-slate-400 space-y-1 pt-2">
        <div className="flex items-center justify-center space-x-1 font-bold text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-teal" />
          <span>CASPA School OS v2.1 • Academic Governance</span>
        </div>
        <div className="text-[11px] text-slate-400">
          Authorized Session ID: CK-9924-VP
        </div>
      </div>

      {/* Modal: Dr. Jenkins Institutional Profile */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-[#0E2C48]">
                Institutional Credential Record
              </h3>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <img
                  src={currentUser?.avatarUrl}
                  alt={currentUser?.fullName || 'Dr. Sarah Jenkins'}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-extrabold text-sm text-[#0E2C48]">
                    {currentUser?.fullName || 'Dr. Sarah Jenkins, Ph.D.'}
                  </div>
                  <div className="text-slate-500">
                    {currentUser?.designation || 'Vice Principal & Academic Dean'}
                  </div>
                  <div className="text-[10px] text-teal font-bold">St. Jude Collegiate</div>
                </div>
              </div>

              <div className="space-y-1">
                <div><strong>Delegation Rights:</strong> Level 3 Academic Governance</div>
                <div><strong>Statutory Sign-off Authority:</strong> Lesson Plans, Exam Transcripts, Faculty Reviews</div>
                <div><strong>Security Clearance:</strong> FERPA Restricted Tier A</div>
              </div>
            </div>

            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#0E2C48] text-white text-xs font-bold hover:bg-[#123B5D]"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
