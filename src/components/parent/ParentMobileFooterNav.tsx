import React from 'react';
import { Home, Users, CreditCard, Bus, Menu } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ParentMobileFooterNav: React.FC = () => {
  const { activeTab, setActiveTab, parentFees } = useApp();

  const pendingDues = parentFees.filter((f) => f.status === 'PENDING').length;

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'child', label: 'Children', icon: Users },
    {
      id: 'fees',
      label: 'Fees',
      icon: CreditCard,
      badge: pendingDues > 0 ? `${pendingDues}` : undefined,
    },
    { id: 'transport', label: 'Live Bus', icon: Bus },
    { id: 'notices', label: 'Notices', icon: Menu },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0E2C48] border-t border-[#16426a] flex items-center justify-around px-2 z-50 shadow-2xl">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive =
          activeTab === tab.id || (tab.id === 'home' && activeTab === 'dashboard');

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 relative transition-colors ${
              isActive ? 'text-cyan-300' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {tab.badge && (
                <span className="absolute -top-1 -right-2 bg-amber-500 text-slate-900 font-extrabold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </div>
            <span
              className={`text-[10px] mt-1 font-medium ${
                isActive ? 'text-white font-bold' : 'text-slate-400'
              }`}
            >
              {tab.label}
            </span>
            {isActive && (
              <span className="absolute bottom-0 w-8 h-1 bg-cyan-300 rounded-t-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};
