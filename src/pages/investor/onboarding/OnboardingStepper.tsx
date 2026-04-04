import { Check, ShieldCheck, UserCircle, FileCheck } from 'lucide-react'
import { useInvestorTheme } from '../../../components/investor/InvestorThemeContext'
import { useInvestorOnboarding } from './InvestorOnboardingContext'

const steps = [
  { label: 'Identity', icon: ShieldCheck },
  { label: 'Investor Profile', icon: UserCircle },
  { label: 'About You', icon: FileCheck },
]

export default function OnboardingStepper() {
  const { theme, isDark } = useInvestorTheme()
  const { state, getCompletionPercent } = useInvestorOnboarding()
  const pct = getCompletionPercent()

  return (
    <div style={{ marginBottom: 28 }}>
      {/* Progress bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: theme.textSecondary }}>Profile Completion</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: theme.blue }}>{pct}%</span>
      </div>
      <div style={{
        height: 4, borderRadius: 2, marginBottom: 24,
        background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
      }}>
        <div style={{
          height: '100%', borderRadius: 2, width: `${pct}%`,
          background: `linear-gradient(90deg, ${theme.blue}, #34D399)`,
          transition: 'width 0.5s ease-out',
        }} />
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', gap: 0 }}>
        {steps.map((step, i) => {
          const stepNum = i + 1
          const isCompleted = stepNum === 1
            ? true  // Identity always complete (Nafath done)
            : stepNum < state.currentStep
          const isActive = stepNum === state.currentStep
          const Icon = step.icon

          return (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 0 }}>
              {/* Step indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s',
                  ...(isCompleted
                    ? { background: '#22C55E', color: '#fff' }
                    : isActive
                      ? { background: theme.blue, color: '#fff', boxShadow: '0 0 12px rgba(13,130,249,0.3)' }
                      : { background: 'transparent', border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`, color: theme.textTertiary }),
                }}>
                  {isCompleted ? <Check size={16} strokeWidth={3} /> : <Icon size={16} />}
                </div>
                <span style={{
                  fontSize: 12, fontWeight: isActive ? 600 : 500, whiteSpace: 'nowrap',
                  color: isCompleted ? '#22C55E' : isActive ? theme.textHeading : theme.textTertiary,
                }}>
                  {step.label}
                </span>
              </div>

              {/* Connecting line */}
              {i < steps.length - 1 && (
                <div style={{
                  flex: 1, height: 1.5, marginLeft: 12, marginRight: 12,
                  background: isCompleted ? '#22C55E' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                  transition: 'background 0.3s',
                }} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
