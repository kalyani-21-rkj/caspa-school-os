import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  Users,
  Briefcase,
  CheckSquare,
  CreditCard,
  Target,
  Bell,
  Megaphone,
  Award,
  Shield,
  TrendingUp,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Send,
  X,
  Radio,
  FileText,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PrincipalDashboardScreenProps {
  onNavigate: (tab: string) => void;
}

export const PrincipalDashboardScreen: React.FC<PrincipalDashboardScreenProps> = ({ onNavigate }) => {
  const {
    currentUser,
    principalAgenda,
    principalCriticalAlerts,
    dispatchCriticalAlert,
    showToast,
    triggerEmergencyProtocol,
  } = useApp();

  const [isAnnounceModalOpen, setIsAnnounceModalOpen] = useState(false);
  const [announcementText, setAnnouncementText] = useState('');
  const [announcementTarget, setAnnouncementTarget] = useState<'ALL' | 'PARENTS' | 'STAFF'>('ALL');

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const activeCriticalAlerts = principalCriticalAlerts.filter((a) => a.status === 'ACTIVE');

  const handleAnnounceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    showToast(`Executive broadcast sent to ${announcementTarget === 'ALL' ? 'Entire Campus' : announcementTarget}`);
    setAnnouncementText('');
    setIsAnnounceModalOpen(false);
  };

  return (
    <div className="space-y-5 pb-12 animate-in fade-in duration-200">
      {/* Top Date & Campus Live Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 bg-white/70 backdrop-blur-xs px-3 py-1.5 rounded-full border border-slate-200 w-fit">
          <Calendar className="w-3.5 h-3.5 text-teal" />
          <span>Wednesday, Sep 23, 2026 • Term 2</span>
        </div>
        <span className="flex items-center space-x-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>• Campus Live</span>
        </span>
      </div>

      {/* Greeting Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
          Good Morning, {currentUser?.fullName || 'Dr. Mehta'} 👋
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          {currentUser?.designation || 'Principal & Executive Head'} • Here&apos;s your school command center
        </p>
      </div>

      {/* Critical Alerts Banner (Red Left Border Card) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden border-l-4 border-l-rose-500 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-navy text-sm">Critical Alerts</h3>
            <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {activeCriticalAlerts.length} Active
            </span>
          </div>
          <button
            onClick={() => onNavigate('safety')}
            className="text-xs font-bold text-teal hover:underline flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {principalCriticalAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition ${
                alert.status === 'ACTIVE'
                  ? 'bg-rose-50/40 border-rose-200/80'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-start space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-200/80 flex items-center justify-center shrink-0 mt-0.5 text-slate-700">
                  <Radio className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <h4 className="font-bold text-navy text-xs sm:text-sm">{alert.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {alert.timeString} • {alert.locationOrDetail}
                  </p>
                </div>
              </div>

              {alert.status === 'ACTIVE' ? (
                <button
                  onClick={() => dispatchCriticalAlert(alert.id, alert.actionType)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                    alert.actionType === 'DISPATCH_TECH'
                      ? 'bg-[#176B87] hover:bg-[#12586f] text-white shadow-xs'
                      : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-900'
                  }`}
                >
                  {alert.actionLabel}
                </button>
              ) : (
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md flex items-center space-x-1 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Dispatched</span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Key Operational Metrics (6 Cards) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400">
            KEY OPERATIONAL METRICS
          </span>
          <span className="text-[11px] text-teal font-semibold">Real-time sync</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {/* 1. STUDENTS */}
          <div
            onClick={() => onNavigate('academics')}
            className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-teal cursor-pointer transition"
          >
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-extrabold uppercase tracking-wider">Students</span>
              <Users className="w-4 h-4 text-slate-500" />
            </div>
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-navy mt-1">1,240</div>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center space-x-0.5 mt-0.5">
              <span>↗</span>
              <span>+8.2% vs last term</span>
            </span>
          </div>

          {/* 2. STAFF */}
          <div
            onClick={() => onNavigate('staff')}
            className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-teal cursor-pointer transition"
          >
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-extrabold uppercase tracking-wider">Staff</span>
              <Briefcase className="w-4 h-4 text-slate-500" />
            </div>
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-navy mt-1">96</div>
            <span className="text-[10px] text-slate-500 flex items-center space-x-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal"></span>
              <span>4 on active duty lead</span>
            </span>
          </div>

          {/* 3. ATTENDANCE */}
          <div
            onClick={() => onNavigate('academics')}
            className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-teal cursor-pointer transition"
          >
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-extrabold uppercase tracking-wider">Attendance</span>
              <CheckSquare className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-emerald-600 mt-1">91%</div>
            <span className="text-[10px] font-semibold text-amber-600 flex items-center space-x-0.5 mt-0.5">
              <span>↘</span>
              <span>1.4% vs yesterday</span>
            </span>
          </div>

          {/* 4. FEE COLLECTION */}
          <div
            onClick={() => onNavigate('finance')}
            className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-teal cursor-pointer transition"
          >
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-extrabold uppercase tracking-wider">Fee Collection</span>
              <CreditCard className="w-4 h-4 text-teal" />
            </div>
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-navy mt-1">87%</div>
            <span className="text-[10px] text-slate-500 flex items-center space-x-1 mt-0.5">
              <span>💳</span>
              <span className="font-semibold text-slate-700">₹18.2L MTD Total</span>
            </span>
          </div>

          {/* 5. ADMISSIONS MTD */}
          <div
            onClick={() => onNavigate('operations')}
            className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-teal cursor-pointer transition"
          >
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-extrabold uppercase tracking-wider">Admissions MTD</span>
              <Target className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-navy mt-1">34</div>
            <span className="text-[10px] text-slate-500 flex items-center space-x-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              <span>18 in counselling</span>
            </span>
          </div>

          {/* 6. SAFETY ALERTS */}
          <div
            onClick={() => onNavigate('safety')}
            className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-rose-400 cursor-pointer transition"
          >
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-extrabold uppercase tracking-wider">Safety Alerts</span>
              <Bell className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-rose-600 mt-1">2</div>
            <span className="text-[10px] font-bold text-rose-500 flex items-center space-x-1 mt-0.5">
              <span>⚠️</span>
              <span>Action required</span>
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions (5 Buttons) */}
      <div>
        <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 block mb-2">
          QUICK ACTIONS
        </span>
        <div className="grid grid-cols-5 gap-2 text-center">
          {/* Announce */}
          <button
            onClick={() => setIsAnnounceModalOpen(true)}
            className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-teal flex flex-col items-center justify-center transition group"
          >
            <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mb-1 group-hover:scale-110 transition">
              <Megaphone className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-navy">Announce</span>
          </button>

          {/* Approval */}
          <button
            onClick={() => onNavigate('approvals')}
            className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-teal flex flex-col items-center justify-center transition group relative"
          >
            <div className="w-10 h-10 rounded-full bg-teal/15 text-teal flex items-center justify-center mb-1 group-hover:scale-110 transition">
              <CheckSquare className="w-5 h-5" />
            </div>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-teal"></span>
            <span className="text-[11px] font-bold text-navy">Approval</span>
          </button>

          {/* Certificate */}
          <button
            onClick={() => showToast('Principal Academic Merit Certificate generator initialized')}
            className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-teal flex flex-col items-center justify-center transition group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-1 group-hover:scale-110 transition">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-navy">Certificate</span>
          </button>

          {/* Incident */}
          <button
            onClick={() => onNavigate('safety')}
            className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-rose-400 flex flex-col items-center justify-center transition group"
          >
            <div className="w-10 h-10 rounded-full bg-cyan-100 text-cyan-800 flex items-center justify-center mb-1 group-hover:scale-110 transition">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-navy">Incident</span>
          </button>

          {/* Report Gen */}
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-teal flex flex-col items-center justify-center transition group"
          >
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mb-1 group-hover:scale-110 transition">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-navy">Report Gen</span>
          </button>
        </div>
      </div>

      {/* Today's Agenda (4 Events) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-teal" />
            <h3 className="font-extrabold text-navy text-sm">Today's Agenda</h3>
          </div>
          <span className="text-[11px] font-bold bg-sky-50 text-sky-800 px-2.5 py-0.5 rounded-full border border-sky-200">
            4 Events
          </span>
        </div>

        <div className="space-y-3">
          {principalAgenda.map((agenda) => (
            <div
              key={agenda.id}
              className="flex items-start space-x-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0"
            >
              <div className="w-16 shrink-0 text-left">
                <span className="font-mono font-extrabold text-navy text-xs block">{agenda.time.split(' ')[0]}</span>
                <span className="text-[10px] text-slate-400 font-bold">{agenda.time.split(' ')[1]}</span>
              </div>

              {/* Vertical Color Pillar */}
              <div
                className="w-1 self-stretch rounded-full shrink-0"
                style={{ backgroundColor: agenda.badgeColor || '#176B87' }}
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1.5 text-[10px] font-bold uppercase text-slate-400 mb-0.5">
                  <span>•</span>
                  <span>{agenda.location}</span>
                  <span>•</span>
                  <span className="text-teal font-extrabold">{agenda.type}</span>
                </div>
                <h4 className="font-bold text-navy text-xs sm:text-sm">{agenda.title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{agenda.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* School Performance (Term 2 Analytics) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center text-teal">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-navy text-sm">School Performance</h3>
          </div>
          <span className="text-xs font-semibold text-slate-400">Term 2 Analytics</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Card 1: Attendance */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">ATTENDANCE</span>
              <span className="font-mono font-extrabold text-navy text-sm">91%</span>
            </div>
            {/* Smooth SVG Trend Curve */}
            <div className="my-2">
              <svg className="w-full h-8 stroke-teal fill-none" viewBox="0 0 100 30">
                <path
                  d="M0 25 Q 30 22, 60 14 T 95 8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="95" cy="8" r="3" className="fill-teal" />
              </svg>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">95% Target benchmark</span>
          </div>

          {/* Card 2: Pass Rate */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">PASS RATE</span>
              <span className="font-mono font-extrabold text-navy text-sm">88%</span>
            </div>
            <div className="my-2">
              <svg className="w-full h-8 stroke-[#0E2C48] fill-none" viewBox="0 0 100 30">
                <path
                  d="M0 24 Q 25 18, 50 15 T 75 22 T 95 10"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="95" cy="10" r="3" className="fill-navy" />
              </svg>
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold">+4% from midterms</span>
          </div>

          {/* Card 3: Fee Velocity */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">FEE VELOCITY</span>
              <span className="font-mono font-extrabold text-navy text-sm">₹18.2L</span>
            </div>
            <div className="my-2">
              <svg className="w-full h-8 stroke-cyan-600 fill-none" viewBox="0 0 100 30">
                <path
                  d="M0 26 Q 40 20, 70 12 T 95 6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="95" cy="6" r="3" className="fill-cyan-600" />
              </svg>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">87% of monthly quota</span>
          </div>

          {/* Card 4: Conversion */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">CONVERSION</span>
              <span className="font-mono font-extrabold text-navy text-sm">18.3%</span>
            </div>
            <div className="my-2">
              <svg className="w-full h-8 stroke-purple-600 fill-none" viewBox="0 0 100 30">
                <path
                  d="M0 24 Q 30 20, 60 18 T 95 12"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="95" cy="12" r="3" className="fill-purple-600" />
              </svg>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">34 of 186 enrolled</span>
          </div>
        </div>
      </div>

      {/* CASPA Executive AI Co-Pilot Card */}
      <div className="bg-gradient-to-r from-[#5B3FA3] to-[#173059] rounded-2xl p-5 text-white shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-white">CASPA Executive AI Co-Pilot</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-purple-100">
                Governance &amp; SLA Active
              </span>
            </div>
            <p className="text-xs text-purple-100/90 mt-1">
              Ready for {currentUser?.fullName || 'Dr. Mehta'}: Query real-time absenteeism anomalies, active POCSO/safeguarding cases, pending approval SLAs, and Term 2 fee collection velocity.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('caspa')}
          className="px-4 py-2.5 rounded-xl bg-white text-purple-950 font-bold text-xs hover:bg-purple-50 transition shrink-0 shadow-xs"
        >
          Ask CASPA AI →
        </button>
      </div>

      {/* Modal 1: Campus Announcement Broadcast */}
      {isAnnounceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Megaphone className="w-5 h-5 text-teal" />
                <h3 className="font-bold text-navy text-base">Executive Campus Announcement</h3>
              </div>
              <button
                onClick={() => setIsAnnounceModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAnnounceSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Audience</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['ALL', 'PARENTS', 'STAFF'] as const).map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setAnnouncementTarget(t)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition ${
                        announcementTarget === t
                          ? 'bg-teal text-white border-teal shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {t === 'ALL' ? 'Entire Campus' : t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Announcement Message</label>
                <textarea
                  rows={4}
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  placeholder="Enter high-priority announcement to dispatch to student portals and parent apps..."
                  className="w-full p-3 rounded-xl border border-slate-300 focus:border-teal outline-none text-xs"
                  required
                />
              </div>

              <div className="flex space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAnnounceModalOpen(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-teal text-white font-bold hover:bg-teal-dark shadow-xs flex items-center justify-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Report Generation */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-teal" />
                <h3 className="font-bold text-navy text-base">Generate Governance Report</h3>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-slate-500">
                Select statutory framework for instantaneous compliance bundle export:
              </p>
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    showToast('Exported CBSE / Statutory Accreditation Pack (PDF)');
                    setIsReportModalOpen(false);
                  }}
                  className="w-full p-3 rounded-xl border border-slate-200 hover:border-teal text-left flex items-center justify-between transition"
                >
                  <div>
                    <h5 className="font-bold text-navy">Annual Statutory Accreditation Report</h5>
                    <p className="text-[10px] text-slate-400">CBSE / State Board Compliance Format</p>
                  </div>
                  <span className="text-teal font-bold">PDF →</span>
                </button>
                <button
                  onClick={() => {
                    showToast('Exported Safeguarding & ISO 27001 Audit Ledger (CSV)');
                    setIsReportModalOpen(false);
                  }}
                  className="w-full p-3 rounded-xl border border-slate-200 hover:border-teal text-left flex items-center justify-between transition"
                >
                  <div>
                    <h5 className="font-bold text-navy">Safeguarding & ISO 27001 Audit Ledger</h5>
                    <p className="text-[10px] text-slate-400">Cryptographically signed logs</p>
                  </div>
                  <span className="text-teal font-bold">CSV →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
