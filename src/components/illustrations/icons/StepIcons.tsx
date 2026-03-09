const circle = (size: number): React.CSSProperties => ({
  width: size,
  height: size,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
})

export const CreateAccountIcon = ({ size = 44 }: { size?: number }) => (
  <div style={{ ...circle(size), background: 'linear-gradient(135deg, #F472B6, #EC4899)' }}>
    <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  </div>
)

export const VerifyIdentityIcon = ({ size = 44 }: { size?: number }) => (
  <div style={{ ...circle(size), background: 'linear-gradient(135deg, #0D82F9, #6366F1)' }}>
    <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  </div>
)

export const ConnectBankIcon = ({ size = 44, disabled = false }: { size?: number; disabled?: boolean }) => (
  <div style={{ ...circle(size), background: disabled ? '#F5F5F5' : 'linear-gradient(135deg, #06B6D4, #0D82F9)' }}>
    <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke={disabled ? '#9CA3AF' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </svg>
  </div>
)

export const UploadDocumentsIcon = ({ size = 44, disabled = false }: { size?: number; disabled?: boolean }) => (
  <div style={{ ...circle(size), background: disabled ? '#F5F5F5' : 'linear-gradient(135deg, #8B5CF6, #EC4899)' }}>
    <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke={disabled ? '#9CA3AF' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="18" x2="12" y2="12" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
  </div>
)

export const CompletedIcon = ({ size = 44 }: { size?: number }) => (
  <div style={{ ...circle(size), background: '#80FF00' }}>
    <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke="#002E83" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
)
