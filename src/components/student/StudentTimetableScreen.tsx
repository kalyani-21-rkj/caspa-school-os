import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  User,
  Download,
  Sparkles,
  CheckCircle2,
  CalendarDays,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { downloadClassNotesPdf } from '../../utils/downloadHelper';

export const StudentTimetableScreen: React.FC = () => {
  const {
    currentUser,
    studentPeriods,
    masterTimetable,
    availableTimetableWeeks,
    activeTimetableWeek,
    setActiveTimetableWeek,
    showToast,
  } = useApp();
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const publishedSlotsForDay = masterTimetable
    .filter(
      (s) =>
        s.weekLabel === activeTimetableWeek &&
        s.gradeSection === '9B' &&
        s.day === selectedDay &&
        s.isPublished
    )
    .sort((a, b) => a.period - b.period);

  const periodsToDisplay =
    publishedSlotsForDay.length > 0
      ? publishedSlotsForDay.map((s) => ({
          id: s.id,
          periodNumber: s.period,
          timeRange: s.timeRange,
          subject: s.subject,
          unitTopic: s.unitTopic,
          teacher: s.teacher,
          room: s.room,
          status: s.status,
          completedAt: s.completedAt,
          completedByTeacher: s.completedByTeacher,
          isAfterSchool: false,
        }))
      : studentPeriods;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-teal">Class Timetable</span>
            <span>·</span>
            <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-semibold text-[11px]">
              {activeTimetableWeek}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">
            Academic Schedule &amp; Periods
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            {currentUser?.fullName || 'Elena Vance'} • {currentUser?.designation || 'Grade 9B'} •{' '}
            {periodsToDisplay.filter((p) => p.status === 'COMPLETED').length}/{periodsToDisplay.length} Lectures Completed on {selectedDay}
          </p>
        </div>

        {/* Week Selector & Day Selector Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs">
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

          <div className="flex items-center space-x-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200 overflow-x-auto">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition shrink-0 cursor-pointer ${
                  selectedDay === day
                    ? 'bg-[#176B87] text-white shadow-xs'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-200/60'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timetable List Grid */}
      <div className="space-y-3.5">
        {periodsToDisplay.map((period) => {
          const isLive = period.status === 'LIVE_NOW';
          const isCompleted = period.status === 'COMPLETED';

          return (
            <div
              key={period.id}
              className={`bg-white rounded-2xl p-5 border transition ${
                isLive
                  ? 'border-2 border-teal shadow-md ring-4 ring-teal/5'
                  : isCompleted
                  ? 'border-emerald-200 bg-emerald-50/30'
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Period Badge & Details */}
                <div className="flex items-start sm:items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-mono shrink-0 shadow-2xs ${
                      isLive
                        ? 'bg-teal text-white'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider leading-none">
                      PERIOD
                    </span>
                    <span className="text-base font-black leading-none mt-1">
                      {period.periodNumber}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-extrabold text-navy text-base">
                        {period.subject}
                      </h3>
                      {isLive && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 animate-pulse">
                          ● IN SESSION NOW
                        </span>
                      )}
                      {isCompleted && (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>
                            Lecture Completed by {period.completedByTeacher || period.teacher}
                            {period.completedAt ? ` (${period.completedAt})` : ''}
                          </span>
                        </span>
                      )}
                      {period.isAfterSchool && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700">
                          Co-Curricular
                        </span>
                      )}
                    </div>

                    {period.unitTopic && (
                      <p className="text-xs font-semibold text-teal">
                        {period.unitTopic}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-0.5">
                      <span className="flex items-center space-x-1.5 font-medium">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-navy font-semibold">{period.teacher}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{period.room}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-mono font-bold text-slate-700">{period.timeRange}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center space-x-2 shrink-0 sm:self-center">
                  <button
                    onClick={() => {
                      downloadClassNotesPdf({
                        subject: period.subject,
                        periodNumber: period.periodNumber,
                        teacher: period.teacher,
                        room: period.room,
                        timeRange: period.timeRange,
                        unitTopic: period.unitTopic,
                        studentName: currentUser?.fullName || 'Elena Vance',
                        grade: currentUser?.designation || 'Grade 9B',
                        day: selectedDay,
                        isAiGenerated: false,
                      });
                      showToast(`Downloaded ${period.subject} Class Notes PDF`);
                    }}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Class Notes</span>
                  </button>
                  <button
                    onClick={() => {
                      downloadClassNotesPdf({
                        subject: period.subject,
                        periodNumber: period.periodNumber,
                        teacher: period.teacher,
                        room: period.room,
                        timeRange: period.timeRange,
                        unitTopic: period.unitTopic,
                        studentName: currentUser?.fullName || 'Elena Vance',
                        grade: currentUser?.designation || 'Grade 9B',
                        day: selectedDay,
                        isAiGenerated: true,
                      });
                      showToast(`Downloaded CASPA AI Smart Revision Notes for ${period.subject}`);
                    }}
                    className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-caspaPurple border border-purple-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Notes</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
