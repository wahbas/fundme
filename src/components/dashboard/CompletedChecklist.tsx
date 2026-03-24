const completedItems = [
  'Account created',
  'Identity verified',
  'Business verified',
  'Bank connected',
  'Documents uploaded',
]

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="11" cy="11" r="9" fill="#10B981" />
      <path d="M7 11.5L10 14.5L15 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function CompletedChecklist() {
  return (
    <div style={cardStyle}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', margin: 0 }}>
          Profile Completed
        </h3>
        <span style={doneBadgeStyle}>All steps done</span>
      </div>

      {/* 2-column checklist grid */}
      <div className="loan-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {completedItems.map((item, i) => (
          <div
            key={item}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 0',
              fontSize: 14,
              color: '#1E293B',
              borderBottom: i < completedItems.length - 2 ? '1px solid #E2E8F0' : 'none',
              ...(i % 2 === 0 ? { paddingRight: 16 } : { paddingLeft: 16, borderLeft: '1px solid #E2E8F0' }),
            }}
          >
            <CheckIcon />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderRadius: 14,
  padding: '24px 28px',
}

const doneBadgeStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: '#10B981',
  background: '#D1FAE5',
  padding: '4px 12px',
  borderRadius: 12,
}
