import React, { useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  Upload,
  Calendar,
  Info,
  Check,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentAttendanceScreen: React.FC = () => {
  const { currentUser, attendanceHeatmap, absenceExcuses, submitAbsenceExcuse, showToast } = useApp();

  const [excuseDate, setExcuseDate] = useState('2026-09-22');
  const [excuseReason, setExcuseReason] = useState('');
  const [selectedDayInfo, setSelectedDayInfo] = useState<number | null>(14);

  const handleExcuseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!excuseReason.trim()) {
      showToast('Please specify a valid reason');
      return;
    }
    submitAbsenceExcuse(excuseDate, excuseReason);
    setExcuseReason('');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar matching Teacher Module */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-teal">Attendance &amp; Leaves</span>
            <span>·</span>
            <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-semibold text-[11px]">
              Fall Term
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">
            Attendance Record &amp; Leave Portal
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            {currentUser?.fullName || 'Elena Vance'} • {currentUser?.designation || 'Grade 9B'} • Minimum requirement: 75.0%
          </p>
        </div>

          <div className="flex items-center space-x-3">
            <div className="px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">Rate</span>
              <span className="text-xl font-black text-emerald-700 font-mono">96.2%</span>
            </div>
            <div className="px-4 py-2.5 bg-purple-50 border border-purple-200 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-purple-800 tracking-wider block">Late</span>
              <span className="text-xl font-black text-purple-700 font-mono">2 Days</span>
            </div>
            <div className="px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-red-800 tracking-wider block">Absent</span>
              <span className="text-xl font-black text-red-700 font-mono">1 Day</span>
            </div>
          </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* September 2026 Monthly Calendar Heatmap (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-navy">September 2026 Attendance Heatmap</h2>
              <p className="text-xs text-slate-500">Tap on any day cell to inspect detailed status log</p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
                <span className="text-slate-600 font-medium">Present (19)</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-purple-600"></span>
                <span className="text-slate-600 font-medium">Late (2)</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-red-500"></span>
                <span className="text-slate-600 font-medium">Absent (1)</span>
              </span>
            </div>
          </div>

          {/* Calendar Day Header */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider py-1 border-b border-slate-100">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span className="text-slate-300">Sat</span>
            <span className="text-slate-300">Sun</span>
          </div>

          {/* 30 Day Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {attendanceHeatmap.map((day) => {
              const isPresent = day.status === 'PRESENT';
              const isLate = day.status === 'LATE';
              const isAbsent = day.status === 'ABSENT';
              const isWeekend = day.status === 'WEEKEND';
              const isSelected = selectedDayInfo === day.dayNumber;

              return (
                <button
                  key={day.dayNumber}
                  onClick={() => setSelectedDayInfo(day.dayNumber)}
                  className={`h-14 rounded-xl p-1.5 flex flex-col justify-between text-left transition border ${
                    isSelected ? 'ring-2 ring-teal ring-offset-1 font-bold' : ''
                  } ${
                    isPresent
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 hover:bg-emerald-100'
                      : isLate
                      ? 'bg-purple-50 border-purple-300 text-purple-900 hover:bg-purple-100'
                      : isAbsent
                      ? 'bg-red-50 border-red-300 text-red-900 hover:bg-red-100'
                      : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  <span className="text-xs font-mono font-bold leading-none">
                    {day.dayNumber}
                  </span>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="truncate uppercase font-bold text-[9px]">
                      {isPresent ? 'P' : isLate ? 'Late' : isAbsent ? 'Absent' : 'Off'}
                    </span>
                    {day.hasIncident && (
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Day Inspector */}
          {selectedDayInfo && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-teal text-white flex flex-col items-center justify-center font-mono">
                  <span className="text-[10px] leading-none uppercase">Sep</span>
                  <span className="text-base font-bold leading-none mt-0.5">{selectedDayInfo}</span>
                </div>
                <div>
                  <h4 className="font-bold text-navy text-sm">
                    {selectedDayInfo === 14
                      ? 'Medical Leave (Fever & Flu)'
                      : selectedDayInfo === 8 || selectedDayInfo === 22
                      ? 'Tardy Arrival (Bus Delay - 12m late)'
                      : 'Full Day Regular Attendance'}
                  </h4>
                  <p className="text-slate-500 text-[11px]">
                    {selectedDayInfo === 14
                      ? 'Designated medical excuse approved by Principal Dr. Sterling.'
                      : 'Verified by biometric RFID turnstile at Campus Gate A.'}
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg font-bold text-slate-700">
                {selectedDayInfo === 14 ? 'Excused Absence' : selectedDayInfo === 8 || selectedDayInfo === 22 ? 'Recorded Late' : 'Present (100%)'}
              </span>
            </div>
          )}
        </div>

        {/* Submit Absence Excuse Form */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-navy">Submit Absence Excuse</h3>
              <p className="text-xs text-slate-500">
                Official absence slips are reviewed by the class teacher and vice principal
              </p>
            </div>

            <form onSubmit={handleExcuseSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-navy">Date of Absence</label>
                <input
                  type="date"
                  value={excuseDate}
                  onChange={(e) => setExcuseDate(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-teal outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-navy">Reason &amp; Explanation</label>
                <textarea
                  value={excuseReason}
                  onChange={(e) => setExcuseReason(e.target.value)}
                  placeholder="e.g., Doctor appointment for dental checkup. Attached prescription slip."
                  rows={3}
                  className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-teal outline-none"
                ></textarea>
              </div>

              {/* Upload Doctor's Slip */}
              <div className="p-3 border border-dashed border-slate-300 rounded-xl text-center bg-slate-50 text-xs text-slate-500 space-y-1">
                <Upload className="w-4 h-4 text-slate-400 mx-auto" />
                <span>Attach Medical Note or Letter</span>
                <span className="block text-[10px] text-slate-400">PDF, JPG up to 10MB</span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#176B87] hover:bg-[#12586e] text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Excuse Request</span>
              </button>
            </form>
          </div>

          {/* Existing Excuse Applications */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-xs font-extrabold text-navy uppercase tracking-wider">
              Recent Excuse Requests
            </h4>

            <div className="space-y-2">
              {absenceExcuses.map((excuse, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy">{excuse.date}</span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded-full">
                      {excuse.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">{excuse.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
