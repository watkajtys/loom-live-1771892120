import React from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';

const MetricsDisplay: React.FC = () => {
    const { metrics } = usePortfolioStore();

    // Format helpers
    const fmtPct = (n: number) => (n * 100).toFixed(2) + '%';
    const fmtNum = (n: number) => n.toFixed(2);

    return (
        <div className="w-full h-1/3 relative mb-10 pointer-events-none">
            <div className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-auto">
                {/* Yield */}
                <div className="floating-bubble delay-1 absolute left-[15%] bottom-[20%] bg-white rounded-lg p-5 border border-slate-200 w-52 shadow-soft transform rotate-[-1deg] hover:scale-105 transition-all cursor-pointer z-10 hover:z-20 hover:shadow-md">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Proj. Yield</div>
                        <span className="material-symbols-outlined text-emerald-600 text-lg">trending_up</span>
                    </div>
                    <div className="text-3xl font-serif font-bold text-slate-800 mb-2">{fmtPct(metrics.yield)}</div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                        <div className="h-full bg-emerald-600" style={{ width: `${Math.min(metrics.yield * 1000, 100)}%` }}></div>
                    </div>
                    <div className="mt-2 text-[10px] text-emerald-700 font-medium">+0.3% vs Target</div>
                </div>

                {/* Volatility */}
                <div className="floating-bubble delay-2 absolute left-[32%] bottom-[45%] bg-white rounded-lg p-5 border border-slate-200 w-44 shadow-soft transform rotate-[2deg] hover:scale-105 transition-all cursor-pointer z-10 hover:z-20 hover:shadow-md">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Volatility</div>
                    <div className="text-2xl font-serif font-bold text-slate-800 mb-2">{fmtPct(metrics.volatility)}</div>
                    <svg className="w-full h-8 text-[#1e3a8a] opacity-60" viewBox="0 0 100 40">
                        <path d="M0 20 Q15 5 25 20 T50 20 T75 20 T100 20" fill="none" stroke="currentColor" strokeWidth="1.5"></path>
                    </svg>
                </div>

                {/* Sharpe Ratio */}
                <div className="floating-bubble delay-3 absolute right-[28%] bottom-[35%] bg-white rounded-lg p-5 border border-slate-200 w-48 shadow-soft transform rotate-[-1deg] hover:scale-105 transition-all cursor-pointer z-10 hover:z-20 hover:shadow-md">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Sharpe Ratio</div>
                    <div className="text-4xl font-serif font-black text-[#1e3a8a] mb-1">{fmtNum(metrics.sharpeRatio)}</div>
                    <div className="text-[10px] text-slate-400 italic font-serif">Risk-adjusted returns</div>
                </div>

                {/* Max Drawdown */}
                <div className="floating-bubble delay-4 absolute right-[10%] bottom-[15%] bg-white rounded-lg p-5 border border-slate-200 w-44 shadow-soft transform rotate-[3deg] hover:scale-105 transition-all cursor-pointer z-10 hover:z-20 hover:shadow-md">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Max Drawdown</div>
                    <div className="text-2xl font-serif font-bold text-[#991b1b] mb-2">{fmtPct(metrics.maxDrawdown)}</div>
                    <div className="flex gap-0.5 items-end h-8 mt-1 border-b border-slate-100 pb-1">
                        <div className="w-1.5 bg-[#991b1b] opacity-30 h-[40%]"></div>
                        <div className="w-1.5 bg-[#991b1b] opacity-50 h-[60%]"></div>
                        <div className="w-1.5 bg-[#991b1b] h-[100%]"></div>
                        <div className="w-1.5 bg-[#991b1b] opacity-50 h-[70%]"></div>
                        <div className="w-1.5 bg-[#991b1b] opacity-30 h-[30%]"></div>
                    </div>
                </div>
            </div>
             <style>{`
                .floating-bubble {
                    animation: float 6s ease-in-out infinite;
                }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                .delay-1 { animation-delay: 0s; }
                .delay-2 { animation-delay: 1.5s; }
                .delay-3 { animation-delay: 3s; }
                .delay-4 { animation-delay: 4.5s; }
                .shadow-soft {
                    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
                }
            `}</style>
        </div>
    );
};

export default MetricsDisplay;
