import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Eye, EyeOff, User, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import logo from '../assets/logo.png'
import { useI18n } from '../i18n'

export default function Login() {
  const navigate = useNavigate()
  const { t, lang, setLang, isRTL } = useI18n()
  const [nationalId, setNationalId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [otpLoading, setOtpLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  function handleSubmit() {
    if (!nationalId || nationalId.length !== 10) {
      setError(t('login.errNationalId' as any))
      return
    }
    if (!password || password.length < 6) {
      setError(t('login.errPassword' as any))
      return
    }
    setLoading(true)
    setError('')
    setTimeout(() => {
      setLoading(false)
      setStep('otp')
      setResendTimer(30)
      const interval = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) { clearInterval(interval); return 0 }
          return prev - 1
        })
      }, 1000)
    }, 1200)
  }

  function handleOtpSubmit() {
    const code = otp.join('')
    if (code.length !== 6) {
      setError(t('login.errOtp' as any) || 'Please enter the 6-digit code')
      return
    }
    setOtpLoading(true)
    setError('')
    setTimeout(() => {
      setOtpLoading(false)
      navigate('/dashboard?state=verified')
    }, 1000)
  }

  function handleOtpChange(index: number, value: string) {
    if (value.length > 1) value = value.slice(-1)
    if (value && !/^\d$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError('')
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`)
      next?.focus()
    }
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`)
      prev?.focus()
    }
    if (e.key === 'Enter') handleOtpSubmit()
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.08)',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
            }}
          >
            {lang === 'en' ? 'عربية' : 'EN'}
          </button>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
            {t('login.dontHaveAccount')}{' '}
            <span
              onClick={() => navigate('/register')}
              style={{ color: '#fff', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 2 }}
            >
              {t('login.register')}
            </span>
          </p>
        </div>
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
          className="register-card"
          style={{
            width: '100%',
            maxWidth: 440,
            background: '#fff',
            borderRadius: 20,
            padding: 40,
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          }}
        >
          {step === 'credentials' ? (
          <motion.div
            key="credentials"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 6, textAlign: 'center' }}>
              {t('login.welcomeBack')}
            </h2>
            <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 28, textAlign: 'center', lineHeight: 1.6 }}>
              {t('login.signInWithId' as any)}
            </p>

            {/* National ID */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>
                {t('login.nationalId' as any)}
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  border: `1.5px solid ${error && !nationalId ? '#EF4444' : '#E5E7EB'}`,
                  borderRadius: 12,
                  padding: '0 14px',
                  height: 48,
                  background: '#F9FAFB',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#002E83' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB' }}
              >
                <User size={18} color="#9CA3AF" />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  value={nationalId}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, '')
                    setNationalId(v)
                    if (error) setError('')
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder={t('login.nationalIdPlaceholder' as any)}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: 15,
                    color: '#111',
                    letterSpacing: 1,
                  }}
                />
                {nationalId.length === 10 && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>
                {t('login.password' as any)}
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  border: `1.5px solid ${error && !password ? '#EF4444' : '#E5E7EB'}`,
                  borderRadius: 12,
                  padding: '0 14px',
                  height: 48,
                  background: '#F9FAFB',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#002E83' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB' }}
              >
                <Lock size={18} color="#9CA3AF" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (error) setError('') }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="••••••••"
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: 15,
                    color: '#111',
                  }}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
                >
                  {showPassword ? <EyeOff size={18} color="#9CA3AF" /> : <Eye size={18} color="#9CA3AF" />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div style={{ textAlign: 'right', marginBottom: 24 }}>
              <span
                onClick={() => navigate('/forgot-password')}
                style={{ fontSize: 13, color: '#2563EB', fontWeight: 500, cursor: 'pointer' }}
              >
                {t('login.forgotPassword' as any)}
              </span>
            </div>

            {/* Error */}
            {error && (
              <p style={{ fontSize: 13, color: '#EF4444', textAlign: 'center', marginBottom: 16 }}>{error}</p>
            )}

            {/* Sign In Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
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
                  {t('login.signInBtn' as any)} {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                </>
              )}
            </motion.button>
          </motion.div>
          ) : (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Back link */}
            <button
              onClick={() => { setStep('credentials'); setOtp(['', '', '', '', '', '']); setError('') }}
              style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#6B7280', cursor: 'pointer', marginBottom: 24, background: 'none', border: 'none', padding: 0 }}
            >
              {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />} {t('common.back')}
            </button>

            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              {/* Phone icon */}
              <div style={{
                width: 56, height: 56, borderRadius: '50%', background: '#EFF6FF',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
              }}>
                <Lock size={24} color="#2563EB" />
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 6 }}>
                {t('login.verifyMobile')}
              </h2>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6 }}>
                {t('login.otpSentTo' as any) || 'We sent a verification code to'}
              </p>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#111', marginTop: 4, direction: 'ltr' }}>
                +966 50 *** 4567
              </p>
            </div>

            {/* OTP Input */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  onFocus={(e) => e.target.select()}
                  style={{
                    width: 48, height: 52, textAlign: 'center',
                    fontSize: 20, fontWeight: 700, color: '#111',
                    border: `1.5px solid ${digit ? '#2563EB' : '#E5E7EB'}`,
                    borderRadius: 12, outline: 'none', background: '#F9FAFB',
                    transition: 'border-color 0.15s',
                  }}
                />
              ))}
            </div>

            {/* Error */}
            {error && (
              <p style={{ fontSize: 13, color: '#EF4444', textAlign: 'center', marginBottom: 16 }}>{error}</p>
            )}

            {/* Verify Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOtpSubmit}
              disabled={otpLoading}
              style={{
                width: '100%', height: 48,
                background: otpLoading ? '#B8E67A' : '#7CFF01',
                color: '#0F172A', fontWeight: 600, fontSize: 15,
                borderRadius: 12, border: 'none',
                cursor: otpLoading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                marginBottom: 20,
              }}
            >
              {otpLoading ? (
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
                  {t('login.verifySignIn')} {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                </>
              )}
            </motion.button>

            {/* Resend */}
            <p style={{ textAlign: 'center', fontSize: 13, color: '#6B7280' }}>
              {t('login.didntReceive' as any) || "Didn't receive the code?"}{' '}
              {resendTimer > 0 ? (
                <span style={{ color: '#94A3B8' }}>
                  {t('login.resendIn' as any) || 'Resend in'} {resendTimer}s
                </span>
              ) : (
                <span
                  onClick={() => {
                    setResendTimer(30)
                    const interval = setInterval(() => {
                      setResendTimer(prev => {
                        if (prev <= 1) { clearInterval(interval); return 0 }
                        return prev - 1
                      })
                    }, 1000)
                  }}
                  style={{ color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}
                >
                  {t('login.resend' as any) || 'Resend'}
                </span>
              )}
            </p>
          </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '0 20px 24px', position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: 0.5 }}>
          {t('footer.encryption')}
        </p>
      </div>
    </div>
  )
}
