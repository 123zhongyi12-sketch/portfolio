import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "钟懿 | 解决方案技术支持工程师",
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
