import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  CalendarPlus,
  CreditCard,
  MessageCircle,
  Bus,
  CalendarCheck,
  TrendingUp,
  Clock,
  Bell,
  ChevronRight,
  Phone,
  FileText,
  UserPlus,
  X,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ParentHomeScreenProps {
  onNavigate: (tab: string) => void;
}

export const ParentHomeScreen: React.FC<ParentHomeScreenProps> = ({ onNavigate }) => {
  const {
    currentUser,
    activeChild,
    parentChildren,
    switchActiveChild,
    parentFees,
    parentNotices,
    parentTransport,
    acknowledgeParentNotice,
    payAllPendingFees,
    applyParentStudentLeave,
    linkNewChild,
  } = useApp();

  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isLinkChildModalOpen, setIsLinkChildModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [leaveStartDate, setLeaveStartDate] = useState('');
  const [leaveEndDate, setLeaveEndDate] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveType, setLeaveType] = useState<'SICK' | 'CASUAL' | 'FAMILY'>('SICK');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('UPI / QR Code');

  // New child form
  const [newChildName, setNewChildName] = useState('');
  const [newChildGrade, setNewChildGrade] = useState('Grade 9');
  const [newChildSection, setNewChildSection] = useState('A');
  const [newChildRollNo, setNewChildRollNo] = useState(21);
  const [newChildCurriculum, setNewChildCurriculum] = useState<'CBSE' | 'IB' | 'ICSE'>('CBSE');

  const pendingDues = parentFees
    .filter((f) => f.childId === activeChild?.id && f.status === 'PENDING')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const urgentNotice = parentNotices.find((n) => n.isUrgent);

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveStartDate || !leaveEndDate || !leaveReason) return;
    applyParentStudentLeave({
      childId: activeChild.id,
      startDate: leaveStartDate,
      endDate: leaveEndDate,
      reason: leaveReason,
      type: leaveType,
    });
    setIsLeaveModalOpen(false);
    setLeaveReason('');
    setLeaveStartDate('');
    setLeaveEndDate('');
  };

  const handleLinkChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName) return;
    linkNewChild({
      fullName: newChildName,
      grade: newChildGrade,
      section: newChildSection,
      rollNo: Number(newChildRollNo),
      curriculum: newChildCurriculum,
    });
    setIsLinkChildModalOpen(false);
    setNewChildName('');
  };

  const handleExecutePayment = () => {
    payAllPendingFees(activeChild.id, selectedPaymentMethod);
    setIsPayModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Parent Greeting Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight flex items-center space-x-2">
            <span>Hi, {currentUser?.fullName || 'Mrs. Anita Sharma'}</span>
            <span>👋</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            {currentUser?.designation || 'Parent & Guardian Portal'} • Family Care &amp; Ward Dashboard
          </p>
        </div>
      </div>
      {/* 1. Monsoon Weather Advisory Urgent Banner */}
      {urgentNotice && (
        <div
          className={`p-4 rounded-2xl border transition-all duration-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
            urgentNotice.isAcknowledged
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border-amber-300 text-amber-950'
          }`}
        >
          <div className="flex items-start space-x-3">
            <div
              className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                urgentNotice.isAcknowledged
                  ? 'bg-emerald-500 text-white'
                  : 'bg-amber-500 text-white animate-pulse'
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-900">
                  {urgentNotice.category}
                </span>
                <span className="text-xs font-bold text-slate-500">{urgentNotice.dateStr}</span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base mt-0.5 text-slate-900">
                {urgentNotice.title}
              </h3>
              <p className="text-xs text-slate-700 mt-0.5 max-w-2xl">{urgentNotice.summary}</p>
            </div>
          </div>

          <div className="shrink-0 flex items-center space-x-2 w-full sm:w-auto justify-end">
            {urgentNotice.isAcknowledged ? (
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Acknowledged {urgentNotice.acknowledgedTimestamp || 'Today'}</span>
              </div>
            ) : (
              <button
                onClick={() => acknowledgeParentNotice(urgentNotice.id)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-extrabold shadow-md flex items-center justify-center space-x-2 transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Acknowledge Receipt</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. Multi-Child Selector Strip */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
            Active Child:
          </span>
          {parentChildren.map((child) => {
            const isSelected = child.id === activeChild?.id;
            return (
              <button
                key={child.id}
                onClick={() => switchActiveChild(child.id)}
                className={`flex items-center space-x-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition border ${
                  isSelected
                    ? 'bg-[#0E2C48] text-white border-[#0E2C48] shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <img
                  src={child.avatarUrl}
                  alt={child.fullName}
                  className="w-6 h-6 rounded-full object-cover border border-white/30"
                />
                <div className="text-left leading-tight">
                  <div className="font-bold flex items-center space-x-1.5">
                    <span>{child.fullName}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        isSelected ? 'bg-cyan-400/20 text-cyan-200' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {child.curriculum}
                    </span>
                  </div>
                  <div
                    className={`text-[10px] ${
                      isSelected ? 'text-cyan-200' : 'text-slate-500'
                    }`}
                  >
                    {child.grade} • Sec {child.section} • Roll #{child.rollNo}
                  </div>
                </div>
              </button>
            );
          })}

          <button
            onClick={() => setIsLinkChildModalOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-teal hover:bg-teal/10 border border-dashed border-teal/40 transition shrink-0"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Link Ward</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-600 border-t sm:border-t-0 pt-2 sm:pt-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="font-medium">
            Class Teacher: <strong className="text-slate-800">{activeChild?.classTeacher}</strong>
          </span>
        </div>
      </div>

      {/* 3. Four Quick Action Pills */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          onClick={() => (pendingDues > 0 ? setIsPayModalOpen(true) : onNavigate('fees'))}
          className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-amber-300 hover:shadow-md transition text-left group flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-800">Pay Fees</p>
              <p className="text-[11px] text-amber-700 font-semibold">
                {pendingDues > 0 ? `₹${pendingDues.toLocaleString('en-IN')} Due` : 'All Cleared'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition" />
        </button>

        <button
          onClick={() => setIsLeaveModalOpen(true)}
          className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-teal/40 hover:shadow-md transition text-left group flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <CalendarPlus className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-800">Apply Leave</p>
              <p className="text-[11px] text-slate-500">Medical / Casual</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal transition" />
        </button>

        <button
          onClick={() => onNavigate('messages')}
          className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-md transition text-left group flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-800">Message</p>
              <p className="text-[11px] text-slate-500">{activeChild?.classTeacher}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition" />
        </button>

        <button
          onClick={() => onNavigate('transport')}
          className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-cyan-300 hover:shadow-md transition text-left group flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-800">Live Bus</p>
              <p className="text-[11px] text-cyan-700 font-semibold">{parentTransport.routeNumber}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition" />
        </button>
      </div>

      {/* 4. Four Core KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attendance</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Good Standing
            </span>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {activeChild?.attendancePercent || 94.2}%
            </span>
            <span className="text-xs text-slate-500 font-medium">
              ({activeChild?.presentDays || 48}/{activeChild?.totalDays || 51} Days)
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-2 rounded-full"
              style={{ width: `${activeChild?.attendancePercent || 94.2}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Target institutional baseline: 85%</p>
        </div>

        {/* Pending Dues */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Dues</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                pendingDues > 0
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
            >
              {pendingDues > 0 ? `Due ${activeChild?.dueDate || 'Oct 15'}` : 'Cleared'}
            </span>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              ₹{pendingDues.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">Term 2 Tuition &amp; STEM</span>
            {pendingDues > 0 && (
              <button
                onClick={() => setIsPayModalOpen(true)}
                className="text-xs font-extrabold text-teal hover:underline"
              >
                Pay Now &rarr;
              </button>
            )}
          </div>
        </div>

        {/* Upcoming PTM */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Next PTM</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal/10 text-teal border border-teal/30">
              Confirmed
            </span>
          </div>
          <div className="mt-3">
            <p className="text-lg font-black text-slate-900 leading-snug">Oct 15, 2026</p>
            <p className="text-xs font-bold text-teal mt-0.5 flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>10:30 AM - Room 102</span>
            </p>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            Subject: Mathematics with {activeChild?.classTeacher}
          </p>
        </div>

        {/* Circulars */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Circulars</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              3 Unread
            </span>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {parentNotices.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">Published This Term</span>
          </div>
          <button
            onClick={() => onNavigate('notices')}
            className="text-[11px] text-teal font-bold hover:underline mt-2 flex items-center space-x-1"
          >
            <span>Read all advisories</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 5. Middle Grid: Academic Performance & Live Bus Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Academic Performance & Mastery (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                Academic Performance &amp; Mastery
              </h3>
              <p className="text-xs text-slate-500">
                {activeChild?.fullName} • {activeChild?.curriculum} Term 1 Current Scorecard
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-xl bg-teal/10 text-teal text-xs font-black">
              {activeChild?.gpa}
            </span>
          </div>

          <div className="space-y-3">
            {activeChild?.academicPerformance.map((subj, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800">{subj.subject}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-500 font-medium">Grade {subj.grade}</span>
                    <span className="text-slate-900 font-black">{subj.score}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      subj.score >= 90
                        ? 'bg-emerald-500'
                        : subj.score >= 80
                        ? 'bg-teal'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${subj.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Teacher Insight Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 mt-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Teacher Observation &amp; Guidance</span>
            </div>
            <p className="text-xs text-slate-600 italic leading-relaxed">
              &ldquo;{activeChild?.teacherRemarks}&rdquo;
            </p>
            <div className="mt-2 text-[10px] text-slate-400 font-semibold text-right">
              — {activeChild?.classTeacher}, Class Tutor
            </div>
          </div>
        </div>

        {/* Bus Telemetry Card (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center">
                  <Bus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Live Bus Telemetry</h3>
                  <p className="text-xs text-slate-500">{parentTransport.routeNumber} • {parentTransport.busNumber}</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                Live Active
              </span>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-[#092238] text-white">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Current Velocity</span>
                <span className="font-mono text-cyan-300 font-bold">{parentTransport.currentSpeedKmH} km/h</span>
              </div>
              <div className="flex items-center justify-between text-xs mt-1.5">
                <span className="text-slate-400">Next Destination</span>
                <span className="font-bold text-white">{parentTransport.nextStopName}</span>
              </div>
              <div className="flex items-center justify-between text-xs mt-1.5">
                <span className="text-slate-400">Expected Arrival</span>
                <span className="text-amber-300 font-bold">In {parentTransport.etaNextStopMins} mins</span>
              </div>

              {/* Progress Tracker */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                <span>Stop 3 of 5</span>
                <span>RFID Verified Onboard: {parentTransport.rfidBoardedCount}/{parentTransport.totalCapacity}</span>
              </div>
            </div>

            {/* Driver Contact Quick Row */}
            <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">{parentTransport.driverName}</p>
                <p className="text-[10px] text-slate-500">Route Captain • {parentTransport.driverPhone}</p>
              </div>
              <a
                href={`tel:${parentTransport.driverPhone}`}
                className="p-2 rounded-lg bg-teal text-white hover:bg-teal-dark transition"
                title="Call Driver"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <button
            onClick={() => onNavigate('transport')}
            className="w-full mt-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center justify-center space-x-1.5"
          >
            <span>Open Full GPS Telemetry Hub</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 6. This Month's Attendance Strip */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">
              October 2026 Attendance Streak
            </h3>
            <p className="text-xs text-slate-500">
              Institutional daily biometric RFID attendance log for {activeChild?.fullName}
            </p>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-600 font-medium">Present (48)</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-slate-600 font-medium">Excused (2)</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="text-slate-600 font-medium">Weekend</span>
            </span>
          </div>
        </div>

        {/* Heatmap Row */}
        <div className="grid grid-cols-7 sm:grid-cols-14 md:grid-cols-21 gap-2 pt-2">
          {Array.from({ length: 21 }).map((_, i) => {
            const dayNum = i + 1;
            const isWeekend = dayNum % 7 === 0 || dayNum % 7 === 6;
            const isExcused = dayNum === 14;
            const isFuture = dayNum > 15;

            return (
              <div
                key={dayNum}
                className={`p-2 rounded-xl text-center border text-xs font-semibold ${
                  isFuture
                    ? 'bg-slate-50 text-slate-400 border-slate-200'
                    : isExcused
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : isWeekend
                    ? 'bg-slate-100 text-slate-500 border-slate-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
              >
                <div className="text-[10px] text-slate-400">Oct</div>
                <div className="font-bold text-sm">{dayNum}</div>
                <div className="text-[9px] uppercase font-bold mt-0.5">
                  {isFuture ? '—' : isExcused ? 'EXC' : isWeekend ? 'W/E' : 'PRS'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Institutional Helpdesk & Emergency Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0E2C48] to-[#123B5D] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div>
          <h4 className="font-extrabold text-sm text-white">
            Need Immediate Bursar, Transport or Welfare Assistance?
          </h4>
          <p className="text-xs text-slate-300 mt-0.5">
            Dedicated Parent Support Desk available Mon - Sat (08:00 AM - 05:00 PM)
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <a
            href="tel:+918023456789"
            className="px-4 py-2 rounded-xl bg-teal hover:bg-teal-dark text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Helpdesk</span>
          </a>
          <button
            onClick={() => onNavigate('messages')}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition"
          >
            Contact Tutor
          </button>
        </div>
      </div>

      {/* CASPA Parent & Ward AI Assistant Card */}
      <div className="bg-gradient-to-r from-[#5B3FA3] to-[#173059] rounded-2xl p-5 text-white shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-white">CASPA Parent &amp; Ward AI Assistant</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-purple-100">
                Ward Sync: {activeChild?.fullName || 'Aarav'}
              </span>
            </div>
            <p className="text-xs text-purple-100/90 mt-1">
              Hello {currentUser?.fullName || 'Parent'}! Ask CASPA AI for live Bus GPS ETA, today&apos;s biometric attendance check-in, itemized Term 2 fee dues, or Unit Test 2 marks for {activeChild?.fullName || 'your child'}.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('caspa')}
          className="px-4 py-2.5 rounded-xl bg-white text-purple-950 font-bold text-xs hover:bg-purple-50 transition shrink-0 shadow-xs"
        >
          Open Parent AI →
        </button>
      </div>

      {/* ================= MODALS ================= */}

      {/* Apply Leave Modal */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-slate-900">
                Apply Leave for {activeChild?.fullName}
              </h3>
              <button
                onClick={() => setIsLeaveModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyLeave} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Leave Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['SICK', 'CASUAL', 'FAMILY'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setLeaveType(cat)}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        leaveType === cat
                          ? 'bg-teal text-white border-teal shadow-xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">From Date</label>
                  <input
                    type="date"
                    required
                    value={leaveStartDate}
                    onChange={(e) => setLeaveStartDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border rounded-xl border-slate-200 focus:outline-none focus:border-teal"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">To Date</label>
                  <input
                    type="date"
                    required
                    value={leaveEndDate}
                    onChange={(e) => setLeaveEndDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border rounded-xl border-slate-200 focus:outline-none focus:border-teal"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Reason for Absence
                </label>
                <textarea
                  required
                  rows={3}
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  placeholder="Provide context for class tutor and attendance registry..."
                  className="w-full px-3 py-2 text-xs border rounded-xl border-slate-200 focus:outline-none focus:border-teal"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsLeaveModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-teal hover:bg-teal-dark text-white shadow-sm"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Link Child Modal */}
      {isLinkChildModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-slate-900">
                Link Ward / Sibling Profile
              </h3>
              <button
                onClick={() => setIsLinkChildModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLinkChild} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan Sharma"
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-xl border-slate-200 focus:outline-none focus:border-teal"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Grade</label>
                  <select
                    value={newChildGrade}
                    onChange={(e) => setNewChildGrade(e.target.value)}
                    className="w-full px-3 py-2 text-xs border rounded-xl border-slate-200 focus:outline-none focus:border-teal"
                  >
                    <option>Grade 6</option>
                    <option>Grade 7</option>
                    <option>Grade 8</option>
                    <option>Grade 9</option>
                    <option>Grade 10</option>
                    <option>Grade 11</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Section</label>
                  <select
                    value={newChildSection}
                    onChange={(e) => setNewChildSection(e.target.value)}
                    className="w-full px-3 py-2 text-xs border rounded-xl border-slate-200 focus:outline-none focus:border-teal"
                  >
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Curriculum</label>
                  <select
                    value={newChildCurriculum}
                    onChange={(e) => setNewChildCurriculum(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border rounded-xl border-slate-200 focus:outline-none focus:border-teal"
                  >
                    <option value="CBSE">CBSE</option>
                    <option value="IB">IB</option>
                    <option value="ICSE">ICSE</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Roll Number</label>
                  <input
                    type="number"
                    required
                    value={newChildRollNo}
                    onChange={(e) => setNewChildRollNo(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border rounded-xl border-slate-200 focus:outline-none focus:border-teal"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsLinkChildModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0E2C48] hover:bg-[#13385c] text-white shadow-sm"
                >
                  Link Student Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pay Fees Modal */}
      {isPayModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-slate-900">
                Settle Dues for {activeChild?.fullName}
              </h3>
              <button
                onClick={() => setIsPayModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-800 font-bold">Total Outstanding Balance</span>
                  <div className="text-2xl font-black text-amber-950">
                    ₹{pendingDues.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-amber-700">Due by Oct 15, 2026</span>
                </div>
                <CreditCard className="w-8 h-8 text-amber-600" />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Select Payment Gateway
                </label>
                <div className="space-y-2">
                  {['UPI / QR Code', 'Netbanking (HDFC / ICICI / SBI)', 'Credit / Debit Card'].map(
                    (method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setSelectedPaymentMethod(method)}
                        className={`w-full p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition ${
                          selectedPaymentMethod === method
                            ? 'bg-teal/10 border-teal text-teal'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{method}</span>
                        {selectedPaymentMethod === method && (
                          <CheckCircle2 className="w-4 h-4 text-teal" />
                        )}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsPayModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleExecutePayment}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm &amp; Pay ₹{pendingDues.toLocaleString('en-IN')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
