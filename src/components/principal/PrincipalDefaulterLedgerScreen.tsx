import React, { useState } from 'react';
import {
  ArrowLeft,
  CreditCard,
  AlertTriangle,
  Clock,
  Send,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  User,
  FileText,
  DollarSign,
  ChevronRight,
  Sparkles,
  Award,
  Layers,
  Percent,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PrincipalDefaulterLedgerScreenProps {
  defaulterId: string;
  onBack: () => void;
}

export const PrincipalDefaulterLedgerScreen: React.FC<PrincipalDefaulterLedgerScreenProps> = ({
  defaulterId,
  onBack,
}) => {
  const {
    principalDefaulters,
    recordFeeConcession,
    recordFeeNoticeDispatch,
    showToast,
  } = useApp();

  const defaulter = principalDefaulters.find((d) => d.id === defaulterId) || {
    id: defaulterId,
    studentName: 'Marcus Brody',
    gradeSection: 'Grade 9B',
    overdueDays: 34,
    amount: '₹28,000',
    status: 'Overdue 34 days',
    noticeLevel: 'Tier 2 Notice',
  };

  const isMarcus = defaulter.studentName.includes('Marcus');

  // Interactive Form States
  const [dispatchChannel, setDispatchChannel] = useState<'SMS' | 'WHATSAPP' | 'EMAIL' | 'REGISTERED_POST'>('WHATSAPP');
  const [customNoticeText, setCustomNoticeText] = useState(
    `Dear Guardian of ${defaulter.studentName}, statutory tuition dues of ${defaulter.amount} for Term 2 are currently overdue. Please settle or arrange an audience with the Principal's Office.`
  );
  const [waiverPercent, setWaiverPercent] = useState<number>(25);
  const [concessionReason, setConcessionReason] = useState(
    'Special executive consideration: Medical hardship / Merit-based bursary installment approval.'
  );
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'BREAKDOWN' | 'DISPATCH' | 'CONCESSION'>('OVERVIEW');

  const studentDetails = {
    name: defaulter.studentName,
    rollNo: isMarcus ? 3 : 19,
    grade: defaulter.gradeSection,
    guardianName: isMarcus ? 'Mr. David Brody' : 'Mr. Luke Hemsworth',
    guardianPhone: isMarcus ? '+1 (555) 849-2041' : '+1 (555) 670-3849',
    guardianEmail: isMarcus ? 'd.brody@acmeworks.org' : 'luke.hemsworth@cloudnet.io',
    address: '42 Maple Avenue, Oakridge District',
    enrolmentDate: 'AY 2024-25 • Regular Scholar',
  };

  const lineItems = [
    { title: 'Term 2 Composite Tuition Fee', amount: '₹18,000', status: 'OVERDUE', dueDays: defaulter.overdueDays },
    { title: 'Secondary Science & STEM Robotics Lab Fee', amount: '₹4,500', status: 'OVERDUE', dueDays: defaulter.overdueDays },
    { title: 'Dedicated Transit Fleet (Route 4 - Oakridge)', amount: '₹3,500', status: 'OVERDUE', dueDays: defaulter.overdueDays },
    { title: 'Learning Commons & Library Repertoire', amount: '₹2,000', status: 'OVERDUE', dueDays: defaulter.overdueDays },
  ];

  const transactionHistory = [
    {
      id: 'tx-101',
      date: '12 Aug 2026',
      receiptNo: 'REC-2026-8891',
      description: 'Term 1 Composite Tuition & Transit',
      amount: '₹28,000',
      mode: 'UPI Mandate (HDFC Bank)',
      status: 'VERIFIED',
    },
    {
      id: 'tx-100',
      date: '02 May 2026',
      receiptNo: 'REC-2026-1044',
      description: 'Annual Academic Registration & Examination Levy',
      amount: '₹15,000',
      mode: 'NetBanking NEFT',
      status: 'VERIFIED',
    },
  ];

  const handleDispatchNotice = (e: React.FormEvent) => {
    e.preventDefault();
    recordFeeNoticeDispatch(defaulter.id, dispatchChannel, customNoticeText);
  };

  const handleApplyConcession = (e: React.FormEvent) => {
    e.preventDefault();
    recordFeeConcession(defaulter.id, waiverPercent, concessionReason);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Back Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-[#0E2C48] bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition group w-fit"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-0.5 transition" />
          <span>Back to Finance Overview</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Student Ledger</span>
          <span className="text-xs font-black text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            {defaulter.studentName} • Dues Overdue
          </span>
        </div>
      </div>

      {/* Hero Financial Banner */}
      <div className="bg-[#0E2C48] text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-rose-900/30 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-0.5 rounded-full bg-rose-500/30 text-rose-200 text-xs font-bold border border-rose-400/40">
                {defaulter.noticeLevel}
              </span>
              <span className="text-xs text-sky-200/80 font-medium">{studentDetails.grade} • Roll #{studentDetails.rollNo}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{defaulter.studentName}</h1>
            <p className="text-xs sm:text-sm text-sky-100/90 max-w-xl">
              Guardian: <span className="font-bold text-white">{studentDetails.guardianName}</span> ({studentDetails.guardianPhone}) • {studentDetails.enrolmentDate}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 text-right shrink-0">
            <div className="text-[11px] font-bold text-sky-200 uppercase tracking-wider">Total Outstanding</div>
            <div className="text-3xl sm:text-4xl font-black text-white mt-1">{defaulter.amount}</div>
            <div className="text-xs text-rose-300 font-bold mt-1 flex items-center justify-end space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{defaulter.status}</span>
            </div>
          </div>
        </div>

        {/* Action Triggers in Banner */}
        <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-sky-900/60">
          <button
            onClick={() => setActiveTab('DISPATCH')}
            className="px-4 py-2 rounded-xl bg-teal hover:bg-teal/90 text-white font-bold text-xs flex items-center space-x-1.5 transition shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Dispatch Notice</span>
          </button>
          <button
            onClick={() => setActiveTab('CONCESSION')}
            className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/20 text-white font-bold text-xs flex items-center space-x-1.5 transition border border-white/20"
          >
            <Percent className="w-3.5 h-3.5" />
            <span>Grant Relief / Bursary</span>
          </button>
          <button
            onClick={() => showToast(`Conference requested with ${studentDetails.guardianName}`)}
            className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/20 text-white font-bold text-xs flex items-center space-x-1.5 transition border border-white/20"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Summon Parent Conference</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-xs font-bold">
        {[
          { id: 'OVERVIEW', label: 'Itemized Schedule & Transactions' },
          { id: 'DISPATCH', label: 'Executive Notice Dispatch' },
          { id: 'CONCESSION', label: 'Financial Relief & Bursary Waiver' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-teal border-b-2 border-teal font-extrabold'
                : 'text-slate-500 hover:text-[#0E2C48]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: ITEMIZED SCHEDULE */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          {/* Unpaid Line Items */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-[#0E2C48] text-base">Unpaid Invoiced Components</h3>
                <p className="text-xs text-slate-500 mt-0.5">Term 2 Statutory Composite Assessment</p>
              </div>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                4 Overdue Items
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {lineItems.map((item, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-[#0E2C48]">{item.title}</div>
                    <div className="text-xs text-rose-600 font-semibold mt-0.5">
                      Delinquent by {item.dueDays} days • Due date passed
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-sm text-[#0E2C48]">{item.amount}</div>
                    <span className="text-[10px] uppercase font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Verified Transactions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div>
              <h3 className="font-extrabold text-[#0E2C48] text-base">Verified Historical Clearances</h3>
              <p className="text-xs text-slate-500 mt-0.5">Audit-certified payment transactions for academic session</p>
            </div>

            <div className="space-y-3">
              {transactionHistory.map((tx) => (
                <div
                  key={tx.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-[#0E2C48]">{tx.description}</div>
                      <div className="text-xs text-slate-500">
                        {tx.receiptNo} • {tx.date} via {tx.mode}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-sm text-emerald-700">{tx.amount}</div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NOTICE DISPATCH */}
      {activeTab === 'DISPATCH' && (
        <form onSubmit={handleDispatchNotice} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-teal uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Principal Executive Notice Dispatch</span>
            </div>
            <h3 className="font-extrabold text-[#0E2C48] text-lg mt-1">
              Issue Official Overdue Notice to {studentDetails.guardianName}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Notices sent through this console carry the official seal of the Office of the Principal and update the student ledger log.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0E2C48] mb-2">Delivery Channel</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'WHATSAPP', label: 'WhatsApp Official' },
                { id: 'SMS', label: 'Priority SMS' },
                { id: 'EMAIL', label: 'Certified Email' },
                { id: 'REGISTERED_POST', label: 'Registered Dispatch' },
              ].map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setDispatchChannel(ch.id as any)}
                  className={`p-3 rounded-xl border text-xs font-bold text-center transition ${
                    dispatchChannel === ch.id
                      ? 'border-teal bg-teal/10 text-teal'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {ch.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0E2C48] mb-1.5">Notice Directive Message</label>
            <textarea
              rows={4}
              value={customNoticeText}
              onChange={(e) => setCustomNoticeText(e.target.value)}
              className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal"
              required
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-400">Recipient: {studentDetails.guardianPhone}</span>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#0E2C48] hover:bg-[#123B5D] text-white text-xs font-bold flex items-center space-x-2 transition shadow-xs"
            >
              <Send className="w-3.5 h-3.5 text-teal" />
              <span>Dispatch Certified Notice</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: CONCESSION & BURSARY */}
      {activeTab === 'CONCESSION' && (
        <form onSubmit={handleApplyConcession} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-teal uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Executive Discretionary Bursary & Financial Relief</span>
            </div>
            <h3 className="font-extrabold text-[#0E2C48] text-lg mt-1">
              Grant Tuition Waiver or Restructure for {defaulter.studentName}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Authorized pursuant to School Board Financial Relief By-laws. Concessions adjust outstanding balance in real time.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#0E2C48]">Select Relief / Waiver Proportion</label>
            <div className="grid grid-cols-4 gap-3">
              {[25, 50, 75, 100].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setWaiverPercent(pct)}
                  className={`p-3 rounded-xl border text-center transition ${
                    waiverPercent === pct
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-extrabold'
                      : 'border-slate-200 bg-slate-50 text-slate-600 font-bold hover:bg-slate-100'
                  }`}
                >
                  <div className="text-lg">{pct}%</div>
                  <div className="text-[10px] uppercase">{pct === 100 ? 'Full Bursary' : 'Concession'}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0E2C48] mb-1.5">Executive Justification Note</label>
            <textarea
              rows={3}
              value={concessionReason}
              onChange={(e) => setConcessionReason(e.target.value)}
              className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal"
              placeholder="State reason for fee restructuring or charitable trust disbursement..."
              required
            />
          </div>

          <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#0E2C48]">Adjusted Outstanding Balance</div>
              <div className="text-[11px] text-slate-500">Upon authorization of {waiverPercent}% waiver</div>
            </div>
            <div className="text-xl font-black text-teal">
              ₹
              {Math.round(
                (parseInt(defaulter.amount.replace(/[^0-9]/g, '')) || 0) * (1 - waiverPercent / 100)
              ).toLocaleString('en-IN')}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center space-x-2 transition shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Authorize Concession & Adjust Ledger</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
