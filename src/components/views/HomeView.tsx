import React from 'react';
import { ClientMarquee } from '../ClientMarquee.tsx';
import { FEATURED_CATEGORIES, COMPANY_INFO } from '../../data/siteData.ts';
import { ArrowUpRight } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: string) => void;
  onOpenLightbox: (src: string, alt: string, title: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenLightbox }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative min-h-[640px] md:min-h-[720px] flex items-center bg-[#101c34] text-white overflow-hidden"
        style={{ isolation: 'isolate' }}
        aria-label="Hero banner"
      >
        {/* Background Image with Dark Scrim */}
        <img
          src={FEATURED_CATEGORIES[0].image}
          alt="Modern trade show exhibition pavilion by iDisplay"
          className="absolute inset-0 w-full h-full object-cover -z-20 brightness-[0.75] contrast-[1.05]"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(90deg, rgba(11,22,43,0.98) 0%, rgba(11,22,43,0.88) 46%, rgba(11,22,43,0.35) 100%)'
          }}
        />

        {/* Angled Red Corner Cut Accent */}
        <div
          className="absolute right-0 bottom-0 w-[42%] max-w-[480px] h-[65px] bg-[#d91e28] hidden sm:block pointer-events-none"
          style={{ clipPath: 'polygon(8% 100%, 100% 0, 100% 100%)' }}
          aria-hidden="true"
        />

        <div className="w-[min(100%-44px,1200px)] mx-auto py-20 relative z-10">
          <p className="font-display text-[15px] sm:text-[17px] font-bold uppercase tracking-[0.2em] text-[#fac7c9] mb-4">
            {COMPANY_INFO.tagline}
          </p>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-extrabold uppercase leading-[0.94] tracking-tight max-w-4xl text-white">
            {COMPANY_INFO.headline}
          </h1>

          <div className="w-14 h-1.5 bg-[#d91e28] my-6" aria-hidden="true" />

          <p className="text-lg sm:text-xl text-[#f1f4f8] max-w-2xl font-normal leading-relaxed mb-9">
            From exhibits and events to displays, commercial interiors, and large-format graphics,
            we bring your brand’s vision to life with complete turnkey excellence.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#d91e28] hover:bg-[#b8141d] text-white font-display text-[19px] font-bold uppercase tracking-wider transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer rounded-xs"
            >
              <span>Explore Our Services</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white hover:bg-white hover:text-[#101c34] text-white font-display text-[19px] font-bold uppercase tracking-wider transition-all cursor-pointer rounded-xs"
            >
              <span>Start a Project</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Band with Wave Accent */}
      <section className="bg-[#bd1721] text-white py-12 relative overflow-hidden" aria-label="Company Statistics">
        <div className="w-[min(100%-44px,1200px)] mx-auto flex flex-wrap items-center gap-6 md:gap-12">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-6xl sm:text-7xl font-extrabold leading-none tracking-tight">
              {COMPANY_INFO.yearsExperience}
            </span>
            <span className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider max-w-[130px] leading-tight">
              Years of Experience
            </span>
          </div>

          <div className="hidden lg:block w-px h-16 bg-white/20" aria-hidden="true" />

          <p className="text-base sm:text-lg text-white/95 md:ml-auto max-w-xl leading-relaxed">
            Turnkey design, 3D architectural planning, project management, bespoke fabrication, and on-site construction
            for leading brands and international exhibitions across the Philippines.
          </p>
        </div>
      </section>

      {/* Featured Project Categories ("Ideas Made Visible") */}
      <section className="py-24 bg-[#f3f5f7]" aria-labelledby="featured-heading">
        <div className="w-[min(100%-44px,1200px)] mx-auto">
          <p className="font-display text-[15px] font-bold uppercase tracking-[0.18em] text-[#bd1721] mb-2">
            WHAT WE CREATE
          </p>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2
              id="featured-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-[#101c34] tracking-tight"
            >
              Ideas Made Visible
            </h2>
            <button
              onClick={() => onNavigate('projects')}
              className="font-display text-base font-bold uppercase tracking-wide text-[#101c34] hover:text-[#d91e28] underline underline-offset-4 cursor-pointer"
            >
              Explore all project categories ↗
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {FEATURED_CATEGORIES.map((item) => (
              <article
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="bg-white border border-[#dfe4e9] shadow-[0_8px_24px_rgba(16,28,52,0.05)] hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col overflow-hidden rounded-xs"
              >
                <div className="overflow-hidden h-64 relative bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-xs font-bold uppercase tracking-wider bg-[#d91e28] px-2.5 py-1">
                      View Gallery ↗
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-display text-xs font-bold uppercase tracking-widest text-[#bd1721] block mb-2">
                      {item.label}
                    </span>
                    <h3 className="font-display text-2xl font-bold uppercase text-[#101c34] group-hover:text-[#d91e28] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#536175] mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#dfe4e9] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#101c34]">
                    <span>Learn More</span>
                    <ArrowUpRight className="w-4 h-4 text-[#d91e28] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The iDisplay Approach ("Why Choose iDisplay?") */}
      <section
        className="py-24 bg-[#e8edf2] relative overflow-hidden"
        aria-labelledby="why-heading"
      >
        <div className="w-[min(100%-44px,1200px)] mx-auto relative z-10">
          <p className="font-display text-[15px] font-bold uppercase tracking-[0.18em] text-[#bd1721] mb-2">
            THE IDISPLAY APPROACH
          </p>
          <h2
            id="why-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-[#101c34] tracking-tight mb-12"
          >
            Why Choose iDisplay?
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Innovative Concepts',
                copy: 'Marketing ideas and spatial concepts engineered to redefine industry standards and capture audience gaze.'
              },
              {
                title: 'Continuous Excellence',
                copy: 'Unwavering commitment to upgrading fabrication technology, state-of-the-art tooling, and premium finishes.'
              },
              {
                title: 'Tailor-Fit Solutions',
                copy: 'Specialized modular or bespoke architectural services calibrated exactly to each brand’s budget and schedule.'
              },
              {
                title: 'Client Satisfaction',
                copy: 'Hassle-free turnkey execution with transparent project managers keeping you informed from concept to egress.'
              }
            ].map((pillar, idx) => (
              <article
                key={idx}
                className="bg-white border border-[#dfe4e9] p-8 shadow-sm hover:border-[#d91e28] hover:-translate-y-1 transition-all rounded-xs flex flex-col justify-between"
              >
                <div>
                  <span className="marker-corner block mb-7" aria-hidden="true" />
                  <h3 className="font-display text-2xl font-bold uppercase text-[#101c34] mb-3 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#536175] leading-relaxed">
                    {pillar.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Client Marquee */}
      <ClientMarquee />
    </div>
  );
};
