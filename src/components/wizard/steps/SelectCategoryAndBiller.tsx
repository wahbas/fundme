import { useState } from 'react'
import { Search, ChevronRight, ChevronLeft, Plus, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../../ThemeContext'
import { useI18n } from '../../../i18n'
import type { WizardData } from '../../../pages/RequestFinancing'
import RiyalSign from '../../icons/RiyalSign'

interface Props {
  data: WizardData
  onChange: (p: Partial<WizardData>) => void
}

// ─── Category icons ──────────────────────────────────────────

function GovernmentIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M3 21H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 21V9L12 4L19 9V21" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="9" y="13" width="6" height="8" rx="0.5" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

function UtilitiesIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TelecomIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="7" y="2" width="10" height="20" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M11 18H13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function BanksIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M3 21H21M4 21V10L12 5L20 10V21" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="8" y="13" width="3" height="8" stroke={color} strokeWidth="1.3" />
      <rect x="13" y="13" width="3" height="8" stroke={color} strokeWidth="1.3" />
    </svg>
  )
}

function ServicesIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

function OthersIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="12" r="2" fill={color} />
      <circle cx="12" cy="12" r="2" fill={color} />
      <circle cx="18" cy="12" r="2" fill={color} />
    </svg>
  )
}

// ─── Data ────────────────────────────────────────────────────

const categories = [
  { id: 'government', labelKey: 'wizard.catGovernment', Icon: GovernmentIcon, iconColor: '#B45309', bg: '#FEF3C7', activeBg: '#B45309' },
  { id: 'utilities', labelKey: 'wizard.catUtilities', Icon: UtilitiesIcon, iconColor: '#7C3AED', bg: '#EDE9FE', activeBg: '#7C3AED' },
  { id: 'telecom', labelKey: 'wizard.catTelecom', Icon: TelecomIcon, iconColor: '#4F46E5', bg: '#E0E7FF', activeBg: '#4F46E5' },
  { id: 'banks', labelKey: 'wizard.catBanks', Icon: BanksIcon, iconColor: '#059669', bg: '#D1FAE5', activeBg: '#059669' },
  { id: 'services', labelKey: 'wizard.catServices', Icon: ServicesIcon, iconColor: '#DB2777', bg: '#FCE7F3', activeBg: '#DB2777' },
  { id: 'others', labelKey: 'wizard.catOthers', Icon: OthersIcon, iconColor: '#64748B', bg: '#F1F5F9', activeBg: '#64748B' },
]

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

// ─── Manual Biller Sheet ─────────────────────────────────────

