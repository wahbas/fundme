import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { X, Check, CheckCircle2, ShieldCheck, Building2, Landmark, FileUp, FileText, BarChart3, Clock, Bell, ArrowRight, FileSearch } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { STEP_ORDER, INITIAL_ONBOARDING_STATE, type OnboardingStep, type OnboardingState } from '../components/onboarding/types'
import NafathVerification from '../components/onboarding/steps/NafathVerification'
import WathiqVerification from '../components/onboarding/steps/WathiqVerification'
import BankConnection from '../components/onboarding/steps/BankConnection'
import DocumentUpload, { type DocSubStep } from '../components/onboarding/steps/DocumentUpload'
import logo from '../assets/logo.png'

// ─── Step metadata ───────────────────────────────────────────

const WIZARD_STEPS = [
  { id: 'verify-identity' as const, label: 'Verify Identity', icon: ShieldCheck },
  { id: 'verify-business' as const, label: 'Verify Business', icon: Building2 },
  { id: 'connect-bank' as const, label: 'Connect Bank', icon: Landmark },
  { id: 'upload-documents' as const, label: 'Upload Documents', icon: FileUp },
]

// ─── Under Review Illustration ──────────────────────────────

function UnderReviewIllustration() {
  return (
    <svg width="280" height="180" viewBox="0 0 280 180" fill="none">
      {/* Background circle */}
      <circle cx="140" cy="90" r="70" fill="url(#urBgGrad)" opacity="0.1" />

      {/* Main clipboard/document */}
      <g filter="url(#urShadow1)">
        <rect x="95" y="35" width="90" height="110" rx="8" fill="white" />
        <rect x="95" y="35" width="90" height="110" rx="8" stroke="#E5E5E5" strokeWidth="1.5" />
        <rect x="120" y="28" width="40" height="14" rx="4" fill="#002E83" />
        <circle cx="140" cy="35" r="4" fill="white" />
      </g>

      {/* Document lines */}
      <rect x="110" y="55" width="50" height="4" rx="2" fill="#0D82F9" />
      <rect x="110" y="65" width="60" height="3" rx="1.5" fill="#E5E5E5" />
      <rect x="110" y="74" width="55" height="3" rx="1.5" fill="#E5E5E5" />
      <rect x="110" y="83" width="45" height="3" rx="1.5" fill="#E5E5E5" />

      {/* Checklist items */}
      <rect x="110" y="95" width="12" height="12" rx="3" fill="#10B981" />
      <path d="M113 101 L116 104 L120 98" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="127" y="98" width="40" height="3" rx="1.5" fill="#E5E5E5" />

      <rect x="110" y="112" width="12" height="12" rx="3" fill="#10B981" />
      <path d="M113 118 L116 121 L120 115" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="127" y="115" width="35" height="3" rx="1.5" fill="#E5E5E5" />

      {/* Magnifying glass */}
      <g filter="url(#urShadow2)">
        <circle cx="195" cy="75" r="28" fill="white" stroke="url(#urMagGrad)" strokeWidth="5" />
        <line x1="215" y1="95" x2="235" y2="115" stroke="url(#urMagGrad)" strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* Eye inside magnifier */}
      <ellipse cx="195" cy="75" rx="12" ry="8" stroke="#002E83" strokeWidth="2" fill="none" />
      <circle cx="195" cy="75" r="4" fill="#0D82F9" />
      <circle cx="193" cy="73" r="1.5" fill="white" />

      {/* Floating checkmarks */}
      <g filter="url(#urShadow3)">
        <circle cx="60" cy="55" r="18" fill="#22C55E" />
        <path d="M52 55 L57 60 L68 49" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <g filter="url(#urShadow3)">
        <circle cx="45" cy="100" r="14" fill="#22C55E" opacity="0.85" />
        <path d="M39 100 L43 104 L51 96" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <g filter="url(#urShadow3)">
        <circle cx="235" cy="45" r="16" fill="#22C55E" opacity="0.9" />
        <path d="M228 45 L232 49 L242 39" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Clock indicator */}
      <g filter="url(#urShadow2)">
        <circle cx="70" cy="140" r="20" fill="white" />
        <circle cx="70" cy="140" r="20" stroke="#0D82F9" strokeWidth="3" />
        <circle cx="70" cy="140" r="14" fill="#F0F7FF" />
        <path d="M70 132 L70 140 L76 144" stroke="#002E83" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Processing dots */}
      <circle cx="210" cy="140" r="5" fill="#0D82F9">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="225" cy="140" r="5" fill="#0D82F9">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="240" cy="140" r="5" fill="#0D82F9">
        <animate attributeName="opacity" values="0.6;0.3;1;0.6" dur="1.5s" repeatCount="indefinite" />
      </circle>

      {/* Decorative elements */}
      <circle cx="250" cy="80" r="4" fill="#F59E0B" />
      <circle cx="30" cy="75" r="5" fill="#0D82F9" opacity="0.4" />
      <circle cx="260" cy="120" r="3" fill="#10B981" opacity="0.6" />

      {/* Star sparkles */}
      <path d="M255 55 L257 60 L262 60 L258 64 L260 69 L255 66 L250 69 L252 64 L248 60 L253 60 Z" fill="#F59E0B" opacity="0.8" />
      <path d="M35 125 L36 128 L39 128 L37 130 L38 133 L35 131 L32 133 L33 130 L31 128 L34 128 Z" fill="#0D82F9" opacity="0.6" />

      <defs>
        <linearGradient id="urBgGrad" x1="70" y1="20" x2="210" y2="160">
          <stop offset="0%" stopColor="#002E83" />
          <stop offset="100%" stopColor="#0D82F9" />
        </linearGradient>
        <linearGradient id="urMagGrad" x1="167" y1="47" x2="235" y2="115">
          <stop offset="0%" stopColor="#002E83" />
          <stop offset="100%" stopColor="#0D82F9" />
        </linearGradient>
        <filter id="urShadow1" x="85" y="22" width="110" height="135" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.1" />
        </filter>
        <filter id="urShadow2" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.15" />
        </filter>
        <filter id="urShadow3" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
        </filter>
      </defs>
    </svg>
  )
}

