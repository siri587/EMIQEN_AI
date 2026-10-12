import React from 'react';
import { siteContent } from '../data/siteContent';
import { Compass, Target, Layers, Boxes, ShieldCheck } from 'lucide-react';

const DIFF_ICONS = [Compass, Target, Layers, Boxes, ShieldCheck];

export const DifferentiatorsSection: React.FC = () => {
  const { differentiators } = siteContent;

  return (
    <section id="differentiators" className="py-20 md:py-28 bg-emiqen-navy text-white relative overflow-hidden scroll-mt-20">
      {/* Background Radial Glow Accents */}
      <div
        className="absolute -top-40 right-[-10%] w-[500px] h-[500px] rounded-full bg-emiqen-blue/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 left-[-10%] w-[500px] h-[500px] rounded-full bg-emiqen-violet/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-emiqen-cyan uppercase tracking-wider border border-white/15">
            <span>{differentiators.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            {differentiators.heading}
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {differentiators.subheading}
          </p>
        </div>

        {/* 5 Differentiators Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.items.map((item, idx) => {
            const Icon = DIFF_ICONS[idx % DIFF_ICONS.length];
            const isWide = idx === 0 || idx === 4;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.08] backdrop-blur-md p-7 transition-all duration-300 flex flex-col justify-between group hover:border-emiqen-cyan/40 ${
                  isWide ? 'md:col-span-1 lg:col-span-1' : ''
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-emiqen-cyan group-hover:bg-emiqen-cyan group-hover:text-emiqen-navy transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono tracking-wider uppercase text-emiqen-cyan/90 bg-emiqen-cyan/10 px-2.5 py-1 rounded border border-emiqen-cyan/20">
                      {item.highlight}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emiqen-cyan" />
                  <span>Architecture Foundation</span>
                </div>
              </div>
            );
          })}

          {/* Callout Card (6th slot in 3-col grid) */}
          <div className="rounded-2xl border border-dashed border-white/20 bg-gradient-to-br from-emiqen-blue/20 via-transparent to-emiqen-violet/20 p-7 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-semibold text-emiqen-cyan uppercase tracking-wider block">
                Ethical & Responsible Positioning
              </span>
              <h3 className="text-xl font-bold text-white">
                Focused on Measurable Enterprise Value
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Rather than competing on unverified benchmarks or sweeping claims, our mission is to deliver dependable voice and text intelligence tailored to how teams in India actually converse.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/10 text-xs text-slate-400">
              Validating step by step with domain pilots
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

