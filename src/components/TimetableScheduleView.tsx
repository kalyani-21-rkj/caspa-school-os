import React from 'react';
import { Clock, BookOpen, Calendar, MapPin, User, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TimetableScheduleView: React.FC = () => {
  const { timetable, currentRole } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-fieldBorder">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span>Academics</span>
            <span>·</span>
            <span>Master Schedule</span>
            <span>·</span>
            <span className="text-teal font-medium">Class 10-A</span>
          </div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">Daily Schedule &amp; Academic Periods</h1>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-2.5 py-1 bg-green-100 text-caspaSuccess font-semibold rounded-md">
            Active Period: Physics (Period 3)
          </span>
        </div>
      </div>

      {/* Timetable Period Grid */}
      <div className="bg-white rounded-xl border border-fieldBorder overflow-hidden shadow-xs">
        <div className="p-4 border-b border-fieldBorder flex items-center justify-between">
          <h3 className="font-bold text-navy text-sm">Today's Class Schedule (October 18)</h3>
          <span className="text-[11px] text-slate-500">7 Scheduled Periods · 2 Practical Labs</span>
        </div>

        <div className="divide-y divide-fieldBorder">
          {timetable.map((slot) => (
            <div
              key={slot.id}
              className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition ${
                slot.isCurrent ? 'bg-teal/5 border-l-4 border-l-teal' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start sm:items-center space-x-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold font-mono text-sm shrink-0 ${
                    slot.isCurrent ? 'bg-teal text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  P{slot.period}
                </div>

                <div>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="font-bold text-navy text-sm">{slot.subject}</span>
                    {slot.isCurrent && (
                      <span className="bg-green-100 text-caspaSuccess px-2 py-0.5 rounded text-[10px] font-bold">
                        NOW IN PROGRESS
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center space-x-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{slot.teacher}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{slot.room}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="sm:text-right shrink-0">
                <span className="font-mono text-xs font-bold text-slate-700 bg-surface px-2.5 py-1 rounded-md border border-fieldBorder">
                  {slot.timeRange}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
