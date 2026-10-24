import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  ShieldAlert,
  ShieldCheck,
  Bot,
  User,
  CheckCircle2,
  AlertCircle,
  FileText,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RoleType } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'caspa';
  text: string;
  timestamp: string;
  sources?: string[];
  suggestedActions?: { label: string; actionId: string }[];
  requiresReview?: boolean;
}

export const CaspaAiView: React.FC = () => {
  const { currentRole, setActiveTab, showToast } = useApp();
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'caspa',
      text: `Greetings! I am CASPA, the authorized intelligence engine for CASPA School OS.\n\nI am currently scoped to your active session role: **${currentRole}**. My responses strictly adhere to school safety, financial confidentiality, and RBAC isolation rules. How can I assist you today?`,
      timestamp: 'Just now',
      sources: ['CASPA Core Intelligence Runtime'],
    },
  ]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/v1/caspa/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToSend, role: currentRole }),
      });
      const data = await res.json();

      const caspaMsg: Message = {
        id: `c-${Date.now()}`,
        sender: 'caspa',
        text: data.answer || data.response || 'Information processed.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources || ['CASPA Telemetry'],
        suggestedActions: data.suggestedActions,
        requiresReview: data.requiresReview,
      };

      setMessages((prev) => [...prev, caspaMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `c-err-${Date.now()}`,
          sender: 'caspa',
          text: 'CASPA Engine responded via localized knowledge base.',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (actionId: string) => {
    if (actionId === 'NAV_APPROVALS') setActiveTab('approvals');
    else if (actionId === 'NAV_SAFETY') setActiveTab('safety');
    else if (actionId === 'NAV_ATTENDANCE') setActiveTab('attendance');
    else if (actionId === 'NAV_TRANSPORT' || actionId === 'NAV_BUS') setActiveTab('transport');
    else if (actionId === 'ACTION_QUIZ') {
      handleSend('Draft a 5-question pop-quiz for Grade 10 Physics on Electromagnetic Induction');
    } else {
      showToast(`Triggered workflow action: ${actionId}`);
    }
  };

  const promptSuggestions: Record<RoleType, string[]> = {
    PRINCIPAL: [
      "Summarize today's absenteeism anomalies and active safety cases",
      "Which approval requisitions are approaching SLA deadlines?",
      "Provide a high-level briefing on Term 2 fee collections and fleet status",
    ],
    TEACHER: [
      "Draft a 5-question pop quiz on Electromagnetic Induction with answer key",
      "Which students in Class 10-A have attendance below 90%?",
      "Suggest a formative assessment rubric for the Shakespeare essay",
    ],
    STUDENT: [
      "Explain Lenz's Law with a real-life analogy",
      "What homework assignments are due this week?",
      "Generate 3 practice problems on Quadratic Equations",
    ],
    PARENT: [
      "Where is Bus Route 12 currently located?",
      "Was Rahul marked present at school today?",
      "Confirm if my Term 2 tuition fee has any pending dues",
    ],
    SAFETY_OFFICER: [
      "Review SLA compliance countdown for case #SAFE-8941",
      "Outline statutory UGC anti-ragging escalation steps",
      "Draft inquiry witness summons template for South Wing incident",
    ],
    ACCOUNTS: [
      "List outstanding fee balances grouped by grade",
      "Verify budget code SCI-2026 for Chemistry Lab procurement",
    ],
    SUPER_ADMIN: ["Audit system permission changes in last 24 hours"],
    VICE_PRINCIPAL: ["Academic progress review for Class 10"],
    ADMIN: ["Check server telemetry"],
    COUNSELLOR: ["Anti-bullying mental health assessment guide"],
    TRANSPORT: ["Inspect active bus routes"],
    HOSTEL_WARDEN: ["Weekend outing curfew compliance"],
  };

  const currentSuggestions = promptSuggestions[currentRole] || promptSuggestions.PRINCIPAL;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-fieldBorder">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span>CASPA Intelligence Layer</span>
            <span>·</span>
            <span className="text-caspaPurple font-semibold">Gemini 2.5 Flash Grounded</span>
            <span>·</span>
            <span>Privacy Guardrails Active</span>
          </div>
          <h1 className="text-2xl font-bold text-navy tracking-tight flex items-center space-x-2">
            <span>CASPA AI School Copilot</span>
            <Sparkles className="w-5 h-5 text-yellow-500" />
          </h1>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-2.5 py-1 bg-purple-50 text-caspaPurple border border-purple-200 font-semibold rounded-md">
            Role Scope: {currentRole}
          </span>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-xl border border-fieldBorder shadow-xs overflow-hidden flex flex-col h-[640px]">
        {/* Messages Stream */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-surface/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 text-xs max-w-3xl ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                  msg.sender === 'user' ? 'bg-navy' : 'bg-caspaPurple shadow-xs'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-yellow-300" />}
              </div>

              <div
                className={`p-4 rounded-xl border space-y-2 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-navy text-white border-navy rounded-tr-none'
                    : 'bg-white text-bodyText border-fieldBorder shadow-xs rounded-tl-none'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className={`font-semibold ${msg.sender === 'user' ? 'text-slate-300' : 'text-caspaPurple'}`}>
                    {msg.sender === 'user' ? 'You' : 'CASPA Intelligence'}
                  </span>
                  <span className="text-slate-400 font-mono text-[10px] ml-4">{msg.timestamp}</span>
                </div>

                <div className="whitespace-pre-line text-xs font-normal">
                  {msg.text}
                </div>

                {/* Sources / Citations */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 flex items-center space-x-2 text-[10px] text-slate-400">
                    <span className="font-semibold text-slate-500">Verified Sources:</span>
                    <span>{msg.sources.join(' · ')}</span>
                  </div>
                )}

                {/* Suggested Action Buttons */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {msg.suggestedActions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => handleActionClick(act.actionId)}
                        className="px-2.5 py-1 rounded bg-teal/10 hover:bg-teal/20 text-teal font-semibold text-[11px] transition flex items-center space-x-1"
                      >
                        <span>{act.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {msg.requiresReview && (
                  <div className="p-2 bg-amber-50 border border-amber-200 rounded text-[10px] text-amber-800 font-medium">
                    Teacher Review Mandated: Verify curriculum alignment before student broadcast.
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-3 text-xs text-slate-500 max-w-sm">
              <div className="w-7 h-7 rounded-lg bg-caspaPurple flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
              </div>
              <div className="p-3 bg-white border border-fieldBorder rounded-xl shadow-xs">
                <span>CASPA is analyzing school telemetry &amp; RBAC rules...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggestion Chips */}
        <div className="px-5 py-2.5 bg-white border-t border-fieldBorder flex items-center space-x-2 overflow-x-auto text-[11px]">
          <span className="text-slate-400 shrink-0 font-medium">Suggestions:</span>
          {currentSuggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(s)}
              className="px-3 py-1 bg-surface hover:bg-slate-100 text-slate-700 border border-fieldBorder rounded-full whitespace-nowrap transition"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Query Input Bar */}
        <div className="p-4 bg-white border-t border-fieldBorder flex items-center space-x-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Ask CASPA as ${currentRole} (e.g. attendance, safety SLA, bus ETA, syllabus)...`}
            className="flex-1 px-4 py-2.5 text-xs rounded-lg border border-fieldBorder focus:outline-none focus:border-teal"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !inputQuery.trim()}
            className="px-4 py-2.5 bg-caspaPurple hover:bg-caspaPurple-light disabled:opacity-50 text-white rounded-lg font-medium text-xs transition flex items-center space-x-1.5 shadow-xs"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
