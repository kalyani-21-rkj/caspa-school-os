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
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherTasksScreen: React.FC = () => {
  const { teacherTasks, createTask, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'HOMEWORK' | 'ASSIGNMENT'>('HOMEWORK');
  const [classFilter, setClassFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    showToast(`Created new ${newType.toLowerCase()}: ${newTitle}`);
  };

  const handleAiDraft = () => {
    setNewTitle('Quadratic Word Problems Practice Sheet');
    setNewType('HOMEWORK');
    setNewClass('Grade 9B');
    setNewDueDate('Due Oct 05, 2026');
    setIsModalOpen(true);
    showToast('CASPA AI generated task draft ready for review');
  };

  return (
    <div className="space-y-6">
      {/* Header (Image 7) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-teal">Academic Tasks</span>
            <span>·</span>
            <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-semibold text-[11px]">
              4 active
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">
            Tasks &amp; Homework
          </h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2 bg-[#176B87] hover:bg-[#125870] text-white rounded-lg text-xs font-semibold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Segmented Tabs: Homework (3) vs Assignments (1) */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('HOMEWORK')}
            className={`px-4 py-1.5 rounded-md font-semibold transition ${
              activeTab === 'HOMEWORK'
                ? 'bg-white shadow-xs text-teal'
                : 'text-slate-600 hover:text-navy'
            }`}
          >
            Homework ({homeworkCount})
          </button>
          <button
            onClick={() => setActiveTab('ASSIGNMENT')}
            className={`px-4 py-1.5 rounded-md font-semibold transition ${
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
            className={`px-3 py-1 rounded-full font-medium transition ${
              classFilter === pill
                ? 'bg-[#176B87] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {pill === 'ALL' ? '✓ All Classes' : pill}
          </button>
        ))}
      </div>

      {/* Task Cards List (Image 7) */}
      <div className="space-y-3.5">
        {filteredTasks.map((task) => {
          const percent = Math.round((task.submittedCount / task.totalCount) * 100);
          return (
            <div
              key={task.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3 hover:border-slate-300 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
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
                  onClick={() => showToast(`Reviewing submissions for ${task.title}`)}
                  className="text-xs font-semibold text-teal hover:underline flex items-center space-x-0.5"
                >
                  <span>
                    {task.status === 'DRAFT'
                      ? 'Edit Draft'
                      : task.lateCount
                      ? `Review (${task.lateCount} Late)`
                      : 'Review'}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Progress Bar & Submissions count */}
              <div className="space-y-1.5 pt-1">
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${
                      task.status === 'OVERDUE' ? 'bg-red-600' : 'bg-[#176B87]'
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
                  className="px-4 py-2 bg-[#176B87] hover:bg-[#125870] text-white font-semibold rounded-lg shadow-xs"
                >
                  Publish Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
