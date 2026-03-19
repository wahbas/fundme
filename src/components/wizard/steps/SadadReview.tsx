import type { SadadWizardData } from '../../../pages/RequestFinancing'

interface Bill {
  id: string
  billNumber: string
  biller: string
  amount: number
}

interface Props {
  data: SadadWizardData
  onChange: (p: Partial<SadadWizardData>) => void
  bills: Bill[]
  onGoToStep: (idx: number) => void
}

const FEE_RATE = 0.025

const purposeLabels: Record<string, string> = {
  'working-capital': 'Increase working capital',
  'new-projects': 'Fund new projects',
  repay: 'Repay existing obligations',
  other: 'Other',
}
const revenueLabels: Record<string, string> = {
  '<1M': 'Less than 1M',
  '1-5M': '1M – 5M',
  '5-20M': '5M – 20M',
  '>20M': 'More than 20M',
}
const contractLabels: Record<string, string> = {
  gov: 'Yes — Government contracts',
  private: 'Yes — Private sector contracts',
  none: 'No active contracts',
}
const debtLabels: Record<string, string> = {
  none: 'None',
  short: 'Short-term (< 1 year)',
  long: 'Long-term (> 1 year)',
  both: 'Both short and long-term',
}
const balanceLabels: Record<string, string> = {
  '<500K': 'Less than 500K',
  '500K-2M': '500K – 2M',
  '>2M': 'More than 2M',
}

const sectionStyle: React.CSSProperties = {
  background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: 20,
}

function SectionHeader({ title, onEdit }: { title: string; onEdit: () => void }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
      <h4 style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{title}</h4>
      <button
        onClick={onEdit}
        style={{ fontSize: 13, color: '#2563EB', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}
      >
        Edit
      </button>
    </div>
  )
}

function KVRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 13 }}>
      <span style={{ color: '#94A3B8' }}>{label}</span>
      <span style={{ color: '#0F172A', fontWeight: 500 }}>{value}</span>
    </div>
  )
}

export default function SadadReview({ data, onChange, bills, onGoToStep }: Props) {
  const selectedBills = bills.filter((b) => data.selectedBills.includes(b.id))
  const totalBills = selectedBills.reduce((s, b) => s + b.amount, 0)
  const serviceFee = Math.round(totalBills * FEE_RATE)
  const totalRepayment = totalBills + serviceFee
  const monthlyPayment = Math.round(totalRepayment / data.term)

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>Review Your Application</h2>
      <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 32 }}>Please verify all information before submitting</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Business Profile */}
        <div style={sectionStyle}>
          <SectionHeader title="Business Profile" onEdit={() => onGoToStep(0)} />
          <KVRow label="Purpose of financing" value={purposeLabels[data.purpose] || '–'} />
          <KVRow label="Revenue (12 months)" value={revenueLabels[data.revenue] || '–'} />
          <KVRow label="Active contracts" value={contractLabels[data.contracts] || '–'} />
          <KVRow label="Debt obligations" value={debtLabels[data.debt] || '–'} />
          <KVRow label="Avg bank balance" value={balanceLabels[data.bankBalance] || '–'} />
        </div>

        {/* Selected SADAD Bills */}
        <div style={sectionStyle}>
          <SectionHeader title="Selected SADAD Bills" onEdit={() => onGoToStep(1)} />
          <div style={{ border: '1px solid #F1F5F9', borderRadius: 10, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FAFC' }}>
                  <th style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', padding: '8px 12px', textAlign: 'left' }}>Bill #</th>
                  <th style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', padding: '8px 12px', textAlign: 'left' }}>Biller</th>
                  <th style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', padding: '8px 12px', textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {selectedBills.map((b) => (
                  <tr key={b.id}>
                    <td style={{ fontSize: 12, color: '#475569', padding: '10px 12px', fontFamily: 'monospace', borderTop: '1px solid #F1F5F9' }}>{b.billNumber}</td>
                    <td style={{ fontSize: 13, color: '#0F172A', padding: '10px 12px', borderTop: '1px solid #F1F5F9' }}>{b.biller}</td>
                    <td style={{ fontSize: 13, color: '#0F172A', padding: '10px 12px', textAlign: 'right', fontWeight: 500, borderTop: '1px solid #F1F5F9' }}>{b.amount.toLocaleString()} SAR</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2} style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', padding: '10px 12px', borderTop: '1px solid #E2E8F0' }}>Total</td>
                  <td style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', padding: '10px 12px', textAlign: 'right', borderTop: '1px solid #E2E8F0' }}>{totalBills.toLocaleString()} SAR</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Financing Terms */}
        <div style={sectionStyle}>
          <SectionHeader title="Financing Terms" onEdit={() => onGoToStep(2)} />
          <KVRow label="Financing Amount" value={`${totalBills.toLocaleString()} SAR`} />
          <KVRow label="Service Fee" value={`${serviceFee.toLocaleString()} SAR`} />
          <KVRow label="Repayment Term" value={`${data.term} months`} />
          <KVRow label="Monthly Payment" value={`${monthlyPayment.toLocaleString()} SAR`} />
        </div>
      </div>

      {/* Terms Agreement */}
      <div style={{ marginTop: 20 }}>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={data.agreed}
            onChange={(e) => onChange({ agreed: e.target.checked })}
            style={{ marginTop: 3, width: 18, height: 18, accentColor: '#2563EB' }}
          />
          <span style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
            I confirm all information is accurate and I agree to the{' '}
            <a href="#" style={{ color: '#2563EB', textDecoration: 'none' }}>Terms & Conditions</a> and{' '}
            <a href="#" style={{ color: '#2563EB', textDecoration: 'none' }}>Privacy Policy</a>.
          </span>
        </label>
      </div>
    </div>
  )
}
