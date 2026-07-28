# 钟懿个人作品集网站 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 构建一个可手动更新、科技暗色风的个人作品集网站，包含三个独立方向简历页（售前/运维/云安全）和项目详情页（左侧文件树+右侧内容）。

**Architecture:** Next.js 16 App Router + TypeScript + Tailwind CSS v4，所有用户内容存储在 `data/*.json` 和 `content/` 目录，构建时静态生成页面，部署到 Vercel。

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS v4, lucide-react, Vercel

## Global Constraints

- 三个方向页面（/presales, /ops, /cloud-security）之间不出现互相链接
- 所有用户可编辑内容集中在 `data/` 和 `content/` 目录，用户无需修改 `src/` 下的代码
- 科技暗色主题（深色背景 #0a0a0f，蓝/青色渐变点缀）
- 项目详情页采用左右分栏布局：左栏文件树，右栏内容
- 非代码类项目使用单栏布局（无文件树）
- 首页（/）自动重定向到 /presales

---

### Task 1: 项目脚手架与基础配置

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `src/app/globals.css`
- Create: `.gitignore`

**Interfaces:**
- Consumes: 无
- Produces: 可运行 `npm run dev` 的 Next.js 项目骨架

- [ ] **Step 1: 初始化 package.json**

```json
{
  "name": "zhongyi-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "16.1.7",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: 创建 next.config.ts**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
```

- [ ] **Step 4: 创建 postcss.config.mjs**

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

- [ ] **Step 5: 创建全局样式 src/app/globals.css**

```css
@import "tailwindcss";

@theme {
  --color-dark-bg: #0a0a0f;
  --color-dark-card: #12121a;
  --color-dark-border: #1e1e2e;
  --color-accent: #3b82f6;
  --color-accent-hover: #2563eb;
  --color-accent-secondary: #06b6d4;
  --color-text-primary: #e2e8f0;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;
  --font-sans: 'Geist Sans', 'Inter', system-ui, sans-serif;
  --font-mono: 'Geist Mono', 'JetBrains Mono', monospace;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-dark-bg);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
}

::selection {
  background-color: var(--color-accent);
  color: white;
}

/* 滚动条 */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--color-dark-bg);
}
::-webkit-scrollbar-thumb {
  background: var(--color-dark-border);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-muted);
}
```

- [ ] **Step 6: 创建 .gitignore**

```
node_modules/
.next/
out/
.env
.env.local
*.tsbuildinfo
next-env.d.ts
```

- [ ] **Step 7: 创建目录结构**

```bash
mkdir -p src/app/presales
mkdir -p src/app/ops
mkdir -p src/app/cloud-security
mkdir -p src/app/projects/\[slug\]
mkdir -p src/components
mkdir -p src/lib
mkdir -p data
mkdir -p content/projects/resume-assistant/images
mkdir -p content/projects/cloud-architecture/images
mkdir -p content/projects/huawei-ict/images
mkdir -p content/projects/psychology-station/images
mkdir -p public/images
```

- [ ] **Step 8: 安装依赖并验证**

```bash
cd C:\Users\钟懿\Desktop\portfolio
npm install
npm run dev
```
预期：Next.js 开发服务器在 localhost:3000 启动。暂时没有页面，访问会 404，后续任务会创建。

---

### Task 2: 数据层 - 类型定义 + JSON 数据文件

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/lib/data.ts`
- Create: `data/profile.json`
- Create: `data/resumes.json`
- Create: `data/projects.json`

- [ ] **Step 1: 创建类型定义 src/lib/types.ts**

```typescript
export interface Profile {
  name: string;
  nameEn: string;
  avatar: string;
  tagline: string;
  summary: string;
  contacts: {
    email: string;
    github: string;
    wechat?: string;
    phone?: string;
  };
}

export interface Resume {
  slug: string;
  title: string;
  subtitle: string;
  about: string;
  skills: string[];
  projectOrder: string[];
  highlights: string[];
}

