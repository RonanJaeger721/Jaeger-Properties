import type { Metadata } from "next";
import { Site } from "@/components/site";
import { sampleProperties } from "@/lib/data";
type Props = { params: Promise<{ path?: string[] }> };
const titles: Record<string, string> = {
  buy: "Find your next home",
  rent: "Find a space that feels like yours",
  about: "Our considered approach",
  contact: "Start your next chapter",
  developments: "From the first line to the final detail",
  "developments/the-residence": "The Residence — Architectural Study",
  "find-your-home": "Find your home",
  saved: "Your saved homes",
  admin: "Local demo management",
  "concept-notes": "About this design concept",
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path = [] } = await params;
  const key = path.join("/");
  const property = sampleProperties.find((p) => key === `properties/${p.slug}`);
  return {
    title: property
      ? `${property.title} — Sample listing`
      : titles[key] || "Where your next chapter begins",
  };
}
export default async function Page({ params }: Props) {
  const { path = [] } = await params;
  return <Site initialPath={"/" + path.join("/")} />;
}
