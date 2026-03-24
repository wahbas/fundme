import { useState } from 'react'
import { motion } from 'framer-motion'
import { Headphones, Phone, Mail, Calendar, HelpCircle, PlayCircle, CheckCircle2 } from 'lucide-react'
import ContactSupportModal from './ContactSupportModal'

// ─── Quick Stats Card ──────────────────────────────────────────

function QuickStatsCard() {
  const completed = 1
  const total = 5
  const percent = Math.round((completed / total) * 100)

  const size = 80
  const strokeWidth = 7
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  const items = [
    { label: 'Account Created', done: true },
    { label: 'Identity Verified', done: false },
    { label: 'Business Verified', done: false },
    { label: 'Bank Connected', done: false },
    { label: 'Documents Uploaded', done: false },
  ]

  return (
    <div style={cardStyle}>
      <h4 style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 16 }}>Your Setup Status</h4>

      {/* Progress ring */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
          <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E5E7EB" strokeWidth={strokeWidth} />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#0D82F9"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </svg>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 700, color: '#111', lineHeight: 1 }}>{percent}%</span>
            <span style={{ fontSize: 9, color: '#999' }}>Complete</span>
          </div>
        </div>
        <div>
          <p style={{ fontSize: 22, fontWeight: 700, color: '#111', margin: 0, lineHeight: 1 }}>{completed}/{total}</p>
          <p style={{ fontSize: 11, color: '#888', margin: 0 }}>Steps completed</p>
        </div>
      </div>

      {/* Checklist */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map((item) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2
              size={14}
              color={item.done ? '#22C55E' : '#D1D5DB'}
              fill={item.done ? '#DCFCE7' : 'none'}
            />
            <span
              style={{
                fontSize: 11,
                color: item.done ? '#22C55E' : '#888',
                textDecoration: item.done ? 'line-through' : 'none',
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Account Manager Card ──────────────────────────────────────

function AccountManagerCard() {
  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #002E83, #0D82F9)',
          }}
        >
          <Headphones size={18} color="#fff" />
        </div>
        <div>
          <p style={{ fontSize: 10, color: '#999', margin: 0, textTransform: 'uppercase', letterSpacing: 0.5 }}>Your Account Manager</p>
          <h4 style={{ fontSize: 13, fontWeight: 600, color: '#111', margin: 0 }}>Ahmed Al-Mansour</h4>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#666' }}>
          <Phone size={13} color="#999" />
          +966 12 345 6789
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#666' }}>
          <Mail size={13} color="#999" />
          ahmed.almansour@fundme.sa
        </div>
      </div>

      <button
        style={{
          width: '100%',
          padding: '9px 0',
          background: '#fff',
          color: '#002E83',
          border: '1px solid #002E83',
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
        <Calendar size={13} />
        Schedule a Call
      </button>
    </div>
  )
}

// ─── Need Help Card ───────────────────────────────────────────

function NeedHelpCard() {
  const [supportOpen, setSupportOpen] = useState(false)
  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0D82F9, #06B6D4)',
          }}
        >
          <HelpCircle size={18} color="#fff" />
        </div>
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 600, color: '#111', margin: 0 }}>Need Help?</h4>
          <p style={{ fontSize: 11, color: '#999', margin: 0 }}>Learn how FundMe works</p>
        </div>
      </div>

      <button
        style={{
          width: '100%',
          padding: '9px 0',
          border: '1px solid #002E83',
          color: '#002E83',
          borderRadius: 8,
          fontSize: 12,
          fontWeight: 600,
          background: '#fff',
          marginBottom: 8,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}
      >
        <PlayCircle size={13} />
        Watch Video
      </button>
      <div style={{ textAlign: 'center' }}>
        <span onClick={() => setSupportOpen(true)} style={{ color: '#0D82F9', fontSize: 12, fontWeight: 500, textDecoration: 'underline', cursor: 'pointer' }}>
          Contact Support
        </span>
      </div>
      <ContactSupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />
    </div>
  )
}

// ─── Main Right Sidebar ──────────────────────────────────────

export default function RightSidebar() {
  return (
    <aside
      style={{
        width: 280,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <QuickStatsCard />
      <AccountManagerCard />
      <NeedHelpCard />
    </aside>
  )
}

const cardStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #F0F0F0',
  borderRadius: 14,
  padding: 18,
}
