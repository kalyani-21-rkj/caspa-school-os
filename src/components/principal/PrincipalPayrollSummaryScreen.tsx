import React, { useState } from 'react';
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  FileText,
  Search,
  Send,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  downloadInstituteFinancePdf,
  downloadStaffPayrollSlipPdf,
} from '../../utils/downloadHelper';

interface PrincipalPayrollSummaryScreenProps {
  onBack?: () => void;
}

export const PrincipalPayrollSummaryScreen: React.FC<PrincipalPayrollSummaryScreenProps> = ({
  onBack,
}) => {
  const {
    currentUser,
    staffPayrollRecords,
    principalDefaulters,
    disburseStaffPayroll,
    disburseAllStaffPayroll,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING_DISBURSEMENT' | 'PAID_TO_BANK'>('ALL');

  const pendingCount = staffPayrollRecords.filter((r) => r.status === 'PENDING_DISBURSEMENT').length;
  const disbursedCount = staffPayrollRecords.filter((r) => r.status === 'PAID_TO_BANK').length;
  const totalNetPayroll = staffPayrollRecords.reduce((acc, r) => acc + r.monthlySalaryNumeric, 0);
  const disbursedAmount = staffPayrollRecords
    .filter((r) => r.status === 'PAID_TO_BANK')
    .reduce((acc, r) => acc + r.monthlySalaryNumeric, 0);

  const filteredRecords = staffPayrollRecords.filter((record) => {
    const matchesStatus = statusFilter === 'ALL' || record.status === statusFilter;
    const matchesSearch =
      record.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.designation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleExportFullReport = () => {
    downloadInstituteFinancePdf({
      fiscalYear: 'FY 2026-27 (October Payroll & Institutional Ledger)',
      principalName: currentUser?.fullName || 'Dr. S. K. Mehta',
      collectedMtd: 'Rs. 18.2L',
      outstanding: 'Rs. 4.6L',
      overdue: 'Rs. 1.2L',
      collectionRate: '87%',
      totalPayrollMtd: 'Rs. 42.0L',
      defaulters: principalDefaulters.map((d) => ({
        studentName: d.studentName,
        gradeSection: d.gradeSection,
        amount: d.amount,
        status: d.status,
        noticeLevel: '2nd Official Notice',
      })),
      payrollRecords: staffPayrollRecords.map((p) => ({
        employeeId: p.employeeId,
        staffName: p.staffName,
        designation: p.designation,
        monthlySalaryFormatted: p.monthlySalaryFormatted,
        bankName: p.bankName,
        accountNumberMasked: p.accountNumberMasked,
        status: p.status,
        utrNumber: p.utrNumber,
      })),
    });
    showToast('Downloaded signed Staff Payroll & Finance Ledger PDF');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-2xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-teal" />
              <span>Back to Finance</span>
            </button>
          )}
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-teal">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Bursar &amp; Executive Payroll Mandate • Role Level 4</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0E2C48] tracking-tight">
              Staff Payroll Summary &amp; Bank Disbursement
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportFullReport}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-[#0E2C48] text-xs font-bold shadow-2xs transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-teal" />
            <span>Download Payroll PDF</span>
          </button>

          {pendingCount > 0 && (
            <button
              onClick={disburseAllStaffPayroll}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Disburse All Pending ({pendingCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Live Cross-Module Sync Info Banner */}
      <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between text-xs text-emerald-950">
        <div className="flex items-center space-x-2.5">
          <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Real-Time Teacher Bank Sync:</strong> When you disburse salary below, the payment status, NEFT/IMPS UTR reference, and downloadable Payslip PDF immediately appear in that Teacher&apos;s portal account.
          </span>
        </div>
        <span className="text-[10px] font-mono font-bold bg-emerald-200/80 text-emerald-900 px-2.5 py-0.5 rounded-full shrink-0 ml-2">
          NEFT / RTGS Active
        </span>
      </div>

      {/* 4 Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
            <span>Campus Monthly Mandate</span>
            <CreditCard className="w-4 h-4 text-teal" />
          </div>
          <div className="text-2xl font-black text-[#0E2C48] mt-1">₹42.0L</div>
          <div className="text-[11px] text-slate-500 mt-1">96 Total Faculty &amp; Staff</div>
        </div>

        <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-100 shadow-2xs">
          <div className="flex items-center justify-between text-[10px] font-bold text-sky-800 uppercase">
            <span>Executive Ledger Cohort</span>
            <Users className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-[#0E2C48] mt-1">
            ₹{totalNetPayroll.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-sky-700 font-medium mt-1">
            {staffPayrollRecords.length} Senior Faculty Accounts
          </div>
        </div>

        <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 shadow-2xs">
          <div className="flex items-center justify-between text-[10px] font-bold text-emerald-800 uppercase">
            <span>Sent to Bank A/C</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            {disbursedCount} / {staffPayrollRecords.length}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            ₹{disbursedAmount.toLocaleString('en-IN')} Settled
          </div>
        </div>

        <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-100 shadow-2xs">
          <div className="flex items-center justify-between text-[10px] font-bold text-amber-800 uppercase">
            <span>Pending Disbursement</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-800 mt-1">{pendingCount}</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            {pendingCount === 0 ? 'All salaries disbursed' : 'Awaiting Principal release'}
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          {(['ALL', 'PENDING_DISBURSEMENT', 'PAID_TO_BANK'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#0E2C48] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-[#0E2C48]'
              }`}
            >
              {st === 'ALL'
                ? `All Staff (${staffPayrollRecords.length})`
                : st === 'PENDING_DISBURSEMENT'
                ? `Pending (${pendingCount})`
                : `Sent to Bank (${disbursedCount})`}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teacher or department..."
            className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal w-full sm:w-64"
          />
        </div>
      </div>

      {/* Staff Payroll Cards / Table */}
      <div className="space-y-3">
        {filteredRecords.map((rec) => {
          const isPaid = rec.status === 'PAID_TO_BANK';
          return (
            <div
              key={rec.id}
              className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-xs transition ${
                isPaid ? 'border-emerald-200 bg-emerald-50/15' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Staff Identity */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#0E2C48] text-white font-black text-xs flex items-center justify-center shrink-0">
                    {rec.staffName
                      .replace(/^(Mrs\.|Mr\.|Ms\.|Dr\.)\s+/i, '')
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-extrabold text-sm sm:text-base text-[#0E2C48]">
                        {rec.staffName}
                      </h3>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {rec.employeeId}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-800">
                        {rec.department}
                      </span>
                      {isPaid ? (
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Sent to Bank Account</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Pending Bank Release</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {rec.designation} • Pay Scale: <strong>{rec.salaryGrade}</strong>
                    </p>

                    {/* Bank Account & Transaction Details */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-600 mt-2">
                      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        🏦 {rec.bankName} • A/C {rec.accountNumberMasked} ({rec.ifscCode})
                      </span>
                      <span>
                        Cycle: <strong>{rec.monthYear}</strong>
                      </span>
                      {rec.utrNumber && (
                        <span className="font-mono text-emerald-700 font-bold">
                          UTR: {rec.utrNumber} ({rec.disbursedAt})
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Salary Breakdown & Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-end gap-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <div className="bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 text-right">
                    <span className="text-[10px] text-teal font-bold uppercase block">
                      Net Monthly Salary
                    </span>
                    <span className="font-black text-base text-[#0E2C48]">
                      {rec.monthlySalaryFormatted}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => {
                        downloadStaffPayrollSlipPdf({
                          employeeId: rec.employeeId,
                          staffName: rec.staffName,
                          designation: rec.designation,
                          department: rec.department,
                          salaryGrade: rec.salaryGrade,
                          monthlySalaryFormatted: rec.monthlySalaryFormatted,
                          bankName: rec.bankName,
                          accountNumberMasked: rec.accountNumberMasked,
                          ifscCode: rec.ifscCode,
                          monthYear: rec.monthYear,
                          status: rec.status,
                          utrNumber: rec.utrNumber,
                          disbursedAt: rec.disbursedAt,
                        });
                        showToast(`Downloaded Payslip PDF for ${rec.staffName}`);
                      }}
                      className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer"
                      title="Download Official Salary Slip PDF"
                    >
                      <FileText className="w-3.5 h-3.5 text-teal" />
                      <span>Payslip PDF</span>
                    </button>

                    {!isPaid ? (
                      <button
                        onClick={() => disburseStaffPayroll(rec.id)}
                        className="px-4 py-2 rounded-xl bg-[#123B5D] hover:bg-[#176B87] text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs transition cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5 text-cyan-300" />
                        <span>Send to Bank A/C</span>
                      </button>
                    ) : (
                      <span className="px-3 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-extrabold flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Paid to Bank</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
