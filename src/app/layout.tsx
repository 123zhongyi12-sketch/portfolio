import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "钟懿 | 个人简历网站",
  description: "钟懿的个人简历网站 - 云计算、运维、云安全方向",
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
