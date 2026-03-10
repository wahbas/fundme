import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { StepCompleteIcon, StepCurrentIcon, StepUpcomingIcon, ChevronUpIcon, ChevronDownIcon, ArrowRightIcon } from '../icons/WidgetIcons'

const steps = [
  {
    title: 'Create Account',
    status: 'completed' as const,
  },
  {
    title: 'Verify Your Identity',
    description: 'Complete Nafath biometric verification. Required by Saudi Arabian regulations.',
    status: 'current' as const,
    timeLabel: '~2 min',
    actionLabel: 'Verify Now',
    stepId: 'verify-identity',
  },
  {
    title: 'Verify Your Business',
    status: 'pending' as const,
    stepId: 'verify-business',
  },
  {
    title: 'Connect Your Bank',
    status: 'pending' as const,
    stepId: 'connect-bank',
  },
  {
    title: 'Upload Documents',
    status: 'pending' as const,
    stepId: 'upload-documents',
  },
]

export default function OnboardingChecklist() {
  const navigate = useNavigate()
  const [minimized, setMinimized] = useState(false)

  const completed = steps.filter((s) => s.status === 'completed').length
  const total = steps.length
  const percent = Math.round((completed / total) * 100)

  return (
    <div style={cardStyle}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: minimized ? 0 : 4 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1E293B', margin: 0 }}>Complete Your Profile</h3>
        <button
          onClick={() => setMinimized((v) => !v)}
          style={{
            background: '#F1F5F9',
            border: 'none',
            borderRadius: 6,
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          {minimized ? <ChevronDownIcon size={18} /> : <ChevronUpIcon size={18} />}
        </button>
      </div>

      {!minimized && (
        <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 16px' }}>
          Finish setup to unlock financing options
        </p>
      )}

      <AnimatePresence>
        {!minimized && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            {/* Progress bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ flex: 1, height: 6, background: '#E2E8F0', borderRadius: 3 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{ height: '100%', background: '#2563EB', borderRadius: 3 }}
                />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#1E293B', flexShrink: 0 }}>{completed}/{total} Complete</span>
            </div>

            {/* Step list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {steps.map((step, i) => {
                const isCompleted = step.status === 'completed'
                const isCurrent = step.status === 'current'

                return (
                  <div key={step.title}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: isCurrent ? '10px 12px 6px' : '8px 12px',
                        borderRadius: isCurrent ? '10px 10px 0 0' : 8,
                        borderLeft: isCurrent ? '3px solid #2563EB' : '3px solid transparent',
                        background: isCurrent ? '#EFF6FF' : 'transparent',
                      }}
                    >
                      {/* Step icon */}
                      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                        {isCompleted ? (
                          <StepCompleteIcon size={22} />
                        ) : isCurrent ? (
                          <StepCurrentIcon size={22} number={i + 1} />
                        ) : (
                          <StepUpcomingIcon size={22} number={i + 1} />
                        )}
                      </div>

                      {/* Title */}
                      <span
                        style={{
                          flex: 1,
                          fontSize: 13,
                          fontWeight: isCurrent ? 600 : 400,
                          color: isCompleted ? '#94A3B8' : isCurrent ? '#1E293B' : '#64748B',
                          textDecoration: isCompleted ? 'line-through' : 'none',
                        }}
                      >
                        {step.title}
                      </span>

                      {/* Completed badge */}
                      {isCompleted && (
                        <span style={{ fontSize: 11, fontWeight: 500, color: '#10B981', background: '#ECFDF5', padding: '2px 8px', borderRadius: 4 }}>
                          Completed
                        </span>
                      )}
                    </div>

                    {/* Current step expanded detail */}
                    {isCurrent && (
                      <div
                        style={{
                          padding: '0 12px 12px 44px',
                          borderLeft: '3px solid #2563EB',
                          background: '#EFF6FF',
                          borderRadius: '0 0 10px 10px',
                        }}
                      >
                        <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5, margin: '0 0 10px' }}>
                          {step.description}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          {step.timeLabel && (
                            <span style={{ fontSize: 11, color: '#64748B', background: '#DBEAFE', padding: '3px 10px', borderRadius: 12 }}>
                              {step.timeLabel}
                            </span>
                          )}
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => step.stepId && navigate(`/onboarding?step=${step.stepId}`)}
                            style={{
                              padding: '6px 16px',
                              fontSize: 12,
                              fontWeight: 600,
                              color: '#fff',
                              background: '#2563EB',
                              borderRadius: 8,
                              border: 'none',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 4,
                            }}
                          >
                            {step.actionLabel}
                            <ArrowRightIcon size={14} color="#fff" />
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderRadius: 12,
  padding: '20px 22px',
}
