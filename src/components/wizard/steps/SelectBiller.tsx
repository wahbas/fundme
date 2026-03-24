import { useState } from 'react'
import { Search, ChevronRight, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../../../ThemeContext'
import type { WizardData } from '../../../pages/RequestFinancing'
import RiyalSign from '../../icons/RiyalSign'

interface Props {
  data: WizardData
  onChange: (p: Partial<WizardData>) => void
}

const billersByCategory: Record<string, { name: string; code: string; initials: string }[]> = {
  government: [
    { name: 'Saudi Electricity Company', code: 'SEC-001', initials: 'SE' },
    { name: 'National Water Company', code: 'NWC-002', initials: 'NW' },
    { name: 'Ministry of Interior', code: 'MOI-006', initials: 'MI' },
    { name: 'General Authority of Zakat and Tax', code: 'GAZT-007', initials: 'GA' },
    { name: 'Traffic Department', code: 'TRF-008', initials: 'TD' },
  ],
  utilities: [
    { name: 'Saudi Electricity Company', code: 'SEC-001', initials: 'SE' },
    { name: 'National Water Company', code: 'NWC-002', initials: 'NW' },
    { name: 'Marafiq', code: 'MRF-009', initials: 'MR' },
  ],
  telecom: [
    { name: 'STC - Saudi Telecom', code: 'STC-003', initials: 'ST' },
    { name: 'Mobily', code: 'MOB-004', initials: 'MB' },
    { name: 'Zain KSA', code: 'ZAI-005', initials: 'ZN' },
  ],
  banks: [
    { name: 'Al Rajhi Bank', code: 'ARB-010', initials: 'AR' },
    { name: 'Saudi National Bank', code: 'SNB-011', initials: 'SN' },
    { name: 'Riyad Bank', code: 'RYB-012', initials: 'RB' },
  ],
  services: [
    { name: 'Elm Company', code: 'ELM-013', initials: 'EL' },
    { name: 'Thiqah Business Services', code: 'THQ-014', initials: 'TH' },
  ],
  others: [
    { name: 'Saudi Post', code: 'SPL-015', initials: 'SP' },
    { name: 'General Organization for Social Insurance', code: 'GOSI-016', initials: 'GO' },
  ],
}

const categoryConfig: Record<string, { label: string; bg: string; color: string }> = {
  government: { label: 'Government', bg: '#FEF3C7', color: '#B45309' },
  utilities: { label: 'Utilities', bg: '#EDE9FE', color: '#7C3AED' },
  telecom: { label: 'Telecom', bg: '#E0E7FF', color: '#4F46E5' },
  banks: { label: 'Banks', bg: '#D1FAE5', color: '#059669' },
  services: { label: 'Services', bg: '#FCE7F3', color: '#DB2777' },
  others: { label: 'Others', bg: '#F1F5F9', color: '#64748B' },
}

export default function SelectBiller({ data, onChange }: Props) {
  const { theme } = useTheme()
  const [search, setSearch] = useState('')
  const [showManualForm, setShowManualForm] = useState(false)
  const [manualBiller, setManualBiller] = useState({ name: '', accountNumber: '', billNumber: '', amount: '', dueDate: '' })

  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 600, color: theme.textMuted, marginBottom: 6,
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', background: theme.inputBg,
    border: `1px solid ${theme.inputBorder}`, borderRadius: 10, fontSize: 14, outline: 'none',
    boxSizing: 'border-box', color: theme.textPrimary,
  }

  const billers = billersByCategory[data.category] || []
  const catConf = categoryConfig[data.category] || categoryConfig.others
  const filtered = search
    ? billers.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()) || b.code.toLowerCase().includes(search.toLowerCase()))
    : billers

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: theme.textPrimary, marginBottom: 6, textAlign: 'center' }}>Select Biller</h2>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
        <p style={{ fontSize: 14, color: theme.textSecondary }}>Showing billers in</p>
        <span style={{
          padding: '3px 10px', borderRadius: 20, background: theme.bgPrimary,
          fontSize: 11, fontWeight: 600, color: theme.textMuted,
        }}>
          {catConf.label}
        </span>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          placeholder="Search biller name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '14px 16px 14px 44px',
            background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 12,
            fontSize: 14, color: theme.textPrimary, outline: 'none',
            transition: 'border-color 0.15s, box-shadow 0.15s',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#2563EB'
            e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.08)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = theme.border
            e.target.style.boxShadow = 'none'
          }}
        />
      </div>

      {/* Manual entry */}
      <button
        onClick={() => setShowManualForm((v) => !v)}
        style={{
          width: '100%', padding: 16, background: theme.cardBg,
          border: `1px dashed ${theme.textMuted}`, borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          fontSize: 14, fontWeight: 500, color: theme.textSecondary, cursor: 'pointer',
          marginBottom: 16, transition: 'border-color 0.15s, background 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#2563EB'
          e.currentTarget.style.background = 'rgba(37,99,235,0.02)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = theme.textMuted
          e.currentTarget.style.background = theme.cardBg
        }}
      >
        <Plus size={18} />
        Manual Biller Entry
      </button>

      {/* Manual form */}
      {showManualForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 12,
            padding: 20, marginBottom: 16, overflow: 'hidden',
          }}
        >
          {/* Biller Name - full width */}
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Biller Name</label>
            <input
              type="text"
              value={manualBiller.name}
              onChange={(e) => setManualBiller((p) => ({ ...p, name: e.target.value }))}
              style={inputStyle}
              placeholder="Enter biller name"
            />
          </div>

          {/* 2-column grid */}
          <div className="biller-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>Biller ID / Account Number</label>
              <input
                type="text"
                value={manualBiller.accountNumber}
                onChange={(e) => setManualBiller((p) => ({ ...p, accountNumber: e.target.value }))}
                style={inputStyle}
                placeholder="Enter account number"
              />
            </div>
            <div>
              <label style={labelStyle}>Bill Number</label>
              <input
                type="text"
                value={manualBiller.billNumber}
                onChange={(e) => setManualBiller((p) => ({ ...p, billNumber: e.target.value }))}
                style={inputStyle}
                placeholder="Enter bill number"
              />
            </div>
            <div>
              <label style={labelStyle}>Amount (<RiyalSign size="sm" />)</label>
              <input
                type="number"
                value={manualBiller.amount}
                onChange={(e) => setManualBiller((p) => ({ ...p, amount: e.target.value }))}
                style={inputStyle}
                placeholder="0.00"
              />
            </div>
            <div>
              <label style={labelStyle}>Due Date</label>
              <input
                type="date"
                value={manualBiller.dueDate}
                onChange={(e) => setManualBiller((p) => ({ ...p, dueDate: e.target.value }))}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Add Bill button */}
          <button
            onClick={() => {
              onChange({ biller: manualBiller.name, billerCode: 'MANUAL-' + Date.now() })
              setShowManualForm(false)
            }}
            style={{
              background: '#7CFF01', color: '#0F172A', fontWeight: 600, fontSize: 14,
              width: '100%', height: 44, borderRadius: 10, border: 'none',
              cursor: 'pointer', marginTop: 12,
            }}
          >
            Add Bill
          </button>

          {/* Cancel link */}
          <p
            onClick={() => setShowManualForm(false)}
            style={{
              fontSize: 13, color: '#94A3B8', cursor: 'pointer', textAlign: 'center',
              marginTop: 10,
            }}
          >
            Cancel
          </p>
        </motion.div>
      )}

      {/* Biller list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((biller, i) => {
          const isSelected = data.biller === biller.name
          return (
            <motion.button
              key={biller.code}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => onChange({ biller: biller.name, billerCode: biller.code, selectedBills: [], financingType: {}, partialAmounts: {} })}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                width: '100%', padding: isSelected ? '15px 19px' : '16px 20px',
                background: isSelected ? 'rgba(37,99,235,0.03)' : theme.cardBg,
                border: isSelected ? '2px solid #2563EB' : `1.5px solid ${theme.border}`,
                borderRadius: 12, cursor: 'pointer',
                textAlign: 'left', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = theme.textMuted
                  e.currentTarget.style.background = theme.bgHover
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = theme.border
                  e.currentTarget.style.background = theme.cardBg
                }
              }}
            >
              {/* Icon avatar */}
              <div style={{
                width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                background: catConf.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700, color: catConf.color,
              }}>
                {biller.initials}
              </div>

              {/* Name + code */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary, marginBottom: 2 }}>{biller.name}</p>
                <p style={{ fontSize: 12, color: theme.textMuted, fontFamily: 'monospace' }}>{biller.code}</p>
              </div>

              {/* Arrow */}
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: isSelected ? '#2563EB' : theme.bgPrimary,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s',
              }}>
                <ChevronRight size={14} color={isSelected ? '#fff' : '#94A3B8'} />
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
