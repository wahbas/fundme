import { CreditCard, Clock, Activity, ChevronUp, Minus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import RiyalSign from '../icons/RiyalSign'
import { useTheme } from '../../ThemeContext'
import { useI18n } from '../../i18n'

function AnimatedValue({ value, isEmpty, color }: { value: string; isEmpty: boolean; color: string }) {
  const num = parseInt(value.replace(/,/g, ''), 10)
  const animated = useCountUp(isNaN(num) ? 0 : num)
  const display = isNaN(num) ? value : animated.toLocaleString()
  return <span style={{ fontSize: 32, fontWeight: 700, color }}>{isEmpty ? value : display}</span>
}

function useCountUp(target: number, duration = 2400) {
  const [value, setValue] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (started.current || target === 0) { setValue(target); return }
    started.current = true
    const start = performance.now()
    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out quart for a slower, smoother deceleration
      const eased = 1 - Math.pow(1 - progress, 4)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration])
  return value
}

interface StatDef {
  icon: typeof CreditCard
  label: string
  labelKey?: string
  value: string
  currency: boolean | string
  sub: string
  subKey?: string
  accentLine: string
  iconBg: string
  iconColor: string
  trend: { text: string; color: string; bg: string; icon: typeof ChevronUp | null } | null
}

const activeStats: StatDef[] = [
  {
    icon: CreditCard,
    label: 'Total Financed',
    labelKey: 'stats.totalFinancing',
    value: '500,000',
    currency: true,
    sub: 'Across 3 active financings',
    subKey: 'stats.across3Active',
    accentLine: '#2563EB',
    iconBg: 'rgba(37, 99, 235, 0.06)',
    iconColor: '#3B82F6',
    trend: { text: '+12%', color: '#16A34A', bg: 'rgba(22, 163, 74, 0.08)', icon: ChevronUp },
  },
  {
    icon: Clock,
    label: 'Outstanding Balance',
    labelKey: 'stats.nextPayment',
    value: '125,000',
    currency: true,
    sub: 'Next payment: Apr 1, 2026',
    subKey: 'stats.nextPaymentDate',
    accentLine: '#16A34A',
    iconBg: 'rgba(22, 163, 74, 0.06)',
    iconColor: '#16A34A',
    trend: { text: 'On track', color: '#94A3B8', bg: 'rgba(100, 116, 139, 0.1)', icon: null },
  },
  {
    icon: Activity,
    label: 'Active Financings',
    labelKey: 'stats.activeLoans',
    value: '3',
    currency: '',
    sub: '1 under review · 4/4 docs verified',
    subKey: 'stats.underReview',
    accentLine: '#14B8A6',
    iconBg: 'rgba(20, 184, 166, 0.06)',
    iconColor: '#14B8A6',
    trend: { text: '+1', color: '#16A34A', bg: 'rgba(22, 163, 74, 0.08)', icon: ChevronUp },
  },
]

const emptyStats: StatDef[] = [
  {
    icon: CreditCard,
    label: 'Total Financed',
    labelKey: 'stats.totalFinancing',
    value: '0',
    currency: true,
    sub: 'No financings yet',
    subKey: 'stats.noFinancings',
    accentLine: '#E2E8F0',
    iconBg: 'rgba(37, 99, 235, 0.06)',
    iconColor: '#3B82F6',
    trend: null,
  },
  {
    icon: Clock,
    label: 'Outstanding Balance',
    labelKey: 'stats.nextPayment',
    value: '0',
    currency: true,
    sub: 'No payments due',
    subKey: 'stats.noPayments',
    accentLine: '#E2E8F0',
    iconBg: 'rgba(22, 163, 74, 0.06)',
    iconColor: '#16A34A',
    trend: null,
  },
  {
    icon: Activity,
    label: 'Active Financings',
    labelKey: 'stats.activeLoans',
    value: '0',
    currency: '',
    sub: 'Apply for your first financing',
    subKey: 'stats.getStarted',
    accentLine: '#E2E8F0',
    iconBg: 'rgba(20, 184, 166, 0.06)',
    iconColor: '#14B8A6',
    trend: null,
  },
]

function StatCard({ s, delay }: { s: StatDef; delay: number }) {
  const [hovered, setHovered] = useState(false)
  const { theme } = useTheme()
  const { t } = useI18n()
  const Icon = s.icon
  const isEmpty = s.value === '0'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: theme.cardBg,
        border: `1px solid ${hovered ? '#CBD5E1' : theme.border}`,
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: hovered ? '0 4px 12px rgba(0,0,0,0.06)' : theme.shadow,
        transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      {/* Accent line */}
      <div style={{ height: 3, background: s.accentLine }} />

      <div style={{ padding: 24 }}>
        {/* Header: icon + trend */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div
            style={{
              width: 44, height: 44, borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: s.iconBg, flexShrink: 0,
            }}
          >
            <Icon size={20} color={s.iconColor} />
          </div>
          {s.trend ? (
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 3,
                padding: '4px 10px', borderRadius: 20,
                background: s.trend.bg, color: s.trend.color,
                fontSize: 12, fontWeight: 600,
              }}
            >
              {s.trend.icon && <s.trend.icon size={14} />}
              {s.trend.text}
            </div>
          ) : (
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 3,
                padding: '4px 10px', borderRadius: 20,
                background: theme.borderLight, color: theme.textMuted,
                fontSize: 12, fontWeight: 600,
              }}
            >
              <Minus size={14} />
            </div>
          )}
        </div>

        {/* Label */}
        <p
          style={{
            fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: 0.8, color: theme.textMuted, marginBottom: 8,
          }}
        >
          {s.labelKey ? t(s.labelKey as any) : s.label}
        </p>

        {/* Value */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
          <AnimatedValue value={s.value} isEmpty={isEmpty} color={isEmpty ? '#CBD5E1' : theme.textPrimary} />
          {s.currency && (
            <span style={{ fontSize: 14, fontWeight: 500, color: isEmpty ? '#CBD5E1' : theme.textSecondary }}><RiyalSign size="lg" /></span>
          )}
        </div>

        {/* Sub text */}
        <p style={{ fontSize: 12, color: theme.textMuted, margin: 0 }}>{s.subKey ? t(s.subKey as any) : s.sub}</p>
      </div>
    </motion.div>
  )
}

export default function QuickStats({ hasLoans = true }: { hasLoans?: boolean }) {
  const stats = hasLoans ? activeStats : emptyStats

  return (
    <section style={{ marginBottom: 28 }}>
      <div className="quick-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {stats.map((s, i) => (
          <StatCard key={s.label} s={s} delay={0.08 + i * 0.08} />
        ))}
      </div>
    </section>
  )
}
