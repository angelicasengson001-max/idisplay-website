import React from 'react';
import { Logo } from './Logo.tsx';
import { COMPANY_INFO } from '../data/siteData.ts';
import { ArrowUp, ArrowUpRight, Mail, Phone, MapPin, Clock } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onRequestQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onRequestQuote }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#192b49] text-white overflow-hidden">
      {/* Red Call To Action Banner */}
      <div className="bg-[#bd1721] py-8 border-b border-white/10">
        <div className="w-[min(100%-44px,1200px)] mx-auto flex flex-wrap items-center justify-between gap-5">
          <div>
            <span className="font-display text-[15px] font-bold uppercase tracking-[0.2em] text-[#fac7c9] block mb-1">
              Ready to create an impact?
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white m-0">
              Let’s Build What’s Next
            </h2>
          </div>
          <button
            onClick={onRequestQuote}
            className="inline-flex items-center gap-2 bg-white text-[#101c34] hover:bg-[#f3f5f7] font-display text-[18px] font-bold uppercase tracking-wider px-7 py-3 transition-transform hover:-translate-y-0.5 cursor-pointer shadow-md rounded-xs"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-5 h-5 text-[#d91e28]" />
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-[min(100%-44px,1200px)] mx-auto py-16 grid gap-12 md:grid-cols-[1.3fr_1fr]">
        <div>
          <button
            onClick={() => onNavigate('home')}
            className="text-left focus:outline-none mb-6 group cursor-pointer bg-transparent border-0 p-0"
            aria-label="iDisplay Inc. home"
          >
            <Logo variant="light" showTagline={false} />
          </button>

          <p className="font-display text-[15px] font-bold uppercase tracking-[0.16em] text-[#fac7c9] mb-4">
            {COMPANY_INFO.tagline}
          </p>

          <p className="text-[#e9eef5]/90 max-w-lg leading-relaxed text-[15px] mb-6">
            From your first conceptual brief to precision CNC fabrication, on-site trade ingress, and finishing details,
            iDisplay Inc. delivers world-class spaces across the Philippines.
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-[#bac7d8]">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#d91e28]" />
              Taytay, Rizal, Philippines
            </span>
            <span>·</span>
            <span>Est. {COMPANY_INFO.established}</span>
            <span>·</span>
            <span>15+ Years Industry Mastery</span>
          </div>
        </div>

        <div>
          <p className="font-display text-[15px] font-bold uppercase tracking-[0.18em] text-[#fac7c9] mb-5">
            GET IN TOUCH
          </p>

          <div className="space-y-3 text-[15px] text-[#e9eef5]/90 mb-8">
            <p className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-[#d91e28] shrink-0 mt-1" />
              <span>
                <strong className="text-white font-medium">Email:</strong>{' '}
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white underline">
                  {COMPANY_INFO.email}
                </a>
              </span>
            </p>
            <p className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-[#d91e28] shrink-0 mt-1" />
              <span>
                <strong className="text-white font-medium">Phone:</strong>{' '}
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="hover:text-white underline">
                  {COMPANY_INFO.phone}
                </a>{' '}
                <span className="text-xs text-[#bac7d8]">({COMPANY_INFO.phoneInternational})</span>
              </span>
            </p>
            <p className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#d91e28] shrink-0 mt-1" />
              <span>
                <strong className="text-white font-medium">Hours:</strong> {COMPANY_INFO.officeHours}
              </span>
            </p>
            <p className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#d91e28] shrink-0 mt-1" />
              <span>
                <strong className="text-white font-medium">Head Office:</strong> {COMPANY_INFO.location}
              </span>
            </p>
            <p className="flex items-center gap-2.5 pt-1">
              <svg
                className="w-4 h-4 text-[#d91e28] shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              <span>
                <strong className="text-white font-medium">Facebook:</strong>{' '}
                <a
                  href={COMPANY_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline"
                >
                  {COMPANY_INFO.facebookName} ↗
                </a>
              </span>
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 font-display text-[16px] font-semibold uppercase tracking-wider text-[#e9eef5]" aria-label="Footer navigation">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#fac7c9] hover:underline underline-offset-4 cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="hover:text-[#fac7c9] hover:underline underline-offset-4 cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => onNavigate('custom-exhibits')}
              className="hover:text-[#fac7c9] hover:underline underline-offset-4 cursor-pointer"
            >
              Custom Exhibits
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-[#fac7c9] hover:underline underline-offset-4 cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="hover:text-[#fac7c9] hover:underline underline-offset-4 cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-[#fac7c9] hover:underline underline-offset-4 cursor-pointer"
            >
              Contact
            </button>
          </nav>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-[min(100%-44px,1200px)] mx-auto border-t border-white/15 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#bac7d8]">
        <p>© 2026 iDisplay Inc. All rights reserved. Exhibits | Events | Displays.</p>
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#d91e28]" />
        </button>
      </div>
    </footer>
  );
};
