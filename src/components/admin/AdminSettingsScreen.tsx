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
  Plus,
  GitBranch,
  Sliders,
  Plug,
  Clock,
  AlertTriangle,
  Upload,
  CheckCircle2,
  EyeOff,
  Calendar,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RoleType } from '../../types';
import { USERS } from '../../services/db';
import { AccessControlledBadge } from '../common/AccessControlledBadge';
import { downloadTextAsPdf } from '../../utils/downloadHelper';

interface CustomRoleDefinition {
  id: string;
  name: string;
  baseCategory: string;
  recordScope:
    | 'Own records'
    | 'Assigned records'
    | 'Department'
    | 'Class/Section'
    | 'Campus'
    | 'School'
    | 'Organization';
  startDate: string;
  expiryDate: string;
  autoRevoke: boolean;
  fieldRestrictions: string[];
  modulePermissions: string[];
  actionPermissions: string[];
}

const INITIAL_CUSTOM_ROLES: CustomRoleDefinition[] = [
  {
    id: 'cr-1',
    name: 'Senior Examination Controller',
    baseCategory: 'Academic Leadership',
    recordScope: 'School',
    startDate: '2026-06-01',
    expiryDate: '2027-04-30',
    autoRevoke: true,
    fieldRestrictions: ['Hide Fee Information', 'Hide HR Salary & Bank Details'],
    modulePermissions: ['Examinations: View/Create/Edit', 'Question Bank: View/Create/Edit', 'Marks & Report Cards: View/Edit'],
    actionPermissions: ['Approve', 'Publish', 'Print', 'Generate'],
  },
  {
    id: 'cr-2',
    name: 'Hostel & Night Welfare Warden',
    baseCategory: 'Operations & Boarding',
    recordScope: 'Campus',
    startDate: '2026-06-01',
    expiryDate: '2027-05-31',
    autoRevoke: true,
    fieldRestrictions: ['Hide Fee Information', 'Hide Exam Question Papers'],
    modulePermissions: ['Hostel Rooms & Beds: View/Edit', 'Hostel Attendance: View/Create/Edit', 'Visitor Register: View/Create'],
    actionPermissions: ['Approve', 'Reject', 'Export'],
  },
  {
    id: 'cr-3',
    name: 'Admissions & Counselling Lead',
    baseCategory: 'Business & CRM',
    recordScope: 'Campus',
    startDate: '2026-01-01',
    expiryDate: '2026-12-31',
    autoRevoke: true,
    fieldRestrictions: ['Mask Safeguarding Case Identity', 'Hide Staff Payroll'],
    modulePermissions: ['Admissions CRM: View/Create/Edit', 'Counselling Schedule: View/Create', 'Fee Invoices: View'],
    actionPermissions: ['Approve', 'Share', 'Generate', 'Export'],
  },
];

