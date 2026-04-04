import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, IdCard, Mail } from 'lucide-react'
import { useInvestorTheme } from '../../../components/investor/InvestorThemeContext'
import { useInvestorRegister } from './InvestorRegisterContext'
import InvestorInput from '../../../components/investor/register/InvestorInput'
import InvestorButton from '../../../components/investor/register/InvestorButton'
import InvestorProgressStepper from '../../../components/investor/register/InvestorProgressStepper'

export default function InvestorNationalIdScreen() {
  const { theme } = useInvestorTheme()
  const { data, setNationalId, setEmail, setCurrentStep } = useInvestorRegister()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ id?: string; email?: string }>({})

  useEffect(() => { setCurrentStep(3) }, [])

  const isValidId = /^[12]\d{9}$/.test(data.nationalId)
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  const canSubmit = isValidId && isValidEmail

  function handleSubmit() {
    const errs: typeof errors = {}
    if (!isValidId) errs.id = 'Enter a valid 10-digit National ID starting with 1 or 2'
    if (!isValidEmail) errs.email = 'Enter a valid email address'
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/investor/register/password')
    }, 800)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <InvestorProgressStepper currentStep={3} />

      <button
        onClick={() => navigate('/investor/register/verify-otp')}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
          color: theme.textSecondary, fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 24,
          fontFamily: 'inherit',
        }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textHeading, marginBottom: 6 }}>
        Verify your identity
      </h2>
      <p style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 28, margin: '0 0 28px' }}>
        Enter your National ID and email address
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 28 }}>
        <InvestorInput
          label="National ID"
          value={data.nationalId}
          onChange={(v) => {
            setNationalId(v.replace(/\D/g, '').slice(0, 10))
            setErrors((e) => ({ ...e, id: undefined }))
          }}
          placeholder="10-digit National ID"
          icon={<IdCard size={18} color={theme.textTertiary} />}
          inputMode="numeric"
          maxLength={10}
          error={errors.id}
          onSubmit={handleSubmit}
        />
        <InvestorInput
          label="Email Address"
          value={data.email}
          onChange={(v) => {
            setEmail(v)
            setErrors((e) => ({ ...e, email: undefined }))
          }}
          placeholder="name@example.com"
          icon={<Mail size={18} color={theme.textTertiary} />}
          type="email"
          inputMode="email"
          error={errors.email}
          onSubmit={handleSubmit}
        />
      </div>

      <InvestorButton onClick={handleSubmit} loading={loading} disabled={!canSubmit}>
        Continue
      </InvestorButton>
    </motion.div>
  )
}
