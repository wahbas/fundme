import { Building2, BarChart3, FileUp, CheckCircle2 } from 'lucide-react'

function ReviewSection({
  icon: Icon,
  title,
  onEdit,
  children,
}: {
  icon: React.ElementType
  title: string
  onEdit: () => void
  children: React.ReactNode
}) {
  return (
    <div style={{ border: '1px solid #E5E7EB', borderRadius: 12, padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontWeight: 600, color: '#111', display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
          <Icon size={18} color="#002E83" />
          {title}
        </h3>
        <button
          onClick={onEdit}
          style={{ fontSize: 13, color: '#0D82F9', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Edit
        </button>
      </div>
      {children}
    </div>
  )
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ fontSize: 13, color: '#888', marginBottom: 2 }}>{label}</p>
      <p style={{ fontSize: 14, fontWeight: 500, color: '#111' }}>{value}</p>
    </div>
  )
}

export default function StepReview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: '#111', marginBottom: 6 }}>
          Review Your Application
        </h2>
        <p style={{ fontSize: 14, color: '#888' }}>Please verify all information before submitting</p>
      </div>

      {/* Loan Summary */}
      <div
        style={{
          background: 'linear-gradient(135deg, #002E83 0%, #0D82F9 100%)',
          borderRadius: 16,
          padding: 24,
          color: '#fff',
        }}
      >
        <h3 style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 12 }}>Loan Request Summary</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          <div>
            <p style={{ fontSize: 22, fontWeight: 700 }}>200,000 SAR</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>Requested Amount</p>
          </div>
          <div>
            <p style={{ fontSize: 22, fontWeight: 700 }}>12 months</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>Repayment Term</p>
          </div>
          <div>
            <p style={{ fontSize: 22, fontWeight: 700 }}>~17,500 SAR</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>Monthly Payment</p>
          </div>
        </div>
      </div>

      {/* Business Info */}
      <ReviewSection icon={Building2} title="Business Information" onEdit={() => {}}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <InfoField label="Company Name" value="Al Mansour Trading Co." />
          <InfoField label="CR Number" value="1010123456" />
          <InfoField label="Industry" value="Retail & E-commerce" />
          <InfoField label="Employees" value="11-50" />
        </div>
      </ReviewSection>

      {/* Financial Info */}
      <ReviewSection icon={BarChart3} title="Financial Information" onEdit={() => {}}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <InfoField label="Annual Revenue" value="1,200,000 SAR" />
          <InfoField label="Monthly Revenue" value="100,000 SAR" />
          <InfoField label="Existing Loans" value="None" />
          <InfoField label="Bank Account" value="Al Rajhi ---- 4521" />
        </div>
      </ReviewSection>

      {/* Documents */}
      <ReviewSection icon={FileUp} title="Documents" onEdit={() => {}}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['CR Certificate', 'VAT Certificate', 'Bank Statements'].map((doc) => (
            <span
              key={doc}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 12px',
                background: '#DCFCE7',
                color: '#15803D',
                fontSize: 13,
                borderRadius: 20,
              }}
            >
              <CheckCircle2 size={14} />
              {doc}
            </span>
          ))}
        </div>
      </ReviewSection>

      {/* Terms */}
      <div style={{ background: '#F9FAFB', borderRadius: 12, padding: 20 }}>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
          <input
            type="checkbox"
            style={{ marginTop: 3, width: 18, height: 18, accentColor: '#002E83' }}
          />
          <span style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>
            I confirm that all information provided is accurate and complete. I agree to the{' '}
            <a href="#" style={{ color: '#0D82F9' }}>Terms of Service</a> and{' '}
            <a href="#" style={{ color: '#0D82F9' }}>Privacy Policy</a>.
            I authorize FundMe to verify my information and conduct credit checks.
          </span>
        </label>
      </div>
    </div>
  )
}
