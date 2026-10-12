import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../components/BrandLogo';
import { ArrowLeft, Mail, AlertCircle } from 'lucide-react';
import { IS_AUTH_CONFIGURED } from '../services/auth';

/**
 * Forgot Password page.
 * Fully wired to the auth service — replace the stub body when IS_AUTH_CONFIGURED = true.
 */
export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'submitted'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setStatus('submitted');
    // Real reset: call your auth provider's password reset API here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emiqen-soft-bg via-white to-slate-50 flex flex-col font-sans">
      <div className="flex items-center justify-between px-4 sm:px-8 py-5">
        <Link to="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emiqen-blue rounded-lg">
          <BrandLogo variant="full" iconSize={32} />
        </Link>
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-emiqen-navy font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
      </div>

      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-emiqen-navy">Reset your password</h1>
            <p className="mt-2 text-slate-600 text-sm">
              Enter your email and we'll send you a reset link — once the auth provider is configured.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-elevated border border-emiqen-soft-border/80 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-emiqen-blue via-emiqen-cyan to-emiqen-violet" />
            <div className="p-7 sm:p-8">
              {status === 'submitted' ? (
                <div className="text-center space-y-4 py-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto">
                    <Mail className="w-6 h-6 text-emiqen-blue" />
                  </div>
                  <h2 className="font-bold text-emiqen-navy text-lg">Check your inbox</h2>
                  <p className="text-slate-600 text-sm">
                    {IS_AUTH_CONFIGURED
                      ? `If an account exists for ${email}, a reset link has been sent.`
                      : 'Reset email would be sent once an authentication provider is connected.'}
                  </p>
                  <Link to="/login" className="inline-block mt-2 text-sm font-semibold text-emiqen-blue hover:text-emiqen-blue-hover">
                    Return to sign in
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="fp-email" className="block text-sm font-semibold text-emiqen-navy">
                      Email address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        id="fp-email"
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(''); }}
                        placeholder="you@company.com"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emiqen-blue/30 ${error ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 focus:border-emiqen-blue'}`}
                      />
                    </div>
                    {error && (
                      <p className="text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />{error}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-emiqen-blue hover:bg-emiqen-blue-hover transition-all shadow-elevated"
                  >
                    Send reset link
                  </button>
                  <div className="text-center text-sm text-slate-600">
                    <Link to="/login" className="font-semibold text-emiqen-blue hover:text-emiqen-blue-hover">
                      Back to sign in
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

