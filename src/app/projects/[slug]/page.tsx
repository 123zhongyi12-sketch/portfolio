import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectFileTree from "@/components/ProjectFileTree";
import ImageGallery from "@/components/ImageGallery";
import { getProfile, getProject, getProjects } from "@/lib/data";
import { getProjectContent } from "@/lib/project-content";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: `${project.title} | 钟懿` };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const profile = getProfile();
  const project = getProject(slug);
  if (!project) notFound();

  const content = getProjectContent(slug);

  return (
    <>
      <Header title={profile.name} />
      <main className="mx-auto max-w-6xl px-6 pt-24 pb-16">
        <Link
          href={project.category === "portfolio" ? "/portfolio" : "/"}
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          {project.category === "portfolio" ? "返回作品集" : "返回首页"}
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            {project.tags.map((tag) => (
              <span key={tag} className="text-sm text-text-muted">#{tag}</span>
            ))}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1 text-sm text-accent hover:underline"
              >
                GitHub <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        {(project.category === "code" || project.category === "portfolio") && content.structure ? (
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            <div className="lg:sticky lg:top-20 lg:self-start">
              <ProjectFileTree structure={content.structure} />
            </div>
            <div>
              <ProjectDetailContent project={project} content={content} />
            </div>
          </div>
        ) : (
          <ProjectDetailContent project={project} content={content} />
        )}
      </main>
      <Footer />
    </>
  );
}

function ProjectDetailContent({
  project,
  content,
}: {
  project: Awaited<ReturnType<typeof getProject>>;
  content: Awaited<ReturnType<typeof getProjectContent>>;
}) {
  if (!project) return null;

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-dark-border bg-dark-card p-6">
        <h2 className="mb-4 text-xl font-bold">项目介绍</h2>
        <div className="prose prose-invert max-w-none text-text-secondary">
          {content.markdown.split("\n").map((line: string, i: number) => (
            line.trim() ? <p key={i} className="mb-3 last:mb-0">{line}</p> : null
          ))}
        </div>
      </div>

      {project.techStack && project.techStack.length > 0 && (
        <div className="rounded-lg border border-dark-border bg-dark-card p-6">
          <h2 className="mb-4 text-xl font-bold">技术栈</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech: string) => (
              <span
                key={tech}
                className="rounded-md border border-accent/20 bg-accent/5 px-3 py-1 text-sm text-accent"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {content.images.length > 0 && project.category === "certification" ? (
        <div className="rounded-lg border border-dark-border bg-dark-card p-6">
          <h2 className="mb-4 text-xl font-bold">证书展示</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.images.map((img, i) => (
              <div key={i} className="overflow-hidden rounded-lg border border-dark-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`${project.title} - ${i + 1}`}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      ) : content.images.length > 0 && (
        <div className="rounded-lg border border-dark-border bg-dark-card p-6">
          <h2 className="mb-4 text-xl font-bold">截图展示</h2>
          <ImageGallery images={content.images} title={project.title} />
        </div>
      )}

      {project.summary && (
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-6">
          <h2 className="mb-4 text-xl font-bold text-accent">我的总结</h2>
          <p className="leading-relaxed text-text-secondary">{project.summary}</p>
        </div>
      )}
    </div>
  );
}
