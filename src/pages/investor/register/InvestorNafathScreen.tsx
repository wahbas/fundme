import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, AlertTriangle, RefreshCw, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInvestorTheme } from '../../../components/investor/InvestorThemeContext'
import { useInvestorRegister } from './InvestorRegisterContext'
import InvestorButton from '../../../components/investor/register/InvestorButton'
import InvestorProgressStepper from '../../../components/investor/register/InvestorProgressStepper'

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

export default function InvestorNafathScreen() {
  const { state, number, timeLeft, initiate, retry } = useMockNafath()
  const { setCurrentStep } = useInvestorRegister()
  const autoStarted = useRef(false)
  const navigate = useNavigate()

  useEffect(() => { setCurrentStep(5) }, [])

  useEffect(() => {
    if (state === 'intro' && !autoStarted.current) {
      autoStarted.current = true
      initiate()
    }
  }, [state, initiate])

  useEffect(() => {
    if (state === 'success') {
      localStorage.setItem('fundme-investor-nafath-verified', 'true')
      const timer = setTimeout(() => navigate('/investor/onboarding'), 1500)
      return () => clearTimeout(timer)
    }
  }, [state, navigate])

  if (state === 'intro' || state === 'requesting') return <LoadingView />
  if (state === 'waiting') return <WaitingView number={number} timeLeft={timeLeft} onCancel={retry} />
  if (state === 'verifying') return <VerifyingView />
  if (state === 'success') return <SuccessView />
  return <FailedView onRetry={() => { autoStarted.current = false; retry() }} />
}

function LoadingView() {
  const { theme } = useInvestorTheme()
  return (
    <div>
      <InvestorProgressStepper currentStep={5} />
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          style={{ width: 40, height: 40, borderRadius: '50%', margin: '0 auto 20px', border: '4px solid rgba(255,255,255,0.1)', borderTopColor: theme.blue }}
        />
        <p style={{ fontSize: 14, color: theme.textSecondary }}>Preparing verification...</p>
      </div>
    </div>
  )
}

function WaitingView({ number, timeLeft, onCancel }: { number: string; timeLeft: number; onCancel: () => void }) {
  const { theme, isDark } = useInvestorTheme()
  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const isLow = timeLeft < 30

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <InvestorProgressStepper currentStep={5} />

      <div style={{ textAlign: 'center' }}>
        {/* Pulsing shield */}
        <div style={{ position: 'relative', width: 72, height: 72, margin: '0 auto 28px' }}>
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            style={{
              width: 72, height: 72, borderRadius: '50%',
              background: isDark ? 'rgba(13,130,249,0.15)' : '#EFF6FF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${isDark ? 'rgba(13,130,249,0.3)' : '#BFDBFE'}`,
            }}
          >
            <ShieldCheck size={32} color={theme.blue} />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: `2px solid ${theme.blue}` }}
          />
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textHeading, marginBottom: 6 }}>
          Open Nafath App
        </h2>
        <p style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 24 }}>
          Select the number below in your Nafath app
        </p>

        {/* Number display */}
        <div style={{
          background: 'linear-gradient(135deg, #002E83, #0D82F9)', borderRadius: 16,
          padding: '20px 40px', display: 'inline-block', marginBottom: 20,
        }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 500, marginBottom: 6 }}>
            Select this number
          </div>
          <div style={{ fontSize: 48, fontWeight: 800, color: '#fff', letterSpacing: 8, lineHeight: 1 }}>
            {number}
          </div>
        </div>

        {/* Timer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 20, fontSize: 13, color: isLow ? '#F59E0B' : theme.textSecondary }}>
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
              style={{ width: 5, height: 5, borderRadius: '50%', background: theme.blue }}
            />
          ))}
          <span style={{ fontSize: 12, color: theme.textTertiary, marginLeft: 6 }}>Waiting for confirmation...</span>
        </div>

        <InvestorButton variant="secondary" onClick={onCancel}>
          Cancel
        </InvestorButton>
      </div>
    </motion.div>
  )
}

function VerifyingView() {
  const { theme } = useInvestorTheme()
  return (
    <div>
      <InvestorProgressStepper currentStep={5} />
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          style={{ width: 40, height: 40, borderRadius: '50%', margin: '0 auto 20px', border: '4px solid rgba(255,255,255,0.1)', borderTopColor: '#22C55E' }}
        />
        <p style={{ fontSize: 14, color: theme.textSecondary }}>Verifying your identity...</p>
      </div>
    </div>
  )
}

function SuccessView() {
  const { theme, isDark } = useInvestorTheme()
  return (
    <div>
      <InvestorProgressStepper currentStep={5} />
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          style={{
            width: 72, height: 72, borderRadius: '50%',
            background: isDark ? 'rgba(34,197,94,0.15)' : '#DCFCE7',
            margin: '0 auto 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <CheckCircle2 size={36} color="#22C55E" />
        </motion.div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textHeading, marginBottom: 6 }}>
          Verification Complete
        </h2>
        <p style={{ fontSize: 14, color: theme.textSecondary }}>Redirecting to your dashboard...</p>
      </div>
    </div>
  )
}

function FailedView({ onRetry }: { onRetry: () => void }) {
  const { theme, isDark } = useInvestorTheme()
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <InvestorProgressStepper currentStep={5} />
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: isDark ? 'rgba(239,68,68,0.15)' : '#FEE2E2',
          margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <AlertTriangle size={36} color="#EF4444" />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textHeading, marginBottom: 6 }}>
          Verification expired
        </h2>
        <p style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 28, lineHeight: 1.6 }}>
          The request timed out. Make sure Nafath is installed and try again.
        </p>
        <InvestorButton onClick={onRetry} icon={<RefreshCw size={16} />}>
          Try Again
        </InvestorButton>
        <p style={{ fontSize: 12, color: theme.textTertiary, marginTop: 16 }}>
          Need help? <span style={{ color: theme.blue, cursor: 'pointer', fontWeight: 500 }}>Contact Support</span>
        </p>
      </div>
    </motion.div>
  )
}
