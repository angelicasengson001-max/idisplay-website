import React from 'react';
import { SERVICES_LIST } from '../../data/siteData.ts';
import { ArrowUpRight, Check } from 'lucide-react';
import printImg from '../../assets/images/idisplay_large_format_print_1792482686354.jpg';

interface ServicesViewProps {
  onNavigate: (view: string) => void;
  onRequestQuote: () => void;
  onSelectServiceToInquire: (serviceTitle: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  onNavigate,
  onRequestQuote,
  onSelectServiceToInquire
}) => {
  return (
    <div className="w-full">
      {/* Banner */}
      <section className="bg-[#101c34] text-white py-20 md:py-28 relative overflow-hidden">
        <div className="w-[min(100%-44px,1200px)] mx-auto relative z-10">
          <p className="font-display text-[15px] font-bold uppercase tracking-[0.2em] text-[#fac7c9] mb-3">
            OUR EXPERTISE
          </p>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-white max-w-3xl leading-[0.95]">
            What We Bring to Life
          </h1>
          <p className="text-lg text-[#e9eef5] mt-5 max-w-2xl leading-relaxed">
            Nine specialized offerings, connected by an end-to-end approach from concept and fabrication to on-site installation.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-[#f3f5f7]">
        <div className="w-[min(100%-44px,1200px)] mx-auto">
          {/* Highlight feature card */}
          <div className="mb-16 grid items-center gap-10 md:grid-cols-2 bg-white p-8 md:p-12 border border-[#dfe4e9] shadow-sm rounded-xs">
            <div className="overflow-hidden rounded-xs bg-slate-900 h-[320px] shadow-md">
              <img
                src={printImg}
                alt="iDisplay precision large format printing and fabrication"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-display text-[15px] font-bold uppercase tracking-[0.18em] text-[#bd1721] mb-2">
                ONE CONNECTED APPROACH
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#101c34] tracking-tight mb-5 leading-tight">
                From Concept to Creation
              </h2>
              <p className="text-base text-[#536175] leading-relaxed mb-6">
                We design, plan, manage, fabricate, and construct projects at every scale, bringing specialized services
                together around each brief. Our integrated facility in Metro Manila features full woodworking, metalcraft,
                and large-format printing capabilities.
              </p>
              <button
                onClick={onRequestQuote}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#d91e28] text-white font-display text-base font-bold uppercase tracking-wider hover:bg-[#b8141d] transition-colors rounded-xs cursor-pointer"
              >
                <span>Request a Quotation ↗</span>
              </button>
            </div>
          </div>

          {/* All 9 Services Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_LIST.map((service, idx) => (
              <article
                key={service.id}
                className="bg-white border border-[#dfe4e9] p-7 shadow-sm hover:border-[#d91e28] hover:-translate-y-1 transition-all rounded-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="marker-corner" aria-hidden="true" />
                    <span className="font-mono text-xs font-bold text-[#bd1721]">
                      0{idx + 1}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#536175] block mb-1">
                    {service.category}
                  </span>
                  <h2 className="font-display text-2xl font-bold uppercase text-[#101c34] mb-3 leading-snug">
                    {service.title}
                  </h2>
                  <p className="text-sm text-[#536175] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables */}
                  <div className="space-y-1.5 pt-4 border-t border-[#dfe4e9] mb-6">
                    {service.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#101c34]">
                        <Check className="w-3.5 h-3.5 text-[#d91e28] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectServiceToInquire(service.title)}
                  className="w-full py-2.5 border border-[#101c34] hover:bg-[#101c34] hover:text-white text-[#101c34] font-display text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 rounded-xs cursor-pointer"
                >
                  <span>Inquire on Service</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
