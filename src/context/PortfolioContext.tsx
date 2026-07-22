import React, { createContext, useContext, useState, useEffect } from 'react';
import { PersonalInfo, SkillItem, ProjectItem, ExperienceItem, TestimonialItem, SocialLink } from '../types/portfolio';
import { personalInfo as defaultPersonalInfo, skillsData as defaultSkills, projectsData as defaultProjects, experienceData as defaultExperience, testimonialsData as defaultTestimonials, faqData as defaultFaqs, socialLinks as defaultSocialLinks } from '../data/portfolioData';

interface FaqItem {
  q: string;
  a: string;
}

interface PortfolioContextType {
  personalInfo: PersonalInfo;
  skills: SkillItem[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
  socialLinks: SocialLink[];
  
  // Auth state
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPassword: (newPassword: string) => void;

  // Data update handlers
  updatePersonalInfo: (info: PersonalInfo) => void;
  
  addSkill: (skill: SkillItem) => void;
  updateSkill: (index: number, skill: SkillItem) => void;
  deleteSkill: (index: number) => void;

  addProject: (project: ProjectItem) => void;
  updateProject: (id: string, project: ProjectItem) => void;
  deleteProject: (id: string) => void;

  addExperience: (exp: ExperienceItem) => void;
  updateExperience: (id: string, exp: ExperienceItem) => void;
  deleteExperience: (id: string) => void;

  addTestimonial: (testi: TestimonialItem) => void;
  updateTestimonial: (id: string, testi: TestimonialItem) => void;
  deleteTestimonial: (id: string) => void;

  addFaq: (faq: FaqItem) => void;
  updateFaq: (index: number, faq: FaqItem) => void;
  deleteFaq: (index: number) => void;

  resetToDefault: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio_app_data_v1';
const AUTH_KEY = 'portfolio_admin_auth_v1';
const PASS_KEY = 'portfolio_admin_password_v1';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state from LocalStorage or defaults
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_personal`);
    return saved ? JSON.parse(saved) : defaultPersonalInfo;
  });

  const [skills, setSkills] = useState<SkillItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_skills`);
    return saved ? JSON.parse(saved) : defaultSkills;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
    return saved ? JSON.parse(saved) : defaultProjects;
  });

  const [experience, setExperience] = useState<ExperienceItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_experience`);
    return saved ? JSON.parse(saved) : defaultExperience;
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_testimonials`);
    return saved ? JSON.parse(saved) : defaultTestimonials;
  });

  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_faqs`);
    return saved ? JSON.parse(saved) : defaultFaqs;
  });

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_social`);
    return saved ? JSON.parse(saved) : defaultSocialLinks;
  });

  // Admin auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem(PASS_KEY) || 'admin123';
  });

  // Save changes to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_personal`, JSON.stringify(personalInfo));
  }, [personalInfo]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_skills`, JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_experience`, JSON.stringify(experience));
  }, [experience]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_testimonials`, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_faqs`, JSON.stringify(faqs));
  }, [faqs]);

  // Auth functions
  const loginAdmin = (password: string) => {
    if (password === adminPassword) {
      setIsAdminLoggedIn(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(AUTH_KEY);
  };

  const changeAdminPassword = (newPassword: string) => {
    setAdminPassword(newPassword);
    localStorage.setItem(PASS_KEY, newPassword);
  };

  // Actions
  const updatePersonalInfo = (info: PersonalInfo) => {
    setPersonalInfo(info);
  };

  const addSkill = (skill: SkillItem) => {
    setSkills(prev => [...prev, skill]);
  };

  const updateSkill = (index: number, skill: SkillItem) => {
    setSkills(prev => prev.map((item, i) => (i === index ? skill : item)));
  };

  const deleteSkill = (index: number) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
  };

  const addProject = (project: ProjectItem) => {
    setProjects(prev => [project, ...prev]);
  };

  const updateProject = (id: string, project: ProjectItem) => {
    setProjects(prev => prev.map(p => (p.id === id ? project : p)));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addExperience = (exp: ExperienceItem) => {
    setExperience(prev => [exp, ...prev]);
  };

  const updateExperience = (id: string, exp: ExperienceItem) => {
    setExperience(prev => prev.map(e => (e.id === id ? exp : e)));
  };

  const deleteExperience = (id: string) => {
    setExperience(prev => prev.filter(e => e.id !== id));
  };

  const addTestimonial = (testi: TestimonialItem) => {
    setTestimonials(prev => [...prev, testi]);
  };

  const updateTestimonial = (id: string, testi: TestimonialItem) => {
    setTestimonials(prev => prev.map(t => (t.id === id ? testi : t)));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const addFaq = (faq: FaqItem) => {
    setFaqs(prev => [...prev, faq]);
  };

  const updateFaq = (index: number, faq: FaqItem) => {
    setFaqs(prev => prev.map((f, i) => (i === index ? faq : f)));
  };

  const deleteFaq = (index: number) => {
    setFaqs(prev => prev.filter((_, i) => i !== index));
  };

  const resetToDefault = () => {
    setPersonalInfo(defaultPersonalInfo);
    setSkills(defaultSkills);
    setProjects(defaultProjects);
    setExperience(defaultExperience);
    setTestimonials(defaultTestimonials);
    setFaqs(defaultFaqs);
    setSocialLinks(defaultSocialLinks);
    localStorage.clear();
  };

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        skills,
        projects,
        experience,
        testimonials,
        faqs,
        socialLinks,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
        updatePersonalInfo,
        addSkill,
        updateSkill,
        deleteSkill,
        addProject,
        updateProject,
        deleteProject,
        addExperience,
        updateExperience,
        deleteExperience,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addFaq,
        updateFaq,
        deleteFaq,
        resetToDefault,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
