import React, { useState } from 'react';
import {
  LogOut,
  ChevronDown,
  Search,
  Sparkles,
  UserCheck,
  Shield,
  Bell,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CaspaLogo } from './CaspaLogo';
import { RoleType } from '../types';

interface HeaderProps {
  onOpenCodeExport?: () => void;
  onOpenCaspa: () => void;
}

interface NotificationItem {
  id: string;
  category:
    | 'Academic'
    | 'Finance'
    | 'Attendance'
    | 'Transport'
    | 'Hostel'
    | 'Safety'
    | 'Events'
    | 'Approval'
    | 'System';
  title: string;
  detail: string;
  time: string;
  unread: boolean;
  isEmergency?: boolean;
  targetTab: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    category: 'Safety',
    title: 'Statutory SLA Alert: Case #SAFE-2026-894',
    detail: 'Anti-Ragging & Child Protection committee review scheduled at 15:30.',
    time: '8m ago',
    unread: true,
    isEmergency: true,
    targetTab: 'safety',
  },
  {
    id: 'notif-2',
    category: 'Approval',
    title: 'Executive Approval Pending (SLA 2h)',
    detail: 'Science Lab Spectrophotometer PO-4092 (₹1,24,000) awaiting sign-off.',
    time: '19m ago',
    unread: true,
    targetTab: 'approvals',
  },
  {
    id: 'notif-3',
    category: 'Transport',
    title: 'Bus Route 12 Telemetry Update',
    detail: 'KA-01-EA-4921 approaching Silver Oak Stop • 28/35 students aboard.',
    time: '26m ago',
    unread: true,
    targetTab: 'transport',
  },
  {
    id: 'notif-4',
    category: 'Academic',
    title: 'Term 2 Unit 4 Thermodynamics Notes Published',
    detail: 'Dr. Aris Thorne uploaded verified lecture notes and formula sheet.',
    time: '42m ago',
    unread: false,
    targetTab: 'academics',
  },
  {
    id: 'notif-5',
    category: 'Finance',
    title: 'Term 2 Fee Collection Milestone',
    detail: '94.2% collection velocity achieved; 3 automated receipts issued.',
    time: '1h ago',
    unread: false,
    targetTab: 'finance',
  },
  {
    id: 'notif-6',
    category: 'Hostel',
    title: 'Hostel Block B Night Roll-Call Verified',
    detail: '198/240 beds occupied • Curfew biometric verification 100% complete.',
    time: '2h ago',
    unread: false,
    targetTab: 'erp-hub',
  },
  {
    id: 'notif-7',
    category: 'Attendance',
    title: 'Morning Biometric Attendance Synced',
    detail: '96.4% student attendance & 98.1% faculty duty check-in recorded.',
    time: '3h ago',
    unread: false,
    targetTab: 'attendance',
  },
  {
    id: 'notif-8',
    category: 'Events',
    title: 'Inter-School STEM & Robotics Olympiad',
    detail: '450 scholars registered across 18 schools for Nov 14 Auditorium event.',
    time: '4h ago',
    unread: false,
    targetTab: 'erp-hub',
  },
  {
    id: 'notif-9',
    category: 'System',
    title: 'RBAC Zero-Trust Policy Audit Passed',
    detail: 'All 76 enterprise screens & role-permission scopes verified.',
    time: '5h ago',
    unread: false,
    targetTab: 'rbac',
  },
];

