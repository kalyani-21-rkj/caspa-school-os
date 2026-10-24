import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  Save,
  CheckCircle2,
  FileCheck,
  TrendingUp,
  AlertCircle,
  Award,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherMarksScreen: React.FC = () => {
  const { teacherStudents, updateStudentGrade, showToast } = useApp();
  const [selectedClass, setSelectedClass] = useState('Grade 9B — Mathematics');
  const [selectedAssessment, setSelectedAssessment] = useState('Unit Test 2');
  const [bulkMode, setBulkMode] = useState(false);
  const [instructorNotes, setInstructorNotes] = useState<Record<string, string>>({
    'ts-2': 'Struggled with quadratic factorization in section B. Needs remedial session on Thursday.',
  });
  const [showCopilot, setShowCopilot] = useState(true);

  const gradedStudents = teacherStudents.filter((s) => s.unitTestScore !== null);
  const ungradedStudents = teacherStudents.filter((s) => s.unitTestScore === null);
  const highestScore = Math.max(...gradedStudents.map((s) => s.unitTestScore || 0), 98);
  const avgScore = 76;

  const handleScoreChange = (studentId: string, val: string) => {
    const num = val === '' ? null : parseInt(val, 10);
    if (num === null || (!isNaN(num) && num >= 0 && num <= 100)) {
      updateStudentGrade(studentId, num);
    }
  };

  const handleSaveNote = (studentId: string) => {
    const note = instructorNotes[studentId] || '';
    updateStudentGrade(studentId, teacherStudents.find((s) => s.id === studentId)?.unitTestScore ?? null, note);
    showToast('Instructor feedback note saved to student record');
  };

  const handlePublishResults = () => {
    showToast('Unit Test 2 results published to Student & Parent Portals');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header & Selectors (Image 8) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-bold text-teal uppercase tracking-widest block">
            CASPA OS • ASSESSMENT
          </span>
          <h1 className="text-2xl font-extrabold text-navy tracking-tight">
            Marks And Feedback
          </h1>
        </div>

        {/* Dropdown Selectors */}
        <div className="flex items-center space-x-2">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-bold text-navy focus:outline-none focus:border-teal"
          >
            <option value="Grade 9B — Mathematics">Grade 9B — Mathematics</option>
            <option value="Grade 10A — Algebra II">Grade 10A — Algebra II</option>
            <option value="Grade 11 — AP Calculus">Grade 11 — AP Calculus</option>
          </select>

          <select
            value={selectedAssessment}
            onChange={(e) => setSelectedAssessment(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-bold text-teal focus:outline-none focus:border-teal"
          >
            <option value="Unit Test 2">Unit Test 2</option>
            <option value="Mid-Term Exam">Mid-Term Exam</option>
            <option value="Chapter 4 Quiz">Chapter 4 Quiz</option>
          </select>
        </div>
      </div>

      {/* KPI Stats Row (Image 8) */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            AVG SCORE
          </span>
          <p className="text-2xl font-extrabold text-navy font-mono mt-0.5">{avgScore}%</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            HIGHEST
          </span>
          <p className="text-2xl font-extrabold text-navy font-mono mt-0.5">
            {highestScore} <span className="text-xs text-slate-400 font-normal">/100</span>
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-xs">
          <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">
            NOT ENTERED
          </span>
          <p className="text-2xl font-extrabold text-red-600 font-mono mt-0.5">
            {ungradedStudents.length} <span className="text-xs text-slate-400 font-normal">left</span>
          </p>
        </div>
      </div>

      {/* Student Grading Header & Bulk Entry Toggle */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center space-x-2">
          <h3 className="font-extrabold text-navy text-sm">Student Grading</h3>
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
            32 Total
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-600 font-medium">Bulk Entry Mode</span>
          <button
            onClick={() => setBulkMode(!bulkMode)}
            className={`w-10 h-6 flex items-center rounded-full p-1 transition ${
              bulkMode ? 'bg-[#176B87] justify-end' : 'bg-slate-300 justify-start'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-xs"></div>
          </button>
        </div>
      </div>

      {/* Student Grading List (Image 8) */}
      <div className="space-y-3">
        {teacherStudents.map((std) => (
          <div
            key={std.id}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3 hover:border-slate-300 transition"
          >
            <div className="flex items-center justify-between">
              {/* Student Name & Roll No */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs shrink-0">
                  {std.avatarInitials}
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h4 className="font-bold text-navy text-sm">{std.fullName}</h4>
                    {std.unitTestScore !== null && std.unitTestScore >= 95 && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {std.unitTestScore === null ? (
                      <span className="text-red-500 font-semibold">
                        ● Roll No. {String(std.rollNo).padStart(2, '0')} • Ungraded
                      </span>
                    ) : (
                      <span>Roll No. {String(std.rollNo).padStart(2, '0')} • {std.grade}</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Score Input & Action Icon */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1.5">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={std.unitTestScore ?? ''}
                    onChange={(e) => handleScoreChange(std.id, e.target.value)}
                    placeholder="--"
                    className="w-14 px-2 py-1.5 text-center font-mono font-bold text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-teal bg-slate-50"
                  />
                  <span className="text-slate-400 font-mono text-xs">/100</span>
                </div>

                <button
                  onClick={() => showToast(`Direct messaging parent of ${std.fullName}`)}
                  className="p-2 text-slate-400 hover:text-teal rounded-lg hover:bg-slate-100 transition"
                  title="Message Parent"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Instructor Note Accordion (Image 8 for Marcus Brody) */}
            {std.id === 'ts-2' && (
              <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-100 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-teal">
                  <span>INSTRUCTOR NOTE</span>
                  <span className="text-slate-400 font-mono">82/200</span>
                </div>

                <textarea
                  rows={2}
                  value={instructorNotes[std.id] || ''}
                  onChange={(e) =>
                    setInstructorNotes({ ...instructorNotes, [std.id]: e.target.value })
                  }
                  className="w-full p-2 bg-white rounded-lg border border-sky-200 text-xs text-slate-800 focus:outline-none focus:border-teal"
                />

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() =>
                      setInstructorNotes({ ...instructorNotes, [std.id]: '' })
                    }
                    className="px-2.5 py-1 text-slate-500 hover:text-slate-700 font-medium text-[11px]"
                  >
                    Discard
                  </button>
                  <button
                    onClick={() => handleSaveNote(std.id)}
                    className="px-3 py-1 bg-[#176B87] hover:bg-[#125870] text-white rounded-md font-bold text-[11px] shadow-xs"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CASPA ACADEMIC COPILOT Card (Image 8) */}
      {showCopilot && (
        <div className="p-4 bg-purple-50/80 border border-purple-200 rounded-xl space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-caspaPurple text-white flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              </div>
              <span className="font-bold text-navy uppercase text-[11px] tracking-wide">
                CASPA ACADEMIC COPILOT
              </span>
            </div>
            <span className="bg-purple-100 text-caspaPurple text-[10px] font-bold px-2 py-0.5 rounded-full">
              Batch Assist
            </span>
          </div>

          <p className="text-slate-700 leading-relaxed text-xs">
            4 students scored below mastery on Question 3 (Factoring). Auto-generate targeted remedial practice worksheets?
          </p>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => showToast('Remedial worksheets generated & sent to 4 students')}
              className="px-3.5 py-1.5 bg-caspaPurple hover:bg-purple-700 text-white font-bold rounded-lg text-xs transition"
            >
              Review &amp; Send
            </button>
            <button
              onClick={() => setShowCopilot(false)}
              className="px-3 py-1.5 text-slate-500 hover:text-slate-700 text-xs"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Bottom Action Buttons (Image 8) */}
      <div className="flex items-center space-x-3 pt-2">
        <button
          onClick={() => showToast('Draft saved successfully')}
          className="flex-1 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs transition"
        >
          Save Draft
        </button>

        <button
          onClick={handlePublishResults}
          className="flex-1 py-3 bg-[#176B87] hover:bg-[#125870] text-white font-bold rounded-xl text-xs transition shadow-sm"
        >
          Publish Results
        </button>
      </div>

      <div className="text-center text-[10px] text-slate-400">
        Official Grade Sync • FERPA &amp; Ed-Tech Compliant
      </div>
    </div>
  );
};
