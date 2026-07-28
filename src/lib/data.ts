import { Profile, Resume, Project } from "./types";
import profileData from "../../data/profile.json";
import resumesData from "../../data/resumes.json";
import projectsData from "../../data/projects.json";

export function getProfile(): Profile {
  return profileData as Profile;
}

export function getResume(slug: string): Resume | undefined {
  return (resumesData as Resume[]).find((r) => r.slug === slug);
}

export function getAllResumes(): Resume[] {
  return resumesData as Resume[];
}

export function getProjects(): Project[] {
  return projectsData as Project[];
}

export function getProject(slug: string): Project | undefined {
  return (projectsData as Project[]).find((p) => p.slug === slug);
}

export function getProjectsForResume(resumeSlug: string): Project[] {
  const resume = getResume(resumeSlug);
  if (!resume) return [];
  const orderMap = new Map(resume.projectOrder.map((s, i) => [s, i]));
  return (projectsData as Project[])
    .filter((p) => p.resumeTargets.includes(resumeSlug as any))
    .sort((a, b) => (orderMap.get(a.slug) ?? 999) - (orderMap.get(b.slug) ?? 999));
}
