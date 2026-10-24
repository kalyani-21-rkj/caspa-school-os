import React, { useState } from 'react';
import {
  ArrowLeft,
  GraduationCap,
  Users,
  TrendingUp,
  AlertTriangle,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  UserCheck,
  Send,
  Sliders,
  ChevronRight,
  ShieldCheck,
  FileSpreadsheet,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PrincipalCohortDetailScreenProps {
  cohortName: string;
  onBack: () => void;
}

export const PrincipalCohortDetailScreen: React.FC<PrincipalCohortDetailScreenProps> = ({
  cohortName,
  onBack,
}) => {
  const { showToast, recordCohortIntervention, staffMembers } = useApp();

  const isGrade9 = cohortName.includes('9');
  const [selectedSection, setSelectedSection] = useState<'ALL' | 'A' | 'B' | 'C' | 'D'>('B');
  const [remedialFloor, setRemedialFloor] = useState<number>(isGrade9 ? 85 : 88);
  const [assignedFaculty, setAssignedFaculty] = useState<string>('Mrs. Eleanor Oswald');
  const [remedialActionPlan, setRemedialActionPlan] = useState<string>(
    isGrade9
      ? 'Mandatory 45-min Algebra II factorisation lab every Tuesday & Thursday with Peer Mentor pairing.'
      : 'Bi-weekly accelerated AP problem-solving session and practice exam reviews.'
  );
  const [isDispatchingNotice, setIsDispatchingNotice] = useState(false);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'ROSTER' | 'SUBJECTS' | 'INTERVENTION'>('OVERVIEW');

  // Cohort metadata
  const cohortData = {
    name: cohortName,
    curriculumTrack: isGrade9 ? 'CBSE Secondary Standard • AY 2026-27' : 'AP Honors Secondary Track • AY 2026-27',
    leadFaculty: isGrade9 ? 'Mrs. Eleanor Oswald (Math Lead)' : 'Mr. Charles Davis (Science Chair)',
    totalScholars: isGrade9 ? 109 : 88,
    avgAttendance: isGrade9 ? '87.4%' : '93.2%',
    passVelocity: isGrade9 ? '78.2%' : '89.4%',
    remedialCount: isGrade9 ? 14 : 3,
    topHonorsCount: isGrade9 ? 28 : 42,
    statutoryAlert: isGrade9 ? 'Section 9B Math Falloff Alert (71% vs 80% Floor)' : null,
  };

  const sections = [
    {
      id: 'A',
      name: `${cohortName} - Section A`,
      tutor: 'Mr. David Finch',
      room: 'Room 201',
      students: 28,
      attendance: '92.1%',
      avgScore: '86.4%',
      status: 'STABLE',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      id: 'B',
      name: `${cohortName} - Section B`,
      tutor: 'Mrs. Eleanor Oswald',
      room: 'Room 204',
      students: 27,
      attendance: '82.5%',
      avgScore: '71.2%',
      status: 'ATTENTION (Alg II)',
      statusColor: 'text-rose-700 bg-rose-50 border-rose-200',
    },
    {
      id: 'C',
      name: `${cohortName} - Section C`,
      tutor: 'Ms. Sarah Collins',
      room: 'Room 208',
      students: 28,
      attendance: '89.0%',
      avgScore: '84.8%',
      status: 'STABLE',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      id: 'D',
      name: `${cohortName} - Section D`,
      tutor: 'Dr. Brian Hayes',
      room: 'Room 212',
      students: 26,
      attendance: '91.8%',
      avgScore: '88.1%',
      status: 'HONORS TRACK',
      statusColor: 'text-sky-700 bg-sky-50 border-sky-200',
    },
  ];

  const subjectPerformance = [
    { subject: 'Algebra II / Mathematics', avg: 72, target: 85, lead: 'Mrs. Eleanor Oswald', status: 'CRITICAL_FALLOFF' },
    { subject: 'Physical Science & Chemistry', avg: 84, target: 82, lead: 'Mr. Charles Davis', status: 'ON_TRACK' },
    { subject: 'English Literature & Rhetoric', avg: 88, target: 80, lead: 'Ms. Claire Dupont', status: 'ABOVE_TARGET' },
    { subject: 'World History & Civics', avg: 81, target: 80, lead: 'Mr. Frank Morrison', status: 'ON_TRACK' },
    { subject: 'Computer Science & Logic', avg: 91, target: 85, lead: 'Dr. Anita Roy', status: 'DISTINCTION' },
  ];

  const atRiskScholars = [
    {
      id: 'ts-2',
      roll: 3,
      name: 'Marcus Brody',
      section: '9B',
      currentScore: '52%',
      attendance: '79%',
      concern: 'Failed Quadratic Equations Quiz; 2 HW assignments missing',
      guardianPhone: '+1 (555) 849-2041',
      interventionAssigned: 'Peer Tutoring + Lab Remedial',
    },
    {
      id: 'ts-6',
      roll: 19,
      name: 'Liam Hemsworth',
      section: '9B',
      currentScore: '64%',
      attendance: '81%',
      concern: 'Polynomial graphs deficient; needs calculator lab review',
      guardianPhone: '+1 (555) 670-3849',
      interventionAssigned: 'Math Remedial Lab',
    },
    {
      id: 'ts-4',
      roll: 8,
      name: 'Devon Patel',
      section: '9B',
      currentScore: '71%',
      attendance: '85%',
      concern: 'Borderline algebra mastery; absent for Unit 3 Test',
      guardianPhone: '+1 (555) 771-3048',
      interventionAssigned: 'Test Retake Scheduled',
    },
  ];

  const handleCommitIntervention = (e: React.FormEvent) => {
    e.preventDefault();
    recordCohortIntervention(cohortName, {
      targetFloor: remedialFloor,
      remediationAction: remedialActionPlan,
      assignedMentor: assignedFaculty,
      parentNoticeDispatched: isDispatchingNotice,
    });
    showToast(`Remediation Directive officially signed & logged for ${cohortName}`);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-[#0E2C48] bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition group w-fit"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-0.5 transition" />
          <span>Back to Academics Overview</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cohort File</span>
          <span className="text-xs font-black text-[#0E2C48] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            {cohortName} • Executive Dossier
          </span>
        </div>
      </div>

      {/* Cohort Header Hero */}
      <div className="bg-[#0E2C48] text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-[#176B87]/30 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-0.5 rounded-full bg-teal/30 text-teal-200 text-xs font-bold border border-teal/40">
                Secondary Division
              </span>
              <span className="text-xs text-sky-200/80 font-medium">{cohortData.curriculumTrack}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{cohortData.name} Academic Standing</h1>
            <p className="text-xs sm:text-sm text-sky-100/90 max-w-xl">
              Cohort lead: <span className="font-bold text-white">{cohortData.leadFaculty}</span>. Monitored in accordance with Statutory Academic Benchmark Standards.
            </p>
          </div>

          {cohortData.statutoryAlert && (
            <div className="bg-rose-500/20 border border-rose-400/40 rounded-2xl p-4 max-w-xs shrink-0 backdrop-blur-xs">
              <div className="flex items-center space-x-2 text-rose-300 font-bold text-xs uppercase tracking-wide">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Statutory Floor Alert</span>
              </div>
              <p className="text-xs text-rose-100 mt-1 font-medium">{cohortData.statutoryAlert}</p>
              <div className="mt-2.5">
                <button
                  onClick={() => setActiveTab('INTERVENTION')}
                  className="w-full py-1.5 px-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition shadow-xs flex items-center justify-center space-x-1"
                >
                  <span>Open Executive Directive</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 4 KPI Cards in Header */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-sky-900/60">
          <div>
            <div className="text-[10px] uppercase font-bold text-sky-300">Enrolled Scholars</div>
            <div className="text-2xl font-black text-white mt-0.5">{cohortData.totalScholars}</div>
            <div className="text-[10px] text-sky-200/70">4 active sections</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-sky-300">Avg Attendance</div>
            <div className="text-2xl font-black text-white mt-0.5">{cohortData.avgAttendance}</div>
            <div className="text-[10px] text-emerald-300">Target: &gt;90%</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-sky-300">Pass Velocity</div>
            <div className={`text-2xl font-black mt-0.5 ${isGrade9 ? 'text-amber-300' : 'text-emerald-300'}`}>
              {cohortData.passVelocity}
            </div>
            <div className="text-[10px] text-sky-200/70">Benchmark Floor: 80%</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-sky-300">Remedial Tracking</div>
            <div className="text-2xl font-black text-rose-300 mt-0.5">{cohortData.remedialCount} Scholars</div>
            <div className="text-[10px] text-sky-200/70">{cohortData.topHonorsCount} in Honors list</div>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex border-b border-slate-200 space-x-6 text-xs font-bold">
        {[
          { id: 'OVERVIEW', label: 'Section Standings & Distribution' },
          { id: 'SUBJECTS', label: 'Curriculum & Subject Mastery' },
          { id: 'ROSTER', label: 'At-Risk Scholars Roster' },
          { id: 'INTERVENTION', label: 'Principal Remediation Directive' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-teal border-b-2 border-teal font-extrabold'
                : 'text-slate-500 hover:text-[#0E2C48]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: SECTION STANDINGS */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((sec) => (
              <div
                key={sec.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-teal transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-extrabold text-[#0E2C48] text-base">{sec.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Class Tutor: <span className="font-semibold text-slate-700">{sec.tutor}</span> • {sec.room}
                    </p>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${sec.statusColor}`}>
                    {sec.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 my-3 text-center">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Scholars</div>
                    <div className="text-base font-extrabold text-[#0E2C48]">{sec.students}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Attendance</div>
                    <div className="text-base font-extrabold text-[#0E2C48]">{sec.attendance}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Avg Grade</div>
                    <div className={`text-base font-extrabold ${parseInt(sec.avgScore) < 80 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {sec.avgScore}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-400">Biometric daily sync confirmed</span>
                  <button
                    onClick={() => {
                      setSelectedSection(sec.id as any);
                      setActiveTab('ROSTER');
                    }}
                    className="text-xs font-bold text-teal hover:text-[#0E2C48] flex items-center space-x-1"
                  >
                    <span>View Section Roster</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SUBJECT MASTERY */}
      {activeTab === 'SUBJECTS' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-[#0E2C48] text-base">Subject Mastery Diagnostics</h3>
              <p className="text-xs text-slate-500 mt-0.5">Standardized assessment outcomes versus cohort statutory floor</p>
            </div>
            <button
              onClick={() => showToast('Exporting cohort subject CSV...')}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 flex items-center space-x-1.5"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-teal" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="space-y-4">
            {subjectPerformance.map((subj) => (
              <div key={subj.subject} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-extrabold text-sm text-[#0E2C48]">{subj.subject}</div>
                    <div className="text-xs text-slate-500">Lead Instructor: {subj.lead}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-base font-black ${subj.avg < 80 ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {subj.avg}%
                    </div>
                    <div className="text-[10px] text-slate-400">Target: {subj.target}%</div>
                  </div>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      subj.avg < 80 ? 'bg-rose-500' : subj.avg > 85 ? 'bg-teal' : 'bg-sky-600'
                    }`}
                    style={{ width: `${subj.avg}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AT RISK SCHOLARS */}
      {activeTab === 'ROSTER' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-[#0E2C48] text-base">Scholars Requiring Remedial Attention</h3>
              <p className="text-xs text-slate-500 mt-0.5">Students below statutory 80% floor in major academic subjects</p>
            </div>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              {atRiskScholars.length} flagged for intervention
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {atRiskScholars.map((scholar) => (
              <div key={scholar.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-7 h-7 rounded-full bg-[#0E2C48] text-white font-black text-xs flex items-center justify-center">
                      #{scholar.roll}
                    </span>
                    <span className="font-bold text-sm text-[#0E2C48]">{scholar.name}</span>
                    <span className="text-xs text-slate-500">({scholar.section})</span>
                  </div>
                  <p className="text-xs text-rose-700 font-medium pl-9">{scholar.concern}</p>
                  <p className="text-[11px] text-slate-400 pl-9">
                    Guardian: {scholar.guardianPhone} • Active Remedy: {scholar.interventionAssigned}
                  </p>
                </div>

                <div className="flex items-center space-x-2 sm:self-center pl-9 sm:pl-0">
                  <button
                    onClick={() => showToast(`Dispatched parent notice for ${scholar.name}`)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center space-x-1"
                  >
                    <Send className="w-3 h-3 text-teal" />
                    <span>Send Notice</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('INTERVENTION');
                      setRemedialActionPlan(`Personalized tutor intervention for ${scholar.name} (${scholar.section}): Focus on Algebra II factorisation review.`);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#0E2C48] hover:bg-[#123B5D] text-white text-xs font-bold shadow-2xs"
                  >
                    Executive Remedy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PRINCIPAL REMEDIATION DIRECTIVE */}
      {activeTab === 'INTERVENTION' && (
        <form onSubmit={handleCommitIntervention} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-teal uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Dr. Mehta • Executive Academic Directive</span>
            </div>
            <h3 className="font-extrabold text-[#0E2C48] text-lg mt-1">
              Statutory Floor Remediation Protocol for {cohortName}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Principal orders issued here are logged to the school permanent audit record and immediately notify departmental chairs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0E2C48] mb-1.5">
                Target Statutory Benchmark Floor (%)
              </label>
              <input
                type="number"
                min="70"
                max="95"
                value={remedialFloor}
                onChange={(e) => setRemedialFloor(parseInt(e.target.value) || 80)}
                className="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Current baseline: 78.2%</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0E2C48] mb-1.5">
                Assigned Faculty Supervisor
              </label>
              <select
                value={assignedFaculty}
                onChange={(e) => setAssignedFaculty(e.target.value)}
                className="w-full text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal"
              >
                <option>Mrs. Eleanor Oswald (Math Lead)</option>
                <option>Mr. Charles Davis (Science Chair)</option>
                <option>Dr. Brian Hayes (Academic Dean)</option>
                <option>Ms. Sarah Collins (Dean of Students)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0E2C48] mb-1.5">
              Executive Remediation Action Plan & Mandate
            </label>
            <textarea
              rows={4}
              value={remedialActionPlan}
              onChange={(e) => setRemedialActionPlan(e.target.value)}
              className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal"
              placeholder="State compulsory schedules, tutor reassignments, lab hours, or curriculum adjustments..."
              required
            />
          </div>

          <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-sky-50 border border-sky-100">
            <input
              type="checkbox"
              id="dispatchNotice"
              checked={isDispatchingNotice}
              onChange={(e) => setIsDispatchingNotice(e.target.checked)}
              className="w-4 h-4 text-teal rounded border-slate-300 focus:ring-teal cursor-pointer"
            />
            <label htmlFor="dispatchNotice" className="text-xs font-bold text-[#0E2C48] cursor-pointer">
              Simultaneously broadcast formal academic progress notification to all parents of Section 9B
            </label>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#0E2C48] hover:bg-[#123B5D] text-white text-xs font-bold flex items-center space-x-2 transition shadow-xs"
            >
              <FileCheck className="w-4 h-4 text-teal" />
              <span>Authorize & Log Principal Directive</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
