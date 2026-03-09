import { Landmark, CheckCircle2, AlertCircle, Plus, Info } from 'lucide-react'
import { motion } from 'framer-motion'
import { CONNECTED_BANKS, type WizardData } from '../types'

interface Props {
  data: WizardData
  onChange: (patch: Partial<WizardData>) => void
}

export default function SelectBank({ data, onChange }: Props) {
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 6 }}>Select Disbursement Account</h2>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 28 }}>
        Choose where you want to receive your funds
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {CONNECTED_BANKS.map((bank) => {
          const selected = data.selectedBankId === bank.id
          return (
            <motion.button
              key={bank.id}
              onClick={() => bank.verified ? onChange({ selectedBankId: bank.id }) : undefined}
              whileHover={bank.verified ? { scale: 1.01 } : undefined}
              whileTap={bank.verified ? { scale: 0.99 } : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                width: '100%',
                padding: '18px 20px',
                borderRadius: 16,
                border: `2px solid ${selected ? '#0D82F9' : '#E5E5E5'}`,
                background: selected ? 'rgba(13,130,249,0.05)' : '#fff',
                cursor: bank.verified ? 'pointer' : 'not-allowed',
                textAlign: 'left',
                transition: 'border-color 0.2s, background 0.2s',
                opacity: bank.verified ? 1 : 0.55,
                boxShadow: selected ? '0 4px 16px rgba(13,130,249,0.12)' : 'none',
              }}
            >
              {/* Radio indicator */}
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  border: `2px solid ${selected ? '#0D82F9' : '#D1D5DB'}`,
                  background: selected ? '#0D82F9' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s',
                }}
              >
                {selected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }}
                  />
                )}
              </div>

              {/* Bank icon */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: '#F3F4F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Landmark size={22} color="#6B7280" />
              </div>

              {/* Bank details */}
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: '#111827', marginBottom: 2 }}>{bank.bankName}</p>
                <p style={{ fontSize: 12, color: '#6B7280', fontFamily: 'monospace', marginBottom: 2 }}>
                  IBAN: {bank.iban}
                </p>
                <p style={{ fontSize: 12, color: '#6B7280' }}>
                  Account: •••• •••• •••• {bank.lastFour}
                </p>
              </div>

              {/* Verified badge */}
              {bank.verified ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                  <CheckCircle2 size={16} color="#10B981" />
                  <span style={{ fontSize: 13, color: '#10B981', fontWeight: 500 }}>Verified</span>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                  <AlertCircle size={16} color="#F59E0B" />
                  <span style={{ fontSize: 13, color: '#F59E0B', fontWeight: 500 }}>Pending</span>
                </div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Add New Bank */}
      <motion.button
        whileHover={{ borderColor: '#0D82F9', color: '#0D82F9' }}
        style={{
          width: '100%',
          padding: 16,
          marginTop: 12,
          borderRadius: 14,
          border: '2px dashed #D1D5DB',
          background: 'transparent',
          color: '#6B7280',
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          transition: 'border-color 0.2s, color 0.2s',
        }}
      >
        <Plus size={20} />
        Add New Bank Account
      </motion.button>

      {/* Info */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          marginTop: 20,
          padding: '14px 18px',
          background: '#F9FAFB',
          borderRadius: 12,
          fontSize: 13,
          color: '#6B7280',
        }}
      >
        <Info size={18} color="#9CA3AF" style={{ flexShrink: 0, marginTop: 1 }} />
        Funds will be transferred to the selected account within 24 hours of loan approval.
      </div>
    </div>
  )
}
