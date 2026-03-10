interface IconProps {
  size?: number
}

export function WorkingCapitalIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="4" y="7" width="24" height="18" rx="3" stroke="#1B2A3D" strokeWidth="1.5" />
      <path d="M4 12H28" stroke="#1B2A3D" strokeWidth="1.5" />
      <rect x="8" y="8" width="6" height="3" rx="1" fill="#2563EB" opacity="0.2" />
      <circle cx="22" cy="19" r="3" stroke="#2563EB" strokeWidth="1.5" />
      <path d="M21.5 18V20M22.5 18.5H21C20.7239 18.5 20.5 18.7239 20.5 19C20.5 19.2761 20.7239 19.5 21 19.5H23C23.2761 19.5 23.5 19.7239 23.5 20C23.5 20.2761 23.2761 20.5 23 20.5H21.5" stroke="#2563EB" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

export function InvoiceFinancingIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M8 4H20L24 8V26C24 27.1046 23.1046 28 22 28H10C8.89543 28 8 27.1046 8 26V4Z" stroke="#1B2A3D" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M20 4V8H24" stroke="#1B2A3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 14H20" stroke="#1B2A3D" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 18H20" stroke="#1B2A3D" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 22H16" stroke="#1B2A3D" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="22" cy="22" r="6" fill="#F5F7FA" stroke="#2563EB" strokeWidth="1.5" />
      <path d="M21 21V22.5L22.5 23.5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SADADFinancingIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="3" y="8" width="22" height="16" rx="3" stroke="#1B2A3D" strokeWidth="1.5" />
      <path d="M3 13H25" stroke="#1B2A3D" strokeWidth="1.5" />
      <rect x="6" y="18" width="8" height="2" rx="1" fill="#CBD5E1" />
      <circle cx="24" cy="22" r="6" fill="#F5F7FA" stroke="#2563EB" strokeWidth="1.5" />
      <path d="M22 22L23.5 23.5L26.5 20.5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
