import RadioCard from '../shared/RadioCard'
import { useTheme } from '../../../ThemeContext'
import type { WizardData } from '../types'

interface Props {
  data: WizardData
  onChange: (patch: Partial<WizardData>) => void
}

const sections: {
  key: keyof WizardData
  title: string
  options: { value: string; label: string; desc?: string }[]
}[] = [
  {
    key: 'purpose',
    title: 'Purpose of financing',
    options: [
      { value: 'working-capital', label: 'Working capital', desc: 'Fund daily operations' },
      { value: 'new-projects', label: 'New projects', desc: 'Expand into new areas' },
      { value: 'repay', label: 'Repay obligations', desc: 'Settle existing debts' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    key: 'revenue',
    title: 'Total revenue last 12 months',
    options: [
      { value: '<1M', label: 'Less than 1M' },
      { value: '1-5M', label: '1M \u2013 5M' },
      { value: '5-20M', label: '5M \u2013 20M' },
      { value: '>20M', label: 'More than 20M' },
    ],
  },
  {
    key: 'contracts',
    title: 'Active contracts?',
    options: [
      { value: 'gov', label: 'Yes \u2013 Government' },
      { value: 'private', label: 'Yes \u2013 Private sector' },
      { value: 'none', label: 'No active contracts' },
    ],
  },
  {
    key: 'debt',
    title: 'Current debt obligations',
    options: [
      { value: 'none', label: 'None' },
      { value: 'short', label: 'Short-term only' },
      { value: 'long', label: 'Long-term only' },
      { value: 'both', label: 'Both short & long-term' },
    ],
  },
  {
    key: 'bankBalance',
    title: 'Average bank balance',
    options: [
      { value: '<500K', label: 'Less than 500K' },
      { value: '500K-2M', label: '500K \u2013 2M' },
      { value: '>2M', label: 'More than 2M' },
    ],
  },
]

export default function BusinessProfile({ data, onChange }: Props) {
  const { theme } = useTheme()
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textPrimary, marginBottom: 6 }}>Business Profile</h2>
      <p style={{ fontSize: 14, color: theme.textMuted, marginBottom: 28 }}>Help us understand your business needs</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {sections.map((sec) => (
          <div key={sec.key}>
            <p style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary, marginBottom: 10 }}>{sec.title}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {sec.options.map((opt) => (
                <RadioCard
                  key={opt.value}
                  label={opt.label}
                  description={opt.desc}
                  selected={data[sec.key] === opt.value}
                  onClick={() => onChange({ [sec.key]: opt.value })}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
