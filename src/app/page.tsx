"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import ResumePage from "@/components/ResumePage";

const validSlugs = ["presales", "ops", "cloud-security", "general"];
const defaultSlug = "presales";

// 短参数代号映射: ?r=p / ?r=o / ?r=c / ?r=g
const shortCodeMap: Record<string, string> = {
  p: "presales",
  o: "ops",
  c: "cloud-security",
  g: "general",
};

const titles: Record<string, string> = {
  presales: "钟懿 | 解决方案技术支持工程师",
  ops: "钟懿 | IT运维工程师",
  "cloud-security": "钟懿 | 云安全工程师",
  general: "钟懿",
};

function ResumeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const urlSlug = searchParams.get("resume") || searchParams.get("r");
  const shortCode = searchParams.get("r");
  const envSlug = process.env.NEXT_PUBLIC_RESUME_SLUG;
  // 优先级: 短代号 > 完整 slug > 环境变量
  const resumeSlug = (shortCode && shortCodeMap[shortCode]) ? shortCodeMap[shortCode]
    : (urlSlug && validSlugs.includes(urlSlug)) ? urlSlug
    : (envSlug && validSlugs.includes(envSlug)) ? envSlug
    : null;

  // 更新页面标题
  useEffect(() => {
    if (resumeSlug && titles[resumeSlug]) {
      document.title = titles[resumeSlug];
    }
  }, [resumeSlug]);

  // Redirect to default if no valid slug
  useEffect(() => {
    if (mounted && !resumeSlug) {
      router.replace(`/?r=p`);
    }
  }, [mounted, resumeSlug, router]);

  if (!mounted || !resumeSlug) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <p className="text-text-muted">加载中...</p>
      </div>
    );
  }

  return <ResumePage resumeSlug={resumeSlug} />;
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <p className="text-text-muted">加载中...</p>
      </div>
    }>
      <ResumeContent />
    </Suspense>
  );
}
