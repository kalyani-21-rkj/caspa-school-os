import React, { useState } from 'react';
import {
  Bus,
  MapPin,
  Phone,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Compass,
  CheckCircle2,
  Navigation,
  Radio,
  FileText,
  UserCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ParentTransportScreen: React.FC = () => {
  const {
    activeChild,
    parentTransport,
    showToast,
  } = useApp();

  const [isSosActive, setIsSosActive] = useState(false);

  const handleTriggerSos = () => {
    setIsSosActive(true);
    showToast('Emergency SOS hotline alerted. Safety Officer dispatching check.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Live Fleet Telemetry &amp; GPS
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold font-mono">
              {parentTransport.routeNumber}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time satellite GPS tracking, RFID student boarding logs, and driver contact
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleTriggerSos}
            className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center space-x-1.5 shadow-sm ${
              isSosActive
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>{isSosActive ? 'SOS DISPATCHED' : 'SOS Emergency'}</span>
          </button>
          <a
            href={`tel:${parentTransport.driverPhone}`}
            className="px-4 py-2 rounded-xl bg-teal hover:bg-teal-dark text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-xs"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Driver</span>
          </a>
        </div>
      </div>

      {/* Hero Telemetry Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0E2C48] via-[#123B5D] to-[#16426a] text-white shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Transit Vehicle
            </span>
            <div className="text-lg font-black text-white mt-0.5">{parentTransport.busNumber}</div>
            <span className="text-[11px] text-cyan-200">AC Fleet • Euro VI</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Live Velocity
            </span>
            <div className="text-lg font-black text-cyan-300 font-mono mt-0.5">
              {parentTransport.currentSpeedKmH} km/h
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold">Speed Governor Active</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Next Stop Arrival
            </span>
            <div className="text-lg font-black text-amber-300 mt-0.5">
              In {parentTransport.etaNextStopMins} Mins
            </div>
            <span className="text-[11px] text-slate-300 truncate block">
              {parentTransport.nextStopName}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              RFID Onboard
            </span>
            <div className="text-lg font-black text-emerald-400 mt-0.5">
              {parentTransport.rfidBoardedCount} / {parentTransport.totalCapacity}
            </div>
            <span className="text-[11px] text-slate-300">
              {activeChild.fullName}: <strong className="text-emerald-300">Onboard</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Simulated Live GPS Map Canvas */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
            <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>Interactive GPS Satellite Map • Route 4B Real-Time Path</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            Lat: 12.9716° N • Lon: 77.5946° E
          </span>
        </div>

        {/* Map Visual Graphic */}
        <div className="relative h-72 w-full bg-[#1A2E40] overflow-hidden flex items-center justify-center p-6">
          {/* Grid lines background */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                'linear-gradient(#4fd1c5 1px, transparent 1px), linear-gradient(90deg, #4fd1c5 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Simulated Road Path Vector */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path
              d="M 50 200 Q 200 80, 400 160 T 750 120"
              fill="transparent"
              stroke="#0D9488"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="8 6"
            />
          </svg>

          {/* Stops along the road */}
          <div className="absolute left-[10%] top-[60%] flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-md" />
            <span className="text-[10px] font-bold text-white mt-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
              Palm Meadows
            </span>
          </div>

          <div className="absolute left-[30%] top-[35%] flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-md" />
            <span className="text-[10px] font-bold text-white mt-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
              Silver Oaks Gate 2
            </span>
          </div>

          {/* Current Bus Position Marker */}
          <div className="absolute left-[52%] top-[45%] flex flex-col items-center z-20">
            <div className="relative">
              <span className="absolute -inset-2 rounded-full bg-cyan-400 opacity-75 animate-ping" />
              <div className="w-10 h-10 rounded-2xl bg-cyan-500 text-slate-900 border-2 border-white flex items-center justify-center shadow-2xl font-black">
                <Bus className="w-5 h-5 text-slate-900" />
              </div>
            </div>
            <div className="mt-2 bg-[#0E2C48] text-white px-3 py-1 rounded-xl text-center border border-cyan-400/40 shadow-xl">
              <p className="text-[10px] font-extrabold text-cyan-300">Route 4B Bus</p>
              <p className="text-[9px] text-slate-300 font-mono">34 km/h • Green Glen Next</p>
            </div>
          </div>

          {/* Home Stop Marker */}
          <div className="absolute left-[65%] top-[55%] flex flex-col items-center z-10">
            <div className="w-5 h-5 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center shadow-lg">
              <MapPin className="w-3 h-3 text-slate-900" />
            </div>
            <span className="text-[10px] font-extrabold text-amber-300 mt-1 bg-black/70 px-2 py-0.5 rounded border border-amber-400/40">
              Your Stop: Green Glen (4 mins)
            </span>
          </div>

          {/* School Destination Marker */}
          <div className="absolute right-[8%] top-[30%] flex flex-col items-center">
            <div className="w-5 h-5 rounded-full bg-purple-500 border-2 border-white shadow-md flex items-center justify-center">
              <Compass className="w-3 h-3 text-white" />
            </div>
            <span className="text-[10px] font-bold text-white mt-1 bg-black/60 px-2 py-0.5 rounded">
              CASPA Central Campus
            </span>
          </div>
        </div>
      </div>

      {/* RFID Student Boarding Logs & Route Stops Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* RFID Boarding Logs (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b pb-3">
            <h3 className="font-extrabold text-sm text-slate-900">
              Student RFID Boarding Verification
            </h3>
            <p className="text-xs text-slate-500">
              Automated NFC scanner records for {activeChild.fullName}
            </p>
          </div>

          <div className="space-y-3">
            {parentTransport.studentRfidLogs.map((log, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start space-x-3 text-xs"
              >
                <div
                  className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                    log.status === 'ARRIVED_CAMPUS'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-teal text-white'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900">
                      {log.tripType} TRIP • {log.status}
                    </span>
                    <span className="font-mono text-slate-500 font-bold">{log.timestamp}</span>
                  </div>
                  <p className="text-slate-600 mt-1 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-teal shrink-0" />
                    <span className="truncate">{log.location}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Stop Route Checklist (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                Route 4B Stop Checklist &amp; ETAs
              </h3>
              <p className="text-xs text-slate-500">Scheduled sequence of morning pickups</p>
            </div>
            <span className="text-xs font-bold text-teal">5 Stops Total</span>
          </div>

          <div className="space-y-3">
            {parentTransport.stops.map((stop) => (
              <div
                key={stop.stopNumber}
                className={`p-3 rounded-xl border flex items-center justify-between text-xs transition ${
                  stop.isCurrent
                    ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-300/20'
                    : stop.isCompleted
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      stop.isCompleted
                        ? 'bg-emerald-500 text-white'
                        : stop.isCurrent
                        ? 'bg-amber-500 text-white animate-bounce'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {stop.stopNumber}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-800">{stop.name}</span>
                      {stop.isStudentStop && (
                        <span className="px-2 py-0.2 rounded-full bg-teal text-white text-[9px] font-extrabold">
                          Your Stop
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500">
                      Scheduled: {stop.scheduledTime}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                    stop.isCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : stop.isCurrent
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {stop.isCompleted ? 'DEPARTED' : stop.isCurrent ? 'APPROACHING' : 'SCHEDULED'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Driver & Crew Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase">Bus Captain</p>
            <h4 className="font-extrabold text-sm text-slate-900 mt-0.5">{parentTransport.driverName}</h4>
            <p className="text-xs text-slate-500 mt-0.5">{parentTransport.driverPhone}</p>
          </div>
          <a
            href={`tel:${parentTransport.driverPhone}`}
            className="p-2.5 rounded-xl bg-teal text-white hover:bg-teal-dark transition shadow-xs"
            title="Call Driver"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase">Bus Conductor</p>
            <h4 className="font-extrabold text-sm text-slate-900 mt-0.5">{parentTransport.conductorName}</h4>
            <p className="text-xs text-slate-500 mt-0.5">{parentTransport.conductorPhone}</p>
          </div>
          <a
            href={`tel:${parentTransport.conductorPhone}`}
            className="p-2.5 rounded-xl bg-teal text-white hover:bg-teal-dark transition shadow-xs"
            title="Call Conductor"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase">Fleet Operations</p>
            <h4 className="font-extrabold text-sm text-slate-900 mt-0.5">Central Control Desk</h4>
            <p className="text-xs text-slate-500 mt-0.5">{parentTransport.safetyOfficerPhone}</p>
          </div>
          <a
            href={`tel:${parentTransport.safetyOfficerPhone}`}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
            title="Call Transport Control"
          >
            <Phone className="w-4 h-4 text-slate-700" />
          </a>
        </div>
      </div>
    </div>
  );
};
