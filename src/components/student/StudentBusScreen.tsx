import React, { useState } from 'react';
import {
  Bus,
  MapPin,
  Phone,
  Navigation,
  Clock,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Radio,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentBusScreen: React.FC = () => {
  const { currentUser, buses, showToast } = useApp();
  const currentBus = buses[0];
  const studentDisplayName = currentUser?.fullName || 'Elena Vance';

  const stops = [
    { name: 'South Enclave Main Gate', time: '07:30 AM', passed: true },
    { name: 'Metro Hub Station 4', time: '07:45 AM', passed: true },
    { name: `Silver Oak Apartments (${studentDisplayName}'s Stop)`, time: '08:02 AM', passed: false, isMyStop: true },
    { name: 'CASPA Central Campus Main Gate', time: '08:20 AM', passed: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar matching Teacher Module */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-teal">Transport &amp; Safety</span>
            <span>·</span>
            <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-semibold text-[11px]">
              Route 12 • Fall Term
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">
            School Transport &amp; Bus Radar
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            {studentDisplayName} • Stop: Silver Oak Apartments • Vehicle: {currentBus?.busNumber || 'KA-01-EA-4921'}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-teal/10 border border-teal/20 px-4 py-2.5 rounded-xl text-center">
            <span className="text-[10px] uppercase font-bold text-teal tracking-wider block">ETA to your Stop</span>
            <span className="text-2xl font-black text-teal font-mono">14 Mins</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Visual Map Radar (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-navy uppercase tracking-wider">
              Live Satellite Transit Radar
            </h3>
            <span className="text-xs bg-slate-100 text-slate-700 font-mono font-semibold px-2 py-0.5 rounded">
              Current Speed: 34 km/h
            </span>
          </div>

          {/* Interactive Radar Visual Canvas Container */}
          <div className="relative w-full h-80 rounded-2xl bg-[#092238] overflow-hidden border-2 border-slate-800 flex items-center justify-center">
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#16426a_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

            {/* Radar Sweep Animation Ring */}
            <div className="absolute w-64 h-64 rounded-full border border-teal/30 animate-ping opacity-30"></div>
            <div className="absolute w-44 h-44 rounded-full border border-teal/40"></div>

            {/* Route Polyline (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d="M 60 220 Q 180 180 250 140 T 460 70"
                stroke="#176B87"
                strokeWidth="4"
                strokeDasharray="6 6"
                fill="none"
              />
            </svg>

            {/* Stops Markers */}
            <div className="absolute left-14 bottom-14 flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow-md"></div>
              <span className="text-[10px] text-white font-bold bg-black/60 px-1.5 py-0.5 rounded">
                Metro Hub (Departed)
              </span>
            </div>

            {/* Elena's Stop Marker */}
            <div className="absolute left-[54%] top-[42%] flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-amber-400 border-2 border-white shadow-lg animate-bounce"></div>
              <span className="text-[10px] text-amber-200 font-extrabold bg-[#092238] border border-amber-400/40 px-2 py-0.5 rounded-md mt-1 shadow-md">
                ★ Elena’s Stop (Silver Oak)
              </span>
            </div>

            {/* Moving Bus Marker */}
            <div className="absolute left-[36%] bottom-[42%] flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center shadow-xl ring-4 ring-cyan-400/30 animate-pulse">
                <Bus className="w-4 h-4" />
              </div>
              <div className="bg-white text-navy px-2 py-1 rounded-lg text-[10px] font-extrabold shadow-md">
                KA-01-EA-4921
              </div>
            </div>

            {/* Campus Final Destination */}
            <div className="absolute right-12 top-10 flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-sky-400 border-2 border-white shadow-md"></div>
              <span className="text-[10px] text-white font-bold bg-black/60 px-1.5 py-0.5 rounded">
                CASPA Campus Gate A
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>Last GPS ping: 4 seconds ago</span>
            <span className="text-teal font-semibold">28 Students safely onboard</span>
          </div>
        </div>

        {/* Route Stops Checklist & Driver Contact */}
        <div className="space-y-6">
          {/* Driver Info Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-navy uppercase tracking-wider">
              Assigned Driver &amp; Support
            </h3>

            <div className="flex items-center space-x-3.5">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
                alt="Driver"
                className="w-12 h-12 rounded-full object-cover border-2 border-teal"
              />
              <div>
                <h4 className="font-extrabold text-navy text-sm">
                  {currentBus?.driverName || 'Manjunath Gowda'}
                </h4>
                <p className="text-xs text-slate-500 font-medium">Licensed Senior Fleet Operator</p>
                <div className="flex items-center space-x-1 mt-0.5 text-emerald-600 text-[11px] font-bold">
                  <Shield className="w-3 h-3" />
                  <span>Police Verified • Clean Record</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => showToast(`Calling driver at ${currentBus?.driverPhone}`)}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Driver</span>
              </button>
              <button
                onClick={() => showToast('Emergency Alert dispatched to Transport Control Desk')}
                className="py-2.5 px-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition flex items-center space-x-1"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>SOS</span>
              </button>
            </div>
          </div>

          {/* Stoppage Timeline */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-extrabold text-navy uppercase tracking-wider">
              Route 12 Stoppages
            </h3>

            <div className="space-y-3 relative pl-4 border-l-2 border-slate-200">
              {stops.map((stop, idx) => (
                <div key={idx} className="relative">
                  <div
                    className={`absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      stop.passed
                        ? 'bg-emerald-500'
                        : stop.isMyStop
                        ? 'bg-amber-500 ring-2 ring-amber-300'
                        : 'bg-slate-300'
                    }`}
                  ></div>
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`font-semibold ${
                        stop.isMyStop ? 'text-amber-800 font-bold' : stop.passed ? 'text-slate-500 line-through' : 'text-navy'
                      }`}
                    >
                      {stop.name}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{stop.time}</span>
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
