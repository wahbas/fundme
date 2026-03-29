import { useState, useEffect } from 'react'
import { Search, ChevronRight, Plus, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../../ThemeContext'
import { useI18n } from '../../../i18n'
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
  const { t } = useI18n()
  const [search, setSearch] = useState('')
  const [showManualForm, setShowManualForm] = useState(false)
  const [manualBiller, setManualBiller] = useState({ name: '', accountNumber: '', billNumber: '', amount: '', dueDate: '' })



  const billers = billersByCategory[data.category] || []
  const catConf = categoryConfig[data.category] || categoryConfig.others
  const filtered = search
    ? billers.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()) || b.code.toLowerCase().includes(search.toLowerCase()))
    : billers

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: theme.textPrimary, marginBottom: 6, textAlign: 'center' }}>{t('wizard.selectBillerTitle' as any)}</h2>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
        <p style={{ fontSize: 14, color: theme.textSecondary }}>{t('wizard.showingBillersIn' as any)}</p>
        <span style={{
          padding: '3px 10px', borderRadius: 20, background: theme.bgPrimary,
          fontSize: 11, fontWeight: 600, color: theme.textMuted,
        }}>
          {t(`wizard.cat${data.category.charAt(0).toUpperCase()}${data.category.slice(1)}` as any)}
        </span>
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

      {/* Manual entry trigger */}
      <button
        onClick={() => setShowManualForm(true)}
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
        {t('wizard.manualBillerEntry' as any)}
      </button>

      {/* Manual biller side sheet */}
      <ManualBillerSheet
        open={showManualForm}
        onClose={() => { setShowManualForm(false); setManualBiller({ name: '', accountNumber: '', billNumber: '', amount: '', dueDate: '' }) }}
        onAdd={(name, code) => { onChange({ biller: name, billerCode: code }); setShowManualForm(false) }}
        manualBiller={manualBiller}
        setManualBiller={setManualBiller}
      />

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

/* ─── Manual Biller Side Sheet ─── */

interface ManualBillerSheetProps {
  open: boolean
  onClose: () => void
  onAdd: (name: string, code: string) => void
  manualBiller: { name: string; accountNumber: string; billNumber: string; amount: string; dueDate: string }
  setManualBiller: React.Dispatch<React.SetStateAction<{ name: string; accountNumber: string; billNumber: string; amount: string; dueDate: string }>>
}

function ManualBillerSheet({ open, onClose, onAdd, manualBiller, setManualBiller }: ManualBillerSheetProps) {
  const { theme } = useTheme()
  const { t } = useI18n()

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 12, fontWeight: 600, color: theme.textMuted, marginBottom: 6,
  }
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', background: theme.inputBg,
    border: `1px solid ${theme.inputBorder}`, borderRadius: 10, fontSize: 14, outline: 'none',
    boxSizing: 'border-box', color: theme.textPrimary,
  }

  const canAdd = manualBiller.name.trim() && manualBiller.billNumber.trim() && manualBiller.amount.trim()

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.35)', zIndex: 9998,
              backdropFilter: 'blur(3px)',
            }}
          />

          {/* Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="side-sheet"
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: 440, maxWidth: '100%',
              background: theme.cardBg,
              boxShadow: '-8px 0 40px rgba(0,0,0,0.15)',
              zIndex: 9999,
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 24px', borderBottom: `1px solid ${theme.border}`,
            }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: theme.textPrimary, margin: 0 }}>
                {t('wizard.manualBillerEntry' as any)}
              </h3>
              <button
                onClick={onClose}
                style={{
                  width: 32, height: 32, borderRadius: 8, border: 'none',
                  background: theme.bgPrimary, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <X size={16} color={theme.textMuted} />
              </button>
            </div>

            {/* Form body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
              {/* Biller Name */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>{t('wizard.billerName' as any)} *</label>
                <input
                  type="text"
                  value={manualBiller.name}
                  onChange={(e) => setManualBiller((p) => ({ ...p, name: e.target.value }))}
                  style={inputStyle}
                  placeholder={t('wizard.enterBillerName' as any)}
                />
              </div>

              {/* Biller ID / Account Number */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>{t('wizard.billerAccountNo' as any)}</label>
                <input
                  type="text"
                  value={manualBiller.accountNumber}
                  onChange={(e) => setManualBiller((p) => ({ ...p, accountNumber: e.target.value }))}
                  style={inputStyle}
                  placeholder={t('wizard.enterAccountNo' as any)}
                />
              </div>

              {/* Bill Number */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>{t('wizard.billNumber' as any)} *</label>
                <input
                  type="text"
                  value={manualBiller.billNumber}
                  onChange={(e) => setManualBiller((p) => ({ ...p, billNumber: e.target.value }))}
                  style={inputStyle}
                  placeholder={t('wizard.enterBillNo' as any)}
                />
              </div>

              {/* Amount */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>{t('wizard.amount' as any)} (<RiyalSign size="sm" />) *</label>
                <input
                  type="number"
                  value={manualBiller.amount}
                  onChange={(e) => setManualBiller((p) => ({ ...p, amount: e.target.value }))}
                  style={inputStyle}
                  placeholder="0.00"
                />
              </div>

              {/* Due Date */}
              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>{t('wizard.dueDate' as any)}</label>
                <input
                  type="date"
                  value={manualBiller.dueDate}
                  onChange={(e) => setManualBiller((p) => ({ ...p, dueDate: e.target.value }))}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Footer buttons */}
            <div style={{
              padding: '16px 24px', borderTop: `1px solid ${theme.border}`,
              display: 'flex', gap: 12,
            }}>
              <button
                onClick={() => {
                  if (!canAdd) return
                  onAdd(manualBiller.name, 'MANUAL-' + Date.now())
                }}
                style={{
                  flex: 1, height: 44, borderRadius: 10, border: 'none',
                  background: canAdd ? '#2563EB' : '#E2E8F0',
                  color: canAdd ? '#fff' : '#94A3B8',
                  fontWeight: 600, fontSize: 14,
                  cursor: canAdd ? 'pointer' : 'not-allowed',
                }}
              >
                {t('wizard.addBill' as any)}
              </button>
              <button
                onClick={onClose}
                style={{
                  flex: 1, height: 44, borderRadius: 10,
                  border: `1px solid ${theme.border}`, background: theme.cardBg,
                  color: theme.textSecondary, fontWeight: 600, fontSize: 14, cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
