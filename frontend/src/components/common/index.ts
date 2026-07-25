/**
 * components/common/index.ts — barrel export for all common UI components.
 *
 * Consumers can import any component from a single path:
 *   import { Button, Card, Heading, Text } from "@/components/common";
 *
 * Keeps import paths short and makes refactoring easier — move a file and
 * only this barrel changes, not every consumer import.
 */

// ─── Layout primitives ────────────────────────────────────────────────────────
export { Container } from "./Container";
export type { ContainerProps } from "./Container";

export { Section, SectionHeader } from "./Section";
export type { SectionProps, SectionHeaderProps } from "./Section";

// ─── Typography ───────────────────────────────────────────────────────────────
export {
  Heading,
  Subheading,
  Paragraph,
  Text,
  GradientText,
  InlineCode,
} from "./Typography";
export type {
  HeadingProps,
  SubheadingProps,
  ParagraphProps,
  TextProps,
  GradientTextProps,
} from "./Typography";

// ─── Buttons ──────────────────────────────────────────────────────────────────
export { Button } from "./Button";
export type { ButtonProps } from "./Button";

export { PrimaryButton, SecondaryButton } from "./Buttons";
export type { PrimaryButtonProps, SecondaryButtonProps } from "./Buttons";

// ─── Badges ───────────────────────────────────────────────────────────────────
export { Badge, badgeVariants } from "./Badge";
export type { BadgeProps } from "./Badge";

export { SkillBadge } from "./SkillBadge";
export type { SkillBadgeProps } from "./SkillBadge";

// ─── Cards ────────────────────────────────────────────────────────────────────
export { Card, GlassCard } from "./Card";
export type { CardProps, GlassCardProps } from "./Card";

export { ProjectCard } from "./ProjectCard";
export { TimelineCard } from "./TimelineCard";

// ─── Interactive ──────────────────────────────────────────────────────────────
export { SocialButton } from "./SocialButton";
export type { SocialButtonProps } from "./SocialButton";

// ─── Decorative ───────────────────────────────────────────────────────────────
export { AnimatedBackground } from "./AnimatedBackground";
export type { AnimatedBackgroundProps } from "./AnimatedBackground";
