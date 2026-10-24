import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  Download,
  RefreshCw,
  ChevronRight,
  ShieldCheck,
  BookOpen,
  Calendar,
  Sparkles,
  X,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VicePrincipalTeacherItem } from '../../types';

export const VicePrincipalTeachersScreen: React.FC = () => {
  const { vpTeachers, pingTeacherReminder, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [onlyOverdue, setOnlyOverdue] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<VicePrincipalTeacherItem | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const filteredTeachers = vpTeachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subjectRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.grades.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || t.subjectRole.toLowerCase().includes(selectedDept.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.statusText === statusFilter;
    const matchesOverdue = !onlyOverdue || t.planStatus === 'Overdue';

    return matchesSearch && matchesDept && matchesStatus && matchesOverdue;
  });

  const handlePing = (teacher: VicePrincipalTeacherItem) => {
    pingTeacherReminder(teacher.id, `Urgent reminder: ${teacher.overdueAlertText || 'Submit pending curriculum documentation.'}`);
  };

  const handleSyncPlans = () => {
    showToast('Synced 42 active syllabi records across departmental branches.');
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast('Exported complete AY 2025/2026 faculty roster CSV with workload metrics.');
    }, 800);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Header Row (Matching Image 2) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl sm:text-3xl font-black text-[#0E2C48] tracking-tight">
            Teachers
          </h1>
          <span className="text-xs font-bold text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 shadow-2xs">
            Faculty Hub
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => showToast('Switched to analytics view')}
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition shadow-2xs"
            title="Analytics View"
          >
            <BookOpen className="w-4 h-4 text-teal" />
          </button>
          <button
            onClick={() => showToast('Filtered faculty members')}
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition shadow-2xs"
            title="Filter Hub"
          >
            <Filter className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Top 3 KPI Summary Pills (Matching Image 2) */}
      <div className="grid grid-cols-3 gap-3">
        {/* TOTAL Active */}
        <div className="bg-[#0E2C48] text-white p-3.5 rounded-2xl shadow-xs">
          <div className="text-[10px] uppercase font-bold text-sky-300">Total</div>
          <div className="text-xl sm:text-2xl font-black mt-0.5">48 Active</div>
        </div>

        {/* Lesson Plans */}
        <div className="bg-sky-50 text-sky-900 border border-sky-100 p-3.5 rounded-2xl shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-sky-600">Lesson Plans</div>
          <div className="text-xl sm:text-2xl font-black mt-0.5">42 / 48</div>
        </div>

        {/* Attendance */}
        <div className="bg-emerald-50 text-emerald-900 border border-emerald-100 p-3.5 rounded-2xl shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-emerald-600">Attendance</div>
          <div className="text-xl sm:text-2xl font-black mt-0.5">46 / 48</div>
        </div>
      </div>

      {/* Search Input Bar (Matching Image 2) */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search teachers by name, subject, grade..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal shadow-2xs transition"
        />
      </div>

      {/* Filter Row: Department, Status, Overdue Plans (Matching Image 2) */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-teal cursor-pointer shadow-2xs focus:outline-none"
        >
          <option value="All">Department: All</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Science">Sciences &amp; Physics</option>
          <option value="English">English Literature</option>
          <option value="Chemistry">Chemistry</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-teal cursor-pointer shadow-2xs focus:outline-none"
        >
          <option value="All">Status: All</option>
          <option value="Present">Present</option>
          <option value="On Leave">On Leave</option>
        </select>

        <button
          onClick={() => setOnlyOverdue(!onlyOverdue)}
          className={`px-3 py-1.5 rounded-xl border transition flex items-center space-x-1.5 shadow-2xs ${
            onlyOverdue
              ? 'bg-rose-500 text-white border-rose-600 font-extrabold'
              : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span>2 Overdue Plans</span>
        </button>
      </div>

      {/* Academic Readiness Banner (Matching Image 2) */}
      <div className="bg-gradient-to-r from-sky-50 to-indigo-50/60 p-4 rounded-2xl border border-sky-100 flex items-start space-x-3 text-xs shadow-2xs">
        <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 font-bold mt-0.5">
          <Sparkles className="w-4 h-4 text-cyan-200" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-[#0E2C48]">Academic Readiness: 92.4%</span>
            <span className="text-[10px] font-black text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
              Week 7
            </span>
          </div>
          <p className="text-slate-600 mt-1 leading-relaxed">
            2 faculty lesson plans require sign-off before Period 4 laboratory sessions today.
          </p>
        </div>
      </div>

      {/* Teacher Cards Grid (Matching Image 2) */}
      <div className="space-y-3">
        {filteredTeachers.map((teacher) => {
          const isOverdue = teacher.planStatus === 'Overdue';
          const isOnLeave = teacher.statusText === 'On Leave';

          return (
            <div
              key={teacher.id}
              onClick={() => setSelectedTeacher(teacher)}
              className={`p-4 rounded-2xl border bg-white shadow-2xs transition hover:shadow-xs cursor-pointer relative overflow-hidden ${
                isOverdue
                  ? 'border-l-4 border-l-rose-500 border-slate-200'
                  : 'border-slate-200 hover:border-teal'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <div className="relative shrink-0">
                    <img
                      src={teacher.avatarUrl}
                      alt={teacher.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-white ${
                        isOnLeave ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                    />
                  </div>

                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h3 className="font-extrabold text-sm text-[#0E2C48]">{teacher.name}</h3>
                      {teacher.isVerified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {teacher.subjectRole} • {teacher.grades}
                    </p>

                    {/* Schedule detail line */}
                    <div className="text-[11px] text-slate-600 font-medium mt-1">
                      {teacher.nextScheduleInfo}
                    </div>

                    {/* Warning callout for overdue */}
                    {isOverdue && teacher.overdueAlertText && (
                      <div className="text-[11px] font-bold text-rose-600 flex items-center space-x-1 mt-1">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>{teacher.overdueAlertText}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right badges & action */}
                <div className="flex flex-col items-end space-y-1.5 shrink-0">
                  <div className="text-xs font-black text-[#0E2C48]">
                    Perf: <span className="text-teal font-extrabold">{teacher.performanceScore}%</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    {teacher.planStatus === 'Up to Date' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                        ✓ Up to Date
                      </span>
                    )}
                    {isOverdue && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                        !Overdue
                      </span>
                    )}
                    {teacher.planStatus === 'N/A' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        N/A
                      </span>
                    )}

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isOnLeave ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {teacher.statusText}
                    </span>
                  </div>

                  {/* Action Link or Button */}
                  {isOverdue ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePing(teacher);
                      }}
                      className="px-3 py-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold flex items-center space-x-1 transition shadow-2xs mt-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>Ping Reminder</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-bold text-teal hover:underline flex items-center space-x-0.5 mt-1">
                      <span>{teacher.actionLinkLabel}</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons: Export Faculty & Sync Lesson Plans (Matching Image 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center space-x-2 transition shadow-2xs"
        >
          <Download className="w-4 h-4 text-teal" />
          <span>{isExporting ? 'Exporting Roster...' : 'Export Faculty'}</span>
        </button>

        <button
          onClick={handleSyncPlans}
          className="w-full py-2.5 rounded-xl bg-teal hover:bg-teal/90 text-white text-xs font-bold flex items-center justify-center space-x-2 transition shadow-xs"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Sync Lesson Plans</span>
        </button>
      </div>

      {/* Footer Sync Note (Matching Image 2) */}
      <div className="text-center text-xs text-slate-400 space-y-0.5 pt-2">
        <div className="flex items-center justify-center space-x-1.5 font-bold text-sky-800">
          <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
          <span>Live CASPA Academic OS Sync</span>
        </div>
        <p className="text-[11px] text-slate-400">
          Showing 6 of 48 active faculty members • All records verified for AY 2025/2026.
        </p>
      </div>

      {/* Modal: Teacher Detailed Schedule & Coverage */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b pb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedTeacher.avatarUrl}
                  alt={selectedTeacher.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h3 className="font-extrabold text-base text-[#0E2C48]">{selectedTeacher.name}</h3>
                  <p className="text-xs text-slate-500">
                    {selectedTeacher.subjectRole} • {selectedTeacher.grades}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTeacher(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center py-2 bg-slate-50 rounded-xl">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Performance</div>
                <div className="text-base font-black text-teal">{selectedTeacher.performanceScore}%</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Status</div>
                <div className="text-base font-bold text-slate-800">{selectedTeacher.statusText}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Syllabus</div>
                <div className="text-base font-bold text-slate-800">{selectedTeacher.planStatus}</div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-bold text-[#0E2C48]">Academic Schedule Today</div>
              <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span>Period 1 (08:30 - 09:15)</span>
                  <span className="text-slate-500">Room 204 • Grade 10A</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Period 3 (10:15 - 11:00)</span>
                  <span className="text-slate-500">Lab 3B • Grade 11B</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Period 5 (12:30 - 01:15)</span>
                  <span className="text-slate-500">Room 102 • Grade 9B</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => handlePing(selectedTeacher)}
                className="flex-1 py-2 rounded-xl bg-teal hover:bg-teal/90 text-white text-xs font-bold transition shadow-xs flex items-center justify-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch Filing Ping</span>
              </button>
              <button
                onClick={() => setSelectedTeacher(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold hover:bg-slate-50 text-slate-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
