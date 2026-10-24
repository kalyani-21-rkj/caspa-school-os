import React, { useState } from 'react';
import {
  Calendar,
  CalendarCheck,
  Award,
  FileText,
  Clock,
  BookOpen,
  FolderOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Bell,
  Bus,
  Download,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { downloadClassNotesPdf } from '../../utils/downloadHelper';

interface StudentDashboardScreenProps {
  onNavigate: (tab: string) => void;
}

export const StudentDashboardScreen: React.FC<StudentDashboardScreenProps> = ({ onNavigate }) => {
  const { currentUser, studentPeriods, studentTasks, submitStudentTask, showToast } = useApp();
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiNotesOutput, setAiNotesOutput] = useState<string | null>(null);

  const livePeriod = studentPeriods.find((p) => p.status === 'LIVE_NOW') || studentPeriods[2];
  const pendingTasks = studentTasks.filter((t) => t.status === 'PENDING');

  const handleAskAiQuick = () => {
    setIsAiLoading(true);
    setTimeout(() => {
      setAiNotesOutput(
        "Unit 4 Thermodynamics Quick Formulas:\n• First Law: ΔU = Q - W\n• Heat Engine Efficiency: η = 1 - (Tc / Th)\n• Carnot Maximum Efficiency: η_max = 1 - (T_cold / T_hot)\n• Entropy Change: ΔS = ∫ dQ_rev / T\n\nStudy tip: Memorize the PV-diagram cycle steps for tomorrow's quiz!"
      );
      setIsAiLoading(false);
      showToast('CASPA AI generated key revision formulas');
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Greeting (Matching Teacher Dashboard Header) */}
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
            <span>Hi, {currentUser?.fullName || 'Elena Vance'}</span>
            <span>👋</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            {currentUser?.designation || 'Grade 9B • Roll No. 14'} • Here&apos;s your student day at a glance.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigate('timetable')}
            className="px-4 py-2 bg-[#176B87] hover:bg-[#125870] text-white rounded-lg text-xs font-semibold shadow-xs transition"
          >
            View Period 3 Notes
          </button>
        </div>
      </div>

      {/* Top 3 KPI Summary Cards (Matching Teacher Dashboard KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Attendance Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Attendance
            </span>
            <p className="text-3xl font-extrabold text-emerald-600 font-mono mt-1">96.2%</p>
            <span className="text-xs text-slate-500">19/22 sessions attended</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        {/* GPA / Honors Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              GPA / Rank
            </span>
            <p className="text-3xl font-extrabold text-navy font-mono mt-1">3.90</p>
            <span className="text-xs text-slate-500">Rank #2 · Distinction</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-sky-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Homework to Complete Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Homework
            </span>
            <p className="text-3xl font-extrabold text-amber-600 font-mono mt-1">{pendingTasks.length}</p>
            <span className="text-xs text-slate-500">assignments due today</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* NEXT CLASS / LIVE CLASS Card (Matching Teacher Next Class Card) */}
      <div className="bg-white rounded-xl border-l-4 border-l-[#176B87] border-y border-r border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-600">
            <Clock className="w-4 h-4 text-teal" />
            <span className="font-bold uppercase tracking-wider text-slate-700">NEXT CLASS</span>
          </div>
          <span className="bg-teal-50 text-teal px-2.5 py-0.5 rounded-full text-xs font-bold animate-pulse">
            ● Live in Session Now
          </span>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-navy">{livePeriod.subject} — Period {livePeriod.periodNumber}</h2>
          <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
            <span>{livePeriod.timeRange}</span>
            <span>•</span>
            <span>{livePeriod.room}</span>
            <span>•</span>
            <span>Instructor: {livePeriod.teacher}</span>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 flex items-center space-x-2">
          <FileText className="w-4 h-4 text-teal shrink-0" />
          <span>
            Topic: <strong className="text-navy">{livePeriod.unitTopic || 'Unit 4: Thermodynamics & Carnot Engines'}</strong>
          </span>
        </div>

        <div className="flex items-center space-x-2 pt-1">
          <button
            onClick={() => {
              downloadClassNotesPdf({
                subject: livePeriod.subject,
                periodNumber: livePeriod.periodNumber,
                teacher: livePeriod.teacher,
                room: livePeriod.room,
                timeRange: livePeriod.timeRange,
                unitTopic: livePeriod.unitTopic,
                studentName: currentUser?.fullName || 'Elena Vance',
                grade: currentUser?.designation || 'Grade 9B',
              });
              showToast(`Downloaded Digital Notes for ${livePeriod.subject}`);
            }}
            className="flex-1 py-2.5 bg-[#176B87] hover:bg-[#125870] text-white rounded-lg text-xs font-semibold transition flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Digital Notes</span>
          </button>
          <button
            onClick={handleAskAiQuick}
            disabled={isAiLoading}
            className="p-2.5 bg-purple-50 hover:bg-purple-100 text-caspaPurple border border-purple-200 rounded-lg text-xs transition font-bold flex items-center space-x-1"
            title="Ask CASPA AI for Formulas"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isAiLoading ? 'Thinking...' : 'AI Revision'}</span>
          </button>
        </div>

        {/* AI Output drawer */}
        {aiNotesOutput && (
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-xs space-y-1.5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between font-bold text-caspaPurple">
              <span className="flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CASPA AI Smart Formulas</span>
              </span>
              <button onClick={() => setAiNotesOutput(null)} className="text-slate-400 hover:text-slate-600">×</button>
            </div>
            <pre className="text-[11px] text-slate-800 font-mono whitespace-pre-wrap">{aiNotesOutput}</pre>
          </div>
        )}
      </div>

      {/* 2-Column: Today's Timetable + Homework Due Today (Matching Teacher 12-Col Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Timetable (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-navy text-sm">Today's Class Schedule</h3>
              <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                7 Periods
              </span>
            </div>
            <button
              onClick={() => onNavigate('timetable')}
              className="text-xs text-teal font-semibold hover:underline flex items-center space-x-1"
            >
              <span>Full Week</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {studentPeriods.map((period) => {
              const isLive = period.status === 'LIVE_NOW';
              const isCompleted = period.status === 'COMPLETED';

              return (
                <div
                  key={period.id}
                  className={`p-3.5 border rounded-xl flex items-center justify-between text-xs transition ${
                    isLive
                      ? 'bg-teal/5 border-teal shadow-xs'
                      : isCompleted
                      ? 'bg-slate-50/70 border-slate-200 text-slate-600'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-center font-mono shrink-0 w-16">
                      <p className="font-bold text-navy text-xs">{period.timeRange.split(' - ')[0]}</p>
                      <p className="text-[10px] text-slate-400">{period.timeRange.split(' - ')[1] || ''}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <h4 className="font-bold text-navy text-sm">{period.subject}</h4>
                        {isLive && (
                          <span className="text-[9px] bg-teal text-white font-bold px-1.5 py-0.2 rounded">
                            NOW
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                            Done
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {period.room} • {period.teacher}
                      </p>
                    </div>
                  </div>

                  {isLive ? (
                    <button
                      onClick={() => {
                        downloadClassNotesPdf({
                          subject: period.subject,
                          periodNumber: period.periodNumber,
                          teacher: period.teacher,
                          room: period.room,
                          timeRange: period.timeRange,
                          unitTopic: period.unitTopic,
                          studentName: currentUser?.fullName || 'Elena Vance',
                          grade: currentUser?.designation || 'Grade 9B',
                        });
                        showToast(`Downloaded ${period.subject} Class Notes PDF`);
                      }}
                      className="px-3 py-1 bg-teal text-white hover:bg-teal-light rounded-md font-bold text-xs cursor-pointer"
                    >
                      Notes
                    </button>
                  ) : isCompleted ? (
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded text-xs font-medium">
                      Attended
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                      Upcoming
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Homework Due Today + Quick Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Homework Due Today Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-navy text-sm">Homework &amp; Tasks</h3>
              </div>
              <button
                onClick={() => onNavigate('tasks')}
                className="text-xs text-teal font-semibold hover:underline"
              >
                View All &gt;
              </button>
            </div>

            <div className="space-y-3">
              {pendingTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:border-slate-300 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-teal uppercase tracking-wider">
                      {t.subject}
                    </span>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      {t.dueDate}
                    </span>
                  </div>
                  <h4 className="font-bold text-navy text-xs leading-snug">{t.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{t.description}</p>
                  <button
                    onClick={() => onNavigate('tasks')}
                    className="w-full py-1.5 bg-[#176B87] hover:bg-[#125870] text-white rounded-lg text-xs font-semibold flex items-center justify-center space-x-1 transition shadow-xs cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Upload &amp; Turn In Solution</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bus Route Quick Widget */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bus className="w-4 h-4 text-teal" />
                <h3 className="font-bold text-navy text-sm">School Bus KA-01-EA</h3>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                ETA 14m
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Route 12 • Approaching Metro Hub Station. Elena’s stop next at Silver Oak.
            </p>
            <button
              onClick={() => onNavigate('transport')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition text-center"
            >
              Open Satellite Radar &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
