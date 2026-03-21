import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Plus } from 'lucide-react'
import { useNavigate as useNav } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import FloatingHelpButton from '../components/dashboard/FloatingHelpButton'
import { LoansIcon } from '../components/icons/NavIcons'
import RiyalSign from '../components/icons/RiyalSign'
import { useTheme } from '../ThemeContext'

type LoanStatus = 'active' | 'in-progress' | 'closed'
type FilterKey = 'all' | LoanStatus

interface Loan {
  id: string
  product: string
  subtitle: string
  amount: number
  status: LoanStatus
  statusLabel: string
  ctaLabel: string
  ctaStyle: 'filled' | 'outlined'
}

const LOANS: Loan[] = [
  {
    id: 'LOAN-2024-001',
    product: 'Working Capital',
    subtitle: 'Next payment on 15 Dec 2024',
    amount: 350000,
    status: 'active',
    statusLabel: 'Active',
    ctaLabel: 'View Loan',
    ctaStyle: 'filled',
  },
  {
    id: 'LOAN-2024-002',
    product: 'Invoice Financing',
    subtitle: 'Next payment on 20 Dec 2024',
    amount: 180000,
    status: 'active',
    statusLabel: 'Active',
    ctaLabel: 'View Loan',
    ctaStyle: 'filled',
  },
  {
    id: 'LOAN-2024-003',
    product: 'Working Capital',
    subtitle: 'Your application has been received',
    amount: 500000,
    status: 'in-progress',
    statusLabel: 'Request Submitted',
    ctaLabel: 'View Status',
    ctaStyle: 'outlined',
  },
  {
    id: 'LOAN-2024-004',
    product: 'Invoice Financing',
    subtitle: 'Your offer is ready',
    amount: 250000,
    status: 'in-progress',
    statusLabel: 'Offer',
    ctaLabel: 'View Offer',
    ctaStyle: 'filled',
  },
  {
    id: 'LOAN-2024-005',
    product: 'Working Capital',
    subtitle: 'Facility contract ready',
    amount: 700000,
    status: 'in-progress',
    statusLabel: 'Facility Contract',
    ctaLabel: 'Continue Loan',
    ctaStyle: 'filled',
  },
  {
    id: 'LOAN-2024-006',
    product: 'Equipment Financing',
    subtitle: '65% funded · 8 days left',
    amount: 1000000,
    status: 'in-progress',
    statusLabel: 'Crowdfunding',
    ctaLabel: 'View Status',
    ctaStyle: 'outlined',
  },
  {
    id: 'LOAN-2023-045',
    product: 'Trade Finance',
    subtitle: 'Congratulations! Loan fully paid',
    amount: 0,
    status: 'closed',
    statusLabel: 'Settled',
    ctaLabel: 'View Loan',
    ctaStyle: 'filled',
  },
]

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All Loans' },
  { key: 'active', label: 'Active' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'closed', label: 'Closed' },
]

function getStatusStyle(label: string): { color: string; bg: string; border: string } {
  switch (label) {
    case 'Active':
      return { color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' }
    case 'Settled':
      return { color: '#64748B', bg: '#F8FAFC', border: '#E2E8F0' }
    default:
      return { color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' }
  }
}

function LoanCard({ loan, delay, query }: { loan: Loan; delay: number; query: string }) {
  const { theme } = useTheme()
  const nav = useNav()
  const [hovered, setHovered] = useState(false)
  const statusStyle = getStatusStyle(loan.statusLabel)
  const isFilled = loan.ctaStyle === 'filled'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: theme.cardBg,
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: 12,
        padding: '24px 24px 20px',
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
          {loan.statusLabel}
        </span>
      </div>

      {/* Product */}
      <p style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 4 }}>{loan.product}</p>

      {/* Subtitle */}
      <p style={{ fontSize: 13, color: theme.textMuted, marginBottom: 20 }}>{loan.subtitle}</p>

      {/* Divider */}
      <div style={{ height: 1, background: theme.borderLight, marginBottom: 16 }} />

      {/* Amount */}
      <p style={{ fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>Financing Amount</p>
      <p style={{ fontSize: 22, fontWeight: 700, color: theme.textPrimary, marginBottom: 20 }}>
        {loan.amount.toLocaleString()} <RiyalSign size="sm" />
      </p>

      {/* Spacer to push button to bottom */}
      <div style={{ flex: 1 }} />

      {/* CTA Button */}
      <button
        onClick={() => nav(`/my-loans/${loan.id}${query}`)}
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
        {loan.ctaLabel}
        <ArrowRight size={16} />
      </button>
    </motion.div>
  )
}

export default function MyLoans() {
  const { theme } = useTheme()
  const [searchParams] = useSearchParams()
  const stateParam = searchParams.get('state')
  const verified = stateParam === 'verified' || searchParams.get('verified') === 'true'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const navigate = useNavigate()

  const filtered = activeFilter === 'all' ? LOANS : LOANS.filter(l => l.status === activeFilter)
  const query = verified ? '?state=verified' : ''

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar verified={verified} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} activeTab="my-loans" />
      <main style={{
        marginLeft: sidebarCollapsed ? 72 : 240,
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        flex: 1, minWidth: 0, overflow: 'hidden', minHeight: '100vh', background: theme.bgPrimary, padding: 0,
      }}>
        <div style={{ background: theme.bgPrimary, minHeight: '100vh', padding: '28px 32px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Header />

            {/* Page title row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <LoansIcon size={24} color={theme.textPrimary} />
                <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textPrimary }}>My Loans</h2>
              </div>
              <motion.button
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
                New Loan Request
              </motion.button>
            </div>

            {/* Filter pills */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
              {FILTERS.map(f => {
                const isActive = activeFilter === f.key
                return (
                  <button key={f.key} onClick={() => setActiveFilter(f.key)} style={{
                    padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                    background: isActive ? '#2563EB' : theme.cardBg, color: isActive ? '#fff' : theme.textSecondary,
                    border: isActive ? 'none' : `1px solid ${theme.border}`, cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}>
                    {f.label}
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                  {filtered.map((loan, i) => <LoanCard key={loan.id} loan={loan} delay={0.05 + i * 0.05} query={query} />)}
                </div>
              )}
            </AnimatePresence>
          </div>
          <Footer />
        </div>
      </main>
      <FloatingHelpButton />
    </div>
  )
}
