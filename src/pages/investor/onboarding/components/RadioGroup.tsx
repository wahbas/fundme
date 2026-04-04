import { useInvestorTheme } from '../../../../components/investor/InvestorThemeContext'

interface Option {
  value: string
  label: string
  description?: string
}

interface Props {
  label: string
  helperText?: string
  options: Option[]
  value: string
  onChange: (value: string) => void
  error?: string
  columns?: number
}

export default function RadioGroup({ label, helperText, options, value, onChange, error, columns = 1 }: Props) {
  const { theme, isDark } = useInvestorTheme()

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: theme.textHeading, marginBottom: 4 }}>
        {label}
      </div>
      {helperText && (
        <div style={{ fontSize: 11, color: theme.textTertiary, marginBottom: 10, lineHeight: 1.4 }}>
          {helperText}
        </div>
      )}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 8,
      }}>
        {options.map((opt) => {
          const selected = value === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 14px',
                border: `1.5px solid ${selected ? theme.blue : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                borderRadius: 12,
                background: selected
                  ? isDark ? 'rgba(13,130,249,0.1)' : 'rgba(13,130,249,0.04)'
                  : 'transparent',
                cursor: 'pointer',
                fontFamily: 'inherit',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              {/* Radio dot */}
              <div style={{
                width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                border: `2px solid ${selected ? theme.blue : isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 0.2s',
              }}>
                {selected && (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: theme.blue }} />
                )}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: selected ? theme.textHeading : theme.textSecondary }}>
                  {opt.label}
                </div>
                {opt.description && (
                  <div style={{ fontSize: 11, color: theme.textTertiary, marginTop: 2 }}>
                    {opt.description}
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>
      {error && (
        <div style={{ fontSize: 11, color: theme.red, marginTop: 6 }}>{error}</div>
      )}
    </div>
  )
}
