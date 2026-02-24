import { create } from 'zustand';

export interface Asset {
  id: string;
  name: string;
  allocation: number; // Percentage 0-100
  color: string;
  colorHex: string; 
  description: string;
}

export interface Metrics {
  yield: number;
  volatility: number;
  sharpeRatio: number;
  maxDrawdown: number;
}

interface PortfolioState {
  assets: Asset[];
  metrics: Metrics;
  setAssets: (assets: Asset[]) => void;
  updateMetrics: (metrics: Partial<Metrics>) => void;
  updateAssetAllocation: (index: number, newAllocation: number) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  assets: [
    { 
      id: 'us-equities', 
      name: 'US Equities', 
      allocation: 45, 
      color: 'bg-[#1e3a8a]', 
      colorHex: '#1e3a8a',
      description: 'US EQUITIES'
    },
    { 
      id: 'emerging-mkts', 
      name: 'Emerging Mkts', 
      allocation: 25, 
      color: 'bg-[#374151]', 
      colorHex: '#374151',
      description: 'EMERGING MKTS'
    },
    { 
      id: 'treasuries', 
      name: 'Treasuries', 
      allocation: 20, 
      color: 'bg-[#14532d]', 
      colorHex: '#14532d',
      description: 'TREASURIES'
    },
    { 
      id: 'real-estate', 
      name: 'Real Estate', 
      allocation: 10, 
      color: 'bg-[#7f1d1d]', 
      colorHex: '#7f1d1d',
      description: 'REAL ESTATE'
    },
  ],
  metrics: {
    yield: 0.0845,
    volatility: 0.142,
    sharpeRatio: 1.82,
    maxDrawdown: -0.124,
  },
  setAssets: (assets) => set({ assets }),
  updateMetrics: (newMetrics) => set((state) => ({ 
    metrics: { ...state.metrics, ...newMetrics } 
  })),
  updateAssetAllocation: (index, newAllocation) => set((state) => {
    const newAssets = [...state.assets];
    if (newAssets[index]) {
        newAssets[index] = { ...newAssets[index], allocation: newAllocation };
    }
    return { assets: newAssets };
  }),
}));
