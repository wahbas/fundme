import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useInvestorTheme } from '../../../components/investor/InvestorThemeContext'
import { useInvestorRegister } from './InvestorRegisterContext'
import InvestorOTPInput from '../../../components/investor/register/InvestorOTPInput'
import InvestorButton from '../../../components/investor/register/InvestorButton'
import InvestorProgressStepper from '../../../components/investor/register/InvestorProgressStepper'

export default function InvestorOTPScreen() {
  const { theme } = useInvestorTheme()
  const { data, setCurrentStep } = useInvestorRegister()
  const navigate = useNavigate()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)

  useEffect(() => { setCurrentStep(2) }, [])

  useEffect(() => {
    if (resendTimer <= 0) return
    const t = setInterval(() => setResendTimer((v) => v - 1), 1000)
    return () => clearInterval(t)
  }, [resendTimer])

  const maskedPhone = data.phone
    ? `+966 ${data.phone.slice(0, 2)}•••${data.phone.slice(-2)}`
    : '+966 ••••••••'

  function handleVerify(code?: string) {
    const finalCode = code || otp.join('')
    if (finalCode.length < 6) return
    setError(false)
    setLoading(true)
    setTimeout(() => {
      // Mock: accept any 6-digit code
      setLoading(false)
      navigate('/investor/register/national-id')
    }, 1500)
  }

  function handleResend() {
    setResendTimer(60)
    setOtp(['', '', '', '', '', ''])
    setError(false)
  }

  const isFilled = otp.every((d) => d)

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <InvestorProgressStepper currentStep={2} />

      <button
        onClick={() => navigate('/investor/register/phone')}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
          color: theme.textSecondary, fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 24,
          fontFamily: 'inherit',
        }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textHeading, marginBottom: 6 }}>
          Verify your number
        </h2>
        <p style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 28 }}>
          Enter the 6-digit code sent to {maskedPhone}
        </p>
      </div>

      <div style={{ marginBottom: 24 }}>
        <InvestorOTPInput
          value={otp}
          onChange={setOtp}
          error={error}
          disabled={loading}
          onComplete={handleVerify}
        />
        {error && (
          <p style={{ fontSize: 12, color: theme.red, textAlign: 'center', marginTop: 10, margin: '10px 0 0' }}>
            Invalid code. Please try again.
          </p>
        )}
      </div>

      <InvestorButton onClick={() => handleVerify()} loading={loading} disabled={!isFilled}>
        Verify & Continue
      </InvestorButton>

      <div style={{ textAlign: 'center', marginTop: 16 }}>
        {resendTimer > 0 ? (
          <p style={{ fontSize: 13, color: theme.textTertiary, margin: 0 }}>
            Resend code in <span style={{ color: theme.blue, fontWeight: 600 }}>{resendTimer}s</span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            style={{
              background: 'none', border: 'none', color: theme.blue,
              fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Resend Code
          </button>
        )}
      </div>
    </motion.div>
  )
}
