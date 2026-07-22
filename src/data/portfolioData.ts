import { PersonalInfo, ExperienceItem, SkillItem, ProjectItem, SocialLink, TestimonialItem } from '../types/portfolio';

// Generated images
import avatarImg from '../assets/images/profile_avatar_1784683324689.jpg';
import projectPreviewImg from '../assets/images/project_preview_1784683337893.jpg';

export const personalInfo: PersonalInfo = {
  name: "Rizky Ramadhan",
  role: "Siswa SMK RPL & Junior Web Developer",
  subRoles: [
    "Siswa SMK Jurusan RPL",
    "Junior Web Developer",
    "Frontend & UI Enthusiast",
    "Pengembang Web & Mobile"
  ],
  bioShort: "Siswa SMK jurusan Rekayasa Perangkat Lunak (RPL) yang berdedikasi tinggi dalam belajar koding, merancang antarmuka web interaktif, dan membangun aplikasi bermanfaat.",
  bioFull: "Saya adalah siswa kelas XII jurusan Rekayasa Perangkat Lunak (RPL) di SMK. Saya memiliki ketertarikan mendalam dalam dunia Web Development, mulai dari perancangan UI/UX di Figma hingga pengodean dengan HTML, CSS, JavaScript, React, dan Tailwind CSS. Selama sekolah, saya aktif mengerjakan proyek tugas sekolah, pernah menyelesaikan Praktik Kerja Lapangan (PKL) di industri software house, dan mengerjakan proyek website freelance untuk UMKM lokal.",
  location: "Bandung, Jawa Barat (Terbuka untuk PKL / Remote)",
  email: "rizky.ramadhan.smk@example.com",
  phone: "+62 857-1234-5678",
  status: "Terbuka untuk Magang (PKL), Freelance & Junior Role",
  avatarUrl: avatarImg,
  cvUrl: "#",
  specialization: "HTML, CSS, JavaScript, React, Tailwind CSS, PHP & MySQL",
  languages: "Indonesia (Native), English (Dasar - Pasif)",
  educationTitle: "SMK Negeri 1 Bandung (Rekayasa Perangkat Lunak)",
  educationDetail: "SMKN 1 Bandung • Jurusan RPL (Rekayasa Perangkat Lunak) • Kelas XII",
  educationDesc: "Mempelajari Pemrograman Web & Bergerak, Pemrograman Berorientasi Objek (PBO), Basis Data (MySQL), Desain Grafis / UI, dan Praktik Kerja Lapangan (PKL).",
  stats: [
    { label: "Tingkat Pendidikan", value: "Kelas XII", subtext: "Jurusan RPL (SMK)" },
    { label: "Proyek & Tugas Akhir", value: "15+", subtext: "Web App & UI Design" },
    { label: "Pengalaman PKL", value: "6 Bulan", subtext: "Di Software House" },
    { label: "Semangat Belajar", value: "100%", subtext: "Siap Berkarya" }
  ]
};

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com",
    icon: "Github",
    color: "hover:text-neutral-900 dark:hover:text-white"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: "Linkedin",
    color: "hover:text-blue-600 dark:hover:text-blue-400"
  },
  {
    name: "Instagram",
    url: "https://instagram.com",
    icon: "Instagram",
    color: "hover:text-pink-600 dark:hover:text-pink-400"
  },
  {
    name: "Email",
    url: "mailto:rizky.ramadhan.smk@example.com",
    icon: "Mail",
    color: "hover:text-emerald-600 dark:hover:text-emerald-400"
  }
];

