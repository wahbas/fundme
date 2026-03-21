import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import logo from '../assets/logo.png'
import PhoneInputComp from './register/components/PhoneInput'
import OTPInput from './register/components/OTPInput'
import { useI18n } from '../i18n'

type Step = 'phone' | 'otp'

export default function Login() {
  const navigate = useNavigate()
  const { t, isRTL } = useI18n()
  const [step, setStep] = useState<Step>('phone')
  const [phone, setPhone] = useState('')
  const [formatted, setFormatted] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', ''])
  const [otpError, setOtpError] = useState('')
  const [countdown, setCountdown] = useState(60)

  const isValid = phone.length === 9 && phone.startsWith('5')
  const maskedPhone = `+966 5** *** **${phone.slice(-2)}`

  useEffect(() => {
    if (step !== 'otp') return
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown, step])

  function handlePhoneSubmit() {
    if (!isValid) {
      setError('Enter a valid Saudi mobile number starting with 5')
      return
    }
    setLoading(true)
    // POST /api/auth/login/phone
    setTimeout(() => {
      setLoading(false)
      setStep('otp')
      setCountdown(60)
    }, 800)
  }

  function verifyOtp(code: string) {
    setLoading(true)
    setOtpError('')
    // POST /api/auth/login/verify-otp
    setTimeout(() => {
      setLoading(false)
      void code
      navigate('/dashboard?state=verified')
    }, 1500)
  }

  function handleOtpSubmit() {
    const code = otp.join('')
    if (code.length < 6) {
      setOtpError('Please enter all 6 digits')
      return
    }
    verifyOtp(code)
  }

  function handleResend() {
    setCountdown(60)
    setOtp(['', '', '', '', '', ''])
    setOtpError('')
  }

  function goBackToPhone() {
    setStep('phone')
    setOtp(['', '', '', '', '', ''])
    setOtpError('')
    setLoading(false)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(155deg, #000814 0%, #001233 40%, #002E83 70%, #0052B9 100%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 32px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <img src={logo} alt="FundMe" style={{ height: 72, objectFit: 'contain' }} />
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
          {t('login.dontHaveAccount')}{' '}
          <span
            onClick={() => navigate('/register')}
            style={{ color: '#fff', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 2 }}
          >
            {t('login.register')}
          </span>
        </p>
      </div>

      {/* Card area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 420,
            background: '#fff',
            borderRadius: 20,
            padding: 40,
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          }}
        >
          {step === 'phone' ? (
            <motion.div
              key="phone"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 6, textAlign: 'center' }}>
                {t('login.welcomeBack')}
              </h2>
              <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 28, textAlign: 'center', lineHeight: 1.6 }}>
                {t('login.signIn')}
              </p>

              <PhoneInputComp
                value={formatted}
                onChange={(raw, fmt) => { setPhone(raw); setFormatted(fmt); if (error) setError('') }}
                error={error}
                onSubmit={handlePhoneSubmit}
              />

              {/* Continue Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePhoneSubmit}
                disabled={loading}
                style={{
                  width: '100%',
                  height: 48,
                  marginTop: 24,
                  background: loading ? '#B8E67A' : '#7CFF01',
                  color: '#0F172A',
                  fontWeight: 600,
                  fontSize: 15,
                  borderRadius: 12,
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      style={{ width: 18, height: 18, border: '2px solid rgba(15,23,42,0.3)', borderTopColor: '#0F172A', borderRadius: '50%' }}
                    />
                    {t('common.sending')}
                  </>
                ) : (
                  <>
                    {t('login.continue')} <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={goBackToPhone}
                style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#6B7280', cursor: 'pointer', marginBottom: 24, background: 'none', border: 'none', padding: 0 }}
              >
                <ArrowLeft size={16} /> {t('common.back')}
              </button>

              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 6 }}>
                {t('login.verifyMobile')}
              </h2>
              <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 28, lineHeight: 1.6 }}>
                Enter the 6-digit code sent to <strong style={{ color: '#111' }}>{maskedPhone}</strong>
              </p>

              <OTPInput
                value={otp}
                onChange={(v) => { setOtp(v); if (otpError) setOtpError('') }}
                error={!!otpError}
                disabled={loading}
                onComplete={verifyOtp}
              />

              {otpError && (
                <p style={{ textAlign: 'center', fontSize: 13, color: '#EF4444', marginTop: 10 }}>{otpError}</p>
              )}

              {/* Resend */}
              <div style={{ textAlign: 'center', marginTop: 20, marginBottom: 24 }}>
                {countdown > 0 ? (
                  <p style={{ fontSize: 13, color: '#94A3B8' }}>
                    {t('common.resendCodeIn')} <strong style={{ color: '#6B7280' }}>{countdown}s</strong>
                  </p>
                ) : (
                  <button
                    onClick={handleResend}
                    style={{ fontSize: 13, fontWeight: 600, color: '#0D82F9', cursor: 'pointer', background: 'none', border: 'none' }}
                  >
                    {t('common.resendCode')}
                  </button>
                )}
              </div>

              {/* Verify Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOtpSubmit}
                disabled={loading}
                style={{
                  width: '100%',
                  height: 48,
                  background: loading ? '#B8E67A' : '#7CFF01',
                  color: '#0F172A',
                  fontWeight: 600,
                  fontSize: 15,
                  borderRadius: 12,
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      style={{ width: 18, height: 18, border: '2px solid rgba(15,23,42,0.3)', borderTopColor: '#0F172A', borderRadius: '50%' }}
                    />
                    {t('common.verifying')}
                  </>
                ) : (
                  <>
                    {t('login.verifySignIn')} <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: 'center',
          padding: '0 20px 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: 0.5 }}>
          {t('footer.encryption')}
        </p>
      </div>
    </div>
  )
}
