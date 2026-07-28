import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProjectCard from "@/components/ProjectCard";
import SkillCloud from "@/components/SkillCloud";
import EducationSection from "@/components/EducationSection";
import CampusSection from "@/components/CampusSection";
import PortfolioSection from "@/components/PortfolioSection";
import { getProfile, getResume, getProjectsForResume, getAllResumes } from "@/lib/data";

export const dynamic = "force-static";

export default function Home() {
  const resumeSlug = process.env.NEXT_PUBLIC_RESUME_SLUG;

  // If no env var set, redirect to presales (default behavior)
  if (!resumeSlug) {
    redirect("/presales");
  }

  // Validate the slug
  const resumes = getAllResumes();
  const validSlugs = resumes.map((r) => r.slug);
  if (!validSlugs.includes(resumeSlug)) {
    redirect("/presales");
  }

  // Render the standalone site for the specified resume
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
