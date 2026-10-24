import React, { useState } from 'react';
import {
  Building,
  Bus,
  BookOpen,
  Package,
  Calendar,
  Users,
  AlertTriangle,
  Sparkles,
  Zap,
  Wrench,
  Radio,
  Droplets,
  CreditCard,
  ChevronRight,
  Shield,
  Filter,
  SlidersHorizontal,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PrincipalOperationsSubsystemScreen } from './PrincipalOperationsSubsystemScreen';

export const PrincipalOperationsScreen: React.FC = () => {
  const { showToast } = useApp();

  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  // If a subsystem module is selected, render the dedicated subsystem screen
  if (selectedModule) {
    return (
      <PrincipalOperationsSubsystemScreen
        subsystemId={selectedModule}
        onBack={() => setSelectedModule(null)}
      />
    );
  }

  const modules = [
    {
      id: 'transport',
      title: 'Transport',
      icon: Bus,
      metricPrimary: '18/20 buses active',
      metricSecondary: 'GPS Telemetry On',
      color: 'text-sky-600 bg-sky-50',
    },
    {
      id: 'hostel',
      title: 'Hostel',
      icon: Building,
      metricPrimary: '198/240 occupied',
      metricSecondary: 'Warden on duty',
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      id: 'library',
      title: 'Library',
      icon: BookOpen,
      metricPrimary: '18 overdue books',
      metricSecondary: 'Circulation 94%',
      color: 'text-teal bg-teal/10',
    },
    {
      id: 'inventory',
      title: 'Inventory',
      icon: Package,
      metricPrimary: '4 PO requests',
      metricSecondary: 'Lab stock low',
      alert: true,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      id: 'events',
      title: 'Events',
      icon: Calendar,
      metricPrimary: '2 upcoming',
      metricSecondary: 'Debate & Sports',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      id: 'admissions',
      title: 'Admissions',
      icon: Users,
      metricPrimary: '34 enquiries',
      metricSecondary: '18.3% converted',
      color: 'text-cyan-600 bg-cyan-50',
    },
  ];

  const alerts = [
    {
      id: 'alt-1',
      icon: Wrench,
      title: 'Bus #14 maintenance overdue — schedule mandatory inspection',
      timeString: '32m ago • Fleet Maintenance',
      color: 'text-sky-600 bg-sky-50',
    },
    {
      id: 'alt-2',
      icon: Radio,
      title: 'Perimeter Gate 3 Biometric Terminal Offline',
      timeString: '48m ago • Campus Security',
      color: 'text-rose-600 bg-rose-50',
    },
    {
      id: 'alt-3',
      icon: Droplets,
      title: 'Hostel Block B water sensor alert — technician notified',
      timeString: '1h ago • Facilities Dept',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      id: 'alt-4',
      icon: CreditCard,
      title: 'Library fine collection settlement pending for Term 1',
      timeString: '3h ago • Accounts & Audit',
      color: 'text-slate-600 bg-slate-100',
    },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Title Bar (Matching image_1a791c61.png) */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-1.5 text-[10px] uppercase font-bold text-teal tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-teal"></span>
            <span>Campus Operations</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0E2C48] tracking-tight mt-0.5">
            Operations Overview
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => showToast('Opening operations network telemetry')}
            className="p-2 rounded-xl bg-sky-50 text-[#0E2C48] hover:bg-sky-100 transition"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          <button
            onClick={() => showToast('Filtered operations list')}
            className="p-2 rounded-xl bg-sky-50 text-[#0E2C48] hover:bg-sky-100 transition"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CASPA AI CO-PILOT Banner (Matching image_1a791c61.png) */}
      <div className="bg-gradient-to-r from-[#173059] to-[#2B2361] rounded-2xl p-5 text-white shadow-md flex items-center justify-between border border-slate-700">
        <div className="space-y-1">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-cyan-300">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="uppercase tracking-wider text-[10px]">CASPA AI Co-Pilot</span>
          </div>
          <h3 className="font-black text-base tracking-tight">Daily Logistics on Schedule</h3>
          <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
            Route 7 delayed 6m by rain; 98.4% morning intake complete.
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
          <Shield className="w-6 h-6 text-cyan-300" />
        </div>
      </div>

      {/* Status Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-teal"></span>
          <span className="text-slate-500 font-medium">Active Buses:</span>
          <strong className="text-navy">18</strong>
        </div>
        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-sky-400"></span>
          <span className="text-slate-500 font-medium">Hostel Occupancy:</span>
          <strong className="text-navy">82%</strong>
        </div>
      </div>

      {/* Operational Modules 6-Grid (Matching image_1a791c61.png) */}
      <div>
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-extrabold text-navy uppercase tracking-wider text-[11px]">
            Operational Modules
          </span>
          <span className="text-teal font-bold flex items-center space-x-1 text-[11px]">
            <span>👆 Tap card to open dashboard</span>
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                onClick={() => {
                  setSelectedModule(m.id);
                  showToast(`Opened telemetry console for ${m.title}`);
                }}
                className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-teal shadow-2xs hover:shadow-xs cursor-pointer transition space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${m.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal transition-transform group-hover:translate-x-0.5" />
                </div>

                <div>
                  <h4 className="font-black text-sm text-[#0E2C48]">{m.title}</h4>
                  <div className="text-xs font-bold text-slate-700 mt-1">{m.metricPrimary}</div>
                  <div className="text-[10px] text-slate-400 font-medium mt-0.5 flex items-center space-x-1">
                    {m.alert && <span className="text-rose-500">⚠️</span>}
                    <span>{m.metricSecondary}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Operational Alerts List (Matching image_1a791c61.png) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <h3 className="font-extrabold text-navy text-sm">Operational Alerts</h3>
          </div>
          <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
            4 Active
          </span>
        </div>

        <div className="space-y-2.5">
          {alerts.map((alt) => {
            const Icon = alt.icon;
            return (
              <div
                key={alt.id}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 flex items-start space-x-3 transition cursor-pointer"
                onClick={() => showToast(`Opened diagnostics for: ${alt.title}`)}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${alt.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-[#0E2C48] leading-snug truncate sm:whitespace-normal">
                    {alt.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{alt.timeString}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 self-center shrink-0" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Campus Utility Index (Matching image_1a791c61.png) */}
      <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-100 shadow-2xs flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal text-white flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-[#0E2C48] text-sm">Campus Utility Index</h4>
            <p className="text-xs text-slate-500">Solar array operating at 91% capacity</p>
          </div>
        </div>
        <span className="text-xs font-black text-teal bg-white px-3 py-1 rounded-full border border-sky-200">
          Optimal
        </span>
      </div>
    </div>
  );
};
