import { getCampusExperiences } from "@/lib/data";
import { Users, HeartHandshake, Award } from "lucide-react";

const typeIcons = {
  organization: Users,
  volunteer: HeartHandshake,
  honor: Award,
};

const typeLabels: Record<string, string> = {
  organization: "组织经历",
  volunteer: "志愿服务",
  honor: "荣誉奖项",
};

export default function CampusSection() {
  const experiences = getCampusExperiences();

  return (
    <section id="campus" className="mx-auto max-w-4xl px-6 py-20">
      <h2 className="mb-8 text-center text-2xl font-bold">
        <span className="inline-flex items-center gap-2">
          <Users className="h-6 w-6 text-accent-secondary" />
          校园经历
        </span>
      </h2>
      <div className="space-y-6">
        {experiences.map((exp, i) => {
          const Icon = typeIcons[exp.type];
          return (
            <div key={i} className="rounded-lg border border-dark-border bg-dark-card p-6">
              <div className="mb-3 flex items-center gap-2">
                <Icon className="h-4 w-4 text-accent-secondary" />
                <span className="text-xs text-text-muted">{typeLabels[exp.type]}</span>
                <span className="text-xs text-text-muted">· {exp.period}</span>
              </div>
              <h3 className="mb-1 text-lg font-bold">{exp.title}</h3>
              {exp.role && <p className="mb-3 text-sm text-accent-secondary">{exp.role}</p>}
              <ul className="space-y-2">
                {exp.items.map((item, j) => (
                  <li key={j} className="flex gap-2 text-sm text-text-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
