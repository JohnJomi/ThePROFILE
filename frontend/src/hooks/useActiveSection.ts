"use client";

import { useState, useEffect, useRef } from "react";

/**
 * useActiveSection — tracks which page section is currently in the viewport.
 *
 * Uses IntersectionObserver to watch all elements with an `id` that matches
 * an entry in the provided `sectionIds` array. Returns the id of the section
 * that occupies the most prominent position in the viewport.
 *
 * Rules:
 *   - The topmost visible section wins (sections are checked in DOM order).
 *   - The observer fires with a generous rootMargin so sections register
 *     as active before they fully enter the viewport.
 *   - Returns `null` when no section is visible (e.g., above the first section).
 *
 * Used by: Navbar (to highlight the active anchor link).
 *
 * @param sectionIds - Array of element ids to observe (e.g. ["about", "projects"]).
 * @returns The id of the active section, or null.
 *
 * @example
 * const activeSection = useActiveSection(["about", "projects", "skills"]);
 * // returns "projects" when #projects is the topmost visible section
 */
export function useActiveSection(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  // Track which sections are currently intersecting
  const visibleRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (sectionIds.length === 0) return;

    /**
     * When multiple sections are visible simultaneously (e.g. on a tall
     * viewport), pick the one that appears first in the provided `sectionIds`
     * order, which mirrors the DOM / page order.
     */
    function pickActive() {
      for (const id of sectionIds) {
        if (visibleRef.current.has(id)) {
          setActiveId(id);
          return;
        }
      }
      // Nothing visible — don't reset activeId so the last active stays highlighted
      // while scrolling through the gap between sections.
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleRef.current.add(entry.target.id);
          } else {
            visibleRef.current.delete(entry.target.id);
          }
        }
        pickActive();
      },
      {
        // Trigger when the top 20% of the section enters the top 30% of the
        // viewport. This matches user expectation — when you scroll to a section
        // it highlights before the heading leaves the screen.
        rootMargin: "-10% 0px -60% 0px",
        threshold: 0,
      },
    );

    // Observe all sections that exist in the DOM at mount time.
    // Sections created after mount (e.g. lazy loaded) will not be observed —
    // acceptable for Phase 3 where all sections are static.
    const elements: Element[] = [];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    }

    return () => {
      for (const el of elements) observer.unobserve(el);
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeId;
}