function ManualBillerSheet({ open, onClose, onAdd }: {
  open: boolean
  onClose: () => void
  onAdd: (name: string, code: string) => void
}) {
  const { theme } = useTheme()
  const { t } = useI18n()
  const [form, setForm] = useState({ name: '', accountNumber: '', billNumber: '', amount: '', dueDate: '' })

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 12, fontWeight: 600, color: theme.textMuted, marginBottom: 6,
  }
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', background: theme.inputBg,
    border: `1px solid ${theme.inputBorder}`, borderRadius: 10, fontSize: 14, outline: 'none',
    boxSizing: 'border-box', color: theme.textPrimary,
  }
  const canAdd = form.name.trim() && form.billNumber.trim() && form.amount.trim()

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 9998, backdropFilter: 'blur(3px)' }}
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="side-sheet"
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: 440, maxWidth: '100%',
              background: theme.cardBg, boxShadow: '-8px 0 40px rgba(0,0,0,0.15)',
              zIndex: 9999, display: 'flex', flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${theme.border}` }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: theme.textPrimary, margin: 0 }}>{t('wizard.manualBillerEntry' as any)}</h3>
              <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: theme.bgPrimary, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={16} color={theme.textMuted} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>{t('wizard.billerName' as any)} *</label>
                <input type="text" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} style={inputStyle} placeholder={t('wizard.enterBillerName' as any)} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>{t('wizard.billerAccountNo' as any)}</label>
                <input type="text" value={form.accountNumber} onChange={(e) => setForm(p => ({ ...p, accountNumber: e.target.value }))} style={inputStyle} placeholder={t('wizard.enterAccountNo' as any)} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>{t('wizard.billNumber' as any)} *</label>
                <input type="text" value={form.billNumber} onChange={(e) => setForm(p => ({ ...p, billNumber: e.target.value }))} style={inputStyle} placeholder={t('wizard.enterBillNo' as any)} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>{t('wizard.amount' as any)} (<RiyalSign size="sm" />) *</label>
                <input type="number" value={form.amount} onChange={(e) => setForm(p => ({ ...p, amount: e.target.value }))} style={inputStyle} placeholder="0.00" />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>{t('wizard.dueDate' as any)}</label>
                <input type="date" value={form.dueDate} onChange={(e) => setForm(p => ({ ...p, dueDate: e.target.value }))} style={inputStyle} />
              </div>
            </div>
            <div style={{ padding: '16px 24px', borderTop: `1px solid ${theme.border}`, display: 'flex', gap: 12 }}>
              <button
                onClick={() => { if (!canAdd) return; onAdd(form.name, 'MANUAL-' + Date.now()); setForm({ name: '', accountNumber: '', billNumber: '', amount: '', dueDate: '' }) }}
                style={{ flex: 1, height: 44, borderRadius: 10, border: 'none', background: canAdd ? '#2563EB' : '#E2E8F0', color: canAdd ? '#fff' : '#94A3B8', fontWeight: 600, fontSize: 14, cursor: canAdd ? 'pointer' : 'not-allowed' }}
              >
                {t('wizard.addBill' as any)}
              </button>
              <button onClick={onClose} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.cardBg, color: theme.textSecondary, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Main Component ──────────────────────────────────────────

export default function SelectCategoryAndBiller({ data, onChange }: Props) {
  const { theme } = useTheme()
  const { t, isRTL } = useI18n()
  const [search, setSearch] = useState('')

  const activeCategory = data.category || 'government'
  const billers = billersByCategory[activeCategory] || []
  const catConfig = categories.find(c => c.id === activeCategory)!

  const filtered = search
    ? billers.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()) || b.code.toLowerCase().includes(search.toLowerCase()))
    : billers

  function selectCategory(id: string) {
    onChange({ category: id, biller: '', billerCode: '', selectedBills: [], financingType: {}, partialAmounts: {} })
    setSearch('')
  }

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: theme.textPrimary, marginBottom: 6, textAlign: 'center' }}>
        {t('wizard.selectBillerTitle' as any)}
      </h2>
      <p style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 28, textAlign: 'center' }}>
        {t('wizard.chooseCategoryDesc' as any)}
      </p>

      {/* Category Tabs */}
      <div style={{
        display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto',
        paddingBottom: 4, scrollbarWidth: 'none',
      }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id
          const { Icon } = cat
          return (
            <button
              key={cat.id}
              onClick={() => selectCategory(cat.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 16px',
                background: isActive ? cat.activeBg : theme.cardBg,
                border: isActive ? 'none' : `1.5px solid ${theme.border}`,
                borderRadius: 20,
                fontSize: 13, fontWeight: 600,
                color: isActive ? '#fff' : theme.textSecondary,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 0.2s',
              }}
            >
              <Icon color={isActive ? '#fff' : cat.iconColor} />
              {t(cat.labelKey as any)}
            </button>
          )
        })}
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          placeholder={t('wizard.searchBiller' as any)}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '14px 16px 14px 44px',
            background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 12,
            fontSize: 14, color: theme.textPrimary, outline: 'none',
            transition: 'border-color 0.15s, box-shadow 0.15s',
          }}
          onFocus={(e) => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.08)' }}
          onBlur={(e) => { e.target.style.borderColor = theme.border; e.target.style.boxShadow = 'none' }}
        />
      </div>

      {/* Biller list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((biller, i) => {
          const isSelected = data.biller === biller.name
          return (
            <motion.button
              key={biller.code}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
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
                if (!isSelected) { e.currentTarget.style.borderColor = theme.textMuted; e.currentTarget.style.background = theme.bgHover }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.background = theme.cardBg }
              }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                background: catConfig.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700, color: catConfig.iconColor,
              }}>
                {biller.initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary, marginBottom: 2 }}>{biller.name}</p>
                <p style={{ fontSize: 12, color: theme.textMuted, fontFamily: 'monospace' }}>{biller.code}</p>
              </div>
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: isSelected ? '#2563EB' : theme.bgPrimary,
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s',
              }}>
                {isRTL ? <ChevronLeft size={14} color={isSelected ? '#fff' : '#94A3B8'} /> : <ChevronRight size={14} color={isSelected ? '#fff' : '#94A3B8'} />}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
