import React, { useState } from 'react';
import { X, Code2, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';

interface ApiIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: 'tts' | 'stt' | 'agents';
}

export const ApiIntegrationModal: React.FC<ApiIntegrationModalProps> = ({
  isOpen,
  onClose,
  serviceType,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeLang, setActiveLang] = useState<'python' | 'curl' | 'nodejs'>('python');

  if (!isOpen) return null;

  const titleMap = {
    tts: 'EMIQEN Indic Text-to-Speech API Integration',
    stt: 'EMIQEN Speech-to-Text Live Stream Integration',
    agents: 'EMIQEN Conversational Voice Agent API',
  };

  const codeSnippets = {
    tts: {
      python: `import requests

# EMIQEN Indic TTS API (Enterprise Preview)
url = "https://api.emiqen.ai/v1/audio/speech"
headers = {
    "Authorization": "Bearer YOUR_EMIQEN_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "model": "emiqen-tts-v1",
    "input": "भारत की सुबह का नज़ारा ही कुछ और होता है।",
    "voice": "Aarav",
    "language": "hi-IN",
    "sample_rate": 24000
}

response = requests.post(url, json=payload, headers=headers)
with open("output.wav", "wb") as f:
    f.write(response.content)
print("Synthesized 24kHz audio successfully saved.")`,
      curl: `curl https://api.emiqen.ai/v1/audio/speech \\
  -H "Authorization: Bearer YOUR_EMIQEN_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "emiqen-tts-v1",
    "input": "भारत की सुबह का नज़ारा ही कुछ और होता है।",
    "voice": "Aarav",
    "language": "hi-IN"
  }' \\
  --output speech.wav`,
      nodejs: `import fs from 'fs';

const response = await fetch('https://api.emiqen.ai/v1/audio/speech', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_EMIQEN_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'emiqen-tts-v1',
    input: 'भारत की सुबह का नज़ारा ही कुछ और होता है।',
    voice: 'Aarav',
    language: 'hi-IN'
  })
});

const buffer = Buffer.from(await response.arrayBuffer());
fs.writeFileSync('speech.wav', buffer);`,
    },
    stt: {
      python: `import requests

# EMIQEN Speech-to-Text API
url = "https://api.emiqen.ai/v1/audio/transcriptions"
headers = {"Authorization": "Bearer YOUR_EMIQEN_API_KEY"}
files = {"file": open("customer_voice.wav", "rb")}
data = {
    "model": "emiqen-stt-indic-v1",
    "language": "auto",
    "detect_code_switching": True
}

response = requests.post(url, headers=headers, files=files, data=data)
print("Transcript:", response.json()["text"])`,
      curl: `curl https://api.emiqen.ai/v1/audio/transcriptions \\
  -H "Authorization: Bearer YOUR_EMIQEN_API_KEY" \\
  -F "file=@customer_voice.wav" \\
  -F "model=emiqen-stt-indic-v1" \\
  -F "detect_code_switching=true"`,
      nodejs: `import FormData from 'form-data';
import fs from 'fs';
import fetch from 'node-fetch';

const form = new FormData();
form.append('file', fs.createReadStream('customer_voice.wav'));
form.append('model', 'emiqen-stt-indic-v1');

const res = await fetch('https://api.emiqen.ai/v1/audio/transcriptions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_EMIQEN_API_KEY',
    ...form.getHeaders()
  },
  body: form
});
console.log(await res.json());`,
    },
    agents: {
      python: `import requests

# EMIQEN Telephony Agent Dispatch
url = "https://api.emiqen.ai/v1/agents/dispatch"
headers = {
    "Authorization": "Bearer YOUR_EMIQEN_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "agent_id": "cart-recovery-nudge",
    "destination_phone": "+919876543210",
    "context": {
        "customer_name": "Priya",
        "cart_value": 4500,
        "discount_code": "SPECIAL10"
    }
}

res = requests.post(url, json=payload, headers=headers)
print("Call Session Initiated:", res.json())`,
      curl: `curl https://api.emiqen.ai/v1/agents/dispatch \\
  -H "Authorization: Bearer YOUR_EMIQEN_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"agent_id": "cart-recovery-nudge", "destination_phone": "+919876543210"}'`,
      nodejs: `const res = await fetch('https://api.emiqen.ai/v1/agents/dispatch', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_EMIQEN_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    agent_id: 'cart-recovery-nudge',
    destination_phone: '+919876543210'
  })
});
console.log(await res.json());`,
    },
  };

  const currentSnippet = codeSnippets[serviceType][activeLang];

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleContactClick = () => {
    onClose();
    const el = document.querySelector('#contact');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="api-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emiqen-blue/10 border border-emiqen-blue/20 flex items-center justify-center text-emiqen-blue">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 id="api-modal-title" className="text-base font-bold text-emiqen-navy">
                {titleMap[serviceType]}
              </h3>
              <p className="text-xs text-slate-500">
                Developer integration guide and SDK implementation
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emiqen-blue"
            aria-label="Close integration modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          
          {/* Transparent Status Note */}
          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 text-slate-600 flex items-start gap-2.5 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-emiqen-blue shrink-0 mt-0.5" />
            <div>
              <strong className="text-emiqen-navy block">Enterprise Integration Architecture</strong>
              EMIQEN voice & language models are accessible through standard REST & WebSockets APIs. Enterprise developer API keys and sandbox clusters are provisioned through verified pilot agreements.
            </div>
          </div>

          {/* Language Tabs & Copy Button */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
              {(['python', 'curl', 'nodejs'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setActiveLang(lang)}
                  className={`px-2.5 py-1 rounded-md font-semibold text-xs transition-colors ${
                    activeLang === lang
                      ? 'bg-white text-emiqen-navy shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {lang === 'python' ? 'Python' : lang === 'curl' ? 'cURL' : 'Node.js'}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-slate-200 text-slate-600 hover:text-emiqen-blue hover:bg-slate-50 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Code Window */}
          <div className="rounded-2xl bg-slate-900 text-slate-200 p-4 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
            <pre className="whitespace-pre">{currentSnippet}</pre>
          </div>

          {/* Endpoints & Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-[11px]">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-400 block font-semibold uppercase text-[9px]">Protocol</span>
              <span className="font-bold text-slate-800">HTTPS & WSS</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-400 block font-semibold uppercase text-[9px]">Audio Formats</span>
              <span className="font-bold text-slate-800">PCM 24kHz / MP3 / WAV</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 col-span-2 sm:col-span-1">
              <span className="text-slate-400 block font-semibold uppercase text-[9px]">Average Turn Latency</span>
              <span className="font-bold text-slate-800">&lt; 650ms (Target)</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/70">
          <span className="text-xs text-slate-500">
            Need production credentials or custom domain vocabulary?
          </span>
          <button
            type="button"
            onClick={handleContactClick}
            className="px-4 py-2 text-xs font-semibold text-white bg-emiqen-blue hover:bg-emiqen-blue-hover rounded-xl shadow-xs transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emiqen-blue"
          >
            <span>Request API Key</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
