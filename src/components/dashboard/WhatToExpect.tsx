import { ReviewTimeIcon, WhatWeCheckIcon, AfterApprovalIcon } from '../icons/InfoCardIcons'
import { ApplyFastIcon, FundsQuickIcon, ShariaIcon, NoCollateralIcon, SAMAIcon } from '../icons/TrustBadgeIcons'

const infoCards = [
  {
    Icon: ReviewTimeIcon,
    title: 'Review Time',
    body: "Most applications are reviewed within 1–2 business days. We'll notify you by email and in-app.",
  },
  {
    Icon: WhatWeCheckIcon,
    title: 'What We Check',
    body: 'We verify your business information, commercial registration, and banking details to ensure compliance.',
  },
  {
    Icon: AfterApprovalIcon,
    title: 'After Approval',
    body: 'Once approved, you can apply for financing immediately. Funds can be disbursed in as little as 24 hours.',
  },
]

const badges = [
  { Icon: ApplyFastIcon, label: 'Apply in minutes' },
  { Icon: FundsQuickIcon, label: 'Funds in 24 hours' },
  { Icon: ShariaIcon, label: 'Sharia-compliant' },
  { Icon: NoCollateralIcon, label: 'No collateral' },
  { Icon: SAMAIcon, label: 'SAMA regulated' },
]

export default function WhatToExpect() {
  return (
    <div style={cardStyle}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1E293B', margin: '0 0 20px' }}>
        What to Expect
      </h3>

      {/* 3 info cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {infoCards.map((c) => (
          <div key={c.title} style={infoCardStyle}>
            <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center' }}>
              <c.Icon size={40} />
            </div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: '#1E293B', margin: '0 0 6px' }}>
              {c.title}
            </h4>
            <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6, margin: 0 }}>
              {c.body}
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

const infoCardStyle: React.CSSProperties = {
  background: '#F8FAFC',
  border: '1px solid #E2E8F0',
  borderRadius: 10,
  padding: '20px 18px',
}
