import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bell } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import FloatingHelpButton from '../components/dashboard/FloatingHelpButton'
import MobileTabBar from '../components/layout/MobileTabBar'
import { useTheme } from '../ThemeContext'
import { useI18n } from '../i18n'

interface Notification {
  id: number
  title: string
  desc: string
  time: string
  read: boolean
  group: string
}

const initialNotifications: Notification[] = [
  { id: 1, title: 'Application approved — INV-2024-001', desc: 'Your financing request has been approved', time: '2 hours ago', read: false, group: 'Today' },
  { id: 2, title: 'Payment reminder — Due in 3 days', desc: 'Installment #3 of 10,677', time: '5 hours ago', read: false, group: 'Today' },
  { id: 3, title: 'Document verified', desc: 'authorization-letter.pdf has been approved', time: '1 day ago', read: true, group: 'Yesterday' },
  { id: 4, title: 'Bank connection successful', desc: 'Al Rajhi Bank has been connected to your account', time: '2 days ago', read: true, group: 'Earlier' },
  { id: 5, title: 'Profile updated', desc: 'Your company information has been updated via Wathiq', time: '3 days ago', read: true, group: 'Earlier' },
]

const GROUP_KEYS: Record<string, string> = {
  'Today': 'notifications.today',
  'Yesterday': 'notifications.yesterday',
  'Earlier': 'notifications.earlier',
}

export default function Notifications() {
  const { theme } = useTheme()
  const { t, isRTL } = useI18n()
  const [searchParams] = useSearchParams()
  const stateParam = searchParams.get('state')
  const verified = stateParam === 'verified' || searchParams.get('verified') === 'true'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  // Group notifications
  const groups: string[] = []
  notifications.forEach((n) => {
    if (!groups.includes(n.group)) groups.push(n.group)
  })

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar verified={verified} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((c) => !c)} activeTab={undefined} />
      <main style={{
        marginLeft: isRTL ? 0 : (sidebarCollapsed ? 72 : 240),
        marginRight: isRTL ? (sidebarCollapsed ? 72 : 240) : 0,
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        flex: 1, minWidth: 0, overflow: 'hidden', minHeight: '100vh', background: theme.bgPrimary, padding: 0,
      }}>
        <div style={{ background: theme.bgPrimary, minHeight: '100vh', padding: '28px 32px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="inner-page-header"><Header /></div>

            {/* Header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textPrimary }}>{t('notifications.title')}</h2>
              <button
                onClick={markAllRead}
                style={{
                  fontSize: 13, fontWeight: 600, color: '#2563EB',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                }}
              >
                {t('notifications.markAllRead')}
              </button>
            </div>

            {/* Notification groups */}
            {groups.map((group, gi) => {
              const items = notifications.filter((n) => n.group === group)
              const groupKey = GROUP_KEYS[group] as keyof typeof GROUP_KEYS
              return (
                <div key={group}>
                  <p style={{
                    fontSize: 12, fontWeight: 600, color: theme.textMuted,
                    textTransform: 'uppercase', letterSpacing: 0.5,
                    marginBottom: 12, marginTop: gi === 0 ? 0 : 24,
                  }}>
                    {groupKey ? t(groupKey as any) : group}
                  </p>
                  {items.map((notification, i) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (gi * items.length + i) * 0.05, duration: 0.3, ease: 'easeOut' }}
                      style={{
                        background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 12,
                        padding: 16, marginBottom: 8,
                        display: 'flex', alignItems: 'center', gap: 14,
                        position: 'relative',
                      }}
                    >
                      {/* Unread dot */}
                      {!notification.read && (
                        <div style={{
                          width: 8, height: 8, borderRadius: '50%', background: '#2563EB',
                          flexShrink: 0,
                        }} />
                      )}
                      {notification.read && (
                        <div style={{ width: 8, flexShrink: 0 }} />
                      )}

                      {/* Icon */}
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%', background: '#EFF6FF',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <Bell size={16} color="#2563EB" />
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          fontSize: 14,
                          fontWeight: notification.read ? 500 : 600,
                          color: theme.textPrimary,
                          marginBottom: 2,
                        }}>
                          {notification.title}
                        </p>
                        <p style={{ fontSize: 13, color: theme.textSecondary }}>{notification.desc}</p>
                      </div>

                      {/* Time */}
                      <span style={{
                        fontSize: 12, color: theme.textMuted, flexShrink: 0, whiteSpace: 'nowrap',
                      }}>
                        {notification.time}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )
            })}
          </div>
          <Footer />
        </div>
      </main>
      <FloatingHelpButton />
      <MobileTabBar />
    </div>
  )
}
