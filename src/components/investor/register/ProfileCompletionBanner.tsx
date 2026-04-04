import { Shield, ArrowRight } from 'lucide-react'
import { useInvestorTheme } from '../InvestorThemeContext'

interface Props {
  completionPercent: number
  currentStep: string
  onContinue: () => void
}

export default function ProfileCompletionBanner({ completionPercent, currentStep, onContinue }: Props) {
  const { theme, isDark } = useInvestorTheme()

  return (
    <div
      style={{
        background: theme.cardBg,
        border: `1px solid ${isDark ? 'rgba(212,168,67,0.12)' : 'rgba(212,168,67,0.2)'}`,
        borderRadius: theme.cardRadius,
        backdropFilter: theme.cardBlur,
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}
    >
      {/* Shield icon */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: isDark ? 'rgba(212,168,67,0.1)' : 'rgba(212,168,67,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Shield size={22} color="#D4A843" />
      </div>

      {/* Text + progress */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: theme.textHeading, marginBottom: 4 }}>
          Complete your verification
        </div>
        <div style={{ fontSize: 12, color: theme.textSecondary, marginBottom: 10 }}>
          {currentStep} — {completionPercent}% complete
        </div>
        {/* Progress bar */}
        <div
          style={{
            height: 6,
            borderRadius: 3,
            background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${completionPercent}%`,
              background: 'linear-gradient(90deg, #D4A843, #E8C872)',
              borderRadius: 3,
              transition: 'width 0.4s ease-out',
            }}
          />
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onContinue}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '10px 20px',
          background: 'linear-gradient(135deg, #0D82F9 0%, #0668CC 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 12,
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'inherit',
          whiteSpace: 'nowrap',
          transition: 'box-shadow 0.2s',
          boxShadow: '0 4px 12px rgba(13,130,249,0.25)',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(13,130,249,0.4)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(13,130,249,0.25)'
        }}
      >
        Continue Verification
        <ArrowRight size={14} />
      </button>
    </div>
  )
}
