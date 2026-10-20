import type { SkillDetail } from "@/lib/types";

interface SkillCloudProps {
  skills: string[];
  softSkills: string[];
  details?: SkillDetail[];
}

export default function SkillCloud({ skills, softSkills, details }: SkillCloudProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-center text-sm font-semibold tracking-wider text-accent uppercase">
          技术栈
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg border border-dark-border bg-dark-card px-4 py-2 text-sm text-text-secondary transition-all hover:border-accent/50 hover:text-accent"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-center text-sm font-semibold tracking-wider text-accent-secondary uppercase">
          软技能
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {softSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg border border-dark-border bg-dark-card px-4 py-2 text-sm text-text-secondary transition-all hover:border-accent-secondary/50 hover:text-accent-secondary"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {details && details.length > 0 && (
        <div>
          <h3 className="mb-4 text-center text-sm font-semibold tracking-wider text-accent uppercase">
            能力明细
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {details.map((item) => (
              <div
                key={item.category}
                className="rounded-lg border border-dark-border bg-dark-card p-5 transition-colors hover:border-accent/40"
              >
                <p className="mb-2 text-sm font-semibold text-accent">{item.category}</p>
                <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
