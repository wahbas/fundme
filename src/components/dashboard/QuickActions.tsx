import { useState } from 'react'
import { ChevronRight, CalendarClock, ArrowUpRight, Layers, Video, Headphones } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../../ThemeContext'

const actions = [
  { icon: CalendarClock, label: 'Repayment Schedule', desc: 'Track your upcoming payments', key: 'repayment' },
  { icon: ArrowUpRight, label: 'Transactions', desc: 'View your financing activity', key: 'transactions' },
  { icon: Headphones, label: 'Contact Support', desc: 'Get help from your account manager', key: 'support' },
  { icon: Layers, label: 'Knowledge Hub', desc: 'Learn about business financing', key: 'knowledge' },
  { icon: Video, label: 'Watch Video', desc: 'See how FundMe works', key: 'video' },
]

function ActionRow({ icon: Icon, label, desc, isLast, onClick }: { icon: React.ElementType; label: string; desc: string; isLast: boolean; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false)
  const { theme } = useTheme()
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
      <ChevronRight size={16} color={theme.textSecondary} style={{ flexShrink: 0 }} />
    </div>
  )
}

export default function QuickActions({ onContactSupport }: { onContactSupport?: () => void } = {}) {
  const { theme } = useTheme()
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
      <h3 style={{ fontSize: 15, fontWeight: 700, color: theme.textPrimary, marginBottom: 20 }}>Quick Actions</h3>
      {actions.map((a, i) => (
        <ActionRow
          key={a.key}
          icon={a.icon}
          label={a.label}
          desc={a.desc}
          isLast={i === actions.length - 1}
          onClick={a.key === 'support' ? onContactSupport : undefined}
        />
      ))}
    </motion.div>
  )
}
