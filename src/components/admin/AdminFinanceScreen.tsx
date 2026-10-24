import React, { useState } from 'react';
import {
  CreditCard,
  DollarSign,
  Search,
  CheckCircle2,
  AlertCircle,
  Download,
  Plus,
  X,
  FileText,
  Printer,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FeeInvoiceItem } from '../../types';

export const AdminFinanceScreen: React.FC = () => {
  const { feeInvoices, recordFeePayment, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isCollectModalOpen, setIsCollectModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<FeeInvoiceItem | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(500);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card (Terminal)');
  const [receiptModalInvoice, setReceiptModalInvoice] = useState<FeeInvoiceItem | null>(null);

  const totalBilled = feeInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const totalPaid = feeInvoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const totalOutstanding = feeInvoices.reduce((sum, inv) => sum + inv.balanceDue, 0);
  const collectionRate = totalBilled > 0 ? ((totalPaid / totalBilled) * 100).toFixed(1) : '94.2';

  const filteredInvoices = feeInvoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.gradeSection.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCollectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;
    if (paymentAmount <= 0) {
      showToast('Please enter a valid payment amount');
      return;
    }
    recordFeePayment(selectedInvoice.id, paymentAmount, paymentMethod);
    setIsCollectModalOpen(false);
    setReceiptModalInvoice({
      ...selectedInvoice,
      paidAmount: selectedInvoice.paidAmount + paymentAmount,
      balanceDue: Math.max(0, selectedInvoice.balanceDue - paymentAmount),
      paymentMethod,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar matching Teacher/Student Module */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-teal font-semibold uppercase tracking-wider mb-1">
            <span>Bursar &amp; Accounts Office • Central Campus</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-navy tracking-tight">
            Fee Billing &amp; Revenue Collections
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit school tuition collections, issue receipt vouchers, and resolve outstanding dues.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => showToast('Exporting Financial Balance Sheet (XLSX)...')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Accounts</span>
          </button>
          <button
            onClick={() => {
              const overdueOne = feeInvoices.find((i) => i.balanceDue > 0);
              if (overdueOne) {
                setSelectedInvoice(overdueOne);
                setPaymentAmount(overdueOne.balanceDue);
                setIsCollectModalOpen(true);
              } else {
                showToast('All student tuition fees are cleared!');
              }
            }}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-teal hover:bg-[#125870] text-white text-xs font-bold transition shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Record Payment</span>
          </button>
        </div>
      </div>

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Total Term Invoiced</span>
          <div className="text-2xl font-black text-navy mt-1">${totalBilled.toLocaleString()}</div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Term 2 Academic Dues</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Collected Revenue</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">${totalPaid.toLocaleString()}</div>
          <div className="flex items-center space-x-1 text-[10px] text-emerald-600 font-semibold mt-0.5">
            <TrendingUp className="w-3 h-3" />
            <span>{collectionRate}% clearance rate</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Outstanding Dues</span>
          <div className="text-2xl font-black text-amber-600 mt-1">${totalOutstanding.toLocaleString()}</div>
          <span className="text-[10px] text-amber-700 font-medium mt-0.5 block">Follow-up notifications sent</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Cleared Accounts</span>
          <div className="text-2xl font-black text-teal mt-1">
            {feeInvoices.filter((i) => i.status === 'PAID').length} / {feeInvoices.length}
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Fully settled accounts</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search invoice #, student name..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-teal"
          />
        </div>

        <div className="flex items-center space-x-2">
          {(['ALL', 'PAID', 'OVERDUE', 'PARTIAL'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs rounded-lg font-bold transition ${
                statusFilter === st
                  ? 'bg-teal text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Invoice No</th>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Grade</th>
                <th className="px-4 py-3">Total Amount</th>
                <th className="px-4 py-3">Paid Amount</th>
                <th className="px-4 py-3">Balance Due</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment Method</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/60 transition">
                  <td className="px-4 py-3 font-mono font-bold text-teal">
                    {inv.invoiceNo}
                  </td>
                  <td className="px-4 py-3 font-bold text-navy">
                    {inv.studentName}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-700">
                    {inv.gradeSection}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800">
                    ${inv.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-bold text-emerald-600">
                    ${inv.paidAmount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-bold ${inv.balanceDue > 0 ? 'text-amber-600 font-extrabold' : 'text-slate-400'}`}>
                      ${inv.balanceDue.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      inv.status === 'PAID'
                        ? 'bg-emerald-100 text-emerald-800'
                        : inv.status === 'OVERDUE'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-slate-500">
                    {inv.paymentMethod || 'Awaiting Payment'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      {inv.balanceDue > 0 ? (
                        <button
                          onClick={() => {
                            setSelectedInvoice(inv);
                            setPaymentAmount(inv.balanceDue);
                            setIsCollectModalOpen(true);
                          }}
                          className="px-2.5 py-1 bg-teal hover:bg-[#125870] text-white rounded-md text-[11px] font-bold transition shadow-xs"
                        >
                          Collect
                        </button>
                      ) : (
                        <button
                          onClick={() => setReceiptModalInvoice(inv)}
                          className="px-2.5 py-1 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-md text-[11px] font-semibold transition"
                        >
                          Receipt
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collect Fee Modal */}
      {isCollectModalOpen && selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2 text-teal">
                <CreditCard className="w-5 h-5" />
                <h3 className="font-bold text-base text-navy">Record Tuition Payment</h3>
              </div>
              <button onClick={() => setIsCollectModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Student:</span>
                <span className="font-bold text-navy">{selectedInvoice.studentName} ({selectedInvoice.gradeSection})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Invoice:</span>
                <span className="font-mono text-teal font-bold">{selectedInvoice.invoiceNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Outstanding Balance:</span>
                <span className="font-bold text-amber-600">${selectedInvoice.balanceDue}</span>
              </div>
            </div>

            <form onSubmit={handleCollectSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Payment Amount ($) *</label>
                <input
                  type="number"
                  value={paymentAmount}
                  max={selectedInvoice.balanceDue}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold text-base focus:outline-none focus:border-teal"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Payment Channel / Instrument</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="Credit Card (Terminal)">Credit Card (Point of Sale)</option>
                  <option value="Online Banking (ACH)">Online Banking / Wire Transfer</option>
                  <option value="Cash Clearance">Cashier Counter Cash</option>
                  <option value="Bank Cheque / Draft">Bank Cheque / Demand Draft</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCollectModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-teal hover:bg-[#125870] text-white shadow-xs"
                >
                  Confirm &amp; Generate Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Receipt Modal */}
      {receiptModalInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2 text-emerald-600">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="font-bold text-base text-navy">Official Tuition Voucher Receipt</h3>
              </div>
              <button onClick={() => setReceiptModalInvoice(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs font-mono">
              <div className="text-center pb-2 border-b border-slate-200">
                <h4 className="font-extrabold text-navy text-sm font-sans">CASPA CENTRAL CAMPUS</h4>
                <p className="text-[10px] text-slate-400">Institutional Accounts &amp; Bursar Department</p>
                <span className="text-[11px] font-bold text-teal">{receiptModalInvoice.invoiceNo}</span>
              </div>

              <div className="space-y-1 text-slate-700">
                <div className="flex justify-between">
                  <span>Student Name:</span>
                  <strong className="text-navy">{receiptModalInvoice.studentName}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Academic Term:</span>
                  <span>{receiptModalInvoice.term}</span>
                </div>
                <div className="flex justify-between">
                  <span>Instrument:</span>
                  <span>{receiptModalInvoice.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Paid Amount:</span>
                  <strong className="text-emerald-700 font-bold">${receiptModalInvoice.paidAmount}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Remaining Balance:</span>
                  <span className="font-bold">${receiptModalInvoice.balanceDue}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-center text-[10px] text-slate-400">
                Digitally authenticated and certified by CASPA School OS.
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => {
                  showToast('Receipt printed to default network printer');
                  setReceiptModalInvoice(null);
                }}
                className="px-4 py-2 bg-navy hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
