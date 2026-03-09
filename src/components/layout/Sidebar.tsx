import {
  LayoutDashboard,
  FileText,
  Database,
  UserCircle,
  Settings2,
  Lock,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import logo from '../../assets/logo.png'

interface NavItemProps {
  icon: React.ElementType
  label: string
  active?: boolean
  locked?: boolean
  hasNotification?: boolean
  collapsed?: boolean
}

function NavItem({ icon: Icon, label, active, locked, hasNotification, collapsed }: NavItemProps) {
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
        fontWeight: 500,
        color: active ? '#80FF00' : locked ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.8)',
        background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
        cursor: locked ? 'not-allowed' : 'pointer',
        transition: 'background 0.15s, padding 0.3s, gap 0.3s',
        position: 'relative',
      }}
    >
      <Icon size={18} style={{ flexShrink: 0 }} />
      {!collapsed && (
        <span
          style={{
            flex: 1,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
      )}
      {!collapsed && locked && <Lock size={13} style={{ opacity: 0.4, flexShrink: 0 }} />}
      {hasNotification && (
        <span
          style={{
            width: 7,
            height: 7,
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
  const width = collapsed ? 64 : 200

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
        background: 'linear-gradient(180deg, #000814 0%, #001B4A 60%, #002E83 100%)',
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
              color: 'rgba(255,255,255,0.6)',
              transition: 'background 0.15s',
            }}
          >
            <ChevronsLeft size={16} />
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
              color: 'rgba(255,255,255,0.6)',
              transition: 'background 0.15s',
            }}
          >
            <ChevronsRight size={16} />
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
        <NavItem icon={LayoutDashboard} label="Home" active collapsed={collapsed} />
        <NavItem icon={FileText} label="My Loans" locked={!verified} collapsed={collapsed} />
        <NavItem icon={Database} label="Data Hub" locked={!verified} collapsed={collapsed} />
        <NavItem icon={UserCircle} label="My Profile" hasNotification collapsed={collapsed} />
      </nav>

      {/* Bottom */}
      <div style={{ padding: collapsed ? '0 8px 20px' : '0 12px 20px', transition: 'padding 0.3s' }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: 8, paddingTop: 8 }} />
        <NavItem icon={Settings2} label="Settings" collapsed={collapsed} />
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
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#80FF00',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000814',
              fontSize: 13,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            A
          </div>
          {!collapsed && (
            <span
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: 14,
                fontWeight: 500,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              Ahmed
            </span>
          )}
        </div>
      </div>
    </aside>
  )
}
