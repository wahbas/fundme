'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Phone, Mail, MessageCircle } from 'lucide-react'
import { useTheme } from '../../ThemeContext'
import { useI18n } from '../../i18n'

interface ContactSupportModalProps {
  open: boolean
  onClose: () => void
}

export default function ContactSupportModal({ open, onClose }: ContactSupportModalProps) {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const { theme } = useTheme()
  const { t } = useI18n()

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 100,
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
          maxWidth: 480,
          width: '90%',
          padding: 32,
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: theme.textPrimary, margin: 0 }}>{t('modal.contactSupport')}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94A3B8',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Account Manager Section */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: '#EFF6FF',
              color: '#2563EB',
              fontWeight: 700,
              fontSize: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            AM
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary }}>Ahmed Al-Mansour</div>
            <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 8 }}>{t('support.accountManager')}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <Phone size={13} style={{ color: theme.textSecondary }} />
              <span style={{ fontSize: 13, color: theme.textSecondary }}>+966 12 345 6789</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <Mail size={13} style={{ color: theme.textSecondary }} />
              <span style={{ fontSize: 13, color: theme.textSecondary }}>ahmed.almansour@fundme.sa</span>
            </div>
            <button
              style={{
                background: 'none',
                border: `1px solid ${theme.border}`,
                borderRadius: 10,
                padding: '10px 20px',
                fontSize: 13,
                fontWeight: 600,
                color: theme.textSecondary,
                cursor: 'pointer',
              }}
            >
              {t('support.scheduleCall')}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: `1px solid ${theme.border}`, margin: '24px 0' }} />

        {/* Message Form */}
        <div style={{ fontSize: 15, fontWeight: 600, color: theme.textPrimary, marginBottom: 16 }}>
          {t('modal.orSendMessage')}
        </div>

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 14px',
            background: theme.bgPrimary,
            border: `1px solid ${theme.borderLight}`,
            borderRadius: 10,
            fontSize: 14,
            marginBottom: 12,
            outline: 'none',
            color: theme.textPrimary,
            appearance: 'auto',
            boxSizing: 'border-box',
          }}
        >
          <option value="">{t('modal.selectSubject')}</option>
          <option value="General Inquiry">{t('modal.generalInquiry')}</option>
          <option value="Payment Issue">{t('modal.paymentIssue')}</option>
          <option value="Financing Question">{t('modal.financingQuestion')}</option>
          <option value="Technical Support">{t('modal.technicalSupport')}</option>
          <option value="Other">{t('modal.other')}</option>
        </select>

        <textarea
          placeholder={t('modal.yourMessage')}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 14px',
            background: theme.bgPrimary,
            border: `1px solid ${theme.borderLight}`,
            borderRadius: 10,
            fontSize: 14,
            marginBottom: 12,
            outline: 'none',
            resize: 'vertical',
            fontFamily: 'inherit',
            color: theme.textPrimary,
            boxSizing: 'border-box',
          }}
        />

        <button
          style={{
            background: '#7CFF01',
            color: '#0F172A',
            fontWeight: 600,
            fontSize: 14,
            width: '100%',
            height: 44,
            borderRadius: 10,
            marginTop: 12,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {t('modal.sendMessage')}
        </button>

        {/* Quick Contact Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
          <a
            href="tel:+966920012345"
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px', borderRadius: 12,
              border: `1px solid ${theme.border}`, background: theme.cardBg,
              textDecoration: 'none', cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#002E83'; e.currentTarget.style.background = 'rgba(0,46,131,0.03)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.background = theme.cardBg }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Phone size={18} color="#2563EB" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary }}>{t('modal.callNow')}</div>
              <div style={{ fontSize: 13, color: theme.textMuted }}>920 012 345</div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#2563EB' }}>{t('modal.callAction')}</span>
          </a>

          <a
            href="mailto:support@fundme.sa"
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px', borderRadius: 12,
              border: `1px solid ${theme.border}`, background: theme.cardBg,
              textDecoration: 'none', cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#002E83'; e.currentTarget.style.background = 'rgba(0,46,131,0.03)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.background = theme.cardBg }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Mail size={18} color="#10B981" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary }}>{t('modal.emailUs')}</div>
              <div style={{ fontSize: 13, color: theme.textMuted }}>support@fundme.sa</div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#10B981' }}>{t('modal.sendEmail')}</span>
          </a>

          <a
            href="https://wa.me/966920012345"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px', borderRadius: 12,
              border: `1px solid ${theme.border}`, background: theme.cardBg,
              textDecoration: 'none', cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#002E83'; e.currentTarget.style.background = 'rgba(0,46,131,0.03)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.background = theme.cardBg }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <MessageCircle size={18} color="#D97706" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary }}>{t('modal.liveChat')}</div>
              <div style={{ fontSize: 13, color: theme.textMuted }}>WhatsApp</div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#D97706' }}>{t('modal.openChat')}</span>
          </a>
        </div>
      </motion.div>
    </div>
  )
}
