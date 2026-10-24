import React, { useState } from 'react';
import {
  CreditCard,
  Download,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  ShieldCheck,
  ChevronRight,
  Phone,
  Mail,
  X,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ParentFeesScreen: React.FC = () => {
  const {
    activeChild,
    parentChildren,
    switchActiveChild,
    parentFees,
    payParentFee,
    payAllPendingFees,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'PENDING' | 'HISTORY'>('PENDING');
  const [selectedFeeForPayment, setSelectedFeeForPayment] = useState<string | null>(null);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI / QR Code');

  const childFees = parentFees.filter((f) => f.childId === activeChild?.id);
  const pendingFees = childFees.filter((f) => f.status === 'PENDING');
  const paidFees = childFees.filter((f) => f.status === 'PAID');

  const totalPending = pendingFees.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPaid = paidFees.reduce((acc, curr) => acc + curr.amount, 0);
  const totalAnnualBilled = totalPending + totalPaid;

  const handlePaySingle = (feeId: string) => {
    setSelectedFeeForPayment(feeId);
    setIsPayModalOpen(true);
  };

  const handlePayAll = () => {
    setSelectedFeeForPayment('ALL');
    setIsPayModalOpen(true);
  };

  const confirmPayment = () => {
    if (selectedFeeForPayment === 'ALL') {
      payAllPendingFees(activeChild.id, paymentMethod);
    } else if (selectedFeeForPayment) {
      payParentFee(selectedFeeForPayment, paymentMethod);
    }
    setIsPayModalOpen(false);
    setSelectedFeeForPayment(null);
  };

  return (
    <div className="space-y-6">
      {/* Header with Child Selector Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Fees &amp; Financial Settlement
          </h2>
          <p className="text-xs text-slate-500">
            Official bursar invoices, digital payment gateway, and IT 80C receipts
          </p>
        </div>

        {/* Child Selector Pill */}
        <div className="flex items-center space-x-2 bg-white p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          {parentChildren.map((child) => (
            <button
              key={child.id}
              onClick={() => switchActiveChild(child.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-2 ${
                child.id === activeChild?.id
                  ? 'bg-[#0E2C48] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <img
                src={child.avatarUrl}
                alt={child.fullName}
                className="w-4 h-4 rounded-full object-cover"
              />
              <span>{child.fullName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Outstanding Dues Hero Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0E2C48] via-[#123B5D] to-[#176B87] text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                Institutional Bursar Ledger
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-200 border border-cyan-400/30">
                {activeChild.fullName} • {activeChild.grade}-{activeChild.section}
              </span>
            </div>
            <div className="mt-3 flex items-baseline space-x-3">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                ₹{totalPending.toLocaleString('en-IN')}
              </span>
              <span className="text-sm font-semibold text-cyan-200">
                {totalPending > 0 ? 'Pending Settlement' : 'Nil Balance • Fully Cleared'}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-2">
              {totalPending > 0
                ? `Due by ${activeChild.dueDate} • Term 2 Tuition, STEM Consumables & Fleet Route 4B`
                : 'All scheduled installments cleared for Academic Year 2026-27.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {totalPending > 0 ? (
              <button
                onClick={handlePayAll}
                className="px-6 py-3 rounded-xl bg-teal hover:bg-teal-dark text-white font-black text-sm transition shadow-lg flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay All (₹{totalPending.toLocaleString('en-IN')})</span>
              </button>
            ) : (
              <div className="px-5 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Account in Good Standing</span>
              </div>
            )}
            <button
              onClick={() => showToast('Consolidated annual financial ledger downloaded')}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition flex items-center justify-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5 text-cyan-300" />
              <span>Statement PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Metric Cards: Total Billed, Cleared, Balance */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Total Annual Fee
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            ₹{totalAnnualBilled.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-500">Academic Year 2026-27</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Cleared Amount
          </span>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            ₹{totalPaid.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold">
            {totalAnnualBilled > 0 ? ((totalPaid / totalAnnualBilled) * 100).toFixed(1) : 100}% Cleared
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Remaining Balance
          </span>
          <div className={`text-2xl font-black mt-1 ${totalPending > 0 ? 'text-amber-600' : 'text-slate-900'}`}>
            ₹{totalPending.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-500">
            {totalPending > 0 ? `Due ${activeChild.dueDate}` : 'Fully Settled'}
          </span>
        </div>
      </div>

      {/* Tabs: Pending Invoices vs Payment History */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('PENDING')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'PENDING'
                  ? 'bg-teal text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Pending Invoices ({pendingFees.length})
            </button>
            <button
              onClick={() => setActiveTab('HISTORY')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'HISTORY'
                  ? 'bg-teal text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Payment History ({paidFees.length})
            </button>
          </div>

          <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
            Official Institutional Receipts
          </span>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          {activeTab === 'PENDING' ? (
            pendingFees.length > 0 ? (
              <div className="space-y-3">
                {pendingFees.map((fee) => (
                  <div
                    key={fee.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-amber-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white"
                  >
                    <div className="flex items-start space-x-3.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-extrabold text-sm text-slate-900">{fee.title}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {fee.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Due Date: <strong className="text-slate-700">{fee.dueDate}</strong> • Ref #{fee.id}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-4 border-t sm:border-t-0 pt-2 sm:pt-0">
                      <div className="text-left sm:text-right">
                        <span className="text-base font-black text-slate-900 block">
                          ₹{fee.amount.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-amber-600 font-bold">Unpaid Invoice</span>
                      </div>
                      <button
                        onClick={() => handlePaySingle(fee.id)}
                        className="px-4 py-2 rounded-xl bg-teal hover:bg-teal-dark text-white text-xs font-bold transition shadow-xs"
                      >
                        Pay Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                <h4 className="font-bold text-slate-800 text-sm">No Pending Dues!</h4>
                <p className="text-xs text-slate-500">All fees for {activeChild.fullName} have been cleared.</p>
              </div>
            )
          ) : (
            <div className="space-y-3">
              {paidFees.map((fee) => (
                <div
                  key={fee.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-extrabold text-sm text-slate-900">{fee.title}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          CLEARED
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Receipt: <strong className="text-slate-800">{fee.receiptNo || 'RCP-2026-8812'}</strong> • Paid on {fee.paidOn || 'Jul 05, 2026'} via {fee.paymentMethod || 'UPI'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end space-x-4 border-t sm:border-t-0 pt-2 sm:pt-0">
                    <div className="text-left sm:text-right">
                      <span className="text-base font-black text-slate-900 block">
                        ₹{fee.amount.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold">Verified Transaction</span>
                    </div>
                    <button
                      onClick={() => showToast(`Receipt ${fee.receiptNo} downloaded as PDF`)}
                      className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition flex items-center space-x-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-teal" />
                      <span>Download Receipt</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bursar Desk Assistance */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h4 className="font-extrabold text-sm text-slate-900">
            Need Institutional Bursar or Tax Certificate Assistance?
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Finance Officer: Mr. Ramanathan • Email: bursar@caspaschool.org • Phone: +91 80 2345 6788
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => showToast('Dispatched request for Section 80C Tuition Fee Certificate')}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center space-x-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-teal" />
            <span>Request 80C Cert</span>
          </button>
          <a
            href="mailto:bursar@caspaschool.org"
            className="px-4 py-2 rounded-xl bg-teal hover:bg-teal-dark text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-xs"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Bursar</span>
          </a>
        </div>
      </div>

      {/* Payment Gateway Modal */}
      {isPayModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-slate-900">
                Payment Gateway • CASPA Secure Pay
              </h3>
              <button
                onClick={() => setIsPayModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Paying For</span>
                <p className="font-extrabold text-sm text-slate-900 mt-0.5">
                  {selectedFeeForPayment === 'ALL'
                    ? `Consolidated Outstanding Fees (${pendingFees.length} Invoices)`
                    : pendingFees.find((f) => f.id === selectedFeeForPayment)?.title || 'Fee Invoice'}
                </p>
                <div className="mt-2 text-2xl font-black text-slate-900">
                  ₹
                  {selectedFeeForPayment === 'ALL'
                    ? totalPending.toLocaleString('en-IN')
                    : (pendingFees.find((f) => f.id === selectedFeeForPayment)?.amount || 0).toLocaleString('en-IN')}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Select Digital Payment Mode
                </label>
                <div className="space-y-2">
                  {[
                    'UPI / QR Code (Google Pay, PhonePe, Paytm)',
                    'Netbanking (HDFC, ICICI, SBI, Axis)',
                    'Credit / Debit Card (Visa, Mastercard, RuPay)',
                  ].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setPaymentMethod(mode)}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition ${
                        paymentMethod === mode
                          ? 'bg-teal/10 border-teal text-teal'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{mode}</span>
                      {paymentMethod === mode && <CheckCircle2 className="w-4 h-4 text-teal" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>256-Bit SSL Encrypted Banking Gateway • Instant Receipt</span>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsPayModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmPayment}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Authorize &amp; Pay</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
