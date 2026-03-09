export const PaymentTerminalIllustration = () => (
  <svg width="140" height="120" viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="70" cy="115" rx="45" ry="8" fill="#E5E5E5" />
    <rect x="35" y="20" width="70" height="85" rx="10" fill="url(#terminalGrad)" />
    <rect x="42" y="28" width="56" height="50" rx="6" fill="#0a1628" />
    <rect x="50" y="55" width="10" height="18" rx="2" fill="#0D82F9" />
    <rect x="65" y="48" width="10" height="25" rx="2" fill="#06B6D4" />
    <rect x="80" y="60" width="10" height="13" rx="2" fill="#0D82F9" />
    <path d="M50 45 L60 40 L75 50 L90 35" stroke="#80FF00" strokeWidth="2" strokeLinecap="round" fill="none" />
    <g transform="rotate(15 100 25)">
      <rect x="88" y="10" width="40" height="25" rx="5" fill="#0D82F9" />
      <rect x="93" y="18" width="22" height="4" rx="2" fill="white" fillOpacity="0.5" />
      <rect x="93" y="26" width="12" height="3" rx="1" fill="white" fillOpacity="0.3" />
    </g>
    <circle cx="118" cy="40" r="8" fill="#F97316" />
    <circle cx="55" cy="95" r="5" fill="#80FF00" />
    <circle cx="70" cy="95" r="5" fill="#0D82F9" />
    <circle cx="85" cy="95" r="5" fill="#E5E5E5" />
    <defs>
      <linearGradient id="terminalGrad" x1="35" y1="20" x2="105" y2="105" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0D82F9" />
        <stop offset="100%" stopColor="#002E83" />
      </linearGradient>
    </defs>
  </svg>
)
