import React from 'react';
import {
  BookOpen,
  GitMerge,
  Database,
  RefreshCw,
  ArrowRight,
  Info,
  Lightbulb,
  Target,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

interface VocabExample {
  input: string;
  output: string;
  note: string;
}

const VOCAB_EXAMPLES: VocabExample[] = [
  {
    input: 'Gas station',
    output: 'Petrol pump',
    note: 'Commonly used term in Indian English contexts',
  },
  {
    input: 'Tuk-tuk',
    output: 'Auto-rickshaw',
    note: 'Preferred local expression for three-wheeled transport',
  },
  {
    input: 'Candy',
    output: 'Chocolate',
    note: 'When contextually appropriate to the intended meaning',
  },
];

const DATASET_HIGHLIGHTS = [
  {
    id: 'vocabulary',
    icon: BookOpen,
    title: 'Indian-Context Vocabulary',
    description:
      'A curated collection of vocabulary and terminology that reflects how words are commonly understood and used in Indian contexts.',
  },
  {
    id: 'normalization',
    icon: GitMerge,
    title: 'Contextual Language Normalization',
    description:
      'Custom word mappings designed to help transform unfamiliar or less locally relevant expressions into terminology that is more natural for the intended Indian audience.',
  },
  {
    id: 'domain-data',
    icon: Database,
    title: 'Domain-Relevant Language Data',
    description:
      'A growing data foundation intended to support more consistent language understanding across selected enterprise use cases.',
  },
  {
    id: 'improvement',
    icon: RefreshCw,
    title: 'Continuous Dataset Improvement',
    description:
      'A structured approach to reviewing, expanding, and evaluating vocabulary mappings as new contextual requirements emerge.',
  },
];

const BUSINESS_VALUE_CARDS = [
  {
    id: 'relevant',
    icon: Target,
    title: 'More Relevant Language',
    description:
      'Helps the system account for vocabulary and expressions used in Indian contexts.',
    highlight: 'Context Accuracy',
  },
  {
    id: 'consistency',
    icon: Sparkles,
    title: 'Better Contextual Consistency',
    description:
      'Provides structured examples and mappings to guide consistent handling of selected language differences.',
    highlight: 'Structured Guidance',
  },
  {
    id: 'foundation',
    icon: Lightbulb,
    title: 'A Foundation for Specialization',
    description:
      'Supports the development and evaluation of AI capabilities for focused enterprise tasks.',
    highlight: 'Enterprise Focus',
  },
  {
    id: 'direction',
    icon: TrendingUp,
    title: 'A Distinct Product Direction',
    description:
      'Makes Indian-context language handling a core design consideration rather than an afterthought.',
    highlight: 'Core Design Goal',
  },
];

const PIPELINE_STEPS = [
  { label: 'Curated\nLanguage Data', color: 'from-emiqen-blue to-emiqen-blue' },
  { label: 'Contextual\nLanguage Processing', color: 'from-emiqen-blue to-emiqen-cyan-dark' },
  { label: 'Domain-Focused\nAI Tasks', color: 'from-emiqen-cyan-dark to-emiqen-violet' },
  { label: 'More Relevant\nUser Experience', color: 'from-emiqen-violet to-emiqen-violet' },
];

export const DataAdvantageSection: React.FC = () => {
  return (
    <section
      id="data-advantage"
      className="py-20 md:py-28 bg-white border-t border-slate-100 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* ── Section Header ── */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100/70 text-xs font-semibold text-emiqen-navy uppercase tracking-wider">
            <span>Our Data Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-emiqen-navy tracking-tight">
            Built with Indian Context in Mind.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            EMIQEN is developing a custom language dataset focused on contextual vocabulary and
            language differences relevant to Indian users. By curating meaningful word mappings and
            language examples, we aim to help AI systems interpret everyday expressions in ways that
            better reflect Indian communication patterns.
          </p>
        </div>

        {/* ── 4 Dataset Highlights ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DATASET_HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-emiqen-soft-border bg-gradient-to-b from-white to-emiqen-soft-bg/30 p-7 shadow-subtle hover:shadow-elevated transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-emiqen-soft-bg border border-blue-100 flex items-center justify-center text-emiqen-blue group-hover:bg-emiqen-navy group-hover:text-emiqen-cyan transition-colors duration-300 mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-emiqen-navy mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* ── Before / After Vocabulary Demo ── */}
        <div className="rounded-2xl border border-emiqen-soft-border bg-emiqen-soft-bg/40 overflow-hidden shadow-subtle">
          {/* Header */}
          <div className="bg-gradient-to-r from-emiqen-navy via-emiqen-navy-light to-emiqen-navy px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <span className="text-xs font-semibold text-emiqen-cyan uppercase tracking-wider">
                Illustrative Vocabulary Examples
              </span>
              <p className="text-sm text-slate-300 mt-0.5">
                Context-dependent mappings — not universal substitutions
              </p>
            </div>
            <span className="text-[10px] text-emiqen-cyan/80 bg-white/5 border border-emiqen-cyan/20 px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide whitespace-nowrap">
              In Development
            </span>
          </div>

          {/* Column Labels */}
          <div className="grid grid-cols-2 gap-px bg-slate-200 border-b border-slate-200">
            <div className="bg-slate-50 px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Input Expression
            </div>
            <div className="bg-slate-50 px-6 py-3 text-xs font-semibold text-emiqen-blue uppercase tracking-wider flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5" />
              Indian-Context Alternative
            </div>
          </div>

          {/* Rows */}
          {VOCAB_EXAMPLES.map((ex, idx) => (
            <div
              key={idx}
              className="grid grid-cols-2 gap-px bg-slate-200 hover:bg-emiqen-blue/5 transition-colors"
            >
              <div className="bg-white px-6 py-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[11px] font-bold text-slate-500">
                  {idx + 1}
                </span>
                <span className="text-sm font-medium text-slate-700 font-mono">{ex.input}</span>
              </div>
              <div className="bg-white px-6 py-4">
                <div className="flex items-start gap-2">
                  <span className="text-sm font-semibold text-emiqen-navy font-mono mt-0.5">
                    {ex.output}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 italic">{ex.note}</p>
              </div>
            </div>
          ))}

          {/* Explanation Footer */}
          <div className="bg-white px-6 py-4 flex items-start gap-2.5 border-t border-slate-100">
            <Info className="w-4 h-4 text-emiqen-blue shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">
              Our custom dataset helps EMIQEN identify relevant vocabulary differences and supports
              more context-aware language processing. This creates a foundation for building AI
              experiences that feel more natural and relevant to Indian users. These examples are
              context-dependent and illustrative; substitutions are only applied when the intended
              context supports them.
            </p>
          </div>
        </div>

        {/* ── Why Our Data Matters — 4 Benefit Cards ── */}
        <div className="space-y-8">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100/80 text-xs font-semibold text-emiqen-violet uppercase tracking-wider">
              Business Value
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-emiqen-navy">
              Why Our Data Matters
            </h3>
            <p className="text-sm text-slate-500 italic">
              These are intended benefits and design goals, not proven performance claims.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUSINESS_VALUE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="rounded-2xl border border-emiqen-soft-border bg-white p-6 shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emiqen-soft-bg border border-blue-100 flex items-center justify-center text-emiqen-blue group-hover:bg-emiqen-blue group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {card.highlight}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-emiqen-navy mb-2">{card.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Dataset Role Pipeline ── */}
        <div className="rounded-2xl border border-emiqen-soft-border bg-gradient-to-br from-emiqen-navy via-emiqen-navy-light to-emiqen-navy p-8 sm:p-10 text-white space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold text-emiqen-cyan uppercase tracking-wider">
              Dataset's Role in EMIQEN
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              One component of a broader AI development effort
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl mx-auto">
              The dataset is an important input — not a standalone model. It works alongside speech
              recognition, language processing, and task-specific modules.
            </p>
          </div>

          {/* Pipeline Visual */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
            {PIPELINE_STEPS.map((step, idx) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center text-center px-3 py-4 rounded-xl bg-white/8 border border-white/10 hover:bg-white/12 transition-colors w-full sm:w-auto sm:min-w-[140px]">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${step.color} mb-2`} />
                  <span className="text-xs font-semibold text-white leading-snug whitespace-pre-line">
                    {step.label}
                  </span>
                </div>
                {idx < PIPELINE_STEPS.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-emiqen-cyan/60 shrink-0 hidden sm:block mx-1" />
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 max-w-xl mx-auto">
            A vocabulary dataset alone does not guarantee better accuracy or independently train the
            language model. It is one structured input within EMIQEN's multi-component AI development
            approach.
          </p>
        </div>

      </div>
    </section>
  );
};

