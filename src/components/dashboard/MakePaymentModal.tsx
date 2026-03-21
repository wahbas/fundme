'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Building2, CreditCard } from 'lucide-react'
import RiyalSign from '../icons/RiyalSign'
import { useTheme } from '../../ThemeContext'
import { useI18n } from '../../i18n'

interface MakePaymentModalProps {
  open: boolean
  onClose: () => void
}

type ModalState = 'form' | 'success'
type PaymentMethod = 'bank' | 'sadad' | 'mada'

export default function MakePaymentModal({ open, onClose }: MakePaymentModalProps) {
  const [state, setState] = useState<ModalState>('form')
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('bank')
  const [loading, setLoading] = useState(false)
  const { theme } = useTheme()
  const { t } = useI18n()

  if (!open) return null

  const handleConfirm = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setState('success')
    }, 1500)
  }

  const handleDone = () => {
    onClose()
    setState('form')
  }

  const paymentMethods: { id: PaymentMethod; label: string; icon: typeof Building2 }[] = [
    { id: 'bank', label: t('modal.connectedBank'), icon: Building2 },
    { id: 'sadad', label: t('modal.sadad'), icon: CreditCard },
    { id: 'mada', label: t('modal.madaCard'), icon: CreditCard },
  ]

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
          {state === 'form' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.textPrimary, margin: 0 }}>{t('modal.makePayment')}</h2>
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

              {/* Payment Amount */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: theme.textSecondary, marginBottom: 8 }}>{t('modal.paymentAmount')}</div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: theme.textPrimary,
                    background: theme.bgPrimary,
                    border: `1px solid ${theme.borderLight}`,
                    borderRadius: 12,
                    padding: 20,
                    textAlign: 'center',
                  }}
                >
                  10,677 <RiyalSign size="lg" />
                </div>
              </div>

              {/* Payment Details */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: theme.textSecondary, marginBottom: 12 }}>{t('modal.paymentDetails')}</div>
                {[
                  { label: t('modal.financing'), value: 'SADAD INV-2024-001' },
                  { label: t('loanDetail.dueDate'), value: 'April 1, 2026' },
                  { label: t('modal.installment'), value: '3 of 12' },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                    }}
                  >
                    <span style={{ fontSize: 13, color: theme.textMuted }}>{row.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary }}>{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Payment Method */}
              <div style={{ marginBottom: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: theme.textSecondary, marginBottom: 12 }}>{t('modal.paymentMethod')}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {paymentMethods.map((method) => {
                    const selected = selectedMethod === method.id
                    const Icon = method.icon
                    return (
                      <div
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        style={{
                          padding: '14px 16px',
                          border: `1.5px solid ${selected ? '#2563EB' : theme.border}`,
                          borderRadius: 10,
                          background: selected ? 'rgba(37,99,235,0.02)' : theme.cardBg,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                        }}
                      >
                        {/* Radio circle */}
                        <div
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: '50%',
                            border: `2px solid ${selected ? '#2563EB' : '#CBD5E1'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {selected && (
                            <div
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                background: '#2563EB',
                              }}
                            />
                          )}
                        </div>
                        <Icon size={18} color={selected ? '#2563EB' : '#64748B'} />
                        <span style={{ fontSize: 14, fontWeight: 500, color: theme.textPrimary }}>{method.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirm}
                disabled={loading}
                style={{
                  background: '#7CFF01',
                  color: '#0F172A',
                  fontWeight: 600,
                  fontSize: 15,
                  width: '100%',
                  height: 48,
                  borderRadius: 12,
                  marginTop: 24,
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{
                        width: 18,
                        height: 18,
                        border: '2px solid #0F172A',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                      }}
                    />
                    {t('modal.processing')}
                  </>
                ) : (
                  t('modal.confirmPayment')
                )}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              {/* Green checkmark circle */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: '#F0FDF4',
                  border: '2px solid #BBF7D0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CheckCircle2 size={32} color="#16A34A" />
              </div>

              <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textPrimary, marginTop: 20, marginBottom: 0 }}>
                {t('modal.paymentSuccessful')}
              </h2>

              <p style={{ fontSize: 14, color: theme.textSecondary, textAlign: 'center', marginTop: 8, marginBottom: 0 }}>
                {t('modal.paymentProcessed')}
              </p>

              {/* Receipt details */}
              <div
                style={{
                  background: theme.bgPrimary,
                  borderRadius: 12,
                  padding: 16,
                  width: '100%',
                  marginTop: 20,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span style={{ fontSize: 13, color: theme.textMuted }}>{t('modal.transactionId')}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary, fontFamily: 'monospace' }}>
                    TXN-2026-0412
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span style={{ fontSize: 13, color: theme.textMuted }}>{t('modal.date')}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary }}>March 20, 2026</span>
                </div>
              </div>

              {/* Done button */}
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
                  marginTop: 20,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {t('modal.done')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
