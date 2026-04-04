'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InvestorLayout from '../../components/investor/layout/InvestorLayout'
import { useInvestorTheme } from '../../components/investor/InvestorThemeContext'
import {
  Search,
  Lock,
  DollarSign,
} from 'lucide-react'

interface GlassCardProps {
  children: React.ReactNode
  style?: React.CSSProperties
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>
}

function GlassCard({ children, style, onMouseEnter, onMouseLeave }: GlassCardProps) {
  const { theme } = useInvestorTheme()
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
  badge: 'trending' | 'exclusive' | 'new' | 'hot'
  cover: 'invoice' | 'murabaha' | 'energy' | 'health' | 'realestate'
  locked?: boolean
}

const opportunities: OpportunityData[] = [
  {
    id: 'opp-1',
    name: 'Al-Baraka Trading Co.',
    type: 'Invoice Financing',
    risk: 'A',
    return: 12.5,
    tenor: '6 months',
    amount: 500000,
    funded: 64,
    badge: 'trending',
    cover: 'invoice',
  },
  {
    id: 'opp-2',
    name: 'NEOM Tech Ventures',
    type: 'Murabaha',
    risk: 'B',
    return: 18.2,
    tenor: '24 months',
    amount: 5000000,
    funded: 42,
    badge: 'exclusive',
    cover: 'murabaha',
    locked: true,
  },
  {
    id: 'opp-3',
    name: 'Riyadh EV Charging',
    type: 'Clean Energy',
    risk: 'A',
    return: 15.5,
    tenor: '18 months',
    amount: 2000000,
    funded: 81,
    badge: 'new',
    cover: 'energy',
  },
  {
    id: 'opp-4',
    name: 'Jeddah Health Hub',
    type: 'Healthcare',
    risk: 'A',
    return: 12.8,
    tenor: '12 months',
    amount: 1500000,
    funded: 35,
    badge: 'new',
    cover: 'health',
  },
  {
    id: 'opp-5',
    name: 'Saudi Solar Grid',
    type: 'Clean Energy',
    risk: 'A',
    return: 16.2,
    tenor: '24 months',
    amount: 800000,
    funded: 92,
    badge: 'hot',
    cover: 'energy',
  },
  {
    id: 'opp-6',
    name: 'Medina Logistics',
    type: 'Invoice Financing',
    risk: 'B',
    return: 14.0,
    tenor: '9 months',
    amount: 3200000,
    funded: 18,
    badge: 'new',
    cover: 'invoice',
  },
  {
    id: 'opp-7',
    name: 'Tabuk AgriTech',
    type: 'Real Estate',
    risk: 'A',
    return: 11.5,
    tenor: '12 months',
    amount: 1200000,
    funded: 55,
    badge: 'trending',
    cover: 'realestate',
  },
  {
    id: 'opp-8',
    name: 'Dammam Fintech Hub',
    type: 'Murabaha',
    risk: 'C',
    return: 20.1,
    tenor: '36 months',
    amount: 4500000,
    funded: 28,
    badge: 'exclusive',
    cover: 'murabaha',
    locked: true,
  },
]

const coverGradients: Record<string, string> = {
  invoice: 'linear-gradient(170deg, #001230 0%, #002E83 35%, #0D82F9 100%)',
  murabaha: 'linear-gradient(170deg, #001230 0%, #002E83 35%, #2DD4A0 100%)',
  energy: 'linear-gradient(170deg, #001208 0%, #003820 35%, #34D399 100%)',
  health: 'linear-gradient(170deg, #1a0025 0%, #3d0066 35%, #9b59b6 100%)',
  realestate: 'linear-gradient(170deg, #1a1000 0%, #4a3000 35%, #D4A843 100%)',
}

const filterTypes = ['All', 'Invoice Financing', 'Murabaha', 'Clean Energy', 'Healthcare', 'Real Estate']
const sortOptions = ['Newest', 'Oldest', 'Highest Return', 'Lowest Return']
const riskOptions = ['All Risks', 'Risk A', 'Risk B', 'Risk C']

