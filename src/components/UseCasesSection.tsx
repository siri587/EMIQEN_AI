import React, { useState, useEffect } from 'react';
import { siteContent } from '../data/siteContent';
import {
  Users,
  FileCheck,
  Briefcase,
  Headphones,
  Info,
  Mic,
  AlignLeft,
  Volume2,
  Pause,
} from 'lucide-react';
import { WaveformVisualizer, WaveformState } from './WaveformVisualizer';

const USE_CASE_ICONS = {
  'customer-interaction': Users,
  'knowledge-workflows': FileCheck,
  'internal-assistants': Briefcase,
  'voice-services': Headphones,
};

export const UseCasesSection: React.FC = () => {
  const { useCases } = siteContent;
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [audioState, setAudioState] = useState<WaveformState>('idle');

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeakSample = (id: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (playingId === id && (audioState === 'playing' || audioState === 'processing')) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      setAudioState('idle');
      return;
    }

    window.speechSynthesis.cancel();
    setPlayingId(id);
    setAudioState('processing');

    setTimeout(() => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        const preferredVoice =
          voices.find((v) => v.lang === 'en-IN' || v.name.toLowerCase().includes('india')) ||
          voices.find((v) => v.lang.startsWith('en'));

        if (preferredVoice) utterance.voice = preferredVoice;
        utterance.rate = 0.98;

        utterance.onstart = () => {
          setAudioState('playing');
        };

        utterance.onend = () => {
          setAudioState('completed');
          setTimeout(() => {
            setPlayingId(null);
            setAudioState('idle');
          }, 800);
        };

        utterance.onerror = () => {
          setAudioState('idle');
          setPlayingId(null);
        };

        synth.speak(utterance);
      } catch {
        setAudioState('idle');
        setPlayingId(null);
      }
    }, 150);
  };

  return (
    <section id="use-cases" className="py-20 md:py-28 bg-transparent border-t border-slate-200/70 scroll-mt-20 relative">
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
                className="rounded-2xl border border-slate-200/80 bg-white/85 backdrop-blur-md p-7 sm:p-8 shadow-subtle hover:shadow-elevated hover:bg-white/95 transition-all duration-300 flex flex-col justify-between group"
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
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold uppercase tracking-wider flex-wrap gap-1">
                    <span>Illustrative Sample Query</span>
                    <span className="text-slate-500 font-normal">
                      Focus: {item.focusArea}
                    </span>
                  </div>
                  <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3.5 text-xs text-slate-700 italic font-mono leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="flex-1">{item.sampleInput}</span>
                    {item.inputMode.includes('Voice') && (
                      <button
                        type="button"
                        onClick={() => handleSpeakSample(item.id, item.sampleInput)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emiqen-blue ${
                          playingId === item.id && audioState === 'playing'
                            ? 'bg-emiqen-blue text-white border-emiqen-blue shadow-xs'
                            : 'bg-white text-slate-700 hover:text-emiqen-blue hover:bg-slate-50 border-slate-200/80'
                        }`}
                        aria-label={`Listen to sample query for ${item.title}`}
                        title="Listen to sample audio interaction"
                      >
                        {playingId === item.id && audioState === 'playing' ? (
                          <Pause className="w-3 h-3 text-emiqen-cyan" />
                        ) : (
                          <Volume2 className="w-3 h-3 text-emiqen-blue" />
                        )}
                        <span className="text-[11px]">
                          {playingId === item.id && audioState === 'playing' ? 'Playing' : 'Listen'}
                        </span>
                        <WaveformVisualizer
                          state={playingId === item.id ? audioState : 'idle'}
                          barCount={5}
                          size="xs"
                          colorVariant={playingId === item.id && audioState === 'playing' ? 'cyan' : 'brand'}
                        />
                      </button>
                    )}
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

