import React, { useState } from 'react';
import { CUSTOM_EXHIBIT_PROJECTS, CustomExhibitProject } from '../../data/siteData.ts';
import { ChevronLeft, ChevronRight, ZoomIn, ArrowLeft } from 'lucide-react';

interface CustomExhibitsViewProps {
  onNavigate: (view: string) => void;
  onOpenLightbox: (src: string, alt: string, title: string) => void;
}

export const CustomExhibitsView: React.FC<CustomExhibitsViewProps> = ({
  onNavigate,
  onOpenLightbox
}) => {
  // Track carousel indices for each project card
  const [slideIndices, setSlideIndices] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    CUSTOM_EXHIBIT_PROJECTS.forEach((p) => {
      initial[p.id] = 0;
    });
    return initial;
  });

  const nextSlide = (projectId: string, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndices((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] ?? 0) + 1) % total
    }));
  };

  const prevSlide = (projectId: string, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndices((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] ?? 0) - 1 + total) % total
    }));
  };

  return (
    <div className="w-full">
      {/* Banner */}
      <section className="bg-[#101c34] text-white py-20 md:py-28 relative overflow-hidden">
        <div className="w-[min(100%-44px,1200px)] mx-auto relative z-10">
          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#fac7c9] hover:text-white mb-4 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects</span>
          </button>
          <p className="font-display text-[15px] font-bold uppercase tracking-[0.2em] text-[#fac7c9] mb-2">
            PORTFOLIO SHOWCASE
          </p>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-white max-w-3xl leading-[0.95]">
            Custom Exhibits
          </h1>
          <p className="text-lg text-[#e9eef5] mt-5 max-w-2xl leading-relaxed">
            Turnkey architectural exhibition pavilions, double-deck structures, and custom booth environments
            engineered for major Philippine conventions and trade expos.
          </p>
        </div>
      </section>

      {/* Projects List */}
      <section className="py-20 bg-[#f3f5f7]">
        <div className="w-[min(100%-44px,1200px)] mx-auto space-y-10">
          <div className="flex items-center gap-3 border-l-4 border-[#d91e28] pl-4 py-1">
            <p className="text-sm text-[#536175]">
              Click on any carousel photo to view in high-resolution full-screen lightbox. Use the arrow controls to browse project angles.
            </p>
          </div>

          <div className="grid gap-8">
            {CUSTOM_EXHIBIT_PROJECTS.map((project) => {
              const currentIndex = slideIndices[project.id] ?? 0;
              const currentImage = project.images[currentIndex] || project.images[0];
              const totalSlides = project.images.length;

              return (
                <article
                  key={project.id}
                  className="bg-white border border-[#dfe4e9] shadow-[0_8px_30px_rgba(16,28,52,0.06)] hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row overflow-hidden rounded-xs"
                >
                  {/* Carousel Image Container */}
                  <div
                    className="relative md:w-2/5 md:min-h-[440px] bg-slate-900 group cursor-pointer overflow-hidden"
                    onClick={() =>
                      onOpenLightbox(currentImage.src, currentImage.alt, project.title)
                    }
                    role="button"
                    tabIndex={0}
                    aria-label={`Open enlarged image for ${project.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onOpenLightbox(currentImage.src, currentImage.alt, project.title);
                      }
                    }}
                  >
                    <img
                      src={currentImage.src}
                      alt={currentImage.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Lightbox hint overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/80 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm rounded">
                        <ZoomIn className="w-3.5 h-3.5" />
                        Enlarge Photo
                      </span>
                    </div>

                    {/* Carousel Navigation Arrows */}
                    {totalSlides > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => prevSlide(project.id, totalSlides, e)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#101c34]/80 hover:bg-[#d91e28] text-white flex items-center justify-center transition-colors shadow-md cursor-pointer focus:outline-none"
                          aria-label="Previous photo slide"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => nextSlide(project.id, totalSlides, e)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#101c34]/80 hover:bg-[#d91e28] text-white flex items-center justify-center transition-colors shadow-md cursor-pointer focus:outline-none"
                          aria-label="Next photo slide"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>

                        <div className="absolute right-3 bottom-3 z-10 px-2.5 py-1 bg-[#101c34]/90 text-white font-mono text-xs font-semibold rounded-full shadow">
                          {currentIndex + 1} / {totalSlides}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#bd1721] block mb-2">
                        {project.clientNumber}
                      </span>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#101c34] leading-tight mb-4">
                        {project.title}
                      </h2>
                      <p className="text-sm sm:text-base text-[#536175] leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    {/* Spec List */}
                    <dl className="grid gap-3 sm:grid-cols-2 pt-6 border-t border-[#dfe4e9] text-xs">
                      <div>
                        <dt className="font-display font-bold uppercase tracking-wider text-[#bd1721] mb-1">
                          CLIENT
                        </dt>
                        <dd className="text-[#101c34] font-medium">{project.client}</dd>
                      </div>
                      <div>
                        <dt className="font-display font-bold uppercase tracking-wider text-[#bd1721] mb-1">
                          LOCATION
                        </dt>
                        <dd className="text-[#101c34] font-medium">{project.location}</dd>
                      </div>
                      <div>
                        <dt className="font-display font-bold uppercase tracking-wider text-[#bd1721] mb-1">
                          DATE / TIMEFRAME
                        </dt>
                        <dd className="text-[#101c34] font-medium">{project.date}</dd>
                      </div>
                      <div>
                        <dt className="font-display font-bold uppercase tracking-wider text-[#bd1721] mb-1">
                          SERVICES PROVIDED
                        </dt>
                        <dd className="text-[#101c34] font-medium">{project.services}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