export const Header: React.FC<HeaderProps> = ({ onOpenCaspa }) => {
  const {
    currentUser,
    authenticatedUser,
    canAccessAllModules,
    currentRole,
    setRole,
    setActiveTab,
    showToast,
    logout,
  } = useApp();

  const [searchVal, setSearchVal] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isCampusDropdownOpen, setIsCampusDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState('Main Campus (K-12) • AY 2026-27');
  const [notifCategory, setNotifCategory] = useState<string>('All');
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const campuses = [
    { id: 'c-main', name: 'Main Campus (K-12) • AY 2026-27', students: '1,420 Scholars', code: 'BLR-MAIN' },
    { id: 'c-north', name: 'North Wing Primary & Pre-Primary', students: '540 Scholars', code: 'BLR-NRTH' },
    { id: 'c-ib', name: 'South International IB & Cambridge', students: '490 Scholars', code: 'BLR-INTL' },
    { id: 'c-all', name: 'All Campuses Consolidated (Multi-School)', students: '2,450 Scholars', code: 'ORG-ALL' },
  ];

  const roleOptions: { role: RoleType; label: string; desc: string; badge: string }[] = [
    { role: 'ADMIN', label: 'Arthur Clark', desc: 'School Admin & Operations Director', badge: 'Admin Console' },
    { role: 'PRINCIPAL', label: 'Dr. Mehta', desc: 'Principal & Executive Head', badge: 'Principal Console' },
    { role: 'VICE_PRINCIPAL', label: 'Dr. Sarah Jenkins', desc: 'Vice Principal & Academic Head', badge: 'VP Module' },
    { role: 'TEACHER', label: 'Mrs. Oswald', desc: 'Dept of Mathematics', badge: 'Teacher Portal' },
    { role: 'STUDENT', label: 'Elena Vance', desc: 'Grade 9B • Roll #14', badge: 'Student Portal' },
    { role: 'PARENT', label: 'Mrs. Anita Sharma', desc: 'Parent of Aarav (10-B) & Ananya (7-A)', badge: 'Parent Portal' },
  ];

  const moduleBadgeLabels: Record<string, string> = {
    ADMIN: 'Admin Master Console',
    PRINCIPAL: 'Principal Module',
    VICE_PRINCIPAL: 'Vice Principal Module',
    TEACHER: 'Teacher Module',
    STUDENT: 'Student Module',
    PARENT: 'Parent Module',
  };

  const quickSearchItems = [
    { title: 'Admissions CRM & Lead Pipeline (Screen #27-29)', category: 'Operations ERP', tab: 'erp-hub' },
    { title: 'Hostel Building → Floor → Room → Bed & Visitors (Screen #42-45)', category: 'Operations ERP', tab: 'erp-hub' },
    { title: 'Library Catalogue, Issue/Return & Procurement PO (Screen #46-49)', category: 'Operations ERP', tab: 'erp-hub' },
    { title: 'Certificate Generator, QR Verification & Alumni (Screen #50-56)', category: 'Certificates & Alumni', tab: 'erp-hub' },
    { title: 'Central Communication, PTM & Broadcast Hub (Screen #57-58)', category: 'Engagement', tab: 'erp-hub' },
    { title: 'Analytics Drill-Down & 76-Screen Inventory (Screen #69)', category: 'Intelligence', tab: 'erp-hub' },
    { title: 'Custom Role Builder, Workflow Builder & Integrations (Screen #71-76)', category: 'Platform RBAC', tab: 'rbac' },
    { title: 'Anti-Ragging, Child Safety & 10-Stage Case Workflow (Screen #60-64)', category: 'Safeguarding', tab: 'safety' },
    { title: 'Transport Fleet GPS, Route Builder & Driver Mode (Screen #38-41)', category: 'Transport', tab: 'transport' },
    { title: 'Student Directory & Admissions Enrollment (Screen #9-10)', category: 'People', tab: 'students' },
    { title: 'HRMS, Faculty Directory, Leave & Payroll (Screen #33-37)', category: 'Business HRMS', tab: 'staff' },
    { title: 'Accounts, Fee Structures, Invoices & Receipts (Screen #30-32)', category: 'Finance', tab: 'finance' },
    { title: 'CASPA AI Copilot (Gemini 3.8 Flash Grounded)', category: 'AI Layer', tab: 'caspa' },
  ];

  const filteredSearch = quickSearchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchVal.toLowerCase()) ||
      item.category.toLowerCase().includes(searchVal.toLowerCase())
  );

  const unreadCount = notifications.filter((n) => n.unread).length;
  const notifCategories = [
    'All',
    'Academic',
    'Finance',
    'Attendance',
    'Transport',
    'Hostel',
    'Safety',
    'Events',
    'Approval',
    'System',
  ];

  const visibleNotifications =
    notifCategory === 'All'
      ? notifications
      : notifications.filter((n) => n.category === notifCategory);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast('Marked all notifications as read');
  };

  return (
    <header className="h-16 shrink-0 bg-[#123B5D] text-white flex items-center justify-between px-3 sm:px-6 select-none z-40 border-b border-[#16426a] shadow-md">
      {/* Left: Brand Logo + School & Campus Selector (PDF Section 19 & Screen #2) */}
      <div className="flex items-center space-x-3">
        <div
          onClick={() => setActiveTab('home')}
          className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#123B5D] to-[#176B87] p-1.5 flex items-center justify-center border border-white/20 shadow-md transition-transform hover:scale-105 duration-200 cursor-pointer"
          title="CASPA School OS Home"
        >
          <CaspaLogo size="sm" showText={false} />
        </div>

        {/* School & Campus Selector */}
        <div className="relative hidden lg:block">
          <button
            type="button"
            onClick={() => {
              setIsCampusDropdownOpen(!isCampusDropdownOpen);
              setIsNotifOpen(false);
              setIsRoleDropdownOpen(false);
            }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#092238] hover:bg-[#13385c] border border-[#16426a] text-xs transition cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
            <div className="text-left">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 block leading-none">
                School / Campus Scope
              </span>
              <span className="font-bold text-slate-100 text-[11px] truncate max-w-[190px] block mt-0.5">
                {selectedCampus}
              </span>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isCampusDropdownOpen && (
            <div className="absolute left-0 mt-2 w-80 bg-[#092238] border border-[#16426a] rounded-2xl shadow-2xl p-2 z-50 text-xs animate-in fade-in duration-150">
              <div className="px-3 py-1.5 border-b border-[#16426a] mb-1">
                <span className="text-[10px] uppercase font-bold text-cyan-300 block tracking-wider">
                  Multi-Campus &amp; Session Selector (Screen #2)
                </span>
                <span className="text-[10px] text-slate-400">
                  Switch active campus telemetry &amp; academic session
                </span>
              </div>
              <div className="space-y-1">
                {campuses.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setSelectedCampus(c.name);
                      setIsCampusDropdownOpen(false);
                      showToast(`Switched active campus scope to ${c.name}`);
                    }}
                    className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left transition ${
                      selectedCampus === c.name
                        ? 'bg-[#176B87] text-white font-bold'
                        : 'text-slate-200 hover:bg-white/10'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs">{c.name}</div>
                      <div className="text-[10px] text-slate-300 opacity-80">{c.students}</div>
                    </div>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 text-cyan-200">
                      {c.code}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center: Global Command / Search Bar (PDF Section 19) */}
      <div className="hidden md:flex items-center max-w-md w-full mx-4 relative">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchVal}
            onFocus={() => setIsSearchOpen(true)}
            onChange={(e) => {
              setSearchVal(e.target.value);
              setIsSearchOpen(true);
            }}
            placeholder={
              currentRole === 'STUDENT'
                ? 'Search timetable, study notes, homework, career...'
                : 'Global command search: students, CRM, hostel, RBAC, 76 screens...'
            }
            className="w-full pl-8 pr-8 py-1.5 rounded-lg bg-[#092238] text-xs text-slate-100 placeholder-slate-400 border border-[#16426a] focus:outline-none focus:border-cyan-400 transition"
          />
          {searchVal && (
            <button
              type="button"
              onClick={() => {
                setSearchVal('');
                setIsSearchOpen(false);
              }}
              className="absolute right-2.5 top-2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Command Search Results Popover */}
        {isSearchOpen && searchVal.trim().length > 0 && (
          <div className="absolute top-10 left-0 right-0 bg-[#092238] border border-[#16426a] rounded-2xl shadow-2xl p-2 z-50 text-xs max-h-80 overflow-y-auto">
            <div className="px-3 py-1 text-[10px] font-bold uppercase text-cyan-300 flex items-center justify-between">
              <span>Command Navigator ({filteredSearch.length} matches)</span>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                Esc
              </button>
            </div>
            {filteredSearch.length === 0 ? (
              <div className="p-3 text-slate-400 text-center">No matching screens or records found.</div>
            ) : (
              <div className="space-y-1 mt-1">
                {filteredSearch.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.tab);
                      setIsSearchOpen(false);
                      setSearchVal('');
                      showToast(`Navigated to ${item.title}`);
                    }}
                    className="w-full p-2 rounded-xl hover:bg-white/10 flex items-center justify-between text-left transition"
                  >
                    <div>
                      <div className="font-bold text-white text-xs">{item.title}</div>
                      <div className="text-[10px] text-cyan-300">{item.category}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2">
        {/* Categorized Notification Center (PDF Section 12) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsRoleDropdownOpen(false);
              setIsCampusDropdownOpen(false);
            }}
            className="relative p-2 rounded-xl bg-[#092238] hover:bg-[#13385c] border border-[#16426a] text-slate-200 transition cursor-pointer"
            title="Categorized Notification Center"
          >
            <Bell className="w-4 h-4 text-cyan-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#DC2626] text-white text-[9px] font-black flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="fixed sm:absolute right-2 sm:right-0 mt-2 w-[92vw] sm:w-[420px] bg-white text-[#25313C] border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in duration-150">
              <div className="p-3.5 bg-[#123B5D] text-white flex items-center justify-between">
                <div>
                  <h4 className="font-black text-xs flex items-center space-x-1.5">
                    <Bell className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Categorized Notification Center</span>
                  </h4>
                  <p className="text-[10px] text-slate-300">
                    Academic • Finance • Safety • Transport • Hostel • Approvals
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="text-[10px] font-bold text-cyan-300 hover:underline"
                  >
                    Mark all read
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsNotifOpen(false)}
                    className="text-slate-300 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Category Filter Pills (Section 12 exact 9 categories) */}
              <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
                {notifCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setNotifCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition ${
                      notifCategory === cat
                        ? 'bg-[#176B87] text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {visibleNotifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      setNotifications((prev) =>
                        prev.map((item) => (item.id === n.id ? { ...item, unread: false } : item))
                      );
                      setActiveTab(n.targetTab);
                      setIsNotifOpen(false);
                    }}
                    className={`p-3.5 hover:bg-slate-50 transition cursor-pointer flex items-start space-x-3 ${
                      n.isEmergency ? 'bg-rose-50/60' : n.unread ? 'bg-sky-50/40' : ''
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        n.isEmergency
                          ? 'bg-rose-100 text-rose-600'
                          : 'bg-teal/10 text-[#176B87]'
                      }`}
                    >
                      {n.isEmergency ? (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                            n.isEmergency
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {n.category}
                        </span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <h5 className="font-bold text-xs text-[#123B5D] mt-1">{n.title}</h5>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{n.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Module Access Indicator: Admin sees All-Module Switcher; other roles see locked module authorization */}
        {canAccessAllModules ? (
          <div className="relative">
            <button
              onClick={() => {
                setIsRoleDropdownOpen(!isRoleDropdownOpen);
                setIsNotifOpen(false);
                setIsCampusDropdownOpen(false);
              }}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#092238] hover:bg-[#13385c] border border-cyan-500/40 text-xs font-semibold transition"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-300" />
              <span className="hidden sm:inline">
                Workspace: <strong className="text-cyan-200">{moduleBadgeLabels[currentRole] || currentRole}</strong>
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#092238] border border-[#16426a] rounded-2xl shadow-2xl p-2 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 border-b border-[#16426a] mb-1">
                  <span className="text-[10px] uppercase font-bold text-cyan-300 block tracking-wider">
                    Role / Workspace Selector (Screen #3)
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Logged in as {authenticatedUser?.fullName} (Super Admin Authorization)
                  </span>
                </div>
                <div className="space-y-1">
                  {roleOptions.map((opt) => (
                    <button
                      key={opt.role}
                      onClick={() => {
                        setRole(opt.role);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left transition ${
                        currentRole === opt.role
                          ? 'bg-[#176B87] text-white shadow-xs font-bold'
                          : 'text-slate-200 hover:bg-white/10'
                      }`}
                    >
                      <div>
                        <div className="font-bold">{opt.badge}</div>
                        <div className="text-[10px] text-slate-300 opacity-80">{opt.label} • {opt.desc}</div>
                      </div>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          currentRole === opt.role ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-300'
                        }`}
                      >
                        {opt.role}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#092238] border border-[#16426a] text-xs font-semibold"
            title="Your session is strictly authorized for this module only. Sign out to switch accounts."
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline text-slate-300">
              Authorized: <strong className="text-emerald-300">{moduleBadgeLabels[currentRole] || currentRole}</strong>
            </span>
          </div>
        )}

        {/* Ask CASPA AI (Strictly CASPA Purple #5B3FA3 per Section 17) */}
        <button
          onClick={onOpenCaspa}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#5B3FA3] hover:bg-[#6c4bc0] text-white text-xs font-bold transition shadow-xs cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span className="hidden sm:inline">Ask CASPA</span>
        </button>

        {/* User Avatar & Logout */}
        <div className="flex items-center space-x-2 pl-2 border-l border-[#16426a]">
          <img
            src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
            alt={currentUser?.fullName || 'User'}
            className="w-8 h-8 rounded-full object-cover border border-teal-light shrink-0"
          />
          <div className="hidden xl:block text-left text-xs max-w-[140px] truncate">
            <p className="font-bold text-slate-100 leading-tight truncate">{currentUser?.fullName || 'User'}</p>
            <span className="text-[10px] text-teal-light font-medium block truncate">{currentUser?.designation}</span>
          </div>

          <button
            onClick={logout}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-bold transition shrink-0 cursor-pointer"
            title="Sign Out to Login Screen"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};
