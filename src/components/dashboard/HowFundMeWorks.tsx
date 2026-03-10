import { CompleteProfileIllust, ChooseProductIllust, GetFundedIllust } from '../icons/SpotIllustrations'
import { ApplyFastIcon, FundsQuickIcon, ShariaIcon, NoCollateralIcon, SAMAIcon } from '../icons/TrustBadgeIcons'

const processSteps = [
  {
    Illustration: CompleteProfileIllust,
    label: 'STEP 1',
    title: 'Complete your profile',
    description: 'Verify your identity & business',
    color: '#2563EB',
  },
  {
    Illustration: ChooseProductIllust,
    label: 'STEP 2',
    title: 'Choose a product',
    description: 'Pick the financing that fits your needs',
    color: '#2563EB',
  },
  {
    Illustration: GetFundedIllust,
    label: 'STEP 3',
    title: 'Get funded',
    description: 'Receive funds in as little as 24 hours',
    color: '#2563EB',
  },
]

const badges = [
  { Icon: ApplyFastIcon, label: 'Apply in minutes' },
  { Icon: FundsQuickIcon, label: 'Funds in 24 hours' },
  { Icon: ShariaIcon, label: 'Sharia-compliant' },
  { Icon: NoCollateralIcon, label: 'No collateral' },
  { Icon: SAMAIcon, label: 'SAMA regulated' },
]

export default function HowFundMeWorks() {
  return (
    <div style={cardStyle}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1E293B', margin: '0 0 24px' }}>
        How FundMe Works
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
                  borderTop: '2px dashed #E2E8F0',
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
            <p style={{ fontSize: 13, fontWeight: 600, color: '#1E293B', margin: '0 0 4px' }}>
              {step.title}
            </p>

            {/* Description */}
            <p style={{ fontSize: 11, color: '#64748B', margin: 0, lineHeight: 1.4, padding: '0 12px' }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#E2E8F0', marginBottom: 16 }} />

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
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: 8,
            }}
          >
            <b.Icon size={18} color="#2563EB" />
            <span style={{ fontSize: 12, fontWeight: 500, color: '#1E293B' }}>{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderRadius: 12,
  padding: '20px 22px',
}
