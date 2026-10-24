import React, { useState } from 'react';
import {
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Sparkles,
  AlertTriangle,
  ChevronRight,
  Filter,
  FileText,
  User,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight,
  Download,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const VicePrincipalAcademicsScreen: React.FC = () => {
  const { showToast } = useApp();

  const [selectedTerm, setSelectedTerm] = useState('This Term');
  const [selectedGrade, setSelectedGrade] = useState('All Grades');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedSection, setSelectedSection] = useState('All Sections');
  const [isBriefingModalOpen, setIsBriefingModalOpen] = useState(false);
  const [activeFlagReview, setActiveFlagReview] = useState<string | null>(null);

  const handleGenerateBriefing = () => {
    setIsBriefingModalOpen(true);
  };

  const handleDownloadPDF = () => {
    setIsBriefingModalOpen(false);
    showToast('Downloaded official Vice Principal Academic Briefing (PDF) with institutional seal.');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Header Row (Matching Image 3) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0E2C48] tracking-tight">
            Academic Performance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Scholastic health &amp; cohort benchmarks
          </p>
        </div>

        <select
          value={selectedTerm}
          onChange={(e) => setSelectedTerm(e.target.value)}
          className="text-xs font-bold text-[#0E2C48] bg-sky-50 border border-sky-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal cursor-pointer shadow-2xs self-start sm:self-auto"
        >
          <option>This Term</option>
          <option>Term 1</option>
          <option>Full Academic Year</option>
        </select>
      </div>

      {/* Filter Chips: Grade, Subject, Section, AY 2025/2026 (Matching Image 3) */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-teal cursor-pointer shadow-2xs focus:outline-none"
        >
          <option value="All Grades">Grade: All</option>
          <option value="Grade 11">Grade 11</option>
          <option value="Grade 10">Grade 10</option>
          <option value="Grade 9">Grade 9</option>
        </select>

        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-teal cursor-pointer shadow-2xs focus:outline-none"
        >
          <option value="All Subjects">Subject: All</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics &amp; Sciences</option>
          <option value="English">English Literature</option>
        </select>

        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-teal cursor-pointer shadow-2xs focus:outline-none"
        >
          <option value="All Sections">Section: All</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
        </select>

        <span className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-800 border border-sky-200 text-xs font-extrabold shadow-2xs">
          AY 2025/2026
        </span>
      </div>

      {/* 3 Metric Cards Row (Matching Image 3) */}
      <div className="grid grid-cols-3 gap-3">
        {/* Overall Avg */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Overall Avg</span>
            <span className="w-2 h-2 rounded-full bg-teal" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0E2C48] mt-2">82.4%</div>
        </div>

        {/* Above Target */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Above Target</span>
            <TrendingUp className="w-3.5 h-3.5 text-teal" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0E2C48] mt-2">
            18 <span className="text-xs font-semibold text-slate-400">/ 24</span>
          </div>
        </div>

        {/* Below Target */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Below Target</span>
            <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-600 mt-2">
            6 <span className="text-xs font-semibold text-slate-400">/ 24</span>
          </div>
        </div>
      </div>

      {/* AI INTELLIGENCE Pulse Banner (Matching Image 3) */}
      <div className="bg-gradient-to-r from-purple-50 via-sky-50 to-white p-4 rounded-2xl border border-purple-200 flex items-start space-x-3 shadow-2xs">
        <div className="w-8 h-8 rounded-xl bg-[#5B3FA3] text-white flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4 text-yellow-300" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-[#2B1B54] text-xs">AI INTELLIGENCE</span>
            <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
              Active Pulse
            </span>
          </div>
          <p className="text-xs text-slate-700 mt-1 leading-relaxed">
            Grade 9 Mathematics curriculum remediation is showing{' '}
            <strong className="text-teal font-extrabold">+3.4% recovery</strong> after remedial worksheet deployment.
          </p>
        </div>
      </div>

      {/* Performance Trend Chart Card (Matching Image 3) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-[#0E2C48] text-base">Performance Trend</h3>
            <p className="text-xs text-slate-500 mt-0.5">Aggregated academic trajectory</p>
          </div>
          <TrendingUp className="w-4 h-4 text-teal" />
        </div>

        <div className="flex items-center space-x-4 text-xs font-semibold text-slate-500">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-1 bg-teal rounded" />
            <span>Cohort Trajectory</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-0.5 border-t border-dashed border-rose-400" />
            <span className="text-rose-500">Target (80%)</span>
          </div>
        </div>

        {/* Chart SVG */}
        <div className="bg-gradient-to-b from-sky-50/40 to-white rounded-xl border border-slate-100 p-4 relative overflow-hidden">
          <div className="h-28 w-full relative">
            {/* Target 80% Dotted Red Line */}
            <div className="absolute top-[50%] left-0 right-0 border-b border-dashed border-rose-300 z-0">
              <span className="text-[9px] font-bold text-rose-500 bg-white/80 px-1 -top-2 relative">
                80%
              </span>
            </div>

            <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="academicTrajectoryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#176B87" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#176B87" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <path
                d="M 20 75 Q 160 65 270 48 T 480 15"
                fill="none"
                stroke="#176B87"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 20 75 Q 160 65 270 48 T 480 15 L 480 100 L 20 100 Z"
                fill="url(#academicTrajectoryGradient)"
              />

              <circle cx="20" cy="75" r="4.5" fill="#123B5D" stroke="#fff" strokeWidth="2" />
              <circle cx="270" cy="48" r="4.5" fill="#176B87" stroke="#fff" strokeWidth="2" />
              <circle cx="480" cy="15" r="5" fill="#0E2C48" stroke="#fff" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-100">
            <span className="text-slate-500 font-semibold">T1: 78%</span>
            <span className="text-slate-500 font-semibold">Mid: 80%</span>
            <span className="font-extrabold text-teal">Term 2 Now: 82.4%</span>
          </div>
        </div>
      </div>

      {/* Performance by Grade (Matching Image 3) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-[#0E2C48] text-base">Performance by Grade</h3>
            <p className="text-xs text-slate-500 mt-0.5">Scholastic standing across cohorts</p>
          </div>
          <span className="text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
            5 Grades
          </span>
        </div>

        <div className="space-y-4">
          {/* Grade 11 — AP Track */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-[#0E2C48]">Grade 11 — AP Track</span>
              <span className="font-black text-sky-900 text-sm">84.2%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-[#123B5D] rounded-full" style={{ width: '84.2%' }} />
            </div>
            <span className="text-[11px] text-slate-400 font-medium">88 scholars</span>
          </div>

          {/* Grade 10 — High School */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-[#0E2C48]">Grade 10 — High School</span>
              <span className="font-black text-teal text-sm">81.0%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-[#176B87] rounded-full" style={{ width: '81%' }} />
            </div>
            <span className="text-[11px] text-slate-400 font-medium">110 scholars</span>
          </div>

          {/* Grade 9 — High School (Remediation Active) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-[#0E2C48]">Grade 9 — High School</span>
                <span className="text-[10px] font-extrabold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                  <span>Remediation Active</span>
                </span>
              </div>
              <span className="font-black text-rose-600 text-sm">76.8%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-rose-500 rounded-full" style={{ width: '76.8%' }} />
            </div>
            <span className="text-[11px] text-slate-400 font-medium">90 scholars</span>
          </div>
        </div>
      </div>

      {/* Performance by Subject (Matching Image 3) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-[#0E2C48] text-base">Performance by Subject</h3>
            <p className="text-xs text-slate-500 mt-0.5">Curricular distribution &amp; trends</p>
          </div>
          <Filter className="w-4 h-4 text-slate-400" />
        </div>

        <div className="divide-y divide-slate-100">
          {[
            { id: 'math', title: 'Mathematics', desc: 'All Divisions', score: '79.4%', trend: '+2.1%', icon: BookOpen, isPositive: true },
            { id: 'sci', title: 'Physics & Sciences', desc: 'Grades 9-12', score: '85.2%', trend: '+4.3%', icon: GraduationCap, isPositive: true },
            { id: 'eng', title: 'English Literature', desc: 'All Divisions', score: '88.0%', trend: '+1.5%', icon: FileText, isPositive: true },
            { id: 'soc', title: 'Social Studies & History', desc: 'Grades 8-11', score: '81.6%', trend: '-0.8%', icon: Calendar, isPositive: false },
          ].map((subj) => {
            const Icon = subj.icon;
            return (
              <div key={subj.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-[#0E2C48]">{subj.title}</h4>
                    <p className="text-[11px] text-slate-400">{subj.desc}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-black text-sm text-[#0E2C48]">{subj.score}</div>
                  <span
                    className={`text-[10px] font-bold ${
                      subj.isPositive ? 'text-teal' : 'text-rose-500'
                    }`}
                  >
                    {subj.trend}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Academic At-Risk Flags (Matching Image 3) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-rose-600 font-extrabold text-sm sm:text-base">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Academic At-Risk Flags</span>
          </div>
          <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
            3 Flags
          </span>
        </div>
        <p className="text-xs text-slate-500">
          Prioritized student &amp; cohort interventions requiring VP review.
        </p>

        <div className="space-y-3 pt-1">
          {/* Flag 1 */}
          <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <h4 className="font-extrabold text-xs sm:text-sm text-[#0E2C48]">
                  Grade 9B — Mathematics
                </h4>
              </div>
              <p className="text-xs text-slate-600 mt-1 pl-4">
                Pass rate dropped to 72% in quadratic equations diagnostic assessment.
              </p>
            </div>
            <button
              onClick={() => setActiveFlagReview('Grade 9B Math')}
              className="text-xs font-bold text-teal hover:underline flex items-center space-x-1 pl-4 sm:pl-0 shrink-0"
            >
              <span>Review</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Flag 2 */}
          <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <h4 className="font-extrabold text-xs sm:text-sm text-[#0E2C48]">
                  Grade 10A — Chemistry
                </h4>
              </div>
              <p className="text-xs text-slate-600 mt-1 pl-4">
                3 laboratory evaluations pending grading past submission deadline.
              </p>
            </div>
            <button
              onClick={() => setActiveFlagReview('Grade 10A Chemistry')}
              className="text-xs font-bold text-teal hover:underline flex items-center space-x-1 pl-4 sm:pl-0 shrink-0"
            >
              <span>Review</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Big Action Button: Generate Academic Briefing (PDF) (Matching Image 3) */}
      <button
        onClick={handleGenerateBriefing}
        className="w-full py-3.5 rounded-2xl bg-[#0E2C48] hover:bg-[#123B5D] text-white text-xs sm:text-sm font-extrabold flex items-center justify-center space-x-2 transition shadow-md"
      >
        <User className="w-4 h-4 text-cyan-300" />
        <span>Generate Academic Briefing (PDF)</span>
      </button>

      {/* Modal: Academic Briefing Preview */}
      {isBriefingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-teal" />
                <h3 className="font-extrabold text-base text-[#0E2C48]">
                  Vice Principal Academic Briefing
                </h3>
              </div>
              <button
                onClick={() => setIsBriefingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-[#0E2C48]">Executive Summary • AY 2025/2026 Term 2</div>
              <p className="text-slate-600">
                Prepared by Dr. Sarah Jenkins, Academic Head. Cohort average stands at 82.4% with 18 of 24 subject tracks on target. Active intervention protocol underway for Grade 9B mathematics.
              </p>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-[11px] text-slate-500 font-semibold">
                <span>Security Stamp: CASPA-VP-EXEC-9924</span>
                <span>Verification: Cryptographic Seal</span>
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => setIsBriefingModalOpen(false)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Close Preview
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex-1 py-2 rounded-xl bg-teal hover:bg-teal/90 text-white text-xs font-bold transition shadow-xs flex items-center justify-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Sealed PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Flag Review */}
      {activeFlagReview && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-[#0E2C48]">
                At-Risk Review: {activeFlagReview}
              </h3>
              <button
                onClick={() => setActiveFlagReview(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Departmental remedial action has been logged into the school OS. Assigned peer tutors and additional formative quizzes deployed.
            </p>

            <button
              onClick={() => {
                showToast(`Executive review approved for ${activeFlagReview}`);
                setActiveFlagReview(null);
              }}
              className="w-full py-2.5 rounded-xl bg-[#0E2C48] text-white text-xs font-bold hover:bg-[#123B5D]"
            >
              Sign-off Intervention
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
