import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names, resolving conflicts intelligently.
 * Used throughout the project for conditional/dynamic className construction.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-blue-500", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string into a human-readable format.
 *
 * @example
 * formatDate("2025-01-15") // "January 15, 2025"
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Calculates estimated reading time for a given text.
 *
 * @param text - Raw text content
 * @param wordsPerMinute - Reading speed (default: 200 wpm)
 * @returns Human-readable string, e.g. "5 min read"
 */
export function readingTime(text: string, wordsPerMinute = 200): string {
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}
