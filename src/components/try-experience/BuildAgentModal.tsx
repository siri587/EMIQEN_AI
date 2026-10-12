import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle, Bot, Shield } from 'lucide-react';

export interface CustomAgent {
  id: string;
  name: string;
  category: string;
  description: string;
  greeting: string;
  voiceName: string;
  language: string;
  dialogue: Array<{ sender: 'agent' | 'user'; text: string; time: string }>;
}

interface BuildAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (agent: CustomAgent) => void;
  availableVoices: string[];
}

export const BuildAgentModal: React.FC<BuildAgentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  availableVoices,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('E-Commerce & Support');
  const [greeting, setGreeting] = useState('');
  const [language, setLanguage] = useState('Indian English');
  const [voiceName, setVoiceName] = useState(availableVoices[0] || 'Aarav');
  const [instructions, setInstructions] = useState('');
  const [errors, setErrors] = useState<{ name?: string; greeting?: string }>({});
  const [isSaving, setIsSaving] = useState(false);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { name?: string; greeting?: string } = {};
    if (!name.trim()) newErrors.name = 'Agent name is required';
    if (!greeting.trim()) {
      newErrors.greeting = 'Opening greeting message is required';
    } else if (greeting.trim().length < 10) {
      newErrors.greeting = 'Greeting should be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSaving) return;

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      const newAgent: CustomAgent = {
        id: `custom-${Date.now()}`,
        name: name.trim(),
        category,
        description: `Custom ${category} agent built with ${language} context and ${voiceName}'s voice persona.`,
        greeting: greeting.trim(),
        voiceName,
        language,
        dialogue: [
          {
            sender: 'agent',
            text: greeting.trim(),
            time: '10:00 AM',
          },
          {
            sender: 'user',
            text: 'Hello, could you help me with my account details?',
            time: '10:01 AM',
          },
          {
            sender: 'agent',
            text: `Certainly! I am ${name.trim()}, designed to assist you with ${category.toLowerCase()}. Please share your registered contact number.`,
            time: '10:01 AM',
          },
        ],
      };

      onSave(newAgent);
      onClose();
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emiqen-blue/10 border border-emiqen-blue/20 flex items-center justify-center text-emiqen-blue">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 id="modal-title" className="text-base font-bold text-emiqen-navy">
                Build Your Own Agent
              </h3>
              <p className="text-xs text-slate-500">
                Configure role, voice persona, and opening greeting
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emiqen-blue"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleFormSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          
          {/* Agent Name */}
          <div className="space-y-1">
            <label htmlFor="agent-name" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Agent Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="agent-name"
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors(prev => ({ ...prev, name: undefined })); }}
              placeholder="e.g. Flight Support Concierge, Loan Advisor"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emiqen-blue/30 ${
                errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 focus:border-emiqen-blue'
              }`}
            />
            {errors.name && (
              <p className="text-xs text-rose-600 flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Domain Category & Language */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="agent-category" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Domain / Purpose
              </label>
              <select
                id="agent-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emiqen-blue focus:ring-2 focus:ring-emiqen-blue/30 bg-white"
              >
                <option value="E-Commerce & Support">E-Commerce & Support</option>
                <option value="Banking & EMI Triage">Banking & EMI Triage</option>
                <option value="Healthcare & Appointments">Healthcare & Appointments</option>
                <option value="Logistics & Dispatch">Logistics & Dispatch</option>
                <option value="HR & Employee Desk">HR & Employee Desk</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="agent-lang" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Primary Language
              </label>
              <select
                id="agent-lang"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emiqen-blue focus:ring-2 focus:ring-emiqen-blue/30 bg-white"
              >
                <option value="Indian English">Indian English (Hinglish)</option>
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="Tamil">Tamil (தமிழ்)</option>
                <option value="Telugu">Telugu (తెలుగు)</option>
                <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                <option value="Bengali">Bengali (বাংলা)</option>
              </select>
            </div>
          </div>

          {/* Voice Persona Selection */}
          <div className="space-y-1">
            <label htmlFor="agent-voice" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Voice Persona
            </label>
            <div className="relative">
              <select
                id="agent-voice"
                value={voiceName}
                onChange={(e) => setVoiceName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emiqen-blue focus:ring-2 focus:ring-emiqen-blue/30 bg-white"
              >
                {availableVoices.map((v) => (
                  <option key={v} value={v}>
                    {v} (Neural Indic Voice)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Opening Greeting */}
          <div className="space-y-1">
            <label htmlFor="agent-greeting" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Opening Greeting <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="agent-greeting"
              rows={3}
              value={greeting}
              onChange={(e) => { setGreeting(e.target.value); setErrors(prev => ({ ...prev, greeting: undefined })); }}
              placeholder="e.g. Namaste! This is your flight booking assistant. How may I help you today?"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emiqen-blue/30 ${
                errors.greeting ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 focus:border-emiqen-blue'
              }`}
            />
            {errors.greeting && (
              <p className="text-xs text-rose-600 flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.greeting}</span>
              </p>
            )}
          </div>

          {/* Optional System Instructions */}
          <div className="space-y-1">
            <label htmlFor="agent-instructions" className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              System Directives / Tone (Optional)
            </label>
            <input
              id="agent-instructions"
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Maintain a calm, empathetic tone. Escalate unresolved disputes to senior manager."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emiqen-blue focus:ring-2 focus:ring-emiqen-blue/30"
            />
          </div>

          {/* Responsible Notice */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 flex items-start gap-2">
            <Shield className="w-4 h-4 text-emiqen-blue shrink-0 mt-0.5" />
            <p>
              Agents configured here are added to your interactive playground preview session. Live production deployment to telephony SIP trunks or custom webhook servers requires enterprise backend integration.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 text-xs font-semibold text-white bg-emiqen-blue hover:bg-emiqen-blue-hover rounded-xl shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emiqen-blue flex items-center gap-1.5"
            >
              {isSaving ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Configuring Agent...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Save to Playground</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
