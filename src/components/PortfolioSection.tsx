import Link from "next/link";
import { Code2, ArrowRight } from "lucide-react";

export default function PortfolioSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="mb-8 text-center text-2xl font-bold">作品集</h2>
      <div className="rounded-lg border border-accent/20 bg-accent/[0.02] p-8 text-center">
        <div className="mb-4 flex justify-center">
          <Code2 className="h-10 w-10 text-accent" />
        </div>
        <p className="mb-2 text-lg font-medium">
          AI面试助手 · 心电AI检测 · 园区网综合设计
        </p>
        <p className="mb-6 text-sm text-text-secondary">
          独立开发的软件项目与课程实践作品，涵盖Web应用、微信小程序、网络仿真
        </p>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-white transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25"
        >
          查看全部作品
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
