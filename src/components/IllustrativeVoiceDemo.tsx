import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, Volume2, Sparkles, CheckCircle2, Sliders, ChevronRight, 
  Play, Pause, RotateCcw, Loader2, Copy, Check 
} from 'lucide-react';
import { WaveformVisualizer, WaveformState } from './WaveformVisualizer';

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
  durationSeconds: number;
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
    durationSeconds: 6,
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
    durationSeconds: 5,
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
    durationSeconds: 8,
  },
];

export const IllustrativeVoiceDemo: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<Scenario>(DEMO_SCENARIOS[0]);
  const [waveformState, setWaveformState] = useState<WaveformState>('idle');
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<number | null>(null);

  // Stop any active speech and timer
  const stopAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Clean up on unmount or scenario change
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  // Handle switching scenario tabs
  const handleScenarioChange = (scenario: Scenario) => {
    stopAudio();
    setActiveScenario(scenario);
    setWaveformState('idle');
    setElapsedSeconds(0);
    setErrorMessage('');
  };

  // Start speech synthesis playback
  const handlePlayAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setWaveformState('error');
      setErrorMessage('SpeechSynthesis not supported');
      return;
    }

    // Toggle pause if already playing
    if (waveformState === 'playing') {
      window.speechSynthesis.pause();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setWaveformState('paused');
      return;
    }

    // Toggle resume if paused
    if (waveformState === 'paused') {
      window.speechSynthesis.resume();
      setWaveformState('playing');
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= activeScenario.durationSeconds) {
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      return;
    }

    // New playback session: first enter processing state for natural feel
    stopAudio();
    setWaveformState('processing');
    setElapsedSeconds(0);
    setErrorMessage('');

    setTimeout(() => {
      try {
        const synth = window.speechSynthesis;
        synth.cancel(); // ensure clear state

        const utterance = new SpeechSynthesisUtterance(activeScenario.systemResponse);
        utteranceRef.current = utterance;

        // Try to pick an Indian English voice if available, or natural English
        const voices = synth.getVoices();
        const preferredVoice =
          voices.find((v) => v.lang === 'en-IN' || v.name.toLowerCase().includes('india')) ||
          voices.find((v) => v.lang.startsWith('en'));

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        utterance.rate = 0.98; // enterprise cadence
        utterance.pitch = 1.0;

        utterance.onstart = () => {
          setWaveformState('playing');
          if (timerRef.current !== null) window.clearInterval(timerRef.current);
          timerRef.current = window.setInterval(() => {
            setElapsedSeconds((prev) => {
              if (prev + 1 >= activeScenario.durationSeconds) {
                return activeScenario.durationSeconds;
              }
              return prev + 1;
            });
          }, 1000);
        };

        utterance.onpause = () => {
          setWaveformState('paused');
          if (timerRef.current !== null) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
        };

        utterance.onresume = () => {
          setWaveformState('playing');
        };

        utterance.onend = () => {
          if (timerRef.current !== null) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setWaveformState('completed');
          setElapsedSeconds(activeScenario.durationSeconds);
          // Return gently to idle after 1.8 seconds
          setTimeout(() => {
            setWaveformState('idle');
            setElapsedSeconds(0);
          }, 1800);
        };

        utterance.onerror = (e) => {
          if (timerRef.current !== null) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
          // Only flag as error if not a deliberate cancel
          if (e.error !== 'canceled' && e.error !== 'interrupted') {
            setWaveformState('error');
            setErrorMessage('Playback interrupted');
          } else {
            setWaveformState('idle');
          }
        };

        synth.speak(utterance);
      } catch (err) {
        setWaveformState('error');
        setErrorMessage('Speech failed to start');
      }
    }, 280);
  };

  // Copy response text
  const handleCopyResponse = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(activeScenario.systemResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Smooth scroll to Workflow/Pipeline section
  const handleScrollToPipeline = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#how-it-works');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // Format progress time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="relative w-full rounded-2xl border border-slate-200/90 bg-white/95 shadow-elevated backdrop-blur-md overflow-hidden">
      {/* Top Banner Notice - Illustrative Prototype Disclaimer */}
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
      <div 
        className="flex border-b border-slate-100 bg-slate-50/70 p-1.5 gap-1.5 overflow-x-auto text-xs"
        role="tablist"
        aria-label="Demonstration Scenarios"
      >
        {DEMO_SCENARIOS.map((scenario) => {
          const isActive = scenario.id === activeScenario.id;
          return (
            <button
              key={scenario.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`scenario-panel-${scenario.id}`}
              onClick={() => handleScenarioChange(scenario)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emiqen-blue ${
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
      <div 
        className="p-5 sm:p-6 space-y-5"
        id={`scenario-panel-${activeScenario.id}`}
        role="tabpanel"
      >
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
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyResponse}
                className="text-[11px] text-slate-500 hover:text-emiqen-blue flex items-center gap-1 transition-colors px-2 py-0.5 rounded hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emiqen-blue"
                title="Copy response text"
                aria-label="Copy response text"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-600 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Structured Response
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-emiqen-soft-border bg-white p-4 space-y-3 shadow-sm">
            <p className="text-sm text-slate-700 leading-relaxed">
              {activeScenario.systemResponse}
            </p>

            {/* Voice Synthesis Interactive Audio Controller & Waveform */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handlePlayAudio}
                  disabled={waveformState === 'processing'}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 shadow-sm active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emiqen-blue ${
                    waveformState === 'playing'
                      ? 'bg-emiqen-blue text-white hover:bg-emiqen-blue-hover ring-2 ring-emiqen-cyan/50'
                      : waveformState === 'paused'
                      ? 'bg-amber-600 text-white hover:bg-amber-700'
                      : waveformState === 'completed'
                      ? 'bg-slate-800 text-white hover:bg-emiqen-blue'
                      : 'bg-emiqen-navy text-white hover:bg-emiqen-blue'
                  }`}
                  aria-label={
                    waveformState === 'playing'
                      ? 'Pause spoken audio output'
                      : waveformState === 'paused'
                      ? 'Resume spoken audio output'
                      : waveformState === 'completed'
                      ? 'Replay spoken audio output'
                      : 'Hear spoken audio output'
                  }
                >
                  {waveformState === 'processing' ? (
                    <Loader2 className="w-3.5 h-3.5 text-emiqen-cyan animate-spin" />
                  ) : waveformState === 'playing' ? (
                    <Pause className="w-3.5 h-3.5 text-emiqen-cyan" />
                  ) : waveformState === 'paused' ? (
                    <Play className="w-3.5 h-3.5 text-white" />
                  ) : waveformState === 'completed' ? (
                    <RotateCcw className="w-3.5 h-3.5 text-emiqen-cyan" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-emiqen-cyan" />
                  )}

                  <span>
                    {waveformState === 'processing'
                      ? 'Synthesizing...'
                      : waveformState === 'playing'
                      ? 'Pause Output'
                      : waveformState === 'paused'
                      ? 'Resume Output'
                      : waveformState === 'completed'
                      ? 'Replay Spoken Output'
                      : 'Hear Spoken Output'}
                  </span>
                </button>

                {/* Progress & Duration Indicator */}
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                  {waveformState === 'playing' ? (
                    <span>
                      {formatTime(elapsedSeconds)} / {activeScenario.audioDuration}
                    </span>
                  ) : waveformState === 'paused' ? (
                    <span className="text-amber-600 font-medium">
                      Paused · {formatTime(elapsedSeconds)} / {activeScenario.audioDuration}
                    </span>
                  ) : waveformState === 'completed' ? (
                    <span className="text-emerald-600 font-medium">
                      {activeScenario.audioDuration} (Done)
                    </span>
                  ) : (
                    <span>{activeScenario.audioDuration}</span>
                  )}
                </div>
              </div>

              {/* Animated Live Waveform Visualizer */}
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center h-7 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80"
                  title={`Status: ${waveformState}`}
                >
                  <WaveformVisualizer
                    state={waveformState}
                    barCount={8}
                    size="md"
                    colorVariant="brand"
                    errorMessage={errorMessage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Explanatory Footer inside card */}
        <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100">
          <span>Demonstrating planned modular integration</span>
          <a
            href="#how-it-works"
            onClick={handleScrollToPipeline}
            className="text-emiqen-blue hover:text-emiqen-blue-hover font-semibold inline-flex items-center gap-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emiqen-blue rounded"
          >
            Explore pipeline architecture <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
