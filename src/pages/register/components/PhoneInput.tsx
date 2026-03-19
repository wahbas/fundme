import { useState } from 'react'

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
      <text x="12" y="11" textAnchor="middle" fill="white" fontSize="6" fontWeight="700" fontFamily="sans-serif">
        KSA
      </text>
    </svg>
  )
}

interface Props {
  value: string
  onChange: (raw: string, formatted: string) => void
  error?: string
  onSubmit?: () => void
}

export default function PhoneInput({ value, onChange, error, onSubmit }: Props) {
  const [focused, setFocused] = useState(false)

  function handleChange(input: string) {
    const digits = input.replace(/[^\d]/g, '').slice(0, 9)
    onChange(digits, formatPhone(digits))
  }

  const borderColor = error ? '#EF4444' : focused ? '#0D82F9' : '#E2E8F0'

  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>
        Mobile Number
      </label>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          border: `1.5px solid ${borderColor}`,
          borderRadius: 12,
          overflow: 'hidden',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          background: focused ? '#fff' : '#F8FAFC',
          boxShadow: focused && !error ? '0 0 0 3px rgba(13,130,249,0.08)' : 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '0 12px',
            height: 48,
            borderRight: '1px solid #E2E8F0',
            flexShrink: 0,
            background: '#F8FAFC',
          }}
        >
          <SaudiFlag />
          <span style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>+966</span>
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
            color: '#111',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            letterSpacing: 0.5,
          }}
        />
      </div>
      {error ? (
        <p style={{ fontSize: 12, color: '#EF4444', marginTop: 6 }}>{error}</p>
      ) : (
        <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 6 }}>
          We'll send you a verification code via SMS
        </p>
      )}
    </div>
  )
}
