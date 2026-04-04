import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useInvestorTheme } from '../../../components/investor/InvestorThemeContext'
import { useInvestorRegister } from './InvestorRegisterContext'
import InvestorPhoneInput from '../../../components/investor/register/InvestorPhoneInput'
import InvestorButton from '../../../components/investor/register/InvestorButton'
import InvestorProgressStepper from '../../../components/investor/register/InvestorProgressStepper'

export default function InvestorPhoneScreen() {
  const { theme } = useInvestorTheme()
  const { data, setPhone, setCurrentStep } = useInvestorRegister()
  const navigate = useNavigate()
  const [formatted, setFormatted] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { setCurrentStep(1) }, [])

  const raw = data.phone
  const isValid = raw.replace(/\D/g, '').length === 9 && raw.startsWith('5')

  function handleSubmit() {
    if (!isValid) {
      setError('Enter a valid Saudi mobile number starting with 5')
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/investor/register/verify-otp')
    }, 800)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <InvestorProgressStepper currentStep={1} />

      {/* Back */}
      <button
        onClick={() => navigate('/investor/register')}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
          color: theme.textSecondary, fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 24,
          fontFamily: 'inherit',
        }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textHeading, marginBottom: 6 }}>
        Enter your mobile number
      </h2>
      <p style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 28, margin: '0 0 28px' }}>
        We'll send a verification code to confirm your identity
      </p>

      <div style={{ marginBottom: 28 }}>
        <InvestorPhoneInput
          value={formatted}
          onChange={(rawDigits, fmt) => {
            setPhone(rawDigits)
            setFormatted(fmt)
          }}
          error={error}
          onSubmit={handleSubmit}
        />
      </div>

      <InvestorButton onClick={handleSubmit} loading={loading} disabled={!isValid}>
        Send Verification Code
      </InvestorButton>

      <p style={{ fontSize: 11, color: theme.textTertiary, textAlign: 'center', marginTop: 16, lineHeight: 1.5 }}>
        By continuing, you agree to FundMe's Terms of Service and Privacy Policy
      </p>
    </motion.div>
  )
}
