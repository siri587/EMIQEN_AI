import React, { useState } from 'react';
import { Mic, Volume2, Sparkles, CheckCircle2, Sliders, ChevronRight } from 'lucide-react';

interface Scenario {
  id: string;
  category: string;
  userType: string;
  inputMode: 'Voice' | 'Text';
  userInput: string;
  linguisticTag: string;
  contextTag: string;
  emotionTone: string;
  systemResponse: string;
  audioDuration: string;
}

const DEMO_SCENARIOS: Scenario[] = [
  {
    id: 'scheduling',
    category: 'Enterprise Scheduling',
    userType: 'Branch Operations Lead',
    inputMode: 'Voice',
    userInput: '"Kindly prepone our regional compliance review scheduled for coming Friday to Thursday afternoon."',
    linguisticTag: 'Indian English idiom: "prepone" → advance calendar date',
    contextTag: 'Audit & Compliance Operations',
    emotionTone: 'Calibrated Professional / Urgent',
    systemResponse:
      'Understood. Requesting calendar adjustment to prepone the regional compliance review from Friday to Thursday, 2:30 PM IST. Notifying participating audit leads for confirmation.',
    audioDuration: '0:06',
  },
  {
    id: 'field-dispatch',
    category: 'Field Service Logistics',
    userType: 'Supply Chain Field Executive',
    inputMode: 'Voice',
    userInput: '"Whitefield hub consignment 402 has been handed over at warehouse gate number three."',
    linguisticTag: 'Regional location vernacular & dispatch syntax',
    contextTag: 'Hub Dispatch & Handover Logging',
    emotionTone: 'Concise Actionable / Clear',
    systemResponse:
      'Recorded consignment #402 delivery at Whitefield Hub, Gate 3. Timestamped and logged into the active dispatch ledger.',
    audioDuration: '0:05',
  },
  {
    id: 'document-query',
    category: 'Policy & Document Query',
    userType: 'Frontline Banking Associate',
    inputMode: 'Text',
    userInput: 'What is the ceiling limit for inter-branch conveyance reimbursement without zonal head sign-off?',
    linguisticTag: 'Indian banking administrative vernacular',
    contextTag: 'Internal HR & Financial Guidelines',
    emotionTone: 'Direct / Factual Advisory',
    systemResponse:
      'Per current operational guidelines (Section 4.2), branch conveyance up to ₹5,000 per instance requires branch manager approval. Amounts exceeding this threshold require zonal sign-off.',
    audioDuration: '0:08',
  },
];

