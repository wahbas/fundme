import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useInvestorTheme } from '../../../components/investor/InvestorThemeContext'
import { useInvestorRegister } from './InvestorRegisterContext'
import InvestorPasswordInput from '../../../components/investor/register/InvestorPasswordInput'
import InvestorButton from '../../../components/investor/register/InvestorButton'
import InvestorProgressStepper from '../../../components/investor/register/InvestorProgressStepper'

export default function InvestorPasswordScreen() {
  const { theme } = useInvestorTheme()
  const { data, setPassword, setCurrentStep } = useInvestorRegister()
  const navigate = useNavigate()
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { setCurrentStep(4) }, [])

  const isStrong = data.password.length >= 8
  const isMatch = data.password === confirm && confirm.length > 0
  const canSubmit = isStrong && isMatch

  function handleSubmit() {
    if (!isStrong) {
      setError('Password must be at least 8 characters')
      return
    }
    if (!isMatch) {
      setError('Passwords do not match')
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/investor/register/verify-identity')
    }, 800)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <InvestorProgressStepper currentStep={4} />

      <button
        onClick={() => navigate('/investor/register/national-id')}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
          color: theme.textSecondary, fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 24,
          fontFamily: 'inherit',
        }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textHeading, marginBottom: 6 }}>
        Create your password
      </h2>
      <p style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 28, margin: '0 0 28px' }}>
        Choose a strong password to secure your account
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 28 }}>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.textSecondary, marginBottom: 6 }}>
            Password
          </label>
          <InvestorPasswordInput
            value={data.password}
            onChange={setPassword}
            placeholder="Create a password"
            showStrength
            onSubmit={handleSubmit}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: theme.textSecondary, marginBottom: 6 }}>
            Confirm Password
          </label>
          <InvestorPasswordInput
            value={confirm}
            onChange={(v) => {
              setConfirm(v)
              setError('')
            }}
            placeholder="Confirm your password"
            error={!!error && error.includes('match')}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      {error && (
        <p style={{ fontSize: 12, color: theme.red, marginBottom: 12, margin: '0 0 12px' }}>{error}</p>
      )}

      <InvestorButton onClick={handleSubmit} loading={loading} disabled={!canSubmit}>
        Continue
      </InvestorButton>
    </motion.div>
  )
}
