import React, { useState } from 'react';
import {
  CalendarCheck,
  TrendingUp,
  Download,
  CalendarPlus,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Award,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ParentAttendanceScreen: React.FC = () => {
  const {
    activeChild,
    parentLeaves,
    applyParentStudentLeave,
    showToast,
  } = useApp();

  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaveStartDate, setLeaveStartDate] = useState('');
  const [leaveEndDate, setLeaveEndDate] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveType, setLeaveType] = useState<'SICK' | 'CASUAL' | 'FAMILY'>('SICK');

  const childLeaves = parentLeaves.filter((l) => l.childId === activeChild.id);

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveStartDate || !leaveEndDate || !leaveReason) return;
    applyParentStudentLeave({
      childId: activeChild.id,
      startDate: leaveStartDate,
      endDate: leaveEndDate,
      reason: leaveReason,
      type: leaveType,
    });
    setIsLeaveModalOpen(false);
    setLeaveReason('');
    setLeaveStartDate('');
    setLeaveEndDate('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Attendance &amp; Curricular Progress
          </h2>
          <p className="text-xs text-slate-500">
            Real-time RFID biometric logs, instructional adherence, and academic performance
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsLeaveModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-teal hover:bg-teal-dark text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-xs"
          >
            <CalendarPlus className="w-3.5 h-3.5" />
            <span>Apply For Leave</span>
          </button>
          <button
            onClick={() => showToast(`Biometric Attendance Certificate downloaded for ${activeChild.fullName}`)}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5 text-teal" />
            <span>Attendance Slip</span>
          </button>
        </div>
      </div>

      {/* Hero Overview Ring & KPI Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Attendance Ring Card (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center justify-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Overall Term 1 Attendance
          </span>

          <div className="relative w-40 h-40 my-4 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="transparent"
                stroke="#E2E8F0"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="transparent"
                stroke="#0D9488"
                strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - (activeChild.attendancePercent || 94.2) / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {activeChild.attendancePercent}%
              </span>
              <span className="text-[10px] font-bold text-teal uppercase tracking-wider mt-0.5">
                Eligible
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full mt-2 pt-4 border-t border-slate-100 text-center">
            <div className="p-2.5 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-400 font-bold block">Present Days</span>
              <span className="text-sm font-black text-slate-900">{activeChild.presentDays} Days</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-400 font-bold block">Required Floor</span>
              <span className="text-sm font-black text-emerald-600">85% Minimum</span>
            </div>
          </div>
        </div>

        {/* Curricular Mastery Bars (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                Subject Mastery &amp; Assessment Benchmark
              </h3>
              <p className="text-xs text-slate-500">
                Continuous formative grading and teacher evaluation
              </p>
            </div>
            <span className="text-xs font-black text-teal px-2.5 py-1 rounded-xl bg-teal/10">
              {activeChild.gpa}
            </span>
          </div>

          <div className="space-y-3.5">
            {activeChild.academicPerformance.map((subj, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800">{subj.subject}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-500 font-medium">Grade {subj.grade}</span>
                    <span className="text-slate-900 font-black">{subj.score}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      subj.score >= 90
                        ? 'bg-emerald-500'
                        : subj.score >= 80
                        ? 'bg-teal'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${subj.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Formative assessment stats */}
          <div className="pt-2 grid grid-cols-3 gap-3 text-center border-t border-slate-100">
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-400 font-bold block">Term 1 Exam</span>
              <span className="text-xs font-black text-slate-800">92.4% (Rank 4)</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-400 font-bold block">Formative Quizzes</span>
              <span className="text-xs font-black text-slate-800">95.0%</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-400 font-bold block">Lab Practicals</span>
              <span className="text-xs font-black text-slate-800">48 / 50</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Attendance Calendar Heatmap */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">
              Monthly Attendance Heatmap (October 2026)
            </h3>
            <p className="text-xs text-slate-500">
              Biometric gate scanner timestamps recorded at Gate 3 &amp; Bus 4B
            </p>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-600">Present</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-slate-600">Excused Leave</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="text-slate-600">Weekend / Recess</span>
            </span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3 pt-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
            <div key={d} className="text-center font-bold text-xs text-slate-400 pb-1">
              {d}
            </div>
          ))}

          {/* 31 days representation */}
          {Array.from({ length: 31 }).map((_, i) => {
            const dayNum = i + 1;
            const isWeekend = (dayNum + 2) % 7 === 6 || (dayNum + 2) % 7 === 0;
            const isExcused = dayNum === 14;
            const isFuture = dayNum > 15;

            return (
              <div
                key={dayNum}
                className={`p-2.5 rounded-xl border text-center transition ${
                  isFuture
                    ? 'bg-slate-50/60 text-slate-400 border-slate-100'
                    : isExcused
                    ? 'bg-amber-50 text-amber-900 border-amber-200 shadow-xs'
                    : isWeekend
                    ? 'bg-slate-100 text-slate-500 border-slate-200'
                    : 'bg-emerald-50 text-emerald-900 border-emerald-200 shadow-xs'
                }`}
              >
                <div className="text-xs font-bold">{dayNum}</div>
                <div className="text-[9px] font-extrabold uppercase mt-1">
                  {isFuture ? '—' : isExcused ? 'EXC' : isWeekend ? 'W/E' : '08:14'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leave Application History */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="font-extrabold text-sm text-slate-900">
            Leave Requests &amp; Excuse Dossier
          </h3>
          <span className="text-xs text-slate-400 font-semibold">
            {childLeaves.length} Records
          </span>
        </div>

        <div className="space-y-3">
          {childLeaves.map((leave) => (
            <div
              key={leave.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900">
                    {leave.startDate} to {leave.endDate}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      leave.status === 'APPROVED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {leave.status}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold">
                    {leave.type}
                  </span>
                </div>
                <p className="text-slate-600 mt-1">Reason: {leave.reason}</p>
                {leave.teacherRemark && (
                  <p className="text-[11px] text-teal mt-0.5 font-semibold">
                    Note: {leave.teacherRemark}
                  </p>
                )}
              </div>

              <span className="text-[10px] text-slate-400 self-end sm:self-auto font-mono">
                Applied: {leave.appliedDate}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Leave Modal */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-slate-900">
                Apply Leave for {activeChild?.fullName}
              </h3>
              <button
                onClick={() => setIsLeaveModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyLeave} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Leave Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['SICK', 'CASUAL', 'FAMILY'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setLeaveType(cat)}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        leaveType === cat
                          ? 'bg-teal text-white border-teal shadow-xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">From Date</label>
                  <input
                    type="date"
                    required
                    value={leaveStartDate}
                    onChange={(e) => setLeaveStartDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border rounded-xl border-slate-200 focus:outline-none focus:border-teal"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">To Date</label>
                  <input
                    type="date"
                    required
                    value={leaveEndDate}
                    onChange={(e) => setLeaveEndDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border rounded-xl border-slate-200 focus:outline-none focus:border-teal"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Reason for Absence
                </label>
                <textarea
                  required
                  rows={3}
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  placeholder="Provide context for class tutor and attendance registry..."
                  className="w-full px-3 py-2 text-xs border rounded-xl border-slate-200 focus:outline-none focus:border-teal"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsLeaveModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-teal hover:bg-teal-dark text-white shadow-sm"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
