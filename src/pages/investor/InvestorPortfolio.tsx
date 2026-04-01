'use client'

import { useState, useEffect } from 'react'
import InvestorLayout from '../../components/investor/layout/InvestorLayout'
import { useInvestorTheme } from '../../components/investor/InvestorThemeContext'
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  Percent,
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

function SummaryCard({
  icon: Icon,
  label,
  value,
  subtitle,
  trend,
}: {
  icon: typeof TrendingUp
  label: string
  value: string
  subtitle?: string
  trend?: { text: string; color: string }
}) {
  const { theme } = useInvestorTheme()

  return (
    <GlassCard
      style={{
        padding: '20px',
        flex: '1',
      }}
    >
      {/* Header with icon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: theme.isDark ? 'rgba(13,130,249,0.15)' : 'rgba(13,130,249,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon size={18} color={theme.blue} strokeWidth={1.5} />
        </div>
        <div style={{ fontSize: '12px', color: theme.textSecondary }}>{label}</div>
      </div>

      {/* Value */}
      <div
        style={{
          fontSize: '24px',
          fontWeight: '700',
          color: theme.textHeading,
          marginBottom: '8px',
        }}
      >
        {value}
      </div>

      {/* Subtitle or trend */}
      {trend ? (
        <div style={{ fontSize: '12px', color: trend.color, fontWeight: '500' }}>
          {trend.text}
        </div>
      ) : subtitle ? (
        <div style={{ fontSize: '12px', color: theme.textSecondary }}>{subtitle}</div>
      ) : null}
    </GlassCard>
  )
}

