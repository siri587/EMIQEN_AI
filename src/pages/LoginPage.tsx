import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../components/BrandLogo';
import { signIn, IS_AUTH_CONFIGURED } from '../services/auth';
import { Eye, EyeOff, ArrowLeft, Loader2, AlertCircle, Mail, Lock, CheckCircle2, Info } from 'lucide-react';

interface FormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

type SubmitStatus = 'idle' | 'loading' | 'requires-config' | 'success' | 'error';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!form.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || status === 'loading') return;

    setStatus('loading');
    setErrors({});

    const result = await signIn({ email: form.email, password: form.password, rememberMe: form.rememberMe });

    if (result.requiresConfiguration) {
      setStatus('requires-config');
      return;
    }

    if (result.error) {
      setErrors({ general: result.error });
      setStatus('error');
      return;
    }

    if (result.user) {
      setStatus('success');
      setTimeout(() => navigate('/dashboard'), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emiqen-soft-bg via-white to-slate-50 flex flex-col font-sans">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-5">
        <Link to="/" className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emiqen-blue rounded-lg">
          <BrandLogo variant="full" iconSize={32} />
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-emiqen-navy transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to website
        </Link>
      </div>

      {/* Background decorative blobs */}
      <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-emiqen-blue/8 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-emiqen-violet/8 blur-3xl" />
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-emiqen-cyan/6 blur-3xl" />
      </div>

      {/* Card */}
      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Card Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-emiqen-navy tracking-tight">
              Welcome back
            </h1>
            <p className="mt-2 text-slate-600 text-base">
              Sign in to continue to EMIQEN.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-elevated border border-emiqen-soft-border/80 overflow-hidden">
            {/* Gradient accent top bar */}
            <div className="h-1 bg-gradient-to-r from-emiqen-blue via-emiqen-cyan to-emiqen-violet" />

            <div className="p-7 sm:p-8">

              {/* Requires Configuration Notice */}
              {status === 'requires-config' && (
                <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 flex items-start gap-3">
                  <Info className="w-5 h-5 text-emiqen-blue shrink-0 mt-0.5" />
                  <div className="text-sm space-y-1">
                    <p className="font-semibold text-emiqen-navy">Authentication not yet configured</p>
                    <p className="text-slate-600">
                      Your credentials were validated. To enable real sign-in, connect an authentication
                      provider in <code className="bg-slate-100 text-slate-700 px-1 py-0.5 rounded text-xs">src/services/auth.ts</code>.
                    </p>
                  </div>
                </div>
              )}

              {/* Success Notice */}
              {status === 'success' && (
                <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <p className="text-sm font-semibold text-emerald-800">Signed in successfully. Redirecting…</p>
                </div>
              )}

              {/* General Error */}
              {errors.general && (
                <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <p className="text-sm text-rose-700">{errors.general}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="login-email" className="block text-sm font-semibold text-emiqen-navy">
                    Email address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: undefined }); }}
                      placeholder="you@company.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emiqen-blue/30 ${errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 focus:border-emiqen-blue bg-white'}`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'login-email-error' : undefined}
                    />
                  </div>
                  {errors.email && (
                    <p id="login-email-error" className="text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />{errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="login-password" className="block text-sm font-semibold text-emiqen-navy">
                      Password <span className="text-rose-500">*</span>
                    </label>
                    <Link to="/forgot-password" className="text-xs text-emiqen-blue hover:text-emiqen-blue-hover font-medium">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={form.password}
                      onChange={(e) => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: undefined }); }}
                      placeholder="Enter your password"
                      className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emiqen-blue/30 ${errors.password ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 focus:border-emiqen-blue bg-white'}`}
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? 'login-password-error' : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 rounded focus-visible:ring-2 focus-visible:ring-emiqen-blue"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p id="login-password-error" className="text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />{errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-2.5">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={form.rememberMe}
                    onChange={(e) => setForm({ ...form, rememberMe: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-300 text-emiqen-blue focus:ring-emiqen-blue accent-emiqen-blue"
                  />
                  <label htmlFor="remember-me" className="text-sm text-slate-600 select-none">
                    Remember me on this device
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-emiqen-blue hover:bg-emiqen-blue-hover active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-elevated disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /><span>Signing in…</span></>
                  ) : status === 'success' ? (
                    <><CheckCircle2 className="w-4 h-4" /><span>Signed in</span></>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </form>

              {/* Footer links */}
              <div className="mt-6 pt-5 border-t border-slate-100 text-center text-sm text-slate-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-emiqen-blue hover:text-emiqen-blue-hover transition-colors">
                  Create one
                </Link>
              </div>

              {/* Auth not configured badge */}
              {!IS_AUTH_CONFIGURED && (
                <div className="mt-4 text-center">
                  <span className="text-[11px] text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
                    Authentication integration pending configuration
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-8 text-xs text-slate-400 px-4">
        &copy; {new Date().getFullYear()} EMIQEN. Enterprise AI under active development.
      </div>
    </div>
  );
};

