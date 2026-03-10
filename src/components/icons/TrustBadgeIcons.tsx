interface IconProps {
  size?: number
  color?: string
}

export function ApplyFastIcon({ size = 18, color = '#2563EB' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path d="M9 2L11 7H16L12 10.5L13.5 16L9 12.5L4.5 16L6 10.5L2 7H7L9 2Z" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function FundsQuickIcon({ size = 18, color = '#2563EB' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke={color} strokeWidth="1.2" />
      <path d="M9 5V9L12 11" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ShariaIcon({ size = 18, color = '#2563EB' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path d="M9 2C9 2 2 5 2 9.5C2 14 9 17 9 17C9 17 16 14 16 9.5C16 5 9 2 9 2Z" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 9.5L8.5 11.5L12 7.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function NoCollateralIcon({ size = 18, color = '#2563EB' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <rect x="4" y="8" width="10" height="8" rx="2" stroke={color} strokeWidth="1.2" />
      <path d="M6 8V5.5C6 3.84315 7.34315 2.5 9 2.5C10.6569 2.5 12 3.84315 12 5.5V6" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function SAMAIcon({ size = 18, color = '#2563EB' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke={color} strokeWidth="1.2" />
      <path d="M6 9L8.5 11.5L13 6.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
