interface SkillCloudProps {
  skills: string[];
  softSkills: string[];
}

export default function SkillCloud({ skills, softSkills }: SkillCloudProps) {
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
    </div>
  );
}
