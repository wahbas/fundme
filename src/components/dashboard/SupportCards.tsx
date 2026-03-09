import { Headphones, Phone, Mail, Calendar, Calculator, FileText, Settings2, HelpCircle } from 'lucide-react'

const card: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #F0F0F0',
  borderRadius: 16,
  padding: 24,
}

const quickActions = [
  { icon: Calculator, label: 'Calculator', color: '#0D82F9' },
  { icon: FileText, label: 'Documents', color: '#8B5CF6' },
  { icon: Settings2, label: 'Settings', color: '#F59E0B' },
  { icon: HelpCircle, label: 'Help', color: '#06B6D4' },
]

export default function SupportCards({ verified = false }: { verified?: boolean }) {
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {/* Account Manager */}
      <div style={card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <div
            style={{
              width: 42, height: 42, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, #002E83, #0D82F9)',
            }}
          >
            <Headphones size={20} color="#fff" />
          </div>
          <div>
            <p style={{ fontSize: 12, color: '#999' }}>Your Account Manager</p>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>Ahmed Al-Mansour</h4>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#666' }}>
            <Phone size={15} color="#999" />
            +966 12 345 6789
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#666' }}>
            <Mail size={15} color="#999" />
            ahmed.almansour@fundme.sa
          </div>
        </div>
        <button
          style={{
            width: '100%',
            padding: '10px 0',
            background: verified ? '#002E83' : '#fff',
            color: verified ? '#fff' : '#002E83',
            border: verified ? 'none' : '1px solid #002E83',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            cursor: 'pointer',
          }}
        >
          <Calendar size={15} />
          Schedule a Call
        </button>
      </div>

      {/* Quick Actions (verified) or Need Help (first-time) */}
      {verified ? (
        <div style={card}>
          <h4 style={{ fontSize: 14, fontWeight: 600, color: '#111', marginBottom: 18 }}>Quick Actions</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {quickActions.map((a) => (
              <button
                key={a.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  padding: '16px 12px',
                  background: '#F9FAFB',
                  borderRadius: 12,
                  border: '1px solid #F0F0F0',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
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
                <span style={{ fontSize: 12, fontWeight: 500, color: '#555' }}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <div
              style={{
                width: 42, height: 42, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #0D82F9, #06B6D4)',
              }}
            >
              <HelpCircle size={20} color="#fff" />
            </div>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>Need Help?</h4>
              <p style={{ fontSize: 12, color: '#999' }}>Watch how FundMe works or contact support</p>
            </div>
          </div>
          <button
            style={{
              width: '100%',
              padding: '10px 0',
              border: '1px solid #002E83',
              color: '#002E83',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              background: '#fff',
              marginBottom: 12,
              cursor: 'pointer',
            }}
          >
            Watch Video
          </button>
          <div style={{ textAlign: 'center' }}>
            <a href="#" style={{ color: '#0D82F9', fontSize: 13, fontWeight: 500, textDecoration: 'underline' }}>
              Contact Support
            </a>
          </div>
        </div>
      )}
    </section>
  )
}
