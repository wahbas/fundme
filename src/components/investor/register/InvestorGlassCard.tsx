import { useInvestorTheme } from '../InvestorThemeContext'

interface Props {
  children: React.ReactNode
  style?: React.CSSProperties
  hoverable?: boolean
  selected?: boolean
  onClick?: () => void
  padding?: number | string
}

export default function InvestorGlassCard({
  children,
  style,
  hoverable,
  selected,
  onClick,
  padding = 32,
}: Props) {
  const { theme } = useInvestorTheme()

  return (
    <div
      onClick={onClick}
      style={{
        background: theme.cardBg,
        border: `1.5px solid ${selected ? theme.blue : theme.cardBorder}`,
        borderRadius: theme.cardRadius,
        backdropFilter: theme.cardBlur,
        boxShadow: selected
          ? `0 0 24px rgba(13,130,249,0.15)`
          : theme.cardShadow,
        position: 'relative',
        transition: 'border-color 0.25s, box-shadow 0.3s, transform 0.2s',
        padding,
        cursor: onClick ? 'pointer' : undefined,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (hoverable && !selected) {
          e.currentTarget.style.borderColor = 'rgba(13,130,249,0.3)'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable && !selected) {
          e.currentTarget.style.borderColor = theme.cardBorder
          e.currentTarget.style.transform = 'translateY(0)'
        }
      }}
    >
      {children}
    </div>
  )
}
