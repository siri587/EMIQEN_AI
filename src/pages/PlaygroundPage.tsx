import React, { useEffect } from 'react';
import { SiteHeader } from '../components/SiteHeader';
import { TryExperienceSection } from '../components/TryExperienceSection';
import { SiteFooter } from '../components/SiteFooter';

export const PlaygroundPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-emiqen-navy flex flex-col font-sans selection:bg-emiqen-cyan/30 selection:text-emiqen-navy relative">
      {/* Background Grid & Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-subtle-mesh" />
        <div 
          className="absolute inset-0 bg-ai-grid opacity-90"
          style={{
            maskImage: 'radial-gradient(ellipse 90% 85% at 50% 25%, #000 35%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at 50% 25%, #000 35%, transparent 100%)',
          }}
        />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[750px] bg-aura-mesh blur-2xl opacity-90" />
      </div>

      <SiteHeader />
      <main id="main-content" className="flex-grow relative z-10 pt-24">
        <TryExperienceSection id="playground" />
      </main>
      <SiteFooter />
    </div>
  );
};

