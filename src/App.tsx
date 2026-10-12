import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Landing page sections
import { SiteHeader } from './components/SiteHeader';
import { HeroSection } from './components/HeroSection';
import { ChallengeSection } from './components/ChallengeSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { DataAdvantageSection } from './components/DataAdvantageSection';
import { WorkflowSection } from './components/WorkflowSection';
import { UseCasesSection } from './components/UseCasesSection';
import { DifferentiatorsSection } from './components/DifferentiatorsSection';
import { StatusSection } from './components/StatusSection';
import { ContactSection } from './components/ContactSection';
import { SiteFooter } from './components/SiteFooter';

// Auth pages
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { DashboardPage } from './pages/DashboardPage';

/** Full landing page */
const LandingPage: React.FC = () => (
  <div className="min-h-screen bg-[#FCFDFF] text-emiqen-navy flex flex-col font-sans selection:bg-emiqen-cyan/30 selection:text-emiqen-navy relative overflow-x-hidden">
    {/* Global Ambient Background Grid & Subtle Radial Aura */}
    <div 
      className="fixed inset-0 pointer-events-none -z-10 bg-ai-grid [mask-image:radial-gradient(ellipse_85%_75%_at_50%_15%,#000_20%,transparent_100%)] opacity-75" 
      aria-hidden="true" 
    />
    <div 
      className="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-aura-mesh pointer-events-none -z-10" 
      aria-hidden="true" 
    />
    
    <SiteHeader />
    <main id="main-content" className="flex-grow relative z-10">
      <HeroSection />
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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
