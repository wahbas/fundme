import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Plus } from 'lucide-react'
import { useNavigate as useNav } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import FloatingHelpButton from '../components/dashboard/FloatingHelpButton'
import MobileTabBar from '../components/layout/MobileTabBar'
import { LoansIcon } from '../components/icons/NavIcons'
import RiyalSign from '../components/icons/RiyalSign'
import { useTheme } from '../ThemeContext'
import { useI18n } from '../i18n'

type LoanStatus = 'active' | 'in-progress' | 'closed'
type FilterKey = 'all' | LoanStatus

interface Loan {
  id: string
  productKey: string
  subtitleKey: string
  amount: number
  status: LoanStatus
  statusKey: string
  ctaKey: string
  ctaStyle: 'filled' | 'outlined'
}

const LOANS: Loan[] = [
  { id: 'LOAN-2024-001', productKey: 'loan.workingCapital', subtitleKey: 'loan.nextPaymentOn', amount: 350000, status: 'active', statusKey: 'loan.statusActive', ctaKey: 'loans.viewLoan', ctaStyle: 'filled' },
  { id: 'LOAN-2024-002', productKey: 'loan.invoiceFinancing', subtitleKey: 'loan.nextPaymentOn', amount: 180000, status: 'active', statusKey: 'loan.statusActive', ctaKey: 'loans.viewLoan', ctaStyle: 'filled' },
  { id: 'LOAN-2024-003', productKey: 'loan.workingCapital', subtitleKey: 'loan.appReceived', amount: 500000, status: 'in-progress', statusKey: 'loan.statusSubmitted', ctaKey: 'loans.viewStatus', ctaStyle: 'outlined' },
  { id: 'LOAN-2024-004', productKey: 'loan.invoiceFinancing', subtitleKey: 'loan.offerReady', amount: 250000, status: 'in-progress', statusKey: 'loan.statusOffer', ctaKey: 'loans.viewLoan', ctaStyle: 'filled' },
  { id: 'LOAN-2024-005', productKey: 'loan.workingCapital', subtitleKey: 'loan.facilityReady', amount: 700000, status: 'in-progress', statusKey: 'loan.statusContract', ctaKey: 'loans.continueLoan', ctaStyle: 'filled' },
  { id: 'LOAN-2024-006', productKey: 'loan.equipmentFinancing', subtitleKey: 'loan.funded65', amount: 1000000, status: 'in-progress', statusKey: 'loan.statusCrowdfunding', ctaKey: 'loans.viewStatus', ctaStyle: 'outlined' },
  { id: 'LOAN-2023-045', productKey: 'loan.tradeFinance', subtitleKey: 'loan.fullyPaid', amount: 0, status: 'closed', statusKey: 'loan.statusSettled', ctaKey: 'loans.viewLoan', ctaStyle: 'filled' },
]

