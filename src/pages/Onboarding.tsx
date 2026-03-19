import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { X, Check, CheckCircle2, Building2, Landmark, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { STEP_ORDER, INITIAL_ONBOARDING_STATE, type OnboardingStep, type OnboardingState } from '../components/onboarding/types'
import WathiqVerification from '../components/onboarding/steps/WathiqVerification'
import BankConnection from '../components/onboarding/steps/BankConnection'
import logo from '../assets/logo.png'

// ─── Step metadata ───────────────────────────────────────────

const WIZARD_STEPS = [
  { id: 'verify-business' as const, label: 'Verify Business', icon: Building2 },
  { id: 'connect-bank' as const, label: 'Connect Bank', icon: Landmark },
]

// ─── Account Verified Screen ────────────────────────────────

const CHECKLIST_ITEMS = [
  'Account Created & Identity Verified',
  'Business Verified',
  'Bank Account Connected',
]

function AccountVerifiedScreen({ onGoToDashboard }: { onGoToDashboard: () => void }) {
  return (
    <div style={{ textAlign: 'center', padding: '24px 0', maxWidth: 440, margin: '0 auto' }}>
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          width: 96, height: 96, borderRadius: '50%', background: '#80FF00',
          margin: '0 auto 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <CheckCircle2 size={48} color="#002E83" />
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ fontSize: 26, fontWeight: 700, color: '#111827', marginBottom: 8 }}
      >
        Your Account is Verified!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6, marginBottom: 28 }}
      >
        Congratulations! Your account setup is complete. You can now start requesting financing.
      </motion.p>

      {/* Setup Complete Checklist */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ background: '#F9FAFB', borderRadius: 16, padding: 20, marginBottom: 24, textAlign: 'left' }}
      >
        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111827', marginBottom: 16 }}>Setup Complete</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {CHECKLIST_ITEMS.map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%', background: '#22C55E', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Check size={14} color="#fff" strokeWidth={3} />
              </div>
              <span style={{ fontSize: 14, color: '#374151' }}>{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onGoToDashboard}
        style={{
          width: '100%', padding: '16px 0', background: '#002E83', color: '#fff',
          fontWeight: 600, fontSize: 16, borderRadius: 12, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
      >
        Go to Dashboard
        <ArrowRight size={20} />
      </motion.button>
    </div>
  )
}

// ─── Main Wizard ─────────────────────────────────────────────

