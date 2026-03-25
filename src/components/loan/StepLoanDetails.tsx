import { useState } from 'react'
import { Briefcase, Truck, Receipt, Calculator } from 'lucide-react'
import { useTheme } from '../../ThemeContext'
import RiyalSign from '../icons/RiyalSign'

const loanTypes = [
  {
    id: 'working-capital',
    name: 'Working Capital',
    description: 'Fund daily operations and growth',
    icon: Briefcase,
    maxAmount: 300000,
  },
  {
    id: 'equipment',
    name: 'Equipment Financing',
    description: 'Purchase machinery & equipment',
    icon: Truck,
    maxAmount: 500000,
  },
  {
    id: 'invoice',
    name: 'Invoice Financing',
    description: 'Get cash from unpaid invoices',
    icon: Receipt,
    maxAmount: 200000,
  },
]

const termOptions = [6, 12, 18, 24, 36]

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: 12,
  border: '1px solid #D1D5DB',
  fontSize: 14,
  outline: 'none',
  fontFamily: 'inherit',
  resize: 'vertical',
}

export default function StepLoanDetails() {
  const { theme } = useTheme()
  const [loanType, setLoanType] = useState('')
  const [amount, setAmount] = useState(100000)
  const [term, setTerm] = useState(12)
  const [purpose, setPurpose] = useState('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: theme.textPrimary, marginBottom: 6 }}>
          What type of financing do you need?
        </h2>
        <p style={{ fontSize: 14, color: theme.textMuted }}>Select the option that best fits your business needs</p>
      </div>

      {/* Loan Type Cards */}
      <div className="loan-type-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {loanTypes.map((type) => {
          const selected = loanType === type.id
          const Icon = type.icon
          return (
            <button
              key={type.id}
              onClick={() => setLoanType(type.id)}
              style={{
                padding: 24,
                borderRadius: 16,
                border: `2px solid ${selected ? '#002E83' : theme.border}`,
                background: selected ? '#EFF6FF' : theme.cardBg,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: selected ? '#002E83' : theme.bgPrimary,
                }}
              >
                <Icon size={24} color={selected ? '#fff' : '#888'} />
              </div>
              <h3 style={{ fontWeight: 600, color: theme.textPrimary, marginBottom: 4, fontSize: 14 }}>{type.name}</h3>
              <p style={{ fontSize: 13, color: theme.textMuted, marginBottom: 8 }}>{type.description}</p>
              <p style={{ fontSize: 13, fontWeight: 500, color: '#0D82F9' }}>
                Up to <RiyalSign size="sm" />{type.maxAmount.toLocaleString()}
              </p>
            </button>
          )
        })}
      </div>

      {/* Amount Slider */}
      <div style={{ background: theme.bgPrimary, borderRadius: 16, padding: 24 }}>
        <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: theme.textSecondary, marginBottom: 16 }}>
          How much do you need?
        </label>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 36, fontWeight: 700, color: '#002E83' }}>
            <RiyalSign size="lg" />{amount.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min={10000}
          max={500000}
          step={10000}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          style={{
            width: '100%',
            height: 8,
            borderRadius: 4,
            appearance: 'none',
            background: `linear-gradient(to right, #002E83 ${((amount - 10000) / 490000) * 100}%, #E5E7EB ${((amount - 10000) / 490000) * 100}%)`,
            cursor: 'pointer',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: theme.textMuted, marginTop: 8 }}>
          <span><RiyalSign size="sm" />10,000</span>
          <span><RiyalSign size="sm" />500,000</span>
        </div>
      </div>

      {/* Term Selection */}
      <div>
        <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: theme.textSecondary, marginBottom: 12 }}>
          Repayment Term
        </label>
        <div style={{ display: 'flex', gap: 12 }}>
          {termOptions.map((months) => (
            <button
              key={months}
              onClick={() => setTerm(months)}
              style={{
                flex: 1,
                padding: '12px 0',
                borderRadius: 12,
                fontWeight: 500,
                fontSize: 14,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: term === months ? '#002E83' : theme.bgPrimary,
                color: term === months ? '#fff' : theme.textSecondary,
              }}
            >
              {months} months
            </button>
          ))}
        </div>
      </div>

      {/* Purpose */}
      <div>
        <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: theme.textSecondary, marginBottom: 8 }}>
          Purpose of Financing
        </label>
        <textarea
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          placeholder="Briefly describe how you plan to use the funds..."
          rows={3}
          style={inputStyle}
        />
      </div>

      {/* Estimated Monthly Payment */}
      <div
        style={{
          background: 'linear-gradient(135deg, #002E83 0%, #0D82F9 100%)',
          borderRadius: 16,
          padding: 24,
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>Estimated Monthly Payment</p>
          <p style={{ fontSize: 30, fontWeight: 700 }}>
            <RiyalSign size="sm" />{Math.round((amount / term) * 1.05).toLocaleString()}
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>
            at ~5% APR for {term} months
          </p>
        </div>
        <Calculator size={48} color="rgba(255,255,255,0.25)" />
      </div>
    </div>
  )
}
