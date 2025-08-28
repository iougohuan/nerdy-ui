import React from "react";
import { cn } from "@/lib/utils";

export type VtLogoProps = {
  variant?: "color" | "white" | "black";
  className?: string;
  width?: number;
  height?: number;
  "aria-label"?: string;
};

/**
 * VtLogo
 * - variant="color" usa arquivo público `/vt-logo-color.svg` (fallback: gradiente pelos tokens vibrantes)
 * - variant="white" usa `/vt-logo-white.svg`
 * - variant="black" usa `/vt-logo-black.svg`
 */
export function VtLogo({
  variant = "color",
  className,
  width = 592,
  height = 98,
  ...rest
}: VtLogoProps) {
  const srcMap: Record<string, string> = {
    color: "/vt-logo-color.svg",
    white: "/vt-logo-white.svg",
    black: "/vt-logo-black.svg",
  };

  const src = srcMap[variant];

  // Preferir os SVGs da pasta public
  if (src) {
    return (
      <img
        src={src}
        width={width}
        height={height}
        className={cn(className)}
        alt={rest["aria-label"] || "Vt Logo"}
      />
    );
  }

  // Fallback colorido via gradiente de tokens
  return (
    <svg
      viewBox="0 0 592 98"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...rest}
    >
      <defs>
        <linearGradient id="vtGradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(99)">
          <stop offset="0%" stopColor="var(--vibrant-yellow-500)" />
          <stop offset="53.72%" stopColor="var(--vibrant-pink-500)" />
          <stop offset="70.33%" stopColor="var(--vibrant-purple-500)" />
          <stop offset="100%" stopColor="var(--vibrant-cyan-500)" />
        </linearGradient>
      </defs>
      <rect width="592" height="98" fill="url(#vtGradient)" />
    </svg>
  );
}

export default VtLogo;


