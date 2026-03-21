import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import RiyalSign from '../icons/RiyalSign'
import { useTheme } from '../../ThemeContext'
import { useI18n } from '../../i18n'

type Status = 'all' | 'submitted' | 'under-review' | 'approved' | 'rejected'

interface Application {
  id: string
  type: string
  status: Status
  statusLabel: string
  statusColor: string
  statusBg: string
  statusBorder: string
  subtitle: string
  amount: number
  date: string
}

const APPLICATIONS: Application[] = [
  {
    id: 'LOAN–2026–003',
    type: 'SADAD Invoice Financing',
    status: 'submitted',
    statusLabel: 'Request Submitted',
    statusColor: '#475569',
    statusBg: '#F1F5F9',
    statusBorder: '#E2E8F0',
    subtitle: 'Your application has been received',
    amount: 500000,
    date: 'Mar 19, 2026',
  },
  {
    id: 'LOAN–2026–002',
    type: 'SADAD Invoice Financing',
    status: 'under-review',
    statusLabel: 'Under Review',
    statusColor: '#D97706',
    statusBg: '#FFFBEB',
    statusBorder: '#FDE68A',
    subtitle: 'Our team is reviewing your documents',
    amount: 320000,
    date: 'Mar 12, 2026',
  },
  {
    id: 'LOAN–2026–001',
    type: 'SADAD Invoice Financing',
    status: 'approved',
    statusLabel: 'Approved',
    statusColor: '#16A34A',
    statusBg: '#F0FDF4',
    statusBorder: '#BBF7D0',
    subtitle: 'Financing has been disbursed',
    amount: 750000,
    date: 'Feb 28, 2026',
  },
]

export default function RecentApplication() {
  const [activeFilter, setActiveFilter] = useState<Status>('all')
  const { theme } = useTheme()
  const { t } = useI18n()

  const FILTERS: { key: Status; label: string }[] = [
    { key: 'all', label: t('recent.all') },
    { key: 'submitted', label: t('recent.submitted') },
    { key: 'under-review', label: t('recent.underReview') },
    { key: 'approved', label: t('recent.approved') },
    { key: 'rejected', label: t('recent.rejected') },
  ]

  const filtered = activeFilter === 'all'
    ? APPLICATIONS
    : APPLICATIONS.filter((a) => a.status === activeFilter)

  const counts: Record<Status, number> = {
    all: APPLICATIONS.length,
    submitted: APPLICATIONS.filter((a) => a.status === 'submitted').length,
    'under-review': APPLICATIONS.filter((a) => a.status === 'under-review').length,
    approved: APPLICATIONS.filter((a) => a.status === 'approved').length,
    rejected: APPLICATIONS.filter((a) => a.status === 'rejected').length,
  }

  return (
    <section>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary, marginBottom: 12 }}>{t('recent.myRecentApps')}</h3>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {FILTERS.map((f) => {
            const isActive = activeFilter === f.key
            const count = counts[f.key]
            return (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  background: isActive ? '#1B2A3D' : theme.cardBg,
                  color: isActive ? '#fff' : theme.textSecondary,
                  border: isActive ? 'none' : `1px solid ${theme.border}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {f.label}
                {count > 0 && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      background: isActive ? 'rgba(255,255,255,0.2)' : theme.borderLight,
                      color: isActive ? '#fff' : theme.textMuted,
                      borderRadius: 10,
                      padding: '1px 6px',
                      minWidth: 18,
                      textAlign: 'center',
                    }}
                  >
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Application cards */}
      <AnimatePresence mode="popLayout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: 14,
                padding: '32px 24px',
                textAlign: 'center',
                color: theme.textMuted,
                fontSize: 13,
              }}
            >
              {t('recent.noApps')}
            </motion.div>
          ) : (
            filtered.map((app) => (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: theme.cardBg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: theme.shadow,
                }}
              >
                {/* Top section */}
                <div style={{ padding: '20px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#0D9488', marginBottom: 4, fontFamily: 'monospace' }}>
                        {app.id}
                      </p>
                      <p style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 4 }}>{app.type}</p>
                    </div>
                    <span
                      style={{
                        padding: '5px 14px',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                        color: app.statusColor,
                        background: app.statusBg,
                        border: `1px solid ${app.statusBorder}`,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {app.statusLabel}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: theme.textMuted }}>{app.subtitle}</p>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: theme.borderLight, margin: '0 22px' }} />

                {/* Amount + Date */}
                <div style={{ padding: '16px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <p style={{ fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>{t('recent.financingAmount')}</p>
                    <p style={{ fontSize: 22, fontWeight: 700, color: theme.textPrimary }}>{app.amount.toLocaleString()} <RiyalSign size="lg" /></p>
                  </div>
                  <p style={{ fontSize: 12, color: theme.textMuted }}>{app.date}</p>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: theme.borderLight, margin: '0 22px' }} />

                {/* View Status button */}
                <div style={{ padding: '16px 22px' }}>
                  <button
                    style={{
                      width: '100%',
                      padding: '12px 0',
                      background: theme.cardBg,
                      border: `1px solid ${theme.border}`,
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: 600,
                      color: theme.textPrimary,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = theme.bgPrimary }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = theme.cardBg }}
                  >
                    {t('recent.viewStatus')}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </AnimatePresence>
    </section>
  )
}
