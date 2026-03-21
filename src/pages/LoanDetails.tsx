import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Calendar, Clock, CreditCard, Info, FileText,
  ArrowUpDown, CheckCircle2, Zap, Download,
  TrendingUp, Receipt,
} from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import FloatingHelpButton from '../components/dashboard/FloatingHelpButton'
import EarlyPaymentModal from '../components/EarlyPaymentModal'
import MakePaymentModal from '../components/dashboard/MakePaymentModal'
import RiyalSign from '../components/icons/RiyalSign'
import { useTheme } from '../ThemeContext'

/* ─── Types & Data ─── */

type DemoStatus = 'active' | 'under-review' | 'offer' | 'settled'
type TabKey = 'info' | 'repayment' | 'transactions' | 'documents'

interface LoanData {
  id: string
  facilityType: string
  outstandingBalance: number
  totalAmount: number
  approvedAmount: number
  status: DemoStatus
  statusLabel: string
  progress: number
  nextPayment: { amount: number; dueDate: string; daysRemaining: number }
  apr: string
  originationFee: number
  totalRepayable: number
  onTimeRate: number
  repaidPercent: number
  repaidAmount: number
  installmentsPaid: number
  totalInstallments: number
  disbursementDate: string
  maturityDate: string
  repaymentFrequency: string
  schedule: ScheduleItem[]
  transactions: Transaction[]
  documents: LoanDocument[]
}

interface ScheduleItem {
  installment: number
  dueDate: string
  principal: number
  profit: number
  total: number
  status: 'paid' | 'upcoming' | 'overdue'
}

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  type: 'payment' | 'disbursement' | 'fee'
  status: 'completed' | 'pending'
}

interface LoanDocument {
  name: string
  type: string
  date: string
  size: string
}