function PortfolioPerformanceChart() {
  const { theme } = useInvestorTheme()
  const [chartRevealWidth, setChartRevealWidth] = useState(0)
  const [activePeriod, setActivePeriod] = useState('6M')

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setChartRevealWidth(100)
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  // Chart data: Nov, Dec, Jan, Feb, Mar, Apr (in millions)
  const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']
  const values = [2.1, 2.15, 2.22, 2.3, 2.35, 2.42]
  const maxValue = 2.5

  // Calculate points for SVG (normalized to 0-100)
  const points = values.map((v, idx) => {
    const x = (idx / (values.length - 1)) * 100
    const y = 100 - (v / maxValue) * 100
    return { x, y, value: v }
  })

  // Create path data
  const pathData = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPathData =
    pathData + ` L 100 100 L 0 100 Z`

  const periods = ['1M', '3M', '6M', '1Y', 'All']

  return (
    <GlassCard style={{ padding: '24px', marginBottom: '24px' }}>
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
          Portfolio Performance
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '11px',
                fontWeight: '600',
                background:
                  activePeriod === period
                    ? theme.blue
                    : theme.isDark
                      ? 'rgba(255,255,255,0.06)'
                      : 'rgba(13,130,249,0.06)',
                color: activePeriod === period ? '#fff' : theme.textSecondary,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (activePeriod !== period) {
                  e.currentTarget.style.background = theme.hoverBg
                }
              }}
              onMouseLeave={(e) => {
                if (activePeriod !== period) {
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
      </div>

      {/* Chart */}
      <div
        style={{
          width: '100%',
          height: '240px',
          position: 'relative',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <defs>
            <linearGradient id="chartFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.blue} stopOpacity="0.2" />
              <stop offset="100%" stopColor={theme.blue} stopOpacity="0" />
            </linearGradient>
            <clipPath id="chartRevealClip">
              <rect x="0" y="0" width={`${chartRevealWidth}`} height="100" />
            </clipPath>
          </defs>

          {/* Grid lines */}
          {[20, 40, 60, 80].map((y) => (
            <line
              key={`grid-${y}`}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke={theme.chartGrid}
              strokeWidth="0.5"
            />
          ))}

          {/* Chart area and line */}
          <g clipPath="url(#chartRevealClip)">
            {/* Area fill */}
            <path
              d={areaPathData}
              fill="url(#chartFill)"
            />

            {/* Line */}
            <path
              d={pathData}
              stroke={theme.blue}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {points.map((p, idx) => (
              <circle
                key={`point-${idx}`}
                cx={p.x}
                cy={p.y}
                r="1.5"
                fill={theme.blue}
              />
            ))}
          </g>

          {/* X-axis labels */}
          <g style={{ opacity: chartRevealWidth > 10 ? 1 : 0, transition: 'opacity 0.4s' }}>
            {months.map((month, idx) => (
              <text
                key={`month-${idx}`}
                x={points[idx].x}
                y="97"
                textAnchor="middle"
                fontSize="3"
                fill={theme.chartAxisText}
              >
                {month}
              </text>
            ))}
          </g>

          {/* Y-axis labels */}
          <g style={{ opacity: chartRevealWidth > 10 ? 1 : 0, transition: 'opacity 0.4s' }}>
            {[0, 0.5, 1.0, 1.5, 2.0, 2.5].map((val) => {
              const y = 100 - (val / maxValue) * 100
              return (
                <text
                  key={`yaxis-${val}`}
                  x="2"
                  y={y + 1}
                  fontSize="2.5"
                  fill={theme.chartAxisText}
                  textAnchor="start"
                >
                  {val}M
                </text>
              )
            })}
          </g>
        </svg>
      </div>
    </GlassCard>
  )
}

function InvestmentBreakdownBySector() {
  const { theme } = useInvestorTheme()

  const sectors = [
    { name: 'Invoice Financing', percentage: 35, color: '#0D82F9' },
    { name: 'Clean Energy', percentage: 25, color: '#34D399' },
    { name: 'Murabaha', percentage: 22, color: '#2DD4A0' },
    { name: 'Healthcare', percentage: 18, color: '#9b59b6' },
  ]

  const radius = 40
  const circumference = 2 * Math.PI * radius
  let currentAngle = -90

  const circles = sectors.map((sector) => {
    const offset = circumference - (sector.percentage / 100) * circumference
    const angle = (sector.percentage / 100) * 360
    const nextAngle = currentAngle + angle
    const startAngle = (currentAngle * Math.PI) / 180
    const endAngle = (nextAngle * Math.PI) / 180

    const x1 = 50 + radius * Math.cos(startAngle)
    const y1 = 50 + radius * Math.sin(startAngle)
    const x2 = 50 + radius * Math.cos(endAngle)
    const y2 = 50 + radius * Math.sin(endAngle)

    const largeArc = angle > 180 ? 1 : 0

    currentAngle = nextAngle

    return {
      ...sector,
      offset,
      path: `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
    }
  })

  return (
    <GlassCard style={{ padding: '24px', flex: '1' }}>
      {/* Header */}
      <div style={{ fontSize: '14px', fontWeight: '700', color: theme.textHeading, marginBottom: '20px' }}>
        By Sector
      </div>

      {/* Donut chart */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <svg viewBox="0 0 100 100" style={{ width: '120px', height: '120px' }}>
          <circle cx="50" cy="50" r="50" fill="transparent" />
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={theme.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}
            strokeWidth="8"
          />
          {/* Donut segments */}
          {circles.map((circle, idx) => (
            <circle
              key={idx}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={circle.color}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={circle.offset}
              strokeLinecap="round"
              style={{
                transform: `rotate(-90deg)`,
                transformOrigin: '50px 50px',
                transition: 'all 0.3s',
              }}
            />
          ))}
          {/* Center circle for donut hole */}
          <circle cx="50" cy="50" r={radius - 8} fill={theme.cardBg} />
        </svg>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sectors.map((sector) => (
          <div
            key={sector.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: sector.color,
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, color: theme.textSecondary }}>{sector.name}</div>
            <div style={{ color: theme.textHeading, fontWeight: '600' }}>{sector.percentage}%</div>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

function InvestmentBreakdownByRisk() {
  const { theme } = useInvestorTheme()

  const risks = [
    { label: 'Risk A', percentage: 62, color: theme.green },
    { label: 'Risk B', percentage: 28, color: theme.blue },
    { label: 'Risk C', percentage: 10, color: '#F59E0B' },
  ]

  return (
    <GlassCard style={{ padding: '24px', flex: '1' }}>
      {/* Header */}
      <div style={{ fontSize: '14px', fontWeight: '700', color: theme.textHeading, marginBottom: '20px' }}>
        By Risk Level
      </div>

      {/* Risk bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {risks.map((risk) => (
          <div key={risk.label}>
            {/* Label and percentage */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '6px',
                fontSize: '12px',
              }}
            >
              <span style={{ color: theme.textSecondary }}>{risk.label}</span>
              <span style={{ color: theme.textHeading, fontWeight: '600' }}>{risk.percentage}%</span>
            </div>

            {/* Progress bar */}
            <div
              style={{
                width: '100%',
                height: '6px',
                background: theme.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                borderRadius: '3px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${risk.percentage}%`,
                  background: risk.color,
                  borderRadius: '3px',
                  transition: 'width 0.4s ease-out',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

function ActiveInvestmentsTable() {
  const { theme } = useInvestorTheme()

  const investments = [
    {
      id: '1',
      name: 'Al-Baraka Trading',
      type: 'Invoice Financing',
      invested: 320000,
      currentValue: 339200,
      return: 6.0,
      status: 'Active',
      maturity: 'Apr 15, 2026',
    },
    {
      id: '2',
      name: 'Riyadh EV Charging',
      type: 'Clean Energy',
      invested: 500000,
      currentValue: 541250,
      return: 8.3,
      status: 'Active',
      maturity: 'Oct 2, 2026',
    },
    {
      id: '3',
      name: 'Saudi Solar Grid',
      type: 'Clean Energy',
      invested: 248240,
      currentValue: 274320,
      return: 10.5,
      status: 'Active',
      maturity: 'Dec 20, 2026',
    },
    {
      id: '4',
      name: 'Jeddah Health Hub',
      type: 'Healthcare',
      invested: 350000,
      currentValue: 358750,
      return: 2.5,
      status: 'Active',
      maturity: 'Jun 10, 2026',
    },
    {
      id: '5',
      name: 'Medina Logistics',
      type: 'Invoice Financing',
      invested: 1000000,
      currentValue: 1011600,
      return: 1.2,
      status: 'Pending',
      maturity: 'Mar 1, 2027',
    },
  ]

  return (
    <GlassCard style={{ padding: '24px', marginBottom: '24px' }}>
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
          Active Investments
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

      {/* Table */}
      <div>
        {/* Header row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr 0.8fr 0.8fr 1fr',
            gap: '16px',
            padding: '12px 0',
            borderBottom: `1px solid ${theme.cardBorder}`,
            marginBottom: '12px',
          }}
        >
          {['Investment', 'Type', 'Invested', 'Current Value', 'Return', 'Status', 'Maturity'].map(
            (header) => (
              <div
                key={header}
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: theme.textTertiary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {header}
              </div>
            )
          )}
        </div>

        {/* Rows */}
        {investments.map((inv, idx) => (
          <div
            key={inv.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 1fr 1fr 1fr 0.8fr 0.8fr 1fr',
              gap: '16px',
              padding: '12px',
              borderBottom: idx < investments.length - 1 ? `1px solid ${theme.cardBorder}` : 'none',
              background: idx % 2 === 0 ? 'transparent' : theme.isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
              transition: 'background 0.2s',
              borderRadius: idx === investments.length - 1 ? '0 0 8px 8px' : '0',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.hoverBg
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                idx % 2 === 0 ? 'transparent' : theme.isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'
            }}
          >
            {/* Investment name */}
            <div style={{ fontSize: '12px', color: theme.textHeading, fontWeight: '500' }}>
              {inv.name}
            </div>

            {/* Type */}
            <div style={{ fontSize: '12px', color: theme.textSecondary }}>{inv.type}</div>

            {/* Invested */}
            <div style={{ fontSize: '12px', color: theme.textHeading, fontWeight: '500' }}>
              SAR {inv.invested.toLocaleString('en-US')}
            </div>

            {/* Current Value */}
            <div style={{ fontSize: '12px', color: theme.textHeading, fontWeight: '500' }}>
              SAR {inv.currentValue.toLocaleString('en-US')}
            </div>

            {/* Return */}
            <div style={{ fontSize: '12px', color: theme.green, fontWeight: '600' }}>
              +{inv.return.toFixed(1)}%
            </div>

            {/* Status */}
            <div
              style={{
                fontSize: '11px',
                fontWeight: '600',
                padding: '4px 8px',
                borderRadius: '6px',
                background: inv.status === 'Active' ? 'rgba(45,212,160,0.2)' : 'rgba(13,130,249,0.2)',
                color: inv.status === 'Active' ? theme.green : theme.blue,
                textAlign: 'center',
              }}
            >
              {inv.status}
            </div>

            {/* Maturity */}
            <div style={{ fontSize: '12px', color: theme.textSecondary }}>{inv.maturity}</div>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

function RecentActivityTimeline() {
  const { theme } = useInvestorTheme()

  const activities = [
    {
      id: '1',
      description: 'Investment in Al-Baraka Trading Co.',
      amount: 'SAR 320,000',
      date: 'Oct 15, 2025',
      color: theme.blue,
      type: 'investment',
    },
    {
      id: '2',
      description: 'Profit received from Saudi Solar Grid',
      amount: '+SAR 12,400',
      date: 'Nov 1, 2025',
      color: theme.green,
      type: 'profit',
    },
    {
      id: '3',
      description: 'Investment in Riyadh EV Charging',
      amount: 'SAR 500,000',
      date: 'Nov 20, 2025',
      color: theme.blue,
      type: 'investment',
    },
    {
      id: '4',
      description: 'Partial repayment from Jeddah Health Hub',
      amount: '+SAR 56,250',
      date: 'Dec 5, 2025',
      color: theme.green,
      type: 'profit',
    },
    {
      id: '5',
      description: 'Investment in Medina Logistics',
      amount: 'SAR 1,000,000',
      date: 'Jan 10, 2026',
      color: theme.blue,
      type: 'investment',
    },
  ]

  return (
    <GlassCard style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ fontSize: '16px', fontWeight: '700', color: theme.textHeading, marginBottom: '20px' }}>
        Recent Activity
      </div>

      {/* Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {activities.map((activity, idx) => (
          <div
            key={activity.id}
            style={{
              display: 'flex',
              gap: '16px',
              paddingBottom: idx < activities.length - 1 ? '16px' : '0',
              borderBottom: idx < activities.length - 1 ? `1px solid ${theme.cardBorder}` : 'none',
            }}
          >
            {/* Timeline dot and line */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              {/* Dot */}
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: activity.color,
                  marginBottom: idx < activities.length - 1 ? '6px' : '0',
                }}
              />
              {/* Line connecting to next item */}
              {idx < activities.length - 1 && (
                <div
                  style={{
                    width: '2px',
                    height: '48px',
                    background: theme.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', color: theme.textHeading, fontWeight: '500', marginBottom: '4px' }}>
                    {activity.description}
                  </div>
                  <div style={{ fontSize: '11px', color: theme.textSecondary }}>
                    {activity.date}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: activity.color,
                    flexShrink: 0,
                    textAlign: 'right',
                  }}
                >
                  {activity.amount}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

export default function InvestorPortfolio() {
  const { theme } = useInvestorTheme()

  return (
    <InvestorLayout activeTab="portfolio" userName="Ahmed" tier="BASIC">
      {/* Summary Cards - 4 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <SummaryCard
          icon={DollarSign}
          label="Total Invested"
          value="SAR 2,418,240"
          trend={{ text: '↑ 12.3% vs last month', color: theme.green }}
        />
        <SummaryCard
          icon={DollarSign}
          label="Total Returns"
          value="SAR 287,125"
          trend={{ text: 'Gross returns', color: theme.green }}
        />
        <SummaryCard
          icon={BarChart3}
          label="Active Investments"
          value="5"
          subtitle="across 4 sectors"
        />
        <SummaryCard
          icon={Percent}
          label="Average Return"
          value="14.8%"
          subtitle="annualized"
        />
      </div>

      {/* Portfolio Performance Chart */}
      <PortfolioPerformanceChart />

      {/* Investment Breakdown - 2 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <InvestmentBreakdownBySector />
        <InvestmentBreakdownByRisk />
      </div>

      {/* Active Investments Table */}
      <ActiveInvestmentsTable />

      {/* Recent Activity */}
      <RecentActivityTimeline />
    </InvestorLayout>
  )
}
