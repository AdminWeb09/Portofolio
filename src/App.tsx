import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <ThemeProvider>
      <PortfolioProvider>
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 relative selection:bg-indigo-500 selection:text-white">
          {/* Navigation Bar */}
          <Navbar onOpenResume={() => setResumeOpen(true)} />

          {/* Main Content Sections */}
          <main id="main-content">
            <Hero onOpenResume={() => setResumeOpen(true)} />
            <About onOpenResume={() => setResumeOpen(true)} />
            <Skills />
            <Projects />
            <ExperienceTimeline />
            <Contact onShowToast={(msg) => setToastMessage(msg)} />
          </main>

          {/* Footer */}
          <Footer />

          {/* Notification Toast */}
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

          {/* Interactive Resume CV Modal */}
          <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
        </div>
      </PortfolioProvider>
    </ThemeProvider>
  );
}
