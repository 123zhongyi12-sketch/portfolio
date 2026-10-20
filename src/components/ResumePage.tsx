import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProjectCard from "@/components/ProjectCard";
import SkillCloud from "@/components/SkillCloud";
import EducationSection from "@/components/EducationSection";
import CampusSection from "@/components/CampusSection";
import PortfolioSection from "@/components/PortfolioSection";
import ExperienceSection from "@/components/ExperienceSection";
import { getProfile, getResume, getProjectsForResume } from "@/lib/data";

interface ResumePageProps {
  resumeSlug: string;
}

/**
 * 简历方向页面的统一布局。
 * 所有入口（/?r=xxx 以及 /presales、/ops、/cloud-security）共用本组件，
 * 新增板块只需改这里，避免多处重复维护。
 */
export default function ResumePage({ resumeSlug }: ResumePageProps) {
  const profile = getProfile();
  const resume = getResume(resumeSlug);
  if (!resume) return null;

  const projects = getProjectsForResume(resumeSlug);

  return (
    <>
      <Header title={profile.name} />
      <main>
        <HeroSection resumeSlug={resumeSlug} />

        <section id="skills" className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="mb-8 text-center text-2xl font-bold">掌握技能</h2>
          <SkillCloud
            skills={resume.skills}
            softSkills={resume.softSkills}
            details={resume.skillDetails}
          />
        </section>

        <ExperienceSection resumeSlug={resumeSlug} />

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
