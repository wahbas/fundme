import { Info } from 'lucide-react'
import type { SadadWizardData } from '../../../pages/RequestFinancing'

interface Bill {
  id: string
  amount: number
}

interface Props {
  data: SadadWizardData
  onChange: (p: Partial<SadadWizardData>) => void
  bills: Bill[]
}

const termOptions = [3, 6, 12]
const FEE_RATE = 0.025

export default function SadadAmountTerms({ data, onChange, bills }: Props) {
  const totalBills = bills.filter((b) => data.selectedBills.includes(b.id)).reduce((s, b) => s + b.amount, 0)
  const serviceFee = Math.round(totalBills * FEE_RATE)
  const totalRepayment = totalBills + serviceFee
  const monthlyPayment = Math.round(totalRepayment / data.term)
  const billCount = data.selectedBills.length

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>Financing Terms</h2>
      <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 32 }}>Review your financing details and choose your repayment term</p>

      <div
        style={{
          background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14,
          overflow: 'hidden', marginBottom: 20,
        }}
      >
        {/* Amount section */}
        <div style={{ padding: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 8 }}>Financing Amount</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: '#0F172A' }}>{totalBills.toLocaleString()}</span>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#475569' }}>SAR</span>
          </div>
          <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>
            Based on {billCount} selected SADAD bill{billCount !== 1 ? 's' : ''}
          </p>
        </div>

        <div style={{ height: 1, background: '#F1F5F9' }} />

        {/* Fee breakdown */}
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span style={{ color: '#475569' }}>Service Fee (2.5%)</span>
            <span style={{ color: '#0F172A', fontWeight: 500 }}>{serviceFee.toLocaleString()} SAR</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ color: '#475569' }}>Total Repayment</span>
            <span style={{ color: '#0F172A', fontWeight: 600 }}>{totalRepayment.toLocaleString()} SAR</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span style={{ color: '#475569' }}>Estimated APR</span>
            <span style={{ color: '#0F172A', fontWeight: 500 }}>~5%</span>
          </div>
        </div>

        <div style={{ height: 1, background: '#F1F5F9' }} />

        {/* Repayment term */}
        <div style={{ padding: 24 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', marginBottom: 14 }}>Repayment Term</p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            {termOptions.map((m) => (
              <button
                key={m}
                onClick={() => onChange({ term: m })}
                style={{
                  flex: 1, padding: '10px 24px', borderRadius: 8,
                  fontSize: 13, fontWeight: 600,
                  background: data.term === m ? '#2563EB' : '#fff',
                  color: data.term === m ? '#fff' : '#475569',
                  border: data.term === m ? 'none' : '1px solid #E2E8F0',
                  cursor: 'pointer', transition: 'all 0.15s',
                  boxShadow: data.term === m ? '0 2px 8px rgba(37,99,235,0.2)' : 'none',
                }}
              >
                {m} months
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <span style={{ fontSize: 14, color: '#94A3B8' }}>Monthly Payment</span>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#0F172A' }}>{monthlyPayment.toLocaleString()} SAR</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span style={{ color: '#94A3B8' }}>First Payment Due</span>
            <span style={{ color: '#94A3B8' }}>May 1, 2026</span>
          </div>
        </div>
      </div>

      {/* Info note */}
      <div
        style={{
          display: 'flex', alignItems: 'flex-start', gap: 10,
          padding: '14px 18px', background: 'rgba(37,99,235,0.04)',
          borderRadius: 10, fontSize: 13, color: '#475569', lineHeight: 1.6,
        }}
      >
        <Info size={16} color="#2563EB" style={{ flexShrink: 0, marginTop: 2 }} />
        Your selected SADAD bills will be paid within 24 hours of approval. Repayment begins on the date shown above.
      </div>
    </div>
  )
}
