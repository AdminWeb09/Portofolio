import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, Github, Linkedin, Instagram, Twitter, MessageSquare } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ContactFormData } from '../types/portfolio';

interface ContactProps {
  onShowToast: (msg: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onShowToast }) => {
  const { personalInfo, socialLinks } = usePortfolio();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: 'Proyek Baru',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const validate = () => {
    const errs: Partial<ContactFormData> = {};
    if (!formData.name.trim()) errs.name = 'Nama lengkap wajib diisi.';
    if (!formData.email.trim()) {
      errs.email = 'Email wajib diisi.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Format email tidak valid.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Pesan tidak boleh kosong.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Pesan minimal 10 karakter.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      onShowToast('Pesan berhasil terkirim! Terima kasih telah menghubungi.');
      setFormData({ name: '', email: '', subject: 'Proyek Baru', message: '' });
      setErrors({});
    }, 1200);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`${label} disalin ke clipboard!`);
  };

  const renderSocialIcon = (iconName: string) => {
    const props = { className: "w-5 h-5" };
    switch (iconName) {
      case 'Github': return <Github {...props} />;
      case 'Linkedin': return <Linkedin {...props} />;
      case 'Instagram': return <Instagram {...props} />;
      case 'Twitter': return <Twitter {...props} />;
      case 'Mail': return <Mail {...props} />;
      default: return <MessageSquare {...props} />;
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-wider uppercase mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Kontak Saya</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Mari Diskusi & Bangun Sesuatu yang Hebat
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Memiliki ide proyek baru, tawaran karir, atau pertanyaan? Kirim pesan sekarang!
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Direct Info & Social Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Informasi Kontak Direct
              </h3>

              {/* Email Item */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                <div className="p-3 rounded-xl bg-indigo-600 text-white shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Email Resmi
                  </p>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-sm font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 truncate block mt-0.5"
                  >
                    {personalInfo.email}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(personalInfo.email, 'Email')}
                  aria-label="Copy Email"
                  className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              {/* Phone / WhatsApp Item */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                <div className="p-3 rounded-xl bg-emerald-600 text-white shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Telepon / WhatsApp
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate mt-0.5">
                    {personalInfo.phone}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(personalInfo.phone, 'Nomor Telepon')}
                  aria-label="Copy Phone"
                  className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              {/* Location Item */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                <div className="p-3 rounded-xl bg-purple-600 text-white shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Domisili
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    {personalInfo.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links Bar */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4">
                Media Sosial & Profil Developer:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-2 border border-slate-200/60 dark:border-slate-700/60 transition-colors"
                  >
                    {renderSocialIcon(s.icon)}
                    <span>{s.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl relative">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                Kirim Pesan Langsung
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-8">
                Isi formulir di bawah ini dan saya akan membalas pesan Anda dalam waktu kurang dari 24 jam.
              </p>

              {isSent ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">Pesan Anda Telah Terkirim!</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    Terima kasih telah menghubungi. Saya telah menerima pesan Anda dan akan segera menghubungi kembali via email.
                  </p>
                  <button
                    onClick={() => setIsSent(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 transition-colors"
                  >
                    Kirim Pesan Lagi
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Misal: Rian Hidayat"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all ${
                          errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                        }`}
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                        Alamat Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="rian@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all ${
                          errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject Select */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Subjek Pesan
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
                    >
                      <option value="Proyek Baru">Diskusi Proyek Baru (Freelance)</option>
                      <option value="Penawaran Kerja">Tawaran Pekerjaan (Full-time / Contract)</option>
                      <option value="Konsultasi UI/UX">Konsultasi UI/UX & Web Dev</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Pesan Anda <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Jelaskan kebutuhan proyek, tenggat waktu, atau pertanyaan Anda..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all resize-none ${
                        errors.message ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                      }`}
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-transform active:scale-[0.99] disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Mengirim Pesan...</span>
                    ) : (
                      <>
                        <span>Kirim Pesan Sekarang</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
