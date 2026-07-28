import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProjectCard from "@/components/ProjectCard";
import SkillCloud from "@/components/SkillCloud";
import EducationSection from "@/components/EducationSection";
import CampusSection from "@/components/CampusSection";
import PortfolioSection from "@/components/PortfolioSection";
import { getProfile, getResume, getProjectsForResume } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "钟懿 | 解决方案技术支持工程师",
};

export default function PresalesPage() {
  const profile = getProfile();
  const resume = getResume("presales")!;
  const projects = getProjectsForResume("presales");

  return (
    <>
      <Header title={profile.name} />
      <main>
        <HeroSection resumeSlug="presales" />

        {/* 技能 */}
        <section id="skills" className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="mb-8 text-center text-2xl font-bold">掌握技能</h2>
          <SkillCloud skills={resume.skills} softSkills={resume.softSkills} />
        </section>

        {/* 项目 */}
        <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-8 text-center text-2xl font-bold">项目与成果</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* 作品集 */}
        <PortfolioSection />

        {/* 教育背景 */}
        <EducationSection resumeSlug="presales" />

        {/* 校园经历 */}
        <CampusSection />
      </main>
      <Footer />
    </>
  );
}
