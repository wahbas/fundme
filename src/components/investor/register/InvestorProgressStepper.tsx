import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInvestorTheme } from '../InvestorThemeContext'

interface Props {
  currentStep: number // 1-5
  totalSteps?: number
}

export default function InvestorProgressStepper({ currentStep, totalSteps = 5 }: Props) {
  const { theme, isDark } = useInvestorTheme()

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 28 }}>
      {Array.from({ length: totalSteps }).map((_, i) => {
        const step = i + 1
        const isCompleted = step < currentStep
        const isActive = step === currentStep
        const isFuture = step > currentStep

        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < totalSteps - 1 ? 1 : 0 }}>
            {/* Circle */}
            <div style={{ position: 'relative' }}>
              {isActive && (
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{
                    position: 'absolute',
                    inset: -4,
                    borderRadius: '50%',
                    border: `2px solid ${theme.blue}`,
                  }}
                />
              )}
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 700,
                  transition: 'all 0.3s',
                  ...(isCompleted
                    ? { background: theme.blue, color: '#fff' }
                    : isActive
                      ? { background: theme.blue, color: '#fff', boxShadow: '0 0 12px rgba(13,130,249,0.3)' }
                      : { background: 'transparent', border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`, color: theme.textTertiary }),
                }}
              >
                {isCompleted ? <Check size={14} strokeWidth={3} /> : step}
              </div>
            </div>

            {/* Connecting line */}
            {i < totalSteps - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  marginLeft: 4,
                  marginRight: 4,
                  borderRadius: 1,
                  background: isCompleted
                    ? theme.blue
                    : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                  transition: 'background 0.3s',
                }}
              />
            )}
          </div>
        )
      })}

      {/* Step counter */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: theme.textTertiary,
          marginLeft: 12,
          whiteSpace: 'nowrap',
        }}
      >
        {currentStep}/{totalSteps}
      </div>
    </div>
  )
}
