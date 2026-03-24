import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { NotificationBellIcon, PlusIcon } from '../icons/WidgetIcons'
import { useTheme } from '../../ThemeContext'
import NotificationSheet from '../NotificationSheet'
import { useI18n } from '../../i18n'

export default function Header({ showNewLoanButton = false, showVerifiedLoanButton = false }: { showNewLoanButton?: boolean; showVerifiedLoanButton?: boolean }) {
  const { theme, isDark, toggleTheme } = useTheme()
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
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
      <div>
        <h1 style={{ fontSize: showVerifiedLoanButton ? 26 : 20, fontWeight: 700, color: theme.textHeading }}>
          {getGreeting()}, Ahmed
        </h1>
        <p style={{ fontSize: 12, color: theme.textSecondary, fontWeight: 400, marginTop: 2 }}>{getFormattedDate()}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {showNewLoanButton && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/onboarding')}
            style={{
              padding: '8px 18px',
              background: '#2563EB',
              color: '#fff',
              fontWeight: 700,
              fontSize: 13,
              borderRadius: 20,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginRight: 8,
            }}
          >
            <PlusIcon size={14} color="#fff" />
            {t('header.newLoanRequest')}
          </motion.button>
        )}
        {showVerifiedLoanButton && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/request-financing')}
            style={{
              padding: '8px 18px',
              background: '#2563EB',
              color: '#fff',
              fontWeight: 700,
              fontSize: 13,
              borderRadius: 20,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginRight: 8,
            }}
          >
            <PlusIcon size={14} color="#fff" />
            {t('header.newLoanRequest')}
          </motion.button>
        )}
        {/* Dark/Light mode toggle */}
        <div
          onClick={toggleTheme}
          style={{
            ...iconBtn,
            background: isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} color="#64748B" />}
        </div>

        <div onClick={() => setNotifOpen(true)} style={{ ...iconBtn, position: 'relative', cursor: 'pointer' }}>
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
        <div
          style={{
            width: 36, height: 36, borderRadius: '50%',
            background: '#1B2A3D', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 600, marginLeft: 4,
          }}
        >A</div>
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
