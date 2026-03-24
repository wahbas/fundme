'use client'

import { motion } from 'framer-motion'
import { X, Phone, Mail } from 'lucide-react'
import { useTheme } from '../../ThemeContext'
import { useI18n } from '../../i18n'

interface ContactSupportModalProps {
  open: boolean
  onClose: () => void
}

export default function ContactSupportModal({ open, onClose }: ContactSupportModalProps) {
  const { theme } = useTheme()
  const { t } = useI18n()

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="modal-card"
        style={{
          background: theme.cardBg,
          borderRadius: 20,
          maxWidth: 380,
          width: '90%',
          padding: 32,
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        }}
      >
        {/* Close */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={20} color="#64748B" />
          </button>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.textPrimary, margin: '0 0 6px' }}>
            {t('modal.contactSupport')}
          </h2>
          <p style={{ fontSize: 13, color: theme.textMuted, margin: 0 }}>
            {t('modal.contactSupportDesc' as any)}
          </p>
        </div>

        {/* Phone */}
        <a
          href="tel:+966920012345"
          style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '16px 18px', borderRadius: 14,
            border: `1.5px solid ${theme.border}`, background: theme.cardBg,
            textDecoration: 'none', marginBottom: 12,
            transition: 'border-color 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#002E83' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.border }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Phone size={20} color="#2563EB" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary }}>920 012 345</div>
            <div style={{ fontSize: 12, color: theme.textMuted }}>{t('modal.callNow')}</div>
          </div>
        </a>

        {/* Email */}
        <a
          href="mailto:support@fundme.sa"
          style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '16px 18px', borderRadius: 14,
            border: `1.5px solid ${theme.border}`, background: theme.cardBg,
            textDecoration: 'none',
            transition: 'border-color 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#002E83' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.border }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Mail size={20} color="#10B981" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary }}>support@fundme.sa</div>
            <div style={{ fontSize: 12, color: theme.textMuted }}>{t('modal.emailUs')}</div>
          </div>
        </a>
      </motion.div>
    </div>
  )
}
