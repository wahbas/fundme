import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Zap } from 'lucide-react'
import RiyalSign from './icons/RiyalSign'
import { useTheme } from '../ThemeContext'

interface EarlyPaymentModalProps {
  open: boolean
  onClose: () => void
}

type ModalState = 'form' | 'success'

export default function EarlyPaymentModal({ open, onClose }: EarlyPaymentModalProps) {
  const [state, setState] = useState<ModalState>('form')
  const [loading, setLoading] = useState(false)
  const { theme } = useTheme()

  if (!open) return null

  const handlePay = () => {
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
                <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.textPrimary, margin: 0 }}>Early Settlement</h2>
                <button
                  onClick={onClose}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={20} color="#64748B" />
                </button>
              </div>

              {/* Summary card */}
              <div style={{
                background: theme.bgPrimary,
                borderRadius: 12,
                padding: 20,
                marginBottom: 20,
              }}>
                <p style={{ fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>Remaining Balance</p>
                <p style={{ fontSize: 28, fontWeight: 700, color: theme.textPrimary, marginBottom: 4 }}>350,000 <RiyalSign size="lg" /></p>
                <p style={{ fontSize: 13, color: theme.textSecondary }}>LOAN-2024-001 · Working Capital</p>
              </div>

              {/* Breakdown rows */}
              <div>
                {[
                  { label: 'Remaining Principal', value: '350,000 ر.س' },
                  { label: 'Accrued Profit', value: '3,917 ر.س' },
                  { label: 'Early Settlement Fee (2%)', value: '7,000 ر.س' },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '10px 0',
                      borderBottom: `1px solid ${theme.borderLight}`,
                    }}
                  >
                    <span style={{ fontSize: 14, color: theme.textSecondary }}>{row.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: theme.textPrimary }}>{row.value}</span>
                  </div>
                ))}

                {/* Total */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: 16,
                }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary }}>Total Early Payment</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary }}>360,917 <RiyalSign /></span>
                </div>
              </div>

              {/* Savings box */}
              <div style={{
                background: '#F0FDF4',
                border: '1px solid #BBF7D0',
                borderRadius: 10,
                padding: 14,
                marginTop: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}>
                <CheckCircle2 size={18} color="#16A34A" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: '#16A34A', fontWeight: 500 }}>
                  You save 15,583 <RiyalSign size="sm" color="#10B981" /> compared to continuing installments
                </span>
              </div>

              {/* Pay button */}
              <button
                onClick={handlePay}
                disabled={loading}
                style={{
                  background: '#7CFF01',
                  color: '#0F172A',
                  fontWeight: 600,
                  fontSize: 15,
                  width: '100%',
                  height: 48,
                  borderRadius: 12,
                  marginTop: 20,
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
                    Processing...
                  </>
                ) : (
                  <>Pay Full Balance &rarr;</>
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
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#F0FDF4',
                border: '2px solid #BBF7D0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <CheckCircle2 size={32} color="#16A34A" />
              </div>

              <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textPrimary, marginTop: 20, marginBottom: 0 }}>
                Settlement Successful
              </h2>

              <p style={{ fontSize: 14, color: theme.textSecondary, textAlign: 'center', marginTop: 8, marginBottom: 0 }}>
                Your early settlement of 360,917 <RiyalSign size="sm" /> has been processed successfully.
              </p>

              {/* Receipt details */}
              <div style={{
                background: theme.bgPrimary,
                borderRadius: 12,
                padding: 16,
                width: '100%',
                marginTop: 20,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span style={{ fontSize: 13, color: theme.textMuted }}>Transaction ID</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary, fontFamily: 'monospace' }}>
                    TXN-2026-0415
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span style={{ fontSize: 13, color: theme.textMuted }}>Date</span>
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
                Done
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
