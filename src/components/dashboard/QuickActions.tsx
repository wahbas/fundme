import { useState } from 'react'
import { ChevronRight, CalendarClock, ArrowUpRight, Layers, Video, Headphones } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../../ThemeContext'
import { useI18n } from '../../i18n'

const actions = [
  { icon: CalendarClock, labelKey: 'actions.repaymentSchedule' as const, descKey: 'actions.trackPayments' as const, key: 'repayment' },
  { icon: ArrowUpRight, labelKey: 'actions.transactions' as const, descKey: 'actions.viewActivity' as const, key: 'transactions' },
  { icon: Headphones, labelKey: 'actions.contactSupport' as const, descKey: 'actions.getHelp' as const, key: 'support' },
  { icon: Layers, labelKey: 'actions.knowledgeHub' as const, descKey: 'actions.learnFinancing' as const, key: 'knowledge' },
  { icon: Video, labelKey: 'actions.watchVideo' as const, descKey: 'actions.seeHowWorks' as const, key: 'video' },
]

function ActionRow({ icon: Icon, label, desc, isLast, onClick }: { icon: React.ElementType; label: string; desc: string; isLast: boolean; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false)
  const { theme } = useTheme()
  const { isRTL } = useI18n()
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 0',
        borderBottom: isLast ? 'none' : `1px solid ${theme.border}`,
        cursor: 'pointer',
        opacity: hovered ? 0.7 : 1,
        transition: 'opacity 0.15s',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: 'rgba(37, 99, 235, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={20} color="#3B82F6" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary, marginBottom: 2 }}>{label}</p>
        <p style={{ fontSize: 11, color: theme.textMuted, margin: 0 }}>{desc}</p>
      </div>
      <ChevronRight size={16} color={theme.textSecondary} style={{ flexShrink: 0, transform: isRTL ? 'scaleX(-1)' : 'none' }} />
    </div>
  )
}

export default function QuickActions({ onContactSupport }: { onContactSupport?: () => void } = {}) {
  const { theme } = useTheme()
  const { t } = useI18n()
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.32, duration: 0.5, ease: 'easeOut' }}
      style={{
        background: theme.cardBg,
        border: `1px solid ${theme.border}`,
        borderRadius: 18,
        padding: 24,
        boxShadow: theme.shadow,
        height: '100%',
      }}
    >
      <h3 style={{ fontSize: 15, fontWeight: 700, color: theme.textPrimary, marginBottom: 20 }}>{t('actions.quickActions')}</h3>
      {actions.map((a, i) => (
        <ActionRow
          key={a.key}
          icon={a.icon}
          label={t(a.labelKey)}
          desc={t(a.descKey)}
          isLast={i === actions.length - 1}
          onClick={a.key === 'support' ? onContactSupport : undefined}
        />
      ))}
    </motion.div>
  )
}
