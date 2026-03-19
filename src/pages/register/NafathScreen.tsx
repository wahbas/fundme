import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, Fingerprint, Smartphone, Clock,
  CheckCircle2, AlertTriangle, RefreshCw,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { NafathLogo } from '../../components/onboarding/logos'
import ProgressBar from './components/ProgressBar'

type NafathState = 'intro' | 'requesting' | 'waiting' | 'verifying' | 'success' | 'failed'

function useMockNafath() {
  const [state, setState] = useState<NafathState>('intro')
  const [number, setNumber] = useState('')
  const [timeLeft, setTimeLeft] = useState(120)

  useEffect(() => {
    if (state !== 'waiting') return
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { setState('failed'); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [state])

  // Auto-succeed after 4s (demo)
  useEffect(() => {
    if (state !== 'waiting') return
    const t = setTimeout(() => {
      setState('verifying')
      setTimeout(() => setState('success'), 1500)
    }, 4000)
    return () => clearTimeout(t)
  }, [state])

  function initiate() {
    setState('requesting')
    // POST /api/nafath/initiate
    setTimeout(() => {
      setNumber(String(Math.floor(10 + Math.random() * 90)))
      setTimeLeft(120)
      setState('waiting')
    }, 1200)
  }

  function retry() {
    setState('intro')
    setNumber('')
  }

  return { state, number, timeLeft, initiate, retry }
}

export default function NafathScreen() {
  const navigate = useNavigate()
  const { state, number, timeLeft, initiate, retry } = useMockNafath()

  if (state === 'intro') return <IntroView onStart={initiate} onBack={() => navigate('/register/info')} />
  if (state === 'requesting') return <LoadingView />
  if (state === 'waiting') return <WaitingView number={number} timeLeft={timeLeft} onCancel={retry} />
  if (state === 'verifying') return <VerifyingView />
  if (state === 'success') return <SuccessView />
  return <FailedView onRetry={retry} />
}

// ─── Intro ──────────────────────────────────────────────────

function IntroView({ onStart, onBack }: { onStart: () => void; onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
      <ProgressBar current={4} />

      <button
        onClick={onBack}
        style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#6B7280', cursor: 'pointer', marginBottom: 24, background: 'none', border: 'none', padding: 0 }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Icon */}
      <div style={{
        width: 56, height: 56, borderRadius: 16,
        background: 'linear-gradient(135deg, #0D9488, #0D82F9)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24,
      }}>
        <Fingerprint size={28} color="#fff" />
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 6 }}>
        Verify your identity
      </h2>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 24, lineHeight: 1.6 }}>
        We use <strong style={{ color: '#111' }}>Nafath</strong> to securely verify your identity. Open the app and select the matching number.
      </p>

      {/* Info badges */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, padding: '10px 12px', background: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0' }}>
          <Smartphone size={15} color="#6B7280" />
          <span style={{ fontSize: 12, color: '#6B7280' }}>Nafath app required</span>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, padding: '10px 12px', background: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0' }}>
          <Clock size={15} color="#6B7280" />
          <span style={{ fontSize: 12, color: '#6B7280' }}>Takes ~2 minutes</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        style={{
          width: '100%', height: 48,
          background: 'linear-gradient(135deg, #000D1F, #002E83, #0052B9)',
          color: '#fff', fontWeight: 600, fontSize: 15, borderRadius: 12, border: 'none',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
        }}
      >
        Start Verification <ArrowRight size={18} />
      </motion.button>

      <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: '#94A3B8' }}>
        Don't have Nafath?{' '}
        <a href="https://nafath.sa" target="_blank" rel="noreferrer" style={{ color: '#0D82F9', textDecoration: 'none', fontWeight: 500 }}>
          Download the app →
        </a>
      </p>
    </motion.div>
  )
}

// ─── Waiting ────────────────────────────────────────────────

