"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import { useReducedMotion } from "@/hooks/useReducedMotion";

import GradientWaves from "./GradientWaves";

/**
 * SiteGradientWaves — fixed, full-viewport wave field behind all page content.
 *
 * Wraps GradientWaves (React Bits) and feeds it colors read straight from the
 * app's own design tokens (--bg-primary for the horizon, --accent-rust for the
 * wave body, --accent-gold for the crest highlight, all in globals.css) instead
 * of the component's default purple/pink palette, so the effect reads as an
 * extension of the existing background rather than a new theme. Amplitude,
 * fog depth and brightness are tuned up from the library defaults so the wave
 * shapes stay clearly readable instead of dissolving into haze.
 * Re-reads those tokens whenever the light/dark theme changes.
 */
export function SiteGradientWaves() {
  const { resolvedTheme } = useTheme();
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [colors, setColors] = useState<{ horizon: string; wave: string; crest: string } | null>(
    null,
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const styles = getComputedStyle(document.documentElement);
    const read = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setColors({
      horizon: read("--bg-primary", "#1b2620"),
      wave: read("--accent-rust", "#d9663d"),
      crest: read("--accent-gold", "#e8b93e"),
    });
  }, [mounted, resolvedTheme]);

  if (!mounted || !colors || reducedMotion) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <GradientWaves
        horizonColor={colors.horizon}
        waveColor={colors.wave}
        crestColor={colors.crest}
        speed={0.4}
        amplitude={3.2}
        waveScale={0.55}
        waveRatio={0.85}
        swell={30}
        turbulence={16}
        tilt={1.2}
        zoom={1.1}
        height={5.0}
        fogDepth={24}
        detail="high"
        brightness={1.2}
        opacity={1.0}
        mouseInteraction
        parallaxStrength={0.45}
        grain
        grainIntensity={0.035}
      />
    </div>
  );
}
