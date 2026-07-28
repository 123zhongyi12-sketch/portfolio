import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProjectCard from "@/components/ProjectCard";
import SkillCloud from "@/components/SkillCloud";
import { getProfile, getResume, getProjectsForResume } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "钟懿 | 云运维工程师",
};

export default function OpsPage() {
  const profile = getProfile();
  const resume = getResume("ops")!;
  const projects = getProjectsForResume("ops");

  return (
    <>
      <Header title={profile.name} />
      <main>
        <HeroSection resumeSlug="ops" />

        <section className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="mb-8 text-center text-2xl font-bold">关于我</h2>
          <p className="text-center text-lg leading-relaxed text-text-secondary">{resume.about}</p>
          <div className="mt-8">
            <SkillCloud skills={resume.skills} />
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-8 text-center text-2xl font-bold">项目与成果</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
