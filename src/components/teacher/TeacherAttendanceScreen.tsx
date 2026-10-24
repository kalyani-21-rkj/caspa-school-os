import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  X,
  Clock,
  Sparkles,
  Users,
  CheckCheck,
  Radio,
  Send,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TeacherAttendanceScreenProps {
  onBack?: () => void;
}

export const TeacherAttendanceScreen: React.FC<TeacherAttendanceScreenProps> = ({ onBack }) => {
  const {
    teacherStudents,
    setStudentAttendance,
    markAllStudentsPresent,
    showToast,
  } = useApp();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const presentCount = teacherStudents.filter((s) => s.attendanceStatus === 'PRESENT').length;
  const absentCount = teacherStudents.filter((s) => s.attendanceStatus === 'ABSENT').length;
  const lateCount = teacherStudents.filter((s) => s.attendanceStatus === 'LATE').length;
  const totalCount = 32;
  const markedCount = presentCount + absentCount + lateCount;

  const handleSubmitAttendance = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Attendance recorded and synchronized to Parent & Student Portals');
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Bar with LIVE indicator (Image 6) */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-navy tracking-tight">
              Mark Attendance
            </h1>
            <p className="text-xs text-slate-500 font-medium flex items-center space-x-1.5">
              <span>Period 1</span>
              <span>•</span>
              <span>Active Roll Call</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
          <span>LIVE</span>
        </div>
      </div>

      {/* Class Header Card (Image 6) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-teal uppercase tracking-widest block">
            SECTION 9-B
          </span>
          <h2 className="text-xl font-extrabold text-navy mt-0.5">
            Grade 9B — Mathematics
          </h2>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
            <span>09:00 AM, Sep 23, 2026</span>
            <span>•</span>
            <span>Room 204</span>
          </div>
        </div>

        <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-xl font-serif">
          Σ
        </div>
      </div>

      {/* TALLY BREAKDOWN (Image 6) */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wider text-slate-500 text-[11px]">
            TALLY BREAKDOWN
          </span>
          <span className="font-bold text-navy text-xs">
            {markedCount}/{totalCount} marked
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center space-x-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span className="font-semibold text-emerald-900">Present: {presentCount}</span>
          </div>

          <div className="p-2.5 bg-red-50 rounded-lg border border-red-200 flex items-center space-x-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            <span className="font-semibold text-red-900">Absent: {absentCount}</span>
          </div>

          <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 flex items-center space-x-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
            <span className="font-semibold text-amber-900">Late: {lateCount}</span>
          </div>
        </div>
      </div>

      {/* Fast Action Row */}
      <div className="flex items-center justify-between text-xs px-1">
        <button
          onClick={markAllStudentsPresent}
          className="flex items-center space-x-1.5 text-teal font-bold hover:underline"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark All Present</span>
        </button>

        <span className="text-slate-400 text-[11px]">Sorted by Roll No.</span>
      </div>

      {/* Student List with Interactive P / A / L Buttons (Image 6) */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
        {teacherStudents.map((std) => (
          <div
            key={std.id}
            className="p-4 flex items-center justify-between hover:bg-slate-50 transition"
          >
            {/* Student Info */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs shrink-0">
                {std.avatarInitials}
              </div>
              <div>
                <h4 className="font-bold text-navy text-sm">{std.fullName}</h4>
                <p className="text-[11px] text-slate-500">
                  Roll No. {String(std.rollNo).padStart(2, '0')} • {std.grade}
                </p>
              </div>
            </div>

            {/* Status Buttons P / A / L */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setStudentAttendance(std.id, 'PRESENT')}
                className={`w-9 h-9 rounded-full font-extrabold text-xs transition flex items-center justify-center ${
                  std.attendanceStatus === 'PRESENT'
                    ? 'bg-emerald-600 text-white shadow-xs scale-105 ring-2 ring-emerald-300'
                    : 'bg-slate-100 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
                title="Mark Present"
              >
                P
              </button>

              <button
                type="button"
                onClick={() => setStudentAttendance(std.id, 'ABSENT')}
                className={`w-9 h-9 rounded-full font-extrabold text-xs transition flex items-center justify-center ${
                  std.attendanceStatus === 'ABSENT'
                    ? 'bg-red-600 text-white shadow-xs scale-105 ring-2 ring-red-300'
                    : 'bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-700'
                }`}
                title="Mark Absent"
              >
                A
              </button>

              <button
                type="button"
                onClick={() => setStudentAttendance(std.id, 'LATE')}
                className={`w-9 h-9 rounded-full font-extrabold text-xs transition flex items-center justify-center ${
                  std.attendanceStatus === 'LATE'
                    ? 'bg-amber-600 text-white shadow-xs scale-105 ring-2 ring-amber-300'
                    : 'bg-slate-100 text-slate-500 hover:bg-amber-50 hover:text-amber-700'
                }`}
                title="Mark Late"
              >
                L
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CASPA Assistant Insight Card (Image 6) */}
      <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1.5 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-full bg-caspaPurple text-white flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-yellow-300" />
          </div>
          <span className="font-bold text-navy text-[11px] uppercase tracking-wide">
            CASPA Assistant
          </span>
          <span className="bg-purple-100 text-caspaPurple px-1.5 py-0.2 rounded text-[10px] font-bold">
            Insight
          </span>
        </div>
        <p className="text-slate-700 leading-relaxed text-xs">
          Marcus Brody has 2 consecutive absences in Period 1. Automated SMS alert queued for guardian after confirmation.
        </p>
      </div>

      {/* Submission Confirmation Bar (Image 6) */}
      <div className="space-y-3 pt-2">
        <p className="text-[11px] text-slate-500 text-center flex items-center justify-center space-x-1.5">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          <span>Once submitted, record syncs immediately to Student &amp; Parent Portals.</span>
        </p>

        <button
          onClick={handleSubmitAttendance}
          disabled={isSubmitting}
          className="w-full py-3.5 bg-[#176B87] hover:bg-[#125870] text-white font-bold rounded-xl text-sm transition shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>
            {isSubmitting
              ? 'Submitting Attendance...'
              : `Submit Attendance (${markedCount}/${totalCount} Marked)`}
          </span>
        </button>
      </div>
    </div>
  );
};
