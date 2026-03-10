interface IconProps {
  size?: number
  color?: string
}

export function AccountManagerIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="11" r="5" stroke="#1B2A3D" strokeWidth="1.5" />
      <path d="M7 27C7 22.5817 10.5817 19 15 19H17C21.4183 19 25 22.5817 25 27" stroke="#1B2A3D" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="22" cy="10" r="4" fill="#F5F7FA" stroke="#2563EB" strokeWidth="1.5" />
      <path d="M20.5 10L21.5 11L23.5 9" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PhoneIcon({ size = 24, color = '#1B2A3D' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 4H9L11 9L8.5 10.5C9.57096 12.6715 11.3285 14.429 13.5 15.5L15 13L20 15V19C20 20.1046 19.1046 21 18 21C10.268 21 3 13.732 3 6C3 4.89543 3.89543 4 5 4Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function EmailIcon({ size = 24, color = '#1B2A3D' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M3 7L12 13L21 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CalendarIcon({ size = 24, color = '#1B2A3D' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M3 10H21" stroke={color} strokeWidth="1.5" />
      <path d="M8 3V6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 3V6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <rect x="7" y="13" width="3" height="3" rx="0.5" fill="#2563EB" opacity="0.2" />
    </svg>
  )
}

export function VideoIcon({ size = 24, color = '#1B2A3D' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="13" height="12" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M16 10L21 7V17L16 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChatIcon({ size = 24, color = '#1B2A3D' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M21 12C21 16.4183 17.4183 20 13 20H7L3 22V12C3 7.58172 6.58172 4 11 4H13C17.4183 4 21 7.58172 21 12Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="12" r="1" fill={color} />
      <circle cx="13" cy="12" r="1" fill={color} />
      <circle cx="17" cy="12" r="1" fill={color} />
    </svg>
  )
}
