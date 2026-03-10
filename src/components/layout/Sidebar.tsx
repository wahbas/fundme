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
import logo from '../../assets/logo.png'

interface NavItemProps {
  icon: React.ComponentType<{ size?: number; color?: string }>
  label: string
  active?: boolean
  locked?: boolean
  hasNotification?: boolean
  collapsed?: boolean
}

function NavItem({ icon: Icon, label, active, locked, hasNotification, collapsed }: NavItemProps) {
  const color = active ? '#FFFFFF' : locked ? '#94A3B8' : '#CBD5E1'

  return (
    <div
      title={collapsed ? label : undefined}
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
        borderLeft: active ? '3px solid #2563EB' : '3px solid transparent',
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

interface SidebarProps {
  verified?: boolean
  collapsed?: boolean
  onToggle?: () => void
}

export default function Sidebar({ verified = false, collapsed = false, onToggle }: SidebarProps) {
  const width = collapsed ? 72 : 240

  return (
    <aside
      style={{
        width,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        background: '#1B2A3D',
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
              background: 'rgba(255,255,255,0.08)',
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
              background: 'rgba(255,255,255,0.08)',
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

      {/* Nav */}
      <nav
        style={{
          padding: collapsed ? '0 8px' : '0 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          flex: 1,
          transition: 'padding 0.3s',
        }}
      >
        <NavItem icon={HomeIcon} label="Home" active collapsed={collapsed} />
        <NavItem icon={LoansIcon} label="My Loans" locked={!verified} collapsed={collapsed} />
        <NavItem icon={DataHubIcon} label="Data Hub" locked={!verified} collapsed={collapsed} />
        <NavItem icon={ProfileIcon} label="My Profile" hasNotification collapsed={collapsed} />
      </nav>

      {/* Bottom */}
      <div style={{ padding: collapsed ? '0 8px 20px' : '0 12px 20px', transition: 'padding 0.3s' }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: 8, paddingTop: 8 }} />
        <NavItem icon={HelpSupportIcon} label="Help & Support" collapsed={collapsed} />
        <NavItem icon={SettingsIcon} label="Settings" collapsed={collapsed} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: collapsed ? 0 : 10,
            padding: collapsed ? '12px 0' : '12px 16px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            marginTop: 4,
            transition: 'padding 0.3s, gap 0.3s',
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: '#7CFF01',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1B2A3D',
              fontSize: 13,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            A
          </div>
          {!collapsed && (
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <span style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 600, display: 'block' }}>
                Ahmed
              </span>
              <span style={{ color: '#94A3B8', fontSize: 11 }}>First-time user</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