const LOAN_DB: Record<string, LoanData> = {
  'LOAN-2024-001': {
    id: 'LOAN-2024-001',
    facilityType: 'Working Capital',
    outstandingBalance: 350000,
    totalAmount: 500000,
    approvedAmount: 500000,
    status: 'active',
    statusLabel: 'Active',
    progress: 30,
    nextPayment: { amount: 45208, dueDate: '15 Apr 2025', daysRemaining: 7 },
    apr: '9.4% / year',
    originationFee: 5000,
    totalRepayable: 542500,
    onTimeRate: 100,
    repaidPercent: 30,
    repaidAmount: 125001,
    installmentsPaid: 3,
    totalInstallments: 5,
    disbursementDate: '15 Nov 2024',
    maturityDate: '15 Apr 2025',
    repaymentFrequency: 'Monthly',
    schedule: [
      { installment: 1, dueDate: '15 Dec 2024', principal: 83333, profit: 3917, total: 87250, status: 'paid' },
      { installment: 2, dueDate: '15 Jan 2025', principal: 83333, profit: 3917, total: 87250, status: 'paid' },
      { installment: 3, dueDate: '15 Feb 2025', principal: 83333, profit: 3917, total: 87250, status: 'paid' },
      { installment: 4, dueDate: '15 Mar 2025', principal: 83334, profit: 3917, total: 87251, status: 'upcoming' },
      { installment: 5, dueDate: '15 Apr 2025', principal: 83334, profit: 3917, total: 87251, status: 'upcoming' },
    ],
    transactions: [
      { id: 'TXN-001', date: '15 Feb 2025', description: 'Installment Payment #3', amount: 87250, type: 'payment', status: 'completed' },
      { id: 'TXN-002', date: '15 Jan 2025', description: 'Installment Payment #2', amount: 87250, type: 'payment', status: 'completed' },
      { id: 'TXN-003', date: '15 Dec 2024', description: 'Installment Payment #1', amount: 87250, type: 'payment', status: 'completed' },
      { id: 'TXN-004', date: '15 Nov 2024', description: 'Origination Fee', amount: 5000, type: 'fee', status: 'completed' },
      { id: 'TXN-005', date: '15 Nov 2024', description: 'Loan Disbursement', amount: 500000, type: 'disbursement', status: 'completed' },
    ],
    documents: [
      { name: 'Facility Agreement', type: 'Contract', date: '15 Nov 2024', size: '2.4 MB' },
      { name: 'Repayment Schedule', type: 'Schedule', date: '15 Nov 2024', size: '156 KB' },
      { name: 'Promissory Note', type: 'Legal', date: '15 Nov 2024', size: '890 KB' },
      { name: 'Insurance Certificate', type: 'Insurance', date: '18 Nov 2024', size: '1.1 MB' },
    ],
  },
  'LOAN-2024-002': {
    id: 'LOAN-2024-002',
    facilityType: 'Invoice Financing',
    outstandingBalance: 180000,
    totalAmount: 250000,
    approvedAmount: 250000,
    status: 'active',
    statusLabel: 'Active',
    progress: 28,
    nextPayment: { amount: 36120, dueDate: '20 Apr 2025', daysRemaining: 12 },
    apr: '8.5% / year',
    originationFee: 3750,
    totalRepayable: 271250,
    onTimeRate: 100,
    repaidPercent: 28,
    repaidAmount: 70000,
    installmentsPaid: 2,
    totalInstallments: 6,
    disbursementDate: '20 Nov 2024',
    maturityDate: '20 May 2025',
    repaymentFrequency: 'Monthly',
    schedule: [
      { installment: 1, dueDate: '20 Dec 2024', principal: 35000, profit: 1771, total: 36771, status: 'paid' },
      { installment: 2, dueDate: '20 Jan 2025', principal: 35000, profit: 1771, total: 36771, status: 'paid' },
      { installment: 3, dueDate: '20 Feb 2025', principal: 35000, profit: 1771, total: 36771, status: 'upcoming' },
      { installment: 4, dueDate: '20 Mar 2025', principal: 35000, profit: 1771, total: 36771, status: 'upcoming' },
      { installment: 5, dueDate: '20 Apr 2025', principal: 35000, profit: 1771, total: 36771, status: 'upcoming' },
      { installment: 6, dueDate: '20 May 2025', principal: 75000, profit: 1771, total: 76771, status: 'upcoming' },
    ],
    transactions: [
      { id: 'TXN-101', date: '20 Jan 2025', description: 'Installment Payment #2', amount: 36771, type: 'payment', status: 'completed' },
      { id: 'TXN-102', date: '20 Dec 2024', description: 'Installment Payment #1', amount: 36771, type: 'payment', status: 'completed' },
      { id: 'TXN-103', date: '20 Nov 2024', description: 'Loan Disbursement', amount: 250000, type: 'disbursement', status: 'completed' },
    ],
    documents: [
      { name: 'Facility Agreement', type: 'Contract', date: '20 Nov 2024', size: '2.1 MB' },
      { name: 'Repayment Schedule', type: 'Schedule', date: '20 Nov 2024', size: '142 KB' },
      { name: 'Invoice Copies', type: 'Supporting', date: '18 Nov 2024', size: '4.5 MB' },
    ],
  },
}

// Fallback for any loan ID
function getLoan(id: string): LoanData {
  return LOAN_DB[id] || LOAN_DB['LOAN-2024-001']
}

/* ─── Sub-components ─── */

function ProgressBar({ progress }: { progress: number }) {
  const { theme } = useTheme()
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 120, height: 8, borderRadius: 4, background: theme.border }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ height: 8, borderRadius: 4, background: '#2563EB' }}
        />
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color: theme.textPrimary }}>{progress}%</span>
    </div>
  )
}

