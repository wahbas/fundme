import { useState } from 'react'
import { ChevronRight, CalendarClock, ArrowUpRight, Layers, Video } from 'lucide-react'
import { motion } from 'framer-motion'

const actions = [
  { icon: CalendarClock, label: 'Repayment Schedule', desc: 'Track your upcoming payments' },
  { icon: ArrowUpRight, label: 'Transactions', desc: 'View your financing activity' },
  { icon: Layers, label: 'Knowledge Hub', desc: 'Learn about business financing' },
  { icon: Video, label: 'Watch Video', desc: 'See how FundMe works' },
]

function ActionRow({ icon: Icon, label, desc, isLast }: { icon: React.ElementType; label: string; desc: string; isLast: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 0',
        borderBottom: isLast ? 'none' : '1px solid #E2E8F0',
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
        <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', marginBottom: 2 }}>{label}</p>
        <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>{desc}</p>
      </div>
      <ChevronRight size={16} color="#64748B" style={{ flexShrink: 0 }} />
    </div>
  )
}

export default function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.32, duration: 0.5, ease: 'easeOut' }}
      style={{
        background: '#fff',
        border: '1px solid #E2E8F0',
        borderRadius: 18,
        padding: 24,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        height: '100%',
      }}
    >
      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 20 }}>Quick Actions</h3>
      {actions.map((a, i) => (
        <ActionRow
          key={a.label}
          icon={a.icon}
          label={a.label}
          desc={a.desc}
          isLast={i === actions.length - 1}
        />
      ))}
    </motion.div>
  )
}
