import { motion } from 'framer-motion'
import { AccountManagerIcon, PhoneIcon, EmailIcon, CalendarIcon, VideoIcon, ChatIcon } from '../icons/SupportIcons'
import { ArrowRightIcon } from '../icons/WidgetIcons'

export default function SupportWidget({ underReview = false }: { underReview?: boolean }) {
  return (
    <div style={cardStyle}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1E293B', margin: '0 0 16px' }}>
        Your Support
      </h3>

      {/* Account Manager */}
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 10, fontWeight: 600, color: '#94A3B8', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 1 }}>
          Your Account Manager
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <AccountManagerIcon size={36} />
          </div>
          <h4 style={{ fontSize: 14, fontWeight: 600, color: '#1E293B', margin: 0 }}>Ahmed Al-Mansour</h4>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#64748B' }}>
            <PhoneIcon size={16} color="#94A3B8" />
            +966 12 345 6789
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#64748B' }}>
            <EmailIcon size={16} color="#94A3B8" />
            ahmed.almansour@fundme.sa
          </div>
        </div>

        <motion.button
          whileHover={{ background: '#F1F5F9' }}
          style={{
            width: '100%',
            padding: '8px 0',
            background: '#fff',
            color: '#2563EB',
            border: '1px solid #2563EB',
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
          <CalendarIcon size={14} color="#2563EB" />
          Schedule a Call
          <ArrowRightIcon size={14} color="#2563EB" />
        </motion.button>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#E2E8F0', marginBottom: 16 }} />

      {/* Under review note — amber tip */}
      {underReview && (
        <>
          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, padding: 12, marginBottom: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#92400E', margin: '0 0 2px' }}>
              Questions about your review?
            </p>
            <p style={{ fontSize: 11, color: '#A16207', lineHeight: 1.4, margin: 0 }}>
              Contact your account manager for status updates.
            </p>
          </div>
          <div style={{ height: 1, background: '#E2E8F0', marginBottom: 16 }} />
        </>
      )}

      {/* Quick actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <motion.button
          whileHover={{ background: '#F1F5F9' }}
          style={{
            padding: '14px 16px',
            background: '#F8FAFC',
            borderRadius: 10,
            border: '1px solid #F1F5F9',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            textAlign: 'left',
          }}
        >
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <VideoIcon size={20} color="#2563EB" />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#1E293B', margin: 0 }}>Watch Video</p>
            <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>See how FundMe works</p>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ background: '#F1F5F9' }}
          style={{
            padding: '14px 16px',
            background: '#F8FAFC',
            borderRadius: 10,
            border: '1px solid #F1F5F9',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            textAlign: 'left',
          }}
        >
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <ChatIcon size={20} color="#2563EB" />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#1E293B', margin: 0 }}>Contact Support</p>
            <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>Chat with our team</p>
          </div>
        </motion.button>
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
