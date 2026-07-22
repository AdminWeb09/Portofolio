import React, { useState } from 'react';
import { 
  X, Save, RotateCcw, Plus, Trash2, Edit3, User, Cpu, Briefcase, 
  Layers, MessageSquare, HelpCircle, Lock, LogOut, CheckCircle2, 
  ExternalLink, Sparkles, AlertTriangle, Upload, FileText, Download
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SkillItem, ProjectItem, ExperienceItem, TestimonialItem } from '../types/portfolio';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'personal' | 'skills' | 'projects' | 'experience' | 'testimonials_faq' | 'settings';

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { 
    personalInfo, updatePersonalInfo,
    skills, addSkill, updateSkill, deleteSkill,
    projects, addProject, updateProject, deleteProject,
    experience, addExperience, updateExperience, deleteExperience,
    testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
    faqs, addFaq, updateFaq, deleteFaq,
    logoutAdmin, changeAdminPassword, resetToDefault
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [personalForm, setPersonalForm] = useState(personalInfo);

  // Skill state
  const [editingSkillIdx, setEditingSkillIdx] = useState<number | null>(null);
  const [skillForm, setSkillForm] = useState<SkillItem>({
    name: '', category: 'Frontend', level: 80, experience: '1+ tahun', icon: 'Code'
  });

  // Project state
  const [editingProjId, setEditingProjId] = useState<string | null>(null);
  const [projForm, setProjForm] = useState<ProjectItem>({
    id: '', title: '', description: '', longDescription: '',
    image: '', category: 'Web App', tags: [], featured: false
  });

  // Experience state
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [expForm, setExpForm] = useState<ExperienceItem>({
    id: '', company: '', role: '', period: '', location: '', description: '', achievements: []
  });

  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file foto terlalu besar. Maksimal 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPersonalForm(prev => ({ ...prev, avatarUrl: event.target!.result as string }));
          showToast('Foto profil berhasil diunggah!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file gambar terlalu besar. Maksimal 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProjForm(prev => ({ ...prev, image: event.target!.result as string }));
          showToast('Gambar proyek berhasil diunggah!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Ukuran file CV terlalu besar. Maksimal 10MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPersonalForm(prev => ({
            ...prev,
            cvUrl: event.target!.result as string,
            cvFileName: file.name
          }));
          showToast(`File CV "${file.name}" berhasil diunggah!`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handlers for Personal Info
  const handleSavePersonal = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo(personalForm);
    showToast('Informasi profil berhasil diperbarui!');
  };

  // Skill Handlers
  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSkillIdx !== null) {
      updateSkill(editingSkillIdx, skillForm);
      showToast('Skill berhasil diperbarui!');
    } else {
      addSkill(skillForm);
      showToast('Skill baru berhasil ditambahkan!');
    }
    setEditingSkillIdx(null);
    setSkillForm({ name: '', category: 'Frontend', level: 80, experience: '1+ tahun', icon: 'Code' });
  };

  // Project Handlers
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const projToSave = {
      ...projForm,
      id: projForm.id || `proj-${Date.now()}`
    };

    if (editingProjId) {
      updateProject(editingProjId, projToSave);
      showToast('Proyek berhasil diperbarui!');
    } else {
      addProject(projToSave);
      showToast('Proyek baru berhasil ditambahkan!');
    }
    setEditingProjId(null);
    setProjForm({ id: '', title: '', description: '', longDescription: '', image: '', category: 'Web App', tags: [], featured: false });
  };

  // Experience Handlers
  const handleSaveExperience = (e: React.FormEvent) => {
    e.preventDefault();
    const expToSave = {
      ...expForm,
      id: expForm.id || `exp-${Date.now()}`
    };

    if (editingExpId) {
      updateExperience(editingExpId, expToSave);
      showToast('Pengalaman berhasil diperbarui!');
    } else {
      addExperience(expToSave);
      showToast('Pengalaman baru ditambahkan!');
    }
    setEditingExpId(null);
    setExpForm({ id: '', company: '', role: '', period: '', location: '', description: '', achievements: [] });
  };

  // Settings Handlers
  const handleChangePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      alert('Password minimal 4 karakter!');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Konfirmasi password tidak cocok!');
      return;
    }
    changeAdminPassword(newPassword);
    setNewPassword('');
    setConfirmPassword('');
    showToast('Password admin berhasil diubah!');
  };

  const handleResetData = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan SEMUA data beranda ke tampilan default awal?')) {
      resetToDefault();
      setPersonalForm(personalInfo);
      showToast('Semua data beranda telah dikembalikan ke default!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[92vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Panel Admin Beranda
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-800">
                  Mode Edit Real-time
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Kelola seluruh konten yang tampil di halaman utama web
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logoutAdmin();
                onClose();
              }}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar Admin</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-3 space-y-1 overflow-x-auto md:overflow-y-auto flex md:flex-col shrink-0">
            <button
              onClick={() => setActiveTab('personal')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap md:w-full ${
                activeTab === 'personal'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profil & Hero</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap md:w-full ${
                activeTab === 'skills'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Kelola Skill ({skills.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap md:w-full ${
                activeTab === 'projects'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Proyek ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap md:w-full ${
                activeTab === 'experience'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Pengalaman ({experience.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('testimonials_faq')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap md:w-full ${
                activeTab === 'testimonials_faq'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Testimoni & FAQ</span>
            </button>

            <div className="pt-2 md:mt-auto">
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap md:w-full ${
                  activeTab === 'settings'
                    ? 'bg-slate-800 text-white dark:bg-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Pengaturan Admin</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto bg-slate-50/30 dark:bg-slate-900/20">

            {/* TAB 1: PERSONAL INFO */}
            {activeTab === 'personal' && (
              <form onSubmit={handleSavePersonal} className="max-w-3xl space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Edit Informasi Profil Diri & Hero Section
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Perubahan akan langsung terlihat pada header, bio, dan hero halaman depan.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      value={personalForm.name}
                      onChange={(e) => setPersonalForm({ ...personalForm, name: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Gelar / Jabatan Utama
                    </label>
                    <input
                      type="text"
                      value={personalForm.title}
                      onChange={(e) => setPersonalForm({ ...personalForm, title: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Kontak
                    </label>
                    <input
                      type="email"
                      value={personalForm.email}
                      onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Nomor WhatsApp / HP
                    </label>
                    <input
                      type="text"
                      value={personalForm.phone}
                      onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Lokasi (Kota / Negara)
                    </label>
                    <input
                      type="text"
                      value={personalForm.location}
                      onChange={(e) => setPersonalForm({ ...personalForm, location: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Status Ketersediaan
                    </label>
                    <input
                      type="text"
                      value={personalForm.status}
                      onChange={(e) => setPersonalForm({ ...personalForm, status: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Foto Profil / Avatar
                  </label>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-5">
                    <div className="relative shrink-0">
                      <img
                        src={personalForm.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                        alt="Preview Foto Profil"
                        className="w-20 h-20 rounded-full object-cover ring-4 ring-emerald-500/30 shadow-md"
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-left space-y-2">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        Unggah Foto dari Perangkat (Manual)
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Pilih file gambar langsung dari galeri HP atau komputer Anda.
                      </p>

                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                        <label className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-xs font-semibold cursor-pointer transition-all shadow-sm flex items-center gap-2">
                          <Upload className="w-4 h-4" />
                          <span>Pilih & Unggah File Foto</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarFileChange}
                            className="hidden"
                          />
                        </label>

                        {personalForm.avatarUrl && (
                          <button
                            type="button"
                            onClick={() => setPersonalForm({ ...personalForm, avatarUrl: '' })}
                            className="px-3 py-2.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors border border-rose-200 dark:border-rose-900/50"
                          >
                            Hapus Foto
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Dokumen CV / Resume Saya
                  </label>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                    
                    {/* Status Display */}
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
                      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                          {personalForm.cvFileName 
                            ? personalForm.cvFileName 
                            : personalForm.cvUrl 
                              ? (personalForm.cvUrl.includes('drive.google.com') ? 'Google Drive Link CV' : 'Dokumen CV Terhubung')
                              : 'Belum Ada File / Link CV'}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {personalForm.cvUrl 
                            ? (personalForm.cvUrl.startsWith('data:') ? 'Terunggah sebagai file lokal' : personalForm.cvUrl)
                            : 'Pilih file dari perangkat ATAU gunakan link Google Drive.'}
                        </p>
                      </div>
                      {personalForm.cvUrl && (
                        <div className="flex items-center gap-2">
                          <a
                            href={personalForm.cvUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors text-xs font-semibold flex items-center gap-1"
                            title="Buka / Cek CV"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="hidden sm:inline">Cek Link</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => setPersonalForm({ ...personalForm, cvUrl: '', cvFileName: '' })}
                            className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-xs font-semibold"
                            title="Hapus CV"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Method 1: Upload Manual */}
                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Metode 1: Unggah File dari HP / Komputer
                      </p>
                      <label className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs font-semibold cursor-pointer transition-all shadow-sm">
                        <Upload className="w-4 h-4" />
                        <span>Pilih File CV (PDF / Doc / Gambar)</span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,image/*"
                          onChange={handleCvFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Method 2: Google Drive Link */}
                    <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Metode 2: Tempel Link Google Drive
                        </p>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold">
                          Google Drive
                        </span>
                      </div>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/file/d/1ABC.../view?usp=sharing"
                        value={personalForm.cvUrl?.startsWith('http') ? personalForm.cvUrl : ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPersonalForm({
                            ...personalForm,
                            cvUrl: val,
                            cvFileName: val.includes('drive.google.com') ? 'Google Drive CV Document' : (personalForm.cvFileName || 'Link CV Online')
                          });
                        }}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono"
                      />

                      {/* Google Drive Tip Box */}
                      <div className="p-3 bg-blue-50/80 dark:bg-blue-950/30 rounded-xl border border-blue-200/60 dark:border-blue-900/40 text-[11px] text-blue-900 dark:text-blue-200 space-y-1">
                        <p className="font-bold flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>Cara Mengambil Link Google Drive:</span>
                        </p>
                        <ol className="list-decimal list-inside space-y-0.5 opacity-90 pl-1">
                          <li>Buka file CV Anda di Google Drive.</li>
                          <li>Klik tombol <span className="font-semibold">"Bagikan" (Share)</span> di sudut kanan atas.</li>
                          <li>Ubah Akses Umum menjadi <span className="font-bold underline">"Siapa saja yang memiliki link"</span>.</li>
                          <li>Klik <span className="font-semibold">"Salin Link"</span> lalu tempel pada kolom di atas.</li>
                        </ol>
                      </div>
                    </div>

                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Bio / Deskripsi Ringkas Hero
                  </label>
                  <textarea
                    rows={3}
                    value={personalForm.bio}
                    onChange={(e) => setPersonalForm({ ...personalForm, bio: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Peran Tambahan (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={personalForm.roles ? personalForm.roles.join(', ') : ''}
                    onChange={(e) => setPersonalForm({ 
                      ...personalForm, 
                      roles: e.target.value.split(',').map(r => r.trim()).filter(Boolean) 
                    })}
                    placeholder="Full Stack Developer, UI/UX Designer, Open Source Contributor"
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan Profil</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: SKILLS */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Kelola Daftar Skill & Kemampuan
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Tambah, perbarui persentase, atau hapus keterampilan teknis.
                  </p>
                </div>

                {/* Form Add/Edit Skill */}
                <form onSubmit={handleSaveSkill} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                  <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    {editingSkillIdx !== null ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {editingSkillIdx !== null ? 'Edit Skill Selected' : 'Tambah Skill Baru'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Nama Skill</label>
                      <input
                        type="text"
                        value={skillForm.name}
                        onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                        placeholder="Contoh: React.js"
                        required
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Kategori</label>
                      <select
                        value={skillForm.category}
                        onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value as any })}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Database">Database</option>
                        <option value="Tools">Tools & DevOps</option>
                        <option value="Design">Design & Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Tingkat Kemampuan ({skillForm.level}%)</label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={skillForm.level}
                        onChange={(e) => setSkillForm({ ...skillForm, level: Number(e.target.value) })}
                        className="w-full accent-emerald-600 my-2"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Lama Pengalaman</label>
                      <input
                        type="text"
                        value={skillForm.experience}
                        onChange={(e) => setSkillForm({ ...skillForm, experience: e.target.value })}
                        placeholder="Contoh: 3+ tahun"
                        required
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{editingSkillIdx !== null ? 'Simpan Edit' : 'Tambahkan Skill'}</span>
                    </button>
                    {editingSkillIdx !== null && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSkillIdx(null);
                          setSkillForm({ name: '', category: 'Frontend', level: 80, experience: '1+ tahun', icon: 'Code' });
                        }}
                        className="px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium"
                      >
                        Batal Edit
                      </button>
                    )}
                  </div>
                </form>

                {/* Skill List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2 shadow-sm"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-slate-900 dark:text-white">{skill.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                            {skill.category}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          Level: <span className="font-medium text-emerald-600 dark:text-emerald-400">{skill.level}%</span> • Exp: {skill.experience}
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingSkillIdx(idx);
                            setSkillForm(skill);
                          }}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                          title="Edit Skill"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus skill ${skill.name}?`)) deleteSkill(idx);
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                          title="Hapus Skill"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Kelola Portofolio Proyek
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Tambah proyek karya terbaru, ubah link demo, atau beri tanda "Proyek Unggulan".
                  </p>
                </div>

                {/* Form Add/Edit Project */}
                <form onSubmit={handleSaveProject} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                  <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    {editingProjId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {editingProjId ? 'Edit Proyek' : 'Tambah Proyek Baru'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Judul Proyek</label>
                      <input
                        type="text"
                        value={projForm.title}
                        onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                        placeholder="Contoh: E-Commerce Mobile App"
                        required
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Kategori</label>
                      <input
                        type="text"
                        value={projForm.category}
                        onChange={(e) => setProjForm({ ...projForm, category: e.target.value })}
                        placeholder="Contoh: Web App, Mobile, Design"
                        required
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                        Gambar Thumbnail Proyek
                      </label>
                      <div className="flex items-center gap-2">
                        {projForm.image && (
                          <img
                            src={projForm.image}
                            alt="Preview Proyek"
                            className="w-9 h-9 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0 shadow-sm"
                          />
                        )}
                        <label className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                          <span className="truncate">
                            {projForm.image ? 'Ganti File Gambar' : 'Pilih File Gambar dari Perangkat'}
                          </span>
                          <Upload className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 ml-1" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProjectImageFileChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Tech Stack (Pisahkan dengan koma)</label>
                      <input
                        type="text"
                        value={projForm.tags.join(', ')}
                        onChange={(e) => setProjForm({ 
                          ...projForm, 
                          tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) 
                        })}
                        placeholder="React, Tailwind, Node.js"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Link Live Demo (Opsional)</label>
                      <input
                        type="text"
                        value={projForm.liveUrl || ''}
                        onChange={(e) => setProjForm({ ...projForm, liveUrl: e.target.value })}
                        placeholder="https://myproject.com"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Link Repository GitHub (Opsional)</label>
                      <input
                        type="text"
                        value={projForm.githubUrl || ''}
                        onChange={(e) => setProjForm({ ...projForm, githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Deskripsi Singkat</label>
                    <textarea
                      rows={2}
                      value={projForm.description}
                      onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featured-check"
                      checked={projForm.featured}
                      onChange={(e) => setProjForm({ ...projForm, featured: e.target.checked })}
                      className="w-4 h-4 accent-emerald-600 rounded"
                    />
                    <label htmlFor="featured-check" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Tampilkan sebagai Proyek Unggulan (Featured)
                    </label>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{editingProjId ? 'Simpan Edit Proyek' : 'Tambahkan Proyek'}</span>
                    </button>
                    {editingProjId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProjId(null);
                          setProjForm({ id: '', title: '', description: '', longDescription: '', image: '', category: 'Web App', tags: [], featured: false });
                        }}
                        className="px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium"
                      >
                        Batal Edit
                      </button>
                    )}
                  </div>
                </form>

                {/* Project List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex gap-4 items-start shadow-sm"
                    >
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-100 dark:border-slate-700"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                            {proj.title}
                          </h4>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => {
                                setEditingProjId(proj.id);
                                setProjForm(proj);
                              }}
                              className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Hapus proyek ${proj.title}?`)) deleteProject(proj.id);
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                          {proj.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          {proj.featured && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                              ★ Unggulan
                            </span>
                          )}
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                            {proj.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: EXPERIENCE */}
            {activeTab === 'experience' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Kelola Pengalaman Kerja & Karir
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Ubah riwayat pekerjaan, periode kerja, dan pencapaian utama.
                  </p>
                </div>

                {/* Form Add/Edit Exp */}
                <form onSubmit={handleSaveExperience} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                  <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    {editingExpId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {editingExpId ? 'Edit Pengalaman' : 'Tambah Pengalaman Kerja Baru'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Nama Perusahaan</label>
                      <input
                        type="text"
                        value={expForm.company}
                        onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                        required
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Posisi / Jabatan</label>
                      <input
                        type="text"
                        value={expForm.role}
                        onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                        required
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Periode Kerja</label>
                      <input
                        type="text"
                        value={expForm.period}
                        onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                        placeholder="Contoh: 2022 - Sekarang"
                        required
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Lokasi</label>
                      <input
                        type="text"
                        value={expForm.location}
                        onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                        placeholder="Contoh: Jakarta / Remote"
                        required
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Deskripsi Tugas</label>
                    <textarea
                      rows={2}
                      value={expForm.description}
                      onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Pencapaian Utama (Pisahkan per baris)</label>
                    <textarea
                      rows={3}
                      value={expForm.achievements ? expForm.achievements.join('\n') : ''}
                      onChange={(e) => setExpForm({ 
                        ...expForm, 
                        achievements: e.target.value.split('\n').filter(Boolean)
                      })}
                      placeholder="Meningkatkan kecepatan website sebesar 40%&#10;Memimpin tim 5 orang developer"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{editingExpId ? 'Simpan Edit' : 'Tambah Pengalaman'}</span>
                    </button>
                    {editingExpId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingExpId(null);
                          setExpForm({ id: '', company: '', role: '', period: '', location: '', description: '', achievements: [] });
                        }}
                        className="px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium"
                      >
                        Batal Edit
                      </button>
                    )}
                  </div>
                </form>

                {/* Experience List */}
                <div className="space-y-3">
                  {experience.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex justify-between items-start"
                    >
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {exp.role} <span className="text-emerald-600 dark:text-emerald-400">@ {exp.company}</span>
                        </h4>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {exp.period} • {exp.location}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                          {exp.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setEditingExpId(exp.id);
                            setExpForm(exp);
                          }}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus pengalaman di ${exp.company}?`)) deleteExperience(exp.id);
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: TESTIMONIALS & FAQ */}
            {activeTab === 'testimonials_faq' && (
              <div className="space-y-8">
                {/* Testimonials */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        Daftar Testimoni Klien
                      </h3>
                      <p className="text-xs text-slate-500">Ulasan & rekomendasi dari partner</p>
                    </div>
                    <button
                      onClick={() => {
                        const name = prompt('Nama Klien:');
                        const role = prompt('Peran / Jabatan Klien:');
                        const content = prompt('Isi Ulasan Testimoni:');
                        if (name && content) {
                          addTestimonial({
                            id: `testi-${Date.now()}`,
                            name,
                            role: role || 'Client',
                            company: '',
                            content,
                            rating: 5,
                            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
                          });
                          showToast('Testimoni baru berhasil ditambahkan!');
                        }
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Tambah Testimoni
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {testimonials.map((t) => (
                      <div key={t.id} className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-start">
                        <div>
                          <div className="font-bold text-xs text-slate-900 dark:text-white">{t.name} ({t.role})</div>
                          <p className="text-xs text-slate-500 mt-1 italic">"{t.content}"</p>
                        </div>
                        <button
                          onClick={() => {
                            if (window.confirm('Hapus testimoni ini?')) deleteTestimonial(t.id);
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ */}
                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        Pertanyaan Umum (FAQ)
                      </h3>
                      <p className="text-xs text-slate-500">Pertanyaan yang sering diajukan klien</p>
                    </div>
                    <button
                      onClick={() => {
                        const q = prompt('Pertanyaan (Q):');
                        const a = prompt('Jawaban (A):');
                        if (q && a) {
                          addFaq({ q, a });
                          showToast('FAQ baru ditambahkan!');
                        }
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Tambah FAQ
                    </button>
                  </div>

                  <div className="space-y-2">
                    {faqs.map((f, idx) => (
                      <div key={idx} className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-xs text-slate-900 dark:text-white">Q: {f.q}</div>
                          <p className="text-xs text-slate-500 mt-1">A: {f.a}</p>
                        </div>
                        <button
                          onClick={() => {
                            if (window.confirm('Hapus FAQ ini?')) deleteFaq(idx);
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="max-w-2xl space-y-8">
                {/* Ganti Password */}
                <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                  <h3 className="text-md font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-500" /> Ubah Kata Sandi Admin
                  </h3>

                  <form onSubmit={handleChangePass} className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                        Kata Sandi Baru
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Minimal 4 karakter"
                        required
                        className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                        Konfirmasi Kata Sandi Baru
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Ulangi kata sandi"
                        required
                        className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition-colors"
                    >
                      Ubah Password
                    </button>
                  </form>
                </div>

                {/* Reset Data */}
                <div className="p-5 bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-900/50 space-y-3">
                  <h3 className="text-md font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Reset Semua Konten Web
                  </h3>
                  <p className="text-xs text-rose-600 dark:text-rose-300">
                    Aksi ini akan menghapus semua perubahan editan Anda dan mengembalikan seluruh isi web ke data bawaan asli.
                  </p>
                  <button
                    onClick={handleResetData}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset ke Data Default
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="absolute bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-2 text-sm animate-in slide-in-from-bottom duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

      </div>
    </div>
  );
};
