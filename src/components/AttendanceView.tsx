import React, { useState } from 'react';
import {
  Check,
  X,
  Clock,
  Download,
  Filter,
  Users,
  Search,
  CheckCheck,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AttendanceView: React.FC = () => {
  const {
    students,
    attendance,
    markAttendance,
    batchMarkAttendance,
    currentRole,
    showToast,
  } = useApp();

  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PRESENT' | 'ABSENT' | 'LATE'>('ALL');
  const [selectedGrade, setSelectedGrade] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');

  const presentCount = attendance.filter((a) => a.status === 'PRESENT').length;
  const absentCount = attendance.filter((a) => a.status === 'ABSENT').length;
  const lateCount = attendance.filter((a) => a.status === 'LATE').length;
  const totalCount = attendance.length;
  const attendanceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  const filteredAttendance = attendance.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.rollNo.toString().includes(searchFilter);
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCsv = () => {
    showToast('Attendance report exported to CSV successfully');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-fieldBorder">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span>Academics</span>
            <span>·</span>
            <span>Daily Attendance Roster</span>
            <span>·</span>
            <span className="text-teal font-medium">Session: {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">One-Tap Classroom Attendance</h1>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => batchMarkAttendance('PRESENT')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-teal hover:bg-teal-light text-white text-xs font-medium transition shadow-xs"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark All Present</span>
          </button>
          <button
            onClick={handleExportCsv}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-fieldBorder hover:border-slate-300 text-bodyText text-xs font-medium transition"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Roster</span>
          </button>
        </div>
      </div>

      {/* Class Selector & Quick Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Class Selection Card */}
        <div className="bg-white p-4 rounded-xl border border-fieldBorder shadow-xs">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Classroom Scope</p>
          <div className="flex items-center space-x-2">
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="bg-surface border border-fieldBorder rounded-lg px-2.5 py-1.5 text-xs text-navy font-semibold focus:outline-none focus:border-teal"
            >
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
              <option value="9">Grade 9</option>
            </select>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="bg-surface border border-fieldBorder rounded-lg px-2.5 py-1.5 text-xs text-navy font-semibold focus:outline-none focus:border-teal"
            >
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Class Teacher: Mr. Anand Sharma</p>
        </div>

        {/* Present Metric */}
        <div className="bg-white p-4 rounded-xl border border-fieldBorder shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Present</span>
            <Check className="w-4 h-4 text-caspaSuccess" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono text-caspaSuccess">{presentCount}</span>
            <span className="text-xs text-slate-400">/ {totalCount} enrolled</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Rate: {attendanceRate}%</span>
        </div>

        {/* Absent Metric */}
        <div className="bg-white p-4 rounded-xl border border-fieldBorder shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Absent</span>
            <X className="w-4 h-4 text-caspaDanger" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono text-caspaDanger">{absentCount}</span>
            <span className="text-xs text-slate-400">students</span>
          </div>
          <span className="text-[11px] text-slate-500">Automated SMS sent to parents</span>
        </div>

        {/* Late Arrival Metric */}
        <div className="bg-white p-4 rounded-xl border border-fieldBorder shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Late / Tardy</span>
            <Clock className="w-4 h-4 text-caspaWarning" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono text-caspaWarning">{lateCount}</span>
            <span className="text-xs text-slate-400">recorded</span>
          </div>
          <span className="text-[11px] text-slate-500">Admitted with gate pass</span>
        </div>
      </div>

      {/* Roster Controls & Search Filter */}
      <div className="bg-white rounded-xl border border-fieldBorder overflow-hidden shadow-xs">
        <div className="p-4 border-b border-fieldBorder flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search student or roll number..."
                className="pl-8 pr-4 py-1.5 text-xs rounded-lg border border-fieldBorder focus:outline-none focus:border-teal w-60"
              />
            </div>

            {/* Segmented filter buttons */}
            <div className="flex items-center space-x-1 p-1 bg-surface rounded-lg border border-fieldBorder text-xs">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-2.5 py-1 rounded-md font-medium transition ${
                  statusFilter === 'ALL' ? 'bg-white shadow-xs text-navy font-semibold' : 'text-slate-600 hover:text-navy'
                }`}
              >
                All ({attendance.length})
              </button>
              <button
                onClick={() => setStatusFilter('PRESENT')}
                className={`px-2.5 py-1 rounded-md font-medium transition ${
                  statusFilter === 'PRESENT' ? 'bg-white shadow-xs text-caspaSuccess font-semibold' : 'text-slate-600 hover:text-navy'
                }`}
              >
                Present ({presentCount})
              </button>
              <button
                onClick={() => setStatusFilter('ABSENT')}
                className={`px-2.5 py-1 rounded-md font-medium transition ${
                  statusFilter === 'ABSENT' ? 'bg-white shadow-xs text-caspaDanger font-semibold' : 'text-slate-600 hover:text-navy'
                }`}
              >
                Absent ({absentCount})
              </button>
              <button
                onClick={() => setStatusFilter('LATE')}
                className={`px-2.5 py-1 rounded-md font-medium transition ${
                  statusFilter === 'LATE' ? 'bg-white shadow-xs text-caspaWarning font-semibold' : 'text-slate-600 hover:text-navy'
                }`}
              >
                Late ({lateCount})
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-500">
            Showing <span className="font-semibold text-navy">{filteredAttendance.length}</span> students
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface border-b border-fieldBorder text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
                <th className="py-3 px-4 w-14">Roll</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Admission No</th>
                <th className="py-3 px-4 text-center">One-Tap Status</th>
                <th className="py-3 px-4">Time Logged</th>
                <th className="py-3 px-4">Parent Contact</th>
                {/* Section 22: Mask billing from teachers and students */}
                {currentRole !== 'TEACHER' && currentRole !== 'STUDENT' && (
                  <th className="py-3 px-4">Fee Dues</th>
                )}
                <th className="py-3 px-4">Bus Route</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-fieldBorder">
              {filteredAttendance.map((rec) => {
                const std = students.find((s) => s.id === rec.studentId);
                return (
                  <tr key={rec.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">
                      {String(rec.rollNo).padStart(2, '0')}
                    </td>
                    <td className="py-3 px-4 font-medium text-navy">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs uppercase">
                          {rec.studentName[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{rec.studentName}</p>
                          <span className="text-[11px] text-slate-400">Class 10-A</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">
                      {std?.admissionNo || 'CASPA-2024-XXX'}
                    </td>
                    {/* Status Toggle Buttons */}
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => markAttendance(rec.studentId, 'PRESENT')}
                          className={`w-7 h-7 rounded-md font-bold text-xs flex items-center justify-center transition ${
                            rec.status === 'PRESENT'
                              ? 'bg-caspaSuccess text-white shadow-xs scale-105'
                              : 'bg-slate-100 text-slate-500 hover:bg-green-100 hover:text-caspaSuccess'
                          }`}
                          title="Mark Present"
                        >
                          P
                        </button>
                        <button
                          onClick={() => markAttendance(rec.studentId, 'ABSENT')}
                          className={`w-7 h-7 rounded-md font-bold text-xs flex items-center justify-center transition ${
                            rec.status === 'ABSENT'
                              ? 'bg-caspaDanger text-white shadow-xs scale-105'
                              : 'bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-caspaDanger'
                          }`}
                          title="Mark Absent"
                        >
                          A
                        </button>
                        <button
                          onClick={() => markAttendance(rec.studentId, 'LATE')}
                          className={`w-7 h-7 rounded-md font-bold text-xs flex items-center justify-center transition ${
                            rec.status === 'LATE'
                              ? 'bg-caspaWarning text-white shadow-xs scale-105'
                              : 'bg-slate-100 text-slate-500 hover:bg-amber-100 hover:text-caspaWarning'
                          }`}
                          title="Mark Late"
                        >
                          L
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                      {rec.timeMarked || '—'}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <p className="font-medium text-slate-800">{std?.parentName}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{std?.parentPhone}</p>
                    </td>
                    {/* Fee Status (masked if role is teacher) */}
                    {currentRole !== 'TEACHER' && currentRole !== 'STUDENT' && (
                      <td className="py-3 px-4 font-mono">
                        {std && std.feeOutstanding > 0 ? (
                          <span className="text-caspaDanger font-semibold">
                            ${std.feeOutstanding.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-caspaSuccess font-semibold">Cleared</span>
                        )}
                      </td>
                    )}
                    <td className="py-3 px-4 text-slate-600 text-[11px]">
                      {std?.busRoute || 'Private Transport'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
