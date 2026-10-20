import ResumePage from "@/components/ResumePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "钟懿 | IT运维工程师",
};

export default function OpsPage() {
  return <ResumePage resumeSlug="ops" />;
}
