// ─── Nafath Logo ─────────────────────────────────────────────
// Saudi National Digital Identity — simplified brand mark

export function NafathLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      {/* Green circle background */}
      <circle cx="60" cy="60" r="60" fill="#00A651" />
      {/* Stylized fingerprint / digital identity mark */}
      <path
        d="M60 30 C42 30 28 44 28 62 C28 72 32 80 38 86"
        stroke="white" strokeWidth="5" strokeLinecap="round" fill="none"
      />
      <path
        d="M60 42 C48 42 40 52 40 62 C40 68 42 74 46 78"
        stroke="white" strokeWidth="5" strokeLinecap="round" fill="none"
      />
      <path
        d="M60 54 C54 54 52 58 52 62 C52 66 54 70 56 72"
        stroke="white" strokeWidth="5" strokeLinecap="round" fill="none"
      />
      {/* Right arcs */}
      <path
        d="M60 30 C78 30 92 44 92 62 C92 72 88 80 82 86"
        stroke="white" strokeWidth="5" strokeLinecap="round" fill="none"
      />
      <path
        d="M60 42 C72 42 80 52 80 62 C80 68 78 74 74 78"
        stroke="white" strokeWidth="5" strokeLinecap="round" fill="none"
      />
      <path
        d="M60 54 C66 54 68 58 68 62 C68 66 66 70 64 72"
        stroke="white" strokeWidth="5" strokeLinecap="round" fill="none"
      />
      {/* Center dot */}
      <circle cx="60" cy="62" r="3" fill="white" />
    </svg>
  )
}

// ─── Wathiq Logo ─────────────────────────────────────────────
// Ministry of Commerce — CR verification service

export function WathiqLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      {/* Teal background */}
      <rect width="120" height="120" rx="16" fill="#00838F" />
      {/* Document icon */}
      <rect x="35" y="24" width="50" height="64" rx="4" fill="white" opacity="0.9" />
      {/* Document lines */}
      <rect x="44" y="38" width="32" height="3" rx="1.5" fill="#00838F" opacity="0.4" />
      <rect x="44" y="47" width="24" height="3" rx="1.5" fill="#00838F" opacity="0.3" />
      <rect x="44" y="56" width="28" height="3" rx="1.5" fill="#00838F" opacity="0.3" />
      <rect x="44" y="65" width="18" height="3" rx="1.5" fill="#00838F" opacity="0.3" />
      {/* Verification checkmark circle */}
      <circle cx="75" cy="80" r="18" fill="#4CAF50" />
      <path
        d="M67 80 L73 86 L84 74"
        stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Arabic-style decorative dot */}
      <circle cx="44" cy="32" r="3" fill="#00838F" />
    </svg>
  )
}

// ─── Lean Logo ───────────────────────────────────────────────
// Lean Technologies — Open Banking provider

// ─── Saudi Bank Logos ────────────────────────────────────────

// Al Rajhi Bank — green shield/palm motif
export function AlRajhiLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="16" fill="#00836C" />
      {/* Palm / tree shape */}
      <path d="M60 28 L60 70" stroke="white" strokeWidth="4" strokeLinecap="round" />
      <path d="M60 38 C50 32 38 36 36 46" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M60 38 C70 32 82 36 84 46" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M60 48 C52 44 42 47 40 54" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M60 48 C68 44 78 47 80 54" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M60 58 C54 56 48 58 46 62" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M60 58 C66 56 72 58 74 62" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Base */}
      <path d="M42 70 L78 70" stroke="white" strokeWidth="4" strokeLinecap="round" />
      <text x="60" y="94" textAnchor="middle" fontSize="11" fill="white" fontWeight="700" fontFamily="sans-serif">AL RAJHI</text>
    </svg>
  )
}

// Saudi National Bank (SNB/Al Ahli) — blue geometric
export function SNBLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="16" fill="#004B87" />
      {/* SNB letters stylized */}
      <path d="M30 72 C30 62 38 58 44 62 C50 66 50 56 44 52 C38 48 30 52 30 48" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M56 72 L56 48 L56 72 L72 48 L72 72" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M82 48 L82 72 C82 72 82 64 90 64 C82 64 82 56 82 48 C82 48 82 56 90 56" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="60" y="94" textAnchor="middle" fontSize="10" fill="white" fontWeight="600" fontFamily="sans-serif">SNB</text>
    </svg>
  )
}

// SABB — cyan/blue swoosh
export function SABBLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="16" fill="#00A3E0" />
      {/* Hexagonal shape */}
      <polygon points="60,30 85,42 85,68 60,80 35,68 35,42" stroke="white" strokeWidth="3" fill="none" />
      <polygon points="60,40 75,48 75,64 60,72 45,64 45,48" fill="white" opacity="0.2" />
      {/* Inner diamond */}
      <polygon points="60,46 70,54 60,62 50,54" fill="white" opacity="0.9" />
      <text x="60" y="98" textAnchor="middle" fontSize="14" fill="white" fontWeight="700" fontFamily="sans-serif">SABB</text>
    </svg>
  )
}

