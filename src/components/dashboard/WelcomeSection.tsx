import { CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import type { UserState } from '../../App'

// Compact circular progress ring for first-time user
function ProgressRing({ percent }: { percent: number }) {
  const size = 56
  const strokeWidth = 5
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={strokeWidth} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#80FF00"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          fontWeight: 700,
          color: '#fff',
        }}
      >
        {percent}%
      </div>
    </div>
  )
}

// Small rocket illustration for the compact welcome card
function SmallRocketIllustration() {
  return (
    <svg width="80" height="80" viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="50" fill="rgba(255,255,255,0.06)" />
      <g transform="translate(30, 10) rotate(15)">
        <path d="M20 60 L20 25 C20 10 30 0 40 0 C50 0 60 10 60 25 L60 60 Z" fill="url(#srGrad)" />
        <circle cx="40" cy="25" r="8" fill="#0a1628" />
        <circle cx="40" cy="25" r="6" fill="#1e3a5f" />
        <circle cx="38" cy="23" r="1.5" fill="white" fillOpacity="0.4" />
        <path d="M20 45 L9 62 L20 59 Z" fill="#001D5C" />
        <path d="M60 45 L71 62 L60 59 Z" fill="#001D5C" />
        <rect x="26" y="60" width="28" height="6" fill="#001340" rx="1" />
        <motion.g animate={{ scaleY: [1, 1.15, 1], opacity: [0.85, 1, 0.85] }} transition={{ repeat: Infinity, duration: 0.3 }}>
          <path d="M29 66 L40 88 L51 66 Z" fill="url(#sfGrad1)" />
          <path d="M32 66 L40 81 L48 66 Z" fill="url(#sfGrad2)" />
          <path d="M36 66 L40 74 L44 66 Z" fill="#FBBF24" />
        </motion.g>
      </g>
      <motion.path
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 2 }}
        d="M95 20 L97 25 L102 27 L97 29 L95 34 L93 29 L88 27 L93 25 Z"
        fill="#80FF00"
      />
      <defs>
        <linearGradient id="srGrad" x1="20" y1="0" x2="60" y2="60">
          <stop offset="0%" stopColor="#0D82F9" />
          <stop offset="100%" stopColor="#002E83" />
        </linearGradient>
        <linearGradient id="sfGrad1" x1="40" y1="66" x2="40" y2="88">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sfGrad2" x1="40" y1="66" x2="40" y2="81">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Building scene illustration for verified welcome card
function VerifiedIllustration() {
  return (
    <svg width="160" height="110" viewBox="0 0 160 110" fill="none">
      {/* Background circle */}
      <circle cx="80" cy="55" r="48" fill="#F1F5F9" />
      {/* Main building */}
      <rect x="48" y="28" width="40" height="52" rx="3" fill="#002E83" />
      <rect x="48" y="28" width="40" height="5" rx="2.5" fill="#0052B9" />
      {/* Windows row 1 */}
      <rect x="54" y="38" width="8" height="7" rx="1.5" fill="#0D82F9" opacity="0.9" />
      <rect x="66" y="38" width="8" height="7" rx="1.5" fill="#0D82F9" opacity="0.7" />
      <rect x="78" y="38" width="4" height="7" rx="1" fill="#0D82F9" opacity="0.5" />
      {/* Windows row 2 */}
      <rect x="54" y="50" width="8" height="7" rx="1.5" fill="#0D82F9" opacity="0.7" />
      <rect x="66" y="50" width="8" height="7" rx="1.5" fill="#0D82F9" opacity="0.9" />
      <rect x="78" y="50" width="4" height="7" rx="1" fill="#0D82F9" opacity="0.6" />
      {/* Door */}
      <rect x="62" y="66" width="12" height="14" rx="2" fill="#F59E0B" />
      {/* Small building (right) */}
      <rect x="94" y="48" width="24" height="32" rx="2.5" fill="#0D9488" />
      <rect x="94" y="48" width="24" height="4" rx="2" fill="#0F766E" />
      <rect x="99" y="56" width="6" height="5" rx="1" fill="#fff" opacity="0.3" />
      <rect x="108" y="56" width="6" height="5" rx="1" fill="#fff" opacity="0.2" />
      {/* Tree (left) */}
      <rect x="32" y="62" width="3" height="18" rx="1.5" fill="#0D9488" opacity="0.6" />
      <circle cx="33.5" cy="58" r="7" fill="#0D9488" opacity="0.25" />
      <circle cx="33.5" cy="56" r="5" fill="#0D9488" opacity="0.35" />
      {/* Rising arrow */}
      <path d="M125 65 L125 38 L132 45" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M125 38 L118 45" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Ground line */}
      <rect x="22" y="80" width="116" height="2" rx="1" fill="#E2E8F0" />
      {/* Decorative dots */}
      <circle cx="140" cy="32" r="2" fill="#0D82F9" opacity="0.3" />
      <circle cx="22" cy="44" r="1.5" fill="#0D9488" opacity="0.3" />
    </svg>
  )
}

export default function WelcomeSection({ userState = 'first-time' }: { verified?: boolean; userState?: UserState }) {
  if (userState === 'verified') {
    return (
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 28px',
          background: 'linear-gradient(135deg, #FFFFFF 60%, rgba(13,130,249,0.03) 80%, rgba(34,197,94,0.03) 100%)',
          borderRadius: 20,
          marginBottom: 20,
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111' }}>Welcome back, Ahmed!</h1>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '3px 10px',
                background: '#DCFCE7',
                color: '#15803D',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              <CheckCircle2 size={14} />
              Verified
            </span>
          </div>
          <p style={{ fontSize: 14, color: '#666' }}>Your account is ready. Start a new financing application.</p>
        </div>
        <div style={{ flexShrink: 0 }}>
          <VerifiedIllustration />
        </div>
      </motion.section>
    )
  }

  // First-time user: compact welcome card with progress ring
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 28px',
        borderRadius: 16,
        marginBottom: 20,
        background: 'linear-gradient(135deg, #002E83 0%, #0052B9 50%, #0D82F9 100%)',
        maxHeight: 120,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Left: text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
          Welcome to FundMe, Ahmed!
        </h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
          Complete setup to unlock financing options
        </p>
      </div>

      {/* Center: progress ring */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 24, marginRight: 24 }}>
        <ProgressRing percent={20} />
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0 }}>1/5 Complete</p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: 0 }}>Setup Progress</p>
        </div>
      </div>

      {/* Right: small illustration */}
      <div style={{ flexShrink: 0, opacity: 0.9 }}>
        <SmallRocketIllustration />
      </div>
    </motion.section>
  )
}
