import { ArrowRight, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SparkleDecoration } from '../illustrations'

// ─── Rocket Illustration ──────────────────────────────────────

function RocketIllustration() {
  return (
    <svg width="240" height="200" viewBox="0 0 280 240" fill="none">
      <circle cx="140" cy="120" r="90" fill="white" fillOpacity="0.06" />

      {/* Coins */}
      <g>
        <ellipse cx="55" cy="80" rx="22" ry="7" fill="#D97706" />
        <ellipse cx="55" cy="76" rx="22" ry="7" fill="#FBBF24" />
        <text x="55" y="80" textAnchor="middle" fontSize="12" fill="#92400E" fontWeight="bold">$</text>
      </g>
      <g>
        <ellipse cx="215" cy="155" rx="18" ry="6" fill="#D97706" />
        <ellipse cx="215" cy="152" rx="18" ry="6" fill="#FBBF24" />
        <text x="215" y="155" textAnchor="middle" fontSize="10" fill="#92400E" fontWeight="bold">$</text>
      </g>
      <g>
        <ellipse cx="80" cy="175" rx="15" ry="5" fill="#D97706" />
        <ellipse cx="80" cy="172" rx="15" ry="5" fill="#FBBF24" />
        <text x="80" y="175" textAnchor="middle" fontSize="9" fill="#92400E" fontWeight="bold">$</text>
      </g>

      {/* Rocket */}
      <g transform="translate(100, 35) rotate(15)">
        <path d="M40 120 L40 50 C40 20 60 0 80 0 C100 0 120 20 120 50 L120 120 Z" fill="url(#rGrad)" />
        <circle cx="80" cy="50" r="16" fill="#0a1628" />
        <circle cx="80" cy="50" r="12" fill="#1e3a5f" />
        <circle cx="76" cy="46" r="3" fill="white" fillOpacity="0.4" />
        <path d="M40 90 L18 125 L40 118 Z" fill="#001D5C" />
        <path d="M120 90 L142 125 L120 118 Z" fill="#001D5C" />
        <rect x="52" y="120" width="56" height="12" fill="#001340" rx="2" />
        <motion.g animate={{ scaleY: [1, 1.15, 1], opacity: [0.85, 1, 0.85] }} transition={{ repeat: Infinity, duration: 0.3 }}>
          <path d="M58 132 L80 175 L102 132 Z" fill="url(#fGrad1)" />
          <path d="M64 132 L80 162 L96 132 Z" fill="url(#fGrad2)" />
          <path d="M72 132 L80 148 L88 132 Z" fill="#FBBF24" />
        </motion.g>
      </g>

      {/* Sparkles */}
      <motion.path
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 2 }}
        d="M200 55 L203 63 L211 66 L203 69 L200 77 L197 69 L189 66 L197 63 Z"
        fill="#80FF00"
      />
      <motion.path
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
        d="M238 105 L240 110 L245 112 L240 114 L238 119 L236 114 L231 112 L236 110 Z"
        fill="white"
      />

      <defs>
        <linearGradient id="rGrad" x1="40" y1="0" x2="120" y2="120">
          <stop offset="0%" stopColor="#0D82F9" />
          <stop offset="100%" stopColor="#002E83" />
        </linearGradient>
        <linearGradient id="fGrad1" x1="80" y1="132" x2="80" y2="175">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fGrad2" x1="80" y1="132" x2="80" y2="162">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// ─── Sparkle Dots ─────────────────────────────────────────────

function SparkleBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Large sparkle top right */}
      <div style={{ position: 'absolute', right: 60, top: -10, opacity: 0.12 }}>
        <SparkleDecoration />
      </div>
      {/* Small dots */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{ position: 'absolute', top: 28, right: '35%', width: 4, height: 4, background: '#fff', borderRadius: '50%' }}
      />
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
        style={{ position: 'absolute', bottom: 30, left: '20%', width: 3, height: 3, background: '#80FF00', borderRadius: '50%' }}
      />
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ repeat: Infinity, duration: 3, delay: 1 }}
        style={{ position: 'absolute', top: '45%', right: '22%', width: 3, height: 3, background: '#fff', borderRadius: '50%' }}
      />
    </div>
  )
}

// ─── Benefits ─────────────────────────────────────────────────

const benefits = [
  'Fast approval within 24–48 hours',
  'Competitive rates starting at 5%',
  'Flexible repayment terms',
]

// ─── Main Component ───────────────────────────────────────────

export default function FinancingPotential({ verified = false }: { verified?: boolean }) {
  const navigate = useNavigate()

  return (
    <section style={{ marginBottom: 20 }}>
      <div
        style={{
          borderRadius: 20,
          padding: verified ? '36px 40px' : 32,
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #002E83 0%, #0052B9 50%, #0D82F9 100%)',
        }}
      >
        <SparkleBackground />

        {verified ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
            {/* Left: Text */}
            <div style={{ flex: 1, maxWidth: 480 }}>
              <motion.h2
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 10 }}
              >
                Ready to Get Funded?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: 22 }}
              >
                Apply for financing in minutes. Our team will review your application and provide a personalized offer.
              </motion.p>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}
              >
                {benefits.map((b) => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: '#80FF00',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Check size={12} color="#002E83" strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.88)' }}>{b}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/request-financing')}
                style={{
                  padding: '14px 32px',
                  background: '#80FF00',
                  color: '#002E83',
                  fontWeight: 700,
                  fontSize: 16,
                  borderRadius: 12,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                Request Financing
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <ArrowRight size={20} />
                </motion.span>
              </motion.button>
            </div>

            {/* Right: Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
              style={{ flexShrink: 0 }}
            >
              <RocketIllustration />
            </motion.div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
            <div style={{ flex: 1, maxWidth: 480 }}>
              <motion.p
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginBottom: 12 }}
              >
                Ready to apply for financing?
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 12 }}
              >
                Start Your Application
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 28 }}
              >
                Choose from Working Capital, Invoice, or SADAD financing options
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(verified ? '/request-financing' : '/onboarding')}
                style={{
                  padding: '14px 32px',
                  background: '#80FF00',
                  color: '#002E83',
                  fontWeight: 700,
                  fontSize: 16,
                  borderRadius: 12,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                + New Loan Request
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
              style={{ flexShrink: 0 }}
            >
              <RocketIllustration />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
