import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
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
            Sending...
          </>
        ) : (
          <>
            Continue <ArrowRight size={18} />
          </>
        )}
      </motion.button>

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
