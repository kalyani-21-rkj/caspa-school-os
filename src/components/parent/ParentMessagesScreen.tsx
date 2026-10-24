import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Calendar,
  Clock,
  CheckCircle2,
  Phone,
  Mail,
  User,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ParentMessagesScreen: React.FC = () => {
  const {
    activeChild,
    parentPtms,
    bookParentPtmSlot,
    showToast,
  } = useApp();

  const [messageText, setMessageText] = useState('');
  const [messagesList, setMessagesList] = useState([
    {
      id: 'm-1',
      sender: 'Mrs. Oswald',
      role: 'Class Teacher & Mathematics Head',
      time: 'Yesterday, 04:30 PM',
      text: 'Good evening Mrs. Sharma. Aarav demonstrated remarkable intuition today during the Calculus modeling challenge. I encourage him to submit his project for the National Science Olympiad.',
      isTeacher: true,
    },
    {
      id: 'm-2',
      sender: 'Mrs. Anita Sharma',
      role: 'Parent',
      time: 'Yesterday, 06:15 PM',
      text: 'Thank you Mrs. Oswald! We are very glad to hear that. We have confirmed his registration for the Olympiad preliminary round.',
      isTeacher: false,
    },
    {
      id: 'm-3',
      sender: 'Mrs. Oswald',
      role: 'Class Teacher & Mathematics Head',
      time: 'Today, 09:10 AM',
      text: 'Wonderful! Looking forward to reviewing his formative portfolio with you during our PTM on Saturday, Oct 15 at 10:30 AM.',
      isTeacher: true,
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'Mrs. Anita Sharma',
      role: 'Parent',
      time: 'Just now',
      text: messageText,
      isTeacher: false,
    };

    setMessagesList((prev) => [...prev, newMsg]);
    setMessageText('');
    showToast('Direct communication dispatched to ' + activeChild.classTeacher);

    // Auto simulated polite reply from teacher after 1.5s
    setTimeout(() => {
      setMessagesList((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: activeChild.classTeacher,
          role: 'Class Teacher',
          time: 'Just now',
          text: `Thank you for reaching out Mrs. Sharma. I have noted this in ${activeChild.fullName}'s daily scholastic file.`,
          isTeacher: true,
        },
      ]);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Parent-Teacher Communication Hub
          </h2>
          <p className="text-xs text-slate-500">
            Direct authenticated channel with {activeChild.fullName}&apos;s tutor: {activeChild.classTeacher}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href={`mailto:${activeChild.classTeacherEmail}`}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition flex items-center space-x-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-teal" />
            <span>Email Tutor</span>
          </a>
        </div>
      </div>

      {/* Main Grid: Messages (8 cols) and PTM Bookings (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages Thread (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[520px]">
          {/* Thread Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#0E2C48] text-white flex items-center justify-center font-bold">
                {activeChild.classTeacher.charAt(0)}
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">
                  {activeChild.classTeacher}
                </h4>
                <p className="text-[11px] text-slate-500">
                  Department of Mathematics • Class Tutor for {activeChild.grade}-{activeChild.section}
                </p>
              </div>
            </div>

            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Online
            </span>
          </div>

          {/* Conversation Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
            {messagesList.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.isTeacher ? 'items-start' : 'items-end'}`}
              >
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 mb-1 px-1">
                  <span className="font-bold text-slate-600">{m.sender}</span>
                  <span>• {m.time}</span>
                </div>
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                    m.isTeacher
                      ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                      : 'bg-teal text-white rounded-tr-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-slate-200 bg-white rounded-b-2xl flex items-center space-x-2"
          >
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={`Message ${activeChild.classTeacher}...`}
              className="flex-1 px-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-teal"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-teal hover:bg-teal-dark text-white rounded-xl text-xs font-bold transition flex items-center space-x-1 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>

        {/* PTM Appointments (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="border-b pb-3">
              <h3 className="font-extrabold text-sm text-slate-900">
                Scheduled PTM Conferences
              </h3>
              <p className="text-xs text-slate-500">Upcoming parent-teacher appointments</p>
            </div>

            <div className="space-y-3">
              {parentPtms.map((ptm) => (
                <div
                  key={ptm.id}
                  className="p-3.5 rounded-xl border border-teal/30 bg-teal/5 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{ptm.dateStr}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal text-white">
                      {ptm.status}
                    </span>
                  </div>
                  <p className="text-teal font-extrabold flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{ptm.timeSlot}</span>
                  </p>
                  <p className="text-slate-600 font-medium">Teacher: {ptm.teacherName}</p>
                  <p className="text-[11px] text-slate-500">Venue: {ptm.venue}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Consultation Policy */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="flex items-center space-x-1.5 font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-teal" />
              <span>Institutional Protocol</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Parent messages are logged into the student information system. Teachers typically respond within 24 hours during working campus days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
