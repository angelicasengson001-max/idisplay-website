import React, { useRef, useState } from 'react';
import { CLIENT_PARTNERS } from '../data/siteData.ts';

export const ClientMarquee: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!marqueeRef.current) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(marqueeRef.current.scrollLeft);
    marqueeRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !marqueeRef.current) return;
    e.preventDefault();
    const x = e.clientX - startX;
    marqueeRef.current.scrollLeft = scrollLeft - x;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (marqueeRef.current && marqueeRef.current.hasPointerCapture(e.pointerId)) {
      marqueeRef.current.releasePointerCapture(e.pointerId);
    }
  };

  // Duplicate list to allow continuous feel
  const allClients = [...CLIENT_PARTNERS, ...CLIENT_PARTNERS];

  return (
    <section className="py-20 bg-white border-y border-[#dfe4e9]" aria-labelledby="clients-heading">
      <div className="w-[min(100%-44px,1200px)] mx-auto mb-8">
        <p className="font-display text-[15px] font-bold uppercase tracking-[0.18em] text-[#bd1721] mb-2">
          TRUSTED PARTNERS
        </p>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2
            id="clients-heading"
            className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#101c34] tracking-tight"
          >
            Our Valuable Clients
          </h2>
          <span className="text-xs text-[#536175] hidden sm:inline-block">
            ← Drag or scroll horizontally →
          </span>
        </div>
      </div>

      <div
        ref={marqueeRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`w-full overflow-x-auto overflow-y-hidden py-4 cursor-grab select-none no-scrollbar touch-pan-x transition-colors ${
          isDragging ? 'cursor-grabbing' : ''
        }`}
        tabIndex={0}
        aria-label="Client partners logo carousel"
      >
        <div className="flex gap-4 px-6 w-max items-center">
          {allClients.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="w-44 h-24 bg-white border border-[#dfe4e9] shadow-[0_4px_12px_rgba(16,28,52,0.04)] flex flex-col items-center justify-center p-3 text-center transition-all hover:-translate-y-1 hover:border-[#d91e28] hover:shadow-md shrink-0 rounded-xs"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="w-6 h-6 inline-block client-logo-polygon shrink-0"
                  style={{ backgroundColor: client.color || '#d91e28' }}
                  aria-hidden="true"
                />
                <span className="font-display text-[13px] font-bold tracking-widest uppercase text-[#536175] truncate max-w-[110px]">
                  {client.sector.split(' ')[0]}
                </span>
              </div>
              <span className="font-display text-[15px] font-bold uppercase text-[#101c34] tracking-wide leading-tight truncate w-full">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
