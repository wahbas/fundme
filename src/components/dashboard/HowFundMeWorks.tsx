import { CompleteProfileIllust, ChooseProductIllust, GetFundedIllust } from '../icons/SpotIllustrations'
import { ApplyFastIcon, FundsQuickIcon, ShariaIcon, NoCollateralIcon, SAMAIcon } from '../icons/TrustBadgeIcons'
import { useTheme } from '../../ThemeContext'
import { useI18n } from '../../i18n'

export default function HowFundMeWorks() {
  const { theme } = useTheme()
  const { t } = useI18n()

  const processSteps = [
    {
      Illustration: CompleteProfileIllust,
      label: t('howItWorks.step1Num'),
      title: t('howItWorks.step1Title'),
      description: t('howItWorks.step1Desc'),
      color: '#2563EB',
    },
    {
      Illustration: ChooseProductIllust,
      label: t('howItWorks.step2Num'),
      title: t('howItWorks.step2Title'),
      description: t('howItWorks.step2Desc'),
      color: '#2563EB',
    },
    {
      Illustration: GetFundedIllust,
      label: t('howItWorks.step3Num'),
      title: t('howItWorks.step3Title'),
      description: t('howItWorks.step3Desc'),
      color: '#2563EB',
    },
  ]

  const badges = [
    { Icon: ApplyFastIcon, label: t('howItWorks.applyMinutes') },
    { Icon: FundsQuickIcon, label: t('howItWorks.funds24h') },
    { Icon: ShariaIcon, label: t('howItWorks.shariaCompliant') },
    { Icon: NoCollateralIcon, label: t('howItWorks.noCollateral') },
    { Icon: SAMAIcon, label: t('howItWorks.samaRegulated') },
  ]

  return (
    <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '20px 22px' }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: theme.textPrimary, margin: '0 0 24px' }}>
        {t('howItWorks.title')}
      </h3>

      {/* 3-step process */}
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 24, position: 'relative' }}>
        {processSteps.map((step, i) => (
          <div key={step.title} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
            {/* Connector line */}
            {i < processSteps.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  top: 40,
                  left: '60%',
                  right: '-40%',
                  height: 0,
                  borderTop: `2px dashed ${theme.border}`,
                  zIndex: 0,
                }}
              />
            )}

            {/* Arrow on connector */}
            {i < processSteps.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  top: 35,
                  right: '-4%',
                  zIndex: 1,
                  color: '#CBD5E1',
                  fontSize: 12,
                }}
              >
                &#9654;
              </div>
            )}

            {/* Illustration */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12, position: 'relative', zIndex: 1 }}>
              <step.Illustration size={80} />
            </div>

            {/* Step label */}
            <p style={{ fontSize: 10, fontWeight: 700, color: step.color, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: 1.5 }}>
              {step.label}
            </p>

            {/* Title */}
            <p style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary, margin: '0 0 4px' }}>
              {step.title}
            </p>

            {/* Description */}
            <p style={{ fontSize: 11, color: theme.textSecondary, margin: 0, lineHeight: 1.4, padding: '0 12px' }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: theme.border, marginBottom: 16 }} />

      {/* Trust badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {badges.map((b) => (
          <div
            key={b.label}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 14px',
              background: theme.bgPrimary,
              border: `1px solid ${theme.border}`,
              borderRadius: 8,
            }}
          >
            <b.Icon size={18} color="#2563EB" />
            <span style={{ fontSize: 12, fontWeight: 500, color: theme.textPrimary }}>{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// cardStyle moved inline to use theme
