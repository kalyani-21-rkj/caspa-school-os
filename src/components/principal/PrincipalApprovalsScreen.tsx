import React, { useState } from 'react';
import {
  FileCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Sparkles,
  Shield,
  Layers,
  ArrowRight,
  MessageSquare,
  X,
  History,
  Send,
  Bus,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PrincipalApprovalsScreen: React.FC = () => {
  const {
    principalExecutiveApprovals,
    processExecutiveApprovalAction,
    showToast,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<'All' | 'Leave' | 'Admission' | 'Fee Concession' | 'Procurement'>('All');
  const [changesModalOpen, setChangesModalOpen] = useState(false);
  const [selectedApprovalId, setSelectedApprovalId] = useState<string | null>(null);
  const [changesComment, setChangesComment] = useState('');

  const pendingApprovals = principalExecutiveApprovals.filter((a) => a.status === 'PENDING');

  const filteredApprovals = pendingApprovals.filter((app) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Fee Concession') return app.categoryBadge.includes('Fee');
    if (activeCategory === 'Procurement') return app.categoryBadge.includes('Purchase') || app.categoryBadge.includes('Lab');
    return app.categoryBadge.toLowerCase().includes(activeCategory.toLowerCase());
  });

  const handleApprove = (id: string, title: string) => {
    processExecutiveApprovalAction(id, 'APPROVED');
    showToast(`Signed & Approved: "${title}"`);
  };

  const handleReject = (id: string, title: string) => {
    processExecutiveApprovalAction(id, 'REJECTED');
    showToast(`Rejected requisition: "${title}"`);
  };

  const openChangesModal = (id: string) => {
    setSelectedApprovalId(id);
    setChangesModalOpen(true);
  };

  const handleSendChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApprovalId) return;
    processExecutiveApprovalAction(selectedApprovalId, 'CHANGES_REQUESTED', changesComment);
    showToast('Sent back for amendments with Principal revision directives');
    setChangesModalOpen(false);
    setChangesComment('');
    setSelectedApprovalId(null);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Auto-Sync Bar (Matching image_507e5e46.png) */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1.5 font-bold uppercase tracking-wider text-teal">
          <span className="w-2 h-2 rounded-full bg-teal animate-pulse"></span>
          <span>Active Executive Queue</span>
        </div>
        <div className="flex items-center space-x-1 font-mono text-[11px] text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200">
          <Clock className="w-3 h-3 text-teal" />
          <span>Auto-sync active</span>
        </div>
      </div>

      {/* 3 Metric Cards: 9 Pending SLA, 4 Signed Today, 1 Breached SLA */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/80 shadow-2xs">
          <div className="flex items-center space-x-1.5 text-amber-700">
            <Clock className="w-4 h-4" />
            <span className="text-xl font-black text-amber-900">{pendingApprovals.length || 9}</span>
          </div>
          <div className="text-[11px] font-bold text-amber-800/90 mt-1">Pending SLA</div>
        </div>

        <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200/80 shadow-2xs">
          <div className="flex items-center space-x-1.5 text-emerald-700">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xl font-black text-emerald-900">4</span>
          </div>
          <div className="text-[11px] font-bold text-emerald-800/90 mt-1">Signed Today</div>
        </div>

        <div className="bg-rose-50/70 p-3.5 rounded-2xl border border-rose-200/80 shadow-2xs">
          <div className="flex items-center space-x-1.5 text-rose-600">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xl font-black text-rose-700">1</span>
          </div>
          <div className="text-[11px] font-bold text-rose-800/90 mt-1">Breached SLA</div>
        </div>
      </div>

      {/* Category Filter Pills (Matching image_507e5e46.png) */}
      <div className="flex space-x-2 overflow-x-auto scrollbar-none">
        {(['All', 'Leave', 'Admission', 'Fee Concession', 'Procurement'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap flex items-center space-x-1.5 ${
              activeCategory === cat
                ? 'bg-[#0E2C48] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{cat}</span>
            {cat === 'All' && (
              <span className="bg-teal text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                {pendingApprovals.length || 9}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* CASPA COPILOT INTELLIGENCE Banner (Matching image_507e5e46.png) */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50/70 rounded-2xl p-4 border border-purple-200/80 shadow-2xs flex items-start space-x-3">
        <div className="w-9 h-9 rounded-xl bg-[#5B3FA3] text-white flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-yellow-300" />
        </div>
        <div>
          <div className="flex items-center space-x-1.5 text-[11px] font-black text-[#5B3FA3] uppercase tracking-wider">
            <span>CASPA Copilot Intelligence</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B3FA3]"></span>
          </div>
          <p className="text-xs text-slate-700 font-medium leading-relaxed mt-0.5">
            Route 4 bypass clearance &amp; AP Lab procurement conform to statutory budget policies. Safe to rapid batch-approve.
          </p>
        </div>
      </div>

      {/* Requisitions / Approvals Cards List (Matching image_507e5e46.png) */}
      <div className="space-y-4">
        {filteredApprovals.map((app) => (
          <div
            key={app.id}
            className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-xs space-y-3.5 relative overflow-hidden ${
              app.isEmergency ? 'border-l-4 border-l-rose-500 border-slate-200' : 'border-slate-200'
            }`}
          >
            {/* Top User Info & SLA Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-full font-black text-xs flex items-center justify-center shrink-0 ${
                    app.avatarBg || 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {app.initials}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-[#0E2C48]">{app.requesterName}</span>
                    <span
                      className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                        app.isEmergency
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-sky-100 text-sky-800'
                      }`}
                    >
                      {app.categoryBadge}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">{app.requesterRole}</div>
                </div>
              </div>

              <div
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 ${
                  app.isEmergency
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Clock className="w-3 h-3" />
                <span>{app.slaString}</span>
              </div>
            </div>

            {/* Title & Body */}
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#0E2C48]">{app.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">{app.description}</p>
            </div>

            {/* Details Box / Overlay Pill */}
            {app.detailsBox && (
              <div className="p-3 rounded-xl bg-sky-50/60 border border-sky-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-sky-900">{app.detailsBox.label}</span>
                  <p className="text-[11px] text-slate-500">{app.detailsBox.value}</p>
                </div>
                {app.detailsBox.badge && (
                  <span className="text-[10px] font-extrabold bg-white text-sky-800 px-2 py-0.5 rounded border border-sky-200">
                    {app.detailsBox.badge}
                  </span>
                )}
              </div>
            )}

            {/* Requisition Amount if present */}
            {app.amount && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Requisition Amount</span>
                  <div className="text-lg font-black text-[#0E2C48]">{app.amount}</div>
                </div>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  CAPEX Fund #4
                </span>
              </div>
            )}

            {/* Stepper Timeline (if present) */}
            {app.steps && (
              <div className="flex items-center justify-between text-[11px] pt-1">
                {app.steps.map((st, i) => (
                  <React.Fragment key={st.name}>
                    <div className="flex items-center space-x-1 font-bold">
                      {st.completed ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                          ✓
                        </div>
                      ) : st.current ? (
                        <div className="w-5 h-5 rounded-full bg-[#0E2C48] text-white flex items-center justify-center text-[10px]">
                          2
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]">
                          3
                        </div>
                      )}
                      <span className={st.completed ? 'text-emerald-700' : st.current ? 'text-[#0E2C48]' : 'text-slate-400'}>
                        {st.name}
                      </span>
                    </div>
                    {app.steps && i < app.steps.length - 1 && (
                      <div className="flex-1 h-0.5 bg-slate-200 mx-2"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* 3 Action Buttons: [Approve], [Changes], [Reject] (Matching image_507e5e46.png) */}
            <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => handleApprove(app.id, app.title)}
                className="flex-1 py-2 rounded-xl bg-teal hover:bg-teal-hover text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition shadow-xs"
              >
                <Check className="w-4 h-4" />
                <span>Approve</span>
              </button>

              <button
                onClick={() => openChangesModal(app.id)}
                className="flex-1 py-2 rounded-xl border border-amber-300 bg-amber-50/50 hover:bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center space-x-1.5 transition"
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                <span>Changes</span>
              </button>

              <button
                onClick={() => handleReject(app.id, app.title)}
                className="flex-1 py-2 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center space-x-1.5 transition"
              >
                <X className="w-4 h-4 text-rose-600" />
                <span>Reject</span>
              </button>
            </div>
          </div>
        ))}

        {filteredApprovals.length === 0 && (
          <div className="text-center py-8 text-xs text-slate-400 bg-white rounded-2xl border border-slate-200 p-6">
            All requisitions in this queue have been signed and authorized.
          </div>
        )}
      </div>

      {/* Immutable Governance Audit Trail Footer (Matching image_507e5e46.png) */}
      <div className="pt-4 border-t border-slate-200 text-center space-y-1 text-xs">
        <div className="flex items-center justify-center space-x-1.5 text-slate-500">
          <Shield className="w-3.5 h-3.5 text-teal" />
          <span>All decisions recorded to immutable governance audit trail • ISO 27001 Certified Campus OS</span>
        </div>
        <button
          onClick={() => showToast('Displaying historical governance log ledger')}
          className="text-teal font-extrabold hover:underline inline-flex items-center space-x-1 text-[11px]"
        >
          <History className="w-3 h-3" />
          <span>View Historical Audit Log</span>
        </button>
      </div>

      {/* Changes Directives Modal */}
      {changesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-navy text-sm">Request Revision / Changes</h3>
              <button onClick={() => setChangesModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSendChanges} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Revision Directive &amp; Compliance Instructions
                </label>
                <textarea
                  required
                  rows={3}
                  value={changesComment}
                  onChange={(e) => setChangesComment(e.target.value)}
                  placeholder="e.g. Please adjust travel window by 10 minutes and verify driver GPS clearance..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal"
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setChangesModalOpen(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-700"
                >
                  Dispatch Directives
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
