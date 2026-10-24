import React, { useState } from 'react';
import {
  ArrowLeft,
  ClipboardCheck,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Lock,
  Shield,
  ChevronRight,
  ShieldCheck,
  Calendar,
  X,
  Sparkles,
  FileText,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VicePrincipalExamSession } from '../../types';

interface VicePrincipalExaminationsScreenProps {
  onBack?: () => void;
}

export const VicePrincipalExaminationsScreen: React.FC<VicePrincipalExaminationsScreenProps> = ({
  onBack,
}) => {
  const { vpExams, vpPublicationQueue, publishVpExamResult, showToast } = useApp();

  const [activeFilterStatus, setActiveFilterStatus] = useState('All');
  const [selectedGrade, setSelectedGrade] = useState('All Grades');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedSessionDetails, setSelectedSessionDetails] = useState<VicePrincipalExamSession | null>(null);

  // New exam form state
  const [newExamTitle, setNewExamTitle] = useState('');
  const [newExamGrade, setNewExamGrade] = useState('Grade 10');
  const [newExamSubject, setNewExamSubject] = useState('Mathematics');
  const [newExamDate, setNewExamDate] = useState('Oct 15, 2026');
  const [newExamTime, setNewExamTime] = useState('09:00 - 11:30 AM');
  const [newExamVenue, setNewExamVenue] = useState('Hall A');

  const upcomingCount = 12;
  const ongoingCount = 2;
  const completedCount = 18;
  const pendingCount = 3;

  const handlePublish = (queueId: string) => {
    publishVpExamResult(queueId);
  };

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Exam session scheduled: ${newExamTitle || `${newExamGrade} ${newExamSubject}`}`);
    setIsScheduleModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Header Row with Back Navigation (Matching Image 7) */}
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
                Examinations
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
            onClick={() => showToast('Search examination schedule')}
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 shadow-2xs"
          >
            <Search className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#0E2C48] text-white flex items-center justify-center font-bold text-xs">
            SJ
          </div>
        </div>
      </div>

      {/* Sub Title Banner & Schedule Button (Matching Image 7) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-black text-lg text-[#0E2C48]">Examinations</span>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
            AY 2026-27
          </span>
        </div>

        <button
          onClick={() => setIsScheduleModalOpen(true)}
          className="px-3.5 py-1.5 rounded-xl bg-teal hover:bg-teal/90 text-white text-xs font-bold flex items-center space-x-1 transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule</span>
        </button>
      </div>

      {/* 4 Status Pills (Matching Image 7) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
        {/* Upcoming */}
        <div className="p-3 rounded-2xl bg-[#0E2C48] text-white flex items-center space-x-2 shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shrink-0" />
          <div>
            <div className="text-[10px] text-sky-200 uppercase font-bold">Upcoming</div>
            <div className="text-lg font-black">{upcomingCount}</div>
          </div>
        </div>

        {/* Ongoing */}
        <div className="p-3 rounded-2xl bg-teal/15 text-teal border border-teal/20 flex items-center space-x-2 shadow-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse shrink-0" />
          <div>
            <div className="text-[10px] text-teal/80 uppercase font-bold">Ongoing</div>
            <div className="text-lg font-black">{ongoingCount}</div>
          </div>
        </div>

        {/* Completed */}
        <div className="p-3 rounded-2xl bg-sky-50 text-sky-900 border border-sky-100 flex items-center space-x-2 shadow-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0" />
          <div>
            <div className="text-[10px] text-sky-600 uppercase font-bold">Completed</div>
            <div className="text-lg font-black">{completedCount}</div>
          </div>
        </div>

        {/* Pending */}
        <div className="p-3 rounded-2xl bg-rose-50 text-rose-900 border border-rose-100 flex items-center space-x-2 shadow-2xs">
          <Lock className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          <div>
            <div className="text-[10px] text-rose-600 uppercase font-bold">Pending</div>
            <div className="text-lg font-black text-rose-600">{pendingCount}</div>
          </div>
        </div>
      </div>

      {/* Filter Chips: Grade, Subject, Type, Status: All (Matching Image 7) */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-teal cursor-pointer shadow-2xs focus:outline-none"
        >
          <option value="All Grades">Grade: All</option>
          <option value="Grade 10">Grade 10</option>
          <option value="Grade 11">Grade 11</option>
          <option value="Grade 9">Grade 9</option>
        </select>

        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-teal cursor-pointer shadow-2xs focus:outline-none"
        >
          <option value="All Subjects">Subject: All</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
        </select>

        <span className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs">
          Type: All
        </span>

        <span className="px-3 py-1.5 rounded-xl bg-[#0E2C48] text-white shadow-2xs">
          Status: All
        </span>

        <button
          onClick={() => {
            setSelectedGrade('All Grades');
            setSelectedSubject('All Subjects');
          }}
          className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600"
          title="Clear Filters"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Live Hall Floor Watch Banner (Matching Image 7) */}
      <div className="bg-gradient-to-r from-[#0E2C48] to-[#176B87] p-5 rounded-2xl text-white shadow-md relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-xs font-bold text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="uppercase tracking-wider text-[10px]">Live Hall Floor Watch</span>
            </div>
            <h3 className="font-black text-base sm:text-lg">Hall A &amp; Lab 3B Active</h3>
            <p className="text-xs text-sky-100 max-w-sm leading-relaxed">
              2 proctors registered on biometric duty. No irregularities reported.
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
            <Shield className="w-6 h-6 text-cyan-300" />
          </div>
        </div>
      </div>

      {/* Scheduled & Active Sessions List (Matching Image 7) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span className="text-[#0E2C48] uppercase tracking-wider text-[11px] font-extrabold">
            Scheduled &amp; Active Sessions
          </span>
          <span className="text-slate-400 text-[11px]">Sort: Time (Asc)</span>
        </div>

        <div className="space-y-3">
          {vpExams.map((exam) => {
            const isOngoing = exam.status === 'ONGOING';
            const isCompleted = exam.status === 'COMPLETED';

            return (
              <div
                key={exam.id}
                onClick={() => setSelectedSessionDetails(exam)}
                className={`p-4 rounded-2xl border bg-white shadow-2xs hover:shadow-xs transition cursor-pointer space-y-2 ${
                  isOngoing ? 'border-l-4 border-l-teal border-slate-200' : 'border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#0E2C48]">{exam.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {exam.subject} • {exam.grade}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full shrink-0 ${
                      isOngoing
                        ? 'bg-sky-100 text-sky-800'
                        : isCompleted
                        ? 'bg-teal/15 text-teal'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {isOngoing ? '• Ongoing' : isCompleted ? '✓ Completed' : 'Scheduled'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-600 font-medium">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      {exam.dateStr} • {exam.timeRange} ({exam.venue})
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-slate-500 font-semibold">
                    {exam.chiefProctor && `Chief Proctor: ${exam.chiefProctor}`}
                    {exam.batchSize && `Batch Size: ${exam.batchSize} Candidates`}
                    {exam.gradingFinishedPercent && `Teacher grading ${exam.gradingFinishedPercent}% finished`}
                  </span>

                  <span className="text-teal font-bold flex items-center space-x-0.5 hover:underline">
                    <span>View Details</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pending Publication Queue (Matching Image 7) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#0E2C48]">
                Pending Publication
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Awaiting official Vice Principal sign-off
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
            3 Queued
          </span>
        </div>

        <div className="space-y-3">
          {vpPublicationQueue.map((item) => {
            const isReady = item.readyToPublish;
            const isPublished = item.isPublished;

            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-extrabold text-sm text-[#0E2C48]">{item.title}</h4>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isReady
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isReady ? '✓ Complete' : item.submissionsText || 'In Progress'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{item.detail}</p>
                </div>

                <div className="pt-2 sm:pt-0">
                  {isPublished ? (
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Published Sealed</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePublish(item.id)}
                      disabled={!isReady}
                      className={`px-4 py-2 rounded-xl text-xs font-black flex items-center space-x-1.5 transition shadow-xs ${
                        isReady
                          ? 'bg-[#123B5D] hover:bg-[#176B87] text-white cursor-pointer'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Publish</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Cryptographic Seal Explanatory Banner (Matching Image 7) */}
        <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-100 flex items-start space-x-2.5 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-teal shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Publishing pushes final transcripts directly to student and parent portal feeds with institutional cryptographic seal.
          </p>
        </div>
      </div>

      {/* Modal: Schedule New Exam */}
      {isScheduleModalOpen && (
        <form onSubmit={handleCreateSchedule} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-[#0E2C48]">Schedule Examination Session</h3>
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#0E2C48] mb-1">Session Title</label>
                <input
                  type="text"
                  value={newExamTitle}
                  onChange={(e) => setNewExamTitle(e.target.value)}
                  placeholder="e.g. Grade 10 Mid-Term Board Prep"
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#0E2C48] mb-1">Grade</label>
                  <select
                    value={newExamGrade}
                    onChange={(e) => setNewExamGrade(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  >
                    <option>Grade 9</option>
                    <option>Grade 10</option>
                    <option>Grade 11</option>
                    <option>Grade 12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0E2C48] mb-1">Subject</label>
                  <input
                    type="text"
                    value={newExamSubject}
                    onChange={(e) => setNewExamSubject(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#0E2C48] mb-1">Date</label>
                  <input
                    type="text"
                    value={newExamDate}
                    onChange={(e) => setNewExamDate(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0E2C48] mb-1">Venue</label>
                  <input
                    type="text"
                    value={newExamVenue}
                    onChange={(e) => setNewExamVenue(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(false)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-teal hover:bg-teal/90 text-white text-xs font-bold transition shadow-xs"
              >
                Authorize &amp; Schedule
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Modal: View Session Details */}
      {selectedSessionDetails && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-extrabold text-base text-[#0E2C48]">
                  {selectedSessionDetails.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedSessionDetails.dateStr} • {selectedSessionDetails.venue}
                </p>
              </div>
              <button
                onClick={() => setSelectedSessionDetails(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div><strong>Status:</strong> {selectedSessionDetails.status}</div>
              <div><strong>Chief Proctor:</strong> {selectedSessionDetails.chiefProctor}</div>
              <div><strong>Candidates:</strong> {selectedSessionDetails.batchSize || 45} Scholars</div>
              <div><strong>Security Status:</strong> Biometric attendance verified</div>
            </div>

            <button
              onClick={() => setSelectedSessionDetails(null)}
              className="w-full py-2.5 rounded-xl bg-[#0E2C48] text-white text-xs font-bold hover:bg-[#123B5D]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
