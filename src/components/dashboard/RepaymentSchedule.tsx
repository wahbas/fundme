import { CalendarClock, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import RiyalSign from '../icons/RiyalSign'
import { useTheme } from '../../ThemeContext'
import { useI18n } from '../../i18n'

interface Payment {
  month: string
  day: string
  fullDate: string
  label: string
  invoiceId: string
  amount: number
  status: 'due' | 'upcoming'
  daysUntil?: number
}

const payments: Payment[] = [
  { month: 'APR', day: '1', fullDate: 'Apr 1, 2026', label: 'SADAD Financing', invoiceId: 'INV-2024-001', amount: 10677, status: 'due', daysUntil: 12 },
  { month: 'MAY', day: '1', fullDate: 'May 1, 2026', label: 'SADAD Financing', invoiceId: 'INV-2024-002', amount: 10677, status: 'upcoming' },
  { month: 'JUN', day: '1', fullDate: 'Jun 1, 2026', label: 'SADAD Financing', invoiceId: 'INV-2024-003', amount: 10677, status: 'upcoming' },
]

function StatusIndicator({ status, daysUntil }: { status: 'due' | 'upcoming'; daysUntil?: number }) {
  const { t } = useI18n()
  if (status === 'due') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#2563EB' }} />
        <span style={{ fontSize: 12, color: '#2563EB', fontWeight: 500 }}>{t('repayment.dueIn')} {daysUntil} {t('repayment.days')}</span>
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <div style={{ width: 7, height: 7, borderRadius: '50%', border: '1.5px solid #94A3B8' }} />
      <span style={{ fontSize: 12, color: '#94A3B8' }}>{t('repayment.upcoming')}</span>
    </div>
  )
}

function PaymentRow({ payment, showPay, onPayClick }: { payment: Payment; showPay: boolean; onPayClick?: () => void }) {
  const { theme } = useTheme()
  const { t } = useI18n()
  const isDue = payment.status === 'due'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0' }}>
      {/* Date block */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 10,
          background: isDue ? '#EFF6FF' : theme.bgPrimary,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 700, color: isDue ? '#2563EB' : theme.textMuted, textTransform: 'uppercase', lineHeight: 1 }}>
          {payment.month}
        </span>
        <span style={{ fontSize: 18, fontWeight: 700, color: isDue ? theme.textPrimary : theme.textMuted, lineHeight: 1.2 }}>
          {payment.day}
        </span>
      </div>

      {/* Middle info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary }}>{payment.fullDate}</div>
        <div style={{ fontSize: 12, color: theme.textMuted }}>{t('repayment.sadadFinancing')} · {payment.invoiceId}</div>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: theme.textPrimary, whiteSpace: 'nowrap' }}>
            {payment.amount.toLocaleString()} <RiyalSign />
          </div>
          <StatusIndicator status={payment.status} daysUntil={payment.daysUntil} />
        </div>
        {showPay && (
          <button
            onClick={onPayClick}
            style={{
              background: '#7CFF01',
              color: '#0F172A',
              fontSize: 12,
              fontWeight: 600,
              borderRadius: 8,
              padding: '6px 14px',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {t('repayment.pay')}
          </button>
        )}
      </div>
    </div>
  )
}

export default function RepaymentSchedule({ onPayClick }: { onPayClick?: () => void }) {
  const { theme } = useTheme()
  const { t, isRTL } = useI18n()
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
      style={{
        background: theme.cardBg,
        border: `1px solid ${theme.border}`,
        borderRadius: 18,
        padding: 24,
        boxShadow: theme.shadow,
        height: '100%',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
          <h3 style={{ fontSize: 15, fontWeight: 700, color: theme.textPrimary, margin: 0 }}>{t('repayment.upcomingPayments')}</h3>
        </div>
        <a
          href="#"
          style={{
            color: '#2563EB',
            fontSize: 13,
            fontWeight: 600,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {t('repayment.viewAll')} <ChevronRight size={14} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
        </a>
      </div>

      {/* Payment rows */}
      <div>
        {payments.map((payment, i) => (
          <div key={payment.invoiceId}>
            {i > 0 && <div style={{ height: 1, background: theme.borderLight }} />}
            <PaymentRow payment={payment} showPay={i === 0} onPayClick={onPayClick} />
          </div>
        ))}
      </div>
    </motion.section>
  )
}
