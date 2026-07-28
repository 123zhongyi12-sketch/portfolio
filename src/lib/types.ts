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

export interface Resume {
  slug: string;
  title: string;
  subtitle: string;
  about: string;
  skills: string[];
  softSkills: string[];
  projectOrder: string[];
  highlights: string[];
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
  resumeTargets: ("presales" | "ops" | "cloud-security")[];
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
