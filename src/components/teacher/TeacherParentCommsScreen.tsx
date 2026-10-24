import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Plus,
  Calendar,
  Check,
  CheckCheck,
  Sparkles,
  Send,
  X,
  Phone,
  Paperclip,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ParentMessage } from '../../types';

export const TeacherParentCommsScreen: React.FC = () => {
  const { parentMessages, sendParentMessage, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'MESSAGES' | 'PTM'>('MESSAGES');
  const [searchFilter, setSearchFilter] = useState('');
  const [classFilter, setClassFilter] = useState('ALL');
  const [selectedParent, setSelectedParent] = useState<ParentMessage | null>(parentMessages[0]);
  const [replyText, setReplyText] = useState('');
  const [showBroadcast, setShowBroadcast] = useState(true);

  const filteredMessages = parentMessages.filter((msg) => {
    const matchesSearch =
      msg.parentName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      msg.studentName.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesClass = classFilter === 'ALL' || msg.gradeSection.includes(classFilter);
    return matchesSearch && matchesClass;
  });

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedParent) return;
    sendParentMessage(selectedParent.id, replyText);
    setReplyText('');
    showToast(`Reply sent to ${selectedParent.parentName}`);
  };

  const handleBroadcastSend = () => {
    showToast('Class 9B reminder broadcast sent to 24 parents');
    setShowBroadcast(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header (Image 9) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-bold text-teal uppercase tracking-widest block">
            CASPA OS • ENGAGEMENT
          </span>
          <h1 className="text-2xl font-extrabold text-navy tracking-tight">
            Parent Communication &amp; PTM Hub
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Fall Term • Grade 9B &amp; 10A Guardians
          </p>
        </div>

        <button
          onClick={() => showToast('New parent message composer opened')}
          className="flex items-center space-x-1.5 px-4 py-2 bg-[#176B87] hover:bg-[#125870] text-white rounded-lg text-xs font-semibold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Message</span>
        </button>
      </div>

      {/* Segmented Tabs: Messages (4) vs PTM Requests (2) */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('MESSAGES')}
            className={`px-4 py-1.5 rounded-md font-semibold transition ${
              activeTab === 'MESSAGES'
                ? 'bg-white shadow-xs text-teal'
                : 'text-slate-600 hover:text-navy'
            }`}
          >
            Messages (4)
          </button>
          <button
            onClick={() => setActiveTab('PTM')}
            className={`px-4 py-1.5 rounded-md font-semibold transition ${
              activeTab === 'PTM'
                ? 'bg-white shadow-xs text-teal'
                : 'text-slate-600 hover:text-navy'
            }`}
          >
            PTM Requests (2)
          </button>
        </div>
      </div>

      {/* Search Bar & Filter Pills */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search parent, student, or class..."
            className="w-full pl-8 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-teal bg-white"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto text-xs">
          {['ALL', 'Unread (3)', 'Grade 9B', 'Grade 10A'].map((pill) => (
            <button
              key={pill}
              onClick={() => setClassFilter(pill === 'ALL' ? 'ALL' : pill)}
              className={`px-3 py-1 rounded-full font-medium transition ${
                classFilter === pill || (pill === 'ALL' && classFilter === 'ALL')
                  ? 'bg-[#176B87] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column: Messages List & Active Conversation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages List (Image 9) */}
        <div className="lg:col-span-5 space-y-2.5">
          {filteredMessages.map((msg) => {
            const isSelected = selectedParent?.id === msg.id;
            return (
              <div
                key={msg.id}
                onClick={() => setSelectedParent(msg)}
                className={`p-3.5 rounded-xl border cursor-pointer transition text-xs space-y-1.5 ${
                  isSelected
                    ? 'border-[#176B87] bg-sky-50/50 shadow-xs ring-1 ring-teal'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="relative">
                      <img
                        src={msg.parentAvatar}
                        alt={msg.parentName}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      {msg.isOnline && (
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 border-2 border-white"></span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-navy text-sm">{msg.parentName}</h4>
                      <p className="text-[11px] text-slate-500">
                        {msg.studentName} • {msg.gradeSection}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono">
                    {msg.timeString}
                  </span>
                </div>

                <p className="text-slate-600 text-xs line-clamp-1 pl-12">{msg.snippet}</p>

                <div className="flex justify-end pt-1">
                  {msg.unreadCount && msg.unreadCount > 0 ? (
                    <span className="w-5 h-5 rounded-full bg-[#176B87] text-white text-[10px] font-bold flex items-center justify-center">
                      {msg.unreadCount}
                    </span>
                  ) : (
                    <CheckCheck className="w-4 h-4 text-teal" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Conversation & Reply Panel (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col h-[520px]">
          {selectedParent ? (
            <>
              {/* Thread Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedParent.parentAvatar}
                    alt={selectedParent.parentName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="font-bold text-navy text-sm">
                      {selectedParent.parentName}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Guardian of {selectedParent.studentName} ({selectedParent.gradeSection})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => showToast(`Calling ${selectedParent.parentName}`)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition"
                  title="Direct Phone Call"
                >
                  <Phone className="w-4 h-4" />
                </button>
              </div>

              {/* Messages History */}
              <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-slate-50/50 rounded-lg my-3">
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-800 max-w-md shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-teal block">
                    {selectedParent.parentName}
                  </span>
                  <p>{selectedParent.snippet}</p>
                  <span className="text-[10px] text-slate-400 font-mono block text-right">
                    {selectedParent.timeString}
                  </span>
                </div>

                <div className="bg-teal text-white p-3 rounded-xl text-xs max-w-md ml-auto shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-teal-light block">You (Mrs. Oswald)</span>
                  <p>
                    Thank you for confirming. I have scheduled 20 minutes on Thursday at 3:30 PM to review Chapter 4 factorization with Marcus.
                  </p>
                  <span className="text-[10px] text-teal-100 font-mono block text-right">
                    10:45 AM
                  </span>
                </div>
              </div>

              {/* Reply Composer */}
              <form onSubmit={handleSendReply} className="flex items-center space-x-2 pt-2 border-t border-slate-100">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Write message to ${selectedParent.parentName}...`}
                  className="flex-1 px-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-teal"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#176B87] hover:bg-[#125870] text-white rounded-lg text-xs font-semibold transition flex items-center space-x-1"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-slate-400">
              Select a conversation to view and reply.
            </div>
          )}
        </div>
      </div>

      {/* AI Broadcast Draft Card (Image 9 bottom) */}
      {showBroadcast && (
        <div className="p-4 bg-purple-50/80 border border-purple-200 rounded-xl space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-caspaPurple text-white flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              </div>
              <span className="font-bold text-navy uppercase text-[11px] tracking-wide">
                AI Broadcast Draft • Class 9B Reminder
              </span>
            </div>
            <button
              onClick={() => showToast('Prompt editor opened')}
              className="text-[11px] font-semibold text-teal hover:underline"
            >
              Edit prompt
            </button>
          </div>

          <p className="text-slate-700 italic leading-relaxed text-xs">
            "Dear Parents, friendly reminder that Mid-Term Math Portfolios are due this Friday, Oct 3rd. Please review checklist..."
          </p>

          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={() => setShowBroadcast(false)}
              className="px-3.5 py-1.5 text-slate-500 hover:text-slate-700 text-xs"
            >
              Dismiss
            </button>
            <button
              onClick={handleBroadcastSend}
              className="px-4 py-1.5 bg-[#176B87] hover:bg-[#125870] text-white font-bold rounded-lg text-xs transition shadow-xs flex items-center space-x-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Review &amp; Send to 24 Parents</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
