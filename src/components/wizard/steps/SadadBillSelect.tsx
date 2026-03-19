import { useState } from 'react'
import { Check, Info, Link2 } from 'lucide-react'
import { motion } from 'framer-motion'
import type { SadadWizardData } from '../../../pages/RequestFinancing'

interface Bill {
  id: string
  billNumber: string
  biller: string
  amount: number
  dueDate: string
  status: 'due-soon' | 'unpaid' | 'overdue'
}

interface Props {
  data: SadadWizardData
  onChange: (p: Partial<SadadWizardData>) => void
  bills: Bill[]
}

const statusConfig = {
  'due-soon': { label: 'Due Soon', color: '#2563EB', bg: 'rgba(37,99,235,0.08)' },
  unpaid: { label: 'Unpaid', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
  overdue: { label: 'Overdue', color: '#EF4444', bg: 'rgba(239,68,68,0.08)' },
}

const thStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#64748B', padding: '12px 16px',
  textAlign: 'left', textTransform: 'uppercase', letterSpacing: 0.3,
}
const tdStyle: React.CSSProperties = {
  fontSize: 14, color: '#0F172A', padding: '14px 16px',
}

export default function SadadBillSelect({ data, onChange, bills }: Props) {
  const [connecting, setConnecting] = useState(false)
  const selected = new Set(data.selectedBills)
  const total = bills.filter((b) => selected.has(b.id)).reduce((s, b) => s + b.amount, 0)

  function toggle(id: string) {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    onChange({ selectedBills: Array.from(next) })
  }

  function handleConnect() {
    setConnecting(true)
    setTimeout(() => {
      onChange({ sadadConnected: true, selectedBills: [bills[0].id, bills[1].id] })
      setConnecting(false)
    }, 1500)
  }

  // Not connected state
  if (!data.sadadConnected) {
    return (
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>Select SADAD Bills to Finance</h2>
        <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 32 }}>Choose which bills you want FundMe to pay on your behalf</p>

        <div
          style={{
            background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14,
            padding: '40px 32px', textAlign: 'center', maxWidth: 480, margin: '0 auto',
          }}
        >
          <div
            style={{
              width: 64, height: 64, borderRadius: '50%', margin: '0 auto 20px',
              background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Link2 size={28} color="#2563EB" />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>Connect to SADAD</h3>
          <p style={{ fontSize: 13, color: '#475569', marginBottom: 24, lineHeight: 1.6 }}>
            Link your SADAD account to view your outstanding bills
          </p>
          <button
            onClick={handleConnect}
            disabled={connecting}
            style={{
              padding: '12px 24px',
              background: '#2563EB', color: '#fff',
              border: 'none', borderRadius: 10,
              fontSize: 14, fontWeight: 600, cursor: connecting ? 'wait' : 'pointer',
            }}
          >
            {connecting ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                  style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                />
                Connecting...
              </span>
            ) : 'Connect SADAD Account →'}
          </button>
        </div>
      </div>
    )
  }

  // Connected — bills table
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>Select SADAD Bills to Finance</h2>
      <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 24 }}>Choose which bills you want FundMe to pay on your behalf</p>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, overflow: 'hidden', marginBottom: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FAFC' }}>
              <th style={{ ...thStyle, width: 48 }} />
              <th style={thStyle}>Bill Number</th>
              <th style={thStyle}>Biller Name</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Amount (SAR)</th>
              <th style={thStyle}>Due Date</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => {
              const isSelected = selected.has(bill.id)
              const st = statusConfig[bill.status]
              return (
                <tr
                  key={bill.id}
                  onClick={() => toggle(bill.id)}
                  style={{
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(37,99,235,0.02)' : '#fff',
                    transition: 'background 0.15s',
                  }}
                >
                  <td style={tdStyle}>
                    <div
                      style={{
                        width: 20, height: 20, borderRadius: 4,
                        border: `2px solid ${isSelected ? '#2563EB' : '#CBD5E1'}`,
                        background: isSelected ? '#2563EB' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.15s',
                      }}
                    >
                      {isSelected && <Check size={14} color="#fff" />}
                    </div>
                  </td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12, color: '#475569' }}>{bill.billNumber}</td>
                  <td style={{ ...tdStyle, color: '#475569' }}>{bill.biller}</td>
                  <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 600 }}>{bill.amount.toLocaleString()}</td>
                  <td style={{ ...tdStyle, color: '#475569' }}>{bill.dueDate}</td>
                  <td style={tdStyle}>
                    <span style={{
                      display: 'inline-block', padding: '3px 10px', borderRadius: 20,
                      fontSize: 11, fontWeight: 600, color: st.color, background: st.bg,
                    }}>
                      {st.label}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Selection Summary */}
      <div
        style={{
          background: 'rgba(37,99,235,0.03)', borderLeft: '3px solid #2563EB',
          borderRadius: 10, padding: '16px 20px', marginBottom: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 13, color: '#475569' }}>
          <strong>{selected.size}</strong> bill{selected.size !== 1 ? 's' : ''} selected
        </span>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>
          {total.toLocaleString()} SAR
        </span>
      </div>

      {/* Info note */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#94A3B8' }}>
        <Info size={16} color="#94A3B8" style={{ flexShrink: 0, marginTop: 1 }} />
        Selected bills will be paid directly by FundMe upon approval of your financing request.
      </div>
    </div>
  )
}
