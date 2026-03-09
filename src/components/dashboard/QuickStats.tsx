import { Wallet, TrendingUp, Banknote, FileText } from 'lucide-react'

const stats = [
  { icon: Wallet, label: 'Total Financed', value: '500,000', sub: 'SAR', color: '#0D82F9', bg: '#EFF6FF' },
  { icon: Banknote, label: 'Outstanding', value: '125,000', sub: 'SAR', color: '#F59E0B', bg: '#FFFBEB' },
  { icon: TrendingUp, label: 'Financings', value: '3', sub: 'Active', color: '#22C55E', bg: '#F0FDF4' },
  { icon: FileText, label: 'Documents', value: '4/4', sub: 'Verified', color: '#8B5CF6', bg: '#F5F3FF' },
]

export default function QuickStats() {
  return (
    <section style={{ marginBottom: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: '#fff',
              border: '1px solid #F0F0F0',
              borderRadius: 12,
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: s.bg,
                flexShrink: 0,
              }}
            >
              <s.icon size={18} color={s.color} />
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 11, color: '#888', fontWeight: 500, marginBottom: 2 }}>{s.label}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#111' }}>{s.value}</span>
                <span style={{ fontSize: 11, color: s.color, fontWeight: 500 }}>{s.sub}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
