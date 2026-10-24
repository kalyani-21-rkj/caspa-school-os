import React, { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Download,
  Calendar,
  Search,
  Filter,
  ChevronRight,
  Sparkles,
  FileText,
  Clock,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ParentNoticesScreen: React.FC = () => {
  const {
    activeChild,
    parentNotices,
    acknowledgeParentNotice,
    registerParentNoticeEvent,
    bookParentPtmSlot,
    showToast,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPtmModalOpen, setIsPtmModalOpen] = useState(false);
  const [selectedPtmSlot, setSelectedPtmSlot] = useState('10:30 AM - 10:45 AM');
  const [selectedTeacher, setSelectedTeacher] = useState('Mrs. Oswald (Mathematics)');

  const categories = ['ALL', 'URGENT', 'ACADEMIC', 'EVENTS', 'PTM', 'TRANSPORT'];

  const filteredNotices = parentNotices.filter((notice) => {
    const matchesCategory =
      selectedCategory === 'ALL' || notice.category === selectedCategory;
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookPtm = (e: React.FormEvent) => {
    e.preventDefault();
    bookParentPtmSlot({
      childId: activeChild.id,
      timeSlot: selectedPtmSlot,
      teacherName: selectedTeacher,
      subject: 'Parent-Teacher Conference',
      venue: 'Academic Block A, Room 102',
    });
    setIsPtmModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Institutional Notices &amp; Circulars
          </h2>
          <p className="text-xs text-slate-500">
            Official campus directives, emergency weather warnings, and event bookings
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search circulars, directives..."
            className="w-full pl-8 pr-3 py-2 bg-white text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const count =
            cat === 'ALL'
              ? parentNotices.length
              : parentNotices.filter((n) => n.category === cat).length;
          const isSelected = selectedCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shrink-0 border ${
                isSelected
                  ? 'bg-[#0E2C48] text-white border-[#0E2C48] shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-cyan-400/20 text-cyan-200' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Notice Cards List */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => {
          const isUrgent = notice.isUrgent;

          return (
            <div
              key={notice.id}
              className={`p-5 rounded-2xl border transition-all duration-200 shadow-sm ${
                isUrgent
                  ? 'bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-white border-amber-300'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start space-x-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isUrgent
                        ? 'bg-amber-500 text-white'
                        : notice.category === 'ACADEMIC'
                        ? 'bg-blue-500/10 text-blue-600'
                        : notice.category === 'PTM'
                        ? 'bg-purple-500/10 text-purple-600'
                        : 'bg-teal/10 text-teal'
                    }`}
                  >
                    {isUrgent ? (
                      <AlertTriangle className="w-5 h-5" />
                    ) : (
                      <FileText className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                          isUrgent
                            ? 'bg-amber-500/20 text-amber-900 border border-amber-500/30 font-black'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {notice.category}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {notice.dateStr} • By {notice.author}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 mt-1">
                      {notice.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-3xl">
                      {notice.fullContent || notice.summary}
                    </p>
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="self-end sm:self-center shrink-0 pt-2 sm:pt-0">
                  {notice.actionType === 'ACKNOWLEDGE' ? (
                    notice.isAcknowledged ? (
                      <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-xs">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Acknowledged</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => acknowledgeParentNotice(notice.id)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-extrabold shadow-md flex items-center space-x-1.5 transition"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Acknowledge Receipt</span>
                      </button>
                    )
                  ) : notice.actionType === 'REGISTER' ? (
                    notice.category === 'PTM' ? (
                      <button
                        onClick={() => setIsPtmModalOpen(true)}
                        className="px-4 py-2 rounded-xl bg-teal hover:bg-teal-dark text-white text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Book Slot</span>
                      </button>
                    ) : notice.isRegistered ? (
                      <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Registered</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => registerParentNoticeEvent(notice.id)}
                        className="px-4 py-2 rounded-xl bg-[#0E2C48] hover:bg-[#13385c] text-white text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
                      >
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                        <span>Confirm Registration</span>
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => showToast(`Downloaded: ${notice.title} (PDF)`)}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center space-x-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-teal" />
                      <span>{notice.actionLabel || 'Download PDF'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Book PTM Modal */}
      {isPtmModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-slate-900">
                Book PTM Conference Slot
              </h3>
              <button
                onClick={() => setIsPtmModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookPtm} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Ward</label>
                <input
                  type="text"
                  disabled
                  value={`${activeChild.fullName} (${activeChild.grade}-${activeChild.section})`}
                  className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-100 text-slate-600 border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Subject &amp; Teacher
                </label>
                <select
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-xl border-slate-200 focus:outline-none focus:border-teal"
                >
                  <option>Mrs. Oswald (Mathematics &amp; Class Tutor)</option>
                  <option>Dr. Sunita Verma (Science &amp; Physics)</option>
                  <option>Mr. Charles Davis (English Literature)</option>
                  <option>Mr. Arthur Vance (Computer Science &amp; AI)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Select 15-Minute Slot (Saturday, Oct 15)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    '09:00 AM - 09:15 AM',
                    '09:30 AM - 09:45 AM',
                    '10:00 AM - 10:15 AM',
                    '10:30 AM - 10:45 AM',
                    '11:00 AM - 11:15 AM',
                    '11:30 AM - 11:45 AM',
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedPtmSlot(slot)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition text-center ${
                        selectedPtmSlot === slot
                          ? 'bg-teal text-white border-teal shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 pt-1">
                <Clock className="w-3.5 h-3.5 text-teal shrink-0" />
                <span>Venue: Academic Block A, Room 102. Please arrive 5 minutes early.</span>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsPtmModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal hover:bg-teal-dark text-white shadow-md flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Booking</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
