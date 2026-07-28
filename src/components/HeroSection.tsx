import { getProfile, getResume } from "@/lib/data";

interface HeroSectionProps {
  resumeSlug: string;
}

export default function HeroSection({ resumeSlug }: HeroSectionProps) {
  const profile = getProfile();
  const resume = getResume(resumeSlug);

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center">
      {/* 网格背景 */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* 径向渐变光晕 */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[400px] w-[400px] rounded-full bg-accent-secondary/8 blur-[100px]" />

      {/* 浮动技能标签装饰 */}
      {resume && (
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {resume.skills.slice(0, 8).map((skill, i) => {
            const angle = (i / 8) * 360;
            const radius = 200 + Math.random() * 100;
            const x = 50 + (radius * Math.cos((angle * Math.PI) / 180)) / 6;
            const y = 50 + (radius * Math.sin((angle * Math.PI) / 180)) / 6;
            return (
              <span
                key={skill}
                className="absolute animate-pulse text-sm text-accent/20"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: "3s",
                }}
              >
                {skill}
              </span>
            );
          })}
        </div>
      )}

      {/* 头像 */}
      <div className="relative mb-6 h-24 w-24 rounded-full bg-gradient-to-br from-accent to-accent-secondary p-0.5 shadow-lg shadow-accent/20">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-dark-bg text-3xl font-bold text-accent">
          {profile.name[0]}
        </div>
      </div>

      {/* 姓名 + 头衔 */}
      <h1 className="relative mb-2 text-4xl font-bold md:text-5xl">
        {profile.name}
      </h1>
      {resume && (
        <>
          <p className="relative mb-2 text-xl text-accent-secondary">{resume.title}</p>
          <p className="relative mb-4 text-text-muted">{resume.subtitle}</p>

          {/* 高亮标签 */}
          <div className="relative flex flex-wrap justify-center gap-3">
            {resume.highlights.map((h, i) => (
              <span key={i} className="rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-sm text-accent backdrop-blur-sm">
                {h}
              </span>
            ))}
          </div>

          {/* 技能列表 — 直接展示在 Hero 区 */}
          <div className="relative mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
            {resume.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-dark-border bg-dark-card/80 px-3 py-1 text-xs text-text-muted backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-accent"
              >
                {skill}
              </span>
            ))}
          </div>
        </>
      )}

      {/* tagline */}
      <p className="relative mt-6 max-w-2xl text-lg text-text-secondary">
        {profile.tagline}
      </p>

      {/* CTA */}
      <a
        href="#projects"
        className="relative mt-8 rounded-lg bg-accent px-6 py-3 font-medium text-white transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25"
      >
        查看我的项目 ↓
      </a>
    </section>
  );
}
