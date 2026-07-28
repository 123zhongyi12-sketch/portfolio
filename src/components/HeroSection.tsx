import { getProfile, getResume } from "@/lib/data";

interface HeroSectionProps {
  resumeSlug: string;
}

export default function HeroSection({ resumeSlug }: HeroSectionProps) {
  const profile = getProfile();
  const resume = getResume(resumeSlug);

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 pt-16 text-center">
      <div className="mb-6 h-24 w-24 rounded-full bg-gradient-to-br from-accent to-accent-secondary p-0.5">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-dark-bg text-3xl font-bold text-accent">
          {profile.name[0]}
        </div>
      </div>
      <h1 className="mb-2 text-4xl font-bold md:text-5xl">
        {profile.name}
      </h1>
      {resume && (
        <>
          <p className="mb-2 text-xl text-accent-secondary">{resume.title}</p>
          <p className="mb-6 text-text-muted">{resume.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {resume.highlights.map((h, i) => (
              <span key={i} className="rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-sm text-accent">
                {h}
              </span>
            ))}
          </div>
        </>
      )}
      <p className="mt-8 max-w-2xl text-lg text-text-secondary">
        {profile.tagline}
      </p>
      <a
        href="#projects"
        className="mt-8 rounded-lg bg-accent px-6 py-3 font-medium text-white transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25"
      >
        查看我的项目 ↓
      </a>
    </section>
  );
}
