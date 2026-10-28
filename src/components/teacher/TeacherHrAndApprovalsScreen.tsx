import React, { useState } from 'react';
import {
  Building2,
  CalendarPlus,
  CheckCircle2,
  Clock,
  Download,
  Plus,
  Send,
  X,
  XCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { downloadStaffPayrollSlipPdf } from '../../utils/downloadHelper';
import { ExecutiveApprovalTrackerCard } from '../common/ExecutiveApprovalTrackerCard';

export const TeacherHrAndApprovalsScreen: React.FC = () => {
  const {
    currentUser,
    principalStaffLeaves,
    staffPayrollRecords,
    submitTeacherLeaveRequest,
    absenceExcuses,
    reviewStudentAbsenceExcuse,
    showToast,
  } = useApp();

  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaveType, setLeaveType] = useState<'Medical' | 'Casual' | 'Duty'>('Casual');
  const [durationDates, setDurationDates] = useState('Oct 12 – Oct 13 (2d)');
  const [coverNote, setCoverNote] = useState(
    'Cover arranged with Mr. Charles Davis for Grade 9B Mathematics'
  );

  const teacherName = currentUser?.fullName || 'Mrs. Oswald';

  // Find this teacher's payroll record (or default to Mrs. Oswald's record)
  const myPayroll =
    staffPayrollRecords.find(
      (r) =>
        r.staffName.toLowerCase().includes(teacherName.toLowerCase()) ||
        teacherName.toLowerCase().includes('oswald')
    ) || staffPayrollRecords[0];

  // Filter leaves belonging to this teacher (plus show all staff leaves for transparency)
  const myLeaves = principalStaffLeaves.filter(
    (l) =>
      l.staffName.toLowerCase().includes(teacherName.toLowerCase()) ||
      l.staffId === currentUser?.id ||
      l.id === 'leave-oswald-1'
  );

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!durationDates.trim() || !coverNote.trim()) return;
    submitTeacherLeaveRequest({
      leaveType,
      durationDates: durationDates.trim(),
      note: coverNote.trim(),
    });
    setIsLeaveModalOpen(false);
  };

  const handleDownloadMyPayslip = () => {
    if (!myPayroll) return;
    downloadStaffPayrollSlipPdf({
      employeeId: myPayroll.employeeId,
      staffName: currentUser?.fullName || myPayroll.staffName,
      designation: currentUser?.designation || myPayroll.designation,
      department: myPayroll.department,
      salaryGrade: myPayroll.salaryGrade,
      monthlySalaryFormatted: myPayroll.monthlySalaryFormatted,
      bankName: myPayroll.bankName,
      accountNumberMasked: myPayroll.accountNumberMasked,
      ifscCode: myPayroll.ifscCode,
      monthYear: myPayroll.monthYear,
      status: myPayroll.status,
      utrNumber: myPayroll.utrNumber,
      disbursedAt: myPayroll.disbursedAt,
    });
    showToast(`Downloaded Official Payslip PDF for ${myPayroll.monthYear}`);
  };

  const isPaidToBank = myPayroll?.status === 'PAID_TO_BANK';

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-teal">Faculty HR, Payroll &amp; Governance</span>
            <span>·</span>
            <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-semibold text-[11px]">
              Live Sync with Principal Desk
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">
            Staff Leave, Bank Payroll &amp; Executive Approvals
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Submit leave requests to the Principal, track salary disbursement to your bank account, and follow executive requisitions.
          </p>
        </div>

        <button
          onClick={() => setIsLeaveModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2 bg-[#176B87] hover:bg-[#125870] text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer self-start sm:self-auto"
        >
          <CalendarPlus className="w-4 h-4" />
          <span>Apply for Staff Leave</span>
        </button>
      </div>

      {/* STUDENT LEAVE & ABSENCE EXCUSE APPROVALS (SYNCED FROM STUDENT PORTAL) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal block">
                Student Portal Leave Sync • Grade 9B
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
                {absenceExcuses.filter((e) => e.status === 'PENDING').length} Pending
              </span>
            </div>
            <h2 className="text-base font-extrabold text-navy mt-0.5">
              Student Absence Excuse &amp; Leave Requests
            </h2>
            <p className="text-xs text-slate-500">
              Approve or reject student leave/absence excuses submitted from the Student Portal. Decisions update immediately in the student&apos;s account.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {absenceExcuses.map((excuse, idx) => {
            const excuseId = excuse.id || `exc-${idx}`;
            const isApproved = excuse.status === 'APPROVED';
            const isRejected = excuse.status === 'REJECTED';
            return (
              <div
                key={excuseId}
                className={`p-4 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isApproved
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : isRejected
                    ? 'bg-rose-50/40 border-rose-200'
                    : 'bg-amber-50/40 border-amber-200'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-navy text-sm">
                      {excuse.studentName || 'Elena Vance'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                      {excuse.gradeSection || 'Grade 9B'}
                    </span>
                    <span className="text-[11px] font-bold text-teal">
                      Date: {excuse.date}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        isApproved
                          ? 'bg-emerald-100 text-emerald-800'
                          : isRejected
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {excuse.status}
                    </span>
                  </div>
                  <p className="text-slate-700 font-medium">{excuse.reason}</p>
                  {excuse.attachmentName && (
                    <span className="inline-block text-[10px] font-bold text-teal">
                      📎 Attachment: {excuse.attachmentName}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => reviewStudentAbsenceExcuse(excuseId, 'APPROVED')}
                    className={`px-3.5 py-2 rounded-lg font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer ${
                      isApproved
                        ? 'bg-emerald-700 text-white ring-2 ring-emerald-300'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isApproved ? 'Approved ✓' : 'Approve Leave'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => reviewStudentAbsenceExcuse(excuseId, 'REJECTED')}
                    className={`px-3.5 py-2 rounded-lg font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer ${
                      isRejected
                        ? 'bg-rose-700 text-white ring-2 ring-rose-300'
                        : 'bg-rose-600 hover:bg-rose-700 text-white'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>{isRejected ? 'Rejected ✕' : 'Reject Leave'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 1. Teacher Bank Salary & Payroll Status Card (Synced with Principal Payroll Summary) */}
      {myPayroll && (
        <div
          className={`rounded-2xl border p-5 shadow-xs space-y-4 ${
            isPaidToBank
              ? 'bg-emerald-50/40 border-emerald-200'
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isPaidToBank
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#0E2C48] text-cyan-300'
                }`}
              >
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-extrabold text-navy text-sm sm:text-base">
                    Monthly Salary &amp; Bank Account Status ({myPayroll.monthYear})
                  </h2>
                  {isPaidToBank ? (
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Payment Sent to Bank Account</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>Pending Principal Payroll Release</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Designated Bank: <strong>{myPayroll.bankName}</strong> • Account:{' '}
                  <strong className="font-mono">{myPayroll.accountNumberMasked}</strong> (IFSC:{' '}
                  <span className="font-mono">{myPayroll.ifscCode}</span>)
                </p>
              </div>
            </div>

            <button
              onClick={handleDownloadMyPayslip}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#0E2C48] hover:bg-[#123B5D] text-white text-xs font-bold shadow-2xs transition cursor-pointer self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5 text-cyan-300" />
              <span>Download Payslip PDF</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                Employee ID
              </span>
              <span className="text-sm font-black text-navy mt-0.5 block font-mono">
                {myPayroll.employeeId}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                Pay Scale Grade
              </span>
              <span className="text-sm font-black text-teal mt-0.5 block">
                {myPayroll.salaryGrade}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                Bank Mandate
              </span>
              <span className="text-sm font-bold text-slate-700 mt-0.5 block">
                {myPayroll.bankName} ({myPayroll.accountNumberMasked})
              </span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] font-bold text-emerald-800 uppercase block">
                Net Monthly Salary
              </span>
              <span className="text-lg font-black text-emerald-800 mt-0.5 block">
                {myPayroll.monthlySalaryFormatted}
              </span>
            </div>
          </div>

          {isPaidToBank ? (
            <div className="p-3 rounded-xl bg-emerald-100/70 border border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-emerald-950">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  <strong>Salary Credited to Bank Account:</strong> {myPayroll.monthlySalaryFormatted}{' '}
                  transferred to {myPayroll.bankName} ({myPayroll.accountNumberMasked}) on{' '}
                  <strong>{myPayroll.disbursedAt || 'Today'}</strong>.
                </span>
              </div>
              <span className="font-mono text-[11px] font-bold bg-white px-2.5 py-0.5 rounded border border-emerald-300 shrink-0">
                UTR: {myPayroll.utrNumber}
              </span>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Your {myPayroll.monthYear} salary ({myPayroll.monthlySalaryFormatted}) is queued in the Principal&apos;s Staff Payroll Summary ledger. Once the Principal clicks &ldquo;Send to Bank A/C&rdquo;, your live UTR confirmation will appear here immediately.
              </span>
            </div>
          )}
        </div>
      )}

      {/* 2. Staff Leave Requests Section (Synced with Principal Staff Leave) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-extrabold text-navy text-sm sm:text-base">
              My Staff Leave Applications (Principal Sync)
            </h3>
            <p className="text-xs text-slate-500">
              Leave requests submitted here appear in the Principal Module under Staff Leave; approvals update live.
            </p>
          </div>
          <button
            onClick={() => setIsLeaveModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-teal hover:bg-teal-hover text-white text-xs font-bold flex items-center space-x-1 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Leave Request</span>
          </button>
        </div>

        <div className="space-y-3">
          {myLeaves.map((leave) => (
            <div
              key={leave.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                leave.status === 'APPROVED'
                  ? 'border-emerald-200 bg-emerald-50/40'
                  : leave.status === 'REJECTED'
                  ? 'border-rose-200 bg-rose-50/40'
                  : 'border-slate-200 bg-slate-50/60'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-xs sm:text-sm text-[#0E2C48]">
                    {leave.leaveType} Leave — {leave.durationDates}
                  </span>
                  <span className="text-[10px] text-slate-500">({leave.staffName})</span>
                </div>
                <p className="text-xs text-slate-600">{leave.note}</p>
              </div>

              <div className="shrink-0">
                {leave.status === 'APPROVED' && (
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approved by Principal</span>
                  </span>
                )}
                {leave.status === 'REJECTED' && (
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-extrabold shadow-2xs">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Declined by Principal</span>
                  </span>
                )}
                {leave.status === 'PENDING' && (
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-100 text-amber-800 border border-amber-200 text-xs font-extrabold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Pending Principal Review</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Executive Approvals Tracker (Synced with Principal Executive Approvals) */}
      <ExecutiveApprovalTrackerCard roleContext="TEACHER" defaultCategory="Lab Purchase" />

      {/* Apply Staff Leave Modal */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-navy text-sm">
                Submit Staff Leave Request to Principal
              </h3>
              <button
                onClick={() => setIsLeaveModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleApplyLeave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Leave Category</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as 'Casual' | 'Medical' | 'Duty')}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal"
                >
                  <option value="Casual">Casual Leave</option>
                  <option value="Medical">Medical Leave</option>
                  <option value="Duty">Academic / Conference Duty</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Leave Dates &amp; Duration
                </label>
                <input
                  type="text"
                  required
                  value={durationDates}
                  onChange={(e) => setDurationDates(e.target.value)}
                  placeholder="e.g. Oct 14 – Oct 15 (2d)"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Reason &amp; Class Substitute Cover Arrangement
                </label>
                <textarea
                  rows={3}
                  required
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Specify class substitute teacher and reason..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal"
                />
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsLeaveModalOpen(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#176B87] hover:bg-[#125870] text-white font-bold flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send to Principal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
