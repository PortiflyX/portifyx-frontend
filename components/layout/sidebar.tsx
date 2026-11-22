'use client';

import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Wallet, 
  History, 
  ShieldCheck, 
  TrendingUp, 
  Settings 
} from 'lucide-react';

export function Sidebar() {
  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, active: true },
    { label: 'Portfolios', icon: Wallet, active: false },
    { label: 'Exchanges', icon: ArrowLeftRight, active: false },
    { label: 'Trade History', icon: History, active: false },
    { label: 'Market Data', icon: TrendingUp, active: false },
    { label: 'Security', icon: ShieldCheck, active: false },
    { label: 'Settings', icon: Settings, active: false },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-surface border-r border-border h-screen sticky top-0 px-4 py-6">
      {/* Brand logo */}
      <div className="flex items-center gap-3 px-3 mb-8">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary to-emerald-400 flex items-center justify-center font-bold text-black text-xl shadow-lg shadow-primary/20">
          P
        </div>
        <div>
          <span className="font-extrabold text-xl tracking-tight text-white">Portify<span className="text-primary">X</span></span>
          <span className="block text-[10px] text-muted tracking-wider uppercase">Trade Platform</span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 space-y-1.5">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
              item.active
                ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                : 'text-muted hover:text-white hover:bg-surface-card'
            }`}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bitkub / Multi-Exchange Status */}
      <div className="p-3 bg-surface-card rounded-xl border border-border">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-muted font-medium">Connector Status</span>
          <span className="flex items-center gap-1.5 text-primary text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Live
          </span>
        </div>
        <p className="text-[11px] text-muted">Bitkub, Binance & OKX connected</p>
      </div>
    </aside>
  );
}
