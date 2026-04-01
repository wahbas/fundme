'use client'

import { useState, useEffect } from 'react'
import InvestorLayout from '../../components/investor/layout/InvestorLayout'
import { useInvestorTheme } from '../../components/investor/InvestorThemeContext'
import {
  ChevronLeft,
  ChevronRight,
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
  iconColor?: string
}

const opportunityIconColors: Record<string, string> = {
  'Invoice Financing': '#5ab4ff',
  'Murabaha': '#34D399',
  'Clean Energy': '#34D399',
  'Healthcare': '#a78bfa',
  'Agriculture': '#6ee7b7',
  'Logistics': '#E8C872',
}

function OpportunityIcon({ type }: { type: string }) {
  const color = opportunityIconColors[type] || '#fff'
  const props = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    width: 26,
    height: 26,
    style: { color },
  }

  switch (type) {
    case 'Invoice Financing':
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="9" y1="13" x2="15" y2="13"/>
          <line x1="9" y1="17" x2="13" y2="17"/>
        </svg>
      )
    case 'Murabaha':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10"/>
          <path d="M16 8h-4a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H8"/>
          <line x1="12" y1="6" x2="12" y2="8"/>
          <line x1="12" y1="16" x2="12" y2="18"/>
        </svg>
      )
    case 'Clean Energy':
      return (
        <svg {...props}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      )
    case 'Healthcare':
      return (
        <svg {...props}>
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      )
    case 'Agriculture':
      return (
        <svg {...props}>
          <path d="M12 22c-4 0-8-2-8-6s4-6 8-6 8 2 8 6-4 6-8 6z"/>
          <path d="M12 10V2"/>
          <path d="M8 6l4 4 4-4"/>
        </svg>
      )
    case 'Logistics':
      return (
        <svg {...props}>
          <rect x="1" y="3" width="15" height="13"/>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
          <circle cx="5.5" cy="18.5" r="2.5"/>
          <circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      )
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10"/>
          <path d="M16 8h-4a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H8"/>
          <line x1="12" y1="6" x2="12" y2="8"/>
          <line x1="12" y1="16" x2="12" y2="18"/>
        </svg>
      )
  }
}

function RepaymentIcon({ type }: { type: string }) {
  const props = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    width: 18,
    height: 18,
    style: { color: '#fff' },
  }

  switch (type) {
    case 'Invoice Financing':
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="9" y1="13" x2="15" y2="13"/>
          <line x1="9" y1="17" x2="13" y2="17"/>
        </svg>
      )
    case 'Clean Energy':
      return (
        <svg {...props}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      )
    case 'Healthcare':
      return (
        <svg {...props}>
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      )
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10"/>
        </svg>
      )
  }
}

