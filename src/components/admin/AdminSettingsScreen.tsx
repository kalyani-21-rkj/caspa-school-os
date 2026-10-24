import React, { useState } from 'react';
import {
  KeyRound,
  Shield,
  FileText,
  Check,
  X,
  Lock,
  Building,
  UserCheck,
  Search,
  Download,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RoleType } from '../../types';
import { USERS } from '../../services/db';

export const AdminSettingsScreen: React.FC = () => {
  const { auditLogs, updateRbacPermission, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'RBAC' | 'AUDIT'>('RBAC');
  const [selectedRole, setSelectedRole] = useState<RoleType>('ADMIN');
  const [auditSearch, setAuditSearch] = useState('');

  const targetUser = USERS[selectedRole];
  const permissions = targetUser ? targetUser.permissions : [];

  const roles: RoleType[] = ['ADMIN', 'TEACHER', 'STUDENT', 'PRINCIPAL', 'PARENT'];

  const filteredLogs = auditLogs.filter(
    (l) =>
      l.details.toLowerCase().includes(auditSearch.toLowerCase()) ||
      l.userName.toLowerCase().includes(auditSearch.toLowerCase()) ||
      l.module.toLowerCase().includes(auditSearch.toLowerCase()) ||
      l.action.toLowerCase().includes(auditSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar matching Teacher/Student Module */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-teal font-semibold uppercase tracking-wider mb-1">
            <span>Enterprise Security &amp; Role-Based Access Control</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-navy tracking-tight">
            RBAC Permissions &amp; System Audit Trail
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Fine-grained granular authorization matrix and immutable audit trail tracking all administrative actions.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('RBAC')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'RBAC' ? 'bg-white text-navy shadow-xs' : 'text-slate-600 hover:text-navy'
              }`}
            >
              RBAC Matrix
            </button>
            <button
              onClick={() => setActiveTab('AUDIT')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'AUDIT' ? 'bg-white text-navy shadow-xs' : 'text-slate-600 hover:text-navy'
              }`}
            >
              Security Audit Trail ({auditLogs.length})
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: RBAC PERMISSIONS MATRIX */}
      {activeTab === 'RBAC' && (
        <div className="space-y-5">
          {/* Role Selector Tabs */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-2 overflow-x-auto">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Role:</span>
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedRole === r
                    ? 'bg-teal text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Matrix Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-navy">
                  Permissions Matrix for Role: <span className="text-teal">{selectedRole}</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Granular CRUD, Approval and Data Export permissions by institutional module.
                </p>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full uppercase">
                Enforced by Server Guard
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Module</th>
                    <th className="px-4 py-3 text-center">Can View</th>
                    <th className="px-4 py-3 text-center">Can Create</th>
                    <th className="px-4 py-3 text-center">Can Edit</th>
                    <th className="px-4 py-3 text-center">Can Delete</th>
                    <th className="px-4 py-3 text-center">Can Approve</th>
                    <th className="px-4 py-3 text-center">Can Export</th>
                    <th className="px-4 py-3 text-right">Scope</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {permissions.map((perm) => (
                    <tr key={perm.id} className="hover:bg-slate-50/60 transition">
                      <td className="px-4 py-3 font-bold text-navy">
                        {perm.module}
                      </td>

                      {(['canView', 'canCreate', 'canEdit', 'canDelete', 'canApprove', 'canExport'] as const).map(
                        (field) => (
                          <td key={field} className="px-4 py-3 text-center">
                            <input
                              type="checkbox"
                              checked={perm[field]}
                              onChange={(e) =>
                                updateRbacPermission(selectedRole, perm.module, field, e.target.checked)
                              }
                              className="w-4 h-4 rounded text-teal focus:ring-teal/20 cursor-pointer"
                            />
                          </td>
                        )
                      )}

                      <td className="px-4 py-3 text-right font-mono text-[11px] font-bold text-slate-500">
                        {perm.scope}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: SECURITY AUDIT LOG TRAIL */}
      {activeTab === 'AUDIT' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                placeholder="Search audit trail by user, action, details..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-teal"
              />
            </div>
            <button
              onClick={() => showToast('Exporting security audit trail to CSV...')}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Audit Trail</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3">Operator</th>
                    <th className="px-4 py-3">Action</th>
                    <th className="px-4 py-3">Module</th>
                    <th className="px-4 py-3">Target / Resource</th>
                    <th className="px-4 py-3">Audit Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/60 transition">
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                        {log.timestamp}
                      </td>
                      <td className="px-4 py-3 font-sans">
                        <strong className="block text-navy font-bold">{log.userName}</strong>
                        <span className="text-[10px] text-teal font-mono">{log.userRole}</span>
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-700">
                        {log.action}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">
                          {log.module}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 font-bold truncate max-w-[120px]">
                        {log.resourceId}
                      </td>
                      <td className="px-4 py-3 font-sans text-slate-700 font-medium">
                        {log.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
