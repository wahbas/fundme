import { CalendarClock } from 'lucide-react'
import { motion } from 'framer-motion'

function SkeletonLine({ width, height = 12, delay = 0 }: { width: string; height?: number; delay?: number }) {
  return (
    <motion.div
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ repeat: Infinity, duration: 1.5, delay }}
      style={{
        width,
        height,
        borderRadius: 6,
        background: '#E2E8F0',
      }}
    />
  )
}

function SkeletonRow({ delay }: { delay: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0' }}>
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.5, delay }}
        style={{ width: 40, height: 40, borderRadius: 10, background: '#E2E8F0', flexShrink: 0 }}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <SkeletonLine width="60%" height={12} delay={delay + 0.1} />
        <SkeletonLine width="40%" height={10} delay={delay + 0.2} />
      </div>
      <SkeletonLine width="70px" height={12} delay={delay + 0.15} />
    </div>
  )
}

export default function RepaymentSchedule() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
      style={{
        background: '#fff',
        border: '1px solid #E2E8F0',
        borderRadius: 18,
        padding: 24,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'rgba(37, 99, 235, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CalendarClock size={18} color="#3B82F6" />
        </div>
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 2 }}>Repayment Schedule</h3>
          <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>No active loans yet</p>
        </div>
      </div>

      {/* Skeleton rows */}
      <div style={{ borderTop: '1px solid #F1F5F9' }}>
        <SkeletonRow delay={0} />
        <div style={{ height: 1, background: '#F1F5F9' }} />
        <SkeletonRow delay={0.15} />
        <div style={{ height: 1, background: '#F1F5F9' }} />
        <SkeletonRow delay={0.3} />
      </div>

      {/* Empty state message */}
      <div
        style={{
          textAlign: 'center',
          padding: '16px 0 4px',
          borderTop: '1px solid #F1F5F9',
        }}
      >
        <p style={{ fontSize: 13, color: '#94A3B8', margin: 0 }}>
          Your repayment schedule will appear here once you have an active loan.
        </p>
      </div>
    </motion.section>
  )
}
