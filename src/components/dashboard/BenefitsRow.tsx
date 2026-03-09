import { Zap, Percent, Calendar } from 'lucide-react'

const benefits = [
  {
    icon: Zap,
    title: 'Fast Approval',
    description: 'Get approved in as little as 24 hours',
    gradient: 'linear-gradient(135deg, #002E83, #0D82F9)',
  },
  {
    icon: Percent,
    title: 'Competitive Rates',
    description: 'Access rates starting from 5% APR',
    gradient: 'linear-gradient(135deg, #0D82F9, #06B6D4)',
  },
  {
    icon: Calendar,
    title: 'Flexible Terms',
    description: 'Choose repayment terms that work for you',
    gradient: 'linear-gradient(135deg, #06B6D4, #0D82F9)',
  },
]

export default function BenefitsRow() {
  return (
    <section style={{ marginBottom: 20 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111', marginBottom: 16 }}>Why Complete Setup?</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {benefits.map((b) => (
          <div
            key={b.title}
            style={{
              background: '#fff',
              border: '1px solid #F0F0F0',
              borderRadius: 16,
              padding: '28px 20px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 44, height: 44, borderRadius: '50%', margin: '0 auto 14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: b.gradient,
              }}
            >
              <b.icon size={22} color="#fff" />
            </div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: '#111', marginBottom: 6 }}>{b.title}</h4>
            <p style={{ fontSize: 12, color: '#888', lineHeight: 1.5 }}>{b.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
