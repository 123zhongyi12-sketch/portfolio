import { getEducation, getResume } from "@/lib/data";
import { GraduationCap } from "lucide-react";

interface EducationSectionProps {
  resumeSlug: string;
}

export default function EducationSection({ resumeSlug }: EducationSectionProps) {
  const edu = getEducation();
  const resume = getResume(resumeSlug);

  return (
    <section id="education" className="mx-auto max-w-4xl px-6 py-20">
      <h2 className="mb-8 text-center text-2xl font-bold">
        <span className="inline-flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-accent-secondary" />
          教育背景
        </span>
      </h2>
      <div className="rounded-lg border border-dark-border bg-dark-card p-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold">{edu.school}</h3>
            <p className="text-text-muted">{edu.degree} · {edu.major}</p>
          </div>
          <span className="text-sm text-text-muted">{edu.period}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {edu.courses.map((course) => (
            <span key={course} className="rounded-md border border-accent/20 bg-accent/5 px-3 py-1 text-xs text-accent">
              {course}
            </span>
          ))}
        </div>
        {edu.note && (
          <p className="mt-3 text-sm text-text-muted">{edu.note}</p>
        )}
      </div>
    </section>
  );
}
