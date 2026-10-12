import React from 'react';
import { BrandLogo } from './BrandLogo';
import { siteContent } from '../data/siteContent';
import { ArrowUp } from 'lucide-react';

export const SiteFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-emiqen-navy text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info (2 cols on large screen) */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="full" theme="dark" iconSize={36} />

            <p className="text-sm font-medium text-slate-300">
              {siteContent.footer.brandDescriptor}
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {siteContent.footer.legalNote}
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emiqen-cyan bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emiqen-cyan animate-pulse" />
                <span>Development Milestone: Architectural Iteration</span>
              </span>
            </div>
          </div>

          {/* Navigation link columns */}
          {siteContent.footer.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      onClick={(e) => scrollTo(e, link.href)}
                      className="text-xs sm:text-sm text-slate-400 hover:text-emiqen-cyan transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {currentYear} EMIQEN. All rights reserved. Directional enterprise AI concept.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] text-slate-400">
              Indian English & Multimodal Task Intelligence
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

