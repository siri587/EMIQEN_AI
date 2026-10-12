import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { 
  Menu, X, UserCircle2, ChevronDown, 
  Mic, Cpu, FileText, AudioWaveform, Layers, HeartPulse, 
  ArrowUpRight 
} from 'lucide-react';

interface DropdownItem {
  title: string;
  desc: string;
  href: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PRODUCTS: DropdownItem[] = [
  {
    title: 'Voice Agents',
    desc: 'Multilingual conversational voice agents for telephony and app support',
    href: '#platform',
    badge: 'Flagship',
    icon: Mic,
  },
  {
    title: 'EMIQEN-4B',
    desc: '4.0 Billion parameter domain-adapted Small Language Model',
    href: '#platform',
    badge: 'Sovereign',
    icon: Cpu,
  },
  {
    title: 'Doc & Indic Agents',
    desc: 'Document layout parsing, invoice OCR, and table extraction',
    href: '#use-cases',
    icon: FileText,
  },
  {
    title: 'Indic Audio Studio',
    desc: 'Speech-to-text recognition and neural voice synthesis in Indian accents',
    href: '#platform',
    icon: AudioWaveform,
  },
];

const MODELS: DropdownItem[] = [
  {
    title: 'EMIQEN-4B Foundation SLM',
    desc: 'High-throughput domain model for BFSI, IT ops, and enterprise triage',
    href: '#platform',
    badge: '4.0B',
    icon: Layers,
  },
  {
    title: 'EMIQEN-Voice Stack',
    desc: 'Whisper Large-v3 STT combined with Maya-2 Neural Speech Synthesis',
    href: '#platform',
    badge: '< 2.8% WER',
    icon: Mic,
  },
  {
    title: 'EMIQEN-Affect Fusion',
    desc: 'Acoustic pitch jitter and semantic sentiment de-escalation layer',
    href: '#differentiators',
    icon: HeartPulse,
  },
];

export const SiteHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'products' | 'models' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    if (window.location.pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navOffset = 80;
      const offsetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5'
          : 'bg-white/80 backdrop-blur-sm py-3.5 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between" ref={dropdownRef}>
          
          {/* Logo with clearspace */}
          <Link
            to="/"
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emiqen-blue rounded-lg flex-shrink-0"
            aria-label="EMIQEN Home"
          >
            <BrandLogo variant="full" iconSize={36} />
          </Link>

          {/* Desktop Navigation (Sarvam AI style with dropdown menus) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            
            {/* Products Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')}
                onMouseEnter={() => setActiveDropdown('products')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-emiqen-blue ${
                  activeDropdown === 'products'
                    ? 'text-emiqen-blue bg-emiqen-soft-bg'
                    : 'text-slate-700 hover:text-emiqen-blue hover:bg-emiqen-soft-bg/80'
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180 text-emiqen-blue' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'products' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 grid gap-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Enterprise AI Products
                  </div>
                  {PRODUCTS.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-emiqen-soft-bg text-emiqen-blue group-hover:bg-emiqen-blue group-hover:text-white transition-colors flex-shrink-0">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-emiqen-blue transition-colors">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emiqen-cyan/15 text-emiqen-navy border border-emiqen-cyan/30">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Models Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'models' ? null : 'models')}
                onMouseEnter={() => setActiveDropdown('models')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-emiqen-blue ${
                  activeDropdown === 'models'
                    ? 'text-emiqen-blue bg-emiqen-soft-bg'
                    : 'text-slate-700 hover:text-emiqen-blue hover:bg-emiqen-soft-bg/80'
                }`}
              >
                <span>Models</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'models' ? 'rotate-180 text-emiqen-blue' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'models' && (
                <div 
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 grid gap-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Sovereign Foundation Models
                  </div>
                  {MODELS.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-emiqen-soft-bg text-emiqen-blue group-hover:bg-emiqen-blue group-hover:text-white transition-colors flex-shrink-0">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-emiqen-blue transition-colors">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emiqen-blue/10 text-emiqen-blue border border-emiqen-blue/20">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Datasets */}
            <a
              href="#data-advantage"
              onClick={(e) => scrollToSection(e, '#data-advantage')}
              className="px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-emiqen-blue hover:bg-emiqen-soft-bg/80 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-emiqen-blue flex items-center gap-1.5"
            >
              <span>Data Engine</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 border border-amber-500/20">
                Indic
              </span>
            </a>

            {/* Use Cases */}
            <a
              href="#use-cases"
              onClick={(e) => scrollToSection(e, '#use-cases')}
              className="px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-emiqen-blue hover:bg-emiqen-soft-bg/80 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-emiqen-blue"
            >
              Use Cases
            </a>

            {/* How it works */}
            <a
              href="#how-it-works"
              onClick={(e) => scrollToSection(e, '#how-it-works')}
              className="px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-emiqen-blue hover:bg-emiqen-soft-bg/80 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-emiqen-blue"
            >
              How it works
            </a>
          </nav>

          {/* Desktop Right Action Area (Sarvam AI style: Playground + Talk to Sales + Auth) */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            
            {/* Try Playground Button (Sarvam AI signature CTA) */}
            <a
              href="#playground"
              onClick={(e) => scrollToSection(e, '#playground')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-emiqen-navy bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Try Playground</span>
            </a>

            {/* Talk to Team / Contact Button */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="inline-flex items-center gap-1 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-emiqen-blue to-emiqen-navy hover:opacity-95 rounded-xl shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emiqen-blue hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Contact Sales</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <div className="h-5 w-px bg-slate-200" />

            {/* Log In */}
            <Link
              to="/login"
              className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-emiqen-blue hover:bg-slate-100 rounded-lg transition-colors"
            >
              Log In
            </Link>

            {/* Sign Up */}
            <Link
              to="/signup"
              className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-emiqen-blue bg-emiqen-blue/10 hover:bg-emiqen-blue/20 rounded-xl transition-colors"
            >
              <UserCircle2 className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </Link>
          </div>

          {/* Mobile Action Controls */}
          <div className="flex items-center lg:hidden gap-2">
            <a
              href="#playground"
              onClick={(e) => scrollToSection(e, '#playground')}
              className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-emiqen-soft-bg text-emiqen-blue"
            >
              Playground
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-emiqen-navy hover:bg-slate-100 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-emiqen-blue"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 top-[60px] z-40 bg-white/98 backdrop-blur-xl lg:hidden border-t border-slate-200 flex flex-col justify-between p-6 overflow-y-auto"
        >
          <div className="space-y-4">
            
            {/* Products Accordion */}
            <div>
              <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Products & Models
              </div>
              <div className="grid grid-cols-1 gap-1 mt-1">
                {PRODUCTS.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon className="w-4 h-4 text-emiqen-blue" />
                      <span className="text-sm font-semibold text-slate-900">{item.title}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emiqen-cyan/15 text-emiqen-navy">
                        {item.badge}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Other Direct Links */}
            <div>
              <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Platform
              </div>
              <div className="space-y-1 mt-1">
                <a
                  href="#data-advantage"
                  onClick={(e) => scrollToSection(e, '#data-advantage')}
                  className="block px-3 py-2.5 text-sm font-semibold text-slate-800 hover:text-emiqen-blue rounded-lg"
                >
                  Sovereign Indic Data Engine
                </a>
                <a
                  href="#how-it-works"
                  onClick={(e) => scrollToSection(e, '#how-it-works')}
                  className="block px-3 py-2.5 text-sm font-semibold text-slate-800 hover:text-emiqen-blue rounded-lg"
                >
                  How it works
                </a>
                <a
                  href="#use-cases"
                  onClick={(e) => scrollToSection(e, '#use-cases')}
                  className="block px-3 py-2.5 text-sm font-semibold text-slate-800 hover:text-emiqen-blue rounded-lg"
                >
                  Enterprise Use Cases
                </a>
                <a
                  href="#differentiators"
                  onClick={(e) => scrollToSection(e, '#differentiators')}
                  className="block px-3 py-2.5 text-sm font-semibold text-slate-800 hover:text-emiqen-blue rounded-lg"
                >
                  Why EMIQEN
                </a>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-100 space-y-3">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="w-full py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-emiqen-blue to-emiqen-navy text-center text-sm shadow-sm flex items-center justify-center gap-2"
            >
              <span>Contact Sales / Request Demo</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-4 rounded-xl font-semibold text-emiqen-navy bg-slate-100 hover:bg-slate-200 text-center text-sm transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-4 rounded-xl font-semibold text-emiqen-blue bg-emiqen-blue/10 hover:bg-emiqen-blue/20 text-center text-sm transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
