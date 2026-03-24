import { useState } from 'react'
import { Landmark, CheckCircle2, Info } from 'lucide-react'
import { useTheme } from '../../../ThemeContext'
import ReviewSection from '../shared/ReviewSection'
import { CONNECTED_BANKS, type WizardData } from '../types'
import RiyalSign from '../../icons/RiyalSign'

interface Props {
  data: WizardData
  onGoToStep: (idx: number) => void
}

const purposeLabels: Record<string, string> = {
  'working-capital': 'Working capital',
  'new-projects': 'New projects',
  repay: 'Repay obligations',
  other: 'Other',
}

const revenueLabels: Record<string, string> = {
  '<1M': 'Less than 1M',
  '1-5M': '1M \u2013 5M',
  '5-20M': '5M \u2013 20M',
  '>20M': 'More than 20M',
}

export default function ReviewSubmit({ data, onGoToStep }: Props) {
  const { theme } = useTheme()
  const [agreed, setAgreed] = useState(false)
  const isSadad = data.product === 'sadad'
  const isInvoice = data.product === 'invoice'
  const monthly = Math.round((data.amount / data.term) * 1.05)
  const selectedBank = CONNECTED_BANKS.find((b) => b.id === data.selectedBankId)
  const bankStepIdx = isSadad || isInvoice ? 4 : 3

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textPrimary, marginBottom: 6 }}>Review & Submit</h2>
      <p style={{ fontSize: 14, color: theme.textMuted, marginBottom: 28 }}>Please verify all information before submitting</p>

      {/* Summary */}
      <div
        style={{
          background: 'linear-gradient(135deg, #001D5C, #002E83)',
          borderRadius: 14,
          padding: 22,
          marginBottom: 20,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 20,
        }}
        className="wizard-summary-grid"
      >
        <div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginBottom: 4 }}>Amount</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{data.amount.toLocaleString()}<RiyalSign color="#FFFFFF" /></p>
        </div>
        <div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginBottom: 4 }}>
            {isSadad ? 'Repayment' : 'Term'}
          </p>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>
            {isSadad ? <>{Math.round(data.amount * 1.02).toLocaleString()}<RiyalSign size="sm" color="#FFFFFF" /></> : `${data.term} months`}
          </p>
        </div>
        <div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginBottom: 4 }}>
            {isSadad ? 'Service Fee' : 'Monthly'}
          </p>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>
            {isSadad ? <>{Math.round(data.amount * 0.02).toLocaleString()}<RiyalSign size="sm" color="#FFFFFF" /></> : <>~{monthly.toLocaleString()}<RiyalSign size="sm" color="#FFFFFF" /></>}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Product */}
        <ReviewSection
          title="Product"
          onEdit={() => onGoToStep(0)}
          items={[
            {
              label: 'Type',
              value: data.product === 'working-capital' ? 'Working Capital'
                : data.product === 'invoice' ? 'Invoice Financing'
                : 'SADAD Invoice Financing',
            },
          ]}
        />

        {/* Business */}
        <ReviewSection
          title="Business Profile"
          onEdit={() => onGoToStep(1)}
          items={[
            { label: 'Purpose', value: purposeLabels[data.purpose] || '\u2013' },
            { label: 'Revenue (12 mo)', value: revenueLabels[data.revenue] || '\u2013' },
            { label: 'Contracts', value: data.contracts || '\u2013' },
            { label: 'Debt', value: data.debt || '\u2013' },
            { label: 'Bank balance', value: data.bankBalance || '\u2013' },
          ]}
        />

        {/* Invoices / SADAD */}
        {isInvoice && (
          <ReviewSection
            title="Invoices"
            onEdit={() => onGoToStep(2)}
            items={[
              { label: 'Invoices uploaded', value: String(data.invoices.length) },
              { label: 'Total value', value: `${data.invoices.reduce((s, i) => s + i.amount, 0).toLocaleString()}` },
            ]}
          />
        )}
        {isSadad && (
          <ReviewSection
            title="SADAD Bills"
            onEdit={() => onGoToStep(2)}
            items={[
              { label: 'Bills selected', value: String(data.selectedBills.length) },
              { label: 'Total amount', value: `${data.amount.toLocaleString()}` },
            ]}
          />
        )}

        {/* Amount */}
        <ReviewSection
          title="Amount & Terms"
          onEdit={() => onGoToStep(isSadad || isInvoice ? 3 : 2)}
          items={[
            { label: 'Amount', value: `${data.amount.toLocaleString()}` },
            ...(!isSadad ? [{ label: 'Term', value: `${data.term} months` }] : []),
            ...(data.purposeDescription ? [{ label: 'Purpose', value: data.purposeDescription }] : []),
          ]}
        />
      </div>

      {/* Disbursement Account */}
      <div
        style={{
          border: `1px solid ${theme.border}`,
          borderRadius: 12,
          overflow: 'hidden',
          marginTop: 12,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 18px',
            background: theme.bgPrimary,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Landmark size={16} color="#002E83" />
            <span style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary }}>Disbursement Account</span>
          </div>
          <span
            onClick={() => onGoToStep(bankStepIdx)}
            style={{ fontSize: 13, color: '#0D82F9', fontWeight: 500, cursor: 'pointer' }}
          >
            Change
          </span>
        </div>
        <div style={{ padding: '16px 18px' }}>
          {selectedBank ? (
            <>
              <p style={{ fontSize: 14, fontWeight: 500, color: theme.textPrimary, marginBottom: 4 }}>
                {selectedBank.bankName} •••• {selectedBank.lastFour}
              </p>
              <p style={{ fontSize: 12, color: theme.textMuted, fontFamily: 'monospace', marginBottom: 6 }}>
                {selectedBank.iban}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={14} color="#16A34A" />
                <span style={{ fontSize: 12, color: '#16A34A', fontWeight: 500 }}>Verified</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 14,
                  padding: '10px 14px',
                  background: '#EFF6FF',
                  borderRadius: 8,
                  fontSize: 12,
                  color: theme.textSecondary,
                }}
              >
                <Info size={14} color="#0D82F9" style={{ flexShrink: 0 }} />
                Funds will be disbursed to this account upon approval
              </div>
            </>
          ) : (
            <p style={{ fontSize: 13, color: '#D97706' }}>No bank account selected</p>
          )}
        </div>
      </div>

      {/* Terms */}
      <div style={{ marginTop: 24, background: theme.bgPrimary, borderRadius: 12, padding: 18 }}>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            style={{ marginTop: 3, width: 18, height: 18, accentColor: '#002E83' }}
          />
          <span style={{ fontSize: 13, color: theme.textSecondary, lineHeight: 1.6 }}>
            I confirm that all information is accurate. I agree to the{' '}
            <a href="/terms" style={{ color: '#002E83' }}>Terms of Service</a> and{' '}
            <a href="/privacy" style={{ color: '#002E83' }}>Privacy Policy</a>.
            I authorize FundMe to verify my information and conduct credit checks.
          </span>
        </label>
      </div>
    </div>
  )
}
