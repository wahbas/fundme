import { useState, useEffect } from 'react'
import { ShieldCheck, Smartphone, Clock, CheckCircle2, XCircle, RefreshCw, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { IdentityVerificationData } from '../types'
import { NafathLogo } from '../logos'

type NafathState = 'intro' | 'requesting' | 'waiting' | 'verifying' | 'success' | 'failed' | 'expired'

interface Props {
  data?: IdentityVerificationData
  onComplete: (data: IdentityVerificationData) => void
}

// ─── Mock: simulate Nafath flow ──────────────────────────────

function useMockNafath() {
  const [state, setState] = useState<NafathState>('intro')
  const [nafathNumber, setNafathNumber] = useState<string>('')
  const [timeRemaining, setTimeRemaining] = useState(120)

  useEffect(() => {
    if (state !== 'waiting') return
    const timer = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) { setState('expired'); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [state])

  // Auto-succeed after 4s of waiting (mock)
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
    setTimeout(() => {
      setNafathNumber(String(Math.floor(10 + Math.random() * 90)))
      setTimeRemaining(120)
      setState('waiting')
    }, 1200)
  }

  function retry() {
    setState('intro')
    setNafathNumber('')
  }

  return { state, nafathNumber, timeRemaining, initiate, retry }
}

// ─── Nafath Illustration ─────────────────────────────────────

function NafathIllustration() {
  return (
    <svg width="180" height="140" viewBox="0 0 200 160" fill="none">
      <rect x="60" y="20" width="80" height="120" rx="12" fill="url(#nPhoneGrad)" />
      <rect x="68" y="32" width="64" height="96" rx="4" fill="#1a365d" />
      <path d="M100 50 L130 60 L130 85 C130 100 117 112 100 118 C83 112 70 100 70 85 L70 60 Z" fill="url(#nShieldGrad)" />
      <path d="M100 58 L122 66 L122 85 C122 95 112 105 100 110 C88 105 78 95 78 85 L78 66 Z" fill="white" opacity="0.15" />
      <path d="M88 82 L96 90 L112 74" stroke="#80FF00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <motion.circle animate={{ r: [20, 24, 20], opacity: [0.3, 0.1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }} cx="160" cy="60" r="20" stroke="#0D82F9" strokeWidth="2" fill="none" />
      <motion.circle animate={{ r: [30, 36, 30], opacity: [0.2, 0.05, 0.2] }} transition={{ repeat: Infinity, duration: 2, delay: 0.3 }} cx="160" cy="60" r="30" stroke="#0D82F9" strokeWidth="2" fill="none" />
      <circle cx="160" cy="60" r="12" fill="#0D82F9" />
      <path d="M155 60 C155 55 158 52 163 52 M157 64 C157 58 160 55 165 55 M159 68 C159 62 161 60 164 58" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="40" cy="50" r="4" fill="#80FF00" />
      <circle cx="35" cy="90" r="3" fill="#0D82F9" />
      <circle cx="170" cy="110" r="5" fill="#FBBF24" />
      <defs>
        <linearGradient id="nPhoneGrad" x1="60" y1="20" x2="140" y2="140">
          <stop offset="0%" stopColor="#0D82F9" />
          <stop offset="100%" stopColor="#002E83" />
        </linearGradient>
        <linearGradient id="nShieldGrad" x1="70" y1="50" x2="130" y2="118">
          <stop offset="0%" stopColor="#002E83" />
          <stop offset="100%" stopColor="#0052B9" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// ─── Screens ─────────────────────────────────────────────────

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ textAlign: 'center', padding: '16px 0' }}>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
        <NafathIllustration />
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Verify Your Identity</h2>

      {/* Powered by Nafath badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: '#F0FDF4', borderRadius: 20, marginBottom: 20 }}>
        <NafathLogo size={22} />
        <span style={{ fontSize: 12, fontWeight: 600, color: '#047857' }}>Powered by Nafath</span>
      </div>

      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 28, maxWidth: 360, margin: '0 auto 28px' }}>
        We use Nafath, Saudi Arabia's national digital identity service, to securely verify your identity.
      </p>

      <div style={{ background: '#F9FAFB', borderRadius: 16, padding: 24, marginBottom: 28, textAlign: 'left' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 16 }}>How it works:</h3>
        {[
          'Click "Start Verification" below',
          'Open the Nafath app on your phone',
          'Select the matching number shown on screen',
          'Confirm with your biometrics',
        ].map((text, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: i < 3 ? 14 : 0 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#0D82F9', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
              {i + 1}
            </div>
            <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5, paddingTop: 2 }}>{text}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 28, fontSize: 13, color: '#9CA3AF' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Smartphone size={16} /> Nafath app required</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Clock size={16} /> Takes ~2 minutes</span>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        style={{
          width: '100%', padding: '14px 0', background: '#002E83', color: '#fff', fontWeight: 600,
          fontSize: 15, borderRadius: 12, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
      >
        <ShieldCheck size={20} />
        Start Verification
      </motion.button>

      <p style={{ marginTop: 16, fontSize: 12, color: '#9CA3AF' }}>
        Don't have Nafath?{' '}
        <a href="https://nafath.sa" target="_blank" rel="noreferrer" style={{ color: '#0D82F9', textDecoration: 'none' }}>Download the app</a>
      </p>
    </div>
  )
}

function WaitingScreen({ nafathNumber, timeRemaining, onCancel }: { nafathNumber: string; timeRemaining: number; onCancel: () => void }) {
  const mins = Math.floor(timeRemaining / 60)
  const secs = timeRemaining % 60

  return (
    <div style={{ textAlign: 'center', padding: '32px 0' }}>
      <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 32px' }}>
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            width: 120, height: 120, borderRadius: 28,
            background: 'linear-gradient(135deg, #0D82F9, #6366F1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Smartphone size={48} color="#fff" />
        </motion.div>
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 6 }}>Open Nafath App</h2>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 28 }}>Select the number below in your Nafath app</p>

      <div style={{
        background: 'linear-gradient(135deg, #002E83, #0D82F9)', borderRadius: 16,
        padding: '28px 40px', display: 'inline-block', marginBottom: 24, position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 10 }}>
          <NafathLogo size={18} />
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Select this number in Nafath</p>
        </div>
        <div style={{ fontSize: 56, fontWeight: 800, color: '#fff', letterSpacing: 8 }}>{nafathNumber}</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24, fontSize: 14, color: '#6B7280' }}>
        <Clock size={16} />
        <span>Time remaining: <strong>{mins}:{String(secs).padStart(2, '0')}</strong></span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 24 }}>
        {[0, 150, 300].map((d) => (
          <motion.div
            key={d}
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: d / 1000 }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#0D82F9' }}
          />
        ))}
        <span style={{ fontSize: 13, color: '#9CA3AF', marginLeft: 4 }}>Waiting for confirmation...</span>
      </div>

      <button onClick={onCancel} style={{ fontSize: 13, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}>
        Cancel verification
      </button>
    </div>
  )
}

function LoadingScreen({ message }: { message: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '64px 0' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        style={{
          width: 48, height: 48, borderRadius: '50%', margin: '0 auto 24px',
          border: '4px solid #E5E7EB', borderTopColor: '#0D82F9',
        }}
      />
      <p style={{ fontSize: 14, color: '#6B7280' }}>{message}</p>
    </div>
  )
}

function SuccessScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div style={{ textAlign: 'center', padding: '24px 0' }}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          width: 80, height: 80, borderRadius: '50%', background: '#80FF00', margin: '0 auto 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <CheckCircle2 size={40} color="#002E83" />
      </motion.div>

      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 6 }}>Identity Verified!</h2>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 28 }}>Your identity has been successfully verified via Nafath</p>

      <div style={{ background: '#F9FAFB', borderRadius: 16, padding: 24, marginBottom: 24, textAlign: 'left' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircle2 size={16} color="#22C55E" />
          Verified Information
        </h3>
        {[
          ['Full Name (EN)', 'Ahmed Al-Mansour'],
          ['Full Name (AR)', 'أحمد المنصور'],
          ['National ID', '1088****42'],
          ['Date of Birth', '15/03/1990'],
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 13 }}>
            <span style={{ color: '#9CA3AF' }}>{label}</span>
            <span style={{ fontWeight: 500, color: '#111827' }}>{value}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 28 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px',
          background: '#D1FAE5', color: '#047857', borderRadius: 20, fontSize: 12, fontWeight: 600,
        }}>
          <CheckCircle2 size={14} />
          Compliance Check Passed
        </span>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onContinue}
        style={{
          width: '100%', padding: '14px 0', background: '#80FF00', color: '#002E83', fontWeight: 700,
          fontSize: 15, borderRadius: 12, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
      >
        Continue to Business Verification
        <ArrowRight size={18} />
      </motion.button>
    </div>
  )
}

function FailedScreen({ error, onRetry, onCancel }: { error?: string; onRetry: () => void; onCancel: () => void }) {
  return (
    <div style={{ textAlign: 'center', padding: '32px 0' }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#FEE2E2', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <XCircle size={40} color="#EF4444" />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 6 }}>Verification Failed</h2>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 24 }}>{error || "We couldn't verify your identity. Please try again."}</p>

      <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: 16, marginBottom: 28, textAlign: 'left' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#92400E', marginBottom: 8 }}>Common issues:</p>
        {['Make sure you selected the correct number', 'Ensure your Nafath app is up to date', 'Check that biometrics are properly enrolled'].map((t) => (
          <p key={t} style={{ fontSize: 12, color: '#A16207', marginBottom: 4 }}>• {t}</p>
        ))}
      </div>

      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onRetry}
        style={{ width: '100%', padding: '14px 0', background: '#002E83', color: '#fff', fontWeight: 600, fontSize: 15, borderRadius: 12, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
        <RefreshCw size={18} /> Try Again
      </motion.button>
      <button onClick={onCancel} style={{ fontSize: 13, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}>Cancel and return later</button>
    </div>
  )
}

function ExpiredScreen({ onRetry, onCancel }: { onRetry: () => void; onCancel: () => void }) {
  return (
    <div style={{ textAlign: 'center', padding: '32px 0' }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#FFF7ED', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Clock size={40} color="#F97316" />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 6 }}>Request Expired</h2>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 28 }}>The verification request timed out. Don't worry, you can start again.</p>

      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onRetry}
        style={{ width: '100%', padding: '14px 0', background: '#002E83', color: '#fff', fontWeight: 600, fontSize: 15, borderRadius: 12, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
        <RefreshCw size={18} /> Start New Request
      </motion.button>
      <button onClick={onCancel} style={{ fontSize: 13, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}>I'll do this later</button>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────

export default function NafathVerification({ data, onComplete }: Props) {
  const { state, nafathNumber, timeRemaining, initiate, retry } = useMockNafath()

  function handleComplete() {
    const mockData: IdentityVerificationData = {
      nafathRequestId: 'NFT-' + Date.now(),
      nafathStatus: 'approved',
      nationalId: '1088765442',
      fullNameAr: 'أحمد المنصور',
      fullNameEn: 'Ahmed Al-Mansour',
      dateOfBirth: '15/03/1990',
      verifiedAt: new Date(),
      amlScreeningStatus: 'clear',
      amlScreeningId: 'AML-' + Date.now(),
    }
    onComplete(mockData)
  }

  if (data?.nafathStatus === 'approved') {
    return <SuccessScreen onContinue={handleComplete} />
  }

  switch (state) {
    case 'intro': return <IntroScreen onStart={initiate} />
    case 'requesting': return <LoadingScreen message="Preparing verification..." />
    case 'waiting': return <WaitingScreen nafathNumber={nafathNumber} timeRemaining={timeRemaining} onCancel={retry} />
    case 'verifying': return <LoadingScreen message="Verifying your identity..." />
    case 'success': return <SuccessScreen onContinue={handleComplete} />
    case 'failed': return <FailedScreen onRetry={retry} onCancel={retry} />
    case 'expired': return <ExpiredScreen onRetry={retry} onCancel={retry} />
    default: return null
  }
}
