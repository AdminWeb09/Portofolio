import React, { useState, useEffect } from 'react';
import { Menu, X, Code, ArrowUpRight, ShieldCheck, Lock } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { AdminLoginModal } from './AdminLoginModal';
import { AdminPanel } from './AdminPanel';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const { personalInfo, isAdminLoggedIn } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Pengalaman', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section active detection
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const elem = document.getElementById(targetId);
    if (elem) {
      const offsetTop = elem.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      setAdminPanelOpen(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md border-b border-slate-200/60 dark:border-slate-800/60 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="group flex items-center gap-2.5 font-bold text-lg sm:text-xl text-slate-900 dark:text-white transition-opacity"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Code className="w-5 h-5" />
            </div>
            <span className="tracking-tight font-extrabold text-slate-900 dark:text-white">
              {personalInfo.name ? personalInfo.name.split(' ')[0].toLowerCase() : 'arsenio'}
              <span className="text-indigo-600 dark:text-indigo-400">.dev</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-200/50 dark:bg-slate-800/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-300/40 dark:border-slate-700/40">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-white dark:bg-slate-900 rounded-full shadow-xs border border-slate-200/80 dark:border-slate-700/80 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right CTA Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleAdminClick}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all border ${
                isAdminLoggedIn
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title={isAdminLoggedIn ? 'Buka Panel Edit Admin' : 'Login Admin untuk Edit Beranda'}
            >
              {isAdminLoggedIn ? <ShieldCheck className="w-4 h-4 text-emerald-500" /> : <Lock className="w-4 h-4 text-slate-500" />}
              <span>{isAdminLoggedIn ? 'Panel Admin' : 'Edit Web'}</span>
            </button>

            <ThemeToggle />
            
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Resume / CV</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleAdminClick}
              className={`p-2 rounded-xl border text-xs flex items-center gap-1 font-medium ${
                isAdminLoggedIn
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                  : 'bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-300/50 dark:border-slate-700/50'
              }`}
            >
              {isAdminLoggedIn ? <ShieldCheck className="w-4 h-4 text-emerald-500" /> : <Lock className="w-4 h-4" />}
            </button>

            <ThemeToggle />
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className="p-2.5 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-300/50 dark:border-slate-700/50"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 shadow-xl"
            >
              <div className="flex flex-col gap-2 pt-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between transition-colors ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
                    </a>
                  );
                })}

                <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleAdminClick();
                    }}
                    className="w-full py-3 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold text-center flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isAdminLoggedIn ? 'Buka Panel Admin Edit' : 'Login Admin (Edit Beranda)'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenResume();
                    }}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-center flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20"
                  >
                    <span>Lihat Resume / CV Lengkap</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Admin Login Modal & Admin Panel Component */}
      <AdminLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={() => {
          setLoginModalOpen(false);
          setAdminPanelOpen(true);
        }}
      />

      <AdminPanel
        isOpen={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
      />
    </>
  );
};

