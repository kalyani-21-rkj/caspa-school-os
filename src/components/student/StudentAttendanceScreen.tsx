import React, { useState, useEffect } from 'react';
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
  UserCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentAttendanceScreen: React.FC = () => {
  const {
    currentUser,
    teacherStudents,
    attendanceHeatmap,
    studentAttendanceLedger,
    activeAttendanceDate,
    selectedStudentForAttendanceView,
    setSelectedStudentForAttendanceView,
    absenceExcuses,
    submitAbsenceExcuse,
    showToast,
  } = useApp();

  const [excuseDate, setExcuseDate] = useState('2026-09-22');
  const [excuseReason, setExcuseReason] = useState('');
  const [excuseAttachmentName, setExcuseAttachmentName] = useState<string>('');
  const [selectedDateStr, setSelectedDateStr] = useState<string>(activeAttendanceDate || '2026-09-23');

  // Auto-select the date the teacher just marked when activeAttendanceDate changes
  useEffect(() => {
    if (activeAttendanceDate) {
      setSelectedDateStr(activeAttendanceDate);
    }
  }, [activeAttendanceDate]);

  // Determine which student's attendance is being viewed
  const activeStudentName =
    currentUser?.roleType === 'STUDENT' &&
    currentUser?.fullName &&
    currentUser.fullName !== 'Elena Vance'
      ? currentUser.fullName
      : selectedStudentForAttendanceView || currentUser?.fullName || 'Elena Vance';

  const activeStudentObj =
    teacherStudents.find(
      (s) => s.fullName.toLowerCase() === activeStudentName.toLowerCase()
    ) || teacherStudents[0];

  // Filter ledger entries for this particular student
  const studentLedgerEntries = studentAttendanceLedger.filter(
    (entry) =>
      entry.studentId === activeStudentObj?.id ||
      entry.studentName.toLowerCase() === activeStudentName.toLowerCase()
  );

  // Build 30-day September 2026 calendar overlaid with this student's real date-wise records
  const liveCalendarDays = attendanceHeatmap.map((day) => {
    const dateStr = day.dateStr || `2026-09-${String(day.dayNumber).padStart(2, '0')}`;
    const ledgerMatch = studentLedgerEntries.find((e) => e.date === dateStr);
    const mapEntry = activeStudentObj?.attendanceByDate?.[dateStr];

    if (ledgerMatch) {
      return {
        ...day,
        dateStr,
        status: ledgerMatch.status,
        hasIncident: ledgerMatch.status === 'ABSENT',
        markedByTeacher: ledgerMatch.markedBy,
        markedAt: ledgerMatch.markedAt,
        periodSubject: ledgerMatch.periodSubject,
        isTeacherMarked: true,
      };
    }

    if (mapEntry) {
      return {
        ...day,
        dateStr,
        status: mapEntry.status,
        hasIncident: mapEntry.status === 'ABSENT',
        markedByTeacher: mapEntry.markedBy,
        markedAt: mapEntry.markedAt,
        periodSubject: mapEntry.periodSubject,
        isTeacherMarked: true,
      };
    }

    return {
      ...day,
      dateStr,
      isTeacherMarked: Boolean(day.markedByTeacher),
    };
  });

  // Include any custom dates outside September 2026 that the teacher marked for this student
  const extraDateEntries = studentLedgerEntries.filter(
    (entry) => !liveCalendarDays.some((d) => d.dateStr === entry.date)
  );

  // Calculate real dynamic KPI counts for this particular student
  const schoolDaysInCalendar = liveCalendarDays.filter((d) => d.status !== 'WEEKEND');
  const presentCount =
    schoolDaysInCalendar.filter((d) => d.status === 'PRESENT').length +
    extraDateEntries.filter((e) => e.status === 'PRESENT').length;
  const lateCount =
    schoolDaysInCalendar.filter((d) => d.status === 'LATE').length +
    extraDateEntries.filter((e) => e.status === 'LATE').length;
  const absentCount =
    schoolDaysInCalendar.filter((d) => d.status === 'ABSENT').length +
    extraDateEntries.filter((e) => e.status === 'ABSENT').length;
  const totalEvaluatedDays = presentCount + lateCount + absentCount;
  const attendanceRate =
    totalEvaluatedDays > 0
      ? (((presentCount + lateCount * 0.5) / totalEvaluatedDays) * 100).toFixed(1)
      : '100.0';

  // Find details for currently selected date in inspector
  const selectedCalendarDay = liveCalendarDays.find((d) => d.dateStr === selectedDateStr);
  const selectedLedgerEntry = studentLedgerEntries.find((e) => e.date === selectedDateStr);

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
      {/* Header Bar with Real-Time Student Attendance Sync */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-teal">Attendance &amp; Leaves</span>
            <span>·</span>
            <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-semibold text-[11px]">
              Fall Term
            </span>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold text-[10px]">
              ● Live Synced with Teacher Roll Call
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">
            Attendance Record &amp; Leave Portal
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            {activeStudentObj?.fullName || activeStudentName} • Roll #{activeStudentObj?.rollNo || 14} • {activeStudentObj ? `${activeStudentObj.grade}${activeStudentObj.section}` : 'Grade 9B'} • Minimum requirement: 75.0%
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Student Switcher so user can verify any student marked in Teacher Panel */}
          <div className="bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs flex items-center space-x-2">
            <UserCheck className="w-4 h-4 text-teal shrink-0" />
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">
                Viewing Student Record
              </span>
              <select
                value={activeStudentObj?.fullName || activeStudentName}
                onChange={(e) => {
                  setSelectedStudentForAttendanceView(e.target.value);
                  showToast(`Viewing real-time attendance for ${e.target.value}`);
                }}
                className="text-xs font-extrabold text-navy bg-transparent outline-none cursor-pointer pr-1 mt-0.5"
              >
                {teacherStudents.map((std) => (
                  <option key={std.id} value={std.fullName}>
                    {std.fullName} (Roll #{std.rollNo})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <div className="px-3.5 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
                Real Rate
              </span>
              <span className="text-lg font-black text-emerald-700 font-mono">
                {attendanceRate}%
              </span>
            </div>
            <div className="px-3.5 py-2 bg-teal-50 border border-teal-200 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-teal-800 tracking-wider block">
                Present
              </span>
              <span className="text-lg font-black text-teal-700 font-mono">
                {presentCount} {presentCount === 1 ? 'Day' : 'Days'}
              </span>
            </div>
            <div className="px-3.5 py-2 bg-purple-50 border border-purple-200 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-purple-800 tracking-wider block">
                Late
              </span>
              <span className="text-lg font-black text-purple-700 font-mono">
                {lateCount} {lateCount === 1 ? 'Day' : 'Days'}
              </span>
            </div>
            <div className="px-3.5 py-2 bg-red-50 border border-red-200 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-red-800 tracking-wider block">
                Absent
              </span>
              <span className="text-lg font-black text-red-700 font-mono">
                {absentCount} {absentCount === 1 ? 'Day' : 'Days'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Calendar Heatmap + Date-Wise Teacher Roll Call Log (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-extrabold text-navy">
                  Attendance Calendar Heatmap ({activeStudentObj?.fullName || activeStudentName})
                </h2>
                <p className="text-xs text-slate-500">
                  Directly reflects date-wise attendance marked by Class Teacher • Tap any date cell to inspect
                </p>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
                  <span className="text-slate-600 font-medium">Present ({presentCount})</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-purple-600"></span>
                  <span className="text-slate-600 font-medium">Late ({lateCount})</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-red-500"></span>
                  <span className="text-slate-600 font-medium">Absent ({absentCount})</span>
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
              {liveCalendarDays.map((day) => {
                const isPresent = day.status === 'PRESENT';
                const isLate = day.status === 'LATE';
                const isAbsent = day.status === 'ABSENT';
                const isSelected = selectedDateStr === day.dateStr;

                return (
                  <button
                    key={day.dayNumber}
                    type="button"
                    onClick={() => setSelectedDateStr(day.dateStr)}
                    className={`h-14 rounded-xl p-1.5 flex flex-col justify-between text-left transition border cursor-pointer ${
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
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-mono font-bold leading-none">
                        {day.dayNumber}
                      </span>
                      {day.isTeacherMarked && (
                        <span
                          className="text-[8px] px-1 py-0.2 rounded bg-navy text-white font-bold uppercase"
                          title="Marked by Teacher"
                        >
                          Live
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="truncate uppercase font-bold text-[9px]">
                        {isPresent ? 'Present' : isLate ? 'Late' : isAbsent ? 'Absent' : 'Off'}
                      </span>
                      {isAbsent && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Extra Custom Dates Marked Outside September 2026 */}
            {extraDateEntries.length > 0 && (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-extrabold text-navy uppercase tracking-wider block">
                  Additional Dates Marked by Teacher:
                </span>
                <div className="flex flex-wrap gap-2">
                  {extraDateEntries.map((entry) => (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => setSelectedDateStr(entry.date)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-2 cursor-pointer transition ${
                        selectedDateStr === entry.date ? 'ring-2 ring-teal ring-offset-1' : ''
                      } ${
                        entry.status === 'PRESENT'
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                          : entry.status === 'LATE'
                          ? 'bg-purple-50 border-purple-300 text-purple-900'
                          : 'bg-red-50 border-red-300 text-red-900'
                      }`}
                    >
                      <span className="font-mono">{entry.date}</span>
                      <span>•</span>
                      <span>{entry.status}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Date Inspector */}
            {selectedDateStr && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-11 rounded-xl bg-teal text-white flex flex-col items-center justify-center font-mono shrink-0 px-1">
                    <span className="text-[9px] leading-none uppercase">
                      {selectedDateStr.slice(5, 7) === '09' ? 'Sep' : `M${selectedDateStr.slice(5, 7)}`}
                    </span>
                    <span className="text-sm font-bold leading-none mt-0.5">
                      {selectedDateStr.slice(8, 10)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-navy text-sm">
                        Date: {selectedDateStr} —{' '}
                        {selectedLedgerEntry
                          ? `${selectedLedgerEntry.status} (Marked in Teacher Roll Call)`
                          : selectedCalendarDay?.status === 'ABSENT'
                          ? 'Absent / Medical Leave'
                          : selectedCalendarDay?.status === 'LATE'
                          ? 'Late Arrival Recorded'
                          : selectedCalendarDay?.status === 'WEEKEND'
                          ? 'School Holiday / Weekend'
                          : 'Full Day Regular Attendance'}
                      </h4>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      {selectedLedgerEntry
                        ? `Marked by ${selectedLedgerEntry.markedBy} at ${selectedLedgerEntry.markedAt}${
                            selectedLedgerEntry.periodSubject
                              ? ` • ${selectedLedgerEntry.periodSubject}`
                              : ''
                          }`
                        : selectedCalendarDay?.markedByTeacher
                        ? `Marked by ${selectedCalendarDay.markedByTeacher} at ${
                            selectedCalendarDay.markedAt || '08:30 AM'
                          }`
                        : 'Verified in official school attendance register.'}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1.5 rounded-lg font-extrabold text-xs border shrink-0 ${
                    (selectedLedgerEntry?.status || selectedCalendarDay?.status) === 'PRESENT'
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                      : (selectedLedgerEntry?.status || selectedCalendarDay?.status) === 'LATE'
                      ? 'bg-purple-100 border-purple-300 text-purple-800'
                      : (selectedLedgerEntry?.status || selectedCalendarDay?.status) === 'ABSENT'
                      ? 'bg-red-100 border-red-300 text-red-800'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  {(selectedLedgerEntry?.status || selectedCalendarDay?.status) === 'PRESENT'
                    ? '✓ PRESENT'
                    : (selectedLedgerEntry?.status || selectedCalendarDay?.status) === 'LATE'
                    ? '⏰ LATE'
                    : (selectedLedgerEntry?.status || selectedCalendarDay?.status) === 'ABSENT'
                    ? '✕ ABSENT'
                    : 'WEEKEND'}
                </span>
              </div>
            )}
          </div>

          {/* Date-Wise Official Teacher Roll Call Log */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-navy">
                  Date-Wise Official Roll Call Ledger ({activeStudentObj?.fullName || activeStudentName})
                </h3>
                <p className="text-xs text-slate-500">
                  Every attendance entry marked by the Teacher by date appears here in real time
                </p>
              </div>
              <span className="text-[11px] font-bold text-teal bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                {studentLedgerEntries.length} Date Records
              </span>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {studentLedgerEntries.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400">
                  No date-specific teacher roll call entries recorded yet for this student.
                </div>
              ) : (
                studentLedgerEntries.map((entry) => (
                  <div
                    key={entry.id}
                    onClick={() => setSelectedDateStr(entry.date)}
                    className={`p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs hover:bg-slate-50 transition cursor-pointer ${
                      selectedDateStr === entry.date ? 'bg-sky-50/50' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="font-mono font-extrabold text-navy bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                        {entry.date}
                      </span>
                      <div>
                        <span className="font-bold text-navy block">
                          {entry.periodSubject || 'Morning Homeroom Roll Call'}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Marked by {entry.markedBy} at {entry.markedAt}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full font-extrabold text-[10px] inline-flex items-center space-x-1 self-start sm:self-center ${
                        entry.status === 'PRESENT'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : entry.status === 'LATE'
                          ? 'bg-purple-100 text-purple-800 border border-purple-300'
                          : 'bg-red-100 text-red-800 border border-red-300'
                      }`}
                    >
                      <span>
                        {entry.status === 'PRESENT'
                          ? '✓ PRESENT'
                          : entry.status === 'LATE'
                          ? '⏰ LATE'
                          : '✕ ABSENT'}
                      </span>
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
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
