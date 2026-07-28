import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Code2, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProfile, getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "作品集 | 钟懿",
};

export default function PortfolioPage() {
  const profile = getProfile();
  const projects = getProjects().filter((p) => p.category === "portfolio");

  return (
    <>
      <Header title={profile.name} />
      <main className="mx-auto max-w-6xl px-6 pt-24 pb-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          返回首页
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <Code2 className="h-7 w-7 text-accent" />
            <h1 className="text-3xl font-bold">作品集</h1>
          </div>
          <p className="text-text-secondary">
            独立开发的软件项目与课程实践作品
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group rounded-lg border border-dark-border bg-dark-card p-6 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="mb-3 flex items-center gap-2">
                <Code2 className="h-4 w-4 text-accent-secondary" />
                <span className="text-xs text-text-muted">作品集</span>
                {project.year && <span className="text-xs text-text-muted">· {project.year}</span>}
                {project.githubUrl && (
                  <span className="ml-auto text-xs text-text-muted">有源码</span>
                )}
              </div>
              <h2 className="mb-2 text-xl font-bold text-text-primary group-hover:text-accent transition-colors">
                {project.title}
                <ArrowUpRight className="ml-1 inline h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </h2>
              <p className="mb-4 text-sm text-text-secondary">{project.description}</p>
              {project.tags && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-dark-border px-2 py-0.5 text-xs text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