export default function Onboarding() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialStepParam = searchParams.get('step') as OnboardingStep | null

  const [state, setState] = useState<OnboardingState>(() => {
    const s = { ...INITIAL_ONBOARDING_STATE }
    if (initialStepParam && STEP_ORDER.includes(initialStepParam)) {
      s.currentStep = initialStepParam
    }
    return s
  })

  const [completed, setCompleted] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)

  const hasProgress = state.completedSteps.length > 1 // more than just create-account

  function handleClose() {
    if (hasProgress) {
      setShowExitModal(true)
    } else {
      navigate('/dashboard')
    }
  }

  const currentStepIndex = WIZARD_STEPS.findIndex((s) => s.id === state.currentStep)
  const progress = ((currentStepIndex + 1) / WIZARD_STEPS.length) * 100

  function goToStep(stepId: OnboardingStep) {
    if (state.completedSteps.includes(stepId)) {
      setState((prev) => ({ ...prev, currentStep: stepId }))
    }
  }

  function handleStepComplete(step: OnboardingStep, data: unknown) {
    setState((prev) => {
      const newCompleted = prev.completedSteps.includes(step)
        ? prev.completedSteps
        : [...prev.completedSteps, step]

      const stepIdx = STEP_ORDER.indexOf(step)
      const nextStep = STEP_ORDER[stepIdx + 1]

      return {
        ...prev,
        completedSteps: newCompleted,
        currentStep: nextStep || prev.currentStep,
        stepData: {
          ...prev.stepData,
          ...(step === 'verify-business' ? { business: data } : {}),
          ...(step === 'connect-bank' ? { bank: data } : {}),
        } as OnboardingState['stepData'],
      }
    })

    if (step === 'connect-bank') {
      setCompleted(true)
    }
  }

  if (completed) {
    return (
      <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: 'Poppins, sans-serif', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderBottom: '1px solid #E5E5E5' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '14px 32px' }}>
            <img src={logo} alt="FundMe" style={{ height: 32, filter: 'brightness(0) saturate(100%)' }} />
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <AccountVerifiedScreen onGoToDashboard={() => navigate('/dashboard')} />
        </div>
      </div>
    )
  }

  function renderStep() {
    switch (state.currentStep) {
      case 'verify-business':
        return <WathiqVerification data={state.stepData.business} nationalId={state.stepData.identity?.nationalId} onComplete={(d) => handleStepComplete('verify-business', d)} />
      case 'connect-bank':
        return <BankConnection data={state.stepData.bank} onComplete={(d) => handleStepComplete('connect-bank', d)} />
      default:
        return null
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: 'Poppins, sans-serif', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar — matches RequestFinancing */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E5E5E5', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src={logo} alt="FundMe" style={{ height: 32, filter: 'brightness(0) saturate(100%)' }} />
            <div style={{ width: 1, height: 20, background: '#E5E5E5' }} />
            <span style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>Account Setup</span>
          </div>
          <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}>
            <X size={22} color="#6B7280" />
          </button>
        </div>
        {/* Animated progress bar */}
        <div style={{ height: 3, background: '#E5E7EB' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ height: '100%', background: 'linear-gradient(90deg, #002E83, #0D82F9)', borderRadius: '0 2px 2px 0' }}
          />
        </div>
      </div>

      {/* Body — centered layout with horizontal stepper */}
      <div style={{ flex: 1, maxWidth: 640, margin: '0 auto', width: '100%', padding: '32px 32px 0' }}>
        {/* Horizontal progress stepper */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 36 }}>
          {WIZARD_STEPS.map((s, i) => {
            const isCompleted = state.completedSteps.includes(s.id)
            const isActive = state.currentStep === s.id
            const StepIcon = s.icon
            return (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center' }}>
                {/* Step circle + label */}
                <div
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                    cursor: isCompleted ? 'pointer' : 'default',
                  }}
                  onClick={() => isCompleted && goToStep(s.id)}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: isCompleted ? '#0D82F9' : isActive ? '#002E83' : '#E5E7EB',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s',
                  }}>
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        <Check size={20} color="#fff" strokeWidth={3} />
                      </motion.div>
                    ) : (
                      <StepIcon size={18} color={isActive ? '#fff' : '#9CA3AF'} />
                    )}
                  </div>
                  <span style={{
                    fontSize: 12, fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#111827' : isCompleted ? '#0D82F9' : '#9CA3AF',
                    transition: 'color 0.3s',
                    whiteSpace: 'nowrap',
                  }}>
                    {s.label}
                  </span>
                </div>

                {/* Connector line between steps */}
                {i < WIZARD_STEPS.length - 1 && (
                  <div style={{
                    width: 80, height: 3, borderRadius: 2, margin: '0 16px', marginBottom: 28,
                    background: '#E5E7EB', overflow: 'hidden',
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: isCompleted ? '100%' : '0%' }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      style={{ height: '100%', background: '#0D82F9', borderRadius: 2 }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Main content with step transitions */}
        <div style={{ paddingBottom: 40 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={state.currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer — matches RequestFinancing */}
      <div style={{ borderTop: '1px solid #E5E5E5', background: '#fff', padding: '14px 32px', position: 'sticky', bottom: 0 }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#9CA3AF' }}>
            Step {currentStepIndex + 1} of {WIZARD_STEPS.length}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#9CA3AF' }}>
            <CheckCircle2 size={14} color="#22C55E" />
            Progress saved automatically
          </span>
        </div>
      </div>

      {/* Exit confirmation modal */}
      <AnimatePresence>
        {showExitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 50,
              background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 24,
            }}
            onClick={() => setShowExitModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#fff', borderRadius: 20, padding: 32,
                maxWidth: 400, width: '100%',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: '50%', background: '#FEF3C7',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <CheckCircle2 size={28} color="#F59E0B" />
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', textAlign: 'center', marginBottom: 8 }}>
                Leave Account Setup?
              </h3>
              <p style={{ fontSize: 14, color: '#6B7280', textAlign: 'center', lineHeight: 1.6, marginBottom: 8 }}>
                Don't worry — your progress has been saved. You can pick up right where you left off anytime.
              </p>

              {/* Progress summary */}
              <div style={{ background: '#F9FAFB', borderRadius: 12, padding: 16, marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{ flex: 1, height: 4, background: '#E5E7EB', borderRadius: 2 }}>
                    <div style={{
                      height: '100%', borderRadius: 2,
                      background: 'linear-gradient(90deg, #002E83, #0D82F9)',
                      width: `${((state.completedSteps.length - 1) / WIZARD_STEPS.length) * 100}%`,
                      transition: 'width 0.3s',
                    }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>
                    {state.completedSteps.length - 1}/{WIZARD_STEPS.length}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {WIZARD_STEPS.map((s) => {
                    const done = state.completedSteps.includes(s.id)
                    return (
                      <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                        {done ? (
                          <CheckCircle2 size={14} color="#22C55E" />
                        ) : (
                          <div style={{ width: 14, height: 14, borderRadius: '50%', border: '1.5px solid #D1D5DB' }} />
                        )}
                        <span style={{ color: done ? '#111827' : '#9CA3AF', fontWeight: done ? 500 : 400 }}>{s.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => setShowExitModal(false)}
                  style={{
                    flex: 1, padding: '12px 0', background: '#002E83', color: '#fff',
                    fontWeight: 600, fontSize: 14, borderRadius: 10, border: 'none', cursor: 'pointer',
                  }}
                >
                  Continue Setup
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  style={{
                    flex: 1, padding: '12px 0', background: '#fff', color: '#374151',
                    fontWeight: 600, fontSize: 14, borderRadius: 10,
                    border: '1px solid #D1D5DB', cursor: 'pointer',
                  }}
                >
                  Exit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
