import React, { useState } from 'react';
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  ChevronRight,
  Users,
  AlertCircle,
  FileCheck,
  BookOpen,
  Award,
  Sparkles,
  Layers,
  Filter,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PrincipalCohortDetailScreen } from './PrincipalCohortDetailScreen';

export const PrincipalAcademicsScreen: React.FC = () => {
  const { showToast, principalExecutiveApprovals, processExecutiveApprovalAction } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'timetable' | 'exams' | 'curriculum' | 'teachers'>('overview');
  const [selectedCampus, setSelectedCampus] = useState('Main Campus • AY 2026-27');
  const [selectedCohort, setSelectedCohort] = useState<string | null>(null);

  // If a cohort is selected, render the dedicated Cohort Detail Screen
  if (selectedCohort) {
    return (
      <PrincipalCohortDetailScreen
        cohortName={selectedCohort}
        onBack={() => setSelectedCohort(null)}
      />
    );
  }

  const academicApprovals = principalExecutiveApprovals.filter(
    (a) => a.categoryBadge === 'Academic Blueprint' || a.requesterRole.includes('Department') || a.requesterRole.includes('Faculty')
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Campus Dropdown & Breadcrumb Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
          <div className="w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center text-teal">
            <GraduationCap className="w-3.5 h-3.5" />
          </div>
          <span className="uppercase tracking-wider text-[11px] font-bold text-slate-600">Executive Overview</span>
        </div>

        <div className="relative">
          <select
            value={selectedCampus}
            onChange={(e) => setSelectedCampus(e.target.value)}
            className="text-xs font-bold text-[#0E2C48] bg-sky-50 border border-sky-200 rounded-full px-3.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal cursor-pointer shadow-2xs"
          >
            <option>Main Campus • AY 2026-27</option>
            <option>North Wing Science Block • AY 2026-27</option>
            <option>International Baccalaureate Wing • AY 2026-27</option>
          </select>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Avg Attendance</div>
            <div className="text-xl font-extrabold text-[#0E2C48]">91%</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Avg Pass Rate</div>
            <div className="text-xl font-extrabold text-[#0E2C48]">88%</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">AP Honors Cohort</div>
            <div className="text-xl font-extrabold text-[#0E2C48]">88 Scholars</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Remedial Tracking</div>
            <div className="text-xl font-extrabold text-[#0E2C48]">1 Sec (9B)</div>
          </div>
        </div>
      </div>

      {/* Subnavigation Pills (Overview, Timetable, Exams, Curriculum, Teachers) */}
      <div className="flex border-b border-slate-200 overflow-x-auto space-x-6 text-xs font-bold scrollbar-none">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'timetable', label: 'Timetable' },
          { id: 'exams', label: 'Exams' },
          { id: 'curriculum', label: 'Curriculum' },
          { id: 'teachers', label: 'Teachers' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`pb-2.5 transition whitespace-nowrap relative ${
              activeSubTab === tab.id
                ? 'text-teal border-b-2 border-teal'
                : 'text-slate-500 hover:text-[#0E2C48]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW CONTENT */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* Academic Performance Trend Card (Matching image_ba22d5ed.png) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-navy text-base">Academic Performance Trend</h3>
                <p className="text-xs text-slate-500 mt-0.5">Term progress against statutory standard</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center space-x-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+4.2%</span>
              </span>
            </div>

            {/* Visual SVG Trend Graph */}
            <div className="bg-gradient-to-b from-sky-50/50 to-white rounded-xl border border-slate-100 p-4 relative overflow-hidden">
              <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 mb-2">
                <span>State Benchmark: 80%</span>
                <span className="text-teal font-extrabold">Term 2 Proj: 88%</span>
              </div>

              {/* Chart SVG */}
              <div className="h-32 w-full relative">
                {/* 80% Statutory Floor Dotted Line */}
                <div className="absolute top-[40%] left-0 right-0 border-b border-dashed border-rose-400 z-0">
                  <span className="text-[9px] font-bold text-rose-500 bg-white/80 px-1 -top-2.5 relative">
                    80% Statutory Floor
                  </span>
                </div>

                <svg className="w-full h-full" viewBox="0 0 500 120" preserveAspectRatio="none">
                  {/* Gradient Fill under curve */}
                  <defs>
                    <linearGradient id="academicGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0284C7" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#0284C7" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 40 90 Q 250 50 460 25 L 460 120 L 40 120 Z"
                    fill="url(#academicGradient)"
                  />
                  <path
                    d="M 40 90 Q 250 50 460 25"
                    fill="none"
                    stroke="#176B87"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Point 1 */}
                  <circle cx="40" cy="90" r="5" fill="#0E2C48" stroke="#ffffff" strokeWidth="2" />
                  {/* Point 2 */}
                  <circle cx="250" cy="56" r="5" fill="#0E2C48" stroke="#ffffff" strokeWidth="2" />
                  {/* Point 3 */}
                  <circle cx="460" cy="25" r="5" fill="#0E2C48" stroke="#ffffff" strokeWidth="2" />
                </svg>
              </div>

              {/* X Axis milestones */}
              <div className="flex justify-between items-center text-xs pt-3 border-t border-slate-100">
                <div className="text-center">
                  <div className="font-extrabold text-[#0E2C48]">78%</div>
                  <div className="text-[10px] text-slate-400">Term 1</div>
                </div>
                <div className="text-center">
                  <div className="font-extrabold text-[#0E2C48]">84%</div>
                  <div className="text-[10px] text-slate-400">Mid-Term</div>
                </div>
                <div className="text-center">
                  <div className="font-extrabold text-teal">88% (Proj)</div>
                  <div className="text-[10px] text-teal font-semibold">Term 2</div>
                </div>
              </div>
            </div>
          </div>

          {/* Cohort Academic Standing (Matching image_ba22d5ed.png) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-extrabold text-navy text-base">Cohort Academic Standing</h3>
                <p className="text-xs text-slate-500 mt-0.5">Class averages, headcount &amp; health</p>
              </div>
              <button
                onClick={() => showToast('Filters applied for secondary cohorts')}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500"
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Grade 11 AP Track */}
              <div
                onClick={() => setSelectedCohort('Grade 11')}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-teal bg-slate-50/50 hover:bg-white cursor-pointer transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-sm text-[#0E2C48]">Grade 11 AP Track</div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-black text-sm text-teal">89%</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mb-1.5">
                  <div className="h-full bg-[#123B5D] rounded-full" style={{ width: '89%' }}></div>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">88 scholars enrolled</span>
              </div>

              {/* Grade 10 High School */}
              <div
                onClick={() => setSelectedCohort('Grade 10')}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-teal bg-slate-50/50 hover:bg-white cursor-pointer transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-sm text-[#0E2C48]">Grade 10 High School</div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-black text-sm text-teal">86%</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mb-1.5">
                  <div className="h-full bg-[#176B87] rounded-full" style={{ width: '86%' }}></div>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">110 scholars enrolled</span>
              </div>

              {/* Grade 9 High School (Special alert card) */}
              <div
                onClick={() => setSelectedCohort('Grade 9')}
                className="p-3.5 rounded-xl border-2 border-amber-300 bg-amber-50/40 hover:bg-amber-50 cursor-pointer transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-[#0E2C48]">Grade 9 High School</span>
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                      <span>Sec 9B Attention</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-black text-sm text-amber-700">84%</span>
                    <ChevronRight className="w-4 h-4 text-amber-700" />
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mb-1.5">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '84%' }}></div>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">90 scholars</span>
                  <span className="text-amber-800 font-bold flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Remediation protocol active for Algebra II</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Approvals Card (Matching image_ba22d5ed.png) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-navy text-base">Academic Approvals</h3>
                <span className="text-[10px] font-extrabold text-teal bg-teal/10 px-2 py-0.5 rounded-full">
                  6 pending
                </span>
              </div>
              <button
                onClick={() => showToast('Switched to full approvals queue')}
                className="text-xs font-bold text-teal hover:underline flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Card 1: Mrs. Eleanor Oswald */}
              <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-[#0E2C48] text-white font-extrabold text-xs flex items-center justify-center">
                      EO
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#0E2C48]">Mrs. Eleanor Oswald</h4>
                      <p className="text-[11px] text-slate-500">Mathematics Department</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-amber-700" />
                    <span>2h SLA left</span>
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200">
                  Grade 9B Remedial Math Blueprint Revision
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <button
                    onClick={() => {
                      processExecutiveApprovalAction('exec-app-4', 'APPROVED');
                      showToast('Approved Grade 9B Remedial Math Blueprint Revision');
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-[#123B5D] hover:bg-[#176B87] text-white text-xs font-bold flex items-center justify-center space-x-1 transition shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => {
                      processExecutiveApprovalAction('exec-app-4', 'REJECTED');
                      showToast('Revision sent back with comments');
                    }}
                    className="px-4 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-600 text-xs font-semibold transition"
                  >
                    Reject
                  </button>
                </div>
              </div>

              {/* Card 2: Dr. Sunita Verma */}
              <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-[#5B3FA3] text-white font-extrabold text-xs flex items-center justify-center">
                      SV
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#0E2C48]">Dr. Sunita Verma</h4>
                      <p className="text-[11px] text-slate-500">Natural Sciences Head</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-600 bg-slate-200/80 px-2 py-0.5 rounded-full">
                    1d pending
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200">
                  Physics Advanced Optics Syllabus Module (AP Track)
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <button
                    onClick={() => {
                      showToast('Approved Physics Advanced Optics Syllabus Module');
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-[#123B5D] hover:bg-[#176B87] text-white text-xs font-bold flex items-center justify-center space-x-1 transition shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => showToast('Opened preliminary syllabus preview')}
                    className="px-4 py-1.5 rounded-lg border border-teal text-teal hover:bg-teal/5 text-xs font-bold transition"
                  >
                    Review
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic text-center pt-2">
                Vice Principal delegated for preliminary curriculum audit
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TIMETABLE TAB */}
      {activeSubTab === 'timetable' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-navy text-sm">Master Campus Bell Schedule</h3>
            <span className="text-xs text-teal font-bold bg-teal/10 px-2 py-0.5 rounded-full">8 Periods • 100% Covered</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {[
              { period: 'Period 1 (08:30 - 09:15)', subject: 'AP Physics / Math 9B', room: 'Lab 2 / Rm 204', status: 'In Session' },
              { period: 'Period 2 (09:20 - 10:05)', subject: 'English Lit / History 10', room: 'Rm 102 / Rm 105', status: 'Upcoming' },
              { period: 'Period 3 (10:10 - 10:55)', subject: 'Chemistry Lab / Calculus', room: 'Sci Wing / Rm 204', status: 'Upcoming' },
              { period: 'Period 4 (11:00 - 11:45)', subject: 'Robotics & STEM / French', room: 'Innovation Hub', status: 'Upcoming' },
            ].map((p, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex justify-between items-center">
                <div>
                  <div className="font-bold text-[#0E2C48]">{p.period}</div>
                  <div className="text-slate-500 text-[11px]">{p.subject} • {p.room}</div>
                </div>
                <span className="text-[10px] font-bold text-teal bg-white px-2 py-0.5 rounded border border-slate-200">
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EXAMS TAB */}
      {activeSubTab === 'exams' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-navy text-sm">Term 2 Examination Calendar</h3>
            <button onClick={() => showToast('Generated statutory exam duty roster')} className="text-xs text-teal font-bold hover:underline">
              Export Duty Roster
            </button>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl border border-slate-200 bg-sky-50/40 flex justify-between items-center">
              <div>
                <div className="font-bold text-[#0E2C48]">AP Physics &amp; Mathematics Mock Board</div>
                <div className="text-[11px] text-slate-500">October 14, 2026 • 180 Scholars • Invigilation Squad 4</div>
              </div>
              <span className="text-[10px] font-bold text-sky-700 bg-white px-2 py-1 rounded border border-sky-200">
                Seal Verified
              </span>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 bg-purple-50/40 flex justify-between items-center">
              <div>
                <div className="font-bold text-[#0E2C48]">Grade 9 Diagnostic Algebra Retest</div>
                <div className="text-[11px] text-slate-500">October 18, 2026 • Section 9B Focus • Room 204</div>
              </div>
              <span className="text-[10px] font-bold text-purple-700 bg-white px-2 py-1 rounded border border-purple-200">
                Scheduled
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CURRICULUM TAB */}
      {activeSubTab === 'curriculum' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="font-extrabold text-navy text-sm">Curriculum Compliance &amp; Pacing</h3>
          <p className="text-xs text-slate-500">All syllabus units monitored against state educational board milestones.</p>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Senior STEM Curriculum</span>
                <span className="text-teal">94% on track</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100">
                <div className="h-full bg-teal rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Humanities &amp; Social Sciences</span>
                <span className="text-teal">89% on track</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100">
                <div className="h-full bg-teal rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TEACHERS TAB */}
      {activeSubTab === 'teachers' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="font-extrabold text-navy text-sm">Faculty Academic Lead Directory</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center space-x-3">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100" className="w-9 h-9 rounded-full object-cover" />
              <div>
                <div className="font-bold text-[#0E2C48]">Mrs. Eleanor Oswald</div>
                <div className="text-[11px] text-slate-500">Mathematics Lead • 24 Workload Periods</div>
              </div>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center space-x-3">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" className="w-9 h-9 rounded-full object-cover" />
              <div>
                <div className="font-bold text-[#0E2C48]">Mr. Charles Davis</div>
                <div className="text-[11px] text-slate-500">English Literature Lead • 22 Workload Periods</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
