import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { PersonalInfo, SkillItem, ProjectItem, ExperienceItem, TestimonialItem, SocialLink } from '../types/portfolio';
import { personalInfo as defaultPersonalInfo, skillsData as defaultSkills, projectsData as defaultProjects, experienceData as defaultExperience, testimonialsData as defaultTestimonials, faqData as defaultFaqs, socialLinks as defaultSocialLinks } from '../data/portfolioData';
import { db } from '../lib/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

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
  isCloudSynced: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio_app_data_v4';
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

  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(false);
  const isInitialRemoteLoad = useRef<boolean>(true);

  // Admin auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem(PASS_KEY) || 'admin123';
  });

  // Function to push updates to Firestore
  const saveToFirestore = async (overrideData?: Record<string, unknown>) => {
    try {
      const docRef = doc(db, 'portfolio', 'main');
      const payload = overrideData || {
        personalInfo,
        skills,
        projects,
        experience,
        testimonials,
        faqs,
        socialLinks,
        updatedAt: new Date().toISOString()
      };
      await setDoc(docRef, payload, { merge: true });
      setIsCloudSynced(true);
    } catch (err) {
      console.error("Firestore sync error:", err);
    }
  };

  // Setup Firestore real-time listener
  useEffect(() => {
    const docRef = doc(db, 'portfolio', 'main');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.personalInfo) setPersonalInfo(data.personalInfo);
        if (data.skills) setSkills(data.skills);
        if (data.projects) setProjects(data.projects);
        if (data.experience) setExperience(data.experience);
        if (data.testimonials) setTestimonials(data.testimonials);
        if (data.faqs) setFaqs(data.faqs);
        if (data.socialLinks) setSocialLinks(data.socialLinks);
        setIsCloudSynced(true);
      } else {
        // Document does not exist yet in Firestore -> Seed Firestore with default data
        const initialData = {
          personalInfo: defaultPersonalInfo,
          skills: defaultSkills,
          projects: defaultProjects,
          experience: defaultExperience,
          testimonials: defaultTestimonials,
          faqs: defaultFaqs,
          socialLinks: defaultSocialLinks,
          updatedAt: new Date().toISOString()
        };
        setDoc(docRef, initialData, { merge: true }).then(() => {
          setIsCloudSynced(true);
        }).catch(err => console.error("Firestore seed error:", err));
      }
      isInitialRemoteLoad.current = false;
    }, (err) => {
      console.error("Firestore snapshot error:", err);
    });

    return () => unsubscribe();
  }, []);

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
    saveToFirestore({ personalInfo: info });
  };

  const addSkill = (skill: SkillItem) => {
    const updated = [...skills, skill];
    setSkills(updated);
    saveToFirestore({ skills: updated });
  };

  const updateSkill = (index: number, skill: SkillItem) => {
    const updated = skills.map((item, i) => (i === index ? skill : item));
    setSkills(updated);
    saveToFirestore({ skills: updated });
  };

  const deleteSkill = (index: number) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
    saveToFirestore({ skills: updated });
  };

  const addProject = (project: ProjectItem) => {
    const updated = [project, ...projects];
    setProjects(updated);
    saveToFirestore({ projects: updated });
  };

  const updateProject = (id: string, project: ProjectItem) => {
    const updated = projects.map(p => (p.id === id ? project : p));
    setProjects(updated);
    saveToFirestore({ projects: updated });
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    saveToFirestore({ projects: updated });
  };

  const addExperience = (exp: ExperienceItem) => {
    const updated = [exp, ...experience];
    setExperience(updated);
    saveToFirestore({ experience: updated });
  };

  const updateExperience = (id: string, exp: ExperienceItem) => {
    const updated = experience.map(e => (e.id === id ? exp : e));
    setExperience(updated);
    saveToFirestore({ experience: updated });
  };

  const deleteExperience = (id: string) => {
    const updated = experience.filter(e => e.id !== id);
    setExperience(updated);
    saveToFirestore({ experience: updated });
  };

  const addTestimonial = (testi: TestimonialItem) => {
    const updated = [...testimonials, testi];
    setTestimonials(updated);
    saveToFirestore({ testimonials: updated });
  };

  const updateTestimonial = (id: string, testi: TestimonialItem) => {
    const updated = testimonials.map(t => (t.id === id ? testi : t));
    setTestimonials(updated);
    saveToFirestore({ testimonials: updated });
  };

  const deleteTestimonial = (id: string) => {
    const updated = testimonials.filter(t => t.id !== id);
    setTestimonials(updated);
    saveToFirestore({ testimonials: updated });
  };

  const addFaq = (faq: FaqItem) => {
    const updated = [...faqs, faq];
    setFaqs(updated);
    saveToFirestore({ faqs: updated });
  };

  const updateFaq = (index: number, faq: FaqItem) => {
    const updated = faqs.map((f, i) => (i === index ? faq : f));
    setFaqs(updated);
    saveToFirestore({ faqs: updated });
  };

  const deleteFaq = (index: number) => {
    const updated = faqs.filter((_, i) => i !== index);
    setFaqs(updated);
    saveToFirestore({ faqs: updated });
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
    saveToFirestore({
      personalInfo: defaultPersonalInfo,
      skills: defaultSkills,
      projects: defaultProjects,
      experience: defaultExperience,
      testimonials: defaultTestimonials,
      faqs: defaultFaqs,
      socialLinks: defaultSocialLinks,
    });
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
        isCloudSynced
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