// Riyad Bank — purple with R mark
export function RiyadBankLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="16" fill="#512D6D" />
      {/* Stylized R */}
      <path d="M42 78 L42 38 L62 38 C72 38 78 44 78 52 C78 60 72 64 62 64 L42 64" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M62 64 L78 78" stroke="white" strokeWidth="5" strokeLinecap="round" />
      <text x="60" y="98" textAnchor="middle" fontSize="10" fill="white" fontWeight="600" fontFamily="sans-serif">RIYAD BANK</text>
    </svg>
  )
}

// Alinma Bank — gold crescent
export function AlinmaLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="16" fill="#1A1A2E" />
      {/* Crescent */}
      <circle cx="58" cy="50" r="22" stroke="#C4960C" strokeWidth="4" fill="none" />
      <circle cx="66" cy="50" r="18" fill="#1A1A2E" />
      {/* Star */}
      <circle cx="78" cy="38" r="3" fill="#C4960C" />
      {/* Decorative arc */}
      <path d="M34 72 C44 68 56 68 66 72 C76 76 88 76 96 72" stroke="#C4960C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <text x="60" y="96" textAnchor="middle" fontSize="10" fill="#C4960C" fontWeight="700" fontFamily="sans-serif">ALINMA</text>
    </svg>
  )
}

// Banque Saudi Fransi — dark blue with stripe
export function BSFLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="16" fill="#003B71" />
      {/* Three diagonal stripes */}
      <line x1="35" y1="75" x2="55" y2="35" stroke="white" strokeWidth="4" strokeLinecap="round" />
      <line x1="50" y1="75" x2="70" y2="35" stroke="#E63946" strokeWidth="4" strokeLinecap="round" />
      <line x1="65" y1="75" x2="85" y2="35" stroke="white" strokeWidth="4" strokeLinecap="round" />
      <text x="60" y="96" textAnchor="middle" fontSize="9" fill="white" fontWeight="600" fontFamily="sans-serif">SAUDI FRANSI</text>
    </svg>
  )
}

// Arab National Bank — dark with interlocking arcs
export function ANBLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="16" fill="#1B3A5C" />
      {/* ANB interlocking circles */}
      <circle cx="48" cy="52" r="16" stroke="white" strokeWidth="3" fill="none" />
      <circle cx="72" cy="52" r="16" stroke="white" strokeWidth="3" fill="none" />
      <circle cx="60" cy="52" r="10" fill="white" opacity="0.15" />
      {/* Overlap highlight */}
      <path d="M56 40 C58 46 58 58 56 64" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M64 40 C62 46 62 58 64 64" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
      <text x="60" y="92" textAnchor="middle" fontSize="12" fill="white" fontWeight="700" fontFamily="sans-serif">ANB</text>
    </svg>
  )
}

// Bank Albilad — gold and dark
export function AlbiladLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="16" fill="#1C1C1C" />
      {/* Stylized building / tower */}
      <rect x="50" y="32" width="20" height="40" rx="3" fill="#8B6914" />
      <rect x="54" y="36" width="5" height="8" rx="1" fill="#1C1C1C" opacity="0.6" />
      <rect x="62" y="36" width="5" height="8" rx="1" fill="#1C1C1C" opacity="0.6" />
      <rect x="54" y="48" width="5" height="8" rx="1" fill="#1C1C1C" opacity="0.6" />
      <rect x="62" y="48" width="5" height="8" rx="1" fill="#1C1C1C" opacity="0.6" />
      {/* Door */}
      <path d="M56 72 L56 64 C56 62 58 60 60 60 C62 60 64 62 64 64 L64 72" fill="#8B6914" />
      {/* Base */}
      <rect x="38" y="72" width="44" height="4" rx="2" fill="#8B6914" />
      <text x="60" y="94" textAnchor="middle" fontSize="9" fill="#8B6914" fontWeight="700" fontFamily="sans-serif">ALBILAD</text>
    </svg>
  )
}

// Bank AlJazira — red with arch
export function AlJaziraLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="16" fill="#8B0000" />
      {/* Arch / gateway */}
      <path d="M36 76 L36 48 C36 34 48 26 60 26 C72 26 84 34 84 48 L84 76" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Inner arch */}
      <path d="M48 76 L48 54 C48 46 52 42 60 42 C68 42 72 46 72 54 L72 76" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Keystone */}
      <circle cx="60" cy="54" r="4" fill="white" />
      <text x="60" y="96" textAnchor="middle" fontSize="9" fill="white" fontWeight="600" fontFamily="sans-serif">ALJAZIRA</text>
    </svg>
  )
}

// ─── Lean Logo ───────────────────────────────────────────────
// Lean Technologies — Open Banking provider

export function LeanLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="16" fill="#1A1A2E" />
      {/* Stylized "L" shape with connecting nodes */}
      <path d="M40 35 L40 75 L80 75" stroke="#00D9FF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      {/* Connection nodes */}
      <circle cx="40" cy="35" r="6" fill="#00D9FF" />
      <circle cx="40" cy="75" r="6" fill="#00D9FF" />
      <circle cx="80" cy="75" r="6" fill="#00D9FF" />
      {/* Data flow dots */}
      <circle cx="55" cy="55" r="3" fill="#00D9FF" opacity="0.5" />
      <circle cx="65" cy="65" r="3" fill="#00D9FF" opacity="0.5" />
      {/* Text */}
      <text x="60" y="98" textAnchor="middle" fontSize="16" fill="white" fontWeight="700" fontFamily="sans-serif">LEAN</text>
    </svg>
  )
}
