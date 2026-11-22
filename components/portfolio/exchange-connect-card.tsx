'use client';

import { KeyRound, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

export function ExchangeConnectCard() {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-md relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Connect New Exchange</h3>
              <span className="text-[10px] bg-emerald-500/10 text-primary border border-primary/30 px-2 py-0.5 rounded-full font-semibold">
                AES-256 Encrypted
              </span>
            </div>
            <p className="text-xs text-muted mt-0.5">
              Sync real-time balances from Bitkub (API Secret / HMAC) and CCXT-compatible exchanges (Binance, OKX, Bybit).
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-black font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-primary/20 whitespace-nowrap self-stretch sm:self-auto justify-center">
          <span>Connect API</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
