import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Building,
  Clock,
  UserCheck,
  Plus,
  CheckCircle2,
  CalendarDays,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminAcademicsScreen: React.FC = () => {
  const { classSections, teacherClasses, showToast } = useApp();

  const [selectedSection, setSelectedSection] = useState<string>('9B');
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const timetableMatrix = [
    { period: 1, time: '08:30 - 09:15 AM', subject: 'Mathematics (Calculus Core)', teacher: 'Mrs. Oswald', room: 'Room 204' },
    { period: 2, time: '09:20 - 10:05 AM', subject: 'English Literature', teacher: 'Dr. Katherine Wells', room: 'Room 204' },
    { period: 3, time: '10:15 - 11:00 AM', subject: 'AP Physics (Thermodynamics)', teacher: 'Dr. Alistair Ross', room: 'Lab 204 North' },
    { period: 4, time: '11:05 - 11:50 AM', subject: 'World History & Civics', teacher: 'Mr. Marcus Vance', room: 'Room 304' },
    { period: 5, time: '12:35 - 01:20 PM', subject: 'Chemistry Lab Practical', teacher: 'Dr. Ross / Assistant', room: 'Science Lab 2' },
    { period: 6, time: '01:25 - 02:10 PM', subject: 'Computer Science & Python', teacher: 'Mr. Anand Sharma', room: 'STEM Lab' },
    { period: 7, time: '02:15 - 03:00 PM', subject: 'Physical Education & Athletics', teacher: 'Coach Briggs', room: 'Main Gymnasium' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar matching Teacher/Student Module */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-teal font-semibold uppercase tracking-wider mb-1">
            <span>Academic Affairs &amp; Curriculum Governance • Term 2</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-navy tracking-tight">
            Curriculum, Sections &amp; Master Timetable
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure institutional sections, instructional schedules, room allocations, and exam timetables.
          </p>
        </div>

        <button
          onClick={() => showToast('Master timetable synced with all student & faculty calendars')}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-teal hover:bg-[#125870] text-white text-xs font-bold transition shadow-xs"
        >
          <CalendarDays className="w-4 h-4" />
          <span>Publish Master Timetable</span>
        </button>
      </div>

      {/* Class Sections Grid */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-sm text-navy flex items-center space-x-2">
          <Building className="w-4 h-4 text-teal" />
          <span>Active Class Sections &amp; Head Room Teachers</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {classSections.map((sec) => (
            <div
              key={sec.id}
              onClick={() => setSelectedSection(sec.section)}
              className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-3 ${
                selectedSection === sec.section
                  ? 'border-teal bg-teal/5 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-navy">{sec.grade} - Section {sec.section}</h4>
                  <span className="text-[11px] text-teal font-semibold">Teacher: {sec.classTeacher}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {sec.room}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Enrolled Capacity</span>
                  <span className="font-bold text-navy">{sec.studentCount} / {sec.capacity}</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-teal h-full rounded-full"
                    style={{ width: `${(sec.studentCount / sec.capacity) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <span>{sec.periodsPerDay} Periods Daily</span>
                <span className="font-bold text-emerald-700">{sec.syllabusCompletionRate}% Syllabus Completed</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Master Timetable Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-extrabold text-sm text-navy flex items-center space-x-2">
              <Clock className="w-4 h-4 text-teal" />
              <span>Section {selectedSection} Schedule Matrix</span>
            </h3>
            <p className="text-xs text-slate-400">Institutional daily period rotations</p>
          </div>

          <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
            {days.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`px-3 py-1.5 text-xs rounded-lg font-bold transition ${
                  selectedDay === d
                    ? 'bg-navy text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Timetable Slots Table */}
        <div className="divide-y divide-slate-100">
          {timetableMatrix.map((slot) => (
            <div key={slot.period} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/50 px-2 rounded-xl transition">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-navy shrink-0 font-bold">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">P</span>
                  <span className="text-sm leading-none">{slot.period}</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-navy">{slot.subject}</h4>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-0.5">
                    <span>{slot.time}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-700">{slot.teacher}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <span className="font-mono text-[11px] font-bold text-teal bg-teal/10 px-2.5 py-1 rounded-md">
                  {slot.room}
                </span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
                  Scheduled
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Term Milestones */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <h3 className="font-extrabold text-sm text-navy flex items-center space-x-2">
          <FileCheck className="w-4 h-4 text-teal" />
          <span>Fall Term 2026 Examination &amp; Milestone Timeline</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-bold text-teal uppercase">Sep 28 - Oct 02</span>
            <h4 className="font-bold text-navy">Mid-Term Assessments</h4>
            <p className="text-[11px] text-slate-500">Formative evaluation across Grades 8-12 with digital grading.</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-bold text-indigo-600 uppercase">Oct 14 - Oct 16</span>
            <h4 className="font-bold text-navy">Parent-Teacher Conference</h4>
            <p className="text-[11px] text-slate-500">Individual consultations scheduled through the Parent Portal.</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-bold text-amber-600 uppercase">Nov 23 - Dec 04</span>
            <h4 className="font-bold text-navy">Term 2 Final Examinations</h4>
            <p className="text-[11px] text-slate-500">Summative final evaluations and honors rank generation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
