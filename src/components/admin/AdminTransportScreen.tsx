import React, { useState } from 'react';
import {
  Bus,
  MapPin,
  Phone,
  Users,
  Navigation,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Search,
  ShieldCheck,
  QrCode,
  Smartphone,
  Plus,
  Wrench,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AccessControlledBadge } from '../common/AccessControlledBadge';

interface RouteStopItem {
  id: string;
  stopName: string;
  scheduledTime: string;
  studentsCount: number;
  status: 'COMPLETED' | 'NEXT_STOP' | 'UPCOMING';
}

interface BoardingStudent {
  id: string;
  name: string;
  grade: string;
  stop: string;
  rfidTag: string;
  boardedStatus: 'BOARDED' | 'PENDING' | 'DROPPED';
  scanTime?: string;
}

export const AdminTransportScreen: React.FC = () => {
  const { buses, showToast } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<
    'RADAR' | 'BUS_PROFILES' | 'ROUTE_BUILDER' | 'DRIVER_MOBILE'
  >('RADAR');
  const [searchQuery, setSearchQuery] = useState('');

  // Route Builder State (Screen #40)
  const [selectedRoute, setSelectedRoute] = useState('Route 12 • South Enclave - Campus');
  const [newStopName, setNewStopName] = useState('');
  const [newStopTime, setNewStopTime] = useState('07:42 AM');
  const [routeStops, setRouteStops] = useState<RouteStopItem[]>([
    { id: 'st-1', stopName: 'South Enclave Phase 2 Gate', scheduledTime: '07:10 AM', studentsCount: 8, status: 'COMPLETED' },
    { id: 'st-2', stopName: 'Metro Hub Station Gate 4', scheduledTime: '07:22 AM', studentsCount: 11, status: 'COMPLETED' },
    { id: 'st-3', stopName: 'Silver Oak Apartments', scheduledTime: '07:35 AM', studentsCount: 9, status: 'NEXT_STOP' },
    { id: 'st-4', stopName: 'Green Glen Layout Crossing', scheduledTime: '07:48 AM', studentsCount: 5, status: 'UPCOMING' },
    { id: 'st-5', stopName: 'CASPA Main Campus Bus Bay', scheduledTime: '08:05 AM', studentsCount: 0, status: 'UPCOMING' },
  ]);

  // QR/RFID Boarding & Driver Mobile Mode State
  const [boardingList, setBoardingList] = useState<BoardingStudent[]>([
    { id: 'bs-1', name: 'Elena Vance', grade: 'Grade 9B', stop: 'Silver Oak Apartments', rfidTag: 'RFID-9042', boardedStatus: 'BOARDED', scanTime: '07:34 AM' },
    { id: 'bs-2', name: 'Aarav Sharma', grade: 'Grade 10B', stop: 'Metro Hub Station Gate 4', rfidTag: 'RFID-8812', boardedStatus: 'BOARDED', scanTime: '07:21 AM' },
    { id: 'bs-3', name: 'Marcus Brody', grade: 'Grade 9B', stop: 'Silver Oak Apartments', rfidTag: 'RFID-7731', boardedStatus: 'PENDING' },
    { id: 'bs-4', name: 'Ananya Sharma', grade: 'Grade 7A', stop: 'Metro Hub Station Gate 4', rfidTag: 'RFID-6519', boardedStatus: 'BOARDED', scanTime: '07:22 AM' },
    { id: 'bs-5', name: 'Rohan Deshmukh', grade: 'Grade 11A', stop: 'Green Glen Layout Crossing', rfidTag: 'RFID-5408', boardedStatus: 'PENDING' },
  ]);

  const fullFleet = [
    buses[0] || {
      id: 'bus-01',
      busNumber: 'KA-01-EA-4921',
      routeNumber: 'Route 12',
      routeName: 'South Enclave - Metro Hub - Campus',
      driverName: 'Manjunath Gowda',
      driverPhone: '+91 94481 22910',
      currentLocationName: 'Near Metro Gate 4, Outer Ring Rd',
      lat: 12.9279,
      lng: 77.6271,
      speedKmH: 34,
      studentsOnBoard: 28,
      capacity: 35,
      status: 'ON_ROUTE',
      etaMinutes: 14,
      nextStop: 'Silver Oak Apartments',
    },
    {
      id: 'bus-02',
      busNumber: 'KA-01-EA-5102',
      routeNumber: 'Route 04',
      routeName: 'North Ridge - Central Station - Campus',
      driverName: 'Suresh Kumar',
      driverPhone: '+91 98450 11200',
      currentLocationName: 'Signal Junction 8, High Street',
      lat: 12.935,
      lng: 77.61,
      speedKmH: 28,
      studentsOnBoard: 31,
      capacity: 35,
      status: 'ON_ROUTE',
      etaMinutes: 9,
      nextStop: 'Oakwood Residency',
    },
    {
      id: 'bus-03',
      busNumber: 'KA-01-EA-3881',
      routeNumber: 'Route 08',
      routeName: 'East Tech Park - Cyber Valley - Campus',
      driverName: 'David D’Souza',
      driverPhone: '+91 97412 88711',
      currentLocationName: 'Tech Park Gate 2 Flyover',
      lat: 12.915,
      lng: 77.64,
      speedKmH: 42,
      studentsOnBoard: 24,
      capacity: 35,
      status: 'ON_ROUTE',
      etaMinutes: 18,
      nextStop: 'Palm Grove Crossing',
    },
    {
      id: 'bus-04',
      busNumber: 'KA-01-EA-6029',
      routeNumber: 'Route 09',
      routeName: 'West Suburbs - Green Park - Campus',
      driverName: 'Pradeep Sharma',
      driverPhone: '+91 99001 44552',
      currentLocationName: 'Campus West Gate Entrance',
      lat: 12.92,
      lng: 77.625,
      speedKmH: 12,
      studentsOnBoard: 33,
      capacity: 35,
      status: 'ARRIVED',
      etaMinutes: 0,
      nextStop: 'Campus Bus Bay 4',
    },
  ];

  const busProfilesDetailed = [
    {
      regNo: 'KA-01-EA-4921',
      route: 'Route 12',
      capacity: '35 Seats',
      driver: 'Manjunath Gowda',
      conductor: 'Ramesh Babu (Verified)',
      gpsUnit: 'AIS-140 #GPS-9012 (Online)',
      insurance: 'Valid till Dec 2027',
      fitnessCert: 'Valid till Aug 2027',
      permit: 'School Bus Permit #KA-992',
      maintenance: 'Healthy • Serviced Oct 2026',
      alert: false,
    },
    {
      regNo: 'KA-01-EA-5102',
      route: 'Route 04',
      capacity: '35 Seats',
      driver: 'Suresh Kumar',
      conductor: 'Kiran Rao (Verified)',
      gpsUnit: 'AIS-140 #GPS-9014 (Online)',
      insurance: 'Valid till Nov 2027',
      fitnessCert: 'Valid till Sep 2027',
      permit: 'School Bus Permit #KA-995',
      maintenance: 'Healthy • Brake Check Passed',
      alert: false,
    },
    {
      regNo: 'KA-01-EA-7410',
      route: 'Route 14',
      capacity: '48 Seats',
      driver: 'Anil Verma',
      conductor: 'Mahesh N (Verified)',
      gpsUnit: 'AIS-140 #GPS-9022 (Depot)',
      insurance: 'Valid till Jun 2027',
      fitnessCert: 'Renewal Due in 14 Days',
      permit: 'School Bus Permit #KA-998',
      maintenance: 'Scheduled Inspection Due',
      alert: true,
    },
  ];

  const filteredFleet = fullFleet.filter(
    (b) =>
      b.routeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.driverName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStopName.trim()) return;
    const stop: RouteStopItem = {
      id: `st-${Date.now()}`,
      stopName: newStopName.trim(),
      scheduledTime: newStopTime,
      studentsCount: 4,
      status: 'UPCOMING',
    };
    setRouteStops([...routeStops, stop]);
    setNewStopName('');
    showToast(`Added stop "${stop.stopName}" (${stop.scheduledTime}) to ${selectedRoute}`);
  };

  const toggleStudentBoarding = (id: string) => {
    setBoardingList((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const nextStatus =
          s.boardedStatus === 'PENDING'
            ? 'BOARDED'
            : s.boardedStatus === 'BOARDED'
            ? 'DROPPED'
            : 'BOARDED';
        showToast(
          `QR/RFID Verified: ${s.name} marked ${nextStatus} • Parent push notification dispatched`
        );
        return {
          ...s,
          boardedStatus: nextStatus,
          scanTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      })
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#176B87] font-semibold uppercase tracking-wider mb-1">
            <span>Section 9 • Transport Management UX • Screens #38 – #41</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#123B5D] tracking-tight">
            Transport Command Center, Route Builder &amp; Driver Mode
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Live GPS tracking, statutory vehicle compliance, QR/RFID boarding verification, and Driver Mobile Mode.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <AccessControlledBadge
            moduleName="Transport & Child GPS Telemetry"
            recordScope="Campus Fleet (Parents restricted to assigned child route)"
            sensitivityLevel="RESTRICTED"
            maskedFields={['Unlinked Student Stop Coordinates', 'Driver Personal Aadhaar']}
          />
          <button
            onClick={() => showToast('Radio ping sent to all 24 transit drivers')}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#176B87] hover:bg-[#125870] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Radio className="w-4 h-4 text-cyan-200 animate-pulse" />
            <span>Ping Fleet</span>
          </button>
        </div>
      </div>

      {/* 4 Sub-Navigation Tabs for Section 9 */}
      <div className="flex items-center space-x-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto">
        {[
          { id: 'RADAR', label: '38 & 41. Live GPS Radar & Alerts', icon: Bus },
          { id: 'BUS_PROFILES', label: '39. Bus Profiles, Insurance & Permits', icon: FileCheck },
          { id: 'ROUTE_BUILDER', label: '40. Route Builder & QR/RFID Boarding', icon: QrCode },
          { id: 'DRIVER_MOBILE', label: 'Driver Mobile Mode (Simple Field UI)', icon: Smartphone },
        ].map((t) => {
          const Icon = t.icon;
          const active = activeSubTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveSubTab(t.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 whitespace-nowrap transition cursor-pointer ${
                active ? 'bg-[#123B5D] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: LIVE GPS RADAR & COMMAND CENTER ================= */}
      {activeSubTab === 'RADAR' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Active Buses</span>
              <div className="text-xl font-extrabold text-[#123B5D] mt-0.5">24 Vehicles</div>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">QR/RFID Boarded</span>
              <div className="text-xl font-extrabold text-[#176B87] mt-0.5">642 Students</div>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Route Deviations</span>
              <div className="text-xl font-extrabold text-emerald-600 mt-0.5">0 Alerts</div>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Doc Expiry Alert</span>
              <div className="text-xl font-extrabold text-amber-600 mt-0.5">1 Bus (14d)</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by route, driver, or bus plate..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#176B87]"
              />
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Parents only see the bus route assigned to their linked child
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFleet.map((bus) => (
              <div
                key={bus.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs hover:border-[#176B87]/50 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#123B5D] text-white font-mono font-bold text-xs">
                        {bus.routeNumber}
                      </span>
                      <span className="text-xs font-mono font-semibold text-slate-500">
                        {bus.busNumber}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-sm text-[#123B5D] mt-1">{bus.routeName}</h3>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      bus.status === 'ARRIVED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-sky-100 text-sky-800 animate-pulse'
                    }`}
                  >
                    {bus.status === 'ARRIVED'
                      ? 'Arrived at Campus'
                      : `${bus.speedKmH} km/h • On Route`}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#176B87]" />
                      <strong className="truncate max-w-[200px]">{bus.currentLocationName}</strong>
                    </span>
                    <span className="font-bold text-[#123B5D] flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{bus.etaMinutes > 0 ? `ETA ${bus.etaMinutes}m` : 'At Gate'}</span>
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Student Capacity</span>
                      <span className="font-bold text-slate-700">
                        {bus.studentsOnBoard} / {bus.capacity} Seated
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#176B87] h-full rounded-full"
                        style={{ width: `${(bus.studentsOnBoard / bus.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Driver &amp; Attendant</span>
                    <span className="font-bold text-[#123B5D]">{bus.driverName}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => showToast(`Connected intercom call to ${bus.driverName} (${bus.driverPhone})`)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-[#176B87] hover:text-white text-slate-700 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Contact Driver</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 2: BUS PROFILES & STATUTORY COMPLIANCE (Screen #39) ================= */}
      {activeSubTab === 'BUS_PROFILES' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-[#123B5D]">
                Bus Profile, GPS, Insurance, Fitness &amp; Permit Registry (Screen #39)
              </h3>
              <p className="text-xs text-slate-500">
                Tracks registration, capacity, driver, conductor, GPS hardware, insurance, fitness, permit &amp; maintenance.
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Bus Reg / Route</th>
                  <th className="px-4 py-3">Driver &amp; Conductor</th>
                  <th className="px-4 py-3">GPS &amp; Capacity</th>
                  <th className="px-4 py-3">Insurance &amp; Permit</th>
                  <th className="px-4 py-3">Fitness &amp; Maintenance</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {busProfilesDetailed.map((bp) => (
                  <tr key={bp.regNo} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3">
                      <strong className="text-[#123B5D] font-mono block">{bp.regNo}</strong>
                      <span className="text-[11px] text-[#176B87] font-bold">{bp.route}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-800">{bp.driver}</div>
                      <div className="text-[11px] text-slate-500">Conductor: {bp.conductor}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-700">{bp.capacity}</div>
                      <div className="text-[10px] font-mono text-emerald-700">{bp.gpsUnit}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-emerald-700 font-semibold">{bp.insurance}</div>
                      <div className="text-[11px] text-slate-500">{bp.permit}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          bp.alert
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {bp.fitnessCert}
                      </span>
                      <div className="text-[11px] text-slate-500 mt-0.5">{bp.maintenance}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => showToast(`Logged statutory inspection check for ${bp.regNo}`)}
                        className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-[#123B5D] hover:text-white font-bold text-[11px] transition cursor-pointer"
                      >
                        Inspect File
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 3: ROUTE BUILDER & QR/RFID BOARDING (Screen #40) ================= */}
      {activeSubTab === 'ROUTE_BUILDER' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Route Stops & Timings Builder (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-[#123B5D]">
                  Interactive Route Builder (Screen #40)
                </h3>
                <p className="text-xs text-slate-500">{selectedRoute} • Bus KA-01-EA-4921</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-teal/10 text-[#176B87] text-[10px] font-bold">
                {routeStops.length} Stops Configured
              </span>
            </div>

            <form onSubmit={handleAddStop} className="flex gap-2 text-xs">
              <input
                type="text"
                value={newStopName}
                onChange={(e) => setNewStopName(e.target.value)}
                placeholder="Add new stop name (e.g. Maple Leaf Junction)..."
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200"
              />
              <input
                type="text"
                value={newStopTime}
                onChange={(e) => setNewStopTime(e.target.value)}
                className="w-24 px-2.5 py-2 rounded-xl border border-slate-200 font-mono"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-[#176B87] text-white font-bold flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Stop</span>
              </button>
            </form>

            <div className="space-y-2.5">
              {routeStops.map((st, i) => (
                <div
                  key={st.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-[#123B5D] text-white font-bold text-[10px] flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <div className="font-bold text-[#123B5D]">{st.stopName}</div>
                      <div className="text-[11px] text-slate-500">
                        Scheduled: {st.scheduledTime} • {st.studentsCount} Students Assigned
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      st.status === 'COMPLETED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : st.status === 'NEXT_STOP'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {st.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: QR / RFID Student Boarding Manifest (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-[#123B5D] flex items-center space-x-1.5">
                  <QrCode className="w-4 h-4 text-[#176B87]" />
                  <span>Live QR / RFID Boarding &amp; Drop Manifest</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Click any student badge to simulate QR/RFID boarding or drop scan.
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {boardingList.map((stu) => (
                <div
                  key={stu.id}
                  className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs hover:bg-slate-50 transition"
                >
                  <div>
                    <div className="font-bold text-[#123B5D]">
                      {stu.name} <span className="text-slate-400">({stu.grade})</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Stop: {stu.stop} • Tag: <span className="font-mono">{stu.rfidTag}</span>
                      {stu.scanTime ? ` • Scanned ${stu.scanTime}` : ''}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleStudentBoarding(stu.id)}
                    className={`px-3 py-1.5 rounded-lg font-bold text-[11px] transition cursor-pointer ${
                      stu.boardedStatus === 'BOARDED'
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : stu.boardedStatus === 'DROPPED'
                        ? 'bg-sky-100 text-sky-800 hover:bg-sky-200'
                        : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                    }`}
                  >
                    {stu.boardedStatus === 'BOARDED'
                      ? '✓ Boarded (Tap to Drop)'
                      : stu.boardedStatus === 'DROPPED'
                      ? '✓ Dropped at School'
                      : 'Scan QR / Board Now'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: SIMPLE DRIVER MOBILE MODE (Section 9, Page 8) ================= */}
      {activeSubTab === 'DRIVER_MOBILE' && (
        <div className="max-w-md mx-auto bg-[#123B5D] text-white rounded-3xl p-5 shadow-2xl border-4 border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-white/15 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                Driver Mobile Console • Ultra-Simple Mode
              </span>
              <h3 className="font-black text-base">Route 12 • KA-01-EA-4921</h3>
              <p className="text-xs text-slate-300">Driver: Manjunath Gowda</p>
            </div>
            <button
              type="button"
              onClick={() =>
                showToast('EMERGENCY SOS dispatched to Transport Manager & Campus Security!')
              }
              className="px-3.5 py-2 rounded-xl bg-[#DC2626] hover:bg-red-700 text-white font-black text-xs shadow-lg cursor-pointer"
            >
              SOS ALERT
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-between text-xs">
            <div>
              <span className="text-cyan-200 block text-[10px] uppercase font-bold">
                Next Stop (ETA 4 mins)
              </span>
              <strong className="text-sm">Silver Oak Apartments</strong>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold">
              28 / 35 Boarded
            </span>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              One-Tap Student Boarding Checklist
            </div>
            {boardingList.map((stu) => (
              <div
                key={stu.id}
                onClick={() => toggleStudentBoarding(stu.id)}
                className="p-3 rounded-2xl bg-white text-[#123B5D] flex items-center justify-between cursor-pointer shadow-xs"
              >
                <div>
                  <div className="font-black text-xs">{stu.name}</div>
                  <div className="text-[10px] text-slate-500">
                    {stu.stop} • {stu.grade}
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-xl text-xs font-black ${
                    stu.boardedStatus === 'BOARDED'
                      ? 'bg-[#16A34A] text-white'
                      : stu.boardedStatus === 'DROPPED'
                      ? 'bg-[#176B87] text-white'
                      : 'bg-[#D97706] text-white'
                  }`}
                >
                  {stu.boardedStatus}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