export const skillsData: SkillItem[] = [
  // Frontend
  { name: "HTML5 & CSS3", category: "Frontend", level: 92, iconName: "Layout", yearsOfExp: "2 thn", featured: true },
  { name: "JavaScript (ES6+)", category: "Frontend", level: 85, iconName: "Zap", yearsOfExp: "2 thn", featured: true },
  { name: "React.js", category: "Frontend", level: 80, iconName: "Code2", yearsOfExp: "1.5 thn", featured: true },
  { name: "Tailwind CSS & Bootstrap", category: "Frontend", level: 88, iconName: "Palette", yearsOfExp: "2 thn", featured: true },
  { name: "TypeScript Dasar", category: "Frontend", level: 75, iconName: "FileCode2", yearsOfExp: "1 thn", featured: false },
  
  // Backend & Database
  { name: "PHP Dasar & Laravel Basic", category: "Backend", level: 78, iconName: "Server", yearsOfExp: "2 thn", featured: true },
  { name: "MySQL / Database Relasional", category: "Backend", level: 82, iconName: "Database", yearsOfExp: "2 thn", featured: true },
  { name: "Node.js & Express Basic", category: "Backend", level: 72, iconName: "Globe", yearsOfExp: "1 thn", featured: false },

  // Tools & UI/UX
  { name: "Figma (UI/UX Wireframing)", category: "Tools & UI/UX", level: 82, iconName: "Figma", yearsOfExp: "2 thn", featured: true },
  { name: "Git & GitHub", category: "Tools & UI/UX", level: 85, iconName: "GitBranch", yearsOfExp: "2 thn", featured: true },
  { name: "VS Code & DevTools", category: "Tools & UI/UX", level: 90, iconName: "Cpu", yearsOfExp: "2 thn", featured: false },

  // Soft Skills
  { name: "Kerja Sama Tim & Kedisiplinan", category: "Soft Skills", level: 92, iconName: "Users", yearsOfExp: "Masa SMK", featured: false },
  { name: "Keinginan Belajar Hal Baru", category: "Soft Skills", level: 98, iconName: "Brain", yearsOfExp: "Masa SMK", featured: false },
  { name: "Manajemen Waktu Tugas", category: "Soft Skills", level: 88, iconName: "Clock", yearsOfExp: "Masa SMK", featured: false }
];

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Peserta Praktik Kerja Lapangan (PKL) Web Developer",
    company: "PT Digital Solusindo Nusantara",
    period: "Jan 2024 - Jun 2024 (6 Bulan PKL)",
    location: "Bandung, Indonesia",
    type: "PKL / Intern",
    description: "Melaksanakan Praktik Kerja Lapangan (PKL) selama 6 bulan di divisi IT Software Development. Membantu slicing desain antarmuka Figma ke dalam HTML, CSS, Tailwind CSS, dan React.",
    achievements: [
      "Membantu memotong (slicing) 8+ halaman website perusahaan hingga responsif sempurna.",
      "Mendapat predikat nilai Sangat Baik (A) dari pembimbing lapangan industri.",
      "Memahami alur kolaborasi tim pemrograman profesional dengan Git & GitHub."
    ],
    skills: ["HTML", "CSS", "Tailwind CSS", "React", "Git", "Figma"]
  },
  {
    id: "exp-2",
    role: "Anggota Tim IT & Media OSIS / Ekstrakurikuler Koding",
    company: "SMK Negeri 1 Bandung",
    period: "2023 - Sekarang",
    location: "Sekolah",
    type: "Organisasi Sekolah",
    description: "Mengembangkan dan mengelola halaman website pendaftaran kegiatan perlombaan antar-siswa serta membuat media informasi digital sekolah.",
    achievements: [
      "Membuat form pendaftaran perlombaan cup sekolah secara online.",
      "Mengadakan sesi sharing koding dasar HTML/CSS untuk adik tingkat kelas X."
    ],
    skills: ["React", "Tailwind CSS", "PHP", "Canva"]
  },
  {
    id: "exp-3",
    role: "Junior Freelance Web Developer (Project Mandiri)",
    company: "Siswa Freelancer",
    period: "2023 - Sekarang",
    location: "Remote / Bandung",
    type: "Freelance",
    description: "Mengerjakan proyek pembuatan landing page dan katalog produk UMKM lokal sebagai wadah latihan mengasah keterampilan koding di luar jam sekolah.",
    achievements: [
      "Menyelesaikan 4+ website katalog usaha lokal seperti Kedai Kopi dan Toko Pakaian.",
      "Mendapatkan ulasan puas dari pemilik usaha atas tampilan web yang modern dan rapi."
    ],
    skills: ["HTML/CSS", "JavaScript", "Tailwind CSS", "WordPress"]
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: "proj-1",
    title: "SimPerpus - Sistem Informasi Perpustakaan Sekolah",
    shortDescription: "Aplikasi manajemen data buku, transaksi peminjaman, dan pengembalian perpustakaan sekolah berbasis web.",
    longDescription: "Dibuat sebagai Proyek Tugas Akhir mata pelajaran Pemrograman Web & PBO. SimPerpus membantu petugas sekolah mencatat peminjaman buku, memantau denda keterlambatan, serta pencarian katalog buku berbasis kategori.",
    category: "Web App",
    tags: ["React", "Tailwind CSS", "JavaScript", "LocalStorage"],
    image: projectPreviewImg,
    featured: true,
    liveDemoUrl: "https://example.com/demo-simperpus",
    githubUrl: "https://github.com/example/simperpus-smk",
    highlights: [
      "Pencarian buku interaktif dengan filter kategori cepat",
      "Kalkulator denda keterlambatan otomatis",
      "Penyimpanan data lokal yang ramah & cepat diakses",
      "Desain bersih & responsif untuk laptop maupun HP"
    ],
    metrics: "Proyek Tugas Akhir Terbaik Jurusan RPL",
    date: "2024"
  },
  {
    id: "proj-2",
    title: "Portal E-Katalog & Kasir Warung Kopi UMKM",
    shortDescription: "Website katalog menu dan sistem kasir digital sederhana untuk pencatatan transaksi pesanan makanan & minuman.",
    longDescription: "Proyek freelance pertama untuk usaha warung kopi lokal di Bandung. Memungkinkan pembeli melihat daftar menu beserta foto & harga, serta kasir menghitung total pembayaran pesanan secara otomatis.",
    category: "Web App",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    liveDemoUrl: "https://example.com/demo-ekatalog",
    githubUrl: "https://github.com/example/katalog-kopi",
    highlights: [
      "Fitur keranjang belanja sederhana & nota transaksi",
      "Desain tema modern yang ramah pengguna smartphone",
      "Integrasi tombol WhatsApp langsung ke penjual"
    ],
    metrics: "Digunakan langsung oleh Mitra UMKM Kopi",
    date: "2024"
  },
  {
    id: "proj-3",
    title: "Redesign Antarmuka Website SMKN 1 (UI/UX Konsep)",
    shortDescription: "Konsep desain ulang antarmuka portal informasi sekolah agar tampil lebih segar, modern, dan mudah diakses siswa.",
    longDescription: "Dibuat untuk persiapan Lomba Kompetensi Siswa (LKS) bidang Web Design. Menampilkan tata letak jadwal pelajaran, pengumuman kelulusan, galeri prestasi, dan struktur organisasi guru.",
    category: "UI/UX",
    tags: ["Figma", "UI/UX", "Prototyping", "Design System"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    liveDemoUrl: "https://example.com/demo-ui-smk",
    githubUrl: "https://github.com/example/redesign-smk-figma",
    highlights: [
      "Wireframe & Prototype interaktif di Figma",
      "Standar warna cerah berkarakter edukatif",
      "Navigasi cepat untuk pengumuman & berita sekolah"
    ],
    metrics: "Juara 2 Seleksi LKS Internal Sekolah",
    date: "2023"
  },
  {
    id: "proj-4",
    title: "Aplikasi Catatan Tugas & Jadwal Pelajaran (StudyPlan)",
    shortDescription: "Aplikasi web mandiri untuk membantu siswa SMK mencatat jadwal pelajaran, PR sekolah, dan reminder tugas kelompok.",
    longDescription: "Aplikasi ini mempermudah teman-teman sekelas dalam mengingat tenggat waktu tugas sekolah dan menyimpan catatan penting harian.",
    category: "Web App",
    tags: ["React", "Tailwind CSS", "PWA"],
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    featured: false,
    liveDemoUrl: "https://example.com/demo-studyplan",
    githubUrl: "https://github.com/example/studyplan-app",
    highlights: [
      "Penanda warna untuk prioritas tugas sekolah",
      "Penyimpanan offline browser (LocalStorage)",
      "Mode gelap & terang hemat daya baterai"
    ],
    date: "2023"
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: "testi-1",
    name: "Gunawan, S.Kom.",
    role: "Guru Produktif RPL",
    company: "SMK Negeri 1 Bandung",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    content: "Rizky adalah siswa yang sangat antusias dan tekun di kelas RPL. Ia sering membantu teman-temannya dalam memahami logika koding dan selalu menyelesaikan tugas praktik dengan rapi melebihi ekspektasi.",
    rating: 5
  },
  {
    id: "testi-2",
    name: "Bambang Kurnia",
    role: "Pembimbing Industri / Senior Web Dev",
    company: "PT Digital Solusindo Nusantara",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    content: "Selama 6 bulan mengikuti PKL di perusahaan kami, Rizky menunjukkan sopan santun, ketelitian, dan kemampuan adaptasi yang sangat baik. Hasil slicing antarmukanya sangat presisi dan siap diintegrasikan.",
    rating: 5
  },
  {
    id: "testi-3",
    name: "Fikri Ardiansyah",
    role: "Ketua OSIS",
    company: "SMKN 1 Bandung",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    content: "Website pendaftaran event sekolah yang dibuat Rizky sangat memudahkan panitia dan ribuan peserta yang mendaftar secara online. Sangat responsif dan bebas dari error!",
    rating: 5
  }
];

export const faqData = [
  {
    q: "Apakah Rizky menerima tawaran Magang (PKL Lanjutan) atau Kerja?",
    a: "Sangat bersedia! Saya terbuka untuk kesempatan Magang / PKL lanjutan, proyek website freelance, maupun posisi Junior Web Developer setelah lulus dari SMK."
  },
  {
    q: "Apa jurusan yang diambil di sekolah?",
    a: "Saya mengambil jurusan Rekayasa Perangkat Lunak (RPL) di SMK, mempelajari pemrograman web, basis data, PBO, dan pengembangan software."
  },
  {
    q: "Teknologi apa saja yang sudah dipelajari dan dikuasai?",
    a: "Teknologi utama yang saya pelajari meliputi HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, Bootstrap, PHP & MySQL dasar, serta tools Figma dan Git/GitHub."
  },
  {
    q: "Berapa lama estimasi pengerjaan website proyek freelance?",
    a: "Untuk website pendaratan (landing page) atau e-katalog sederhana biasanya membutuhkan waktu 3 hingga 7 hari pengerjaan."
  }
];

