const circle = (size: number): React.CSSProperties => ({
  width: size,
  height: size,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
})

export const FastApprovalIcon = ({ size = 56 }: { size?: number }) => (
  <div style={{ ...circle(size), background: 'linear-gradient(135deg, #002E83, #0D82F9)' }}>
    <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  </div>
)

export const CompetitiveRatesIcon = ({ size = 56 }: { size?: number }) => (
  <div style={{ ...circle(size), background: 'linear-gradient(135deg, #002E83, #0D82F9)' }}>
    <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  </div>
)

export const FlexibleTermsIcon = ({ size = 56 }: { size?: number }) => (
  <div style={{ ...circle(size), background: 'linear-gradient(135deg, #002E83, #0D82F9)' }}>
    <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  </div>
)
