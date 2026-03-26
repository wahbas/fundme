import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { StepCompleteIcon, StepCurrentIcon, StepUpcomingIcon, ChevronUpIcon, ChevronDownIcon, ArrowRightIcon, ArrowLeftIcon } from '../icons/WidgetIcons'
import { useTheme } from '../../ThemeContext'
import { useI18n } from '../../i18n'

export default function OnboardingChecklist() {
  const navigate = useNavigate()
  const [minimized, setMinimized] = useState(false)
  const { theme } = useTheme()
  const { t, isRTL } = useI18n()

  const steps = [
    {
      title: t('onboarding.verifyIdentity'),
      description: 'Identity verified with Nafath',
      status: 'completed' as const,
      stepId: 'create-account',
    },
    {
      title: t('onboarding.verifyBusiness'),
      description: 'Connect your Commercial Registration via Wathiq.',
      status: 'current' as const,
      timeLabel: '~3 min',
      actionLabel: t('onboarding.getStarted'),
      stepId: 'verify-business',
    },
    {
      title: t('onboarding.connectBank'),
      status: 'pending' as const,
      stepId: 'connect-bank',
    },
    {
      title: t('onboarding.uploadDocuments'),
      status: 'pending' as const,
      stepId: 'upload-documents',
    },
  ]

  const completed = steps.filter((s) => s.status === 'completed').length
  const total = steps.length
  const percent = Math.round((completed / total) * 100)

  return (
    <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '20px 22px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: minimized ? 0 : 4 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: theme.textPrimary, margin: 0 }}>{t('onboarding.completeProfile')}</h3>
        <button
          onClick={() => setMinimized((v) => !v)}
          style={{
            background: theme.borderLight,
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
        <p style={{ fontSize: 12, color: theme.textSecondary, margin: '0 0 16px' }}>
          {t('onboarding.finishSetup')}
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
              <div style={{ flex: 1, height: 6, background: theme.border, borderRadius: 3 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{ height: '100%', background: '#2563EB', borderRadius: 3 }}
                />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: theme.textPrimary, flexShrink: 0 }}>{completed}/{total} {t('onboarding.complete')}</span>
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
                        background: isCurrent ? (theme.isDark ? 'rgba(37,99,235,0.12)' : '#EFF6FF') : 'transparent',
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
                          color: isCompleted ? theme.textMuted : isCurrent ? theme.textPrimary : theme.textSecondary,
                          textDecoration: isCompleted ? 'line-through' : 'none',
                        }}
                      >
                        {step.title}
                      </span>

                      {/* Completed badge */}
                      {isCompleted && (
                        <span style={{ fontSize: 11, fontWeight: 500, color: '#10B981', background: '#ECFDF5', padding: '2px 8px', borderRadius: 4 }}>
                          {t('onboarding.completed')}
                        </span>
                      )}
                    </div>

                    {/* Current step expanded detail */}
                    {isCurrent && (
                      <div
                        style={{
                          padding: '0 12px 12px 44px',
                          borderLeft: '3px solid #2563EB',
                          background: theme.isDark ? 'rgba(37,99,235,0.12)' : '#EFF6FF',
                          borderRadius: '0 0 10px 10px',
                        }}
                      >
                        <p style={{ fontSize: 12, color: theme.textSecondary, lineHeight: 1.5, margin: '0 0 10px' }}>
                          {step.description}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          {step.timeLabel && (
                            <span style={{ fontSize: 11, color: theme.isDark ? '#93C5FD' : '#64748B', background: theme.isDark ? 'rgba(37,99,235,0.2)' : '#DBEAFE', padding: '3px 10px', borderRadius: 12 }}>
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
                            <span style={{ display: 'inline-flex' }}>{isRTL ? <ArrowLeftIcon size={14} color="#fff" /> : <ArrowRightIcon size={14} color="#fff" />}</span>
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

// cardStyle moved inline to use theme
