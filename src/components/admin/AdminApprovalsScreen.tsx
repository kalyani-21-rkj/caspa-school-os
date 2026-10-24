import React, { useState } from 'react';
import {
  KeyRound,
  Check,
  X,
  Clock,
  Download,
  Filter,
  AlertTriangle,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminApprovalsScreen: React.FC = () => {
  const { approvals, processApproval, showToast } = useApp();

  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');

  const filtered = approvals.filter((a) => {
    if (statusFilter === 'ALL') return true;
    return a.status === statusFilter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar matching Teacher/Student Module */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-teal font-semibold uppercase tracking-wider mb-1">
            <span>Workflow Engine &amp; Requisition Clearance</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-navy tracking-tight">
            Institutional Approvals &amp; Requests
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit and authorize department procurement, staff leave requisitions, and budget requests.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs rounded-lg font-bold transition ${
                statusFilter === st
                  ? 'bg-teal text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3 hover:border-slate-300 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                  {req.module}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  req.priority === 'URGENT'
                    ? 'bg-red-100 text-red-700'
                    : req.priority === 'HIGH'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {req.priority}
                </span>
                <h3 className="font-extrabold text-sm text-navy">{req.title}</h3>
              </div>

              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                req.status === 'APPROVED'
                  ? 'bg-emerald-100 text-emerald-800'
                  : req.status === 'REJECTED'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {req.status}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {req.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 block">Requester</span>
                <span className="font-bold text-navy">{req.requesterName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Department</span>
                <span className="font-semibold text-slate-700">{req.department}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Fiscal Amount</span>
                <span className="font-bold text-teal">{req.amount ? `$${req.amount.toLocaleString()}` : 'N/A (Policy)'}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">SLA Target</span>
                <span className="font-medium text-slate-600">{req.slaDeadline}</span>
              </div>
            </div>

            {req.status === 'PENDING' && (
              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => processApproval(req.id, 'REJECTED', 'Disapproved as outside fiscal allocation')}
                  className="px-3.5 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition"
                >
                  Reject
                </button>
                <button
                  onClick={() => processApproval(req.id, 'CHANGES_REQUESTED', 'Clarification required')}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition"
                >
                  Request Revisions
                </button>
                <button
                  onClick={() => processApproval(req.id, 'APPROVED', 'Authorized by School Administration')}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs flex items-center space-x-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve &amp; Sign</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
