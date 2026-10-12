import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Volume2, RotateCcw, AlertCircle, 
  Search, Code2, Globe 
} from 'lucide-react';
import { WaveformVisualizer, WaveformState } from '../WaveformVisualizer';
import { ApiIntegrationModal } from './ApiIntegrationModal';
import { EXACT_26_VOICES, type VoiceName } from './voicesData';
export type { VoiceName };

const DEFAULT_HINDI_SAMPLE =
  'भारत की सुबह का नज़ारा ही कुछ और होता है। चाय की चुस्की के साथ अखबार, बच्चों की किलकारियां, और मंदिर की घंटियों की आवाज़, सब मिलकर एक ऐसा माहौल बनाते हैं जो दिल को सुकून देता है। यही तो है अपने देश की खूबसूरती।';

const LANGUAGES = [
  { code: 'hi-IN', label: 'Hindi (हिंदी)' },
  { code: 'en-IN', label: 'Indian English' },
  { code: 'bn-IN', label: 'Bengali (বাংলা)' },
  { code: 'ta-IN', label: 'Tamil (தமிழ்)' },
  { code: 'te-IN', label: 'Telugu (తెలుగు)' },
  { code: 'kn-IN', label: 'Kannada (ಕನ್ನಡ)' },
  { code: 'mr-IN', label: 'Marathi (मराठी)' },
  { code: 'gu-IN', label: 'Gujarati (ગુજરાતી)' },
];

