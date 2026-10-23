import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  imageAlt?: string;
  title?: string;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  imageSrc,
  imageAlt = 'Enlarged project image',
  title,
  onClose
}) => {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageSrc) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-[#050d1c]/90 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-[#101c34] border border-white/20 shadow-2xl overflow-hidden rounded-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#192b49]">
          <div className="flex items-center gap-2">
            <ZoomIn className="w-4 h-4 text-[#d91e28]" />
            <h3 id="lightbox-title" className="font-display text-lg font-bold uppercase tracking-wide text-white truncate max-w-md">
              {title || 'Project Gallery Preview'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-[#d91e28] hover:bg-[#b8141d] text-white rounded-full transition-colors cursor-pointer"
            aria-label="Close enlarged image"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Container */}
        <div className="relative flex-1 flex items-center justify-center bg-black/60 min-h-[350px] max-h-[75vh] p-2">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="max-h-[70vh] max-w-full object-contain select-none"
          />
        </div>

        {/* Footer Caption */}
        {imageAlt && (
          <div className="px-6 py-3 bg-[#101c34] text-xs text-[#bac7d8] border-t border-white/10">
            {imageAlt}
          </div>
        )}
      </div>
    </div>
  );
};