export interface Project {
  slug: string;
  title: string;
  category: "code" | "achievement" | "certification";
  description: string;
  tags: string[];
  techStack?: string[];
  image: string;
  images?: string[];
  githubUrl?: string;
  year: string;
  resumeTargets: ("presales" | "ops" | "cloud-security")[];
  summary?: string;
}

export interface ProjectContent {
  markdown: string;
  structure?: FileNode[];
  images: string[];
}

export interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
}
```

- [ ] **Step 2: 创建数据加载工具 src/lib/data.ts**

```typescript
import { Profile, Resume, Project } from "./types";
import profileData from "../../data/profile.json";
import resumesData from "../../data/resumes.json";
import projectsData from "../../data/projects.json";

export function getProfile(): Profile {
  return profileData as Profile;
}

export function getResume(slug: string): Resume | undefined {
  return (resumesData as Resume[]).find((r) => r.slug === slug);
}

export function getAllResumes(): Resume[] {
  return resumesData as Resume[];
}

export function getProjects(): Project[] {
  return projectsData as Project[];
}

export function getProject(slug: string): Project | undefined {
  return (projectsData as Project[]).find((p) => p.slug === slug);
}

export function getProjectsForResume(resumeSlug: string): Project[] {
  const resume = getResume(resumeSlug);
  if (!resume) return [];
  const orderMap = new Map(resume.projectOrder.map((s, i) => [s, i]));
  return (projectsData as Project[])
    .filter((p) => p.resumeTargets.includes(resumeSlug as any))
    .sort((a, b) => (orderMap.get(a.slug) ?? 999) - (orderMap.get(b.slug) ?? 999));
}
```

- [ ] **Step 3: 创建 data/profile.json**

```json
{
  "name": "钟懿",
  "nameEn": "Zhong Yi",
  "avatar": "/images/avatar.jpg",
  "tagline": "既懂技术又懂客户的IT工作者",
  "summary": "性格外向，皮实抗压。拥有HCIE(云计算)、HCIP(大数据)、HCIA(AI)等华为认证，获华为ICT大赛全球一等奖(云赛道)。具备优秀的方案撰写、跨部门沟通与公众演讲能力，希望能成为既懂技术又懂客户的IT工作者。",
  "contacts": {
    "email": "zhongyi@example.com",
    "github": "https://github.com/zhongyi",
    "phone": "18682061419"
  }
}
```

- [ ] **Step 4: 创建 data/resumes.json**

```json
[
  {
    "slug": "presales",
    "title": "解决方案售前工程师",
    "subtitle": "云计算 · 方案设计 · 客户沟通",
    "about": "性格外向，皮实抗压。具备优秀的方案撰写、跨部门沟通与公众演讲能力。主导策划5+场大型校园活动，从方案撰写到预算申报到物资调配全流程负责，活动满意度达95%以上。拥有华为ICT大赛全球一等奖、HCIE/HCIP/HCIA等认证。希望能成为既懂技术又懂客户的IT工作者。",
    "skills": ["方案撰写", "客户沟通", "跨部门协调", "公众演讲", "云计算架构", "华为云", "项目管理", "需求分析"],
    "projectOrder": ["huawei-ict", "cloud-architecture", "resume-assistant", "certifications"],
    "highlights": ["华为ICT大赛全球一等奖", "HCIE(云计算)认证", "5+场大型活动策划", "学生会心理站站长"]
  },
  {
    "slug": "ops",
    "title": "云运维工程师",
    "subtitle": "云计算架构 · 自动化 · 运维管理",
    "about": "拥有HCIE(云计算)、HCIP(大数据)、HCIA(AI)等华为认证，具备14天独立设计云上架构并成功部署的实践经验。掌握云计算、大数据、AI等多领域技术栈，具备扎实的技术功底和快速学习能力。",
    "skills": ["云计算架构", "华为云", "Linux", "网络配置", "自动化运维", "Docker", "Kubernetes", "Python"],
    "projectOrder": ["cloud-architecture", "huawei-ict", "resume-assistant", "certifications"],
    "highlights": ["HCIE(云计算)专家级认证", "14天自主云架构部署", "HCIP(大数据)认证", "HCIA(AI)认证"]
  },
  {
    "slug": "cloud-security",
    "title": "云安全工程师",
    "subtitle": "云安全 · 合规 · 防护方案",
    "about": "拥有HCIE(云计算)、HCIP(大数据)、HCIA(AI)等多领域华为认证，具备从底层架构到上层应用的安全视角。熟悉云安全架构设计、合规要求和最佳实践。",
    "skills": ["云安全架构", "网络安全", "数据安全", "合规审计", "华为云安全", "IAM", "加密与证书", "安全评估"],
    "projectOrder": ["huawei-ict", "certifications", "cloud-architecture", "resume-assistant"],
    "highlights": ["HCIE(云计算)认证", "华为ICT全球一等奖", "云迁移工作级认证", "解决方案架构认证"]
  }
]
```

- [ ] **Step 5: 创建 data/projects.json**

```json
[
  {
    "slug": "resume-assistant",
    "title": "AI面试助手",
    "category": "code",
    "description": "基于大模型的AI面试准备助手，支持JD分析、多轮模拟面试、实时评分与总结报告",
    "tags": ["Next.js", "TypeScript", "AI Agent", "OpenAI", "Tailwind"],
    "techStack": ["Next.js", "TypeScript", "Tailwind CSS", "OpenRouter API", "AI Agent"],
    "image": "/images/projects/resume-assistant-cover.jpg",
    "images": ["/images/projects/resume-assistant-1.jpg"],
    "githubUrl": "https://github.com/zhongyi/resume-assistant",
    "year": "2026",
    "resumeTargets": ["presales", "ops", "cloud-security"],
    "summary": "这是一个具备面试流程控制能力的AI Agent，非简单问答。它基于岗位JD+分析结果+对话上下文进行推理，具备连续提问、结构化评分、自动生成总结报告等核心能力。"
  },
  {
    "slug": "cloud-architecture",
    "title": "14天自主设计云架构并部署",
    "category": "achievement",
    "description": "独立在14天内完成云上架构设计并成功部署，涵盖计算、网络、存储、安全等核心服务",
    "tags": ["华为云", "云架构", "部署", "网络", "安全"],
    "image": "/images/projects/cloud-architecture-cover.jpg",
    "images": ["/images/projects/cloud-architecture-1.jpg"],
    "year": "2026",
    "resumeTargets": ["presales", "ops", "cloud-security"],
    "summary": "在14天时间内，独立完成从需求分析、架构设计到部署上线的全流程，充分展示了扎实的云计算架构功底和快速学习能力。"
  },
  {
    "slug": "huawei-ict",
    "title": "华为ICT大赛全球一等奖",
    "category": "achievement",
    "description": "第十届华为ICT大赛全球总决赛云赛道全球一等奖",
    "tags": ["华为ICT", "云计算", "全球一等奖"],
    "image": "/images/projects/huawei-ict-cover.jpg",
    "images": ["/images/projects/huawei-ict-cert.jpg"],
    "year": "2026",
    "resumeTargets": ["presales", "ops", "cloud-security"],
    "summary": "在华为ICT大赛全球总决赛云赛道中获得全球一等奖，与全球顶尖选手同台竞技，展现了扎实的云计算技术实力。"
  },
  {
    "slug": "certifications",
    "title": "华为认证体系",
    "category": "certification",
    "description": "HCIE(云计算)、HCIP(大数据)、HCIA(AI)、云迁移工作级、解决方案架构工作级",
    "tags": ["HCIE", "HCIP", "HCIA", "华为认证"],
    "image": "/images/projects/certifications-cover.jpg",
    "images": [],
    "year": "2025-2026",
    "resumeTargets": ["presales", "ops", "cloud-security"],
    "summary": "系统性地获得了从专家级(HCIE)到工程师级的Huawei认证体系，覆盖云计算、大数据、AI三大方向。"
  },
  {
    "slug": "psychology-station",
    "title": "学生会心理站站长",
    "category": "achievement",
    "description": "主导策划5+场大型活动，活动满意度95%以上，锻炼极强的跨部门沟通与资源整合能力",
    "tags": ["团队管理", "活动策划", "沟通协调"],
    "image": "/images/projects/psychology-station-cover.jpg",
    "images": [],
    "year": "2023-2024",
    "resumeTargets": ["presales"],
    "summary": "作为学生会心理站站长，主导策划新生破冰、元宵游园会等5+场大型活动，覆盖全院师生。从方案撰写、预算申报到物资调配全流程负责，活动满意度达95%以上。"
  }
]
```

---

### Task 3: 全局布局 + 主题 + 导航组件

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/components/Header.tsx`
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: 创建全局布局 src/app/layout.tsx**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "钟懿 | 解决方案售前工程师",
  description: "既懂技术又懂客户的IT工作者 - 云计算/售前/运维/云安全",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="min-h-screen bg-dark-bg text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: 创建导航组件 src/components/Header.tsx**

