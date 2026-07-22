import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Award, BookOpen, Heart, CheckCircle2, ArrowRight, Download, Briefcase } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface AboutProps {
  onOpenResume: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResume }) => {
  const { personalInfo } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'bio' | 'background' | 'values'>('bio');

  const highlights = [
    {
      title: "Clean Architecture & Code Quality",
      desc: "Menulis kode TypeScript yang modular, terstruktur, serta scalable untuk jangka panjang."
    },
    {
      title: "UI/UX & User Centric Design",
      desc: "Memastikan visual antarmuka elegan, konsisten, dan dapat diakses dengan mudah oleh semua pengguna."
    },
    {
      title: "Performa & SEO Optimal",
      desc: "Mengoptimalkan bundel JavaScript, kecepatan render, dan prinsip SEO teknis terbaik."
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative bg-slate-100/60 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-wider uppercase mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Tentang Saya</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Mengenal Lebih Dekat Alur Latar Belakang & Passion Saya
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Kombinasi antara logika pemrograman yang kuat dan kepekaan estetika desain antarmuka pengguna.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Profile Card / Photo Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200/80 dark:border-slate-800">
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/30"
                />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{personalInfo.name}</h3>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{personalInfo.role}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">📍 {personalInfo.location}</p>
                </div>
              </div>

              {/* Personal Details List */}
              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Email</span>
                  <a href={`mailto:${personalInfo.email}`} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Spesialisasi</span>
                  <span className="text-slate-900 dark:text-white font-semibold">React, Node.js, UI/UX</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Status Pekerjaan</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Open for Hire</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Bahasa</span>
                  <span className="text-slate-900 dark:text-white font-semibold">Indonesia (Native), English (Professional)</span>
                </div>
              </div>

              {/* Action */}
              <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800">
                <button
                  onClick={onOpenResume}
                  className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-md"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Lihat Riwayat Ringkas (CV)</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Text Column with Interactive Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            {/* Tab Selector */}
            <div className="flex gap-2 p-1 bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl mb-8 max-w-md">
              <button
                onClick={() => setActiveTab('bio')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'bio'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Bio Singkat
              </button>
              <button
                onClick={() => setActiveTab('background')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'background'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Pendidikan & Alur
              </button>
              <button
                onClick={() => setActiveTab('values')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'values'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Prinsip Kerja
              </button>
            </div>

            {/* Tab Content 1: Bio */}
            {activeTab === 'bio' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                  {personalInfo.bioFull}
                </p>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Perjalanan saya diawali dari ketertarikan mendalam terhadap bagaimana sebuah aplikasi web dapat membantu kehidupan sehari-hari orang banyak. Dalam setiap proyek, saya selalu mengombinasikan kreativitas antarmuka visual dengan performa teknis yang solid.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-pink-500" />
                      Minat Utama
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Design Systems, Web Performance Optimization, Micro-interactions, & Cloud Microservices.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      Gaya Kerja
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Komunikatif, mengedepankan kolaborasi tim, dan selalu terbuka terhadap feedback konstruktif.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab Content 2: Background & Education */}
            {activeTab === 'background' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="border-l-2 border-indigo-500 pl-6 space-y-6">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      2017 - 2021
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                      S1 Teknik Informatika / Ilmu Komputer
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Universitas Bina Nusantara (BINUS) • IPK 3.82 / 4.00
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                      Fokus studi pada Rekayasa Perangkat Lunak, Algoritma Pemrograman, dan Human-Computer Interaction (HCI).
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      Sertifikasi Profesional
                    </span>
                    <ul className="mt-2 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Meta Frontend Developer Professional Certificate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>AWS Certified Cloud Practitioner</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Google UX Design Professional Certificate</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab Content 3: Work Values */}
            {activeTab === 'values' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-start gap-4"
                  >
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
};
