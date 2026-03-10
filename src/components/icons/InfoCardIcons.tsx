interface IconProps {
  size?: number
}

export function ReviewTimeIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="16" stroke="#1B2A3D" strokeWidth="1.5" />
      <path d="M20 10V20L27 24" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="20" r="2" fill="#2563EB" />
    </svg>
  )
}

export function WhatWeCheckIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="8" y="4" width="24" height="32" rx="3" stroke="#1B2A3D" strokeWidth="1.5" />
      <path d="M14 14H26" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 20H26" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 26H20" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
      {/* Checkmarks */}
      <circle cx="14" cy="14" r="0" fill="none" />
      <path d="M13 14L14 15L16 12.5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 20L14 21L16 18.5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function AfterApprovalIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      {/* Chart frame */}
      <rect x="4" y="10" width="24" height="20" rx="3" stroke="#1B2A3D" strokeWidth="1.5" />
      <path d="M10 24L15 18L20 21L26 14" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Arrow up */}
      <path d="M33 26V12" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
      <path d="M29 16L33 12L37 16" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Sparkle */}
      <circle cx="35" cy="30" r="1.5" fill="#93C5FD" opacity="0.5" />
    </svg>
  )
}
