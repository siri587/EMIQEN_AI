import React from 'react';
import { siteContent } from '../data/siteContent';
import { Compass, Target, Mic2 } from 'lucide-react';

const CHALLENGE_ICONS = [Compass, Target, Mic2];

export const ChallengeSection: React.FC = () => {
  const { challenge } = siteContent;

  return (
    <section className="py-20 md:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 uppercase tracking-wider">
            <span>{challenge.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-emiqen-navy tracking-tight">
            {challenge.heading}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {challenge.copy}
          </p>
        </div>

        {/* 3 Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {challenge.cards.map((card, idx) => {
            const Icon = CHALLENGE_ICONS[idx % CHALLENGE_ICONS.length];
            return (
              <div
                key={card.id}
                className="relative rounded-2xl border border-emiqen-soft-border bg-gradient-to-b from-white to-emiqen-soft-bg/30 p-8 shadow-subtle hover:shadow-elevated transition-all duration-300 group"
              >
                {/* Accent Top Bar */}
                <div className="w-10 h-1 rounded-full bg-gradient-to-r from-emiqen-blue to-emiqen-cyan mb-6 group-hover:w-16 transition-all duration-300" />

                <div className="w-12 h-12 rounded-xl bg-emiqen-soft-bg border border-emiqen-soft-border flex items-center justify-center text-emiqen-blue mb-5 group-hover:bg-emiqen-blue group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-emiqen-navy mb-3">
                  {card.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

