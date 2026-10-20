export interface Profile {
  name: string;
  nameEn: string;
  avatar: string;
  tagline: string;
  summary: string;
  contacts: {
    email: string;
    github: string;
    wechat?: string;
    phone?: string;
  };
}

export interface SkillDetail {
  category: string;
  description: string;
}

export interface Resume {
  slug: string;
  title: string;
  subtitle: string;
  about: string;
  skills: string[];
  softSkills: string[];
  skillDetails?: SkillDetail[];
  projectOrder: string[];
  highlights: string[];
}

export interface WorkExperienceProject {
  name: string;
  details: string[];
}

export interface WorkExperience {
  company: string;
  department: string;
  role: string;
  period: string;
  overview: string;
  /** 限定在哪些简历方向展示；不填则全站展示 */
  resumeTargets?: string[];
  projects: WorkExperienceProject[];
}

export interface Education {
  school: string;
  major: string;
  degree: string;
  period: string;
  courses: string[];
  note?: string;
}

export interface CampusExperience {
  title: string;
  role: string;
  period: string;
  items: string[];
  type: "organization" | "volunteer" | "honor";
}

export interface Project {
  slug: string;
  title: string;
  category: "code" | "achievement" | "certification" | "portfolio";
  description: string;
  tags: string[];
  techStack?: string[];
  image: string;
  images?: string[];
  githubUrl?: string;
  year: string;
  resumeTargets: ("presales" | "ops" | "cloud-security" | "general")[];
  summary?: string;
}

export interface ProjectContent {
  markdown: string;
  structure?: FileNode[];
  images: string[];
}

export interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
}
