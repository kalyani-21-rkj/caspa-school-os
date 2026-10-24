import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Plus,
  Lock,
  Clock,
  EyeOff,
  UserX,
  FileText,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SafetyIncident, IncidentRisk, IncidentStatus } from '../types';

export const SafetyView: React.FC = () => {
  const {
    safetyIncidents,
    createIncident,
    updateIncidentStatus,
    currentRole,
    showToast,
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<SafetyIncident | null>(safetyIncidents[0] || null);
  const [newNote, setNewNote] = useState('');

  // Form State
  const [category, setCategory] = useState<SafetyIncident['category']>('Anti-Ragging');
  const [risk, setRisk] = useState<IncidentRisk>('HIGH');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  // RBAC Access Control Guard
  if (currentRole === 'STUDENT' || currentRole === 'PARENT') {
    return (
      <div className="bg-white rounded-xl border border-fieldBorder p-8 text-center max-w-lg mx-auto mt-12 space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-100 text-caspaDanger mx-auto flex items-center justify-center">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-navy">Confidential Clearance Required</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          The Anti-Ragging and Child Safeguarding module contains sealed statutory investigation dossiers. Access is restricted under the Zero-Tolerance Anti-Retaliation Charter to designated Safety Officers, Child Counsellors, and the Principal.
        </p>
        <div className="p-3 bg-surface rounded-lg border border-fieldBorder text-xs text-slate-500">
          To report an incident confidentially, click the anonymous reporting button below.
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-caspaDanger hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition"
        >
          File Anonymous Report
        </button>
      </div>
    );
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      showToast('Please provide a detailed incident description');
      return;
    }
    createIncident({
      category,
      risk,
      location: location || 'Campus Grounds',
      description,
      isAnonymous,
    });
    setIsModalOpen(false);
    setDescription('');
    setLocation('');
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedCase) return;
    updateIncidentStatus(selectedCase.id, selectedCase.status, newNote);
    setNewNote('');
    showToast('Confidential note added to case file');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-fieldBorder">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span>Safety &amp; Compliance</span>
            <span>·</span>
            <span>Zero-Tolerance Anti-Ragging Cell</span>
            <span>·</span>
            <span className="text-caspaDanger font-semibold flex items-center space-x-1">
              <Lock className="w-3 h-3" />
              <span>Sealed RBAC Vault</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">Safeguarding &amp; Anti-Ragging Register</h1>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-caspaDanger hover:bg-red-700 text-white text-xs font-semibold transition shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>File Confidential Report</span>
          </button>
        </div>
      </div>

      {/* Compliance Banner */}
      <div className="bg-red-950/10 border border-red-200 rounded-xl p-4 flex items-start space-x-3 text-xs text-slate-800">
        <ShieldAlert className="w-5 h-5 text-caspaDanger shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-caspaDanger">
            Statutory Anti-Ragging Directive &amp; Child Protection Protocol (SLA Mandated)
          </p>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            All incidents filed here are subject to strict legal non-disclosure. Whistleblower identities marked anonymous are cryptographically scrubbed from database records. Escalations breach SLA if not reviewed within 2 hours.
          </p>
        </div>
      </div>

      {/* 2-Column Incident Dossier Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Incidents List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-fieldBorder p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-fieldBorder text-xs">
            <span className="font-semibold text-navy">Active Cases ({safetyIncidents.length})</span>
            <span className="text-[11px] text-slate-400">Sorted by Severity</span>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {safetyIncidents.map((item) => {
              const isSelected = selectedCase?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedCase(item)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition text-xs ${
                    isSelected
                      ? 'border-navy bg-slate-50/80 shadow-xs ring-1 ring-navy'
                      : 'border-fieldBorder bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono font-bold text-navy">#{item.caseNumber}</span>
                    <div className="flex items-center space-x-1.5">
                      {item.isAnonymous && (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded flex items-center space-x-1">
                          <EyeOff className="w-2.5 h-2.5" />
                          <span>Anonymous</span>
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.risk === 'CRITICAL'
                            ? 'bg-red-100 text-caspaDanger'
                            : item.risk === 'HIGH'
                            ? 'bg-amber-100 text-caspaWarning'
                            : 'bg-blue-100 text-skyBlue'
                        }`}
                      >
                        {item.risk}
                      </span>
                    </div>
                  </div>

                  <p className="font-semibold text-slate-900">{item.category}</p>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{item.description}</p>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-medium text-teal">{item.status.replace('_', ' ')}</span>
                    <span className="flex items-center space-x-1 text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>{item.slaDeadline}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Case Dossier & Investigation Timeline (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-fieldBorder p-5 shadow-xs space-y-5">
          {selectedCase ? (
            <>
              {/* Dossier Header */}
              <div className="flex items-start justify-between pb-4 border-b border-fieldBorder">
                <div>
                  <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
                    <span className="font-mono font-bold text-navy text-sm">#{selectedCase.caseNumber}</span>
                    <span>·</span>
                    <span className="text-slate-600">{selectedCase.campusName}</span>
                    <span>·</span>
                    <span>{selectedCase.dateTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-navy">{selectedCase.category}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Location: {selectedCase.location}</p>
                </div>

                {/* Stage Transition Selector */}
                <div className="text-right">
                  <label className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Case Stage</label>
                  <select
                    value={selectedCase.status}
                    onChange={(e) => updateIncidentStatus(selectedCase.id, e.target.value as IncidentStatus)}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-fieldBorder bg-surface text-navy focus:outline-none focus:border-teal"
                  >
                    <option value="REPORTED">1. Reported</option>
                    <option value="INITIAL_REVIEW">2. Initial Review</option>
                    <option value="UNDER_INVESTIGATION">3. Under Investigation</option>
                    <option value="ACTION_PENDING">4. Action Pending</option>
                    <option value="COMMITTEE_REVIEW">5. Committee Review</option>
                    <option value="RESOLVED">6. Resolved</option>
                    <option value="CLOSED">7. Closed Dossier</option>
                  </select>
                </div>
              </div>

              {/* Incident Facts */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Statement of Incident</h4>
                <div className="p-3.5 bg-surface border border-fieldBorder rounded-lg text-xs text-slate-800 leading-relaxed">
                  {selectedCase.description}
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 bg-white border border-fieldBorder rounded-lg">
                    <span className="text-[11px] text-slate-400 block mb-0.5">Reporter Identity</span>
                    <span className="font-medium text-slate-800">
                      {selectedCase.isAnonymous ? 'Sealed Anonymous Report (Scrubbed)' : selectedCase.reporterName}
                    </span>
                  </div>
                  <div className="p-3 bg-white border border-fieldBorder rounded-lg">
                    <span className="text-[11px] text-slate-400 block mb-0.5">Assigned Investigator</span>
                    <span className="font-medium text-slate-800">
                      {selectedCase.assignedInvestigator || 'Cmdr. Rajat Mehra (Safety Lead)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Confidential Investigation Notes Timeline */}
              <div className="space-y-3 pt-2 border-t border-fieldBorder">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Confidential Investigation Log (Chain of Custody)</span>
                </h4>

                <div className="space-y-2">
                  {selectedCase.investigationNotes.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No notes logged yet. Add initial CCTV or interview findings below.</p>
                  ) : (
                    selectedCase.investigationNotes.map((note, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span className="font-semibold text-navy">{note.author}</span>
                          <span className="font-mono text-slate-400">{note.timestamp}</span>
                        </div>
                        <p className="text-slate-800 leading-relaxed">{note.note}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Append confidential finding or inquiry log..."
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-fieldBorder focus:outline-none focus:border-teal"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-navy hover:bg-navy-dark text-white text-xs font-medium rounded-lg transition"
                  >
                    Log Note
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select an incident from the left to view the sealed case dossier.
            </div>
          )}
        </div>
      </div>

      {/* Confidential Report Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-fieldBorder overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            <div className="p-5 bg-navy text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-5 h-5 text-caspaDanger" />
                <h3 className="font-bold text-sm">File Confidential Safeguarding Report</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-white text-base">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Incident Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as SafetyIncident['category'])}
                  className="w-full px-3 py-2 rounded-lg border border-fieldBorder focus:outline-none focus:border-teal"
                >
                  <option value="Anti-Ragging">Anti-Ragging Violation</option>
                  <option value="Bullying">Peer Bullying / Defamation</option>
                  <option value="Child Safety">Physical Safety &amp; POCSO Compliance</option>
                  <option value="Cyber Harassment">Cyber Harassment &amp; Digital Safety</option>
                  <option value="Substance Abuse">Substance Abuse Protocol</option>
                  <option value="Mental Health Crisis">Mental Health &amp; Urgent Intervention</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Risk Severity</label>
                  <select
                    value={risk}
                    onChange={(e) => setRisk(e.target.value as IncidentRisk)}
                    className="w-full px-3 py-2 rounded-lg border border-fieldBorder focus:outline-none focus:border-teal"
                  >
                    <option value="CRITICAL">Critical (2h SLA Escalation)</option>
                    <option value="HIGH">High (24h Investigation)</option>
                    <option value="MEDIUM">Medium (48h Resolution)</option>
                    <option value="LOW">Low (Routine Review)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Campus Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. South Wing Cafeteria"
                    className="w-full px-3 py-2 rounded-lg border border-fieldBorder focus:outline-none focus:border-teal"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Incident Description &amp; Evidence</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide precise details of the occurrence, involved parties, date and circumstances..."
                  className="w-full px-3 py-2 rounded-lg border border-fieldBorder focus:outline-none focus:border-teal text-xs"
                  required
                />
              </div>

              {/* Whistleblower Protection / Anonymous Flag */}
              <div className="p-3 bg-surface rounded-lg border border-fieldBorder flex items-start space-x-2.5">
                <input
                  type="checkbox"
                  id="anonymousCheck"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="mt-0.5 rounded text-teal focus:ring-teal"
                />
                <label htmlFor="anonymousCheck" className="text-[11px] text-slate-700">
                  <span className="font-semibold block text-navy">Submit as Anonymous Report</span>
                  Your name and identity will not be associated with this record in any audit log or database file.
                </label>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-fieldBorder">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-fieldBorder hover:bg-slate-100 font-medium text-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-caspaDanger hover:bg-red-700 font-semibold text-white transition"
                >
                  File Sealed Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
