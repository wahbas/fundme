import { CheckCircle2, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { PaymentTerminalIllustration, TrophySuccessIllustration } from '../illustrations'
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

  return (
    <section
      style={{
        background: '#fff',
        borderRadius: 16,
        padding: '32px',
        marginBottom: 20,
        border: '1px solid #F0F0F0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 8 }}>
          Welcome to FundMe, Ahmed!
        </h2>
        <p style={{ fontSize: 14, color: '#777', marginBottom: 20 }}>
          Let's get you funded. Complete these quick steps to unlock financing.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: '#777' }}>Setup Progress: 1 of 5 complete</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>20%</span>
        </div>
        <div style={{ width: 260, height: 6, background: '#E5E7EB', borderRadius: 3 }}>
          <div style={{ width: '20%', height: '100%', background: 'linear-gradient(90deg, #002E83, #0D82F9)', borderRadius: 3 }} />
        </div>
      </div>
      <div style={{ position: 'absolute', right: 24, top: 16 }}>
        <PaymentTerminalIllustration />
      </div>
    </section>
  )
}