export const IllustrativeVoiceDemo: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<Scenario>(DEMO_SCENARIOS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const toggleAudio = () => {
    setIsPlayingAudio((prev) => !prev);
    // Auto reset after 3 seconds for illustrative visual feel
    if (!isPlayingAudio) {
      setTimeout(() => setIsPlayingAudio(false), 3500);
    }
  };

  return (
    <div className="relative w-full rounded-2xl border border-emiqen-soft-border/80 bg-white/95 shadow-elevated backdrop-blur-md overflow-hidden">
      {/* Top Banner Notice - Mandatory Illustrative Prototype Disclaimer */}
      <div className="bg-gradient-to-r from-emiqen-navy via-emiqen-navy-light to-emiqen-navy px-4 py-2.5 text-xs text-white/90 flex flex-wrap items-center justify-between gap-2 border-b border-emiqen-blue/20">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emiqen-cyan animate-pulse" />
          <span className="font-semibold tracking-wide text-emiqen-cyan uppercase text-[10px]">
            Illustrative Concept Interface
          </span>
          <span className="hidden sm:inline text-white/40">|</span>
          <span className="text-[11px] text-white/75 hidden sm:inline">
            Prototype representation of planned voice & text pipeline
          </span>
        </div>
        <span className="text-[10px] text-emiqen-cyan/90 bg-emiqen-cyan/10 px-2 py-0.5 rounded border border-emiqen-cyan/20">
          In Development
        </span>
      </div>

      {/* Scenario Tabs */}
      <div className="flex border-b border-slate-100 bg-slate-50/70 p-1.5 gap-1.5 overflow-x-auto text-xs">
        {DEMO_SCENARIOS.map((scenario) => {
          const isActive = scenario.id === activeScenario.id;
          return (
            <button
              key={scenario.id}
              onClick={() => {
                setActiveScenario(scenario);
                setIsPlayingAudio(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-left ${
                isActive
                  ? 'bg-white text-emiqen-navy shadow-sm border border-slate-200/80 font-semibold'
                  : 'text-slate-600 hover:text-emiqen-navy hover:bg-white/50'
              }`}
              type="button"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isActive ? 'bg-emiqen-blue' : 'bg-slate-300'
                }`}
              />
              <span>{scenario.category}</span>
            </button>
          );
        })}
      </div>

      {/* Main Console Body */}
      <div className="p-5 sm:p-6 space-y-5">
        {/* User Input Stage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-emiqen-navy flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emiqen-blue/10 text-emiqen-blue flex items-center justify-center text-[10px] font-bold">
                1
              </span>
              User Request ({activeScenario.inputMode})
            </span>
            <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Role: {activeScenario.userType}
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 relative group">
            <div className="flex items-start gap-3">
              <div
                className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                  activeScenario.inputMode === 'Voice'
                    ? 'bg-emiqen-blue text-white shadow-sm'
                    : 'bg-emiqen-navy text-white shadow-sm'
                }`}
                title={
                  activeScenario.inputMode === 'Voice'
                    ? 'Illustrative Speech Input'
                    : 'Illustrative Text Input'
                }
              >
                {activeScenario.inputMode === 'Voice' ? (
                  <Mic className="w-4 h-4" />
                ) : (
                  <Sliders className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-slate-800 leading-relaxed italic">
                  {activeScenario.userInput}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emiqen-blue bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                    <Sparkles className="w-3 h-3 text-emiqen-blue" />
                    {activeScenario.linguisticTag}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Understanding & Context Layer (Planned Processing) */}
        <div className="rounded-xl bg-emiqen-soft-bg/80 border border-emiqen-soft-border p-3.5 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-emiqen-navy flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emiqen-violet/10 text-emiqen-violet flex items-center justify-center text-[10px] font-bold">
                2
              </span>
              Context & Tone Interpretation (Planned Pipeline)
            </span>
            <span className="text-[10px] text-slate-500 font-mono">MODULAR ANALYSIS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="bg-white rounded-lg p-2.5 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">
                Domain Context
              </span>
              <span className="font-medium text-slate-800 text-xs mt-0.5 block">
                {activeScenario.contextTag}
              </span>
            </div>
            <div className="bg-white rounded-lg p-2.5 border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">
                Adaptive Tone Calibration
              </span>
              <span className="font-medium text-slate-800 text-xs mt-0.5 block flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emiqen-violet" />
                {activeScenario.emotionTone}
              </span>
            </div>
          </div>
        </div>

        {/* System Response Stage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-emiqen-navy flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emiqen-cyan/20 text-emiqen-navy flex items-center justify-center text-[10px] font-bold">
                3
              </span>
              Task-Focused Output (Text & Voice)
            </span>
            <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Structured Response
            </span>
          </div>

          <div className="rounded-xl border border-emiqen-soft-border bg-white p-4 space-y-3 shadow-sm">
            <p className="text-sm text-slate-700 leading-relaxed">
              {activeScenario.systemResponse}
            </p>

            {/* Illustrative Voice Synthesis Bar */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={toggleAudio}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emiqen-navy text-white text-xs font-semibold hover:bg-emiqen-blue transition-colors shadow-sm"
                  aria-label="Toggle illustrative voice response simulation"
                >
                  <Volume2 className="w-3.5 h-3.5 text-emiqen-cyan" />
                  <span>{isPlayingAudio ? 'Playing Sample...' : 'Hear Spoken Output'}</span>
                </button>
                <span className="text-xs font-mono text-slate-400">
                  {isPlayingAudio ? '0:03' : activeScenario.audioDuration}
                </span>
              </div>

              {/* Animated or Static Soundwave Visualizer */}
              <div
                className="flex items-center gap-1 h-6 px-2.5 py-1 rounded bg-slate-50 border border-slate-200/60"
                aria-hidden="true"
              >
                <div
                  className={`w-1 rounded-full bg-emiqen-blue transition-all duration-300 ${
                    isPlayingAudio ? 'h-5 animate-wave-1' : 'h-2'
                  }`}
                />
                <div
                  className={`w-1 rounded-full bg-emiqen-cyan transition-all duration-300 ${
                    isPlayingAudio ? 'h-4 animate-wave-2' : 'h-3'
                  }`}
                />
                <div
                  className={`w-1 rounded-full bg-emiqen-violet transition-all duration-300 ${
                    isPlayingAudio ? 'h-6 animate-wave-3' : 'h-5'
                  }`}
                />
                <div
                  className={`w-1 rounded-full bg-emiqen-blue transition-all duration-300 ${
                    isPlayingAudio ? 'h-4 animate-wave-4' : 'h-3'
                  }`}
                />
                <div
                  className={`w-1 rounded-full bg-emiqen-cyan transition-all duration-300 ${
                    isPlayingAudio ? 'h-5 animate-wave-5' : 'h-2'
                  }`}
                />
                <div
                  className={`w-1 rounded-full bg-emiqen-violet transition-all duration-300 ${
                    isPlayingAudio ? 'h-3 animate-wave-2' : 'h-1.5'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Explanatory Footer inside card */}
        <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100">
          <span>Demonstrating planned modular integration</span>
          <a
            href="#how-it-works"
            className="text-emiqen-blue hover:text-emiqen-blue-hover font-semibold inline-flex items-center gap-0.5"
          >
            Explore pipeline architecture <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

