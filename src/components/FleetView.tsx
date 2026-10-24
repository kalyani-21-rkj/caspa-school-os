import React, { useState } from 'react';
import {
  Bus,
  MapPin,
  Phone,
  Users,
  Navigation,
  AlertTriangle,
  Clock,
  Gauge,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BusVehicle } from '../types';

export const FleetView: React.FC = () => {
  const { buses, showToast } = useApp();
  const [selectedBus, setSelectedBus] = useState<BusVehicle>(buses[0]);

  const onRouteCount = buses.filter((b) => b.status === 'ON_ROUTE').length;
  const delayedCount = buses.filter((b) => b.status === 'DELAYED').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-fieldBorder">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
            <span>Operations</span>
            <span>·</span>
            <span>Transport &amp; Student Logistics</span>
            <span>·</span>
            <span className="text-teal font-medium">GPS Telemetry Stream</span>
          </div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">Fleet Tracking &amp; Student Transit</h1>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-2.5 py-1 bg-green-100 text-caspaSuccess font-semibold rounded-md flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-caspaSuccess animate-pulse"></span>
            <span>{onRouteCount} Active on Route</span>
          </span>
          {delayedCount > 0 && (
            <span className="px-2.5 py-1 bg-amber-100 text-caspaWarning font-semibold rounded-md">
              {delayedCount} Delayed by Traffic
            </span>
          )}
        </div>
      </div>

      {/* Main Grid: Interactive Map Visualizer + Route Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Simulated Interactive GPS Map Visualizer (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-fieldBorder p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between text-xs border-b border-fieldBorder pb-3">
            <div className="flex items-center space-x-2">
              <Navigation className="w-4 h-4 text-teal" />
              <h3 className="font-semibold text-navy">Live Geo-Spatial GPS Radar</h3>
            </div>
            <span className="text-slate-400 font-mono text-[11px]">Refresh: 5s interval</span>
          </div>

          {/* Map Simulation Container */}
          <div className="relative h-80 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden flex flex-col justify-between p-4">
            {/* Grid Pattern Background */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(#3B82F6 1px, transparent 1px), radial-gradient(#176B87 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            ></div>

            {/* School Campus Central Hub Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-teal/20 border-2 border-teal flex items-center justify-center animate-ping absolute"></div>
              <div className="w-9 h-9 rounded-full bg-teal text-white flex items-center justify-center font-bold text-xs shadow-lg z-10">
                HQ
              </div>
              <span className="text-[10px] text-teal-light font-bold uppercase tracking-wider mt-1 bg-slate-950/80 px-2 py-0.5 rounded">
                Central Campus
              </span>
            </div>

            {/* Simulated Bus Pins on Map */}
            {buses.map((bus, idx) => {
              const isSelected = selectedBus.id === bus.id;
              // Mock coordinates scattered around HQ
              const positions = [
                { top: '25%', left: '30%' },
                { top: '35%', left: '75%' },
                { top: '70%', left: '20%' },
                { top: '75%', left: '65%' },
              ];
              const pos = positions[idx % positions.length];

              return (
                <div
                  key={bus.id}
                  style={pos}
                  onClick={() => setSelectedBus(bus)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition transform hover:scale-110 z-20 ${
                    isSelected ? 'scale-125' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 ${
                      bus.status === 'DELAYED'
                        ? 'bg-caspaWarning border-yellow-200 text-white'
                        : isSelected
                        ? 'bg-skyBlue border-white text-white'
                        : 'bg-navy border-teal-light text-slate-100'
                    }`}
                  >
                    <Bus className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-white font-mono font-bold bg-black/80 px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap block text-center">
                    {bus.routeNumber}
                  </span>
                </div>
              );
            })}

            {/* Overlay Telemetry HUD Bar */}
            <div className="relative z-10 flex items-center justify-between text-xs bg-slate-950/80 backdrop-blur-xs border border-slate-800 p-2.5 rounded-lg text-slate-300">
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-white">{selectedBus.routeNumber}</span>
                <span>·</span>
                <span className="font-mono text-teal-light">{selectedBus.busNumber}</span>
                <span>·</span>
                <span>Speed: <strong className="text-white font-mono">{selectedBus.speedKmH} km/h</strong></span>
              </div>
              <span className="text-[11px] text-slate-400">Next: {selectedBus.nextStop}</span>
            </div>
          </div>

          {/* Selected Bus Telemetry Card */}
          <div className="p-4 bg-surface rounded-lg border border-fieldBorder text-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-navy text-sm">{selectedBus.routeName}</h4>
                <p className="text-slate-500 text-[11px]">Current: {selectedBus.currentLocationName}</p>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  selectedBus.status === 'DELAYED' ? 'bg-amber-100 text-caspaWarning' : 'bg-green-100 text-caspaSuccess'
                }`}
              >
                {selectedBus.status.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-1 border-t border-slate-200 text-slate-600">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Driver</span>
                <span className="font-semibold text-slate-800">{selectedBus.driverName}</span>
                <p className="text-[10px] text-teal font-mono">{selectedBus.driverPhone}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Occupancy</span>
                <span className="font-mono font-bold text-navy">
                  {selectedBus.studentsOnBoard} / {selectedBus.capacity}
                </span>
                <p className="text-[10px] text-slate-500">RFID Tap Verified</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Drop-off ETA</span>
                <span className="font-mono font-bold text-teal text-sm">
                  {selectedBus.etaMinutes} Mins
                </span>
                <p className="text-[10px] text-slate-500">Traffic factored</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Fleet Roster Cards (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-fieldBorder p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-fieldBorder pb-2 text-xs">
            <span className="font-semibold text-navy">All Transport Routes ({buses.length})</span>
            <span className="text-[11px] text-slate-400">Click to focus on radar</span>
          </div>

          <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            {buses.map((bus) => {
              const isSelected = selectedBus.id === bus.id;
              return (
                <div
                  key={bus.id}
                  onClick={() => setSelectedBus(bus)}
                  className={`p-3 rounded-lg border cursor-pointer transition text-xs ${
                    isSelected
                      ? 'border-navy bg-slate-50 ring-1 ring-navy'
                      : 'border-fieldBorder bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-navy">{bus.routeNumber}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        bus.status === 'DELAYED'
                          ? 'bg-amber-100 text-caspaWarning'
                          : 'bg-green-100 text-caspaSuccess'
                      }`}
                    >
                      {bus.status.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="font-medium text-slate-800 text-[11px] truncate">{bus.routeName}</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-1.5 border-t border-slate-100">
                    <span className="font-mono text-slate-600">{bus.busNumber}</span>
                    <span className="font-medium text-teal">ETA: {bus.etaMinutes} mins</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
