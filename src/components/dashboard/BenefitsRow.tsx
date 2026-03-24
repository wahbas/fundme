import { Zap, Percent, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

const benefits = [
  {
    icon: Zap,
    title: 'Fast Approval',
    description: 'Get approved in as little as 24 hours',
    gradient: 'linear-gradient(135deg, #002E83, #0D82F9)',
  },
  {
    icon: Percent,
    title: 'Competitive Rates',
    description: 'Access rates starting from 5% APR',
    gradient: 'linear-gradient(135deg, #0D82F9, #06B6D4)',
  },
  {
    icon: Calendar,
    title: 'Flexible Terms',
    description: 'Choose repayment terms that work for you',
    gradient: 'linear-gradient(135deg, #06B6D4, #0D82F9)',
  },
]

export default function BenefitsRow() {
  return (
    <section style={{ marginBottom: 20 }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111', marginBottom: 12 }}>Why Complete Setup?</h3>
      <div className="benefits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {benefits.map((b) => (
          <motion.div
            key={b.title}
            whileHover={{ scale: 1.02, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
            transition={{ duration: 0.15 }}
            style={{
              background: '#fff',
              border: '1px solid #F0F0F0',
              borderRadius: 12,
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              cursor: 'default',
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: b.gradient,
                flexShrink: 0,
              }}
            >
              <b.icon size={18} color="#fff" />
            </div>
            <div style={{ minWidth: 0 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 2 }}>{b.title}</h4>
              <p style={{ fontSize: 11, color: '#888', lineHeight: 1.4, margin: 0 }}>{b.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
