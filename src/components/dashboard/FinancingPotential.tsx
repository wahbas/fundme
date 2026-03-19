import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function FinancingPotential({ verified = false }: { verified?: boolean }) {
  const navigate = useNavigate()

  if (verified) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ marginBottom: 28 }}
      >
        <div
          style={{
            borderRadius: 22,
            padding: '32px 36px',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 40%, #0F172A 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Decorative glow */}
          <div
            style={{
              position: 'absolute',
              top: '-40%',
              right: '-5%',
              width: 300,
              height: 300,
              background: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Left content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: '#16A34A' }}
              />
              <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: '#3B82F6' }}>
                Ready to Grow
              </span>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F1F5F9', marginBottom: 6 }}>
              Request New Financing
            </h2>
            <p style={{ fontSize: 13, color: '#94A3B8', margin: 0 }}>
              Apply in minutes. Get a decision within 24–48 hours.
            </p>
          </div>

          {/* Right button */}
          <motion.button
            whileHover={{ y: -1, boxShadow: '0 8px 24px rgba(22, 163, 74, 0.25)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/request-financing')}
            style={{
              position: 'relative',
              zIndex: 1,
              padding: '14px 28px',
              background: '#16A34A',
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
              borderRadius: 14,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              border: 'none',
              flexShrink: 0,
            }}
          >
            <Plus size={18} strokeWidth={2.5} />
            New Loan Request
          </motion.button>
        </div>
      </motion.section>
    )
  }

  // Non-verified (first-time) CTA
  return (
    <section style={{ marginBottom: 20 }}>
      <div
        style={{
          borderRadius: 20,
          padding: '24px 28px',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #001233 0%, #002E83 40%, #0052B9 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
          <div style={{ flex: 1, maxWidth: 420 }}>
            <motion.p
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 8 }}
            >
              Ready to apply for financing?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 8 }}
            >
              Start Your Application
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}
            >
              Choose from Working Capital, Invoice, or SADAD financing options
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/onboarding')}
              style={{
                padding: '12px 28px',
                background: '#80FF00',
                color: '#002E83',
                fontWeight: 700,
                fontSize: 14,
                borderRadius: 10,
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
        </div>
      </div>
    </section>
  )
}
