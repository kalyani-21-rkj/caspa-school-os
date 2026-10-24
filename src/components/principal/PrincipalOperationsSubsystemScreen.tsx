import React, { useState } from 'react';
import {
  ArrowLeft,
  Building,
  Bus,
  BookOpen,
  Package,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Radio,
  Send,
  ShieldCheck,
  ChevronRight,
  Droplets,
  Zap,
  Wrench,
  Search,
  Filter,
  FileCheck,
  FileText,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PrincipalOperationsSubsystemScreenProps {
  subsystemId: string;
  onBack: () => void;
}

export const PrincipalOperationsSubsystemScreen: React.FC<PrincipalOperationsSubsystemScreenProps> = ({
  subsystemId,
  onBack,
}) => {
  const { showToast, dispatchSubsystemAction, buses } = useApp();

  const [activeModuleId, setActiveModuleId] = useState<string>(subsystemId);
  const [fleetBroadcastMsg, setFleetBroadcastMsg] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  // Subsystem metadata
  const subsystemConfigs: Record<
    string,
    {
      title: string;
      tagline: string;
      icon: any;
      leadOfficer: string;
      primaryStat: string;
      secondaryStat: string;
    }
  > = {
    transport: {
      title: 'Transport Fleet & Route Telemetry',
      tagline: 'Real-time GPS tracking, driver rosters, and speed monitoring across 20 bus corridors',
      icon: Bus,
      leadOfficer: 'Capt. R. Deshmukh (Fleet Commander)',
      primaryStat: '18/20 Active on Route',
      secondaryStat: '99.4% On-Time Corridor Rate',
    },
    hostel: {
      title: 'Hostel & Residential Boarding',
      tagline: 'Dormitory block occupancy, warden night roll-call rosters, and campus curfew compliance',
      icon: Building,
      leadOfficer: 'Dr. M. Soni (Chief Residential Warden)',
      primaryStat: '198 / 240 Beds Occupied',
      secondaryStat: '100% Curfew Verification Today',
    },
    library: {
      title: 'Library & Learning Commons',
      tagline: 'Physical catalog circulation, digital research portals, and overdue lending recovery',
      icon: BookOpen,
      leadOfficer: 'Ms. Sunita Rao (Chief Librarian)',
      primaryStat: '94% Circulation Index',
      secondaryStat: '18 Overdue Lending Notices',
    },
    inventory: {
      title: 'Campus Inventory & Supply Chain',
      tagline: 'Science laboratory re-agents, examination stationary, and pending PO executive sign-offs',
      icon: Package,
      leadOfficer: 'Mr. Arvind Gupta (Procurement Lead)',
      primaryStat: '4 Pending Purchase Orders',
      secondaryStat: 'Lab Stock Alert Triggered',
    },
    events: {
      title: 'Auditorium & Events Logistics',
      tagline: 'Campus facility reservations, guest dignitary security clearances, and AV setup logs',
      icon: Calendar,
      leadOfficer: 'Mrs. Kavita Nair (Events Coordinator)',
      primaryStat: '2 Major Events Scheduled',
      secondaryStat: 'Auditorium Capacity 850',
    },
    admissions: {
      title: 'Admissions & Enrolment Pipeline',
      tagline: 'Candidate CRM funnel, scholarship entrance tests, and Dr. Mehta executive interview queue',
      icon: Users,
      leadOfficer: 'Mr. Pradeep Joshi (Head of Admissions)',
      primaryStat: '34 Active Enquiries',
      secondaryStat: '18.3% Pipeline Conversion',
    },
  };

  const currentConfig = subsystemConfigs[activeModuleId] || subsystemConfigs.transport;
  const IconComponent = currentConfig.icon;

  // Actions
  const handleFleetBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fleetBroadcastMsg.trim()) return;
    dispatchSubsystemAction('transport', 'FLEET_EMERGENCY_BROADCAST', fleetBroadcastMsg);
    setFleetBroadcastMsg('');
    setIsBroadcasting(false);
  };

  const handleApprovePO = (poId: string, itemTitle: string, amount: string) => {
    dispatchSubsystemAction('inventory', 'APPROVE_PURCHASE_ORDER', `Approved ${poId} for ${itemTitle} (${amount})`);
    showToast(`Principal sign-off recorded for ${poId}`);
  };

  const handleDispatchHostelMaintenance = (block: string) => {
    dispatchSubsystemAction('hostel', 'DISPATCH_FACILITY_TECH', `Priority water sensor technician dispatched to ${block}`);
    showToast(`Dispatched plumbing & sensor maintenance crew to ${block}`);
  };

  const handleSendLibraryReminder = (studentName: string, bookTitle: string) => {
    dispatchSubsystemAction('library', 'OVERDUE_RECALL_NOTICE', `Dispatched recall notice to ${studentName} for "${bookTitle}"`);
    showToast(`Notice sent to ${studentName}`);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Back Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-[#0E2C48] bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition group w-fit"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-0.5 transition" />
          <span>Back to Operations Overview</span>
        </button>

        {/* Subsystem Switcher Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {Object.keys(subsystemConfigs).map((key) => {
            const conf = subsystemConfigs[key];
            const isSelected = activeModuleId === key;
            return (
              <button
                key={key}
                onClick={() => setActiveModuleId(key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#0E2C48] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {conf.title.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subsystem Hero Header */}
      <div className="bg-[#0E2C48] text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-teal/20 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-0.5 rounded-full bg-teal/30 text-teal-200 text-xs font-bold border border-teal/40 flex items-center space-x-1.5">
                <IconComponent className="w-3.5 h-3.5" />
                <span>Operational Pillar</span>
              </span>
              <span className="text-xs text-sky-200/80 font-medium">AY 2026-27</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{currentConfig.title}</h1>
            <p className="text-xs sm:text-sm text-sky-100/90 max-w-xl">{currentConfig.tagline}</p>
            <div className="text-xs text-sky-200/70 pt-1">
              Officer-in-Charge: <span className="font-bold text-white">{currentConfig.leadOfficer}</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 text-right shrink-0">
            <div className="text-[11px] font-bold text-sky-200 uppercase tracking-wider">Telemetry Pulse</div>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">{currentConfig.primaryStat}</div>
            <div className="text-xs text-teal-300 font-bold mt-1 flex items-center justify-end space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{currentConfig.secondaryStat}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SUBSYSTEM 1: TRANSPORT */}
      {activeModuleId === 'transport' && (
        <div className="space-y-6">
          {/* Emergency Fleet Broadcast Bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#0E2C48]">
                <Radio className="w-4 h-4 text-sky-600 animate-pulse" />
                <span>Executive Fleet Communication Link</span>
              </div>
              <span className="text-xs text-slate-400">Direct audio & visual ping to all 20 dashboard consoles</span>
            </div>

            <form onSubmit={handleFleetBroadcast} className="flex gap-2">
              <input
                type="text"
                value={fleetBroadcastMsg}
                onChange={(e) => setFleetBroadcastMsg(e.target.value)}
                placeholder="Type emergency traffic diversion, bad weather advisory, or schedule shift..."
                className="flex-1 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#0E2C48] hover:bg-[#123B5D] text-white text-xs font-bold flex items-center space-x-1.5 transition shadow-xs shrink-0"
              >
                <Send className="w-3.5 h-3.5 text-teal" />
                <span>Broadcast</span>
              </button>
            </form>
          </div>

          {/* Bus Fleet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 'BUS-01', route: 'Route 1 • North Sector', driver: 'Rajesh Kumar', speed: '38 km/h', status: 'ON_ROUTE', delay: 'On Time', capacity: '42/48' },
              { id: 'BUS-04', route: 'Route 4 • Oakridge Estate', driver: 'Sukhvinder Singh', speed: '42 km/h', status: 'ON_ROUTE', delay: '+4m delay', capacity: '46/48' },
              { id: 'BUS-08', route: 'Route 8 • Green Hills Metro', driver: 'Mohammed Ali', speed: '31 km/h', status: 'ON_ROUTE', delay: 'On Time', capacity: '39/48' },
              { id: 'BUS-11', route: 'Route 11 • West Campus Link', driver: 'Prakash Rao', speed: '0 km/h (At Stop)', status: 'STOP_BOARDING', delay: 'On Time', capacity: '35/48' },
              { id: 'BUS-14', route: 'Route 14 • Valley Ridge', driver: 'Anil Verma', speed: '0 km/h (Depot)', status: 'MAINTENANCE_DUE', delay: 'Inspection Req', capacity: '0/48' },
              { id: 'BUS-18', route: 'Route 18 • Science City Ring', driver: 'Harish Nair', speed: '40 km/h', status: 'ON_ROUTE', delay: 'On Time', capacity: '44/48' },
            ].map((bus) => (
              <div
                key={bus.id}
                className={`p-4 rounded-2xl border transition ${
                  bus.status === 'MAINTENANCE_DUE'
                    ? 'border-amber-300 bg-amber-50/40'
                    : 'border-slate-200 bg-white shadow-2xs hover:border-teal'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-black text-sm text-[#0E2C48]">{bus.id}</span>
                    <span className="text-[10px] font-bold text-slate-500">{bus.capacity}</span>
                  </div>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      bus.status === 'MAINTENANCE_DUE'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {bus.delay}
                  </span>
                </div>

                <div className="text-xs font-bold text-[#0E2C48]">{bus.route}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Driver: {bus.driver} • Speed: {bus.speed}</div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-[11px]">
                  <span className="text-slate-400">GPS Geo-fence: Normal</span>
                  <button
                    onClick={() => {
                      dispatchSubsystemAction('transport', 'BUS_PING', `Pinged driver console of ${bus.id}`);
                      showToast(`Driver ${bus.driver} acknowledge signal received`);
                    }}
                    className="font-bold text-teal hover:text-[#0E2C48]"
                  >
                    Ping Vehicle &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBSYSTEM 2: HOSTEL */}
      {activeModuleId === 'hostel' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                block: 'Block A (Senior Boys)',
                warden: 'Prof. S. R. Murthy',
                capacity: '80 beds',
                occupied: '74 occupied (92%)',
                alert: null,
                status: 'Roll Call Verified (21:30)',
              },
              {
                block: 'Block B (Senior Girls)',
                warden: 'Dr. Ananya Sen',
                capacity: '80 beds',
                occupied: '72 occupied (90%)',
                alert: 'Water sensor anomaly reported on 2nd Floor',
                status: 'Roll Call Verified (21:30)',
              },
              {
                block: 'Block C (Junior Dormitory)',
                warden: 'Mr. Vivek Kaul',
                capacity: '80 beds',
                occupied: '52 occupied (65%)',
                alert: null,
                status: 'Curfew Verified (20:45)',
              },
            ].map((d) => (
              <div key={d.block} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-[#0E2C48] text-sm">{d.block}</h3>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="text-xs text-slate-600">
                  <div>Chief Warden: <span className="font-semibold text-slate-800">{d.warden}</span></div>
                  <div className="font-bold text-teal mt-1">{d.occupied}</div>
                </div>

                {d.alert ? (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 space-y-2">
                    <div className="flex items-center space-x-1.5 font-bold">
                      <Droplets className="w-4 h-4 text-amber-600" />
                      <span>{d.alert}</span>
                    </div>
                    <button
                      onClick={() => handleDispatchHostelMaintenance(d.block)}
                      className="w-full py-1.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] transition"
                    >
                      Dispatch Facility Maintenance Crew
                    </button>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{d.status}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBSYSTEM 3: LIBRARY */}
      {activeModuleId === 'library' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-[#0E2C48] text-base">Overdue Lending & Repertoire Notice Queue</h3>
              <p className="text-xs text-slate-500 mt-0.5">Automated return tracking across senior and secondary stacks</p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              18 Overdue Items
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {[
              { id: 'lib-1', student: 'Marcus Brody (9B)', title: 'Higher Algebra by Hall & Knight', days: 12, fine: '₹60' },
              { id: 'lib-2', student: 'Rohan Deshmukh (11A)', title: 'University Physics (Young & Freedman)', days: 18, fine: '₹90' },
              { id: 'lib-3', student: 'Tara Sen (10C)', title: 'Campbell Biology (12th Edition)', days: 9, fine: '₹45' },
              { id: 'lib-4', student: 'Devon Patel (9B)', title: 'Introduction to Algorithms (CLRS)', days: 22, fine: '₹110' },
            ].map((book) => (
              <div key={book.id} className="py-3.5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-[#0E2C48]">{book.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Borrowed by: <span className="font-semibold text-slate-700">{book.student}</span> • Overdue: {book.days} days
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <span className="text-xs font-bold text-rose-600">Fine: {book.fine}</span>
                  </div>
                  <button
                    onClick={() => handleSendLibraryReminder(book.student, book.title)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition"
                  >
                    Send Recall Notice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBSYSTEM 4: INVENTORY */}
      {activeModuleId === 'inventory' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-[#0E2C48] text-base">Pending Purchase Order Authorizations</h3>
                <p className="text-xs text-slate-500 mt-0.5">Principal statutory approval required for academic equipment exceeding ₹50,000</p>
              </div>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                4 Purchase Orders Pending
              </span>
            </div>

            <div className="space-y-3">
              {[
                { id: 'PO-4092', dept: 'Science Laboratories', item: 'Organic Chemistry Glassware & Spectrophotometer Reagents', amount: '₹1,24,000', vendor: 'ThermoFisher Scientific' },
                { id: 'PO-4095', dept: 'Computer Science Dept', item: '40 Raspberry Pi 5 Robotics Kits for Grade 9 Innovation Lab', amount: '₹2,80,000', vendor: 'Element14 Tech' },
                { id: 'PO-4098', dept: 'Examination Cell', item: 'OEMS Optical Mark Reader Examination Answer Sheets (10,000 units)', amount: '₹65,000', vendor: 'Apex Security Printers' },
                { id: 'PO-4101', dept: 'Sports & Athletics', item: 'Synthetic Basketball Court Resurfacing & Tournament Equipment', amount: '₹1,95,000', vendor: 'SportMaster Infrastructure' },
              ].map((po) => (
                <div key={po.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-sky-700 bg-sky-100 px-2 py-0.5 rounded">{po.id}</span>
                      <span className="text-xs font-bold text-slate-500">{po.dept}</span>
                    </div>
                    <div className="font-extrabold text-sm text-[#0E2C48] mt-1">{po.item}</div>
                    <div className="text-xs text-slate-400 mt-0.5">Vendor: {po.vendor}</div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end space-x-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                    <div className="text-right">
                      <div className="text-base font-black text-[#0E2C48]">{po.amount}</div>
                      <div className="text-[10px] text-emerald-600 font-bold">Budget Allocated</div>
                    </div>
                    <button
                      onClick={() => handleApprovePO(po.id, po.item, po.amount)}
                      className="px-4 py-2 rounded-xl bg-teal hover:bg-teal/90 text-white text-xs font-bold flex items-center space-x-1.5 transition shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve PO</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBSYSTEM 5: EVENTS */}
      {activeModuleId === 'events' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h3 className="font-extrabold text-[#0E2C48] text-base">Auditorium & Major Campus Calendar</h3>
            <p className="text-xs text-slate-500 mt-0.5">Executive logistical and safety sign-offs for upcoming institutional gatherings</p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Annual Inter-School STEM Symposium & Robotics Olympiad',
                date: 'November 14, 2026 • 09:00 AM - 04:30 PM',
                venue: 'Main Auditorium & Science Concourse',
                attendees: '450 Scholars from 18 Schools',
                chiefGuest: 'Dr. K. Radhakrishnan (Former Chairman, ISRO)',
                status: 'Security Clearance Approved',
              },
              {
                title: 'Founders Memorial Day & Annual Cultural Gala',
                date: 'December 04, 2026 • 05:00 PM - 09:00 PM',
                venue: 'Central Amphitheatre',
                attendees: '1,200 Attendees (Parents, Alumni & Faculty)',
                chiefGuest: 'Hon. Education Secretary',
                status: 'Logistics Protocol in Review',
              },
            ].map((ev, i) => (
              <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-base text-[#0E2C48]">{ev.title}</h4>
                  <span className="text-xs font-bold text-teal bg-teal/10 px-2.5 py-1 rounded-full">{ev.status}</span>
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  <div>Date: <span className="font-bold text-slate-800">{ev.date}</span></div>
                  <div>Venue: <span className="font-bold text-slate-800">{ev.venue}</span> • {ev.attendees}</div>
                  <div className="text-sky-700 font-bold mt-1">Dignitary: {ev.chiefGuest}</div>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      dispatchSubsystemAction('events', 'EVENT_CLEARANCE', `Signed event security and logistical protocol for ${ev.title}`);
                      showToast(`Safety & logistical clearance authorized for "${ev.title}"`);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#0E2C48] hover:bg-[#123B5D] text-white text-xs font-bold transition shadow-xs"
                  >
                    Confirm Executive Sign-off
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBSYSTEM 6: ADMISSIONS */}
      {activeModuleId === 'admissions' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-[#0E2C48] text-base">Admissions & Enrolment Funnel (AY 2026-27)</h3>
              <p className="text-xs text-slate-500 mt-0.5">Prospect lead tracking and scheduled interviews with Dr. Mehta</p>
            </div>
            <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              34 Active Pipeline Enquiries
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            {[
              { stage: '1. Enquiries', count: 342, bg: 'bg-slate-50' },
              { stage: '2. Campus Tours', count: 184, bg: 'bg-slate-50' },
              { stage: '3. Tests Cleared', count: 92, bg: 'bg-slate-50' },
              { stage: '4. Interviews', count: 34, bg: 'bg-teal/10 text-teal font-black' },
              { stage: '5. Enrolled', count: 24, bg: 'bg-emerald-50 text-emerald-700 font-black' },
            ].map((st) => (
              <div key={st.stage} className={`p-3.5 rounded-xl border border-slate-200 ${st.bg}`}>
                <div className="text-[10px] uppercase font-bold text-slate-500">{st.stage}</div>
                <div className="text-xl font-black mt-1">{st.count}</div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <h4 className="font-extrabold text-sm text-[#0E2C48] mb-3">Scheduled Principal Candidate Interviews Today</h4>
            <div className="space-y-3">
              {[
                { time: '02:30 PM', student: 'Aarav Singhania', applyingFor: 'Grade 11 (Science AP Track)', parents: 'Mr. & Mrs. Singhania (VP, Tech Mahindra)', score: '94% in Diagnostic Test' },
                { time: '04:00 PM', student: 'Zoya Merchant', applyingFor: 'Grade 9 (Secondary Standard)', parents: 'Dr. F. Merchant (Chief of Surgery)', score: '91% in Diagnostic Test' },
              ].map((cand, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-teal bg-teal/10 px-2 py-0.5 rounded">{cand.time}</span>
                      <span className="font-bold text-sm text-[#0E2C48]">{cand.student}</span>
                      <span className="text-xs text-slate-500">({cand.applyingFor})</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Parents: {cand.parents} • Assessment: <span className="font-semibold text-emerald-700">{cand.score}</span></div>
                  </div>

                  <button
                    onClick={() => {
                      dispatchSubsystemAction('admissions', 'OFFER_LETTER_GRANTED', `Approved admission offer for ${cand.student} (${cand.applyingFor})`);
                      showToast(`Offer letter authorized for ${cand.student}`);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#0E2C48] hover:bg-[#123B5D] text-white text-xs font-bold transition shadow-xs shrink-0"
                  >
                    Authorize Offer Letter
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
