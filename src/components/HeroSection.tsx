import { getProfile, getResume } from "@/lib/data";

interface HeroSectionProps {
  resumeSlug: string;
}

const strengths: Record<string, string> = {
  presales:
    "具备扎实的云计算技术功底（HCIE认证）与AI应用能力，能站在客户业务视角将复杂技术转化为通俗易懂的商业解决方案。拥有华为ICT大赛全球一等奖的实战证明，具备优秀的方案撰写、公众演讲与跨部门沟通能力。性格外向、皮实抗压，立志成为既懂技术又懂客户的售前工程师。",
  ops:
    "拥有HCIE云计算专家级认证及HCIP/HCIA等多领域认证，具备从架构设计到部署运维的全栈能力。独立完成企业级云上架构设计与交付，熟练掌握华为云全栈产品、Docker/K8s容器化及Linux运维。以结果为导向，执行力强，能快速掌握新领域并解决实际问题。",
  cloudSecurity:
    "以HCIE认证为基础构建了从底层架构到上层安全的完整知识体系，深入理解云上安全边界设计、等保合规要求及IAM访问控制。具备企业级云架构设计与安全防护方案的落地经验，能将安全合规与业务需求有机结合，提供端到端的安全解决方案。",
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
          <p className="relative mb-6 text-text-muted">{resume.subtitle}</p>

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
