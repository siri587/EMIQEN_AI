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
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-emiqen-soft-bg/40 to-white">
      {/* Subtle Background Glows Inspired by Brand Colors */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-hero-gradient pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-40 right-[-10%] w-[450px] h-[450px] rounded-full bg-emiqen-cyan/10 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-80 left-[-10%] w-[450px] h-[450px] rounded-full bg-emiqen-violet/10 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

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
          <div className="lg:col-span-6">
            <IllustrativeVoiceDemo />
          </div>
        </div>
      </div>
    </section>
  );
};

