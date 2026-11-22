import { useQuery } from '@tanstack/react-query';

export interface Holding {
  exchange: string;
  asset: string;
  amount: string;
  price_thb: string;
  price_usd: string;
  value_thb: string;
  value_usd: string;
}

export interface AssetAllocation {
  asset: string;
  percentage: string;
  value_thb: string;
}

export interface PortfolioData {
  id?: string;
  user_id: string;
  total_net_worth_thb: string;
  total_net_worth_usd: string;
  change_24h_percent: string;
  change_24h_thb: string;
  holdings: Holding[];
  allocations: AssetAllocation[];
}

const DEFAULT_PORTFOLIO: PortfolioData = {
  user_id: "user_demo",
  total_net_worth_thb: "2078600.00",
  total_net_worth_usd: "59388.60",
  change_24h_percent: "4.25",
  change_24h_thb: "92540.00",
  holdings: [
    {
      exchange: "Bitkub",
      asset: "BTC",
      amount: "0.45280000",
      price_thb: "3250000.00",
      price_usd: "92850.00",
      value_thb: "1471600.00",
      value_usd: "42042.48",
    },
    {
      exchange: "Bitkub",
      asset: "THB",
      amount: "154200.00",
      price_thb: "1.00",
      price_usd: "0.0285",
      value_thb: "154200.00",
      value_usd: "4394.70",
    },
    {
      exchange: "Binance",
      asset: "ETH",
      amount: "3.85000000",
      price_thb: "118000.00",
      price_usd: "3370.00",
      value_thb: "454300.00",
      value_usd: "12974.50",
    },
    {
      exchange: "Binance",
      asset: "SOL",
      amount: "24.50000000",
      price_thb: "6400.00",
      price_usd: "182.00",
      value_thb: "156800.00",
      value_usd: "4459.00",
    },
  ],
  allocations: [
    { asset: "BTC", percentage: "70.80", value_thb: "1471600.00" },
    { asset: "ETH", percentage: "21.85", value_thb: "454300.00" },
    { asset: "SOL", percentage: "7.54", value_thb: "156800.00" },
    { asset: "THB", percentage: "7.42", value_thb: "154200.00" },
  ],
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export function usePortfolio(userId: string = "user_demo") {
  return useQuery({
    queryKey: ['portfolio', userId],
    queryFn: async (): Promise<PortfolioData> => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/portfolios/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch portfolio: ${res.statusText}`);
        }
        const json = await res.json();
        return json.data.portfolio;
      } catch (err) {
        console.warn("API Gateway unavailable, using fallback seed data:", err);
        return DEFAULT_PORTFOLIO;
      }
    },
    staleTime: 1000 * 30, // 30s cache
  });
}
