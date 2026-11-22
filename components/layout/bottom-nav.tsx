'use client';

import { LayoutDashboard, Wallet, ArrowLeftRight, History, Settings } from 'lucide-react';

export function BottomNav() {
  const tabs = [
    { label: 'Overview', icon: LayoutDashboard, active: true },
    { label: 'Assets', icon: Wallet, active: false },
    { label: 'Exchanges', icon: ArrowLeftRight, active: false },
    { label: 'History', icon: History, active: false },
    { label: 'Settings', icon: Settings, active: false },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-md border-t border-border z-50 px-3 py-2">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
              tab.active ? 'text-primary' : 'text-muted hover:text-white'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
