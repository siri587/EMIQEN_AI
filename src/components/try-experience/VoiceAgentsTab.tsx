import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, CreditCard, Calendar, Mic, Volume2, 
  Square, Plus, Bot, AlertCircle, Info 
} from 'lucide-react';
import { WaveformVisualizer, WaveformState } from '../WaveformVisualizer';
import { BuildAgentModal, CustomAgent } from './BuildAgentModal';

interface AgentDialogue {
  sender: 'agent' | 'user';
  text: string;
  time: string;
}

interface AgentPreset {
  id: string;
  name: string;
  category: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  summary: string;
  agentSpeechSample: string;
  dialogue: AgentDialogue[];
}

const DEFAULT_AGENTS: AgentPreset[] = [
  {
    id: 'cart-recovery',
    name: 'Cart Recovery Nudge',
    category: 'E-Commerce & Retail',
    badge: 'Checkout Recovery',
    icon: ShoppingCart,
    description: 'Re-engages shoppers with abandoned cart reminders, personalized discounts, and payment links.',
    summary: 'Automates outbound calls to customers who left high-value carts, answering product questions and texting direct discount checkout links.',
    agentSpeechSample: 'Namaste Priya! I noticed you left an item in your shopping cart. Would you like me to send a 10% coupon link to your WhatsApp?',
    dialogue: [
      {
        sender: 'agent',
        text: 'Namaste Priya! Calling from FabStyle. I noticed you left an ethnic silk kurta in your cart. Would you like me to send a 10% coupon link to your WhatsApp?',
        time: '11:02 AM',
      },
      {
        sender: 'user',
        text: 'Yes please, can you send it to my registered number? Also is size M available in navy blue?',
        time: '11:03 AM',
      },
      {
        sender: 'agent',
        text: 'Size M in Navy Blue is available in our Mumbai hub. I have texted you the direct checkout link with 10% applied. You can complete payment in one click.',
        time: '11:03 AM',
      },
      {
        sender: 'user',
        text: 'Thank you! Got the message.',
        time: '11:04 AM',
      },
    ],
  },
  {
    id: 'emi-reminder',
    name: 'EMI Payment Reminder',
    category: 'Banking & Lending',
    badge: 'Collections & Triage',
    icon: CreditCard,
    description: 'Polite, compliant payment due date reminders and UPI payment facilitation.',
    summary: 'Handles monthly loan payment alerts with empathetic cadence, regional language support, and real-time payment link dispatch via WhatsApp or SMS.',
    agentSpeechSample: 'Namaste Rahul-ji. Calling from Axis Auto Finance regarding your car loan EMI due on the 5th. Would you like to pay now via Instant UPI?',
    dialogue: [
      {
        sender: 'agent',
        text: 'Namaste Rahul-ji. Calling from Axis Auto Finance regarding your car loan EMI of ₹14,250 due on the 5th. Would you like to pay now via Instant UPI?',
        time: '02:15 PM',
      },
      {
        sender: 'user',
        text: 'Bhaiya, I am traveling right now. Can I pay tomorrow morning around 10 AM?',
        time: '02:16 PM',
      },
      {
        sender: 'agent',
        text: 'Certainly, Rahul-ji. I have updated your note and scheduled an SMS alert with a secure instant UPI payment link for 10:00 AM tomorrow. Have a safe journey.',
        time: '02:16 PM',
      },
      {
        sender: 'user',
        text: 'Great, thanks for the reminder.',
        time: '02:17 PM',
      },
    ],
  },
  {
    id: 'appointment-booking',
    name: 'Appointment Booking',
    category: 'Healthcare & Branch Visits',
    badge: 'Scheduling Concierge',
    icon: Calendar,
    description: 'Schedules, reschedules, and confirms healthcare or branch visits.',
    summary: 'Checks provider availability in real-time, validates patient context, and handles multi-turn appointment rescheduling with zero hold times.',
    agentSpeechSample: 'Hello Ananya, this is Apollo Health desk. Dr. Sharma has open slots this Thursday at 11:30 AM or 3:00 PM. Which works best?',
    dialogue: [
      {
        sender: 'agent',
        text: 'Hello Ananya, calling from Apollo Care desk. Dr. Sharma has slots this Thursday at 11:30 AM or 3:00 PM for your dental review. Which works best?',
        time: '04:40 PM',
      },
      {
        sender: 'user',
        text: 'Thursday at 3:00 PM works much better for me. Can my son also get a checkup at the same time?',
        time: '04:41 PM',
      },
      {
        sender: 'agent',
        text: 'Yes, Dr. Sharma has a back-to-back 3:30 PM slot open. I have confirmed both consultations for 3:00 PM and 3:30 PM this Thursday. SMS confirmation has been sent.',
        time: '04:41 PM',
      },
      {
        sender: 'user',
        text: 'Perfect, see you Thursday.',
        time: '04:42 PM',
      },
    ],
  },
];

