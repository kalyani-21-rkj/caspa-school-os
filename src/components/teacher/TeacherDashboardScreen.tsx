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
import { getLocalSmartResponse } from '../../services/caspaKnowledgeEngine';

interface TeacherDashboardScreenProps {
  onNavigate: (tab: string) => void;
}

export const TeacherDashboardScreen: React.FC<TeacherDashboardScreenProps> = ({ onNavigate }) => {
  const {
    currentUser,
    teacherClasses,
    teacherTasks,
    principalStaffLeaves,
    staffPayrollRecords,
    masterTimetable,
    activeTimetableWeek,
    togglePeriodCompletion,
    showToast,
  } = useApp();
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiDraftOutput, setAiDraftOutput] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'>('Monday');

  const teacherName = currentUser?.fullName || 'Mrs. Oswald';
  const myPublishedDaySlots = masterTimetable
    .filter(
      (s) =>
        s.weekLabel === activeTimetableWeek &&
        s.day === selectedDay &&
        s.isPublished &&
        (s.teacher.toLowerCase().includes('oswald') ||
          s.teacher.toLowerCase() === teacherName.toLowerCase() ||
          s.subject.toLowerCase().includes('math') ||
          s.subject.toLowerCase().includes('algebra'))
    )
    .sort((a, b) => a.period - b.period);

  const displaySlots =
    myPublishedDaySlots.length > 0
      ? myPublishedDaySlots
      : masterTimetable
          .filter((s) => s.weekLabel === activeTimetableWeek && s.day === selectedDay && s.gradeSection === '9B')
          .sort((a, b) => a.period - b.period);

  const completedTodayCount = displaySlots.filter((s) => s.status === 'COMPLETED').length;
  const remainingTodayCount = Math.max(0, displaySlots.length - completedTodayCount);

  const nextClass = displaySlots.find((s) => s.status !== 'COMPLETED') || displaySlots[0];
  const myPayroll = staffPayrollRecords[0];
  const myLatestLeave =
    principalStaffLeaves.find((l) => l.id === 'leave-oswald-1') || principalStaffLeaves[0];
  const recentStudentSubmissions = teacherTasks.filter((t) => t.latestStudentSubmission);

  const handleDraftQuizAi = () => {
    setIsAiLoading(true);
    setTimeout(() => {
      const result = getLocalSmartResponse(
        'Generate a 5-question pop quiz on Quadratic Equations for Grade 9B',
        'TEACHER',
        currentUser?.fullName
      );
      setAiDraftOutput(result.answer);
      setIsAiLoading(false);
      showToast('CASPA AI generated 5-question pop quiz');
    }, 350);
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
            onClick={() => onNavigate('hr')}
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-navy rounded-lg text-xs font-bold shadow-2xs transition cursor-pointer"
          >
            Leave, Payroll &amp; Approvals
          </button>
          <button
            onClick={() => onNavigate('attendance')}
            className="px-4 py-2 bg-[#176B87] hover:bg-[#125870] text-white rounded-lg text-xs font-semibold shadow-xs transition cursor-pointer"
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
        <div
          onClick={() => onNavigate('tasks')}
          className="bg-white p-5 rounded-xl border border-slate-200 hover:border-teal shadow-xs flex items-center justify-between cursor-pointer transition"
        >
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Homework &amp; Uploads
            </span>
            <p className="text-3xl font-extrabold text-amber-600 font-mono mt-1">
              {12 + recentStudentSubmissions.length}
            </p>
            <span className="text-xs text-teal font-semibold">
              {recentStudentSubmissions.length > 0
                ? `${recentStudentSubmissions.length} new student upload ready →`
                : 'submissions to review'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Live Cross-Portal Sync Strip (Salary Bank Status + Leave Approval Status + Student Homework Upload) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div
          onClick={() => onNavigate('hr')}
          className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-teal shadow-2xs flex items-center justify-between cursor-pointer transition text-xs"
        >
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">
              Bank Payroll ({myPayroll?.monthYear || 'Oct 2026'})
            </span>
            <span className="font-extrabold text-navy block mt-0.5">
              {myPayroll?.monthlySalaryFormatted} • {myPayroll?.bankName}
            </span>
            <span
              className={`text-[10px] font-bold ${
                myPayroll?.status === 'PAID_TO_BANK' ? 'text-emerald-600' : 'text-amber-600'
              }`}
            >
              {myPayroll?.status === 'PAID_TO_BANK'
                ? `✓ Sent to Bank (${myPayroll.accountNumberMasked})`
                : '● Pending Principal Disbursement'}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </div>

        <div
          onClick={() => onNavigate('hr')}
          className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-teal shadow-2xs flex items-center justify-between cursor-pointer transition text-xs"
        >
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">
              Staff Leave Status
            </span>
            <span className="font-extrabold text-navy block mt-0.5">
              {myLatestLeave?.leaveType} ({myLatestLeave?.durationDates})
            </span>
            <span
              className={`text-[10px] font-bold ${
                myLatestLeave?.status === 'APPROVED'
                  ? 'text-emerald-600'
                  : myLatestLeave?.status === 'REJECTED'
                  ? 'text-rose-600'
                  : 'text-amber-600'
              }`}
            >
              Principal Status: {myLatestLeave?.status || 'PENDING'}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </div>

        <div
          onClick={() => onNavigate('tasks')}
          className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-teal shadow-2xs flex items-center justify-between cursor-pointer transition text-xs"
        >
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">
              Grade 9 Student Sync
            </span>
            <span className="font-extrabold text-navy block mt-0.5">
              {recentStudentSubmissions.length > 0
                ? `${recentStudentSubmissions[0].latestStudentSubmission?.studentName} submitted task`
                : 'Assign & Track Grade 9B Work'}
            </span>
            <span className="text-[10px] font-bold text-teal">
              {recentStudentSubmissions.length > 0
                ? `✓ File: ${recentStudentSubmissions[0].latestStudentSubmission?.fileName}`
                : 'Click to assign or review tasks →'}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* NEXT CLASS Card (Image 4) */}
      <div className="bg-white rounded-xl border-l-4 border-l-[#176B87] border-y border-r border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-600">
            <Clock className="w-4 h-4 text-teal" />
            <span className="font-bold uppercase tracking-wider text-slate-700">
              NEXT CLASS • {activeTimetableWeek}
            </span>
          </div>
          <span className="bg-teal-50 text-teal px-2.5 py-0.5 rounded-full text-xs font-bold animate-pulse">
            ● {nextClass?.status === 'COMPLETED' ? 'All Lectures Completed' : 'Active Period'}
          </span>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-navy">
            {nextClass ? `${nextClass.subject} — Grade ${nextClass.gradeSection}` : 'Mathematics — Grade 9B'}
          </h2>
          <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
            <span>{nextClass?.timeRange || '08:30 - 09:15 AM'}</span>
            <span>•</span>
            <span>{nextClass?.room || 'Room 204'}</span>
            <span>•</span>
            <span>32 Students</span>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 flex items-center space-x-2">
          <FileText className="w-4 h-4 text-teal shrink-0" />
          <span>
            Topic:{' '}
            <strong className="text-navy">
              {nextClass?.unitTopic || 'Quadratic Equation Factorization Ch. 4.2'}
            </strong>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={() => onNavigate('attendance')}
            className="flex-1 py-2.5 bg-[#176B87] hover:bg-[#125870] text-white rounded-lg text-xs font-semibold transition flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark Attendance</span>
          </button>

          {nextClass && (
            <button
              onClick={() => togglePeriodCompletion(nextClass.id, teacherName)}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                nextClass.status === 'COMPLETED'
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {nextClass.status === 'COMPLETED'
                  ? 'Lecture Completed ✓'
                  : 'Tick Lecture Completed'}
              </span>
            </button>
          )}

          <button
            onClick={() => onNavigate('classes')}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs transition cursor-pointer"
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-navy text-sm">Published Timetable &amp; Lecture Tracker</h3>
                <span className="text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  {completedTodayCount}/{displaySlots.length} Completed • {remainingTodayCount} Remaining
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {activeTimetableWeek} • Tick each lecture after completion to update Admin &amp; Student records
              </p>
            </div>
            <button
              onClick={() => onNavigate('classes')}
              className="text-xs text-teal font-semibold hover:underline flex items-center space-x-1 shrink-0 cursor-pointer"
            >
              <span>Full Week</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Day Filter Pills */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-1">
            {(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const).map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                  selectedDay === day
                    ? 'bg-navy text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {displaySlots.map((slot) => {
              const isCompleted = slot.status === 'COMPLETED';
              return (
                <div
                  key={slot.id}
                  className={`p-3.5 border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition ${
                    isCompleted
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-center font-mono shrink-0 w-16">
                      <p className="font-bold text-navy text-xs">Period {slot.period}</p>
                      <p className="text-[10px] text-slate-400">
                        {slot.timeRange.split('-')[0]?.trim()}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4
                          className={`font-bold text-sm ${
                            isCompleted ? 'text-emerald-950' : 'text-navy'
                          }`}
                        >
                          {slot.subject} — Grade {slot.gradeSection}
                        </h4>
                        {isCompleted && (
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                            ✓ Completed {slot.completedAt ? `at ${slot.completedAt}` : ''}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {slot.room} • {slot.timeRange}
                        {slot.unitTopic ? ` • ${slot.unitTopic}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => togglePeriodCompletion(slot.id, teacherName)}
                      className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer ${
                        isCompleted
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs'
                          : 'bg-slate-100 hover:bg-emerald-50 text-navy hover:text-emerald-800 border border-slate-200'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isCompleted ? 'Completed ✓' : 'Tick Completed'}</span>
                    </button>

                    <button
                      onClick={() => onNavigate('attendance')}
                      className="px-2.5 py-1.5 bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 rounded-lg font-bold text-xs flex items-center space-x-1 cursor-pointer"
                    >
                      <Bell className="w-3 h-3" />
                      <span>Attendance</span>
                    </button>
                  </div>
                </div>
              );
            })}
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

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleDraftQuizAi}
              disabled={isAiLoading}
              className="px-4 py-2 bg-caspaPurple-light hover:bg-purple-600 text-white rounded-lg font-bold text-xs transition shrink-0 shadow-sm disabled:opacity-50"
            >
              {isAiLoading ? 'Drafting...' : 'Quick Draft Quiz'}
            </button>
            <button
              onClick={() => onNavigate('caspa')}
              className="px-4 py-2 bg-white text-purple-950 hover:bg-purple-50 rounded-lg font-bold text-xs transition shrink-0 shadow-sm"
            >
              Open Full AI Copilot →
            </button>
          </div>
        </div>

        {aiDraftOutput && (
          <div className="p-3.5 bg-black/30 rounded-lg border border-purple-400/40 text-xs text-purple-100 whitespace-pre-line leading-relaxed">
            {aiDraftOutput}
          </div>
        )}
      </div>
    </div>
  );
};
