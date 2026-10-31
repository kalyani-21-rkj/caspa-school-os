import React, { useState } from 'react';
import {
  FileText,
  Download,
  Plus,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ExternalLink,
  Printer,
  Sparkles,
  X,
  QrCode,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ParentCertificateItem } from '../../types';
import { downloadCertificatePdf } from '../../utils/downloadHelper';

export const ParentCertificatesScreen: React.FC = () => {
  const {
    activeChild,
    parentChildren,
    parentCertificates,
    requestParentCertificate,
    showToast,
  } = useApp();

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<ParentCertificateItem['type']>('BONAFIDE');
  const [purposeText, setPurposeText] = useState('');
  const [selectedChildId, setSelectedChildId] = useState(activeChild.id);

  const [viewingCert, setViewingCert] = useState<ParentCertificateItem | null>(null);

  const certTypes: { type: ParentCertificateItem['type']; title: string; desc: string }[] = [
    {
      type: 'BONAFIDE',
      title: 'Bonafide Student Certificate',
      desc: 'Proof of active enrollment for Passport, Visa, Bank accounts, or transit passes.',
    },
    {
      type: 'STUDY',
      title: 'Study & Medium of Instruction Certificate',
      desc: 'Certifies active scholastic study and English medium instruction.',
    },
    {
      type: 'TRANSFER',
      title: 'Transfer Certificate (TC)',
      desc: 'Formal migration & scholastic clearance documentation for school transfer.',
    },
    {
      type: 'CHARACTER',
      title: 'Character Certificate',
      desc: 'Official verification of student character for external bodies & scholarships.',
    },
    {
      type: 'CONDUCT',
      title: 'Student Conduct & Deportment Certificate',
      desc: 'Certifies exemplary discipline and behavioral standing across academic terms.',
    },
    {
      type: 'PARTICIPATION',
      title: 'Co-Curricular Participation Certificate',
      desc: 'Official record of participation in inter-school Olympiads, MUN, and clubs.',
    },
    {
      type: 'ACHIEVEMENT',
      title: 'Academic & Merit Achievement Certificate',
      desc: 'Honors distinction, rank holder status, and scholastic excellence.',
    },
    {
      type: 'SPORTS',
      title: 'Sports & Athletics Honors Certificate',
      desc: 'Official varsity sports representation and tournament medal record.',
    },
    {
      type: 'EVENT',
      title: 'Campus Event & Symposium Certificate',
      desc: 'Recognizes leadership and representation in institutional events.',
    },
    {
      type: 'TUITION_FEE',
      title: 'Tuition Fee Certificate (80C)',
      desc: 'Comprehensive annual breakdown for Income Tax rebate under Section 80C.',
    },
    {
      type: 'NOC',
      title: 'No Objection Certificate (NOC)',
      desc: 'Institutional NOC for international travel, sports tournaments, or external exams.',
    },
  ];

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestParentCertificate({
      childId: selectedChildId,
      type: selectedType,
      purpose: purposeText || 'Official Verification & Records',
    });
    setIsRequestModalOpen(false);
    setPurposeText('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Document Vault &amp; Certificates
          </h2>
          <p className="text-xs text-slate-500">
            Digitally signed certificates with cryptographic QR verification and institutional seals
          </p>
        </div>

        <button
          onClick={() => setIsRequestModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-teal hover:bg-teal-dark text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Request New Certificate</span>
        </button>
      </div>

      {/* 6 Certificate Quick Request Cards */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Available Certificate Types (Instant Electronic Issuance)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {certTypes.map((item) => (
            <div
              key={item.type}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-teal/40 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-teal/10 text-teal flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-xs text-slate-900">{item.title}</h4>
                </div>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-600 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Instant Ready</span>
                </span>
                <button
                  onClick={() => {
                    setSelectedType(item.type);
                    setIsRequestModalOpen(true);
                  }}
                  className="text-xs font-bold text-teal hover:underline"
                >
                  Generate &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vault Table & Issued Certificates */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">
              Verified Document Vault ({parentCertificates.length})
            </h3>
            <p className="text-xs text-slate-500">
              Cryptographically stamped institutional documents for your wards
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Digital Signatures Valid</span>
          </span>
        </div>

        <div className="p-5 space-y-3">
          {parentCertificates.map((cert) => (
            <div
              key={cert.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300 transition flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-extrabold text-sm text-slate-900">{cert.title}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {cert.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Issued for: <strong className="text-slate-800">{cert.childName}</strong> • Purpose: {cert.purpose}
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 mt-1 flex items-center space-x-2">
                    <span>Verification Code: <strong className="text-teal">{cert.verificationCode}</strong></span>
                    <span>• Issued {cert.issuedDate}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 self-end md:self-center shrink-0">
                <button
                  onClick={() => setViewingCert(cert)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition flex items-center space-x-1.5"
                >
                  <QrCode className="w-3.5 h-3.5 text-slate-500" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => {
                    downloadCertificatePdf({
                      title: cert.title,
                      subtitle: `Issued for ${cert.childName} • Purpose: ${cert.purpose} • Verification Code: ${cert.verificationCode}`,
                      category: cert.type,
                      ranking: `Verified (${cert.verificationCode})`,
                      awardYear: '2026-2027',
                      studentName: cert.childName,
                      grade: `${activeChild.grade}-${activeChild.section}`,
                    });
                    showToast(`Downloaded verified ${cert.title} PDF (${cert.verificationCode})`);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-teal hover:bg-teal-dark text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {viewingCert && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-base text-slate-900">
                  Verified Certificate Preview
                </h3>
              </div>
              <button
                onClick={() => setViewingCert(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Paper Style */}
            <div className="my-4 p-6 rounded-xl border-2 border-slate-200 bg-amber-50/20 text-center space-y-3 relative">
              <div className="w-12 h-12 rounded-full bg-[#0E2C48] text-white mx-auto flex items-center justify-center font-black text-sm">
                CASPA
              </div>
              <h4 className="font-black text-base uppercase tracking-wider text-slate-900">
                {viewingCert.title}
              </h4>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">
                Code: {viewingCert.verificationCode}
              </p>
              <div className="text-xs text-slate-700 leading-relaxed text-left py-2 border-y border-slate-200">
                This is to officially certify that <strong>{viewingCert.childName}</strong> is a bona fide student enrolled at CASPA Central Campus. This document has been issued for the designated purpose: <em>&ldquo;{viewingCert.purpose}&rdquo;</em>.
              </div>
              <div className="flex items-center justify-between pt-2 text-[10px] text-slate-400">
                <span>Date: {viewingCert.issuedDate}</span>
                <span className="font-bold text-slate-700">Registrar &amp; Principal Directorate</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2 border-t">
              <button
                onClick={() => setViewingCert(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  downloadCertificatePdf({
                    title: viewingCert.title,
                    subtitle: `Issued for ${viewingCert.childName} • Purpose: ${viewingCert.purpose} • Verification Code: ${viewingCert.verificationCode}`,
                    category: viewingCert.type,
                    ranking: `Verified (${viewingCert.verificationCode})`,
                    awardYear: '2026-2027',
                    studentName: viewingCert.childName,
                    grade: `${activeChild.grade}-${activeChild.section}`,
                  });
                  showToast(`Downloaded verified ${viewingCert.title} PDF`);
                  setViewingCert(null);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-teal hover:bg-teal-dark text-white shadow-sm flex items-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Save to Device</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Certificate Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-slate-900">
                Generate Student Certificate
              </h3>
              <button
                onClick={() => setIsRequestModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRequestSubmit} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Select Ward</label>
                <select
                  value={selectedChildId}
                  onChange={(e) => setSelectedChildId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-xl border-slate-200 focus:outline-none focus:border-teal"
                >
                  {parentChildren.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.fullName} ({c.grade}-{c.section}, {c.curriculum})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Certificate Category
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border rounded-xl border-slate-200 focus:outline-none focus:border-teal"
                >
                  {certTypes.map((t) => (
                    <option key={t.type} value={t.type}>
                      {t.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Purpose / External Agency
                </label>
                <textarea
                  required
                  rows={2}
                  value={purposeText}
                  onChange={(e) => setPurposeText(e.target.value)}
                  placeholder="e.g. Passport renewal / Visa documentation / Income tax return..."
                  className="w-full px-3 py-2 text-xs border rounded-xl border-slate-200 focus:outline-none focus:border-teal"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsRequestModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal hover:bg-teal-dark text-white shadow-md flex items-center space-x-1.5"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Generate Certificate Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
