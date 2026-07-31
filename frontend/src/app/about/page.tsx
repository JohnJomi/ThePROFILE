import { Achievements } from "@/components/sections/Achievements";
import { Certifications } from "@/components/sections/Certifications";
import { Hero } from "@/components/sections/Hero";
import { Publications } from "@/components/sections/Publications";

export default function AboutPage() {
  return (
    <>
      <Hero />
      <Certifications />
      <Achievements />
      <Publications />
    </>
  );
}
