import { motion } from 'framer-motion'

export default function ApplicationStatus() {
  return (
    <div style={heroStyle}>
      {/* Brand art — green circles, right side only */}
      <svg
        viewBox="0 0 600 500"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <circle cx="520" cy="-80" r="300" stroke="#7CFF01" strokeWidth="1.5" fill="none" />
        <circle cx="620" cy="520" r="320" stroke="#7CFF01" strokeWidth="1.5" fill="none" />
      </svg>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Badge */}
        <div style={badgeStyle}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5" fill="#10B981" />
            <path d="M4.5 7L6.5 9L9.5 5.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Application Submitted
        </div>

        {/* Title */}
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#FFFFFF', margin: '0 0 4px' }}>
          Your application is being reviewed
        </h2>

        {/* Subtitle */}
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', margin: '0 0 14px' }}>
          Our team is reviewing your information. This usually takes 1–2 business days.
        </p>

        {/* Vertical stepper */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
          {/* Step 1: Submitted */}
          <div style={stepRowStyle}>
            <div style={{ ...dotBase, background: '#10B981' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 6.5L5.5 9L9 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#6EE7B7' }}>Submitted</span>
          </div>

          {/* Solid line */}
          <div style={{ width: 2, height: 12, marginLeft: 12, background: '#10B981' }} />

          {/* Step 2: In Review */}
          <div style={stepRowStyle}>
            <div style={{ position: 'relative' }}>
              <motion.div
                animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}
              />
              <div style={{ ...dotBase, background: '#FFFFFF' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="3" stroke="#2563EB" strokeWidth="1.5" fill="none" />
                  <circle cx="6" cy="6" r="1.2" fill="#2563EB" />
                </svg>
              </div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#FFFFFF' }}>In Review</span>
          </div>

          {/* Dashed line */}
          <div style={{ width: 0, height: 12, marginLeft: 12, borderLeft: '2px dashed rgba(255,255,255,0.15)' }} />

          {/* Step 3: Decision */}
          <div style={stepRowStyle}>
            <div style={{ ...dotBase, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.2)' }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2.5 5L4.5 7L7.5 3.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)' }}>Decision</span>
          </div>
        </div>

        {/* Timestamp */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="3.5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
            <path d="M5 3V5L6.5 6" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
          Submitted March 10, 2026 at 3:45 PM
        </div>
      </div>
    </div>
  )
}

const heroStyle: React.CSSProperties = {
  background: '#0F2347',
  borderRadius: 14,
  overflow: 'hidden',
  position: 'relative',
  padding: '20px 22px 18px',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}

const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  background: 'rgba(16,185,129,0.15)',
  border: '1px solid rgba(16,185,129,0.3)',
  padding: '4px 10px',
  borderRadius: 14,
  fontSize: 11,
  fontWeight: 600,
  color: '#6EE7B7',
  marginBottom: 8,
}

const stepRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
}

const dotBase: React.CSSProperties = {
  width: 26,
  height: 26,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  position: 'relative',
}
