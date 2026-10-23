import React from 'react';
import {
  PROMOTIONAL_EVENTS_PROJECTS,
  PERMANENT_DISPLAYS_PROJECTS,
  ALL_PROJECT_CATEGORIES
} from '../../data/siteData.ts';
import { ArrowLeft, ArrowUpRight, ZoomIn } from 'lucide-react';

interface CategoryDetailViewProps {
  categoryId: string;
  onNavigate: (view: string) => void;
  onOpenLightbox: (src: string, alt: string, title: string) => void;
  onRequestQuote: () => void;
}

export const CategoryDetailView: React.FC<CategoryDetailViewProps> = ({
  categoryId,
  onNavigate,
  onOpenLightbox,
  onRequestQuote
}) => {
  const categoryMeta = ALL_PROJECT_CATEGORIES.find((c) => c.id === categoryId) || {
    id: categoryId,
    label: 'PROJECT CATEGORY',
    title: 'Category Showcase',
    description: 'Explore specialized project solutions crafted by iDisplay Inc.'
  };

  // Provide curated projects based on category
  let projectCards: {
    id: string;
    title: string;
    client?: string;
    location?: string;
    description: string;
    image: string;
  }[] = [];

  if (categoryId === 'promotional-events') {
    projectCards = PROMOTIONAL_EVENTS_PROJECTS;
  } else if (categoryId === 'permanent-displays') {
    projectCards = PERMANENT_DISPLAYS_PROJECTS;
  } else if (categoryId === 'commercial-interiors') {
    projectCards = [
      {
        id: 'comm-1',
        title: 'Makati Financial District Executive Boardroom & Lobby',
        client: 'Pacific Apex Holdings',
        location: 'Ayala Triangle, Makati City',
        description: 'Bespoke acoustic wood slat wall panelling, integrated hidden AV cabling, and recessed architectural linear cove lighting.',
        image: 'https://images.pexels.com/photos/13865606/pexels-photo-13865606.jpeg'
      },
      {
        id: 'comm-2',
        title: 'BGC Tech Campus Innovation Hub & Showroom',
        client: 'Synergy Cloud Systems',
        location: 'High Street South Corporate Plaza, BGC',
        description: 'Modular collaborative discussion pods, glass partition dry-erase wall systems, and industrial timber benching.',
        image: 'https://images.pexels.com/photos/20042067/pexels-photo-20042067.jpeg'
      },
      {
        id: 'comm-3',
        title: 'Ortigas Center Corporate Reception & Gallery',
        client: 'Meridian Global PH',
        location: 'ADB Avenue, Ortigas Center, Pasig',
        description: 'Full custom stone-textured reception desk, backlit stainless steel company emblem, and museum-grade showcase niches.',
        image: 'https://images.pexels.com/photos/35138560/pexels-photo-35138560.jpeg'
      }
    ];
  } else if (categoryId === 'point-of-sales') {
    projectCards = [
      {
        id: 'pos-1',
        title: 'Premium Cosmetic Island Gondola Kiosks',
        client: 'Luxe Beauty PH',
        location: 'SM Megamall & Glorietta 4',
        description: 'Illuminated 360-degree mirrored testing stations with high-CRI color rendering lights and anti-theft merchandise trays.',
        image: 'https://images.pexels.com/photos/18356313/pexels-photo-18356313.jpeg'
      },
      {
        id: 'pos-2',
        title: 'Specialty Coffee Brand Merchandise Display Bay',
        client: 'Origin Single Estate Coffee',
        location: 'Robinsons Magnolia, Quezon City',
        description: 'Solid mahogany and matte-black metal checkout fixtures with integrated coffee bean silos and retail packaging cubbies.',
        image: 'https://images.pexels.com/photos/8386654/pexels-photo-8386654.jpeg'
      },
      {
        id: 'pos-3',
        title: 'Smart Gadget & Wearables Interactive Countertop Plinths',
        client: 'TechPro Mobile Philippines',
        location: 'Trinoma & SM North EDSA',
        description: 'Precision milled high-density acrylic security display blocks with inductive wireless charging plates.',
        image: 'https://images.pexels.com/photos/31311125/pexels-photo-31311125.jpeg'
      }
    ];
  } else {
    // larger-than-life-graphics
    projectCards = [
      {
        id: 'gfx-1',
        title: 'High-Impact Tension Fabric Convention Wall Murals',
        client: 'ASEAN Business Summit 2026',
        location: 'PICC Plenary Hall & SMX Convention Center',
        description: 'Massive 30-meter continuous dye-sublimation tension fabric graphic wall with ultra-vivid color density and zero glare.',
        image: 'https://images.pexels.com/photos/20042067/pexels-photo-20042067.jpeg'
      },
      {
        id: 'gfx-2',
        title: 'Outdoor Architectural Heavy-Duty Mesh Building Wraps',
        client: 'Metro Real Estate Group',
        location: 'EDSA Guada & C5 Commercial Corridor',
        description: 'Weather-resistant perforated mesh banners engineered for tropical typhoon wind tolerance and maximum day/night visibility.',
        image: 'https://images.pexels.com/photos/12693942/pexels-photo-12693942.jpeg'
      },
      {
        id: 'gfx-3',
        title: 'Backlit Ultra-Thin Edge Lightbox Matrix',
        client: 'Global Luxury Eyewear Collective',
        location: 'Greenbelt 3 & Newport Mall',
        description: 'Magnetic easy-swap silicone edge graphics (SEG) lightboxes with edge-lit LED modules delivering uniform 6500K illumination.',
        image: 'https://images.pexels.com/photos/31858689/pexels-photo-31858689.jpeg'
      }
    ];
  }

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
            PROJECT CATEGORY
          </p>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-white max-w-3xl leading-[0.95]">
            {categoryMeta.title}
          </h1>
          <p className="text-lg text-[#e9eef5] mt-5 max-w-2xl leading-relaxed">
            {categoryMeta.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={onRequestQuote}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#d91e28] hover:bg-[#b8141d] text-white font-display text-base font-bold uppercase tracking-wider transition-all cursor-pointer rounded-xs"
            >
              <span>Inquire About This Service</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-[#f3f5f7]">
        <div className="w-[min(100%-44px,1200px)] mx-auto">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projectCards.map((project, idx) => (
              <article
                key={project.id || idx}
                className="bg-white border border-[#dfe4e9] shadow-[0_6px_20px_rgba(16,28,52,0.05)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden rounded-xs group"
              >
                <div>
                  <div
                    className="overflow-hidden h-60 relative bg-slate-900 cursor-pointer"
                    onClick={() =>
                      onOpenLightbox(project.image, project.title, project.title)
                    }
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/80 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm rounded">
                        <ZoomIn className="w-3.5 h-3.5" />
                        Enlarge Image
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="font-display text-xs font-bold uppercase tracking-widest text-[#bd1721] block mb-2">
                      CLIENT PROJECT {idx + 1}
                    </span>
                    <h2 className="font-display text-2xl font-bold uppercase text-[#101c34] leading-tight mb-2">
                      {project.title}
                    </h2>
                    {project.client && (
                      <p className="text-xs font-medium text-[#101c34]/80 mb-2">
                        Client: <strong className="text-[#101c34]">{project.client}</strong>
                        {project.location && ` · ${project.location}`}
                      </p>
                    )}
                    <p className="text-sm text-[#536175] leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-[#dfe4e9] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#101c34]">
                    <span>Turnkey Execution</span>
                    <span className="text-[#bd1721]">iDisplay Inc.</span>
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
