import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Lock,
  Plus,
  Eye,
  X,
  FileText,
  UserCheck,
  Shield,
  MessageSquare,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SafetyIncident, IncidentStatus } from '../../types';
import { AccessControlledBadge } from '../common/AccessControlledBadge';

export const AdminSafetyScreen: React.FC = () => {
  const { safetyIncidents, updateSafetyIncident, showToast } = useApp();

  const [selectedIncident, setSelectedIncident] = useState<SafetyIncident | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [resolutionText, setResolutionText] = useState('');

  const activeIncidents = safetyIncidents.filter((s) => s.status !== 'RESOLVED' && s.status !== 'CLOSED');
  const resolvedIncidents = safetyIncidents.filter((s) => s.status === 'RESOLVED' || s.status === 'CLOSED');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIncident || !newNoteText.trim()) return;
    updateSafetyIncident(selectedIncident.id, selectedIncident.status, newNoteText);
    setNewNoteText('');
    showToast('Confidential investigation note logged');
  };

  const handleResolveCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIncident || !resolutionText.trim()) return;
    updateSafetyIncident(selectedIncident.id, 'RESOLVED', `CASE RESOLVED: ${resolutionText}`);
    setIsResolveModalOpen(false);
    setSelectedIncident(null);
    setResolutionText('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar matching Teacher/Student Module */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-rose-600 font-semibold uppercase tracking-wider mb-1">
            <Shield className="w-3.5 h-3.5 text-rose-600" />
            <span>Statutory Safeguarding, Anti-Ragging &amp; POSH SLA Desk</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-navy tracking-tight">
            Safety Grievance &amp; Disciplinary Enforcement
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Strict institutional compliance with zero-tolerance anti-ragging protocols and mandated 24h SLA resolution.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <AccessControlledBadge
            moduleName="Anti-Ragging & Child Safeguarding"
            recordScope="Safeguarding Committee / Principal / Safety Officer Only"
            sensitivityLevel="CONFIDENTIAL"
            maskedFields={['Victim Identity (Encrypted)', 'Anonymous Reporter IP', 'Counselling Session Notes']}
          />
          <button
            onClick={() => showToast('Exported confidential Safeguarding Committee dossier')}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition shadow-xs"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Audit Log Export</span>
          </button>
        </div>
      </div>

      {/* SLA Metric Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-rose-700 text-xs font-bold uppercase">
            <span>Active Cases</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-700 mt-1">{activeIncidents.length} Under SLA</div>
          <span className="text-[11px] text-rose-600 mt-0.5 block">Statutory investigation active</span>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-bold uppercase">
            <span>SLA Compliance</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-1">100%</div>
          <span className="text-[11px] text-emerald-600 mt-0.5 block">Zero SLA breaches this term</span>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Resolved Grievances</span>
            <Shield className="w-4 h-4 text-teal" />
          </div>
          <div className="text-2xl font-black text-navy mt-1">{resolvedIncidents.length} Closed</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">With signed guardian sign-off</span>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Whistleblower</span>
            <Lock className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-navy mt-1">Encrypted</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Anonymous reports protected</span>
        </div>
      </div>

      {/* Active Incidents List */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-sm text-navy flex items-center space-x-2">
          <Clock className="w-4 h-4 text-teal" />
          <span>Active Investigation Queue ({activeIncidents.length})</span>
        </h3>

        {activeIncidents.map((inc) => (
          <div
            key={inc.id}
            className="bg-white rounded-2xl border-2 border-rose-200 shadow-sm p-5 space-y-4 hover:border-rose-300 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded-md font-mono text-xs font-extrabold bg-rose-100 text-rose-800">
                  #{inc.caseNumber}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-600 text-white uppercase tracking-wider">
                  {inc.risk} Risk
                </span>
                <span className="font-bold text-sm text-navy">{inc.category} Protocol</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 animate-spin" />
                  <span>SLA Deadline: {inc.slaDeadline}</span>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {inc.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">Incident Location</span>
                <span className="font-bold text-slate-800">{inc.location}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">Date &amp; Timestamp</span>
                <span className="font-medium text-slate-700">{inc.dateTime}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">Reporter Origin</span>
                <span className="font-bold text-indigo-700">
                  {inc.isAnonymous ? 'Protected Anonymous Whistleblower' : inc.reporterName}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">Lead Investigator</span>
                <span className="font-bold text-navy">{inc.assignedInvestigator}</span>
              </div>
            </div>

            {/* Notes Thread */}
            {inc.investigationNotes.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  Confidential Evidence &amp; Action Notes
                </span>
                {inc.investigationNotes.map((n, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/60 text-xs text-slate-700 flex items-start space-x-2">
                    <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">{n.note}</p>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        Logged by {n.author} • {n.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedIncident(inc)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center space-x-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-teal" />
                  <span>Add Investigation Note</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setSelectedIncident(inc);
                    setIsResolveModalOpen(true);
                  }}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 shadow-xs transition"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Conclude &amp; Close Case</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {activeIncidents.length === 0 && (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
            No active statutory safety cases. Campus safeguarding operating under full compliance.
          </div>
        )}
      </div>

      {/* Closed Incidents Archive */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
        <h3 className="font-extrabold text-sm text-navy flex items-center space-x-2 border-b border-slate-100 pb-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Resolved &amp; Closed Disciplinary Cases ({resolvedIncidents.length})</span>
        </h3>

        <div className="space-y-3">
          {resolvedIncidents.map((inc) => (
            <div key={inc.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-teal">#{inc.caseNumber}</span>
                  <span className="font-bold text-navy">{inc.category}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    RESOLVED
                  </span>
                </div>
                <p className="text-slate-600">{inc.description}</p>
                {inc.actionTaken && (
                  <p className="text-[11px] text-emerald-700 font-semibold">
                    Resolution: {inc.actionTaken}
                  </p>
                )}
              </div>

              <div className="text-right text-[11px] text-slate-400 shrink-0">
                <span>Investigator: {inc.assignedInvestigator}</span>
                <span className="block">{inc.dateTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Investigation Note Modal */}
      {selectedIncident && !isResolveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-navy">Log Investigation Evidence</h3>
              <button onClick={() => setSelectedIncident(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Adding confidential notation to Case #{selectedIncident.caseNumber} ({selectedIncident.category}).
            </p>

            <form onSubmit={handleAddNote} className="space-y-3 text-xs">
              <textarea
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Log interviews, CCTV timestamps, or mediator summaries..."
                rows={4}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-teal resize-none"
                required
              />

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedIncident(null)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-teal text-white shadow-xs"
                >
                  Save to Confidential Docket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Resolve Case Modal */}
      {selectedIncident && isResolveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2 text-emerald-600">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="font-bold text-base text-navy">Conclude Case #{selectedIncident.caseNumber}</h3>
              </div>
              <button onClick={() => setIsResolveModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleResolveCase} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Official Resolution &amp; Disciplinary Action</label>
                <textarea
                  value={resolutionText}
                  onChange={(e) => setResolutionText(e.target.value)}
                  placeholder="e.g. Parental conference held. Both students submitted signed behavioral contracts. Grade counsellor follow-up assigned."
                  rows={4}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500 resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsResolveModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                >
                  Certify Resolution &amp; Close Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
