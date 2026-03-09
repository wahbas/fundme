import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Briefcase, FileText, Building2, ArrowRight, Clock, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const products = [
  {
    id: 'working-capital' as const,
    icon: Briefcase,
    gradient: 'linear-gradient(135deg, #0D82F9, #06B6D4)',
    name: 'Working Capital',
    desc: 'Quick financing for daily operations and business growth',
    amount: 'Up to 300,000 SAR',
    rate: '5% APR',
    term: '6–24 months',
    bg: '#EFF6FF',
    accent: '#0D82F9',
  },
  {
    id: 'invoice' as const,
    icon: FileText,
    gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    name: 'Invoice Financing',
    desc: 'Convert outstanding invoices into immediate cash',
    amount: 'Up to 200,000 SAR',
    rate: '4% APR',
    term: 'Based on invoice terms',
    bg: '#F5F3FF',
    accent: '#8B5CF6',
  },
  {
    id: 'sadad' as const,
    icon: Building2,
    gradient: 'linear-gradient(135deg, #002E83, #0D82F9)',
    name: 'SADAD Invoice Financing',
    desc: 'Finance unpaid government & service bills via SADAD',
    amount: 'Up to 500,000 SAR',
    rate: '6% APR',
    term: 'Flexible terms',
    bg: '#F0F4FF',
    accent: '#002E83',
    popular: true,
  },
]

export default function FinancingOptions({ underReview = false }: { underReview?: boolean }) {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  function handleCardClick() {
    if (underReview) {
      setShowModal(true)
    } else {
      navigate('/request-financing')
    }
  }

  return (
    <section style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 2 }}>Explore Financing Products</h3>
          <p style={{ fontSize: 13, color: '#9CA3AF' }}>Choose the right product for your business needs</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {products.map((p, i) => {
          const Icon = p.icon
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={handleCardClick}
              style={{
                background: p.bg,
                borderRadius: 16,
                padding: '24px 22px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {p.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    padding: '3px 10px',
                    background: '#80FF00',
                    color: '#002E83',
                    fontSize: 11,
                    fontWeight: 700,
                    borderRadius: 20,
                  }}
                >
                  Popular
                </div>
              )}

              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: p.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 18,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                }}
              >
                <Icon size={24} color="#fff" />
              </div>

              <h4 style={{ fontSize: 15, fontWeight: 600, color: '#111827', marginBottom: 4 }}>{p.name}</h4>
              <p style={{ fontSize: 14, fontWeight: 600, color: p.accent, marginBottom: 8 }}>{p.amount}</p>
              <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5, marginBottom: 18, flex: 1 }}>{p.desc}</p>

              <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                <span style={{ fontSize: 11, color: p.accent, background: 'rgba(255,255,255,0.7)', padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>
                  {p.rate}
                </span>
                <span style={{ fontSize: 11, color: '#374151', background: 'rgba(255,255,255,0.7)', padding: '4px 10px', borderRadius: 6, fontWeight: 500 }}>
                  {p.term}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: p.accent }}>
                Apply Now
                <ArrowRight size={15} />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Under Review Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 50,
              background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 24,
            }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#fff', borderRadius: 20, padding: '32px 28px',
                maxWidth: 380, width: '100%',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                textAlign: 'center',
              }}
            >
              {/* Close */}
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                }}
              >
                <X size={18} color="#9CA3AF" />
              </button>

              {/* Icon */}
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: '#FEF3C7', margin: '0 auto 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Clock size={32} color="#F59E0B" />
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
                Account Under Review
              </h3>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6, marginBottom: 24 }}>
                Your account is still being reviewed. You'll be able to apply for financing once your account is approved.
              </p>

              {/* ETA */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '10px 16px', background: '#FEF9C3', borderRadius: 10, marginBottom: 24,
              }}>
                <Clock size={15} color="#92400E" />
                <span style={{ fontSize: 13, color: '#92400E', fontWeight: 500 }}>
                  Estimated: 1-2 business days
                </span>
              </div>

              <button
                onClick={() => setShowModal(false)}
                style={{
                  width: '100%', padding: '12px 0',
                  background: '#002E83', color: '#fff',
                  fontWeight: 600, fontSize: 14, borderRadius: 10,
                  border: 'none', cursor: 'pointer',
                }}
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
