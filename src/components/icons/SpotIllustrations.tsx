interface IllustProps {
  size?: number
}

export function CompleteProfileIllust({ size = 80 }: IllustProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Person */}
      <circle cx="32" cy="24" r="10" fill="#1B2A3D" opacity="0.1" stroke="#1B2A3D" strokeWidth="1.5" />
      <path d="M16 56C16 47.1634 23.1634 40 32 40C40.8366 40 48 47.1634 48 56" stroke="#1B2A3D" strokeWidth="1.5" strokeLinecap="round" />
      {/* Checkmark badge */}
      <circle cx="56" cy="24" r="14" fill="#2563EB" opacity="0.1" />
      <circle cx="56" cy="24" r="10" fill="#2563EB" opacity="0.15" />
      <path d="M50 24L54 28L62 20" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Decorative dots */}
      <circle cx="68" cy="44" r="2" fill="#93C5FD" opacity="0.5" />
      <circle cx="72" cy="36" r="1.5" fill="#CBD5E1" />
    </svg>
  )
}

export function ChooseProductIllust({ size = 80 }: IllustProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Stacked cards */}
      <rect x="16" y="20" width="36" height="24" rx="4" fill="#CBD5E1" opacity="0.3" stroke="#CBD5E1" strokeWidth="1" />
      <rect x="12" y="26" width="36" height="24" rx="4" fill="#93C5FD" opacity="0.2" stroke="#93C5FD" strokeWidth="1" />
      <rect x="8" y="32" width="36" height="24" rx="4" fill="white" stroke="#1B2A3D" strokeWidth="1.5" />
      {/* Lines on front card */}
      <path d="M16 41H28" stroke="#1B2A3D" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 47H22" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
      {/* Selection indicator */}
      <circle cx="58" cy="38" r="14" fill="#2563EB" opacity="0.1" />
      <circle cx="58" cy="38" r="8" fill="white" stroke="#2563EB" strokeWidth="1.5" />
      <circle cx="58" cy="38" r="4" fill="#2563EB" />
      {/* Decorative */}
      <circle cx="70" cy="56" r="2" fill="#93C5FD" opacity="0.5" />
      <circle cx="66" cy="22" r="1.5" fill="#CBD5E1" />
    </svg>
  )
}

export function GetFundedIllust({ size = 80 }: IllustProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Chart/growth */}
      <rect x="8" y="20" width="44" height="36" rx="4" fill="white" stroke="#1B2A3D" strokeWidth="1.5" />
      <path d="M16 48L24 38L32 42L44 28" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="44" cy="28" r="3" fill="#2563EB" opacity="0.2" stroke="#2563EB" strokeWidth="1.5" />
      {/* Arrow up */}
      <path d="M60 46V24" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
      <path d="M54 30L60 24L66 30" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Decorative */}
      <circle cx="64" cy="52" r="2" fill="#93C5FD" opacity="0.5" />
      <circle cx="56" cy="18" r="1.5" fill="#CBD5E1" />
      <circle cx="70" cy="38" r="1.5" fill="#93C5FD" opacity="0.3" />
    </svg>
  )
}
