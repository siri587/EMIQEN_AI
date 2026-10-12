import React from 'react';
import { siteContent } from '../data/siteContent';
import { CheckCircle2, Clock, GitBranch, ShieldCheck } from 'lucide-react';

const STATUS_BADGE_STYLES = {
  'In Development': 'bg-blue-50 text-emiqen-blue border-blue-200',
  'Evaluating': 'bg-purple-50 text-emiqen-violet border-purple-200',
  'Planned': 'bg-slate-100 text-slate-700 border-slate-200',
};

export const StatusSection: React.FC = () => {
  const { status } = siteContent;

  return (
    <section id="status" className="py-20 md:py-28 bg-white border-t border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 uppercase tracking-wider">
            <span>{status.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-emiqen-navy tracking-tight">
            {status.heading}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {status.copy}
          </p>
        </div>

        {/* 3 Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {status.principles.map((principle, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-emiqen-soft-border bg-emiqen-soft-bg/30 p-6 flex flex-col justify-start"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emiqen-blue mb-4 shadow-2xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-emiqen-navy mb-2">
                {principle.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        {/* Active Milestones & Development Stages */}
        <div className="rounded-2xl border border-slate-200/90 bg-white shadow-subtle p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-xl font-bold text-emiqen-navy">
                System Development Pipeline Status
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Transparent roadmap tracking modular capabilities and validation phases
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-4 h-4 text-emiqen-blue" />
              <span>Continuously updated</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {status.milestones.map((milestone, idx) => {
              const badgeStyle = STATUS_BADGE_STYLES[milestone.status];
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400 font-semibold">
                        PHASE 0{idx + 1}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeStyle}`}
                      >
                        {milestone.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-emiqen-navy">
                      {milestone.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] text-slate-500">
                    {milestone.status === 'In Development' ? (
                      <GitBranch className="w-3.5 h-3.5 text-emiqen-blue" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    <span>{milestone.status === 'Planned' ? 'Roadmap Target' : 'Active Iteration'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

