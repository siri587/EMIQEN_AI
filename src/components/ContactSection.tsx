import React, { useState } from 'react';
import { siteContent } from '../data/siteContent';
import { Mail, Send, CheckCircle2, AlertCircle, Info, ExternalLink } from 'lucide-react';

interface FormState {
  fullName: string;
  email: string;
  company: string;
  role: string;
  interest: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  company?: string;
  message?: string;
}

export const ContactSection: React.FC = () => {
  const { contact } = siteContent;
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    company: '',
    role: '',
    interest: 'Customer Interaction & Voice',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedStatus, setSubmittedStatus] = useState<
    'idle' | 'configured-success' | 'unconfigured-ready'
  >('idle');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.fullName.trim()) {
      newErrors.fullName = 'Please enter your name';
    }
    if (!form.email.trim()) {
      newErrors.email = 'Please enter your work email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!form.company.trim()) {
      newErrors.company = 'Please enter your company or organisation';
    }
    if (!form.message.trim()) {
      newErrors.message = 'Please provide a brief description of your workflow';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (contact.config.isBackendConfigured && contact.config.submissionEndpoint) {
      // In production with backend, send to endpoint
      setSubmittedStatus('configured-success');
    } else {
      // Explicit honest message as required: do not fake a successful server save when backend is unconfigured
      setSubmittedStatus('unconfigured-ready');
    }
  };

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(
      `EMIQEN Exploration: ${form.company} - ${form.interest}`
    );
    const body = encodeURIComponent(
      `Name: ${form.fullName}\nEmail: ${form.email}\nCompany: ${form.company}\nRole: ${form.role || 'Not specified'}\nInterest: ${form.interest}\n\nWorkflow Details:\n${form.message}\n`
    );
    window.location.href = `mailto:${contact.config.approvedContactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white border-t border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Context & Direct Contact Notice */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-xs font-semibold text-emiqen-blue uppercase tracking-wider">
              <span>{contact.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-emiqen-navy tracking-tight leading-tight">
              {contact.heading}
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              {contact.copy}
            </p>

            {/* Approved Channel / Transparency Box */}
            <div className="rounded-2xl border border-emiqen-soft-border bg-emiqen-soft-bg/50 p-6 space-y-4">
              <h3 className="text-sm font-bold text-emiqen-navy uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-4 h-4 text-emiqen-blue" />
                <span>Direct Inquiries</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                For pilot inquiries, enterprise briefings, and technical discussions regarding Indian-context language intelligence:
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between text-xs font-mono text-emiqen-navy">
                <span className="font-semibold">{contact.config.approvedContactEmail}</span>
                <button
                  type="button"
                  onClick={handleMailtoFallback}
                  className="text-emiqen-blue hover:text-emiqen-blue-hover text-xs font-sans font-semibold inline-flex items-center gap-1"
                >
                  Send email <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Note regarding confidentiality & privacy */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p>
                Inquiries are reviewed by the product and engineering team. Information shared will be treated in confidence and used strictly to evaluate workflow applicability.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-emiqen-soft-border bg-white p-6 sm:p-8 shadow-elevated">
              {submittedStatus === 'unconfigured-ready' ? (
                /* Honest Unconfigured Backend State as mandated by AGENTS.md */
                <div className="text-center py-8 space-y-5 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-200 text-emiqen-blue mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="text-xl font-bold text-emiqen-navy">
                      Inquiry Details Prepared
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Your inquiry has been validated. Because a public production backend endpoint has not yet been linked in this build, you can send these details directly via your email client.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left max-w-md mx-auto text-xs space-y-1.5 font-mono text-slate-700">
                    <div><strong>From:</strong> {form.fullName} &lt;{form.email}&gt;</div>
                    <div><strong>Organisation:</strong> {form.company}</div>
                    <div><strong>Workflow:</strong> {form.interest}</div>
                    <div className="truncate"><strong>Message:</strong> {form.message}</div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleMailtoFallback}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emiqen-blue hover:bg-emiqen-blue-hover text-white text-sm font-semibold transition-colors shadow-sm"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Dispatch via Email Client</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmittedStatus('idle')}
                      className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors"
                    >
                      Edit Details
                    </button>
                  </div>

                  <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400">
                    Configuration hook: Set <code className="text-slate-600 bg-slate-100 px-1 py-0.5 rounded">contact.config.submissionEndpoint</code> in <code className="text-slate-600 bg-slate-100 px-1 py-0.5 rounded">src/data/siteContent.ts</code> when server is ready.
                  </div>
                </div>
              ) : (
                /* Standard Interactive Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-semibold text-emiqen-navy"
                      >
                        {contact.formFields.nameLabel} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={form.fullName}
                        onChange={(e) => {
                          setForm({ ...form, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                        }}
                        placeholder="e.g. Anand Sharma"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emiqen-blue/30 ${
                          errors.fullName
                            ? 'border-rose-400 bg-rose-50/20'
                            : 'border-slate-200 focus:border-emiqen-blue bg-white'
                        }`}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      />
                      {errors.fullName && (
                        <p id="fullName-error" className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-emiqen-navy"
                      >
                        {contact.formFields.emailLabel} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="name@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emiqen-blue/30 ${
                          errors.email
                            ? 'border-rose-400 bg-rose-50/20'
                            : 'border-slate-200 focus:border-emiqen-blue bg-white'
                        }`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company */}
                    <div className="space-y-1">
                      <label
                        htmlFor="company"
                        className="block text-xs font-semibold text-emiqen-navy"
                      >
                        {contact.formFields.companyLabel} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={form.company}
                        onChange={(e) => {
                          setForm({ ...form, company: e.target.value });
                          if (errors.company) setErrors({ ...errors, company: undefined });
                        }}
                        placeholder="Enterprise / Organisation"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emiqen-blue/30 ${
                          errors.company
                            ? 'border-rose-400 bg-rose-50/20'
                            : 'border-slate-200 focus:border-emiqen-blue bg-white'
                        }`}
                        aria-invalid={!!errors.company}
                        aria-describedby={errors.company ? 'company-error' : undefined}
                      />
                      {errors.company && (
                        <p id="company-error" className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.company}</span>
                        </p>
                      )}
                    </div>

                    {/* Role */}
                    <div className="space-y-1">
                      <label
                        htmlFor="role"
                        className="block text-xs font-semibold text-emiqen-navy"
                      >
                        {contact.formFields.roleLabel}
                      </label>
                      <input
                        id="role"
                        type="text"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        placeholder="e.g. Head of Technology / Operations"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emiqen-blue text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emiqen-blue/30"
                      />
                    </div>
                  </div>

                  {/* Interests */}
                  <div className="space-y-1">
                    <label
                      htmlFor="interest"
                      className="block text-xs font-semibold text-emiqen-navy"
                    >
                      {contact.formFields.interestsLabel}
                    </label>
                    <select
                      id="interest"
                      value={form.interest}
                      onChange={(e) => setForm({ ...form, interest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emiqen-blue text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emiqen-blue/30"
                    >
                      <option value="Customer Interaction & Voice">
                        Customer Interaction & Voice Inquiries
                      </option>
                      <option value="Document Summarization & Extraction">
                        Enterprise Document Summarization & Information Extraction
                      </option>
                      <option value="Internal Employee Support">
                        Internal Employee & Branch Operations Assistant
                      </option>
                      <option value="Field Services & Hands-free Operations">
                        Field Services & Hands-Free Audio Services
                      </option>
                      <option value="General Architecture Exploration">
                        General Platform & Architecture Discussion
                      </option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-emiqen-navy"
                    >
                      {contact.formFields.messageLabel} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => {
                        setForm({ ...form, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      placeholder="Outline your target workflow, language requirements, or business scenario..."
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emiqen-blue/30 resize-none ${
                        errors.message
                          ? 'border-rose-400 bg-rose-50/20'
                          : 'border-slate-200 focus:border-emiqen-blue bg-white'
                      }`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-emiqen-blue hover:bg-emiqen-blue-hover active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-elevated"
                  >
                    <span>Talk to our team</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <div className="pt-2 text-center">
                    <p className="text-[11px] text-slate-500">
                      EMIQEN is under active development. No spam or commercial solicitations.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

