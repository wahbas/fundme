'use client'

import { useState, useEffect } from 'react'
import InvestorLayout from '../../components/investor/layout/InvestorLayout'
import { useInvestorTheme } from '../../components/investor/InvestorThemeContext'
import {
  ChevronLeft,
  ChevronRight,
  Lock,
  DollarSign,
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

interface OpportunityData {
  id: string
  name: string
  type: string
  risk: string
  return: number
  tenor: string
  amount: number
  funded: number
  badge: 'trending' | 'exclusive' | 'new'
  coverGradient: string
}

const opportunitiesPage1: OpportunityData[] = [
  {
    id: 'opp-1',
    name: 'Al-Baraka Trading Co.',
    type: 'Invoice Financing',
    risk: 'Risk A',
    return: 12.5,
    tenor: '6 months',
    amount: 500000,
    funded: 64,
    badge: 'trending',
    coverGradient: 'linear-gradient(170deg, #001230 0%, #002E83 35%, #0D82F9 100%)',
  },
  {
    id: 'opp-2',
    name: 'NEOM Tech Ventures',
    type: 'Murabaha',
    risk: 'Risk B',
    return: 18.2,
    tenor: '24 months',
    amount: 5000000,
    funded: 42,
    badge: 'exclusive',
    coverGradient: 'linear-gradient(170deg, #001230 0%, #002E83 35%, #2DD4A0 100%)',
  },
  {
    id: 'opp-3',
    name: 'Riyadh EV Charging',
    type: 'Clean Energy',
    risk: 'Risk A',
    return: 15.5,
    tenor: '18 months',
    amount: 2000000,
    funded: 81,
    badge: 'new',
    coverGradient: 'linear-gradient(170deg, #001208 0%, #003820 35%, #34D399 100%)',
  },
]

const opportunitiesPage2: OpportunityData[] = [
  {
    id: 'opp-4',
    name: 'Jeddah Health Hub',
    type: 'Healthcare',
    risk: 'Risk A',
    return: 12.8,
    tenor: '12 months',
    amount: 1500000,
    funded: 35,
    badge: 'new',
    coverGradient: 'linear-gradient(170deg, #1a0033 0%, #4a0080 35%, #9933cc 100%)',
  },
  {
    id: 'opp-5',
    name: 'Saudi Fresh Foods',
    type: 'Agriculture',
    risk: 'Risk A',
    return: 14.0,
    tenor: '9 months',
    amount: 800000,
    funded: 92,
    badge: 'trending',
    coverGradient: 'linear-gradient(170deg, #1a1a00 0%, #4a4a00 35%, #cccc00 100%)',
  },
  {
    id: 'opp-6',
    name: 'Dammam Logistics',
    type: 'Logistics',
    risk: 'Risk B',
    return: 16.5,
    tenor: '18 months',
    amount: 3200000,
    funded: 18,
    badge: 'exclusive',
    coverGradient: 'linear-gradient(170deg, #330000 0%, #663300 35%, #ff6600 100%)',
  },
]

interface RepaymentData {
  id: string
  company: string
  type: string
  code: string
  amount: number
  date: string
  iconColor: string
}

const repayments: RepaymentData[] = [
  {
    id: 'repay-1',
    company: 'Al-Baraka Trading Co.',
    type: 'Invoice Financing',
    code: 'FM-0001-309',
    amount: 56250,
    date: 'Apr 15, 2026',
    iconColor: '#0D82F9',
  },
  {
    id: 'repay-2',
    company: 'Riyadh EV Charging',
    type: 'Clean Energy',
    code: 'FM-0003-072',
    amount: 115500,
    date: 'May 2, 2026',
    iconColor: '#34D399',
  },
  {
    id: 'repay-3',
    company: 'Jeddah Health Hub',
    type: 'Healthcare',
    code: 'FM-0005-218',
    amount: 84000,
    date: 'Jun 10, 2026',
    iconColor: '#9933cc',
  },
]

function OpportunityCard({
  opp,
  isExclusive,
}: {
  opp: OpportunityData
  isExclusive?: boolean
}) {
  const { theme } = useInvestorTheme()

  const badgeConfig = {
    trending: { label: 'Trending', bg: theme.badgeTrendingBg, text: theme.badgeTrendingText },
    exclusive: { label: '★ Exclusive', bg: theme.badgeHotBg, text: theme.badgeHotText },
    new: { label: 'New', bg: theme.badgeNewBg, text: theme.badgeNewText },
  }

  const config = badgeConfig[opp.badge]

  return (
    <GlassCard
      style={{
        position: 'relative',
        minWidth: 'calc((100% - 20px) / 3)',
        overflow: 'hidden',
      }}
    >
      {/* Cover gradient */}
      <div
        style={{
          background: opp.coverGradient,
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}
        >
          <DollarSign size={24} strokeWidth={1.5} />
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '16px' }}>
        {/* Header with name and badge */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
            marginBottom: '12px',
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: '600', color: theme.textHeading }}>
            {opp.name}
          </div>
          <div
            style={{
              fontSize: '10px',
              fontWeight: '700',
              background: config.bg,
              color: config.text,
              padding: '4px 8px',
              borderRadius: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            {config.label}
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <div
            style={{
              fontSize: '11px',
              padding: '3px 8px',
              background: 'rgba(255,255,255,0.06)',
              border: `1px solid ${theme.cardBorder}`,
              borderRadius: '6px',
              color: theme.textSecondary,
            }}
          >
            {opp.type}
          </div>
          <div
            style={{
              fontSize: '11px',
              padding: '3px 8px',
              background: 'rgba(255,255,255,0.06)',
              border: `1px solid ${theme.cardBorder}`,
              borderRadius: '6px',
              color: theme.textSecondary,
            }}
          >
            {opp.risk}
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: theme.textTertiary, marginBottom: '4px' }}>
              Net Return
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: theme.textHeading }}>
              {opp.return}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: theme.textTertiary, marginBottom: '4px' }}>
              Tenor
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: theme.textHeading }}>
              {opp.tenor}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: '6px',
            background: theme.progressBg,
            borderRadius: '3px',
            marginBottom: '8px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${opp.funded}%`,
              background: theme.progressFill,
              borderRadius: '3px',
            }}
          />
        </div>

        {/* Funding info */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            marginBottom: '12px',
            color: theme.textSecondary,
          }}
        >
          <span>SAR {opp.amount.toLocaleString('en-US')}</span>
          <span>{opp.funded}% funded</span>
        </div>

        {/* Invest button */}
        <button
          style={{
            width: '100%',
            padding: '8px 12px',
            background: theme.investBtnBg,
            color: theme.investBtnText,
            border: 'none',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Invest Now
        </button>
      </div>

      {/* VIP Exclusive lock overlay */}
      {isExclusive && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: theme.cardRadius,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Lock size={24} color="#D4A843" />
            <div
              style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#D4A843',
                textAlign: 'center',
              }}
            >
              VIP Exclusive
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  )
}

