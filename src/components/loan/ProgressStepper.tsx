import { Wallet, Building2, BarChart3, FileUp, CheckCircle, Check } from 'lucide-react'
import { useTheme } from '../../ThemeContext'

const steps = [
  { number: 1, label: 'Loan Details', icon: Wallet },
  { number: 2, label: 'Business Info', icon: Building2 },
  { number: 3, label: 'Financials', icon: BarChart3 },
  { number: 4, label: 'Documents', icon: FileUp },
  { number: 5, label: 'Review', icon: CheckCircle },
]

export default function ProgressStepper({ currentStep }: { currentStep: number }) {
  const { theme } = useTheme()
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 700, margin: '0 auto' }}>
      {steps.map((step, index) => {
        const completed = currentStep > step.number
        const active = currentStep === step.number
        const Icon = step.icon

        return (
          <div key={step.number} style={{ display: 'contents' }}>
            {/* Step */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: completed ? '#80FF00' : active ? '#002E83' : theme.bgPrimary,
                  color: completed ? '#002E83' : active ? '#fff' : '#9CA3AF',
                  transition: 'all 0.3s',
                }}
              >
                {completed ? <Check size={24} /> : <Icon size={24} />}
              </div>
              <span
                style={{
                  marginTop: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  color: currentStep >= step.number ? theme.textPrimary : theme.textMuted,
                }}
              >
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 4,
                  margin: '0 12px',
                  borderRadius: 2,
                  background: theme.border,
                  position: 'relative',
                  alignSelf: 'center',
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    right: completed ? 0 : '100%',
                    background: '#002E83',
                    borderRadius: 2,
                    transition: 'right 0.5s',
                    width: completed ? '100%' : '0%',
                  }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