function StatusBadge({ label, status }: { label: string; status: DemoStatus }) {
  const styles: Record<DemoStatus, { color: string; bg: string; border: string }> = {
    active: { color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0' },
    'under-review': { color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
    offer: { color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
    settled: { color: '#64748B', bg: '#F8FAFC', border: '#E2E8F0' },
  }
  const s = styles[status]
  return (
    <span style={{
      padding: '4px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
      color: s.color, background: s.bg, border: `1px solid ${s.border}`,
    }}>
      {label}
    </span>
  )
}

function MetricBox({ value, label, sub, color }: { value: string; label: string; sub?: string; color?: string }) {
  const { theme } = useTheme()
  return (
    <div style={{
      flex: 1, textAlign: 'center', padding: '20px 12px',
      background: theme.inputBg, borderRadius: 12, border: `1px solid ${theme.borderLight}`,
    }}>
      <p style={{ fontSize: 26, fontWeight: 700, color: color || theme.textPrimary, marginBottom: 4 }}>{value}</p>
      <p style={{ fontSize: 12, color: theme.textSecondary, fontWeight: 500 }}>{label}</p>
      {sub && <p style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>{sub}</p>}
    </div>
  )
}

/* ─── Tab Content ─── */

function InfoTab({ loan }: { loan: LoanData }) {
  const { theme } = useTheme()
  return (
    <div className="loan-info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      {/* Loan Pricing & Fees */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 16,
          padding: 28, boxShadow: theme.shadow,
        }}
      >
        <h3 style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary, marginBottom: 24 }}>Loan Pricing & Fees</h3>

        {/* Loan Amount section */}
        <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.6, color: theme.textMuted, marginBottom: 12 }}>Loan Amount</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${theme.borderLight}` }}>
          <span style={{ fontSize: 14, color: theme.textSecondary }}>Approved Amount</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary }}>{loan.approvedAmount.toLocaleString()} <RiyalSign size="sm" /></span>
        </div>

        {/* Profit & Fees section */}
        <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.6, color: theme.textMuted, marginTop: 24, marginBottom: 12 }}>Profit & Fees</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${theme.borderLight}` }}>
          <span style={{ fontSize: 14, color: theme.textSecondary }}>Effective Profit Rate (APR)</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#2563EB' }}>{loan.apr}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${theme.borderLight}` }}>
          <span style={{ fontSize: 14, color: theme.textSecondary }}>Origination Fee</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary }}>{loan.originationFee.toLocaleString()} <RiyalSign size="sm" /></span>
        </div>

        {/* Total */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 0', marginTop: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: theme.textPrimary }}>Total Repayable</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: theme.textPrimary }}>{loan.totalRepayable.toLocaleString()} <RiyalSign size="sm" /></span>
        </div>
      </motion.div>

      {/* Performance & Insights */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{
          background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 16,
          padding: 28, boxShadow: theme.shadow,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
          <TrendingUp size={18} color="#2563EB" />
          <h3 style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary }}>Performance & Insights</h3>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          <MetricBox
            value={`${loan.onTimeRate}%`}
            label="On-time Payments"
            color={loan.onTimeRate === 100 ? '#16A34A' : '#D97706'}
          />
          <MetricBox
            value={`${loan.repaidPercent}%`}
            label={`${loan.repaidAmount.toLocaleString()} ر.س of ${loan.totalAmount.toLocaleString()} ر.س repaid`}
            color="#2563EB"
          />
          <MetricBox
            value={`${loan.installmentsPaid} / ${loan.totalInstallments}`}
            label="Installments paid"
          />
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '14px 16px',
          background: '#F0FDF4', borderRadius: 10, border: '1px solid #BBF7D0',
        }}>
          <CheckCircle2 size={16} color="#16A34A" />
          <span style={{ fontSize: 13, color: '#16A34A', fontWeight: 500 }}>
            You are on track. Keeping this record can help you qualify for future financing.
          </span>
        </div>
      </motion.div>

      {/* Loan Details */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 16,
          padding: 28, boxShadow: theme.shadow, gridColumn: '1 / -1',
        }}
      >
        <h3 style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary, marginBottom: 20 }}>Loan Details</h3>
        <div className="loan-detail-fields" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {[
            { label: 'Disbursement Date', value: loan.disbursementDate },
            { label: 'Maturity Date', value: loan.maturityDate },
            { label: 'Repayment Frequency', value: loan.repaymentFrequency },
            { label: 'Total Installments', value: String(loan.totalInstallments) },
          ].map(f => (
            <div key={f.label}>
              <p style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted, marginBottom: 6 }}>{f.label}</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary }}>{f.value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function RepaymentTab({ loan }: { loan: LoanData }) {
  const { theme } = useTheme()
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 16,
        overflow: 'hidden', boxShadow: theme.shadow,
      }}
    >
      <div style={{ padding: '24px 28px 16px' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary, marginBottom: 4 }}>Repayment Schedule</h3>
        <p style={{ fontSize: 13, color: theme.textMuted }}>{loan.totalInstallments} installments · {loan.repaymentFrequency}</p>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '60px 1fr 1fr 1fr 1fr 100px',
          padding: '10px 28px', background: theme.bgPrimary, borderTop: `1px solid ${theme.border}`,
          fontSize: 11, fontWeight: 600, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: 0.5,
        }}>
          <span>#</span>
          <span>Due Date</span>
          <span style={{ textAlign: 'right' }}>Principal</span>
          <span style={{ textAlign: 'right' }}>Profit</span>
          <span style={{ textAlign: 'right' }}>Total</span>
          <span style={{ textAlign: 'right' }}>Status</span>
        </div>
        {loan.schedule.map((row) => (
          <div key={row.installment} style={{
            display: 'grid', gridTemplateColumns: '60px 1fr 1fr 1fr 1fr 100px',
            padding: '14px 28px', borderTop: `1px solid ${theme.borderLight}`,
            fontSize: 13, color: theme.textSecondary, alignItems: 'center',
            background: row.status === 'paid' ? (theme.isDark ? 'rgba(16,185,129,0.05)' : '#FAFFFE') : theme.cardBg,
          }}>
            <span style={{ fontWeight: 600, color: theme.textPrimary }}>{row.installment}</span>
            <span>{row.dueDate}</span>
            <span style={{ textAlign: 'right' }}>{row.principal.toLocaleString()} <RiyalSign size="sm" /></span>
            <span style={{ textAlign: 'right', color: theme.textMuted }}>{row.profit.toLocaleString()} <RiyalSign size="sm" /></span>
            <span style={{ textAlign: 'right', fontWeight: 600, color: theme.textPrimary }}>{row.total.toLocaleString()} <RiyalSign size="sm" /></span>
            <span style={{ textAlign: 'right' }}>
              <span style={{
                padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600,
                color: row.status === 'paid' ? '#16A34A' : row.status === 'overdue' ? '#EF4444' : '#D97706',
                background: row.status === 'paid' ? '#F0FDF4' : row.status === 'overdue' ? '#FEF2F2' : '#FFFBEB',
              }}>
                {row.status === 'paid' ? 'Paid' : row.status === 'overdue' ? 'Overdue' : 'Upcoming'}
              </span>
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function TransactionsTab({ loan }: { loan: LoanData }) {
  const { theme } = useTheme()
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 16,
        overflow: 'hidden', boxShadow: theme.shadow,
      }}
    >
      <div style={{ padding: '24px 28px 16px' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary, marginBottom: 4 }}>Transaction History</h3>
        <p style={{ fontSize: 13, color: theme.textMuted }}>{loan.transactions.length} transactions</p>
      </div>

      {loan.transactions.map((txn) => {
        const iconMap = { payment: CreditCard, disbursement: ArrowUpDown, fee: Receipt }
        const colorMap = { payment: '#2563EB', disbursement: '#16A34A', fee: '#D97706' }
        const bgMap = { payment: '#EFF6FF', disbursement: '#F0FDF4', fee: '#FFFBEB' }
        const Icon = iconMap[txn.type]
        return (
          <div key={txn.id} style={{
            display: 'flex', alignItems: 'center', gap: 16, padding: '16px 28px',
            borderTop: `1px solid ${theme.borderLight}`,
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12, background: bgMap[txn.type],
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon size={18} color={colorMap[txn.type]} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary, marginBottom: 2 }}>{txn.description}</p>
              <p style={{ fontSize: 12, color: theme.textMuted }}>{txn.date} · {txn.id}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{
                fontSize: 15, fontWeight: 700,
                color: txn.type === 'disbursement' ? '#16A34A' : txn.type === 'payment' ? theme.textPrimary : '#D97706',
              }}>
                {txn.type === 'disbursement' ? '+' : '-'} {txn.amount.toLocaleString()} <RiyalSign size="sm" />
              </p>
              <span style={{
                fontSize: 11, fontWeight: 600, color: '#16A34A',
              }}>
                {txn.status === 'completed' ? 'Completed' : 'Pending'}
              </span>
            </div>
          </div>
        )
      })}
    </motion.div>
  )
}

