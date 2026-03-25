interface IconProps {
  size?: number
  color?: string
}

export function StepCompleteIcon({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="12" fill="#10B981" />
      <path d="M9 14.5L12.5 18L19 10.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function StepCurrentIcon({ size = 28, number = 2 }: IconProps & { number?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="12" fill="#2563EB" />
      <text x="14" y="18" textAnchor="middle" fill="white" fontSize="14" fontWeight="600" fontFamily="DM Sans, sans-serif">{number}</text>
    </svg>
  )
}

export function StepUpcomingIcon({ size = 28, number = 3 }: IconProps & { number?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="12" stroke="#CBD5E1" strokeWidth="1.5" fill="none" />
      <text x="14" y="18" textAnchor="middle" fill="#94A3B8" fontSize="14" fontWeight="500" fontFamily="DM Sans, sans-serif">{number}</text>
    </svg>
  )
}

export function ChevronUpIcon({ size = 24, color = '#64748B' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M7 14L12 9L17 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronDownIcon({ size = 24, color = '#64748B' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M7 10L12 15L17 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowRightIcon({ size = 24, color = '#94A3B8' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 6L15 12L9 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowLeftIcon({ size = 24, color = '#94A3B8' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M15 6L9 12L15 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function NotificationBellIcon({ size = 24, color = '#1E293B' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3C8.68629 3 6 5.68629 6 9V13L4 16H20L18 13V9C18 5.68629 15.3137 3 12 3Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 20C10 21.1046 10.8954 22 12 22C13.1046 22 14 21.1046 14 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function DownloadIcon({ size = 24, color = '#1E293B' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 4V16M12 16L7 11M12 16L17 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 19H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function DarkModeIcon({ size = 24, color = '#1E293B' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PlusIcon({ size = 16, color = '#1E293B' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 3V13M3 8H13" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function HelpFloatingIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="18" fill="#2563EB" />
      <text x="20" y="25" textAnchor="middle" fill="white" fontSize="18" fontWeight="700" fontFamily="DM Sans, sans-serif">?</text>
    </svg>
  )
}
