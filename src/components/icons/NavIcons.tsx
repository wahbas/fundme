interface IconProps {
  size?: number
  color?: string
  opacity?: number
}

export function HomeIcon({ size = 24, color = '#FFFFFF' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="2" fill={color} opacity="0.9" />
      <rect x="13" y="3" width="8" height="8" rx="2" fill={color} opacity="0.5" />
      <rect x="3" y="13" width="8" height="8" rx="2" fill={color} opacity="0.5" />
      <rect x="13" y="13" width="8" height="8" rx="2" fill={color} opacity="0.5" />
    </svg>
  )
}

export function LoansIcon({ size = 24, color = '#94A3B8' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="2" width="14" height="18" rx="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 7H15" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 11H15" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 15H12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="18" cy="18" r="4.5" fill="#243447" stroke={color} strokeWidth="1.5" />
      <path d="M17 17.5V16.5C17 16.2 17.2 16 17.5 16H18.5C18.8 16 19 16.2 19 16.5V17.5M16.5 18H19.5C19.8 18 20 18.2 20 18.5V19.5H16V18.5C16 18.2 16.2 18 16.5 18Z" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function DataHubIcon({ size = 24, color = '#94A3B8' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="14" width="4" height="7" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="10" y="9" width="4" height="12" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="16" y="4" width="4" height="17" rx="1" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

export function ProfileIcon({ size = 24, color = '#94A3B8' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.5" />
      <path d="M5 20C5 16.6863 7.68629 14 11 14H13C16.3137 14 19 16.6863 19 20V21H5V20Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function HelpSupportIcon({ size = 24, color = '#94A3B8' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10V11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <rect x="2" y="11" width="5" height="7" rx="2" stroke={color} strokeWidth="1.5" />
      <rect x="17" y="11" width="5" height="7" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M20 18V19C20 20.1046 19.1046 21 18 21H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <rect x="12" y="19.5" width="4" height="3" rx="1.5" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

export function SettingsIcon({ size = 24, color = '#94A3B8' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" />
      <path d="M12 2V4M12 20V22M22 12H20M4 12H2M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function LockIcon({ size = 16, color = '#94A3B8' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="3" y="7" width="10" height="7" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M5 7V5C5 3.34315 6.34315 2 8 2C9.65685 2 11 3.34315 11 5V7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="10.5" r="1" fill={color} />
    </svg>
  )
}

export function ChevronsLeftIcon({ size = 16, color = 'rgba(255,255,255,0.6)' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M10 4L6 8L10 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronsRightIcon({ size = 16, color = 'rgba(255,255,255,0.6)' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M6 4L10 8L6 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
