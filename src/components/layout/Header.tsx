import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DownloadIcon, NotificationBellIcon, DarkModeIcon, PlusIcon } from '../icons/WidgetIcons'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function getFormattedDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function Header({ showNewLoanButton = false, disableNewLoanButton = false }: { showNewLoanButton?: boolean; disableNewLoanButton?: boolean }) {
  const navigate = useNavigate()

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B' }}>
          {getGreeting()}, Ahmed
        </h1>
        <p style={{ fontSize: 12, color: '#64748B', fontWeight: 400, marginTop: 2 }}>{getFormattedDate()}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {showNewLoanButton && (
          <motion.button
            whileHover={disableNewLoanButton ? {} : { scale: 1.03 }}
            whileTap={disableNewLoanButton ? {} : { scale: 0.97 }}
            onClick={() => !disableNewLoanButton && navigate('/onboarding')}
            title={disableNewLoanButton ? 'Available after approval' : undefined}
            style={{
              padding: '8px 18px',
              background: '#7CFF01',
              color: '#1E293B',
              fontWeight: 700,
              fontSize: 13,
              borderRadius: 20,
              border: 'none',
              cursor: disableNewLoanButton ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginRight: 8,
              opacity: disableNewLoanButton ? 0.5 : 1,
            }}
          >
            <PlusIcon size={14} color="#1E293B" />
            New Loan Request
          </motion.button>
        )}
        <div style={iconBtn}><DownloadIcon size={20} color="#64748B" /></div>
        <div style={{ ...iconBtn, position: 'relative' }}>
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
        <div style={iconBtn}><DarkModeIcon size={20} color="#64748B" /></div>
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
  )
}

const iconBtn: React.CSSProperties = {
  width: 36, height: 36, borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
}