function getStatusStyle(key: string): { color: string; bg: string; border: string } {
  switch (key) {
    case 'loan.statusActive':
      return { color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' }
    case 'loan.statusSettled':
      return { color: '#64748B', bg: '#F8FAFC', border: '#E2E8F0' }
    default:
      return { color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' }
  }
}

function LoanCard({ loan, delay, query }: { loan: Loan; delay: number; query: string }) {
  const { theme } = useTheme()
  const { t, isRTL } = useI18n()
  const nav = useNav()
  const [hovered, setHovered] = useState(false)
  const statusLabel = t(loan.statusKey as any)
  const statusStyle = getStatusStyle(loan.statusKey)
  const isFilled = loan.ctaStyle === 'filled'

  return (
    <motion.div
      className="loan-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => nav(`/my-loans/${loan.id}${query}`)}
      style={{
        background: theme.cardBg,
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: 12,
        padding: '24px 24px 20px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: hovered ? theme.shadowMd : theme.shadow,
        transition: 'box-shadow 0.2s, transform 0.2s',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      {/* Header: ID + Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#2563EB', fontFamily: 'monospace' }}>{loan.id}</p>
        <span style={{
          padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600,
          color: statusStyle.color, background: statusStyle.bg, border: `1px solid ${statusStyle.border}`,
          whiteSpace: 'nowrap',
        }}>
          {statusLabel}
        </span>
      </div>

      {/* Product */}
      <p style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 4 }}>{t(loan.productKey as any)}</p>

      {/* Subtitle */}
      <p style={{ fontSize: 13, color: theme.textMuted, marginBottom: 20 }}>{t(loan.subtitleKey as any)}</p>

      {/* Divider */}
      <div className="loan-card-divider" style={{ height: 1, background: theme.borderLight, marginBottom: 16 }} />

      {/* Amount */}
      <p style={{ fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>{t('loan.financingAmount' as any)}</p>
      <p style={{ fontSize: 22, fontWeight: 700, color: theme.textPrimary, marginBottom: 20 }}>
        <RiyalSign size="sm" /> {loan.amount.toLocaleString()}
      </p>

      {/* Spacer to push button to bottom */}
      <div style={{ flex: 1 }} />

      {/* CTA Button */}
      <button
        className="loan-card-cta"
        onClick={(e) => { e.stopPropagation(); nav(`/my-loans/${loan.id}${query}`) }}
        style={{
          width: '100%',
          padding: '12px 0',
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          transition: 'background 0.15s, opacity 0.15s',
          ...(isFilled
            ? { background: '#2563EB', color: '#fff', border: 'none' }
            : { background: theme.cardBg, color: theme.textPrimary, border: `1px solid ${theme.border}` }),
        }}
      >
        {t(loan.ctaKey as any)}
        {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
      </button>
    </motion.div>
  )
}

export default function MyLoans() {
  const { theme } = useTheme()
  const { t, isRTL } = useI18n()
  const [searchParams] = useSearchParams()
  const stateParam = searchParams.get('state')
  const verified = stateParam === 'verified' || searchParams.get('verified') === 'true'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const navigate = useNavigate()

  const filtered = activeFilter === 'all' ? LOANS : LOANS.filter(l => l.status === activeFilter)
  const query = verified ? '?state=verified' : ''

  const FILTERS: { key: FilterKey; labelKey: 'loans.all' | 'loans.active' | 'loans.inProgress' | 'loans.closed' }[] = [
    { key: 'all', labelKey: 'loans.all' },
    { key: 'active', labelKey: 'loans.active' },
    { key: 'in-progress', labelKey: 'loans.inProgress' },
    { key: 'closed', labelKey: 'loans.closed' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar verified={verified} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} activeTab="my-loans" />
      <main style={{
        marginLeft: isRTL ? 0 : (sidebarCollapsed ? 72 : 240),
        marginRight: isRTL ? (sidebarCollapsed ? 72 : 240) : 0,
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        flex: 1, minWidth: 0, overflow: 'hidden', minHeight: '100vh', background: theme.bgPrimary, padding: 0,
      }}>
        <div style={{ background: theme.bgPrimary, minHeight: '100vh', padding: '28px 32px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="inner-page-header"><Header /></div>

            {/* Page title row */}
            <div className="page-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="page-title-icon"><LoansIcon size={24} color={theme.textPrimary} /></span>
                <h2 className="page-title" style={{ fontSize: 22, fontWeight: 700, color: theme.textPrimary }}>{t('loans.myLoans')}</h2>
              </div>
              <motion.button
                className="page-action-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/request-financing')}
                style={{
                  padding: '10px 20px', background: '#2563EB', color: '#fff', fontWeight: 600,
                  fontSize: 14, borderRadius: 10, border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                <Plus size={16} />
                {t('header.newLoanRequest')}
              </motion.button>
            </div>

            {/* Filter pills */}
            <div className="filter-tabs" style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
              {FILTERS.map(f => {
                const isActive = activeFilter === f.key
                return (
                  <button key={f.key} onClick={() => setActiveFilter(f.key)} style={{
                    padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                    background: isActive ? '#2563EB' : theme.cardBg, color: isActive ? '#fff' : theme.textSecondary,
                    border: isActive ? 'none' : `1px solid ${theme.border}`, cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}>
                    {t(f.labelKey)}
                  </button>
                )
              })}
            </div>

            {/* Loan card grid */}
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 12,
                    padding: '48px 24px', textAlign: 'center',
                  }}
                >
                  <p style={{ fontSize: 15, fontWeight: 600, color: theme.textSecondary, marginBottom: 4 }}>No loans found</p>
                  <p style={{ fontSize: 13, color: theme.textMuted }}>Try adjusting your filters</p>
                </motion.div>
              ) : (
                <div className="loans-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                  {filtered.map((loan, i) => <LoanCard key={loan.id} loan={loan} delay={0.05 + i * 0.05} query={query} />)}
                </div>
              )}
            </AnimatePresence>
          </div>
          <Footer />
        </div>
      </main>
      <FloatingHelpButton />
      <MobileTabBar />
    </div>
  )
}
