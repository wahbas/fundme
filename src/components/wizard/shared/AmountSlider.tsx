import RiyalSign from '../../icons/RiyalSign'
import { useTheme } from '../../../ThemeContext'

interface AmountSliderProps {
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
}

export default function AmountSlider({ value, min, max, step = 10000, onChange }: AmountSliderProps) {
  const { theme } = useTheme()
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <span style={{ fontSize: 36, fontWeight: 700, color: '#002E83' }}>
          {value.toLocaleString()}<RiyalSign size="lg" />
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: '100%',
          height: 8,
          borderRadius: 4,
          appearance: 'none',
          background: `linear-gradient(to right, #0D82F9 ${pct}%, ${theme.border} ${pct}%)`,
          cursor: 'pointer',
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: theme.textMuted, marginTop: 8 }}>
        <span>{min.toLocaleString()}<RiyalSign size="sm" /></span>
        <span>{max.toLocaleString()}<RiyalSign size="sm" /></span>
      </div>
    </div>
  )
}