function OpportunityCard({ opp }: { opp: OpportunityData }) {
  const { theme, isDark } = useInvestorTheme()
  const navigate = useNavigate()

  const badgeConfig: Record<string, { label: string; bg: string; text: string }> = {
    trending: { label: 'Trending', bg: theme.badgeTrendingBg, text: theme.badgeTrendingText },
    new: { label: 'New', bg: theme.badgeNewBg, text: theme.badgeNewText },
    exclusive: { label: '★ Exclusive', bg: theme.badgeNewBg, text: theme.badgeNewText },
    hot: { label: 'Hot', bg: theme.badgeHotBg, text: theme.badgeHotText },
  }

  const config = badgeConfig[opp.badge]

  return (
    <GlassCard
      style={{
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e: any) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = `0 20px 40px ${isDark ? 'rgba(13,130,249,0.2)' : 'rgba(0,20,60,0.1)'}`
      }}
      onMouseLeave={(e: any) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = theme.cardShadow
      }}
    >
      {/* Cover gradient */}
      <div
        style={{
          background: coverGradients[opp.cover],
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
            gap: '8px',
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: '600', color: theme.textHeading, flex: 1 }}>
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
              flexShrink: 0,
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
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
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
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
              border: `1px solid ${theme.cardBorder}`,
              borderRadius: '6px',
              color: theme.textSecondary,
            }}
          >
            Risk {opp.risk}
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

        {/* Progress bar with striped pattern */}
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
          onMouseEnter={(e: any) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e: any) => (e.currentTarget.style.opacity = '1')}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation()
            if (!opp.locked) navigate(`/investor/opportunities/${opp.id}`)
          }}
        >
          Invest Now
        </button>
      </div>

      {/* VIP Exclusive lock overlay */}
      {opp.locked && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: isDark ? 'rgba(0,10,30,0.85)' : 'rgba(255,255,255,0.92)',
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

export default function InvestorOpportunities() {
  const { theme } = useInvestorTheme()
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('Newest')
  const [riskFilter, setRiskFilter] = useState('All Risks')

  // Filter logic
  let filtered = opportunities.filter((opp) => {
    const matchesType = activeFilter === 'All' || opp.type === activeFilter
    const matchesSearch = opp.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRisk =
      riskFilter === 'All Risks' || `Risk ${opp.risk}` === riskFilter
    return matchesType && matchesSearch && matchesRisk
  })

  // Sort logic
  if (sortBy === 'Newest') {
    filtered = [...filtered].reverse()
  } else if (sortBy === 'Highest Return') {
    filtered = [...filtered].sort((a, b) => b.return - a.return)
  } else if (sortBy === 'Lowest Return') {
    filtered = [...filtered].sort((a, b) => a.return - b.return)
  }

  // Calculate stats
  const totalAmount = opportunities.reduce((sum, opp) => sum + opp.amount, 0)
  const avgReturn =
    opportunities.length > 0
      ? (opportunities.reduce((sum, opp) => sum + opp.return, 0) / opportunities.length).toFixed(1)
      : '0'

  return (
    <InvestorLayout activeTab="opportunities" userName="Ahmed" tier="BASIC">
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '28px', fontWeight: '700', color: theme.textHeading, marginBottom: '8px' }}>
          Opportunities
        </div>
        <div style={{ fontSize: '14px', color: theme.textSecondary, marginBottom: '16px' }}>
          Browse and invest in curated deals
        </div>

        {/* Search Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: theme.cardBg,
            border: `1px solid ${theme.cardBorder}`,
            borderRadius: '12px',
            padding: '12px 16px',
            maxWidth: '400px',
          }}
        >
          <Search size={18} color={theme.textSecondary} />
          <input
            type="text"
            placeholder="Search opportunities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              color: theme.textPrimary,
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '24px',
          flexWrap: 'wrap',
        }}
      >
        {/* Type filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {filterTypes.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                background:
                  activeFilter === filter
                    ? theme.blue
                    : theme.isDark
                      ? 'rgba(255,255,255,0.06)'
                      : 'rgba(0,0,0,0.04)',
                color: activeFilter === filter ? '#fff' : theme.textSecondary,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e: any) => {
                if (activeFilter !== filter) {
                  e.currentTarget.style.background = theme.hoverBg
                }
              }}
              onMouseLeave={(e: any) => {
                if (activeFilter !== filter) {
                  e.currentTarget.style.background = theme.isDark
                    ? 'rgba(255,255,255,0.06)'
                    : 'rgba(0,0,0,0.04)'
                }
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            width: '1px',
            height: '24px',
            background: theme.cardBorder,
            opacity: 0.5,
          }}
        />

        {/* Sort dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: theme.textSecondary, fontWeight: '600' }}>
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: `1px solid ${theme.cardBorder}`,
              background: theme.cardBg,
              color: theme.textPrimary,
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {sortOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Risk filter dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: theme.textSecondary, fontWeight: '600' }}>
            Risk:
          </span>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: `1px solid ${theme.cardBorder}`,
              background: theme.cardBg,
              color: theme.textPrimary,
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {riskOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      <GlassCard
        style={{
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: theme.textSecondary }}>
            {filtered.length} opportunities available
          </span>
          <span style={{ color: theme.textTertiary }}>·</span>
          <span style={{ fontSize: '12px', color: theme.textSecondary }}>
            SAR {(totalAmount / 1000000).toFixed(1)}M total funding
          </span>
          <span style={{ color: theme.textTertiary }}>·</span>
          <span style={{ fontSize: '12px', color: theme.textSecondary }}>
            Average return {avgReturn}%
          </span>
        </div>
      </GlassCard>

      {/* Opportunities Grid */}
      {filtered.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}
        >
          {filtered.map((opp) => (
            <OpportunityCard key={opp.id} opp={opp} />
          ))}
        </div>
      ) : (
        <GlassCard
          style={{
            padding: '40px 20px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '16px', fontWeight: '600', color: theme.textHeading, marginBottom: '8px' }}>
            No opportunities found
          </div>
          <div style={{ fontSize: '14px', color: theme.textSecondary }}>
            Try adjusting your filters or search criteria
          </div>
        </GlassCard>
      )}
    </InvestorLayout>
  )
}
