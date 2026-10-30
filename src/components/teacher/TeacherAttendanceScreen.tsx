import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  X,
  Clock,
  Sparkles,
  Users,
  CheckCheck,
  Radio,
  Send,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TeacherAttendanceScreenProps {
  onBack?: () => void;
}

export const TeacherAttendanceScreen: React.FC<TeacherAttendanceScreenProps> = ({ onBack }) => {
  const {
    teacherStudents,
    setStudentAttendance,
    markAllStudentsPresent,
    activeAttendanceDate,
    setActiveAttendanceDate,
    studentAttendanceLedger,
    absenceExcuses,
    reviewStudentAbsenceExcuse,
    showToast,
  } = useApp();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('ALL');
  const [selectedPeriodSubject, setSelectedPeriodSubject] = useState<string>('Period 1 • Mathematics');
  const [teacherNotesByExcuse, setTeacherNotesByExcuse] = useState<Record<string, string>>({});

  const pendingExcuseCount = absenceExcuses.filter((e) => e.status === 'PENDING').length;

  const filteredStudents = teacherStudents.filter(
    (s) =>
      selectedSectionFilter === 'ALL' ||
      s.section.toLowerCase() === selectedSectionFilter.toLowerCase() ||
      s.grade.toLowerCase().includes(selectedSectionFilter.toLowerCase())
  );

  const getStudentStatusForDate = (std: (typeof teacherStudents)[0]) => {
    const ledgerMatch = studentAttendanceLedger.find(
      (e) =>
        (e.studentId === std.id || e.studentName.toLowerCase() === std.fullName.toLowerCase()) &&
        e.date === activeAttendanceDate
    );
    if (ledgerMatch) return ledgerMatch.status;
    if (std.attendanceByDate?.[activeAttendanceDate]) {
      return std.attendanceByDate[activeAttendanceDate].status;
    }
    return std.attendanceStatus;
  };

  const getStudentLedgerEntryForDate = (std: (typeof teacherStudents)[0]) =>
    studentAttendanceLedger.find(
      (e) =>
        (e.studentId === std.id || e.studentName.toLowerCase() === std.fullName.toLowerCase()) &&
        e.date === activeAttendanceDate
    );

  const presentCount = filteredStudents.filter((s) => getStudentStatusForDate(s) === 'PRESENT').length;
  const absentCount = filteredStudents.filter((s) => getStudentStatusForDate(s) === 'ABSENT').length;
  const lateCount = filteredStudents.filter((s) => getStudentStatusForDate(s) === 'LATE').length;
  const totalCount = filteredStudents.length;
  const markedCount = presentCount + absentCount + lateCount;

  const handleSubmitAttendance = () => {
    setIsSubmitting(true);
    filteredStudents.forEach((std) => {
      const currentStatus = getStudentStatusForDate(std);
      setStudentAttendance(std.id, currentStatus, activeAttendanceDate, selectedPeriodSubject);
    });
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(
        `Committed Roll Call for ${activeAttendanceDate} (${selectedPeriodSubject}) • Synced to all Student & Parent Portals`
      );
    }, 300);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Bar with LIVE indicator (Image 6) */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-navy tracking-tight">
              Mark Attendance
            </h1>
            <p className="text-xs text-slate-500 font-medium flex items-center space-x-1.5">
              <span>Period 1</span>
              <span>•</span>
              <span>Active Roll Call</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-300 text-xs">
            <span className="font-bold text-slate-500 text-[11px]">Date:</span>
            <input
              type="date"
              value={activeAttendanceDate}
              onChange={(e) => setActiveAttendanceDate(e.target.value)}
              className="font-bold text-navy bg-transparent focus:outline-none text-xs cursor-pointer"
            />
          </div>

          <select
            value={selectedSectionFilter}
            onChange={(e) => setSelectedSectionFilter(e.target.value)}
            className="px-2.5 py-1 rounded-lg border border-slate-300 bg-white text-xs font-bold text-navy focus:outline-none focus:border-teal"
          >
            <option value="ALL">All Sections ({teacherStudents.length})</option>
            <option value="9B">Section 9B</option>
            <option value="9A">Section 9A</option>
            <option value="10A">Section 10A</option>
            <option value="10B">Section 10B</option>
            <option value="11 AP">Section 11 AP</option>
            <option value="12A">Section 12A</option>
          </select>

          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span>LIVE</span>
          </div>
        </div>
      </div>

      {/* Class Header Card with Date Selector Pills */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-teal uppercase tracking-widest block">
              {selectedSectionFilter === 'ALL' ? 'ALL ASSIGNED SECTIONS' : `SECTION ${selectedSectionFilter}`} • ROLL CALL DATE: {activeAttendanceDate}
            </span>
            <h2 className="text-xl font-extrabold text-navy mt-0.5">
              {selectedSectionFilter === 'ALL' ? 'Grade 9B & Assigned Cohorts — Mathematics' : `Grade ${selectedSectionFilter} — Mathematics`}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
              <span className="font-bold text-navy">Date: {activeAttendanceDate}</span>
              <span>•</span>
              <select
                value={selectedPeriodSubject}
                onChange={(e) => setSelectedPeriodSubject(e.target.value)}
                className="font-semibold text-teal bg-teal-50/70 px-2 py-0.5 rounded border border-teal-200 text-xs focus:outline-none"
              >
                <option value="Period 1 • Mathematics">Period 1 • Mathematics</option>
                <option value="Period 2 • English Literature">Period 2 • English Literature</option>
                <option value="Period 3 • AP Physics">Period 3 • AP Physics</option>
                <option value="Period 4 • World History">Period 4 • World History</option>
              </select>
              <span>•</span>
              <span>Room 204</span>
            </div>
          </div>

          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-xl font-serif">
            Σ
          </div>
        </div>

        {/* Quick Date Switcher Pills for September 2026 Calendar */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-[10px] font-bold uppercase text-slate-400 mr-1">
            Quick Roll Call Date:
          </span>
          {[
            { label: 'Sep 14', date: '2026-09-14' },
            { label: 'Sep 21', date: '2026-09-21' },
            { label: 'Sep 22', date: '2026-09-22' },
            { label: 'Sep 23', date: '2026-09-23' },
            { label: 'Sep 24', date: '2026-09-24' },
            { label: 'Sep 25', date: '2026-09-25' },
            { label: 'Sep 28', date: '2026-09-28' },
            { label: 'Sep 29', date: '2026-09-29' },
            { label: 'Sep 30', date: '2026-09-30' },
          ].map((d) => (
            <button
              key={d.date}
              type="button"
              onClick={() => setActiveAttendanceDate(d.date)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                activeAttendanceDate === d.date
                  ? 'bg-[#176B87] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* TALLY BREAKDOWN (Image 6) */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wider text-slate-500 text-[11px]">
            TALLY BREAKDOWN
          </span>
          <span className="font-bold text-navy text-xs">
            {markedCount}/{totalCount} marked
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center space-x-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span className="font-semibold text-emerald-900">Present: {presentCount}</span>
          </div>

          <div className="p-2.5 bg-red-50 rounded-lg border border-red-200 flex items-center space-x-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            <span className="font-semibold text-red-900">Absent: {absentCount}</span>
          </div>

          <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 flex items-center space-x-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
            <span className="font-semibold text-amber-900">Late: {lateCount}</span>
          </div>
        </div>
      </div>

      {/* Student Absence Excuse & Leave Requests (Synced from Student Portal) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-extrabold text-navy">
                Student Absence Excuse &amp; Leave Requests
              </h3>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  pendingExcuseCount > 0
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}
              >
                {pendingExcuseCount > 0
                  ? `${pendingExcuseCount} Pending Review`
                  : 'All Reviewed ✓'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Leave &amp; absence excuses submitted by students in the Student Portal appear here for Class Teacher approval or rejection.
            </p>
          </div>
          <span className="text-[10px] font-bold text-teal bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200 shrink-0">
            Two-Way Student Sync Active
          </span>
        </div>

        <div className="space-y-3">
          {absenceExcuses.map((excuse, idx) => {
            const excuseId = excuse.id || `exc-${idx}`;
            const isApproved = excuse.status === 'APPROVED';
            const isRejected = excuse.status === 'REJECTED';
            const isPending = excuse.status === 'PENDING';

            return (
              <div
                key={excuseId}
                className={`p-4 rounded-xl border text-xs space-y-3 transition ${
                  isPending
                    ? 'bg-amber-50/40 border-amber-200'
                    : isApproved
                    ? 'bg-emerald-50/30 border-emerald-200'
                    : 'bg-rose-50/30 border-rose-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-navy text-white font-bold flex items-center justify-center text-xs shrink-0">
                      {(excuse.studentName || 'Elena Vance')
                        .split(' ')
                        .map((w) => w[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-navy text-sm">
                          {excuse.studentName || 'Elena Vance'}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                          {excuse.gradeSection || 'Grade 9B'}
                        </span>
                        {excuse.rollNo && (
                          <span className="text-[10px] text-slate-500 font-semibold">
                            Roll #{excuse.rollNo}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Absence Date: <strong className="text-navy">{excuse.date}</strong> • Submitted:{' '}
                        {excuse.submittedAt || 'Today'}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold self-start sm:self-center ${
                      isApproved
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : isRejected
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {isApproved ? '✓ APPROVED' : isRejected ? '✕ REJECTED' : '⏳ PENDING APPROVAL'}
                  </span>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-slate-700">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">
                    Student Reason / Explanation
                  </span>
                  <p className="text-xs font-medium text-navy">{excuse.reason}</p>
                  {excuse.attachmentName && (
                    <span className="mt-1.5 inline-block text-[10px] font-bold text-teal bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      📎 Attached File: {excuse.attachmentName}
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={teacherNotesByExcuse[excuseId] ?? excuse.teacherNote ?? ''}
                    onChange={(e) =>
                      setTeacherNotesByExcuse((prev) => ({
                        ...prev,
                        [excuseId]: e.target.value,
                      }))
                    }
                    placeholder="Add optional teacher remark for student (e.g., Medical note verified)..."
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs text-navy focus:outline-none focus:border-teal"
                  />

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        reviewStudentAbsenceExcuse(
                          excuseId,
                          'APPROVED',
                          teacherNotesByExcuse[excuseId]
                        )
                      }
                      className={`px-3.5 py-2 rounded-lg font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer ${
                        isApproved
                          ? 'bg-emerald-700 text-white ring-2 ring-emerald-300'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>{isApproved ? 'Approved ✓' : 'Approve Leave'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        reviewStudentAbsenceExcuse(
                          excuseId,
                          'REJECTED',
                          teacherNotesByExcuse[excuseId]
                        )
                      }
                      className={`px-3.5 py-2 rounded-lg font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer ${
                        isRejected
                          ? 'bg-rose-700 text-white ring-2 ring-rose-300'
                          : 'bg-rose-600 hover:bg-rose-700 text-white shadow-2xs'
                      }`}
                    >
                      <X className="w-3.5 h-3.5 stroke-[3]" />
                      <span>{isRejected ? 'Rejected ✕' : 'Reject Leave'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fast Action Row */}
      <div className="flex items-center justify-between text-xs px-1">
        <button
          onClick={() =>
            markAllStudentsPresent(activeAttendanceDate, selectedSectionFilter, selectedPeriodSubject)
          }
          className="flex items-center space-x-1.5 text-teal font-bold hover:underline cursor-pointer"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark All Present for {activeAttendanceDate}</span>
        </button>

        <span className="text-slate-400 text-[11px]">
          Marking Attendance for <strong className="text-navy">{activeAttendanceDate}</strong> • Synced to Student Panel
        </span>
      </div>

      {/* Student List with Interactive P / A / L Buttons (Date-Stamped) */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
        {filteredStudents.map((std) => {
          const currentStatus = getStudentStatusForDate(std);
          const dateEntry = getStudentLedgerEntryForDate(std);

          return (
            <div
              key={std.id}
              className="p-4 flex items-center justify-between hover:bg-slate-50 transition"
            >
              {/* Student Info */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs shrink-0">
                  {std.avatarInitials}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-navy text-sm">{std.fullName}</h4>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                      Sec {std.section}
                    </span>
                    {dateEntry && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          dateEntry.status === 'PRESENT'
                            ? 'bg-emerald-100 text-emerald-800'
                            : dateEntry.status === 'ABSENT'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        ✓ {dateEntry.status} on {activeAttendanceDate} ({dateEntry.markedAt})
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Roll No. {String(std.rollNo).padStart(2, '0')} • {std.grade}
                    {std.parentName ? ` • Guardian: ${std.parentName} (${std.parentPhone})` : ''}
                  </p>
                  {std.instructorNote && (
                    <p className="text-[10px] text-teal font-medium mt-0.5">
                      {std.instructorNote}
                    </p>
                  )}
                </div>
              </div>

              {/* Status Buttons P / A / L */}
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() =>
                    setStudentAttendance(std.id, 'PRESENT', activeAttendanceDate, selectedPeriodSubject)
                  }
                  className={`w-9 h-9 rounded-full font-extrabold text-xs transition flex items-center justify-center cursor-pointer ${
                    currentStatus === 'PRESENT'
                      ? 'bg-emerald-600 text-white shadow-xs scale-105 ring-2 ring-emerald-300'
                      : 'bg-slate-100 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                  title={`Mark ${std.fullName} Present on ${activeAttendanceDate}`}
                >
                  P
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setStudentAttendance(std.id, 'ABSENT', activeAttendanceDate, selectedPeriodSubject)
                  }
                  className={`w-9 h-9 rounded-full font-extrabold text-xs transition flex items-center justify-center cursor-pointer ${
                    currentStatus === 'ABSENT'
                      ? 'bg-red-600 text-white shadow-xs scale-105 ring-2 ring-red-300'
                      : 'bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-700'
                  }`}
                  title={`Mark ${std.fullName} Absent on ${activeAttendanceDate}`}
                >
                  A
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setStudentAttendance(std.id, 'LATE', activeAttendanceDate, selectedPeriodSubject)
                  }
                  className={`w-9 h-9 rounded-full font-extrabold text-xs transition flex items-center justify-center cursor-pointer ${
                    currentStatus === 'LATE'
                      ? 'bg-amber-600 text-white shadow-xs scale-105 ring-2 ring-amber-300'
                      : 'bg-slate-100 text-slate-500 hover:bg-amber-50 hover:text-amber-700'
                  }`}
                  title={`Mark ${std.fullName} Late on ${activeAttendanceDate}`}
                >
                  L
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CASPA Assistant Insight Card (Image 6) */}
      <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1.5 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-full bg-caspaPurple text-white flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-yellow-300" />
          </div>
          <span className="font-bold text-navy text-[11px] uppercase tracking-wide">
            CASPA Assistant
          </span>
          <span className="bg-purple-100 text-caspaPurple px-1.5 py-0.2 rounded text-[10px] font-bold">
            Insight
          </span>
        </div>
        <p className="text-slate-700 leading-relaxed text-xs">
          Marcus Brody has 2 consecutive absences in Period 1. Automated SMS alert queued for guardian after confirmation.
        </p>
      </div>

      {/* Submission Confirmation Bar (Image 6) */}
      <div className="space-y-3 pt-2">
        <p className="text-[11px] text-slate-500 text-center flex items-center justify-center space-x-1.5">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          <span>Once submitted, record syncs immediately to Student &amp; Parent Portals.</span>
        </p>

        <button
          onClick={handleSubmitAttendance}
          disabled={isSubmitting}
          className="w-full py-3.5 bg-[#176B87] hover:bg-[#125870] text-white font-bold rounded-xl text-sm transition shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>
            {isSubmitting
              ? 'Submitting Attendance...'
              : `Submit Attendance (${markedCount}/${totalCount} Marked)`}
          </span>
        </button>
      </div>
    </div>
  );
};
