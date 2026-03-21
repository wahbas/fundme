import { motion } from 'framer-motion'
import { LockIcon } from '../icons/NavIcons'
import { ArrowRightIcon } from '../icons/WidgetIcons'
import { useTheme } from '../../ThemeContext'
import { useI18n } from '../../i18n'

// ─── Cover Art SVGs ─────────────────────────────────────────────

function WorkingCapitalCover() {
  return (
    <svg viewBox="0 0 400 180" fill="none" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <linearGradient id="wcGrad" x1="0" y1="0" x2="400" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#040E27" />
          <stop offset="50%" stopColor="#0A2870" />
          <stop offset="100%" stopColor="#1348C2" />
        </linearGradient>
      </defs>
      <rect width="400" height="180" fill="url(#wcGrad)" />
      <circle cx="100" cy="-40" r="160" stroke="#7CFF01" strokeWidth="2" fill="none" />
      <circle cx="340" cy="160" r="140" stroke="#7CFF01" strokeWidth="2" fill="none" />
      <circle cx="280" cy="-80" r="100" stroke="#7CFF01" strokeWidth="1.5" fill="none" opacity="0.3" />
    </svg>
  )
}

function InvoiceFinancingCover() {
  return (
    <svg viewBox="0 0 400 180" fill="none" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <linearGradient id="ifGrad" x1="0" y1="0" x2="400" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#030C22" />
          <stop offset="50%" stopColor="#082260" />
          <stop offset="100%" stopColor="#0E3BAE" />
        </linearGradient>
      </defs>
      <rect width="400" height="180" fill="url(#ifGrad)" />
      <circle cx="200" cy="-60" r="150" stroke="#7CFF01" strokeWidth="2" fill="none" />
      <circle cx="200" cy="240" r="150" stroke="#7CFF01" strokeWidth="2" fill="none" />
      <circle cx="-30" cy="80" r="80" stroke="#7CFF01" strokeWidth="1.5" fill="none" opacity="0.3" />
    </svg>
  )
}

function SADADFinancingCover() {
  return (
    <svg viewBox="0 0 400 180" fill="none" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <linearGradient id="sdGrad" x1="0" y1="0" x2="400" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#050F2A" />
          <stop offset="50%" stopColor="#0B2D78" />
          <stop offset="100%" stopColor="#1042BD" />
        </linearGradient>
      </defs>
      <rect width="400" height="180" fill="url(#sdGrad)" />
      <circle cx="60" cy="220" r="200" stroke="#7CFF01" strokeWidth="2" fill="none" />
      <circle cx="380" cy="-20" r="130" stroke="#7CFF01" strokeWidth="2" fill="none" />
      <circle cx="240" cy="150" r="40" stroke="#7CFF01" strokeWidth="1.5" fill="none" opacity="0.25" />
    </svg>
  )
}

// ─── Product data ───────────────────────────────────────────────

// ─── Component ──────────────────────────────────────────────────

export default function FinancingProducts({ lockText = 'Unlock after verification' }: { lockText?: string }) {
  const { theme } = useTheme()
  const { t, isRTL } = useI18n()

  const products = [
    {
      Cover: WorkingCapitalCover,
      tag: t('product.businessGrowth'),
      title: t('product.workingCapital'),
      description: t('product.workingCapitalDesc'),
    },
    {
      Cover: InvoiceFinancingCover,
      tag: t('product.cashFlow'),
      title: t('product.invoiceFinancing'),
      description: t('product.invoiceFinancingDesc'),
    },
    {
      Cover: SADADFinancingCover,
      tag: t('product.payments'),
      title: t('product.sadadFinancing'),
      description: t('product.sadadDesc'),
    },
  ]

  return (
    <div>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: theme.textPrimary, margin: '0 0 4px' }}>
        {t('financing.products')}
      </h3>
      <p style={{ fontSize: 12, color: theme.textSecondary, margin: '0 0 16px' }}>
        {t('product.completeToApply')}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {products.map((p) => (
          <motion.div
            key={p.title}
            whileHover={{ translateY: -4, boxShadow: '0 16px 40px rgba(10,47,160,0.14)', borderColor: 'transparent' }}
            transition={{ duration: 0.2 }}
            style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 16, overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.2s, border-color 0.2s, transform 0.2s' }}
          >
            {/* Cover art */}
            <div style={coverStyle}>
              <p.Cover />
            </div>

            {/* Body */}
            <div style={bodyStyle}>
              {/* Tag */}
              <span style={tagStyle}>{p.tag}</span>

              {/* Title */}
              <h4 style={{ fontSize: 18, fontWeight: 700, color: theme.textPrimary, margin: '0 0 6px' }}>
                {p.title}
              </h4>

              {/* Description */}
              <p style={{ fontSize: 13, color: theme.textSecondary, lineHeight: 1.5, margin: '0 0 16px' }}>
                {p.description}
              </p>

              {/* Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Lock state */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <LockIcon size={13} color="#94A3B8" />
                  <span style={{ fontSize: 11, color: theme.textMuted }}>{lockText}</span>
                </div>

                {/* Learn link */}
                <motion.a
                  href="#"
                  whileHover={{ gap: 6 }}
                  onClick={(e) => e.preventDefault()}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 3,
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#2563EB',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {t('product.learn')}
                  <span style={{ display: 'inline-flex', transform: isRTL ? 'scaleX(-1)' : 'none' }}><ArrowRightIcon size={14} color="#2563EB" /></span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Styles ─────────────────────────────────────────────────────

// cardStyle moved inline to use theme

const coverStyle: React.CSSProperties = {
  height: 180,
  overflow: 'hidden',
}

const bodyStyle: React.CSSProperties = {
  padding: '18px 20px 20px',
}

const tagStyle: React.CSSProperties = {
  display: 'inline-block',
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: 0.8,
  color: '#2563EB',
  background: '#DBEAFE',
  padding: '3px 10px',
  borderRadius: 4,
  marginBottom: 10,
}
