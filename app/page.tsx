'use client';

import { usePortfolio } from '@/lib/api';
import { NetWorthCard } from '@/components/portfolio/net-worth-card';
import { ExchangeConnectCard } from '@/components/portfolio/exchange-connect-card';
import { AssetBreakdown } from '@/components/portfolio/asset-breakdown';
import { HoldingTable } from '@/components/portfolio/holding-table';
import { Bell, User } from 'lucide-react';

export default function DashboardPage() {
  const { data: portfolio, isLoading, refetch } = usePortfolio("user_demo");

  return (
    <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
      {/* Top Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Portfolio Overview
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Aggregated real-time balances from connected exchanges.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            className="p-2 text-muted hover:text-white bg-surface hover:bg-surface-card rounded-xl border border-border transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2 pl-2 border-l border-border">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-black shadow-md">
              KU
            </div>
            <div className="hidden sm:block text-left">
              <span className="block text-xs font-bold text-white">Peeranat</span>
              <span className="block text-[10px] text-muted">Pro Trader</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Net Worth Card */}
      <NetWorthCard 
        portfolio={portfolio} 
        isLoading={isLoading} 
        onRefresh={() => refetch()} 
      />

      {/* Connect Exchange Wizard */}
      <ExchangeConnectCard />

      {/* Asset Breakdown & Allocation */}
      <AssetBreakdown allocations={portfolio?.allocations} />

      {/* Aggregated Holding Table */}
      <HoldingTable holdings={portfolio?.holdings} />
    </main>
  );
}
