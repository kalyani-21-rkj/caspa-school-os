import React, { useState } from 'react';
import { ShieldCheck, Lock, Info, X, Eye, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AccessControlledBadgeProps {
  moduleName: string;
  recordScope?: string;
  sensitivityLevel?: 'CONFIDENTIAL' | 'RESTRICTED' | 'INTERNAL';
  maskedFields?: string[];
  reasonText?: string;
}

export const AccessControlledBadge: React.FC<AccessControlledBadgeProps> = ({
  moduleName,
  recordScope = 'Campus / Authorized Role Scope',
  sensitivityLevel = 'RESTRICTED',
  maskedFields = ['Aadhaar / National ID', 'Medical Counselling Notes', 'Bank Mandate Account'],
  reasonText,
}) => {
  const { currentUser, currentRole } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const badgeColors = {
    CONFIDENTIAL: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
    RESTRICTED: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100',
    INTERNAL: 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100',
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-bold transition shadow-2xs cursor-pointer ${badgeColors[sensitivityLevel]}`}
        title="Click to inspect RBAC permission lineage & data privacy controls"
      >
        <Lock className="w-3 h-3 shrink-0" />
        <span>Access Controlled</span>
        <span className="opacity-60">•</span>
        <span className="underline decoration-dotted">Why can I see this?</span>
      </button>

      {isOpen && (
        <div className="fixed sm:absolute right-4 sm:right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 z-50 text-left text-xs space-y-3 animate-in fade-in duration-150">
          <div className="flex items-start justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-[#123B5D] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-cyan-300" />
              </div>
              <div>
                <h4 className="font-black text-[#123B5D] text-xs">RBAC Access &amp; Privacy Lineage</h4>
                <p className="text-[10px] text-slate-400">CASPA Zero-Trust Permission Engine</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-slate-400">Active Operator</span>
              <span className="font-bold text-[#123B5D]">
                {currentUser?.fullName || 'Authorized User'} ({currentRole})
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-slate-400">Target Module</span>
              <span className="font-bold text-[#176B87]">{moduleName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-slate-400">Record Scope</span>
              <span className="font-mono text-[11px] font-bold text-slate-700">{recordScope}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-slate-400">Classification</span>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">
                {sensitivityLevel}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-600 leading-relaxed">
            {reasonText ||
              `You can view this ${moduleName} record because your role (${currentRole}) holds explicit 'View' & 'Scope: ${recordScope}' privileges for Academic Year 2026-27.`}
          </p>

          {maskedFields.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center space-x-1">
                <Eye className="w-3 h-3 text-slate-400" />
                <span>Field-Level Privacy Restrictions</span>
              </span>
              <div className="flex flex-wrap gap-1">
                {maskedFields.map((f, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium border border-slate-200"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-emerald-700 font-semibold">
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Access logged in immutable Security Audit Trail</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
