import { create } from 'zustand';

interface PortfolioUIState {
  isBalanceMasked: boolean;
  toggleBalanceMasking: () => void;
  activeCurrency: 'THB' | 'USD';
  setCurrency: (currency: 'THB' | 'USD') => void;
  activeExchangeFilter: string;
  setExchangeFilter: (filter: string) => void;
}

export const usePortfolioStore = create<PortfolioUIState>((set) => ({
  isBalanceMasked: false,
  toggleBalanceMasking: () => set((state) => ({ isBalanceMasked: !state.isBalanceMasked })),
  activeCurrency: 'THB',
  setCurrency: (currency) => set({ activeCurrency: currency }),
  activeExchangeFilter: 'All',
  setExchangeFilter: (filter) => set({ activeExchangeFilter: filter }),
}));
