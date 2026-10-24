import React, { useState } from 'react';
import {
  Users,
  DollarSign,
  Bus,
  ShieldAlert,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Shield,
  Activity,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface DashboardViewProps {
  onOpenCaspaWithPrompt?: (prompt: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onOpenCaspaWithPrompt }) => {
  const {
    currentRole,
    safetyIncidents,
    approvals,
    buses,
    students,
    attendance,
    setActiveTab,
    processApproval,
    showToast,
  } = useApp();

  const [quickQuery, setQuickQuery] = useState('');
  const [quickAnswer, setQuickAnswer] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const activeAlerts = safetyIncidents.filter((s) => s.status !== 'RESOLVED' && s.status !== 'CLOSED');
  const pendingApprovals = approvals.filter((a) => a.status === 'PENDING');
  const activeBuses = buses.filter((b) => b.status === 'ON_ROUTE' || b.status === 'DELAYED');

  const handleAskQuick = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!quickQuery.trim()) return;

    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/v1/caspa/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: quickQuery, role: currentRole }),
      });
      const data = await res.json();
      setQuickAnswer(data.answer);
    } catch {
      setQuickAnswer(
        `CASPA Executive Summary: Student attendance is pacing high at 96.4%. There are ${pendingApprovals.length} pending requisitions requiring attention.`
      );
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome & North Star Kicker */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-fieldBorder">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span>Central Campus</span>
            <span>·</span>
            <span>Academic Year 2026-27</span>
            <span>·</span>
            <span className="text-teal font-medium">Real-Time Telemetry</span>
          </div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">
            {currentRole === 'PRINCIPAL' && 'Principal Executive Command Center'}
            {currentRole === 'TEACHER' && 'Teacher Academic Workspace'}
            {currentRole === 'STUDENT' && 'Student Learning Dashboard'}
            {currentRole === 'PARENT' && 'Parent Guardian Portal'}
            {currentRole === 'SAFETY_OFFICER' && 'Anti-Ragging & Child Safety Center'}
            {currentRole === 'ACCOUNTS' && 'Finance & Accounts Ledger'}
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('attendance')}
            className="px-3.5 py-1.5 rounded-lg bg-white border border-fieldBorder hover:border-teal text-xs font-medium text-bodyText transition"
          >
            Mark Attendance
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className="px-3.5 py-1.5 rounded-lg bg-navy hover:bg-navy-dark text-white text-xs font-medium transition shadow-sm flex items-center space-x-1.5"
          >
            <Shield className="w-3.5 h-3.5 text-teal-light" />
            <span>Incident Register</span>
          </button>
        </div>
      </div>

      {/* CASPA AI Intelligent Command Box */}
      <section className="bg-gradient-to-r from-navy via-[#1f3f6e] to-caspaPurple rounded-xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-yellow-300" />
              </div>
              <h2 className="font-semibold text-base">CASPA School Intelligence</h2>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/15 text-slate-200">
                Context-Scoped · {currentRole}
              </span>
            </div>

            <span className="text-xs text-slate-300 hidden sm:inline">
              Ask any natural language question across attendance, safety, fleet &amp; syllabus
            </span>
          </div>

          <form onSubmit={handleAskQuick} className="flex gap-2 mt-3">
            <input
              type="text"
              value={quickQuery}
              onChange={(e) => setQuickQuery(e.target.value)}
              placeholder={
                currentRole === 'PRINCIPAL'
                  ? "e.g. 'Summarize today's absenteeism anomalies and critical safety deadlines'"
                  : currentRole === 'TEACHER'
                  ? "e.g. 'Draft a 5-question pop quiz on Electromagnetic Induction'"
                  : "e.g. 'What is my next period class and due homework?'"
              }
              className="flex-1 px-4 py-2 text-xs rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal shadow-inner"
            />
            <button
              type="submit"
              disabled={isLoadingAi}
              className="bg-teal hover:bg-teal-light px-4 py-2 rounded-lg font-medium text-xs transition flex items-center space-x-1.5 shrink-0 shadow-sm disabled:opacity-50"
            >
              {isLoadingAi ? (
                <span>Analyzing...</span>
              ) : (
                <>
                  <span>Analyze</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Quick chip suggestions */}
          <div className="flex flex-wrap gap-2 mt-3 text-[11px] text-slate-300">
            <span className="text-slate-400 py-0.5">Quick Scopes:</span>
            <button
              type="button"
              onClick={() => {
                setQuickQuery("Summarize today's attendance and urgent safety alerts");
                handleAskQuick();
              }}
              className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 transition text-slate-200"
            >
              Today's Attendance &amp; Alerts
            </button>
            <button
              type="button"
              onClick={() => {
                setQuickQuery('Check school bus Route 12 delay and ETA');
                handleAskQuick();
              }}
              className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 transition text-slate-200"
            >
              Bus Route 12 Status
            </button>
            <button
              type="button"
              onClick={() => {
                setQuickQuery('What approvals have breached or near SLA deadline?');
                handleAskQuick();
              }}
              className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 transition text-slate-200"
            >
              Approvals SLA Audit
            </button>
          </div>

          {quickAnswer && (
            <div className="mt-4 bg-navy-dark/80 border border-slate-700/80 p-3.5 rounded-lg text-xs leading-relaxed animate-in fade-in duration-150">
              <div className="flex items-center justify-between text-[11px] text-yellow-300 font-semibold mb-1 uppercase tracking-wider">
                <span className="flex items-center space-x-1.5">
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                  <span>CASPA Intelligent Synthesis</span>
                </span>
                <span className="text-slate-400 font-normal lowercase">audited response</span>
              </div>
              <p className="text-slate-100 whitespace-pre-line">{quickAnswer}</p>
            </div>
          )}
        </div>
      </section>

      {/* Top 4 KPI Cards (Section 5 / Page 3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students & Attendance */}
        <div className="bg-white p-5 rounded-xl border border-fieldBorder shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Enrollment</span>
            <Users className="w-4 h-4 text-skyBlue" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-navy font-mono">2,450</span>
            <span className="text-xs text-slate-500">Students</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
            <span className="text-caspaSuccess font-medium">96.4% present today</span>
            <span className="text-slate-400">Class 10: 97.2%</span>
          </div>
        </div>

        {/* Fee Collection Rate */}
        <div className="bg-white p-5 rounded-xl border border-fieldBorder shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Fee Collection</span>
            <DollarSign className="w-4 h-4 text-caspaSuccess" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-navy font-mono">88.2%</span>
            <span className="text-xs text-slate-500">Term 2</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
            <span className="text-caspaWarning font-medium">$142,500 Outstanding</span>
            <button
              onClick={() => setActiveTab('approvals')}
              className="text-teal hover:underline text-[11px]"
            >
              Reconcile
            </button>
          </div>
        </div>

        {/* Fleet Operations */}
        <div className="bg-white p-5 rounded-xl border border-fieldBorder shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Transport Fleet</span>
            <Bus className="w-4 h-4 text-teal" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-navy font-mono">
              {activeBuses.length} / {buses.length}
            </span>
            <span className="text-xs text-slate-500">Active</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
            <span className="text-caspaSuccess font-medium">GPS Live Telemetry</span>
            <button
              onClick={() => setActiveTab('transport')}
              className="text-teal hover:underline text-[11px]"
            >
              View Map
            </button>
          </div>
        </div>

        {/* Safety & Anti-Ragging Alerts */}
        <div
          onClick={() => setActiveTab('safety')}
          className={`bg-white p-5 rounded-xl border cursor-pointer hover:shadow-xs transition ${
            activeAlerts.length > 0 ? 'border-l-4 border-l-caspaDanger border-red-200' : 'border-fieldBorder'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className={`text-xs font-semibold uppercase tracking-wider ${activeAlerts.length > 0 ? 'text-caspaDanger' : 'text-slate-600'}`}>
              Safety Alerts
            </span>
            <ShieldAlert className={`w-4 h-4 ${activeAlerts.length > 0 ? 'text-caspaDanger' : 'text-slate-400'}`} />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className={`text-2xl font-extrabold font-mono ${activeAlerts.length > 0 ? 'text-caspaDanger' : 'text-navy'}`}>
              {activeAlerts.length} Active
            </span>
            <span className="text-xs text-slate-500">Cases</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
            <span className="text-slate-500 text-[11px]">SLA Target: 2h left</span>
            <span className="text-teal font-medium flex items-center space-x-0.5">
              <span>Triage</span>
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Critical Action Items + Today's Agenda */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Urgent Action Items + Real-Time Telemetry */}
        <div className="lg:col-span-2 space-y-6">
          {/* Urgent Items Requiring Immediate Action */}
          <div className="bg-white rounded-xl border border-fieldBorder p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-fieldBorder pb-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-caspaWarning" />
                <h3 className="font-semibold text-sm text-navy">Items Requiring Immediate Action</h3>
              </div>
              <button
                onClick={() => setActiveTab('approvals')}
                className="text-xs text-teal font-medium hover:underline"
              >
                View Approval Center ({pendingApprovals.length})
              </button>
            </div>

            <div className="space-y-3">
              {/* Critical Safety Case */}
              {activeAlerts.slice(0, 1).map((alert) => (
                <div
                  key={alert.id}
                  className="p-3.5 bg-red-50/70 border border-red-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="font-bold text-caspaDanger">INCIDENT #{alert.caseNumber}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-red-700 font-medium">{alert.category}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500">{alert.location}</span>
                    </div>
                    <p className="text-xs text-slate-800 font-medium mt-1">{alert.description}</p>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-1">
                      <span className="text-red-600 font-semibold uppercase">{alert.risk} RISK</span>
                      <span>·</span>
                      <span>SLA Window: {alert.slaDeadline}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('safety')}
                    className="px-3 py-1.5 bg-caspaDanger hover:bg-red-700 text-white text-xs font-semibold rounded-md transition shrink-0"
                  >
                    Investigate Case
                  </button>
                </div>
              ))}

              {/* Pending Approvals */}
              {pendingApprovals.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-surface border border-fieldBorder rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition"
                >
                  <div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="font-semibold text-navy uppercase text-[11px]">{item.module}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-600">{item.department}</span>
                      {item.amount && (
                        <>
                          <span className="text-slate-400">·</span>
                          <span className="font-mono font-semibold text-navy">${item.amount.toLocaleString()}</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-slate-800 font-medium mt-1">{item.title}</p>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-1">
                      <span>Requested by {item.requesterName}</span>
                      <span>·</span>
                      <span className="text-caspaWarning font-medium">Stage: {item.currentStage}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => processApproval(item.id, 'APPROVED')}
                      className="px-3 py-1.5 bg-caspaSuccess hover:bg-green-700 text-white text-xs font-medium rounded-md transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setActiveTab('approvals')}
                      className="px-3 py-1.5 bg-white border border-fieldBorder hover:border-slate-300 text-bodyText text-xs font-medium rounded-md transition"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Campus Attendance Pulse */}
          <div className="bg-white rounded-xl border border-fieldBorder p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-fieldBorder pb-3">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-teal" />
                <h3 className="font-semibold text-sm text-navy">Campus Attendance Pulse (Today)</h3>
              </div>
              <button
                onClick={() => setActiveTab('attendance')}
                className="text-xs text-teal hover:underline font-medium"
              >
                Roster Detail
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-700">Senior Secondary Wing (Grade 11 &amp; 12)</span>
                  <span className="font-mono font-bold text-navy">97.8% (542 / 554)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-teal h-2 rounded-full" style={{ width: '97.8%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-700">Secondary Wing (Grade 9 &amp; 10)</span>
                  <span className="font-mono font-bold text-navy">96.4% (680 / 705)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-teal h-2 rounded-full" style={{ width: '96.4%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-700">Middle School (Grade 6 to 8)</span>
                  <span className="font-mono font-bold text-navy">95.1% (618 / 650)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-skyBlue h-2 rounded-full" style={{ width: '95.1%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-700">Faculty &amp; Administrative Staff</span>
                  <span className="font-mono font-bold text-caspaSuccess">98.1% (157 / 160)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-caspaSuccess h-2 rounded-full" style={{ width: '98.1%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Today's Agenda & Live Fleet */}
        <div className="space-y-6">
          {/* Today's Agenda */}
          <div className="bg-white rounded-xl border border-fieldBorder p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-fieldBorder pb-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-teal" />
                <h3 className="font-semibold text-sm text-navy">Today's Agenda</h3>
              </div>
              <span className="text-[11px] text-slate-400">Oct 18, 2026</span>
            </div>

            <ul className="space-y-3.5">
              <li className="flex items-start space-x-3 text-xs">
                <span className="font-mono font-bold text-teal w-16 pt-0.5 shrink-0">09:00 AM</span>
                <div>
                  <p className="font-medium text-slate-900">Senior Secondary Assembly</p>
                  <p className="text-[11px] text-slate-500">Auditorium Hall · Keynote by Principal</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-xs">
                <span className="font-mono font-bold text-teal w-16 pt-0.5 shrink-0">11:30 AM</span>
                <div>
                  <p className="font-medium text-slate-900">Anti-Ragging Squad Committee</p>
                  <p className="text-[11px] text-slate-500">Conference Room B · Case SAFE-8941 Review</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-xs">
                <span className="font-mono font-bold text-teal w-16 pt-0.5 shrink-0">03:00 PM</span>
                <div>
                  <p className="font-medium text-slate-900">PTM Coordination Session</p>
                  <p className="text-[11px] text-slate-500">Class 9 &amp; 10 Mentors · Progress reports</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-xs">
                <span className="font-mono font-bold text-teal w-16 pt-0.5 shrink-0">04:30 PM</span>
                <div>
                  <p className="font-medium text-slate-900">STEM Innovation Grant Briefing</p>
                  <p className="text-[11px] text-slate-500">Lab Wing 3 · Robotics Olympiad funding</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Bus Telemetry Glance */}
          <div className="bg-white rounded-xl border border-fieldBorder p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-fieldBorder pb-3">
              <div className="flex items-center space-x-2">
                <Bus className="w-4 h-4 text-teal" />
                <h3 className="font-semibold text-sm text-navy">Live Bus Telemetry</h3>
              </div>
              <button
                onClick={() => setActiveTab('transport')}
                className="text-xs text-teal font-medium hover:underline"
              >
                All 24 Routes
              </button>
            </div>

            <div className="space-y-2.5">
              {buses.slice(0, 3).map((bus) => (
                <div
                  key={bus.id}
                  className="p-2.5 bg-surface border border-fieldBorder rounded-lg text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy">{bus.routeNumber}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        bus.status === 'ON_ROUTE'
                          ? 'bg-green-100 text-caspaSuccess'
                          : bus.status === 'DELAYED'
                          ? 'bg-amber-100 text-caspaWarning'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {bus.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-1 truncate">{bus.routeName}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1 pt-1 border-t border-slate-100">
                    <span>ETA: {bus.etaMinutes} mins</span>
                    <span>{bus.studentsOnBoard} / {bus.capacity} onboard</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
