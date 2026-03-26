import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
// Sun, Moon moved to Sidebar
import { NotificationBellIcon, PlusIcon } from '../icons/WidgetIcons'
import { useTheme } from '../../ThemeContext'
import NotificationSheet from '../NotificationSheet'
import { useI18n } from '../../i18n'

export default function Header({ showNewLoanButton = false, showVerifiedLoanButton = false }: { showNewLoanButton?: boolean; showVerifiedLoanButton?: boolean }) {
  const { theme } = useTheme()
  const navigate = useNavigate()
  const { t, isRTL } = useI18n()
  const [notifOpen, setNotifOpen] = useState(false)

  function getGreeting() {
    const hour = new Date().getHours()
    if (hour < 12) return t('header.goodMorning')
    if (hour < 17) return t('header.goodAfternoon')
    return t('header.goodEvening')
  }

  function getFormattedDate() {
    return new Date().toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <>
    <header className="app-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'nowrap', gap: 12 }}>
      <div className="app-header-greeting" style={{ minWidth: 0 }}>
        <h1 className="app-header-title" style={{ fontSize: 22, fontWeight: 700, color: theme.textHeading }}>
          {getGreeting()}, Ahmed
        </h1>
        <p style={{ fontSize: 12, color: theme.textSecondary, fontWeight: 400, marginTop: 2 }}>{getFormattedDate()}</p>
      </div>
      <div className="app-header-actions" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div className="header-notif-btn" onClick={() => setNotifOpen(true)} style={{ ...iconBtn, position: 'relative', cursor: 'pointer' }}>
          <NotificationBellIcon size={20} color="#64748B" />
          <span
            style={{
              position: 'absolute', top: 4, right: 4,
              width: 16, height: 16, borderRadius: '50%',
              background: '#EF4444', color: '#fff',
              fontSize: 9, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >2</span>
        </div>
        {showNewLoanButton && (
          <motion.button
            className="header-loan-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/onboarding')}
            style={{
              padding: '8px 18px',
              background: '#2563EB',
              color: '#fff',
              fontWeight: 700,
              fontSize: 13,
              borderRadius: 10,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <PlusIcon size={14} color="#fff" />
            <span className="header-loan-btn-text">{t('header.newLoanRequest')}</span>
          </motion.button>
        )}
        {showVerifiedLoanButton && (
          <motion.button
            className="header-loan-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/request-financing')}
            style={{
              padding: '8px 18px',
              background: '#2563EB',
              color: '#fff',
              fontWeight: 700,
              fontSize: 13,
              borderRadius: 10,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <PlusIcon size={14} color="#fff" />
            <span className="header-loan-btn-text">{t('header.newLoanRequest')}</span>
          </motion.button>
        )}
      </div>
    </header>
    <NotificationSheet open={notifOpen} onClose={() => setNotifOpen(false)} />
    </>
  )
}

const iconBtn: React.CSSProperties = {
  width: 36, height: 36, borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
}
