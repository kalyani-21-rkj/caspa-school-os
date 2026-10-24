import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  FileCheck,
  Check,
  RotateCcw,
  X,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VicePrincipalLessonPlan } from '../../types';

interface VicePrincipalLessonPlansScreenProps {
  onBack?: () => void;
}

export const VicePrincipalLessonPlansScreen: React.FC<VicePrincipalLessonPlansScreenProps> = ({
  onBack,
}) => {
  const { vpLessonPlans, updateVpLessonPlanStatus, showToast } = useApp();

  const [activeTabFilter, setActiveTabFilter] = useState<'ALL' | 'SUBMITTED' | 'NEEDS_REVISION' | 'APPROVED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedPlanForReview, setSelectedPlanForReview] = useState<VicePrincipalLessonPlan | null>(null);
  const [revisionFeedbackInput, setRevisionFeedbackInput] = useState('');

  const submittedCount = 42;
  const pendingCount = 8;
  const approvedCount = 30;

  const filteredPlans = vpLessonPlans.filter((p) => {
    const matchesTab =
      activeTabFilter === 'ALL' ||
      p.status === activeTabFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept =
      selectedDept === 'All' || p.subject.toLowerCase().includes(selectedDept.toLowerCase());

    return matchesTab && matchesSearch && matchesDept;
  });

  const handleAction = (planId: string, action: 'APPROVED' | 'NEEDS_REVISION' | 'REJECTED', note?: string) => {
    updateVpLessonPlanStatus(planId, action, note);
    setSelectedPlanForReview(null);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Header Row with Back Navigation (Matching Image 6) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#0E2C48] tracking-tight">
                Lesson Plans
              </h1>
              <span className="text-[10px] font-extrabold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                VP Module
              </span>
            </div>
            <p className="text-xs text-slate-400 font-semibold">Academic Operations</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => showToast('Search syllabi archive')}
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 shadow-2xs"
          >
            <Search className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#0E2C48] text-white flex items-center justify-center font-bold text-xs">
            SJ
          </div>
        </div>
      </div>

      {/* Pill Status Filter Counters (Matching Image 6) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
        <button
          onClick={() => setActiveTabFilter('ALL')}
          className={`px-3 py-1.5 rounded-full transition whitespace-nowrap shadow-2xs ${
            activeTabFilter === 'ALL'
              ? 'bg-[#0E2C48] text-white'
              : 'bg-white border border-slate-200 text-slate-600'
          }`}
        >
          All Plans
        </button>

        <button
          onClick={() => setActiveTabFilter('SUBMITTED')}
          className={`px-3 py-1.5 rounded-full transition whitespace-nowrap flex items-center space-x-1.5 shadow-2xs ${
            activeTabFilter === 'SUBMITTED'
              ? 'bg-sky-600 text-white font-black'
              : 'bg-sky-50 text-sky-800 border border-sky-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-sky-500" />
          <span>Submitted: {submittedCount}</span>
        </button>

        <button
          onClick={() => setActiveTabFilter('NEEDS_REVISION')}
          className={`px-3 py-1.5 rounded-full transition whitespace-nowrap flex items-center space-x-1.5 shadow-2xs ${
            activeTabFilter === 'NEEDS_REVISION'
              ? 'bg-amber-600 text-white font-black'
              : 'bg-amber-50 text-amber-800 border border-amber-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Pending: {pendingCount}</span>
        </button>

        <button
          onClick={() => setActiveTabFilter('APPROVED')}
          className={`px-3 py-1.5 rounded-full transition whitespace-nowrap flex items-center space-x-1.5 shadow-2xs ${
            activeTabFilter === 'APPROVED'
              ? 'bg-emerald-600 text-white font-black'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Approved: {approvedCount}</span>
        </button>
      </div>

      {/* Search Bar & Department Filter (Matching Image 6) */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lesson plans, topics, teachers..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal shadow-2xs"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-teal cursor-pointer shadow-2xs focus:outline-none"
          >
            <option value="All">Department: All</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="English">English Literature</option>
          </select>

          <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 border border-slate-200 shadow-2xs">
            Status: Active
          </span>
        </div>
      </div>

      {/* Lesson Plan Cards List (Matching Image 6) */}
      <div className="space-y-4">
        {filteredPlans.map((plan) => {
          const isNeedsRevision = plan.status === 'NEEDS_REVISION';
          const isSubmitted = plan.status === 'SUBMITTED';
          const isApproved = plan.status === 'APPROVED';

          return (
            <div
              key={plan.id}
              className={`p-5 rounded-2xl border bg-white shadow-2xs transition space-y-3 relative overflow-hidden ${
                isNeedsRevision ? 'border-l-4 border-l-rose-500 border-slate-200' : 'border-slate-200'
              }`}
            >
              {/* Header Title & Status Badge */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-black text-base text-[#0E2C48]">{plan.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    {plan.teacherName} • {plan.subject} ({plan.gradeSection}) • {plan.week}
                  </p>
                </div>

                {isNeedsRevision && (
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 shrink-0">
                    Needs Revision
                  </span>
                )}
                {isSubmitted && (
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 shrink-0">
                    Submitted
                  </span>
                )}
                {isApproved && (
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                    Approved
                  </span>
                )}
              </div>

              {/* Learning Objectives & Course Resources (Expanded on Plan 1) */}
              {plan.learningObjectives && plan.learningObjectives.length > 0 && (
                <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-100 space-y-2 text-xs">
                  <div className="font-extrabold text-[#0E2C48] flex items-center space-x-1.5">
                    <span className="text-teal">⚑</span>
                    <span>Learning Objectives</span>
                  </div>
                  <ul className="space-y-1 text-slate-600 pl-4 list-disc text-[11px] leading-relaxed">
                    {plan.learningObjectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>

                  {plan.courseResources && plan.courseResources.length > 0 && (
                    <div className="pt-2 border-t border-sky-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase mb-1.5">
                        Course Resources
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {plan.courseResources.map((res, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-white border border-sky-200 text-sky-900 text-[10px] font-bold shadow-2xs"
                          >
                            {res}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Duration line */}
              <div className="text-xs text-slate-500 flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  {plan.durationText} • {plan.blueprintTag}
                </span>
              </div>

              {/* Warning note if revision required (Matching Image 6) */}
              {plan.warningNote && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{plan.warningNote}</span>
                </div>
              )}

              {/* Verification note if approved */}
              {isApproved && plan.feedbackNote && (
                <div className="flex items-center space-x-1.5 text-xs text-emerald-700 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{plan.feedbackNote}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-1">
                {isNeedsRevision && (
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleAction(plan.id, 'APPROVED', 'Approved by Vice Principal Office')}
                      className="py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition shadow-xs"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPlanForReview(plan);
                        setRevisionFeedbackInput(plan.warningNote || '');
                      }}
                      className="py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-extrabold transition"
                    >
                      Revision
                    </button>
                    <button
                      onClick={() => handleAction(plan.id, 'REJECTED', 'Returned for comprehensive rewrite')}
                      className="py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-extrabold transition"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {isSubmitted && (
                  <button
                    onClick={() => setSelectedPlanForReview(plan)}
                    className="w-full py-2.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-900 text-xs font-extrabold flex items-center justify-center space-x-1.5 transition"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Review Plan</span>
                  </button>
                )}

                {isApproved && (
                  <button
                    onClick={() => showToast(`Opening authenticated syllabus PDF for "${plan.title}"`)}
                    className="w-full py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-100 text-xs font-extrabold flex items-center justify-center space-x-1.5 transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Approved Plan</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Detailed Plan Review / Revision Feedback */}
      {selectedPlanForReview && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-extrabold text-base text-[#0E2C48]">
                  {selectedPlanForReview.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedPlanForReview.teacherName} • {selectedPlanForReview.subject}
                </p>
              </div>
              <button
                onClick={() => setSelectedPlanForReview(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0E2C48] mb-1">
                Vice Principal Revision Mandate / Feedback
              </label>
              <textarea
                rows={3}
                value={revisionFeedbackInput}
                onChange={(e) => setRevisionFeedbackInput(e.target.value)}
                placeholder="Specify required additions (e.g., rubrics, lab manuals, timing adjustments)..."
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
              />
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => handleAction(selectedPlanForReview.id, 'NEEDS_REVISION', revisionFeedbackInput)}
                className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition shadow-xs"
              >
                Send Revision Notice
              </button>
              <button
                onClick={() => handleAction(selectedPlanForReview.id, 'APPROVED', 'Approved by Vice Principal')}
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
              >
                Sign &amp; Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
