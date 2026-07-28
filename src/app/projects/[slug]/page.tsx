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
          </div>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-5 py-2.5 text-base font-medium text-accent transition-all hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/25"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              查看源码 <ExternalLink className="h-4 w-4" />
            </a>
          )}
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
