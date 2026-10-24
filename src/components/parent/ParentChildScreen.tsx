import React, { useState } from 'react';
import {
  Users,
  Award,
  Calendar,
  Clock,
  BookOpen,
  Bus,
  CreditCard,
  Heart,
  Shield,
  Download,
  ExternalLink,
  ChevronRight,
  UserPlus,
  X,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ParentChildScreen: React.FC = () => {
  const {
    activeChild,
    parentChildren,
    switchActiveChild,
    linkNewChild,
    showToast,
  } = useApp();

  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildGrade, setNewChildGrade] = useState('Grade 9');
  const [newChildSection, setNewChildSection] = useState('A');
  const [newChildRollNo, setNewChildRollNo] = useState(19);
  const [newChildCurriculum, setNewChildCurriculum] = useState<'CBSE' | 'IB' | 'ICSE'>('CBSE');

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
    setIsLinkModalOpen(false);
    setNewChildName('');
  };

  // Schedule mock for today
  const aaravSchedule = [
    { period: 1, time: '08:30 - 09:20 AM', subject: 'Mathematics (Calculus II)', room: 'Room 102', teacher: 'Mrs. Oswald', status: 'COMPLETED' },
    { period: 2, time: '09:25 - 10:15 AM', subject: 'Physics Practical (Lab 3B)', room: 'Science Block B', teacher: 'Dr. Sunita Verma', status: 'COMPLETED' },
    { period: 3, time: '10:35 - 11:25 AM', subject: 'English Literature', room: 'Room 204', teacher: 'Mr. Charles Davis', status: 'LIVE_NOW' },
    { period: 4, time: '11:30 - 12:20 PM', subject: 'Computer Science & AI', room: 'Lab 2A', teacher: 'Mr. Arthur Vance', status: 'UPCOMING' },
    { period: 5, time: '01:00 - 01:30 PM', subject: 'Zero-Period Robotics Mentorship', room: 'Innovation Lab', teacher: 'Robotics Club', status: 'UPCOMING' },
  ];

  const ananyaSchedule = [
    { period: 1, time: '08:30 - 09:20 AM', subject: 'Language & Literature (IB)', room: 'MYP Room 12', teacher: 'Mr. Marcus Vance', status: 'COMPLETED' },
    { period: 2, time: '09:25 - 10:15 AM', subject: 'Integrated Science', room: 'Lab 1', teacher: 'Ms. Rachel Higgins', status: 'COMPLETED' },
    { period: 3, time: '10:35 - 11:25 AM', subject: 'Mathematics MYP', room: 'MYP Room 14', teacher: 'Mrs. Oswald', status: 'LIVE_NOW' },
    { period: 4, time: '11:30 - 12:20 PM', subject: 'Visual Arts Studio', room: 'Art Wing', teacher: 'Ms. Clara Finch', status: 'UPCOMING' },
    { period: 5, time: '01:00 - 01:30 PM', subject: 'Badminton Squad Practice', room: 'Indoor Court 2', teacher: 'Coach Roberts', status: 'UPCOMING' },
  ];

  const currentSchedule = activeChild.id === 'child-ananya-sharma' ? ananyaSchedule : aaravSchedule;

  return (
    <div className="space-y-6">
      {/* Header and Child Switcher Cards */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Child Profile Hub</h2>
          <p className="text-xs text-slate-500">
            Comprehensive scholastic dossier, biometric data, timetable and records
          </p>
        </div>
        <button
          onClick={() => setIsLinkModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#0E2C48] hover:bg-[#13385c] text-white text-xs font-bold transition shadow-sm w-fit"
        >
          <UserPlus className="w-4 h-4 text-cyan-300" />
          <span>Link Sibling / Ward</span>
        </button>
      </div>

      {/* Child Switcher Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {parentChildren.map((child) => {
          const isSelected = child.id === activeChild?.id;
          return (
            <div
              key={child.id}
              onClick={() => switchActiveChild(child.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 relative ${
                isSelected
                  ? 'bg-white border-teal shadow-md ring-2 ring-teal/20'
                  : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={child.avatarUrl}
                    alt={child.fullName}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 shadow-xs"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                        {child.fullName}
                      </h3>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {child.curriculum}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {child.grade} • Section {child.section} • Roll #{child.rollNo}
                    </p>
                    <p className="text-[11px] font-semibold text-teal mt-1">
                      House: {child.house} • Blood: {child.bloodGroup}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                    isSelected
                      ? 'bg-teal text-white border-teal'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}
                >
                  {isSelected ? 'Active Profile' : 'Select'}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-50 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold block">Attendance</span>
                  <span className="text-xs font-black text-slate-800">{child.attendancePercent}%</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold block">GPA / Rank</span>
                  <span className="text-xs font-black text-slate-800">{child.gpa}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold block">Pending Dues</span>
                  <span className={`text-xs font-black ${child.pendingDues > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {child.pendingDues > 0 ? `₹${child.pendingDues.toLocaleString('en-IN')}` : 'Cleared'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Child Deep-Dive Detail View */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center space-x-4">
            <img
              src={activeChild.avatarUrl}
              alt={activeChild.fullName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-light shadow-sm"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-black text-slate-900">{activeChild.fullName}</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-teal/10 text-teal border border-teal/20">
                  {activeChild.curriculum} Board
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeChild.grade} • Section {activeChild.section} • Roll Number {activeChild.rollNo}
              </p>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                Tutor: <strong className="text-slate-800">{activeChild.classTeacher}</strong> ({activeChild.classTeacherEmail})
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => showToast(`Digital Student ID for ${activeChild.fullName} downloaded`)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Digital ID</span>
            </button>
            <button
              onClick={() => showToast(`Consolidated Grade Transcript generated`)}
              className="px-3.5 py-2 rounded-xl bg-teal hover:bg-teal-dark text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-xs"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Transcript PDF</span>
            </button>
          </div>
        </div>

        {/* 4 Quick Stat Pill Rows */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Biometric Attendance</span>
            <div className="text-lg font-black text-slate-900 mt-0.5">{activeChild.attendancePercent}%</div>
            <span className="text-[11px] text-slate-500">{activeChild.presentDays} of {activeChild.totalDays} sessions</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Academic Standing</span>
            <div className="text-lg font-black text-slate-900 mt-0.5">{activeChild.gpa}</div>
            <span className="text-[11px] text-slate-500">{activeChild.rank}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Fleet Transport</span>
            <div className="text-lg font-black text-slate-900 mt-0.5">{activeChild.busRoute}</div>
            <span className="text-[11px] text-slate-500">{activeChild.busStop}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Emergency Registry</span>
            <div className="text-lg font-black text-slate-900 mt-0.5">{activeChild.bloodGroup}</div>
            <span className="text-[11px] text-slate-500">{activeChild.emergencyContact}</span>
          </div>
        </div>

        {/* Today's Live Timetable */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-teal" />
              <h4 className="font-extrabold text-sm text-slate-900">Today&apos;s Class Schedule</h4>
            </div>
            <span className="text-[10px] font-bold text-slate-400">Regular Academic Day • Early Dismissal 1:30 PM</span>
          </div>

          <div className="space-y-2">
            {currentSchedule.map((period) => (
              <div
                key={period.period}
                className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs transition ${
                  period.status === 'LIVE_NOW'
                    ? 'bg-teal/10 border-teal shadow-xs'
                    : period.status === 'COMPLETED'
                    ? 'bg-slate-50/80 border-slate-200 opacity-80'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-7 h-7 rounded-lg font-mono font-bold flex items-center justify-center shrink-0 ${
                      period.status === 'LIVE_NOW'
                        ? 'bg-teal text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    P{period.period}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{period.subject}</p>
                    <p className="text-[11px] text-slate-500">
                      {period.teacher} • {period.room}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 self-end sm:self-auto">
                  <span className="font-mono text-slate-600 font-semibold">{period.time}</span>
                  <span
                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                      period.status === 'LIVE_NOW'
                        ? 'bg-emerald-500 text-white animate-pulse'
                        : period.status === 'COMPLETED'
                        ? 'bg-slate-200 text-slate-600'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {period.status === 'LIVE_NOW' ? 'IN SESSION' : period.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safeguarding & Health Dossier */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 mb-1">
              <Shield className="w-3.5 h-3.5 text-teal" />
              <span>Campus Security &amp; RFID</span>
            </div>
            <p className="text-xs text-slate-600">Smart ID Tag: <strong>RFID-KA-2026-9812</strong></p>
            <p className="text-[11px] text-slate-500">Locker Assigned: #104 (Block A)</p>
          </div>
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 mb-1">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Medical &amp; Allergies</span>
            </div>
            <p className="text-xs text-slate-600">No known allergies registered.</p>
            <p className="text-[11px] text-slate-500">Medical clearance on file (Sep 2026)</p>
          </div>
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 mb-1">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Co-Curricular Honours</span>
            </div>
            <p className="text-xs text-slate-600">Robotics Club Captain</p>
            <p className="text-[11px] text-slate-500">Falcons House Vice-Prefect</p>
          </div>
        </div>
      </div>

      {/* Link Child Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-slate-900">
                Link Additional Ward Profile
              </h3>
              <button
                onClick={() => setIsLinkModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLinkChild} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Student Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diya Sharma"
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
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Board / Curriculum</label>
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
                  onClick={() => setIsLinkModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0E2C48] hover:bg-[#13385c] text-white shadow-sm"
                >
                  Verify &amp; Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
