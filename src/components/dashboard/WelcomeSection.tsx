import { CheckCircle2, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { TrophySuccessIllustration } from '../illustrations'
import type { UserState } from '../../App'

function UnderReviewIllustrationSmall() {
  return (
    <svg width="140" height="110" viewBox="0 0 280 180" fill="none">
      <circle cx="140" cy="90" r="70" fill="url(#wsBg)" opacity="0.1" />
      <g filter="url(#wsSh)">
        <rect x="95" y="35" width="90" height="110" rx="8" fill="white" />
        <rect x="95" y="35" width="90" height="110" rx="8" stroke="#E5E5E5" strokeWidth="1.5" />
        <rect x="120" y="28" width="40" height="14" rx="4" fill="#F59E0B" />
        <circle cx="140" cy="35" r="4" fill="white" />
      </g>
      <rect x="110" y="55" width="50" height="4" rx="2" fill="#F59E0B" />
      <rect x="110" y="65" width="60" height="3" rx="1.5" fill="#E5E5E5" />
      <rect x="110" y="74" width="55" height="3" rx="1.5" fill="#E5E5E5" />
      <rect x="110" y="95" width="12" height="12" rx="3" fill="#22C55E" />
      <path d="M113 101 L116 104 L120 98" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="127" y="98" width="40" height="3" rx="1.5" fill="#E5E5E5" />
      <rect x="110" y="112" width="12" height="12" rx="3" fill="#22C55E" />
      <path d="M113 118 L116 121 L120 115" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="127" y="115" width="35" height="3" rx="1.5" fill="#E5E5E5" />
      <g filter="url(#wsSh)">
        <circle cx="195" cy="75" r="28" fill="white" stroke="#F59E0B" strokeWidth="5" />
      </g>
      <circle cx="195" cy="75" r="14" fill="#FEF3C7" />
      <path d="M195 67 L195 75 L201 79" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="60" cy="55" r="12" fill="#22C55E" />
      <path d="M55 55 L58 58 L65 51" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="210" cy="140" r="4" fill="#F59E0B">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="222" cy="140" r="4" fill="#F59E0B">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="234" cy="140" r="4" fill="#F59E0B">
        <animate attributeName="opacity" values="0.6;0.3;1;0.6" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <defs>
        <linearGradient id="wsBg" x1="70" y1="20" x2="210" y2="160">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <filter id="wsSh" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1" />
        </filter>
      </defs>
    </svg>
  )
}

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

export default function WelcomeSection({ userState = 'first-time' }: { verified?: boolean; userState?: UserState }) {
  if (userState === 'verified') {
    return (
      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 24,
          background: '#F9FAFB',
          borderRadius: 16,
          marginBottom: 20,
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
        <div style={{ flexShrink: 0, transform: 'scale(0.65)', transformOrigin: 'center right' }}>
          <TrophySuccessIllustration />
        </div>
      </section>
    )
  }

  if (userState === 'under-review') {
    return (
      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 24,
          background: '#FFFBEB',
          borderRadius: 16,
          marginBottom: 20,
          border: '1px solid #FDE68A',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111' }}>Welcome back, Ahmed!</h1>
            <motion.span
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '3px 10px',
                background: '#FEF3C7',
                color: '#92400E',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              <Clock size={14} />
              Under Review
            </motion.span>
          </div>
          <p style={{ fontSize: 14, color: '#666' }}>
            Your application is being reviewed. We'll notify you once it's approved.
          </p>
        </div>
        <div style={{ flexShrink: 0 }}>
          <UnderReviewIllustrationSmall />
        </div>
      </section>
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
