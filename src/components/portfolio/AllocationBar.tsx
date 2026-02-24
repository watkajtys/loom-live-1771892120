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
        <div className="w-full px-4 mb-12 select-none">
            <div className="relative w-full h-36 rounded-[2px] overflow-hidden flex shadow-2xl ring-4 ring-white border border-slate-200" ref={containerRef}>
                {assets.map((asset, index) => (
                    <React.Fragment key={asset.id}>
                        <div 
                            className={`h-full relative group transition-colors duration-300 ease-out flex flex-col items-center justify-center hover:brightness-110 cursor-grab active:cursor-grabbing`}
                            style={{ 
                                width: `${asset.allocation}%`,
                                backgroundColor: asset.colorHex
                            }}
                        >
                            <div className="text-white font-serif font-bold text-4xl lg:text-5xl tracking-tight">
                                {Math.round(asset.allocation)}<span className="text-xl lg:text-2xl align-top opacity-60 font-sans">%</span>
                            </div>
                            <div className="text-white/70 font-sans font-medium text-[10px] lg:text-xs uppercase tracking-widest mt-2 border-t border-white/20 pt-1 px-2 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                                {asset.name}
                            </div>
                        </div>
                        
                        {index < assets.length - 1 && (
                            <div 
                                className="w-1 h-full bg-white cursor-col-resize z-20 flex flex-col justify-center items-center group/handle relative hover:w-1.5 transition-all"
                                onMouseDown={(e) => handleMouseDown(index, e)}
                            >
                                <div className="w-6 h-10 bg-white border border-slate-200 shadow-md rounded-full flex items-center justify-center group-hover/handle:scale-110 transition-transform absolute z-30 pointer-events-none">
                                    <span className="material-symbols-outlined text-slate-400 text-[14px]">drag_handle</span>
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
             <div className="flex justify-between mt-4 px-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-mono font-medium">
                    <span className="w-2 h-2 rounded-full bg-slate-400 ring-2 ring-slate-100"></span> CURRENT ALLOCATION
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-xs font-mono font-medium">
                    TARGET: BALANCED GROWTH <span className="material-symbols-outlined text-sm">flag</span>
                </div>
            </div>
        </div>
    );
};

export default AllocationBar;
