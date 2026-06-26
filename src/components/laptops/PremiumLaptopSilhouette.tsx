"use client";

import { useId } from "react";

/** Premium laptop outline — matches premium-laptop-cards.html media fallback */
export default function PremiumLaptopSilhouette({ className }: { className?: string }) {
  const gradId = useId().replace(/:/g, "");

  return (
    <svg
      className={className}
      viewBox="0 0 100 70"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2EE6B8" />
          <stop offset="1" stopColor="#9B6BFF" />
        </linearGradient>
      </defs>
      <rect
        x="20"
        y="6"
        width="60"
        height="42"
        rx="4"
        stroke={`url(#${gradId})`}
        strokeWidth="2.5"
      />
      <rect
        x="26"
        y="12"
        width="48"
        height="30"
        rx="2"
        fill="rgba(46,230,184,0.10)"
      />
      <path
        d="M6 58 L94 58 L86 50 L14 50 Z"
        stroke={`url(#${gradId})`}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <line
        x1="42"
        y1="58"
        x2="58"
        y2="58"
        stroke={`url(#${gradId})`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