const WORKFLOW_BLUEPRINTS = [
  {
    id: 'wf-1',
    type: 'Leave Approval Workflow',
    requester: 'Teacher / Staff / Parent',
    currentStage: 'Stage 2: HOD Verification → Stage 3: Principal Final Sign-Off',
    requiredAction: 'Verify Substitute Period Coverage & Approve',
    slaAge: '12 Hours SLA (Avg Age: 3.2h)',
    history: 'Created by HR Policy Engine • 98.4% SLA Compliance',
    activeCount: 4,
  },
  {
    id: 'wf-2',
    type: 'Admission Approval Workflow',
    requester: 'Admission Counselor / Parent',
    currentStage: 'Stage 1: Doc Check → Stage 2: Entrance Test → Stage 3: Principal Interview',
    requiredAction: 'Authorize Offer Letter & Generate Fee Invoice',
    slaAge: '48 Hours SLA (Avg Age: 18h)',
    history: '34 Active Pipeline Leads in AY 2026-27',
    activeCount: 12,
  },
  {
    id: 'wf-3',
    type: 'Fee Concession & Scholarship',
    requester: 'Parent / Accounts Officer',
    currentStage: 'Stage 1: Accounts Audit → Stage 2: Principal & Trust Sign-Off',
    requiredAction: 'Review Income/Merit Dossier & Approve Waiver %',
    slaAge: '72 Hours SLA (Avg Age: 24h)',
    history: 'Strict Dual-Control Financial Audit Enabled',
    activeCount: 3,
  },
  {
    id: 'wf-4',
    type: 'Purchase Request & PO Workflow',
    requester: 'Lab / Library / Department Head',
    currentStage: 'Stage 1: Inventory Check → Stage 2: Vendor Quote → Stage 3: Principal Approval',
    requiredAction: 'Approve Purchase Order (PO > ₹50,000)',
    slaAge: '24 Hours SLA (Avg Age: 9h)',
    history: '4 POs Pending Sign-off',
    activeCount: 4,
  },
  {
    id: 'wf-5',
    type: 'Expense Reimbursement Approval',
    requester: 'Staff / Event Coordinator',
    currentStage: 'Stage 1: Voucher Upload → Stage 2: Accounts Audit → Stage 3: Disbursal',
    requiredAction: 'Validate GST Invoice & Authorize Bank Credit',
    slaAge: '24 Hours SLA',
    history: 'Auto-synced with Ledger',
    activeCount: 2,
  },
  {
    id: 'wf-6',
    type: 'Certificate Issuance Approval',
    requester: 'Parent / Student',
    currentStage: 'Stage 1: No-Dues Clearance → Stage 2: Registrar Digital Seal & QR',
    requiredAction: 'Verify Library/Fee Dues & Issue QR Certificate',
    slaAge: '24 Hours SLA',
    history: 'Instant QR verification enabled',
    activeCount: 5,
  },
  {
    id: 'wf-7',
    type: 'Student Section / Campus Transfer',
    requester: 'Parent / Academic Coordinator',
    currentStage: 'Stage 1: VP Academic Review → Stage 2: Principal Authorization',
    requiredAction: 'Approve Roster Reallocation',
    slaAge: '48 Hours SLA',
    history: 'Timetable auto-syncs upon approval',
    activeCount: 1,
  },
  {
    id: 'wf-8',
    type: 'Hostel Outing & Movement Pass',
    requester: 'Hostel Student / Guardian',
    currentStage: 'Stage 1: Guardian OTP Consent → Stage 2: Chief Warden Gate Pass',
    requiredAction: 'Verify Guardian Consent & Issue QR Gate Pass',
    slaAge: '4 Hours SLA',
    history: 'Biometric gate timestamp linked',
    activeCount: 6,
  },
  {
    id: 'wf-9',
    type: 'Transport Route Change Request',
    requester: 'Parent / Transport Desk',
    currentStage: 'Stage 1: Seat Capacity Check → Stage 2: Fleet Commander Approval',
    requiredAction: 'Verify Bus Stop & Seat Availability',
    slaAge: '24 Hours SLA',
    history: 'Syncs with RFID boarding manifest',
    activeCount: 2,
  },
  {
    id: 'wf-10',
    type: 'Campus Event & Auditorium Request',
    requester: 'Club Coordinator / Sports Head',
    currentStage: 'Stage 1: Facility Booking → Stage 2: Security & Principal Clearance',
    requiredAction: 'Authorize Venue, AV & Safety Protocol',
    slaAge: '48 Hours SLA',
    history: '2 Upcoming Events Approved',
    activeCount: 2,
  },
];

