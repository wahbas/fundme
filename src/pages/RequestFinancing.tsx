import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ArrowLeft, ArrowRight, Send, Info, Building2, FileText, Upload, LayoutGrid, Landmark } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../ThemeContext'
import { useI18n } from '../i18n'
import SelectCategory from '../components/wizard/steps/SelectCategory'
import SelectBiller from '../components/wizard/steps/SelectBiller'
import InvoiceDetails from '../components/wizard/steps/InvoiceDetails'
import Documents from '../components/wizard/steps/DocumentsAndBank'
import BankConnect from '../components/wizard/steps/BankConnect'
import logo from '../assets/logo.png'

// ─── Types ────────────────────────────────────────────────────

export interface WizardData {
  category: string
  biller: string
  billerCode: string
  selectedBills: string[]
  financingType: Record<string, 'full' | 'partial'>
  partialAmounts: Record<string, number>
  uploadedDocs: string[]
  bankConnected: boolean
}

export const INITIAL_WIZARD_DATA: WizardData = {
  category: '',
  biller: '',
  billerCode: '',
  selectedBills: [],
  financingType: {},
  partialAmounts: {},
  uploadedDocs: [],
  bankConnected: false,
}

// ─── Steps config ─────────────────────────────────────────────

const STEPS = [
  { id: 'category', labelKey: 'wizard.selectCategory', descKey: 'wizard.selectCategoryDesc', icon: LayoutGrid },
  { id: 'biller', labelKey: 'wizard.selectBiller', descKey: 'wizard.selectBillerDesc', icon: Building2 },
  { id: 'invoices', labelKey: 'wizard.invoiceDetails', descKey: 'wizard.invoiceDetailsDesc', icon: FileText },
  { id: 'documents', labelKey: 'wizard.documents', descKey: 'wizard.documentsDesc', icon: Upload },
  { id: 'bank', labelKey: 'wizard.connectBank', descKey: 'wizard.connectBankDesc', icon: Landmark },
]

const TOTAL_STEPS = STEPS.length

// ─── Green circles SVG pattern ────────────────────────────────

function GreenCircles() {
  return (
    <svg
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.06 }}
      viewBox="0 0 400 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <circle cx="320" cy="80" r="120" stroke="#80FF00" strokeWidth="1.5" fill="none" />
      <circle cx="320" cy="80" r="80" stroke="#80FF00" strokeWidth="1" fill="none" />
      <circle cx="80" cy="400" r="160" stroke="#80FF00" strokeWidth="1.5" fill="none" />
      <circle cx="80" cy="400" r="100" stroke="#80FF00" strokeWidth="1" fill="none" />
      <circle cx="300" cy="700" r="140" stroke="#80FF00" strokeWidth="1.5" fill="none" />
      <circle cx="300" cy="700" r="90" stroke="#80FF00" strokeWidth="1" fill="none" />
    </svg>
  )
}

