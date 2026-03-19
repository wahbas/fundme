interface Props {
  size?: number
  className?: string
}

export default function CompanyIllustration({ size = 140, className }: Props) {
  const scale = size / 140
  return (
    <div className={className} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={140 * scale} height={110 * scale} viewBox="0 0 140 110" fill="none">
        {/* Background circle */}
        <circle cx="70" cy="55" r="52" fill="#F1F5F9" />

        {/* Ground line */}
        <rect x="16" y="88" width="108" height="2" rx="1" fill="#E2E8F0" />

        {/* Main building */}
        <rect x="38" y="32" width="44" height="56" rx="3" fill="#002E83" />
        {/* Roof accent */}
        <rect x="38" y="32" width="44" height="6" rx="3" fill="#0052B9" />
        {/* Windows row 1 */}
        <rect x="44" y="44" width="10" height="8" rx="1.5" fill="#0D82F9" opacity="0.9" />
        <rect x="58" y="44" width="10" height="8" rx="1.5" fill="#0D82F9" opacity="0.7" />
        <rect x="72" y="44" width="4" height="8" rx="1" fill="#0D82F9" opacity="0.5" />
        {/* Windows row 2 */}
        <rect x="44" y="56" width="10" height="8" rx="1.5" fill="#0D82F9" opacity="0.7" />
        <rect x="58" y="56" width="10" height="8" rx="1.5" fill="#0D82F9" opacity="0.9" />
        <rect x="72" y="56" width="4" height="8" rx="1" fill="#0D82F9" opacity="0.6" />
        {/* Door */}
        <rect x="53" y="72" width="14" height="16" rx="2" fill="#F59E0B" />
        <circle cx="64" cy="80" r="1.5" fill="#002E83" />

        {/* Small building (right) */}
        <rect x="86" y="54" width="28" height="34" rx="2.5" fill="#0D9488" />
        <rect x="86" y="54" width="28" height="5" rx="2.5" fill="#0F766E" />
        {/* Windows */}
        <rect x="91" y="63" width="7" height="6" rx="1" fill="#fff" opacity="0.35" />
        <rect x="102" y="63" width="7" height="6" rx="1" fill="#fff" opacity="0.25" />
        {/* Door */}
        <rect x="96" y="76" width="10" height="12" rx="1.5" fill="#fff" opacity="0.2" />

        {/* Small element (left) — a tree */}
        <rect x="26" y="68" width="4" height="20" rx="2" fill="#0D9488" opacity="0.6" />
        <circle cx="28" cy="64" r="8" fill="#0D9488" opacity="0.25" />
        <circle cx="28" cy="62" r="6" fill="#0D9488" opacity="0.35" />

        {/* Flag on main building */}
        <rect x="56" y="24" width="2" height="10" rx="1" fill="#9CA3AF" />
        <rect x="58" y="24" width="8" height="5" rx="1" fill="#F59E0B" />

        {/* Decorative dots */}
        <circle cx="120" cy="40" r="2" fill="#0D82F9" opacity="0.3" />
        <circle cx="18" cy="48" r="1.5" fill="#0D9488" opacity="0.3" />
      </svg>
    </div>
  )
}
