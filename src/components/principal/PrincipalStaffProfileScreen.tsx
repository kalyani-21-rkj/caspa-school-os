import React, { useState } from 'react';
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileCheck,
  GraduationCap,
  Heart,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Plus,
  Send,
  Shield,
  Star,
  UserCheck,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { AdminStaffMember, StaffObservationNote } from '../../types';
import { useApp } from '../../context/AppContext';

interface PrincipalStaffProfileScreenProps {
  staffId: string;
  onBack: () => void;
}

export const PrincipalStaffProfileScreen: React.FC<PrincipalStaffProfileScreenProps> = ({
  staffId,
  onBack,
}) => {
  const {
    staffMembers,
    addStaffObservationNote,
    updateStaffWorkload,
    updateStaffLiveStatus,
    issueStaffCommendation,
    processPrincipalStaffLeave,
    principalStaffLeaves,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'workload' | 'observation' | 'leave' | 'compliance'>('workload');
  const [isObservationModalOpen, setIsObservationModalOpen] = useState(false);
  const [isWorkloadModalOpen, setIsWorkloadModalOpen] = useState(false);
  const [isCommendationModalOpen, setIsCommendationModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  // Appraisal Form State
  const [appraisalRating, setAppraisalRating] = useState(5.0);
  const [appraisalCycle, setAppraisalCycle] = useState('Term 1 Observational Cycle');
  const [appraisalNotes, setAppraisalNotes] = useState('');
  const [appraisalCommendation, setAppraisalCommendation] = useState('');

  // Workload Form State
  const staff = staffMembers.find((s) => s.id === staffId);
  const [editedPeriods, setEditedPeriods] = useState<number>(staff?.workloadPeriods || 24);
  const [newClassInput, setNewClassInput] = useState('');
  const [assignedClasses, setAssignedClasses] = useState<string[]>(staff?.classesAssigned || []);

  // Commendation State
  const [commendationTitle, setCommendationTitle] = useState('Outstanding Pedagogy Lead');
  const [commendationCitation, setCommendationCitation] = useState('');

  // Direct Memo State
  const [memoText, setMemoText] = useState('');

  // Compliance unlock state
  const [isFerpaUnlocked, setIsFerpaUnlocked] = useState(false);
  const [ferpaPin, setFerpaPin] = useState('');

  if (!staff) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
        <p className="text-sm text-slate-500">Staff member not found or has been reassigned.</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-[#0E2C48] text-white rounded-xl text-xs font-bold"
        >
          Return to Staff Directory
        </button>
      </div>
    );
  }

  const staffLeaves = principalStaffLeaves.filter((l) =>
    l.staffName.toLowerCase().includes(staff.fullName.toLowerCase())
  );

  const handleAddObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appraisalNotes.trim()) return;

    addStaffObservationNote(staff.id, {
      author: 'Dr. Mehta (Principal)',
      rating: appraisalRating,
      cycle: appraisalCycle,
      notes: appraisalNotes,
      commendation: appraisalCommendation || undefined,
    });

    setIsObservationModalOpen(false);
    setAppraisalNotes('');
    setAppraisalCommendation('');
  };

  const handleSaveWorkload = (e: React.FormEvent) => {
    e.preventDefault();
    updateStaffWorkload(staff.id, editedPeriods, assignedClasses);
    setIsWorkloadModalOpen(false);
  };

  const handleIssueCommendation = (e: React.FormEvent) => {
    e.preventDefault();
    issueStaffCommendation(staff.id, commendationTitle, commendationCitation || 'Recognized for meritorious dedication to academic excellence.');
    setIsCommendationModalOpen(false);
    setCommendationCitation('');
  };

  const handleSendMemo = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Executive memorandum dispatched to ${staff.fullName} via School OS Secure Channel`);
    setIsMessageModalOpen(false);
    setMemoText('');
  };

  const handleAddClass = () => {
    if (newClassInput.trim() && !assignedClasses.includes(newClassInput.trim())) {
      setAssignedClasses([...assignedClasses, newClassInput.trim()]);
      setNewClassInput('');
    }
  };

  const handleRemoveClass = (cls: string) => {
    setAssignedClasses(assignedClasses.filter((c) => c !== cls));
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
          <button
            onClick={onBack}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold transition shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-teal" />
            <span>Staff Directory</span>
          </button>
          <span>/</span>
          <span className="font-extrabold text-[#0E2C48] truncate max-w-xs">{staff.fullName}</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
            {staff.employeeId}
          </span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              staff.status === 'ACTIVE'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-rose-100 text-rose-800'
            }`}
          >
            {staff.status === 'ACTIVE' ? 'Active Faculty' : 'On Leave'}
          </span>
        </div>
      </div>

      {/* Hero Header Dossier Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center space-x-4">
            <div className="relative shrink-0">
              <img
                src={staff.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200'}
                alt={staff.fullName}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-teal shadow-md"
              />
              <span
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  staff.status === 'ACTIVE' ? 'bg-teal animate-pulse' : 'bg-rose-500'
                }`}
              ></span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#0E2C48] tracking-tight">
                  {staff.fullName}
                </h1>
                {staff.badge && (
                  <span className="text-[10px] font-extrabold text-teal bg-teal/10 px-2 py-0.5 rounded-full border border-teal/20 flex items-center space-x-1">
                    <Award className="w-3 h-3" />
                    <span>{staff.badge}</span>
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-600">
                {staff.designation}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                <div className="flex items-center space-x-1 text-teal font-bold">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{staff.roomLocation || 'Class Room 204'}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{staff.email}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{staff.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons for Principal */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
            <button
              onClick={() => setIsObservationModalOpen(true)}
              className="flex-1 md:flex-initial px-3.5 py-2 rounded-xl bg-[#123B5D] hover:bg-[#176B87] text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition shadow-xs"
            >
              <Star className="w-3.5 h-3.5 text-yellow-300" />
              <span>Log Appraisal</span>
            </button>

            <button
              onClick={() => setIsWorkloadModalOpen(true)}
              className="flex-1 md:flex-initial px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center space-x-1.5 transition"
            >
              <BookOpen className="w-3.5 h-3.5 text-teal" />
              <span>Workload</span>
            </button>

            <button
              onClick={() => setIsCommendationModalOpen(true)}
              className="flex-1 md:flex-initial px-3.5 py-2 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center space-x-1.5 transition"
            >
              <Award className="w-3.5 h-3.5 text-purple-600" />
              <span>Cite</span>
            </button>

            <button
              onClick={() => setIsMessageModalOpen(true)}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition"
              title="Send Direct Memo"
            >
              <MessageSquare className="w-4 h-4 text-teal" />
            </button>
          </div>
        </div>

        {/* Live Status Pill Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-slate-600 font-medium">Status:</span>
            <strong className="text-[#0E2C48]">{staff.liveStatusText || 'Present / In Class Room 204'}</strong>
          </div>
          <div className="flex items-center space-x-3 text-[11px] text-slate-500 font-mono">
            <span>Joined: {staff.joinDate}</span>
            <span>•</span>
            <span>Qualification: {staff.qualification}</span>
          </div>
        </div>
      </div>

      {/* 4 Detail Tabs (Workload, Observation, Leave, Compliance) */}
      <div className="flex border-b border-slate-200 overflow-x-auto space-x-6 text-xs font-bold scrollbar-none">
        {[
          { id: 'workload', label: 'Teaching Workload & Schedule' },
          { id: 'observation', label: `Appraisals & Evaluations (${staff.evaluationScore || 4.8}★)` },
          { id: 'leave', label: 'Attendance & Leave Balances' },
          { id: 'compliance', label: 'HR & FERPA Records 🔒' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-2.5 transition whitespace-nowrap relative ${
              activeTab === tab.id
                ? 'text-teal border-b-2 border-teal'
                : 'text-slate-500 hover:text-[#0E2C48]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: WORKLOAD & SCHEDULE */}
      {activeTab === 'workload' && (
        <div className="space-y-6">
          {/* Workload Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-[10px] uppercase font-bold text-slate-400">Assigned Workload</div>
              <div className="text-xl font-black text-[#0E2C48] mt-1">
                {staff.workloadPeriods} Periods / wk
              </div>
              <div className="text-[10px] text-teal font-semibold mt-0.5">96% Target Capacity</div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-[10px] uppercase font-bold text-slate-400">Assigned Classes</div>
              <div className="text-xl font-black text-[#0E2C48] mt-1">
                {staff.classesAssigned.length} Sections
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Primary &amp; Senior Secondary</div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-[10px] uppercase font-bold text-slate-400">Class Avg Velocity</div>
              <div className="text-xl font-black text-emerald-700 mt-1">87.5%</div>
              <div className="text-[10px] text-emerald-600 font-bold mt-0.5">+3.1% vs midterms</div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-[10px] uppercase font-bold text-slate-400">Student Count</div>
              <div className="text-xl font-black text-[#0E2C48] mt-1">142 Scholars</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Under Instruction</div>
            </div>
          </div>

          {/* Assigned Classes Grid */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-navy text-sm">Assigned Curriculum Classes</h3>
                <p className="text-xs text-slate-500">Official course roster for Academic Year 2026–27</p>
              </div>
              <button
                onClick={() => setIsWorkloadModalOpen(true)}
                className="text-xs text-teal font-bold hover:underline flex items-center space-x-1"
              >
                <span>Edit Roster</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {staff.classesAssigned.map((cls, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0E2C48] text-white flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#0E2C48]">{cls}</h4>
                      <p className="text-[10px] text-slate-500">6 periods/week • Syllabus 94% on track</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-teal bg-white px-2 py-1 rounded border border-slate-200">
                    Lead Faculty
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Bell Schedule */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-navy text-sm">Today's Period Schedule</h3>
              <span className="text-xs text-slate-500">Wednesday, Sep 23, 2026</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {(staff.todaySchedule || [
                { period: 'Period 1 (08:30 - 09:15)', time: '08:30 AM', classSection: 'Grade 9B Algebra II', room: 'Class Room 204', status: 'COMPLETED' },
                { period: 'Period 2 (09:20 - 10:05)', time: '09:20 AM', classSection: 'Grade 10A Honors Geometry', room: 'Class Room 204', status: 'IN_SESSION' },
                { period: 'Period 4 (11:00 - 11:45)', time: '11:00 AM', classSection: 'Grade 11 AP Pre-Calculus', room: 'Room 302', status: 'UPCOMING' },
              ]).map((sch, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <div className="font-bold text-[#0E2C48]">{sch.period}</div>
                      <div className="text-[11px] text-slate-500">{sch.classSection} • {sch.room}</div>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      sch.status === 'IN_SESSION'
                        ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                        : sch.status === 'COMPLETED'
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-sky-50 text-sky-800'
                    }`}
                  >
                    {sch.status === 'IN_SESSION' ? '• In Session' : sch.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OBSERVATIONS & PERFORMANCE */}
      {activeTab === 'observation' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-extrabold text-navy text-base">Executive Appraisal &amp; Classroom Observations</h3>
                <p className="text-xs text-slate-500">Statutory teacher quality framework logs (ISO 27001 verified)</p>
              </div>

              <button
                onClick={() => setIsObservationModalOpen(true)}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#0E2C48] hover:bg-[#123B5D] text-white text-xs font-bold transition shadow-xs self-start"
              >
                <Plus className="w-3.5 h-3.5 text-cyan-300" />
                <span>Log New Observation</span>
              </button>
            </div>

            {/* Scorecard Gauge */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-sky-50 to-indigo-50/50 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0E2C48] text-white flex flex-col items-center justify-center shadow-md shrink-0">
                  <span className="text-xl font-black text-cyan-300 leading-none">
                    {staff.evaluationScore || 4.8}
                  </span>
                  <span className="text-[9px] text-slate-300 uppercase font-bold mt-0.5">/ 5.0</span>
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0E2C48] text-sm">Observational Rating Index</h4>
                  <p className="text-xs text-slate-500">Ranked in top 2% of campus instructional leaders</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                  <div className="text-[10px] text-slate-400">Subject Mastery</div>
                  <strong className="text-navy">4.9 ★</strong>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                  <div className="text-[10px] text-slate-400">Classroom Control</div>
                  <strong className="text-navy">4.8 ★</strong>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                  <div className="text-[10px] text-slate-400">Remedial Support</div>
                  <strong className="text-navy">4.9 ★</strong>
                </div>
              </div>
            </div>

            {/* Observation Notes List */}
            <div className="space-y-3 pt-2">
              {(staff.observationNotes || []).map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <strong className="text-xs text-[#0E2C48]">{note.author}</strong>
                      <span className="text-[10px] text-slate-400">• {note.cycle}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-amber-600 font-black text-xs bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{note.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-medium">{note.notes}</p>

                  {note.commendation && (
                    <div className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 flex items-center space-x-1.5">
                      <Award className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>Commendation: {note.commendation}</span>
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 text-right">{note.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ATTENDANCE & LEAVES */}
      {activeTab === 'leave' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-extrabold text-navy text-sm">Attendance Velocity &amp; Leave Quotas</h3>

            {/* Leave Balances Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-sky-50/60">
                <div className="text-[10px] uppercase font-bold text-sky-800">Casual Leave</div>
                <div className="text-xl font-black text-[#0E2C48] mt-1">
                  {staff.leaveBalances?.casualRemaining || 5}{' '}
                  <span className="text-xs text-slate-400 font-normal">/ 8 days</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-rose-50/60">
                <div className="text-[10px] uppercase font-bold text-rose-800">Medical Leave</div>
                <div className="text-xl font-black text-[#0E2C48] mt-1">
                  {staff.leaveBalances?.medicalRemaining || 7}{' '}
                  <span className="text-xs text-slate-400 font-normal">/ 10 days</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-amber-50/60">
                <div className="text-[10px] uppercase font-bold text-amber-800">Duty / Academic</div>
                <div className="text-xl font-black text-[#0E2C48] mt-1">
                  {staff.leaveBalances?.dutyRemaining || 3}{' '}
                  <span className="text-xs text-slate-400 font-normal">days left</span>
                </div>
              </div>
            </div>

            {/* Staff's Leave History & Active Applications */}
            <div className="pt-2 space-y-3">
              <h4 className="font-bold text-xs text-slate-700">Leave Requests &amp; Records</h4>

              {staffLeaves.map((lv) => (
                <div
                  key={lv.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-[#0E2C48]">{lv.leaveType} Leave</span>
                      <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 font-mono font-bold">
                        {lv.durationDates}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-0.5">{lv.note}</p>
                  </div>

                  {lv.status === 'PENDING' ? (
                    <div className="flex space-x-2 shrink-0">
                      <button
                        onClick={() => processPrincipalStaffLeave(lv.id, 'APPROVED')}
                        className="px-3 py-1.5 rounded-lg bg-teal text-white font-bold hover:bg-teal-hover transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => processPrincipalStaffLeave(lv.id, 'REJECTED')}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 font-semibold hover:bg-slate-100 transition"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        lv.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {lv.status}
                    </span>
                  )}
                </div>
              ))}

              {staffLeaves.length === 0 && (
                <div className="text-center py-4 text-xs text-slate-400 bg-slate-50 rounded-xl">
                  No active leave requests filed by this faculty member this term.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COMPLIANCE & FERPA */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-teal" />
                <h3 className="font-extrabold text-navy text-sm">
                  Confidential HR &amp; Compliance Ledger
                </h3>
              </div>
              <span className="text-[10px] font-extrabold text-sky-800 bg-sky-100 px-2 py-0.5 rounded-full">
                Role Level 4
              </span>
            </div>

            {!isFerpaUnlocked ? (
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-3">
                <Shield className="w-8 h-8 text-teal mx-auto" />
                <h4 className="font-bold text-sm text-[#0E2C48]">Clearance Authorization Required</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Faculty salary compensation, statutory tax deductions, and background audit records are protected under FERPA &amp; Bursar confidentiality directives.
                </p>
                <div className="max-w-xs mx-auto flex space-x-2 pt-2">
                  <input
                    type="password"
                    placeholder="Enter PIN (2026)"
                    value={ferpaPin}
                    onChange={(e) => setFerpaPin(e.target.value)}
                    className="w-full text-center tracking-widest text-sm p-2 rounded-xl border border-slate-300 focus:outline-none focus:border-teal font-mono font-bold"
                  />
                  <button
                    onClick={() => {
                      if (ferpaPin === '2026' || ferpaPin.length >= 4) {
                        setIsFerpaUnlocked(true);
                        showToast('Authorized for 15 minutes');
                      } else {
                        showToast('Invalid clearance PIN');
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-[#0E2C48] text-white text-xs font-bold shrink-0"
                  >
                    Unlock
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Salary Band &amp; Scale</span>
                    <div className="font-bold text-[#0E2C48] mt-1">{staff.ferpaCompliance?.salaryGrade || 'Grade IV Senior Master Faculty'}</div>
                    <div className="text-teal font-extrabold mt-1">{staff.ferpaCompliance?.monthlyDisbursement || '₹1,25,000 / month'}</div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Statutory Background Clearance</span>
                    <div className="font-bold text-emerald-700 mt-1 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{staff.ferpaCompliance?.backgroundCheckStatus || 'Verified (Clearance #SB-9921)'}</span>
                    </div>
                    <div className="text-slate-500 text-[11px] mt-1">Audit: {staff.ferpaCompliance?.lastAuditTimestamp || 'Aug 15, 2026'}</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Emergency Contact</span>
                  <div className="font-bold text-[#0E2C48] mt-1">{staff.ferpaCompliance?.emergencyContact || 'Family Contact on File'}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Observation Appraisal Modal */}
      {isObservationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-navy text-sm">Log Executive Classroom Appraisal</h3>
              <button onClick={() => setIsObservationModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleAddObservation} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Appraisal Cycle</label>
                <input
                  type="text"
                  value={appraisalCycle}
                  onChange={(e) => setAppraisalCycle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Observational Rating (1.0 to 5.0)
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="3.0"
                    max="5.0"
                    step="0.1"
                    value={appraisalRating}
                    onChange={(e) => setAppraisalRating(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="font-black text-sm text-[#0E2C48] w-12 text-center bg-amber-50 py-1 rounded border border-amber-200">
                    {appraisalRating} ★
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Principal Observation Notes</label>
                <textarea
                  required
                  rows={3}
                  value={appraisalNotes}
                  onChange={(e) => setAppraisalNotes(e.target.value)}
                  placeholder="Detail pedagogy, pacing, student engagement, and remedial support..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Commendation Tag (Optional)</label>
                <input
                  type="text"
                  value={appraisalCommendation}
                  onChange={(e) => setAppraisalCommendation(e.target.value)}
                  placeholder="e.g. Master Diagnostic Scaffolding"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal"
                />
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsObservationModalOpen(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#0E2C48] text-white font-bold hover:bg-[#123B5D]"
                >
                  Save to Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Workload Adjustment Modal */}
      {isWorkloadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-navy text-sm">Adjust Workload &amp; Sections</h3>
              <button onClick={() => setIsWorkloadModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveWorkload} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Weekly Teaching Periods ({editedPeriods} periods)
                </label>
                <input
                  type="number"
                  min="1"
                  max="35"
                  value={editedPeriods}
                  onChange={(e) => setEditedPeriods(parseInt(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Classes / Roster</label>
                <div className="space-y-1.5 mb-2 max-h-36 overflow-y-auto">
                  {assignedClasses.map((cls) => (
                    <div
                      key={cls}
                      className="flex items-center justify-between bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200"
                    >
                      <span className="font-bold text-slate-800">{cls}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveClass(cls)}
                        className="text-rose-500 hover:text-rose-700 font-bold"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newClassInput}
                    onChange={(e) => setNewClassInput(e.target.value)}
                    placeholder="e.g. Grade 11 AP Calculus"
                    className="flex-1 p-2 rounded-xl border border-slate-200 focus:outline-none focus:border-teal"
                  />
                  <button
                    type="button"
                    onClick={handleAddClass}
                    className="px-3 py-2 bg-teal text-white rounded-xl font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWorkloadModalOpen(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#0E2C48] text-white font-bold hover:bg-[#123B5D]"
                >
                  Save Workload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Commendation Modal */}
      {isCommendationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-navy text-sm">Issue Executive Citation</h3>
              <button onClick={() => setIsCommendationModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleIssueCommendation} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Citation Title</label>
                <input
                  type="text"
                  required
                  value={commendationTitle}
                  onChange={(e) => setCommendationTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Commendation Text</label>
                <textarea
                  rows={3}
                  value={commendationCitation}
                  onChange={(e) => setCommendationCitation(e.target.value)}
                  placeholder="In recognition of outstanding academic stewardship..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal"
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCommendationModalOpen(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-purple-700 text-white font-bold hover:bg-purple-800"
                >
                  Confer Citation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Direct Memo Modal */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-navy text-sm">Direct Executive Memo to {staff.fullName}</h3>
              <button onClick={() => setIsMessageModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSendMemo} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Memorandum Content</label>
                <textarea
                  rows={4}
                  required
                  value={memoText}
                  onChange={(e) => setMemoText(e.target.value)}
                  placeholder="Enter confidential directive or academic communication..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal"
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsMessageModalOpen(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#0E2C48] text-white font-bold hover:bg-[#123B5D] flex items-center justify-center space-x-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Memo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
