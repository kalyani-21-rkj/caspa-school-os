import React, { useState } from 'react';
import {
  Smartphone,
  X,
  Wifi,
  Battery,
  Signal,
  Home,
  BookOpen,
  CheckSquare,
  Sparkles,
  User,
  Users,
  Award,
  MessageSquare,
  Clock,
  ArrowRight,
  ArrowLeft,
  Search,
  Bell,
  Check,
  CheckCheck,
  Plus,
  Lock,
  Eye,
  EyeOff,
  MoreHorizontal,
  FolderOpen,
  DoorClosed,
  Phone,
  SlidersHorizontal,
  FileText,
  Calendar,
  FileCheck,
  Download,
  Bus,
  Radio,
  Send,
  Upload,
  ShieldAlert,
  CreditCard,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CaspaLogo } from './CaspaLogo';
import { RoleType } from '../types';

export const AndroidSimulator: React.FC = () => {
  const {
    isMobileSimulatorOpen,
    setIsMobileSimulatorOpen,
    simulatorRole,
    setSimulatorRole,
    currentRole,
    // Teacher data
    teacherClasses,
    teacherStudents,
    teacherTasks,
    parentMessages,
    setStudentAttendance,
    markAllStudentsPresent,
    updateStudentGrade,
    sendParentMessage,
    // Student data
    studentPeriods,
    studentTasks,
    studyMaterials,
    attendanceHeatmap,
    absenceExcuses,
    submitStudentTask,
    submitAbsenceExcuse,
    // Admin data
    students,
    staffMembers,
    safetyIncidents,
    approvals,
    feeInvoices,
    processApproval,
    buses,
    showToast,
  } = useApp();

  // Mobile navigation state
  const [isMobileLoggedIn, setIsMobileLoggedIn] = useState(true);
  const [mobileRoleSelect, setMobileRoleSelect] = useState<'Student' | 'Teacher' | 'Admin'>(
    currentRole === 'STUDENT' ? 'Student' : currentRole === 'ADMIN' ? 'Admin' : 'Teacher'
  );
  const [activeMobileTab, setActiveMobileTab] = useState<string>('home');
  const [studentSubjectFilter, setStudentSubjectFilter] = useState('ALL');
  const [excuseText, setExcuseText] = useState('');

  // Credentials
  const [mobileEmail, setMobileEmail] = useState(
    currentRole === 'STUDENT' ? 'student@caspaschool.org' : 'teacher@caspaschool.org'
  );
  const [mobilePassword, setMobilePassword] = useState('password123');
  const [showMobilePass, setShowMobilePass] = useState(false);

  // Screen-specific state for teacher
  const [taskTab, setTaskTab] = useState<'HOMEWORK' | 'ASSIGNMENT'>('HOMEWORK');
  const [selectedMobileParent, setSelectedMobileParent] = useState(parentMessages[0]);
  const [chatReply, setChatReply] = useState('');

  if (!isMobileSimulatorOpen) return null;

  const isStudent = mobileRoleSelect === 'Student';
  const isAdmin = mobileRoleSelect === 'Admin';
  const isTeacher = mobileRoleSelect === 'Teacher';
  const livePeriod = studentPeriods.find((p) => p.status === 'LIVE_NOW') || studentPeriods[2];
  const pendingStudentTasks = studentTasks.filter((t) => t.status === 'PENDING');
  const currentBus = buses[0];

  const presentCount = teacherStudents.filter((s) => s.attendanceStatus === 'PRESENT').length;
  const absentCount = teacherStudents.filter((s) => s.attendanceStatus === 'ABSENT').length;
  const lateCount = teacherStudents.filter((s) => s.attendanceStatus === 'LATE').length;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-2 sm:p-4 select-none">
      <div className="flex flex-col items-center">
        {/* Top Control Bar for Simulator */}
        <div className="mb-2 flex items-center justify-between w-[370px] text-white text-xs">
          <div className="flex items-center space-x-1.5">
            <Smartphone className="w-4 h-4 text-cyan-300" />
            <span className="font-bold">Android Emulator</span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick Role Toggle */}
            <div className="flex bg-white/20 p-0.5 rounded-lg text-[10px]">
              <button
                onClick={() => {
                  setMobileRoleSelect('Student');
                  setActiveMobileTab('home');
                }}
                className={`px-2 py-0.5 rounded font-semibold transition ${
                  isStudent ? 'bg-teal text-white shadow-xs' : 'text-slate-200 hover:text-white'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => {
                  setMobileRoleSelect('Teacher');
                  setActiveMobileTab('home');
                }}
                className={`px-2 py-0.5 rounded font-semibold transition ${
                  isTeacher ? 'bg-teal text-white shadow-xs' : 'text-slate-200 hover:text-white'
                }`}
              >
                Teacher
              </button>
              <button
                onClick={() => {
                  setMobileRoleSelect('Admin');
                  setActiveMobileTab('home');
                }}
                className={`px-2 py-0.5 rounded font-semibold transition ${
                  isAdmin ? 'bg-teal text-white shadow-xs' : 'text-slate-200 hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>

            <button
              onClick={() => setIsMobileLoggedIn(!isMobileLoggedIn)}
              className="px-2 py-0.5 rounded bg-white/20 hover:bg-white/30 text-[10px] font-semibold"
            >
              {isMobileLoggedIn ? 'Login' : 'App'}
            </button>
            <button
              onClick={() => setIsMobileSimulatorOpen(false)}
              className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
            >
              <X className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>

        {/* Android Phone Body */}
        <div className="w-[370px] h-[760px] bg-black rounded-[46px] p-2.5 shadow-2xl border-4 border-slate-800 relative flex flex-col overflow-hidden">
          {/* Inner Phone Screen */}
          <div className="w-full h-full bg-[#F8FAFC] rounded-[38px] flex flex-col overflow-hidden relative text-bodyText font-sans">
            {/* Android Status Bar */}
            <div className="h-8 bg-[#0E2C48] text-white px-6 flex items-center justify-between text-[11px] shrink-0 font-medium">
              <span>09:41</span>
              {/* Punch Hole Camera */}
              <div className="w-3.5 h-3.5 rounded-full bg-black mx-auto"></div>
              <div className="flex items-center space-x-1.5 text-slate-200">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3 h-3" />
              </div>
            </div>

            {/* ================= SCREEN 1: MOBILE LOGIN ================= */}
            {!isMobileLoggedIn ? (
              <div className="flex-1 overflow-y-auto p-5 flex flex-col justify-between bg-white text-xs">
                <div className="space-y-4">
                  {/* CASPA Mascot Logo */}
                  <div className="text-center pt-2">
                    <CaspaLogo size="md" showText={false} />
                    <h2 className="text-xl font-extrabold text-navy mt-1 tracking-tight">
                      Welcome Back
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Sign in to continue to your dashboard.
                    </p>
                  </div>

                  {/* SIGN IN AS Tabs */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      SIGN IN AS
                    </span>
                    <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 text-center">
                      {(['Student', 'Teacher', 'Admin'] as const).map((r) => (
                        <button
                          key={r}
                          onClick={() => {
                            setMobileRoleSelect(r);
                            if (r === 'Teacher') setMobileEmail('teacher@caspaschool.org');
                            else if (r === 'Admin') setMobileEmail('admin@caspaschool.org');
                            else setMobileEmail('student@caspaschool.org');
                          }}
                          className={`py-1.5 text-[10px] font-semibold rounded-md transition ${
                            mobileRoleSelect === r
                              ? 'bg-[#176B87] text-white shadow-xs'
                              : 'text-slate-600 hover:text-navy'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Email or Student ID */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">
                      {isStudent ? 'Student ID or Email' : 'Staff ID or Email'}
                    </label>
                    <input
                      type="text"
                      value={mobileEmail}
                      onChange={(e) => setMobileEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-300 focus:bg-white focus:border-teal outline-none"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Password</label>
                    <div className="relative">
                      <input
                        type={showMobilePass ? 'text' : 'password'}
                        value={mobilePassword}
                        onChange={(e) => setMobilePassword(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-300 focus:bg-white focus:border-teal outline-none pr-8"
                      />
                      <button
                        type="button"
                        onClick={() => setShowMobilePass(!showMobilePass)}
                        className="absolute right-3 top-2.5 text-slate-400"
                      >
                        {showMobilePass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Sign In Button */}
                  <button
                    onClick={() => {
                      setIsMobileLoggedIn(true);
                      showToast(`Signed into Android as ${mobileRoleSelect}`);
                    }}
                    className="w-full py-2.5 bg-[#176B87] text-white rounded-lg font-bold text-xs shadow-xs flex items-center justify-center space-x-1"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Footer */}
                <div className="text-center pt-3 text-[10px] text-slate-400 border-t border-slate-100">
                  <p>CASPA School OS • Enterprise Edition</p>
                </div>
              </div>
            ) : (
              /* ================= AUTHENTICATED MOBILE SCREENS ================= */
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Top App Bar */}
                <div className="bg-white px-3.5 py-2 border-b border-slate-200 flex items-center justify-between shrink-0">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#123B5D] to-[#176B87] p-1 flex items-center justify-center border border-slate-200 shadow-xs transition hover:scale-105">
                      <CaspaLogo size="sm" showText={false} />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button onClick={() => showToast('No new notifications')} className="text-slate-600">
                      <Bell className="w-4 h-4" />
                    </button>
                    <img
                      src={
                        isStudent
                          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
                          : isAdmin
                          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
                          : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'
                      }
                      alt="Avatar"
                      className="w-7 h-7 rounded-full object-cover border border-teal"
                    />
                  </div>
                </div>

                {/* ================= ADMIN MODULE MOBILE SCREENS ================= */}
                {isAdmin ? (
                  <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-xs">
                    {/* TAB: ADMIN HOME */}
                    {activeMobileTab === 'home' && (
                      <>
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-base font-extrabold text-navy">Hi, Arthur Clark 👋</h2>
                            <p className="text-[11px] text-slate-500">School Operations Director</p>
                          </div>
                          <span className="text-[10px] bg-teal/10 text-teal font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse"></span>
                            <span>Campus Live</span>
                          </span>
                        </div>

                        {/* 4 Executive KPI Chips */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                            <span className="text-[9px] text-slate-400 block font-semibold uppercase">Enrolled Students</span>
                            <div className="flex items-baseline space-x-1 mt-0.5">
                              <span className="font-mono font-bold text-navy text-base">1,420</span>
                              <span className="text-[9px] text-emerald-600 font-semibold">+18 new</span>
                            </div>
                          </div>
                          <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                            <span className="text-[9px] text-slate-400 block font-semibold uppercase">Faculty & Staff</span>
                            <div className="flex items-baseline space-x-1 mt-0.5">
                              <span className="font-mono font-bold text-teal text-base">{staffMembers.length || 84}</span>
                              <span className="text-[9px] text-slate-400">active</span>
                            </div>
                          </div>
                          <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                            <span className="text-[9px] text-slate-400 block font-semibold uppercase">Fee Collection</span>
                            <div className="flex items-baseline space-x-1 mt-0.5">
                              <span className="font-mono font-bold text-emerald-600 text-base">94.2%</span>
                              <span className="text-[9px] text-slate-400">$3.82M</span>
                            </div>
                          </div>
                          <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                            <span className="text-[9px] text-slate-400 block font-semibold uppercase">Safety Desk</span>
                            <div className="flex items-baseline space-x-1 mt-0.5">
                              <span className="font-mono font-bold text-rose-600 text-base">
                                {safetyIncidents.filter((s) => s.status !== 'RESOLVED' && s.status !== 'CLOSED').length}
                              </span>
                              <span className="text-[9px] text-rose-500 font-medium">active alerts</span>
                            </div>
                          </div>
                        </div>

                        {/* Urgent Requisition / Approval Alert */}
                        {approvals.filter((a) => a.status === 'PENDING').length > 0 && (
                          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-amber-900 text-xs flex items-center space-x-1">
                                <Clock className="w-3.5 h-3.5 text-amber-600" />
                                <span>Pending Approval ({approvals.filter((a) => a.status === 'PENDING').length})</span>
                              </span>
                              <span className="text-[9px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-mono font-bold">
                                SLA 4h
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-700">
                              <p className="font-semibold text-navy">{approvals[0].title}</p>
                              <p className="text-[10px] text-slate-500">{approvals[0].requesterName} • {approvals[0].module}</p>
                            </div>
                            <div className="flex space-x-1.5 pt-1">
                              <button
                                onClick={() => {
                                  processApproval(approvals[0].id, 'APPROVED');
                                  showToast('Approved requisition successfully');
                                }}
                                className="flex-1 py-1 bg-emerald-600 text-white rounded text-[10px] font-bold"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => setActiveMobileTab('approvals')}
                                className="px-2 py-1 bg-white border border-slate-300 text-slate-700 rounded text-[10px] font-semibold"
                              >
                                View All
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Campus Fleet Radar Quick View */}
                        <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1.5">
                              <Bus className="w-4 h-4 text-teal" />
                              <span className="font-bold text-navy text-xs">Active Bus Transit</span>
                            </div>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                              24 Active
                            </span>
                          </div>
                          <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                            <div>
                              <p className="font-bold text-navy text-xs">{currentBus.routeNumber} ({currentBus.busNumber})</p>
                              <p className="text-[10px] text-slate-500">{currentBus.driverName} • {currentBus.currentLocationName}</p>
                            </div>
                            <span className="font-mono text-[11px] font-bold text-teal">{currentBus.speedKmH} km/h</span>
                          </div>
                        </div>

                        {/* Broadcast Emergency Banner */}
                        <button
                          onClick={() => showToast('Dispatched campus-wide notification to 1,420 parents')}
                          className="w-full py-2.5 bg-[#0E2C48] text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 shadow-xs hover:bg-navy transition"
                        >
                          <Radio className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                          <span>Dispatch Emergency Broadcast</span>
                        </button>
                      </>
                    )}

                    {/* TAB: ADMIN STUDENTS */}
                    {activeMobileTab === 'students' && (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm font-extrabold text-navy">Student Admissions ({students.length})</h2>
                          <button
                            onClick={() => showToast('Admit Student drawer ready on Desktop')}
                            className="px-2.5 py-1 bg-teal text-white rounded-lg text-[10px] font-bold flex items-center space-x-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Admit</span>
                          </button>
                        </div>
                        <div className="space-y-2">
                          {students.slice(0, 6).map((std) => (
                            <div key={std.id} className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                              <div>
                                <h4 className="font-bold text-navy text-xs">{std.fullName}</h4>
                                <p className="text-[10px] text-slate-400 font-mono">{std.admissionNo} • {std.grade} {std.section}</p>
                                <p className="text-[10px] text-slate-500 mt-0.5">Parent: {std.parentName}</p>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] font-bold text-emerald-600 block">{std.attendancePercentage}% att.</span>
                                <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${std.feeOutstanding === 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                                  {std.feeOutstanding === 0 ? 'Paid' : `$${std.feeOutstanding} due`}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB: ADMIN FINANCE */}
                    {activeMobileTab === 'finance' && (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm font-extrabold text-navy">Fee Accounts & Billing</h2>
                          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            94.2% Collected
                          </span>
                        </div>
                        <div className="space-y-2">
                          {feeInvoices.slice(0, 5).map((inv) => (
                            <div key={inv.id} className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[10px] font-bold text-slate-500">{inv.invoiceNo}</span>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${inv.status === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                  {inv.status}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-bold text-navy text-xs">{inv.studentName}</p>
                                  <p className="text-[10px] text-slate-400">{inv.gradeSection} • Due: {inv.dueDate}</p>
                                </div>
                                <div className="text-right">
                                  <span className="font-mono font-bold text-navy text-xs block">${inv.totalAmount}</span>
                                  <span className="text-[9px] text-emerald-600 font-mono">${inv.paidAmount} paid</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB: ADMIN SAFETY */}
                    {activeMobileTab === 'safety' && (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm font-extrabold text-navy">Safety Desk & Grievance</h2>
                          <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">
                            {safetyIncidents.length} Logged
                          </span>
                        </div>
                        <div className="space-y-2">
                          {safetyIncidents.map((inc) => (
                            <div key={inc.id} className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[10px] font-bold text-slate-500">{inc.caseNumber}</span>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${inc.risk === 'CRITICAL' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}`}>
                                  {inc.risk}
                                </span>
                              </div>
                              <h4 className="font-bold text-navy text-xs">{inc.category}</h4>
                              <p className="text-[10px] text-slate-600">{inc.description}</p>
                              <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[9px] text-slate-400">
                                <span>{inc.location}</span>
                                <span className="font-bold text-rose-600">{inc.slaDeadline}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB: ADMIN APPROVALS */}
                    {activeMobileTab === 'approvals' && (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm font-extrabold text-navy">Pending Requisitions</h2>
                          <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded">
                            {approvals.filter((a) => a.status === 'PENDING').length} Pending
                          </span>
                        </div>
                        <div className="space-y-2">
                          {approvals.map((app) => (
                            <div key={app.id} className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                                  {app.module}
                                </span>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${app.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                  {app.status}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-bold text-navy text-xs">{app.title}</h4>
                                <p className="text-[10px] text-slate-500">By {app.requesterName} ({app.requesterRole})</p>
                                {app.amount && (
                                  <p className="text-[11px] font-mono font-bold text-emerald-600 mt-0.5">Amount: ${app.amount}</p>
                                )}
                              </div>
                              {app.status === 'PENDING' && (
                                <div className="flex space-x-1.5 pt-1 border-t border-slate-100">
                                  <button
                                    onClick={() => {
                                      processApproval(app.id, 'APPROVED');
                                      showToast(`Approved ${app.title}`);
                                    }}
                                    className="flex-1 py-1 bg-emerald-600 text-white rounded text-[10px] font-bold"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => {
                                      processApproval(app.id, 'REJECTED');
                                      showToast(`Rejected ${app.title}`);
                                    }}
                                    className="flex-1 py-1 bg-rose-600 text-white rounded text-[10px] font-bold"
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : isStudent ? (
                  <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-xs">
                    {/* TAB 1: STUDENT HOME */}
                    {activeMobileTab === 'home' && (
                      <>
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-base font-extrabold text-navy">Hi, Elena Vance 👋</h2>
                            <p className="text-[11px] text-slate-500">Grade 9B • Roll No. 14</p>
                          </div>
                          <span className="text-[10px] bg-teal/10 text-teal font-bold px-2 py-0.5 rounded-full">
                            Term 2
                          </span>
                        </div>

                        {/* 3 KPI Chips */}
                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center">
                            <span className="text-[9px] text-slate-400 block font-semibold uppercase">Attendance</span>
                            <span className="font-mono font-bold text-emerald-600 text-sm">96.2%</span>
                            <span className="text-[9px] text-slate-400 block">19/22d</span>
                          </div>
                          <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center">
                            <span className="text-[9px] text-slate-400 block font-semibold uppercase">GPA</span>
                            <span className="font-mono font-bold text-navy text-sm">3.90</span>
                            <span className="text-[9px] text-slate-400 block">Rank #2</span>
                          </div>
                          <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center">
                            <span className="text-[9px] text-slate-400 block font-semibold uppercase">Tasks</span>
                            <span className="font-mono font-bold text-amber-600 text-sm">{pendingStudentTasks.length}</span>
                            <span className="text-[9px] text-slate-400 block">Due Today</span>
                          </div>
                        </div>

                        {/* LIVE CLASS CARD */}
                        <div className="p-3 bg-white rounded-xl border-l-4 border-l-teal border-y border-r border-slate-200 space-y-2">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="font-bold text-emerald-600 uppercase flex items-center space-x-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              <span>LIVE NOW • PERIOD 3</span>
                            </span>
                            <span className="text-slate-400 font-mono">{livePeriod.timeRange}</span>
                          </div>
                          <div>
                            <h3 className="font-extrabold text-navy text-xs">{livePeriod.subject}</h3>
                            <p className="text-[10px] text-slate-500">{livePeriod.teacher} • {livePeriod.room}</p>
                          </div>
                          <div className="p-1.5 bg-slate-50 rounded text-[10px] text-teal font-semibold">
                            {livePeriod.unitTopic || 'Unit 4: Thermodynamics'}
                          </div>
                          <button
                            onClick={() => showToast('Opening Lab Notes')}
                            className="w-full py-1.5 bg-[#176B87] text-white rounded-lg font-bold text-xs flex items-center justify-center space-x-1"
                          >
                            <BookOpen className="w-3 h-3" />
                            <span>Open Digital Notes</span>
                          </button>
                        </div>

                        {/* PENDING TASKS WIDGET */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-navy text-xs">Homework Due</span>
                            <button
                              onClick={() => setActiveMobileTab('tasks')}
                              className="text-[10px] text-teal font-semibold"
                            >
                              View All &gt;
                            </button>
                          </div>

                          {pendingStudentTasks.map((t) => (
                            <div key={t.id} className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[9px] font-bold text-teal">{t.subject}</span>
                                <span className="text-[9px] font-bold text-amber-600">{t.dueDate}</span>
                              </div>
                              <h4 className="font-bold text-navy text-xs">{t.title}</h4>
                              <button
                                onClick={() => submitStudentTask(t.id)}
                                className="w-full py-1 bg-teal/10 hover:bg-teal hover:text-white text-teal rounded-lg font-bold text-[11px] transition"
                              >
                                Turn In Solution
                              </button>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {/* TAB 2: STUDENT CLASSES & TIMETABLE (MATCHING TEACHER CLASSES SCREEN) */}
                    {activeMobileTab === 'classes' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm font-extrabold text-navy">My Classes &amp; Timetable</h2>
                          <span className="text-[10px] text-teal font-semibold">Wednesday • 7 Periods</span>
                        </div>

                        <div className="space-y-2">
                          {studentPeriods.map((period) => (
                            <div
                              key={period.id}
                              className={`p-3 bg-white rounded-xl border space-y-1 ${
                                period.status === 'LIVE_NOW' ? 'border-teal shadow-xs' : 'border-slate-200'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <h4 className="font-bold text-navy text-xs">{period.subject}</h4>
                                <span className="text-[10px] font-mono text-slate-500">{period.timeRange}</span>
                              </div>
                              <p className="text-[10px] text-slate-500">Period {period.periodNumber} • {period.room}</p>
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-[9px] text-teal font-semibold">Teacher: {period.teacher}</span>
                                {period.status === 'LIVE_NOW' ? (
                                  <span className="text-[9px] bg-teal text-white font-bold px-1.5 py-0.2 rounded">
                                    LIVE NOW
                                  </span>
                                ) : (
                                  <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded">
                                    {period.status === 'COMPLETED' ? 'Attended' : 'Scheduled'}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB 3: STUDENT ATTENDANCE (MATCHING TEACHER ATTENDANCE SCREEN) */}
                    {activeMobileTab === 'attendance' && (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-sm font-extrabold text-navy">Grade 9B Attendance</h2>
                            <p className="text-[10px] text-slate-500">September 2026 Monthly Log</p>
                          </div>
                          <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                            96.2% Present
                          </span>
                        </div>

                        {/* Calendar Heatmap Grid */}
                        <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Daily Activity Grid (19 Present · 2 Late · 1 Absent)
                          </span>
                          <div className="grid grid-cols-7 gap-1 text-center">
                            {attendanceHeatmap.slice(0, 28).map((d) => (
                              <div
                                key={d.dayNumber}
                                className={`h-7 rounded flex items-center justify-center font-mono text-[10px] font-bold ${
                                  d.status === 'PRESENT'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : d.status === 'LATE'
                                    ? 'bg-purple-100 text-purple-800'
                                    : d.status === 'ABSENT'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-slate-100 text-slate-400'
                                }`}
                              >
                                {d.dayNumber}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Submit Excuse */}
                        <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                          <span className="font-bold text-navy text-xs block">Submit Absence Excuse Slip</span>
                          <input
                            type="text"
                            value={excuseText}
                            onChange={(e) => setExcuseText(e.target.value)}
                            placeholder="Reason for absence..."
                            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200"
                          />
                          <button
                            onClick={() => {
                              if (excuseText) {
                                submitAbsenceExcuse('Today', excuseText);
                                setExcuseText('');
                                showToast('Absence excuse registered with Class Teacher');
                              }
                            }}
                            className="w-full py-1.5 bg-[#176B87] text-white rounded-lg font-bold text-xs"
                          >
                            Submit Slip to Teacher
                          </button>
                        </div>
                      </div>
                    )}

                    {/* TAB 4: STUDENT TASKS & HOMEWORK (MATCHING TEACHER TASKS SCREEN) */}
                    {activeMobileTab === 'tasks' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm font-extrabold text-navy">Assigned Tasks</h2>
                          <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded">
                            {pendingStudentTasks.length} Pending
                          </span>
                        </div>

                        <div className="space-y-2">
                          {studentTasks.map((t) => (
                            <div key={t.id} className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[9px] font-bold text-teal">{t.subject}</span>
                                <span
                                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                                    t.status === 'GRADED'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : t.status === 'SUBMITTED'
                                      ? 'bg-cyan-100 text-cyan-800'
                                      : 'bg-amber-100 text-amber-800'
                                  }`}
                                >
                                  {t.status}
                                </span>
                              </div>
                              <h4 className="font-bold text-navy text-xs">{t.title}</h4>
                              <p className="text-[10px] text-slate-500 line-clamp-2">{t.description}</p>
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-[9px] text-slate-400">{t.dueDate}</span>
                                {t.status === 'PENDING' && (
                                  <button
                                    onClick={() => submitStudentTask(t.id)}
                                    className="px-2.5 py-1 bg-[#176B87] text-white rounded-md font-bold text-[10px]"
                                  >
                                    Turn In
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB 5: STUDENT MARKS & FEEDBACK (MATCHING TEACHER MARKS SCREEN) */}
                    {activeMobileTab === 'marks' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm font-extrabold text-navy">Marks &amp; Feedback</h2>
                          <span className="text-[10px] text-teal font-semibold">Term 2 Results</span>
                        </div>

                        <div className="space-y-2">
                          <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                            <div>
                              <h4 className="font-bold text-navy text-xs">Mathematics (Mrs. Oswald)</h4>
                              <p className="text-[10px] text-slate-400">Unit Test 2 • Quadratic Equations</p>
                            </div>
                            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                              98/100
                            </span>
                          </div>

                          <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                            <div>
                              <h4 className="font-bold text-navy text-xs">Physics AP (Dr. Ross)</h4>
                              <p className="text-[10px] text-slate-400">Unit Test 1 • Mechanics &amp; Forces</p>
                            </div>
                            <span className="text-xs font-mono font-bold text-teal bg-sky-50 px-2 py-0.5 rounded">
                              94/100
                            </span>
                          </div>

                          <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                            <div>
                              <h4 className="font-bold text-navy text-xs">Chemistry Honors (Dr. Ramanathan)</h4>
                              <p className="text-[10px] text-slate-400">Lab Evaluation &amp; Viva</p>
                            </div>
                            <span className="text-xs font-mono font-bold text-teal bg-sky-50 px-2 py-0.5 rounded">
                              91/100
                            </span>
                          </div>

                          <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                            <div>
                              <h4 className="font-bold text-navy text-xs">English Literature (Dr. Wells)</h4>
                              <p className="text-[10px] text-slate-400">Hamlet Essay Submission</p>
                            </div>
                            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                              96/100
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 6: BUS TRANSIT RADAR */}
                    {activeMobileTab === 'bus' && (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-sm font-extrabold text-navy">School Bus Radar</h2>
                            <p className="text-[10px] text-slate-500">Route 12 • KA-01-EA-4921</p>
                          </div>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                            ETA 14m
                          </span>
                        </div>

                        <div className="h-44 rounded-xl bg-[#092238] border border-slate-800 relative flex items-center justify-center overflow-hidden">
                          <div className="absolute w-32 h-32 rounded-full border border-teal/40 animate-ping opacity-30"></div>
                          <div className="flex flex-col items-center z-10 text-white space-y-1">
                            <Bus className="w-8 h-8 text-cyan-300" />
                            <span className="text-[11px] font-bold">Near Metro Hub (34 km/h)</span>
                            <span className="text-[9px] text-slate-300">Next: Silver Oak (Elena's Stop)</span>
                          </div>
                        </div>

                        <button
                          onClick={() => showToast('Calling bus driver at +91 94481 22910')}
                          className="w-full py-2 bg-emerald-600 text-white rounded-lg font-bold text-xs flex items-center justify-center space-x-1.5"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call Driver (Manjunath)</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* ================= TEACHER MODULE MOBILE SCREENS ================= */
                  <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-xs">
                    {/* TEACHER HOME */}
                    {activeMobileTab === 'home' && (
                      <>
                        <div className="flex items-center justify-between">
                          <h2 className="text-base font-extrabold text-navy">Hi, Mrs. Oswald 👋</h2>
                          <span className="text-[10px] bg-sky-50 text-sky-800 font-semibold px-2 py-0.5 rounded-full">
                            Term 2 • Week 8
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                            <span className="text-[10px] text-slate-500 block">Classes</span>
                            <span className="font-mono font-bold text-navy text-base">4</span>
                            <span className="text-[9px] text-slate-400 block">periods</span>
                          </div>
                          <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                            <span className="text-[10px] text-slate-500 block">Students</span>
                            <span className="font-mono font-bold text-teal text-base">187</span>
                            <span className="text-[9px] text-slate-400 block">enrolled</span>
                          </div>
                          <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                            <span className="text-[10px] text-slate-500 block">Homework</span>
                            <span className="font-mono font-bold text-amber-600 text-base">12</span>
                            <span className="text-[9px] text-slate-400 block">to review</span>
                          </div>
                        </div>

                        <div className="p-3 bg-white rounded-xl border-l-4 border-l-teal border-y border-r border-slate-200 space-y-2">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="font-bold text-slate-500 uppercase">NEXT CLASS</span>
                            <span className="bg-teal-50 text-teal font-bold px-1.5 py-0.5 rounded">
                              ● Starts in 15m
                            </span>
                          </div>
                          <div>
                            <h3 className="font-extrabold text-navy text-xs">Mathematics — Grade 9B</h3>
                            <p className="text-[10px] text-slate-500">09:00 - 09:45 AM • Room 204</p>
                          </div>
                          <button
                            onClick={() => setActiveMobileTab('attendance')}
                            className="w-full py-2 bg-[#176B87] text-white rounded-lg font-bold text-xs"
                          >
                            Mark Attendance
                          </button>
                        </div>
                      </>
                    )}

                    {/* TEACHER CLASSES */}
                    {activeMobileTab === 'classes' && (
                      <div className="space-y-2">
                        <h2 className="text-sm font-extrabold text-navy">My Classes &amp; Timetable</h2>
                        {teacherClasses.map((cls) => (
                          <div key={cls.id} className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-navy text-xs">{cls.subject}</h4>
                              <span className="text-[10px] font-mono text-slate-500">{cls.timeRange}</span>
                            </div>
                            <p className="text-[10px] text-slate-500">{cls.grade} • {cls.room}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TEACHER ATTENDANCE */}
                    {activeMobileTab === 'attendance' && (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm font-extrabold text-navy">Grade 9B Attendance</h2>
                          <button
                            onClick={markAllStudentsPresent}
                            className="text-[10px] bg-teal text-white font-bold px-2 py-0.5 rounded"
                          >
                            Mark All Present
                          </button>
                        </div>

                        <div className="space-y-1.5">
                          {teacherStudents.map((std) => (
                            <div
                              key={std.id}
                              className="p-2 bg-white rounded-xl border border-slate-200 flex items-center justify-between"
                            >
                              <div>
                                <h4 className="font-bold text-navy text-xs">{std.fullName}</h4>
                                <span className="text-[10px] text-slate-400">Roll #{std.rollNo}</span>
                              </div>
                              <div className="flex gap-1">
                                {(['PRESENT', 'ABSENT', 'LATE'] as const).map((st) => (
                                  <button
                                    key={st}
                                    onClick={() => setStudentAttendance(std.id, st)}
                                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                      std.attendanceStatus === st
                                        ? st === 'PRESENT'
                                          ? 'bg-emerald-600 text-white'
                                          : st === 'ABSENT'
                                          ? 'bg-red-600 text-white'
                                          : 'bg-purple-600 text-white'
                                        : 'bg-slate-100 text-slate-600'
                                    }`}
                                  >
                                    {st[0]}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TEACHER TASKS */}
                    {activeMobileTab === 'tasks' && (
                      <div className="space-y-2">
                        <h2 className="text-sm font-extrabold text-navy">Assigned Tasks</h2>
                        {teacherTasks.map((t) => (
                          <div key={t.id} className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-bold text-teal">{t.type}</span>
                              <span className="text-[9px] text-slate-400">{t.dueDate}</span>
                            </div>
                            <h4 className="font-bold text-navy text-xs">{t.title}</h4>
                            <p className="text-[10px] text-slate-500">{t.gradeSection}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TEACHER MARKS */}
                    {activeMobileTab === 'marks' && (
                      <div className="space-y-2">
                        <h2 className="text-sm font-extrabold text-navy">Marks &amp; Feedback</h2>
                        {teacherStudents.map((std) => (
                          <div key={std.id} className="p-2 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                            <span className="font-bold text-navy text-xs">{std.fullName}</span>
                            <span className="text-xs font-mono font-bold text-teal">{std.unitTestScore ?? '--'}/100</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TEACHER COMMS */}
                    {activeMobileTab === 'comms' && (
                      <div className="space-y-2">
                        <h2 className="text-sm font-extrabold text-navy">Parent Hub</h2>
                        {parentMessages.map((msg) => (
                          <div key={msg.id} className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-navy text-xs">{msg.parentName}</h4>
                              <span className="text-[9px] text-slate-400">{msg.timeString}</span>
                            </div>
                            <p className="text-[10px] text-slate-500">{msg.snippet}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* ================= ANDROID BOTTOM NAVIGATION BAR (NAVY BLUE #0E2C48) ================= */}
                <div className="h-14 bg-[#0E2C48] text-white px-2 flex items-center justify-around shrink-0 text-[10px] border-t border-[#16426a]">
                  {isAdmin ? (
                    <>
                      <button
                        onClick={() => setActiveMobileTab('home')}
                        className={`flex flex-col items-center space-y-0.5 ${
                          activeMobileTab === 'home' ? 'text-cyan-300 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <Home className="w-4 h-4" />
                        <span>Overview</span>
                      </button>

                      <button
                        onClick={() => setActiveMobileTab('students')}
                        className={`flex flex-col items-center space-y-0.5 ${
                          activeMobileTab === 'students' ? 'text-cyan-300 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <Users className="w-4 h-4" />
                        <span>Students</span>
                      </button>

                      <button
                        onClick={() => setActiveMobileTab('finance')}
                        className={`flex flex-col items-center space-y-0.5 ${
                          activeMobileTab === 'finance' ? 'text-cyan-300 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Finance</span>
                      </button>

                      <button
                        onClick={() => setActiveMobileTab('safety')}
                        className={`flex flex-col items-center space-y-0.5 relative ${
                          activeMobileTab === 'safety' ? 'text-cyan-300 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <ShieldAlert className="w-4 h-4" />
                        <span>Safety</span>
                        {safetyIncidents.some((s) => s.status !== 'RESOLVED' && s.status !== 'CLOSED') && (
                          <span className="absolute -top-0.5 right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                        )}
                      </button>

                      <button
                        onClick={() => setActiveMobileTab('approvals')}
                        className={`flex flex-col items-center space-y-0.5 ${
                          activeMobileTab === 'approvals' ? 'text-cyan-300 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <CheckSquare className="w-4 h-4" />
                        <span>Approvals</span>
                      </button>
                    </>
                  ) : isStudent ? (
                    <>
                      <button
                        onClick={() => setActiveMobileTab('home')}
                        className={`flex flex-col items-center space-y-0.5 ${
                          activeMobileTab === 'home' ? 'text-cyan-300 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <Home className="w-4 h-4" />
                        <span>Home</span>
                      </button>

                      <button
                        onClick={() => setActiveMobileTab('classes')}
                        className={`flex flex-col items-center space-y-0.5 ${
                          activeMobileTab === 'classes' ? 'text-cyan-300 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Classes</span>
                      </button>

                      <button
                        onClick={() => setActiveMobileTab('attendance')}
                        className={`flex flex-col items-center space-y-0.5 ${
                          activeMobileTab === 'attendance' ? 'text-cyan-300 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <CheckSquare className="w-4 h-4" />
                        <span>Attendance</span>
                      </button>

                      <button
                        onClick={() => setActiveMobileTab('tasks')}
                        className={`flex flex-col items-center space-y-0.5 ${
                          activeMobileTab === 'tasks' ? 'text-cyan-300 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <FileText className="w-4 h-4" />
                        <span>Tasks</span>
                      </button>

                      <button
                        onClick={() => setActiveMobileTab('marks')}
                        className={`flex flex-col items-center space-y-0.5 ${
                          activeMobileTab === 'marks' ? 'text-cyan-300 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <Award className="w-4 h-4" />
                        <span>Marks</span>
                      </button>

                      <button
                        onClick={() => setActiveMobileTab('bus')}
                        className={`flex flex-col items-center space-y-0.5 ${
                          activeMobileTab === 'bus' ? 'text-cyan-300 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <Bus className="w-4 h-4" />
                        <span>Bus</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setActiveMobileTab('home')}
                        className={`flex flex-col items-center space-y-0.5 ${
                          activeMobileTab === 'home' ? 'text-cyan-300 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <Home className="w-4 h-4" />
                        <span>Home</span>
                      </button>

                      <button
                        onClick={() => setActiveMobileTab('classes')}
                        className={`flex flex-col items-center space-y-0.5 ${
                          activeMobileTab === 'classes' ? 'text-cyan-300 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Classes</span>
                      </button>

                      <button
                        onClick={() => setActiveMobileTab('attendance')}
                        className={`flex flex-col items-center space-y-0.5 ${
                          activeMobileTab === 'attendance' ? 'text-cyan-300 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <CheckSquare className="w-4 h-4" />
                        <span>Attendance</span>
                      </button>

                      <button
                        onClick={() => setActiveMobileTab('tasks')}
                        className={`flex flex-col items-center space-y-0.5 ${
                          activeMobileTab === 'tasks' ? 'text-cyan-300 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <FileText className="w-4 h-4" />
                        <span>Tasks</span>
                      </button>

                      <button
                        onClick={() => setActiveMobileTab('marks')}
                        className={`flex flex-col items-center space-y-0.5 ${
                          activeMobileTab === 'marks' ? 'text-cyan-300 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <Award className="w-4 h-4" />
                        <span>Marks</span>
                      </button>

                      <button
                        onClick={() => setActiveMobileTab('comms')}
                        className={`flex flex-col items-center space-y-0.5 ${
                          activeMobileTab === 'comms' ? 'text-cyan-300 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Comms</span>
                      </button>
                    </>
                  )}
                </div>

                {/* Android Bottom Gesture Pill */}
                <div className="h-4 bg-[#0E2C48] flex items-center justify-center shrink-0">
                  <div className="w-32 h-1 bg-slate-500 rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
