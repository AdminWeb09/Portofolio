export interface SocialLink {
  name: string;
  url: string;
  icon: string; // Lucide icon identifier
  color?: string;
}

export interface StatItem {
  label: string;
  value: string;
  subtext?: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  subRoles: string[];
  bioShort: string;
  bioFull: string;
  location: string;
  email: string;
  phone: string;
  status: string;
  avatarUrl: string;
  cvUrl?: string;
  stats: StatItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string; // Full-time, Freelance, Contract, etc.
  description: string;
  achievements: string[];
  skills: string[];
}

export interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools & UI/UX' | 'Soft Skills';
  level: number; // 0 to 100
  iconName: string;
  yearsOfExp: string;
  featured?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: 'Web App' | 'UI/UX' | 'Mobile App' | 'AI & Tools';
  tags: string[];
  image: string;
  featured: boolean;
  liveDemoUrl: string;
  githubUrl: string;
  highlights: string[];
  metrics?: string;
  date: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}
