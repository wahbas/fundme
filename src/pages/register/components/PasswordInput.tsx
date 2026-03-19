import { useState } from 'react'
import { Lock, Eye, EyeOff, Check } from 'lucide-react'

interface Props {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: boolean
  showStrength?: boolean
}

function getStrength(pw: string): { level: number; label: string; color: string; width: string } {
  if (!pw) return { level: 0, label: '', color: '#E2E8F0', width: '0%' }
  let s = 0
  if (pw.length >= 8) s++
  if (/[A-Z]/.test(pw)) s++
  if (/[a-z]/.test(pw)) s++
  if (/[0-9]/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  if (s <= 2) return { level: 1, label: 'Weak', color: '#EF4444', width: '25%' }
  if (s === 3) return { level: 2, label: 'Medium', color: '#F59E0B', width: '50%' }
  if (s === 4) return { level: 3, label: 'Strong', color: '#22C55E', width: '75%' }
  return { level: 4, label: 'Very strong', color: '#059669', width: '100%' }
}

const CHECKS = [
  { key: 'length', label: '8+ characters', test: (pw: string) => pw.length >= 8 },
  { key: 'upper', label: 'Uppercase', test: (pw: string) => /[A-Z]/.test(pw) },
  { key: 'lower', label: 'Lowercase', test: (pw: string) => /[a-z]/.test(pw) },
  { key: 'number', label: 'Number', test: (pw: string) => /[0-9]/.test(pw) },
  { key: 'special', label: 'Special', test: (pw: string) => /[^A-Za-z0-9]/.test(pw) },
]

export default function PasswordInput({ value, onChange, placeholder, error, showStrength }: Props) {
  const [show, setShow] = useState(false)
  const [focused, setFocused] = useState(false)
  const strength = getStrength(value)

  const borderColor = error ? '#EF4444' : focused ? '#0D82F9' : '#E2E8F0'

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <Lock size={18} color="#9CA3AF" />
        </div>
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder || 'Password'}
          style={{
            width: '100%',
            height: 48,
            paddingLeft: 42,
            paddingRight: 42,
            fontSize: 14,
            color: '#111',
            border: `1.5px solid ${borderColor}`,
            borderRadius: 12,
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
            boxSizing: 'border-box',
            background: focused ? '#fff' : '#F8FAFC',
            boxShadow: focused && !error ? '0 0 0 3px rgba(13,130,249,0.08)' : 'none',
          }}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          style={{
            position: 'absolute',
            right: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
          }}
        >
          {show ? <EyeOff size={18} color="#9CA3AF" /> : <Eye size={18} color="#9CA3AF" />}
        </button>
      </div>

      {showStrength && value && (
        <div style={{ marginTop: 10 }}>
          {/* Strength bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ flex: 1, height: 4, borderRadius: 2, background: '#E2E8F0' }}>
              <div
                style={{
                  height: '100%',
                  borderRadius: 2,
                  width: strength.width,
                  background: strength.color,
                  transition: 'width 0.3s, background 0.3s',
                }}
              />
            </div>
            <span style={{ fontSize: 11, fontWeight: 500, color: strength.color, flexShrink: 0 }}>
              {strength.label}
            </span>
          </div>

          {/* Checklist */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px' }}>
            {CHECKS.map(({ key, label, test }) => {
              const met = test(value)
              return (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: met ? '#22C55E' : '#E2E8F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.2s',
                    }}
                  >
                    {met && <Check size={8} color="#fff" strokeWidth={3} />}
                  </div>
                  <span style={{ fontSize: 11, color: met ? '#22C55E' : '#94A3B8' }}>{label}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
