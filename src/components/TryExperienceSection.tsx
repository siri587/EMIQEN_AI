import React, { useState } from 'react';
import { Bot, Volume2, Mic, Sparkles } from 'lucide-react';
import { VoiceAgentsTab } from './try-experience/VoiceAgentsTab';
import { TextToSpeechTab } from './try-experience/TextToSpeechTab';
import { EXACT_26_VOICES } from './try-experience/voicesData';
import { SpeechToTextTab } from './try-experience/SpeechToTextTab';

export type TryExperienceTab = 'voice-agents' | 'text-to-speech' | 'speech-to-text';

interface TryExperienceSectionProps {
  id?: string;
  defaultTab?: TryExperienceTab;
}

export const TryExperienceSection: React.FC<TryExperienceSectionProps> = ({
  id = 'playground',
  defaultTab = 'voice-agents',
}) => {
  const [activeTab, setActiveTab] = useState<TryExperienceTab>(defaultTab);

  return (
    <section
      id={id}
      className="py-20 md:py-28 bg-transparent border-t border-slate-200/70 scroll-mt-20 relative"
      aria-label="Interactive AI Playground"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-emiqen-blue uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emiqen-cyan" />
            <span>Interactive Playground</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-emiqen-navy tracking-tight">
            Experience{' '}
            <span className="bg-gradient-to-r from-emiqen-blue via-emiqen-cyan-dark to-emiqen-violet bg-clip-text text-transparent">
              EMIQEN in Action.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Test conversational enterprise voice agents, neural multilingual text-to-speech, and live Indian speech transcription in a live, interactive workspace.
          </p>
        </div>

        {/* ── Top Horizontal Navigation: EXACTLY 3 TABS ── */}
        <div className="max-w-2xl mx-auto">
          <div
            className="flex items-center justify-center p-1.5 rounded-2xl bg-white/90 border border-slate-200/90 shadow-sm backdrop-blur-md overflow-x-auto gap-1"
            role="tablist"
            aria-label="Try Experience Navigation"
          >
            {/* 1. Voice Agents */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'voice-agents'}
              aria-controls="voice-agents-panel"
              onClick={() => setActiveTab('voice-agents')}
              className={`group flex-1 min-w-[130px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emiqen-blue cursor-pointer ${
                activeTab === 'voice-agents'
                  ? 'bg-emiqen-blue text-white shadow-md shadow-emiqen-blue/20 ring-1 ring-emiqen-blue'
                  : 'text-slate-600 hover:text-emiqen-navy hover:bg-slate-100/90'
              }`}
            >
              <Bot className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${activeTab === 'voice-agents' ? 'text-emiqen-cyan' : 'text-slate-400 group-hover:text-emiqen-blue'}`} />
              <span>Voice Agents</span>
            </button>

            {/* 2. Text to Speech */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'text-to-speech'}
              aria-controls="text-to-speech-panel"
              onClick={() => setActiveTab('text-to-speech')}
              className={`group flex-1 min-w-[130px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emiqen-blue cursor-pointer ${
                activeTab === 'text-to-speech'
                  ? 'bg-emiqen-blue text-white shadow-md shadow-emiqen-blue/20 ring-1 ring-emiqen-blue'
                  : 'text-slate-600 hover:text-emiqen-navy hover:bg-slate-100/90'
              }`}
            >
              <Volume2 className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${activeTab === 'text-to-speech' ? 'text-emiqen-cyan' : 'text-slate-400 group-hover:text-emiqen-blue'}`} />
              <span>Text to Speech</span>
            </button>

            {/* 3. Speech to Text */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'speech-to-text'}
              aria-controls="speech-to-text-panel"
              onClick={() => setActiveTab('speech-to-text')}
              className={`group flex-1 min-w-[130px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emiqen-blue cursor-pointer ${
                activeTab === 'speech-to-text'
                  ? 'bg-emiqen-blue text-white shadow-md shadow-emiqen-blue/20 ring-1 ring-emiqen-blue'
                  : 'text-slate-600 hover:text-emiqen-navy hover:bg-slate-100/90'
              }`}
            >
              <Mic className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${activeTab === 'speech-to-text' ? 'text-emiqen-cyan' : 'text-slate-400 group-hover:text-emiqen-blue'}`} />
              <span>Speech to Text</span>
            </button>
          </div>
        </div>

        {/* ── Active Experience Workspace Panel ── */}
        <div className="w-full">
          {activeTab === 'voice-agents' && (
            <div id="voice-agents-panel" role="tabpanel" aria-labelledby="tab-voice-agents">
              <VoiceAgentsTab availableVoices={EXACT_26_VOICES as unknown as string[]} />
            </div>
          )}

          {activeTab === 'text-to-speech' && (
            <div id="text-to-speech-panel" role="tabpanel" aria-labelledby="tab-text-to-speech">
              <TextToSpeechTab />
            </div>
          )}

          {activeTab === 'speech-to-text' && (
            <div id="speech-to-text-panel" role="tabpanel" aria-labelledby="tab-speech-to-text">
              <SpeechToTextTab />
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