function WaitingView({ number, timeLeft, onCancel }: { number: string; timeLeft: number; onCancel: () => void }) {
  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const isLow = timeLeft < 30

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <ProgressBar current={4} />

      <div style={{ textAlign: 'center' }}>
        {/* Pulsing icon */}
        <div style={{ position: 'relative', width: 88, height: 88, margin: '0 auto 28px' }}>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{
              width: 88, height: 88, borderRadius: 22,
              background: 'linear-gradient(135deg, #0D9488, #0D82F9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Smartphone size={36} color="#fff" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.35], opacity: [0.35, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            style={{ position: 'absolute', inset: -8, borderRadius: 28, border: '3px solid #0D82F9' }}
          />
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 6 }}>Open Nafath App</h2>
        <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 24 }}>Select the number below in your Nafath app</p>

        {/* Number display */}
        <div style={{
          background: 'linear-gradient(135deg, #002E83, #0D82F9)', borderRadius: 16,
          padding: '20px 40px', display: 'inline-block', marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 6 }}>
            <NafathLogo size={14} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Select this number</span>
          </div>
          <div style={{ fontSize: 48, fontWeight: 800, color: '#fff', letterSpacing: 8, lineHeight: 1 }}>{number}</div>
        </div>

        {/* Timer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 20, fontSize: 13, color: isLow ? '#F59E0B' : '#6B7280' }}>
          <Clock size={15} />
          <span>Time remaining: <strong>{mins}:{String(secs).padStart(2, '0')}</strong></span>
        </div>

        {/* Waiting dots */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 24 }}>
          {[0, 150, 300].map((d) => (
            <motion.div
              key={d}
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: d / 1000 }}
              style={{ width: 5, height: 5, borderRadius: '50%', background: '#0D82F9' }}
            />
          ))}
          <span style={{ fontSize: 12, color: '#94A3B8', marginLeft: 6 }}>Waiting for confirmation...</span>
        </div>

        {/* Cancel */}
        <button
          onClick={onCancel}
          style={{
            width: '100%', height: 44, background: '#fff', border: '1.5px solid #E2E8F0',
            borderRadius: 12, fontSize: 14, fontWeight: 500, color: '#6B7280', cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </motion.div>
  )
}

// ─── Loading States ─────────────────────────────────────────

function LoadingView() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 0' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        style={{ width: 40, height: 40, borderRadius: '50%', margin: '0 auto 20px', border: '4px solid #E2E8F0', borderTopColor: '#0D82F9' }}
      />
      <p style={{ fontSize: 14, color: '#6B7280' }}>Preparing verification...</p>
    </div>
  )
}

function VerifyingView() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 0' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        style={{ width: 40, height: 40, borderRadius: '50%', margin: '0 auto 20px', border: '4px solid #E2E8F0', borderTopColor: '#22C55E' }}
      />
      <p style={{ fontSize: 14, color: '#6B7280' }}>Verifying your identity...</p>
    </div>
  )
}

// ─── Success ────────────────────────────────────────────────

function SuccessView() {
  const navigate = useNavigate()

  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
      <div style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg, #22C55E, #16A34A)',
            boxShadow: '0 8px 24px rgba(34,197,94,0.3)',
            margin: '0 auto 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <CheckCircle2 size={36} color="#fff" />
        </motion.div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 6 }}>Welcome to FundMe!</h2>
        <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 24, lineHeight: 1.6 }}>
          Your identity is verified. Your account is ready.
        </p>

        {/* Verified info card */}
        <div style={{ background: '#F8FAFC', borderRadius: 14, padding: 20, marginBottom: 20, textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: '#111', display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle2 size={15} color="#22C55E" />
              Verified Information
            </h3>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px',
              background: '#DCFCE7', color: '#166534', borderRadius: 20, fontSize: 11, fontWeight: 600,
            }}>
              <CheckCircle2 size={11} /> Verified
            </span>
          </div>
          {[
            ['Full Name', 'Mohammed Al-Rashidi'],
            ['National ID', '1*** *** **89'],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
              <span style={{ color: '#94A3B8' }}>{label}</span>
              <span style={{ fontWeight: 500, color: '#111' }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Next step info */}
        <div style={{ background: '#EFF6FF', borderRadius: 12, padding: 14, marginBottom: 24, textAlign: 'left' }}>
          <p style={{ fontSize: 13, color: '#1E40AF', lineHeight: 1.5 }}>
            <strong>Next up:</strong> Complete your business profile to unlock financing and get funded within 24 hours.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/')}
          style={{
            width: '100%', height: 48,
            background: 'linear-gradient(135deg, #000D1F, #002E83, #0052B9)',
            color: '#fff', fontWeight: 600, fontSize: 15, borderRadius: 12, border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
          }}
        >
          Go to Dashboard <ArrowRight size={18} />
        </motion.button>
      </div>
    </motion.div>
  )
}

// ─── Failed/Expired ─────────────────────────────────────────

function FailedView({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', background: '#FEE2E2',
          margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <AlertTriangle size={36} color="#EF4444" />
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 6 }}>Verification expired</h2>
        <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 28, lineHeight: 1.6 }}>
          The request timed out. Make sure Nafath is installed and try again.
        </p>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRetry}
          style={{
            width: '100%', height: 48, marginBottom: 12,
            background: 'linear-gradient(135deg, #000D1F, #002E83, #0052B9)',
            color: '#fff', fontWeight: 600, fontSize: 15, borderRadius: 12, border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
          }}
        >
          <RefreshCw size={16} /> Try Again
        </motion.button>

        <p style={{ fontSize: 12, color: '#94A3B8' }}>
          Need help? <span style={{ color: '#0D82F9', cursor: 'pointer', fontWeight: 500 }}>Contact Support</span>
        </p>
      </div>
    </motion.div>
  )
}
