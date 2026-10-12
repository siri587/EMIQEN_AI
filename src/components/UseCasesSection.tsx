import React from 'react';
import { siteContent } from '../data/siteContent';
import {
  Users,
  FileCheck,
  Briefcase,
  Headphones,
  Info,
  Mic,
  AlignLeft,
} from 'lucide-react';

const USE_CASE_ICONS = {
  'customer-interaction': Users,
  'knowledge-workflows': FileCheck,
  'internal-assistants': Briefcase,
  'voice-services': Headphones,
};

export const UseCasesSection: React.FC = () => {
  const { useCases } = siteContent;

  return (
    <section id="use-cases" className="py-20 md:py-28 bg-emiqen-soft-bg/50 border-t border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100/80 text-xs font-semibold text-emiqen-violet uppercase tracking-wider">
            <span>{useCases.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-emiqen-navy tracking-tight">
            {useCases.heading}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {useCases.intro}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.items.map((item) => {
            const Icon =
              USE_CASE_ICONS[item.id as keyof typeof USE_CASE_ICONS] || Users;

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-emiqen-soft-border bg-white p-7 sm:p-8 shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-emiqen-soft-bg border border-slate-100 flex items-center justify-center text-emiqen-blue group-hover:bg-emiqen-blue group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 flex items-center gap-1">
                        {item.inputMode.includes('Voice') && (
                          <Mic className="w-3 h-3 text-emiqen-blue" />
                        )}
                        {item.inputMode.includes('Text') && (
                          <AlignLeft className="w-3 h-3 text-emiqen-violet" />
                        )}
                        <span>{item.inputMode}</span>
                      </span>
                    </div>
                  </div>

                  {/* Title & Domain */}
                  <div className="space-y-1 mb-3">
                    <span className="text-xs font-semibold text-emiqen-blue uppercase tracking-wider">
                      {item.scenario}
                    </span>
                    <h3 className="text-xl font-bold text-emiqen-navy">
                      {item.title}
                    </h3>
                  </div>

                  {/* Summary */}
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                    {item.summary}
                  </p>
                </div>

                {/* Illustrative Query Block */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                    <span>Illustrative Sample Query</span>
                    <span className="text-slate-500 font-normal">
                      Focus: {item.focusArea}
                    </span>
                  </div>
                  <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3.5 text-xs text-slate-700 italic font-mono leading-relaxed">
                    {item.sampleInput}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mandatory Note */}
        <div className="mt-12 max-w-2xl mx-auto text-center p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-xs flex items-center justify-center gap-2.5 text-xs text-slate-500">
          <Info className="w-4 h-4 text-emiqen-violet shrink-0" />
          <p className="italic">{useCases.note}</p>
        </div>
      </div>
    </section>
  );
};

