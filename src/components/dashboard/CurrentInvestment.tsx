import { TrendingUp, ArrowUpRight, Clock, PieChart } from 'lucide-react'
import { motion } from 'framer-motion'
import RiyalSign from '../icons/RiyalSign'
import { useTheme } from '../../ThemeContext'
import { useI18n } from '../../i18n'

const investments = [
  {
    id: 'inv-1',
    name: 'Working Capital Financing',
    amount: 250000,
    returnRate: 12.5,
    status: 'active' as const,
    startDate: 'Jan 15, 2026',
    maturityDate: 'Jul 15, 2026',
    progress: 45,
  },
  {
    id: 'inv-2',
    name: 'SADAD Invoice Financing',
    amount: 180000,
    returnRate: 10.8,
    status: 'active' as const,
    startDate: 'Feb 1, 2026',
    maturityDate: 'Aug 1, 2026',
    progress: 32,
  },
  {
    id: 'inv-3',
    name: 'Invoice Financing',
    amount: 70000,
    returnRate: 14.2,
    status: 'matured' as const,
    startDate: 'Oct 10, 2025',
    maturityDate: 'Mar 10, 2026',
    progress: 100,
  },
]

const statusConfig = {
  active: { label: 'Active', color: '#059669', bg: 'rgba(16,185,129,0.08)', dot: '#10B981' },
  matured: { label: 'Matured', color: '#2563EB', bg: 'rgba(37,99,235,0.08)', dot: '#3B82F6' },
}

export default function CurrentInvestment() {
  const { theme } = useTheme()
  const { t } = useI18n()

  const totalInvested = investments.reduce((s, i) => s + i.amount, 0)
  const activeCount = investments.filter(i => i.status === 'active').length

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.28, duration: 0.5, ease: 'easeOut' }}
      style={{
        background: theme.cardBg,
        border: `1px solid ${theme.border}`,
        borderRadius: 18,
        padding: 24,
        boxShadow: theme.shadow,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(37,99,235,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <PieChart size={18} color="#3B82F6" />
          </div>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: theme.textPrimary }}>
            {t('investment.myInvestments' as any)}
          </h3>
        </div>
        <span style={{
          padding: '4px 10px', borderRadius: 20,
          background: 'rgba(37,99,235,0.06)', fontSize: 12, fontWeight: 600, color: '#2563EB',
        }}>
          {activeCount} {t('investment.active' as any)}
        </span>
      </div>

      {/* Summary strip */}
      <div style={{
        display: 'flex', gap: 16, marginBottom: 20, padding: '14px 16px',
        background: 'linear-gradient(135deg, #002E83 0%, #0052B9 100%)',
        borderRadius: 12,
      }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>
            {t('investment.totalInvested' as any)}
          </p>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>
            <RiyalSign size="sm" color="#fff" /> {totalInvested.toLocaleString()}
          </p>
        </div>
        <div style={{ width: 1, background: 'rgba(255,255,255,0.15)' }} />
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>
            {t('investment.avgReturn' as any)}
          </p>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#7CFF01', display: 'flex', alignItems: 'center', gap: 4 }}>
            <TrendingUp size={16} /> 12.5%
          </p>
        </div>
      </div>

      {/* Investment list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {investments.map((inv) => {
          const st = statusConfig[inv.status]
          return (
            <div
              key={inv.id}
              style={{
                padding: '16px 18px',
                background: theme.bgPrimary,
                border: `1px solid ${theme.border}`,
                borderRadius: 14,
                transition: 'border-color 0.15s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#2563EB' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.border }}
            >
              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary, marginBottom: 3 }}>{inv.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      padding: '2px 8px', borderRadius: 20,
                      fontSize: 11, fontWeight: 600, color: st.color, background: st.bg,
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: st.dot }} />
                      {st.label}
                    </span>
                    <span style={{ fontSize: 11, color: theme.textMuted, display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Clock size={11} /> {inv.startDate} - {inv.maturityDate}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary }}>
                    <RiyalSign size="sm" /> {inv.amount.toLocaleString()}
                  </p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 3 }}>
                    <ArrowUpRight size={12} /> {inv.returnRate}%
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ height: 6, borderRadius: 3, background: theme.border, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${inv.progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  style={{
                    height: '100%', borderRadius: 3,
                    background: inv.status === 'matured'
                      ? 'linear-gradient(90deg, #2563EB, #3B82F6)'
                      : 'linear-gradient(90deg, #059669, #10B981)',
                  }}
                />
              </div>
              <p style={{ fontSize: 11, color: theme.textMuted, marginTop: 4 }}>
                {inv.progress}% {inv.status === 'matured' ? 'completed' : 'of term elapsed'}
              </p>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
