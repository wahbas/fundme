import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { NafathLogo } from '../../components/onboarding/logos'
import { useRegister } from './RegisterContext'
import ProgressBar from './components/ProgressBar'
import PhoneInputComp from './components/PhoneInput'

export default function PhoneScreen() {
  const navigate = useNavigate()
  const { setPhone: savePhone } = useRegister()
  const [phone, setPhone] = useState('')
  const [formatted, setFormatted] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isValid = phone.length === 9 && phone.startsWith('5')

  function handleSubmit() {
    if (!isValid) {
      setError('Enter a valid Saudi mobile number starting with 5')
      return
    }
    setLoading(true)
    // POST /api/auth/register/phone
    setTimeout(() => {
      setLoading(false)
      savePhone(phone)
      navigate('/register/verify-otp')
    }, 800)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
    >
      <ProgressBar current={1} />

      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 6 }}>
        Get started
      </h2>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 28, lineHeight: 1.6 }}>
        Enter your mobile number to create your account
      </p>

      <PhoneInputComp
        value={formatted}
        onChange={(raw, fmt) => { setPhone(raw); setFormatted(fmt); if (error) setError('') }}
        error={error}
        onSubmit={handleSubmit}
      />

      {/* Continue Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: '100%',
          height: 48,
          marginTop: 24,
          background: loading ? '#93C5FD' : 'linear-gradient(135deg, #000D1F, #002E83, #0052B9)',
          color: '#fff',
          fontWeight: 600,
          fontSize: 15,
          borderRadius: 12,
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          boxShadow: loading ? 'none' : 'inset 0 1px 0 rgba(255,255,255,0.15)',
        }}
      >
        {loading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
            />
            Sending...
          </>
        ) : (
          <>
            Continue <ArrowRight size={18} />
          </>
        )}
      </motion.button>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '24px 0' }}>
        <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
        <span style={{ fontSize: 12, color: '#94A3B8' }}>or continue with</span>
        <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
      </div>

      {/* Nafath Button */}
      <button
        style={{
          width: '100%',
          height: 48,
          background: '#fff',
          border: '1.5px solid #E2E8F0',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          fontSize: 14,
          fontWeight: 600,
          color: '#0D9488',
          cursor: 'pointer',
          transition: 'border-color 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#0D9488')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#E2E8F0')}
      >
        <NafathLogo size={20} />
        Nafath Digital Identity
      </button>

      {/* Terms */}
      <p style={{ textAlign: 'center', fontSize: 11, color: '#94A3B8', marginTop: 24, lineHeight: 1.6 }}>
        By continuing, you agree to our{' '}
        <span style={{ color: '#0D82F9', cursor: 'pointer' }}>Terms of Service</span>{' '}
        and{' '}
        <span style={{ color: '#0D82F9', cursor: 'pointer' }}>Privacy Policy</span>
      </p>
    </motion.div>
  )
}
