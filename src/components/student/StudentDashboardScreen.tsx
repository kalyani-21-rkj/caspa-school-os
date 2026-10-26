import React, { useState } from 'react';
import {
  CalendarCheck,
  Award,
  FileText,
  Clock,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Bus,
  Compass,
  ShieldAlert,
  Star,
  HeartHandshake,
  X,
  Lock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { downloadClassNotesPdf } from '../../utils/downloadHelper';
import { ExecutiveApprovalTrackerCard } from '../common/ExecutiveApprovalTrackerCard';
import { AccessControlledBadge } from '../common/AccessControlledBadge';

interface StudentDashboardScreenProps {
  onNavigate: (tab: string) => void;
}

export const StudentDashboardScreen: React.FC<StudentDashboardScreenProps> = ({ onNavigate }) => {
  const {
    currentUser,
    studentPeriods,
    studentTasks,
    createSafeguardingCase,
    createIncident,
    showToast,
  } = useApp();

  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiNotesOutput, setAiNotesOutput] = useState<string | null>(null);

  // Age-Appropriate Student UX Mode (PDF Section 1 & Section 21)
  const [ageUxMode, setAgeUxMode] = useState<'SENIOR_9_12' | 'PRIMARY_K_5'>('SENIOR_9_12');

  // Confidential Safety / Anti-Ragging / Counselling Modal (PDF Section 11)
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [reportCategory, setReportCategory] = useState('Bullying / Peer Harassment');
  const [reportRisk, setReportRisk] = useState<'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reportDescription, setReportDescription] = useState('');

  // Career & Competitive Exam Selection (PDF Section 13 & 21)
  const [selectedStream, setSelectedStream] = useState('STEM • Physics, Chemistry, Math & CS (JEE / SAT)');

  const livePeriod = studentPeriods.find((p) => p.status === 'LIVE_NOW') || studentPeriods[2];
  const pendingTasks = studentTasks.filter((t) => t.status === 'PENDING');

  const handleAskAiQuick = () => {
    setIsAiLoading(true);
    setTimeout(() => {
      setAiNotesOutput(
        "Unit 4 Thermodynamics Quick Formulas:\n• First Law: ΔU = Q - W\n• Heat Engine Efficiency: η = 1 - (Tc / Th)\n• Carnot Maximum Efficiency: η_max = 1 - (T_cold / T_hot)\n• Entropy Change: ΔS = ∫ dQ_rev / T\n\nStudy tip: Memorize the PV-diagram cycle steps for tomorrow's quiz!"
      );
      setIsAiLoading(false);
      showToast('CASPA AI generated key revision formulas');
    }, 500);
  };

  const handleSubmitSafetyReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportDescription.trim()) return;
    createSafeguardingCase({
      title: `${reportCategory} (${isAnonymous ? 'Anonymous Student Report' : currentUser?.fullName || 'Elena Vance'})`,
      category: 'Bullying' as any,
      severity: reportRisk === 'LOW' ? 'MEDIUM' : reportRisk,
      studentMaskedId: isAnonymous ? 'Anonymous Reporter' : 'Student #9B-14 (Confidential)',
      details: reportDescription.trim(),
    });
    createIncident({
      category: reportCategory as any,
      risk: reportRisk,
      isAnonymous,
      reporterName: isAnonymous ? 'Anonymous Student' : currentUser?.fullName || 'Elena Vance',
      reporterRole: 'STUDENT',
      location: 'Reported via Student Safeguarding Portal',
      description: reportDescription.trim(),
    });
    setReportDescription('');
    setIsSafetyModalOpen(false);
    showToast(
      isAnonymous
        ? 'Anonymous safety report logged securely & escalated to Safeguarding Officer'
        : 'Confidential report logged & synced to Principal Safeguarding Desk'
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Greeting + Age-Appropriate UX Switcher (Section 1 & 21) */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500 mb-1">
            <span className="font-semibold text-[#176B87]">Fall Term</span>
            <span>·</span>
            <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-medium text-[11px]">
              Term 2 • Week 8
            </span>
            <AccessControlledBadge
              moduleName="Student Learning Workspace"
              recordScope="Own Student Record (Grade 9B • Roll #14)"
              sensitivityLevel="INTERNAL"
              maskedFields={['Other Students Marks', 'Staff HR Records', 'Confidential Safety Files']}
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#123B5D] tracking-tight flex items-center space-x-2">
            <span>Hi, {currentUser?.fullName || 'Elena Vance'}</span>
            <span>👋</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            {currentUser?.designation || 'Grade 9B • Roll No. 14'} • Here&apos;s your student day at a glance.
          </p>
        </div>

        {/* Right Controls: Age-Appropriate UX Toggle + Confidential Safety Button */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-white p-1 rounded-xl border border-slate-200 flex items-center text-[11px] font-bold shadow-2xs">
            <button
              type="button"
              onClick={() => {
                setAgeUxMode('SENIOR_9_12');
                showToast('Switched to Grades 9–12 Senior UX (Career, Competitive Exams & Projects)');
              }}
              className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${
                ageUxMode === 'SENIOR_9_12'
                  ? 'bg-[#123B5D] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Grades 9–12 Senior UX
            </button>
            <button
              type="button"
              onClick={() => {
                setAgeUxMode('PRIMARY_K_5');
                showToast('Switched to Pre-Primary / Primary Simplified UX (Section 21)');
              }}
              className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${
                ageUxMode === 'PRIMARY_K_5'
                  ? 'bg-[#176B87] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Pre-Primary / Primary UX
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsSafetyModalOpen(true)}
            className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-[#DC2626] border border-rose-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Report Safety / Counselling</span>
          </button>
        </div>
      </div>

      {/* ================= PRE-PRIMARY / PRIMARY SIMPLIFIED UX MODE (Section 1 & 21) ================= */}
      {ageUxMode === 'PRIMARY_K_5' && (
        <div className="bg-gradient-to-r from-sky-50 to-teal/10 rounded-3xl border-2 border-sky-200 p-6 space-y-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-black text-xs inline-flex items-center space-x-1">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>Junior Explorer Mode • 12-Day Learning Streak!</span>
              </span>
              <h2 className="text-xl font-black text-[#123B5D]">
                Awesome job today! You have earned 45 Gold Stars ⭐
              </h2>
              <p className="text-xs text-slate-600">
                Simple, distraction-free view designed for Pre-Primary &amp; Primary learners (Section 21).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() => onNavigate('timetable')}
              className="bg-white p-5 rounded-2xl border-2 border-sky-200 hover:border-[#176B87] cursor-pointer text-center space-y-2 shadow-2xs transition"
            >
              <div className="text-3xl">🎨</div>
              <h3 className="font-black text-base text-[#123B5D]">My Fun Classes Today</h3>
              <p className="text-xs text-slate-500">Storytelling, Numbers &amp; Art</p>
            </div>
            <div
              onClick={() => onNavigate('tasks')}
              className="bg-white p-5 rounded-2xl border-2 border-amber-200 hover:border-amber-500 cursor-pointer text-center space-y-2 shadow-2xs transition"
            >
              <div className="text-3xl">📚</div>
              <h3 className="font-black text-base text-[#123B5D]">
                {pendingTasks.length} Homework Activity
              </h3>
              <p className="text-xs text-slate-500">Tap to finish &amp; win a badge!</p>
            </div>
            <div
              onClick={() => onNavigate('caspa')}
              className="bg-white p-5 rounded-2xl border-2 border-purple-200 hover:border-[#5B3FA3] cursor-pointer text-center space-y-2 shadow-2xs transition"
            >
              <div className="text-3xl">🤖</div>
              <h3 className="font-black text-base text-[#5B3FA3]">Ask CASPA Buddy</h3>
              <p className="text-xs text-slate-500">Practice spelling, puzzles &amp; stories</p>
            </div>
          </div>
        </div>
      )}

      {/* Top 3 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Attendance
            </span>
            <p className="text-3xl font-extrabold text-emerald-600 font-mono mt-1">96.2%</p>
            <span className="text-xs text-slate-500">19/22 sessions attended</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              GPA / Rank
            </span>
            <p className="text-3xl font-extrabold text-[#123B5D] font-mono mt-1">3.90</p>
            <span className="text-xs text-slate-500">Rank #2 · Distinction</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-sky-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Homework
            </span>
            <p className="text-3xl font-extrabold text-amber-600 font-mono mt-1">{pendingTasks.length}</p>
            <span className="text-xs text-slate-500">assignments due today</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* NEXT CLASS / LIVE CLASS Card */}
      <div className="bg-white rounded-xl border-l-4 border-l-[#176B87] border-y border-r border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-600">
            <Clock className="w-4 h-4 text-[#176B87]" />
            <span className="font-bold uppercase tracking-wider text-slate-700">NEXT CLASS</span>
          </div>
          <span className="bg-teal/10 text-[#176B87] px-2.5 py-0.5 rounded-full text-xs font-bold animate-pulse">
            ● Live in Session Now
          </span>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-[#123B5D]">
            {livePeriod.subject} — Period {livePeriod.periodNumber}
          </h2>
          <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
            <span>{livePeriod.timeRange}</span>
            <span>•</span>
            <span>{livePeriod.room}</span>
            <span>•</span>
            <span>Instructor: {livePeriod.teacher}</span>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 flex items-center space-x-2">
          <FileText className="w-4 h-4 text-[#176B87] shrink-0" />
          <span>
            Topic:{' '}
            <strong className="text-[#123B5D]">
              {livePeriod.unitTopic || 'Unit 4: Thermodynamics & Carnot Engines'}
            </strong>
          </span>
        </div>

        <div className="flex items-center space-x-2 pt-1">
          <button
            onClick={() => {
              downloadClassNotesPdf({
                subject: livePeriod.subject,
                periodNumber: livePeriod.periodNumber,
                teacher: livePeriod.teacher,
                room: livePeriod.room,
                timeRange: livePeriod.timeRange,
                unitTopic: livePeriod.unitTopic,
                studentName: currentUser?.fullName || 'Elena Vance',
                grade: currentUser?.designation || 'Grade 9B',
              });
              showToast(`Downloaded Digital Notes for ${livePeriod.subject}`);
            }}
            className="flex-1 py-2.5 bg-[#176B87] hover:bg-[#125870] text-white rounded-lg text-xs font-semibold transition flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Digital Notes</span>
          </button>
          <button
            onClick={handleAskAiQuick}
            disabled={isAiLoading}
            className="p-2.5 bg-purple-50 hover:bg-purple-100 text-[#5B3FA3] border border-purple-200 rounded-lg text-xs transition font-bold flex items-center space-x-1 cursor-pointer"
            title="Ask CASPA AI for Formulas"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isAiLoading ? 'Thinking...' : 'AI Revision'}</span>
          </button>
        </div>

        {aiNotesOutput && (
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-xs space-y-1.5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between font-bold text-[#5B3FA3]">
              <span className="flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CASPA AI Smart Formulas</span>
              </span>
              <button
                onClick={() => setAiNotesOutput(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
            </div>
            <pre className="text-[11px] text-slate-800 font-mono whitespace-pre-wrap">{aiNotesOutput}</pre>
          </div>
        )}
      </div>

      {/* 2-Column: Today's Timetable + Homework Due Today */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-[#123B5D] text-sm">Today&apos;s Class Schedule</h3>
              <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                7 Periods
              </span>
            </div>
            <button
              onClick={() => onNavigate('timetable')}
              className="text-xs text-[#176B87] font-semibold hover:underline flex items-center space-x-1"
            >
              <span>Full Week</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {studentPeriods.map((period) => {
              const isLive = period.status === 'LIVE_NOW';
              const isCompleted = period.status === 'COMPLETED';

              return (
                <div
                  key={period.id}
                  className={`p-3.5 border rounded-xl flex items-center justify-between text-xs transition ${
                    isLive
                      ? 'bg-teal/5 border-[#176B87] shadow-xs'
                      : isCompleted
                      ? 'bg-slate-50/70 border-slate-200 text-slate-600'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-center font-mono shrink-0 w-16">
                      <p className="font-bold text-[#123B5D] text-xs">{period.timeRange.split(' - ')[0]}</p>
                      <p className="text-[10px] text-slate-400">{period.timeRange.split(' - ')[1] || ''}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <h4 className="font-bold text-[#123B5D] text-sm">{period.subject}</h4>
                        {isLive && (
                          <span className="text-[9px] bg-[#176B87] text-white font-bold px-1.5 py-0.2 rounded">
                            NOW
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                            Done
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {period.room} • {period.teacher}
                      </p>
                    </div>
                  </div>

                  {isLive ? (
                    <button
                      onClick={() => {
                        downloadClassNotesPdf({
                          subject: period.subject,
                          periodNumber: period.periodNumber,
                          teacher: period.teacher,
                          room: period.room,
                          timeRange: period.timeRange,
                          unitTopic: period.unitTopic,
                          studentName: currentUser?.fullName || 'Elena Vance',
                          grade: currentUser?.designation || 'Grade 9B',
                        });
                        showToast(`Downloaded ${period.subject} Class Notes PDF`);
                      }}
                      className="px-3 py-1 bg-[#176B87] text-white hover:bg-[#125870] rounded-md font-bold text-xs cursor-pointer"
                    >
                      Notes
                    </button>
                  ) : isCompleted ? (
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded text-xs font-medium">
                      Attended
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                      Upcoming
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Homework Due Today + Bus Widget (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-[#123B5D] text-sm">Homework &amp; Tasks</h3>
              </div>
              <button
                onClick={() => onNavigate('tasks')}
                className="text-xs text-[#176B87] font-semibold hover:underline"
              >
                View All &gt;
              </button>
            </div>

            <div className="space-y-3">
              {pendingTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:border-slate-300 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#176B87] uppercase tracking-wider">
                      {t.subject}
                    </span>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      {t.dueDate}
                    </span>
                  </div>
                  <h4 className="font-bold text-[#123B5D] text-xs leading-snug">{t.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{t.description}</p>
                  <button
                    onClick={() => onNavigate('tasks')}
                    className="w-full py-1.5 bg-[#176B87] hover:bg-[#125870] text-white rounded-lg text-xs font-semibold flex items-center justify-center space-x-1 transition shadow-xs cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Upload &amp; Turn In Solution</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bus className="w-4 h-4 text-[#176B87]" />
                <h3 className="font-bold text-[#123B5D] text-sm">School Bus KA-01-EA</h3>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                ETA 14m
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Route 12 • Approaching Metro Hub Station. Elena’s stop next at Silver Oak.
            </p>
            <button
              onClick={() => onNavigate('transport')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition text-center"
            >
              Open Satellite Radar &gt;
            </button>
          </div>
        </div>
      </div>

      {/* ================= GRADES 9–12 CAREER, STREAM & COMPETITIVE EXAM HUB (Section 13 & 21) ================= */}
      {ageUxMode === 'SENIOR_9_12' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center space-x-2 text-xs text-[#5B3FA3] font-bold uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                <span>Section 13 &amp; 21 • Grades 9–12 Senior Enrichment</span>
              </div>
              <h3 className="font-extrabold text-base text-[#123B5D] mt-0.5">
                Career Exploration, Stream Selection, Competitive Exams &amp; Alumni Mentorship
              </h3>
            </div>
            <select
              value={selectedStream}
              onChange={(e) => {
                setSelectedStream(e.target.value);
                showToast(`Updated target career stream to: ${e.target.value}`);
              }}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-[#123B5D]"
            >
              <option>STEM • Physics, Chemistry, Math &amp; CS (JEE / SAT)</option>
              <option>Biomedical &amp; Life Sciences (NEET / Olympiad)</option>
              <option>Economics, Finance &amp; Entrepreneurship (CA / CUET)</option>
              <option>Global Liberal Arts, Design &amp; Law (CLAT / IB)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#5B3FA3]">
                Competitive Exam Prep
              </span>
              <h4 className="font-extrabold text-sm text-[#123B5D]">
                National Science Olympiad &amp; JEE Foundation
              </h4>
              <p className="text-slate-500">
                Diagnostic Percentile: <strong>96.4%ile</strong> • Next Mock Test: Saturday 10:00 AM
              </p>
              <button
                type="button"
                onClick={() => onNavigate('caspa')}
                className="px-3 py-1.5 rounded-lg bg-[#5B3FA3] text-white font-bold text-[11px] cursor-pointer"
              >
                Practice with CASPA AI Tutor &rarr;
              </button>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#176B87]">
                Capstone Project Work
              </span>
              <h4 className="font-extrabold text-sm text-[#123B5D]">
                Solar Micro-Grid Efficiency Simulation
              </h4>
              <p className="text-slate-500">
                Advisor: Dr. Aris Thorne • Status: <strong>Prototype Approved</strong>
              </p>
              <button
                type="button"
                onClick={() => showToast('Logged milestone update in Student Portfolio')}
                className="px-3 py-1.5 rounded-lg bg-[#176B87] text-white font-bold text-[11px] cursor-pointer"
              >
                Update Portfolio Log
              </button>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <span className="text-[10px] font-bold uppercase text-emerald-700">
                Alumni Mentorship &amp; Higher-Ed
              </span>
              <h4 className="font-extrabold text-sm text-[#123B5D]">
                Mentor: Dr. Aditi Rao (Class of 2016 • Stanford)
              </h4>
              <p className="text-slate-500">
                Next Career Q&amp;A Session: Nov 18 • Topic: STEM Research &amp; College Applications
              </p>
              <button
                type="button"
                onClick={() => showToast('Registered for Alumni Career Mentorship session with Dr. Aditi Rao')}
                className="px-3 py-1.5 rounded-lg bg-[#123B5D] text-white font-bold text-[11px] cursor-pointer"
              >
                Book Mentorship Slot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Principal Executive Approvals Tracker */}
      <ExecutiveApprovalTrackerCard roleContext="STUDENT" defaultCategory="Academic Blueprint" />

      {/* ================= CONFIDENTIAL ANTI-RAGGING / SAFETY / COUNSELLING MODAL (Section 11) ================= */}
      {isSafetyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2 text-[#DC2626]">
                <ShieldAlert className="w-5 h-5" />
                <div>
                  <h3 className="font-extrabold text-sm text-[#123B5D]">
                    Confidential Safety, Anti-Ragging &amp; Counselling Desk (Section 11)
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Protected under Child Safeguarding Policy • Direct Escalation to Safeguarding Officer
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSafetyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitSafetyReport} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Incident / Support Category</label>
                  <select
                    value={reportCategory}
                    onChange={(e) => setReportCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option>Bullying / Peer Harassment</option>
                    <option>Anti-Ragging Concern</option>
                    <option>Cyberbullying / Online Safety</option>
                    <option>Transport / Bus Safety Incident</option>
                    <option>Hostel Welfare Concern</option>
                    <option>Confidential School Counsellor Appointment</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Risk Classification</label>
                  <select
                    value={reportRisk}
                    onChange={(e) => setReportRisk(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                  >
                    <option value="CRITICAL">Critical (Immediate Escalation)</option>
                    <option value="HIGH">High Priority</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low / Counselling Referral</option>
                  </select>
                </div>
              </div>

              <label className="flex items-start space-x-2 p-3 rounded-xl bg-amber-50 border border-amber-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="mt-0.5 rounded text-amber-600"
                />
                <div className="text-[11px] text-amber-900">
                  <strong>Submit Anonymously (Mask My Identity)</strong>
                  <p className="text-[10px] text-amber-700 mt-0.5">
                    Note per Section 11: Your identity will be completely hidden, though full anonymity may limit direct personal follow-up by the investigating officer.
                  </p>
                </div>
              </label>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Incident Details / Counselling Request *
                </label>
                <textarea
                  rows={3}
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Describe what happened, location, time, or the support you need..."
                  className="w-full p-3 rounded-xl border border-slate-200"
                  required
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSafetyModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-red-700 text-white font-bold cursor-pointer"
                >
                  Submit Encrypted Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
