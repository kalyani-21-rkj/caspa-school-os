import React, { useState, useRef } from 'react';
import {
  FileCheck,
  Clock,
  AlertCircle,
  CheckCircle2,
  Upload,
  Download,
  Award,
  FileText,
  X,
  Paperclip,
  Trash2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudentTaskItem } from '../../types';
import { downloadStudyMaterialPdf } from '../../utils/downloadHelper';

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
};

export const StudentTasksScreen: React.FC = () => {
  const { currentUser, studentTasks, submitStudentTask, showToast } = useApp();
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'SUBMITTED' | 'GRADED' | 'OVERDUE'>('ALL');
  const [submittingTask, setSubmittingTask] = useState<StudentTaskItem | null>(null);
  const [solutionNote, setSolutionNote] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filteredTasks = studentTasks.filter((t) => {
    if (filter === 'ALL') return true;
    return t.status === filter;
  });

  const handleOpenSubmitModal = (task: StudentTaskItem) => {
    setSubmittingTask(task);
    setSelectedFile(null);
    setSolutionNote('');
    setUploadError(null);
    setIsDragging(false);
  };

  const handleCloseSubmitModal = () => {
    setSubmittingTask(null);
    setSelectedFile(null);
    setSolutionNote('');
    setUploadError(null);
    setIsDragging(false);
  };

  const validateAndSetFile = (file: File) => {
    const maxBytes = 25 * 1024 * 1024; // 25MB
    if (file.size > maxBytes) {
      setUploadError('File size exceeds the 25MB limit. Please choose a smaller file.');
      return;
    }
    setUploadError(null);
    setSelectedFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleConfirmSubmit = () => {
    if (!submittingTask) return;

    if (!selectedFile) {
      setUploadError('Please choose a file from your device to upload before turning in your work.');
      fileInputRef.current?.click();
      return;
    }

    const fileUrl = URL.createObjectURL(selectedFile);
    submitStudentTask(submittingTask.id, {
      fileName: selectedFile.name,
      fileSize: formatFileSize(selectedFile.size),
      fileUrl,
      note: solutionNote.trim() || undefined,
    });

    handleCloseSubmitModal();
  };

  const handleDownloadSubmittedFile = (task: StudentTaskItem) => {
    if (task.submittedFileUrl && task.submittedFileName) {
      const link = document.createElement('a');
      link.href = task.submittedFileUrl;
      link.download = task.submittedFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`Downloaded submitted file: ${task.submittedFileName}`);
    } else {
      downloadStudyMaterialPdf({
        title: task.submittedFileName || `${task.title} - Submitted Solution`,
        subject: task.subject,
        teacher: 'Submitted by ' + (currentUser?.fullName || 'Elena Vance'),
        format: 'PDF',
        studentName: currentUser?.fullName || 'Elena Vance',
      });
      showToast(`Downloaded submitted document for ${task.title}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar matching Teacher Module */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-teal">Assigned Work</span>
            <span>·</span>
            <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-semibold text-[11px]">
              Fall Term
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">
            Tasks, Assignments &amp; Homework
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            {currentUser?.fullName || 'Elena Vance'} • {currentUser?.designation || 'Grade 9B'} • Submit solutions &amp; review grades
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 overflow-x-auto">
          {(['ALL', 'PENDING', 'SUBMITTED', 'GRADED', 'OVERDUE'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition shrink-0 ${
                filter === tab
                  ? 'bg-[#176B87] text-white shadow-xs'
                  : 'text-slate-600 hover:text-navy hover:bg-slate-200/60'
              }`}
            >
              {tab === 'ALL' ? `All (${studentTasks.length})` : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTasks.map((task) => {
          const isPending = task.status === 'PENDING';
          const isGraded = task.status === 'GRADED';
          const isOverdue = task.status === 'OVERDUE';
          const isSubmitted = task.status === 'SUBMITTED';

          return (
            <div
              key={task.id}
              className={`bg-white rounded-2xl p-5 border transition flex flex-col justify-between shadow-xs ${
                isPending && task.isDueToday
                  ? 'border-amber-300 ring-2 ring-amber-400/10'
                  : isGraded
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : isOverdue
                  ? 'border-red-200 bg-red-50/20'
                  : 'border-slate-200'
              }`}
            >
              <div className="space-y-3">
                {/* Top Badge Row */}
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] font-bold text-teal bg-teal/10 px-2 py-0.5 rounded uppercase tracking-wider">
                      {task.subject}
                    </span>
                    {task.assignedByTeacher && (
                      <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        By {task.assignedByTeacher}
                      </span>
                    )}
                  </div>
                  {isPending && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{task.dueDate}</span>
                    </span>
                  )}
                  {isGraded && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                      <Award className="w-3 h-3" />
                      <span>{task.gradeBadge || 'Grade A+'}</span>
                    </span>
                  )}
                  {isSubmitted && (
                    <span className="text-[10px] font-bold text-cyan-800 bg-cyan-100 px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Submitted • Synced to Teacher</span>
                    </span>
                  )}
                  {isOverdue && (
                    <span className="text-[10px] font-bold text-red-800 bg-red-100 px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>Overdue</span>
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="font-extrabold text-navy text-sm sm:text-base leading-snug">
                    {task.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    {task.description}
                  </p>
                </div>

                {/* Progress or Resource File */}
                {task.completedQuestions !== undefined && (
                  <div className="p-2.5 bg-slate-50 rounded-xl space-y-1.5 border border-slate-100">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
                      <span>Questions Solved</span>
                      <span className="font-mono font-bold text-navy">
                        {task.completedQuestions} of {task.totalQuestions}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-teal h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${(task.completedQuestions / (task.totalQuestions || 1)) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                {task.resourceFileName && (
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 text-slate-700">
                      <FileText className="w-4 h-4 text-teal" />
                      <span className="font-medium truncate max-w-[200px]">{task.resourceFileName}</span>
                    </div>
                    <button
                      onClick={() => {
                        downloadStudyMaterialPdf({
                          title: task.resourceFileName || task.title,
                          subject: task.subject,
                          teacher: 'Course Instructor',
                          format: 'PDF',
                          studentName: currentUser?.fullName || 'Elena Vance',
                        });
                        showToast(`Downloaded ${task.resourceFileName}`);
                      }}
                      className="text-teal font-bold hover:underline shrink-0 cursor-pointer"
                    >
                      Download
                    </button>
                  </div>
                )}

                {/* Uploaded Submission Info */}
                {isSubmitted && task.submittedFileName && (
                  <div className="p-3 bg-cyan-50/70 rounded-xl border border-cyan-200 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-navy font-bold truncate">
                        <FileCheck className="w-4 h-4 text-teal shrink-0" />
                        <span className="truncate">{task.submittedFileName}</span>
                      </div>
                      {task.submittedFileSize && (
                        <span className="text-[10px] font-mono text-slate-500 shrink-0 ml-2">
                          {task.submittedFileSize}
                        </span>
                      )}
                    </div>
                    {task.submissionNote && (
                      <p className="text-[11px] text-slate-600 italic">
                        Note: &ldquo;{task.submissionNote}&rdquo;
                      </p>
                    )}
                    {task.submittedAt && (
                      <p className="text-[10px] text-teal font-semibold">
                        Turned in at {task.submittedAt}
                      </p>
                    )}
                  </div>
                )}

                {/* Graded Feedback Card */}
                {isGraded && task.feedbackText && (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider">
                        Teacher Evaluation
                      </span>
                      <span className="font-mono font-black text-emerald-700 text-sm">
                        {task.score}/100
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-900 italic">
                      "{task.feedbackText}"
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                {isPending && (
                  <button
                    onClick={() => handleOpenSubmitModal(task)}
                    className="w-full py-2 bg-[#176B87] hover:bg-[#12586e] text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload &amp; Submit Solution</span>
                  </button>
                )}
                {isSubmitted && (
                  <>
                    <button
                      onClick={() => handleDownloadSubmittedFile(task)}
                      className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-navy rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-teal" />
                      <span>Download Submitted File</span>
                    </button>
                    <button
                      onClick={() => handleOpenSubmitModal(task)}
                      className="px-3 py-2 bg-teal/10 hover:bg-teal/20 text-teal rounded-xl text-xs font-bold transition cursor-pointer"
                      title="Re-upload or replace file"
                    >
                      Re-upload
                    </button>
                  </>
                )}
                {isGraded && (
                  <button
                    onClick={() => showToast('Opening comprehensive grading rubrics')}
                    className="w-full py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-xs font-bold transition"
                  >
                    Review Rubric Breakdown
                  </button>
                )}
                {isOverdue && (
                  <button
                    onClick={() => handleOpenSubmitModal(task)}
                    className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Submit Late Assignment (-5%)</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal Dialog */}
      {submittingTask && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-teal uppercase tracking-wider">
                  Online Assignment Submission
                </span>
                <h3 className="text-lg font-black text-navy">{submittingTask.title}</h3>
              </div>
              <button
                onClick={handleCloseSubmitModal}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Hidden Native File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt,.zip"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Interactive File Upload Dropzone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => {
                  if (!selectedFile) {
                    fileInputRef.current?.click();
                  }
                }}
                className={`p-5 border-2 border-dashed rounded-xl text-center space-y-3 transition ${
                  isDragging
                    ? 'border-teal bg-teal/15 scale-[1.01]'
                    : selectedFile
                    ? 'border-emerald-400 bg-emerald-50/50'
                    : 'border-teal/40 bg-teal/5 hover:border-teal hover:bg-teal/10 cursor-pointer'
                }`}
              >
                {!selectedFile ? (
                  <>
                    <Upload className="w-8 h-8 text-teal mx-auto" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-navy">
                        Click to browse or drag &amp; drop your file here
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Accepted formats: PDF, JPG, PNG, DOCX (Max 25MB)
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#176B87] hover:bg-[#12586e] text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
                    >
                      <Paperclip className="w-3.5 h-3.5" />
                      <span>Choose File from Device</span>
                    </button>
                  </>
                ) : (
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div className="text-xs space-y-0.5">
                      <div>
                        <span className="font-bold text-navy">Document Attached: </span>
                        <span className="font-mono text-teal font-semibold break-all">
                          {selectedFile.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-700 font-semibold">
                        Size: {formatFileSize(selectedFile.size)} • Ready for submission
                      </p>
                    </div>
                    <div className="flex items-center justify-center space-x-2 pt-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="px-3 py-1.5 bg-white hover:bg-slate-100 text-teal border border-teal/30 rounded-lg text-[11px] font-bold transition cursor-pointer"
                      >
                        Change File
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-[11px] font-bold flex items-center space-x-1 transition cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {uploadError && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-xs text-red-700 font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Notes to Instructor */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-navy">
                  Add Submission Notes for Teacher (Optional)
                </label>
                <textarea
                  value={solutionNote}
                  onChange={(e) => setSolutionNote(e.target.value)}
                  placeholder="e.g., Solved problems 14 to 28. Diagram for Carnot cycle drawn on page 3."
                  rows={3}
                  className="w-full p-3 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-teal outline-none transition"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
              <button
                onClick={handleCloseSubmitModal}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="px-5 py-2.5 bg-teal hover:bg-teal-light text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-2 transition cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm &amp; Turn In Work</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
