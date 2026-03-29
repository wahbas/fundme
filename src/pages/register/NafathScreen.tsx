import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Clock,
  AlertTriangle, RefreshCw, ShieldCheck,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { NafathLogo } from '../../components/onboarding/logos'
import ProgressBar from './components/ProgressBar'
import ContactSupportModal from '../../components/dashboard/ContactSupportModal'

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
  const { state, number, timeLeft, initiate, retry } = useMockNafath()
  const autoStarted = useRef(false)

  // Skip intro — auto-start verification
  useEffect(() => {
    if (state === 'intro' && !autoStarted.current) {
      autoStarted.current = true
      initiate()
    }
  }, [state, initiate])

  const navigate = useNavigate()

  useEffect(() => {
    if (state === 'success') {
      navigate('/dashboard')
    }
  }, [state, navigate])

  if (state === 'intro') return <LoadingView />
  if (state === 'requesting') return <LoadingView />
  if (state === 'waiting') return <WaitingView number={number} timeLeft={timeLeft} onCancel={retry} />
  if (state === 'verifying') return <VerifyingView />
  if (state === 'success') return <LoadingView />
  return <FailedView onRetry={retry} />
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
        <div style={{ position: 'relative', width: 72, height: 72, margin: '0 auto 28px' }}>
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            style={{
              width: 72, height: 72, borderRadius: '50%',
              background: '#EFF6FF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid #BFDBFE',
            }}
          >
            <ShieldCheck size={32} color="#2563EB" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: '2px solid #2563EB' }}
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

// ─── Failed/Expired ─────────────────────────────────────────

function FailedView({ onRetry }: { onRetry: () => void }) {
  const [supportOpen, setSupportOpen] = useState(false)
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
          Need help? <span onClick={() => setSupportOpen(true)} style={{ color: '#0D82F9', cursor: 'pointer', fontWeight: 500 }}>Contact Support</span>
          <ContactSupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />
        </p>
      </div>
    </motion.div>
  )
}
