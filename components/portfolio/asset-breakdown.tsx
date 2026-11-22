'use client';

import { PieChart } from 'lucide-react';
import { AssetAllocation } from '@/lib/api';
import { usePortfolioStore } from '@/lib/store';

const COLOR_MAP: Record<string, string> = {
  BTC: 'bg-amber-500',
  ETH: 'bg-indigo-500',
  SOL: 'bg-purple-500',
  THB: 'bg-primary',
};

export function AssetBreakdown({ allocations }: { allocations?: AssetAllocation[] }) {
  const { isBalanceMasked } = usePortfolioStore();

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <PieChart className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-white">Asset Allocation</h3>
        </div>
        <span className="text-xs text-muted">Across All Exchanges</span>
      </div>

      {/* Stacked Percentage Bar */}
      <div className="h-3.5 w-full bg-surface-card rounded-full overflow-hidden flex mb-5 border border-border/50">
        {allocations?.map((item) => {
          const colorClass = COLOR_MAP[item.asset] || 'bg-slate-400';
          return (
            <div
              key={item.asset}
              style={{ width: `${item.percentage}%` }}
              className={`${colorClass} transition-all duration-300 hover:opacity-90`}
              title={`${item.asset}: ${item.percentage}%`}
            />
          );
        })}
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {allocations?.map((item) => {
          const colorClass = COLOR_MAP[item.asset] || 'bg-slate-400';
          const val = parseFloat(item.value_thb).toLocaleString('en-US', { maximumFractionDigits: 0 });
          return (
            <div key={item.asset} className="bg-surface-card/60 p-3 rounded-xl border border-border/60">
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${colorClass}`} />
                <span className="text-xs font-bold text-white">{item.asset}</span>
                <span className="text-xs font-semibold text-muted ml-auto">{item.percentage}%</span>
              </div>
              <p className="text-[11px] text-muted font-mono">
                {isBalanceMasked ? '฿ ••••••' : `฿${val}`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