function DocumentsTab({ loan }: { loan: LoanData }) {
  const { theme } = useTheme()
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 16,
        overflow: 'hidden', boxShadow: theme.shadow,
      }}
    >
      <div style={{ padding: '24px 28px 16px' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary, marginBottom: 4 }}>Loan Documents</h3>
        <p style={{ fontSize: 13, color: theme.textMuted }}>{loan.documents.length} documents</p>
      </div>

      {loan.documents.map((doc) => (
        <div key={doc.name} style={{
          display: 'flex', alignItems: 'center', gap: 16, padding: '16px 28px',
          borderTop: `1px solid ${theme.borderLight}`,
        }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12, background: '#EFF6FF',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <FileText size={18} color="#2563EB" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary, marginBottom: 2 }}>{doc.name}</p>
            <p style={{ fontSize: 12, color: theme.textMuted }}>{doc.type} · {doc.date} · {doc.size}</p>
          </div>
          <button style={{
            padding: '8px 16px', background: theme.cardBg, border: `1px solid ${theme.border}`,
            borderRadius: 8, fontSize: 13, fontWeight: 600, color: theme.textSecondary, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <Download size={14} />
            Download
          </button>
        </div>
      ))}
    </motion.div>
  )
}

/* ─── Tabs Config ─── */

