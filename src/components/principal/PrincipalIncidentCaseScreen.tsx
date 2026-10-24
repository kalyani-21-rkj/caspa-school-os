import React, { useState } from 'react';
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Lock,
  MessageSquare,
  Paperclip,
  Send,
  Shield,
  ShieldAlert,
  User,
  UserCheck,
  Video,
  X,
} from 'lucide-react';
import { PrincipalSafeguardingCase } from '../../types';
import { useApp } from '../../context/AppContext';

interface PrincipalIncidentCaseScreenProps {
  caseData: PrincipalSafeguardingCase;
  onBack: () => void;
}

export const PrincipalIncidentCaseScreen: React.FC<PrincipalIncidentCaseScreenProps> = ({
  caseData,
  onBack,
}) => {
  const {
    updateSafeguardingCaseStep,
    updateSafeguardingCaseDetails,
    closeSafeguardingCase,
    showToast,
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(caseData.currentStep);
  const [newDirective, setNewDirective] = useState('');
  const [resolutionSummary, setResolutionSummary] = useState('');
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'evidence' | 'timeline' | 'counselling'>('evidence');

  const handleAdvanceStep = () => {
    const nextStep = Math.min(4, currentStep + 1);
    setCurrentStep(nextStep);
    updateSafeguardingCaseStep(caseData.id, nextStep);
    showToast(`Case advanced to Stage ${nextStep}`);
  };

  const handleAddDirective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDirective.trim()) return;
    updateSafeguardingCaseDetails(caseData.id, newDirective);
    showToast('Executive Directive logged into statutory safeguarding dossier');
    setNewDirective('');
  };

  const handleCloseCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolutionSummary.trim()) return;
    closeSafeguardingCase(caseData.id, resolutionSummary);
    setCurrentStep(4);
    setIsResolveModalOpen(false);
    showToast(`Case ${caseData.caseNo} marked as RESOLVED and sealed`);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
          <button
            onClick={onBack}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold transition shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-teal" />
            <span>Safeguarding Cases</span>
          </button>
          <span>/</span>
          <span className="font-extrabold text-[#0E2C48]">{caseData.caseNo}</span>
        </div>

        <div className="flex items-center space-x-2">
          <span
            className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${
              caseData.severity === 'CRITICAL'
                ? 'bg-rose-600 text-white'
                : caseData.severity === 'HIGH'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            {caseData.severity} Severity
          </span>
          <span className="text-[10px] font-mono font-bold bg-rose-50 text-rose-800 border border-rose-200 px-2 py-1 rounded-full">
            ISO 27001 Logged
          </span>
        </div>
      </div>

      {/* Case Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
              <span>{caseData.caseNo}</span>
              <span>•</span>
              <span>{caseData.studentMaskedId}</span>
              <span>•</span>
              <span>{caseData.timeAgo}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0E2C48] tracking-tight mt-1">
              {caseData.title}
            </h1>
            <p className="text-xs text-slate-500 mt-1 flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-teal shrink-0" />
              <span>{caseData.assignedTo}</span>
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {currentStep < 4 ? (
              <>
                <button
                  onClick={handleAdvanceStep}
                  className="px-4 py-2 rounded-xl bg-[#123B5D] hover:bg-[#176B87] text-white text-xs font-bold transition shadow-xs"
                >
                  Advance Stage (Step {currentStep} → {Math.min(4, currentStep + 1)})
                </button>
                <button
                  onClick={() => setIsResolveModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-teal hover:bg-teal-hover text-white text-xs font-bold transition shadow-xs"
                >
                  Resolve &amp; Close Case
                </button>
              </>
            ) : (
              <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-extrabold flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Case Formally Resolved &amp; Sealed</span>
              </span>
            )}
          </div>
        </div>

        {/* 4-Stage Stepper */}
        <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-100">
          {[
            { step: 1, label: 'Report', desc: 'Initial incident intake' },
            { step: 2, label: 'Review', desc: 'Disciplinary review' },
            { step: 3, label: 'Investigate', desc: 'Evidence & statements' },
            { step: 4, label: 'Resolve', desc: 'Action & parent signoff' },
          ].map((s) => {
            const isDone = currentStep > s.step || (currentStep === 4 && s.step === 4);
            const isCurrent = currentStep === s.step && currentStep < 4;
            return (
              <div
                key={s.step}
                className={`p-3 rounded-xl flex flex-col justify-between space-y-1 transition ${
                  isDone
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                    : isCurrent
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-black">
                  <span>Stage {s.step}</span>
                  {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <span>{s.step}</span>}
                </div>
                <div className="font-extrabold text-xs">{s.label}</div>
                <div className={`text-[10px] hidden sm:block ${isCurrent ? 'text-white/80' : 'text-slate-400'}`}>
                  {s.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Details & Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Evidence & Investigation Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-navy text-sm">Evidence &amp; Verification Repository</h3>
              <span className="text-xs font-bold text-teal bg-teal/10 px-2 py-0.5 rounded-full">
                {caseData.notesCount}
              </span>
            </div>

            {/* Evidence Sub-Tabs */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-cyan-300">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs">CCTV Camera Node #04 - North Basketball Court</h4>
                    <p className="text-[10px] text-slate-400">Timestamp: Sep 23, 11:42 AM (1080p 60fps HD archive)</p>
                  </div>
                </div>
                <button
                  onClick={() => showToast('Playing secured CCTV playback segment in encrypted player')}
                  className="px-3 py-1.5 rounded-lg bg-teal text-white font-bold text-xs hover:bg-teal-hover transition"
                >
                  Play Footage
                </button>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-700">
                  <span>Witness Statements (3 Recorded)</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Verified</span>
                </div>
                <div className="space-y-2 text-slate-600 text-[11px]">
                  <p>1. <strong>Coach Raymond Briggs:</strong> Intervened within 40 seconds; separated the students and administered ice packs with Dr. Vance.</p>
                  <p>2. <strong>Student Witness (Masked #8841):</strong> Confirmed provocation began during half-court possession dispute.</p>
                  <p>3. <strong>Duty Prefect (Grade 12):</strong> Filed automated incident dispatch at 11:44 AM.</p>
                </div>
              </div>
            </div>

            {/* Official Narrative & Notes */}
            <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100 text-xs space-y-2">
              <h4 className="font-bold text-sky-900">Incident Narrative &amp; Counselor Notes</h4>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {caseData.details || 'Initial triage completed. Both parents summoned for joint executive conference. Anti-ragging rehabilitation checklist initiated.'}
              </p>
            </div>
          </div>

          {/* Add Principal Directive Form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs">
            <h3 className="font-extrabold text-navy text-sm">Issue Executive Directive (Dr. Mehta)</h3>
            <p className="text-slate-500 text-[11px]">
              Directives entered here are appended to the immutable case record and dispatched to Counselor Rey and Officer Davis.
            </p>
            <form onSubmit={handleAddDirective} className="space-y-2">
              <textarea
                rows={3}
                required
                value={newDirective}
                onChange={(e) => setNewDirective(e.target.value)}
                placeholder="Enter executive instruction (e.g. Schedule mandatory mediation, place on 2-week extracurricular suspension...)"
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#0E2C48] hover:bg-[#123B5D] text-white font-bold flex items-center space-x-1.5 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Append Directive</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Case Metadata & Statutory Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3.5 text-xs">
            <h3 className="font-extrabold text-navy text-sm">Statutory Safeguarding Info</h3>

            <div className="space-y-2 divide-y divide-slate-100">
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Classification:</span>
                <strong className="text-[#0E2C48]">{caseData.category}</strong>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Campus Jurisdiction:</span>
                <strong className="text-[#0E2C48]">Central Campus (Main)</strong>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Lead Investigator:</span>
                <strong className="text-[#0E2C48]">{caseData.assignedTo}</strong>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Legal Escalation:</span>
                <span className="text-emerald-700 font-bold">Internal Mediation Tier</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 mt-2">
              <span className="font-bold text-slate-700 block">Actions Checklist</span>
              {[
                { label: 'Immediate Medical Triage', done: true },
                { label: 'Parent Guardians Contacted', done: true },
                { label: 'Guidance Counselor Session', done: currentStep >= 3 },
                { label: 'Executive Board Final Signoff', done: currentStep >= 4 },
              ].map((act, i) => (
                <div key={i} className="flex items-center space-x-2 text-[11px]">
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${act.done ? 'text-emerald-600' : 'text-slate-300'}`}
                  />
                  <span className={act.done ? 'text-slate-800 font-medium' : 'text-slate-400'}>
                    {act.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Formal Case Resolution Modal */}
      {isResolveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-navy text-sm">Formal Case Resolution &amp; Closure</h3>
              <button onClick={() => setIsResolveModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleCloseCase} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Executive Resolution Summary &amp; Action Taken
                </label>
                <textarea
                  required
                  rows={4}
                  value={resolutionSummary}
                  onChange={(e) => setResolutionSummary(e.target.value)}
                  placeholder="Detail final disciplinary/remedial decision, parent agreement, and counselling schedule..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal"
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsResolveModalOpen(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-teal text-white font-bold hover:bg-teal-hover"
                >
                  Sign &amp; Close Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
