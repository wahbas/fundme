export const BankConnectionIllustration = () => (
  <svg width="160" height="140" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="125" rx="55" ry="10" fill="#E5E5E5" />
    <path d="M30 65 L80 30 L130 65 Z" fill="#001a4d" />
    <path d="M40 65 L80 40 L120 65 Z" fill="#002E83" />
    <rect x="35" y="65" width="90" height="55" rx="0" fill="url(#bankGrad)" />
    <rect x="45" y="75" width="14" height="40" rx="3" fill="white" fillOpacity="0.3" />
    <rect x="73" y="75" width="14" height="40" rx="3" fill="white" fillOpacity="0.3" />
    <rect x="101" y="75" width="14" height="40" rx="3" fill="white" fillOpacity="0.3" />
    <rect x="65" y="95" width="30" height="25" rx="4" fill="#0052B9" />
    <circle cx="88" cy="107" r="3" fill="#80FF00" />
    <circle cx="135" cy="50" r="22" fill="url(#connectGrad)" />
    <path d="M123 50 L130 50 M135 50 L140 50 M145 50 L147 50" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <circle cx="25" cy="50" r="10" fill="#80FF00" fillOpacity="0.8" />
    <path d="M22 50 L28 50 M25 47 L25 53" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <defs>
      <linearGradient id="bankGrad" x1="35" y1="65" x2="125" y2="120" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0052B9" />
        <stop offset="100%" stopColor="#002E83" />
      </linearGradient>
      <linearGradient id="connectGrad" x1="113" y1="28" x2="157" y2="72" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0D82F9" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
    </defs>
  </svg>
)
