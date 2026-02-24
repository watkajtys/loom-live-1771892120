import React from 'react';

const CorrelationMatrix: React.FC = () => {
    return (
        <div className="w-full flex-1 min-h-0 relative px-4">
            <div className="bg-white w-full h-full rounded-t-lg border border-slate-200 border-b-0 p-8 flex flex-col shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.03)]">
                <div className="flex justify-between items-end mb-6">
                    <h3 className="text-slate-800 font-serif font-bold text-lg flex items-center gap-2">
                        <span className="material-symbols-outlined text-slate-400">grid_on</span> Correlation Matrix
                    </h3>
                    <div className="flex gap-4 bg-slate-50 px-3 py-1.5 rounded-sm border border-slate-100">
                        <div className="flex items-center gap-1.5">
                            <span className="block w-2.5 h-2.5 bg-emerald-100 border border-emerald-200 rounded-sm"></span>
                            <span className="text-[10px] text-slate-500 uppercase tracking-wide font-bold">Negative</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="block w-2.5 h-2.5 bg-slate-50 border border-slate-200 rounded-sm"></span>
                            <span className="text-[10px] text-slate-500 uppercase tracking-wide font-bold">Neutral</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="block w-2.5 h-2.5 bg-[#1e3a8a]/10 border border-[#1e3a8a]/20 rounded-sm"></span>
                            <span className="text-[10px] text-slate-500 uppercase tracking-wide font-bold">Positive</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 grid grid-cols-5 gap-px bg-slate-200 border border-slate-200 rounded-sm overflow-hidden">
                    <div className="flex flex-col gap-px bg-slate-50">
                        <div className="h-10 bg-white"></div> 
                        <div className="flex-1 flex items-center justify-end px-4 text-[#1e3a8a] font-bold text-xs uppercase tracking-wide bg-white">US Equities</div>
                        <div className="flex-1 flex items-center justify-end px-4 text-[#374151] font-bold text-xs uppercase tracking-wide bg-white">Emerging Mkt</div>
                        <div className="flex-1 flex items-center justify-end px-4 text-[#14532d] font-bold text-xs uppercase tracking-wide bg-white">Treasuries</div>
                        <div className="flex-1 flex items-center justify-end px-4 text-[#7f1d1d] font-bold text-xs uppercase tracking-wide bg-white">Real Estate</div>
                    </div>
                    {/* US Equities Column */}
                    <div className="flex flex-col gap-px bg-white">
                        <div className="h-10 flex items-center justify-center text-[#1e3a8a] font-bold text-xs uppercase tracking-wider bg-slate-50">US Equities</div>
                        <div className="flex-1 bg-[#1e3a8a]/20 flex items-center justify-center text-slate-900 font-mono text-sm font-medium">1.00</div>
                        <div className="flex-1 bg-[#1e3a8a]/10 flex items-center justify-center text-slate-600 font-mono text-sm">0.72</div>
                        <div className="flex-1 bg-emerald-50 flex items-center justify-center text-emerald-700 font-mono text-sm">-0.32</div>
                        <div className="flex-1 bg-[#1e3a8a]/5 flex items-center justify-center text-slate-600 font-mono text-sm">0.45</div>
                    </div>
                    {/* Emerging Column */}
                    <div className="flex flex-col gap-px bg-white">
                        <div className="h-10 flex items-center justify-center text-[#374151] font-bold text-xs uppercase tracking-wider bg-slate-50">Emerging</div>
                        <div className="flex-1 bg-[#1e3a8a]/10 flex items-center justify-center text-slate-600 font-mono text-sm">0.72</div>
                        <div className="flex-1 bg-[#1e3a8a]/20 flex items-center justify-center text-slate-900 font-mono text-sm font-medium">1.00</div>
                        <div className="flex-1 bg-emerald-50 flex items-center justify-center text-emerald-700 font-mono text-sm">-0.15</div>
                        <div className="flex-1 bg-[#1e3a8a]/5 flex items-center justify-center text-slate-600 font-mono text-sm">0.38</div>
                    </div>
                    {/* Treasuries Column */}
                    <div className="flex flex-col gap-px bg-white">
                        <div className="h-10 flex items-center justify-center text-[#14532d] font-bold text-xs uppercase tracking-wider bg-slate-50">Treasuries</div>
                        <div className="flex-1 bg-emerald-50 flex items-center justify-center text-emerald-700 font-mono text-sm">-0.32</div>
                        <div className="flex-1 bg-emerald-50 flex items-center justify-center text-emerald-700 font-mono text-sm">-0.15</div>
                        <div className="flex-1 bg-[#1e3a8a]/20 flex items-center justify-center text-slate-900 font-mono text-sm font-medium">1.00</div>
                        <div className="flex-1 bg-[#1e3a8a]/5 flex items-center justify-center text-slate-600 font-mono text-sm">0.12</div>
                    </div>
                    {/* Real Estate Column */}
                    <div className="flex flex-col gap-px bg-white">
                        <div className="h-10 flex items-center justify-center text-[#7f1d1d] font-bold text-xs uppercase tracking-wider bg-slate-50">Real Estate</div>
                        <div className="flex-1 bg-[#1e3a8a]/5 flex items-center justify-center text-slate-600 font-mono text-sm">0.45</div>
                        <div className="flex-1 bg-[#1e3a8a]/5 flex items-center justify-center text-slate-600 font-mono text-sm">0.38</div>
                        <div className="flex-1 bg-[#1e3a8a]/5 flex items-center justify-center text-slate-600 font-mono text-sm">0.12</div>
                        <div className="flex-1 bg-[#1e3a8a]/20 flex items-center justify-center text-slate-900 font-mono text-sm font-medium">1.00</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CorrelationMatrix;
