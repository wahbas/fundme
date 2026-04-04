import { useState, useMemo } from 'react'
import { useInvestorTheme } from './InvestorThemeContext'
import RiyalSign from '../icons/RiyalSign'
import { Lock, Shield, CheckCircle2 } from 'lucide-react'

interface InvestPanelProps {
  balance: number
  min: number
  max: number
  returnRate: number
  duration: string
}

export default function InvestPanel({ balance, min, max, returnRate, duration }: InvestPanelProps) {
  const { theme, isDark } = useInvestorTheme()
  const [amount, setAmount] = useState(0)

  const durationMonths = parseInt(duration) || 6
  const expectedReturn = useMemo(
    () => Math.round(amount * (returnRate / 100) * (durationMonths / 12)),
    [amount, returnRate, durationMonths],
  )

  const isValid = amount >= min && amount <= max
  const quickAmounts = [1000, 5000, 10000, 25000]

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setAmount(raw === '' ? 0 : Math.min(parseInt(raw, 10), max))
  }

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value))
  }

  const selectAmount = (val: number) => {
    setAmount(Math.min(val, max))
  }

  const sliderPercent = max > 0 ? (amount / max) * 100 : 0

  return (
    <div
      style={{
        background: theme.cardBg,
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: theme.cardRadius,
        backdropFilter: theme.cardBlur,
        boxShadow: theme.cardShadow,
        padding: '32px 28px 28px',
      }}
    >
      {/* ── Hero Amount ── */}
      <div style={{ marginBottom: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            inputMode="numeric"
            value={amount === 0 ? '' : amount.toLocaleString('en-US')}
            onChange={handleInput}
            placeholder="0"
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '40px',
              fontWeight: '700',
              fontFamily: 'inherit',
              color: theme.textHeading,
              minWidth: 0,
              padding: 0,
            }}
          />
          <RiyalSign size="xl" color={theme.textTertiary} />
        </div>

        {/* Active underline */}
        <div
          style={{
            height: '2px',
            borderRadius: '1px',
            background:
              amount > 0 && !isValid
                ? theme.red
                : amount > 0
                  ? theme.blue
                  : isDark
                    ? 'rgba(255,255,255,0.06)'
                    : 'rgba(0,0,0,0.05)',
            transition: 'background 0.3s',
            marginTop: '4px',
          }}
        />
      </div>

      {/* ── Slider ── */}
      <div style={{ margin: '20px 0 16px' }}>
        <input
          type="range"
          min={0}
          max={max}
          step={100}
          value={amount}
          onChange={handleSlider}
          style={{
            width: '100%',
            height: '4px',
            appearance: 'none',
            WebkitAppearance: 'none',
            background: `linear-gradient(to right, ${theme.blue} 0%, ${theme.blue} ${sliderPercent}%, ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'} ${sliderPercent}%, ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'} 100%)`,
            borderRadius: '2px',
            outline: 'none',
            cursor: 'pointer',
          }}
        />
        <style>{`
          .invest-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 18px; height: 18px; border-radius: 50%;
            background: ${theme.blue};
            border: 3px solid ${isDark ? '#0a1628' : '#fff'};
            box-shadow: 0 2px 8px rgba(13,130,249,0.35);
            cursor: pointer;
          }
          .invest-slider::-moz-range-thumb {
            width: 18px; height: 18px; border-radius: 50%;
            background: ${theme.blue};
            border: 3px solid ${isDark ? '#0a1628' : '#fff'};
            box-shadow: 0 2px 8px rgba(13,130,249,0.35);
            cursor: pointer;
          }
        `}</style>
      </div>

      {/* ── Quick Amounts ── */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
        {quickAmounts.map((val) => {
          const label = val >= 1000 ? `${val / 1000}K` : String(val)
          const disabled = val > max
          const selected = amount === val
          return (
            <button
              key={val}
              onClick={() => !disabled && selectAmount(val)}
              disabled={disabled}
              style={{
                flex: 1,
                padding: '8px 0',
                fontSize: '13px',
                fontWeight: '600',
                fontFamily: 'inherit',
                borderRadius: '10px',
                cursor: disabled ? 'not-allowed' : 'pointer',
                border: `1px solid ${selected ? theme.blue : theme.cardBorder}`,
                background: selected ? theme.blue + '14' : 'transparent',
                color: selected ? theme.blue : disabled ? theme.textTertiary : theme.textSecondary,
                opacity: disabled ? 0.3 : 1,
                transition: 'all 0.15s',
              }}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* ── Min / Max ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: theme.textTertiary,
          marginBottom: '24px',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          Min: <RiyalSign size="sm" /> {min.toLocaleString('en-US')}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          Max: <RiyalSign size="sm" /> {max.toLocaleString('en-US')}
        </span>
      </div>

      {/* ── Inline Info ── */}
      <div
        style={{
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
          paddingTop: '16px',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {/* Payment source */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: theme.textTertiary }}>From</span>
          <span
            style={{
              fontSize: '12px',
              fontWeight: '600',
              color: theme.textSecondary,
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            FundMe Wallet · <RiyalSign size="sm" /> {balance.toLocaleString('en-US')}
          </span>
        </div>

        {/* Expected return */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: theme.textTertiary }}>You'll earn</span>
          <span
            style={{
              fontSize: '12px',
              fontWeight: '700',
              color: amount > 0 ? (theme.green || '#34D399') : theme.textTertiary,
              display: 'inline-flex',
              alignItems: 'center',
              transition: 'color 0.2s',
            }}
          >
            {amount > 0 ? (
              <>
                +<RiyalSign size="sm" /> {expectedReturn.toLocaleString('en-US')}
                <span style={{ fontWeight: '500', color: theme.textTertiary, marginLeft: '6px' }}>
                  ({returnRate}% · {duration})
                </span>
              </>
            ) : (
              <>— enter amount</>
            )}
          </span>
        </div>
      </div>

      {/* ── CTA ── */}
      <button
        disabled={!isValid}
        style={{
          width: '100%',
          padding: '16px',
          fontSize: '15px',
          fontWeight: '700',
          fontFamily: 'inherit',
          border: 'none',
          borderRadius: '14px',
          cursor: isValid ? 'pointer' : 'not-allowed',
          transition: 'all 0.25s',
          background: isValid
            ? 'linear-gradient(135deg, #0D82F9 0%, #0668CC 100%)'
            : isDark
              ? 'rgba(255,255,255,0.04)'
              : 'rgba(0,0,0,0.04)',
          color: isValid ? '#fff' : theme.textTertiary,
          boxShadow: isValid ? '0 4px 20px rgba(13,130,249,0.3)' : 'none',
        }}
        onMouseEnter={(e) => {
          if (isValid) {
            e.currentTarget.style.boxShadow = '0 6px 28px rgba(13,130,249,0.45)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }
        }}
        onMouseLeave={(e) => {
          if (isValid) {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(13,130,249,0.3)'
            e.currentTarget.style.transform = 'translateY(0)'
          }
        }}
      >
        {isValid ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Invest <RiyalSign size="sm" bold /> {amount.toLocaleString('en-US')}
          </span>
        ) : (
          'Enter Amount to Invest'
        )}
      </button>

      {/* ── Trust row ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          marginTop: '14px',
        }}
      >
        {[
          { icon: Lock, label: 'Secure' },
          { icon: Shield, label: 'Regulated' },
          { icon: CheckCircle2, label: 'Verified' },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '10px',
              color: theme.textTertiary,
            }}
          >
            <Icon size={10} />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}