function BalanceCard() {
  const { theme } = useInvestorTheme()
  const [chartRevealWidth, setChartRevealWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setChartRevealWidth(100), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <GlassCard
      style={{
        padding: '20px',
        flex: '1',
        minWidth: '0',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '12px', color: theme.textSecondary, marginBottom: '4px' }}>
          Total Active Investments
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
          <div style={{ fontSize: '32px', fontWeight: '700', color: theme.textHeading }}>
            2,418,240
          </div>
          <div style={{ fontSize: '14px', color: theme.textSecondary }}>.00</div>
        </div>
        <div style={{ fontSize: '12px', color: theme.textSecondary }}>
          Across 3 deals · Expected Profit{' '}
          <span style={{ color: theme.green, fontWeight: '600' }}>SAR 27,125</span>{' '}
          <span style={{ color: theme.green }}>+11.3%</span>
        </div>
      </div>

      {/* Time range pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {['1M', '3M', '6M', '1Y'].map((period, idx) => (
          <button
            key={period}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '11px',
              fontWeight: '600',
              background:
                idx === 0
                  ? theme.blue
                  : theme.isDark
                    ? 'rgba(255,255,255,0.06)'
                    : 'rgba(13,130,249,0.06)',
              color: idx === 0 ? '#fff' : theme.textSecondary,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (idx !== 0) {
                e.currentTarget.style.background = theme.hoverBg
              }
            }}
            onMouseLeave={(e) => {
              if (idx !== 0) {
                e.currentTarget.style.background = theme.isDark
                  ? 'rgba(255,255,255,0.06)'
                  : 'rgba(13,130,249,0.06)'
              }
            }}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div
        style={{
          width: '100%',
          height: '90px',
          position: 'relative',
        }}
      >
        <svg
          viewBox="0 0 600 90"
          preserveAspectRatio="none"
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <defs>
            <linearGradient id="sparkFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.blue} stopOpacity="0.3" />
              <stop offset="100%" stopColor={theme.blue} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sparkLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={theme.blue} stopOpacity="0.3" />
              <stop offset="100%" stopColor={theme.blue} />
            </linearGradient>
            <clipPath id="chartReveal">
              <rect x="0" y="0" width={`${chartRevealWidth}%`} height="90" />
            </clipPath>
          </defs>

          <g clipPath="url(#chartReveal)" style={{ transition: 'opacity 0.6s ease-out' }}>
            <path
              d="M0 70 L40 65 L80 68 L120 58 L160 55 L200 50 L240 42 L280 40 L320 35 L360 30 L400 24 L440 20 L480 16 L520 12 L560 8 L600 4 L600 90 L0 90Z"
              fill="url(#sparkFill)"
            />
            <path
              d="M0 70 L40 65 L80 68 L120 58 L160 55 L200 50 L240 42 L280 40 L320 35 L360 30 L400 24 L440 20 L480 16 L520 12 L560 8 L600 4"
              stroke="url(#sparkLine)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="600" cy="4" r="3" fill={theme.blue} />
            <circle
              cx="600"
              cy="4"
              r="6"
              fill={theme.blue}
              opacity="0.15"
              stroke="none"
            />
          </g>
        </svg>
      </div>
    </GlassCard>
  )
}

function WalletWidget() {
  const { theme } = useInvestorTheme()

  return (
    <GlassCard
      style={{
        padding: '20px',
        flex: '0 0 28%',
        minWidth: '0',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'rgba(13,130,249,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DollarSign size={16} color={theme.blue} strokeWidth={2} />
        </div>
        <div style={{ fontSize: '13px', fontWeight: '600', color: theme.textHeading }}>
          Wallet
        </div>
      </div>

      {/* Balance label and amount */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', color: theme.textSecondary, marginBottom: '4px' }}>
          Available Balance
        </div>
        <div style={{ fontSize: '24px', fontWeight: '700', color: theme.textHeading }}>
          SAR 2,193,115
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background: theme.cardBorder,
          margin: '12px 0',
        }}
      />

      {/* Quick stats */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '11px',
            }}
          >
            <span style={{ color: theme.textSecondary }}>This Month In</span>
            <span style={{ color: theme.green, fontWeight: '600' }}>+SAR 84,200</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '11px',
            }}
          >
            <span style={{ color: theme.textSecondary }}>This Month Out</span>
            <span style={{ color: theme.red, fontWeight: '600' }}>-SAR 12,500</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          style={{
            flex: 1,
            padding: '8px 12px',
            background: theme.blue,
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Deposit
        </button>
        <button
          style={{
            flex: 1,
            padding: '8px 12px',
            background: 'transparent',
            color: theme.textSecondary,
            border: `1px solid ${theme.cardBorder}`,
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
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
          Withdraw
        </button>
      </div>
    </GlassCard>
  )
}

function OpportunitiesSection() {
  const { theme } = useInvestorTheme()
  const [currentPage, setCurrentPage] = useState(0)

  const allPages = [opportunitiesPage1, opportunitiesPage2]
  const currentOps = allPages[currentPage]

  const handlePrev = () => {
    setCurrentPage((p) => (p > 0 ? p - 1 : p))
  }

  const handleNext = () => {
    setCurrentPage((p) => (p < allPages.length - 1 ? p + 1 : p))
  }

  const canGoPrev = currentPage > 0
  const canGoNext = currentPage < allPages.length - 1

  return (
    <div style={{ marginTop: '24px' }}>
      {/* Header with navigation */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <div style={{ fontSize: '16px', fontWeight: '700', color: theme.textHeading }}>
          Opportunities
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Pagination dots */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {allPages.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentPage(idx)}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: currentPage === idx ? theme.blue : theme.textTertiary,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: `1px solid ${theme.cardBorder}`,
              background: 'transparent',
              color: canGoPrev ? theme.textSecondary : theme.textTertiary,
              cursor: canGoPrev ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              opacity: canGoPrev ? 1 : 0.5,
            }}
            onMouseEnter={(e) => {
              if (canGoPrev) {
                e.currentTarget.style.borderColor = theme.blue
                e.currentTarget.style.color = theme.blue
              }
            }}
            onMouseLeave={(e) => {
              if (canGoPrev) {
                e.currentTarget.style.borderColor = theme.cardBorder
                e.currentTarget.style.color = theme.textSecondary
              }
            }}
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={handleNext}
            disabled={!canGoNext}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: `1px solid ${theme.cardBorder}`,
              background: 'transparent',
              color: canGoNext ? theme.textSecondary : theme.textTertiary,
              cursor: canGoNext ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              opacity: canGoNext ? 1 : 0.5,
            }}
            onMouseEnter={(e) => {
              if (canGoNext) {
                e.currentTarget.style.borderColor = theme.blue
                e.currentTarget.style.color = theme.blue
              }
            }}
            onMouseLeave={(e) => {
              if (canGoNext) {
                e.currentTarget.style.borderColor = theme.cardBorder
                e.currentTarget.style.color = theme.textSecondary
              }
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Cards carousel */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          overflow: 'hidden',
        }}
      >
        {currentOps.map((opp) => (
          <OpportunityCard
            key={opp.id}
            opp={opp}
            isExclusive={opp.badge === 'exclusive'}
          />
        ))}
      </div>
    </div>
  )
}

