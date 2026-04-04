import { useState } from 'react'
import { useInvestorTheme } from '../InvestorThemeContext'

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 9)
  if (digits.length <= 2) return digits
  if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`
  return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`
}

function SaudiFlag() {
  return (
    <svg width="24" height="16" viewBox="0 0 24 16" style={{ borderRadius: 2, flexShrink: 0 }}>
      <rect width="24" height="16" fill="#006C35" rx="2" />
      <text x="12" y="11" textAnchor="middle" fill="white" fontSize="6" fontWeight="700" fontFamily="sans-serif">KSA</text>
    </svg>
  )
}

interface Props {
  value: string
  onChange: (raw: string, formatted: string) => void
  error?: string
  onSubmit?: () => void
}

export default function InvestorPhoneInput({ value, onChange, error, onSubmit }: Props) {
  const { theme, isDark } = useInvestorTheme()
  const [focused, setFocused] = useState(false)

  function handleChange(input: string) {
    const digits = input.replace(/[^\d]/g, '').slice(0, 9)
    onChange(digits, formatPhone(digits))
  }

  const borderColor = error
    ? theme.red
    : focused
      ? theme.blue
      : isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)'

  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.textSecondary, marginBottom: 6 }}>
        Mobile Number
      </label>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          border: `1.5px solid ${borderColor}`,
          borderRadius: 14,
          overflow: 'hidden',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          background: isDark
            ? focused ? 'rgba(0,48,107,0.3)' : 'rgba(0,48,107,0.2)'
            : focused ? '#fff' : '#F8FAFC',
          boxShadow: focused && !error ? '0 0 0 3px rgba(13,130,249,0.12)' : 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '0 12px',
            height: 48,
            borderRight: `1px solid ${isDark ? 'rgba(255,255,255,0.14)' : '#E2E8F0'}`,
            flexShrink: 0,
            background: isDark ? 'rgba(0,48,107,0.3)' : '#F8FAFC',
          }}
        >
          <SaudiFlag />
          <span style={{ fontSize: 14, fontWeight: 500, color: theme.textPrimary }}>+966</span>
        </div>
        <input
          type="tel"
          inputMode="numeric"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit?.()}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="5X XXX XXXX"
          autoFocus
          style={{
            flex: 1,
            height: 48,
            padding: '0 14px',
            fontSize: 15,
            color: theme.textPrimary,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            letterSpacing: 0.5,
            fontFamily: 'inherit',
          }}
        />
      </div>
      {error ? (
        <p style={{ fontSize: 12, color: theme.red, marginTop: 6, margin: '6px 0 0' }}>{error}</p>
      ) : (
        <p style={{ fontSize: 12, color: theme.textSecondary, marginTop: 6, margin: '6px 0 0' }}>
          We'll send you a verification code via SMS
        </p>
      )}
    </div>
  )
}
