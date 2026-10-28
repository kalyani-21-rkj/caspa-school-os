import React, { useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  Upload,
  Calendar,
  Info,
  Check,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentAttendanceScreen: React.FC = () => {
  const { currentUser, attendanceHeatmap, absenceExcuses, submitAbsenceExcuse, showToast } = useApp();

  const [excuseDate, setExcuseDate] = useState('2026-09-22');
  const [excuseReason, setExcuseReason] = useState('');
  const [excuseAttachmentName, setExcuseAttachmentName] = useState<string>('');
  const [selectedDayInfo, setSelectedDayInfo] = useState<number | null>(14);

  const handleExcuseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!excuseReason.trim()) {
      showToast('Please specify a valid reason');
      return;
    }
    submitAbsenceExcuse(excuseDate, excuseReason, excuseAttachmentName || undefined);
    setExcuseReason('');
    setExcuseAttachmentName('');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar matching Teacher Module */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-teal">Attendance &amp; Leaves</span>
            <span>·</span>
            <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-semibold text-[11px]">
              Fall Term
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">
            Attendance Record &amp; Leave Portal
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            {currentUser?.fullName || 'Elena Vance'} • {currentUser?.designation || 'Grade 9B'} • Minimum requirement: 75.0%
          </p>
        </div>

          <div className="flex items-center space-x-3">
            <div className="px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">Rate</span>
              <span className="text-xl font-black text-emerald-700 font-mono">96.2%</span>
            </div>
            <div className="px-4 py-2.5 bg-purple-50 border border-purple-200 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-purple-800 tracking-wider block">Late</span>
              <span className="text-xl font-black text-purple-700 font-mono">2 Days</span>
            </div>
            <div className="px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-red-800 tracking-wider block">Absent</span>
              <span className="text-xl font-black text-red-700 font-mono">1 Day</span>
            </div>
          </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* September 2026 Monthly Calendar Heatmap (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-navy">September 2026 Attendance Heatmap</h2>
              <p className="text-xs text-slate-500">Tap on any day cell to inspect detailed status log</p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
                <span className="text-slate-600 font-medium">Present (19)</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-purple-600"></span>
                <span className="text-slate-600 font-medium">Late (2)</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-red-500"></span>
                <span className="text-slate-600 font-medium">Absent (1)</span>
              </span>
            </div>
          </div>

          {/* Calendar Day Header */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider py-1 border-b border-slate-100">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span className="text-slate-300">Sat</span>
            <span className="text-slate-300">Sun</span>
          </div>

          {/* 30 Day Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {attendanceHeatmap.map((day) => {
              const isPresent = day.status === 'PRESENT';
              const isLate = day.status === 'LATE';
              const isAbsent = day.status === 'ABSENT';
              const isWeekend = day.status === 'WEEKEND';
              const isSelected = selectedDayInfo === day.dayNumber;

              return (
                <button
                  key={day.dayNumber}
                  onClick={() => setSelectedDayInfo(day.dayNumber)}
                  className={`h-14 rounded-xl p-1.5 flex flex-col justify-between text-left transition border ${
                    isSelected ? 'ring-2 ring-teal ring-offset-1 font-bold' : ''
                  } ${
                    isPresent
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 hover:bg-emerald-100'
                      : isLate
                      ? 'bg-purple-50 border-purple-300 text-purple-900 hover:bg-purple-100'
                      : isAbsent
                      ? 'bg-red-50 border-red-300 text-red-900 hover:bg-red-100'
                      : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  <span className="text-xs font-mono font-bold leading-none">
                    {day.dayNumber}
                  </span>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="truncate uppercase font-bold text-[9px]">
                      {isPresent ? 'P' : isLate ? 'Late' : isAbsent ? 'Absent' : 'Off'}
                    </span>
                    {day.hasIncident && (
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Day Inspector */}
          {selectedDayInfo && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-teal text-white flex flex-col items-center justify-center font-mono">
                  <span className="text-[10px] leading-none uppercase">Sep</span>
                  <span className="text-base font-bold leading-none mt-0.5">{selectedDayInfo}</span>
                </div>
                <div>
                  <h4 className="font-bold text-navy text-sm">
                    {selectedDayInfo === 14
                      ? 'Medical Leave (Fever & Flu)'
                      : selectedDayInfo === 8 || selectedDayInfo === 22
                      ? 'Tardy Arrival (Bus Delay - 12m late)'
                      : 'Full Day Regular Attendance'}
                  </h4>
                  <p className="text-slate-500 text-[11px]">
                    {selectedDayInfo === 14
                      ? 'Designated medical excuse approved by Principal Dr. Sterling.'
                      : 'Verified by biometric RFID turnstile at Campus Gate A.'}
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg font-bold text-slate-700">
                {selectedDayInfo === 14 ? 'Excused Absence' : selectedDayInfo === 8 || selectedDayInfo === 22 ? 'Recorded Late' : 'Present (100%)'}
              </span>
            </div>
          )}
        </div>

        {/* Submit Absence Excuse Form */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-navy">Submit Absence Excuse</h3>
              <p className="text-xs text-slate-500">
                Official absence slips are reviewed by the class teacher and vice principal
              </p>
            </div>

            <form onSubmit={handleExcuseSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-navy">Date of Absence</label>
                <input
                  type="date"
                  value={excuseDate}
                  onChange={(e) => setExcuseDate(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-teal outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-navy">Reason &amp; Explanation</label>
                <textarea
                  value={excuseReason}
                  onChange={(e) => setExcuseReason(e.target.value)}
                  placeholder="e.g., Doctor appointment for dental checkup. Attached prescription slip."
                  rows={3}
                  className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-teal outline-none"
                ></textarea>
              </div>

              {/* Upload Doctor's Slip */}
              <label className="block p-3 border border-dashed border-slate-300 hover:border-teal rounded-xl text-center bg-slate-50 hover:bg-teal-50/30 text-xs text-slate-500 space-y-1 cursor-pointer transition">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setExcuseAttachmentName(file.name);
                      showToast(`Attached "${file.name}" to excuse request`);
                    }
                  }}
                  className="hidden"
                />
                <Upload className="w-4 h-4 text-teal mx-auto" />
                <span className="font-semibold text-navy block">
                  {excuseAttachmentName
                    ? `Attached: ${excuseAttachmentName}`
                    : 'Attach Medical Note or Letter (Optional)'}
                </span>
                <span className="block text-[10px] text-slate-400">
                  {excuseAttachmentName ? 'Click to change file' : 'PDF, JPG, PNG up to 10MB'}
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#176B87] hover:bg-[#12586e] text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Excuse Request</span>
              </button>
            </form>
          </div>

          {/* Existing Excuse Applications (Live Synced with Teacher Panel) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-navy uppercase tracking-wider">
                Recent Excuse Requests
              </h4>
              <span className="text-[10px] font-bold text-teal bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                Live Teacher Sync
              </span>
            </div>

            <div className="space-y-3">
              {absenceExcuses.map((excuse, idx) => {
                const isApproved = excuse.status === 'APPROVED';
                const isRejected = excuse.status === 'REJECTED';
                return (
                  <div
                    key={excuse.id || idx}
                    className={`p-3.5 rounded-xl border text-xs space-y-2 transition ${
                      isApproved
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : isRejected
                        ? 'bg-rose-50/40 border-rose-200'
                        : 'bg-amber-50/40 border-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="font-extrabold text-navy block">{excuse.date}</span>
                        <span className="text-[10px] text-slate-400">
                          Submitted: {excuse.submittedAt || 'Today'}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center space-x-1 ${
                          isApproved
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : isRejected
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {isApproved ? (
                          <Check className="w-3 h-3 stroke-[3]" />
                        ) : isRejected ? (
                          <X className="w-3 h-3 stroke-[3]" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        <span>
                          {isApproved
                            ? 'APPROVED BY TEACHER'
                            : isRejected
                            ? 'REJECTED BY TEACHER'
                            : 'PENDING TEACHER APPROVAL'}
                        </span>
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-700 font-medium">{excuse.reason}</p>

                    {excuse.attachmentName && (
                      <div className="text-[10px] text-teal font-bold bg-white/80 px-2 py-1 rounded border border-slate-200 inline-block">
                        📎 Attachment: {excuse.attachmentName}
                      </div>
                    )}

                    {/* Teacher Review Decision Banner */}
                    {excuse.status === 'PENDING' ? (
                      <div className="pt-1.5 border-t border-amber-200/70 flex items-center justify-between text-[10px] text-amber-800 font-semibold">
                        <span>Sent to Class Teacher (Mrs. Oswald) for review</span>
                        <span>Awaiting Decision</span>
                      </div>
                    ) : (
                      <div
                        className={`p-2 rounded-lg border text-[11px] space-y-0.5 ${
                          isApproved
                            ? 'bg-emerald-100/60 border-emerald-200 text-emerald-950'
                            : 'bg-rose-100/60 border-rose-200 text-rose-950'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-[10px]">
                          <span>
                            {isApproved ? '✓ Leave Approved' : '✕ Leave Rejected'} by{' '}
                            {excuse.reviewedBy || 'Mrs. Oswald (Class Teacher)'}
                          </span>
                          {excuse.reviewedAt && (
                            <span className="opacity-75">{excuse.reviewedAt}</span>
                          )}
                        </div>
                        {excuse.teacherNote && (
                          <p className="text-[11px] opacity-90">{excuse.teacherNote}</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
