import React, { useState } from 'react';
import {
  Calendar,
  Users,
  FileText,
  Clock,
  FolderOpen,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Bell,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TeacherDashboardScreenProps {
  onNavigate: (tab: string) => void;
}

export const TeacherDashboardScreen: React.FC<TeacherDashboardScreenProps> = ({ onNavigate }) => {
  const { currentUser, teacherClasses, showToast } = useApp();
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiDraftOutput, setAiDraftOutput] = useState<string | null>(null);

  const nextClass = teacherClasses[0]; // Grade 9B Mathematics

  const handleDraftQuizAi = () => {
    setIsAiLoading(true);
    setTimeout(() => {
      setAiDraftOutput(
        "Generated Pop-Quiz for Grade 9B (Factorization):\n1. Factorize 2x² + 7x + 3 = 0\n2. Find roots of x² - 9 = 0\n3. Solve by grouping: 3x² + 6x + 2x + 4\n4. Apply quadratic formula to x² - 4x - 5 = 0\n5. Real-world projectile maximum height word problem.\n\nReady to assign as homework or in-class quiz!"
      );
      setIsAiLoading(false);
      showToast('CASPA AI generated 5-question pop quiz');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Greeting (Image 4) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span className="font-semibold text-teal">Fall Term</span>
            <span>·</span>
            <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-medium text-[11px]">
              Term 2 • Week 8
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight flex items-center space-x-2">
            <span>Hi, {currentUser?.fullName || 'Mrs. Oswald'}</span>
            <span>👋</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            {currentUser?.designation || 'Department of Mathematics'} • Here&apos;s your teaching day at a glance.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigate('attendance')}
            className="px-4 py-2 bg-[#176B87] hover:bg-[#125870] text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            Mark Period 1 Attendance
          </button>
        </div>
      </div>

      {/* Top 3 KPI Summary Cards (Image 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Classes Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Classes
            </span>
            <p className="text-3xl font-extrabold text-navy font-mono mt-1">6</p>
            <span className="text-xs text-slate-500">periods scheduled</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-sky-600 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Students Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Students
            </span>
            <p className="text-3xl font-extrabold text-navy font-mono mt-1">187</p>
            <span className="text-xs text-slate-500">enrolled across 4 sections</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Homework to Review Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Homework
            </span>
            <p className="text-3xl font-extrabold text-amber-600 font-mono mt-1">12</p>
            <span className="text-xs text-slate-500">submissions to review</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* NEXT CLASS Card (Image 4) */}
      <div className="bg-white rounded-xl border-l-4 border-l-[#176B87] border-y border-r border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-600">
            <Clock className="w-4 h-4 text-teal" />
            <span className="font-bold uppercase tracking-wider text-slate-700">NEXT CLASS</span>
          </div>
          <span className="bg-teal-50 text-teal px-2.5 py-0.5 rounded-full text-xs font-bold animate-pulse">
            ● Starts in 15m
          </span>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-navy">Mathematics — Grade 9B</h2>
          <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
            <span>09:00 - 09:45 AM</span>
            <span>•</span>
            <span>Room 204</span>
            <span>•</span>
            <span>32 Students</span>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 flex items-center space-x-2">
          <FileText className="w-4 h-4 text-teal shrink-0" />
          <span>
            Topic: <strong className="text-navy">Quadratic Equation Factorization Ch. 4.2</strong>
          </span>
        </div>

        <div className="flex items-center space-x-2 pt-1">
          <button
            onClick={() => onNavigate('attendance')}
            className="flex-1 py-2.5 bg-[#176B87] hover:bg-[#125870] text-white rounded-lg text-xs font-semibold transition flex items-center justify-center space-x-2 shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark Attendance</span>
          </button>
          <button
            onClick={() => onNavigate('classes')}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs transition"
            title="Open Class Folder"
          >
            <FolderOpen className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2-Column: Today's Timetable + Student Alerts (Image 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Timetable (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-navy text-sm">Today's Timetable</h3>
              <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                4 Remaining
              </span>
            </div>
            <button
              onClick={() => onNavigate('classes')}
              className="text-xs text-teal font-semibold hover:underline flex items-center space-x-1"
            >
              <span>Full Week</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Period 1 */}
            <div className="p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl flex items-center justify-between text-xs hover:border-slate-300 transition">
              <div className="flex items-center space-x-3">
                <div className="text-center font-mono shrink-0 w-16">
                  <p className="font-bold text-navy text-xs">09:00</p>
                  <p className="text-[10px] text-slate-400">09:45</p>
                </div>
                <div>
                  <h4 className="font-bold text-navy text-sm">Mathematics — Grade 9B</h4>
                  <p className="text-[11px] text-slate-500">Room 204 • Period 1</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('attendance')}
                className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded-md font-bold text-xs flex items-center space-x-1"
              >
                <Bell className="w-3 h-3" />
                <span>Mark</span>
              </button>
            </div>

            {/* Period 2 */}
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs hover:border-slate-300 transition">
              <div className="flex items-center space-x-3">
                <div className="text-center font-mono shrink-0 w-16">
                  <p className="font-bold text-navy text-xs">10:00</p>
                  <p className="text-[10px] text-slate-400">10:45</p>
                </div>
                <div>
                  <h4 className="font-bold text-navy text-sm">Algebra II Honors — Grade 10A</h4>
                  <p className="text-[11px] text-slate-500">Room 204 • Period 2</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                Upcoming
              </span>
            </div>

            {/* Period 3 */}
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs hover:border-slate-300 transition">
              <div className="flex items-center space-x-3">
                <div className="text-center font-mono shrink-0 w-16">
                  <p className="font-bold text-navy text-xs">11:15</p>
                  <p className="text-[10px] text-slate-400">12:00</p>
                </div>
                <div>
                  <h4 className="font-bold text-navy text-sm">AP Calculus AB — Grade 11</h4>
                  <p className="text-[11px] text-slate-500">Room 206 • Period 3</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                Upcoming
              </span>
            </div>

            {/* Period 5 */}
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs hover:border-slate-300 transition">
              <div className="flex items-center space-x-3">
                <div className="text-center font-mono shrink-0 w-16">
                  <p className="font-bold text-navy text-xs">01:30</p>
                  <p className="text-[10px] text-slate-400">02:15</p>
                </div>
                <div>
                  <h4 className="font-bold text-navy text-sm">Remedial Math Lab — Grade 9</h4>
                  <p className="text-[11px] text-slate-500">Math Lab 1 • Period 5</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                Upcoming
              </span>
            </div>
          </div>
        </div>

        {/* Student Alerts (5 cols) (Image 4) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-navy text-sm">Student Alerts</h3>
            </div>
            <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold">
              3 Action Items
            </span>
          </div>

          <div className="space-y-3">
            {/* Marcus Brody */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0">
                  MB
                </div>
                <div>
                  <h4 className="font-bold text-navy">Marcus Brody</h4>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="text-slate-500 text-[11px]">Grade 9B</span>
                    <span>•</span>
                    <span className="bg-red-50 text-red-600 px-1.5 py-0.2 rounded font-bold text-[10px]">
                      Missed HW (x2)
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onNavigate('comms')}
                className="text-xs font-semibold text-teal hover:underline"
              >
                Follow Up
              </button>
            </div>

            {/* Sophia Chen */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-800 font-bold flex items-center justify-center text-xs shrink-0">
                  SC
                </div>
                <div>
                  <h4 className="font-bold text-navy">Sophia Chen</h4>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="text-slate-500 text-[11px]">Grade 9B</span>
                    <span>•</span>
                    <span className="bg-amber-50 text-amber-700 px-1.5 py-0.2 rounded font-bold text-[10px]">
                      Attendance (68%)
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onNavigate('comms')}
                className="text-xs font-semibold text-teal hover:underline"
              >
                Send Note
              </button>
            </div>

            {/* Devon Patel */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs shrink-0">
                  DP
                </div>
                <div>
                  <h4 className="font-bold text-navy">Devon Patel</h4>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="text-slate-500 text-[11px]">Grade 10A</span>
                    <span>•</span>
                    <span className="bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-medium text-[10px]">
                      Missed Quiz
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onNavigate('tasks')}
                className="text-xs font-semibold text-teal hover:underline"
              >
                Follow Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CASPA Smart Assistant Box (Image 4 bottom) */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-5 text-white shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm">CASPA Smart Assistant</h3>
              <p className="text-xs text-purple-200">
                Draft Grade 9B weekly quiz from today's lesson notes or analyze homework gaps.
              </p>
            </div>
          </div>

          <button
            onClick={handleDraftQuizAi}
            disabled={isAiLoading}
            className="px-4 py-2 bg-caspaPurple-light hover:bg-purple-600 text-white rounded-lg font-bold text-xs transition shrink-0 shadow-sm disabled:opacity-50"
          >
            {isAiLoading ? 'Drafting...' : 'Ask AI'}
          </button>
        </div>

        {aiDraftOutput && (
          <div className="p-3 bg-black/30 rounded-lg border border-purple-400/40 text-xs text-purple-100 whitespace-pre-line leading-relaxed">
            {aiDraftOutput}
          </div>
        )}
      </div>
    </div>
  );
};
