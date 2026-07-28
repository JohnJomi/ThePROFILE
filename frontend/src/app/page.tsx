/**
 * app/page.tsx — Home page
 *
 * Composed of portfolio sections. Each section has an `id` matching
 * the navigation anchors in config/navigation.ts for smooth scrolling
 * and active-state highlighting in the Navbar.
 */

import { Hero } from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Anchor targets for navigation — real sections will replace these */}
      <div id="about" />
      <div id="projects" />
      <div id="skills" />
      <div id="experience" />
      <div id="contact" />
    </>
  );
}