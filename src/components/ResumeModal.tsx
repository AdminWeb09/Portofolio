import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Download, Mail, Phone, MapPin, Briefcase, GraduationCap, Code } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { personalInfo, experience, skills } = usePortfolio();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-10 p-6 sm:p-10"
        >
          {/* Top Actions Bar */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                Curriculum Vitae (CV)
              </span>
            </div>

            <div className="flex items-center gap-2">
              {personalInfo.cvUrl && (
                <a
                  href={personalInfo.cvUrl}
                  download={personalInfo.cvFileName || `${personalInfo.name.replace(/\s+/g, '_')}_CV.pdf`}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh File CV ({personalInfo.cvFileName || 'Dokumen Asli'})</span>
                </a>
              )}
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Cetak / Print</span>
              </button>
              <button
                onClick={onClose}
                aria-label="Close CV Modal"
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Document Sheet */}
          <div className="space-y-8 text-slate-900 dark:text-slate-100">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  {personalInfo.name}
                </h1>
                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                  {personalInfo.role}
                </p>
              </div>

              <div className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{personalInfo.email}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{personalInfo.phone}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-purple-500" />
                  <span>{personalInfo.location}</span>
                </p>
              </div>
            </div>

            {/* Profile Summary */}
            <div>
              <h2 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Ringkasan Profesional
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {personalInfo.bioFull}
              </p>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-500" />
                <span>Pengalaman Kerja</span>
              </h2>

              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800/80">
                    <div className="flex flex-wrap justify-between items-baseline gap-2">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                        {exp.role} — <span className="text-indigo-600 dark:text-indigo-400">{exp.company}</span>
                      </h3>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                      {exp.description}
                    </p>

                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                        {exp.achievements.map((ach, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-indigo-500">•</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Code className="w-4 h-4 text-indigo-500" />
                <span>Keahlian Utama</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s.name}
                    className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-200/60 dark:border-indigo-800/60"
                  >
                    {s.name} ({s.level}%)
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-500" />
                <span>Pendidikan</span>
              </h2>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800/80">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    S1 Teknik Informatika / Ilmu Komputer
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">2017 - 2021</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Universitas Bina Nusantara (BINUS) • IPK 3.82
                </p>
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              Tutup Preview
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
