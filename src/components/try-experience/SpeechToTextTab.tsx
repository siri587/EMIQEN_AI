import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, Square, Sparkles, Copy, Check, Trash2, 
  AlertCircle, Code2 
} from 'lucide-react';
import { WaveformVisualizer, WaveformState } from '../WaveformVisualizer';
import { ApiIntegrationModal } from './ApiIntegrationModal';

// Sample enterprise sentences to quickly test STT decoding without mic
const PRESET_AUDIO_SAMPLES = [
  {
    label: 'Logistics Dispatch',
    text: 'Whitefield hub consignment 402 has been handed over at warehouse gate number three.',
  },
  {
    label: 'Banking EMI Triage',
    text: 'Sir, ₹45,000 was debited twice from my salary account for home loan EMI. Please initiate instant reversal.',
  },
  {
    label: 'Hindi Multilingual',
    text: 'नमस्ते, कल सुबह दस बजे डॉक्टर वर्मा के साथ मेरा अपॉइंटमेंट कन्फर्म कर दीजिए।',
  },
];

export const SpeechToTextTab: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'en-IN' | 'hi-IN'>('en-IN');
  const [isApiModalOpen, setIsApiModalOpen] = useState<boolean>(false);

  const recognitionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);

  // Stop recording and stream
  const stopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }

    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setIsRecording(false);
    setInterimTranscript('');
  };

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  // Start Speech to Text Recording
  const startRecording = async () => {
    setErrorMessage('');
    setInterimTranscript('');

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        // First request microphone stream to ensure permission
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaStreamRef.current = stream;
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = selectedLanguage;

        recognition.onstart = () => {
          setIsRecording(true);
          setRecordingSeconds(0);
          if (timerRef.current !== null) window.clearInterval(timerRef.current);
          timerRef.current = window.setInterval(() => {
            setRecordingSeconds((prev) => prev + 1);
          }, 1000);
        };

        recognition.onresult = (event: any) => {
          let currentInterim = '';
          let currentFinal = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              currentFinal += event.results[i][0].transcript + ' ';
            } else {
              currentInterim += event.results[i][0].transcript;
            }
          }

          if (currentFinal) {
            setTranscript((prev) => (prev ? `${prev.trim()} ${currentFinal.trim()}` : currentFinal.trim()));
          }
          setInterimTranscript(currentInterim);
        };

        recognition.onerror = (event: any) => {
          if (event.error === 'not-allowed') {
            setErrorMessage('Microphone access denied. Please enable microphone permissions in your browser.');
          } else if (event.error === 'no-speech') {
            // no speech detected in interval
          } else {
            setErrorMessage(`Speech recognition notice: ${event.error}`);
          }
        };

        recognition.onend = () => {
          // If still marked as recording, restart or finalize
          setIsRecording(false);
          setInterimTranscript('');
          if (timerRef.current !== null) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
        };

        recognition.start();
      } catch (err: any) {
        setErrorMessage(
          err.name === 'NotAllowedError'
            ? 'Microphone permission was denied.'
            : 'Unable to access microphone. Please check system audio devices.'
        );
      }
    } else {
      // Browser doesn't support Web SpeechRecognition (e.g. Firefox default)
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaStreamRef.current = stream;
          setIsRecording(true);
          setRecordingSeconds(0);
          if (timerRef.current !== null) window.clearInterval(timerRef.current);
          timerRef.current = window.setInterval(() => {
            setRecordingSeconds((prev) => prev + 1);
          }, 1000);

          setErrorMessage(
            'Live audio capture active. Note: In-browser live captioning API is supported natively in Chrome, Edge, and Safari.'
          );
        } catch {
          setErrorMessage('Microphone permission was denied.');
        }
      } else {
        setErrorMessage('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      }
    }
  };

  const handleCopyTranscript = () => {
    const fullText = `${transcript} ${interimTranscript}`.trim();
    if (fullText && navigator.clipboard) {
      navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClearTranscript = () => {
    stopRecording();
    setTranscript('');
    setInterimTranscript('');
    setErrorMessage('');
  };

  const handleSelectPreset = (sampleText: string) => {
    setTranscript(sampleText);
    setInterimTranscript('');
  };

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentWaveformState: WaveformState = isRecording ? 'playing' : 'idle';

  return (
    <div className="space-y-6">
      
      {/* ── Main Spacious Transcription Workspace ── */}
      <div className="bg-gradient-to-b from-white via-white to-blue-50/40 backdrop-blur-md rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs flex flex-col items-center justify-between text-center relative overflow-hidden min-h-[500px]">
        
        {/* Top Header Section */}
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100/80 text-xs font-semibold text-emiqen-blue">
            <Sparkles className="w-3.5 h-3.5 text-emiqen-cyan" />
            <span>Real-time Indic Speech Recognition</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-emiqen-navy tracking-tight">
            Speak to See Live Captions
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-lg mx-auto">
            High-accuracy multilingual speech-to-text calibrated for Indian English and regional accents, background office noise, and rapid code-switching.
          </p>

          {/* Language Selector */}
          <div className="flex items-center justify-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 font-medium">Recognition Dialect:</span>
            <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedLanguage('en-IN')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  selectedLanguage === 'en-IN'
                    ? 'bg-white text-emiqen-navy shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Indian English (en-IN)
              </button>
              <button
                type="button"
                onClick={() => setSelectedLanguage('hi-IN')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  selectedLanguage === 'hi-IN'
                    ? 'bg-white text-emiqen-navy shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Hindi (hi-IN)
              </button>
            </div>
          </div>
        </div>

        {/* Central Audio Microphone & Waveform Indicator */}
        <div className="my-8 flex flex-col items-center justify-center space-y-4">
          
          {/* Glowing Circular Mic Trigger */}
          <div className="relative flex items-center justify-center">
            {isRecording && (
              <>
                <div className="absolute w-36 h-36 rounded-full bg-gradient-to-r from-emiqen-blue/30 via-emiqen-cyan/30 to-emiqen-violet/30 animate-ping opacity-60 pointer-events-none" />
                <div className="absolute w-32 h-32 rounded-full border-2 border-dashed border-emiqen-cyan animate-spin duration-1000 pointer-events-none" />
              </>
            )}

            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-elevated focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emiqen-blue/40 z-10 active:scale-95 ${
                isRecording
                  ? 'bg-rose-600 text-white ring-4 ring-rose-200 hover:bg-rose-700'
                  : 'bg-emiqen-blue text-white hover:bg-emiqen-blue-hover hover:scale-105'
              }`}
              aria-label={isRecording ? 'Stop recording live speech' : 'Start speaking to record audio'}
            >
              {isRecording ? (
                <>
                  <Square className="w-8 h-8 fill-white mb-0.5" />
                  <span className="text-[10px] font-bold font-mono">
                    {formatTimer(recordingSeconds)}
                  </span>
                </>
              ) : (
                <>
                  <Mic className="w-8 h-8 mb-0.5" />
                  <span className="text-[10px] font-bold">Start</span>
                </>
              )}
            </button>
          </div>

          {/* Live Waveform Display */}
          <div className="flex flex-col items-center space-y-2">
            <div className="h-8 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center">
              <WaveformVisualizer
                state={currentWaveformState}
                barCount={8}
                size="md"
                colorVariant="brand"
              />
            </div>
            <span className="text-xs font-semibold text-slate-600">
              {isRecording
                ? `Listening live... (${formatTimer(recordingSeconds)})`
                : 'Click Start to speak into your microphone'}
            </span>
          </div>

          {/* Error Notice */}
          {errorMessage && (
            <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl flex items-center gap-1.5 max-w-md mx-auto text-left">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* ── Real-Time Live Transcript Panel ── */}
        <div className="w-full max-w-3xl bg-white/95 rounded-2xl border border-slate-200/90 p-5 text-left shadow-2xs space-y-3">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Recognized Transcript
              </span>
              {isRecording && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Streaming
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Copy Transcript Button */}
              <button
                type="button"
                onClick={handleCopyTranscript}
                disabled={!transcript && !interimTranscript}
                className="text-xs font-semibold text-slate-600 hover:text-emiqen-blue disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                title="Copy recognized transcript"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              {/* Clear Transcript Button */}
              <button
                type="button"
                onClick={handleClearTranscript}
                disabled={!transcript && !interimTranscript}
                className="text-xs font-semibold text-slate-500 hover:text-rose-600 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                title="Clear transcript"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Transcript Text Box */}
          <div className="min-h-[90px] text-sm sm:text-base leading-relaxed text-slate-800 font-sans">
            {transcript || interimTranscript ? (
              <p>
                <span>{transcript}</span>
                {interimTranscript && (
                  <span className="text-slate-400 italic font-medium ml-1">
                    {interimTranscript}
                  </span>
                )}
                {isRecording && (
                  <span className="inline-block w-1.5 h-4 ml-1 bg-emiqen-blue animate-pulse align-middle" />
                )}
              </p>
            ) : (
              <p className="text-slate-400 italic text-xs sm:text-sm">
                Spoken words will appear here in real-time as you speak into your microphone...
              </p>
            )}
          </div>

          {/* Quick Presets for Instant Testing */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400">
              Or test with sample audio transcript:
            </span>
            {PRESET_AUDIO_SAMPLES.map((sample) => (
              <button
                key={sample.label}
                type="button"
                onClick={() => handleSelectPreset(sample.text)}
                className="text-[11px] font-semibold text-emiqen-blue hover:text-emiqen-navy bg-blue-50/70 hover:bg-blue-100/70 border border-blue-100 px-2.5 py-0.5 rounded-full transition-colors"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom CTA to API Integration */}
        <div className="pt-6 w-full max-w-3xl flex flex-wrap items-center justify-between text-xs text-slate-500 border-t border-slate-200/60 mt-6 gap-2">
          <span>Whisper Large-v3 architecture with proprietary Indic post-processing</span>
          <button
            type="button"
            onClick={() => setIsApiModalOpen(true)}
            className="text-emiqen-blue hover:text-emiqen-blue-hover font-semibold inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emiqen-blue rounded"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Try Speech to Text API</span>
          </button>
        </div>
      </div>

      {/* Developer API Modal */}
      <ApiIntegrationModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        serviceType="stt"
      />
    </div>
  );
};
