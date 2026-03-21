import { useTheme } from '../../ThemeContext'

export default function Footer() {
  const { theme } = useTheme()

  return (
    <footer
      style={{
        marginTop: 40,
        padding: '20px 80px 20px 32px',
        borderTop: `1px solid ${theme.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 13,
        color: theme.textMuted,
      }}
    >
      <span>&copy; 2025 FundMe. All rights reserved.</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <a href="#" style={{ color: theme.textSecondary, textDecoration: 'none' }}>Terms and Conditions</a>
        <span style={{ color: theme.borderLight }}>|</span>
        <a href="#" style={{ color: theme.textSecondary, textDecoration: 'none' }}>Privacy Policy</a>
        <span style={{ color: theme.borderLight }}>|</span>
        <a href="#" style={{ color: theme.textSecondary, textDecoration: 'none' }}>Support</a>
      </div>
    </footer>
  )
}
