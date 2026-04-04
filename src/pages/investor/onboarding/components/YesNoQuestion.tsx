import { useInvestorTheme } from '../../../../components/investor/InvestorThemeContext'

interface Props {
  question: string
  helperText?: string
  value: boolean | null
  onChange: (value: boolean) => void
}

export default function YesNoQuestion({ question, helperText, value, onChange }: Props) {
  const { theme, isDark } = useInvestorTheme()

  const options = [
    { val: false, label: 'No' },
    { val: true, label: 'Yes' },
  ]

  return (
    <div style={{
      padding: '16px 18px',
      borderRadius: 14,
      background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
      marginBottom: 12,
    }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: theme.textHeading, marginBottom: helperText ? 4 : 10 }}>
        {question}
      </div>
      {helperText && (
        <div style={{ fontSize: 11, color: theme.textTertiary, marginBottom: 10, lineHeight: 1.4 }}>
          {helperText}
        </div>
      )}
      <div style={{ display: 'flex', gap: 8 }}>
        {options.map((opt) => {
          const selected = value === opt.val
          return (
            <button
              key={String(opt.val)}
              onClick={() => onChange(opt.val)}
              style={{
                flex: 1,
                padding: '8px 0',
                border: `1.5px solid ${selected ? theme.blue : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                borderRadius: 8,
                background: selected
                  ? isDark ? 'rgba(13,130,249,0.12)' : 'rgba(13,130,249,0.06)'
                  : 'transparent',
                color: selected ? theme.blue : theme.textSecondary,
                fontSize: 13,
                fontWeight: selected ? 600 : 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s',
              }}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
