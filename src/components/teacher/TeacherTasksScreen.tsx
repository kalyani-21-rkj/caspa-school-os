import React, { useState } from 'react';
import {
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles,
  ChevronRight,
  Filter,
  X,
  Download,
  Award,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TeacherTask } from '../../types';
import { downloadStudyMaterialPdf } from '../../utils/downloadHelper';

export const TeacherTasksScreen: React.FC = () => {
  const {
    currentUser,
    teacherTasks,
    createTask,
    gradeStudentTaskSubmission,
    showToast,
  } = useApp();
  const [activeTab, setActiveTab] = useState<'HOMEWORK' | 'ASSIGNMENT'>('HOMEWORK');
  const [classFilter, setClassFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Grading modal state for student submissions
  const [gradingTask, setGradingTask] = useState<TeacherTask | null>(null);
  const [gradeScore, setGradeScore] = useState<number>(96);
  const [gradeFeedback, setGradeFeedback] = useState<string>(
    'Excellent step-by-step factorization and clear graphical verification.'
  );

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'HOMEWORK' | 'ASSIGNMENT'>('HOMEWORK');
  const [newClass, setNewClass] = useState('Grade 9B');
  const [newDueDate, setNewDueDate] = useState('Due Sep 28, 2026');

  const filteredTasks = teacherTasks.filter((t) => {
    const matchesTab = t.type === activeTab;
    const matchesClass = classFilter === 'ALL' || t.gradeSection.includes(classFilter);
    return matchesTab && matchesClass;
  });

  const homeworkCount = teacherTasks.filter((t) => t.type === 'HOMEWORK').length;
  const assignmentCount = teacherTasks.filter((t) => t.type === 'ASSIGNMENT').length;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createTask(newTitle, newType, newClass, newDueDate);
    setNewTitle('');
    setIsModalOpen(false);
  };

  const handleAiDraft = () => {
    setNewTitle('Quadratic Word Problems Practice Sheet');
    setNewType('HOMEWORK');
    setNewClass('Grade 9B');
    setNewDueDate('Due Oct 05, 2026');
    setIsModalOpen(true);
    showToast('CASPA AI generated task draft ready for review');
  };

  const handleDownloadStudentFile = (task: TeacherTask) => {
    const sub = task.latestStudentSubmission;
    if (!sub) return;
    if (sub.fileUrl) {
      const link = document.createElement('a');
      link.href = sub.fileUrl;
      link.download = sub.fileName || 'Student_Submission.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`Downloaded student submission: ${sub.fileName || 'Student_Submission.pdf'}`);
    } else {
      downloadStudyMaterialPdf({
        title: `${task.title} - ${sub.studentName} Submission`,
        subject: task.gradeSection,
        teacher: currentUser?.fullName || 'Mrs. Oswald',
        format: 'PDF',
        studentName: sub.studentName,
      });
      showToast(`Downloaded ${sub.studentName}'s submitted PDF`);
    }
  };

  const handleConfirmGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingTask) return;
    gradeStudentTaskSubmission(gradingTask.id, Number(gradeScore), gradeFeedback);
    setGradingTask(null);
  };

  return (
    <div className="space-y-6">
      {/* Header (Image 7) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-teal">Academic Tasks • Grade 9 Student Sync Active</span>
            <span>·</span>
            <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-semibold text-[11px]">
              {teacherTasks.length} active
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">
            Tasks &amp; Homework
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tasks assigned to Grade 9 immediately sync to Grade 9 student profiles; student uploads appear below in real time.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2 bg-[#176B87] hover:bg-[#125870] text-white rounded-lg text-xs font-semibold shadow-xs transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Assign New Task</span>
        </button>
      </div>

      {/* Segmented Tabs: Homework vs Assignments */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('HOMEWORK')}
            className={`px-4 py-1.5 rounded-md font-semibold transition cursor-pointer ${
              activeTab === 'HOMEWORK'
                ? 'bg-white shadow-xs text-teal'
                : 'text-slate-600 hover:text-navy'
            }`}
          >
            Homework ({homeworkCount})
          </button>
          <button
            onClick={() => setActiveTab('ASSIGNMENT')}
            className={`px-4 py-1.5 rounded-md font-semibold transition cursor-pointer ${
              activeTab === 'ASSIGNMENT'
                ? 'bg-white shadow-xs text-teal'
                : 'text-slate-600 hover:text-navy'
            }`}
          >
            Assignments ({assignmentCount})
          </button>
        </div>
      </div>

      {/* Filter Pills (All Classes, Grade 9B, Grade 10A, AP Calculus AB) */}
      <div className="flex items-center space-x-2 overflow-x-auto text-xs">
        {['ALL', 'Grade 9B', 'Grade 10A', 'AP Calculus'].map((pill) => (
          <button
            key={pill}
            onClick={() => setClassFilter(pill)}
            className={`px-3 py-1 rounded-full font-medium transition cursor-pointer ${
              classFilter === pill
                ? 'bg-[#176B87] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {pill === 'ALL' ? '✓ All Classes' : pill}
          </button>
        ))}
      </div>

      {/* Task Cards List */}
      <div className="space-y-3.5">
        {filteredTasks.map((task) => {
          const percent = Math.round((task.submittedCount / task.totalCount) * 100);
          const sub = task.latestStudentSubmission;
          return (
            <div
              key={task.id}
              className={`bg-white rounded-xl border p-5 shadow-xs space-y-3 transition ${
                sub ? 'border-emerald-300 ring-1 ring-emerald-400/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-bold text-navy text-sm md:text-base">
                      {task.title}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        task.status === 'PUBLISHED'
                          ? 'bg-sky-50 text-sky-700'
                          : task.status === 'OVERDUE'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-purple-50 text-purple-700'
                      }`}
                    >
                      ● {task.status}
                    </span>
                    {sub && (
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Task Completed by {sub.studentName}</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500">
                    {task.gradeSection} •{' '}
                    <span
                      className={
                        task.status === 'OVERDUE' ? 'text-red-600 font-semibold' : 'text-slate-600'
                      }
                    >
                      {task.dueDate}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (sub) {
                      setGradingTask(task);
                    } else {
                      showToast(`Reviewing submissions for ${task.title}`);
                    }
                  }}
                  className="text-xs font-semibold text-teal hover:underline flex items-center space-x-0.5 cursor-pointer"
                >
                  <span>
                    {sub
                      ? 'Review & Grade Student Upload'
                      : task.status === 'DRAFT'
                      ? 'Edit Draft'
                      : task.lateCount
                      ? `Review (${task.lateCount} Late)`
                      : 'Review'}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Live Student Uploaded Solution Box (Synced from Student Portal) */}
              {sub && (
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-bold text-navy">
                        {sub.studentName} uploaded: <span className="font-mono text-teal">{sub.fileName}</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">({sub.fileSize})</span>
                    </div>
                    {sub.note && (
                      <p className="text-[11px] text-slate-600 italic pl-6">
                        Student Note: &ldquo;{sub.note}&rdquo;
                      </p>
                    )}
                    <p className="text-[10px] text-emerald-700 font-semibold pl-6">
                      Turned in at {sub.submittedAt} • Synced live from Student Portal
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 pl-6 sm:pl-0">
                    <button
                      onClick={() => handleDownloadStudentFile(task)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-navy font-bold text-xs flex items-center space-x-1 transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-teal" />
                      <span>Download File</span>
                    </button>
                    <button
                      onClick={() => setGradingTask(task)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1 transition shadow-2xs cursor-pointer"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Grade &amp; Return</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Progress Bar & Submissions count */}
              <div className="space-y-1.5 pt-1">
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      sub ? 'bg-emerald-600' : task.status === 'OVERDUE' ? 'bg-red-600' : 'bg-[#176B87]'
                    }`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>
                    {task.submittedCount}/{task.totalCount} submitted ({percent}%)
                  </span>
                  <span>Target: 100% submission</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CASPA AI ASSISTANT Instant Gen Card (Image 7 bottom) */}
      <div className="p-4 bg-purple-50/80 border border-purple-200 rounded-xl space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-caspaPurple text-white flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            </div>
            <span className="font-bold text-navy uppercase text-[11px] tracking-wide">
              CASPA AI ASSISTANT
            </span>
          </div>
          <span className="bg-purple-100 text-caspaPurple text-[10px] font-bold px-2 py-0.5 rounded-full">
            Instant Gen
          </span>
        </div>

        <p className="text-slate-700 leading-relaxed text-xs">
          Need to assign a quick assessment? Tap + New above or ask CASPA AI to draft 5 custom questions based on today's lesson notes.
        </p>

        <button
          onClick={handleAiDraft}
          className="px-4 py-2 bg-caspaPurple hover:bg-purple-700 text-white font-bold rounded-lg text-xs transition flex items-center space-x-1.5 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Draft with AI</span>
        </button>
      </div>

      {/* New Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full border border-slate-200 overflow-hidden">
            <div className="p-4 bg-[#176B87] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Create New Academic Task</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Task Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Quadratic Equations Practice Sheet"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-teal text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Task Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-teal text-xs"
                  >
                    <option value="HOMEWORK">Homework</option>
                    <option value="ASSIGNMENT">Assignment</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Class</label>
                  <select
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-teal text-xs"
                  >
                    <option value="Grade 9B">Grade 9B</option>
                    <option value="Grade 10A">Grade 10A</option>
                    <option value="Grade 11 AP Calculus">Grade 11 AP Calculus</option>
                    <option value="Grade 9 Remedial">Grade 9 Remedial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Due Date</label>
                <input
                  type="text"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  placeholder="e.g. Due Oct 02, 2026"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-teal text-xs"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#176B87] hover:bg-[#125870] text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Publish &amp; Sync to Students
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grade Student Submission Modal */}
      {gradingTask && gradingTask.latestStudentSubmission && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-4 bg-[#0E2C48] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                  Evaluate Student Submission
                </span>
                <h3 className="font-bold text-sm">{gradingTask.title}</h3>
              </div>
              <button
                onClick={() => setGradingTask(null)}
                className="text-white hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmGrade} className="p-5 space-y-4 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-navy">
                  Student: {gradingTask.latestStudentSubmission.studentName}
                </div>
                <div className="text-slate-600 font-mono text-[11px]">
                  File: {gradingTask.latestStudentSubmission.fileName} (
                  {gradingTask.latestStudentSubmission.fileSize})
                </div>
                {gradingTask.latestStudentSubmission.note && (
                  <div className="text-slate-600 italic text-[11px]">
                    &ldquo;{gradingTask.latestStudentSubmission.note}&rdquo;
                  </div>
                )}
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Score (Out of 100)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  required
                  value={gradeScore}
                  onChange={(e) => setGradeScore(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-teal text-xs font-bold"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Evaluation Remarks (Synced to Student Portal)
                </label>
                <textarea
                  rows={3}
                  required
                  value={gradeFeedback}
                  onChange={(e) => setGradeFeedback(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-teal text-xs"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setGradingTask(null)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-xs cursor-pointer"
                >
                  Publish Grade to Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
