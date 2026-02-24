import React from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';

const MetricsDisplay: React.FC = () => {
    const { metrics } = usePortfolioStore();

    // Format helpers
    const fmtPct = (n: number) => (n * 100).toFixed(2) + '%';
    const fmtNum = (n: number) => n.toFixed(2);

    return (
        <div className="w-full max-w-6xl mx-auto mb-12 pointer-events-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {/* Yield */}
            <div className="bg-white rounded-sm p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold">Proj. Yield</div>
                    <span className="material-symbols-outlined text-emerald-600 text-lg">trending_up</span>
                </div>
                <div className="text-3xl font-serif font-bold text-slate-800 mb-3">{fmtPct(metrics.yield)}</div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600" style={{ width: `${Math.min(metrics.yield * 1000, 100)}%` }}></div>
                </div>
                <div className="mt-3 text-[11px] text-emerald-700 font-medium bg-emerald-50 inline-block px-2 py-0.5 rounded border border-emerald-100">+0.3% vs Target</div>
            </div>

            {/* Volatility */}
            <div className="bg-white rounded-sm p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold">Volatility</div>
                    <span className="material-symbols-outlined text-slate-400 text-lg">show_chart</span>
                </div>
                <div className="text-3xl font-serif font-bold text-slate-800 mb-3">{fmtPct(metrics.volatility)}</div>
                <div className="h-8 w-full">
                     <svg className="w-full h-full text-[#1e3a8a] opacity-80" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <path d="M0 35 Q15 5 25 25 T50 20 T75 10 T100 30" fill="none" stroke="currentColor" strokeWidth="2"></path>
                    </svg>
                </div>
            </div>

            {/* Sharpe Ratio */}
            <div className="bg-white rounded-sm p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-4">
                     <div className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold">Sharpe Ratio</div>
                     <span className="material-symbols-outlined text-[#1e3a8a] text-lg">verified</span>
                </div>
                <div className="text-4xl font-serif font-black text-[#1e3a8a] mb-1">{fmtNum(metrics.sharpeRatio)}</div>
                <div className="text-[11px] text-slate-400 italic font-serif">Risk-adjusted returns</div>
            </div>

            {/* Max Drawdown */}
            <div className="bg-white rounded-sm p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex justify-between items-center mb-4">
                    <div className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold">Max Drawdown</div>
                    <span className="material-symbols-outlined text-[#991b1b] text-lg">arrow_downward</span>
                </div>
                <div className="text-3xl font-serif font-bold text-[#991b1b] mb-3">{fmtPct(metrics.maxDrawdown)}</div>
                 <div className="flex gap-1 items-end h-6 mt-2 border-b border-slate-100 pb-1">
                        <div className="w-1.5 bg-[#991b1b] opacity-20 h-[30%]"></div>
                        <div className="w-1.5 bg-[#991b1b] opacity-40 h-[50%]"></div>
                        <div className="w-1.5 bg-[#991b1b] h-[100%]"></div>
                        <div className="w-1.5 bg-[#991b1b] opacity-40 h-[60%]"></div>
                        <div className="w-1.5 bg-[#991b1b] opacity-20 h-[20%]"></div>
                    </div>
            </div>
        </div>
    );
};

export default MetricsDisplay;
