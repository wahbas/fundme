'use client'

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import InvestorLayout from '../../components/investor/layout/InvestorLayout'
import { useInvestorTheme } from '../../components/investor/InvestorThemeContext'
import RiyalSign from '../../components/icons/RiyalSign'
import InvestPanel from '../../components/investor/InvestPanel'
import {
  ArrowLeft,
  Wallet,
  FileText,
  Calendar,
  BarChart3,
  FolderOpen,
  Download,
  Info,
  DollarSign,
  Shield,
  Clock,
  TrendingUp,
  Percent,
  PieChart,
  Sparkles,
  Building2,
  Globe,
  Star,
  CalendarClock,
  Banknote,
  CheckCircle2,
  Lock,
  Zap,
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

const opportunityIconColors: Record<string, string> = {
  'Invoice Financing': '#5ab4ff',
  'Murabaha': '#34D399',
  'Clean Energy': '#34D399',
}

function OpportunityTypeIcon({ type, size = 28 }: { type: string; size?: number }) {
  const color = opportunityIconColors[type] || '#7CB9F9'
  const props = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    width: size,
    height: size,
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

interface OpportunityDetail {
  dealId: string
  name: string
  type: string
  amount: number
  risk: string
  duration: string
  annualReturn: number
  netReturn: number
  funded: number
  invested: number
  available: number
  minInvestment: number
  maxInvestment: number
  description: string
  documents: number
}

const opportunities: Record<string, OpportunityDetail> = {
  'opp-1': {
    dealId: 'FM-0001-309',
    name: 'Al-Baraka Trading Co.',
    type: 'Invoice Financing',
    amount: 500000,
    risk: 'A',
    duration: '6 months',
    annualReturn: 12.5,
    netReturn: 6.3,
    funded: 64,
    invested: 320000,
    available: 180000,
    minInvestment: 1000,
    maxInvestment: 33562,
    description:
      'Al-Baraka Trading Co. is a leading trading company in the GCC region specializing in bulk commodities and consumer goods distribution.',
    documents: 5,
  },
  'opp-2': {
    dealId: 'FM-0002-145',
    name: 'NEOM Tech Ventures',
    type: 'Murabaha',
    amount: 5000000,
    risk: 'B',
    duration: '24 months',
    annualReturn: 18.2,
    netReturn: 9.1,
    funded: 42,
    invested: 2100000,
    available: 2900000,
    minInvestment: 5000,
    maxInvestment: 100000,
    description:
      'NEOM Tech Ventures focuses on technology infrastructure development within the NEOM smart city project.',
    documents: 3,
  },
  'opp-3': {
    dealId: 'FM-0003-072',
    name: 'Riyadh EV Charging',
    type: 'Clean Energy',
    amount: 2000000,
    risk: 'A',
    duration: '18 months',
    annualReturn: 15.5,
    netReturn: 7.8,
    funded: 81,
    invested: 1620000,
    available: 380000,
    minInvestment: 1000,
    maxInvestment: 50000,
    description:
      'Riyadh EV Charging is building a network of fast-charging stations across Riyadh to support the growing electric vehicle market.',
    documents: 4,
  },
}

const riskColors: Record<string, string> = {
  A: '#34D399',
  B: '#D4A843',
  C: '#F75555',
}

const repaymentSchedule = [
  { date: '15 Jul 2026', amount: 5250, status: 'Upcoming' },
  { date: '15 Aug 2026', amount: 5250, status: 'Upcoming' },
  { date: '15 Sep 2026', amount: 5250, status: 'Upcoming' },
  { date: '15 Oct 2026', amount: 5250, status: 'Upcoming' },
  { date: '15 Nov 2026', amount: 5250, status: 'Upcoming' },
  { date: '15 Dec 2026', amount: 5250, status: 'Upcoming' },
]

const documentsList = [
  { name: 'Financial Statements 2025', type: 'PDF' },
  { name: 'Company Registration', type: 'PDF' },
  { name: 'Credit Assessment Report', type: 'PDF' },
  { name: 'Invoice Verification', type: 'PDF' },
  { name: 'Risk Analysis Summary', type: 'PDF' },
]

type TabKey = 'details' | 'repayments' | 'financials' | 'documents'

function DonutChart({
  percentage,
  size = 180,
  strokeWidth = 18,
}: {
  percentage: number
  size?: number
  strokeWidth?: number
}) {
  const { theme } = useInvestorTheme()
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const [animatedOffset, setAnimatedOffset] = useState(circumference)
  const targetOffset = circumference - (percentage / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedOffset(targetOffset)
    }, 100)
    return () => clearTimeout(timer)
  }, [targetOffset])

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={theme.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}
          strokeWidth={strokeWidth}
        />
        {/* Filled ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={theme.blue}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={animatedOffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      {/* Center text */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: '28px',
            fontWeight: '700',
            color: theme.textHeading,
            lineHeight: 1,
          }}
        >
          {percentage}%
        </div>
        <div
          style={{
            fontSize: '12px',
            color: theme.textSecondary,
            marginTop: '4px',
          }}
        >
          Funded
        </div>
      </div>
    </div>
  )
}

