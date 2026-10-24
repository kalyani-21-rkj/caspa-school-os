import React, { useState } from 'react';
import {
  Award,
  Trophy,
  Medal,
  Star,
  CheckCircle2,
  Download,
  Share2,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentAchievementsScreen: React.FC = () => {
  const { currentUser, studentAchievements, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Academic', 'Sports', 'Cultural', 'Clubs'];

  const filteredAchievements = studentAchievements.filter((a) => {
    if (selectedCategory === 'ALL') return true;
    return a.category === selectedCategory;
  });

  const subjectMarks = [
    { subject: 'Mathematics', teacher: 'Mrs. Oswald', score: 98, total: 100, grade: 'A+', feedback: 'Exceptional problem-solving in quadratic equations.' },
    { subject: 'Physics AP', teacher: 'Dr. Ross', score: 94, total: 100, grade: 'A', feedback: 'Outstanding lab accuracy in Thermodynamics module.' },
    { subject: 'Chemistry Honors', teacher: 'Dr. Ramanathan', score: 91, total: 100, grade: 'A', feedback: 'Very strong chemical bonding viva and lab notes.' },
    { subject: 'English Literature', teacher: 'Dr. Wells', score: 96, total: 100, grade: 'A+', feedback: 'Brilliant textual analysis on Hamlet critical essay.' },
    { subject: 'Computer Science', teacher: 'Prof. Miller', score: 99, total: 100, grade: 'A+', feedback: 'Flawless recursion algorithm logic and project work.' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar matching Teacher Module */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-teal">Academic Standing</span>
            <span>·</span>
            <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-semibold text-[11px]">
              Fall Term
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">
            Marks, Report Card &amp; Honors
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            {currentUser?.fullName || 'Elena Vance'} • {currentUser?.designation || 'Grade 9B • Roll No. 14'} • Cumulative GPA: 3.90 (Rank #2)
          </p>
        </div>

        <button
          onClick={() => showToast('Generating official PDF Report Card...')}
          className="px-4 py-2 bg-[#176B87] hover:bg-[#125870] text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Download Report Card</span>
        </button>
      </div>

      {/* Term 2 Subject-wise Marks Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-extrabold text-navy">Term 2 Subject Evaluations</h3>
            <p className="text-xs text-slate-500">Official mid-term examination and coursework results</p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
            Aggregate: 95.6% • Grade A+
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {subjectMarks.map((item) => (
            <div key={item.subject} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50/70 transition">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <h4 className="font-extrabold text-navy text-sm">{item.subject}</h4>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">{item.teacher}</span>
                </div>
                <p className="text-xs text-slate-500 italic">"{item.feedback}"</p>
              </div>

              <div className="flex items-center space-x-4 self-end md:self-auto">
                <div className="text-right">
                  <span className="text-sm font-black font-mono text-navy">{item.score}/{item.total}</span>
                  <span className="text-[10px] text-slate-400 block font-semibold">Marks</span>
                </div>
                <span className="w-10 h-10 rounded-xl bg-teal/10 text-teal font-black text-sm flex items-center justify-center font-mono">
                  {item.grade}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Honors Cabinet Category Filter & Cards */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold text-navy">Verified Honors &amp; Distinctions</h3>
            <p className="text-xs text-slate-500">School and regional awards received by Elena Vance</p>
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto bg-slate-100 p-1 rounded-xl border border-slate-200">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition shrink-0 ${
                  selectedCategory === c
                    ? 'bg-[#176B87] text-white shadow-xs'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-200/60'
                }`}
              >
                {c === 'ALL' ? 'All (7)' : c}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAchievements.map((item) => {
            const isAcademic = item.category === 'Academic';
            const isSports = item.category === 'Sports';

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-5 border transition flex flex-col justify-between space-y-4 shadow-xs ${
                  item.isFeatured
                    ? 'border-2 border-amber-400/80 ring-4 ring-amber-400/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        isAcademic
                          ? 'bg-blue-100 text-blue-800'
                          : isSports
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {item.category}
                    </span>

                    <span className="text-[10px] font-mono text-slate-400 font-semibold">
                      {item.awardYear}
                    </span>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                        item.isFeatured
                          ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-900'
                          : 'bg-slate-100 text-teal'
                      }`}
                    >
                      {item.isFeatured ? (
                        <Trophy className="w-6 h-6 fill-current" />
                      ) : isSports ? (
                        <Medal className="w-6 h-6" />
                      ) : (
                        <Award className="w-6 h-6" />
                      )}
                    </div>

                    <div>
                      <h4 className="font-extrabold text-navy text-sm leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Rank / Distinction:</span>
                    <span className="font-bold text-navy">{item.ranking}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-emerald-600 text-[11px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Credential</span>
                  </div>

                  <button
                    onClick={() => showToast(`Downloading official certificate for ${item.title}`)}
                    className="px-3 py-1.5 bg-teal/10 hover:bg-teal hover:text-white text-teal rounded-lg text-xs font-bold transition flex items-center space-x-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Certificate</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
