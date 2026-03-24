import { Landmark, CheckCircle2, Upload } from 'lucide-react'
import { useTheme } from '../../ThemeContext'
import RiyalSign from '../icons/RiyalSign'

export default function StepFinancialInfo() {
  const { theme } = useTheme()

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 12,
    border: `1px solid ${theme.inputBorder}`,
    fontSize: 14,
    outline: 'none',
    fontFamily: 'inherit',
    background: theme.inputBg,
    color: theme.textPrimary,
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 13,
    fontWeight: 500,
    color: theme.textSecondary,
    marginBottom: 8,
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: theme.textPrimary, marginBottom: 6 }}>
          Financial Information
        </h2>
        <p style={{ fontSize: 14, color: theme.textMuted }}>Help us assess your financing eligibility</p>
      </div>

      <div className="loan-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <label style={labelStyle}>Annual Revenue (<RiyalSign size="sm" />)</label>
          <input type="text" placeholder="e.g., 1,000,000" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Average Monthly Revenue (<RiyalSign size="sm" />)</label>
          <input type="text" placeholder="e.g., 85,000" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Existing Business Loans</label>
          <select style={inputStyle}>
            <option value="none">No existing loans</option>
            <option value="1">1 active loan</option>
            <option value="2">2 active loans</option>
            <option value="3+">3 or more</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Total Outstanding Amount (<RiyalSign size="sm" />)</label>
          <input type="text" placeholder="0 if none" style={inputStyle} />
        </div>
      </div>

      {/* Connected Bank Account */}
      <div style={{ background: theme.bgPrimary, borderRadius: 16, padding: 24 }}>
        <h3 style={{ fontWeight: 600, color: theme.textPrimary, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
          <Landmark size={20} color="#002E83" />
          Connected Bank Account
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 700, color: '#002E83' }}>AR</span>
            </div>
            <div>
              <p style={{ fontWeight: 500, color: theme.textPrimary, fontSize: 14 }}>Al Rajhi Bank</p>
              <p style={{ fontSize: 13, color: theme.textMuted }}>---- ---- ---- 4521</p>
            </div>
          </div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '4px 12px',
              background: '#DCFCE7',
              color: '#15803D',
              fontSize: 13,
              fontWeight: 500,
              borderRadius: 20,
            }}
          >
            <CheckCircle2 size={14} />
            Verified
          </span>
        </div>
      </div>

      {/* Financial Statements Upload */}
      <div>
        <label style={labelStyle}>Latest Financial Statements (Optional)</label>
        <div
          style={{
            border: '2px dashed #D1D5DB',
            borderRadius: 12,
            padding: 32,
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          <Upload size={32} color="#9CA3AF" style={{ margin: '0 auto 8px' }} />
          <p style={{ color: theme.textSecondary, fontSize: 14 }}>
            Drag & drop files or <span style={{ color: '#0D82F9' }}>browse</span>
          </p>
          <p style={{ color: '#9CA3AF', fontSize: 13, marginTop: 4 }}>PDF, XLS up to 10MB</p>
        </div>
      </div>
    </div>
  )
}
