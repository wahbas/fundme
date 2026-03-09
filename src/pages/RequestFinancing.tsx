import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Check, ArrowLeft, ArrowRight, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FLOWS, INITIAL_DATA, type WizardData, type StepDef } from '../components/wizard/types'
import ChooseProduct from '../components/wizard/steps/ChooseProduct'
import BusinessProfile from '../components/wizard/steps/BusinessProfile'
import AmountTerms from '../components/wizard/steps/AmountTerms'
import UploadInvoices from '../components/wizard/steps/UploadInvoices'
import SelectSadadBills from '../components/wizard/steps/SelectSadadBills'
import SelectBank from '../components/wizard/steps/SelectBank'
import ReviewSubmit from '../components/wizard/steps/ReviewSubmit'
import SuccessScreen from '../components/wizard/SuccessScreen'
import LoadingOverlay from '../components/wizard/LoadingOverlay'
import logo from '../assets/logo.png'

export default function RequestFinancing() {
  const navigate = useNavigate()
  const [data, setData] = useState<WizardData>({ ...INITIAL_DATA })
  const [stepIdx, setStepIdx] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function patch(p: Partial<WizardData>) {
    setData((d) => ({ ...d, ...p }))
  }

  const steps: StepDef[] = useMemo(() => {
    if (!data.product) return [{ id: 'product', label: 'Choose Product' }]
    return FLOWS[data.product]
  }, [data.product])

  const currentStep = steps[stepIdx]
  const totalSteps = steps.length
  const progress = ((stepIdx + 1) / totalSteps) * 100
  const isLast = stepIdx === totalSteps - 1

  function handleNext() {
    if (stepIdx === 0 && !data.product) return
    if (isLast) {
      setIsSubmitting(true)
      setTimeout(() => {
        setIsSubmitting(false)
        setSubmitted(true)
      }, 2200)
      return
    }
    setStepIdx((s) => Math.min(s + 1, totalSteps - 1))
  }

  function handleBack() {
    if (stepIdx === 0) return
    setStepIdx((s) => s - 1)
  }

  function goToStep(idx: number) {
    setStepIdx(idx)
  }

  function handleProductChange(p: WizardData['product']) {
    patch({ product: p })
  }

  if (isSubmitting) {
    return <LoadingOverlay />
  }

  if (submitted) {
    return <SuccessScreen onBack={() => navigate('/')} />
  }

  function renderStep() {
    if (!currentStep) return null
    switch (currentStep.id) {
      case 'product':
        return <ChooseProduct value={data.product} onChange={handleProductChange} />
      case 'business':
        return <BusinessProfile data={data} onChange={patch} />
      case 'amount':
        return <AmountTerms data={data} onChange={patch} />
      case 'invoices':
        return <UploadInvoices data={data} onChange={patch} />
      case 'sadad':
        return <SelectSadadBills data={data} onChange={patch} />
      case 'bank':
        return <SelectBank data={data} onChange={patch} />
      case 'review':
        return <ReviewSubmit data={data} onGoToStep={goToStep} />
      default:
        return null
    }
  }

  const isNextDisabled = stepIdx === 0 && !data.product

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: 'Poppins, sans-serif', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E5E5E5', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src={logo} alt="FundMe" style={{ height: 32 }} />
            <div style={{ width: 1, height: 20, background: '#E5E5E5' }} />
            <span style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>Request Financing</span>
          </div>
          <button
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}
          >
            <X size={22} color="#6B7280" />
          </button>
        </div>
        {/* Animated Progress bar */}
        <div style={{ height: 3, background: '#E5E7EB' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #002E83, #0D82F9)',
              borderRadius: '0 2px 2px 0',
            }}
          />
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', maxWidth: 1120, margin: '0 auto', width: '100%', padding: '40px 32px 0' }}>
        {/* Left sidebar - step indicator */}
        <div style={{ width: 240, flexShrink: 0, paddingRight: 40 }}>
          <div style={{ position: 'sticky', top: 40, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {steps.map((s, i) => {
              const completed = i < stepIdx
              const active = i === stepIdx
              return (
                <div
                  key={s.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 14px',
                    borderLeft: `3px solid ${active ? '#0D82F9' : completed ? '#0D82F9' : 'transparent'}`,
                    cursor: completed ? 'pointer' : 'default',
                    transition: 'border-color 0.3s',
                  }}
                  onClick={() => completed && goToStep(i)}
                >
                  {completed ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: '#0D82F9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Check size={14} color="#fff" />
                    </motion.div>
                  ) : (
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        border: `2px solid ${active ? '#0D82F9' : '#D1D5DB'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 600,
                        color: active ? '#0D82F9' : '#9CA3AF',
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
                      fontWeight: active ? 600 : 400,
                      color: active ? '#111827' : completed ? '#0D82F9' : '#9CA3AF',
                      transition: 'color 0.3s',
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Main content with step transitions */}
        <div style={{ flex: 1, maxWidth: 640, paddingBottom: 40 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep?.id ?? 'empty'}
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

      {/* Footer */}
      <div
        style={{
          borderTop: '1px solid #E5E5E5',
          background: '#fff',
          padding: '14px 32px',
          position: 'sticky',
          bottom: 0,
        }}
      >
        <div style={{ maxWidth: 1120, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#9CA3AF' }}>
            Step {stepIdx + 1} of {totalSteps}
          </span>
          <div style={{ display: 'flex', gap: 12 }}>
            {stepIdx > 0 && (
              <motion.button
                onClick={handleBack}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '10px 20px',
                  background: '#fff',
                  border: '1px solid #D1D5DB',
                  borderRadius: 10,
                  fontSize: 14,
                  color: '#374151',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                <ArrowLeft size={16} />
                Back
              </motion.button>
            )}
            <motion.button
              onClick={handleNext}
              disabled={isNextDisabled}
              whileHover={isNextDisabled ? undefined : { scale: 1.02 }}
              whileTap={isNextDisabled ? undefined : { scale: 0.98 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 24px',
                background: isNextDisabled ? '#D1D5DB' : '#0D82F9',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                cursor: isNextDisabled ? 'not-allowed' : 'pointer',
                boxShadow: isNextDisabled ? 'none' : '0 4px 12px rgba(13,130,249,0.25)',
              }}
            >
              {isLast ? (
                <>
                  Submit
                  <Send size={16} />
                </>
              ) : (
                <>
                  Next
                  <motion.span
                    animate={isNextDisabled ? {} : { x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
