import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame } from "@/components/site-frame";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <SiteFrame />;
}
