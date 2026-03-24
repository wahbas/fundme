import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bell } from 'lucide-react'
import { useTheme } from '../ThemeContext'
import { useI18n } from '../i18n'

interface NotificationSheetProps {
  open: boolean
  onClose: () => void
}

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

export default function NotificationSheet({ open, onClose }: NotificationSheetProps) {
  const { theme } = useTheme()
  const { t } = useI18n()
  const [notifications, setNotifications] = useState(initialNotifications)

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const groups: string[] = []
  notifications.forEach((n) => {
    if (!groups.includes(n.group)) groups.push(n.group)
  })

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.35)',
              zIndex: 9998,
              backdropFilter: 'blur(3px)',
            }}
          />

          {/* Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="side-sheet"
            style={{
              position: 'fixed',
              top: 0, right: 0, bottom: 0,
              width: 420,
              maxWidth: '100%',
              background: theme.cardBg,
              boxShadow: '-8px 0 40px rgba(0,0,0,0.15)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: `1px solid ${theme.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: theme.textPrimary, margin: 0 }}>
                  {t('notifications.title')}
                </h2>
                {unreadCount > 0 && (
                  <span style={{
                    fontSize: 11, fontWeight: 700, background: '#2563EB', color: '#fff',
                    padding: '2px 8px', borderRadius: 10, minWidth: 20, textAlign: 'center',
                  }}>
                    {unreadCount}
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button
                  onClick={markAllRead}
                  style={{
                    fontSize: 12, fontWeight: 600, color: '#2563EB',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                  }}
                >
                  {t('notifications.markAllRead')}
                </button>
                <button
                  onClick={onClose}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}
                >
                  <X size={20} color="#64748B" />
                </button>
              </div>
            </div>

            {/* Notification list */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
              {groups.map((group, gi) => {
                const items = notifications.filter((n) => n.group === group)
                const groupKey = GROUP_KEYS[group]
                return (
                  <div key={group}>
                    <p style={{
                      fontSize: 11, fontWeight: 600, color: theme.textMuted,
                      textTransform: 'uppercase', letterSpacing: 0.5,
                      marginBottom: 10, marginTop: gi === 0 ? 0 : 20,
                    }}>
                      {groupKey ? t(groupKey as any) : group}
                    </p>
                    {items.map((notification, i) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.2 }}
                        style={{
                          background: notification.read ? 'transparent' : 'rgba(37,99,235,0.03)',
                          borderRadius: 12,
                          padding: '14px 12px',
                          marginBottom: 4,
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 12,
                          cursor: 'pointer',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = theme.bgHover }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = notification.read ? 'transparent' : 'rgba(37,99,235,0.03)' }}
                      >
                        {/* Icon */}
                        <div style={{
                          width: 34, height: 34, borderRadius: 10,
                          background: notification.read ? theme.bgPrimary : '#EFF6FF',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, marginTop: 2,
                        }}>
                          <Bell size={15} color={notification.read ? '#94A3B8' : '#2563EB'} />
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                            {!notification.read && (
                              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB', flexShrink: 0 }} />
                            )}
                            <p style={{
                              fontSize: 13,
                              fontWeight: notification.read ? 500 : 600,
                              color: theme.textPrimary,
                              margin: 0,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}>
                              {notification.title}
                            </p>
                          </div>
                          <p style={{ fontSize: 12, color: theme.textMuted, margin: 0 }}>{notification.desc}</p>
                          <p style={{ fontSize: 11, color: theme.textMuted, margin: '4px 0 0', opacity: 0.7 }}>{notification.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
