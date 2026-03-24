import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../../ThemeContext'
import { useI18n } from '../../i18n'

// ─── Abstract circle illustrations (navy + green strokes) ────

function Illustration1() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 480 180" fill="none" preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="180" rx="16" fill="url(#bg1)" />
      <circle cx="120" cy="90" r="70" stroke="#80FF00" strokeWidth="1.5" opacity="0.5" fill="none" />
      <circle cx="120" cy="90" r="45" stroke="#80FF00" strokeWidth="1.2" opacity="0.35" fill="none" />
      <circle cx="280" cy="60" r="90" stroke="#80FF00" strokeWidth="1.5" opacity="0.4" fill="none" />
      <circle cx="380" cy="130" r="60" stroke="#80FF00" strokeWidth="1.2" opacity="0.3" fill="none" />
      <circle cx="400" cy="40" r="40" stroke="#80FF00" strokeWidth="1" opacity="0.25" fill="none" />
      <defs>
        <linearGradient id="bg1" x1="0" y1="0" x2="480" y2="180">
          <stop offset="0%" stopColor="#001233" />
          <stop offset="50%" stopColor="#002E83" />
          <stop offset="100%" stopColor="#0052B9" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function Illustration2() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 480 180" fill="none" preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="180" rx="16" fill="url(#bg2)" />
      <path d="M60 140 Q160 20 260 100 T460 60" stroke="#80FF00" strokeWidth="1.5" opacity="0.5" fill="none" />
      <path d="M0 100 Q100 -10 200 80 T400 30" stroke="#80FF00" strokeWidth="1.2" opacity="0.35" fill="none" />
      <circle cx="350" cy="90" r="55" stroke="#80FF00" strokeWidth="1.2" opacity="0.3" fill="none" />
      <circle cx="420" cy="50" r="35" stroke="#80FF00" strokeWidth="1" opacity="0.25" fill="none" />
      <defs>
        <linearGradient id="bg2" x1="0" y1="0" x2="480" y2="180">
          <stop offset="0%" stopColor="#002E83" />
          <stop offset="100%" stopColor="#0052B9" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function Illustration3() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 480 180" fill="none" preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="180" rx="16" fill="url(#bg3)" />
      <circle cx="200" cy="90" r="80" stroke="#80FF00" strokeWidth="1.5" opacity="0.45" fill="none" />
      <circle cx="200" cy="90" r="55" stroke="#80FF00" strokeWidth="1.2" opacity="0.3" fill="none" />
      <circle cx="350" cy="50" r="50" stroke="#80FF00" strokeWidth="1.2" opacity="0.35" fill="none" />
      <circle cx="80" cy="140" r="45" stroke="#80FF00" strokeWidth="1" opacity="0.25" fill="none" />
      <circle cx="420" cy="130" r="30" stroke="#80FF00" strokeWidth="1" opacity="0.2" fill="none" />
      <defs>
        <linearGradient id="bg3" x1="0" y1="0" x2="480" y2="180">
          <stop offset="0%" stopColor="#0052B9" />
          <stop offset="50%" stopColor="#002E83" />
          <stop offset="100%" stopColor="#001233" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// ─── Products ────────────────────────────────────────────────

// ─── Product type ────────────────────────────────────────────

interface Product {
  id: string
  tag: string
  tagColor: string
  tagBg: string
  name: string
  desc: string
  illustration: () => React.ReactNode
  available: boolean
}

// ─── Card ────────────────────────────────────────────────────

function ProductCard({ p, i }: { p: Product; i: number }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const { theme } = useTheme()
  const { t, isRTL } = useI18n()
  const Illust = p.illustration

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => p.available && navigate('/request-financing')}
      style={{
        background: theme.cardBg,
        borderRadius: 16,
        border: `1px solid ${hovered && p.available ? '#3B82F6' : theme.border}`,
        overflow: 'hidden',
        cursor: p.available ? 'pointer' : 'default',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: hovered && p.available ? '0 4px 16px rgba(0,0,0,0.08)' : theme.shadow,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Coming Soon overlay for unavailable cards */}
      {!p.available && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            background: 'rgba(255, 255, 255, 0.55)',
            backdropFilter: 'blur(1px)',
            WebkitBackdropFilter: 'blur(1px)',
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              padding: '10px 24px',
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: 30,
              border: '1px solid rgba(255, 255, 255, 0.6)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Lock size={14} color="#64748B" />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#475569', letterSpacing: 0.3 }}>{t('product.comingSoon')}</span>
          </div>
        </div>
      )}

      {/* Illustration banner */}
      <div style={{ height: 160, overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
        <Illust />
      </div>

      {/* Content */}
      <div style={{ padding: '20px 22px 22px' }}>
        {/* Tag */}
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 600,
            color: p.tagColor,
            background: p.tagBg,
            marginBottom: 12,
            textTransform: 'uppercase',
            letterSpacing: 0.3,
          }}
        >
          {p.tag}
        </span>

        <h4 style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary, marginBottom: 8 }}>{p.name}</h4>
        <p style={{ fontSize: 13, color: theme.textSecondary, lineHeight: 1.6, marginBottom: 18 }}>{p.desc}</p>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {p.available ? (
            <>
              <span style={{ fontSize: 12, color: '#16A34A', fontWeight: 500 }}>{t('product.availableNow')}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigate('/request-financing')
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#3B82F6',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {t('product.apply')}
                <ChevronRight size={16} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
              </button>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: theme.textMuted }}>
                <Lock size={13} />
                {t('product.comingSoon')}
              </div>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#3B82F6',
                  cursor: 'pointer',
                }}
              >
                {t('product.learn')}
                <ChevronRight size={16} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
              </span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main ────────────────────────────────────────────────────

export default function FinancingOptions() {
  const { theme } = useTheme()
  const { t } = useI18n()

  const products: Product[] = [
    {
      id: 'sadad',
      tag: t('product.payments'),
      tagColor: '#3B82F6',
      tagBg: 'rgba(59, 130, 246, 0.1)',
      name: t('product.sadadFinancing'),
      desc: t('product.sadadDesc'),
      illustration: Illustration3,
      available: true,
    },
    {
      id: 'working-capital',
      tag: t('product.businessGrowth'),
      tagColor: '#3B82F6',
      tagBg: 'rgba(59, 130, 246, 0.1)',
      name: t('product.workingCapital'),
      desc: t('product.workingCapitalDesc'),
      illustration: Illustration1,
      available: false,
    },
    {
      id: 'invoice',
      tag: t('product.cashFlow'),
      tagColor: '#3B82F6',
      tagBg: 'rgba(59, 130, 246, 0.1)',
      name: t('product.invoiceFinancing'),
      desc: t('product.invoiceFinancingDesc'),
      illustration: Illustration2,
      available: false,
    },
  ]

  return (
    <section style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 18 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary, marginBottom: 4 }}>{t('financing.options')}</h3>
        <p style={{ fontSize: 13, color: theme.textMuted }}>{t('product.chooseRight')}</p>
      </div>

      <div className="financing-options-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {products.map((p, i) => (
          <ProductCard key={p.id} p={p} i={i} />
        ))}
      </div>
    </section>
  )
}
