import { CheckCircle2, ShieldCheck, Landmark, FileUp } from 'lucide-react'

const activities = [
  {
    icon: CheckCircle2,
    title: 'Account verification completed',
    description: 'All steps verified successfully',
    time: 'Today',
    color: '#22C55E',
  },
  {
    icon: Landmark,
    title: 'Bank account connected',
    description: 'Al Rajhi Bank linked and verified',
    time: 'Today',
    color: '#06B6D4',
  },
  {
    icon: FileUp,
    title: 'Documents uploaded',
    description: 'CR, VAT, bank statements verified',
    time: 'Today',
    color: '#0D82F9',
  },
  {
    icon: ShieldCheck,
    title: 'Account created',
    description: 'Welcome to FundMe, Ahmed!',
    time: 'Today',
    color: '#8B5CF6',
  },
]

export default function RecentActivity() {
  return (
    <section style={{ marginBottom: 20 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111', marginBottom: 16 }}>Recent Activity</h3>
      <div
        style={{
          background: '#fff',
          border: '1px solid #F0F0F0',
          borderRadius: 16,
          padding: '4px 24px',
        }}
      >
        {activities.map((a, i) => (
          <div
            key={a.title}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px 0',
              borderBottom: i < activities.length - 1 ? '1px solid #F0F0F0' : 'none',
            }}
          >
            {/* Timeline dot + line */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginRight: 14,
                flexShrink: 0,
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `${a.color}15`,
                }}
              >
                <a.icon size={18} color={a.color} />
              </div>
              {i < activities.length - 1 && (
                <div
                  style={{
                    width: 2,
                    height: 20,
                    background: '#E5E7EB',
                    position: 'absolute',
                    top: 38,
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                />
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 2 }}>{a.title}</h4>
              <p style={{ fontSize: 12, color: '#888' }}>{a.description}</p>
            </div>
            <span
              style={{
                fontSize: 12,
                color: a.color,
                fontWeight: 500,
                flexShrink: 0,
                padding: '3px 10px',
                background: `${a.color}10`,
                borderRadius: 6,
              }}
            >
              {a.time}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
