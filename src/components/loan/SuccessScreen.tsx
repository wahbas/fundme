import { CheckCircle2 } from 'lucide-react'
import { useTheme } from '../../ThemeContext'

export default function SuccessScreen({ onBackToDashboard }: { onBackToDashboard: () => void }) {
  const { theme } = useTheme()
  return (
    <div style={{ textAlign: 'center', padding: '80px 0' }}>
      <div
        style={{
          width: 96,
          height: 96,
          margin: '0 auto 24px',
          background: '#80FF00',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CheckCircle2 size={48} color="#002E83" />
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 700, color: theme.textPrimary, marginBottom: 8 }}>
        Application Submitted!
      </h2>
      <p style={{ fontSize: 14, color: theme.textMuted, maxWidth: 420, margin: '0 auto 32px' }}>
        Your loan application has been received. We'll review it and get back to you within 24-48 hours.
      </p>

      <div
        style={{
          background: theme.bgPrimary,
          borderRadius: 16,
          padding: 24,
          maxWidth: 380,
          margin: '0 auto 32px',
        }}
      >
        <p style={{ fontSize: 13, color: theme.textMuted, marginBottom: 4 }}>Application Reference</p>
        <p style={{ fontSize: 24, fontFamily: 'monospace', fontWeight: 700, color: '#002E83' }}>
          #APP-2025-00142
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
        <button
          style={{
            padding: '12px 24px',
            background: '#002E83',
            color: '#fff',
            fontWeight: 600,
            fontSize: 14,
            borderRadius: 12,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Track Application
        </button>
        <button
          onClick={onBackToDashboard}
          style={{
            padding: '12px 24px',
            border: `1px solid ${theme.border}`,
            color: theme.textSecondary,
            fontWeight: 600,
            fontSize: 14,
            borderRadius: 12,
            background: theme.cardBg,
            cursor: 'pointer',
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}