const TABS: { key: TabKey; label: string; icon: typeof Info }[] = [
  { key: 'info', label: 'Info', icon: Info },
  { key: 'repayment', label: 'Repayment', icon: CreditCard },
  { key: 'transactions', label: 'Transactions', icon: ArrowUpDown },
  { key: 'documents', label: 'Documents', icon: FileText },
]

/* ─── Page ─── */

export default function LoanDetails() {
  const { theme } = useTheme()
  const { loanId } = useParams<{ loanId: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const stateParam = searchParams.get('state')
  const verified = stateParam === 'verified' || searchParams.get('verified') === 'true'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState<TabKey>('info')
  const [earlyPaymentOpen, setEarlyPaymentOpen] = useState(false)
  const [makePaymentOpen, setMakePaymentOpen] = useState(false)

  const loan = getLoan(loanId || 'LOAN-2024-001')
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

            {/* Back + Title */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}
            >
              <button
                onClick={() => navigate(`/my-loans${query}`)}
                style={{
                  width: 38, height: 38, borderRadius: 10, background: theme.cardBg,
                  border: `1px solid ${theme.border}`, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <ArrowLeft size={18} color={theme.textSecondary} />
              </button>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textPrimary }}>Loan Details</h2>
                <p style={{ fontSize: 13, color: theme.textMuted, fontFamily: 'monospace' }}>{loan.id}</p>
              </div>
            </motion.div>

            {/* ── Summary Bar ── */}
            <motion.div
              className="loan-summary-grid"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              style={{
                background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 16,
                padding: '24px 28px', marginBottom: 20, boxShadow: theme.shadow,
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: 24, alignItems: 'center',
              }}
            >
              <div>
                <p style={{ fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>Facility Type</p>
                <p style={{ fontSize: 15, fontWeight: 600, color: theme.textPrimary }}>{loan.facilityType}</p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>Loan ID</p>
                <p style={{ fontSize: 15, fontWeight: 600, color: theme.textPrimary, fontFamily: 'monospace' }}>{loan.id}</p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>Outstanding Balance</p>
                <p style={{ fontSize: 18, fontWeight: 700, color: '#2563EB' }}>{loan.outstandingBalance.toLocaleString()} <RiyalSign color="#2563EB" /></p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>Status</p>
                <StatusBadge label={loan.statusLabel} status={loan.status} />
              </div>
              <div>
                <p style={{ fontSize: 12, color: theme.textMuted, marginBottom: 6 }}>Loan Progress</p>
                <ProgressBar progress={loan.progress} />
              </div>
            </motion.div>

            {/* ── Next Payment Card ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 16,
                padding: '24px 28px', marginBottom: 24, boxShadow: theme.shadow,
                display: 'flex', alignItems: 'center', gap: 28,
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12, background: '#EFF6FF',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Calendar size={20} color="#2563EB" />
              </div>

              <div style={{ flex: 1, display: 'flex', gap: 40, alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: theme.textPrimary, marginBottom: 8 }}>Next Payment</p>
                  <div style={{ display: 'flex', gap: 32 }}>
                    <div>
                      <p style={{ fontSize: 11, color: theme.textMuted, marginBottom: 4 }}>Amount Due</p>
                      <p style={{ fontSize: 22, fontWeight: 700, color: '#2563EB' }}>{loan.nextPayment.amount.toLocaleString()} <RiyalSign size="lg" color="#2563EB" /></p>
                    </div>
                    <div>
                      <p style={{ fontSize: 11, color: theme.textMuted, marginBottom: 4 }}>Due Date</p>
                      <p style={{ fontSize: 15, fontWeight: 600, color: theme.textPrimary }}>{loan.nextPayment.dueDate}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: 11, color: theme.textMuted, marginBottom: 4 }}>Days Remaining</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={14} color={theme.textSecondary} />
                        <p style={{ fontSize: 15, fontWeight: 600, color: theme.textPrimary }}>{loan.nextPayment.daysRemaining} days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                <button
                  onClick={() => setMakePaymentOpen(true)}
                  style={{
                    padding: '10px 20px', background: '#2563EB', color: '#fff', fontWeight: 600,
                    fontSize: 14, borderRadius: 10, border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >
                  <CreditCard size={16} />
                  Make Payment
                </button>
                <button
                  onClick={() => setEarlyPaymentOpen(true)}
                  style={{
                    padding: '10px 20px', background: theme.cardBg, color: theme.textSecondary, fontWeight: 600,
                    fontSize: 14, borderRadius: 10, border: `1px solid ${theme.border}`, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >
                  <Zap size={16} />
                  Early Repayment
                </button>
              </div>
            </motion.div>

            {/* ── Tab Navigation ── */}
            <div style={{
              display: 'flex', gap: 4, marginBottom: 24, background: theme.cardBg,
              border: `1px solid ${theme.border}`, borderRadius: 12, padding: 4,
              boxShadow: theme.shadow,
            }}>
              {TABS.map(tab => {
                const isActive = activeTab === tab.key
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    style={{
                      padding: '10px 20px', fontSize: 13, fontWeight: 600,
                      color: isActive ? '#fff' : theme.textSecondary,
                      background: isActive ? '#2563EB' : 'transparent',
                      border: 'none', cursor: 'pointer', borderRadius: 8,
                      display: 'flex', alignItems: 'center', gap: 6,
                      transition: 'all 0.15s',
                    }}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* ── Tab Content ── */}
            {activeTab === 'info' && <InfoTab loan={loan} />}
            {activeTab === 'repayment' && <RepaymentTab loan={loan} />}
            {activeTab === 'transactions' && <TransactionsTab loan={loan} />}
            {activeTab === 'documents' && <DocumentsTab loan={loan} />}
          </div>
          <Footer />
        </div>
      </main>
      <FloatingHelpButton />
      <MakePaymentModal open={makePaymentOpen} onClose={() => setMakePaymentOpen(false)} />
      <EarlyPaymentModal open={earlyPaymentOpen} onClose={() => setEarlyPaymentOpen(false)} />
    </div>
  )
}
