import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../components/BrandLogo';
import { ArrowLeft, Construction } from 'lucide-react';

/**
 * Placeholder Dashboard page.
 * Replace this with real authenticated content once an auth provider is configured.
 * Route is accessible but NOT protected until IS_AUTH_CONFIGURED = true in auth.ts.
 */
export const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-emiqen-soft-bg flex flex-col font-sans">
      <div className="flex items-center justify-between px-4 sm:px-8 py-5 bg-white border-b border-slate-200">
        <Link to="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emiqen-blue rounded-lg">
          <BrandLogo variant="full" iconSize={32} />
        </Link>
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-emiqen-navy font-medium">
          <ArrowLeft className="w-4 h-4" />
          Return to website
        </Link>
      </div>

      <div className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="max-w-md text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-white border border-emiqen-soft-border shadow-elevated flex items-center justify-center mx-auto">
            <Construction className="w-8 h-8 text-emiqen-blue" />
          </div>
          <h1 className="text-2xl font-extrabold text-emiqen-navy">Dashboard — Coming Soon</h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            The authenticated user area is reserved for a future product milestone. Connect an
            authentication provider in{' '}
            <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-xs">
              src/services/auth.ts
            </code>{' '}
            to unlock protected routes and session management.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-full px-4 py-2 w-fit mx-auto">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Authentication integration pending
          </div>
          <div className="flex gap-3 justify-center">
            <Link to="/login" className="px-5 py-2.5 rounded-xl bg-emiqen-blue text-white text-sm font-semibold hover:bg-emiqen-blue-hover transition-colors">
              Sign In
            </Link>
            <Link to="/" className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

