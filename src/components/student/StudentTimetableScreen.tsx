import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Download,
  BookOpen,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentTimetableScreen: React.FC = () => {
  const { currentUser, studentPeriods, showToast } = useApp();
  const [selectedDay, setSelectedDay] = useState<string>('Wednesday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="space-y-6">
      {/* Header Bar matching Teacher Module */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-teal">Class Timetable</span>
            <span>·</span>
            <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-semibold text-[11px]">
              Fall Term • Term 2
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">
            Academic Schedule &amp; Periods
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            {currentUser?.fullName || 'Elena Vance'} • {currentUser?.designation || 'Grade 9B'} • Total 7 Periods per day
          </p>
        </div>

        {/* Day Selector Pills */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 overflow-x-auto">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition shrink-0 ${
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

      {/* Timetable List Grid */}
      <div className="space-y-3.5">
        {studentPeriods.map((period) => {
          const isLive = period.status === 'LIVE_NOW';
          const isCompleted = period.status === 'COMPLETED';

          return (
            <div
              key={period.id}
              className={`bg-white rounded-2xl p-5 border transition ${
                isLive
                  ? 'border-2 border-teal shadow-md ring-4 ring-teal/5'
                  : isCompleted
                  ? 'border-slate-200 bg-slate-50/50'
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
                        ? 'bg-emerald-100 text-emerald-800'
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
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-600">
                          Completed
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
                    onClick={() => showToast(`Opening course materials for ${period.subject}`)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Class Notes</span>
                  </button>
                  <button
                    onClick={() => showToast(`Ask CASPA AI about ${period.subject}`)}
                    className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-caspaPurple border border-purple-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition"
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
