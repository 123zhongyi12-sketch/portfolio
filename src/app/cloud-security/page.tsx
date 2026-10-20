import ResumePage from "@/components/ResumePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "钟懿 | 云安全工程师",
};

export default function CloudSecurityPage() {
  return <ResumePage resumeSlug="cloud-security" />;
}