export default function RequestFinancing() {
  const { theme } = useTheme()
  const { t, isRTL } = useI18n()
  const navigate = useNavigate()
  const [data, setData] = useState<WizardData>({ ...INITIAL_WIZARD_DATA })
  const [stepIdx, setStepIdx] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [validationError, setValidationError] = useState('')
  const refId = useRef(`APP-${Date.now()}`)

  function patch(p: Partial<WizardData>) {
    setData((d) => ({ ...d, ...p }))
  }

  const progress = ((stepIdx + 1) / TOTAL_STEPS) * 100

  const canContinue = (() => {
    if (stepIdx === 0) return !!data.category
    if (stepIdx === 1) return !!data.biller
    if (stepIdx === 2) return data.selectedBills.length > 0
    return true
  })()

  function validate(): boolean {
    if (stepIdx === 0 && !data.category) {
      setValidationError(t('wizard.errCategory' as any))
      return false
    }
    if (stepIdx === 1 && !data.biller) {
      setValidationError(t('wizard.errBiller' as any))
      return false
    }
    if (stepIdx === 2 && data.selectedBills.length === 0) {
      setValidationError(t('wizard.errBills' as any))
      return false
    }
    setValidationError('')
    return true
  }

  function handleNext() {
    if (!validate()) return
    if (stepIdx === TOTAL_STEPS - 1) {
      handleSubmit()
      return
    }
    setDirection(1)
    setStepIdx((s) => s + 1)
  }

  function handleSubmit() {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 2000)
  }

  function handleBack() {
    setValidationError('')
    if (stepIdx === 0) {
      navigate('/dashboard?state=verified')
    } else {
      setDirection(-1)
      setStepIdx((s) => s - 1)
    }
  }

  // ─── Loading overlay ─────────────────────────────────────────

  if (isSubmitting) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(8px)', zIndex: 50,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <div style={{ position: 'relative', width: 80, height: 80 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            style={{ width: 80, height: 80, borderRadius: '50%', border: '4px solid #E5E7EB', borderTopColor: '#2563EB' }}
          />
        </div>
        <p style={{ marginTop: 32, fontSize: 20, fontWeight: 600, color: '#0F172A' }}>
          {t('wizard.submitting' as any)}<motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>...</motion.span>
        </p>
      </motion.div>
    )
  }

  // ─── Success screen ───────────────────────────────────────────

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: theme.bgPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ textAlign: 'center', maxWidth: 400, width: '100%' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            style={{
              width: 80, height: 80, borderRadius: '50%', margin: '0 auto 24px',
              background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 0 12px rgba(16,185,129,0.15)',
            }}
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
              <Check size={36} color="#fff" strokeWidth={3} />
            </motion.div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontSize: 24, fontWeight: 700, color: theme.textPrimary, marginBottom: 8 }}>
            {t('wizard.requestCreated' as any)}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 24 }}>
            {t('wizard.requestCreatedDesc' as any)}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{
              background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 14,
              padding: 20, marginBottom: 16,
            }}
          >
            <p style={{ fontSize: 12, color: theme.textMuted, marginBottom: 6 }}>{t('wizard.applicationRef' as any)}</p>
            <p style={{ fontSize: 18, fontWeight: 600, color: '#2563EB', fontFamily: 'monospace' }}>{refId.current}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{
              background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 14,
              padding: 20, marginBottom: 24, textAlign: 'left',
            }}
          >
            <p style={{ fontSize: 15, fontWeight: 700, color: theme.textPrimary, marginBottom: 14 }}>{t('wizard.whatsNext' as any)}</p>
            {[
              t('wizard.nextStep1' as any),
              t('wizard.nextStep2' as any),
              t('wizard.nextStep3' as any),
            ].map((text, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: i < 2 ? 10 : 0 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#2563EB', width: 20, flexShrink: 0 }}>{i + 1}.</span>
                <span style={{ fontSize: 14, color: theme.textSecondary }}>{text}</span>
              </div>
            ))}
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02, boxShadow: '0 4px 16px rgba(37,99,235,0.2)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/dashboard?state=verified&submitted=true')}
            style={{
              width: '100%', padding: 16, background: '#2563EB', color: '#fff',
              border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer',
            }}
          >
            {t('wizard.goToDashboard' as any)}
          </motion.button>
        </div>
      </div>
    )
  }

  // ─── Wizard (split-panel) ────────────────────────────────────

  function renderStep() {
    switch (stepIdx) {
      case 0: return <SelectCategory data={data} onChange={patch} />
      case 1: return <SelectBiller data={data} onChange={patch} />
      case 2: return <InvoiceDetails data={data} onChange={patch} />
      case 3: return <Documents data={data} onChange={patch} />
      case 4: return <BankConnect data={data} onChange={patch} />
      default: return null
    }
  }

  const isLast = stepIdx === TOTAL_STEPS - 1

  return (
    <div className="request-financing-layout" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* ── Left panel (380px) ─── Steps sidebar ─────────────── */}
      <div
        className="request-financing-sidebar"
        style={{
          width: 380,
          flexShrink: 0,
          background: 'linear-gradient(155deg, #000814 0%, #001233 40%, #002E83 70%, #0052B9 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: '40px 36px',
        }}
      >
        <GreenCircles />

        {/* Logo */}
        <div style={{ position: 'relative', zIndex: 1, marginBottom: 48 }}>
          <img src={logo} alt="FundMe" style={{ height: 80 }} />
        </div>

        {/* Title */}
        <div style={{ position: 'relative', zIndex: 1, marginBottom: 48 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
            {t('wizard.sadadFinancing' as any)}
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
            {t('wizard.completeSteps' as any)}
          </p>
        </div>

        {/* Step tracker */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
          {STEPS.map((step, i) => {
            const completed = i < stepIdx
            const active = i === stepIdx
            const Icon = step.icon
            const isLastStep = i === STEPS.length - 1

            return (
              <div key={step.id} style={{ display: 'flex', gap: 16 }}>
                {/* Circle + connector line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <motion.div
                    animate={{
                      background: completed ? '#2563EB' : active ? 'rgba(37,99,235,0.6)' : 'rgba(255,255,255,0.1)',
                      borderColor: completed ? '#2563EB' : active ? 'rgba(37,99,235,0.6)' : 'rgba(255,255,255,0.2)',
                    }}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      border: '2px solid',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.3s',
                    }}
                  >
                    {completed ? (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <Check size={20} color="#fff" strokeWidth={3} />
                      </motion.div>
                    ) : (
                      <Icon size={20} color={active ? '#fff' : 'rgba(255,255,255,0.4)'} />
                    )}
                  </motion.div>
                  {/* Connector line */}
                  {!isLastStep && (
                    <div
                      style={{
                        width: 2,
                        flex: 1,
                        minHeight: 32,
                        background: completed
                          ? 'rgba(37,99,235,0.4)'
                          : 'rgba(255,255,255,0.1)',
                        transition: 'background 0.3s',
                      }}
                    />
                  )}
                </div>

                {/* Label + description */}
                <div style={{ paddingTop: 8, paddingBottom: isLastStep ? 0 : 24 }}>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: active ? 700 : 500,
                      color: active || completed ? '#fff' : 'rgba(255,255,255,0.4)',
                      marginBottom: 3,
                      transition: 'color 0.3s',
                    }}
                  >
                    {t(step.labelKey as any)}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: active ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.25)',
                      transition: 'color 0.3s',
                    }}
                  >
                    {t(step.descKey as any)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Progress at bottom */}
        <div style={{ position: 'relative', zIndex: 1, marginTop: 'auto', paddingTop: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Progress</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.1)' }}>
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ height: '100%', background: '#2563EB', borderRadius: 2 }}
            />
          </div>
        </div>
      </div>

      {/* ── Right panel ─── Form area ─────────────────────────── */}
      <div
        style={{
          flex: 1,
          background: theme.bgPrimary,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          height: '100vh',
        }}
      >
        {/* Top bar (sticky) */}
        <div style={{ position: 'sticky', top: 0, zIndex: 5, background: theme.cardBg, borderBottom: `1px solid ${theme.border}`, padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={handleBack}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                display: 'flex', alignItems: 'center',
              }}
            >
              <ArrowLeft size={20} color="#475569" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
            </button>
            <span style={{ fontSize: 14, color: theme.textMuted }}>
              {t('wizard.step' as any)} {stepIdx + 1} {t('wizard.of' as any)} {TOTAL_STEPS}
            </span>
          </div>
          <button
            onClick={() => navigate('/dashboard?state=verified')}
            style={{
              background: 'none', border: `1px solid ${theme.border}`, borderRadius: 8,
              padding: '6px 16px', fontSize: 13, color: theme.textSecondary, cursor: 'pointer',
            }}
          >
            {t('wizard.saveExit' as any)}
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, background: theme.border }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ height: 4, background: 'linear-gradient(90deg, #002E83, #2563EB)', borderRadius: '0 2px 2px 0' }}
          />
        </div>

        {/* Content */}
        <div className="request-financing-main" style={{ flex: 1, padding: '32px 48px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', width: '100%' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={stepIdx}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -20 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Validation error toast */}
        <AnimatePresence>
          {validationError && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{
                position: 'fixed', bottom: 100, left: '50%', transform: 'translateX(-50%)',
                background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10,
                padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8,
                fontSize: 13, color: '#EF4444', fontWeight: 500, zIndex: 20,
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              }}
            >
              <Info size={16} />
              {validationError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer (sticky) */}
        <div style={{
          position: 'sticky', bottom: 0,
          background: theme.cardBg, borderTop: `1px solid ${theme.border}`,
          padding: '16px 48px', zIndex: 5,
        }}>
          <div style={{ maxWidth: 860, margin: '0 auto', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {stepIdx > 0 ? (
              <motion.button
                onClick={handleBack}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '12px 24px', background: theme.cardBg,
                  border: `1px solid ${theme.border}`, borderRadius: 10,
                  fontSize: 14, color: theme.textSecondary, cursor: 'pointer', fontWeight: 500,
                }}
              >
                <ArrowLeft size={16} />
                Back
              </motion.button>
            ) : (
              <div />
            )}

            {isLast ? (
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => navigate('/dashboard?state=verified&submitted=true')}
                  style={{
                    padding: '12px 24px', background: theme.cardBg, color: theme.textSecondary,
                    border: `1px solid ${theme.border}`, borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer',
                  }}
                >
                  Skip for Now
                </button>
                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02, boxShadow: '0 4px 16px rgba(37,99,235,0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '12px 28px', background: '#2563EB', color: '#fff',
                    border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  Submit Request
                  <Send size={16} />
                </motion.button>
              </div>
            ) : (
              <motion.button
                onClick={handleNext}
                whileHover={canContinue ? { y: -1, boxShadow: '0 6px 20px rgba(37,99,235,0.3)' } : {}}
                whileTap={canContinue ? { scale: 0.98 } : {}}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '13px 28px',
                  background: canContinue ? '#2563EB' : '#E2E8F0',
                  color: canContinue ? '#fff' : '#94A3B8',
                  border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700,
                  cursor: canContinue ? 'pointer' : 'not-allowed',
                  transition: 'background 0.15s, color 0.15s',
                }}
              >
                {t('wizard.continue' as any)}
                <motion.span
                  animate={canContinue ? { x: [0, 4, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
