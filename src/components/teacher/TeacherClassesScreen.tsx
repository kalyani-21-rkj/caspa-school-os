import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Clock,
  Users,
  DoorClosed,
  Sparkles,
  ClipboardCheck,
  FolderOpen,
  CheckCircle2,
  BookOpen,
  CalendarDays,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MasterTimetableSlot } from '../../types';

interface TeacherClassesScreenProps {
  onTakeAttendance: (classId: string) => void;
  onViewRoster: (classId: string) => void;
}

const DAYS: MasterTimetableSlot['day'][] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const TeacherClassesScreen: React.FC<TeacherClassesScreenProps> = ({
  onTakeAttendance,
  onViewRoster,
}) => {
  const {
    currentUser,
    teacherClasses,
    masterTimetable,
    availableTimetableWeeks,
    activeTimetableWeek,
    setActiveTimetableWeek,
    activeScheduleDay,
    setActiveScheduleDay,
    togglePeriodCompletion,
    showToast,
  } = useApp();

  const [filterPeriod, setFilterPeriod] = useState<'today' | 'week' | 'all'>('today');
  const selectedDay = activeScheduleDay;
  const setSelectedDay = setActiveScheduleDay;
  const [searchQuery, setSearchQuery] = useState('');

  const teacherName = currentUser?.fullName || 'Mrs. Oswald';

  // Published slots for this teacher (or all published slots in week if viewing full roster)
  const myWeekSlots = masterTimetable.filter(
    (s) =>
      s.weekLabel === activeTimetableWeek &&
      s.isPublished &&
      (s.teacher.toLowerCase().includes('oswald') ||
        s.teacher.toLowerCase() === teacherName.toLowerCase() ||
        s.subject.toLowerCase().includes('math') ||
        s.subject.toLowerCase().includes('algebra'))
  );

  const dayPublishedSlots = (
    myWeekSlots.filter((s) => s.day === selectedDay).length > 0
      ? myWeekSlots.filter((s) => s.day === selectedDay)
      : masterTimetable.filter(
          (s) => s.weekLabel === activeTimetableWeek && s.day === selectedDay && s.gradeSection === '9B'
        )
  )
    .filter(
      (s) =>
        s.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.gradeSection.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.room.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.period - b.period);

  const filteredClasses = teacherClasses.filter(
    (c) =>
      c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedDayCount = dayPublishedSlots.filter((s) => s.status === 'COMPLETED').length;
  const nextActiveSlot = dayPublishedSlots.find((s) => s.status !== 'COMPLETED') || dayPublishedSlots[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-teal">My Classes &amp; Published Timetable</span>
            <span>·</span>
            <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-semibold text-[11px]">
              {activeTimetableWeek}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">
            Class Schedule, Rosters &amp; Lecture Completion
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {teacherName} • {currentUser?.designation || 'Department of Mathematics'} • Tick periods completed after each lecture
          </p>
        </div>

        {/* Search & Week Selector Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs">
            <CalendarDays className="w-3.5 h-3.5 text-teal" />
            <select
              value={activeTimetableWeek}
              onChange={(e) => setActiveTimetableWeek(e.target.value)}
              className="font-bold text-navy bg-transparent focus:outline-none text-xs"
            >
              {availableTimetableWeeks.map((wk) => (
                <option key={wk} value={wk}>
                  {wk}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search classes or grades..."
              className="pl-8 pr-4 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-teal w-44 sm:w-56"
            />
          </div>
          <button
            onClick={() => showToast('Filters synced with Master Timetable')}
            className="p-2 border border-slate-300 hover:bg-slate-50 rounded-lg text-slate-600 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs (Today, This Week, All Classes) + Day Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs w-fit">
          <button
            onClick={() => setFilterPeriod('today')}
            className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
              filterPeriod === 'today' ? 'bg-white shadow-xs text-teal' : 'text-slate-600 hover:text-navy'
            }`}
          >
            Day Schedule ({dayPublishedSlots.length})
          </button>
          <button
            onClick={() => setFilterPeriod('week')}
            className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
              filterPeriod === 'week' ? 'bg-white shadow-xs text-teal' : 'text-slate-600 hover:text-navy'
            }`}
          >
            This Week (Mon–Sat)
          </button>
          <button
            onClick={() => setFilterPeriod('all')}
            className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
              filterPeriod === 'all' ? 'bg-white shadow-xs text-teal' : 'text-slate-600 hover:text-navy'
            }`}
          >
            All Classes ({filteredClasses.length})
          </button>
        </div>

        {filterPeriod === 'today' && (
          <div className="flex items-center space-x-1 overflow-x-auto">
            {DAYS.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedDay === d
                    ? 'bg-navy text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* NEXT CLASS & COMPLETION STATUS BANNER */}
      <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wider block">
              PUBLISHED BY ADMIN • {selectedDay.toUpperCase()} PROGRESS ({completedDayCount}/{dayPublishedSlots.length} COMPLETED)
            </span>
            <span className="font-extrabold text-navy text-sm">
              {nextActiveSlot
                ? `Period ${nextActiveSlot.period}: ${nextActiveSlot.subject} (Grade ${nextActiveSlot.gradeSection})`
                : 'All Scheduled Periods Completed'}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-mono text-slate-600 bg-white px-2.5 py-1 rounded border border-slate-200 text-xs">
            {nextActiveSlot?.room || 'Room 204'}
          </span>
          {nextActiveSlot && (
            <button
              onClick={() => togglePeriodCompletion(nextActiveSlot.id, teacherName)}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer ${
                nextActiveSlot.status === 'COMPLETED'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#176B87] hover:bg-[#125870] text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>
                {nextActiveSlot.status === 'COMPLETED'
                  ? 'Completed ✓'
                  : `Tick Period ${nextActiveSlot.period} Completed`}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: TODAY / SELECTED DAY PUBLISHED PERIOD CARDS */}
      {filterPeriod === 'today' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dayPublishedSlots.map((slot) => {
            const isCompleted = slot.status === 'COMPLETED';
            return (
              <div
                key={slot.id}
                className={`rounded-xl border p-5 shadow-xs space-y-4 transition ${
                  isCompleted
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-extrabold text-navy text-base">{slot.subject}</h3>
                      <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        Period {slot.period}
                      </span>
                      {isCompleted && (
                        <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Completed {slot.completedAt ? `• ${slot.completedAt}` : ''}</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {slot.unitTopic || 'Core Curriculum Lecture'}
                    </p>
                  </div>

                  <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded text-[11px] font-bold shrink-0">
                    Grade {slot.gradeSection}
                  </span>
                </div>

                {/* Timing, Room, Students Count */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-mono text-[11px]">{slot.timeRange}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <DoorClosed className="w-3.5 h-3.5 text-slate-400" />
                    <span>{slot.room}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold text-navy">32 students</span>
                  </div>
                </div>

                {/* Action Buttons including Tick Lecture Completed */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => togglePeriodCompletion(slot.id, teacherName)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                      isCompleted
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>
                      {isCompleted ? 'Lecture Completed ✓' : 'Tick Period Completed'}
                    </span>
                  </button>

                  <button
                    onClick={() => onViewRoster(slot.id)}
                    className="px-3 py-2 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 rounded-lg text-xs font-semibold transition flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Roster</span>
                  </button>

                  <button
                    onClick={() => onTakeAttendance(slot.id)}
                    className="px-3 py-2 bg-[#176B87] hover:bg-[#125870] text-white rounded-lg text-xs font-semibold transition flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
                  >
                    <ClipboardCheck className="w-3.5 h-3.5" />
                    <span>Attendance</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: THIS WEEK (FULL MON-SAT WEEK-WISE TEACHER TIMETABLE) */}
      {filterPeriod === 'week' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-sm text-navy">
                Week-Wise Published Teacher Timetable ({activeTimetableWeek})
              </h3>
              <p className="text-xs text-slate-500">
                Click any period across Monday–Saturday to mark that lecture as Completed.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              {myWeekSlots.filter((s) => s.status === 'COMPLETED').length} / {myWeekSlots.length} Weekly Lectures Completed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DAYS.map((day) => {
              const slotsForDay = (
                myWeekSlots.filter((s) => s.day === day).length > 0
                  ? myWeekSlots.filter((s) => s.day === day)
                  : masterTimetable.filter(
                      (s) => s.weekLabel === activeTimetableWeek && s.day === day && s.gradeSection === '9B'
                    )
              ).sort((a, b) => a.period - b.period);

              return (
                <div
                  key={day}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 space-y-2.5"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-extrabold text-xs text-navy uppercase tracking-wider">
                      {day}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">
                      {slotsForDay.filter((s) => s.status === 'COMPLETED').length}/{slotsForDay.length} Done
                    </span>
                  </div>

                  <div className="space-y-2">
                    {slotsForDay.map((slot) => {
                      const isDone = slot.status === 'COMPLETED';
                      return (
                        <div
                          key={slot.id}
                          className={`p-2.5 rounded-lg border text-xs flex items-center justify-between gap-2 transition ${
                            isDone
                              ? 'bg-emerald-50 border-emerald-200'
                              : 'bg-white border-slate-200'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center space-x-1.5">
                              <span className="font-mono font-bold text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-navy">
                                P{slot.period}
                              </span>
                              <span className="font-bold text-navy truncate">{slot.subject}</span>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-0.5">
                              Grade {slot.gradeSection} • {slot.room} • {slot.timeRange}
                            </p>
                          </div>

                          <button
                            onClick={() => togglePeriodCompletion(slot.id, teacherName)}
                            className={`px-2.5 py-1 rounded-md font-bold text-[10px] shrink-0 flex items-center space-x-1 transition cursor-pointer ${
                              isDone
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800'
                            }`}
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{isDone ? 'Completed' : 'Tick Done'}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: ALL CLASSES ROSTER CARDS */}
      {filterPeriod === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredClasses.map((cls) => {
            const isCompleted = cls.status === 'COMPLETED';
            return (
              <div
                key={cls.id}
                className={`rounded-xl border p-5 shadow-xs space-y-4 transition ${
                  isCompleted
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-extrabold text-navy text-base">{cls.subject}</h3>
                      <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        {cls.periodLabel}
                      </span>
                      {isCompleted && (
                        <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                          ✓ Completed
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{cls.track}</p>
                  </div>

                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-bold">
                    {cls.grade}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-mono text-[11px]">{cls.timeRange}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <DoorClosed className="w-3.5 h-3.5 text-slate-400" />
                    <span>{cls.room}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold text-navy">{cls.studentCount} students</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => togglePeriodCompletion(cls.id, teacherName)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isCompleted ? 'Lecture Completed ✓' : 'Tick Completed'}</span>
                  </button>

                  <button
                    onClick={() => onViewRoster(cls.id)}
                    className="px-3 py-2 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 rounded-lg text-xs font-semibold transition flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>View Roster</span>
                  </button>

                  <button
                    onClick={() => onTakeAttendance(cls.id)}
                    className="px-3 py-2 bg-[#176B87] hover:bg-[#125870] text-white rounded-lg text-xs font-semibold transition flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
                  >
                    <ClipboardCheck className="w-3.5 h-3.5" />
                    <span>Take Attendance</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CASPA SCHOOL OS AI ASSISTANT Card */}
      <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-caspaPurple text-white flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            </div>
            <span className="font-bold text-navy uppercase text-[11px] tracking-wide">
              CASPA SCHOOL OS AI ASSISTANT
            </span>
          </div>
          <span className="bg-purple-100 text-caspaPurple text-[10px] font-bold px-2 py-0.5 rounded-full">
            Active Sync
          </span>
        </div>

        <p className="text-slate-700 text-xs leading-relaxed">
          Rosters and published week-wise timetables are auto-reconciled with Admin Master Timetable &amp; Student Portals.
        </p>

        <div className="flex items-center justify-between pt-1 border-t border-purple-100 text-[11px]">
          <button
            onClick={() => showToast('Biometric discrepancies reconciled')}
            className="text-teal font-semibold hover:underline cursor-pointer"
          >
            Check discrepancies &gt;
          </button>
          <span className="text-slate-400">Updated just now</span>
        </div>
      </div>

      {/* Daily Overview Footer Box */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs text-slate-700">
        <div>
          <span className="font-bold text-navy text-sm block">Daily Overview ({selectedDay})</span>
          <span className="text-slate-500 text-[11px]">
            {dayPublishedSlots.length} published class periods • {completedDayCount} completed today
          </span>
        </div>
        <BookOpen className="w-5 h-5 text-slate-400" />
      </div>
    </div>
  );
};
