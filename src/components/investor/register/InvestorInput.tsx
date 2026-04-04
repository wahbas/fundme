import { useState } from 'react'
import { useInvestorTheme } from '../InvestorThemeContext'

interface Props {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  error?: string
  icon?: React.ReactNode
  type?: string
  inputMode?: 'text' | 'numeric' | 'email' | 'tel'
  maxLength?: number
  disabled?: boolean
  onSubmit?: () => void
}

export default function InvestorInput({
  value,
  onChange,
  placeholder,
  label,
  error,
  icon,
  type = 'text',
  inputMode,
  maxLength,
  disabled,
  onSubmit,
}: Props) {
  const { theme, isDark } = useInvestorTheme()
  const [focused, setFocused] = useState(false)

  const borderColor = error
    ? theme.red
    : focused
      ? theme.blue
      : isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)'

  return (
    <div>
      {label && (
        <label
          style={{
            display: 'block',
            fontSize: 13,
            fontWeight: 500,
            color: theme.textSecondary,
            marginBottom: 6,
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <div
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              display: 'flex',
            }}
          >
            {icon}
          </div>
        )}
        <input
          type={type}
          inputMode={inputMode}
          maxLength={maxLength}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit?.()}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            width: '100%',
            height: 48,
            paddingLeft: icon ? 42 : 16,
            paddingRight: 16,
            fontSize: 14,
            fontFamily: 'inherit',
            color: theme.textPrimary,
            border: `1.5px solid ${borderColor}`,
            borderRadius: 14,
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
            boxSizing: 'border-box',
            background: isDark
              ? focused ? 'rgba(0,48,107,0.3)' : 'rgba(0,48,107,0.2)'
              : focused ? '#fff' : '#F8FAFC',
            boxShadow: focused && !error ? '0 0 0 3px rgba(13,130,249,0.12)' : 'none',
          }}
        />
      </div>
      {error && (
        <p style={{ fontSize: 11, color: theme.red, marginTop: 6, margin: '6px 0 0' }}>{error}</p>
      )}
    </div>
  )
}
