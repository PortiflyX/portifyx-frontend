'use client';

import { Eye, EyeOff, TrendingUp, RefreshCw } from 'lucide-react';
import { usePortfolioStore } from '@/lib/store';
import { PortfolioData } from '@/lib/api';

interface NetWorthCardProps {
  portfolio?: PortfolioData;
  isLoading: boolean;
  onRefresh?: () => void;
}

export function NetWorthCard({ portfolio, isLoading, onRefresh }: NetWorthCardProps) {
  const { isBalanceMasked, toggleBalanceMasking, activeCurrency, setCurrency } = usePortfolioStore();

  const formattedValue = () => {
    if (isBalanceMasked) {
      return activeCurrency === 'THB' ? '฿ ••••••••' : '$ ••••••••';
    }
    if (!portfolio) return '—';

    const num = parseFloat(
      activeCurrency === 'THB' ? portfolio.total_net_worth_thb : portfolio.total_net_worth_usd
    );
    const prefix = activeCurrency === 'THB' ? '฿ ' : '$ ';
    return prefix + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formattedChange = () => {
    if (isBalanceMasked) return '+ •••• (••••%)';
    if (!portfolio) return '—';
    const thbChange = parseFloat(portfolio.change_24h_thb).toLocaleString('en-US', { minimumFractionDigits: 2 });
    return `+฿${thbChange} (+${portfolio.change_24h_percent}%)`;
  };

  return (
    <div className="bg-gradient-to-br from-surface to-surface-card border border-border rounded-2xl p-6 relative overflow-hidden shadow-xl">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-semibold tracking-wider text-muted">Total Net Worth</span>
          <button
            onClick={toggleBalanceMasking}
            className="text-muted hover:text-white p-1 rounded-lg transition-colors"
            title={isBalanceMasked ? "Show balances" : "Hide balances"}
          >
            {isBalanceMasked ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Currency Switcher & Refresh */}
        <div className="flex items-center gap-2">
          <div className="flex bg-surface rounded-xl p-0.5 border border-border">
            <button
              onClick={() => setCurrency('THB')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                activeCurrency === 'THB' ? 'bg-primary text-black shadow-sm' : 'text-muted hover:text-white'
              }`}
            >
              THB
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                activeCurrency === 'USD' ? 'bg-primary text-black shadow-sm' : 'text-muted hover:text-white'
              }`}
            >
              USD
            </button>
          </div>

          {onRefresh && (
            <button
              onClick={onRefresh}
              className="p-1.5 text-muted hover:text-white hover:bg-surface rounded-xl border border-border transition-colors"
              title="Refresh balances"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Big Balance Display */}
      <div className="mb-4">
        <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
          {isLoading ? (
            <span className="animate-pulse text-muted">Loading...</span>
          ) : (
            formattedValue()
          )}
        </div>
      </div>

      {/* 24h Performance indicator */}
      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
        <div className="flex items-center gap-1 bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20">
          <TrendingUp className="w-4 h-4" />
          <span>{formattedChange()}</span>
        </div>
        <span className="text-xs text-muted font-normal">Past 24 Hours</span>
      </div>
    </div>
  );
}
