import { Bell, FileSearch, ShieldCheck, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

// ─── Illustration: Person with magnifying glass reviewing docs ─

function ReviewIllustration() {
  return (
    <svg width="220" height="180" viewBox="0 0 220 180" fill="none">
      {/* Desk / surface */}
      <ellipse cx="110" cy="165" rx="90" ry="10" fill="#E5E7EB" opacity="0.5" />

      {/* Person body */}
      <path d="M70 160 L70 115 C70 108 76 102 83 102 L97 102 C104 102 110 108 110 115 L110 160" fill="#002E83" />
      {/* Collar */}
      <path d="M80 102 L90 112 L100 102" fill="#0052B9" />
      {/* Head */}
      <circle cx="90" cy="85" r="20" fill="#F5D0A9" />
      {/* Hair */}
      <path d="M70 80 C70 65 80 58 90 58 C100 58 110 65 110 80 C110 74 105 68 90 68 C75 68 70 74 70 80" fill="#1C1C1C" />
      {/* Eyes */}
      <circle cx="83" cy="84" r="2" fill="#1C1C1C" />
      <circle cx="97" cy="84" r="2" fill="#1C1C1C" />
      {/* Smile */}
      <path d="M85 92 C87 95 93 95 95 92" stroke="#C4956A" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Left arm holding coffee */}
      <path d="M70 115 L55 130 L58 132" stroke="#002E83" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="48" y="126" width="14" height="16" rx="3" fill="#F59E0B" />
      <rect x="50" y="128" width="10" height="4" rx="1" fill="#D97706" />
      {/* Steam */}
      <motion.path
        animate={{ y: [0, -3, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 2 }}
        d="M53 124 C53 120 57 120 55 116" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" fill="none"
      />

      {/* Right arm resting */}
      <path d="M110 115 L120 128" stroke="#002E83" strokeWidth="6" strokeLinecap="round" />

      {/* Document on desk */}
      <g>
        <rect x="125" y="120" width="48" height="38" rx="4" fill="white" stroke="#E5E5E5" strokeWidth="1.5" />
        <rect x="133" y="128" width="24" height="3" rx="1.5" fill="#0D82F9" />
        <rect x="133" y="135" width="32" height="2" rx="1" fill="#E5E7EB" />
        <rect x="133" y="141" width="28" height="2" rx="1" fill="#E5E7EB" />
        <rect x="133" y="147" width="18" height="2" rx="1" fill="#E5E7EB" />
      </g>

      {/* Magnifying glass over document */}
      <motion.g
        animate={{ rotate: [-3, 3, -3], x: [0, 2, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      >
        <circle cx="155" cy="130" r="16" fill="white" fillOpacity="0.5" stroke="#0D82F9" strokeWidth="3" />
        <line x1="166" y1="141" x2="176" y2="151" stroke="#0D82F9" strokeWidth="4" strokeLinecap="round" />
        {/* Sparkle in lens */}
        <circle cx="150" cy="126" r="2" fill="#0D82F9" opacity="0.5" />
      </motion.g>

      {/* Floating checkmark */}
      <motion.g
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      >
        <circle cx="185" cy="95" r="12" fill="#22C55E" />
        <path d="M180 95 L183 98 L190 91" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>

      {/* Floating clock */}
      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
      >
        <circle cx="40" cy="60" r="10" fill="#EFF6FF" stroke="#0D82F9" strokeWidth="1.5" />
        <path d="M40 55 L40 60 L44 62" stroke="#0D82F9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>

      {/* Small sparkles */}
      <motion.circle
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
        cx="195" cy="75" r="3" fill="#F59E0B"
      />
      <motion.circle
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2.5, delay: 0.7 }}
        cx="30" cy="95" r="2" fill="#0D82F9"
      />
    </svg>
  )
}

// ─── Review Steps ───────────────────────────────────────────

const STEPS = [
  { label: 'Document Review', icon: FileSearch },
  { label: 'Credit Assessment', icon: ShieldCheck },
  { label: 'Account Activation', icon: Sparkles },
]

// ─── Component ──────────────────────────────────────────────

export default function ReviewStatusBanner() {
  return (
    <section style={{ marginBottom: 20 }}>
      <div style={{
        borderRadius: 20, padding: '36px 40px 32px',
        background: 'linear-gradient(160deg, #F8FAFF 0%, #EEF4FF 50%, #F9FAFB 100%)',
        border: '1px solid #E8EDFB',
      }}>
        {/* ── Top: Welcome + illustration ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div style={{ flex: 1, maxWidth: 420 }}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827' }}>Welcome back, Ahmed!</h2>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '4px 10px', background: '#FEF3C7', color: '#92400E',
                  borderRadius: 20, fontSize: 11, fontWeight: 600,
                }}>
                  Under Review
                </span>
              </div>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7 }}>
                Our team is reviewing your application.{' '}
                We'll notify you within <strong style={{ color: '#374151' }}>1-2 business days</strong>.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            style={{ flexShrink: 0 }}
          >
            <ReviewIllustration />
          </motion.div>
        </div>

        {/* ── Stepper ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            display: 'flex', alignItems: 'center',
            background: '#fff', borderRadius: 14, padding: '16px 24px',
            border: '1px solid #F0F0F0',
          }}
        >
          {STEPS.map((step, i) => {
            const isActive = i === 0
            const isPending = i > 0
            const Icon = step.icon
            return (
              <div key={step.label} style={{ display: 'contents' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    background: isActive ? '#002E83' : '#F3F4F6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {isActive ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <Icon size={15} color="#fff" />
                      </motion.div>
                    ) : (
                      <Icon size={15} color="#9CA3AF" />
                    )}
                  </div>
                  <span style={{
                    fontSize: 13, fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#111827' : '#9CA3AF',
                    whiteSpace: 'nowrap',
                  }}>
                    {step.label}
                  </span>
                </div>

                {/* Connector */}
                {i < STEPS.length - 1 && (
                  <div style={{
                    flex: 1, height: 2, margin: '0 16px', borderRadius: 1,
                    background: isPending ? '#E5E7EB' : '#002E83',
                    minWidth: 24,
                  }} />
                )}
              </div>
            )
          })}
        </motion.div>

        {/* ── Notification note ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            marginTop: 16,
          }}
        >
          <Bell size={13} color="#9CA3AF" />
          <span style={{ fontSize: 12, color: '#9CA3AF' }}>
            We'll notify you via email and SMS when your account is ready
          </span>
        </motion.div>
      </div>
    </section>
  )
}