const repaymentIconBg: Record<string, string> = {
  'Invoice Financing': '#0D82F9',
  'Clean Energy': '#34D399',
  'Healthcare': '#9370db',
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
    coverGradient: 'linear-gradient(170deg, #0a0020 0%, #1a0050 35%, #5b4fcf 100%)',
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
    coverGradient: 'linear-gradient(170deg, #001208 0%, #003820 35%, #34D399 100%)',
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
    coverGradient: 'linear-gradient(170deg, #001230 0%, #002E83 40%, #D4A843 100%)',
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
          position: 'relative',
        }}
      >
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.08) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.08) 100%)',
        }} />
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            background: 'rgba(0,0,0,0.25)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <OpportunityIcon type={opp.type} />
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
          <div>
            <div style={{ fontSize: '11px', color: theme.textTertiary, marginBottom: '4px' }}>
              Size
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: theme.textHeading }}>
              SAR {(opp.amount / 1000).toFixed(0)}K
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: '10px',
            background: 'repeating-linear-gradient(-45deg, rgba(13,130,249,0.15), rgba(13,130,249,0.15) 4px, rgba(13,130,249,0.06) 4px, rgba(13,130,249,0.06) 8px)',
            borderRadius: '6px',
            marginBottom: '8px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${opp.funded}%`,
              background: theme.blue,
              borderRadius: '6px',
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
            <svg viewBox="0 0 24 24" fill="none" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
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
        padding: '18px 24px 0',
        minWidth: '0',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '12px', color: theme.textSecondary, marginBottom: '4px' }}>
              Total Active Investments
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: theme.textHeading }}>
                2,418,240
              </div>
              <div style={{ fontSize: '14px', color: theme.textSecondary }}>.00</div>
            </div>
          </div>
          {/* Time pill dropdown */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}>
            Last 30 Days ▾
          </div>
        </div>
        {/* Sub-row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '12px', color: theme.textSecondary }}>
          <span>Across <strong style={{ color: theme.textHeading }}>3</strong> deals</span>
          <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: theme.textTertiary, display: 'inline-block' }} />
          <span>Expected Profit <strong style={{ color: theme.green, fontWeight: 600 }}>SAR 27,125</strong></span>
          <span style={{
            background: 'rgba(52,211,153,0.1)',
            padding: '2px 6px',
            borderRadius: '5px',
            color: theme.green,
            fontWeight: 600,
            fontSize: '12px',
          }}>+11.3%</span>
        </div>
      </div>

      {/* Chart */}
      <div
        style={{
          width: 'calc(100% + 48px)',
          margin: '6px -24px 0',
          height: '80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Chart annotation */}
        <div style={{
          position: 'absolute',
          top: '4px',
          right: '40px',
          fontSize: '11px',
          fontWeight: 600,
          color: theme.green,
          zIndex: 1,
        }}>
          +12.3% ↑
        </div>
        <svg
          viewBox="0 0 600 80"
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
              <rect x="0" y="0" width={`${chartRevealWidth}%`} height="80" />
            </clipPath>
          </defs>

          <g clipPath="url(#chartReveal)" style={{ transition: 'opacity 0.6s ease-out' }}>
            <path
              d="M0 62 L40 58 L80 60 L120 52 L160 49 L200 44 L240 37 L280 35 L320 31 L360 27 L400 21 L440 18 L480 14 L520 10 L560 7 L600 4 L600 80 L0 80Z"
              fill="url(#sparkFill)"
            />
            <path
              d="M0 62 L40 58 L80 60 L120 52 L160 49 L200 44 L240 37 L280 35 L320 31 L360 27 L400 21 L440 18 L480 14 L520 10 L560 7 L600 4"
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
        minWidth: '0',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <svg viewBox="0 0 48 40" fill="none" width="36" height="30">
          <rect x="2" y="4" width="38" height="28" rx="6" stroke={theme.blue} strokeWidth="1.5" fill="rgba(13,130,249,0.06)"/>
          <rect x="2" y="4" width="38" height="10" rx="6" fill="rgba(13,130,249,0.08)" stroke="none"/>
          <line x1="2" y1="14" x2="40" y2="14" stroke="rgba(13,130,249,0.15)" strokeWidth="1"/>
          <circle cx="20" cy="24" r="5.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2.5 2" fill="none"/>
          <line x1="20" y1="21.5" x2="20" y2="26.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round"/>
          <line x1="17.5" y1="24" x2="22.5" y2="24" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round"/>
          <rect x="34" y="16" width="12" height="12" rx="4" stroke={theme.blue} strokeWidth="1.2" fill="rgba(13,130,249,0.08)"/>
          <circle cx="40" cy="22" r="2.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none"/>
          <circle cx="4" cy="2" r="1.5" fill="rgba(212,168,67,0.4)"/>
          <circle cx="42" cy="8" r="1" fill="rgba(52,211,153,0.4)"/>
        </svg>
        <div style={{ fontSize: '14px', fontWeight: 700, color: theme.textHeading }}>
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

      {/* Quick stats — side by side */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>
              This Month In
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: theme.green }}>
              +SAR 84,200
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>
              This Month Out
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: theme.red }}>
              -SAR 12,500
            </div>
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
        <div style={{ fontSize: '20px', fontWeight: '700', color: theme.textHeading, letterSpacing: '-0.02em' }}>
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
  const bgColor = repaymentIconBg[repayment.type] || repayment.iconColor

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
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <RepaymentIcon type={repayment.type} />
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
    <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr', gap: '20px', marginTop: '24px' }}>
      {/* Repayments card */}
      <GlassCard style={{ padding: '20px' }}>
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

      {/* VIP Upgrade card */}
      <div
        style={{
          background: 'linear-gradient(160deg, rgba(212,168,67,0.08) 0%, rgba(0,20,60,0.4) 50%, rgba(212,168,67,0.06) 100%)',
          border: '1px solid rgba(212,168,67,0.15)',
          backdropFilter: 'blur(40px) saturate(1.4)',
          borderRadius: theme.cardRadius,
          padding: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
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
            <svg viewBox="0 0 64 64" fill="none" width="56" height="56">
              <path d="M32 6 L52 16 V34 C52 46 42 56 32 60 C22 56 12 46 12 34 V16 Z" stroke="#D4A843" strokeWidth="1.5" fill="rgba(212,168,67,0.06)"/>
              <path d="M32 12 L46 20 V34 C46 43 39 51 32 54" stroke="rgba(212,168,67,0.15)" strokeWidth="1" fill="none"/>
              <polygon points="32,22 34.5,28 41,28.5 36,33 37.5,39.5 32,36 26.5,39.5 28,33 23,28.5 29.5,28" stroke="#D4A843" strokeWidth="1.2" fill="rgba(212,168,67,0.12)"/>
              <circle cx="50" cy="12" r="5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2.5 2" fill="none"/>
              <line x1="50" y1="10" x2="50" y2="14" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round"/>
              <line x1="48" y1="12" x2="52" y2="12" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round"/>
              <circle cx="14" cy="14" r="1.2" fill="rgba(212,168,67,0.4)"/>
              <circle cx="54" cy="44" r="0.8" fill="rgba(52,211,153,0.4)"/>
              <circle cx="10" cy="42" r="0.8" fill="rgba(255,255,255,0.15)"/>
            </svg>
          </div>

          {/* VIP GOLD Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <div style={{
              fontSize: '9px',
              fontWeight: 800,
              letterSpacing: '0.1em',
              color: '#D4A843',
              padding: '3px 10px',
              borderRadius: '6px',
              background: 'rgba(212,168,67,0.1)',
              border: '1px solid rgba(212,168,67,0.15)',
            }}>
              VIP GOLD
            </div>
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
              background: 'linear-gradient(135deg, #D4A843, #A67B1E)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              boxShadow: '0 4px 16px rgba(212,168,67,0.2)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Upgrade to VIP
          </button>
        </div>
      </div>
    </div>
  )
}

export default function InvestorDashboard() {
  return (
    <InvestorLayout activeTab="dashboard" userName="Ahmed" tier="BASIC">
      {/* Top row: Balance Card + Wallet Widget */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 240px',
          gap: '18px',
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
