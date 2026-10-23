import React, { useState, useRef, useEffect } from 'react';
import { Logo } from './Logo.tsx';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onRequestQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onRequestQuote
}) => {
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProjectsDropdownOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setProjectsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const projectCategories = [
    {
      id: 'custom-exhibits',
      label: 'Custom Exhibits',
      desc: 'Bespoke trade expo booths & multi-deck pavilions'
    },
    {
      id: 'promotional-events',
      label: 'Promotional Events and Roadshows',
      desc: 'Mall activations, experiential roadshows & staging'
    },
    {
      id: 'permanent-displays',
      label: 'Permanent Displays and Shop-fittings',
      desc: 'Retail flagships, showroom fit-outs & display kiosks'
    },
    {
      id: 'commercial-interiors',
      label: 'Commercial Interior Design & Architecture',
      desc: 'Corporate offices, experiential spaces & lounges'
    },
    {
      id: 'point-of-sales',
      label: 'Point of Sales Setups',
      desc: 'High-impact POP/POS merchandising displays'
    },
    {
      id: 'larger-than-life-graphics',
      label: 'Larger Than Life Graphics Displays',
      desc: 'Fabric backdrops, lightbox banners & UV graphics'
    }
  ];

  const handleNavClick = (viewId: string) => {
    setProjectsDropdownOpen(false);
    setMobileMenuOpen(false);
    onNavigate(viewId);
  };

  const isProjectsActive =
    currentView === 'projects' ||
    projectCategories.some((cat) => cat.id === currentView);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#dfe4e9] shadow-[0_4px_20px_rgba(16,28,52,0.06)]">
      <div className="w-[min(100%-44px,1200px)] mx-auto flex min-h-[78px] items-center justify-between gap-6">
        {/* Zone 1: Brand wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="group text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d91e28] rounded cursor-pointer"
          aria-label="iDisplay Inc. home"
        >
          <Logo variant="dark" />
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
          <button
            onClick={() => handleNavClick('home')}
            className={`font-display text-[17px] font-bold uppercase tracking-wider py-2 transition-all cursor-pointer border-b-2 ${
              currentView === 'home'
                ? 'text-[#101c34] border-[#d91e28]'
                : 'text-[#101c34]/85 border-transparent hover:text-[#d91e28]'
            }`}
          >
            Home
          </button>

          {/* Projects Dropdown */}
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => setProjectsDropdownOpen(true)}
            onMouseLeave={() => setProjectsDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setProjectsDropdownOpen((prev) => !prev);
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setProjectsDropdownOpen((prev) => !prev);
                } else if (e.key === 'Escape') {
                  setProjectsDropdownOpen(false);
                }
              }}
              aria-haspopup="true"
              aria-expanded={projectsDropdownOpen}
              className={`font-display text-[17px] font-bold uppercase tracking-wider py-2 flex items-center gap-1.5 transition-all cursor-pointer border-b-2 select-none group ${
                isProjectsActive
                  ? 'text-[#101c34] border-[#d91e28]'
                  : 'text-[#101c34]/85 border-transparent hover:text-[#d91e28]'
              }`}
            >
              <span>Projects</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  projectsDropdownOpen
                    ? 'rotate-180 text-[#d91e28]'
                    : 'text-slate-400 group-hover:text-[#d91e28]'
                }`}
              />
            </button>

            {projectsDropdownOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 w-96 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                role="menu"
                aria-label="Project categories"
              >
                <div className="bg-[#192b49] border border-white/20 shadow-2xl p-2.5 rounded-sm backdrop-blur-xl text-white">
                  <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10 mb-1.5">
                    <span className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#fac7c9]">
                      Project Categories
                    </span>
                    <button
                      type="button"
                      onClick={() => handleNavClick('projects')}
                      className="font-display text-[11px] font-bold uppercase tracking-wider text-white/80 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Overview</span>
                      <ArrowUpRight className="w-3 h-3 text-[#d91e28]" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    {projectCategories.map((cat) => {
                      const isActive = currentView === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleNavClick(cat.id)}
                          role="menuitem"
                          className={`w-full text-left px-3 py-2 rounded-xs transition-colors cursor-pointer group flex flex-col ${
                            isActive
                              ? 'bg-[#d91e28] text-white shadow-sm'
                              : 'hover:bg-white/10 text-[#e9eef5] hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-display text-[15px] font-bold uppercase tracking-wide">
                              {cat.label}
                            </span>
                            <ArrowUpRight
                              className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                                isActive ? 'text-white' : 'text-[#fac7c9]'
                              }`}
                            />
                          </div>
                          <span
                            className={`text-xs mt-0.5 line-clamp-1 ${
                              isActive ? 'text-white/90' : 'text-[#bac7d8]'
                            }`}
                          >
                            {cat.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-2 pt-2 border-t border-white/10 px-2 flex items-center justify-between">
                    <span className="text-[11px] text-[#bac7d8]">
                      Turnkey exhibits & fabrication
                    </span>
                    <button
                      type="button"
                      onClick={() => handleNavClick('projects')}
                      className="text-[11px] font-bold uppercase tracking-wider text-[#fac7c9] hover:underline cursor-pointer"
                    >
                      View All Projects →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('about')}
            className={`font-display text-[17px] font-bold uppercase tracking-wider py-2 transition-all cursor-pointer border-b-2 ${
              currentView === 'about'
                ? 'text-[#101c34] border-[#d91e28]'
                : 'text-[#101c34]/85 border-transparent hover:text-[#d91e28]'
            }`}
          >
            About
          </button>

          <button
            onClick={() => handleNavClick('services')}
            className={`font-display text-[17px] font-bold uppercase tracking-wider py-2 transition-all cursor-pointer border-b-2 ${
              currentView === 'services'
                ? 'text-[#101c34] border-[#d91e28]'
                : 'text-[#101c34]/85 border-transparent hover:text-[#d91e28]'
            }`}
          >
            Services
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`font-display text-[17px] font-bold uppercase tracking-wider py-2 transition-all cursor-pointer border-b-2 ${
              currentView === 'contact'
                ? 'text-[#101c34] border-[#d91e28]'
                : 'text-[#101c34]/85 border-transparent hover:text-[#d91e28]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Primary Action CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onRequestQuote}
            className="hidden sm:inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#d91e28] hover:bg-[#b8141d] text-white font-display text-[17px] font-bold uppercase tracking-wide transition-all shadow-sm hover:shadow hover:-translate-y-0.5 cursor-pointer rounded-xs active:translate-y-0"
          >
            <span>Request a Quote</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 text-[#101c34] hover:text-[#d91e28] focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav
          className="md:hidden w-full bg-white border-t border-[#dfe4e9] px-6 py-5 shadow-xl animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left font-display text-[18px] font-bold uppercase py-2 ${
                currentView === 'home' ? 'text-[#d91e28]' : 'text-[#101c34]'
              }`}
            >
              Home
            </button>

            <div>
              <button
                onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                className="w-full flex items-center justify-between text-left font-display text-[18px] font-bold uppercase py-2 text-[#101c34]"
              >
                <span>Projects</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileProjectsOpen ? 'rotate-180 text-[#d91e28]' : ''
                  }`}
                />
              </button>

              {mobileProjectsOpen && (
                <div className="pl-4 py-2 flex flex-col gap-2 border-l-2 border-[#d91e28] ml-1 my-1">
                  <button
                    onClick={() => handleNavClick('projects')}
                    className="text-left font-display text-[15px] font-semibold uppercase text-[#101c34] py-1 hover:text-[#d91e28]"
                  >
                    Overview: All Categories
                  </button>
                  {projectCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleNavClick(cat.id)}
                      className={`text-left font-display text-[15px] font-medium uppercase py-1 ${
                        currentView === cat.id ? 'text-[#d91e28] font-bold' : 'text-[#536175]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('about')}
              className={`text-left font-display text-[18px] font-bold uppercase py-2 ${
                currentView === 'about' ? 'text-[#d91e28]' : 'text-[#101c34]'
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className={`text-left font-display text-[18px] font-bold uppercase py-2 ${
                currentView === 'services' ? 'text-[#d91e28]' : 'text-[#101c34]'
              }`}
            >
              Services
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left font-display text-[18px] font-bold uppercase py-2 ${
                currentView === 'contact' ? 'text-[#d91e28]' : 'text-[#101c34]'
              }`}
            >
              Contact
            </button>

            <div className="pt-4 mt-2 border-t border-[#dfe4e9]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestQuote();
                }}
                className="w-full py-3 bg-[#d91e28] text-white font-display text-[18px] font-bold uppercase tracking-wider text-center"
              >
                Request a Quote ↗
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};
