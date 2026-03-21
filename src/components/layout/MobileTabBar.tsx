import { useNavigate, useLocation } from 'react-router-dom'
import { Home, CreditCard, FolderOpen, User, Settings } from 'lucide-react'
import { useI18n } from '../../i18n'

const tabs = [
  { icon: Home, labelKey: 'nav.home' as const, path: '/dashboard' },
  { icon: CreditCard, labelKey: 'nav.myLoans' as const, path: '/my-loans' },
  { icon: FolderOpen, labelKey: 'nav.dataHub' as const, path: '/data-hub' },
  { icon: User, labelKey: 'nav.myProfile' as const, path: '/profile' },
  { icon: Settings, labelKey: 'nav.settings' as const, path: '/settings' },
]

export default function MobileTabBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useI18n()

  const stateParam = new URLSearchParams(location.search).get('state')
  const query = stateParam === 'verified' ? '?state=verified' : ''

  return (
    <nav className="mobile-tab-bar">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path ||
          (tab.path === '/dashboard' && location.pathname === '/dashboard')
        return (
          <button
            key={tab.path}
            onClick={() => navigate(`${tab.path}${query}`)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              padding: '8px 12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              minWidth: 56,
            }}
          >
            <tab.icon
              size={20}
              color={isActive ? '#2563EB' : '#94A3B8'}
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span style={{
              fontSize: 10,
              fontWeight: isActive ? 700 : 500,
              color: isActive ? '#2563EB' : '#94A3B8',
            }}>
              {t(tab.labelKey)}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
