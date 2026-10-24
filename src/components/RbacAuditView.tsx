import React, { useState } from 'react';
import {
  Lock,
  Check,
  X,
  Shield,
  FileText,
  Clock,
  UserCheck,
  ChevronDown,
  Activity,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { USERS } from '../services/db';
import { RoleType, RecordScope } from '../types';

export const RbacAuditView: React.FC = () => {
  const { auditLogs, currentRole, setRole } = useApp();
  const [selectedRole, setSelectedRole] = useState<RoleType>('TEACHER');

  const inspectedUser = USERS[selectedRole] || USERS.PRINCIPAL;

  const modules = [
    { name: 'DASHBOARD', desc: 'Executive KPIs & Campus overview' },
    { name: 'ACADEMICS', desc: 'Curriculum, gradebooks & exams' },
    { name: 'ATTENDANCE', desc: 'One-tap classroom registers' },
    { name: 'SAFETY', desc: 'Anti-ragging & sealed child safety' },
    { name: 'APPROVALS', desc: 'Requisitions, purchases & leaves' },
    { name: 'FINANCE', desc: 'Tuition fees, dues & ledgers' },
    { name: 'TRANSPORT', desc: 'Live bus fleet GPS telemetry' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-fieldBorder">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span>Security &amp; Governance</span>
            <span>·</span>
            <span>Dynamic RBAC Engine</span>
            <span>·</span>
            <span className="text-teal font-medium">SOC2 &amp; FERPA Aligned</span>
          </div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">Access Control &amp; Audit Trail</h1>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500">Inspecting Role:</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as RoleType)}
            className="px-3 py-1.5 rounded-lg border border-fieldBorder bg-white text-xs font-semibold text-navy focus:outline-none focus:border-teal"
          >
            <option value="PRINCIPAL">Principal (Executive)</option>
            <option value="TEACHER">Teacher (Faculty)</option>
            <option value="STUDENT">Student (Self Scoped)</option>
            <option value="PARENT">Parent (Ward Scoped)</option>
            <option value="SAFETY_OFFICER">Safety Officer (Sealed Vault)</option>
            <option value="ACCOUNTS">Finance &amp; Accounts</option>
          </select>
        </div>
      </div>

      {/* Persona Permission Matrix */}
      <div className="bg-white rounded-xl border border-fieldBorder overflow-hidden shadow-xs">
        <div className="p-4 border-b border-fieldBorder flex items-center justify-between">
          <div>
            <h3 className="font-bold text-navy text-sm">
              Permission Blueprint: {inspectedUser.fullName} ({selectedRole})
            </h3>
            <p className="text-[11px] text-slate-500">
              Evaluated dynamically by Node.js checkPermission middleware in server/rbac.ts
            </p>
          </div>

          <button
            onClick={() => setRole(selectedRole)}
            className="px-3 py-1.5 bg-teal hover:bg-teal-light text-white text-xs font-semibold rounded-lg transition"
          >
            Assume Role in Session
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface border-b border-fieldBorder text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
                <th className="py-3 px-4">Module Name</th>
                <th className="py-3 px-4 text-center">View</th>
                <th className="py-3 px-4 text-center">Create</th>
                <th className="py-3 px-4 text-center">Edit</th>
                <th className="py-3 px-4 text-center">Delete</th>
                <th className="py-3 px-4 text-center">Approve</th>
                <th className="py-3 px-4 text-center">Export</th>
                <th className="py-3 px-4">Record Scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-fieldBorder">
              {modules.map((m) => {
                const perm = inspectedUser.permissions.find((p) => p.module === m.name);
                return (
                  <tr key={m.name} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4 font-semibold text-navy">
                      <p>{m.name}</p>
                      <span className="text-[10px] text-slate-400 font-normal">{m.desc}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {perm?.canView ? (
                        <Check className="w-4 h-4 text-caspaSuccess mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {perm?.canCreate ? (
                        <Check className="w-4 h-4 text-caspaSuccess mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {perm?.canEdit ? (
                        <Check className="w-4 h-4 text-caspaSuccess mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {perm?.canDelete ? (
                        <Check className="w-4 h-4 text-caspaSuccess mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {perm?.canApprove ? (
                        <Check className="w-4 h-4 text-caspaSuccess mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {perm?.canExport ? (
                        <Check className="w-4 h-4 text-caspaSuccess mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {perm ? (
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {perm.scope}
                        </span>
                      ) : (
                        <span className="text-slate-300 text-[10px] italic">NONE</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-Time Immutable Audit Log Stream */}
      <div className="bg-white rounded-xl border border-fieldBorder overflow-hidden shadow-xs space-y-3">
        <div className="p-4 border-b border-fieldBorder flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-teal" />
            <h3 className="font-bold text-navy text-sm">Real-Time Security &amp; Access Audit Trail</h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Immutable Compliance Log</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface border-b border-fieldBorder text-slate-500 font-semibold uppercase text-[11px]">
                <th className="py-2.5 px-4">Timestamp</th>
                <th className="py-2.5 px-4">Actor</th>
                <th className="py-2.5 px-4">Role</th>
                <th className="py-2.5 px-4">Action</th>
                <th className="py-2.5 px-4">Target Resource</th>
                <th className="py-2.5 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-fieldBorder">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-2.5 px-4 font-semibold text-slate-900">{log.userName}</td>
                  <td className="py-2.5 px-4">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      {log.userRole}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-mono text-[11px] font-bold text-teal">{log.action}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-600 text-[11px]">{log.resourceId}</td>
                  <td className="py-2.5 px-4 text-slate-600 text-[11px]">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
