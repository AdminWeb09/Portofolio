import { PersonalInfo, ExperienceItem, SkillItem, ProjectItem, SocialLink, TestimonialItem } from '../types/portfolio';

// Generated images
import avatarImg from '../assets/images/profile_avatar_1784683324689.jpg';
import projectPreviewImg from '../assets/images/project_preview_1784683337893.jpg';

export const personalInfo: PersonalInfo = {
  name: "Alex Wijaya",
  role: "Full Stack Developer & UI/UX Specialist",
  subRoles: [
    "Frontend Engineer",
    "React & Next.js Enthusiast",
    "UI/UX Designer",
    "Node.js & Cloud Builder"
  ],
  bioShort: "Saya berdedikasi membangun aplikasi web modern yang cepat, elegan, responsif, serta memberikan pengalaman pengguna tingkat tinggi.",
  bioFull: "Saya adalah seorang Software Engineer berdomisili di Jakarta dengan pengalaman lebih dari 4 tahun dalam mengembangkan solusi web berskala tinggi. Spesialisasi saya mencakup pengembangan arsitektur frontend dengan React & TypeScript, pembuatan REST API / GraphQL yang terstruktur, hingga desain antarmuka pengguna yang bersih, accessible, dan berdaya guna.",
  location: "Jakarta, Indonesia (Open to Remote)",
  email: "alex.wijaya.dev@example.com",
  phone: "+62 812-3456-7890",
  status: "Tersedia untuk Project Freelance & Karir Full-time",
  avatarUrl: avatarImg,
  cvUrl: "#",
  stats: [
    { label: "Tahun Pengalaman", value: "4+", subtext: "Di Industri Tech & Digital" },
    { label: "Proyek Selesai", value: "35+", subtext: "Web, Mobile & UI/UX" },
    { label: "Kepuasan Klien", value: "99%", subtext: "Ulasan Positif" },
    { label: "Komitmen Waktu", value: "100%", subtext: "Tepat Waktu & Teliti" }
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
    name: "Twitter / X",
    url: "https://twitter.com",
    icon: "Twitter",
    color: "hover:text-sky-500 dark:hover:text-sky-400"
  },
  {
    name: "Email",
    url: "mailto:alex.wijaya.dev@example.com",
    icon: "Mail",
    color: "hover:text-emerald-600 dark:hover:text-emerald-400"
  }
];