function RepaymentItem({ repayment }: { repayment: RepaymentData }) {
  const { theme } = useInvestorTheme()

  return (
    <div
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
          background: `${repayment.iconColor}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <DollarSign size={18} color={repayment.iconColor} strokeWidth={1.8} />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '13px', fontWeight: '600', color: theme.textHeading }}>
          {repayment.company}
        </div>
        <div style={{ fontSize: '11px', color: theme.textSecondary }}>
          {repayment.type} · {repayment.code}
        </div>
      </div>

      {/* Right side */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: '13px', fontWeight: '600', color: theme.green }}>
          SAR {repayment.amount.toLocaleString('en-US')}
        </div>
        <div style={{ fontSize: '11px', color: theme.textSecondary }}>
          {repayment.date}
        </div>
      </div>
    </div>
  )
}

function RepaymentSection() {
  const { theme } = useInvestorTheme()

  return (
    <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
      {/* Repayments card (70%) */}
      <GlassCard style={{ flex: '1', padding: '20px' }}>
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
            Upcoming Repayments
          </div>
          <a
            href="#"
            style={{
              fontSize: '12px',
              color: theme.blue,
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'opacity 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            View all →
          </a>
        </div>

        {/* Repayment items */}
        <div>
          {repayments.map((repayment) => (
            <RepaymentItem key={repayment.id} repayment={repayment} />
          ))}
        </div>
      </GlassCard>

      {/* VIP Upgrade card (30%) */}
      <GlassCard style={{ flex: '0 0 30%', padding: '20px', position: 'relative', overflow: 'hidden' }}>
        {/* Glow effect */}
        <div
          style={{
            position: 'absolute',
            top: '-40%',
            right: '-40%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(212,168,67,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Icon */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '12px',
            }}
          >
            <Lock size={32} color="#D4A843" strokeWidth={1.5} />
          </div>

          {/* Badge */}
          <div
            style={{
              fontSize: '10px',
              fontWeight: '800',
              color: '#D4A843',
              textAlign: 'center',
              marginBottom: '8px',
              letterSpacing: '0.05em',
            }}
          >
            VIP GOLD
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '14px',
              fontWeight: '700',
              color: theme.textHeading,
              textAlign: 'center',
              marginBottom: '6px',
            }}
          >
            Unlock Premium Opportunities
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '11px',
              color: theme.textSecondary,
              textAlign: 'center',
              marginBottom: '12px',
              lineHeight: 1.4,
            }}
          >
            Get exclusive deals, higher returns, and priority access to new offerings
          </div>

          {/* Perks */}
          <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Exclusive deals', 'Up to 18% returns', 'Dedicated manager'].map((perk) => (
              <div
                key={perk}
                style={{
                  fontSize: '11px',
                  color: theme.textSecondary,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '3px',
                    background: '#D4A843',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    width="10"
                    height="10"
                    style={{ color: '#000' }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                {perk}
              </div>
            ))}
          </div>

          {/* Button */}
          <button
            style={{
              width: '100%',
              padding: '8px 12px',
              background: 'linear-gradient(135deg, #D4A843 0%, #E8C872 100%)',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Upgrade to VIP
          </button>
        </div>
      </GlassCard>
    </div>
  )
}

export default function InvestorDashboard() {
  return (
    <InvestorLayout activeTab="dashboard" userName="Ahmed" tier="BASIC">
      {/* Top row: Balance Card + Wallet Widget */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <BalanceCard />
        <WalletWidget />
      </div>

      {/* Opportunities Section */}
      <OpportunitiesSection />

      {/* Repayments + VIP Upgrade Section */}
      <RepaymentSection />
    </InvestorLayout>
  )
}
