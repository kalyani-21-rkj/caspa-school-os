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
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminTransportScreen: React.FC = () => {
  const { buses, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

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
      lat: 12.9350,
      lng: 77.6100,
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
      lat: 12.9150,
      lng: 77.6400,
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
      lat: 12.9200,
      lng: 77.6250,
      speedKmH: 12,
      studentsOnBoard: 33,
      capacity: 35,
      status: 'ARRIVED',
      etaMinutes: 0,
      nextStop: 'Campus Bus Bay 4',
    },
  ];

  const filteredFleet = fullFleet.filter(
    (b) =>
      b.routeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.driverName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar matching Teacher/Student Module */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-teal font-semibold uppercase tracking-wider mb-1">
            <span>Fleet Logistics &amp; Student Transit Operations</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-navy tracking-tight">
            School Bus Telemetry &amp; Live Radar
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Active satellite tracking across 24 transit routes with passenger capacity meters and driver telematics.
          </p>
        </div>

        <button
          onClick={() => showToast('Radio ping sent to all 24 transit drivers')}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-teal hover:bg-[#125870] text-white text-xs font-bold transition shadow-xs"
        >
          <Radio className="w-4 h-4 text-cyan-200 animate-pulse" />
          <span>Ping Fleet Transceivers</span>
        </button>
      </div>

      {/* Fleet KPI Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Active Buses</span>
          <div className="text-xl font-extrabold text-navy mt-0.5">24 Vehicles</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Transit Passengers</span>
          <div className="text-xl font-extrabold text-teal mt-0.5">642 Students</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">On-Time Accuracy</span>
          <div className="text-xl font-extrabold text-emerald-600 mt-0.5">98.4%</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Mechanical Alerts</span>
          <div className="text-xl font-extrabold text-emerald-600 mt-0.5">0 Active</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by route, driver, or bus plate..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-teal"
          />
        </div>
        <span className="text-xs text-slate-400 hidden sm:inline">Showing 4 of 24 Live Beacons</span>
      </div>

      {/* Fleet Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFleet.map((bus) => (
          <div
            key={bus.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs hover:border-teal/50 transition"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#0E2C48] text-white font-mono font-bold text-xs">
                    {bus.routeNumber}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-500">
                    {bus.busNumber}
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-navy mt-1">{bus.routeName}</h3>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  bus.status === 'ARRIVED'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-sky-100 text-sky-800 animate-pulse'
                }`}
              >
                {bus.status === 'ARRIVED' ? 'Arrived at Campus' : `${bus.speedKmH} km/h • On Route`}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal" />
                  <strong className="truncate max-w-[200px]">{bus.currentLocationName}</strong>
                </span>
                <span className="font-bold text-navy flex items-center space-x-1">
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
                    className="bg-teal h-full rounded-full"
                    style={{ width: `${(bus.studentsOnBoard / bus.capacity) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Driver Contact</span>
                <span className="font-bold text-navy">{bus.driverName}</span>
              </div>

              <a
                href={`tel:${bus.driverPhone}`}
                className="px-3 py-1.5 bg-slate-100 hover:bg-teal hover:text-white text-slate-700 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition"
              >
                <Phone className="w-3 h-3 text-teal" />
                <span>Call Driver</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
