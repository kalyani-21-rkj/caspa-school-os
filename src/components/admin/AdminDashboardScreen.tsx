import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  CreditCard,
  ShieldAlert,
  Bus,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  PlusCircle,
  FileText,
  Radio,
  Download,
  Calendar,
  Building,
  Check,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AdminDashboardScreenProps {
  onNavigate: (tab: string) => void;
}

export const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({ onNavigate }) => {
  const {
    currentUser,
    students,
    staffMembers,
    feeInvoices,
    safetyIncidents,
    approvals,
    buses,
    auditLogs,
    classSections,
    processApproval,
    showToast,
  } = useApp();

  const [isAdmitModalOpen, setIsAdmitModalOpen] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [broadcastText, setBroadcastText] = useState('');

  // Calculations
  const totalStudents = 1420; // Enterprise enrolled total
  const activeStudentsCount = students.length;
  const totalFeeCollected = feeInvoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const totalFeeDue = feeInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const feeRate = totalFeeDue > 0 ? ((totalFeeCollected / totalFeeDue) * 100).toFixed(1) : '94.2';

  const activeAlerts = safetyIncidents.filter((s) => s.status !== 'RESOLVED' && s.status !== 'CLOSED');
  const pendingApprovals = approvals.filter((a) => a.status === 'PENDING');

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;
    showToast(`Campus-wide broadcast dispatched to 1,420 parents & staff.`);
    setBroadcastText('');
    setIsBroadcastModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar matching Teacher/Student Module */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-teal font-semibold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Central Campus Master Console • Fall Term 2026</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-navy tracking-tight">
            Welcome, {currentUser?.fullName || 'Arthur Clark'} 👋
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {currentUser?.designation || 'School Administrator & Operations Director'} • Executive Operations Command Center
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsBroadcastModalOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold transition"
          >
            <Radio className="w-3.5 h-3.5 text-red-600 animate-pulse" />
            <span>Emergency Broadcast</span>
          </button>
          <button
            onClick={() => showToast('Exporting official Executive Compliance Dossier (PDF)...')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Export Report</span>
          </button>
        </div>
      </div>

      {/* Quick Action Shortcuts Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
        <button
          onClick={() => onNavigate('students')}
          className="p-3 bg-white rounded-xl border border-slate-200/80 hover:border-teal/50 hover:shadow-xs transition text-left flex items-center space-x-3 group"
        >
          <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center text-teal group-hover:scale-105 transition-transform">
            <PlusCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-navy">Admit Student</div>
            <div className="text-[10px] text-slate-400">Enroll new profile</div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('staff')}
          className="p-3 bg-white rounded-xl border border-slate-200/80 hover:border-teal/50 hover:shadow-xs transition text-left flex items-center space-x-3 group"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-navy">Onboard Faculty</div>
            <div className="text-[10px] text-slate-400">Assign subjects</div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('finance')}
          className="p-3 bg-white rounded-xl border border-slate-200/80 hover:border-teal/50 hover:shadow-xs transition text-left flex items-center space-x-3 group"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-navy">Collect Fees</div>
            <div className="text-[10px] text-slate-400">Record payments</div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('safety')}
          className="p-3 bg-white rounded-xl border border-slate-200/80 hover:border-teal/50 hover:shadow-xs transition text-left flex items-center space-x-3 group"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-navy">Safety SLA Desk</div>
            <div className="text-[10px] text-slate-400">1 case active</div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('transport')}
          className="p-3 bg-white rounded-xl border border-slate-200/80 hover:border-teal/50 hover:shadow-xs transition text-left flex items-center space-x-3 group col-span-2 sm:col-span-1"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 group-hover:scale-105 transition-transform">
            <Bus className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-navy">Fleet GPS Radar</div>
            <div className="text-[10px] text-slate-400">24 buses active</div>
          </div>
        </button>
      </div>

      {/* High-Impact Operational KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Total Students */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Students</span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-navy">{totalStudents}</span>
            <div className="flex items-center space-x-1 text-[10px] text-emerald-600 font-semibold mt-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>+4.2% YoY growth</span>
            </div>
          </div>
        </div>

        {/* Today's Attendance */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Attendance</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-navy">96.4%</span>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5">
              1,369 present • 51 absent
            </div>
          </div>
        </div>

        {/* Faculty on Duty */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Faculty</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-navy">84 Staff</span>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
              98.1% staff on duty
            </div>
          </div>
        </div>

        {/* Fee Collection */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Fee Collection</span>
            <div className="w-7 h-7 rounded-lg bg-teal/10 flex items-center justify-center text-teal">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-navy">{feeRate}%</span>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5 truncate">
              ${(totalFeeCollected / 1000).toFixed(0)}k collected
            </div>
          </div>
        </div>

        {/* Bus Fleet */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Fleet Status</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Bus className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-navy">24/24</span>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
              100% routes active
            </div>
          </div>
        </div>

        {/* Safeguarding Alert */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Safety SLA</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-rose-600">{activeAlerts.length} Active</span>
            <div className="text-[10px] text-rose-500 font-semibold mt-0.5 truncate">
              Under 24h SLA review
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Operations Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols wide) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Priority Requisitions & Approvals */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-teal" />
                <h3 className="font-bold text-sm text-navy">
                  Pending Administrative Approvals ({pendingApprovals.length})
                </h3>
              </div>
              <button
                onClick={() => onNavigate('approvals')}
                className="text-xs text-teal font-semibold hover:underline flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {pendingApprovals.map((req) => (
                <div key={req.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 transition">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase">
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
                      <span className="text-[11px] text-slate-400 font-medium">SLA: {req.slaDeadline}</span>
                    </div>
                    <h4 className="font-bold text-xs text-navy">{req.title}</h4>
                    <p className="text-[11px] text-slate-500">
                      Requested by <strong className="text-slate-700">{req.requesterName}</strong> ({req.requesterRole})
                      {req.amount ? ` • Budget: $${req.amount.toLocaleString()}` : ''}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => processApproval(req.id, 'APPROVED', 'Authorized by School Administrator')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1 transition shadow-xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => processApproval(req.id, 'CHANGES_REQUESTED', 'Please attach supplementary quotes')}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-medium transition"
                    >
                      Changes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Safeguarding Spotlight */}
          {activeAlerts.length > 0 && (
            <div className="bg-rose-50/60 rounded-2xl border border-rose-200 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-rose-700">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span className="font-bold text-xs uppercase tracking-wider">
                    High Priority Incident • Statutory Review
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full">
                  Case #{activeAlerts[0].caseNumber}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-sm text-navy">{activeAlerts[0].category} Protocol Active</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{activeAlerts[0].description}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-2 border-t border-rose-200/60">
                <div>
                  <span className="text-slate-400 block text-[10px]">Location:</span>
                  <span className="font-semibold text-slate-700">{activeAlerts[0].location}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">SLA Remaining:</span>
                  <span className="font-bold text-rose-700">{activeAlerts[0].slaDeadline}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Lead Investigator:</span>
                  <span className="font-semibold text-slate-700 truncate block">Arthur Clark</span>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => onNavigate('safety')}
                    className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-xs transition"
                  >
                    Open Case File &gt;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Academic Section Capacity & Progress */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-teal" />
                <h3 className="font-bold text-sm text-navy">Class Sections & Syllabus Completion</h3>
              </div>
              <button
                onClick={() => onNavigate('academics')}
                className="text-xs text-teal font-semibold hover:underline"
              >
                Manage Classes
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {classSections.map((sec) => (
                <div key={sec.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-navy">{sec.grade} - Section {sec.section}</span>
                    <span className="text-[11px] font-medium text-slate-500">
                      {sec.studentCount}/{sec.capacity} Students
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-teal h-full rounded-full transition-all"
                      style={{ width: `${(sec.studentCount / sec.capacity) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Teacher: {sec.classTeacher}</span>
                    <span className="font-bold text-navy">{sec.syllabusCompletionRate}% Syllabus</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Campus Stream & Radar */}
        <div className="space-y-6">
          {/* Recent Operations Audit Stream */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-teal" />
                <h3 className="font-bold text-sm text-navy">Live Operations Audit Stream</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Real-Time</span>
            </div>

            <div className="space-y-3">
              {auditLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-start space-x-2.5 text-xs">
                  <div className="w-2 h-2 rounded-full bg-teal shrink-0 mt-1.5" />
                  <div className="overflow-hidden flex-1">
                    <p className="text-slate-800 font-medium leading-snug truncate">
                      {log.details}
                    </p>
                    <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-0.5">
                      <span className="font-bold text-slate-600">{log.userName}</span>
                      <span>•</span>
                      <span>{log.module}</span>
                      <span>•</span>
                      <span>{log.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('rbac')}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold transition text-center"
            >
              View Full Security Audit Trail &gt;
            </button>
          </div>

          {/* School Bus GPS Radar Summary */}
          <div className="bg-[#0E2C48] text-white rounded-2xl p-4 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bus className="w-4 h-4 text-cyan-300" />
                <h3 className="font-bold text-sm">Fleet GPS Tracker</h3>
              </div>
              <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                24 Active
              </span>
            </div>

            <p className="text-xs text-slate-300">
              All 24 school transit vehicles reporting continuous telemetry. Zero mechanical alerts.
            </p>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-cyan-200">Route 12 (Campus Special)</span>
                <span className="text-emerald-400 font-bold">On Route • 34 km/h</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Driver: Manjunath Gowda • Near Metro Gate 4
              </p>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>Capacity: 28/35 Students</span>
                <span className="font-bold text-yellow-300">ETA 14 Mins</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('transport')}
              className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition text-center"
            >
              Open Full Transport Radar &gt;
            </button>
          </div>

          {/* CASPA Admin Copilot Prompt Suggestion */}
          <div className="bg-gradient-to-tr from-purple-900/20 to-indigo-900/20 rounded-2xl border border-purple-200/60 p-4 space-y-2.5">
            <div className="flex items-center space-x-2 text-purple-800">
              <Sparkles className="w-4 h-4" />
              <span className="font-extrabold text-xs">CASPA School AI Intelligence</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ask CASPA to generate executive summaries, draft compliance notices, or audit cross-campus attendance trends.
            </p>
            <button
              onClick={() => onNavigate('caspa')}
              className="w-full py-2 bg-[#5B3FA3] hover:bg-[#6c4bc0] text-white rounded-lg text-xs font-bold transition text-center shadow-xs"
            >
              Consult CASPA Admin AI &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Broadcast Modal */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2 text-red-600">
                <Radio className="w-5 h-5 animate-pulse" />
                <h3 className="font-bold text-base text-navy">Campus Emergency Broadcast</h3>
              </div>
              <button
                onClick={() => setIsBroadcastModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Dispatches instant push alerts and SMS messages to all enrolled guardians, staff, and campus security.
            </p>

            <form onSubmit={handleBroadcast} className="space-y-3">
              <textarea
                value={broadcastText}
                onChange={(e) => setBroadcastText(e.target.value)}
                placeholder="e.g. Severe weather advisory: Buses will depart 30 minutes early today at 2:45 PM."
                rows={4}
                className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-red-500 resize-none"
                required
              />

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-xs"
                >
                  Broadcast to 1,420 Users
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
