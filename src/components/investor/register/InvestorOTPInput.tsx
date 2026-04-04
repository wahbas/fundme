import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInvestorTheme } from '../InvestorThemeContext'

interface Props {
  value: string[]
  onChange: (otp: string[]) => void
  error?: boolean
  disabled?: boolean
  onComplete?: (code: string) => void
}

export default function InvestorOTPInput({ value, onChange, error, disabled, onComplete }: Props) {
  const { theme, isDark } = useInvestorTheme()
  const refs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    refs.current[0]?.focus()
  }, [])

  function handleDigit(index: number, input: string) {
    if (!/^\d*$/.test(input)) return
    const digit = input.slice(-1)
    const next = [...value]
    next[index] = digit
    onChange(next)
    if (digit && index < 5) refs.current[index + 1]?.focus()
    if (digit && index === 5 && next.every((d) => d)) onComplete?.(next.join(''))
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      refs.current[index - 1]?.focus()
      const next = [...value]
      next[index - 1] = ''
      onChange(next)
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (text.length === 6) {
      const next = text.split('')
      onChange(next)
      refs.current[5]?.focus()
      onComplete?.(text)
    }
  }

  const Wrapper = error ? motion.div : 'div'
  const wrapperProps = error
    ? { animate: { x: [0, -8, 8, -6, 6, -3, 3, 0] }, transition: { duration: 0.4 } }
    : {}

  return (
    <Wrapper
      {...(wrapperProps as any)}
      style={{ display: 'flex', gap: 8, justifyContent: 'center' }}
    >
      {value.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleDigit(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          disabled={disabled}
          style={{
            width: 52,
            height: 60,
            textAlign: 'center',
            fontSize: 22,
            fontWeight: 700,
            fontFamily: 'inherit',
            color: theme.textPrimary,
            border: `2px solid ${error ? theme.red : digit ? theme.blue : isDark ? 'rgba(255,255,255,0.14)' : '#E2E8F0'}`,
            borderRadius: 14,
            outline: 'none',
            transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
            background: isDark
              ? disabled ? 'rgba(0,48,107,0.1)' : 'rgba(0,48,107,0.2)'
              : disabled ? '#F1F5F9' : '#F8FAFC',
          }}
          onFocus={(e) => {
            if (!error) {
              e.currentTarget.style.borderColor = theme.blue
              e.currentTarget.style.background = isDark ? 'rgba(0,48,107,0.3)' : '#fff'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(13,130,249,0.12)'
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = 'none'
            if (!error) {
              e.currentTarget.style.borderColor = digit ? theme.blue : isDark ? 'rgba(255,255,255,0.14)' : '#E2E8F0'
              e.currentTarget.style.background = isDark ? 'rgba(0,48,107,0.2)' : '#F8FAFC'
            }
          }}
        />
      ))}
    </Wrapper>
  )
}
