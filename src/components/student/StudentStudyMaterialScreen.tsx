import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Download,
  Play,
  FileText,
  ExternalLink,
  Sparkles,
  Filter,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { downloadStudyMaterialPdf } from '../../utils/downloadHelper';

export const StudentStudyMaterialScreen: React.FC = () => {
  const { currentUser, studyMaterials, showToast } = useApp();
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const subjects = ['ALL', 'Mathematics', 'Science', 'English', 'Social'];

  const filteredMaterials = studyMaterials.filter((m) => {
    const matchesSubject = selectedSubject === 'ALL' || m.subject === selectedSubject;
    const matchesSearch =
      searchQuery.trim() === '' ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar matching Teacher Module */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-teal">Study Resources</span>
            <span>·</span>
            <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-semibold text-[11px]">
              Fall Term
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">
            E-Library &amp; Study Notes
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            {currentUser?.fullName || 'Elena Vance'} • {currentUser?.designation || 'Grade 9B'} • Digital textbooks &amp; lecture notes
          </p>
        </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chapters or topics..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-teal outline-none transition"
            />
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition shrink-0 ${
                selectedSubject === s
                  ? 'bg-[#176B87] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-navy hover:bg-slate-200/70'
              }`}
            >
              {s === 'ALL' ? 'All Subjects (8)' : s}
            </button>
          ))}
        </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMaterials.map((item) => {
          const isPdf = item.format === 'PDF';
          const isVideo = item.format === 'MP4';
          const isDoc = item.format === 'DOCX';
          const isLink = item.format === 'LINK';

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      item.subject === 'Mathematics'
                        ? 'bg-blue-100 text-blue-800'
                        : item.subject === 'Science'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.subject === 'English'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.subject}
                  </span>

                  <div className="flex items-center space-x-1.5">
                    {item.isNew && (
                      <span className="text-[9px] font-extrabold bg-amber-400 text-slate-900 px-1.5 py-0.2 rounded-full">
                        NEW
                      </span>
                    )}
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                      {item.format}
                    </span>
                  </div>
                </div>

                {/* Media Icon & Title */}
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                      isVideo
                        ? 'bg-red-100 text-red-600'
                        : isPdf
                        ? 'bg-blue-100 text-blue-600'
                        : isLink
                        ? 'bg-teal/10 text-teal'
                        : 'bg-purple-100 text-purple-600'
                    }`}
                  >
                    {isVideo && <Play className="w-5 h-5 fill-current" />}
                    {isPdf && <FileText className="w-5 h-5" />}
                    {isDoc && <FileText className="w-5 h-5" />}
                    {isLink && <ExternalLink className="w-5 h-5" />}
                  </div>

                  <div>
                    <h3 className="font-extrabold text-navy text-sm line-clamp-2 group-hover:text-teal transition">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Uploaded by {item.teacher}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                  <span>{item.fileSizeOrDuration}</span>
                  <span>{item.uploadedDate}</span>
                </div>
              </div>

              {/* Action Button */}
              <div>
                {isLink ? (
                  <button
                    onClick={() => {
                      downloadStudyMaterialPdf({
                        title: item.title,
                        subject: item.subject,
                        teacher: item.teacher,
                        format: item.format,
                        studentName: currentUser?.fullName || 'Elena Vance',
                      });
                      showToast(`Downloaded reference guide for ${item.title}`);
                    }}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Web Resource</span>
                  </button>
                ) : isVideo ? (
                  <button
                    onClick={() => showToast(`Playing video lecture: ${item.title}`)}
                    className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition shadow-xs cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Video Lecture</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      downloadStudyMaterialPdf({
                        title: item.title,
                        subject: item.subject,
                        teacher: item.teacher,
                        format: item.format,
                        studentName: currentUser?.fullName || 'Elena Vance',
                      });
                      showToast(`Downloaded ${item.title}`);
                    }}
                    className="w-full py-2 bg-[#176B87] hover:bg-[#12586e] text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Material</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
