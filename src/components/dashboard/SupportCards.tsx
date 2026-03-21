import { useState } from 'react'
import {
  Phone, Mail, Calendar, HelpCircle, User, MessageCircle,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../../ThemeContext'

// cardBase is now computed inside the components via useTheme

// ─── Support Widget (Verified) ────────────────────────────────

function VerifiedSupportWidget() {
  const [contactHovered, setContactHovered] = useState(false)
  const { theme } = useTheme()
  const cardBase: React.CSSProperties = {
    background: theme.cardBg,
    border: `1px solid ${theme.border}`,
    borderRadius: 18,
    padding: 24,
    boxShadow: theme.shadow,
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
      style={{ ...cardBase, display: 'flex', flexDirection: 'column' }}
    >
      <h3 style={{ fontSize: 15, fontWeight: 700, color: theme.textPrimary, marginBottom: 20 }}>Your Support</h3>

      {/* Account Manager */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: 'rgba(37, 99, 235, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <User size={20} color="#3B82F6" />
        </div>
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary, marginBottom: 1 }}>Ahmed Al-Mansour</h4>
          <p style={{ fontSize: 11, color: theme.textMuted, margin: 0 }}>Account Manager</p>
        </div>
      </div>

      {/* Contact info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: theme.textSecondary }}>
          <Phone size={14} color={theme.textMuted} />
          +966 12 345 6789
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: theme.textSecondary }}>
          <Mail size={14} color={theme.textMuted} />
          ahmed.almansour@fundme.sa
        </div>
      </div>

      {/* Schedule button */}
      <button
        style={{
          width: '100%',
          padding: 10,
          background: 'transparent',
          color: '#3B82F6',
          border: '1px solid #2563EB',
          borderRadius: 10,
          fontSize: 13,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          cursor: 'pointer',
          marginBottom: 18,
          transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(37, 99, 235, 0.08)' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
      >
        <Calendar size={15} />
        Schedule a Call
      </button>

      {/* Divider */}
      <div style={{ height: 1, background: theme.border, marginBottom: 16 }} />

      {/* Contact Support */}
      <div
        onMouseEnter={() => setContactHovered(true)}
        onMouseLeave={() => setContactHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          cursor: 'pointer',
          opacity: contactHovered ? 0.7 : 1,
          transition: 'opacity 0.15s',
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: 'rgba(100, 116, 139, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <MessageCircle size={16} color="#64748B" />
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary, marginBottom: 1 }}>Contact Support</p>
          <p style={{ fontSize: 11, color: theme.textMuted, margin: 0 }}>Get help with your account</p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Export ──────────────────────────────────────────────

export default function SupportCards({ verified = false }: { verified?: boolean }) {
  const { theme } = useTheme()
  if (verified) {
    return <VerifiedSupportWidget />
  }

  const cardBase: React.CSSProperties = {
    background: theme.cardBg,
    border: `1px solid ${theme.border}`,
    borderRadius: 18,
    padding: 24,
    boxShadow: theme.shadow,
  }

  // Non-verified: simple help card
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={cardBase}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <div
            style={{
              width: 40, height: 40, borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, #0D82F9, #06B6D4)',
            }}
          >
            <HelpCircle size={20} color="#fff" />
          </div>
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary }}>Need Help?</h4>
            <p style={{ fontSize: 12, color: '#999' }}>Watch how FundMe works or contact support</p>
          </div>
        </div>
        <button
          style={{
            width: '100%',
            padding: '10px 0',
            border: '1px solid #002E83',
            color: '#002E83',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            background: theme.cardBg,
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
    </section>
  )
}