interface VoiceAgentsTabProps {
  availableVoices: string[];
}

export const VoiceAgentsTab: React.FC<VoiceAgentsTabProps> = ({ availableVoices }) => {
  const [agents, setAgents] = useState<AgentPreset[]>(DEFAULT_AGENTS);
  const [selectedAgentId, setSelectedAgentId] = useState<string>(DEFAULT_AGENTS[0].id);
  const [sessionState, setSessionState] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle');
  const [micPermission, setMicPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [micErrorMessage, setMicErrorMessage] = useState<string>('');
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const selectedAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];

  // Stop media stream and timers
  const stopSession = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSessionState('idle');
    setElapsedSeconds(0);
  };

  useEffect(() => {
    return () => {
      stopSession();
    };
  }, []);

  // When changing agent, stop session cleanly
  const handleSelectAgent = (agentId: string) => {
    if (sessionState !== 'idle') stopSession();
    setSelectedAgentId(agentId);
  };

  // Start voice interaction
  const handleStartSpeaking = async () => {
    setMicErrorMessage('');

    // If browser supports getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
        setMicPermission('granted');
        setSessionState('listening');
        setElapsedSeconds(0);

        if (timerRef.current !== null) window.clearInterval(timerRef.current);
        timerRef.current = window.setInterval(() => {
          setElapsedSeconds((prev) => prev + 1);
        }, 1000);

        // After 4.5s of speaking, transition to processing and speaking agent response
        setTimeout(() => {
          if (mediaStreamRef.current) {
            setSessionState('processing');
            setTimeout(() => {
              playAgentVoiceResponse(selectedAgent.agentSpeechSample);
            }, 800);
          }
        }, 4500);

      } catch (err: unknown) {
        setMicPermission('denied');
        setSessionState('idle');
        const error = err as Error;
        setMicErrorMessage(
          error.name === 'NotAllowedError'
            ? 'Microphone access denied. You can test agent voice output below.'
            : 'Microphone not detected. Running in illustrative audio demo mode.'
        );
      }
    } else {
      // Browser doesn't support getUserMedia or running in restricted frame
      setMicPermission('denied');
      setMicErrorMessage('Browser microphone capture not available in this environment. Testing agent speech synthesis.');
      playAgentVoiceResponse(selectedAgent.agentSpeechSample);
    }
  };

  // Speak agent dialogue
  const playAgentVoiceResponse = (text: string) => {
    setSessionState('speaking');

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      const preferred =
        voices.find((v) => v.lang === 'en-IN' || v.name.toLowerCase().includes('india')) ||
        voices.find((v) => v.lang.startsWith('en'));

      if (preferred) utterance.voice = preferred;
      utterance.rate = 0.98;

      utterance.onend = () => {
        setSessionState('idle');
        if (timerRef.current !== null) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };

      utterance.onerror = () => {
        setSessionState('idle');
      };

      synth.speak(utterance);
    } else {
      setTimeout(() => {
        setSessionState('idle');
      }, 3500);
    }
  };

  // Handle saving a custom agent from BuildAgentModal
  const handleSaveCustomAgent = (custom: CustomAgent) => {
    const newPreset: AgentPreset = {
      id: custom.id,
      name: custom.name,
      category: custom.category,
      badge: 'Custom Agent',
      icon: Bot,
      description: custom.description,
      summary: custom.description,
      agentSpeechSample: custom.greeting,
      dialogue: custom.dialogue,
    };

    setAgents((prev) => [newPreset, ...prev]);
    setSelectedAgentId(newPreset.id);
  };

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Derive waveform state from voice agent session state
  const waveformState: WaveformState =
    sessionState === 'listening'
      ? 'playing'
      : sessionState === 'processing'
      ? 'processing'
      : sessionState === 'speaking'
      ? 'playing'
      : 'idle';

  return (
    <div className="space-y-6">
      
      {/* 3-Column Desktop Grid / Stacked Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* ── LEFT PANEL: Choose an Agent (4 cols) ── */}
        <div className="lg:col-span-4 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Select Agent
              </span>
              <span className="text-[11px] font-semibold text-emiqen-blue bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                {agents.length} Available
              </span>
            </div>

            <div className="space-y-2.5">
              {agents.map((agent) => {
                const Icon = agent.icon;
                const isSelected = agent.id === selectedAgent.id;

                return (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => handleSelectAgent(agent.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emiqen-blue ${
                      isSelected
                        ? 'bg-blue-50/70 border-emiqen-blue/70 shadow-sm ring-1 ring-emiqen-blue/30'
                        : 'bg-white hover:bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-emiqen-blue text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-xs font-bold truncate ${isSelected ? 'text-emiqen-navy' : 'text-slate-800'}`}>
                          {agent.name}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded shrink-0">
                          {agent.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                        {agent.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Architecture Note */}
          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-emiqen-blue shrink-0 mt-0.5" />
            <span>
              EMIQEN voice agents combine Indian-accented speech recognition with sub-650ms task execution.
            </span>
          </div>
        </div>

        {/* ── CENTER PANEL: Voice Interaction (4 cols) ── */}
        <div className="lg:col-span-4 bg-gradient-to-b from-white via-white to-blue-50/30 backdrop-blur-md rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col items-center justify-between text-center relative overflow-hidden">
          
          {/* Header Info */}
          <div className="space-y-1 w-full">
            <span className="text-[10px] font-bold text-emiqen-blue uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100/80 inline-block">
              {selectedAgent.category}
            </span>
            <h3 className="text-lg font-extrabold text-emiqen-navy">
              {selectedAgent.name}
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto line-clamp-2">
              {selectedAgent.summary}
            </p>
          </div>

          {/* Glowing Animated Circular Voice Indicator */}
          <div className="my-8 relative flex items-center justify-center">
            {/* Ambient Pulsing Glow Rings */}
            <div
              className={`absolute w-44 h-44 rounded-full transition-all duration-700 pointer-events-none ${
                sessionState === 'listening'
                  ? 'bg-gradient-to-r from-emiqen-blue/25 via-emiqen-cyan/25 to-emiqen-violet/25 animate-ping opacity-60'
                  : sessionState === 'speaking'
                  ? 'bg-gradient-to-r from-emiqen-cyan/30 to-emiqen-blue/30 blur-xl opacity-70 animate-pulse'
                  : 'bg-emiqen-blue/8 blur-xl'
              }`}
            />

            <div
              className={`absolute w-36 h-36 rounded-full transition-all duration-500 ${
                sessionState === 'listening'
                  ? 'border-2 border-dashed border-emiqen-blue animate-spin duration-1000'
                  : sessionState === 'speaking'
                  ? 'border-2 border-emiqen-cyan animate-pulse'
                  : 'border border-slate-200'
              }`}
            />

            {/* Core Voice Circle */}
            <div
              className={`w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-elevated z-10 ${
                sessionState === 'listening'
                  ? 'bg-gradient-to-br from-emiqen-blue to-emiqen-navy text-white ring-4 ring-emiqen-cyan/40 scale-105'
                  : sessionState === 'speaking'
                  ? 'bg-gradient-to-br from-emiqen-cyan to-emiqen-blue text-white ring-4 ring-emiqen-blue/40 scale-105'
                  : sessionState === 'processing'
                  ? 'bg-slate-800 text-emiqen-cyan ring-4 ring-slate-300'
                  : 'bg-white text-emiqen-navy border border-slate-200 hover:border-emiqen-blue/50'
              }`}
            >
              {sessionState === 'listening' ? (
                <>
                  <Mic className="w-8 h-8 animate-pulse text-emiqen-cyan mb-1" />
                  <span className="text-[10px] font-bold font-mono tracking-wider">
                    {formatTimer(elapsedSeconds)}
                  </span>
                </>
              ) : sessionState === 'speaking' ? (
                <>
                  <Volume2 className="w-8 h-8 animate-bounce text-white mb-1" />
                  <span className="text-[10px] font-bold tracking-wider">Speaking</span>
                </>
              ) : sessionState === 'processing' ? (
                <>
                  <div className="w-6 h-6 border-2 border-emiqen-cyan border-t-transparent rounded-full animate-spin mb-1" />
                  <span className="text-[9px] font-bold">Processing</span>
                </>
              ) : (
                <>
                  <Mic className="w-8 h-8 text-emiqen-blue mb-1" />
                  <span className="text-[10px] font-semibold text-slate-500">Tap to Talk</span>
                </>
              )}
            </div>
          </div>

          {/* Integrated Waveform Visualizer */}
          <div className="flex flex-col items-center space-y-2 mb-4">
            <div className="h-7 px-3 py-1 rounded-full bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center">
              <WaveformVisualizer
                state={waveformState}
                barCount={8}
                size="md"
                colorVariant="brand"
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-600">
              {sessionState === 'listening'
                ? 'Listening to microphone...'
                : sessionState === 'processing'
                ? 'Understanding customer context...'
                : sessionState === 'speaking'
                ? 'Synthesizing voice response...'
                : 'Microphone Idle · Ready'}
            </span>
            <span className="text-[10px] text-slate-400">
              {micPermission === 'granted'
                ? '● Mic Access Granted'
                : micPermission === 'denied'
                ? '● Mic Access Denied'
                : '● Permission Requested On Click'}
            </span>
          </div>

          {/* Action Controls */}
          <div className="w-full space-y-2">
            {sessionState === 'idle' ? (
              <button
                type="button"
                onClick={handleStartSpeaking}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-emiqen-blue hover:bg-emiqen-blue-hover active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emiqen-blue"
              >
                <Mic className="w-4 h-4" />
                <span>Start Speaking</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={stopSession}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>End Voice Session</span>
              </button>
            )}

            {/* Error / Permission Notice */}
            {micErrorMessage && (
              <div className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 p-2 rounded-lg flex items-start gap-1.5 text-left">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{micErrorMessage}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT PANEL: Illustrative Transcript (4 cols) ── */}
        <div className="lg:col-span-4 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Live Conversation Log
              </span>
              <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                Illustrative Dialogue
              </span>
            </div>

            {/* Chat Bubble Thread */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {selectedAgent.dialogue.map((turn, idx) => {
                const isAgent = turn.sender === 'agent';
                return (
                  <div
                    key={idx}
                    className={`flex flex-col ${isAgent ? 'items-start' : 'items-end'}`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-0.5">
                      <span>{isAgent ? selectedAgent.name : 'Customer'}</span>
                      <span>·</span>
                      <span>{turn.time}</span>
                    </div>
                    <div
                      className={`max-w-[90%] p-3 rounded-2xl text-xs leading-relaxed ${
                        isAgent
                          ? 'bg-blue-50/80 text-slate-800 border border-blue-100/90 rounded-tl-sm'
                          : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-tr-sm'
                      }`}
                    >
                      {turn.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Build Your Own Agent CTA */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-emiqen-navy bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emiqen-blue"
            >
              <Plus className="w-3.5 h-3.5 text-emiqen-blue" />
              <span>Build Your Own Agent</span>
            </button>
            <p className="text-[10px] text-slate-400 text-center">
              Create and preview customized workflows for your enterprise use case
            </p>
          </div>
        </div>
      </div>

      {/* Build Your Own Agent Modal */}
      <BuildAgentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCustomAgent}
        availableVoices={availableVoices}
      />
    </div>
  );
};
