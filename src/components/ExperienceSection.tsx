import { getWorkExperiencesForResume } from "@/lib/data";
import { Building2, Briefcase } from "lucide-react";

interface ExperienceSectionProps {
  resumeSlug: string;
}

export default function ExperienceSection({ resumeSlug }: ExperienceSectionProps) {
  const experiences = getWorkExperiencesForResume(resumeSlug);
  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-20">
      <h2 className="mb-8 text-center text-2xl font-bold">
        <span className="inline-flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-accent-secondary" />
          实习经历
        </span>
      </h2>
      <div className="space-y-6">
        {experiences.map((exp, i) => (
          <div key={i} className="rounded-lg border border-dark-border bg-dark-card p-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-bold">
                  <Building2 className="h-4 w-4 text-accent-secondary" />
                  {exp.company}
                </h3>
                <p className="mt-1 text-sm text-accent-secondary">
                  {exp.department}
                  {exp.role ? ` · ${exp.role}` : ""}
                </p>
              </div>
              <span className="text-sm text-text-muted">{exp.period}</span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              {exp.overview}
            </p>

            <div className="mt-5 space-y-4 border-t border-dark-border pt-5">
              {exp.projects.map((project, j) => (
                <div key={j}>
                  <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-accent">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md border border-accent/30 bg-accent/10 text-xs">
                      {j + 1}
                    </span>
                    {project.name}
                  </p>
                  <ul className="ml-7 space-y-1.5">
                    {project.details.map((detail, k) => (
                      <li key={k} className="flex gap-2 text-sm leading-relaxed text-text-secondary">
                        <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-accent/60" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