```tsx
import Link from "next/link";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-dark-border bg-dark-bg/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold text-text-primary hover:text-accent transition-colors">
          {title}
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="#projects" className="text-text-secondary hover:text-accent transition-colors">
            项目
          </Link>
          <Link href="#contact" className="text-text-secondary hover:text-accent transition-colors">
            联系我
          </Link>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: 创建页脚组件 src/components/Footer.tsx**

```tsx
import { getProfile } from "@/lib/data";

export default function Footer() {
  const profile = getProfile();
  return (
    <footer id="contact" className="border-t border-dark-border py-12">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="mb-6 text-2xl font-bold">联系我</h2>
        <div className="flex flex-col items-center gap-3 text-text-secondary">
          <a href={`mailto:${profile.contacts.email}`} className="hover:text-accent transition-colors">
            {profile.contacts.email}
          </a>
          <a href={profile.contacts.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            GitHub
          </a>
          {profile.contacts.phone && (
            <span className="text-text-muted">{profile.contacts.phone}</span>
          )}
        </div>
        <p className="mt-8 text-sm text-text-muted">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

---

### Task 4: 首页 / 重定向页面

**Files:**
- Create: `src/app/page.tsx`

- [ ] **Step 1: 创建首页重定向页面**

```tsx
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/presales");
}
```

---

### Task 5: 简历方向页面组件

**Files:**
- Create: `src/app/presales/page.tsx`
- Create: `src/app/ops/page.tsx`
- Create: `src/app/cloud-security/page.tsx`
- Create: `src/components/HeroSection.tsx`
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/SkillCloud.tsx`

- [ ] **Step 1: 创建 HeroSection 组件**

```tsx
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
        <div className="h-full w-full rounded-full bg-dark-bg flex items-center justify-center text-3xl font-bold text-accent">
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
```

- [ ] **Step 2: 创建 ProjectCard 组件**

```tsx
import Link from "next/link";
import { Project } from "@/lib/types";
import { ArrowUpRight, FolderCode, Award, Certificate } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

const categoryIcons = {
  code: FolderCode,
  achievement: Award,
  certification: Certificate,
};

const categoryLabels = {
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
```

- [ ] **Step 3: 创建 SkillCloud 组件**

```tsx
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
```

- [ ] **Step 4: 创建售前方向页面 src/app/presales/page.tsx**

```tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProjectCard from "@/components/ProjectCard";
import SkillCloud from "@/components/SkillCloud";
import { getProfile, getResume, getProjectsForResume } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "钟懿 | 解决方案售前工程师",
};

export default function PresalesPage() {
  const profile = getProfile();
  const resume = getResume("presales")!;
  const projects = getProjectsForResume("presales");

  return (
    <>
      <Header title={profile.name} />
      <main>
        <HeroSection resumeSlug="presales" />

        {/* 关于我 */}
        <section className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="mb-8 text-center text-2xl font-bold">关于我</h2>
          <p className="text-center text-lg leading-relaxed text-text-secondary">{resume.about}</p>
          <div className="mt-8">
            <SkillCloud skills={resume.skills} />
          </div>
        </section>

        {/* 项目 */}
        <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-8 text-center text-2xl font-bold">项目与成果</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: 创建运维方向页面 src/app/ops/page.tsx**

类似 presales/page.tsx，但 metadata 和 resumeSlug 改为 "ops"。

- [ ] **Step 6: 创建云安全方向页面 src/app/cloud-security/page.tsx**

类似 presales/page.tsx，但 metadata 和 resumeSlug 改为 "cloud-security"。

---

### Task 6: 项目详情页（核心功能）

**Files:**
- Create: `src/app/projects/[slug]/page.tsx`
- Create: `src/components/ProjectFileTree.tsx`
- Create: `src/components/ProjectContent.tsx`
- Create: `src/components/ImageGallery.tsx`
- Create: `src/app/projects/[slug]/layout.tsx`

- [ ] **Step 1: 创建文件树组件 src/components/ProjectFileTree.tsx**

```tsx
"use client";
import { useState } from "react";
import { FileNode } from "@/lib/types";
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react";

interface ProjectFileTreeProps {
  structure: FileNode[];
}

function TreeNode({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const isFolder = node.type === "folder";

  return (
    <div>
      <button
        onClick={() => isFolder && setIsOpen(!isOpen)}
        className={`flex w-full items-center gap-1.5 rounded px-2 py-1 text-left text-sm transition-colors hover:bg-dark-border ${
          isFolder ? "cursor-pointer" : "cursor-default"
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {isFolder && (
          <ChevronRight
            className={`h-3.5 w-3.5 text-text-muted transition-transform ${isOpen ? "rotate-90" : ""}`}
          />
        )}
        {isFolder ? (
          isOpen ? (
            <FolderOpen className="h-4 w-4 text-accent-secondary" />
          ) : (
            <Folder className="h-4 w-4 text-accent-secondary" />
          )
        ) : (
          <File className="h-4 w-4 text-text-muted" />
        )}
        <span className="text-text-secondary">{node.name}</span>
      </button>
      {isFolder && isOpen && node.children && (
        <div>
          {node.children.map((child, i) => (
            <TreeNode key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectFileTree({ structure }: ProjectFileTreeProps) {
  return (
    <div className="rounded-lg border border-dark-border bg-dark-card p-4">
      <h3 className="mb-3 text-sm font-semibold text-text-muted uppercase tracking-wider">
        项目结构
      </h3>
      <div className="space-y-0.5">
        {structure.map((node, i) => (
          <TreeNode key={i} node={node} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建图片轮播组件 src/components/ImageGallery.tsx**

```tsx
"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-dark-border">
      <div className="relative aspect-video bg-dark-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[current]}
          alt={`${title} - ${current + 1}`}
          className="h-full w-full object-contain"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrent((p) => (p === 0 ? images.length - 1 : p - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-dark-bg/80 p-1.5 text-text-primary transition-colors hover:bg-dark-border"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrent((p) => (p === images.length - 1 ? 0 : p + 1))}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-dark-bg/80 p-1.5 text-text-primary transition-colors hover:bg-dark-border"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex justify-center gap-2 border-t border-dark-border py-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === current ? "bg-accent" : "bg-dark-border"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: 创建项目详情页 src/app/projects/[slug]/page.tsx**

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectFileTree from "@/components/ProjectFileTree";
import ImageGallery from "@/components/ImageGallery";
import { getProfile, getProject } from "@/lib/data";
import { getProjectContent } from "@/lib/project-content";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
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
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          返回首页
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

        {project.category === "code" && content.structure ? (
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
  project: any;
  content: any;
}) {
  return (
    <div className="space-y-8">
      {/* 项目介绍 */}
      <div className="rounded-lg border border-dark-border bg-dark-card p-6">
        <h2 className="mb-4 text-xl font-bold">项目介绍</h2>
        <div className="prose prose-invert max-w-none text-text-secondary">
          {content.markdown.split("\n").map((line: string, i: number) => (
            line.trim() ? <p key={i} className="mb-3 last:mb-0">{line}</p> : null
          ))}
        </div>
      </div>

      {/* 技术栈 */}
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

      {/* 图片 */}
      {content.images.length > 0 && (
        <div className="rounded-lg border border-dark-border bg-dark-card p-6">
          <h2 className="mb-4 text-xl font-bold">截图展示</h2>
          <ImageGallery images={content.images} title={project.title} />
        </div>
      )}

      {/* 个人总结 */}
      {project.summary && (
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-6">
          <h2 className="mb-4 text-xl font-bold text-accent">我的总结</h2>
          <p className="text-text-secondary leading-relaxed">{project.summary}</p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: 创建项目内容加载工具 src/lib/project-content.ts**

```typescript
import { FileNode } from "./types";
import fs from "fs";
import path from "path";

interface ProjectContent {
  markdown: string;
  structure?: FileNode[];
  images: string[];
}

export function getProjectContent(slug: string): ProjectContent {
  const contentDir = path.join(process.cwd(), "content", "projects", slug);

  // 读取 markdown 介绍
  let markdown = "";
  const mdPath = path.join(contentDir, "index.md");
  if (fs.existsSync(mdPath)) {
    markdown = fs.readFileSync(mdPath, "utf-8");
  }

  // 读取文件树结构
  let structure: FileNode[] | undefined;
  const structurePath = path.join(contentDir, "structure.json");
  if (fs.existsSync(structurePath)) {
    structure = JSON.parse(fs.readFileSync(structurePath, "utf-8"));
  }

  // 读取图片列表
  let images: string[] = [];
  const imagesDir = path.join(contentDir, "images");
  if (fs.existsSync(imagesDir)) {
    images = fs.readdirSync(imagesDir)
      .filter((f) => /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(f))
      .map((f) => `/content/projects/${slug}/images/${f}`);
  }

  return { markdown, structure, images };
}
```

---

### Task 7: 内容填充 - 项目介绍和文件树

**Files:**
- Create: `content/projects/resume-assistant/index.md`
- Create: `content/projects/resume-assistant/structure.json`
- Create: `content/projects/cloud-architecture/index.md`
- Create: `content/projects/huawei-ict/index.md`

- [ ] **Step 1: 创建 AI面试助手项目介绍**

`content/projects/resume-assistant/index.md`:
```
这是一个基于大模型的AI面试准备助手（AI Agent），支持从岗位JD分析到多轮模拟面试、实时评分与总结报告，帮助求职者系统化提升面试能力。

核心能力包括：

- AI Agent架构：基于JD + 分析结果 + 对话上下文进行推理，具备"面试流程控制能力"
- 上下文记忆：自动注入岗位JD、结构化分析结果和历史对话
- 面试官模式：AI作为面试官连续提问、针对回答评分、动态调整问题
- 结构化评分系统：多维度评估（表达清晰度、岗位匹配度、内容完整度、逻辑结构）
- 面试总结报告：自动生成完整复盘（总体评价、优势与短板、优先提升能力）
- 对话持久化：使用localStorage，刷新页面不丢数据
```

- [ ] **Step 2: 创建 AI面试助手项目文件树**

`content/projects/resume-assistant/structure.json`:
```json
[
  {
    "name": "resume-assistant",
    "type": "folder",
    "children": [
      {
        "name": "src",
        "type": "folder",
        "children": [
          {
            "name": "app",
            "type": "folder",
            "children": [
              { "name": "page.tsx", "type": "file" },
              { "name": "layout.tsx", "type": "file" },
              { "name": "globals.css", "type": "file" },
              {
                "name": "api",
                "type": "folder",
                "children": [
                  { "name": "analyze", "type": "folder", "children": [{ "name": "route.ts", "type": "file" }] },
                  { "name": "chat", "type": "folder", "children": [{ "name": "route.ts", "type": "file" }] },
                  { "name": "parse-file", "type": "folder", "children": [{ "name": "route.ts", "type": "file" }] }
                ]
              }
            ]
          }
        ]
      },
      { "name": "package.json", "type": "file" },
      { "name": "tsconfig.json", "type": "file" },
      { "name": "next.config.ts", "type": "file" },
      { "name": "README.md", "type": "file" },
      { "name": ".env.local", "type": "file" }
    ]
  }
]
```

- [ ] **Step 3: 创建云架构设计项目介绍**

`content/projects/cloud-architecture/index.md`:
```
在14天时间内，独立完成从需求分析、架构设计到部署上线的全流程。

涵盖了华为云核心服务的配置与集成，包括计算服务（ECS）、网络服务（VPC、ELB）、存储服务（OBS）、数据库服务（RDS）以及安全服务。通过实际动手部署，深入理解了云上架构设计的最佳实践和高可用方案。
```

- [ ] **Step 4: 创建华为ICT大赛项目介绍**

`content/projects/huawei-ict/index.md`:
```
第十届华为ICT大赛全球总决赛云赛道全球一等奖。

华为ICT大赛是华为公司面向全球大学生打造的ICT人才竞技交流赛事。在云赛道中，考察内容包括云计算基础知识、华为云服务架构设计、云上应用部署与排错等。与来自全球的顶尖选手同台竞技并获此殊荣，充分验证了扎实的云计算技术功底和解决问题的能力。
```

---

### Task 8: 图片素材整理与部署

**Files:**
- Modify: 从用户本地路径复制图片到项目目录

- [ ] **Step 1: 从用户作品集文件夹复制图片**

从 `C:\Users\钟懿\Desktop\简历\作品集` 各子文件夹将证书截图、架构图等复制到 `content/projects/` 对应目录的 `images/` 文件夹。

- [ ] **Step 2: 从 resume-assistant 项目复制截图**

从 `D:\Resume-Assistant\resume-assistant` 复制相关截图到 `content/projects/resume-assistant/images/`。

- [ ] **Step 3: 构建验证**

```bash
npm run build
```
预期：构建成功，所有页面静态生成到 `out/` 目录。

- [ ] **Step 4: 部署到 Vercel**

```bash
# 初始化 git 并推送
git init
git add .
git commit -m "feat: initial portfolio site"

# 在 Vercel 导入项目
# 连接 GitHub 仓库后自动部署
```

---

### Task 9: 内容自定义教程（写给钟懿）

**Files:**
- Create: `CONTENT-GUIDE.md`

- [ ] **Step 1: 创建内容管理指南**

`CONTENT-GUIDE.md`（写给用户）：
```markdown
# 内容管理指南 - 写给钟懿

你完全不需要碰代码！所有内容都在下面这些文件里。

## 修改个人信息
改 `data/profile.json` — 名字、简介、联系方式

## 修改简历方向
改 `data/resumes.json` — 每个人的介绍文字、技能、项目排序

## 增减项目
改 `data/projects.json` — 添加新项目记录

## 项目详情
- 介绍文字改 `content/projects/{项目名}/index.md`
- 图片放入 `content/projects/{项目名}/images/`
- 文件树改 `content/projects/{项目名}/structure.json`

## 更新网站
改完文件后，git push 到 main 分支，Vercel 会自动重新部署。
```
