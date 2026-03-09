import { Calculator } from 'lucide-react'
import { motion } from 'framer-motion'
import AmountSlider from '../shared/AmountSlider'
import type { Product, WizardData } from '../types'

interface Props {
  data: WizardData
  onChange: (patch: Partial<WizardData>) => void
}

const limits: Record<Exclude<Product, ''>, { min: number; max: number }> = {
  'working-capital': { min: 50000, max: 300000 },
  invoice: { min: 10000, max: 200000 },
  sadad: { min: 10000, max: 500000 },
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: 10,
  border: '1px solid #D1D5DB',
  fontSize: 14,
  outline: 'none',
  fontFamily: 'inherit',
  resize: 'vertical',
}

const termOptions = [6, 12, 18, 24]

export default function AmountTerms({ data, onChange }: Props) {
  const product = data.product || 'working-capital'
  const { min, max } = limits[product]
  const monthly = Math.round((data.amount / data.term) * 1.05)

  const isSadad = product === 'sadad'
  const isInvoice = product === 'invoice'

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 6 }}>Amount & Terms</h2>
      <p style={{ fontSize: 14, color: '#888', marginBottom: 28 }}>
        {isSadad
          ? 'Review your financing amount and repayment schedule'
          : isInvoice
            ? 'Set your advance rate and financing terms'
            : 'Choose how much you need and your repayment term'}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {/* Amount */}
        <div style={{ background: '#F9FAFB', borderRadius: 14, padding: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 16 }}>
            {isSadad ? 'Total financing amount' : isInvoice ? 'Advance amount' : 'Requested amount'}
          </p>
          <AmountSlider value={data.amount} min={min} max={max} onChange={(v) => onChange({ amount: v })} />
          {isInvoice && (
            <p style={{ fontSize: 12, color: '#002E83', marginTop: 10, textAlign: 'center' }}>
              Up to 80% of total invoice value
            </p>
          )}
        </div>

        {/* Term */}
        {!isSadad && (
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 10 }}>Preferred term</p>
            <div style={{ display: 'flex', gap: 10 }}>
              {termOptions.map((m) => (
                <button
                  key={m}
                  onClick={() => onChange({ term: m })}
                  style={{
                    flex: 1,
                    padding: '12px 0',
                    borderRadius: 10,
                    fontWeight: 500,
                    fontSize: 14,
                    border: data.term === m ? '2px solid #002E83' : '1px solid #E5E7EB',
                    background: data.term === m ? '#EFF6FF' : '#fff',
                    color: data.term === m ? '#002E83' : '#555',
                    cursor: 'pointer',
                  }}
                >
                  {m} months
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Purpose description */}
        {!isSadad && !isInvoice && (
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 8 }}>How will you use the funds?</p>
            <textarea
              value={data.purposeDescription}
              onChange={(e) => onChange({ purposeDescription: e.target.value })}
              placeholder="Briefly describe your intended use..."
              rows={3}
              style={inputStyle}
            />
          </div>
        )}

        {/* SADAD specifics */}
        {isSadad && (
          <div style={{ background: '#F9FAFB', borderRadius: 14, padding: 20 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 12 }}>Fee Breakdown</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#888' }}>Bill total</span>
                <span style={{ fontWeight: 500 }}>{data.amount.toLocaleString()} SAR</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#888' }}>Service fee (2%)</span>
                <span style={{ fontWeight: 500 }}>{Math.round(data.amount * 0.02).toLocaleString()} SAR</span>
              </div>
              <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                <span>Total repayment</span>
                <span style={{ color: '#002E83' }}>{Math.round(data.amount * 1.02).toLocaleString()} SAR</span>
              </div>
            </div>
          </div>
        )}

        {/* Monthly payment estimate */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'linear-gradient(135deg, #002E83, #0D82F9)',
            borderRadius: 14,
            padding: 22,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>
              {isSadad ? 'Total Repayment' : 'Estimated Monthly Payment'}
            </p>
            <p style={{ fontSize: 26, fontWeight: 700, color: '#fff' }}>
              {isSadad ? Math.round(data.amount * 1.02).toLocaleString() : monthly.toLocaleString()} SAR
            </p>
            {!isSadad && (
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>
                ~5% APR for {data.term} months
              </p>
            )}
          </div>
          <Calculator size={40} color="rgba(255,255,255,0.2)" />
        </motion.div>
      </div>
    </div>
  )
}
