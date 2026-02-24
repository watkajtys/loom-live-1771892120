import React, { useState, useRef, useEffect } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';

const AllocationBar: React.FC = () => {
    const { assets, setAssets } = usePortfolioStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const startXRef = useRef<number>(0);
    const initialAllocationsRef = useRef<number[]>([]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (draggingIndex === null || !containerRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;
            const dx = e.clientX - startXRef.current;
            const deltaPercentage = (dx / containerWidth) * 100;

            const newAssets = [...assets];
            const leftIndex = draggingIndex;
            const rightIndex = draggingIndex + 1;

            const initialLeft = initialAllocationsRef.current[leftIndex];
            const initialRight = initialAllocationsRef.current[rightIndex];

            // Calculate potential new values
            let newLeft = initialLeft + deltaPercentage;
            let newRight = initialRight - deltaPercentage;

            // Clamp values
            if (newLeft < 0) {
                newLeft = 0;
                newRight = initialLeft + initialRight;
            } else if (newRight < 0) {
                newRight = 0;
                newLeft = initialLeft + initialRight;
            }

            // Update only if changed significantly
            if (Math.abs(newAssets[leftIndex].allocation - newLeft) > 0.01) {
                newAssets[leftIndex] = { ...newAssets[leftIndex], allocation: newLeft };
                newAssets[rightIndex] = { ...newAssets[rightIndex], allocation: newRight };
                setAssets(newAssets);
            }
        };

        const handleMouseUp = () => {
            setDraggingIndex(null);
            document.body.style.cursor = 'default';
        };

        if (draggingIndex !== null) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize';
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [draggingIndex, assets, setAssets]);

    const handleMouseDown = (index: number, e: React.MouseEvent) => {
        e.preventDefault();
        setDraggingIndex(index);
        startXRef.current = e.clientX;
        initialAllocationsRef.current = assets.map(a => a.allocation);
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 mb-12 select-none">
            <div className="relative w-full h-32 rounded-sm overflow-hidden flex shadow-lg border border-slate-300 ring-1 ring-slate-100" ref={containerRef}>
                {assets.map((asset, index) => (
                    <React.Fragment key={asset.id}>
                        <div 
                            className={`h-full relative group transition-colors duration-300 ease-out flex flex-col items-center justify-center hover:brightness-105 cursor-grab active:cursor-grabbing`}
                            style={{ 
                                width: `${asset.allocation}%`,
                                backgroundColor: asset.colorHex
                            }}
                        >
                            {asset.allocation > 8 && (
                                <>
                                    <div className="text-white font-serif font-bold text-3xl lg:text-4xl tracking-tight">
                                        {Math.round(asset.allocation)}<span className="text-lg lg:text-xl align-top opacity-70 font-sans">%</span>
                                    </div>
                                    <div className="text-white/80 font-sans font-medium text-[10px] uppercase tracking-widest mt-1 border-t border-white/20 pt-1 px-2 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                                        {asset.name}
                                    </div>
                                </>
                            )}
                        </div>
                        
                        {index < assets.length - 1 && (
                            <div 
                                className="w-px h-full relative z-20 flex items-center justify-center cursor-col-resize group/handle"
                                onMouseDown={(e) => handleMouseDown(index, e)}
                            >
                                {/* Expanded hit area */}
                                <div className="absolute inset-y-0 -left-3 -right-3 z-30 bg-transparent"></div>
                                {/* Visual divider line */}
                                <div className="w-px h-full bg-white opacity-40 group-hover/handle:w-1 group-hover/handle:opacity-100 transition-all duration-200"></div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
             <div className="flex justify-between mt-3 px-1">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase tracking-wider font-bold">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span> Current Allocation
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase tracking-wider font-bold">
                    Target: Balanced Growth <span className="material-symbols-outlined text-sm">flag</span>
                </div>
            </div>
        </div>
    );
};

export default AllocationBar;
