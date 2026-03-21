import { Shield, Building2, FileCheck, Zap, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../../../ThemeContext'
import type { WizardData } from '../../../pages/RequestFinancing'

interface Props {
  data: WizardData
  onChange: (p: Partial<WizardData>) => void
}

export default function BankConnect({ data, onChange }: Props) {
  const { theme } = useTheme()
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: theme.textPrimary, marginBottom: 6, textAlign: 'center' }}>
        Connect Your Bank Account
      </h2>
      <p style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 32, textAlign: 'center' }}>
        Securely link your bank for faster processing
      </p>

      <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 24 }}>
        {/* Benefits */}
        <div style={{
          background: theme.bgPrimary, border: `1px solid ${theme.border}`, borderRadius: 12,
          padding: 20, marginBottom: 24,
        }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary, marginBottom: 16 }}>Why connect your bank?</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Shield size={18} color="#4F46E5" />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary, marginBottom: 2 }}>Secure & Encrypted</p>
                <p style={{ fontSize: 12, color: theme.textMuted }}>Your data is protected with bank-level encryption</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Zap size={18} color="#059669" />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary, marginBottom: 2 }}>Faster Approval</p>
                <p style={{ fontSize: 12, color: theme.textMuted }}>Automatic verification speeds up your application</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Clock size={18} color="#B45309" />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary, marginBottom: 2 }}>Real-time Data</p>
                <p style={{ fontSize: 12, color: theme.textMuted }}>No need to manually upload bank statements</p>
              </div>
            </div>
          </div>
        </div>

        {/* Connect / Connected */}
        {data.bankConnected ? (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            padding: 16, background: 'rgba(16,185,129,0.04)',
            border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12,
          }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <FileCheck size={20} color="#10B981" />
            </motion.div>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#10B981' }}>Bank Account Connected</span>
          </div>
        ) : (
          <button
            onClick={() => onChange({ bankConnected: true })}
            style={{
              width: '100%', padding: 16, background: '#2563EB',
              border: 'none', borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#1D4ED8' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#2563EB' }}
          >
            <Building2 size={18} />
            Connect Bank Account
          </button>
        )}

        {/* Skip note */}
        {!data.bankConnected && (
          <p style={{ fontSize: 12, color: theme.textMuted, textAlign: 'center', marginTop: 12 }}>
            You can skip this step and upload statements manually instead
          </p>
        )}
      </div>
    </div>
  )
}