export const AdminSettingsScreen: React.FC = () => {
  const { auditLogs, updateRbacPermission, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<
    'ROLE_BUILDER' | 'RBAC' | 'WORKFLOWS' | 'AUDIT' | 'SETTINGS' | 'INTEGRATIONS'
  >('ROLE_BUILDER');

  const [selectedRole, setSelectedRole] = useState<RoleType>('ADMIN');
  const [auditSearch, setAuditSearch] = useState('');
  const [customRoles, setCustomRoles] = useState<CustomRoleDefinition[]>(INITIAL_CUSTOM_ROLES);

  // New Custom Role Form State (Screen #71)
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleScope, setNewRoleScope] = useState<CustomRoleDefinition['recordScope']>('Class/Section');
  const [newRoleStart, setNewRoleStart] = useState('2026-10-26');
  const [newRoleExpiry, setNewRoleExpiry] = useState('2027-03-31');
  const [newRoleAutoRevoke, setNewRoleAutoRevoke] = useState(true);
  const [permSearch, setPermSearch] = useState('');
  const [selectedModulePerms, setSelectedModulePerms] = useState<string[]>([
    'Academics & Lesson Plans (View/Edit)',
    'Attendance & Timetable (View/Create)',
  ]);
  const [selectedActionPerms, setSelectedActionPerms] = useState<string[]>([
    'Approve',
    'Publish',
    'Download',
  ]);
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>([
    'Teacher sees Academic Data only (Hide Fee Info)',
    'Restrict Safeguarding Case Identity',
  ]);

  // Sensitive Export Confirmation Modal (Section 20)
  const [isExportConfirmOpen, setIsExportConfirmOpen] = useState(false);

  // System Settings & Security UX State (Screen #75 & Section 22)
  const [mfaEnforced, setMfaEnforced] = useState(true);
  const [sessionTimeoutMins, setSessionTimeoutMins] = useState('15');
  const [reauthHighRisk, setReauthHighRisk] = useState(true);
  const [bulkImportValidated, setBulkImportValidated] = useState(false);

  const availableGroupedPermissions = [
    { group: 'Academics', label: 'Academics & Lesson Plans (View/Edit)' },
    { group: 'Academics', label: 'Attendance & Timetable (View/Create)' },
    { group: 'Academics', label: 'Examinations & Report Cards (View/Create/Edit)' },
    { group: 'People', label: 'Student Directory & Portfolios (View/Edit)' },
    { group: 'Business', label: 'Admissions CRM & Counselling (View/Create/Edit)' },
    { group: 'Business', label: 'Fee Invoices, Scholarships & Accounts (View/Edit)' },
    { group: 'Business', label: 'HRMS, Leave & Staff Payroll (View/Edit)' },
    { group: 'Operations', label: 'Transport Fleet & Route Builder (View/Edit)' },
    { group: 'Operations', label: 'Hostel Rooms, Attendance & Visitors (View/Edit)' },
    { group: 'Operations', label: 'Library Catalogue & Procurement POs (View/Create)' },
    { group: 'Safety', label: 'Anti-Ragging & Child Protection Cases (Confidential)' },
  ];

  const allActionButtons = [
    'Approve',
    'Reject',
    'Publish',
    'Export',
    'Download',
    'Print',
    'Share',
    'Generate',
  ];

  const allFieldRestrictions = [
    'Teacher sees Academic Data only (Hide Fee Info)',
    'Restrict Safeguarding Case Identity',
    'Hide HR Salary & Bank Account Numbers',
    'Mask Parent Phone & Residential Address',
  ];

  const handleCreateCustomRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;
    const created: CustomRoleDefinition = {
      id: `cr-${Date.now()}`,
      name: newRoleName.trim(),
      baseCategory: 'Admin-Defined Custom Role',
      recordScope: newRoleScope,
      startDate: newRoleStart,
      expiryDate: newRoleExpiry,
      autoRevoke: newRoleAutoRevoke,
      fieldRestrictions: selectedRestrictions,
      modulePermissions: selectedModulePerms,
      actionPermissions: selectedActionPerms,
    };
    setCustomRoles([created, ...customRoles]);
    setNewRoleName('');
    showToast(
      `Created custom role "${created.name}" (${created.recordScope} scope • Auto-revoke ${created.expiryDate})`
    );
  };

  const toggleItem = (list: string[], setList: (v: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const targetUser = USERS[selectedRole];
  const permissions = targetUser ? targetUser.permissions : [];
  const roles: RoleType[] = ['ADMIN', 'PRINCIPAL', 'VICE_PRINCIPAL', 'TEACHER', 'STUDENT', 'PARENT'];

  const filteredLogs = auditLogs.filter(
    (l) =>
      l.details.toLowerCase().includes(auditSearch.toLowerCase()) ||
      l.userName.toLowerCase().includes(auditSearch.toLowerCase()) ||
      l.module.toLowerCase().includes(auditSearch.toLowerCase()) ||
      l.action.toLowerCase().includes(auditSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#176B87] font-semibold uppercase tracking-wider mb-1">
            <span>Platform Architecture • Screens #71 – #76</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#123B5D] tracking-tight">
            RBAC Engine, Custom Role Builder, Workflows &amp; Integrations
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create custom roles without developer involvement, configure SLA workflows, and audit sensitive records.
          </p>
        </div>

        <AccessControlledBadge
          moduleName="Platform RBAC & Security Engine"
          recordScope="Organization / All Campuses"
          sensitivityLevel="CONFIDENTIAL"
          maskedFields={['Encrypted MFA Seeds', 'Webhook Signing Keys', 'Safeguarding Witness Tokens']}
        />
      </div>

      {/* 6 Sub-Module Navigation Tabs (Screens #71 to #76) */}
      <div className="flex items-center space-x-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto scrollbar-none">
        {[
          { id: 'ROLE_BUILDER', label: '71. Custom Role Builder', icon: Plus },
          { id: 'RBAC', label: '72. Permission Matrix', icon: Shield },
          { id: 'WORKFLOWS', label: '73. Workflow Builder', icon: GitBranch },
          { id: 'AUDIT', label: `74. Audit Logs (${auditLogs.length})`, icon: FileText },
          { id: 'SETTINGS', label: '75. System & Security UX', icon: Sliders },
          { id: 'INTEGRATIONS', label: '76. Integration Hub', icon: Plug },
        ].map((t) => {
          const Icon = t.icon;
          const isAct = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 whitespace-nowrap transition cursor-pointer ${
                isAct
                  ? 'bg-[#123B5D] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= SCREEN #71: CUSTOM ROLE BUILDER (Section 4) ================= */}
      {activeTab === 'ROLE_BUILDER' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Builder Form (7 cols) */}
          <form
            onSubmit={handleCreateCustomRole}
            className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-[#123B5D]">
                  No-Code Custom Role Builder (Screen #71)
                </h3>
                <p className="text-xs text-slate-500">
                  Combine module CRUD, action permissions, record scopes, time-bounds &amp; data-field masking.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-teal/10 text-[#176B87] text-[10px] font-bold">
                {selectedModulePerms.length + selectedActionPerms.length} Permissions Selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Custom Role Title *</label>
                <input
                  type="text"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="e.g. Grade 9-12 Career & Exam Coordinator"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#176B87]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Record Scope (Section 4)</label>
                <select
                  value={newRoleScope}
                  onChange={(e) => setNewRoleScope(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#176B87]"
                >
                  <option value="Own records">Own records</option>
                  <option value="Assigned records">Assigned records</option>
                  <option value="Department">Department</option>
                  <option value="Class/Section">Class/Section</option>
                  <option value="Campus">Campus</option>
                  <option value="School">School</option>
                  <option value="Organization">Organization (Multi-School)</option>
                </select>
              </div>
            </div>

            {/* Time-Bound Permissions */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#123B5D] flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#176B87]" />
                  <span>Time-Bound Permission Window &amp; Automatic Revocation</span>
                </span>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newRoleAutoRevoke}
                    onChange={(e) => setNewRoleAutoRevoke(e.target.checked)}
                    className="rounded text-[#176B87]"
                  />
                  <span className="text-[11px] font-bold text-emerald-700">Auto-Revoke on Expiry</span>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-slate-500 block">Effective Start Date</span>
                  <input
                    type="date"
                    value={newRoleStart}
                    onChange={(e) => setNewRoleStart(e.target.value)}
                    className="w-full mt-0.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Automatic Expiry Date</span>
                  <input
                    type="date"
                    value={newRoleExpiry}
                    onChange={(e) => setNewRoleExpiry(e.target.value)}
                    className="w-full mt-0.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Search & Grouped Module Permissions */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700">Grouped Module Permissions</label>
                <input
                  type="text"
                  value={permSearch}
                  onChange={(e) => setPermSearch(e.target.value)}
                  placeholder="Filter permissions..."
                  className="px-2.5 py-1 rounded-lg border border-slate-200 text-[11px]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1">
                {availableGroupedPermissions
                  .filter(
                    (p) =>
                      p.label.toLowerCase().includes(permSearch.toLowerCase()) ||
                      p.group.toLowerCase().includes(permSearch.toLowerCase())
                  )
                  .map((p) => {
                    const checked = selectedModulePerms.includes(p.label);
                    return (
                      <label
                        key={p.label}
                        className={`p-2 rounded-xl border flex items-start space-x-2 cursor-pointer transition ${
                          checked
                            ? 'bg-teal/5 border-[#176B87] text-[#123B5D]'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            toggleItem(selectedModulePerms, setSelectedModulePerms, p.label)
                          }
                          className="mt-0.5 rounded text-[#176B87]"
                        />
                        <div>
                          <span className="text-[9px] font-bold uppercase text-[#176B87] block">
                            {p.group}
                          </span>
                          <span className="font-semibold text-[11px]">{p.label}</span>
                        </div>
                      </label>
                    );
                  })}
              </div>
            </div>

            {/* Action Permissions (Approve, Reject, Publish, Export, Download, Print, Share, Generate) */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-slate-700 block">
                Action-Level Permissions (Section 4)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {allActionButtons.map((act) => {
                  const active = selectedActionPerms.includes(act);
                  return (
                    <button
                      key={act}
                      type="button"
                      onClick={() =>
                        toggleItem(selectedActionPerms, setSelectedActionPerms, act)
                      }
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition cursor-pointer ${
                        active
                          ? 'bg-[#176B87] text-white border-[#176B87]'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {active ? `✓ ${act}` : act}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Data-Field Restrictions */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-slate-700 flex items-center space-x-1">
                <EyeOff className="w-3.5 h-3.5 text-amber-600" />
                <span>Data-Field Privacy Restrictions</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {allFieldRestrictions.map((rf) => {
                  const active = selectedRestrictions.includes(rf);
                  return (
                    <label
                      key={rf}
                      className="flex items-center space-x-2 p-2 rounded-lg bg-amber-50/50 border border-amber-200/80 text-[11px] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() =>
                          toggleItem(selectedRestrictions, setSelectedRestrictions, rf)
                        }
                        className="rounded text-amber-600"
                      />
                      <span className="font-medium text-amber-900">{rf}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#123B5D] hover:bg-[#176B87] text-white font-bold text-xs transition shadow-xs cursor-pointer"
            >
              Publish Custom Role &amp; Log to Security Audit Trail
            </button>
          </form>

          {/* Right: Live Permission Preview & Active Custom Roles (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#123B5D] text-white rounded-2xl p-5 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  Live Permission Preview
                </span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono">
                  Scope: {newRoleScope}
                </span>
              </div>
              <h4 className="font-black text-base">
                {newRoleName || 'Untitled Custom Role'}
              </h4>
              <p className="text-xs text-slate-300">
                Valid {newRoleStart} → {newRoleExpiry}{' '}
                {newRoleAutoRevoke ? '(Auto-Revoke Active)' : ''}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {selectedActionPerms.map((a) => (
                  <span
                    key={a}
                    className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-200 text-[10px] font-bold"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
              <h4 className="font-extrabold text-xs text-[#123B5D] uppercase tracking-wider">
                Active Admin-Defined Roles ({customRoles.length})
              </h4>
              <div className="space-y-3 max-h-[380px] overflow-y-auto">
                {customRoles.map((cr) => (
                  <div
                    key={cr.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-[#123B5D]">{cr.name}</span>
                      <span className="px-2 py-0.5 rounded bg-teal/10 text-[#176B87] font-bold text-[10px]">
                        Scope: {cr.recordScope}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Time-bound: {cr.startDate} to {cr.expiryDate} •{' '}
                      <strong className="text-emerald-700">Auto-Revoke Enabled</strong>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {cr.actionPermissions.map((ap) => (
                        <span
                          key={ap}
                          className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-semibold text-slate-700"
                        >
                          {ap}
                        </span>
                      ))}
                    </div>
                    <div className="text-[10px] text-amber-800 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                      Field Masking: {cr.fieldRestrictions.join(' • ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SCREEN #72: PERMISSION MATRIX ================= */}
      {activeTab === 'RBAC' && (
        <div className="space-y-5">
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-2 overflow-x-auto">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
                Role:
              </span>
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRole(r)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    selectedRole === r
                      ? 'bg-[#176B87] text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <span className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg font-semibold">
              Sensitive role changes are automatically recorded in the Security Audit Log
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-[#123B5D]">
                  Role-Permission Matrix (Screen #72): <span className="text-[#176B87]">{selectedRole}</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Module CRUD (View, Create, Edit, Delete) + Action permissions (Approve, Export) &amp; Record Scope.
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
                    <th className="px-4 py-3 text-center">View</th>
                    <th className="px-4 py-3 text-center">Create</th>
                    <th className="px-4 py-3 text-center">Edit</th>
                    <th className="px-4 py-3 text-center">Delete</th>
                    <th className="px-4 py-3 text-center">Approve</th>
                    <th className="px-4 py-3 text-center">Export</th>
                    <th className="px-4 py-3 text-right">Record Scope</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {permissions.map((perm) => (
                    <tr key={perm.id} className="hover:bg-slate-50/60 transition">
                      <td className="px-4 py-3 font-bold text-[#123B5D]">{perm.module}</td>

                      {(
                        ['canView', 'canCreate', 'canEdit', 'canDelete', 'canApprove', 'canExport'] as const
                      ).map((field) => (
                        <td key={field} className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={perm[field]}
                            onChange={(e) =>
                              updateRbacPermission(selectedRole, perm.module, field, e.target.checked)
                            }
                            className="w-4 h-4 rounded text-[#176B87] focus:ring-teal/20 cursor-pointer"
                          />
                        </td>
                      ))}

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

      {/* ================= SCREEN #73: WORKFLOW BUILDER (Section 16) ================= */}
      {activeTab === 'WORKFLOWS' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-sm text-[#123B5D]">
                Enterprise Workflow &amp; Approval Engine (Screen #73)
              </h3>
              <p className="text-xs text-slate-500">
                Standardized pipeline: Requester → Current Stage → Required Action → SLA/Age → History → Approve/Reject/Request Changes
              </p>
            </div>
            <button
              type="button"
              onClick={() => showToast('All 10 statutory approval pipelines active and synced across roles')}
              className="px-3.5 py-2 rounded-xl bg-[#176B87] text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              Verify SLA Pipelines
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WORKFLOW_BLUEPRINTS.map((wf) => (
              <div
                key={wf.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-[#123B5D]">{wf.type}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-teal/10 text-[#176B87] font-bold text-[10px]">
                    {wf.activeCount} Active in Queue
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-[11px]">
                  <div>
                    <span className="text-slate-400 font-semibold">Requester: </span>
                    <strong className="text-slate-700">{wf.requester}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold">Current Stage: </span>
                    <strong className="text-[#176B87]">{wf.currentStage}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold">Required Action: </span>
                    <span className="text-slate-700 font-medium">{wf.requiredAction}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center space-x-1 font-semibold text-amber-700">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{wf.slaAge}</span>
                  </span>
                  <span>{wf.history}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SCREEN #74: SECURITY AUDIT LOGS (Section 22) ================= */}
      {activeTab === 'AUDIT' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                placeholder="Search login, data access, export, approvals..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#176B87]"
              />
            </div>
            <button
              onClick={() => setIsExportConfirmOpen(true)}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Sensitive Audit Log (Requires Confirmation)</span>
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
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                      <td className="px-4 py-3 font-sans">
                        <strong className="block text-[#123B5D] font-bold">{log.userName}</strong>
                        <span className="text-[10px] text-[#176B87] font-mono">{log.userRole}</span>
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-700">{log.action}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">
                          {log.module}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 font-bold truncate max-w-[120px]">
                        {log.resourceId}
                      </td>
                      <td className="px-4 py-3 font-sans text-slate-700 font-medium">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= SCREEN #75: SYSTEM SETTINGS & BULK IMPORT (Section 20 & 22) ================= */}
      {activeTab === 'SETTINGS' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Security & Privacy UX Controls */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
            <h3 className="font-extrabold text-sm text-[#123B5D]">
              Security, MFA &amp; Session Governance (Screen #75 • Section 22)
            </h3>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <div className="font-bold text-[#123B5D]">Enforce MFA for Privileged Roles</div>
                <div className="text-[11px] text-slate-500">
                  Mandatory OTP / Authenticator verification for Super Admin, Principal, Safety &amp; Accounts
                </div>
              </div>
              <input
                type="checkbox"
                checked={mfaEnforced}
                onChange={(e) => {
                  setMfaEnforced(e.target.checked);
                  showToast(`Privileged Role MFA ${e.target.checked ? 'Enforced' : 'Disabled'}`);
                }}
                className="w-4 h-4 rounded text-[#176B87]"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <div className="font-bold text-[#123B5D]">Re-Authentication for High-Risk Actions</div>
                <div className="text-[11px] text-slate-500">
                  Require step-up verification before Payroll Disbursal, Case Closure &amp; Bulk Export
                </div>
              </div>
              <input
                type="checkbox"
                checked={reauthHighRisk}
                onChange={(e) => {
                  setReauthHighRisk(e.target.checked);
                  showToast('Updated high-risk step-up authentication policy');
                }}
                className="w-4 h-4 rounded text-[#176B87]"
              />
            </label>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-[#123B5D]">Idle Session Timeout Policy</div>
                <div className="text-[11px] text-slate-500">Auto-lock administrative consoles on inactivity</div>
              </div>
              <select
                value={sessionTimeoutMins}
                onChange={(e) => {
                  setSessionTimeoutMins(e.target.value);
                  showToast(`Session timeout set to ${e.target.value} minutes`);
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold"
              >
                <option value="10">10 Minutes</option>
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
              </select>
            </div>
          </div>

          {/* Bulk Data Import with Preview, Validation & Error Report (Section 20) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-[#123B5D]">
                  Bulk Data Import &amp; Validation Engine (Section 20)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Import Students, Staff, Fee Invoices, or Library Catalogue with pre-flight schema validation.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setBulkImportValidated(true);
                  showToast('Validated 145 records: 142 passed, 3 schema warnings flagged');
                }}
                className="px-3 py-1.5 rounded-xl bg-[#176B87] text-white font-bold flex items-center space-x-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Run Validation Preview</span>
              </button>
            </div>

            {bulkImportValidated ? (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between">
                  <span>
                    <strong>142 / 145 rows valid</strong> • Ready for atomic commit
                  </span>
                  <span className="text-amber-700 font-bold">3 Rows Flagged</span>
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden text-[11px]">
                  <div className="bg-slate-50 px-3 py-2 font-bold text-slate-600 border-b border-slate-200">
                    Validation Error Preview
                  </div>
                  <div className="p-2.5 space-y-1 font-mono text-rose-700 bg-rose-50/40">
                    <div>Row #19: Missing Guardian Emergency Phone (+91 format required)</div>
                    <div>Row #64: Duplicate Admission No. ADM-2026-108</div>
                    <div>Row #112: Invalid Bus Route Code (RT-99 not found)</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      downloadTextAsPdf(
                        'CASPA_Bulk_Import_Validation_Error_Report.pdf',
                        'CASPA SCHOOL OS — BULK IMPORT VALIDATION ERROR REPORT',
                        [
                          'Batch ID: IMP-2026-1026',
                          'Total Rows Scanned: 145 | Passed: 142 | Errors: 3',
                          '------------------------------------------------',
                          '1. Row #19: Missing Guardian Emergency Phone (+91 format required)',
                          '2. Row #64: Duplicate Admission No. ADM-2026-108',
                          '3. Row #112: Invalid Bus Route Code (RT-99 not found)',
                        ]
                      );
                      showToast('Downloaded Bulk Import Error Report PDF');
                    }}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Download Error Report PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Committed 142 validated student records to database')}
                    className="px-3 py-1.5 rounded-lg bg-[#16A34A] text-white font-bold cursor-pointer"
                  >
                    Commit 142 Valid Rows
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-400">
                Click &ldquo;Run Validation Preview&rdquo; to inspect staged CSV import rows and error diagnostics.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= SCREEN #76: INTEGRATION HUB ================= */}
      {activeTab === 'INTEGRATIONS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              name: 'AIS-140 Fleet GPS & RFID Boarding',
              category: 'Transport & Security',
              status: 'Connected • 24 Buses Live',
              detail: 'Real-time vehicle telemetry, speed alerts, and student QR/RFID boarding timestamps.',
            },
            {
              name: 'WhatsApp, SMS & Email Broadcast Gateway',
              category: 'Communication Center',
              status: 'Connected • 99.8% Delivery',
              detail: 'Multi-channel parent circulars, emergency alerts, fee reminders, and PTM slots.',
            },
            {
              name: 'Enterprise Fee & UPI / Mandate Gateway',
              category: 'Accounts & Finance',
              status: 'Connected • Auto-Reconciled',
              detail: 'Instant fee receipt generation, scholarship ledger sync, and staff payroll NACH.',
            },
            {
              name: 'Campus Biometric & Gate Turnstiles',
              category: 'Attendance & Visitor Desk',
              status: 'Connected • 8 Gates Active',
              detail: 'Staff duty check-in, hostel night roll-call, and visitor pass verification.',
            },
            {
              name: 'CBSE / IB / DigiLocker Certificate Registry',
              category: 'Academics & Certificates',
              status: 'Connected • QR Verified',
              detail: 'Tamper-proof QR verification for Transfer, Bonafide, and Character certificates.',
            },
            {
              name: 'CASPA AI (Google Gemini 3.8 Flash)',
              category: 'School Intelligence',
              status: 'Connected • RBAC Scoped',
              detail: 'Role-aware tutoring, quiz generation, and executive decision support.',
            },
          ].map((integ, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-3 text-xs"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-[#176B87]">
                    {integ.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                    {integ.status}
                  </span>
                </div>
                <h4 className="font-extrabold text-sm text-[#123B5D]">{integ.name}</h4>
                <p className="text-slate-500 leading-relaxed">{integ.detail}</p>
              </div>
              <button
                type="button"
                onClick={() => showToast(`Verified webhook & health check for ${integ.name}`)}
                className="w-full py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#123B5D] font-bold border border-slate-200 transition cursor-pointer"
              >
                Run Diagnostics &amp; Sync
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Explicit Confirmation Modal for Exporting Sensitive Records (Section 20) */}
      {isExportConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2 text-amber-600">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-extrabold text-sm text-[#123B5D]">
                  Confirm Sensitive Data Export (Section 20)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsExportConfirmOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-slate-600 leading-relaxed">
              You are exporting <strong>{filteredLogs.length} security audit records</strong>. In accordance with CASPA Privacy UX guidelines, this export will be watermarked with your operator ID and logged in the immutable audit trail.
            </p>
            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setIsExportConfirmOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  downloadTextAsPdf(
                    'CASPA_Security_Audit_Logs.pdf',
                    'CASPA SCHOOL OS — IMMUTABLE SECURITY AUDIT LOGS',
                    filteredLogs.map(
                      (l) => `[${l.timestamp}] ${l.userName} (${l.userRole}) - ${l.action} (${l.module}): ${l.details}`
                    )
                  );
                  setIsExportConfirmOpen(false);
                  showToast('Exported watermarked Security Audit Log PDF');
                }}
                className="px-4 py-2 rounded-xl bg-[#123B5D] text-white font-bold cursor-pointer"
              >
                Confirm &amp; Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
