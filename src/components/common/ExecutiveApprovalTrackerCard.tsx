import React, { useState } from 'react';
import {
  FileCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Plus,
  Send,
  X,
  MessageSquare,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RoleType } from '../../types';

interface ExecutiveApprovalTrackerCardProps {
  roleContext: RoleType;
  defaultCategory?: string;
}

export const ExecutiveApprovalTrackerCard: React.FC<ExecutiveApprovalTrackerCardProps> = ({
  roleContext,
  defaultCategory = 'Academic Blueprint',
}) => {
  const {
    currentUser,
    principalExecutiveApprovals,
    submitExecutiveApprovalRequest,
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [categoryBadge, setCategoryBadge] = useState(defaultCategory);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);

  const activeUserName = (currentUser?.fullName || '').toLowerCase();

  // Filter executive approvals belonging to this role or user
  const myApprovals = principalExecutiveApprovals.filter((app) => {
    if (app.requesterRoleType === roleContext) return true;
    if (activeUserName && app.requesterName.toLowerCase().includes(activeUserName)) return true;
    if (roleContext === 'TEACHER' && app.requesterName.toLowerCase().includes('oswald')) return true;
    if (roleContext === 'STUDENT' && app.requesterName.toLowerCase().includes('elena')) return true;
    if (roleContext === 'PARENT' && app.requesterName.toLowerCase().includes('sharma')) return true;
    return false;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    submitExecutiveApprovalRequest({
      title: title.trim(),
      categoryBadge,
      description: description.trim(),
      amount: amount.trim() || undefined,
      isEmergency,
    });
    setTitle('');
    setDescription('');
    setAmount('');
    setIsEmergency(false);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-teal/10 text-teal flex items-center justify-center shrink-0">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-extrabold text-[#0E2C48] text-sm">
                Principal Executive Approvals Tracker
              </h3>
              <span className="text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded-full">
                Live Sync with Principal
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Send requisitions, concessions, or event proposals to Principal Dr. Mehta and track live decisions.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 bg-[#176B87] hover:bg-[#125870] text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Send Request to Principal</span>
        </button>
      </div>

      {/* List of user's requests and Principal decision status */}
      <div className="space-y-3">
        {myApprovals.map((item) => {
          const isApproved = item.status === 'APPROVED';
          const isRejected = item.status === 'REJECTED';
          const isChanges = item.status === 'CHANGES_REQUESTED';
          const isPending = item.status === 'PENDING';

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition space-y-2.5 ${
                isApproved
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : isChanges
                  ? 'bg-amber-50/50 border-amber-300'
                  : isRejected
                  ? 'bg-rose-50/40 border-rose-200'
                  : 'bg-slate-50/70 border-slate-200'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                    {item.categoryBadge}
                  </span>
                  {item.amount && (
                    <span className="text-xs font-black text-[#0E2C48] bg-white px-2 py-0.5 rounded border border-slate-200">
                      {item.amount}
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400">
                    {item.submittedAt || item.slaString}
                  </span>
                </div>

                {isPending && (
                  <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                    <Clock className="w-3 h-3" />
                    <span>PENDING PRINCIPAL APPROVAL</span>
                  </span>
                )}
                {isApproved && (
                  <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>APPROVED BY PRINCIPAL</span>
                  </span>
                )}
                {isChanges && (
                  <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-200 text-amber-900">
                    <AlertTriangle className="w-3 h-3 text-amber-700" />
                    <span>CHANGES REQUESTED BY PRINCIPAL</span>
                  </span>
                )}
                {isRejected && (
                  <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
                    <XCircle className="w-3 h-3 text-rose-600" />
                    <span>REJECTED BY PRINCIPAL</span>
                  </span>
                )}
              </div>

              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#0E2C48]">{item.title}</h4>
                <p className="text-xs text-slate-600 mt-0.5">{item.description}</p>
              </div>

              {/* Principal Decision Note / Feedback */}
              {!isPending && (
                <div
                  className={`p-2.5 rounded-lg border text-xs flex items-start space-x-2 ${
                    isApproved
                      ? 'bg-emerald-100/60 border-emerald-200 text-emerald-900'
                      : isChanges
                      ? 'bg-amber-100/70 border-amber-300 text-amber-950'
                      : 'bg-rose-100/60 border-rose-200 text-rose-900'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="font-extrabold text-[11px] uppercase tracking-wider">
                      Principal Decision Remark {item.updatedAt ? `(${item.updatedAt})` : ''}:
                    </div>
                    <p className="text-xs font-medium">
                      {item.actionNote ||
                        (isApproved
                          ? 'Approved & digitally signed by Principal Dr. Mehta.'
                          : isChanges
                          ? 'Please revise and resubmit according to institutional guidelines.'
                          : 'Request declined by Principal Office.')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {myApprovals.length === 0 && (
          <div className="text-center py-5 text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            No executive approval requests submitted yet. Click &ldquo;Send Request to Principal&rdquo; above to submit one.
          </div>
        )}
      </div>

      {/* Submit Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-teal tracking-wider">
                  Executive Governance Workflow
                </span>
                <h3 className="font-extrabold text-[#0E2C48] text-sm">
                  Submit Request for Principal Approval
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Request Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Science Club Grant / Fee Concession / Lab Equipment"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-teal"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={categoryBadge}
                    onChange={(e) => setCategoryBadge(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-teal"
                  >
                    <option value="Academic Blueprint">Academic Blueprint</option>
                    <option value="Fee Concession">Fee Concession</option>
                    <option value="Lab Purchase">Lab / Club Procurement</option>
                    <option value="Leave">Special Leave / Duty</option>
                    <option value="Admission">Admission / Event Exemption</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Amount (Optional)
                  </label>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. ₹15,000"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-teal"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Detailed Justification for Principal
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide full details so Principal Dr. Mehta can review and approve..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-teal"
                />
              </div>

              <label className="flex items-center space-x-2 text-xs text-slate-600 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isEmergency}
                  onChange={(e) => setIsEmergency(e.target.checked)}
                  className="rounded border-slate-300 text-teal focus:ring-teal"
                />
                <span className="font-semibold text-rose-700">
                  Mark as Urgent / Priority Flash SLA
                </span>
              </label>

              <div className="flex space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#176B87] hover:bg-[#125870] text-white font-bold flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit to Principal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
