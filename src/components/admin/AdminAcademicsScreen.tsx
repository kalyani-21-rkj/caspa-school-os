import React, { useState } from 'react';
import {
  Calendar,
  Building,
  Clock,
  Plus,
  CheckCircle2,
  CalendarDays,
  FileCheck,
  Sparkles,
  Edit3,
  Trash2,
  Send,
  LayoutGrid,
  List,
  UserCheck,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MasterTimetableSlot } from '../../types';

const DAYS: MasterTimetableSlot['day'][] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const PERIOD_TIMINGS: Record<number, string> = {
  1: '08:30 - 09:15 AM',
  2: '09:20 - 10:05 AM',
  3: '10:15 - 11:00 AM',
  4: '11:05 - 11:50 AM',
  5: '12:35 - 01:20 PM',
  6: '01:25 - 02:10 PM',
  7: '02:15 - 03:00 PM',
};

const TEACHER_LIST = [
  'Mrs. Oswald',
  'Dr. Katherine Wells',
  'Dr. Alistair Ross',
  'Mr. Marcus Vance',
  'Mr. Anand Sharma',
  'Coach Briggs',
];

export const AdminAcademicsScreen: React.FC = () => {
  const {
    classSections,
    masterTimetable,
    availableTimetableWeeks,
    activeTimetableWeek,
    setActiveTimetableWeek,
    activeScheduleDay,
    setActiveScheduleDay,
    addTimetableWeek,
    addOrUpdateTimetableSlot,
    deleteTimetableSlot,
    generateWeeklyTimetable,
    publishMasterTimetable,
    togglePeriodCompletion,
    setPeriodLiveStatus,
  } = useApp();

  const [selectedSection, setSelectedSection] = useState<string>('9B');
  const selectedDay = activeScheduleDay;
  const setSelectedDay = setActiveScheduleDay;
  const [viewMode, setViewMode] = useState<'day' | 'weekGrid'>('day');

  // Modals
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [isNewWeekModalOpen, setIsNewWeekModalOpen] = useState(false);

  // New Week Input
  const [newWeekInput, setNewWeekInput] = useState('Week 11 (Nov 16 - Nov 21, 2026)');

  // Generate Weekly Timetable Form State
  const [genWeek, setGenWeek] = useState<string>(activeTimetableWeek);
  const [genSection, setGenSection] = useState<string>('9B');
  const [genIncludeSaturday, setGenIncludeSaturday] = useState<boolean>(true);
  const [genPeriodsPerDay, setGenPeriodsPerDay] = useState<number>(7);
  const [genAutoPublish, setGenAutoPublish] = useState<boolean>(true);

  // Add / Edit Slot Form State
  const [editingSlotId, setEditingSlotId] = useState<string | undefined>(undefined);
  const [slotDay, setSlotDay] = useState<MasterTimetableSlot['day']>('Monday');
  const [slotApplyAllWeekdays, setSlotApplyAllWeekdays] = useState<boolean>(false);
  const [slotPeriod, setSlotPeriod] = useState<number>(1);
  const [slotTimeRange, setSlotTimeRange] = useState<string>(PERIOD_TIMINGS[1]);
  const [slotSubject, setSlotSubject] = useState<string>('Mathematics (Calculus Core)');
  const [slotUnitTopic, setSlotUnitTopic] = useState<string>('Quadratic Equation Factorization Ch. 4.2');
  const [slotTeacher, setSlotTeacher] = useState<string>('Mrs. Oswald');
  const [slotRoom, setSlotRoom] = useState<string>('Room 204');
  const [slotPublishImmediately, setSlotPublishImmediately] = useState<boolean>(true);

  // Filtered slots for current Week & Section
  const weekSectionSlots = masterTimetable.filter(
    (s) => s.weekLabel === activeTimetableWeek && s.gradeSection === selectedSection
  );

  const daySlots = weekSectionSlots
    .filter((s) => s.day === selectedDay)
    .sort((a, b) => a.period - b.period);

  const totalWeekSlots = weekSectionSlots.length;
  const publishedWeekSlots = weekSectionSlots.filter((s) => s.isPublished).length;
  const completedWeekSlots = weekSectionSlots.filter((s) => s.status === 'COMPLETED').length;

  const openAddSlotModal = (presetDay?: MasterTimetableSlot['day'], presetPeriod?: number) => {
    const nextPeriod = presetPeriod || (daySlots.length > 0 ? Math.min(7, daySlots.length + 1) : 1);
    setEditingSlotId(undefined);
    setSlotDay(presetDay || selectedDay);
    setSlotApplyAllWeekdays(false);
    setSlotPeriod(nextPeriod);
    setSlotTimeRange(PERIOD_TIMINGS[nextPeriod] || '08:30 - 09:15 AM');
    setSlotSubject('Mathematics (Calculus Core)');
    setSlotUnitTopic('Chapter 5: Advanced Functions & Problem Solving');
    setSlotTeacher('Mrs. Oswald');
    setSlotRoom(`Room ${selectedSection === '9B' ? '204' : '206'}`);
    setSlotPublishImmediately(true);
    setIsSlotModalOpen(true);
  };

  const openEditSlotModal = (slot: MasterTimetableSlot) => {
    setEditingSlotId(slot.id);
    setSlotDay(slot.day);
    setSlotApplyAllWeekdays(false);
    setSlotPeriod(slot.period);
    setSlotTimeRange(slot.timeRange);
    setSlotSubject(slot.subject);
    setSlotUnitTopic(slot.unitTopic);
    setSlotTeacher(slot.teacher);
    setSlotRoom(slot.room);
    setSlotPublishImmediately(slot.isPublished);
    setIsSlotModalOpen(true);
  };

  const handleSaveSlot = (e: React.FormEvent) => {
    e.preventDefault();
    addOrUpdateTimetableSlot({
      id: editingSlotId,
      weekLabel: activeTimetableWeek,
      gradeSection: selectedSection,
      day: slotDay,
      period: slotPeriod,
      timeRange: slotTimeRange,
      subject: slotSubject,
      unitTopic: slotUnitTopic,
      teacher: slotTeacher,
      room: slotRoom,
      isPublished: slotPublishImmediately,
      status: 'UPCOMING',
      applyToAllWeekdays: slotApplyAllWeekdays,
    });
    setIsSlotModalOpen(false);
  };

  const handleRunWeeklyGenerator = (e: React.FormEvent) => {
    e.preventDefault();
    const targetDays: MasterTimetableSlot['day'][] = genIncludeSaturday
      ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    setActiveTimetableWeek(genWeek);
    setSelectedSection(genSection);
    generateWeeklyTimetable({
      weekLabel: genWeek,
      gradeSection: genSection,
      days: targetDays,
      periodsPerDay: genPeriodsPerDay,
      autoPublish: genAutoPublish,
    });
    setIsGenerateModalOpen(false);
  };

  const handleCreateNewWeek = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeekInput.trim()) return;
    addTimetableWeek(newWeekInput.trim());
    setGenWeek(newWeekInput.trim());
    setIsNewWeekModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-teal font-semibold uppercase tracking-wider mb-1">
            <span>Academic Affairs &amp; Curriculum Governance • Master Timetable Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-navy tracking-tight">
            Curriculum, Sections &amp; Week-Wise Master Timetable
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Generate week-wise schedules, build custom period slots, publish directly to teachers, and track live lecture completion.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setGenWeek(activeTimetableWeek);
              setGenSection(selectedSection);
              setIsGenerateModalOpen(true);
            }}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-caspaPurple border border-purple-200 text-xs font-bold transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Week-Wise Timetable</span>
          </button>

          <button
            onClick={() => openAddSlotModal()}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-navy border border-slate-200 text-xs font-bold transition shadow-2xs cursor-pointer"
          >
            <Plus className="w-4 h-4 text-teal" />
            <span>Build / Add Period Slot</span>
          </button>

          <button
            onClick={() => publishMasterTimetable(activeTimetableWeek, selectedSection)}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#176B87] hover:bg-[#125870] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Master Timetable</span>
          </button>
        </div>
      </div>

      {/* Week Selector & Live Completion Telemetry Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold text-navy uppercase tracking-wider flex items-center space-x-1.5">
            <CalendarDays className="w-4 h-4 text-teal" />
            <span>Academic Week:</span>
          </span>
          <select
            value={activeTimetableWeek}
            onChange={(e) => setActiveTimetableWeek(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-navy focus:outline-none focus:border-teal"
          >
            {availableTimetableWeeks.map((wk) => (
              <option key={wk} value={wk}>
                {wk}
              </option>
            ))}
          </select>
          <button
            onClick={() => setIsNewWeekModalOpen(true)}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy text-xs font-bold transition flex items-center space-x-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-teal" />
            <span>New Week</span>
          </button>
        </div>

        {/* Live Status Counters */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-2">
            <span className="text-slate-500 font-medium">Section {selectedSection} Weekly Slots:</span>
            <span className="font-extrabold text-navy font-mono">{totalWeekSlots}</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center space-x-2">
            <span className="text-sky-700 font-medium">Published to Teachers:</span>
            <span className="font-extrabold text-sky-900 font-mono">
              {publishedWeekSlots} / {totalWeekSlots}
            </span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center space-x-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-800 font-medium">Lectures Ticked Completed:</span>
            <span className="font-extrabold text-emerald-900 font-mono">
              {completedWeekSlots} / {totalWeekSlots}
            </span>
          </div>
        </div>
      </div>

      {/* Class Sections Grid */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-sm text-navy flex items-center space-x-2">
          <Building className="w-4 h-4 text-teal" />
          <span>Select Class Section to Configure &amp; Publish Timetable</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {classSections.map((sec) => {
            const secSlots = masterTimetable.filter(
              (s) => s.weekLabel === activeTimetableWeek && s.gradeSection === sec.section
            );
            const secCompleted = secSlots.filter((s) => s.status === 'COMPLETED').length;

            return (
              <div
                key={sec.id}
                onClick={() => setSelectedSection(sec.section)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-3 ${
                  selectedSection === sec.section
                    ? 'border-teal bg-teal/5 shadow-xs ring-2 ring-teal/15'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-navy">
                      {sec.grade} - Section {sec.section}
                    </h4>
                    <span className="text-[11px] text-teal font-semibold">
                      Class Teacher: {sec.classTeacher}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {sec.room}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Enrolled Capacity</span>
                    <span className="font-bold text-navy">
                      {sec.studentCount} / {sec.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-teal h-full rounded-full"
                      style={{ width: `${(sec.studentCount / sec.capacity) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <span>{secSlots.length} Weekly Periods Configured</span>
                  <span className="font-bold text-emerald-700">
                    {secCompleted} Lectures Completed
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Master Timetable Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-teal" />
              <h3 className="font-extrabold text-sm text-navy">
                Section {selectedSection} Master Timetable • {activeTimetableWeek}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Live Teacher Sync Enabled
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any period to edit, or use the completion checkbox to verify teacher lecture status.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Day vs Full Week View Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setViewMode('day')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center space-x-1 transition cursor-pointer ${
                  viewMode === 'day' ? 'bg-white text-navy shadow-2xs' : 'text-slate-600'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Day View</span>
              </button>
              <button
                onClick={() => setViewMode('weekGrid')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center space-x-1 transition cursor-pointer ${
                  viewMode === 'weekGrid' ? 'bg-white text-navy shadow-2xs' : 'text-slate-600'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Full Week Matrix (Mon–Sat)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Day Selector Pills (when in Day View) */}
        {viewMode === 'day' && (
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
              {DAYS.map((d) => {
                const countForDay = weekSectionSlots.filter((s) => s.day === d).length;
                const doneForDay = weekSectionSlots.filter(
                  (s) => s.day === d && s.status === 'COMPLETED'
                ).length;
                return (
                  <button
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`px-3 py-1.5 text-xs rounded-xl font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                      selectedDay === d
                        ? 'bg-[#123B5D] text-white shadow-xs'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <span>{d}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        selectedDay === d
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200/80 text-slate-600'
                      }`}
                    >
                      {doneForDay}/{countForDay}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => openAddSlotModal(selectedDay)}
              className="text-xs font-bold text-teal hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Period to {selectedDay}</span>
            </button>
          </div>
        )}

        {/* VIEW 1: DAY-WISE SLOTS LIST */}
        {viewMode === 'day' ? (
          daySlots.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-3">
              <Calendar className="w-8 h-8 text-slate-400 mx-auto" />
              <div>
                <h4 className="font-extrabold text-sm text-navy">
                  No Timetable Slots Configured for Section {selectedSection} on {selectedDay}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Generate a full week-wise timetable automatically or add individual period slots below.
                </p>
              </div>
              <div className="flex items-center justify-center space-x-2 pt-1">
                <button
                  onClick={() => {
                    setGenWeek(activeTimetableWeek);
                    setGenSection(selectedSection);
                    setIsGenerateModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#176B87] hover:bg-[#125870] text-white text-xs font-bold transition cursor-pointer"
                >
                  Generate Full Week Timetable for Section {selectedSection}
                </button>
                <button
                  onClick={() => openAddSlotModal(selectedDay, 1)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-navy text-xs font-bold transition cursor-pointer"
                >
                  + Add Single Period
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {daySlots.map((slot) => {
                const isCompleted = slot.status === 'COMPLETED';
                return (
                  <div
                    key={slot.id}
                    className={`py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3 rounded-xl transition ${
                      isCompleted ? 'bg-emerald-50/40' : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <div className="flex items-start sm:items-center space-x-4">
                      <div
                        className={`w-11 h-11 rounded-xl border flex flex-col items-center justify-center shrink-0 font-bold ${
                          isCompleted
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'bg-slate-100 border-slate-200 text-navy'
                        }`}
                      >
                        <span className="text-[9px] uppercase font-mono opacity-80">PER</span>
                        <span className="text-sm leading-none">{slot.period}</span>
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-extrabold text-xs sm:text-sm text-navy">
                            {slot.subject}
                          </h4>
                          {slot.isPublished ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                              Published to Faculty
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                              Draft (Unpublished)
                            </span>
                          )}
                          {isCompleted && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>
                                Completed by {slot.completedByTeacher || slot.teacher}
                                {slot.completedAt ? ` at ${slot.completedAt}` : ''}
                              </span>
                            </span>
                          )}
                        </div>

                        {slot.unitTopic && (
                          <p className="text-xs text-teal font-semibold mt-0.5">{slot.unitTopic}</p>
                        )}

                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span className="font-mono font-semibold text-slate-600">
                            {slot.timeRange}
                          </span>
                          <span>•</span>
                          <span className="font-bold text-navy flex items-center space-x-1">
                            <UserCheck className="w-3 h-3 text-teal" />
                            <span>{slot.teacher}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side Controls */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono text-[11px] font-bold text-teal bg-teal/10 px-2.5 py-1 rounded-lg">
                        {slot.room}
                      </span>

                      <button
                        onClick={() =>
                          setPeriodLiveStatus(
                            slot.id,
                            slot.status === 'LIVE_NOW' ? 'UPCOMING' : 'LIVE_NOW'
                          )
                        }
                        className={`px-2.5 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer ${
                          slot.status === 'LIVE_NOW'
                            ? 'bg-[#176B87] text-white shadow-2xs ring-2 ring-teal/30'
                            : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200'
                        }`}
                        title="Set as Active Live Class on Student Dashboard"
                      >
                        {slot.status === 'LIVE_NOW' ? '● Live Now' : 'Set Live Now'}
                      </button>

                      <button
                        onClick={() => togglePeriodCompletion(slot.id, slot.teacher)}
                        className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer ${
                          isCompleted
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs'
                            : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200'
                        }`}
                        title="Toggle Lecture Completion Status"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isCompleted ? 'Lecture Completed ✓' : 'Tick Completed'}</span>
                      </button>

                      <button
                        onClick={() => openEditSlotModal(slot)}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                        title="Edit Period Slot"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => deleteTimetableSlot(slot.id)}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-500 transition cursor-pointer"
                        title="Delete Period Slot"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          /* VIEW 2: FULL WEEK MATRIX (MON - SAT) */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200 text-slate-600">
                  <th className="py-2.5 px-3 font-extrabold text-navy w-24">Period</th>
                  {DAYS.map((day) => (
                    <th key={day} className="py-2.5 px-3 font-extrabold text-navy min-w-[160px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[1, 2, 3, 4, 5, 6, 7].map((periodNum) => (
                  <tr key={periodNum} className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-mono font-bold text-navy bg-slate-50/40 align-top">
                      <div className="text-xs font-extrabold">Period {periodNum}</div>
                      <div className="text-[10px] text-slate-400">{PERIOD_TIMINGS[periodNum]}</div>
                    </td>
                    {DAYS.map((day) => {
                      const cellSlot = weekSectionSlots.find(
                        (s) => s.day === day && s.period === periodNum
                      );
                      if (!cellSlot) {
                        return (
                          <td key={day} className="py-2.5 px-2 align-top">
                            <button
                              onClick={() => openAddSlotModal(day, periodNum)}
                              className="w-full h-16 rounded-xl border border-dashed border-slate-200 hover:border-teal hover:bg-teal/5 text-slate-400 hover:text-teal flex items-center justify-center text-[11px] font-semibold transition cursor-pointer"
                            >
                              + Assign P{periodNum}
                            </button>
                          </td>
                        );
                      }
                      const isDone = cellSlot.status === 'COMPLETED';
                      return (
                        <td key={day} className="py-2.5 px-2 align-top">
                          <div
                            className={`p-2.5 rounded-xl border space-y-1.5 transition ${
                              isDone
                                ? 'bg-emerald-50/70 border-emerald-300'
                                : 'bg-white border-slate-200 hover:border-teal'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-1">
                              <span className="font-extrabold text-navy text-[11px] leading-tight line-clamp-1">
                                {cellSlot.subject}
                              </span>
                              <button
                                onClick={() => openEditSlotModal(cellSlot)}
                                className="text-slate-400 hover:text-navy shrink-0 cursor-pointer"
                                title="Edit Slot"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="text-[10px] text-slate-600 font-semibold truncate">
                              {cellSlot.teacher}
                            </div>
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                                {cellSlot.room}
                              </span>
                              <button
                                onClick={() => togglePeriodCompletion(cellSlot.id, cellSlot.teacher)}
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center space-x-1 cursor-pointer ${
                                  isDone
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-800'
                                }`}
                              >
                                <CheckCircle2 className="w-2.5 h-2.5" />
                                <span>{isDone ? 'Done' : 'Tick'}</span>
                              </button>
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
            <p className="text-[11px] text-slate-500">
              Formative evaluation across Grades 8-12 with digital grading.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-bold text-indigo-600 uppercase">Oct 14 - Oct 16</span>
            <h4 className="font-bold text-navy">Parent-Teacher Conference</h4>
            <p className="text-[11px] text-slate-500">
              Individual consultations scheduled through the Parent Portal.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-bold text-amber-600 uppercase">Nov 23 - Dec 04</span>
            <h4 className="font-bold text-navy">Term 2 Final Examinations</h4>
            <p className="text-[11px] text-slate-500">
              Summative final evaluations and honors rank generation.
            </p>
          </div>
        </div>
      </div>

      {/* MODAL 1: WEEK-WISE TIMETABLE GENERATOR */}
      {isGenerateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-caspaPurple flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-navy">
                    Generate Week-Wise Master Timetable
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Auto-allocate conflict-free periods, subjects, rooms &amp; faculty for the entire week.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsGenerateModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRunWeeklyGenerator} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-navy mb-1">Select Academic Week</label>
                <select
                  value={genWeek}
                  onChange={(e) => setGenWeek(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-navy focus:outline-none focus:border-teal"
                >
                  {availableTimetableWeeks.map((wk) => (
                    <option key={wk} value={wk}>
                      {wk}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-navy mb-1">Target Class Section</label>
                  <select
                    value={genSection}
                    onChange={(e) => setGenSection(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-navy focus:outline-none focus:border-teal"
                  >
                    {classSections.map((sec) => (
                      <option key={sec.id} value={sec.section}>
                        {sec.grade} - Section {sec.section}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-navy mb-1">Periods Per Day</label>
                  <select
                    value={genPeriodsPerDay}
                    onChange={(e) => setGenPeriodsPerDay(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-navy focus:outline-none focus:border-teal"
                  >
                    <option value={5}>5 Periods / Day</option>
                    <option value={6}>6 Periods / Day</option>
                    <option value={7}>7 Periods / Day (Standard)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={genIncludeSaturday}
                    onChange={(e) => setGenIncludeSaturday(e.target.checked)}
                    className="rounded text-teal focus:ring-teal"
                  />
                  <span className="font-semibold text-navy">
                    Include Saturday Half-Day Schedule (4 Periods)
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={genAutoPublish}
                    onChange={(e) => setGenAutoPublish(e.target.checked)}
                    className="rounded text-teal focus:ring-teal"
                  />
                  <span className="font-semibold text-navy">
                    Publish immediately to Teachers &amp; Students upon generation
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsGenerateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#176B87] hover:bg-[#125870] text-white font-bold shadow-xs flex items-center space-x-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate &amp; Publish Week Timetable</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: BUILD / EDIT SINGLE OR WEEKDAY PERIOD SLOT */}
      {isSlotModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-navy">
                  {editingSlotId ? 'Edit Timetable Period Slot' : 'Build New Timetable Period Slot'}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Section {selectedSection} • {activeTimetableWeek}
                </p>
              </div>
              <button
                onClick={() => setIsSlotModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSlot} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-navy mb-1">Day of Week</label>
                  <select
                    value={slotDay}
                    onChange={(e) => setSlotDay(e.target.value as MasterTimetableSlot['day'])}
                    disabled={slotApplyAllWeekdays}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-navy focus:outline-none focus:border-teal disabled:opacity-50"
                  >
                    {DAYS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-navy mb-1">Period Number</label>
                  <select
                    value={slotPeriod}
                    onChange={(e) => {
                      const p = Number(e.target.value);
                      setSlotPeriod(p);
                      if (PERIOD_TIMINGS[p]) setSlotTimeRange(PERIOD_TIMINGS[p]);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-navy focus:outline-none focus:border-teal"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((p) => (
                      <option key={p} value={p}>
                        Period {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-navy mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={slotTimeRange}
                    onChange={(e) => setSlotTimeRange(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-navy focus:outline-none focus:border-teal"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-navy mb-1">Assigned Faculty / Teacher</label>
                  <select
                    value={slotTeacher}
                    onChange={(e) => setSlotTeacher(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-navy focus:outline-none focus:border-teal"
                  >
                    {TEACHER_LIST.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block font-bold text-navy mb-1">Subject Title</label>
                  <input
                    type="text"
                    value={slotSubject}
                    onChange={(e) => setSlotSubject(e.target.value)}
                    placeholder="e.g. Mathematics (Calculus Core)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-navy focus:outline-none focus:border-teal"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-navy mb-1">Room / Lab</label>
                  <input
                    type="text"
                    value={slotRoom}
                    onChange={(e) => setSlotRoom(e.target.value)}
                    placeholder="Room 204"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-navy focus:outline-none focus:border-teal"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-navy mb-1">Lecture Unit / Topic Plan</label>
                <input
                  type="text"
                  value={slotUnitTopic}
                  onChange={(e) => setSlotUnitTopic(e.target.value)}
                  placeholder="e.g. Quadratic Equation Factorization Ch. 4.2"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-navy focus:outline-none focus:border-teal"
                />
              </div>

              <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                {!editingSlotId && (
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={slotApplyAllWeekdays}
                      onChange={(e) => setSlotApplyAllWeekdays(e.target.checked)}
                      className="rounded text-teal focus:ring-teal"
                    />
                    <span className="font-semibold text-navy">
                      Repeat this Period {slotPeriod} slot across all Weekdays (Monday – Friday)
                    </span>
                  </label>
                )}

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={slotPublishImmediately}
                    onChange={(e) => setSlotPublishImmediately(e.target.checked)}
                    className="rounded text-teal focus:ring-teal"
                  />
                  <span className="font-semibold text-navy">
                    Publish immediately to {slotTeacher}&apos;s &amp; Students&apos; Timetable
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsSlotModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#176B87] hover:bg-[#125870] text-white font-bold shadow-xs cursor-pointer"
                >
                  {editingSlotId ? 'Update & Publish Slot' : 'Save & Publish Period Slot'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: CREATE NEW ACADEMIC WEEK */}
      {isNewWeekModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-navy">Create New Academic Week</h3>
              <button
                onClick={() => setIsNewWeekModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewWeek} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-navy mb-1">Academic Week Label &amp; Dates</label>
                <input
                  type="text"
                  value={newWeekInput}
                  onChange={(e) => setNewWeekInput(e.target.value)}
                  placeholder="e.g. Week 11 (Nov 16 - Nov 21, 2026)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-navy focus:outline-none focus:border-teal"
                  required
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewWeekModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#176B87] hover:bg-[#125870] text-white font-bold cursor-pointer"
                >
                  Create Week
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
