import { Download, Bell, Moon } from 'lucide-react'

export default function Header() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
      <div>
        <h1 style={{ fontSize: 18, fontWeight: 600, color: '#111' }}>Dashboard</h1>
        <p style={{ fontSize: 13, color: '#999', fontWeight: 400 }}>Ahmed Al-Mansour</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={iconBtn}><Download size={18} color="#666" /></div>
        <div style={{ ...iconBtn, position: 'relative' }}>
          <Bell size={18} color="#666" />
          <span
            style={{
              position: 'absolute', top: 4, right: 4,
              width: 16, height: 16, borderRadius: '50%',
              background: '#EF4444', color: '#fff',
              fontSize: 9, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >2</span>
        </div>
        <div style={iconBtn}><Moon size={18} color="#666" /></div>
        <div
          style={{
            width: 36, height: 36, borderRadius: '50%',
            background: '#002E83', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 600, marginLeft: 4,
          }}
        >A</div>
      </div>
    </header>
  )
}

const iconBtn: React.CSSProperties = {
  width: 36, height: 36, borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
}
