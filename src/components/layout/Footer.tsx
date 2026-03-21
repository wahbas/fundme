import { useTheme } from '../../ThemeContext'
import { useI18n } from '../../i18n'

export default function Footer() {
  const { theme } = useTheme()
  const { t, isRTL } = useI18n()

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
      <span>{t('footer.encryption')}</span>
    </footer>
  )
}
