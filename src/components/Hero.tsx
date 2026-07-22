import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, FolderKanban, Mail, Sparkles, CheckCircle2, FileText, Github, Linkedin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { personalInfo, socialLinks } = usePortfolio();
  const [roleIndex, setRoleIndex] = useState(0);

  const subRoles = personalInfo.roles || ['Full Stack Web Developer', 'UI/UX Designer'];

  useEffect(() => {
    if (subRoles.length === 0) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % subRoles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [subRoles.length]);

  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      const offsetTop = elem.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex flex-col justify-center overflow-hidden">
      {/* Background Decorative Ambient Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/15 to-pink-500/10 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-sky-500/10 dark:bg-sky-500/15 blur-2xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>{personalInfo.status}</span>
            </motion.div>

            {/* Greeting & Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-4">
              Halo, saya <span className="inline-block animate-wave origin-[70%_70%]">👋</span> <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>

            {/* Animated Sub-roles */}
            <div className="h-10 sm:h-12 flex items-center gap-2 mb-6 text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300">
              <Sparkles className="w-6 h-6 text-indigo-500 shrink-0" />
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="text-indigo-600 dark:text-indigo-400"
              >
                {subRoles[roleIndex] || subRoles[0]}
              </motion.span>
            </div>

            {/* Short Tagline Bio */}
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
              {personalInfo.bioShort || personalInfo.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10">
              <button
                onClick={() => scrollTo('projects')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <FolderKanban className="w-4 h-4" />
                <span>Lihat Proyek Saya</span>
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-sm flex items-center justify-center gap-2.5 border border-slate-300/60 dark:border-slate-700/60 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>Hubungi Saya</span>
              </button>

              <button
                onClick={onOpenResume}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-semibold text-sm flex items-center justify-center gap-2 border border-slate-300/40 dark:border-slate-700/40 transition-colors"
              >
                <FileText className="w-4 h-4 text-purple-500" />
                <span>Lihat CV</span>
              </button>
            </div>

            {/* Quick Social Links */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 w-full">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mr-2">
                Temukan Saya:
              </span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:alex.wijaya.dev@example.com"
                className="p-2 rounded-lg bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Visual Image & Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              
              {/* Outer Decorative Glow Rings */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rotate-6 blur-lg opacity-40 animate-pulse" />
              <div className="absolute inset-0 rounded-3xl bg-slate-900/5 dark:bg-slate-800/50 -rotate-3 border border-slate-300/30 dark:border-slate-700/50" />

              {/* Profile Avatar Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/80 dark:border-slate-700 shadow-2xl bg-slate-900">
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />
                
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/20 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Full Stack Web Developer</p>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">React • Next.js • Tailwind • Node.js</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: React Skill Card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -top-4 -left-6 sm:-left-8 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold text-xs">
                  ⚛️
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">React & Next.js</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Expertise Utama</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Experience Metric */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -right-4 sm:-right-8 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-extrabold text-sm shadow-md">
                  4+
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Tahun Pengalaman</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">35+ Proyek Selesai</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>

        {/* Bottom Hero Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-10 border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {personalInfo.stats.map((stat, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-2xl bg-white/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-xs flex flex-col justify-center"
            >
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                {stat.label}
              </p>
              {stat.subtext && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {stat.subtext}
                </p>
              )}
            </div>
          ))}
        </motion.div>

        {/* Down indicator */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => scrollTo('about')}
            aria-label="Scroll Down to About"
            className="p-2.5 rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 animate-bounce transition-colors"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
