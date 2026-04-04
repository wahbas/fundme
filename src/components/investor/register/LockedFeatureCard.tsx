import { Lock } from 'lucide-react'
import { useInvestorTheme } from '../InvestorThemeContext'

interface Props {
  title: string
  description: string
  icon: React.ReactNode
  style?: React.CSSProperties
}

export default function LockedFeatureCard({ title, description, icon, style }: Props) {
  const { theme, isDark } = useInvestorTheme()

  return (
    <div
      style={{
        background: theme.cardBg,
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: theme.cardRadius,
        backdropFilter: theme.cardBlur,
        padding: '32px 24px',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Blurred content preview */}
      <div style={{ filter: 'blur(6px)', opacity: 0.3, pointerEvents: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          {icon}
          <div style={{ fontSize: 16, fontWeight: 600, color: theme.textHeading }}>{title}</div>
        </div>
        <div style={{ height: 8, background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)', borderRadius: 4, marginBottom: 8, width: '80%' }} />
        <div style={{ height: 8, background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)', borderRadius: 4, marginBottom: 8, width: '60%' }} />
        <div style={{ height: 8, background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)', borderRadius: 4, width: '40%' }} />
      </div>

      {/* Lock overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          background: isDark
            ? 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 100%)'
            : 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.3) 100%)',
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Lock size={20} color={theme.textTertiary} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 500, color: theme.textTertiary }}>
          {description}
        </span>
      </div>
    </div>
  )
}
