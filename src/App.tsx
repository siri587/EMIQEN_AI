import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Landing page sections
import { SiteHeader } from './components/SiteHeader';
import { HeroSection } from './components/HeroSection';
import { TryExperienceSection } from './components/TryExperienceSection';
import { ChallengeSection } from './components/ChallengeSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { DataAdvantageSection } from './components/DataAdvantageSection';
import { WorkflowSection } from './components/WorkflowSection';
import { UseCasesSection } from './components/UseCasesSection';
import { DifferentiatorsSection } from './components/DifferentiatorsSection';
import { StatusSection } from './components/StatusSection';
import { ContactSection } from './components/ContactSection';
import { SiteFooter } from './components/SiteFooter';

// Auth pages & Dedicated Playground
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { DashboardPage } from './pages/DashboardPage';
import { PlaygroundPage } from './pages/PlaygroundPage';

/** Full landing page */
const LandingPage: React.FC = () => (
  <div className="min-h-screen bg-transparent text-emiqen-navy flex flex-col font-sans selection:bg-emiqen-cyan/30 selection:text-emiqen-navy relative">
    {/* Global Persistent AI Background (Grid, Mesh, and Vivid Cosmic Auras) */}
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Base Subtle Color Mesh */}
      <div className="absolute inset-0 bg-subtle-mesh" />

      {/* High-Definition AI Coordinate Grid */}
      <div 
        className="absolute inset-0 bg-ai-grid opacity-90"
        style={{
          maskImage: 'radial-gradient(ellipse 90% 85% at 50% 25%, #000 35%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at 50% 25%, #000 35%, transparent 100%)',
        }}
      />

      {/* Top Hero Super-Aura Mesh */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[750px] bg-aura-mesh blur-2xl opacity-95" />

      {/* Mid-Page Cyan Glow Aura (Right) */}
      <div className="absolute top-[38%] -right-32 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-emiqen-cyan/25 to-transparent blur-[110px]" />

      {/* Mid-Page Violet Glow Aura (Left) */}
      <div className="absolute top-[68%] -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-emiqen-violet/20 via-emiqen-blue/15 to-transparent blur-[120px]" />
    </div>
    
    <SiteHeader />
    <main id="main-content" className="flex-grow relative z-10">
      <HeroSection />
      {/* Interactive Try Experience / Playground */}
      <TryExperienceSection id="playground" />
      <ChallengeSection />
      <CapabilitiesSection />
      {/* Data Advantage section is placed after capabilities and before How It Works */}
      <DataAdvantageSection />
      <WorkflowSection />
      <UseCasesSection />
      <DifferentiatorsSection />
      <StatusSection />
      <ContactSection />
    </main>
    <SiteFooter />
  </div>
);

/** Root app with client-side router */
export const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/playground" element={<PlaygroundPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
