import React from 'react';
import { siteContent } from '../data/siteContent';
import { MessageSquareText, Cpu, Sparkles, Send, ArrowRight } from 'lucide-react';

const STEP_ICONS = [MessageSquareText, Cpu, Sparkles, Send];

export const WorkflowSection: React.FC = () => {
  const { workflow } = siteContent;

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white border-t border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100/70 text-xs font-semibold text-emiqen-navy uppercase tracking-wider">
            <span>{workflow.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-emiqen-navy tracking-tight">
            {workflow.heading}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {workflow.subheading}
          </p>
        </div>

        {/* 4 Connected Workflow Steps */}
        <div className="relative">
          {/* Connector Line for Desktop */}
          <div
            className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-emiqen-blue via-emiqen-cyan to-emiqen-violet -translate-y-8 z-0 opacity-30"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {workflow.steps.map((step, idx) => {
              const Icon = STEP_ICONS[idx % STEP_ICONS.length];
              return (
                <div
                  key={step.step}
                  className="rounded-2xl border border-emiqen-soft-border bg-white p-6 shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* Top Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-2xl font-black font-mono tracking-tight bg-gradient-to-br from-emiqen-blue to-emiqen-violet bg-clip-text text-transparent">
                        {step.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-emiqen-soft-bg border border-blue-100 flex items-center justify-center text-emiqen-blue group-hover:bg-emiqen-blue group-hover:text-white transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg font-bold text-emiqen-navy mb-2.5">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  {/* Subtext info */}
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-xs text-slate-500 leading-normal">
                      {step.subtext}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Context Callout */}
        <div className="mt-14 max-w-3xl mx-auto rounded-2xl bg-gradient-to-r from-emiqen-navy via-emiqen-navy-light to-emiqen-navy p-6 sm:p-8 text-white shadow-elevated">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-emiqen-cyan uppercase tracking-wider block">
                Modular Architectural Goal
              </span>
              <p className="text-sm sm:text-base text-slate-200">
                Each layer—speech recognition, language understanding, tone evaluation, and speech synthesis—is built to be evaluated and refined independently.
              </p>
            </div>
            <a
              href="#use-cases"
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-colors"
            >
              <span>View Practical Scenarios</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

