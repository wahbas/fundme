import { useNavigate, useLocation } from 'react-router-dom'
import { useInvestorTheme } from '../InvestorThemeContext'
import logo from '../../../assets/logo.png'
import {
  LayoutGridIcon,
  TrendingUpIcon,
  BriefcaseIcon,
  WalletIcon,
  GiftIcon,
} from 'lucide-react'

interface InvestorSidebarProps {
  activeTab?: 'dashboard' | 'opportunities' | 'portfolio' | 'wallet'
}

interface NavItemProps {
  icon: React.ComponentType<{ size?: number; color?: string }>
  label: string
  badge?: number
  active?: boolean
  onClick?: () => void
}

function NavItem({ icon: Icon, label, badge, active, onClick }: NavItemProps) {
  const { theme } = useInvestorTheme()

  const bgColor = active
    ? theme.navActiveBg
    : 'transparent'
  const textColor = active
    ? theme.navActiveText
    : theme.navText

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 16px',
        borderRadius: 10,
        fontSize: 14,
        fontWeight: active ? 600 : 500,
        color: textColor,
        background: bgColor,
        cursor: 'pointer',
        transition: 'background 0.15s, color 0.15s',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = theme.navHoverBg
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'transparent'
        }
      }}
    >
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={20} color={textColor} />
      </div>
      <span style={{ flex: 1, overflow: 'hidden', whiteSpace: 'nowrap' }}>
        {label}
      </span>
      {badge !== undefined && badge > 0 && (
        <span
          style={{
            minWidth: '24px',
            height: '24px',
            borderRadius: '12px',
            background: theme.blue,
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {badge}
        </span>
      )}
    </div>
  )
}

export default function InvestorSidebar({ activeTab }: InvestorSidebarProps) {
  const { theme } = useInvestorTheme()
  const navigate = useNavigate()
  const location = useLocation()

  function getActive(tab: 'dashboard' | 'opportunities' | 'portfolio' | 'wallet'): boolean {
    if (activeTab) return activeTab === tab
    const path = location.pathname
    if (tab === 'dashboard') return path === '/investor'
    if (tab === 'opportunities') return path === '/investor/opportunities'
    if (tab === 'portfolio') return path === '/investor/portfolio'
    if (tab === 'wallet') return path === '/investor/wallet'
    return false
  }

  // Determine sidebar styling based on theme
  const sidebarBg = theme.isDark
    ? 'transparent'
    : theme.sidebarBg
  const sidebarBorder = theme.isDark
    ? 'rgba(255,255,255,0.06)'
    : theme.borderColor
  return (
    <aside
      style={{
        width: 190,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        background: sidebarBg,
        borderRight: `1px solid ${sidebarBorder}`,
        zIndex: 50,
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '24px 16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: `1px solid ${sidebarBorder}`,
        }}
      >
        <img
          src={logo}
          alt="FundMe"
          style={{
            width: 64,
            height: 'auto',
          }}
        />
      </div>

      {/* Primary Nav */}
      <nav
        style={{
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          flex: 1,
          overflow: 'auto',
        }}
      >
        <NavItem
          icon={LayoutGridIcon}
          label="Dashboard"
          active={getActive('dashboard')}
          onClick={() => navigate('/investor')}
        />
        <NavItem
          icon={TrendingUpIcon}
          label="Opportunities"
          badge={3}
          active={getActive('opportunities')}
          onClick={() => navigate('/investor/opportunities')}
        />
        <NavItem
          icon={BriefcaseIcon}
          label="Portfolio"
          active={getActive('portfolio')}
          onClick={() => navigate('/investor/portfolio')}
        />
        <NavItem
          icon={WalletIcon}
          label="Wallet"
          active={getActive('wallet')}
          onClick={() => navigate('/investor/wallet')}
        />
      </nav>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Refer & Earn Widget */}
      <div
        style={{
          padding: '16px 12px 20px',
          borderTop: `1px solid ${sidebarBorder}`,
        }}
      >
        <div
          style={{
            background: theme.isDark
              ? 'rgba(13,130,249,0.1)'
              : 'rgba(13,130,249,0.05)',
            borderRadius: 12,
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            border: `1px solid ${theme.borderColor}`,
          }}
        >
          <div
            style={{
              fontSize: 28,
            }}
          >
            <GiftIcon size={24} color={theme.blue} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: theme.textPrimary,
                marginBottom: 2,
              }}
            >
              Refer & Earn
            </p>
            <p
              style={{
                fontSize: 12,
                color: theme.textSecondary,
                marginBottom: 8,
              }}
            >
              SAR 500 each
            </p>
          </div>
          <button
            style={{
              width: '100%',
              padding: '8px 12px',
              background: theme.blue,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
            }}
          >
            Share Invite Link
          </button>
        </div>
      </div>
    </aside>
  )
}
