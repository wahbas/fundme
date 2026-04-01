'use client'

import { useState } from 'react'
import InvestorLayout from '../../components/investor/layout/InvestorLayout'
import { useInvestorTheme } from '../../components/investor/InvestorThemeContext'
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowDownRight,
  Search,
  Building2,
  Pencil,
  Plus,
} from 'lucide-react'

interface GlassCardProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

function GlassCard({ children, style }: GlassCardProps) {
  const { theme } = useInvestorTheme()
  return (
    <div
      style={{
        background: theme.cardBg,
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: theme.cardRadius,
        backdropFilter: theme.cardBlur,
        boxShadow: theme.cardShadow,
        position: 'relative',
        transition: 'border-color 0.3s, box-shadow 0.4s',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// Transaction type
interface Transaction {
  id: string
  description: string
  type: 'Return' | 'Investment' | 'Deposit' | 'Withdrawal'
  code: string
  amount: number
  date: string
  sign: '+' | '-'
}

const transactions: Transaction[] = [
  {
    id: 'txn-1',
    description: 'Profit from Saudi Solar Grid',
    type: 'Return',
    code: 'FM-0003-072',
    amount: 12400,
    date: 'Apr 1, 2026',
    sign: '+',
  },
  {
    id: 'txn-2',
    description: 'Profit from Al-Baraka Trading',
    type: 'Return',
    code: 'FM-0001-309',
    amount: 8400,
    date: 'Mar 28, 2026',
    sign: '+',
  },
  {
    id: 'txn-3',
    description: 'Investment in Medina Logistics',
    type: 'Investment',
    code: 'FM-0006-415',
    amount: 1000000,
    date: 'Jan 10, 2026',
    sign: '-',
  },
  {
    id: 'txn-4',
    description: 'Partial repayment from Jeddah Health',
    type: 'Return',
    code: 'FM-0005-218',
    amount: 56250,
    date: 'Dec 5, 2025',
    sign: '+',
  },
  {
    id: 'txn-5',
    description: 'Investment in Riyadh EV Charging',
    type: 'Investment',
    code: 'FM-0003-072',
    amount: 500000,
    date: 'Nov 20, 2025',
    sign: '-',
  },
  {
    id: 'txn-6',
    description: 'Deposit via Bank Transfer',
    type: 'Deposit',
    code: 'TXN-88291',
    amount: 750000,
    date: 'Nov 15, 2025',
    sign: '+',
  },
  {
    id: 'txn-7',
    description: 'Profit from Al-Baraka Trading',
    type: 'Return',
    code: 'FM-0001-309',
    amount: 7200,
    date: 'Nov 1, 2025',
    sign: '+',
  },
  {
    id: 'txn-8',
    description: 'Investment in Al-Baraka Trading',
    type: 'Investment',
    code: 'FM-0001-309',
    amount: 320000,
    date: 'Oct 15, 2025',
    sign: '-',
  },
  {
    id: 'txn-9',
    description: 'Deposit via Bank Transfer',
    type: 'Deposit',
    code: 'TXN-77104',
    amount: 1500000,
    date: 'Oct 1, 2025',
    sign: '+',
  },
  {
    id: 'txn-10',
    description: 'Withdrawal to Bank Account',
    type: 'Withdrawal',
    code: 'TXN-65023',
    amount: 200000,
    date: 'Sep 20, 2025',
    sign: '-',
  },
]

function WalletBalanceCard() {
  const { theme } = useInvestorTheme()

  return (
    <GlassCard
      style={{
        padding: '20px',
        flex: '0 0 60%',
      }}
    >
      {/* Wallet icon and label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '12px',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: `${theme.blue}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Wallet size={18} color={theme.blue} strokeWidth={2} />
        </div>
        <div style={{ fontSize: '12px', color: theme.textSecondary }}>
          Available Balance
        </div>
      </div>

      {/* Main balance */}
      <div style={{ marginBottom: '8px' }}>
        <div
          style={{
            fontSize: '32px',
            fontWeight: '700',
            color: theme.textHeading,
            display: 'flex',
            alignItems: 'baseline',
            gap: '4px',
          }}
        >
          SAR 2,193,115
        </div>
      </div>

      {/* Updated subtitle */}
      <div
        style={{
          fontSize: '11px',
          color: theme.textSecondary,
          marginBottom: '16px',
        }}
      >
        Updated just now
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {/* Deposit button */}
        <button
          style={{
            flex: 1,
            padding: '10px 14px',
            background: theme.isDark ? '#2DD4A0' : '#0E9F6E',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <ArrowUpRight size={14} strokeWidth={2.5} />
          Deposit
        </button>

        {/* Withdraw button */}
        <button
          style={{
            flex: 1,
            padding: '10px 14px',
            background: 'transparent',
            color: theme.textSecondary,
            border: `1px solid ${theme.cardBorder}`,
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = theme.blue
            e.currentTarget.style.color = theme.blue
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = theme.cardBorder
            e.currentTarget.style.color = theme.textSecondary
          }}
        >
          <ArrowDownLeft size={14} strokeWidth={2.5} />
          Withdraw
        </button>
      </div>
    </GlassCard>
  )
}

function QuickStatsCard() {
  const { theme } = useInvestorTheme()

  return (
    <div
      style={{
        flex: '0 0 40%',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {/* This Month In */}
      <GlassCard style={{ padding: '16px', flex: '1' }}>
        <div style={{ fontSize: '11px', color: theme.textSecondary, marginBottom: '4px' }}>
          This Month In
        </div>
        <div style={{ fontSize: '18px', fontWeight: '700', color: theme.green, marginBottom: '4px' }}>
          +SAR 84,200
        </div>
        <div style={{ fontSize: '11px', color: theme.textSecondary }}>
          from 3 repayments
        </div>
      </GlassCard>

      {/* This Month Out */}
      <GlassCard style={{ padding: '16px', flex: '1' }}>
        <div style={{ fontSize: '11px', color: theme.textSecondary, marginBottom: '4px' }}>
          This Month Out
        </div>
        <div style={{ fontSize: '18px', fontWeight: '700', color: theme.red, marginBottom: '4px' }}>
          -SAR 12,500
        </div>
        <div style={{ fontSize: '11px', color: theme.textSecondary }}>
          1 investment
        </div>
      </GlassCard>
    </div>
  )
}

function CashFlowChart() {
  const { theme } = useInvestorTheme()
  const [activeRange, setActiveRange] = useState('6M')

  // 6 months data
  const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']
  const inflows = [45000, 62000, 38000, 84000, 71000, 84000]
  const outflows = [320000, 500000, 1000000, 0, 0, 12500]

  // Find max value for scaling
  const allValues = [...inflows, ...outflows]
  const maxValue = Math.max(...allValues)
  const scale = 200 / maxValue // 200px height for bars

  return (
    <GlassCard style={{ padding: '20px', marginTop: '24px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <div style={{ fontSize: '16px', fontWeight: '700', color: theme.textHeading }}>
          Cash Flow
        </div>

        {/* Time range pills */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {['3M', '6M', '1Y'].map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '11px',
                fontWeight: '600',
                background:
                  activeRange === range
                    ? theme.blue
                    : theme.isDark
                      ? 'rgba(255,255,255,0.06)'
                      : 'rgba(13,130,249,0.06)',
                color: activeRange === range ? '#fff' : theme.textSecondary,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (activeRange !== range) {
                  e.currentTarget.style.background = theme.hoverBg
                }
              }}
              onMouseLeave={(e) => {
                if (activeRange !== range) {
                  e.currentTarget.style.background = theme.isDark
                    ? 'rgba(255,255,255,0.06)'
                    : 'rgba(13,130,249,0.06)'
                }
              }}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart container */}
      <div
        style={{
          height: '280px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          gap: '12px',
          position: 'relative',
          paddingBottom: '40px',
        }}
      >
        {/* Grid lines background */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
          preserveAspectRatio="none"
        >
          {[0, 0.25, 0.5, 0.75, 1].map((_, idx) => (
            <line
              key={`grid-${idx}`}
              x1="0"
              y1={`${(1 - idx * 0.25) * 100}%`}
              x2="100%"
              y2={`${(1 - idx * 0.25) * 100}%`}
              stroke={theme.chartGrid}
              strokeWidth="1"
              strokeDasharray="4"
            />
          ))}
        </svg>

        {/* Month groups */}
        {months.map((month, idx) => (
          <div key={month} style={{ display: 'flex', gap: '6px', alignItems: 'flex-end' }}>
            {/* Inflow bar (green) */}
            <div
              style={{
                width: '20px',
                height: `${inflows[idx] * scale}px`,
                background: theme.green,
                borderRadius: '4px 4px 0 0',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              title={`Inflow: SAR ${inflows[idx].toLocaleString('en-US')}`}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            />

            {/* Outflow bar (blue) */}
            <div
              style={{
                width: '20px',
                height: `${outflows[idx] * scale}px`,
                background: theme.blue,
                borderRadius: '4px 4px 0 0',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              title={`Outflow: SAR ${outflows[idx].toLocaleString('en-US')}`}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            />

            {/* Month label */}
            <div
              style={{
                position: 'absolute',
                bottom: '-30px',
                fontSize: '11px',
                color: theme.textSecondary,
                textAlign: 'center',
                width: '46px',
                transform: 'translateX(-8px)',
              }}
            >
              {month}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          marginTop: '30px',
          paddingTop: '12px',
          borderTop: `1px solid ${theme.cardBorder}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: theme.green,
            }}
          />
          <span style={{ fontSize: '11px', color: theme.textSecondary }}>Inflows</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: theme.blue,
            }}
          />
          <span style={{ fontSize: '11px', color: theme.textSecondary }}>Outflows</span>
        </div>
      </div>
    </GlassCard>
  )
}

function TransactionHistory() {
  const { theme } = useInvestorTheme()
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Filter transactions
  const filtered = transactions.filter((txn) => {
    if (activeFilter !== 'all') {
      if (activeFilter === 'deposits' && txn.type !== 'Deposit') return false
      if (activeFilter === 'withdrawals' && txn.type !== 'Withdrawal') return false
      if (activeFilter === 'investments' && txn.type !== 'Investment') return false
      if (activeFilter === 'returns' && txn.type !== 'Return') return false
    }

    if (searchTerm) {
      return txn.description.toLowerCase().includes(searchTerm.toLowerCase())
    }

    return true
  })

  // Get icon and color based on type
  const getTransactionStyle = (txn: Transaction) => {
    if (txn.type === 'Return') {
      return { icon: ArrowDownLeft, color: theme.green }
    } else if (txn.type === 'Investment') {
      return { icon: ArrowUpRight, color: theme.blue }
    } else if (txn.type === 'Deposit') {
      return { icon: ArrowDownLeft, color: theme.green }
    } else {
      return { icon: ArrowDownRight, color: theme.red }
    }
  }

  return (
    <GlassCard style={{ padding: '20px', marginTop: '24px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <div style={{ fontSize: '16px', fontWeight: '700', color: theme.textHeading }}>
          Transaction History
        </div>

        {/* Search input */}
        <div
          style={{
            position: 'relative',
            width: '200px',
          }}
        >
          <Search
            size={14}
            color={theme.textSecondary}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 10px 8px 32px',
              borderRadius: '8px',
              border: `1px solid ${theme.inputBorder}`,
              background: theme.inputBg,
              fontSize: '12px',
              color: theme.textPrimary,
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = theme.blue)}
            onBlur={(e) => (e.currentTarget.style.borderColor = theme.inputBorder)}
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '16px',
          borderBottom: `1px solid ${theme.cardBorder}`,
          paddingBottom: '12px',
        }}
      >
        {['all', 'deposits', 'withdrawals', 'investments', 'returns'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            style={{
              padding: '6px 12px',
              borderRadius: '0',
              border: 'none',
              fontSize: '12px',
              fontWeight: '600',
              background: 'transparent',
              color:
                activeFilter === filter
                  ? theme.blue
                  : theme.textSecondary,
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderBottom: activeFilter === filter ? `2px solid ${theme.blue}` : 'none',
              paddingBottom: activeFilter === filter ? '4px' : '6px',
            }}
            onMouseEnter={(e) => {
              if (activeFilter !== filter) {
                e.currentTarget.style.color = theme.textHeading
              }
            }}
            onMouseLeave={(e) => {
              if (activeFilter !== filter) {
                e.currentTarget.style.color = theme.textSecondary
              }
            }}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Transaction rows */}
      <div>
        {filtered.map((txn) => {
          const { icon: IconComponent, color } = getTransactionStyle(txn)
          const isPositive = txn.sign === '+'

          return (
            <div
              key={txn.id}
              style={{
                display: 'flex',
                gap: '12px',
                padding: '12px 0',
                borderBottom: `1px solid ${theme.cardBorder}`,
                alignItems: 'center',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: `${color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <IconComponent size={18} color={color} strokeWidth={2} />
              </div>

              {/* Description and code */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: theme.textHeading }}>
                  {txn.description}
                </div>
                <div style={{ fontSize: '11px', color: theme.textSecondary }}>
                  {txn.type} · {txn.code}
                </div>
              </div>

              {/* Amount and date */}
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: isPositive ? theme.green : theme.red,
                  }}
                >
                  {txn.sign}SAR {txn.amount.toLocaleString('en-US')}
                </div>
                <div style={{ fontSize: '11px', color: theme.textSecondary }}>
                  {txn.date}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </GlassCard>
  )
}

function PaymentMethods() {
  const { theme } = useInvestorTheme()

  return (
    <GlassCard style={{ padding: '20px', marginTop: '24px' }}>
      {/* Header */}
      <div style={{ fontSize: '16px', fontWeight: '700', color: theme.textHeading, marginBottom: '16px' }}>
        Payment Methods
      </div>

      {/* Bank account card */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px',
          borderRadius: '12px',
          border: `1px solid ${theme.cardBorder}`,
          marginBottom: '12px',
        }}
      >
        {/* Bank icon */}
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            background: `${theme.blue}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Building2 size={20} color={theme.blue} strokeWidth={2} />
        </div>

        {/* Bank details */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: theme.textHeading }}>
            Saudi National Bank
          </div>
          <div style={{ fontSize: '11px', color: theme.textSecondary }}>****4821</div>
        </div>

        {/* Primary badge */}
        <div
          style={{
            fontSize: '10px',
            fontWeight: '600',
            background: `${theme.green}20`,
            color: theme.green,
            padding: '4px 10px',
            borderRadius: '6px',
          }}
        >
          Primary
        </div>

        {/* Edit button */}
        <button
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            border: `1px solid ${theme.cardBorder}`,
            background: 'transparent',
            color: theme.textSecondary,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = theme.blue
            e.currentTarget.style.color = theme.blue
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = theme.cardBorder
            e.currentTarget.style.color = theme.textSecondary
          }}
        >
          <Pencil size={14} strokeWidth={2} />
        </button>
      </div>

      {/* Add payment method button */}
      <button
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: '12px',
          border: `2px dashed ${theme.cardBorder}`,
          background: 'transparent',
          color: theme.textSecondary,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '13px',
          fontWeight: '600',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = theme.blue
          e.currentTarget.style.color = theme.blue
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = theme.cardBorder
          e.currentTarget.style.color = theme.textSecondary
        }}
      >
        <Plus size={16} strokeWidth={2} />
        Add Payment Method
      </button>
    </GlassCard>
  )
}

export default function InvestorWallet() {
  return (
    <InvestorLayout activeTab="wallet" userName="Ahmed" tier="BASIC">
      {/* Top row: 60/40 split */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <WalletBalanceCard />
        <QuickStatsCard />
      </div>

      {/* Cash Flow Chart */}
      <CashFlowChart />

      {/* Transaction History */}
      <TransactionHistory />

      {/* Payment Methods */}
      <PaymentMethods />
    </InvestorLayout>
  )
}
