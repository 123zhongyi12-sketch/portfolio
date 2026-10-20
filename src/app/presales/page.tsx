import ResumePage from "@/components/ResumePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "钟懿 | 解决方案技术支持工程师",
};

export default function PresalesPage() {
  return <ResumePage resumeSlug="presales" />;
}
