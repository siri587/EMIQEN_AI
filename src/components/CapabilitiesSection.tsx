import React from 'react';
import { siteContent } from '../data/siteContent';
import {
  Mic,
  FileText,
  Languages,
  Activity,
  Volume2,
  Server,
  Check,
  ShieldAlert,
} from 'lucide-react';

const CAPABILITY_ICONS = {
  'voice-text': Mic,
  'domain-focus': FileText,
  'indian-context': Languages,
  'emotion-aware': Activity,
  'spoken-output': Volume2,
  'adaptable-deployment': Server,
};

export const CapabilitiesSection: React.FC = () => {
  const { capabilities } = siteContent;

  return (
    <section id="platform" className="py-20 md:py-28 bg-emiqen-soft-bg/60 border-t border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-xs font-semibold text-emiqen-blue uppercase tracking-wider">
            <span>{capabilities.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-emiqen-navy tracking-tight">
            {capabilities.heading}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {capabilities.intro}
          </p>
        </div>

        {/* 6 Capabilities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {capabilities.items.map((item) => {
            const Icon =
              CAPABILITY_ICONS[item.id as keyof typeof CAPABILITY_ICONS] || FileText;

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-emiqen-soft-border bg-white p-7 shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar with Icon and Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-emiqen-soft-bg border border-blue-100 flex items-center justify-center text-emiqen-blue group-hover:bg-emiqen-navy group-hover:text-emiqen-cyan transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {item.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-emiqen-navy mb-2.5">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Sub-items / Planned Features */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Planned Focus
                  </div>
                  <ul className="space-y-1.5">
                    {item.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-700 flex items-center gap-2"
                      >
                        <Check className="w-3.5 h-3.5 text-emiqen-blue shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Note / Responsible Disclaimer */}
        <div className="mt-12 max-w-2xl mx-auto text-center p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-xs flex items-center justify-center gap-2.5 text-xs text-slate-500">
          <ShieldAlert className="w-4 h-4 text-emiqen-blue shrink-0" />
          <span>{capabilities.disclaimer}</span>
        </div>
      </div>
    </section>
  );
};