export default function InvestorOpportunityDetail() {
  const { theme, isDark } = useInvestorTheme()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [investmentAmount, setInvestmentAmount] = useState(0)
  const [activeTab, setActiveTab] = useState<TabKey>('details')

  // Live countdown — 12 days from now
  const [deadline] = useState(() => Date.now() + 12 * 24 * 60 * 60 * 1000)
  const [timeLeft, setTimeLeft] = useState({ d: 12, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, deadline - Date.now())
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [deadline])

  const opp = opportunities[id || '']

  if (!opp) {
    return (
      <InvestorLayout activeTab="opportunities" userName="Wahba" tier="BASIC">
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <div
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: theme.textHeading,
              marginBottom: '8px',
            }}
          >
            Opportunity not found
          </div>
          <button
            onClick={() => navigate('/investor/opportunities')}
            style={{
              background: 'none',
              border: 'none',
              color: theme.blue,
              cursor: 'pointer',
              fontSize: '14px',
              fontFamily: 'inherit',
            }}
          >
            Back to Opportunities
          </button>
        </div>
      </InvestorLayout>
    )
  }

  const handleAmountChange = (value: number) => {
    const clamped = Math.min(Math.max(value, 0), opp.maxInvestment)
    setInvestmentAmount(clamped)
  }

  const handleQuickSelect = (value: number) => {
    const clamped = Math.min(value, opp.maxInvestment)
    setInvestmentAmount(clamped)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    const num = raw === '' ? 0 : parseInt(raw, 10)
    setInvestmentAmount(Math.min(num, opp.maxInvestment))
  }

  const isValidAmount =
    investmentAmount >= opp.minInvestment && investmentAmount <= opp.maxInvestment

  const tabs: { key: TabKey; label: string; icon: React.ReactNode; badge?: number }[] = [
    { key: 'details', label: 'Details', icon: <Info size={16} /> },
    { key: 'repayments', label: 'Repayments', icon: <Calendar size={16} /> },
    { key: 'financials', label: 'Financials', icon: <BarChart3 size={16} /> },
    {
      key: 'documents',
      label: 'Documents',
      icon: <FolderOpen size={16} />,
      badge: opp.documents,
    },
  ]

  const statItems = [
    {
      label: 'Opportunity Amount',
      value: opp.amount.toLocaleString('en-US'),
      prefix: true,
      icon: DollarSign,
      iconColor: theme.blue,
      iconBg: isDark ? 'rgba(13,130,249,0.15)' : 'rgba(13,130,249,0.08)',
    },
    {
      label: 'Risk Rating',
      value: opp.risk,
      isRisk: true,
      icon: Shield,
      iconColor: riskColors[opp.risk],
      iconBg: riskColors[opp.risk] + '18',
    },
    {
      label: 'Duration',
      value: opp.duration,
      icon: Clock,
      iconColor: '#A78BFA',
      iconBg: isDark ? 'rgba(167,139,250,0.15)' : 'rgba(167,139,250,0.08)',
    },
    {
      label: 'Annual Return',
      value: `${opp.annualReturn}%`,
      icon: TrendingUp,
      iconColor: theme.green || '#34D399',
      iconBg: isDark ? 'rgba(52,211,153,0.15)' : 'rgba(52,211,153,0.08)',
    },
    {
      label: 'Net Return',
      value: `${opp.netReturn}%`,
      icon: Percent,
      iconColor: '#F59E0B',
      iconBg: isDark ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.08)',
    },
  ]

  return (
    <InvestorLayout activeTab="opportunities" userName="Wahba" tier="BASIC">
      {/* ── Breadcrumb ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '13px',
          color: theme.textTertiary,
          marginTop: '12px',
          marginBottom: '14px',
        }}
      >
        <span
          onClick={() => navigate('/investor/opportunities')}
          style={{ color: theme.blue, cursor: 'pointer', fontWeight: '500' }}
        >
          Opportunities
        </span>
        <span style={{ color: theme.textTertiary }}>›</span>
        <span style={{ color: theme.textSecondary, fontWeight: '500' }}>{opp.dealId}</span>
      </div>

      {/* ── Two-Column Page Layout ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '20px', alignItems: 'start' }}>

      {/* ══ LEFT COLUMN ══ */}
      <div>

      {/* ── Hero Cover Banner ── */}
      <div
        style={{
          background: 'linear-gradient(135deg, #001230 0%, #002E83 40%, #0D82F9 100%)',
          borderRadius: theme.cardRadius,
          padding: '28px 32px',
          marginBottom: '20px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        {/* Subtle grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Company icon */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <OpportunityTypeIcon type={opp.type} size={28} />
        </div>

        {/* Info */}
        <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
          {/* Top badges row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: '500', letterSpacing: '0.5px' }}>
              DEAL ID: {opp.dealId}
            </span>
            {/* Grade badge */}
            <span style={{
              fontSize: '11px', fontWeight: '600',
              color: riskColors[opp.risk],
              background: riskColors[opp.risk] + '22',
              padding: '2px 10px', borderRadius: '20px',
              display: 'inline-flex', alignItems: 'center', gap: '4px',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: riskColors[opp.risk], display: 'inline-block' }} />
              Grade {opp.risk}
            </span>
            {/* Verified badge */}
            <span style={{
              fontSize: '11px', fontWeight: '500', color: '#fff',
              background: 'rgba(255,255,255,0.1)',
              padding: '2px 10px', borderRadius: '20px',
              display: 'inline-flex', alignItems: 'center', gap: '4px',
            }}>
              <CheckCircle2 size={11} color="#34D399" />
              Verified
            </span>
            {/* Listed badge */}
            <span style={{
              fontSize: '11px', fontWeight: '500', color: 'rgba(255,255,255,0.5)',
              background: 'rgba(255,255,255,0.06)',
              padding: '2px 10px', borderRadius: '20px',
              display: 'inline-flex', alignItems: 'center', gap: '4px',
            }}>
              <Clock size={11} />
              Listed 3 days ago
            </span>
          </div>

          {/* Company name */}
          <div style={{ fontSize: '26px', fontWeight: '700', color: '#fff', marginBottom: '10px' }}>
            {opp.name}
          </div>

          {/* Type tag */}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '12px', fontWeight: '500', color: 'rgba(255,255,255,0.7)',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '5px 14px', borderRadius: '20px',
          }}>
            <Globe size={12} />
            {opp.type}
          </span>
        </div>

        {/* Right side actions */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', position: 'relative', zIndex: 1, flexShrink: 0 }}>
          {/* Days left */}
          <span style={{
            fontSize: '11px', fontWeight: '700', color: '#fff',
            background: 'rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.15)',
            padding: '5px 14px', borderRadius: '20px',
            display: 'inline-flex', alignItems: 'center', gap: '6px',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF6B6B', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            {timeLeft.d}d {String(timeLeft.h).padStart(2,'0')}h {String(timeLeft.m).padStart(2,'0')}m {String(timeLeft.s).padStart(2,'0')}s
          </span>

          {/* Save Deal button */}
          <button
            style={{
              fontSize: '12px', fontWeight: '600', color: '#fff',
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.15)',
              padding: '7px 16px', borderRadius: '8px',
              cursor: 'pointer', fontFamily: 'inherit',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.35)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.2)'
            }}
          >
            <Star size={13} />
            Save Deal
          </button>
        </div>
      </div>

      {/* Funding Progress */}
      <GlassCard style={{ padding: '24px', marginBottom: '20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: theme.textHeading }}>Funding Progress</span>
          <span style={{
            fontSize: '10px', fontWeight: '600', color: '#22C55E',
            background: isDark ? 'rgba(34,197,94,0.12)' : 'rgba(34,197,94,0.08)',
            padding: '2px 8px', borderRadius: '20px',
            display: 'inline-flex', alignItems: 'center', gap: '4px',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E' }} />
            Live
          </span>
        </div>

        {/* Hero % */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '10px' }}>
          <span style={{ fontSize: '32px', fontWeight: '700', color: theme.textHeading, lineHeight: 1 }}>{opp.funded}%</span>
          <span style={{ fontSize: '13px', color: theme.textSecondary }}>funded</span>
          {opp.funded > 50 && <span style={{ fontSize: '11px', color: '#F59E0B', marginLeft: 'auto' }}>Filling fast</span>}
        </div>

        {/* Bar */}
        <div style={{ height: '8px', borderRadius: '4px', overflow: 'hidden', background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', marginBottom: '10px' }}>
          <div style={{ height: '100%', borderRadius: '4px', width: `${opp.funded}%`, background: theme.blue, transition: 'width 1s ease-out' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '16px' }}>
          <span style={{ color: theme.blue, fontWeight: '600', display: 'inline-flex', alignItems: 'center' }}><RiyalSign size="sm" bold /> {(opp.invested / 1000).toFixed(0)}K invested</span>
          <span style={{ color: theme.textTertiary, display: 'inline-flex', alignItems: 'center' }}><RiyalSign size="sm" /> {(opp.available / 1000).toFixed(0)}K remaining</span>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', alignItems: 'center', paddingTop: '14px', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}` }}>
          {[
            { value: '24', label: 'Investors' },
            { value: opp.duration, label: 'Duration' },
            { value: `${opp.annualReturn}%`, label: 'Return' },
          ].map((s, i, arr) => (
            <div key={s.label} style={{ flex: 1, textAlign: 'center', borderRight: i < arr.length - 1 ? `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}` : 'none' }}>
              <div style={{ fontSize: '15px', fontWeight: '700', color: i === 2 ? (theme.green || '#34D399') : theme.textHeading, marginBottom: '1px' }}>{s.value}</div>
              <div style={{ fontSize: '10px', color: theme.textTertiary }}>{s.label}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Stats Row */}
      <GlassCard style={{ padding: '20px 24px', marginBottom: '20px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}
        >
          {statItems.map((stat) => {
            const IconComp = stat.icon
            return (
              <div key={stat.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: stat.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <IconComp size={18} color={stat.iconColor} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: theme.textSecondary,
                      marginBottom: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      fontWeight: '500',
                    }}
                  >
                    {stat.label}
                  </div>
                  {stat.isRisk ? (
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '16px',
                        fontWeight: '700',
                        color: theme.textHeading,
                      }}
                    >
                      <span
                        style={{
                          background: riskColors[opp.risk] + '22',
                          color: riskColors[opp.risk],
                          padding: '2px 10px',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: '700',
                        }}
                      >
                        {opp.risk}
                      </span>
                    </div>
                  ) : (
                    <div
                      style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: theme.textHeading,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {'prefix' in stat && stat.prefix && <RiyalSign size="md" bold />}
                      {stat.value}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </GlassCard>

      {/* Old duplicate — hidden */}
      <div style={{ display: 'none' }}>
        {/* Funding Progress */}
        <GlassCard style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: theme.textHeading }}>Funding Progress</span>
            <span style={{
              fontSize: '10px', fontWeight: '600', color: '#22C55E',
              background: isDark ? 'rgba(34,197,94,0.12)' : 'rgba(34,197,94,0.08)',
              padding: '2px 8px', borderRadius: '20px',
              display: 'inline-flex', alignItems: 'center', gap: '4px',
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E' }} />
              Live
            </span>
          </div>

          {/* Hero % + urgency */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '10px' }}>
            <span style={{ fontSize: '32px', fontWeight: '700', color: theme.textHeading, lineHeight: 1 }}>{opp.funded}%</span>
            <span style={{ fontSize: '13px', color: theme.textSecondary }}>funded</span>
            {opp.funded > 50 && (
              <span style={{ fontSize: '11px', color: '#F59E0B', marginLeft: 'auto' }}>Filling fast</span>
            )}
          </div>

          {/* Progress bar */}
          <div style={{ height: '8px', borderRadius: '4px', overflow: 'hidden', background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', marginBottom: '10px' }}>
            <div style={{ height: '100%', borderRadius: '4px', width: `${opp.funded}%`, background: theme.blue, transition: 'width 1s ease-out' }} />
          </div>

          {/* Invested / Remaining / Goal — flat inline */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '16px' }}>
            <span style={{ color: theme.blue, fontWeight: '600', display: 'inline-flex', alignItems: 'center' }}><RiyalSign size="sm" bold /> {(opp.invested / 1000).toFixed(0)}K invested</span>
            <span style={{ color: theme.textTertiary, display: 'inline-flex', alignItems: 'center' }}><RiyalSign size="sm" /> {(opp.available / 1000).toFixed(0)}K remaining</span>
          </div>

          {/* Stats — flat row with dividers */}
          <div style={{
            display: 'flex', alignItems: 'center',
            paddingTop: '14px',
            borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
          }}>
            {[
              { value: '24', label: 'Investors' },
              { value: opp.duration, label: 'Duration' },
              { value: `${opp.annualReturn}%`, label: 'Return' },
            ].map((stat, i, arr) => (
              <div key={stat.label} style={{
                flex: 1, textAlign: 'center',
                borderRight: i < arr.length - 1 ? `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}` : 'none',
              }}>
                <div style={{ fontSize: '15px', fontWeight: '700', color: i === 2 ? (theme.green || '#34D399') : theme.textHeading, marginBottom: '1px' }}>{stat.value}</div>
                <div style={{ fontSize: '10px', color: theme.textTertiary }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Investment Input */}
        <GlassCard style={{ padding: '28px' }}>
          {/* Section header with wallet */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '16px',
                fontWeight: '600',
                color: theme.textHeading,
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: isDark ? 'rgba(52,211,153,0.15)' : 'rgba(52,211,153,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Banknote size={16} color={theme.green || '#34D399'} />
              </div>
              Your Investment
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: theme.textSecondary,
              }}
            >
              <Wallet size={14} />
              Balance: <RiyalSign size="sm" /> 125,000
            </div>
          </div>

          {/* Amount input */}
          <div
            style={{
              position: 'relative',
              marginBottom: '16px',
            }}
          >
            <input
              type="text"
              value={investmentAmount === 0 ? '' : investmentAmount.toLocaleString('en-US')}
              onChange={handleInputChange}
              placeholder="0"
              style={{
                width: '100%',
                padding: '14px 60px 14px 16px',
                fontSize: '20px',
                fontWeight: '600',
                fontFamily: 'inherit',
                background: theme.inputBg,
                border: `1px solid ${
                  investmentAmount > 0 && !isValidAmount
                    ? theme.red
                    : theme.inputBorder
                }`,
                borderRadius: '12px',
                color: theme.textHeading,
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = theme.blue)
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = theme.inputBorder)
              }
            />
            <span
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.textSecondary,
              }}
            >
              SAR
            </span>
          </div>

          {/* Range slider */}
          <div style={{ marginBottom: '16px' }}>
            <input
              type="range"
              min={0}
              max={opp.maxInvestment}
              step={100}
              value={investmentAmount}
              onChange={(e) => handleAmountChange(Number(e.target.value))}
              style={{
                width: '100%',
                height: '6px',
                appearance: 'none',
                WebkitAppearance: 'none',
                background: `linear-gradient(to right, ${theme.blue} 0%, ${theme.blue} ${(investmentAmount / opp.maxInvestment) * 100}%, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'} ${(investmentAmount / opp.maxInvestment) * 100}%, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'} 100%)`,
                borderRadius: '3px',
                outline: 'none',
                cursor: 'pointer',
              }}
            />
            <style>{`
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: ${theme.blue};
                border: 3px solid #fff;
                box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                cursor: pointer;
                transition: transform 0.15s;
              }
              input[type="range"]::-webkit-slider-thumb:hover {
                transform: scale(1.15);
              }
              input[type="range"]::-moz-range-thumb {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: ${theme.blue};
                border: 3px solid #fff;
                box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                cursor: pointer;
              }
            `}</style>
          </div>

          {/* Quick select buttons */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '12px',
            }}
          >
            {[1000, 5000, 25000, 50000].map((val) => {
              const label =
                val >= 1000 ? `${val / 1000}K` : val.toString()
              const isDisabled = val > opp.maxInvestment
              return (
                <button
                  key={val}
                  onClick={() => !isDisabled && handleQuickSelect(val)}
                  disabled={isDisabled}
                  style={{
                    flex: 1,
                    padding: '8px 4px',
                    border: `1px solid ${
                      investmentAmount === val
                        ? theme.blue
                        : theme.cardBorder
                    }`,
                    borderRadius: '8px',
                    background:
                      investmentAmount === val
                        ? theme.blue + '18'
                        : 'transparent',
                    color:
                      investmentAmount === val
                        ? theme.blue
                        : isDisabled
                          ? theme.textTertiary
                          : theme.textSecondary,
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s',
                    opacity: isDisabled ? 0.4 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isDisabled && investmentAmount !== val) {
                      e.currentTarget.style.borderColor = theme.blue
                      e.currentTarget.style.color = theme.blue
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isDisabled && investmentAmount !== val) {
                      e.currentTarget.style.borderColor = theme.cardBorder
                      e.currentTarget.style.color = theme.textSecondary
                    }
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Min / Max labels */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '11px',
              color: theme.textTertiary,
              marginBottom: '20px',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>Min: <RiyalSign size="sm" /> {opp.minInvestment.toLocaleString('en-US')}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>Max: <RiyalSign size="sm" /> {opp.maxInvestment.toLocaleString('en-US')}</span>
          </div>

          {/* CTA button */}
          <button
            disabled={!isValidAmount}
            style={{
              width: '100%',
              padding: '14px',
              background: isValidAmount
                ? 'linear-gradient(135deg, #0D82F9 0%, #0668CC 100%)'
                : isDark
                  ? 'rgba(255,255,255,0.06)'
                  : 'rgba(0,0,0,0.06)',
              color: isValidAmount ? '#fff' : theme.textTertiary,
              border: 'none',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: '700',
              cursor: isValidAmount ? 'pointer' : 'not-allowed',
              fontFamily: 'inherit',
              transition: 'all 0.3s',
              boxShadow: isValidAmount
                ? '0 4px 16px rgba(13,130,249,0.3)'
                : 'none',
            }}
            onMouseEnter={(e) => {
              if (isValidAmount) {
                e.currentTarget.style.boxShadow =
                  '0 6px 24px rgba(13,130,249,0.45)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }
            }}
            onMouseLeave={(e) => {
              if (isValidAmount) {
                e.currentTarget.style.boxShadow =
                  '0 4px 16px rgba(13,130,249,0.3)'
                e.currentTarget.style.transform = 'translateY(0)'
              }
            }}
          >
            {isValidAmount ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={18} />
                Invest <RiyalSign size="sm" bold /> {investmentAmount.toLocaleString('en-US')}
              </span>
            ) : (
              'Enter Amount to Invest'
            )}
          </button>

          {/* Trust badges */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginTop: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: theme.textTertiary }}>
              <Lock size={11} />
              Secure
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: theme.textTertiary }}>
              <Shield size={11} />
              Regulated
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: theme.textTertiary }}>
              <CheckCircle2 size={11} />
              Verified
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Tabs Section — inside left column */}
      <GlassCard style={{ overflow: 'hidden' }}>
        {/* Tab bar */}
        <div
          style={{
            display: 'flex',
            borderBottom: `1px solid ${theme.cardBorder}`,
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '14px 20px',
                  background: 'none',
                  border: 'none',
                  borderBottom: `2px solid ${isActive ? theme.blue : 'transparent'}`,
                  color: isActive ? theme.blue : theme.textSecondary,
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s',
                  marginBottom: '-1px',
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    e.currentTarget.style.color = theme.textHeading
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    e.currentTarget.style.color = theme.textSecondary
                }}
              >
                {tab.icon}
                {tab.label}
                {tab.badge !== undefined && (
                  <span
                    style={{
                      background: isActive
                        ? theme.blue + '22'
                        : isDark
                          ? 'rgba(255,255,255,0.08)'
                          : 'rgba(0,0,0,0.06)',
                      color: isActive ? theme.blue : theme.textSecondary,
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '1px 7px',
                      borderRadius: '10px',
                      minWidth: '18px',
                      textAlign: 'center',
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Tab content */}
        <div style={{ padding: '24px' }}>
          {activeTab === 'details' && (
            <div>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.7',
                  color: theme.textSecondary,
                  marginBottom: '24px',
                  margin: '0 0 24px 0',
                }}
              >
                {opp.description}
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                }}
              >
                {[
                  { label: 'Company', value: opp.name, icon: Building2, iconColor: theme.blue },
                  { label: 'Sector', value: opp.type, icon: Globe, iconColor: '#A78BFA' },
                  { label: 'Risk Grade', value: opp.risk, icon: Shield, iconColor: riskColors[opp.risk] },
                  { label: 'Tenor', value: opp.duration, icon: CalendarClock, iconColor: '#F59E0B' },
                  { label: 'Expected Return', value: `${opp.annualReturn}% p.a.`, icon: TrendingUp, iconColor: theme.green || '#34D399' },
                  { label: 'Payment Frequency', value: 'Monthly', icon: Calendar, iconColor: '#EC4899' },
                ].map((item) => {
                  const DetailIcon = item.icon
                  return (
                    <div
                      key={item.label}
                      style={{
                        padding: '14px 16px',
                        background: isDark
                          ? 'rgba(255,255,255,0.03)'
                          : 'rgba(0,0,0,0.02)',
                        borderRadius: '10px',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: item.iconColor + (isDark ? '18' : '12'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <DetailIcon size={16} color={item.iconColor} />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: '11px',
                            color: theme.textTertiary,
                            marginBottom: '2px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}
                        >
                          {item.label}
                        </div>
                        <div
                          style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: theme.textHeading,
                          }}
                        >
                          {item.value}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {activeTab === 'repayments' && (
            <div>
              {/* Summary bar */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: '16px', padding: '12px 16px',
                background: isDark ? 'rgba(13,130,249,0.08)' : 'rgba(13,130,249,0.05)',
                borderRadius: '10px', border: `1px solid ${isDark ? 'rgba(13,130,249,0.15)' : 'rgba(13,130,249,0.1)'}`,
              }}>
                <div style={{ fontSize: '13px', color: theme.textSecondary }}>
                  <span style={{ fontWeight: '600', color: theme.textHeading }}>{repaymentSchedule.length}</span> payments
                </div>
                <div style={{ fontSize: '13px', color: theme.textSecondary }}>
                  Total: <span style={{ fontWeight: '700', color: theme.textHeading, display: 'inline-flex', alignItems: 'center' }}><RiyalSign size="sm" bold /> {(repaymentSchedule.reduce((s, r) => s + r.amount, 0)).toLocaleString('en-US')}</span>
                </div>
              </div>

              {/* Card rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {repaymentSchedule.map((row, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      padding: '14px 16px',
                      background: isDark
                        ? idx % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'transparent'
                        : idx % 2 === 0 ? 'rgba(0,0,0,0.015)' : 'transparent',
                      borderRadius: '10px',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
                      transition: 'background 0.2s',
                    }}
                  >
                    {/* Payment number */}
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '10px',
                      background: isDark ? 'rgba(13,130,249,0.12)' : 'rgba(13,130,249,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '13px', fontWeight: '700', color: theme.blue, flexShrink: 0,
                    }}>
                      {idx + 1}
                    </div>

                    {/* Date */}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: theme.textHeading, marginBottom: '2px' }}>{row.date}</div>
                      <div style={{ fontSize: '11px', color: theme.textTertiary }}>Payment {idx + 1} of {repaymentSchedule.length}</div>
                    </div>

                    {/* Amount */}
                    <div style={{ fontSize: '14px', fontWeight: '700', color: theme.textHeading, marginRight: '12px' }}>
                      <RiyalSign size="sm" bold /> {row.amount.toLocaleString('en-US')}
                    </div>

                    {/* Status badge */}
                    <span style={{
                      background: isDark ? 'rgba(13,130,249,0.12)' : 'rgba(13,130,249,0.08)',
                      color: theme.blue, padding: '5px 12px', borderRadius: '8px',
                      fontSize: '11px', fontWeight: '600',
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      border: `1px solid ${isDark ? 'rgba(13,130,249,0.2)' : 'rgba(13,130,249,0.12)'}`,
                    }}>
                      <Clock size={11} />
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'financials' && (
            <div
              style={{
                padding: '60px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}>
                <BarChart3 size={28} color={theme.textTertiary} />
              </div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: theme.textHeading,
                  marginBottom: '6px',
                }}
              >
                Financial data coming soon
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: theme.textSecondary,
                  maxWidth: '320px',
                  textAlign: 'center',
                }}
              >
                Detailed financial statements and projections will be available here.
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {documentsList.slice(0, opp.documents).map((doc, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: isDark
                      ? 'rgba(255,255,255,0.03)'
                      : 'rgba(0,0,0,0.02)',
                    borderRadius: '10px',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
                    transition: 'background 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = isDark
                      ? 'rgba(255,255,255,0.06)'
                      : 'rgba(0,0,0,0.04)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = isDark
                      ? 'rgba(255,255,255,0.03)'
                      : 'rgba(0,0,0,0.02)')
                  }
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: isDark
                          ? 'rgba(13,130,249,0.15)'
                          : 'rgba(13,130,249,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FileText size={18} color={theme.blue} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: theme.textHeading,
                        }}
                      >
                        {doc.name}
                      </div>
                      <div
                        style={{
                          fontSize: '11px',
                          color: theme.textTertiary,
                        }}
                      >
                        {doc.type}
                      </div>
                    </div>
                  </div>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'none',
                      border: `1px solid ${theme.cardBorder}`,
                      borderRadius: '8px',
                      padding: '6px 12px',
                      color: theme.textSecondary,
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
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
                    <Download size={14} />
                    Download
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </GlassCard>

      </div>{/* END LEFT COLUMN */}

      {/* ══ RIGHT COLUMN — Sticky Investment Panel ══ */}
      <div style={{ position: 'sticky', top: '20px' }}>
        <InvestPanel
          balance={125000}
          min={opp.minInvestment}
          max={opp.maxInvestment}
          returnRate={opp.annualReturn}
          duration={opp.duration}
        />
      </div>{/* END RIGHT COLUMN */}

      </div>{/* END Page Grid */}
    </InvestorLayout>
  )
}
