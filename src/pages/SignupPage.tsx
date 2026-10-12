import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../components/BrandLogo';
import { signUp, IS_AUTH_CONFIGURED } from '../services/auth';
import {
  Eye, EyeOff, ArrowLeft, Loader2, AlertCircle,
  Mail, Lock, User, Building2, CheckCircle2, Info, Check
} from 'lucide-react';

interface FormState {
  fullName: string;
  email: string;
  company: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreedToTerms?: string;
  general?: string;
}

type SubmitStatus = 'idle' | 'loading' | 'requires-config' | 'success' | 'error';

interface PasswordRule {
  label: string;
  test: (p: string) => boolean;
}

const PASSWORD_RULES: PasswordRule[] = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'Uppercase letter (A–Z)', test: (p) => /[A-Z]/.test(p) },
  { label: 'Lowercase letter (a–z)', test: (p) => /[a-z]/.test(p) },
  { label: 'Number (0–9)', test: (p) => /\d/.test(p) },
];

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    fullName: '', email: '', company: '', password: '', confirmPassword: '', agreedToTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const passwordStrength = PASSWORD_RULES.filter((r) => r.test(form.password)).length;

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength] ?? '';
  const strengthColor = [
    '',
    'bg-rose-400',
    'bg-amber-400',
    'bg-yellow-400',
    'bg-emerald-500',
  ][passwordStrength] ?? '';

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.trim()) {
      e.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email address';
    }
    if (!form.password) {
      e.password = 'Password is required';
    } else if (passwordStrength < 3) {
      e.password = 'Password is too weak — meet at least 3 requirements';
    }
    if (!form.confirmPassword) {
      e.confirmPassword = 'Please confirm your password';
    } else if (form.password !== form.confirmPassword) {
      e.confirmPassword = 'Passwords do not match';
    }
    if (!form.agreedToTerms) {
      e.agreedToTerms = 'You must acknowledge the terms to continue';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate() || status === 'loading') return;

    setStatus('loading');
    setErrors({});

    const result = await signUp({
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      company: form.company || undefined,
    });

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
      setTimeout(() => navigate('/dashboard'), 1500);
    }
  };

  const field = <K extends keyof FormState>(key: K) => ({
    value: form[key] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [key]: e.target.value });
      setErrors({ ...errors, [key]: undefined });
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emiqen-soft-bg via-white to-slate-50 flex flex-col font-sans">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-5">
        <Link to="/" className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emiqen-blue rounded-lg">
          <BrandLogo variant="full" iconSize={32} />
        </Link>
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-emiqen-navy transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to website
        </Link>
      </div>

      {/* Background blobs */}
      <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-emiqen-violet/8 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-emiqen-cyan/8 blur-3xl" />
      </div>

      {/* Card */}
      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-emiqen-navy tracking-tight">
              Create your EMIQEN account
            </h1>
            <p className="mt-2 text-slate-600 text-base">
              Get started with voice and text AI.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-elevated border border-emiqen-soft-border/80 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-emiqen-violet via-emiqen-blue to-emiqen-cyan" />

            <div className="p-7 sm:p-8">

              {/* Requires configuration notice */}
              {status === 'requires-config' && (
                <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 flex items-start gap-3">
                  <Info className="w-5 h-5 text-emiqen-blue shrink-0 mt-0.5" />
                  <div className="text-sm space-y-1">
                    <p className="font-semibold text-emiqen-navy">Account creation pending backend setup</p>
                    <p className="text-slate-600">
                      Your details were validated. To enable real account creation, connect an
                      authentication provider in{' '}
                      <code className="bg-slate-100 text-slate-700 px-1 py-0.5 rounded text-xs">
                        src/services/auth.ts
                      </code>.
                    </p>
                  </div>
                </div>
              )}

              {/* Success */}
              {status === 'success' && (
                <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <p className="text-sm font-semibold text-emerald-800">Account created! Redirecting…</p>
                </div>
              )}

              {/* General Error */}
              {errors.general && (
                <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <p className="text-sm text-rose-700">{errors.general}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="su-name" className="block text-sm font-semibold text-emiqen-navy">
                    Full name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      id="su-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Anand Sharma"
                      {...field('fullName')}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emiqen-blue/30 ${errors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 focus:border-emiqen-blue bg-white'}`}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? 'su-name-error' : undefined}
                    />
                  </div>
                  {errors.fullName && (
                    <p id="su-name-error" className="text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />{errors.fullName}
                    </p>
                  )}
                </div>

                {/* Work Email */}
                <div className="space-y-1.5">
                  <label htmlFor="su-email" className="block text-sm font-semibold text-emiqen-navy">
                    Work email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      id="su-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      {...field('email')}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emiqen-blue/30 ${errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 focus:border-emiqen-blue bg-white'}`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'su-email-error' : undefined}
                    />
                  </div>
                  {errors.email && (
                    <p id="su-email-error" className="text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />{errors.email}
                    </p>
                  )}
                </div>

                {/* Company (optional) */}
                <div className="space-y-1.5">
                  <label htmlFor="su-company" className="block text-sm font-semibold text-emiqen-navy">
                    Organisation{' '}
                    <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      id="su-company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Your company or organisation"
                      {...field('company')}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-emiqen-blue text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emiqen-blue/30"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label htmlFor="su-password" className="block text-sm font-semibold text-emiqen-navy">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      id="su-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Create a strong password"
                      {...field('password')}
                      className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emiqen-blue/30 ${errors.password ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 focus:border-emiqen-blue bg-white'}`}
                      aria-invalid={!!errors.password}
                      aria-describedby="su-password-rules"
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

                  {/* Strength Meter */}
                  {form.password && (
                    <div className="space-y-1.5 pt-1" id="su-password-rules">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${strengthColor}`}
                            style={{ width: `${(passwordStrength / 4) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-600">{strengthLabel}</span>
                      </div>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {PASSWORD_RULES.map((rule) => (
                          <li key={rule.label} className={`text-xs flex items-center gap-1.5 ${rule.test(form.password) ? 'text-emerald-700' : 'text-slate-400'}`}>
                            <Check className={`w-3 h-3 shrink-0 ${rule.test(form.password) ? 'text-emerald-600' : 'text-slate-300'}`} />
                            {rule.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {errors.password && (
                    <p className="text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />{errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label htmlFor="su-confirm" className="block text-sm font-semibold text-emiqen-navy">
                    Confirm password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      id="su-confirm"
                      type={showConfirm ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Re-enter your password"
                      value={form.confirmPassword}
                      onChange={(e) => { setForm({ ...form, confirmPassword: e.target.value }); setErrors({ ...errors, confirmPassword: undefined }); }}
                      className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emiqen-blue/30 ${errors.confirmPassword ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 focus:border-emiqen-blue bg-white'}`}
                      aria-invalid={!!errors.confirmPassword}
                      aria-describedby={errors.confirmPassword ? 'su-confirm-error' : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 rounded focus-visible:ring-2 focus-visible:ring-emiqen-blue"
                      aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p id="su-confirm-error" className="text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />{errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms */}
                <div className="space-y-1">
                  <div className="flex items-start gap-2.5">
                    <input
                      id="su-terms"
                      type="checkbox"
                      checked={form.agreedToTerms}
                      onChange={(e) => { setForm({ ...form, agreedToTerms: e.target.checked }); setErrors({ ...errors, agreedToTerms: undefined }); }}
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 accent-emiqen-blue focus:ring-emiqen-blue"
                    />
                    <label htmlFor="su-terms" className="text-sm text-slate-600 select-none">
                      I acknowledge EMIQEN's{' '}
                      <span className="text-slate-400 text-xs italic">
                        (Terms of Service and Privacy Policy will be linked here once approved pages are published)
                      </span>
                    </label>
                  </div>
                  {errors.agreedToTerms && (
                    <p className="text-xs text-rose-600 flex items-center gap-1 pl-6">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />{errors.agreedToTerms}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-emiqen-blue hover:bg-emiqen-blue-hover active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-elevated disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                  {status === 'loading' ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /><span>Creating account…</span></>
                  ) : status === 'success' ? (
                    <><CheckCircle2 className="w-4 h-4" /><span>Account created</span></>
                  ) : (
                    <span>Create Account</span>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-100 text-center text-sm text-slate-600">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-emiqen-blue hover:text-emiqen-blue-hover transition-colors">
                  Sign in
                </Link>
              </div>

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

      <div className="text-center pb-8 text-xs text-slate-400 px-4">
        &copy; {new Date().getFullYear()} EMIQEN. Enterprise AI under active development.
      </div>
    </div>
  );
};

