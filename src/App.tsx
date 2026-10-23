import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { LightboxModal } from './components/LightboxModal.tsx';
import { QuoteEstimatorModal } from './components/QuoteEstimatorModal.tsx';
import { HomeView } from './components/views/HomeView.tsx';
import { ProjectsView } from './components/views/ProjectsView.tsx';
import { CustomExhibitsView } from './components/views/CustomExhibitsView.tsx';
import { CategoryDetailView } from './components/views/CategoryDetailView.tsx';
import { AboutView } from './components/views/AboutView.tsx';
import { ServicesView } from './components/views/ServicesView.tsx';
import { ContactView } from './components/views/ContactView.tsx';

const VALID_VIEWS = [
  'home',
  'projects',
  'custom-exhibits',
  'promotional-events',
  'permanent-displays',
  'commercial-interiors',
  'point-of-sales',
  'larger-than-life-graphics',
  'about',
  'services',
  'contact'
];

export default function App() {
  const [currentView, setCurrentView] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    return VALID_VIEWS.includes(hash) ? hash : 'home';
  });

  // Lightbox Modal state
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    src: string | null;
    alt: string;
    title: string;
  }>({
    isOpen: false,
    src: null,
    alt: '',
    title: ''
  });

  // Cost Estimator state
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [appliedEstimate, setAppliedEstimate] = useState<{
    projectType: string;
    budgetText: string;
    messageAddon: string;
  } | null>(null);

  // Sync hash changes
  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (VALID_VIEWS.includes(hash)) {
        setCurrentView(hash);
      } else if (!hash) {
        setCurrentView('home');
      }
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: string) => {
    const target = VALID_VIEWS.includes(view) ? view : 'home';
    setCurrentView(target);
    window.location.hash = target;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLightbox = (src: string, alt: string, title: string) => {
    setLightboxState({
      isOpen: true,
      src,
      alt,
      title
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSelectServiceToInquire = (serviceTitle: string) => {
    setAppliedEstimate({
      projectType: serviceTitle,
      budgetText: 'To be discussed',
      messageAddon: `Inquiry regarding specialized service: ${serviceTitle}.`
    });
    navigateTo('contact');
  };

  const handleApplyEstimate = (data: {
    projectType: string;
    budgetText: string;
    messageAddon: string;
  }) => {
    setAppliedEstimate(data);
    navigateTo('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f5f7] text-[#172238] font-body selection:bg-[#d91e28] selection:text-white">
      {/* Top Bar Navigation */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        onRequestQuote={() => navigateTo('contact')}
      />

      {/* Main View Router */}
      <main id="main-content" className="flex-1 pt-[78px]">
        {currentView === 'home' && (
          <HomeView onNavigate={navigateTo} onOpenLightbox={handleOpenLightbox} />
        )}

        {currentView === 'projects' && (
          <ProjectsView onNavigate={navigateTo} onOpenLightbox={handleOpenLightbox} />
        )}

        {currentView === 'custom-exhibits' && (
          <CustomExhibitsView
            onNavigate={navigateTo}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {[
          'promotional-events',
          'permanent-displays',
          'commercial-interiors',
          'point-of-sales',
          'larger-than-life-graphics'
        ].includes(currentView) && (
          <CategoryDetailView
            categoryId={currentView}
            onNavigate={navigateTo}
            onOpenLightbox={handleOpenLightbox}
            onRequestQuote={() => {
              setAppliedEstimate({
                projectType:
                  currentView === 'promotional-events'
                    ? 'Promotional Events and Roadshows'
                    : currentView === 'permanent-displays'
                    ? 'Permanent Displays and Shop-fittings'
                    : currentView === 'commercial-interiors'
                    ? 'Commercial Interior Design and Architecture'
                    : currentView === 'point-of-sales'
                    ? 'Point-of-Sale Setups'
                    : 'Larger-than-Life Graphic Displays',
                budgetText: 'To be discussed',
                messageAddon: ''
              });
              navigateTo('contact');
            }}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            onNavigate={navigateTo}
            onRequestQuote={() => navigateTo('contact')}
          />
        )}

        {currentView === 'services' && (
          <ServicesView
            onNavigate={navigateTo}
            onRequestQuote={() => navigateTo('contact')}
            onSelectServiceToInquire={handleSelectServiceToInquire}
          />
        )}

        {currentView === 'contact' && (
          <ContactView
            initialProjectType={appliedEstimate?.projectType}
            initialBudgetText={appliedEstimate?.budgetText}
            initialMessageAddon={appliedEstimate?.messageAddon}
            onOpenEstimator={() => setIsEstimatorOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onRequestQuote={() => navigateTo('contact')}
      />

      {/* Fullscreen Image Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxState.isOpen}
        imageSrc={lightboxState.src}
        imageAlt={lightboxState.alt}
        title={lightboxState.title}
        onClose={handleCloseLightbox}
      />

      {/* Cost Estimator Modal */}
      <QuoteEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        onApplyEstimate={handleApplyEstimate}
      />
    </div>
  );
}
