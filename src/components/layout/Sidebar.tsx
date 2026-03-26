import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../../ThemeContext'
import { useI18n } from '../../i18n'
import ContactSupportModal from '../dashboard/ContactSupportModal'
import {
  HomeIcon,
  LoansIcon,
  DataHubIcon,
  ProfileIcon,
  HelpSupportIcon,
  SettingsIcon,
  LockIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from '../icons/NavIcons'
import { LogOut, ArrowLeftRight, MoreVertical } from 'lucide-react'
import logo from '../../assets/logo.png'

interface NavItemProps {
  icon: React.ComponentType<{ size?: number; color?: string }>
  label: string
  active?: boolean
  locked?: boolean
  hasNotification?: boolean
  collapsed?: boolean
  isRTL?: boolean
  onClick?: () => void
}

function NavItem({ icon: Icon, label, active, locked, hasNotification, collapsed, isRTL, onClick }: NavItemProps) {
  const color = active ? '#FFFFFF' : locked ? '#94A3B8' : '#CBD5E1'

  return (
    <div
      title={collapsed ? label : undefined}
      onClick={locked ? undefined : onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: collapsed ? 0 : 12,
        padding: collapsed ? '10px 0' : '10px 16px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        borderRadius: 10,
        fontSize: 14,
        fontWeight: active ? 600 : 500,
        color,
        background: active ? 'rgba(37,99,235,0.12)' : 'transparent',
        borderLeft: isRTL ? '3px solid transparent' : (active ? '3px solid #2563EB' : '3px solid transparent'),
        borderRight: isRTL ? (active ? '3px solid #2563EB' : '3px solid transparent') : 'none',
        cursor: locked ? 'not-allowed' : 'pointer',
        transition: 'background 0.15s, padding 0.3s, gap 0.3s',
        position: 'relative',
      }}
    >
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={20} color={color} />
      </div>
      {!collapsed && (
        <span style={{ flex: 1, overflow: 'hidden', whiteSpace: 'nowrap' }}>
          {label}
        </span>
      )}
      {!collapsed && locked && (
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <LockIcon size={13} color="#94A3B8" />
        </div>
      )}
      {hasNotification && (
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: '50%',
            background: '#EF4444',
            flexShrink: 0,
            position: collapsed ? 'absolute' : 'static',
            top: collapsed ? 6 : undefined,
            right: collapsed ? 6 : undefined,
          }}
        />
      )}
    </div>
  )
}

export type ActiveTab = 'home' | 'my-loans' | 'data-hub' | 'profile'

interface SidebarProps {
  verified?: boolean
  collapsed?: boolean
  onToggle?: () => void
  activeTab?: ActiveTab
}

