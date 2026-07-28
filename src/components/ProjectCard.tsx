import Link from "next/link";
import { Project } from "@/lib/types";
import { ArrowUpRight, FolderClosed, Award, BadgeCheck } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

const categoryIcons = {
  code: FolderClosed,
  achievement: Award,
  certification: BadgeCheck,
};

const categoryLabels: Record<string, string> = {
  code: "项目",
  achievement: "成果",
  certification: "认证",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const Icon = categoryIcons[project.category];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group rounded-lg border border-dark-border bg-dark-card p-6 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-accent-secondary" />
        <span className="text-xs text-text-muted">{categoryLabels[project.category]}</span>
        {project.year && <span className="text-xs text-text-muted">· {project.year}</span>}
      </div>
      <h3 className="mb-2 text-lg font-bold text-text-primary group-hover:text-accent transition-colors">
        {project.title}
        <ArrowUpRight className="ml-1 inline h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
      </h3>
      <p className="mb-4 text-sm text-text-secondary">{project.description}</p>
      {project.tags && (
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded bg-dark-border px-2 py-0.5 text-xs text-text-muted">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
