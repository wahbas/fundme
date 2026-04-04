'use client'

import { useState, useEffect } from 'react'
import InvestorLayout from '../../components/investor/layout/InvestorLayout'
import { useInvestorTheme } from '../../components/investor/InvestorThemeContext'
import {
  TrendingUp,
  BarChart3,
  Percent,
  Info,
  ChevronUp,
  ChevronDown,
  Building2,
  CircleDollarSign,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts'
import type { ValueType } from 'recharts/types/component/DefaultTooltipContent'

/* ═══════════════════════════════════════════
   Shared UI
   ═══════════════════════════════════════════ */

function GlassCard({
  children,
  style,
  highlight,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
  highlight?: boolean
}) {
  const { theme } = useInvestorTheme()
  return (
    <div
      style={{
        background: theme.cardBg,
        border: `1px solid ${highlight ? (theme.green || '#34D399') + '44' : theme.cardBorder}`,
        borderRadius: theme.cardRadius,
        backdropFilter: theme.cardBlur,
        boxShadow: highlight
          ? `0 0 20px ${(theme.green || '#34D399')}15`
          : theme.cardShadow,
        position: 'relative',
        transition: 'border-color 0.3s, box-shadow 0.4s',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════
   Summary Card
   ═══════════════════════════════════════════ */

function SummaryCard({
  icon: Icon,
  label,
  children,
  highlight,
  iconColor,
  iconBg,
}: {
  icon: typeof TrendingUp
  label: string
  children: React.ReactNode
  highlight?: boolean
  iconColor?: string
  iconBg?: string
}) {
  const { theme, isDark } = useInvestorTheme()

  return (
    <GlassCard style={{ padding: '24px', flex: '1' }} highlight={highlight}>
      <div style={{ position: 'absolute', top: 12, right: 12 }}>
        <Info size={14} color={theme.textTertiary} style={{ cursor: 'pointer', opacity: 0.5 }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: iconBg || (isDark ? 'rgba(13,130,249,0.15)' : 'rgba(13,130,249,0.08)'),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={22} color={iconColor || theme.blue} strokeWidth={1.5} />
        </div>
      </div>

      <div style={{ fontSize: '12px', color: theme.textSecondary, textAlign: 'center', marginBottom: '8px' }}>
        {label}
      </div>

      {children}
    </GlassCard>
  )
}

/* ═══════════════════════════════════════════
   Hero Card — Total Active Investments
   ═══════════════════════════════════════════ */

const heroChartData = [
  { day: 1, value: 2320000 },
  { day: 3, value: 2330000 },
  { day: 5, value: 2310000 },
  { day: 7, value: 2340000 },
  { day: 9, value: 2350000 },
  { day: 11, value: 2340000 },
  { day: 13, value: 2360000 },
  { day: 15, value: 2350000 },
  { day: 17, value: 2370000 },
  { day: 19, value: 2360000 },
  { day: 21, value: 2380000 },
  { day: 23, value: 2370000 },
  { day: 25, value: 2390000 },
  { day: 27, value: 2400000 },
  { day: 29, value: 2410000 },
  { day: 30, value: 2418240 },
]

function HeroInvestmentCard() {
  const { theme, isDark } = useInvestorTheme()
  const [countUp, setCountUp] = useState(0)
  const [selectedPeriod, setSelectedPeriod] = useState('1M')

  const targetValue = 2418240

  useEffect(() => {
    const duration = 1400
    const start = performance.now()
    let frame: number
    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCountUp(Math.round(eased * targetValue))
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [])

  const wholeStr = countUp.toLocaleString('en-US')
  const periods = ['1M', '3M', '6M', '1Y']

  return (
    <GlassCard
      style={{
        padding: '28px 32px 0',
        marginBottom: '24px',
        marginTop: '16px',
        overflow: 'hidden',
        border: `1px solid ${isDark ? 'rgba(13,130,249,0.2)' : 'rgba(13,130,249,0.12)'}`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div>
          <div style={{ fontSize: '13px', color: theme.textSecondary, marginBottom: '12px' }}>
            Total Active Investments
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '10px' }}>
            <span style={{ fontSize: '42px', fontWeight: '700', color: theme.textHeading, letterSpacing: '-1px', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
              {wholeStr}
            </span>
            <span style={{ fontSize: '22px', fontWeight: '400', color: theme.textTertiary }}>.00</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
            <span style={{ color: theme.textSecondary }}>
              Across <span style={{ color: theme.green || '#34D399', fontWeight: '600' }}>3</span> deals
            </span>
            <span style={{ color: theme.textTertiary }}>•</span>
            <span style={{ color: theme.textSecondary }}>
              Expected Profit{' '}
              <span style={{ color: theme.green || '#34D399', fontWeight: '700' }}>SAR 27,125</span>
            </span>
            <span
              style={{
                background: isDark ? 'rgba(52,211,153,0.15)' : 'rgba(52,211,153,0.1)',
                color: theme.green || '#34D399',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
              }}
            >
              +11.3%
            </span>
          </div>
        </div>

        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            border: `1px solid ${theme.cardBorder}`,
            background: isDark ? 'rgba(255,255,255,0.06)' : '#fff',
            color: theme.textHeading,
            fontSize: '13px',
            fontWeight: '500',
            fontFamily: 'inherit',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          {periods.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Recharts area chart */}
      <div style={{ height: 120, marginLeft: -32, marginRight: -32, marginTop: 8 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={heroChartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={theme.blue} stopOpacity={0.35} />
                <stop offset="60%" stopColor={theme.blue} stopOpacity={0.12} />
                <stop offset="100%" stopColor={theme.blue} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={theme.blue}
              strokeWidth={2}
              fill="url(#heroGradient)"
              animationDuration={2000}
              animationEasing="ease-out"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}

/* ═══════════════════════════════════════════
   Risk Distribution — Donut Chart
   ═══════════════════════════════════════════ */

const riskDistData = [
  { name: 'Risk A', value: 2, color: '#34D399' },
  { name: 'Risk B', value: 3, color: '#0D82F9' },
  { name: 'Risk C', value: 1, color: '#F59E0B' },
  { name: 'Risk D', value: 1, color: '#EF4444' },
]

function RiskDistributionChart() {
  const { theme } = useInvestorTheme()

  return (
    <GlassCard style={{ padding: '24px', flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
        <span style={{ fontSize: '14px', fontWeight: '600', color: theme.textHeading }}>
          Risk Distribution
        </span>
        <Info size={13} color={theme.textTertiary} style={{ cursor: 'pointer', opacity: 0.5 }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {/* Donut via Recharts */}
        <div style={{ width: 160, height: 160, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskDistData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                animationDuration={1200}
                animationEasing="ease-out"
                stroke="none"
              >
                {riskDistData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          {riskDistData.map((r) => (
            <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: r.color, flexShrink: 0 }} />
              <span style={{ color: theme.textSecondary }}>{r.name}: {r.value}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

/* ═══════════════════════════════════════════
   Risk: Principal vs Return — Grouped Bar
   ═══════════════════════════════════════════ */

const riskBarData = [
  { grade: 'A', Active: 28000, Completed: 22000 },
  { grade: 'B', Active: 52000, Completed: 38000 },
  { grade: 'C', Active: 18000, Completed: 15000 },
  { grade: 'D', Active: 12000, Completed: 20000 },
]

function RiskBarChart() {
  const { theme, isDark } = useInvestorTheme()

  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'

  const formatY = (v: number) => {
    if (v >= 1000) return `${v / 1000}k`
    return `${v}`
  }

  // Custom legend matching the reference
  const renderLegend = () => (
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '4px' }}>
      {[
        { label: 'Active', color: '#0D82F9', solid: true },
        { label: 'Completed', color: '#34D399', solid: true },
        { label: 'Principal', color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)', solid: false },
        { label: 'Return', color: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)', solid: false },
      ].map((item) => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: item.solid ? '50%' : '2px',
              background: item.solid ? item.color : 'transparent',
              border: item.solid ? 'none' : `2px solid ${item.color}`,
            }}
          />
          <span style={{ fontSize: '11px', color: theme.textSecondary }}>{item.label}</span>
        </div>
      ))}
    </div>
  )

  return (
    <GlassCard style={{ padding: '24px', flex: 2 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
        <span style={{ fontSize: '14px', fontWeight: '600', color: theme.textHeading }}>
          Risk: Principal vs Return
        </span>
        <Info size={13} color={theme.textTertiary} style={{ cursor: 'pointer', opacity: 0.5 }} />
      </div>

      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={riskBarData} barGap={4} barCategoryGap="30%">
            <CartesianGrid vertical={false} stroke={gridColor} />
            <XAxis
              dataKey="grade"
              axisLine={{ stroke: gridColor }}
              tickLine={false}
              tick={{ fill: theme.textSecondary, fontSize: 12, fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={formatY}
              tick={{ fill: theme.textTertiary, fontSize: 11 }}
              domain={[0, 60000]}
              ticks={[0, 20000, 40000, 60000]}
            />
            <Tooltip
              cursor={{ fill: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)' }}
              contentStyle={{
                background: isDark ? '#1a2332' : '#fff',
                border: `1px solid ${theme.cardBorder}`,
                borderRadius: 8,
                fontSize: 12,
                color: theme.textHeading,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
              formatter={(value: ValueType | undefined) => [`SAR ${(value as number).toLocaleString()}`, '']}
            />
            <Bar
              dataKey="Active"
              fill="#0D82F9"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
              animationEasing="ease-out"
            />
            <Bar
              dataKey="Completed"
              fill="#34D399"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
              animationEasing="ease-out"
              animationBegin={200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {renderLegend()}
    </GlassCard>
  )
}

/* ═══════════════════════════════════════════
   Investment Activity — Area Line Chart
   ═══════════════════════════════════════════ */

const activityData = [
  { month: 'Jan', value: 32000 },
  { month: 'Feb', value: 28000 },
  { month: 'Mar', value: 45000 },
  { month: 'Apr', value: 52000 },
  { month: 'May', value: 48000 },
  { month: 'Jun', value: 55000 },
  { month: 'Jul', value: 58000 },
  { month: 'Aug', value: 56000 },
  { month: 'Sep', value: 62000 },
  { month: 'Oct', value: 58000 },
  { month: 'Nov', value: 65000 },
  { month: 'Dec', value: 75000 },
]

function InvestmentActivityChart() {
  const { theme, isDark } = useInvestorTheme()
  const [selectedYear, setSelectedYear] = useState('2025')

  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'

  const formatY = (v: number) => {
    if (v >= 1000) return `${v / 1000}k`
    return `${v}`
  }

  return (
    <GlassCard style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px', fontWeight: '600', color: theme.textHeading }}>
            Investment Activity
          </span>
          <Info size={14} color={theme.textTertiary} style={{ cursor: 'pointer', opacity: 0.5 }} />
        </div>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            border: `1px solid ${theme.cardBorder}`,
            background: isDark ? 'rgba(255,255,255,0.05)' : '#fff',
            color: theme.textHeading,
            fontSize: '13px',
            fontWeight: '500',
            fontFamily: 'inherit',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>

      {/* Chart */}
      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activityData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="activityGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={theme.blue} stopOpacity={0.2} />
                <stop offset="100%" stopColor={theme.blue} stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={gridColor} />
            <XAxis
              dataKey="month"
              axisLine={{ stroke: gridColor }}
              tickLine={false}
              tick={{ fill: theme.textTertiary, fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={formatY}
              tick={{ fill: theme.textTertiary, fontSize: 11 }}
              domain={[0, 80000]}
              ticks={[0, 20000, 40000, 60000, 80000]}
            />
            <Tooltip
              contentStyle={{
                background: isDark ? '#1a2332' : '#fff',
                border: `1px solid ${theme.cardBorder}`,
                borderRadius: 8,
                fontSize: 12,
                color: theme.textHeading,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
              formatter={(value: ValueType | undefined) => [`SAR ${(value as number).toLocaleString()}`, 'Amount']}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={theme.blue}
              strokeWidth={2}
              fill="url(#activityGrad)"
              dot={false}
              activeDot={{ r: 5, fill: theme.blue, stroke: isDark ? '#0D1B2A' : '#fff', strokeWidth: 2 }}
              animationDuration={1800}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}

/* ═══════════════════════════════════════════
   Active Investments Table
   ═══════════════════════════════════════════ */

function ActiveInvestmentsTable() {
  const { theme, isDark } = useInvestorTheme()

  const investments = [
    { id: '1', name: 'Al-Baraka Trading', type: 'Invoice Financing', invested: 120000, currentValue: 127200, returnPct: 6.0, status: 'Active', maturity: 'Apr 15, 2026' },
    { id: '2', name: 'Riyadh EV Charging', type: 'Clean Energy', invested: 80000, currentValue: 86640, returnPct: 8.3, status: 'Active', maturity: 'Oct 2, 2026' },
    { id: '3', name: 'Saudi Solar Grid', type: 'Clean Energy', invested: 45000, currentValue: 49725, returnPct: 10.5, status: 'Completed', maturity: 'Dec 20, 2025' },
    { id: '4', name: 'Jeddah Health Hub', type: 'Healthcare', invested: 60000, currentValue: 61500, returnPct: 2.5, status: 'Active', maturity: 'Jun 10, 2026' },
    { id: '5', name: 'Medina Logistics', type: 'Murabaha', invested: 55000, currentValue: 55660, returnPct: 1.2, status: 'Pending', maturity: 'Mar 1, 2027' },
  ]

  const statusColor = (s: string) => {
    if (s === 'Active') return { bg: 'rgba(52,211,153,0.15)', text: theme.green || '#34D399' }
    if (s === 'Completed') return { bg: 'rgba(13,130,249,0.15)', text: theme.blue }
    return { bg: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', text: theme.textSecondary }
  }

  return (
    <GlassCard style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '16px', fontWeight: '600', color: theme.textHeading }}>Active Investments</div>
        <a href="#" style={{ fontSize: '12px', color: theme.blue, textDecoration: 'none', fontWeight: '500', cursor: 'pointer' }}>
          View all →
        </a>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr>
              {['Investment', 'Type', 'Invested', 'Current Value', 'Return', 'Status', 'Maturity'].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: 'left',
                    padding: '10px 12px',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: theme.textTertiary,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: `1px solid ${theme.cardBorder}`,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {investments.map((inv, idx) => {
              const sc = statusColor(inv.status)
              return (
                <tr
                  key={inv.id}
                  style={{
                    borderBottom: idx < investments.length - 1 ? `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}` : 'none',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '14px 12px', color: theme.textHeading, fontWeight: '500' }}>{inv.name}</td>
                  <td style={{ padding: '14px 12px', color: theme.textSecondary }}>{inv.type}</td>
                  <td style={{ padding: '14px 12px', color: theme.textHeading, fontWeight: '500' }}>SAR {inv.invested.toLocaleString('en-US')}</td>
                  <td style={{ padding: '14px 12px', color: theme.textHeading, fontWeight: '500' }}>SAR {inv.currentValue.toLocaleString('en-US')}</td>
                  <td style={{ padding: '14px 12px', color: theme.green || '#34D399', fontWeight: '600' }}>+{inv.returnPct.toFixed(1)}%</td>
                  <td style={{ padding: '14px 12px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '6px', background: sc.bg, color: sc.text }}>
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 12px', color: theme.textSecondary }}>{inv.maturity}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </GlassCard>
  )
}

/* ═══════════════════════════════════════════
   Main Page
   ═══════════════════════════════════════════ */

export default function InvestorPortfolio() {
  const { theme, isDark } = useInvestorTheme()
  const [analyticsOpen, setAnalyticsOpen] = useState(true)

  return (
    <InvestorLayout activeTab="portfolio" userName="Wahba" tier="BASIC">
      {/* Hero Card */}
      <HeroInvestmentCard />

      {/* Summary Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <SummaryCard icon={CircleDollarSign} label="Total Invested" iconColor={theme.blue} iconBg={isDark ? 'rgba(13,130,249,0.15)' : 'rgba(13,130,249,0.08)'}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: theme.textHeading, textAlign: 'center' }}>SAR 360,000</div>
        </SummaryCard>

        <SummaryCard icon={Building2} label="Total Active Investments" iconColor="#A78BFA" iconBg={isDark ? 'rgba(167,139,250,0.15)' : 'rgba(167,139,250,0.08)'}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: theme.textHeading, textAlign: 'center' }}>SAR 265,000</div>
        </SummaryCard>

        <SummaryCard icon={Percent} label="Avg. Annual Return" highlight iconColor={theme.green || '#34D399'} iconBg={isDark ? 'rgba(52,211,153,0.15)' : 'rgba(52,211,153,0.08)'}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: theme.green || '#34D399', textAlign: 'center' }}>12.1%</div>
        </SummaryCard>

        <SummaryCard icon={TrendingUp} label="Total Returns" iconColor="#F59E0B" iconBg={isDark ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.08)'}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: theme.textTertiary, marginBottom: '4px' }}>Realized</div>
              <div style={{ fontSize: '17px', fontWeight: '700', color: theme.green || '#34D399' }}>SAR 17,532</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: theme.textTertiary, marginBottom: '4px' }}>Unrealized</div>
              <div style={{ fontSize: '17px', fontWeight: '700', color: theme.textHeading }}>SAR 24,843</div>
            </div>
          </div>
        </SummaryCard>
      </div>

      {/* Portfolio Analytics (collapsible) */}
      <GlassCard style={{ marginBottom: '24px', overflow: 'hidden' }}>
        <button
          onClick={() => setAnalyticsOpen(!analyticsOpen)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 24px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: isDark ? 'rgba(13,130,249,0.15)' : 'rgba(13,130,249,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BarChart3 size={16} color={theme.blue} />
            </div>
            <span style={{ fontSize: '16px', fontWeight: '600', color: theme.textHeading }}>Portfolio Analytics</span>
          </div>
          {analyticsOpen ? <ChevronUp size={20} color={theme.textSecondary} /> : <ChevronDown size={20} color={theme.textSecondary} />}
        </button>

        <div style={{ maxHeight: analyticsOpen ? '500px' : '0px', overflow: 'hidden', transition: 'max-height 0.4s ease-in-out' }}>
          <div style={{ display: 'flex', gap: '16px', padding: '0 24px 24px' }}>
            <RiskDistributionChart />
            <RiskBarChart />
          </div>
        </div>
      </GlassCard>

      {/* Investment Activity */}
      <div style={{ marginBottom: '24px' }}>
        <InvestmentActivityChart />
      </div>

      {/* Active Investments Table */}
      <div style={{ marginBottom: '24px' }}>
        <ActiveInvestmentsTable />
      </div>
    </InvestorLayout>
  )
}
