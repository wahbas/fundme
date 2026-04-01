import { useInvestorTheme } from '../InvestorThemeContext'
import { Moon, Sun, Settings } from 'lucide-react'

interface InvestorTopbarProps {
  userName?: string
  tier?: 'BASIC' | 'VIP'
}

export default function InvestorTopbar({ userName = 'Wahba', tier = 'BASIC' }: InvestorTopbarProps) {
  const { theme, isDark, toggleTheme } = useInvestorTheme()

  const tierBadgeBg = tier === 'VIP'
    ? theme.isDark
      ? 'rgba(212,168,67,0.15)'
      : 'rgba(212,168,67,0.1)'
    : theme.isDark
    ? 'rgba(13,130,249,0.15)'
    : 'rgba(13,130,249,0.1)'

  const tierBadgeColor = tier === 'VIP'
    ? theme.gold400
    : theme.blue

  const topbarBg = theme.isDark
    ? theme.topbarBg
    : theme.topbarBg
  const borderColor = theme.isDark
    ? 'rgba(255,255,255,0.06)'
    : theme.borderColor

  return (
    <header
      style={{
        gridColumn: '1 / -1',
        height: 80,
        background: topbarBg,
        borderBottom: `1px solid ${borderColor}`,
        display: 'grid',
        gridTemplateColumns: '190px 1fr auto',
        alignItems: 'center',
        paddingRight: 28,
        gap: 24,
        zIndex: 40,
        backdropFilter: theme.isDark ? 'blur(8px)' : 'none',
      }}
    >
      {/* Logo area (empty — sidebar has logo) */}
      <div style={{ borderRight: `1px solid ${borderColor}`, height: '100%', display: 'flex', alignItems: 'center' }} />

      {/* Welcome section */}
      <div>
        <p
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: theme.textHeading,
            margin: 0,
          }}
        >
          Welcome, <span style={{ fontWeight: 700 }}>{userName}</span>
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 6,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: tierBadgeColor,
              background: tierBadgeBg,
              padding: '4px 8px',
              borderRadius: 6,
              border: `1px solid ${tierBadgeColor}`,
            }}
          >
            {tier}
          </span>
          <span
            style={{
              fontSize: 12,
              color: theme.textSecondary,
            }}
          >
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Right actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          justifyContent: 'flex-end',
        }}
      >
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: `1px solid ${theme.borderColor}`,
            background: theme.isDark
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(0,0,0,0.02)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.isDark
              ? 'rgba(255,255,255,0.1)'
              : 'rgba(0,0,0,0.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme.isDark
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(0,0,0,0.02)'
          }}
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? (
            <Sun size={18} color={theme.textSecondary} />
          ) : (
            <Moon size={18} color={theme.textSecondary} />
          )}
        </button>

        {/* Settings */}
        <button
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: `1px solid ${theme.borderColor}`,
            background: theme.isDark
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(0,0,0,0.02)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.isDark
              ? 'rgba(255,255,255,0.1)'
              : 'rgba(0,0,0,0.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme.isDark
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(0,0,0,0.02)'
          }}
          title="Settings"
        >
          <Settings size={18} color={theme.textSecondary} />
        </button>

        {/* Profile pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 12px',
            borderRadius: 20,
            border: `1px solid ${theme.borderColor}`,
            background: theme.isDark
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(0,0,0,0.02)',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.isDark
              ? 'rgba(255,255,255,0.1)'
              : 'rgba(0,0,0,0.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme.isDark
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(0,0,0,0.02)'
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: theme.blue,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 11,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            A
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              minWidth: 0,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: theme.textPrimary,
                whiteSpace: 'nowrap',
              }}
            >
              Ahmed Wahba
            </span>
            <span
              style={{
                fontSize: 11,
                color: theme.textSecondary,
                whiteSpace: 'nowrap',
              }}
            >
              Investor
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
