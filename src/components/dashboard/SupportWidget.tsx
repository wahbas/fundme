import { motion } from 'framer-motion'
import { AccountManagerIcon, PhoneIcon, EmailIcon, CalendarIcon, VideoIcon, ChatIcon } from '../icons/SupportIcons'
import { ArrowRightIcon } from '../icons/WidgetIcons'
import { useTheme } from '../../ThemeContext'
import { useI18n } from '../../i18n'

export default function SupportWidget() {
  const { theme } = useTheme()
  const { t } = useI18n()
  return (
    <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '20px 22px' }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: theme.textPrimary, margin: '0 0 16px' }}>
        {t('support.yourSupport')}
      </h3>

      {/* Account Manager */}
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 10, fontWeight: 600, color: '#94A3B8', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 1 }}>
          {t('support.yourAccountManager')}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <AccountManagerIcon size={36} />
          </div>
          <h4 style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary, margin: 0 }}>Ahmed Al-Mansour</h4>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: theme.textSecondary }}>
            <PhoneIcon size={16} color={theme.textMuted} />
            +966 12 345 6789
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: theme.textSecondary }}>
            <EmailIcon size={16} color={theme.textMuted} />
            ahmed.almansour@fundme.sa
          </div>
        </div>

        <motion.button
          whileHover={{ background: '#F1F5F9' }}
          style={{
            width: '100%',
            padding: '8px 0',
            background: theme.cardBg,
            color: '#2563EB',
            border: '1px solid #2563EB',
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            cursor: 'pointer',
          }}
        >
          <CalendarIcon size={14} color="#2563EB" />
          {t('support.scheduleCall')}
          <ArrowRightIcon size={14} color="#2563EB" />
        </motion.button>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: theme.border, marginBottom: 16 }} />

      {/* Quick actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <motion.button
          whileHover={{ background: theme.bgHover }}
          style={{
            padding: '14px 16px',
            background: theme.bgPrimary,
            borderRadius: 10,
            border: `1px solid ${theme.borderLight}`,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            textAlign: 'left',
          }}
        >
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <VideoIcon size={20} color="#2563EB" />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary, margin: 0 }}>{t('support.watchVideo')}</p>
            <p style={{ fontSize: 11, color: theme.textMuted, margin: 0 }}>{t('support.seeHow')}</p>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ background: theme.bgHover }}
          style={{
            padding: '14px 16px',
            background: theme.bgPrimary,
            borderRadius: 10,
            border: `1px solid ${theme.borderLight}`,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            textAlign: 'left',
          }}
        >
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <ChatIcon size={20} color="#2563EB" />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary, margin: 0 }}>{t('support.contactSupport')}</p>
            <p style={{ fontSize: 11, color: theme.textMuted, margin: 0 }}>{t('support.chatWithTeam')}</p>
          </div>
        </motion.button>
      </div>
    </div>
  )
}

// cardStyle moved inline to use theme