export const TextToSpeechTab: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('hi-IN');
  const [inputText, setInputText] = useState<string>(DEFAULT_HINDI_SAMPLE);
  const [selectedVoice, setSelectedVoice] = useState<VoiceName>('Aarav');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Audio playback state for main text
  const [ttsState, setTtsState] = useState<WaveformState>('idle');
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [validationError, setValidationError] = useState<string>('');
  
  // Preview audio state for voice cards
  const [previewingVoice, setPreviewingVoice] = useState<VoiceName | null>(null);

  // Integration Modal
  const [isApiModalOpen, setIsApiModalOpen] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stopAllAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTtsState('idle');
    setPreviewingVoice(null);
  };

  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, []);

  // When changing voice or language, stop audio
  const handleVoiceSelect = (voice: VoiceName) => {
    if (previewingVoice !== null || ttsState === 'playing') {
      stopAllAudio();
    }
    setSelectedVoice(voice);
  };

  // Preview individual voice
  const handlePreviewVoice = (e: React.MouseEvent, voice: VoiceName) => {
    e.stopPropagation();

    if (previewingVoice === voice) {
      stopAllAudio();
      return;
    }

    stopAllAudio();
    setSelectedVoice(voice);
    setPreviewingVoice(voice);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      synth.cancel();

      const samplePhrase =
        selectedLanguage === 'hi-IN'
          ? `नमस्ते, मैं ${voice} हूँ। EMIQEN वॉइस स्टूडियो में आपका स्वागत है।`
          : `Hello, I am ${voice}. Welcome to EMIQEN Voice Studio.`;

      const utterance = new SpeechSynthesisUtterance(samplePhrase);
      utterance.lang = selectedLanguage;

      const voices = synth.getVoices();
      const matched =
        voices.find((v) => v.lang === selectedLanguage || v.lang.startsWith(selectedLanguage.split('-')[0])) ||
        voices.find((v) => v.lang.includes('IN'));

      if (matched) utterance.voice = matched;
      utterance.rate = 1.0;

      utterance.onend = () => {
        setPreviewingVoice(null);
      };

      utterance.onerror = () => {
        setPreviewingVoice(null);
      };

      synth.speak(utterance);
    } else {
      setTimeout(() => {
        setPreviewingVoice(null);
      }, 2500);
    }
  };

  // Main Text to Speech Playback
  const handlePlayTTS = () => {
    setValidationError('');

    if (!inputText.trim()) {
      setValidationError('Please enter or paste text to synthesize speech.');
      return;
    }

    if (inputText.length > 500) {
      setValidationError('Text exceeds current character limit of 500 characters.');
      return;
    }

    // Toggle pause if playing
    if (ttsState === 'playing') {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.pause();
      }
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setTtsState('paused');
      return;
    }

    // Resume if paused
    if (ttsState === 'paused') {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.resume();
      }
      setTtsState('playing');
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
      return;
    }

    // Start fresh generation
    stopAllAudio();
    setTtsState('processing');
    setElapsedSeconds(0);

    setTimeout(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          const synth = window.speechSynthesis;
          synth.cancel();

          const utterance = new SpeechSynthesisUtterance(inputText);
          utteranceRef.current = utterance;
          utterance.lang = selectedLanguage;

          // Pick voice matching language
          const voices = synth.getVoices();
          const langPrefix = selectedLanguage.split('-')[0];
          const matched =
            voices.find((v) => v.lang === selectedLanguage) ||
            voices.find((v) => v.lang.startsWith(langPrefix)) ||
            voices.find((v) => v.lang.includes('IN'));

          if (matched) utterance.voice = matched;
          utterance.rate = 0.98;

          utterance.onstart = () => {
            setTtsState('playing');
            if (timerRef.current !== null) window.clearInterval(timerRef.current);
            timerRef.current = window.setInterval(() => {
              setElapsedSeconds((prev) => prev + 1);
            }, 1000);
          };

          utterance.onpause = () => {
            setTtsState('paused');
          };

          utterance.onresume = () => {
            setTtsState('playing');
          };

          utterance.onend = () => {
            if (timerRef.current !== null) {
              window.clearInterval(timerRef.current);
              timerRef.current = null;
            }
            setTtsState('completed');
            setTimeout(() => {
              setTtsState('idle');
              setElapsedSeconds(0);
            }, 1500);
          };

          utterance.onerror = (e) => {
            if (timerRef.current !== null) {
              window.clearInterval(timerRef.current);
              timerRef.current = null;
            }
            if (e.error !== 'canceled') {
              setTtsState('error');
              setValidationError('Audio playback encountered an interruption.');
            } else {
              setTtsState('idle');
            }
          };

          synth.speak(utterance);
        } catch {
          setTtsState('error');
          setValidationError('Speech synthesis failed in browser.');
        }
      } else {
        setTtsState('error');
        setValidationError('Web Speech API is not supported in this browser.');
      }
    }, 250);
  };

  const handleResetSample = () => {
    stopAllAudio();
    setInputText(DEFAULT_HINDI_SAMPLE);
    setSelectedLanguage('hi-IN');
    setValidationError('');
  };

  // Filter 26 voices
  const filteredVoices = EXACT_26_VOICES.filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-6">
      
      {/* 2-Column Desktop Grid / Stacked Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ── LEFT PANEL: Text Input (7 cols) ── */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
          
          <div className="space-y-4">
            {/* Top Toolbar: Language Selector & Character Limit */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emiqen-blue" />
                <label htmlFor="tts-language" className="text-xs font-bold text-slate-700">
                  Target Language:
                </label>
                <div className="relative">
                  <select
                    id="tts-language"
                    value={selectedLanguage}
                    onChange={(e) => {
                      setSelectedLanguage(e.target.value);
                      if (e.target.value === 'hi-IN' && inputText === '') {
                        setInputText(DEFAULT_HINDI_SAMPLE);
                      }
                    }}
                    className="text-xs font-semibold text-emiqen-navy bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-emiqen-blue/30 focus:border-emiqen-blue"
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetSample}
                  className="text-[11px] font-semibold text-slate-500 hover:text-emiqen-blue transition-colors flex items-center gap-1"
                  title="Reset to Hindi default sample"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Sample</span>
                </button>
                <span className="text-[11px] font-mono text-slate-400">
                  {inputText.length} / 500
                </span>
              </div>
            </div>

            {/* Large Editable Text Input */}
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setValidationError('');
                }}
                rows={7}
                placeholder="Enter or paste text in Hindi, Indian English, or regional languages..."
                className={`w-full p-4 rounded-xl border text-sm sm:text-base leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-emiqen-blue/30 bg-slate-50/50 ${
                  validationError
                    ? 'border-rose-400 bg-rose-50/20'
                    : 'border-slate-200 focus:border-emiqen-blue focus:bg-white'
                }`}
                aria-label="Text to synthesize into speech"
              />

              {validationError && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{validationError}</span>
                </p>
              )}
            </div>
          </div>

          {/* Bottom Controls Bar */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            
            {/* Selected Voice indicator */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Selected Voice:</span>
              <span className="font-bold text-emiqen-navy bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emiqen-blue" />
                {selectedVoice}
              </span>
            </div>

            {/* Play Button & Waveform */}
            <div className="flex items-center gap-3">
              {ttsState === 'playing' && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-slate-600">
                  <WaveformVisualizer
                    state="playing"
                    barCount={6}
                    size="sm"
                    colorVariant="brand"
                  />
                  <span>{formatTimer(elapsedSeconds)}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handlePlayTTS}
                disabled={ttsState === 'processing'}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emiqen-blue active:scale-[0.98] ${
                  ttsState === 'playing'
                    ? 'bg-emiqen-blue hover:bg-emiqen-blue-hover ring-2 ring-emiqen-cyan/40'
                    : ttsState === 'paused'
                    ? 'bg-amber-600 hover:bg-amber-700'
                    : 'bg-emiqen-navy hover:bg-emiqen-blue'
                }`}
              >
                {ttsState === 'processing' ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Synthesizing...</span>
                  </>
                ) : ttsState === 'playing' ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-emiqen-cyan" />
                    <span>Pause</span>
                  </>
                ) : ttsState === 'paused' ? (
                  <>
                    <Play className="w-3.5 h-3.5 text-white" />
                    <span>Resume</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emiqen-cyan fill-emiqen-cyan" />
                    <span>Generate & Play</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Try Text to Speech API CTA */}
          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
            <span>Enterprise neural speech generation</span>
            <button
              type="button"
              onClick={() => setIsApiModalOpen(true)}
              className="text-emiqen-blue hover:text-emiqen-blue-hover font-semibold inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emiqen-blue rounded"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Try Text to Speech API</span>
            </button>
          </div>
        </div>

        {/* ── RIGHT PANEL: Voice Selection (5 cols) ── */}
        <div className="lg:col-span-5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between space-y-4">
          
          <div className="space-y-3">
            {/* Header & Voice Search */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 gap-2">
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Voice Catalog
                </h4>
                <p className="text-[11px] text-slate-400">
                  {EXACT_26_VOICES.length} Verified Indic Voices
                </p>
              </div>

              {/* Explore Voices Search */}
              <div className="relative w-40">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Explore voices..."
                  className="w-full pl-8 pr-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emiqen-blue focus:border-emiqen-blue"
                />
              </div>
            </div>

            {/* Scrollable 26 Voice Cards List */}
            <div className="grid grid-cols-2 gap-2 max-h-[360px] overflow-y-auto pr-1">
              {filteredVoices.map((voice) => {
                const isSelected = selectedVoice === voice;
                const isPreviewing = previewingVoice === voice;

                return (
                  <div
                    key={voice}
                    onClick={() => handleVoiceSelect(voice)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emiqen-blue group ${
                      isSelected
                        ? 'bg-blue-50/80 border-emiqen-blue shadow-2xs ring-1 ring-emiqen-blue/30'
                        : 'bg-white hover:bg-slate-50 border-slate-200/80'
                    }`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleVoiceSelect(voice);
                      }
                    }}
                    aria-pressed={isSelected}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                          isSelected
                            ? 'bg-emiqen-blue text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                        }`}
                      >
                        {voice.charAt(0)}
                      </div>
                      <span className={`text-xs font-bold truncate ${isSelected ? 'text-emiqen-navy' : 'text-slate-800'}`}>
                        {voice}
                      </span>
                    </div>

                    {/* Preview Button */}
                    <button
                      type="button"
                      onClick={(e) => handlePreviewVoice(e, voice)}
                      className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                        isPreviewing
                          ? 'bg-emiqen-blue text-white border-emiqen-blue shadow-xs'
                          : 'bg-slate-50 text-slate-500 hover:text-emiqen-blue hover:bg-white border-slate-200'
                      }`}
                      aria-label={`Preview voice sample for ${voice}`}
                      title={`Preview voice ${voice}`}
                    >
                      {isPreviewing ? (
                        <Pause className="w-3 h-3 text-emiqen-cyan" />
                      ) : (
                        <Volume2 className="w-3 h-3 text-slate-600 group-hover:text-emiqen-blue" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Voice Engine Specs Note */}
          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>24kHz Studio Output</span>
            </span>
            <span className="font-mono text-slate-400 text-[10px]">
              Active: {selectedVoice}
            </span>
          </div>
        </div>
      </div>

      {/* Developer API Modal */}
      <ApiIntegrationModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        serviceType="tts"
      />
    </div>
  );
};
