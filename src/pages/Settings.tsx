import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ArrowLeftRight, LogOut, ChevronRight, ChevronLeft, Lock, Eye, EyeOff, ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import FloatingHelpButton from '../components/dashboard/FloatingHelpButton'
import MobileTabBar from '../components/layout/MobileTabBar'
import { useTheme } from '../ThemeContext'
import { useI18n } from '../i18n'
import { motion } from 'framer-motion'

export default function Settings() {
  const [searchParams] = useSearchParams()
  const stateParam = searchParams.get('state')
  const verified = stateParam === 'verified' || searchParams.get('verified') === 'true'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const navigate = useNavigate()
  const { theme, isDark, toggleTheme } = useTheme()
  const { t, lang, setLang, isRTL } = useI18n()

  // Change Password state
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)
  const [cpStep, setCpStep] = useState<'form' | 'otp'>('form')
  const [cpNewPassword, setCpNewPassword] = useState('')
  const [cpConfirmPassword, setCpConfirmPassword] = useState('')
  const [cpShowNew, setCpShowNew] = useState(false)
  const [cpShowConfirm, setCpShowConfirm] = useState(false)
  const [cpOtp, setCpOtp] = useState(['', '', '', '', '', ''])
  const [cpError, setCpError] = useState('')
  const [cpLoading, setCpLoading] = useState(false)
  const [cpResendTimer, setCpResendTimer] = useState(0)
  const [cpSuccess, setCpSuccess] = useState(false)

  function cpStartResendTimer() {
    setCpResendTimer(30)
    const interval = setInterval(() => {
      setCpResendTimer(prev => {
        if (prev <= 1) { clearInterval(interval); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  function cpHandlePasswordSubmit() {
    if (!cpNewPassword || cpNewPassword.length < 8) {
      setCpError(t('forgotPassword.errMinChars' as any))
      return
    }
    if (cpNewPassword !== cpConfirmPassword) {
      setCpError(t('forgotPassword.errMismatch' as any))
      return
    }
    setCpLoading(true)
    setCpError('')
    setTimeout(() => {
      setCpLoading(false)
      setCpStep('otp')
      cpStartResendTimer()
    }, 1000)
  }

  function cpHandleOtpChange(index: number, value: string) {
    if (value.length > 1) value = value.slice(-1)
    if (value && !/^\d$/.test(value)) return
    const newOtp = [...cpOtp]
    newOtp[index] = value
    setCpOtp(newOtp)
    setCpError('')
    if (value && index < 5) {
      const next = document.getElementById(`cp-otp-${index + 1}`)
      next?.focus()
    }
  }

  function cpHandleOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !cpOtp[index] && index > 0) {
      const prev = document.getElementById(`cp-otp-${index - 1}`)
      prev?.focus()
    }
    if (e.key === 'Enter') cpHandleOtpSubmit()
  }

  function cpHandleOtpSubmit() {
    const code = cpOtp.join('')
    if (code.length !== 6) {
      setCpError(t('login.errOtp' as any) || 'Please enter the 6-digit code')
      return
    }
    setCpLoading(true)
    setCpError('')
    setTimeout(() => {
      setCpLoading(false)
      setCpSuccess(true)
      setTimeout(() => {
        setChangePasswordOpen(false)
        setCpStep('form')
        setCpNewPassword('')
        setCpConfirmPassword('')
        setCpOtp(['', '', '', '', '', ''])
        setCpSuccess(false)
      }, 2000)
    }, 1000)
  }

  function cpReset() {
    setChangePasswordOpen(false)
    setCpStep('form')
    setCpNewPassword('')
    setCpConfirmPassword('')
    setCpOtp(['', '', '', '', '', ''])
    setCpError('')
    setCpLoading(false)
    setCpSuccess(false)
  }

  const pillStyle = (active: boolean): React.CSSProperties => ({
    padding: '8px 20px',
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 600,
    border: active ? 'none' : `1px solid ${theme.border}`,
    background: active ? '#2563EB' : theme.inputBg,
    color: active ? '#fff' : theme.textSecondary,
    cursor: 'pointer',
    transition: 'background 0.2s, color 0.2s',
  })

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar verified={verified} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} />
      <main style={{
        marginLeft: isRTL ? 0 : (sidebarCollapsed ? 72 : 240),
        marginRight: isRTL ? (sidebarCollapsed ? 72 : 240) : 0,
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        flex: 1, minWidth: 0, overflow: 'hidden', minHeight: '100vh', background: theme.bgPrimary, padding: 0,
      }}>
        <div style={{ background: theme.bgPrimary, minHeight: '100vh', padding: '28px 32px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="inner-page-header"><Header /></div>

            <h1 style={{ fontSize: 22, fontWeight: 700, color: theme.textPrimary, marginBottom: 24 }}>{t('settings.title')}</h1>

            {/* Card 1: Appearance */}
            <div style={{
              background: theme.cardBg,
              border: `1px solid ${theme.border}`,
              borderRadius: 16,
              padding: 28,
              boxShadow: theme.shadow,
              marginBottom: 20,
            }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary, marginBottom: 20 }}>{t('settings.appearance')}</h2>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: theme.textPrimary, marginBottom: 4 }}>{t('settings.darkMode')}</p>
                  <p style={{ fontSize: 12, color: theme.textMuted }}>{t('settings.switchDarkTheme')}</p>
                </div>

                {/* Toggle switch */}
                <div
                  onClick={toggleTheme}
                  style={{
                    width: 48,
                    height: 24,
                    borderRadius: 12,
                    background: isDark ? '#7CFF01' : '#E2E8F0',
                    transition: 'background 0.2s',
                    cursor: 'pointer',
                    position: 'relative',
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: '#fff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    position: 'absolute',
                    top: 2,
                    left: 0,
                    transform: isDark ? 'translateX(26px)' : 'translateX(2px)',
                    transition: 'transform 0.2s',
                  }} />
                </div>
              </div>
            </div>

            {/* Card 2: Language & Region */}
            <div style={{
              background: theme.cardBg,
              border: `1px solid ${theme.border}`,
              borderRadius: 16,
              padding: 28,
              boxShadow: theme.shadow,
              marginBottom: 20,
            }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary, marginBottom: 20 }}>{t('settings.languageRegion')}</h2>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: theme.textPrimary, marginBottom: 4 }}>{t('settings.language')}</p>
                  <p style={{ fontSize: 12, color: theme.textMuted }}>{t('settings.switchLanguage')}</p>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => setLang('en')} style={pillStyle(lang === 'en')}>
                    EN
                  </button>
                  <button onClick={() => setLang('ar')} style={pillStyle(lang === 'ar')}>
                    عربية
                  </button>
                </div>
              </div>
            </div>
            {/* Card 3: Account */}
            <div style={{
              background: theme.cardBg,
              border: `1px solid ${theme.border}`,
              borderRadius: 16,
              padding: 28,
              boxShadow: theme.shadow,
              marginBottom: 20,
            }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary, marginBottom: 20 }}>{t('settings.account' as any) || 'Account'}</h2>

              {/* Change Password */}
              <div
                onClick={() => setChangePasswordOpen(true)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 0', cursor: 'pointer',
                  borderBottom: `1px solid ${theme.borderLight}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, background: 'rgba(37,99,235,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Lock size={18} color="#2563EB" />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: theme.textPrimary, marginBottom: 2 }}>{t('settings.changePassword' as any)}</p>
                    <p style={{ fontSize: 12, color: theme.textMuted }}>{t('settings.changePasswordDesc' as any)}</p>
                  </div>
                </div>
                {isRTL ? <ChevronLeft size={18} color={theme.textMuted} /> : <ChevronRight size={18} color={theme.textMuted} />}
              </div>

              {/* Switch Profile */}
              <div
                onClick={() => {/* switch profile action */}}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 0', cursor: 'pointer',
                  borderBottom: `1px solid ${theme.borderLight}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, background: 'rgba(37,99,235,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <ArrowLeftRight size={18} color="#2563EB" />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: theme.textPrimary, marginBottom: 2 }}>{t('nav.switchProfile')}</p>
                    <p style={{ fontSize: 12, color: theme.textMuted }}>{t('settings.switchProfileDesc' as any) || 'Switch to another business profile'}</p>
                  </div>
                </div>
                {isRTL ? <ChevronLeft size={18} color={theme.textMuted} /> : <ChevronRight size={18} color={theme.textMuted} />}
              </div>

              {/* Sign Out */}
              <div
                onClick={() => navigate('/login')}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 0', cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, background: 'rgba(239,68,68,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <LogOut size={18} color="#EF4444" />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: '#EF4444', marginBottom: 2 }}>{t('settings.signOut' as any) || 'Sign Out'}</p>
                    <p style={{ fontSize: 12, color: theme.textMuted }}>{t('settings.signOutDesc' as any) || 'Log out of your account'}</p>
                  </div>
                </div>
                {isRTL ? <ChevronLeft size={18} color={theme.textMuted} /> : <ChevronRight size={18} color={theme.textMuted} />}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </main>
      <FloatingHelpButton />
      <MobileTabBar />

      {/* Change Password Modal */}
      {changePasswordOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20,
        }} onClick={(e) => { if (e.target === e.currentTarget) cpReset() }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              width: '100%', maxWidth: 440, background: theme.cardBg,
              borderRadius: 20, padding: 32, boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            }}
          >
            {cpSuccess ? (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', background: '#ECFDF5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
                }}>
                  <ShieldCheck size={28} color="#10B981" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: theme.textPrimary, marginBottom: 8 }}>
                  {t('forgotPassword.resetPassword' as any)}
                </h3>
                <p style={{ fontSize: 14, color: theme.textMuted }}>
                  {lang === 'en' ? 'Your password has been updated successfully.' : 'تم تحديث كلمة المرور بنجاح.'}
                </p>
              </motion.div>
            ) : cpStep === 'form' ? (
              <motion.div key="cp-form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%', background: isDark ? 'rgba(37,99,235,0.15)' : '#EFF6FF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
                  }}>
                    <ShieldCheck size={24} color="#2563EB" />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: theme.textPrimary, marginBottom: 6 }}>
                    {t('settings.changePassword' as any)}
                  </h3>
                  <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.6 }}>
                    {t('forgotPassword.setNewPasswordDesc' as any)}
                  </p>
                </div>

                {/* New Password */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary, marginBottom: 6, display: 'block' }}>
                    {t('forgotPassword.newPassword' as any)}
                  </label>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    border: `1.5px solid ${cpError && !cpNewPassword ? '#EF4444' : theme.border}`,
                    borderRadius: 12, padding: '0 14px', height: 48,
                    background: theme.inputBg, transition: 'border-color 0.2s',
                  }}>
                    <Lock size={18} color={theme.textMuted} />
                    <input
                      type={cpShowNew ? 'text' : 'password'}
                      value={cpNewPassword}
                      onChange={(e) => { setCpNewPassword(e.target.value); if (cpError) setCpError('') }}
                      placeholder={t('register.passwordPlaceholder' as any)}
                      style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 15, color: theme.textPrimary }}
                    />
                    <button onClick={() => setCpShowNew(!cpShowNew)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                      {cpShowNew ? <EyeOff size={18} color={theme.textMuted} /> : <Eye size={18} color={theme.textMuted} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary, marginBottom: 6, display: 'block' }}>
                    {t('register.confirmPassword' as any)}
                  </label>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    border: `1.5px solid ${cpError && cpNewPassword !== cpConfirmPassword ? '#EF4444' : theme.border}`,
                    borderRadius: 12, padding: '0 14px', height: 48,
                    background: theme.inputBg, transition: 'border-color 0.2s',
                  }}>
                    <Lock size={18} color={theme.textMuted} />
                    <input
                      type={cpShowConfirm ? 'text' : 'password'}
                      value={cpConfirmPassword}
                      onChange={(e) => { setCpConfirmPassword(e.target.value); if (cpError) setCpError('') }}
                      onKeyDown={(e) => e.key === 'Enter' && cpHandlePasswordSubmit()}
                      placeholder={t('register.reenterPassword' as any)}
                      style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 15, color: theme.textPrimary }}
                    />
                    <button onClick={() => setCpShowConfirm(!cpShowConfirm)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                      {cpShowConfirm ? <EyeOff size={18} color={theme.textMuted} /> : <Eye size={18} color={theme.textMuted} />}
                    </button>
                  </div>
                </div>

                {cpError && <p style={{ fontSize: 13, color: '#EF4444', textAlign: 'center', marginBottom: 16 }}>{cpError}</p>}

                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={cpReset} style={{
                    flex: 1, height: 48, borderRadius: 12, border: `1.5px solid ${theme.border}`,
                    background: 'transparent', color: theme.textPrimary, fontWeight: 600, fontSize: 15, cursor: 'pointer',
                  }}>
                    {t('common.back')}
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                    onClick={cpHandlePasswordSubmit} disabled={cpLoading}
                    style={{
                      flex: 2, height: 48, background: cpLoading ? '#93C5FD' : '#2563EB',
                      color: '#fff', fontWeight: 600, fontSize: 15, borderRadius: 12,
                      border: 'none', cursor: cpLoading ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                  >
                    {cpLoading ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} />
                    ) : (
                      <>
                        {t('forgotPassword.continue' as any)} {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="cp-otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%', background: isDark ? 'rgba(37,99,235,0.15)' : '#EFF6FF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
                  }}>
                    <ShieldCheck size={24} color="#2563EB" />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: theme.textPrimary, marginBottom: 6 }}>
                    {t('login.verifyMobile')}
                  </h3>
                  <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.6 }}>
                    {t('forgotPassword.otpDesc' as any)}
                  </p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: theme.textPrimary, marginTop: 4, direction: 'ltr' }}>
                    +966 50 *** 4567
                  </p>
                </div>

                {/* OTP Input */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
                  {cpOtp.map((digit, i) => (
                    <input
                      key={i}
                      id={`cp-otp-${i}`}
                      type="text" inputMode="numeric" maxLength={1}
                      value={digit}
                      onChange={(e) => cpHandleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => cpHandleOtpKeyDown(i, e)}
                      onFocus={(e) => e.target.select()}
                      style={{
                        width: 48, height: 52, textAlign: 'center',
                        fontSize: 20, fontWeight: 700, color: theme.textPrimary,
                        border: `1.5px solid ${digit ? '#2563EB' : theme.border}`,
                        borderRadius: 12, outline: 'none', background: theme.inputBg,
                        transition: 'border-color 0.15s',
                      }}
                    />
                  ))}
                </div>

                {cpError && <p style={{ fontSize: 13, color: '#EF4444', textAlign: 'center', marginBottom: 16 }}>{cpError}</p>}

                <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                  <button onClick={() => { setCpStep('form'); setCpOtp(['', '', '', '', '', '']); setCpError('') }} style={{
                    flex: 1, height: 48, borderRadius: 12, border: `1.5px solid ${theme.border}`,
                    background: 'transparent', color: theme.textPrimary, fontWeight: 600, fontSize: 15, cursor: 'pointer',
                  }}>
                    {t('common.back')}
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                    onClick={cpHandleOtpSubmit} disabled={cpLoading}
                    style={{
                      flex: 2, height: 48, background: cpLoading ? '#93C5FD' : '#2563EB',
                      color: '#fff', fontWeight: 600, fontSize: 15, borderRadius: 12,
                      border: 'none', cursor: cpLoading ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                  >
                    {cpLoading ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} />
                    ) : (
                      <>
                        {t('forgotPassword.resetPassword' as any)} {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Resend */}
                <p style={{ textAlign: 'center', fontSize: 13, color: theme.textMuted }}>
                  {t('login.didntReceive' as any) || "Didn't receive the code?"}{' '}
                  {cpResendTimer > 0 ? (
                    <span style={{ color: theme.textMuted }}>
                      {t('login.resendIn' as any) || 'Resend in'} {cpResendTimer}s
                    </span>
                  ) : (
                    <span onClick={cpStartResendTimer} style={{ color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>
                      {t('login.resend' as any) || 'Resend'}
                    </span>
                  )}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}
