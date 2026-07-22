import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, FileText, ExternalLink, Sparkles, AlertCircle, FileCheck, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { personalInfo, isAdminLoggedIn } = usePortfolio();

  if (!isOpen) return null;

  // Helper to construct Google Drive Embed Preview link
  const getGoogleDriveEmbedUrl = (url?: string) => {
    if (!url || !url.includes('drive.google.com')) return null;
    if (url.includes('/file/d/')) {
      const parts = url.split('/file/d/');
      if (parts[1]) {
        const fileId = parts[1].split('/')[0];
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
    } else if (url.includes('id=')) {
      const match = url.match(/id=([^&]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }
    return null;
  };

  const driveEmbedUrl = getGoogleDriveEmbedUrl(personalInfo.cvUrl);
  const isDataUrl = personalInfo.cvUrl?.startsWith('data:');
  const isImageDataUrl = personalInfo.cvUrl?.startsWith('data:image/');

  const handleOpenDirect = () => {
    if (!personalInfo.cvUrl) return;
    if (personalInfo.cvUrl.startsWith('http')) {
      window.open(personalInfo.cvUrl, '_blank', 'noopener,noreferrer');
    } else {
      const link = document.createElement('a');
      link.href = personalInfo.cvUrl;
      link.download = personalInfo.cvFileName || `${personalInfo.name.replace(/\s+/g, '_')}_CV.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-10 overflow-hidden"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Curriculum Vitae (CV) {personalInfo.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {personalInfo.cvUrl ? 'Dokumen Resmi Pilihan Pemilik Portfolio' : 'File Dokumen Asli'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {personalInfo.cvUrl && (
                <button
                  onClick={handleOpenDirect}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>
                    {personalInfo.cvUrl.includes('drive.google.com')
                      ? 'Buka di Google Drive'
                      : 'Buka / Unduh Dokumen CV'}
                  </span>
                </button>
              )}
              <button
                onClick={onClose}
                aria-label="Tutup Modal CV"
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            {personalInfo.cvUrl ? (
              <div className="space-y-6">
                
                {/* CV File / Banner Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/30 border border-indigo-200/80 dark:border-indigo-800/60 flex flex-col sm:flex-row items-center justify-between gap-5">
                  <div className="flex items-center gap-4 text-center sm:text-left">
                    <div className="p-3.5 rounded-2xl bg-indigo-600 text-white shadow-md shrink-0">
                      <FileCheck className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {personalInfo.cvFileName || (personalInfo.cvUrl.includes('drive.google.com') ? 'Google Drive CV Document' : 'Dokumen CV Terlampir')}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        Dokumen CV resmi ini telah diunggah dan terhubung langsung oleh {personalInfo.name}.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleOpenDirect}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all hover:scale-105 shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>{personalInfo.cvUrl.includes('drive.google.com') ? 'Lihat di Google Drive' : 'Unduh / Buka File CV'}</span>
                  </button>
                </div>

                {/* Embedded Viewer (If Google Drive link or Image) */}
                {driveEmbedUrl ? (
                  <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-slate-950">
                    <iframe
                      src={driveEmbedUrl}
                      title="Google Drive CV Preview"
                      className="w-full h-[550px] sm:h-[650px] border-none"
                      allow="autoplay"
                    />
                  </div>
                ) : isImageDataUrl ? (
                  <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-slate-100 dark:bg-slate-950 p-4 flex justify-center">
                    <img
                      src={personalInfo.cvUrl}
                      alt="Dokumen CV Preview"
                      className="max-h-[650px] w-auto object-contain rounded-lg shadow-sm"
                    />
                  </div>
                ) : (
                  <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <Sparkles className="w-10 h-10 text-indigo-500 mx-auto" />
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      File CV Siap Diunduh
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                      Klik tombol di atas untuk membuka atau mengunduh dokumen CV resmi secara lengkap.
                    </p>
                  </div>
                )}

              </div>
            ) : (
              /* State when no CV is uploaded yet */
              <div className="py-12 text-center max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Belum Ada Dokumen CV Khusus
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Pemilik portfolio belum mengunggah file CV atau memasukkan link Google Drive CV.
                  </p>
                </div>

                {isAdminLoggedIn && (
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Anda masuk sebagai Admin</span>
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                      Silakan unggah file CV Anda atau tempelkan link Google Drive pada <span className="font-bold">Panel Admin &gt; Informasi Pribadi</span>.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              Tutup
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

