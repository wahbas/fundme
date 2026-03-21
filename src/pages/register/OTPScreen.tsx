import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRegister } from './RegisterContext'
import ProgressBar from './components/ProgressBar'
import OTPInput from './components/OTPInput'
import { useI18n } from '../../i18n'

export default function OTPScreen() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const { data } = useRegister()
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(60)

  const maskedPhone = `+966 5** *** **${data.phone.slice(-2)}`

  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  function verifyOtp(code: string) {
    setLoading(true)
    setError('')
    // POST /api/auth/verify-otp
    setTimeout(() => {
      setLoading(false)
      void code
      navigate('/register/info')
    }, 1500)
  }

  function handleSubmit() {
    const code = otp.join('')
    if (code.length < 6) {
      setError('Please enter all 6 digits')
      return
    }
    verifyOtp(code)
  }

  function handleResend() {
    setCountdown(60)
    setOtp(['', '', '', '', '', ''])
    setError('')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
    >
      <ProgressBar current={2} />

      <button
        onClick={() => navigate('/register')}
        style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#6B7280', cursor: 'pointer', marginBottom: 24, background: 'none', border: 'none', padding: 0 }}
      >
        <ArrowLeft size={16} /> {t('common.back')}
      </button>

      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 6 }}>
        {t('register.verifyMobile')}
      </h2>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 28, lineHeight: 1.6 }}>
        Enter the 6-digit code sent to <strong style={{ color: '#111' }}>{maskedPhone}</strong>
      </p>

      <OTPInput
        value={otp}
        onChange={(v) => { setOtp(v); if (error) setError('') }}
        error={!!error}
        disabled={loading}
        onComplete={verifyOtp}
      />

      {error && (
        <p style={{ textAlign: 'center', fontSize: 13, color: '#EF4444', marginTop: 10 }}>{error}</p>
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
            style={{ fontSize: 13, fontWeight: 600, color: '#2563EB', cursor: 'pointer', background: 'none', border: 'none' }}
          >
            {t('common.resendCode')}
          </button>
        )}
      </div>

      {/* Submit */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: '100%',
          height: 48,
          background: loading ? 'rgba(124,255,1,0.5)' : '#7CFF01',
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
              style={{ width: 18, height: 18, border: '2px solid rgba(0,0,0,0.15)', borderTopColor: '#0F172A', borderRadius: '50%' }}
            />
            {t('common.verifying')}
          </>
        ) : (
          <>
            Verify & Continue <ArrowRight size={18} />
          </>
        )}
      </motion.button>
    </motion.div>
  )
}
