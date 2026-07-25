/**
 * app/page.tsx — Home page
 *
 * Placeholder confirming the Phase 3 foundation is in place.
 * Portfolio sections (Hero, About, Projects, Skills, Experience, Contact)
 * will be built here in Phase 4.
 *
 * The section ids below match the navigation anchors in config/navigation.ts
 * so the Navbar active-state detection will work automatically once the real
 * sections are added.
 */

export default function HomePage() {
  return (
    <div className="container-content section-padding flex flex-col gap-4">
      <p className="font-mono text-sm text-muted-foreground">
        Phase 3 foundation is complete. Portfolio sections coming in Phase 4.
      </p>
      {/* Anchor targets — keep these ids until real sections replace them */}
      <div id="about" />
      <div id="projects" />
      <div id="skills" />
      <div id="experience" />
      <div id="contact" />
    </div>
  );
}