// ─── Account Under Review Screen ────────────────────────────

const CHECKLIST_ITEMS = [
  'Identity Verified',
  'Business Verified',
  'Bank Account Connected',
  'Documents Submitted',
]

const NEXT_STEPS = [
  { title: 'Document Review', desc: 'Our compliance team verifies your submitted documents' },
  { title: 'Credit Assessment', desc: 'We assess your business via SIMAH and financial analysis' },
  { title: 'Account Activation', desc: 'Once approved, you can start requesting financing' },
]

function AccountUnderReviewScreen({ onGoToDashboard }: { onGoToDashboard: () => void }) {
  return (
    <div style={{ textAlign: 'center', padding: '24px 0', maxWidth: 440, margin: '0 auto' }}>
      {/* Illustration */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}
      >
        <UnderReviewIllustration />
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 8 }}
      >
        Your Account is Under Review
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6, marginBottom: 24 }}
      >
        Great job! You've completed all the setup steps. Our team is now reviewing your application.
      </motion.p>

      {/* Estimated Time Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{
          background: 'linear-gradient(135deg, #002E83, #0D82F9)',
          borderRadius: 16, padding: 20, marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 16,
        }}
      >
        <div style={{
          width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Clock size={28} color="#fff" />
        </div>
        <div style={{ textAlign: 'left' }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>Estimated review time</p>
          <p style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>1-2 Business Days</p>
        </div>
      </motion.div>

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
          {/* Account Activation - in progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%', background: '#0D82F9', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }}
              />
            </div>
            <span style={{ fontSize: 14, color: '#374151' }}>
              Account Activation{' '}
              <span style={{ color: '#0D82F9', fontWeight: 500 }}>(In Progress)</span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* What Happens Next */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        style={{
          background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16,
          padding: 20, marginBottom: 24, textAlign: 'left',
        }}
      >
        <h3 style={{
          fontSize: 15, fontWeight: 600, color: '#111827', marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <FileSearch size={18} color="#0D82F9" />
          What happens next?
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {NEXT_STEPS.map((s, i) => (
            <div key={s.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%', background: '#EFF6FF', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: '#0D82F9',
              }}>
                {i + 1}
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>{s.title}</p>
                <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Notification Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: 12, background: '#EFF6FF', borderRadius: 12, marginBottom: 24,
        }}
      >
        <Bell size={18} color="#0D82F9" />
        <span style={{ fontSize: 13, color: '#0D82F9' }}>
          We'll notify you via <strong>email</strong> and <strong>SMS</strong> when ready
        </span>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
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
  const [docSubStep, setDocSubStep] = useState<DocSubStep>('intro')

  const hasProgress = state.completedSteps.length > 1 // more than just create-account

  function handleClose() {
    if (hasProgress) {
      setShowExitModal(true)
    } else {
      navigate('/')
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
          ...(step === 'verify-identity' ? { identity: data } : {}),
          ...(step === 'verify-business' ? { business: data } : {}),
          ...(step === 'connect-bank' ? { bank: data } : {}),
          ...(step === 'upload-documents' ? { documents: data } : {}),
        } as OnboardingState['stepData'],
      }
    })

    if (step === 'upload-documents') {
      setCompleted(true)
    }
  }

  if (completed) {
    return (
      <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: 'Poppins, sans-serif', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', borderBottom: '1px solid #E5E5E5' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '14px 32px' }}>
            <img src={logo} alt="FundMe" style={{ height: 32 }} />
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <AccountUnderReviewScreen onGoToDashboard={() => navigate('/?state=under-review')} />
        </div>
      </div>
    )
  }

  function renderStep() {
    switch (state.currentStep) {
      case 'verify-identity':
        return <NafathVerification data={state.stepData.identity} onComplete={(d) => handleStepComplete('verify-identity', d)} />
      case 'verify-business':
        return <WathiqVerification data={state.stepData.business} nationalId={state.stepData.identity?.nationalId} onComplete={(d) => handleStepComplete('verify-business', d)} />
      case 'connect-bank':
        return <BankConnection data={state.stepData.bank} onComplete={(d) => handleStepComplete('connect-bank', d)} />
      case 'upload-documents':
        return <DocumentUpload data={state.stepData.documents} onComplete={(d) => handleStepComplete('upload-documents', d)} onSubStepChange={setDocSubStep} />
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
            <img src={logo} alt="FundMe" style={{ height: 32 }} />
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

      {/* Body — same layout as RequestFinancing: left sidebar + content */}
      <div style={{ flex: 1, display: 'flex', maxWidth: 1120, margin: '0 auto', width: '100%', padding: '40px 32px 0' }}>
        {/* Left sidebar - step indicator */}
        <div style={{ width: 240, flexShrink: 0, paddingRight: 40 }}>
          <div style={{ position: 'sticky', top: 40, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {WIZARD_STEPS.map((s, i) => {
              const isCompleted = state.completedSteps.includes(s.id)
              const isActive = state.currentStep === s.id
              const showDocSubSteps = s.id === 'upload-documents' && isActive && docSubStep !== 'intro' && docSubStep !== 'success'

              return (
                <div key={s.id}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '12px 14px',
                      borderLeft: `3px solid ${isActive ? '#0D82F9' : isCompleted ? '#0D82F9' : 'transparent'}`,
                      cursor: isCompleted ? 'pointer' : 'default',
                      transition: 'border-color 0.3s',
                    }}
                    onClick={() => isCompleted && goToStep(s.id)}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        style={{
                          width: 24, height: 24, borderRadius: '50%',
                          background: '#0D82F9',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Check size={14} color="#fff" />
                      </motion.div>
                    ) : (
                      <div
                        style={{
                          width: 24, height: 24, borderRadius: '50%',
                          border: `2px solid ${isActive ? '#0D82F9' : '#D1D5DB'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 12, fontWeight: 600,
                          color: isActive ? '#0D82F9' : '#9CA3AF',
                          flexShrink: 0,
                          transition: 'all 0.3s',
                        }}
                      >
                        {i + 1}
                      </div>
                    )}
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? '#111827' : isCompleted ? '#0D82F9' : '#9CA3AF',
                        transition: 'color 0.3s',
                      }}
                    >
                      {s.label}
                    </span>
                  </div>

                  {/* Document sub-step tree */}
                  {showDocSubSteps && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}
                    >
                      {([
                        { key: 'legal', label: 'Legal Documents', icon: FileText },
                        { key: 'financial', label: 'Financial Documents', icon: BarChart3 },
                        { key: 'review', label: 'Review & Submit', icon: CheckCircle2 },
                      ] as const).map((sub) => {
                        const subOrder = ['legal', 'financial', 'review'] as const
                        const subIdx = subOrder.indexOf(sub.key)
                        const activeIdx = subOrder.indexOf(docSubStep as typeof subOrder[number])
                        const isSubActive = docSubStep === sub.key
                        const isSubDone = activeIdx > subIdx
                        const SubIcon = sub.icon

                        return (
                          <div
                            key={sub.key}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              padding: '8px 14px 8px 42px',
                              borderLeft: `3px solid ${isSubActive ? '#0D82F9' : 'transparent'}`,
                              transition: 'all 0.2s',
                            }}
                          >
                            {isSubDone ? (
                              <div style={{
                                width: 18, height: 18, borderRadius: '50%', background: '#80FF00', flexShrink: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}>
                                <Check size={10} color="#002E83" strokeWidth={3} />
                              </div>
                            ) : (
                              <div style={{
                                width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                                border: `1.5px solid ${isSubActive ? '#0D82F9' : '#D1D5DB'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}>
                                <SubIcon size={9} color={isSubActive ? '#0D82F9' : '#D1D5DB'} />
                              </div>
                            )}
                            <span style={{
                              fontSize: 12,
                              fontWeight: isSubActive ? 600 : 400,
                              color: isSubActive ? '#111827' : isSubDone ? '#047857' : '#9CA3AF',
                              transition: 'color 0.2s',
                            }}>
                              {sub.label}
                            </span>
                          </div>
                        )
                      })}
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Main content with step transitions */}
        <div style={{ flex: 1, maxWidth: 640, paddingBottom: 40 }}>
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
                  onClick={() => navigate('/')}
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
