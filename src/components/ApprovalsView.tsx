import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  FileCheck,
  Building,
  User,
  Clock,
  Filter,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ApprovalTask } from '../types';

export const ApprovalsView: React.FC = () => {
  const { approvals, processApproval, showToast, currentRole } = useApp();
  const [filterModule, setFilterModule] = useState<'ALL' | 'PURCHASE' | 'LEAVE' | 'EVENT' | 'HOSTEL'>('ALL');
  const [selectedTask, setSelectedTask] = useState<ApprovalTask | null>(approvals[0] || null);
  const [commentInput, setCommentInput] = useState('');

  const filteredTasks = approvals.filter((t) => {
    if (filterModule === 'ALL') return true;
    return t.module === filterModule;
  });

  const pendingCount = approvals.filter((t) => t.status === 'PENDING').length;
  const urgentCount = approvals.filter((t) => t.status === 'PENDING' && t.priority === 'URGENT').length;

  const handleAction = (taskId: string, action: 'APPROVED' | 'REJECTED' | 'CHANGES_REQUESTED') => {
    processApproval(taskId, action, commentInput);
    setCommentInput('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-fieldBorder">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span>Governance</span>
            <span>·</span>
            <span>Approval Workflow Center</span>
            <span>·</span>
            <span className="text-teal font-medium">Multi-Stage Authorization</span>
          </div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">Executive Approvals &amp; Requisitions</h1>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500 font-medium">{pendingCount} Requisitions Pending</span>
        </div>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-fieldBorder shadow-xs">
          <span className="text-[11px] font-semibold uppercase text-slate-400">Pending Actions</span>
          <p className="text-2xl font-bold font-mono text-navy mt-1">{pendingCount}</p>
          <span className="text-xs text-caspaWarning font-medium">{urgentCount} Urgent with &lt; 4h SLA</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-fieldBorder shadow-xs">
          <span className="text-[11px] font-semibold uppercase text-slate-400">Capital Value in Review</span>
          <p className="text-2xl font-bold font-mono text-navy mt-1">$9,220</p>
          <span className="text-xs text-slate-500">Across Lab &amp; STEM field grants</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-fieldBorder shadow-xs">
          <span className="text-[11px] font-semibold uppercase text-slate-400">Average Turnaround</span>
          <p className="text-2xl font-bold font-mono text-caspaSuccess mt-1">3.2 Hours</p>
          <span className="text-xs text-slate-500">SLA Compliance: 99.1%</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 p-1 bg-white rounded-lg border border-fieldBorder w-fit text-xs">
        {(['ALL', 'PURCHASE', 'LEAVE', 'EVENT', 'HOSTEL'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setFilterModule(m)}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              filterModule === m
                ? 'bg-navy text-white shadow-xs'
                : 'text-slate-600 hover:text-navy hover:bg-slate-100'
            }`}
          >
            {m === 'ALL' ? 'All Requisitions' : m}
          </button>
        ))}
      </div>

      {/* Tasks List and Inspection View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Task Cards List (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          {filteredTasks.map((task) => {
            const isSelected = selectedTask?.id === task.id;
            return (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className={`p-4 rounded-xl border bg-white cursor-pointer transition text-xs space-y-3 ${
                  isSelected
                    ? 'border-navy shadow-xs ring-1 ring-navy'
                    : 'border-fieldBorder hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 text-[11px] mb-1">
                      <span className="font-semibold text-navy uppercase">{task.module}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500">{task.department}</span>
                      {task.priority === 'URGENT' && (
                        <>
                          <span className="text-slate-300">·</span>
                          <span className="text-caspaDanger font-bold uppercase text-[10px]">Urgent</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">{task.title}</h3>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      task.status === 'PENDING'
                        ? 'bg-amber-100 text-caspaWarning'
                        : task.status === 'APPROVED'
                        ? 'bg-green-100 text-caspaSuccess'
                        : 'bg-red-100 text-caspaDanger'
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <p className="text-slate-600 leading-relaxed text-[11px]">{task.description}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                  <span>By {task.requesterName}</span>
                  <div className="flex items-center space-x-3">
                    {task.amount && (
                      <span className="font-mono font-bold text-navy">${task.amount.toLocaleString()}</span>
                    )}
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{task.slaDeadline}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Task Dossier & Action Panel (6 cols) */}
        <div className="lg:col-span-6">
          {selectedTask ? (
            <div className="bg-white rounded-xl border border-fieldBorder p-5 shadow-xs space-y-5 sticky top-20 text-xs">
              <div className="border-b border-fieldBorder pb-3">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Active Requisition Dossier
                </span>
                <h3 className="text-base font-bold text-navy">{selectedTask.title}</h3>
                <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-1">
                  <span>Stage: <strong className="text-teal">{selectedTask.currentStage}</strong></span>
                  <span>·</span>
                  <span>SLA: {selectedTask.slaDeadline}</span>
                </div>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-surface rounded-lg border border-fieldBorder">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Requester</span>
                  <span className="font-medium text-slate-800">{selectedTask.requesterName}</span>
                  <p className="text-[10px] text-slate-500">{selectedTask.department}</p>
                </div>
                <div className="p-3 bg-surface rounded-lg border border-fieldBorder">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Allocation Amount</span>
                  <span className="font-mono font-bold text-navy text-sm">
                    {selectedTask.amount ? `$${selectedTask.amount.toLocaleString()}` : 'Non-financial'}
                  </span>
                </div>
              </div>

              {/* History / Audit trail */}
              <div>
                <h4 className="font-semibold text-slate-700 uppercase text-[10px] tracking-wider mb-2">
                  Authorization Stages &amp; Audit Trail
                </h4>
                <div className="space-y-2">
                  {selectedTask.history.map((h, i) => (
                    <div key={i} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[11px]">
                      <div className="flex items-center justify-between font-semibold text-navy">
                        <span>{h.actor}</span>
                        <span className="text-[10px] text-teal font-medium">{h.action} · {h.timestamp}</span>
                      </div>
                      {h.comment && <p className="text-slate-600 mt-1">{h.comment}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* One-click Action Buttons */}
              {selectedTask.status === 'PENDING' && (
                <div className="pt-3 border-t border-fieldBorder space-y-3">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Optional authorization remarks or verification note..."
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-fieldBorder focus:outline-none focus:border-teal"
                  />

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleAction(selectedTask.id, 'APPROVED')}
                      className="flex-1 py-2 bg-caspaSuccess hover:bg-green-700 text-white rounded-lg font-semibold text-xs transition flex items-center justify-center space-x-1"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Authorize &amp; Sign</span>
                    </button>
                    <button
                      onClick={() => handleAction(selectedTask.id, 'CHANGES_REQUESTED')}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium text-xs transition"
                    >
                      Request Edits
                    </button>
                    <button
                      onClick={() => handleAction(selectedTask.id, 'REJECTED')}
                      className="px-3 py-2 bg-red-100 hover:bg-red-200 text-caspaDanger rounded-lg font-medium text-xs transition"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-fieldBorder p-8 text-center text-slate-400 text-xs">
              Select a requisition from the list to review verification history and execute sign-offs.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
