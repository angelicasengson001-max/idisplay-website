import React from 'react';
import { COMPANY_INFO } from '../../data/siteData.ts';
import { ArrowUpRight, Compass, ShieldCheck, Hammer, Building2 } from 'lucide-react';
import boothImg from '../../assets/images/idisplay_custom_booth_1792482685955.jpg';

interface AboutViewProps {
  onNavigate: (view: string) => void;
  onRequestQuote: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onRequestQuote }) => {
  return (
    <div className="w-full">
      {/* Banner Styled Like Home Page: Dark Blue Gradient with Picture on Right Side */}
      <section
        className="relative min-h-[480px] md:min-h-[560px] flex items-center bg-[#101c34] text-white overflow-hidden"
        style={{ isolation: 'isolate' }}
        aria-label="About page banner"
      >
        {/* Background Image showing on the right */}
        <img
          src={boothImg}
          alt="iDisplay Inc. exhibition craftsmanship and architecture"
          className="absolute inset-0 w-full h-full object-cover object-right md:object-center -z-20 brightness-[0.78] contrast-[1.05]"
        />
        {/* Dark Blue Scrim Gradient: Dense navy on left for readability, fading to transparent on right to reveal the photo */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(90deg, rgba(11,22,43,0.98) 0%, rgba(11,22,43,0.90) 42%, rgba(16,28,52,0.45) 80%, rgba(16,28,52,0.2) 100%)'
          }}
        />

        {/* Angled Red Corner Cut Accent matching Home Page */}
        <div
          className="absolute right-0 bottom-0 w-[38%] max-w-[420px] h-[55px] bg-[#d91e28] hidden sm:block pointer-events-none"
          style={{ clipPath: 'polygon(8% 100%, 100% 0, 100% 100%)' }}
          aria-hidden="true"
        />

        <div className="w-[min(100%-44px,1200px)] mx-auto py-20 relative z-10">
          <p className="font-display text-[15px] sm:text-[17px] font-bold uppercase tracking-[0.2em] text-[#fac7c9] mb-3">
            ABOUT IDISPLAY INC.
          </p>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-white max-w-2xl leading-[0.95]">
            Imagination, Made Tangible
          </h1>

          <div className="w-14 h-1.5 bg-[#d91e28] my-6" aria-hidden="true" />

          <p className="font-display text-xl sm:text-2xl text-[#fac7c9] uppercase tracking-wider font-semibold max-w-xl">
            {COMPANY_INFO.tagline}
          </p>
          <p className="text-base sm:text-lg text-[#e9eef5]/90 mt-4 max-w-xl leading-relaxed">
            World-class turnkey exhibition, promotional events, permanent retail shop-fittings, and large-format graphics provider across the Philippines.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="w-[min(100%-44px,1200px)] mx-auto grid items-center gap-12 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-xs shadow-xl bg-slate-900 h-[420px]">
            <img
              src="https://images.pexels.com/photos/35138560/pexels-photo-35138560.jpeg"
              alt="iDisplay Inc. exhibition craftsmanship in the Philippines"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-[#101c34]/90 backdrop-blur-md p-4 border-l-4 border-[#d91e28] text-white text-xs">
              <p className="font-bold uppercase tracking-wider text-[#fac7c9]">Exhibition & Event Specialists</p>
              <p className="text-white/80 mt-0.5">Over 15 years crafting high-impact physical spaces nationwide.</p>
            </div>
          </div>

          <div>
            <p className="font-display text-[15px] font-bold uppercase tracking-[0.18em] text-[#bd1721] mb-2">
              ABOUT US
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-[#101c34] tracking-tight leading-[1]">
              Specialized from Start to Finish
            </h2>

            <div className="w-14 h-1.5 bg-[#d91e28] my-6" aria-hidden="true" />

            <p className="text-base text-[#536175] leading-relaxed mb-4">
              {COMPANY_INFO.aboutBrief}
            </p>
            <p className="text-base text-[#536175] leading-relaxed mb-6">
              {COMPANY_INFO.aboutStory2}
            </p>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-[#dfe4e9]">
              <div className="border-l-2 border-[#d91e28] pl-3">
                <span className="font-display text-2xl font-bold text-[#101c34] block">15+ Years</span>
                <span className="text-xs text-[#536175]">Track Record</span>
              </div>
              <div className="border-l-2 border-[#d91e28] pl-3">
                <span className="font-display text-2xl font-bold text-[#101c34] block">Turnkey</span>
                <span className="text-xs text-[#536175]">In-house Fab</span>
              </div>
              <div className="border-l-2 border-[#d91e28] pl-3">
                <span className="font-display text-2xl font-bold text-[#101c34] block">Taytay, Rizal</span>
                <span className="text-xs text-[#536175]">Workshop & HQ</span>
              </div>
              <div className="border-l-2 border-[#d91e28] pl-3">
                <span className="font-display text-2xl font-bold text-[#101c34] block">Nationwide</span>
                <span className="text-xs text-[#536175]">Philippine Reach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section - Dark Navy Palette */}
      <section className="py-20 bg-gradient-to-r from-[#101c34] via-[#14233f] to-[#192b49] text-white relative border-t-2 border-[#cb0c0c]">
        <div className="w-[min(100%-44px,1200px)] mx-auto grid gap-8 md:grid-cols-2">
          {/* Mission */}
          <article className="p-8 sm:p-10 bg-white/5 backdrop-blur-md border border-white/15 rounded-xs hover:border-[#d91e28] transition-colors">
            <p className="font-display text-[15px] font-bold uppercase tracking-[0.2em] text-[#fac7c9] mb-3">
              OUR DIRECTION
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-[#e9eef5] leading-relaxed font-normal">
              {COMPANY_INFO.mission}
            </p>
          </article>

          {/* Vision */}
          <article className="p-8 sm:p-10 bg-white text-[#101c34] border-t-4 border-[#d91e28] shadow-2xl rounded-xs">
            <p className="font-display text-[15px] font-bold uppercase tracking-[0.2em] text-[#bd1721] mb-3">
              LOOKING AHEAD
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#101c34] mb-4">
              Our Vision
            </h2>
            <p className="text-lg text-[#536175] leading-relaxed font-medium">
              {COMPANY_INFO.vision}
            </p>
          </article>
        </div>
      </section>

      {/* The 4-Step Connected Approach ("From Idea to Installation") */}
      <section className="py-24 bg-[#f3f5f7]">
        <div className="w-[min(100%-44px,1200px)] mx-auto">
          <p className="font-display text-[15px] font-bold uppercase tracking-[0.18em] text-[#bd1721] mb-2">
            ONE CONNECTED APPROACH
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-[#101c34] tracking-tight mb-4">
            From Idea to Installation
          </h2>
          <p className="text-base text-[#536175] max-w-3xl leading-relaxed mb-12">
            We design, plan, manage, fabricate, and construct projects at every scale, bringing specialized services
            together around each client brief.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Design & Planning',
                icon: Compass,
                desc: 'Photorealistic 3D visualization, spatial CAD drafting, permit acquisition, and engineering feasibility.'
              },
              {
                step: '02',
                title: 'Project Management',
                icon: ShieldCheck,
                desc: 'Dedicated account managers supervising venue ingress schedules, electrical load permits, and timeline control.'
              },
              {
                step: '03',
                title: 'Fabrication',
                icon: Hammer,
                desc: 'In-house metal welding, precision timber carpentry, CNC milling, acrylic fabrication, and paint booths.'
              },
              {
                step: '04',
                title: 'Construction',
                icon: Building2,
                desc: 'Rapid on-site installation, seamless electrical and AV commissioning, show maintenance, and egress handling.'
              }
            ].map((proc) => {
              const Icon = proc.icon;
              return (
                <div
                  key={proc.step}
                  className="bg-white border border-[#dfe4e9] p-8 shadow-sm hover:border-[#d91e28] hover:-translate-y-1 transition-all rounded-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="marker-corner" aria-hidden="true" />
                      <span className="font-display text-2xl font-extrabold text-[#d91e28]">
                        {proc.step}
                      </span>
                    </div>
                    <Icon className="w-6 h-6 text-[#101c34] mb-3" />
                    <h3 className="font-display text-2xl font-bold uppercase text-[#101c34] mb-2">
                      {proc.title}
                    </h3>
                    <p className="text-xs text-[#536175] leading-relaxed">
                      {proc.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-14 pt-8 border-t border-[#dfe4e9] flex flex-wrap items-center justify-between gap-4">
            <p className="font-display text-base font-bold uppercase tracking-[0.2em] text-[#bd1721]">
              {COMPANY_INFO.tagline}
            </p>
            <button
              onClick={onRequestQuote}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#d91e28] text-white font-display text-base font-bold uppercase tracking-wider hover:bg-[#b8141d] transition-colors rounded-xs"
            >
              <span>Work with Our Team</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
