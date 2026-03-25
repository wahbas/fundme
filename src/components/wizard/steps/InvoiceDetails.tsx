import { useState } from 'react'
import { Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../../ThemeContext'
import type { WizardData } from '../../../pages/RequestFinancing'
import RiyalSign from '../../icons/RiyalSign'

interface Props {
  data: WizardData
  onChange: (p: Partial<WizardData>) => void
}

interface Bill {
  id: string
  billNumber: string
  amount: number
  status: 'open' | 'partial' | 'overdue'
  dueDate: string
}

const statusConfig = {
  open: { label: 'Open', color: '#059669', bg: 'rgba(16,185,129,0.08)', dot: '#10B981' },
  partial: { label: 'Partial', color: '#D97706', bg: 'rgba(245,158,11,0.08)', dot: '#F59E0B' },
  overdue: { label: 'Overdue', color: '#DC2626', bg: 'rgba(239,68,68,0.08)', dot: '#EF4444' },
}

const DEMO_BILLS: Bill[] = [
  { id: 'inv1', billNumber: 'INV-2024-001', amount: 15000, status: 'open', dueDate: 'Feb 15, 2025' },
  { id: 'inv2', billNumber: 'INV-2024-002', amount: 12500, status: 'open', dueDate: 'Mar 15, 2025' },
  { id: 'inv3', billNumber: 'INV-2024-003', amount: 18000, status: 'partial', dueDate: 'Apr 15, 2025' },
]

const CHIPS = [
  { label: '25%', pct: 0.25 },
  { label: '50%', pct: 0.5 },
  { label: '60%', pct: 0.6 },
  { label: '75%', pct: 0.75 },
  { label: 'Full', pct: 1 },
]

// ─── Inline SVG icons ─────────────────────────────────────────

function CheckboxIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="#94A3B8" strokeWidth="1.1" />
      <path d="M1.5 5.5H12.5" stroke="#94A3B8" strokeWidth="1.1" />
      <path d="M4.5 1V3.5M9.5 1V3.5" stroke="#94A3B8" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

export default function InvoiceDetails({ data, onChange }: Props) {
  const { theme } = useTheme()
  const [customMode, setCustomMode] = useState<Record<string, boolean>>({})
  const [showManualForm, setShowManualForm] = useState(false)
  const [manualInvoice, setManualInvoice] = useState({ number: '', amount: '' })
  const [manualBills, setManualBills] = useState<Bill[]>([])
  const selected = new Set(data.selectedBills)
  const selectedCount = selected.size

  function toggleBill(id: string, billAmount: number) {
    const next = new Set(selected)
    if (next.has(id)) {
      next.delete(id)
      const pa = { ...data.partialAmounts }
      delete pa[id]
      onChange({ selectedBills: Array.from(next), partialAmounts: pa })
    } else {
      next.add(id)
      onChange({
        selectedBills: Array.from(next),
        partialAmounts: { ...data.partialAmounts, [id]: billAmount },
      })
    }
  }

  function setFinancedAmount(billId: string, amount: number) {
    onChange({ partialAmounts: { ...data.partialAmounts, [billId]: amount } })
  }

  return (
    <div>
      {/* Context bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20,
        padding: '10px 16px', background: 'rgba(37,99,235,0.04)', borderRadius: 10,
      }}>
        <span style={{ fontSize: 13, color: theme.textSecondary }}>Adding invoices from:</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: theme.textPrimary }}>{data.biller}</span>
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 700, color: theme.textPrimary, marginBottom: 6, textAlign: 'center' }}>Enter Invoice Details</h2>
      <p style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 32, textAlign: 'center' }}>Provide the bill details you want to finance</p>

      {/* Suggested bills header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: theme.textPrimary }}>Suggested Bills</h3>
        {selectedCount > 0 && (
          <span style={{ fontSize: 13, color: '#2563EB', fontWeight: 500 }}>{selectedCount} selected</span>
        )}
      </div>

      {/* Bill cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {DEMO_BILLS.map((bill) => {
          const isSelected = selected.has(bill.id)
          const st = statusConfig[bill.status]
          const financedAmount = data.partialAmounts[bill.id] ?? bill.amount
          const remaining = bill.amount - financedAmount
          const pct = Math.min(100, Math.max(0, Math.round((financedAmount / bill.amount) * 100)))
          const barPct = Math.max(20, pct) // min 20% so blue section never disappears

          // Find which chip is active
          const activeChip = CHIPS.find((c) => Math.round(c.pct * bill.amount) === financedAmount)

          return (
            <motion.div
              key={bill.id}
              layout
              style={{
                background: theme.cardBg,
                border: isSelected ? '2px solid #2563EB' : `1.5px solid ${theme.border}`,
                borderRadius: 14,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: isSelected ? '0 0 0 3px rgba(37,99,235,0.06)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = theme.textMuted
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = theme.border
                  e.currentTarget.style.boxShadow = 'none'
                }
              }}
            >
              {/* Top section — Bill info row */}
              <div
                onClick={() => toggleBill(bill.id, bill.amount)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  padding: isSelected ? '17px 19px' : '18px 20px',
                  cursor: 'pointer',
                }}
              >
                {/* Checkbox */}
                <div style={{
                  width: 22, height: 22, borderRadius: 6,
                  border: `2px solid ${isSelected ? '#2563EB' : '#D1D5DB'}`,
                  background: isSelected ? '#2563EB' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 2, transition: 'all 0.2s',
                }}>
                  {isSelected && <CheckboxIcon />}
                </div>

                {/* Bill info (middle) */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: theme.textPrimary }}>{data.biller}</span>
                    <span style={{ fontSize: 12, fontWeight: 500, color: theme.textMuted, fontFamily: 'monospace' }}>{bill.billNumber}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '2px 10px', borderRadius: 20,
                      fontSize: 11, fontWeight: 600, color: st.color, background: st.bg,
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: st.dot }} />
                      {st.label}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <CalendarIcon />
                      <span style={{ fontSize: 12, color: theme.textSecondary }}>Due {bill.dueDate}</span>
                    </span>
                  </div>
                </div>

                {/* Amount (right) */}
                <div style={{ minWidth: 100, textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: 20, fontWeight: 700, color: theme.textPrimary, lineHeight: 1.2 }}>
                    {bill.amount.toLocaleString()}
                  </p>
                  <p style={{ fontSize: 12, fontWeight: 500, color: theme.textMuted, marginTop: 3 }}><RiyalSign size="sm" /></p>
                </div>
              </div>

              {/* Bottom section — Split bar (expandable) */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        borderTop: `1px solid ${theme.borderLight}`,
                        padding: '20px 24px 24px',
                        paddingLeft: 56,
                        background: theme.bgPrimary,
                      }}
                    >
                      <p style={{ fontSize: 12, fontWeight: 600, color: theme.textSecondary, marginBottom: 14 }}>
                        How much do you want to finance?
                      </p>

                      {/* Split bar */}
                      <div style={{
                        display: 'flex', height: 44, borderRadius: 10,
                        overflow: 'hidden', background: theme.border, marginBottom: 12,
                      }}>
                        {/* Financed (blue) */}
                        <motion.div
                          animate={{ width: `${barPct}%` }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          style={{
                            background: 'linear-gradient(90deg, #2563EB, #3B82F6)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontSize: 14, fontWeight: 700,
                            overflow: 'hidden', whiteSpace: 'nowrap',
                          }}
                        >
                          <RiyalSign size="sm" color="#FFFFFF" />{financedAmount.toLocaleString()}
                        </motion.div>
                        {/* Divider */}
                        <div style={{ width: 4, background: theme.cardBg, flexShrink: 0 }} />
                        {/* Remaining (gray) */}
                        <div style={{
                          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: theme.textMuted, fontSize: 13, fontWeight: 500,
                          overflow: 'hidden', whiteSpace: 'nowrap',
                        }}>
                          {remaining > 0 ? `${remaining.toLocaleString()} remaining` : 'Full amount'}
                        </div>
                      </div>

                      {/* Meta row */}
                      <div style={{
                        display: 'flex', justifyContent: 'space-between', marginBottom: 14,
                      }}>
                        <span style={{ fontSize: 12, color: theme.textMuted }}>
                          Financing{' '}
                          <span style={{ fontWeight: 700, color: '#2563EB' }}><RiyalSign size="sm" color="#2563EB" />{financedAmount.toLocaleString()}</span>
                        </span>
                        <span style={{ fontSize: 12, color: theme.textMuted }}>
                          Remaining{' '}
                          <span style={{ fontWeight: 700, color: theme.textPrimary }}><RiyalSign size="sm" />{remaining.toLocaleString()}</span>
                        </span>
                      </div>

                      {/* Quick-select chips */}
                      {(() => {
                        const isCustom = !!customMode[bill.id]
                        return (
                          <>
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                              {CHIPS.map((chip) => {
                                const isActive = !isCustom && activeChip?.label === chip.label
                                return (
                                  <button
                                    key={chip.label}
                                    onClick={() => {
                                      setCustomMode((m) => ({ ...m, [bill.id]: false }))
                                      setFinancedAmount(bill.id, Math.round(chip.pct * bill.amount))
                                    }}
                                    style={{
                                      padding: '5px 12px', borderRadius: 20,
                                      fontSize: 11, fontWeight: 600,
                                      border: `1px solid ${isActive ? '#2563EB' : '#E2E8F0'}`,
                                      background: isActive ? '#DBEAFE' : '#fff',
                                      color: isActive ? '#2563EB' : '#475569',
                                      cursor: 'pointer',
                                      transition: 'all 0.15s',
                                    }}
                                    onMouseEnter={(e) => {
                                      if (!isActive) {
                                        e.currentTarget.style.borderColor = '#2563EB'
                                        e.currentTarget.style.color = '#2563EB'
                                      }
                                    }}
                                    onMouseLeave={(e) => {
                                      if (!isActive) {
                                        e.currentTarget.style.borderColor = theme.border
                                        e.currentTarget.style.color = '#475569'
                                      }
                                    }}
                                  >
                                    {chip.label}
                                  </button>
                                )
                              })}
                              {/* Custom chip */}
                              <button
                                onClick={() => setCustomMode((m) => ({ ...m, [bill.id]: true }))}
                                style={{
                                  padding: '5px 12px', borderRadius: 20,
                                  fontSize: 11, fontWeight: 600,
                                  border: `1px solid ${isCustom ? '#2563EB' : '#E2E8F0'}`,
                                  background: isCustom ? '#DBEAFE' : '#fff',
                                  color: isCustom ? '#2563EB' : '#475569',
                                  cursor: 'pointer',
                                  transition: 'all 0.15s',
                                }}
                                onMouseEnter={(e) => {
                                  if (!isCustom) {
                                    e.currentTarget.style.borderColor = '#2563EB'
                                    e.currentTarget.style.color = '#2563EB'
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!isCustom) {
                                    e.currentTarget.style.borderColor = theme.border
                                    e.currentTarget.style.color = '#475569'
                                  }
                                }}
                              >
                                Custom
                              </button>
                            </div>

                            {/* Custom amount input */}
                            <AnimatePresence>
                              {isCustom && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  style={{ marginTop: 12, overflow: 'hidden' }}
                                >
                                  <label style={{ fontSize: 12, fontWeight: 600, color: theme.textSecondary, display: 'block', marginBottom: 6 }}>
                                    Enter amount (<RiyalSign size="sm" />)
                                  </label>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <input
                                      type="number"
                                      placeholder="0"
                                      value={financedAmount || ''}
                                      onClick={(e) => e.stopPropagation()}
                                      onChange={(e) => {
                                        const v = Number(e.target.value)
                                        setFinancedAmount(bill.id, Math.min(bill.amount, Math.max(0, v)))
                                      }}
                                      style={{
                                        width: 180, padding: '10px 14px',
                                        border: `1.5px solid ${theme.border}`, borderRadius: 8,
                                        fontSize: 14, color: theme.textPrimary, outline: 'none',
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
                                    <span style={{ fontSize: 12, color: theme.textMuted }}>
                                      of <RiyalSign size="sm" />{bill.amount.toLocaleString()}
                                    </span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        )
                      })()}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Total financing summary */}
      {selectedCount > 0 && (() => {
        const totalBillAmount = DEMO_BILLS
          .filter((b) => selected.has(b.id))
          .reduce((sum, b) => sum + b.amount, 0)
        const totalFinanced = DEMO_BILLS
          .filter((b) => selected.has(b.id))
          .reduce((sum, b) => sum + (data.partialAmounts[b.id] ?? b.amount), 0)
        return (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: theme.cardBg, border: `1.5px solid ${theme.border}`, borderRadius: 14,
              padding: '18px 24px', marginBottom: 28,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>Total Financing Amount</p>
              <p style={{ fontSize: 24, fontWeight: 700, color: theme.textPrimary }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: theme.textMuted }}><RiyalSign size="lg" /></span>{totalFinanced.toLocaleString()}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>
                from {selectedCount} invoice{selectedCount > 1 ? 's' : ''}
              </p>
              <p style={{ fontSize: 14, fontWeight: 600, color: totalFinanced === totalBillAmount ? '#059669' : '#2563EB' }}>
                {totalFinanced === totalBillAmount
                  ? 'Full amount'
                  : `${Math.round((totalFinanced / totalBillAmount) * 100)}% of total`
                }
              </p>
            </div>
          </motion.div>
        )
      })()}

      {/* Manual invoice entry */}
      <h3 style={{ fontSize: 15, fontWeight: 700, color: theme.textPrimary, marginBottom: 10 }}>Manual Invoice Entry</h3>

      {/* List of already-added manual invoices */}
      {manualBills.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          {manualBills.map((mb, i) => (
            <div key={mb.id} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 14px', background: theme.cardBg, border: `1px solid ${theme.border}`,
              borderRadius: 10, marginBottom: 8,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary }}>{mb.billNumber}</span>
                <span style={{ fontSize: 12, color: theme.textMuted }}>•</span>
                <span style={{ fontSize: 13, color: theme.textSecondary }}><RiyalSign size="sm" />{mb.amount.toLocaleString()}</span>
              </div>
              <button
                onClick={() => {
                  setManualBills(prev => prev.filter(b => b.id !== mb.id))
                  const currentSelected = data.selectedBills || []
                  onChange({ selectedBills: currentSelected.filter(id => id !== mb.id) })
                }}
                style={{ background: 'none', border: 'none', color: '#DC2626', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => setShowManualForm(f => !f)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 20px', background: theme.cardBg,
          border: `1px solid ${theme.border}`, borderRadius: 10,
          fontSize: 13, fontWeight: 600, color: theme.textSecondary, cursor: 'pointer',
          transition: 'border-color 0.15s, color 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#2563EB'
          e.currentTarget.style.color = '#2563EB'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = theme.border
          e.currentTarget.style.color = '#475569'
        }}
      >
        <Plus size={16} />
        {manualBills.length > 0 ? 'Add Another Invoice' : 'Add Invoice'}
      </button>

      <AnimatePresence>
        {showManualForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', marginTop: 12 }}
          >
            <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 20 }}>
              {/* Biller ID & Biller Name (read-only) */}
              <div className="invoice-fields-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: theme.textMuted, marginBottom: 6 }}>Biller ID</label>
                  <input
                    type="text"
                    readOnly
                    value={data.billerCode || '—'}
                    style={{ width: '100%', padding: '12px 14px', background: theme.borderLight, border: `1px solid ${theme.borderLight}`, borderRadius: 10, fontSize: 14, outline: 'none', color: theme.textSecondary }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: theme.textMuted, marginBottom: 6 }}>Biller Name</label>
                  <input
                    type="text"
                    readOnly
                    value={data.biller || '—'}
                    style={{ width: '100%', padding: '12px 14px', background: theme.borderLight, border: `1px solid ${theme.borderLight}`, borderRadius: 10, fontSize: 14, outline: 'none', color: theme.textSecondary }}
                  />
                </div>
              </div>

              {/* Bill Number & Bill Amount */}
              <div className="invoice-fields-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: theme.textMuted, marginBottom: 6 }}>Bill Number *</label>
                  <input
                    type="text"
                    placeholder="Enter bill number"
                    value={manualInvoice.number}
                    onChange={e => setManualInvoice(m => ({ ...m, number: e.target.value }))}
                    style={{ width: '100%', padding: '12px 14px', background: theme.inputBg, border: `1px solid ${theme.borderLight}`, borderRadius: 10, fontSize: 14, outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: theme.textMuted, marginBottom: 6 }}>Bill Amount (SAR) *</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={manualInvoice.amount}
                    onChange={e => setManualInvoice(m => ({ ...m, amount: e.target.value }))}
                    style={{ width: '100%', padding: '12px 14px', background: theme.inputBg, border: `1px solid ${theme.borderLight}`, borderRadius: 10, fontSize: 14, outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => {
                    if (!manualInvoice.number || !manualInvoice.amount) return
                    const newBill: Bill = {
                      id: 'manual-' + Date.now(),
                      billNumber: manualInvoice.number,
                      amount: Number(manualInvoice.amount),
                      status: 'open',
                      dueDate: 'TBD',
                    }
                    setManualBills(prev => [...prev, newBill])
                    const currentSelected = data.selectedBills || []
                    onChange({ selectedBills: [...currentSelected, newBill.id] })
                    setManualInvoice({ number: '', amount: '' })
                    setShowManualForm(false)
                  }}
                  style={{
                    flex: 1, height: 44, background: '#2563EB', color: '#fff',
                    fontWeight: 600, fontSize: 14, borderRadius: 10, border: 'none', cursor: 'pointer',
                  }}
                >
                  Add Invoice
                </button>
                <button
                  onClick={() => { setShowManualForm(false); setManualInvoice({ number: '', amount: '' }) }}
                  style={{
                    flex: 1, height: 44, background: theme.cardBg, color: theme.textSecondary,
                    fontWeight: 600, fontSize: 14, borderRadius: 10, border: `1px solid ${theme.border}`, cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
