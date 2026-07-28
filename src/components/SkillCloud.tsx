interface SkillCloudProps {
  skills: string[];
}

export default function SkillCloud({ skills }: SkillCloudProps) {
  return (
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
  );
}
