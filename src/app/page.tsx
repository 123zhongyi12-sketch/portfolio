"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProjectCard from "@/components/ProjectCard";
import SkillCloud from "@/components/SkillCloud";
import EducationSection from "@/components/EducationSection";
import CampusSection from "@/components/CampusSection";
import PortfolioSection from "@/components/PortfolioSection";
import { getProfile, getResume, getProjectsForResume } from "@/lib/data";

const validSlugs = ["presales", "ops", "cloud-security", "general"];
const defaultSlug = "presales";

// 短参数代号映射: ?r=p / ?r=o / ?r=c / ?r=g
const shortCodeMap: Record<string, string> = {
  p: "presales",
  o: "ops",
  c: "cloud-security",
  g: "general",
};

const titles: Record<string, string> = {
  presales: "钟懿 | 解决方案技术支持工程师",
  ops: "钟懿 | IT运维工程师",
  "cloud-security": "钟懿 | 云安全工程师",
  general: "钟懿",
};

function ResumeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const urlSlug = searchParams.get("resume") || searchParams.get("r");
  const shortCode = searchParams.get("r");
  const envSlug = process.env.NEXT_PUBLIC_RESUME_SLUG;
  // 优先级: 短代号 > 完整 slug > 环境变量
  const resumeSlug = (shortCode && shortCodeMap[shortCode]) ? shortCodeMap[shortCode]
    : (urlSlug && validSlugs.includes(urlSlug)) ? urlSlug
    : (envSlug && validSlugs.includes(envSlug)) ? envSlug
    : null;

  // 更新页面标题
  useEffect(() => {
    if (resumeSlug && titles[resumeSlug]) {
      document.title = titles[resumeSlug];
    }
  }, [resumeSlug]);

  // Redirect to default if no valid slug
  useEffect(() => {
    if (mounted && !resumeSlug) {
      router.replace(`/?r=p`);
    }
  }, [mounted, resumeSlug, router]);

  if (!mounted || !resumeSlug) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <p className="text-text-muted">加载中...</p>
      </div>
    );
  }

  const profile = getProfile();
  const resume = getResume(resumeSlug)!;
  const projects = getProjectsForResume(resumeSlug);

  return (
    <>
      <Header title={profile.name} />
      <main>
        <HeroSection resumeSlug={resumeSlug} />

        <section id="skills" className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="mb-8 text-center text-2xl font-bold">掌握技能</h2>
          <SkillCloud skills={resume.skills} softSkills={resume.softSkills} />
        </section>

        <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-8 text-center text-2xl font-bold">项目与成果</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <PortfolioSection />

        <EducationSection resumeSlug={resumeSlug} />

        <CampusSection />
      </main>
      <Footer />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <p className="text-text-muted">加载中...</p>
      </div>
    }>
      <ResumeContent />
    </Suspense>
  );
}
