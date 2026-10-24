import React, { useState } from 'react';
import {
  ShieldCheck,
  GraduationCap,
  Clock,
  BookOpen,
  Calendar,
  Users,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  UserCheck,
  CheckCircle2,
  Sliders,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface VicePrincipalDashboardScreenProps {
  onNavigate: (tab: string) => void;
}

export const VicePrincipalDashboardScreen: React.FC<VicePrincipalDashboardScreenProps> = ({
  onNavigate,
}) => {
  const { currentUser, vpConflicts, resolveVpConflict, vpLessonPlans, showToast } = useApp();

  const [selectedTerm, setSelectedTerm] = useState('This Term');
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [activeConflictId, setActiveConflictId] = useState<string>('conf-1');
  const [selectedRelocationRoom, setSelectedRelocationRoom] = useState('Chemistry Lab 2 (Annex)');
  const [assignedSubstitute, setAssignedSubstitute] = useState('Ms. Taylor (English Dept)');

  const pendingPlansCount = vpLessonPlans.filter(p => p.status === 'SUBMITTED' || p.status === 'NEEDS_REVISION').length;
  const activeConflicts = vpConflicts.filter(c => c.status === 'ACTIVE');

  const handleResolveConflict = (conflictId: string) => {
    if (conflictId === 'conf-1') {
      resolveVpConflict('conf-1', `Relocated Grade 12 Chemistry Practical to ${selectedRelocationRoom}. Lab 3B reserved for Physics.`);
    } else {
      resolveVpConflict('conf-2', `Confirmed ${assignedSubstitute} as official substitute teacher for Grade 10B English Period 2.`);
    }
    setIsResolveModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Header: Wednesday, Sep 24 • Term 2 & Sync Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 flex items-center space-x-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span>Wednesday, Sep 24 • Term 2</span>
          </span>
          <span className="text-xs font-bold text-slate-500 flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal" />
            <span>Verified Sync</span>
          </span>
        </div>

        <span className="text-xs font-semibold text-slate-400">
          St. Jude Collegiate • Academic Operations
        </span>
      </div>

      {/* Main Title Banner */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0E2C48] tracking-tight">
          Welcome, {currentUser?.fullName || 'Dr. Sarah Jenkins'} 👋
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Academic Command Center • {currentUser?.designation || 'Vice Principal Overview • St. Jude Collegiate'}
        </p>
      </div>

      {/* Top 3 Metric Cards (Matching Image 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Card 1: Academic Avg */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Academic Avg</span>
            <span className="text-[11px] font-black text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100 flex items-center space-x-0.5">
              <span>+1.2%</span>
            </span>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-black text-[#0E2C48]">82.4%</div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">Target: 85%</div>
          </div>
        </div>

        {/* Card 2: Classes Today */}
        <div className="bg-[#123B5D] text-white p-4 rounded-2xl shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-200">Classes Today</span>
            <Clock className="w-4 h-4 text-cyan-300" />
          </div>
          <div className="mt-2">
            <div className="text-3xl font-black text-white">42</div>
            <div className="text-[11px] text-sky-200 font-medium mt-0.5">7 in progress</div>
          </div>
        </div>

        {/* Card 3: Pending Plans */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Pending Plans</span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          </div>
          <div className="mt-2">
            <div className="text-3xl font-black text-rose-600">{pendingPlansCount}</div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">Syllabus reviews</div>
          </div>
        </div>
      </div>

      {/* Academic Performance Trend Card (Matching Image 1) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-[#0E2C48] text-base">Academic Performance Trend</h3>
            <p className="text-xs text-slate-500 mt-0.5">Cohort Weighted GPA Average</p>
          </div>
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="text-xs font-bold text-[#0E2C48] bg-sky-50 border border-sky-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal cursor-pointer shadow-2xs"
          >
            <option>This Term</option>
            <option>AY 2025/2026</option>
            <option>Historical (3-Year)</option>
          </select>
        </div>

        {/* Chart Container */}
        <div className="bg-gradient-to-b from-sky-50/50 to-white rounded-xl border border-slate-100 p-4 relative overflow-hidden">
          <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 mb-2">
            <span className="text-slate-400">Target 85%</span>
            <span className="text-slate-400">Average 80%</span>
          </div>

          <div className="h-32 w-full relative">
            {/* Target 85% Dotted Line */}
            <div className="absolute top-[25%] left-0 right-0 border-b border-dashed border-sky-300 z-0">
              <span className="text-[9px] font-bold text-sky-600 bg-white/80 px-1 -top-2.5 relative">
                Target 85%
              </span>
            </div>

            {/* Average 80% Line */}
            <div className="absolute top-[50%] left-0 right-0 border-b border-dashed border-slate-300 z-0">
              <span className="text-[9px] font-bold text-slate-400 bg-white/80 px-1 -top-2.5 relative">
                Average 80%
              </span>
            </div>

            {/* Visual SVG Curve with Points */}
            <svg className="w-full h-full" viewBox="0 0 500 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="vpTrendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#176B87" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#176B87" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <path
                d="M 20 80 Q 150 72 260 52 T 480 30"
                fill="none"
                stroke="#176B87"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 20 80 Q 150 72 260 52 T 480 30 L 480 120 L 20 120 Z"
                fill="url(#vpTrendGradient)"
              />

              {/* Data Node Dots */}
              <circle cx="20" cy="80" r="4.5" fill="#123B5D" stroke="#fff" strokeWidth="2" />
              <circle cx="150" cy="72" r="4.5" fill="#123B5D" stroke="#fff" strokeWidth="2" />
              <circle cx="280" cy="52" r="5" fill="#176B87" stroke="#fff" strokeWidth="2" />
              <circle cx="480" cy="30" r="5.5" fill="#0E2C48" stroke="#fff" strokeWidth="2" />
            </svg>
          </div>

          {/* X Axis Labels */}
          <div className="grid grid-cols-4 text-center pt-2 border-t border-slate-100 text-xs">
            <div>
              <div className="font-extrabold text-[#0E2C48]">79.0%</div>
              <div className="text-[10px] text-slate-400">Term 1</div>
            </div>
            <div>
              <div className="font-extrabold text-[#0E2C48]">81.0%</div>
              <div className="text-[10px] text-slate-400">Mid-Term</div>
            </div>
            <div>
              <div className="font-extrabold text-teal">82.4%</div>
              <div className="text-[10px] text-teal font-bold">Current</div>
            </div>
            <div>
              <div className="font-extrabold text-[#0E2C48]">85.0%</div>
              <div className="text-[10px] text-slate-400">Target</div>
            </div>
          </div>
        </div>
      </div>

      {/* Exam Schedule Overview (Matching Image 1) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#0E2C48]">
            <BookOpen className="w-4 h-4 text-teal" />
            <h3 className="font-extrabold text-sm sm:text-base">Exam Schedule Overview</h3>
          </div>
          <button
            onClick={() => onNavigate('examinations')}
            className="text-xs font-bold text-teal hover:text-[#0E2C48] flex items-center space-x-1"
          >
            <span>View Schedule</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {/* Item 1 */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-xs sm:text-sm text-[#0E2C48]">
                Grade 10 • Mathematics
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Mid-Term Board Prep • Oct 02
              </div>
            </div>
            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
              Ongoing
            </span>
          </div>

          {/* Item 2 */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-xs sm:text-sm text-[#0E2C48]">
                Grade 11 • Physics Lab
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Practical Evaluation • Oct 08
              </div>
            </div>
            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-sky-100 text-sky-800">
              Scheduled
            </span>
          </div>

          {/* Item 3 */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-xs sm:text-sm text-[#0E2C48]">
                Grade 9 • English Literature
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Diagnostic Mock • Sep 22
              </div>
            </div>
            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-teal/15 text-teal font-black">
              Completed
            </span>
          </div>
        </div>
      </div>

      {/* Teacher Overview (Matching Image 1) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#0E2C48]">
            <Users className="w-4 h-4 text-teal" />
            <h3 className="font-extrabold text-sm sm:text-base">Teacher Overview</h3>
          </div>
          <span className="text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
            48 Active
          </span>
        </div>

        <div className="space-y-2">
          {/* Eleanor Oswald */}
          <div
            onClick={() => onNavigate('teachers')}
            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between hover:border-teal transition cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-800 font-extrabold text-xs flex items-center justify-center">
                EO
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-[#0E2C48]">Mrs. Eleanor Oswald</div>
                <div className="text-xs text-slate-500">Mathematics (Grades 9, 10)</div>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Present</span>
            </span>
          </div>

          {/* Charles Davis */}
          <div
            onClick={() => onNavigate('teachers')}
            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between hover:border-teal transition cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs flex items-center justify-center">
                CD
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-[#0E2C48]">Mr. Charles Davis</div>
                <div className="text-xs text-slate-500">English Lit (Grades 10, 11)</div>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>On Leave</span>
            </span>
          </div>

          {/* Rachel Higgins */}
          <div
            onClick={() => onNavigate('teachers')}
            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between hover:border-teal transition cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-teal/15 text-teal font-extrabold text-xs flex items-center justify-center">
                RH
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-[#0E2C48]">Ms. Rachel Higgins</div>
                <div className="text-xs text-slate-500">Physics &amp; STEM (Grades 11, 12)</div>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Present</span>
            </span>
          </div>
        </div>
      </div>

      {/* Scheduling Conflicts (Matching Image 1) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-rose-600 font-extrabold text-sm sm:text-base">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Scheduling Conflicts</span>
          </div>
          <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
            {activeConflicts.length} Alerts
          </span>
        </div>

        <div className="space-y-3">
          {/* Conflict 1 */}
          <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200 flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 font-bold mt-0.5">
              !
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-[#0E2C48]">Lab 3B Double Booking</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Grade 11 Physics &amp; Grade 12 Chemistry overlap during Period 4 today.
              </p>
            </div>
          </div>

          {/* Conflict 2 */}
          <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-200 flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#123B5D] text-white flex items-center justify-center shrink-0 mt-0.5">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-[#0E2C48]">Coverage Gap: Grade 10B</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Period 2 English substitute pending confirmation for Mr. Davis.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setIsResolveModalOpen(true);
          }}
          className="w-full py-2.5 rounded-xl bg-[#0E2C48] hover:bg-[#123B5D] text-white text-xs font-bold flex items-center justify-center space-x-2 transition shadow-xs"
        >
          <Sliders className="w-4 h-4 text-cyan-300" />
          <span>Resolve Conflicts</span>
        </button>
      </div>

      {/* Ask CASPA AI Card (Matching Image 1) */}
      <div className="bg-gradient-to-r from-[#2B1B54] via-[#4A2D8B] to-[#1E1238] rounded-2xl p-5 text-white shadow-md space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-yellow-300">
          <Sparkles className="w-4 h-4" />
          <span>Ask CASPA AI</span>
        </div>
        <p className="text-xs text-purple-100 max-w-xl leading-relaxed">
          Get instant insights on cohort performance trends, curriculum milestones, and intelligent substitute room allocation.
        </p>
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => onNavigate('caspa')}
            className="px-4 py-2 rounded-xl bg-white text-[#2B1B54] hover:bg-purple-50 text-xs font-extrabold flex items-center space-x-1.5 transition shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#5B3FA3]" />
            <span>Open AI Assistant</span>
          </button>
          <div className="text-[11px] text-purple-200 font-bold flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Ready</span>
          </div>
        </div>
      </div>

      {/* Modal: Conflict Resolution Dialogue */}
      {isResolveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-base text-[#0E2C48]">Resolve Scheduling Conflict</h3>
              </div>
              <button
                onClick={() => setIsResolveModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex space-x-2 border-b border-slate-100 pb-2 text-xs font-bold">
              <button
                onClick={() => setActiveConflictId('conf-1')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeConflictId === 'conf-1'
                    ? 'bg-[#0E2C48] text-white'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                1. Lab 3B Clash
              </button>
              <button
                onClick={() => setActiveConflictId('conf-2')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeConflictId === 'conf-2'
                    ? 'bg-[#0E2C48] text-white'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                2. Grade 10B Coverage
              </button>
            </div>

            {activeConflictId === 'conf-1' ? (
              <div className="space-y-3">
                <p className="text-xs text-slate-600">
                  Grade 11 Physics &amp; Grade 12 Chemistry practicals are booked simultaneously for Period 4.
                </p>
                <div>
                  <label className="block text-xs font-bold text-[#0E2C48] mb-1">
                    Relocate Chemistry Practical To:
                  </label>
                  <select
                    value={selectedRelocationRoom}
                    onChange={(e) => setSelectedRelocationRoom(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  >
                    <option>Chemistry Lab 2 (Annex)</option>
                    <option>Science Lecture Hall A</option>
                    <option>General STEM Concourse</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-600">
                  Mr. Charles Davis is On Leave. Grade 10B English Period 2 needs an authorized substitute.
                </p>
                <div>
                  <label className="block text-xs font-bold text-[#0E2C48] mb-1">
                    Assign Substitute Faculty:
                  </label>
                  <select
                    value={assignedSubstitute}
                    onChange={(e) => setAssignedSubstitute(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  >
                    <option>Ms. Taylor (English Dept)</option>
                    <option>Dr. Katherine Wells (Senior Faculty)</option>
                    <option>Mr. Frank Morrison (History Lead)</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => setIsResolveModalOpen(false)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleResolveConflict(activeConflictId)}
                className="flex-1 py-2 rounded-xl bg-teal hover:bg-teal/90 text-white text-xs font-bold transition shadow-xs"
              >
                Authorize &amp; Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
