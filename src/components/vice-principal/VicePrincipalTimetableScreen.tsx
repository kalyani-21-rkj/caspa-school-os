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
  const { vpConflicts, resolveVpConflict, addPeriodOverride, showToast } = useApp();

  const [selectedGrade, setSelectedGrade] = useState('Grade 10');
  const [selectedSec, setSelectedSec] = useState('Sec A');
  const [viewMode, setViewMode] = useState<'class' | 'teacher'>('class');
  const [selectedDay, setSelectedDay] = useState('Wed 24');

  // Interactive Period State
  const [p2Assigned, setP2Assigned] = useState(false);
  const [p4ConflictResolved, setP4ConflictResolved] = useState(false);

  // Modals
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);
  const [overridePeriod, setOverridePeriod] = useState('Period 2');
  const [overrideClass, setOverrideClass] = useState('Grade 10A');
  const [overrideRoom, setOverrideRoom] = useState('Room 205');
  const [overrideTeacher, setOverrideTeacher] = useState('Ms. Taylor (English)');

  const activeConflicts = vpConflicts.filter(c => c.status === 'ACTIVE');

  const days = [
    { day: 'MON', date: '22', id: 'Mon 22' },
    { day: 'TUE', date: '23', id: 'Tue 23' },
    { day: 'WED', date: '24', id: 'Wed 24', month: 'Sep' },
    { day: 'THU', date: '25', id: 'Thu 25' },
    { day: 'FRI', date: '26', id: 'Fri 26' },
    { day: 'SAT', date: '27', id: 'Sat 27' },
  ];

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
    });
    if (overridePeriod === 'Period 2') setP2Assigned(true);
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

      {/* Date Carousel (Matching Image 4) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {days.map((d) => {
          const isSelected = selectedDay === d.id;
          return (
            <button
              key={d.id}
              onClick={() => setSelectedDay(d.id)}
              className={`flex-1 min-w-[54px] p-2.5 rounded-2xl text-center transition ${
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

      {/* Class Timetable Schedule List (Matching Image 4) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="text-[#0E2C48] font-extrabold text-sm">Class Timetable</span>
            <span className="text-[10px] bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded-full">
              6 Periods
            </span>
          </div>
          <span className="text-[11px] text-slate-400">Bell Schedule: Normal (45m)</span>
        </div>

        {/* P1: Mathematics */}
        <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                P1
              </span>
              <span className="text-xs font-semibold text-slate-500">08:30 – 09:15 AM</span>
              <span className="text-xs font-bold text-slate-600 flex items-center space-x-1">
                <span>Room 204</span>
              </span>
            </div>
            <h4 className="font-extrabold text-sm text-[#0E2C48]">Mathematics</h4>
            <div className="text-xs text-slate-500">
              Mrs. Eleanor Oswald • Grade 10A
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* P2: Free Period (or Assigned) */}
        <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                P2
              </span>
              <span className="text-xs font-semibold text-slate-500">09:20 – 10:05 AM</span>
            </div>
            <div className="flex items-center space-x-2">
              <Moon className="w-4 h-4 text-slate-400" />
              <h4 className="font-bold text-sm text-slate-700">
                {p2Assigned ? 'English Literature (Assigned Sub)' : 'Free Period • No Class Scheduled'}
              </h4>
            </div>
            {p2Assigned && (
              <div className="text-xs text-teal font-semibold">
                Ms. Taylor • Grade 10A (Room 205)
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setIsOverrideModalOpen(true);
              setOverridePeriod('Period 2');
            }}
            className="px-3.5 py-1.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-bold transition"
          >
            {p2Assigned ? 'Reassign' : 'Assign'}
          </button>
        </div>

        {/* P3: Physics Lab */}
        <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                P3
              </span>
              <span className="text-xs font-semibold text-slate-500">10:15 – 11:00 AM</span>
              <span className="text-xs font-bold text-slate-600">Lab 3B</span>
            </div>
            <h4 className="font-extrabold text-sm text-[#0E2C48]">Physics Lab</h4>
            <div className="text-xs text-slate-500">
              Ms. Rachel Higgins • Grade 11B
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* P4: Chemistry Practical (Conflict Alert Item) */}
        <div
          className={`p-4 rounded-2xl border transition shadow-2xs space-y-2 ${
            p4ConflictResolved
              ? 'border-emerald-200 bg-white'
              : 'border-l-4 border-l-rose-500 border-rose-200 bg-rose-50/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                P4
              </span>
              <span className="text-xs font-semibold text-slate-500">11:05 – 11:50 AM</span>
              <span className="text-xs font-bold text-slate-600">
                {p4ConflictResolved ? 'Chemistry Lab 2 (Annex)' : 'Lab 3B'}
              </span>
            </div>
            {!p4ConflictResolved && (
              <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
                !
              </span>
            )}
          </div>

          <div>
            <h4 className="font-extrabold text-sm text-[#0E2C48]">Chemistry Practical</h4>
            <div className="text-xs text-slate-500">Dr. Sunita Verma • Grade 12A</div>
          </div>

          {!p4ConflictResolved ? (
            <div className="p-2 rounded-xl bg-rose-100/70 border border-rose-200 text-[11px] font-bold text-rose-700 flex items-center justify-between">
              <span>⚠ Room overlap with Physics Lab (Lab 3B)</span>
              <button
                onClick={handleResolveLabConflict}
                className="text-xs font-black text-rose-900 underline hover:no-underline"
              >
                Relocate Now
              </button>
            </div>
          ) : (
            <div className="text-[11px] font-bold text-emerald-700 flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Resolved: Moved to Chem Lab 2</span>
            </div>
          )}
        </div>

        {/* P5: English Literature */}
        <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                P5
              </span>
              <span className="text-xs font-semibold text-slate-500">12:30 – 01:15 PM</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                Substitute
              </span>
              <span className="text-xs font-bold text-slate-600">Room 102</span>
            </div>
            <h4 className="font-extrabold text-sm text-[#0E2C48]">English Literature</h4>
            <div className="text-xs text-slate-500">
              Mr. Charles Davis • Grade 9B
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* P6: Computer Science */}
        <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                P6
              </span>
              <span className="text-xs font-semibold text-slate-500">01:20 – 02:05 PM</span>
              <span className="text-xs font-bold text-slate-600">Lab 1</span>
            </div>
            <h4 className="font-extrabold text-sm text-[#0E2C48]">Computer Science</h4>
            <div className="text-xs text-slate-500">Mr. Arthur Vance • Grade 10B</div>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
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
                  <option>Period 2 (09:20 - 10:05 AM)</option>
                  <option>Period 4 (11:05 - 11:50 AM)</option>
                  <option>Period 5 (12:30 - 01:15 PM)</option>
                </select>
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
