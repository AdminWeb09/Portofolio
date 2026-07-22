import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const ExperienceTimeline: React.FC = () => {
  const { experience } = usePortfolio();

  return (
    <section id="experience" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-wider uppercase mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Pengalaman Kerja</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Perjalanan Karir & Rekam Jejak
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Pengalaman dalam industri software house, startup tech, dan proyek independen.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-12">
            {experience.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Badge Dot */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-indigo-500/30 z-10 hidden sm:flex">
                    <Briefcase className="w-4 h-4" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full sm:w-[calc(50%-2.5rem)] ${isEven ? 'sm:text-right' : 'sm:text-left'}`}>
                    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-shadow">
                      
                      {/* Period Pill */}
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold text-xs mb-3 ${isEven ? 'sm:flex-row-reverse' : ''}`}>
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.period}</span>
                        {item.type && <span className="text-slate-400 dark:text-slate-600">• {item.type}</span>}
                      </div>

                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                        {item.role}
                      </h3>
                      
                      <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                        {item.company}
                      </p>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1 justify-start sm:justify-start">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.location}</span>
                      </p>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Achievements Bullet List */}
                      {item.achievements && item.achievements.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-left">
                          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                            Pencapaian Utama:
                          </p>
                          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                            {item.achievements.map((ach, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tech Stack Pills */}
                      {item.skills && item.skills.length > 0 && (
                        <div className={`flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 ${isEven ? 'sm:justify-end' : 'sm:justify-start'}`}>
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
