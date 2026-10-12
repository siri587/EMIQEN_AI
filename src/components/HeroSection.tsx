import React from 'react';
import { siteContent } from '../data/siteContent';
import { IllustrativeVoiceDemo } from './IllustrativeVoiceDemo';
import { ArrowRight, Layers, Sparkles, MessageSquareQuote } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { brand } = siteContent;

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-transparent via-emiqen-soft-bg/50 to-transparent">
      {/* Dynamic Ambient Background Mesh (Royal Blue, Cyan & Violet Aura Orbs) */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] rounded-full blur-[140px] pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(23, 105, 248, 0.16) 0%, rgba(0, 212, 232, 0.10) 45%, rgba(109, 40, 217, 0.06) 75%, transparent 100%)'
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-12 right-[-5%] w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-emiqen-cyan/15 to-transparent blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-72 left-[-8%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-emiqen-violet/12 via-emiqen-blue/10 to-transparent blur-[130px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Subtle Acoustic Waveform Flow in Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-30 flex items-center justify-center overflow-hidden">
        <svg className="w-full max-w-7xl h-64 text-emiqen-blue/20" viewBox="0 0 1200 200" fill="none">
          <path d="M0 100 C 150 40, 300 160, 450 100 C 600 40, 750 160, 900 100 C 1050 40, 1150 140, 1200 100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M0 100 C 200 140, 400 60, 600 100 C 800 140, 1000 60, 1200 100" stroke="url(#heroWaveGrad)" strokeWidth="2" />
          <defs>
            <linearGradient id="heroWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00D4E8" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#1769F8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Storytelling & Action */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Context Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emiqen-soft-bg border border-emiqen-soft-border/80 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emiqen-blue" />
              <span className="text-xs font-semibold text-emiqen-navy uppercase tracking-wider">
                {brand.heroBadge}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-emiqen-cyan" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-emiqen-navy tracking-tight leading-[1.12]">
              AI that understands{' '}
              <span className="block sm:inline bg-gradient-to-r from-emiqen-blue via-emiqen-cyan-dark to-emiqen-violet bg-clip-text text-transparent">
                the way India works.
              </span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {brand.supportingCopy}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => scrollTo('#contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-emiqen-blue hover:bg-emiqen-blue-hover active:scale-[0.98] rounded-xl shadow-elevated transition-all"
              >
                <span>{brand.primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('#platform')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-emiqen-navy bg-white hover:bg-slate-50 border border-slate-200 active:scale-[0.98] rounded-xl transition-all shadow-subtle"
              >
                <Layers className="w-4 h-4 text-emiqen-blue" />
                <span>{brand.secondaryCta}</span>
              </button>
            </div>

            {/* Status Disclaimer Note */}
            <div className="pt-2 text-xs text-slate-500 flex items-center justify-center lg:justify-start gap-2">
              <MessageSquareQuote className="w-4 h-4 text-slate-400 shrink-0" />
              <p className="italic">{brand.statusNote}</p>
            </div>

            {/* Quick Strategic Pillars Summary */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-100 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <span className="block text-xs text-slate-400 uppercase font-semibold">Focus</span>
                <span className="text-xs sm:text-sm font-bold text-emiqen-navy">Enterprise Tasks</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 uppercase font-semibold">Modality</span>
                <span className="text-xs sm:text-sm font-bold text-emiqen-navy">Voice & Text</span>
              </div>
              <div>
                <span className="block text-xs text-slate-400 uppercase font-semibold">Nuance</span>
                <span className="text-xs sm:text-sm font-bold text-emiqen-navy">Indian Context</span>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Illustrative Interactive Console */}
          <div id="playground" className="lg:col-span-6 scroll-mt-28">
            <IllustrativeVoiceDemo />
          </div>
        </div>
      </div>
    </section>
  );
};

