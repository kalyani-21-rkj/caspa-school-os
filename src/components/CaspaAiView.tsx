import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Send,
  User,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RoleType } from '../types';
import { getLocalSmartResponse, getSuggestedActionsForRole } from '../services/caspaKnowledgeEngine';

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
  const { currentRole, currentUser, setActiveTab, showToast } = useApp();
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const buildWelcomeMessage = (role: RoleType, name?: string): Message => {
    const userName = name || 'User';
    const roleDescriptions: Record<string, string> = {
      STUDENT:
        'I am your personal AI Academic Tutor (Physics, Math, Chemistry, Biology, English) and Student Portal Assistant (homework deadlines, timetable, attendance, and live bus tracking).',
      TEACHER:
        'I am your Faculty Pedagogical Copilot. Ask me to generate 5-question pop quizzes with answer keys, create essay grading rubrics, flag students with attendance below 90%, or review homework submissions.',
      PRINCIPAL:
        'I am your Executive Command Copilot. Ask me to summarize absenteeism anomalies, audit active safeguarding & POCSO cases, check SLA approval deadlines, or review Term 2 fee velocity and fleet operations.',
      VICE_PRINCIPAL:
        'I am your Academic Operations Copilot. Ask me to resolve master timetable conflicts, assign substitute teachers, review pending lesson plans, or inspect Term 2 examination readiness.',
      ADMIN:
        'I am your Enterprise School Operations Copilot. Ask me to audit school-wide attendance, fee invoices, 24-route bus GPS telemetry, staff onboarding, and pending administrative requisitions.',
      PARENT:
        'I am your Family & Guardian Assistant. Ask me to check your child’s live school bus location, confirm today’s biometric attendance, verify Term 2 fee dues, or review subject marks and PTM schedules.',
    };

    const roleDetail =
      roleDescriptions[role] ||
      `I am currently scoped to your active session role (${role}) with strict RBAC and privacy guardrails.`;

    return {
      id: `m-welcome-${role}-${userName}`,
      sender: 'caspa',
      text: `Greetings, **${userName}**! I am CASPA, the intelligence engine for CASPA School OS.\n\n${roleDetail}\n\nHow can I assist you today?`,
      timestamp: 'Just now',
      sources: ['CASPA Core Intelligence Runtime', `${role.replace('_', ' ')} Module Scope`],
      suggestedActions: getSuggestedActionsForRole(role),
    };
  };

  const [messages, setMessages] = useState<Message[]>([
    buildWelcomeMessage(currentRole, currentUser?.fullName),
  ]);

  // Reset welcome message when role or logged-in user changes
  useEffect(() => {
    setMessages([buildWelcomeMessage(currentRole, currentUser?.fullName)]);
  }, [currentRole, currentUser?.fullName]);

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
        body: JSON.stringify({
          query: textToSend,
          role: currentRole,
          userName: currentUser?.fullName,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('Non-JSON response');
      }

      const data = await res.json();
      const rawAnswer = data.answer || data.response || '';
      const isGenericPlaceholder =
        !rawAnswer ||
        rawAnswer.includes('CASPA Engine responded via localized knowledge base');

      const localFallback = getLocalSmartResponse(
        textToSend,
        currentRole,
        currentUser?.fullName
      );

      const caspaMsg: Message = {
        id: `c-${Date.now()}`,
        sender: 'caspa',
        text: isGenericPlaceholder ? localFallback.answer : rawAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: isGenericPlaceholder
          ? localFallback.sources
          : data.sources || ['CASPA Telemetry'],
        suggestedActions: data.suggestedActions || localFallback.suggestedActions,
        requiresReview: data.requiresReview ?? localFallback.requiresReview,
      };

      setMessages((prev) => [...prev, caspaMsg]);
    } catch {
      const fallback = getLocalSmartResponse(
        textToSend,
        currentRole,
        currentUser?.fullName
      );
      setMessages((prev) => [
        ...prev,
        {
          id: `c-local-${Date.now()}`,
          sender: 'caspa',
          text: fallback.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sources: fallback.sources,
          suggestedActions: fallback.suggestedActions,
          requiresReview: fallback.requiresReview,
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
    else if (actionId === 'NAV_OPERATIONS') setActiveTab('operations');
    else if (actionId === 'NAV_FINANCE') {
      setActiveTab(currentRole === 'PARENT' ? 'fees' : 'finance');
    } else if (actionId === 'NAV_TRANSPORT' || actionId === 'NAV_BUS') {
      if (currentRole === 'PRINCIPAL') setActiveTab('operations');
      else setActiveTab('transport');
    } else if (actionId === 'NAV_TIMETABLE') setActiveTab('timetable');
    else if (actionId === 'NAV_CLASSES') setActiveTab('classes');
    else if (actionId === 'NAV_TASKS') setActiveTab('tasks');
    else if (actionId === 'NAV_MATERIALS') setActiveTab('materials');
    else if (actionId === 'NAV_MARKS') setActiveTab('marks');
    else if (actionId === 'NAV_COMMS') setActiveTab('comms');
    else if (actionId === 'NAV_FEES') setActiveTab('fees');
    else if (actionId === 'NAV_MESSAGES') setActiveTab('messages');
    else if (actionId === 'NAV_CHILD') setActiveTab('child');
    else if (actionId === 'NAV_NOTICES') setActiveTab('notices');
    else if (actionId === 'NAV_CERTIFICATES') setActiveTab('certificates');
    else if (actionId === 'NAV_LESSON_PLANS') setActiveTab('lesson-plans');
    else if (actionId === 'NAV_EXAMINATIONS') setActiveTab('examinations');
    else if (actionId === 'NAV_TEACHERS') setActiveTab('teachers');
    else if (actionId === 'NAV_ACADEMICS') setActiveTab('academics');
    else if (actionId === 'NAV_STUDENTS') setActiveTab('students');
    else if (actionId === 'NAV_STAFF') setActiveTab('staff');
    else if (actionId === 'ACTION_QUIZ') {
      handleSend('Draft a 5-question pop quiz on Electromagnetic Induction with answer key');
    } else {
      showToast(`Triggered workflow action: ${actionId}`);
    }
  };

  const promptSuggestions: Record<RoleType, string[]> = {
    PRINCIPAL: [
      "Summarize today's absenteeism anomalies and active safety cases",
      'Which approval requisitions are approaching SLA deadlines?',
      'Provide a high-level briefing on Term 2 fee collections and fleet status',
      'Review cohort academic standing and staff attendance pulse',
    ],
    VICE_PRINCIPAL: [
      'Academic progress review for Class 10 and Grade 9 remediation',
      'List active timetable conflicts and substitute teacher coverage today',
      'Which teacher lesson plans are pending review or need revision?',
      'Summarize Term 2 examination schedule and result publication queue',
    ],
    TEACHER: [
      'Draft a 5-question pop quiz on Electromagnetic Induction with answer key',
      'Which students in Class 10-A have attendance below 90%?',
      'Suggest a formative assessment rubric for the Shakespeare essay',
      'Draft a 5-question pop quiz on Quadratic Equations with answer key',
    ],
    ADMIN: [
      'Summarize school-wide attendance, safety cases, and pending approvals',
      'Provide a detailed audit of Term 2 fee invoices and collection rate',
      'Check all school bus routes GPS telemetry and occupancy status',
      'Review student admissions, section capacity, and staff roster',
    ],
    PARENT: [
      'Where is Bus Route 12 currently located?',
      'Was my child marked present at school today?',
      'Confirm if my Term 2 tuition fee has any pending dues',
      "Show my child's latest subject marks and upcoming PTM schedule",
    ],
    STUDENT: [
      "Explain Lenz's Law with a real-life analogy",
      'What homework assignments are due this week?',
      "Explain Newton's Third Law with examples",
      'Generate 3 practice problems on Quadratic Equations',
    ],
    SAFETY_OFFICER: [
      'Review SLA compliance countdown for case #SAFE-8941',
      'Outline statutory UGC anti-ragging escalation steps',
      'Draft inquiry witness summons template for South Wing incident',
    ],
    ACCOUNTS: [
      'List outstanding fee balances and invoices grouped by grade',
      'Verify Term 2 fee collection rate and pending approvals',
    ],
    SUPER_ADMIN: [
      'Summarize school-wide attendance, safety cases, and pending approvals',
      'Audit system permission changes and security logs',
    ],
    COUNSELLOR: ['Anti-bullying mental health assessment guide'],
    TRANSPORT: ['Check all school bus routes GPS telemetry and occupancy status'],
    HOSTEL_WARDEN: ['Weekend outing curfew compliance'],
  };

  const currentSuggestions = promptSuggestions[currentRole] || promptSuggestions.PRINCIPAL;

  const placeholderByRole: Record<string, string> = {
    STUDENT:
      "Ask CASPA Tutor (e.g. Newton's Laws, Lenz's Law, Quadratic Equations, homework, bus ETA)...",
    TEACHER:
      'Ask CASPA Faculty Copilot (e.g. Pop quiz on Quadratics, students below 90% attendance, essay rubric)...',
    PRINCIPAL:
      'Ask CASPA Executive AI (e.g. Absenteeism anomalies, safety cases, SLA approvals, Term 2 fees)...',
    VICE_PRINCIPAL:
      'Ask CASPA VP Copilot (e.g. Timetable conflicts, substitute coverage, lesson plans, Class 10 review)...',
    ADMIN:
      'Ask CASPA Admin AI (e.g. School-wide attendance, fee invoices, fleet GPS radar, pending approvals)...',
    PARENT:
      "Ask CASPA Family Assistant (e.g. Where is Bus Route 12?, child attendance today, pending fee dues)...",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-fieldBorder">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span>CASPA Intelligence Layer</span>
            <span>·</span>
            <span className="text-caspaPurple font-semibold">Gemini 3.8 Flash Grounded</span>
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
            Role Scope: {currentRole.replace('_', ' ')} ({currentUser?.fullName || 'User'})
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
                {msg.sender === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                )}
              </div>

              <div
                className={`p-4 rounded-xl border space-y-2 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-navy text-white border-navy rounded-tr-none'
                    : 'bg-white text-bodyText border-fieldBorder shadow-xs rounded-tl-none'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span
                    className={`font-semibold ${
                      msg.sender === 'user' ? 'text-slate-300' : 'text-caspaPurple'
                    }`}
                  >
                    {msg.sender === 'user' ? currentUser?.fullName || 'You' : 'CASPA Intelligence'}
                  </span>
                  <span className="text-slate-400 font-mono text-[10px] ml-4">{msg.timestamp}</span>
                </div>

                <div className="whitespace-pre-line text-xs font-normal">{msg.text}</div>

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
                    Faculty / Executive Review Mandated: Verify alignment before campus broadcast.
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
                <span>CASPA is analyzing {currentRole.replace('_', ' ')} telemetry...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggestion Chips */}
        <div className="px-5 py-2.5 bg-white border-t border-fieldBorder flex items-center space-x-2 overflow-x-auto text-[11px]">
          <span className="text-slate-400 shrink-0 font-medium">Quick Prompts:</span>
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
            placeholder={
              placeholderByRole[currentRole] ||
              `Ask CASPA as ${currentRole} (e.g. attendance, approvals, academic questions)...`
            }
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
