import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  Server,
  Palette,
  Brain,
  Search,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Globe,
  Database,
  Figma,
  GitBranch,
  FileCode2,
  Layout,
  HardDrive,
  Users,
  Clock
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SkillItem } from '../types/portfolio';

// Map icon name string to actual Lucide component
const renderSkillIcon = (iconName?: string) => {
  const iconProps = { className: "w-5 h-5" };
  switch (iconName) {
    case 'Code2': return <Code2 {...iconProps} />;
    case 'FileCode2': return <FileCode2 {...iconProps} />;
    case 'Palette': return <Palette {...iconProps} />;
    case 'Layout': return <Layout {...iconProps} />;
    case 'Zap': return <Zap {...iconProps} />;
    case 'Layers': return <Layers {...iconProps} />;
    case 'Server': return <Server {...iconProps} />;
    case 'Globe': return <Globe {...iconProps} />;
    case 'Database': return <Database {...iconProps} />;
    case 'HardDrive': return <HardDrive {...iconProps} />;
    case 'Figma': return <Figma {...iconProps} />;
    case 'GitBranch': return <GitBranch {...iconProps} />;
    case 'Cpu': return <Cpu {...iconProps} />;
    case 'Sparkles': return <Sparkles {...iconProps} />;
    case 'Brain': return <Brain {...iconProps} />;
    case 'Users': return <Users {...iconProps} />;
    case 'Clock': return <Clock {...iconProps} />;
    default: return <Cpu {...iconProps} />;
  }
};

export const Skills: React.FC = () => {
  const { skills } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['Semua', 'Frontend', 'Backend', 'Database', 'Tools', 'Design'];

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'Semua' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-wider uppercase mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Keahlian & Teknologi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Skill Teknis & Tools yang Saya Kuasai
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Terus memperbarui wawasan teknologi terkini untuk memberikan solusi software terbaik.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari skill (misal: React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
            />
          </div>

        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {renderSkillIcon(skill.icon || skill.iconName)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {skill.name}
                    </h3>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      {skill.category} • {skill.experience || skill.yearsOfExp}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Tidak ada skill yang cocok dengan pencarian "{searchQuery}".
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
