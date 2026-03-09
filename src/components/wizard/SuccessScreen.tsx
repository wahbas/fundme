import { useState, useEffect, useMemo } from 'react'
import { Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'

export default function SuccessScreen({ onBack }: { onBack: () => void }) {
  const refId = useMemo(() => `#REQ-2025-${String(Math.floor(Math.random() * 90000) + 10000)}`, [])
  const [showConfetti, setShowConfetti] = useState(true)
  const [windowSize, setWindowSize] = useState({ w: window.innerWidth, h: window.innerHeight })

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', handleResize)
    return () => { clearTimeout(timer); window.removeEventListener('resize', handleResize) }
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #fff, #F9FAFB)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        position: 'relative',
      }}
    >
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.w}
          height={windowSize.h}
          recycle={false}
          numberOfPieces={300}
          gravity={0.2}
          colors={['#0D82F9', '#002E83', '#80FF00', '#10B981', '#8B5CF6']}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', maxWidth: 480 }}
      >
        {/* Animated Success Icon */}
        <div style={{ position: 'relative', width: 144, height: 144, margin: '0 auto 40px' }}>
          {/* Ripple 1 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(16,185,129,0.15)',
              borderRadius: '50%',
            }}
          />
          {/* Ripple 2 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(16,185,129,0.2)',
              borderRadius: '50%',
            }}
          />
          {/* Bg circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(16,185,129,0.12)',
              borderRadius: '50%',
            }}
          />
          {/* Main gradient circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
            style={{
              position: 'absolute',
              inset: 12,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #10B981, #059669)',
              boxShadow: '0 8px 32px rgba(16,185,129,0.35)',
            }}
          >
            {/* Animated Checkmark SVG */}
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <motion.path
                d="M14 28L24 38L42 18"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{ fontSize: 32, fontWeight: 700, color: '#111827', marginBottom: 12 }}
        >
          Application Submitted!
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{ fontSize: 16, color: '#6B7280', marginBottom: 32, lineHeight: 1.6 }}
        >
          We've received your financing request and will review it shortly.
        </motion.p>

        {/* Reference Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          style={{
            background: '#fff',
            borderRadius: 16,
            padding: 32,
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            border: '1px solid #F3F4F6',
            marginBottom: 36,
          }}
        >
          <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 8 }}>Application Reference</p>
          <p style={{ fontSize: 28, fontFamily: 'monospace', fontWeight: 700, color: '#002E83' }}>{refId}</p>

          <div
            style={{
              marginTop: 24,
              paddingTop: 24,
              borderTop: '1px solid #F3F4F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              color: '#6B7280',
              fontSize: 14,
            }}
          >
            <Clock size={18} />
            <span>Expected response within 24–48 hours</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '16px 0',
              background: '#002E83',
              color: '#fff',
              fontWeight: 600,
              fontSize: 15,
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,46,131,0.25)',
            }}
          >
            Track Application
          </motion.button>

          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '16px 0',
              background: '#fff',
              color: '#374151',
              fontWeight: 600,
              fontSize: 15,
              borderRadius: 12,
              border: '2px solid #E5E5E5',
              cursor: 'pointer',
            }}
          >
            Back to Dashboard
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
