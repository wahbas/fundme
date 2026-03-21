import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Mail, Phone } from 'lucide-react'
import { useTheme } from '../ThemeContext'

interface ChangeContactModalProps {
  open: boolean
  onClose: () => void
  type: 'phone' | 'email'
}

type ModalState = 'edit' | 'verify' | 'success'

export default function ChangeContactModal({ open, onClose, type }: ChangeContactModalProps) {
  const [state, setState] = useState<ModalState>('edit')
  const [newValue, setNewValue] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [countdown, setCountdown] = useState(60)
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])
  const { theme } = useTheme()

  // Reset state when modal opens/closes
  useEffect(() => {
    if (open) {
      setState('edit')
      setNewValue('')
      setOtp(['', '', '', '', '', ''])
      setCountdown(60)
    }
  }, [open])

  // Countdown timer for phone verify
  useEffect(() => {
    if (state !== 'verify' || type !== 'phone') return
    if (countdown <= 0) return
    const timer = setInterval(() => setCountdown(c => c - 1), 1000)
    return () => clearInterval(timer)
  }, [state, type, countdown])

  // Auto-advance email verify to success after 3s
  useEffect(() => {
    if (state !== 'verify' || type !== 'email') return
    const timer = setTimeout(() => setState('success'), 3000)
    return () => clearTimeout(timer)
  }, [state, type])

  if (!open) return null

  const handleClose = () => {
    onClose()
    setState('edit')
  }

  const handleSendOtp = () => {
    setState('verify')
    setCountdown(60)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const next = [...otp]
    next[index] = value.slice(-1)
    setOtp(next)
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = () => {
    setState('success')
  }

  const handleResend = () => {
    setOtp(['', '', '', '', '', ''])
    setCountdown(60)
  }

  const isPhone = type === 'phone'

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
      }}
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: theme.cardBg,
          borderRadius: 20,
          maxWidth: 420,
          width: '90%',
          padding: 32,
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        }}
      >
        <AnimatePresence mode="wait">
          {/* ── Edit State ── */}
          {state === 'edit' && (
            <motion.div
              key="edit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.textPrimary, margin: 0 }}>
                  {isPhone ? 'Change Phone Number' : 'Change Email Address'}
                </h2>
                <button
                  onClick={handleClose}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={20} color="#64748B" />
                </button>
              </div>

              {/* Current value */}
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: theme.textSecondary, marginBottom: 8 }}>
                  {isPhone ? 'Current Number' : 'Current Email'}
                </p>
                <div style={{
                  padding: '12px 14px',
                  background: theme.bgPrimary,
                  border: `1px solid ${theme.borderLight}`,
                  borderRadius: 10,
                  fontSize: 14,
                  color: theme.textPrimary,
                }}>
                  {isPhone ? '+966 50 123 4567' : 'ahmed.alrashid@email.com'}
                </div>
              </div>

              {/* New value input */}
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: theme.textSecondary, marginBottom: 8 }}>
                  {isPhone ? 'New Phone Number' : 'New Email Address'}
                </p>
                <input
                  type={isPhone ? 'tel' : 'email'}
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder={isPhone ? '+966' : 'email@example.com'}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: theme.bgPrimary,
                    border: `1px solid ${theme.borderLight}`,
                    borderRadius: 10,
                    fontSize: 14,
                    color: theme.textPrimary,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Send button */}
              <button
                onClick={handleSendOtp}
                style={{
                  background: '#7CFF01',
                  color: '#0F172A',
                  fontWeight: 600,
                  fontSize: 15,
                  width: '100%',
                  height: 44,
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {isPhone ? 'Send OTP' : 'Send Verification'}
              </button>
            </motion.div>
          )}

          {/* ── Verify State ── */}
          {state === 'verify' && (
            <motion.div
              key="verify"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {isPhone ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.textPrimary, margin: 0 }}>Verify Code</h2>
                    <button
                      onClick={handleClose}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <X size={20} color="#64748B" />
                    </button>
                  </div>

                  <p style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 24 }}>
                    Enter the 6-digit code sent to your new number
                  </p>

                  {/* OTP inputs */}
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 20 }}>
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { otpRefs.current[i] = el }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        style={{
                          width: 44,
                          height: 48,
                          borderRadius: 10,
                          border: `1.5px solid ${theme.border}`,
                          textAlign: 'center',
                          fontSize: 20,
                          fontWeight: 700,
                          color: theme.textPrimary,
                          outline: 'none',
                          background: theme.cardBg,
                        }}
                      />
                    ))}
                  </div>

                  {/* Countdown / Resend */}
                  <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    {countdown > 0 ? (
                      <p style={{ fontSize: 13, color: theme.textMuted }}>
                        Resend code in <span style={{ fontWeight: 600, color: theme.textPrimary }}>{countdown}s</span>
                      </p>
                    ) : (
                      <button
                        onClick={handleResend}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#2563EB',
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        }}
                      >
                        Resend code
                      </button>
                    )}
                  </div>

                  {/* Verify button */}
                  <button
                    onClick={handleVerify}
                    style={{
                      background: '#7CFF01',
                      color: '#0F172A',
                      fontWeight: 600,
                      fontSize: 15,
                      width: '100%',
                      height: 44,
                      borderRadius: 10,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Verify
                  </button>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.textPrimary, margin: 0 }}>Verify Email</h2>
                    <button
                      onClick={handleClose}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <X size={20} color="#64748B" />
                    </button>
                  </div>

                  <p style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 24, textAlign: 'center' }}>
                    We've sent a verification link to your new email address
                  </p>

                  {/* Email icon */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                    <div style={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      background: '#EFF6FF',
                      border: '2px solid #BFDBFE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Mail size={32} color="#2563EB" />
                    </div>
                  </div>

                  {/* Open Email App button */}
                  <button
                    onClick={() => {}}
                    style={{
                      background: '#2563EB',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: 15,
                      width: '100%',
                      height: 44,
                      borderRadius: 10,
                      border: 'none',
                      cursor: 'pointer',
                      marginBottom: 12,
                    }}
                  >
                    Open Email App
                  </button>

                  {/* Resend link */}
                  <div style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => {}}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#2563EB',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                      Resend email
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* ── Success State ── */}
          {state === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0' }}
            >
              <CheckCircle2 size={48} color="#16A34A" />

              <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.textPrimary, marginTop: 16, marginBottom: 8 }}>
                {isPhone ? 'Phone Number Updated' : 'Email Address Updated'}
              </h2>

              <p style={{ fontSize: 14, color: theme.textSecondary, textAlign: 'center', marginBottom: 24 }}>
                {isPhone
                  ? 'Your phone number has been updated successfully.'
                  : 'Your email address has been updated successfully.'}
              </p>

              <button
                onClick={handleClose}
                style={{
                  background: '#2563EB',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 15,
                  width: '100%',
                  height: 44,
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Done
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
