import React, { useState } from 'react';
import {
  CreditCard,
  TrendingUp,
  AlertTriangle,
  Download,
  Lock,
  Clock,
  ChevronRight,
  Send,
  CheckCircle2,
  Calendar,
  FileText,
  DollarSign,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PrincipalDefaulterLedgerScreen } from './PrincipalDefaulterLedgerScreen';
import { PrincipalPayrollSummaryScreen } from './PrincipalPayrollSummaryScreen';
import { downloadInstituteFinancePdf } from '../../utils/downloadHelper';

export const PrincipalFinanceScreen: React.FC = () => {
  const {
    currentUser,
    principalDefaulters,
    staffPayrollRecords,
    sendFeeReminder,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'fees' | 'expenses' | 'budgets' | 'payroll'>('fees');
  const [timeframe, setTimeframe] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [selectedDefaulterId, setSelectedDefaulterId] = useState<string | null>(null);
  const [showPayrollSummaryPage, setShowPayrollSummaryPage] = useState(false);

  // If a student defaulter is selected, render dedicated ledger screen
  if (selectedDefaulterId) {
    return (
      <PrincipalDefaulterLedgerScreen
        defaulterId={selectedDefaulterId}
        onBack={() => setSelectedDefaulterId(null)}
      />
    );
  }

  // If Staff Payroll Summary page is opened, render the dedicated Staff Payroll Summary screen
  if (showPayrollSummaryPage || activeTab === 'payroll') {
    return (
      <PrincipalPayrollSummaryScreen
        onBack={() => {
          setShowPayrollSummaryPage(false);
          setActiveTab('fees');
        }}
      />
    );
  }

  const handleSendReminder = (id: string, name: string) => {
    sendFeeReminder(id);
    showToast(`Dispatched official fee notice to guardians of ${name}`);
  };

  const handleDownloadFinancePdf = () => {
    downloadInstituteFinancePdf({
      fiscalYear: 'FY 2024-25 / 2026-27',
      principalName: currentUser?.fullName || 'Dr. S. K. Mehta',
      collectedMtd: 'Rs. 18.2L (84%)',
      outstanding: 'Rs. 4.6L (142 balances)',
      overdue: 'Rs. 1.2L (38 accounts)',
      collectionRate: '87% (+2.4% vs Term 1)',
      totalPayrollMtd: 'Rs. 42.0L',
      defaulters: principalDefaulters.map((d) => ({
        studentName: d.studentName,
        gradeSection: d.gradeSection,
        amount: d.amount,
        status: d.status,
        noticeLevel: 'Official Reminder Sent',
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
    showToast('Downloaded Institutional Finance & Payroll Report PDF');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Information Banner (Matching image_26ebe089.png) */}
      <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start space-x-2.5 text-xs text-slate-600">
        <HelpCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Summary view — detailed ledger audits and student account reversals require elevated Accounts role credentials.
        </p>
      </div>

      {/* Header Row: Institutional Finance & FY Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-3.5 h-6 rounded-sm bg-teal"></div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0E2C48] tracking-tight">
            Institutional Finance
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-teal" />
            <span>FY 24–25</span>
          </div>
          <button
            onClick={handleDownloadFinancePdf}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#0E2C48] hover:bg-[#123B5D] text-white text-xs font-bold shadow-2xs transition cursor-pointer"
            title="Download Institutional Finance Report PDF"
          >
            <Download className="w-3.5 h-3.5 text-cyan-300" />
            <span>Download Finance PDF</span>
          </button>
        </div>
      </div>

      {/* Key Metric Grid (Matching image_26ebe089.png) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Collected MTD */}
        <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-100 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-sky-800 uppercase">
            <span>Collected MTD</span>
            <CreditCard className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-[#0E2C48] mt-1.5">₹18.2L</div>
          <div className="w-full h-1.5 bg-sky-200 rounded-full mt-2.5 overflow-hidden">
            <div className="h-full bg-teal rounded-full" style={{ width: '84%' }}></div>
          </div>
          <div className="text-[10px] text-right font-bold text-teal mt-1">84%</div>
        </div>

        {/* Outstanding */}
        <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-100 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-amber-800 uppercase">
            <span>Outstanding</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-900 mt-1.5">₹4.6L</div>
          <div className="text-[11px] text-amber-700/80 font-medium mt-3 flex items-center space-x-1">
            <span>👥</span>
            <span>142 balances</span>
          </div>
        </div>

        {/* Overdue */}
        <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-100 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-rose-800 uppercase">
            <span>Overdue</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-rose-600 mt-1.5">₹1.2L</div>
          <div className="text-[11px] text-rose-700/90 font-medium mt-3 flex items-center space-x-1">
            <span>⚠️</span>
            <span>38 accounts alert</span>
          </div>
        </div>

        {/* Collection Rate */}
        <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-emerald-800 uppercase">
            <span>Collection Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-1.5">87%</div>
          <div className="text-[11px] text-emerald-700 font-bold mt-3 flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+2.4% vs Term 1</span>
          </div>
        </div>
      </div>

      {/* Collection Velocity Chart Card (Matching image_26ebe089.png) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-extrabold text-navy text-base">Collection Velocity</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Monthly growth trajectory towards ₹21.0L quota
            </p>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold w-fit">
            {(['monthly', 'quarterly', 'yearly'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1 rounded-lg capitalize transition ${
                  timeframe === t ? 'bg-white text-navy shadow-2xs' : 'text-slate-500 hover:text-navy'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs font-semibold mb-3">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#123B5D]"></span>
            <span className="text-slate-600">Actual (₹18.2L)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-200"></span>
            <span className="text-slate-400">Target Ceiling (₹21.0L)</span>
          </div>
        </div>

        {/* Chart SVG */}
        <div className="bg-gradient-to-b from-sky-50/30 to-white rounded-xl border border-slate-100 p-4 relative overflow-hidden">
          <div className="h-36 w-full relative">
            <svg className="w-full h-full" viewBox="0 0 500 130" preserveAspectRatio="none">
              <defs>
                <linearGradient id="financeFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#176B87" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#176B87" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Target dotted line */}
              <line x1="40" y1="95" x2="460" y2="25" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
              {/* Shaded Area */}
              <path
                d="M 40 98 Q 150 90, 240 68 T 460 32 L 460 130 L 40 130 Z"
                fill="url(#financeFill)"
              />
              {/* Actual Curve */}
              <path
                d="M 40 98 Q 150 90, 240 68 T 460 32"
                fill="none"
                stroke="#123B5D"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Nodes */}
              <circle cx="40" cy="98" r="4.5" fill="#123B5D" stroke="#ffffff" strokeWidth="2" />
              <circle cx="160" cy="85" r="4.5" fill="#123B5D" stroke="#ffffff" strokeWidth="2" />
              <circle cx="300" cy="56" r="4.5" fill="#123B5D" stroke="#ffffff" strokeWidth="2" />
              <circle cx="460" cy="32" r="5" fill="#176B87" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 pt-3 border-t border-slate-100 font-medium">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span className="font-extrabold text-[#0E2C48]">Week 4 (Current)</span>
          </div>
        </div>
      </div>

      {/* Subtabs: Fee Collection, Expenses, Budgets, Payroll */}
      <div className="flex border-b border-slate-200 overflow-x-auto space-x-6 text-xs font-bold scrollbar-none">
        {[
          { id: 'fees', label: 'Fee Collection' },
          { id: 'expenses', label: 'Expenses' },
          { id: 'budgets', label: 'Budgets' },
          { id: 'payroll', label: 'Payroll 🔒' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-2.5 transition whitespace-nowrap relative ${
              activeTab === tab.id
                ? 'text-teal border-b-2 border-teal'
                : 'text-slate-500 hover:text-[#0E2C48]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cohort Completion Breakdown & Overdue Defaulters */}
      {activeTab === 'fees' && (
        <div className="space-y-6">
          {/* Cohort Completion Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-navy text-sm">Cohort Completion Breakdown</h3>
                <p className="text-xs text-slate-500 mt-0.5">Real-time payment rate across grades</p>
              </div>
              <span className="text-[10px] font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded-full">
                5 Grades
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Grade 11 */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="font-bold text-[#0E2C48]">Grade 11</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-500 font-medium text-[11px]">88 / 99 paid</span>
                    <span className="font-black text-teal">89% &gt;</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-[#123B5D] rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>

              {/* Grade 10 */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="font-bold text-[#0E2C48]">Grade 10</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-500 font-medium text-[11px]">92 / 107 paid</span>
                    <span className="font-black text-teal">86% &gt;</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-[#176B87] rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>

              {/* Grade 9 */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-[#0E2C48]">Grade 9</span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-500 font-medium text-[11px]">88 / 109 paid</span>
                    <span className="font-black text-amber-600">81% &gt;</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '81%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Overdue Defaulters List (Matching image_26ebe089.png) */}
          <div className="space-y-3">
            {principalDefaulters.map((defaulter) => (
              <div
                key={defaulter.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-teal transition cursor-pointer"
                onClick={() => setSelectedDefaulterId(defaulter.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#0E2C48] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                    {defaulter.studentName.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-sm text-[#0E2C48] hover:text-teal transition">
                        {defaulter.studentName}
                      </h4>
                      <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                        View Ledger &rarr;
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{defaulter.gradeSection}</p>
                    <span className="text-[10px] font-bold text-rose-600 flex items-center space-x-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{defaulter.status}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-right">
                    <span className="text-lg font-black text-rose-600">{defaulter.amount}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSendReminder(defaulter.id, defaulter.studentName);
                    }}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#176B87] hover:bg-[#123B5D] text-white text-xs font-bold transition shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Remind</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Restricted Ledger Summary Banner -> Opens Dedicated Staff Payroll Summary Page */}
          <div className="bg-sky-50/70 p-5 rounded-2xl border border-sky-100 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-[10px] uppercase font-bold text-sky-900 tracking-wider">
                <Lock className="w-3.5 h-3.5 text-sky-700" />
                <span>Restricted Ledger • Role Level 4</span>
              </div>
              <span className="text-xs text-slate-400">🏛️</span>
            </div>

            <div>
              <h4 className="font-extrabold text-[#0E2C48] text-sm">Staff Payroll Summary</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Disbursed on 28th via Automated Mandate • Real-time sync with Teacher bank accounts
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Total Payroll MTD</div>
                <div className="text-xl font-black text-[#0E2C48]">₹42.0L</div>
              </div>

              <button
                onClick={() => setShowPayrollSummaryPage(true)}
                className="px-4 py-2 rounded-xl bg-[#123B5D] hover:bg-[#176B87] text-white text-xs font-bold flex items-center space-x-1.5 transition shadow-xs cursor-pointer"
              >
                <span>Open Staff Payroll Summary</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXPENSES TAB */}
      {activeTab === 'expenses' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
          <h3 className="font-extrabold text-navy text-sm">Operating Expenditure (OPEX)</h3>
          <div className="space-y-2">
            {[
              { category: 'Utilities & Diesel Fleet', amount: '₹3,40,000', status: 'Approved' },
              { category: 'Science Lab Reagents & Consumables', amount: '₹1,20,000', status: 'Approved' },
              { category: 'Campus Security & Biometrics AMC', amount: '₹85,000', status: 'Pending Review' },
            ].map((exp, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex justify-between items-center">
                <span className="font-bold text-[#0E2C48]">{exp.category}</span>
                <span className="font-extrabold text-navy">{exp.amount}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BUDGETS TAB */}
      {activeTab === 'budgets' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
          <h3 className="font-extrabold text-navy text-sm">Annual Departmental Allocations</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>STEM &amp; Robotics Labs</span>
                <span className="text-teal">₹8.5L / ₹10.0L (85%)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full">
                <div className="h-full bg-teal rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Sports &amp; Athletics Arena</span>
                <span className="text-teal">₹4.2L / ₹6.0L (70%)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full">
                <div className="h-full bg-teal rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