export const skillsData: SkillItem[] = [
  // Frontend
  { name: "React / Next.js", category: "Frontend", level: 95, iconName: "Code2", yearsOfExp: "4 thn", featured: true },
  { name: "TypeScript", category: "Frontend", level: 90, iconName: "FileCode2", yearsOfExp: "3 thn", featured: true },
  { name: "Tailwind CSS", category: "Frontend", level: 95, iconName: "Palette", yearsOfExp: "4 thn", featured: true },
  { name: "HTML5 & CSS3 / SCSS", category: "Frontend", level: 98, iconName: "Layout", yearsOfExp: "4+ thn", featured: true },
  { name: "JavaScript (ES6+)", category: "Frontend", level: 95, iconName: "Zap", yearsOfExp: "4+ thn", featured: false },
  { name: "State Management (Redux / Zustand)", category: "Frontend", level: 88, iconName: "Layers", yearsOfExp: "3 thn", featured: false },
  
  // Backend
  { name: "Node.js & Express", category: "Backend", level: 88, iconName: "Server", yearsOfExp: "3 thn", featured: true },
  { name: "REST API & GraphQL", category: "Backend", level: 90, iconName: "Globe", yearsOfExp: "3 thn", featured: true },
  { name: "PostgreSQL & Prisma / Drizzle", category: "Backend", level: 82, iconName: "Database", yearsOfExp: "2 thn", featured: true },
  { name: "MongoDB / Firestore", category: "Backend", level: 85, iconName: "HardDrive", yearsOfExp: "3 thn", featured: false },

  // Tools & UI/UX
  { name: "Figma & UI/UX Wireframing", category: "Tools & UI/UX", level: 85, iconName: "Figma", yearsOfExp: "3 thn", featured: true },
  { name: "Git & GitHub Actions", category: "Tools & UI/UX", level: 92, iconName: "GitBranch", yearsOfExp: "4 thn", featured: true },
  { name: "Vite & Webpack", category: "Tools & UI/UX", level: 90, iconName: "Cpu", yearsOfExp: "3 thn", featured: false },
  { name: "Framer Motion & Animations", category: "Tools & UI/UX", level: 88, iconName: "Sparkles", yearsOfExp: "2 thn", featured: true },

  // Soft Skills
  { name: "Pemecahan Masalah (Problem Solving)", category: "Soft Skills", level: 95, iconName: "Brain", yearsOfExp: "4+ thn", featured: false },
  { name: "Komunikasi & Kolaborasi Tim", category: "Soft Skills", level: 90, iconName: "Users", yearsOfExp: "4+ thn", featured: false },
  { name: "Manajemen Waktu & Agile/Scrum", category: "Soft Skills", level: 92, iconName: "Clock", yearsOfExp: "3 thn", featured: false }
];

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Senior Frontend Engineer",
    company: "Nusa Digital Studio",
    period: "2023 - Sekarang",
    location: "Jakarta, Indonesia",
    type: "Full-time",
    description: "Memimpin tim frontend dalam merancang dan mengembangkan aplikasi SaaS berskala enterprise berbasis React, Next.js, dan Tailwind CSS.",
    achievements: [
      "Meningkatkan kecepatan loading halaman hingga 45% melalui pemisahan kode dan optimasi aset.",
      "Membangun design system internal yang digunakan oleh 15+ pengembang.",
      "Mengintegrasikan fitur real-time dashboard dengan WebSocket dan Recharts."
    ],
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Zustand"]
  },
  {
    id: "exp-2",
    role: "Full Stack Developer",
    company: "Inovasi Karya Tech",
    period: "2021 - 2023",
    location: "Bandung, Indonesia (Hybrid)",
    type: "Full-time",
    description: "Mengembangkan berbagai aplikasi web e-commerce, sistem kasir POS, dan portal manajemen konten berbasis Node.js & React.",
    achievements: [
      "Mengembangkan 10+ modul e-commerce dengan sistem pembayaran Midtrans dan Stripe.",
      "Meningkatkan skor performa Lighthouse dari 62 menjadi 98.",
      "Mendesain REST API berskala microservice dengan ekspansi pengguna aktif harian mencapai 20.000+ user."
    ],
    skills: ["Node.js", "Express", "React", "PostgreSQL", "Docker"]
  },
  {
    id: "exp-3",
    role: "UI/UX Designer & Frontend Freelancer",
    company: "Self-Employed",
    period: "2020 - 2021",
    location: "Remote",
    type: "Freelance",
    description: "Membantu UMKM dan Startup lokal merancang antarmuka produk digital (wireframe, mockup, prototype) serta mengimplementasikannya ke dalam kode React.",
    achievements: [
      "Menyelesaikan 15+ proyek web & landing page dengan kepuasan klien 100%.",
      "Membuat prototype interaktif Figma yang mempercepat siklus persetujuan desain sebesar 50%."
    ],
    skills: ["Figma", "HTML/CSS", "JavaScript", "Tailwind CSS"]
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: "proj-1",
    title: "NovaAnalytics - Cloud Business Intelligence Dashboard",
    shortDescription: "Platform analytics modern dengan visualisasi data real-time, grafik interaktif, dan laporan otomatis berbasis AI.",
    longDescription: "NovaAnalytics diciptakan untuk membantu pemilik bisnis memantau performa penjualan, metrik pengguna, serta tren pendapatan secara real-time. Dilengkapi dengan filter periode dinamis, ekspor PDF/CSV, serta tema gelap & terang yang nyaman di mata.",
    category: "Web App",
    tags: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Node.js"],
    image: projectPreviewImg,
    featured: true,
    liveDemoUrl: "https://example.com/demo1",
    githubUrl: "https://github.com/example/nova-analytics",
    highlights: [
      "Visualisasi chart interaktif menggunakan Recharts & D3.js",
      "Performa render cepat di atas 95+ pada Lighthouse",
      "Dukungan mode gelap penuh dan tata letak responsif",
      "Integrasi API simulasi data penjualan real-time"
    ],
    metrics: "Dipakai oleh 50+ pengguna penguji beta",
    date: "2024"
  },
  {
    id: "proj-2",
    title: "KopiKita - E-Commerce & Loyalty App UI/UX",
    shortDescription: "Aplikasi e-commerce pemesanan kopi lokal berbasis web app dengan sistem loyalty point dan pemesanan meja.",
    longDescription: "KopiKita mempermudah pecinta kopi untuk memesan minuman favorit secara online, melacak status pembuatan pesanan secara real-time, serta mengumpulkan poin hadiah untuk ditukarkan voucher diskon.",
    category: "Web App",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Zustand"],
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    liveDemoUrl: "https://example.com/demo2",
    githubUrl: "https://github.com/example/kopikita-app",
    highlights: [
      "Pengalaman Checkout interaktif dengan animasi smooth",
      "Sistem filter menu berdasarkan kategori rasa dan suhu",
      "Responsif sempurna untuk layar smartphone & tablet"
    ],
    metrics: "+35% Konversi Pemesanan pada Uji Coba Usability",
    date: "2024"
  },
  {
    id: "proj-3",
    title: "CraftUI - Accessible Component Library & Design System",
    shortDescription: "Design system & dokumentasi komponen UI siap pakai dengan kepatuhan standar aksesibilitas WCAG 2.1.",
    longDescription: "CraftUI adalah pustaka komponen React open-source yang dibuat dengan Tailwind CSS dan Radix UI primitives. Mengedepankan kontras warna optimal, keyboard navigation, dan kemudahan kustomisasi.",
    category: "UI/UX",
    tags: ["React", "Tailwind CSS", "TypeScript", "A11y", "Storybook"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    liveDemoUrl: "https://example.com/demo3",
    githubUrl: "https://github.com/example/craft-ui-library",
    highlights: [
      "40+ komponen UI siap pakai (Button, Modal, Toast, Tabs, Card, dsb.)",
      "Dukungan keyboard navigation & screen reader",
      "Dokumentasi lengkap dengan kode salin sekali klik"
    ],
    metrics: "1,200+ Stars di GitHub Repo",
    date: "2023"
  },
  {
    id: "proj-4",
    title: "SmartFit - Fitness & Meal Tracker Mobile Web",
    shortDescription: "Aplikasi pemantau kebugaran harian, kalori Makanan, serta jadwal olahraga interaktif.",
    longDescription: "SmartFit menyajikan grafik kemajuan kebugaran mingguan, kalkulator kebutuhan kalori harian (BMR & TDEE), serta rekomendasi resep sehat berbasis profil pengguna.",
    category: "Mobile App",
    tags: ["React", "Tailwind CSS", "PWA", "Lucide Icons"],
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    featured: false,
    liveDemoUrl: "https://example.com/demo4",
    githubUrl: "https://github.com/example/smartfit-pwa",
    highlights: [
      "Tampilan PWA (Progressive Web App) dapat diinstal di HP",
      "Penyimpanan lokal cepat dengan Offline-First state",
      "Kalkulator nutrisi & rekomendasi aktivitas harian"
    ],
    date: "2023"
  },
  {
    id: "proj-5",
    title: "PromptStudio - AI Content Generator Dashboard",
    shortDescription: "Aplikasi generator artikel, ide konten sosial media, dan ringkasan teks otomatis berbasis AI.",
    longDescription: "PromptStudio memanfaatkan model bahasa kecerdasan buatan untuk membantu content creator merancang headline, draft postingan, serta copywriting produk dalam hitungan detik.",
    category: "AI & Tools",
    tags: ["React", "TypeScript", "Node.js", "Express", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    featured: false,
    liveDemoUrl: "https://example.com/demo5",
    githubUrl: "https://github.com/example/prompt-studio-ai",
    highlights: [
      "Generator konten otomatis dengan streaming teks real-time",
      "Penyimpanan draf favorit dan fitur ekspor Markdown",
      "Antarmuka bersih dengan kontrol temperatur & prompt preset"
    ],
    date: "2024"
  },
  {
    id: "proj-6",
    title: "TravelNusa - Booking & Tour Landing Page",
    shortDescription: "Website eksplorasi destinasi wisata Indonesia dengan galeri foto memukau dan formulir pemesanan langsung.",
    longDescription: "TravelNusa mempromosikan keindahan destinasi wisata nusantara dari Bali, Raja Ampat hingga Komodo dengan efek paralaks, filter harga paket, dan peta interaktif.",
    category: "UI/UX",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Unsplash API"],
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop",
    featured: false,
    liveDemoUrl: "https://example.com/demo6",
    githubUrl: "https://github.com/example/travel-nusa",
    highlights: [
      "Galeri foto resolusi tinggi dengan animasi lightbox",
      "Estimasi biaya perjalanan otomatis berdasarkan jumlah orang",
      "Tata letak responsif disesuaikan untuk smartphone & tablet"
    ],
    date: "2023"
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: "testi-1",
    name: "Budi Santoso",
    role: "CEO & Co-Founder",
    company: "Nusa Digital Group",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    content: "Alex adalah pengembang frontend yang luar biasa. Ia tidak hanya mampu menerjemahkan desain Figma menjadi kode yang sangat presisi, tetapi juga memikirkan aspek performa, SEO, dan kenyamanan pengguna secara detail.",
    rating: 5
  },
  {
    id: "testi-2",
    name: "Siti Rahmawati",
    role: "Product Manager",
    company: "Inovasi Karya Tech",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    content: "Bekerja bersama Alex sangat menyenangkan. Komunikasinya sangat proaktif, hasil pekerjaannya tepat waktu, dan kode yang ia tulis sangat bersih serta mudah dirawat oleh pengembang lain.",
    rating: 5
  },
  {
    id: "testi-3",
    name: "Deni Pratama",
    role: "Founder",
    company: "KopiKita Coffee",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    content: "Aplikasi web e-commerce yang dikembangkan Alex untuk KopiKita langsung meningkatkan jumlah pemesanan online kami sebesar 30% pada bulan pertama peluncuran. Sangat merekomendasikan jasanya!",
    rating: 5
  }
];

export const faqData = [
  {
    q: "Apakah Alex menerima proyek freelance atau kontrak?",
    a: "Ya! Saya terbuka untuk proyek freelance skala kecil maupun besar, pengerjaan landing page, pembuatan web app custom, hingga posisi full-time / remote contract."
  },
  {
    q: "Berapa lama estimasi waktu pengerjaan sebuah website?",
    a: "Estimasi waktu tergantung pada kompleksitas proyek. Untuk landing page / portofolio biasanya membutuhkan waktu 3-7 hari, sedangkan web application dengan fitur dinamis membutuhkan waktu 2-4 minggu."
  },
  {
    q: "Teknologi apa saja yang paling sering digunakan?",
    a: "Spesialisasi utama saya adalah React, Next.js, TypeScript, Tailwind CSS, Node.js, Express, dan PostgreSQL/MongoDB."
  },
  {
    q: "Bagaimana alur pengerjaan sebuah proyek?",
    a: "Alur umum: 1) Diskusi kebutuhan & fitur -> 2) Wireframe/Desain -> 3) Pengerjaan Kode & Integrasi -> 4) Pengujian (Testing & Feedback) -> 5) Peluncuran & Dukungan."
  }
];
