'use client';

import { useState } from 'react';
import { Layers, ArrowUpDown } from 'lucide-react';
import { Holding } from '@/lib/api';
import { usePortfolioStore } from '@/lib/store';

export function HoldingTable({ holdings }: { holdings?: Holding[] }) {
  const { isBalanceMasked, activeCurrency } = usePortfolioStore();
  const [selectedExchange, setSelectedExchange] = useState<string>('All');

  const exchanges = ['All', 'Bitkub', 'Binance'];

  const filtered = holdings?.filter((h) => {
    if (selectedExchange === 'All') return true;
    return h.exchange.toLowerCase() === selectedExchange.toLowerCase();
  });

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-white">Aggregated Holdings</h3>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-surface-card p-1 rounded-xl border border-border self-start sm:self-auto">
          {exchanges.map((ex) => (
            <button
              key={ex}
              onClick={() => setSelectedExchange(ex)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                selectedExchange === ex
                  ? 'bg-primary text-black shadow-sm'
                  : 'text-muted hover:text-white'
              }`}
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border/80 text-muted uppercase text-[10px] tracking-wider">
              <th className="pb-3 font-semibold">Asset / Exchange</th>
              <th className="pb-3 font-semibold text-right">Holdings</th>
              <th className="pb-3 font-semibold text-right">Price ({activeCurrency})</th>
              <th className="pb-3 font-semibold text-right">Total Value ({activeCurrency})</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 font-mono">
            {filtered?.map((h, i) => {
              const price = parseFloat(activeCurrency === 'THB' ? h.price_thb : h.price_usd);
              const totalVal = parseFloat(activeCurrency === 'THB' ? h.value_thb : h.value_usd);
              const symbol = activeCurrency === 'THB' ? '฿' : '$';

              return (
                <tr key={`${h.exchange}-${h.asset}-${i}`} className="hover:bg-surface-card/50 transition-colors">
                  <td className="py-3.5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-card border border-border flex items-center justify-center font-bold text-white text-xs">
                      {h.asset}
                    </div>
                    <div>
                      <span className="font-sans font-bold text-white block text-sm">{h.asset}</span>
                      <span className="text-[11px] text-muted font-sans flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {h.exchange}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 text-right font-medium text-white">
                    {isBalanceMasked ? '••••••••' : h.amount}
                  </td>

                  <td className="py-3.5 text-right text-muted">
                    {symbol}{price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>

                  <td className="py-3.5 text-right font-semibold text-white">
                    {isBalanceMasked ? (
                      `${symbol} ••••••••`
                    ) : (
                      `${symbol}${totalVal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
