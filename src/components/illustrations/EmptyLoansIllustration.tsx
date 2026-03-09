export const EmptyLoansIllustration = () => (
  <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="145" rx="60" ry="10" fill="#E5E5E5" />
    <rect x="55" y="70" width="90" height="65" rx="8" fill="#F5F5F5" transform="rotate(-3 55 70)" />
    <rect x="50" y="65" width="90" height="65" rx="8" fill="white" stroke="#E5E5E5" strokeWidth="2" />
    <rect x="65" y="85" width="50" height="6" rx="3" fill="#E5E5E5" />
    <rect x="65" y="98" width="35" height="5" rx="2.5" fill="#E5E5E5" />
    <rect x="65" y="110" width="45" height="5" rx="2.5" fill="#E5E5E5" />
    <circle cx="145" cy="55" r="28" fill="url(#plusGrad)" />
    <rect x="137" y="47" width="16" height="4" rx="2" fill="white" />
    <rect x="143" y="41" width="4" height="16" rx="2" fill="white" transform="rotate(90 145 49)" />
    <ellipse cx="45" cy="50" rx="18" ry="6" fill="#F59E0B" />
    <ellipse cx="45" cy="46" rx="18" ry="6" fill="#FBBF24" />
    <text x="45" y="50" textAnchor="middle" fontSize="10" fill="#92400E" fontWeight="bold">$</text>
    <path d="M170 35 L172 42 L179 44 L172 46 L170 53 L168 46 L161 44 L168 42 Z" fill="#80FF00" />
    <circle cx="35" cy="85" r="3" fill="#0D82F9" />
    <defs>
      <linearGradient id="plusGrad" x1="117" y1="27" x2="173" y2="83" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#80FF00" />
        <stop offset="100%" stopColor="#22C55E" />
      </linearGradient>
    </defs>
  </svg>
)
