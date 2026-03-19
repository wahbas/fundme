import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, IdCard, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRegister } from './RegisterContext'
import ProgressBar from './components/ProgressBar'
import PasswordInput from './components/PasswordInput'

export default function BasicInfoScreen() {
  const navigate = useNavigate()
  const { setBasicInfo } = useRegister()
  const [nationalId, setNationalId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  function validate(): boolean {
    const errs: Record<string, string> = {}
    if (!/^[12]\d{9}$/.test(nationalId)) errs.nationalId = 'Enter a valid 10-digit National ID (starts with 1 or 2)'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email address'
    if (password.length < 8) errs.password = 'Password must be at least 8 characters'
    if (password !== confirmPw) errs.confirmPw = 'Passwords do not match'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSubmit() {
    if (!validate()) return
    setLoading(true)
    // POST /api/auth/register/complete
    setTimeout(() => {
      setLoading(false)
      setBasicInfo({ nationalId, email })
      navigate('/register/verify-identity')
    }, 800)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
    >
      <ProgressBar current={3} />

      <button
        onClick={() => navigate('/register/verify-otp')}
        style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#6B7280', cursor: 'pointer', marginBottom: 24, background: 'none', border: 'none', padding: 0 }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 6 }}>
        Complete your profile
      </h2>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 28, lineHeight: 1.6 }}>
        Enter your details to set up your account
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* National ID */}
        <Field label="National ID / Iqama Number" error={errors.nationalId}>
          <InputWithIcon
            icon={<IdCard size={18} color="#9CA3AF" />}
            type="text"
            inputMode="numeric"
            value={nationalId}
            onChange={(v) => { setNationalId(v.replace(/\D/g, '').slice(0, 10)); if (errors.nationalId) setErrors((p) => ({ ...p, nationalId: '' })) }}
            placeholder="10-digit National ID"
            error={!!errors.nationalId}
          />
        </Field>

        {/* Email */}
        <Field label="Email Address" error={errors.email}>
          <InputWithIcon
            icon={<Mail size={18} color="#9CA3AF" />}
            type="email"
            value={email}
            onChange={(v) => { setEmail(v); if (errors.email) setErrors((p) => ({ ...p, email: '' })) }}
            placeholder="you@company.com"
            error={!!errors.email}
          />
        </Field>

        {/* Password */}
        <Field label="Password" error={errors.password}>
          <PasswordInput
            value={password}
            onChange={(v) => { setPassword(v); if (errors.password) setErrors((p) => ({ ...p, password: '' })) }}
            placeholder="Min. 8 characters"
            error={!!errors.password}
            showStrength
          />
        </Field>

        {/* Confirm Password */}
        <Field label="Confirm Password" error={errors.confirmPw}>
          <PasswordInput
            value={confirmPw}
            onChange={(v) => { setConfirmPw(v); if (errors.confirmPw) setErrors((p) => ({ ...p, confirmPw: '' })) }}
            placeholder="Re-enter password"
            error={!!errors.confirmPw}
          />
        </Field>

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            height: 48,
            marginTop: 4,
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
              Saving...
            </>
          ) : (
            <>
              Continue <ArrowRight size={18} />
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>{label}</label>
      {children}
      {error && <p style={{ fontSize: 11, color: '#EF4444', marginTop: 4 }}>{error}</p>}
    </div>
  )
}

function InputWithIcon({
  icon,
  error,
  onChange,
  ...rest
}: {
  icon: React.ReactNode
  error?: boolean
  onChange: (value: string) => void
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'style'>) {
  const [focused, setFocused] = useState(false)
  const borderColor = error ? '#EF4444' : focused ? '#0D82F9' : '#E2E8F0'

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        {icon}
      </div>
      <input
        {...rest}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          height: 48,
          paddingLeft: 42,
          paddingRight: 14,
          fontSize: 14,
          color: '#111',
          border: `1.5px solid ${borderColor}`,
          borderRadius: 12,
          outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
          boxSizing: 'border-box',
          background: focused ? '#fff' : '#F8FAFC',
          boxShadow: focused && !error ? '0 0 0 3px rgba(13,130,249,0.08)' : 'none',
        }}
      />
    </div>
  )
}
