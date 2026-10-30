import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  Printer,
  Plus,
  Moon,
  Users,
  MoreVertical,
  Check,
  Building,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface VicePrincipalTimetableScreenProps {
  onBack?: () => void;
}

export const VicePrincipalTimetableScreen: React.FC<VicePrincipalTimetableScreenProps> = ({
  onBack,
}) => {
  const {
    vpConflicts,
    resolveVpConflict,
    addPeriodOverride,
    masterTimetable,
    activeTimetableWeek,
    activeScheduleDay,
    setActiveScheduleDay,
    togglePeriodCompletion,
    setPeriodLiveStatus,
    showToast,
  } = useApp();

  const [selectedGrade, setSelectedGrade] = useState('Grade 9');
  const [selectedSec, setSelectedSec] = useState('Sec B');
  const [viewMode, setViewMode] = useState<'class' | 'teacher'>('class');

  // Interactive Period State
  const [p2Assigned, setP2Assigned] = useState(false);
  const [p4ConflictResolved, setP4ConflictResolved] = useState(false);

  // Modals
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);
  const [overridePeriod, setOverridePeriod] = useState('Period 2 (09:20 - 10:05 AM)');
  const [overrideSubject, setOverrideSubject] = useState('Advanced Robotics & AI Lab');
  const [overrideTopic, setOverrideTopic] = useState('Autonomous Sensor Integration & Python Control');
  const [overrideClass, setOverrideClass] = useState('Grade 9B');
  const [overrideRoom, setOverrideRoom] = useState('STEM Lab 204');
  const [overrideTeacher, setOverrideTeacher] = useState('Mr. Anand Sharma');

  const activeConflicts = vpConflicts.filter((c) => c.status === 'ACTIVE');

  const days: { day: string; date: string; id: typeof activeScheduleDay; month?: string }[] = [
    { day: 'MON', date: '26', id: 'Monday', month: 'Oct' },
    { day: 'TUE', date: '27', id: 'Tuesday' },
    { day: 'WED', date: '28', id: 'Wednesday' },
    { day: 'THU', date: '29', id: 'Thursday' },
    { day: 'FRI', date: '30', id: 'Friday' },
    { day: 'SAT', date: '31', id: 'Saturday' },
  ];

  // Resolve target section code (e.g. "Grade 9" + "Sec B" -> "9B")
  const gradeNum = selectedGrade.replace('Grade ', '').trim();
  const secLetter = selectedSec.replace('Sec ', '').trim();
  const currentSectionCode = `${gradeNum}${secLetter}`;

  const liveSectionDaySlots = masterTimetable
    .filter(
      (s) =>
        s.weekLabel === activeTimetableWeek &&
        s.gradeSection === (currentSectionCode === '9B' || currentSectionCode === '10A' ? currentSectionCode : '9B') &&
        s.day === activeScheduleDay
    )
    .sort((a, b) => a.period - b.period);

  const handleResolveLabConflict = () => {
    resolveVpConflict('conf-1', 'Relocated Grade 12 Chemistry to Lab 2 (Annex).');
    setP4ConflictResolved(true);
  };

  const handleResolveCoverageGap = () => {
    resolveVpConflict('conf-2', 'Assigned Ms. Taylor as official substitute teacher.');
  };

  const handleSaveOverride = (e: React.FormEvent) => {
    e.preventDefault();
    addPeriodOverride({
      period: overridePeriod,
      class: overrideClass,
      room: overrideRoom,
      teacher: overrideTeacher,
      subject: overrideSubject,
      unitTopic: overrideTopic,
      day: activeScheduleDay,
    });
    if (overridePeriod.includes('2')) setP2Assigned(true);
    setIsOverrideModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Header with Back Navigation (Matching Image 4) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#0E2C48] tracking-tight">
                Timetable
              </h1>
              <span className="text-[10px] font-extrabold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                VP Module
              </span>
            </div>
            <p className="text-xs text-slate-400 font-semibold">Academic Operations</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => showToast('Search timetable slots')}
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 shadow-2xs"
          >
            <Search className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#0E2C48] text-white flex items-center justify-center font-bold text-xs">
            SJ
          </div>
        </div>
      </div>

      {/* Filter Chips & View Mode Toggle (Matching Image 4) */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs font-bold">
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-teal cursor-pointer shadow-2xs focus:outline-none"
          >
            <option>Grade 10</option>
            <option>Grade 11</option>
            <option>Grade 9</option>
            <option>Grade 12</option>
          </select>

          <select
            value={selectedSec}
            onChange={(e) => setSelectedSec(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-teal cursor-pointer shadow-2xs focus:outline-none"
          >
            <option>Sec A</option>
            <option>Sec B</option>
            <option>Sec C</option>
          </select>
        </div>

        {/* By Class / By Teacher Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setViewMode('class')}
            className={`px-3 py-1 rounded-lg transition ${
              viewMode === 'class'
                ? 'bg-teal text-white shadow-xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            By Class
          </button>
          <button
            onClick={() => setViewMode('teacher')}
            className={`px-3 py-1 rounded-lg transition ${
              viewMode === 'teacher'
                ? 'bg-teal text-white shadow-xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            By Teacher
          </button>
        </div>
      </div>

      {/* 3 KPI Stat Boxes (Matching Image 4) */}
      <div className="grid grid-cols-3 gap-3">
        {/* TOTAL PERIODS */}
        <div className="bg-[#0E2C48] text-white p-3.5 rounded-2xl shadow-xs">
          <div className="text-[10px] uppercase font-bold text-sky-300">Total Periods</div>
          <div className="text-xl sm:text-2xl font-black mt-0.5">
            210 <span className="text-xs font-normal text-sky-200">/wk</span>
          </div>
        </div>

        {/* CONFLICTS */}
        <div className="bg-rose-50 text-rose-900 border border-rose-100 p-3.5 rounded-2xl shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-rose-600">Conflicts</div>
          <div className="text-xl sm:text-2xl font-black text-rose-600 mt-0.5 flex items-center space-x-1">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{p4ConflictResolved ? '1' : '2'}</span>
          </div>
        </div>

        {/* COVERAGE */}
        <div className="bg-sky-50 text-sky-900 border border-sky-100 p-3.5 rounded-2xl shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-sky-600">Coverage</div>
          <div className="text-xl sm:text-2xl font-black mt-0.5 flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
            <span>98%</span>
          </div>
        </div>
      </div>

      {/* Date Carousel (Synced with Student Today's Schedule Day) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {days.map((d) => {
          const isSelected = activeScheduleDay === d.id;
          return (
            <button
              key={d.id}
              onClick={() => setActiveScheduleDay(d.id)}
              className={`flex-1 min-w-[54px] p-2.5 rounded-2xl text-center transition cursor-pointer ${
                isSelected
                  ? 'bg-teal text-white shadow-md font-bold'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="text-[10px] uppercase font-bold opacity-80">{d.day}</div>
              {d.month && <div className="text-[9px] font-black">{d.month}</div>}
              <div className="text-base font-black mt-0.5">{d.date}</div>
            </button>
          );
        })}
      </div>

      {/* Live Class Timetable Schedule List (Directly Synced with Student Today's Class Schedule) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="text-[#0E2C48] font-extrabold text-sm">
              Live Class Schedule ({selectedGrade} {selectedSec} • {activeScheduleDay})
            </span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
              {liveSectionDaySlots.length} Periods • Synced to Student Panel
            </span>
          </div>
          <span className="text-[11px] text-slate-400">Bell Schedule: Normal (45m)</span>
        </div>

        {liveSectionDaySlots.map((slot) => {
          const isLive = slot.status === 'LIVE_NOW';
          const isCompleted = slot.status === 'COMPLETED';
          return (
            <div
              key={slot.id}
              className={`p-4 rounded-2xl border shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition ${
                isLive
                  ? 'border-2 border-teal bg-teal/5'
                  : isCompleted
                  ? 'border-emerald-200 bg-emerald-50/30'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                    P{slot.period}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{slot.timeRange}</span>
                  <span className="text-xs font-bold text-slate-600">{slot.room}</span>
                  {isLive && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-teal text-white">
                      ● LIVE NOW
                    </span>
                  )}
                  {isCompleted && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      ✓ Completed
                    </span>
                  )}
                </div>
                <h4 className="font-extrabold text-sm text-[#0E2C48]">{slot.subject}</h4>
                {slot.unitTopic && (
                  <p className="text-xs font-semibold text-teal">{slot.unitTopic}</p>
                )}
                <div className="text-xs text-slate-500">
                  {slot.teacher} • Grade {slot.gradeSection}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setPeriodLiveStatus(slot.id, isLive ? 'UPCOMING' : 'LIVE_NOW')
                  }
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isLive
                      ? 'bg-teal text-white'
                      : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200'
                  }`}
                >
                  {isLive ? '● Live Now' : 'Set Live'}
                </button>

                <button
                  type="button"
                  onClick={() => togglePeriodCompletion(slot.id, slot.teacher)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 hover:bg-emerald-50 text-slate-700'
                  }`}
                >
                  {isCompleted ? 'Done ✓' : 'Mark Done'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOverridePeriod(`Period ${slot.period} (${slot.timeRange})`);
                    setOverrideSubject(slot.subject);
                    setOverrideTopic(slot.unitTopic || '');
                    setOverrideClass(`Grade ${slot.gradeSection}`);
                    setOverrideRoom(slot.room);
                    setOverrideTeacher(slot.teacher);
                    setIsOverrideModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition cursor-pointer"
                >
                  Change / Override
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CASPA Copilot Timetable Optimization Card (Matching Image 4) */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50/60 p-4 rounded-2xl border border-purple-200 flex items-center justify-between shadow-2xs">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#5B3FA3] text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-[#2B1B54]">
              Timetable Optimization Ready
            </h4>
            <p className="text-[11px] text-slate-600">
              CASPA Copilot found 1 quick resolution for room utilization.
            </p>
          </div>
        </div>
        <button
          onClick={handleResolveLabConflict}
          className="px-3.5 py-1.5 rounded-xl bg-[#5B3FA3] hover:bg-[#4a2e8c] text-white text-xs font-bold transition shadow-xs shrink-0"
        >
          Review
        </button>
      </div>

      {/* Scheduling Conflicts (Matching Image 4) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-rose-600 font-extrabold text-sm sm:text-base">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Scheduling Conflicts</span>
          </div>
          <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
            {p4ConflictResolved ? '1 Active Alert' : '2 Active Alerts'}
          </span>
        </div>
        <p className="text-xs text-slate-400 font-semibold">Requires Administrative Action</p>

        <div className="space-y-3 pt-1">
          {/* Conflict 1 */}
          {!p4ConflictResolved && (
            <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-extrabold text-sm text-[#0E2C48]">Lab 3B Double Booking</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Period 4 Grade 11 Physics &amp; Grade 12 Chemistry room clash. Both booked full...
                </p>
              </div>
              <button
                onClick={handleResolveLabConflict}
                className="text-xs font-bold text-teal hover:underline flex items-center space-x-1 shrink-0"
              >
                <span>Resolve</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Conflict 2 */}
          <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-extrabold text-sm text-[#0E2C48]">Coverage Gap</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Grade 10B Period 2 English substitute confirmation pending. Class roster is...
              </p>
            </div>
            <button
              onClick={handleResolveCoverageGap}
              className="text-xs font-bold text-teal hover:underline flex items-center space-x-1 shrink-0"
            >
              <span>Resolve</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons: Add Period Override & Print (Matching Image 4) */}
      <div className="flex items-center space-x-3 pt-2">
        <button
          onClick={() => setIsOverrideModalOpen(true)}
          className="flex-1 py-3.5 rounded-2xl bg-[#0E2C48] hover:bg-[#123B5D] text-white text-xs sm:text-sm font-extrabold flex items-center justify-center space-x-2 transition shadow-md"
        >
          <Plus className="w-4 h-4 text-cyan-300" />
          <span>Add Period Override</span>
        </button>

        <button
          onClick={() => showToast('Printing timetable master schedule...')}
          className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition shadow-2xs"
          title="Print Master Schedule"
        >
          <Printer className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* Modal: Period Override Form */}
      {isOverrideModalOpen && (
        <form onSubmit={handleSaveOverride} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-[#0E2C48]">
                Authorize Timetable Period Override
              </h3>
              <button
                type="button"
                onClick={() => setIsOverrideModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#0E2C48] mb-1">Period Slot</label>
                <select
                  value={overridePeriod}
                  onChange={(e) => setOverridePeriod(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                >
                  <option>Period 1 (08:30 - 09:15 AM)</option>
                  <option>Period 2 (09:20 - 10:05 AM)</option>
                  <option>Period 3 (10:15 - 11:00 AM)</option>
                  <option>Period 4 (11:05 - 11:50 AM)</option>
                  <option>Period 5 (12:35 - 01:20 PM)</option>
                  <option>Period 6 (01:25 - 02:10 PM)</option>
                  <option>Period 7 (02:15 - 03:00 PM)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0E2C48] mb-1">Subject Name</label>
                <input
                  type="text"
                  value={overrideSubject}
                  onChange={(e) => setOverrideSubject(e.target.value)}
                  placeholder="e.g., Advanced Physics (Thermodynamics)"
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0E2C48] mb-1">Unit / Lecture Topic</label>
                <input
                  type="text"
                  value={overrideTopic}
                  onChange={(e) => setOverrideTopic(e.target.value)}
                  placeholder="e.g., Chapter 4: Heat Engines & Entropy"
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0E2C48] mb-1">Class / Cohort</label>
                <input
                  type="text"
                  value={overrideClass}
                  onChange={(e) => setOverrideClass(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0E2C48] mb-1">Room / Laboratory</label>
                <input
                  type="text"
                  value={overrideRoom}
                  onChange={(e) => setOverrideRoom(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0E2C48] mb-1">Assigned Teacher</label>
                <input
                  type="text"
                  value={overrideTeacher}
                  onChange={(e) => setOverrideTeacher(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setIsOverrideModalOpen(false)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-teal hover:bg-teal/90 text-white text-xs font-bold transition shadow-xs"
              >
                Commit Override
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
