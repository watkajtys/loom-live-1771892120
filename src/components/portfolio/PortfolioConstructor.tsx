import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePortfolioStore } from '../../store/portfolioStore';
import AllocationBar from './AllocationBar';
import MetricsDisplay from './MetricsDisplay';
import CorrelationMatrix from './CorrelationMatrix';
// Import the worker using Vite's syntax
import FinanceWorker from '../../workers/finance.worker?worker';

const PortfolioConstructor: React.FC = () => {
    const { assets, setAssets, updateMetrics } = usePortfolioStore();
    const workerRef = useRef<Worker | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    // 1. Initialize Worker
    useEffect(() => {
        workerRef.current = new FinanceWorker();

        workerRef.current.onmessage = (e: MessageEvent) => {
            const { metrics } = e.data;
            if (metrics) {
                updateMetrics(metrics);
            }
        };

        return () => {
            workerRef.current?.terminate();
        };
    }, [updateMetrics]);

    // 2. Sync URL -> Store (on mount)
    useEffect(() => {
        const urlAssets = searchParams.toString();
        if (!urlAssets) return;

        // Clone current assets to preserve metadata like color, name
        // We need to use the functional update form or access current assets.
        // But since this runs only on mount, `assets` refers to the initial state (or whatever it is when mount happens).
        // Since we want to use the latest assets definition (colors etc), we rely on the closure `assets`.
        // Ideally we should pass a function to setAssets if we want to merge, but setAssets replaces everything.
        // We'll trust that `assets` in the closure is the initial state from the store which has the correct structure.
        
        const newAssets = assets.map(asset => {
            const val = searchParams.get(asset.id);
            if (val) {
                return { ...asset, allocation: parseFloat(val) };
            }
            return asset;
        });
        
        const hasChanges = newAssets.some((a, i) => Math.abs(a.allocation - assets[i].allocation) > 0.01);

        if (hasChanges) {
             setAssets(newAssets);
        }
    }, []); // Run once on mount

    // 3. Sync Store -> URL (when assets change)
    useEffect(() => {
        // Send allocations to worker
        if (workerRef.current) {
            const allocations: Record<string, number> = {};
            assets.forEach(a => allocations[a.id] = a.allocation);
            workerRef.current.postMessage({ allocations });
        }

        // Update URL
        const params: Record<string, string> = {};
        
        assets.forEach(asset => {
            params[asset.id] = asset.allocation.toFixed(2);
        });

        // Use replace to avoid polluting history
        setSearchParams(params, { replace: true });

    }, [assets, setSearchParams]);

    return (
        <div className="bg-slate-50 text-slate-900 font-sans antialiased h-screen overflow-hidden flex selection:bg-[#1e3a8a] selection:text-white">
            <aside className="w-16 h-full bg-white border-r border-slate-200 flex flex-col items-center shrink-0 z-50 py-6 shadow-sm">
                <div className="mb-8 w-10 h-10 flex items-center justify-center rounded-sm bg-[#1e3a8a] shadow-md">
                    <span className="material-symbols-outlined text-white text-xl">account_balance</span>
                </div>
                <nav className="flex-1 w-full flex flex-col items-center gap-6">
                    <a className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 text-[#1e3a8a] relative group border border-slate-200" href="#">
                        <span className="material-symbols-outlined text-xl">dashboard</span>
                    </a>
                    <a className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-[#1e3a8a] hover:bg-slate-50 transition-colors" href="#">
                        <span className="material-symbols-outlined text-xl">tune</span>
                    </a>
                    <a className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-[#1e3a8a] hover:bg-slate-50 transition-colors" href="#">
                        <span className="material-symbols-outlined text-xl">pie_chart</span>
                    </a>
                    <a className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-[#1e3a8a] hover:bg-slate-50 transition-colors" href="#">
                        <span className="material-symbols-outlined text-xl">history_edu</span>
                    </a>
                </nav>
                <div className="mt-auto flex flex-col gap-4 items-center">
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-[#1e3a8a] hover:bg-slate-50 transition-colors">
                        <span className="material-symbols-outlined text-xl">settings</span>
                    </button>
                    <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 overflow-hidden">
                        {/* Placeholder for user image */}
                        <div className="w-full h-full bg-slate-300"></div>
                    </div>
                </div>
            </aside>
            <main className="flex-1 h-full relative overflow-hidden flex flex-col bg-slate-50">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
                
                <header className="absolute top-0 left-0 w-full z-40 px-10 py-8 flex justify-between items-start pointer-events-none">
                    <div className="pointer-events-auto">
                        <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight leading-tight">Institutional Slate<br/><span className="text-slate-500 font-normal italic text-2xl">Allocation Engine</span></h1>
                    </div>
                    <div className="flex gap-4 pointer-events-auto items-center">
                        <div className="bg-white border border-slate-200 px-5 py-2.5 rounded-sm shadow-sm flex items-center gap-4">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Total AUM</span>
                                <span className="text-base font-serif font-bold text-slate-800">$1,245,890</span>
                            </div>
                            <div className="h-8 w-px bg-slate-200"></div>
                            <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 font-medium">+1.2%</span>
                        </div>
                        <button className="bg-[#1e3a8a] hover:bg-blue-900 text-white px-8 py-3 rounded-sm font-medium text-sm shadow-md hover:shadow-lg transition-all active:transform active:translate-y-px flex items-center gap-2 font-serif tracking-wide">
                            <span className="material-symbols-outlined text-sm">check_circle</span> COMMIT
                        </button>
                    </div>
                </header>

                <div className="flex-1 flex flex-col items-center justify-center relative w-full h-full max-w-7xl mx-auto px-12 pt-20">
                    <MetricsDisplay />
                    <div className="w-full z-30 mb-12">
                         <div className="relative w-full px-4">
                            <div className="absolute top-4 left-4 right-4 bottom-[-10px] bg-slate-300 blur-xl opacity-40 rounded-[2rem]"></div>
                            <AllocationBar />
                        </div>
                    </div>
                    <CorrelationMatrix />
                </div>
            </main>
        </div>
    );
};

export default PortfolioConstructor;
