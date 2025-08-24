import React, { useMemo } from "react";
import { View, Text } from "react-native";

/* ---------- helpers ---------- */
export const initialsFrom = (name = "") =>
  (name.match(/\b\w/g) || []).slice(0, 2).join("").toUpperCase() || "ST";

export const stringToColor = (str = "") => {
  const colors = [
    "#8B5CF6", // violet
    "#F59E0B", // amber
    "#10B981", // emerald
    "#3B82F6", // blue
    "#EF4444", // red
    "#6366F1", // indigo
    "#14B8A6", // teal
    "#F43F5E", // rose
    "#84CC16", // lime
    "#D946EF", // fuchsia
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++)
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

/**
 * InitialsAvatar
 * Props:
 * - name: string (source for initials)
 * - fallback: string (used if name is empty; default "JT")
 * - size: number (px) inner circle size; default 48
 * - rounded: boolean circle vs rounded-rect; default true
 * - seed: string (optional, color seed; defaults to name/fallback)
 * - className: nativewind classes for the INNER circle
 * - wrapperClassName: nativewind classes for the OUTER glow wrapper
 * - showGlow: boolean outer soft glow; default false
 * - glowPadding: number px padding around avatar when glow is on; default 4
 * - glowBgClass: class for glow background (e.g. "bg-white/15"); default "bg-white/15"
 */
export default function InitialsAvatar({
  name,
  fallback = "JT",
  size = 48,
  rounded = true,
  seed,
  className = "",
  wrapperClassName = "",
  showGlow = false,
  glowPadding = 4,
  glowBgClass = "bg-white/15",
  accessibilityLabel,
}) {
  const displayName = (name && name.trim()) || fallback;
  const initials = useMemo(() => initialsFrom(displayName), [displayName]);
  const bgColor = useMemo(
    () => stringToColor(seed || displayName),
    [seed, displayName]
  );

  const radius = rounded ? size / 2 : 12;
  const fontSize = Math.max(12, Math.round(size * 0.42));

  const inner = (
    <View
      className={`items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        backgroundColor: bgColor,
      }}
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel || `${displayName} avatar`}
    >
      <Text
        className="text-white font-bold"
        style={{ fontSize, letterSpacing: 0.5 }}
        numberOfLines={1}
      >
        {initials}
      </Text>
    </View>
  );

  if (!showGlow) return inner;

  // Glow wrapper
  const outerSize = size + glowPadding * 2;
  return (
    <View
      className={`items-center justify-center rounded-full ${glowBgClass} ${wrapperClassName}`}
      style={{
        width: outerSize,
        height: outerSize,
        borderRadius: outerSize / 2,
      }}
    >
      {inner}
    </View>
  );
}
