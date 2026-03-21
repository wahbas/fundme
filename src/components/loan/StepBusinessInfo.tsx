import { useTheme } from '../../ThemeContext'

export default function StepBusinessInfo() {
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
  const years = Array.from({ length: 30 }, (_, i) => 2025 - i)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: theme.textPrimary, marginBottom: 6 }}>
          Tell us about your business
        </h2>
        <p style={{ fontSize: 14, color: theme.textMuted }}>This helps us understand your business better</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <label style={labelStyle}>Company Name (Arabic)</label>
          <input type="text" placeholder="اسم الشركة" style={{ ...inputStyle, direction: 'rtl' }} />
        </div>
        <div>
          <label style={labelStyle}>Company Name (English)</label>
          <input type="text" placeholder="Company Name" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Commercial Registration (CR) Number</label>
          <input type="text" placeholder="1010XXXXXX" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>VAT Registration Number</label>
          <input type="text" placeholder="3XXXXXXXXXXXXXXX" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Industry Sector</label>
          <select style={inputStyle}>
            <option value="">Select industry...</option>
            <option value="retail">Retail & E-commerce</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="services">Professional Services</option>
            <option value="construction">Construction</option>
            <option value="tech">Technology</option>
            <option value="food">Food & Beverage</option>
            <option value="healthcare">Healthcare</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Year Established</label>
          <select style={inputStyle}>
            <option value="">Select year...</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Number of Employees</label>
          <select style={inputStyle}>
            <option value="">Select range...</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-100">51-100</option>
            <option value="101-250">101-250</option>
            <option value="250+">250+</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>City</label>
          <select style={inputStyle}>
            <option value="">Select city...</option>
            <option value="riyadh">Riyadh</option>
            <option value="jeddah">Jeddah</option>
            <option value="dammam">Dammam</option>
            <option value="mecca">Mecca</option>
            <option value="medina">Medina</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Business Address</label>
        <textarea
          placeholder="Full business address..."
          rows={2}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>
    </div>
  )
}
