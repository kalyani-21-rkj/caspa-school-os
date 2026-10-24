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
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TeacherClassesScreenProps {
  onTakeAttendance: (classId: string) => void;
  onViewRoster: (classId: string) => void;
}

export const TeacherClassesScreen: React.FC<TeacherClassesScreenProps> = ({
  onTakeAttendance,
  onViewRoster,
}) => {
  const { teacherClasses, showToast } = useApp();
  const [filterPeriod, setFilterPeriod] = useState<'today' | 'week' | 'all'>('today');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClasses = teacherClasses.filter((c) =>
    c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header (Image 5) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-teal">My Classes</span>
            <span>·</span>
            <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-semibold text-[11px]">
              Fall Term
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">
            Class Schedule &amp; Rosters
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Mrs. Oswald • Department of Mathematics
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search classes or grades..."
              className="pl-8 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-teal w-48 sm:w-60"
            />
          </div>
          <button
            onClick={() => showToast('Filters applied')}
            className="p-2 border border-slate-300 hover:bg-slate-50 rounded-lg text-slate-600"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs (Today, This Week, All Classes) */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setFilterPeriod('today')}
            className={`px-3 py-1.5 rounded-md font-semibold transition ${
              filterPeriod === 'today' ? 'bg-white shadow-xs text-teal' : 'text-slate-600 hover:text-navy'
            }`}
          >
            Today (4)
          </button>
          <button
            onClick={() => setFilterPeriod('week')}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              filterPeriod === 'week' ? 'bg-white shadow-xs text-teal' : 'text-slate-600 hover:text-navy'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setFilterPeriod('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              filterPeriod === 'all' ? 'bg-white shadow-xs text-teal' : 'text-slate-600 hover:text-navy'
            }`}
          >
            All Classes
          </button>
        </div>
      </div>

      {/* NEXT IN 18 MINUTES Banner (Image 5) */}
      <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-xl flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wider block">
              NEXT IN 18 MINUTES
            </span>
            <span className="font-extrabold text-navy text-sm">
              Period 1: Mathematics
            </span>
          </div>
        </div>
        <span className="font-mono text-slate-600 bg-white px-2.5 py-1 rounded border border-slate-200 text-xs">
          Room 204
        </span>
      </div>

      {/* Class Cards List (Image 5) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClasses.map((cls) => (
          <div
            key={cls.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 hover:border-slate-300 transition"
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-extrabold text-navy text-base">{cls.subject}</h3>
                  <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {cls.periodLabel}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">{cls.track}</p>
              </div>

              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-bold">
                {cls.grade}
              </span>
            </div>

            {/* Timing, Room, Students Count */}
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

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 pt-1">
              <button
                onClick={() => onViewRoster(cls.id)}
                className="flex-1 py-2 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 rounded-lg text-xs font-semibold transition flex items-center justify-center space-x-1.5"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>View Roster</span>
              </button>

              <button
                onClick={() => onTakeAttendance(cls.id)}
                className="flex-1 py-2 bg-[#176B87] hover:bg-[#125870] text-white rounded-lg text-xs font-semibold transition flex items-center justify-center space-x-1.5 shadow-xs"
              >
                <ClipboardCheck className="w-3.5 h-3.5" />
                <span>Take Attendance</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CASPA SCHOOL OS AI ASSISTANT Card (Image 5 bottom) */}
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
          Rosters are auto-reconciled with biometric attendance gate terminals. Ready to review 12 attendance submission flags.
        </p>

        <div className="flex items-center justify-between pt-1 border-t border-purple-100 text-[11px]">
          <button
            onClick={() => showToast('Biometric discrepancies reconciled')}
            className="text-teal font-semibold hover:underline"
          >
            Check discrepancies &gt;
          </button>
          <span className="text-slate-400">Updated 2m ago</span>
        </div>
      </div>

      {/* Daily Overview Footer Box (Image 5) */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs text-slate-700">
        <div>
          <span className="font-bold text-navy text-sm block">Daily Overview</span>
          <span className="text-slate-500 text-[11px]">4 active class periods • 100 students total</span>
        </div>
        <BookOpen className="w-5 h-5 text-slate-400" />
      </div>
    </div>
  );
};
