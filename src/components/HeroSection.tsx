import { getProfile, getResume } from "@/lib/data";

interface HeroSectionProps {
  resumeSlug: string;
}

const strengths: Record<string, string> = {
  presales:
    "具备扎实的云计算技术功底（HCIE认证）与AI应用能力，能站在客户业务视角将复杂技术转化为通俗易懂的商业解决方案。拥有华为ICT大赛全球一等奖的实战证明，具备优秀的方案撰写、公众演讲与跨部门沟通能力。性格外向、皮实抗压，立志成为既懂技术又懂客户的解决方案技术支持工程师。",
  ops:
    "具备Linux、虚拟化及容器技术基础，熟悉Docker容器化部署与Kubernetes编排，能够独立完成企业级应用的容器化改造与集群管理。熟悉基础设施的运维与调优，具备良好的问题定位和故障排查能力，学习能力强，执行力强，能够快速适应企业运维环境，保障业务持续稳定运行。",
  cloudSecurity:
    "具备云安全加固思想及云计算技术基础，对云平台安全、基础设施安全、应用安全等有浓厚兴趣，具备强大的自我驱动力和学习能力。能够将企业级需求拆解为具体技术问题，并通过实践寻找解决方案。坚持任何人对资源的访问使用只能保障合法人的合法权益的安全原则。",
  general:
    "对云和AI有浓厚的学习兴趣，掌握Python、熟悉Go语言，执行力强，理解AI/LLM原理，对技术的更新迭代保持热切关注。皮实抗压，对事情认真负责，待人友好热情，富有团队凝聚力，沟通能力强。具备云计算全栈架构设计与交付能力、Docker/K8s容器化全栈交付与AI Agent应用开发实践经验。",
};

export default function HeroSection({ resumeSlug }: HeroSectionProps) {
  const profile = getProfile();
  const resume = getResume(resumeSlug);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center">
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

      {/* 联系方式 */}
      <div className="relative mb-10 flex flex-wrap items-center justify-center gap-3 rounded-xl border border-accent/15 bg-accent/[0.03] px-6 py-3 backdrop-blur-sm">
        <a href={`mailto:${profile.contacts.email}`} className="flex items-center gap-2 text-base text-text-secondary hover:text-accent transition-colors group">
          <svg className="h-5 w-5 text-accent/70 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          <span className="group-hover:text-accent transition-colors">{profile.contacts.email}</span>
        </a>
        <span className="hidden sm:block text-dark-border">|</span>
        <a href={profile.contacts.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base text-text-secondary hover:text-accent transition-colors group">
          <svg className="h-5 w-5 text-accent/70 group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          <span className="group-hover:text-accent transition-colors">GitHub</span>
        </a>
        {profile.contacts.phone && (
          <>
            <span className="hidden sm:block text-dark-border">|</span>
            <span className="flex items-center gap-2 text-base text-text-secondary">
              <svg className="h-5 w-5 text-accent/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <span>{profile.contacts.phone}</span>
            </span>
          </>
        )}
      </div>

      {/* 姓名 + 头衔 */}
      <h1 className="relative mb-2 text-4xl font-bold md:text-5xl">
        {profile.name}
      </h1>
      {resume && (
        <>
          {resume.title && <p className="relative mb-2 text-xl text-accent-secondary">{resume.title}</p>}
          {resume.subtitle && <p className="relative mb-6 text-text-muted">{resume.subtitle}</p>}

          {/* 高亮标签 */}
          <div className="relative flex flex-wrap justify-center gap-3">
            {resume.highlights.map((h, i) => (
              <span key={i} className="rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-sm text-accent backdrop-blur-sm">
                {h}
              </span>
            ))}
          </div>

          {/* 个人优势段落 */}
          <div className="relative mt-8 max-w-3xl rounded-lg border border-accent/10 bg-accent/[0.02] p-6 text-left">
            <h2 className="mb-3 text-sm font-semibold tracking-wider text-accent uppercase">个人优势</h2>
            <p className="leading-relaxed text-text-secondary">
              {strengths[resumeSlug]}
            </p>
          </div>
        </>
      )}

      {/* CTA */}
      <a
        href="#skills"
        className="relative mt-8 rounded-lg bg-accent px-6 py-3 font-medium text-white transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25"
      >
        了解更多 ↓
      </a>
    </section>
  );
}
