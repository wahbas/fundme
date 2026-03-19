import { useState } from 'react'
import { Search, ChevronRight, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import type { WizardData } from '../../../pages/RequestFinancing'

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
  const [search, setSearch] = useState('')
  const billers = billersByCategory[data.category] || []
  const catConf = categoryConfig[data.category] || categoryConfig.others
  const filtered = search
    ? billers.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()) || b.code.toLowerCase().includes(search.toLowerCase()))
    : billers

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 6, textAlign: 'center' }}>Select Biller</h2>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
        <p style={{ fontSize: 14, color: '#475569' }}>Showing billers in</p>
        <span style={{
          padding: '3px 10px', borderRadius: 20, background: '#F1F5F9',
          fontSize: 11, fontWeight: 600, color: '#64748B',
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
            background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12,
            fontSize: 14, color: '#0F172A', outline: 'none',
            transition: 'border-color 0.15s, box-shadow 0.15s',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#2563EB'
            e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.08)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#E2E8F0'
            e.target.style.boxShadow = 'none'
          }}
        />
      </div>

      {/* Manual entry */}
      <button
        style={{
          width: '100%', padding: 16, background: '#fff',
          border: '1px dashed #CBD5E1', borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          fontSize: 14, fontWeight: 500, color: '#475569', cursor: 'pointer',
          marginBottom: 16, transition: 'border-color 0.15s, background 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#2563EB'
          e.currentTarget.style.background = 'rgba(37,99,235,0.02)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#CBD5E1'
          e.currentTarget.style.background = '#fff'
        }}
      >
        <Plus size={18} />
        Manual Biller Entry
      </button>

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
                background: isSelected ? 'rgba(37,99,235,0.03)' : '#fff',
                border: isSelected ? '2px solid #2563EB' : '1.5px solid #E2E8F0',
                borderRadius: 12, cursor: 'pointer',
                textAlign: 'left', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#CBD5E1'
                  e.currentTarget.style.background = '#FAFBFC'
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#E2E8F0'
                  e.currentTarget.style.background = '#fff'
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
                <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', marginBottom: 2 }}>{biller.name}</p>
                <p style={{ fontSize: 12, color: '#94A3B8', fontFamily: 'monospace' }}>{biller.code}</p>
              </div>

              {/* Arrow */}
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: isSelected ? '#2563EB' : '#F5F7FA',
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