export default function Sidebar({ verified = false, collapsed = false, onToggle, activeTab }: SidebarProps) {
  const { theme } = useTheme()
  const { t, isRTL } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()
  const [supportOpen, setSupportOpen] = useState(false)
  const width = collapsed ? 72 : 240
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (bottomRef.current && !bottomRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Determine active tab from prop or URL
  const stateParam = new URLSearchParams(location.search).get('state')
  const query = verified || stateParam === 'verified' ? '?state=verified' : ''

  function getActive(tab: ActiveTab): boolean {
    if (activeTab) return activeTab === tab
    const path = location.pathname
    if (tab === 'home') return path === '/dashboard'
    if (tab === 'my-loans') return path === '/my-loans'
    if (tab === 'data-hub') return path === '/data-hub'
    if (tab === 'profile') return path === '/profile'
    return false
  }

  return (
    <>
    <aside
      style={{
        width,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        background: theme.sidebarBg,
        zIndex: 50,
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
      }}
    >
      {/* Logo + Toggle */}
      <div
        style={{
          padding: collapsed ? '24px 0 32px' : '24px 20px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          transition: 'padding 0.3s',
        }}
      >
        <img
          src={logo}
          alt="FundMe"
          style={{
            width: collapsed ? 36 : 80,
            height: 'auto',
            transition: 'width 0.3s',
          }}
        />
        {!collapsed && onToggle && (
          <button
            onClick={onToggle}
            style={{
              background: theme.sidebarHover,
              border: 'none',
              borderRadius: 8,
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <ChevronsLeftIcon size={16} />
          </button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {collapsed && onToggle && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <button
            onClick={onToggle}
            style={{
              background: theme.sidebarHover,
              border: 'none',
              borderRadius: 8,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <ChevronsRightIcon size={16} />
          </button>
        </div>
      )}

      {/* Primary Nav */}
      <nav
        style={{
          padding: collapsed ? '0 8px' : '0 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          transition: 'padding 0.3s',
        }}
      >
        <NavItem icon={HomeIcon} label={t('nav.home')} active={getActive('home')} collapsed={collapsed} isRTL={isRTL} onClick={() => navigate(`/dashboard${query}`)} />
        <NavItem icon={LoansIcon} label={t('nav.myLoans')} locked={!verified} active={getActive('my-loans')} collapsed={collapsed} isRTL={isRTL} onClick={() => navigate(`/my-loans${query}`)} />
        <NavItem icon={DataHubIcon} label={t('nav.dataHub')} locked={!verified} active={getActive('data-hub')} collapsed={collapsed} isRTL={isRTL} onClick={() => navigate(`/data-hub${query}`)} />
        <NavItem icon={ProfileIcon} label={t('nav.myProfile')} hasNotification active={getActive('profile')} collapsed={collapsed} isRTL={isRTL} onClick={() => navigate(`/profile${query}`)} />
      </nav>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Bottom utility items */}
      <div ref={bottomRef} style={{ padding: collapsed ? '0 8px 12px' : '0 12px 12px', transition: 'padding 0.3s', position: 'relative' }}>
        {/* Utility nav — subtle styling */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 8 }}>
          <div
            title={collapsed ? t('nav.helpSupport') : undefined}
            onClick={() => setSupportOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 12,
              padding: collapsed ? '8px 0' : '8px 12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              borderRadius: 8, fontSize: 13, fontWeight: 500, color: 'rgba(203,213,225,0.55)',
              cursor: 'pointer', transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <HelpSupportIcon size={18} color="rgba(203,213,225,0.45)" />
            {!collapsed && <span>{t('nav.help' as any) || 'Help'}</span>}
          </div>
          <div
            title={collapsed ? t('nav.settings') : undefined}
            onClick={() => navigate(`/settings${query}`)}
            style={{
              display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 12,
              padding: collapsed ? '8px 0' : '8px 12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              borderRadius: 8, fontSize: 13, fontWeight: 500, color: 'rgba(203,213,225,0.55)',
              cursor: 'pointer', transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <SettingsIcon size={18} color="rgba(203,213,225,0.45)" />
            {!collapsed && <span>{t('nav.settings')}</span>}
          </div>
        </div>

        {/* User strip divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: collapsed ? '0' : '0 4px', marginBottom: 8 }} />

        {/* Profile switcher dropdown */}
        {profileMenuOpen && !collapsed && (
          <div style={{
            position: 'absolute', bottom: 64, left: 12, right: 12,
            background: '#243447', borderRadius: 12, padding: 8,
            boxShadow: '0 -4px 16px rgba(0,0,0,0.3)', zIndex: 10,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
              borderRadius: 8, background: 'rgba(37,99,235,0.15)', marginBottom: 4,
            }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#7CFF01', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1B2A3D', fontSize: 11, fontWeight: 700 }}>A</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Ahmed Al-Rashid</p>
                <p style={{ fontSize: 11, color: '#94A3B8' }}>Al-Majd Trading Company</p>
              </div>
              <span style={{ color: '#7CFF01', fontSize: 14 }}>✓</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700 }}>F</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, color: '#CBD5E1' }}>Faisal Al-Otaibi</p>
                <p style={{ fontSize: 11, color: '#64748B' }}>Gulf Services Co.</p>
              </div>
            </div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '4px 0' }} />
            <div
              onClick={() => navigate('/login')}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <LogOut size={16} color="#EF4444" />
              <p style={{ fontSize: 13, fontWeight: 500, color: '#EF4444' }}>{t('nav.signOut')}</p>
            </div>
          </div>
        )}

        {/* User strip */}
        <div
          onClick={() => setProfileMenuOpen(p => !p)}
          style={{
            display: 'flex', alignItems: 'center',
            gap: collapsed ? 0 : 10,
            padding: collapsed ? '8px 0' : '8px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            cursor: 'pointer', borderRadius: 8,
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{
            width: 30, height: 30, borderRadius: '50%', background: '#7CFF01',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#1B2A3D', fontSize: 11, fontWeight: 700, flexShrink: 0,
          }}>A</div>
          {!collapsed && (
            <div style={{ overflow: 'hidden', flex: 1, minWidth: 0 }}>
              <span style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 600, display: 'block', whiteSpace: 'nowrap' }}>Ahmed</span>
              <span style={{ color: '#64748B', fontSize: 11, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>ahmed@fundme.sa</span>
            </div>
          )}
          {!collapsed && (
            <MoreVertical size={16} color="#64748B" style={{ flexShrink: 0 }} />
          )}
        </div>
      </div>
    </aside>
    <ContactSupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />
    </>
  )
}
