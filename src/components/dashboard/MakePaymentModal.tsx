'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check } from 'lucide-react'
import { useTheme } from '../../ThemeContext'
import { useI18n } from '../../i18n'
import { BankConnectionIllustration } from '../illustrations'

interface MakePaymentModalProps {
  open: boolean
  onClose: () => void
}

const bankDetails = [
  { key: 'bankName', value: 'Riyad Bank' },
  { key: 'accountNumber', value: '2000116749947' },
  { key: 'iban', value: 'SA8520000002000116749947' },
  { key: 'beneficiaryName', value: 'Fund Me Company' },
]

export default function MakePaymentModal({ open, onClose }: MakePaymentModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const { theme } = useTheme()
  const { t } = useI18n()

  if (!open) return null

  const copyToClipboard = (value: string, field: string) => {
    navigator.clipboard.writeText(value)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleDone = () => {
    onClose()
    setCopiedField(null)
  }

  const labels: Record<string, string> = {
    bankName: t('modal.bankName'),
    accountNumber: t('modal.accountNumber'),
    iban: t('modal.iban'),
    beneficiaryName: t('modal.beneficiaryName'),
  }

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
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key="bank-transfer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
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
                }}
              >
                <X size={20} color="#64748B" />
              </button>
            </div>

            {/* Illustration + Title + Subtitle centered */}
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                <BankConnectionIllustration />
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.textPrimary, margin: '0 0 8px' }}>
                {t('modal.repayViaBankTransfer')}
              </h2>
              <p style={{ fontSize: 13, color: theme.textMuted, margin: 0, lineHeight: 1.6 }}>
                {t('modal.bankTransferSubtitle')}
              </p>
            </div>

            {/* Bank detail cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {bankDetails.map((detail) => {
                const isCopied = copiedField === detail.key
                return (
                  <div
                    key={detail.key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '16px 18px',
                      border: `1.5px solid ${theme.borderLight}`,
                      borderRadius: 14,
                      background: theme.bgPrimary,
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                    }}
                    onClick={() => copyToClipboard(detail.value, detail.key)}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#10B981' }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.borderLight }}
                  >
                    {/* Copy icon */}
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: isCopied ? '#F0FDF4' : 'rgba(16,185,129,0.06)',
                        border: `1.5px solid ${isCopied ? '#BBF7D0' : '#D1FAE5'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.2s',
                      }}
                    >
                      {isCopied ? (
                        <Check size={16} color="#16A34A" />
                      ) : (
                        <Copy size={16} color="#10B981" />
                      )}
                    </div>

                    {/* Label + Value */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11, color: theme.textMuted, marginBottom: 3, fontWeight: 500 }}>
                        {labels[detail.key]}
                      </div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: theme.textPrimary,
                          fontFamily: detail.key === 'iban' || detail.key === 'accountNumber' ? 'monospace' : 'inherit',
                          letterSpacing: detail.key === 'iban' || detail.key === 'accountNumber' ? 0.5 : 0,
                        }}
                      >
                        {detail.value}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Note */}
            <p style={{ fontSize: 12, color: theme.textMuted, textAlign: 'center', marginTop: 20, lineHeight: 1.6 }}>
              {t('modal.bankTransferNote')}
            </p>

            {/* Done Button */}
            <button
              onClick={handleDone}
              style={{
                background: '#2563EB',
                color: '#fff',
                fontWeight: 600,
                fontSize: 15,
                width: '100%',
                height: 48,
                borderRadius: 12,
                marginTop: 16,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {t('modal.done')}
            </button>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
