import { Link2, Check, Info } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../../../ThemeContext'
import { SADAD_BILLS, type WizardData } from '../types'
import RiyalSign from '../../icons/RiyalSign'

interface Props {
  data: WizardData
  onChange: (patch: Partial<WizardData>) => void
}

export default function SelectSadadBills({ data, onChange }: Props) {
  const { theme } = useTheme()

  const thStyle: React.CSSProperties = { fontSize: 12, fontWeight: 500, color: theme.textMuted, padding: '10px 14px', textAlign: 'left', borderBottom: `1px solid ${theme.border}` }
  const tdStyle: React.CSSProperties = { fontSize: 13, color: theme.textPrimary, padding: '12px 14px', borderBottom: `1px solid ${theme.borderLight}` }
  const selected = new Set(data.selectedBills)
  const total = SADAD_BILLS.filter((b) => selected.has(b.id)).reduce((s, b) => s + b.amount, 0)

  function toggle(id: string) {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    onChange({ selectedBills: Array.from(next), amount: SADAD_BILLS.filter((b) => next.has(b.id)).reduce((s, b) => s + b.amount, 0) })
  }

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textPrimary, marginBottom: 6 }}>Select SADAD Bills to Finance</h2>
      <p style={{ fontSize: 14, color: theme.textMuted, marginBottom: 20 }}>Choose which bills you want FundMe to pay</p>

      {/* Connected badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 18px',
          background: '#EFF6FF',
          borderRadius: 10,
          border: '1px solid #93C5FD',
          marginBottom: 24,
          fontSize: 13,
          color: '#002E83',
          fontWeight: 500,
        }}
      >
        <Link2 size={16} />
        Connected to SADAD &bull; 5 bills found
      </div>

      {/* Table with custom checkboxes */}
      <div style={{ border: `1px solid ${theme.border}`, borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: theme.bgPrimary }}>
              <th style={{ ...thStyle, width: 48 }} />
              <th style={thStyle}>Bill #</th>
              <th style={thStyle}>Biller</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Amount</th>
              <th style={thStyle}>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {SADAD_BILLS.map((bill) => {
              const isSelected = selected.has(bill.id)
              return (
                <tr
                  key={bill.id}
                  onClick={() => toggle(bill.id)}
                  style={{
                    cursor: 'pointer',
                    background: isSelected ? '#EFF6FF' : theme.cardBg,
                    transition: 'background 0.15s',
                  }}
                >
                  <td style={tdStyle}>
                    <motion.div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 4,
                        border: `2px solid ${isSelected ? '#0D82F9' : '#D1D5DB'}`,
                        background: isSelected ? '#0D82F9' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s',
                      }}
                    >
                      {isSelected && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <Check size={14} color="#fff" />
                        </motion.div>
                      )}
                    </motion.div>
                  </td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12 }}>{bill.billNumber}</td>
                  <td style={tdStyle}>{bill.biller}</td>
                  <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 600 }}><RiyalSign size="sm" />{bill.amount.toLocaleString()}</td>
                  <td style={tdStyle}>{bill.dueDate}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Gradient Summary */}
      <motion.div
        layout
        style={{
          background: selected.size > 0
            ? 'linear-gradient(135deg, #002E83, #0D82F9)'
            : theme.bgPrimary,
          borderRadius: 14,
          padding: 22,
          color: selected.size > 0 ? '#fff' : theme.textPrimary,
          transition: 'background 0.3s',
        }}
      >
        <p style={{ fontSize: 13, color: selected.size > 0 ? 'rgba(255,255,255,0.7)' : theme.textMuted, marginBottom: 4 }}>
          Total Selected
        </p>
        <p style={{ fontSize: 28, fontWeight: 700 }}><RiyalSign size="lg" color="#FFFFFF" />{total.toLocaleString()}</p>
        <p style={{ fontSize: 13, color: selected.size > 0 ? 'rgba(255,255,255,0.6)' : theme.textMuted, marginTop: 4 }}>
          {selected.size} bill{selected.size !== 1 ? 's' : ''} selected
        </p>
      </motion.div>

      {/* Info */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          marginTop: 16,
          padding: '14px 18px',
          background: '#EFF6FF',
          borderRadius: 12,
          fontSize: 13,
          color: theme.textMuted,
        }}
      >
        <Info size={18} color="#0D82F9" style={{ flexShrink: 0, marginTop: 1 }} />
        Selected bills will be paid directly by FundMe upon loan approval.
      </div>
    </div>
  )
}
