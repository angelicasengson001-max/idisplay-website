import React, { useState } from 'react';
import { ALL_PROJECT_CATEGORIES } from '../../data/siteData.ts';
import { ArrowUpRight, Search, Layers } from 'lucide-react';

interface ProjectsViewProps {
  onNavigate: (view: string) => void;
  onOpenLightbox: (src: string, alt: string, title: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');

  const filteredCategories = ALL_PROJECT_CATEGORIES.filter((cat) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      cat.title.toLowerCase().includes(q) ||
      cat.label.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full">
      {/* Banner */}
      <section className="bg-[#101c34] text-white py-20 md:py-28 relative overflow-hidden">
        <div className="w-[min(100%-44px,1200px)] mx-auto relative z-10">
          <p className="font-display text-[15px] font-bold uppercase tracking-[0.2em] text-[#fac7c9] mb-4">
            PROJECT CATEGORIES
          </p>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-white max-w-3xl leading-[0.95]">
            Experiences in Every Format
          </h1>
          <p className="text-lg text-[#e9eef5] mt-5 max-w-2xl leading-relaxed">
            Explore the diverse formats of custom exhibits, experiential events, permanent retail fit-outs,
            and high-visibility brand environments crafted by iDisplay Inc.
          </p>
        </div>

        {/* Angled Accent */}
        <div
          className="absolute right-0 bottom-0 w-1/3 h-12 bg-[#f3f5f7] hidden sm:block pointer-events-none"
          style={{ clipPath: 'polygon(15% 100%, 100% 0, 100% 100%)' }}
          aria-hidden="true"
        />
      </section>

      {/* Main Grid */}
      <section className="py-20 bg-[#f3f5f7]">
        <div className="w-[min(100%-44px,1200px)] mx-auto">
          {/* Top Controls & Category Search */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-6 bg-[#d91e28]" aria-hidden="true" />
              <p className="text-sm text-[#536175]">
                Select a category below to browse client projects and specifications.
              </p>
            </div>

            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-[#536175] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-[#bfc8d4] pl-9 pr-4 py-2 text-xs rounded-xs focus:outline-none focus:border-[#d91e28]"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map((item) => (
              <article
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="bg-white border border-[#dfe4e9] shadow-[0_8px_24px_rgba(16,28,52,0.04)] hover:shadow-xl hover:border-[#d91e28] transition-all duration-300 group cursor-pointer flex flex-col justify-between overflow-hidden rounded-xs"
              >
                <div>
                  <div className="overflow-hidden h-60 relative bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#101c34]/90 backdrop-blur-md px-3 py-1 text-white font-display text-xs font-bold uppercase tracking-wider border-l-2 border-[#d91e28]">
                      {item.label}
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="font-display text-2xl font-bold uppercase text-[#101c34] group-hover:text-[#d91e28] transition-colors leading-tight mb-2">
                      {item.title}
                    </h2>
                    <p className="text-sm text-[#536175] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-[#dfe4e9] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#101c34] group-hover:text-[#d91e28]">
                    <span>View Category Projects</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
