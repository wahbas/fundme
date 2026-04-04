import { motion } from 'framer-motion'
import { useInvestorTheme } from '../InvestorThemeContext'

interface Props {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  style?: React.CSSProperties
}

export default function InvestorButton({
  children,
  onClick,
  variant = 'primary',
  loading,
  disabled,
  fullWidth = true,
  icon,
  style,
}: Props) {
  const { theme, isDark } = useInvestorTheme()
  const isDisabled = disabled || loading

  const base: React.CSSProperties = {
    height: 52,
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: fullWidth ? '100%' : 'auto',
    padding: fullWidth ? undefined : '0 28px',
    opacity: isDisabled ? 0.5 : 1,
    transition: 'opacity 0.2s, box-shadow 0.2s',
  }

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, #0D82F9 0%, #0668CC 100%)',
      color: '#fff',
      boxShadow: '0 4px 16px rgba(13,130,249,0.25)',
    },
    secondary: {
      background: 'transparent',
      color: theme.textPrimary,
      border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
    },
    ghost: {
      background: 'transparent',
      color: theme.textSecondary,
      border: 'none',
    },
  }

  return (
    <motion.button
      whileHover={isDisabled ? undefined : { scale: 1.01 }}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
      onClick={isDisabled ? undefined : onClick}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            border: `3px solid ${variant === 'primary' ? 'rgba(255,255,255,0.3)' : 'rgba(13,130,249,0.2)'}`,
            borderTopColor: variant === 'primary' ? '#fff' : '#0D82F9',
          }}
        />
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </motion.button>
  )
}
