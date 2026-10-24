import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  Clock,
  Star,
  Award,
  ChevronRight,
  Search,
  Filter,
  Lock,
  ArrowRight,
  ShieldCheck,
  Building,
  AlertTriangle,
  UserCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PrincipalStaffProfileScreen } from './PrincipalStaffProfileScreen';

export const PrincipalStaffScreen: React.FC = () => {
  const {
    principalStaffLeaves,
    processPrincipalStaffLeave,
    showToast,
  } = useApp();

  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'TEACHING' | 'NON_TEACHING'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isElevatedAuthModalOpen, setIsElevatedAuthModalOpen] = useState(false);
  const [authPin, setAuthPin] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  // If a staff member is selected, render the dedicated Staff Profile Screen
  if (selectedStaffId) {
    return (
      <PrincipalStaffProfileScreen
        staffId={selectedStaffId}
        onBack={() => setSelectedStaffId(null)}
      />
    );
  }

  const pendingLeaves = principalStaffLeaves.filter((l) => l.status === 'PENDING');

  const staffDirectoryList = [
    {
      id: 'stf-1',
      name: 'Mrs. Eleanor Oswald',
      role: 'Mathematics Lead • Grade 9B Tutor',
      status: 'Present / In Class Room 204',
      statusType: 'present',
      badge: 'Top Rated',
      dept: 'TEACHING',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'stf-2',
      name: 'Mr. Charles Davis',
      role: 'English Literature • Class Tutor',
      status: 'On Leave (Sep 24–25)',
      statusType: 'leave',
      badge: null,
      dept: 'TEACHING',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'stf-3',
      name: 'Ms. Rachel Higgins',
      role: 'Natural Sciences Dept • Physics',
      status: 'Present (Prep Period)',
      statusType: 'present',
      badge: null,
      dept: 'TEACHING',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'stf-4',
      name: 'Officer Davis',
      role: 'Campus Safety & Transport Lead',
      status: 'Present / Perimeter Check',
      statusType: 'present',
      badge: 'Security Lead',
      dept: 'NON_TEACHING',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'stf-5',
      name: 'Dr. Robert Vance',
      role: 'Campus Health & Clinic Officer',
      status: 'Present / Health Bay 01',
      statusType: 'present',
      badge: null,
      dept: 'NON_TEACHING',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=120&auto=format&fit=crop&q=80',
    },
  ];

  const filteredStaff = staffDirectoryList.filter((s) => {
    const matchesFilter =
      activeFilter === 'ALL' ||
      (activeFilter === 'TEACHING' && s.dept === 'TEACHING') ||
      (activeFilter === 'NON_TEACHING' && s.dept === 'NON_TEACHING');
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleVerifyAuthPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authPin === '2026' || authPin.length >= 4) {
      setIsAuthorized(true);
      setIsElevatedAuthModalOpen(false);
      showToast('Elevated Bursar / FERPA access granted for 15 minutes');
    } else {
      showToast('Invalid security clearance PIN');
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Banner: WORKFORCE PULSE (Matching image_b0cd8d0f.png) */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
          <span className="uppercase tracking-wider text-[10px]">Workforce Pulse</span>
          <span className="text-slate-400 font-mono text-[10px]">Synced 2m ago</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-sky-50/80 p-3.5 rounded-2xl border border-sky-100 shadow-2xs">
            <div className="flex items-center justify-between text-[10px] font-bold text-sky-800 uppercase">
              <span>Total Staff</span>
              <Users className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl font-black text-[#0E2C48] mt-1">96</div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase">
              <span>Present Today</span>
              <span className="w-2 h-2 rounded-full bg-teal"></span>
            </div>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="text-2xl font-black text-[#0E2C48]">91</span>
              <span className="text-[10px] font-bold text-teal bg-teal/10 px-1.5 py-0.2 rounded">
                94.8% rate
              </span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase">
              <span>On Leave</span>
              <Clock className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-600 mt-1">5</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs (All Departments, Teaching Staff (64), Non-Teaching (32)) */}
      <div className="flex space-x-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveFilter('ALL')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeFilter === 'ALL'
              ? 'bg-[#0E2C48] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Departments
        </button>
        <button
          onClick={() => setActiveFilter('TEACHING')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeFilter === 'TEACHING'
              ? 'bg-[#0E2C48] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Teaching Staff (64)
        </button>
        <button
          onClick={() => setActiveFilter('NON_TEACHING')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeFilter === 'NON_TEACHING'
              ? 'bg-[#0E2C48] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Non-Teaching (32)
        </button>
      </div>

      {/* Faculty Evaluation Overview Card (Matching image_b0cd8d0f.png) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-navy text-sm">Faculty Evaluation Overview</h3>
              <p className="text-[11px] text-slate-400">Term 1 Observational Cycle</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 bg-purple-50 px-2.5 py-1 rounded-full text-purple-700 font-black text-sm">
            <span>4.7</span>
            <span className="text-[10px] text-purple-400">/ 5.0</span>
            <Star className="w-3.5 h-3.5 fill-purple-600 text-purple-600 ml-0.5" />
          </div>
        </div>

        <div className="border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            <span>Top Commended Faculty</span>
            <span className="text-teal font-extrabold lowercase">98th pctl</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div
              onClick={() => setSelectedStaffId('stf-1')}
              className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-teal/50 hover:shadow-xs text-center flex flex-col items-center cursor-pointer transition group"
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                alt="Mrs. Oswald"
                className="w-10 h-10 rounded-full object-cover border-2 border-purple-200 group-hover:border-teal mb-1 transition"
              />
              <div className="font-bold text-xs text-[#0E2C48] truncate w-full group-hover:text-teal">Mrs. Oswald</div>
              <div className="text-[10px] text-slate-400 truncate w-full">Math Lead</div>
            </div>

            <div
              onClick={() => setSelectedStaffId('stf-2')}
              className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-teal/50 hover:shadow-xs text-center flex flex-col items-center cursor-pointer transition group"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
                alt="Mr. Davis"
                className="w-10 h-10 rounded-full object-cover border-2 border-teal/40 group-hover:border-teal mb-1 transition"
              />
              <div className="font-bold text-xs text-[#0E2C48] truncate w-full group-hover:text-teal">Mr. Davis</div>
              <div className="text-[10px] text-slate-400 truncate w-full">English Lit</div>
            </div>

            <div
              onClick={() => setSelectedStaffId('stf-3')}
              className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-teal/50 hover:shadow-xs text-center flex flex-col items-center cursor-pointer transition group"
            >
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                alt="Ms. Higgins"
                className="w-10 h-10 rounded-full object-cover border-2 border-sky-200 group-hover:border-teal mb-1 transition"
              />
              <div className="font-bold text-xs text-[#0E2C48] truncate w-full group-hover:text-teal">Ms. Higgins</div>
              <div className="text-[10px] text-slate-400 truncate w-full">Sciences</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Staff Leave Section (Matching image_b0cd8d0f.png) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-teal" />
            <h3 className="font-extrabold text-navy text-sm">Pending Staff Leave</h3>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
              {pendingLeaves.length} Actionable
            </span>
          </div>
          <button
            onClick={() => showToast('Navigated to HR Approval Hub')}
            className="text-xs font-bold text-teal hover:underline flex items-center space-x-1"
          >
            <span>Approve Hub</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {pendingLeaves.map((leave) => (
            <div
              key={leave.id}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={leave.avatarUrl}
                    alt={leave.staffName}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-[#0E2C48]">{leave.staffName}</span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          leave.leaveType === 'Medical'
                            ? 'bg-rose-100 text-rose-800'
                            : leave.leaveType === 'Casual'
                            ? 'bg-sky-100 text-sky-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {leave.leaveType}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">{leave.designationDept}</div>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {leave.durationDates}
                </span>
              </div>

              {/* Cover Note */}
              <div className="text-[11px] font-medium text-slate-700 bg-white p-2 rounded-lg border border-slate-200 flex items-center space-x-1.5">
                <UserCheck className="w-3.5 h-3.5 text-teal shrink-0" />
                <span className="truncate">{leave.note}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-1">
                <button
                  onClick={() => {
                    processPrincipalStaffLeave(leave.id, 'APPROVED');
                    showToast(`Approved leave request for ${leave.staffName}`);
                  }}
                  className="flex-1 py-1.5 rounded-lg bg-[#123B5D] hover:bg-[#176B87] text-white text-xs font-bold flex items-center justify-center space-x-1 transition shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => {
                    processPrincipalStaffLeave(leave.id, 'REJECTED');
                    showToast(`Rejected leave request for ${leave.staffName}`);
                  }}
                  className="px-4 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-600 text-xs font-semibold transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}

          {pendingLeaves.length === 0 && (
            <div className="text-center py-4 text-xs text-slate-400 bg-slate-50 rounded-xl">
              All staff leave requests are up to date
            </div>
          )}
        </div>
      </div>

      {/* Staff Directory List (Matching image_b0cd8d0f.png) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-navy text-sm">Staff Directory</h3>
            <span className="text-[11px] text-slate-400">Live Location Tracking</span>
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search faculty name or room..."
              className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-teal w-full sm:w-56"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredStaff.map((staff) => (
            <div
              key={staff.id}
              onClick={() => setSelectedStaffId(staff.id)}
              className="py-3 flex items-center justify-between hover:bg-slate-50/90 px-2 rounded-xl transition cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={staff.avatar}
                    alt={staff.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 group-hover:border-teal transition"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-white ${
                      staff.statusType === 'present' ? 'bg-teal' : 'bg-rose-500'
                    }`}
                  ></span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-[#0E2C48] group-hover:text-teal transition">{staff.name}</span>
                    {staff.badge && (
                      <span className="text-[9px] font-bold text-teal bg-teal/10 px-1.5 py-0.2 rounded">
                        {staff.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500">{staff.role}</div>
                  <div className="text-[10px] text-teal font-medium mt-0.5 flex items-center space-x-1">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        staff.statusType === 'present' ? 'bg-teal' : 'bg-rose-500'
                      }`}
                    ></span>
                    <span>{staff.status}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-xs text-slate-400 group-hover:text-teal">
                <span className="text-[11px] font-bold hidden sm:inline">View Profile</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance / FERPA Restricted Notice (Matching image_b0cd8d0f.png) */}
      <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start space-x-3">
        <Lock className="w-4 h-4 text-[#0E2C48] shrink-0 mt-0.5" />
        <div className="text-xs">
          <p className="text-slate-600 font-medium leading-relaxed">
            Payroll and salary ledgers restricted under FERPA / Bursar compliance role directives.
          </p>
          <button
            onClick={() => setIsElevatedAuthModalOpen(true)}
            className="text-teal font-extrabold hover:underline mt-1 flex items-center space-x-1"
          >
            <span>{isAuthorized ? 'Access Granted (View Ledgers)' : 'Tap to request elevated authorization'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Elevated Auth PIN Modal */}
      {isElevatedAuthModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center space-x-2 text-rose-600 mb-2">
              <ShieldCheck className="w-5 h-5" />
              <h4 className="font-extrabold text-navy text-sm">Elevated Clearance Prompt</h4>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Enter your Executive Head security token or clearance PIN to unlock FERPA-restricted faculty compensation ledgers.
            </p>
            <form onSubmit={handleVerifyAuthPin} className="space-y-3">
              <input
                type="password"
                maxLength={6}
                value={authPin}
                onChange={(e) => setAuthPin(e.target.value)}
                placeholder="Enter 4-digit PIN (Hint: 2026)"
                className="w-full text-center tracking-widest font-mono text-lg font-bold p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-teal"
                autoFocus
              />
              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsElevatedAuthModalOpen(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#0E2C48] text-white text-xs font-bold hover:bg-[#123B5D]"
                >
                  Authorize
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
