/**
 * app/page.tsx — Home page
 *
 * Composed of portfolio sections. Each section has an `id` matching
 * the navigation anchors in config/navigation.ts for smooth scrolling
 * and active-state highlighting in the Navbar.
 */

import { Achievements } from "@/components/sections/Achievements";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Publications } from "@/components/sections/Publications";
import { Skills } from "@/components/sections/Skills";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Anchor targets for navigation — real sections will replace these */}
      <div id="about" />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Achievements />
      <Publications />
      <Contact />
    </>
  );
}