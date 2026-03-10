import { motion } from 'framer-motion'

const actions = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="16" rx="2" stroke="#2563EB" strokeWidth="1.5" />
        <path d="M3 10H21" stroke="#2563EB" strokeWidth="1.5" />
        <path d="M8 3V6M16 3V6" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="17" cy="15" r="0.8" fill="#2563EB" />
        <path d="M17 13V14.5" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Repayment Schedule',
    subtitle: 'Track your upcoming payments',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M7 17L7 7" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 10L7 7L10 10" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 7V17" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 14L17 17L20 14" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Transactions',
    subtitle: 'View your financing activity',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17L12 22L22 17" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12L12 17L22 12" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Knowledge Hub',
    subtitle: 'Learn about business financing',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="13" height="12" rx="2" stroke="#2563EB" strokeWidth="1.5" />
        <path d="M16 10L21 7V17L16 14" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Watch Video',
    subtitle: 'See how FundMe works',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M21 12C21 16.42 17.42 20 13 20H7L3 22V12C3 7.58 6.58 4 11 4H13C17.42 4 21 7.58 21 12Z" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="12" r="1" fill="#2563EB" />
        <circle cx="13" cy="12" r="1" fill="#2563EB" />
        <circle cx="17" cy="12" r="1" fill="#2563EB" />
      </svg>
    ),
    title: 'Contact Support',
    subtitle: 'Chat with our team',
  },
]

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 6L15 12L9 18" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function QuickActions() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', margin: '0 0 12px' }}>
        Quick Actions
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        {actions.map((a) => (
          <motion.div
            key={a.title}
            whileHover={{ opacity: 0.7 }}
            style={actionCardStyle}
          >
            <div style={iconBoxStyle}>{a.icon}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#1E293B', margin: 0 }}>{a.title}</p>
              <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>{a.subtitle}</p>
            </div>
            <ChevronRight />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const actionCardStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  padding: '14px 16px',
  background: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderRadius: 14,
  cursor: 'pointer',
}

const iconBoxStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  background: '#EFF6FF',
  borderRadius: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}
