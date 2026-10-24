import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Lock,
  Megaphone,
  Radio,
  UserCheck,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  FileText,
  Clock,
  Eye,
  Plus,
  Shield,
  Activity,
  X,
  PhoneCall,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PrincipalSafeguardingCase } from '../../types';
import { PrincipalIncidentCaseScreen } from './PrincipalIncidentCaseScreen';

export const PrincipalSafetyScreen: React.FC = () => {
  const {
    principalSafeguardingCases,
    updateSafeguardingCaseStep,
    triggerEmergencyProtocol,
    showToast,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<'All' | 'Bullying' | 'Anti-Ragging' | 'Child Protection' | 'Discipline'>('All');
  const [selectedCase, setSelectedCase] = useState<PrincipalSafeguardingCase | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isEmergencyConfirmOpen, setIsEmergencyConfirmOpen] = useState(false);
  const [emergencyType, setEmergencyType] = useState<'LOCKDOWN' | 'BROADCAST' | 'EVACUATE'>('LOCKDOWN');

  // If a case is selected, render the full Incident Case Dossier screen
  if (selectedCase) {
    return (
      <PrincipalIncidentCaseScreen
        caseData={selectedCase}
        onBack={() => setSelectedCase(null)}
      />
    );
  }

  // Form states for new incident report
  const [newCaseTitle, setNewCaseTitle] = useState('');
  const [newCaseCategory, setNewCaseCategory] = useState<'Bullying' | 'Anti-Ragging' | 'Child Protection' | 'Discipline'>('Bullying');
  const [newCaseSeverity, setNewCaseSeverity] = useState<'CRITICAL' | 'HIGH' | 'MEDIUM'>('HIGH');

  const filteredCases = principalSafeguardingCases.filter((c) => {
    if (activeCategory === 'All') return true;
    return c.category === activeCategory;
  });

  const handleTriggerEmergency = (type: 'LOCKDOWN' | 'BROADCAST' | 'EVACUATE') => {
    setEmergencyType(type);
    setIsEmergencyConfirmOpen(true);
  };

  const executeEmergency = () => {
    triggerEmergencyProtocol(emergencyType);
    setIsEmergencyConfirmOpen(false);
    showToast(`EMERGENCY PROTOCOL ACTIVATED: ${emergencyType} sirens & broadcast initiated`);
  };

  const handleAdvanceStep = (caseId: string, currentStep: number) => {
    const nextStep = Math.min(4, currentStep + 1);
    updateSafeguardingCaseStep(caseId, nextStep);
    showToast(`Case advanced to Step ${nextStep}`);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Header Row with + Report Incident Button (Matching image_9e2bd9a2.png) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0E2C48] tracking-tight">
              Safety &amp; Safeguarding
            </h2>
          </div>
        </div>

        <button
          onClick={() => setIsReportModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold transition shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Report Incident</span>
        </button>
      </div>

      {/* ISO 27001 Confidential Notice Banner */}
      <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-200/80 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2 text-rose-800 font-medium">
          <Lock className="w-3.5 h-3.5 shrink-0" />
          <span>Confidential safeguarding data. Access is logged.</span>
        </div>
        <span className="font-mono text-[10px] font-extrabold uppercase bg-rose-200 text-rose-900 px-2 py-0.5 rounded">
          ISO 27001
        </span>
      </div>

      {/* Status Metric Pills */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-rose-50/70 p-3 rounded-xl border border-rose-200/80 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-rose-600"></span>
          <span className="text-[10px] font-bold text-rose-900 uppercase">Critical</span>
          <span className="text-base font-black text-rose-700 ml-auto">1</span>
        </div>

        <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <span className="text-[10px] font-bold text-amber-900 uppercase">Open Cases</span>
          <span className="text-base font-black text-amber-700 ml-auto">3</span>
        </div>

        <div className="bg-sky-50/70 p-3 rounded-xl border border-sky-200/80 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-sky-500"></span>
          <span className="text-[10px] font-bold text-sky-900 uppercase">Investigating</span>
          <span className="text-base font-black text-sky-700 ml-auto">2</span>
        </div>
      </div>

      {/* Emergency Control Center Card (Matching image_9e2bd9a2.png) */}
      <div className="bg-gradient-to-r from-[#0E2C48] to-[#123B5D] text-white rounded-2xl p-5 shadow-md relative overflow-hidden border border-slate-700">
        <div className="flex items-center justify-between text-[11px] mb-2 font-bold tracking-wider">
          <div className="flex items-center space-x-1.5 text-rose-400 uppercase">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span>Priority Operations</span>
          </div>
          <span className="text-slate-300 font-mono text-[10px]">Campus Guard 24/7</span>
        </div>

        <div className="flex items-center space-x-2 mb-1">
          <span className="text-base font-black">🚨 Emergency Control Center</span>
          <ArrowRight className="w-4 h-4 text-cyan-300" />
        </div>
        <p className="text-xs text-slate-300 max-w-lg mb-4">
          Immediate lockdown initiation, perimeter sirens &amp; mass guardian broadcast hub.
        </p>

        {/* 3 Action Buttons: Lockdown, Broadcast, Evacuate */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <button
            onClick={() => handleTriggerEmergency('LOCKDOWN')}
            className="p-3 rounded-xl bg-white/10 hover:bg-rose-600/80 border border-white/10 flex flex-col items-center justify-center space-y-1 transition text-center group"
          >
            <Lock className="w-5 h-5 text-rose-400 group-hover:text-white" />
            <span className="text-xs font-bold">Lockdown</span>
          </button>

          <button
            onClick={() => handleTriggerEmergency('BROADCAST')}
            className="p-3 rounded-xl bg-white/10 hover:bg-teal/80 border border-white/10 flex flex-col items-center justify-center space-y-1 transition text-center group"
          >
            <Megaphone className="w-5 h-5 text-cyan-300 group-hover:text-white" />
            <span className="text-xs font-bold">Broadcast</span>
          </button>

          <button
            onClick={() => handleTriggerEmergency('EVACUATE')}
            className="p-3 rounded-xl bg-white/10 hover:bg-amber-600/80 border border-white/10 flex flex-col items-center justify-center space-y-1 transition text-center group"
          >
            <Activity className="w-5 h-5 text-amber-300 group-hover:text-white" />
            <span className="text-xs font-bold">Evacuate</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills (All Cases, Bullying, Anti-Ragging, Child Protection, Discipline) */}
      <div className="flex space-x-2 overflow-x-auto scrollbar-none">
        {(['All', 'Bullying', 'Anti-Ragging', 'Child Protection', 'Discipline'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat === 'All' ? 'All Cases' : cat}
          </button>
        ))}
      </div>

      {/* Cases List with 4-Step Steppers (Matching image_9e2bd9a2.png) */}
      <div className="space-y-4">
        {filteredCases.map((incident) => (
          <div
            key={incident.id}
            className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-xs space-y-3 relative overflow-hidden ${
              incident.severity === 'CRITICAL'
                ? 'border-l-4 border-l-rose-600 border-slate-200'
                : incident.severity === 'HIGH'
                ? 'border-l-4 border-l-amber-500 border-slate-200'
                : 'border-slate-200'
            }`}
          >
            {/* Case Title Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-black text-sm text-[#0E2C48]">{incident.caseNo}</span>
                <span
                  className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${
                    incident.severity === 'CRITICAL'
                      ? 'bg-rose-600 text-white'
                      : incident.severity === 'HIGH'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {incident.severity}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">{incident.timeAgo}</span>
            </div>

            <div className="text-[11px] text-slate-400 font-mono">{incident.studentMaskedId}</div>

            <h4 className="font-bold text-sm text-slate-800 leading-snug">
              {incident.title}
            </h4>

            {incident.assignedTo && (
              <div className="flex items-center space-x-1.5 text-xs text-slate-600">
                <Shield className="w-3.5 h-3.5 text-teal shrink-0" />
                <span className="truncate">{incident.assignedTo}</span>
              </div>
            )}

            {/* 4-Stage Stepper: Report -> Review -> Investigate -> Resolve */}
            <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-slate-100">
              {[
                { step: 1, label: 'Report' },
                { step: 2, label: 'Review' },
                { step: 3, label: 'Investigate' },
                { step: 4, label: 'Resolve' },
              ].map((s) => {
                const isPassed = incident.currentStep > s.step;
                const isCurrent = incident.currentStep === s.step;
                return (
                  <div
                    key={s.step}
                    className={`py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 text-[10px] font-bold ${
                      isPassed
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : isCurrent
                        ? 'bg-rose-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isPassed ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <span>{s.step}</span>
                    )}
                    <span className="hidden sm:inline">{s.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Footer with Statements & View Case Link */}
            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-[11px] text-slate-500 font-medium">
                📎 {incident.notesCount}
              </span>
              <button
                onClick={() => setSelectedCase(incident)}
                className="font-bold text-teal hover:underline flex items-center space-x-1"
              >
                <span>View Case</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Annual Safeguarding Audit Banner (Matching image_9e2bd9a2.png) */}
      <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-100 shadow-2xs flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#0E2C48] text-cyan-300 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-[#0E2C48] text-xs sm:text-sm">
              Annual Safeguarding Audit
            </h4>
            <p className="text-[11px] text-slate-500">Due in 14 days • 92% documentation ready</p>
          </div>
        </div>
        <button
          onClick={() => showToast('Opening Safeguarding Compliance Audit')}
          className="p-2 text-slate-400 hover:text-navy"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Emergency Protocol Confirmation Modal */}
      {isEmergencyConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-rose-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border-2 border-rose-500 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center space-x-2 text-rose-600">
              <AlertTriangle className="w-6 h-6 animate-bounce" />
              <h3 className="font-black text-lg text-rose-700">Confirm {emergencyType}</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              This action will trigger campus sirens, lock digital access turnstiles, and broadcast SMS/push alerts to all 1,240 parents and first responders.
            </p>
            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => setIsEmergencyConfirmOpen(false)}
                className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-600 text-xs font-semibold hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={executeEmergency}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md"
              >
                Activate Protocol
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Incident Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-navy text-sm">Report Safety Incident</h3>
              <button onClick={() => setIsReportModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast(`New incident "${newCaseTitle}" registered & assigned to Officer Davis`);
                setIsReportModalOpen(false);
                setNewCaseTitle('');
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Incident Headline</label>
                <input
                  type="text"
                  required
                  value={newCaseTitle}
                  onChange={(e) => setNewCaseTitle(e.target.value)}
                  placeholder="e.g. Unidentified visitor near Perimeter Gate 3"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newCaseCategory}
                  onChange={(e) => setNewCaseCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal"
                >
                  <option>Bullying</option>
                  <option>Anti-Ragging</option>
                  <option>Child Protection</option>
                  <option>Discipline</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Severity Level</label>
                <select
                  value={newCaseSeverity}
                  onChange={(e) => setNewCaseSeverity(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal"
                >
                  <option>CRITICAL</option>
                  <option>HIGH</option>
                  <option>MEDIUM</option>
                </select>
              </div>
              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
