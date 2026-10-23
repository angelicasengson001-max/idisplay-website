import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  showTagline?: boolean;
  symbolOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  className = '',
  showTagline = false,
  symbolOnly = false
}) => {
  const isDark = variant === 'dark';

  return (
    <div className={`inline-flex flex-col select-none bg-transparent ${className}`}>
      <div className="inline-flex items-center gap-2.5 transition-transform duration-200 group-hover:scale-102 bg-transparent">
        {/* Official 3D Isometric iDisplay Emblem */}
        <img
          src="/assets/aistudio/idisplay_brand_emblem.png"
          alt="iDisplay Inc. Emblem"
          className="h-9 sm:h-10 w-auto object-contain shrink-0 drop-shadow-sm"
        />

        {!symbolOnly && (
          /* Official Branding Logotype / Wordmark */
          <img
            src="/assets/aistudio/idisplay_brand_wordmark.png"
            alt="idisplay inc."
            className={`h-6 sm:h-7 w-auto object-contain shrink-0 ${
              !isDark ? 'brightness-125 contrast-110 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]' : ''
            }`}
          />
        )}
      </div>

      {showTagline && (
        <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] leading-tight mt-2 text-[#fac7c9]">
          Exhibits · Events · Displays
        </span>
      )}
    </div>
  );
};
