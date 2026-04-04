import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, TrendingUp, Wallet, BarChart3 } from 'lucide-react'
import { useInvestorTheme } from '../../../components/investor/InvestorThemeContext'
import InvestorButton from '../../../components/investor/register/InvestorButton'

export default function CompletionScreen() {
  const { theme, isDark } = useInvestorTheme()
  const navigate = useNavigate()

  // Auto-redirect after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => navigate('/investor'), 8000)
    return () => clearTimeout(timer)
  }, [navigate])

  const features = [
    { icon: TrendingUp, label: 'Investment Opportunities', color: theme.blue },
    { icon: Wallet, label: 'Deposit & Withdraw', color: theme.green || '#34D399' },
    { icon: BarChart3, label: 'Portfolio Analytics', color: '#A78BFA' },
  ]

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
      <div style={{ textAlign: 'center' }}>
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          style={{
            width: 80, height: 80, borderRadius: '50%', margin: '0 auto 24px',
            background: isDark ? 'rgba(34,197,94,0.12)' : '#DCFCE7',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <CheckCircle2 size={40} color="#22C55E" />
        </motion.div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: theme.textHeading, marginBottom: 8 }}>
          Profile Complete
        </h2>
        <p style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 32, lineHeight: 1.6 }}>
          Your investor profile has been verified. You now have full access to the FundMe platform.
        </p>

        {/* Unlocked features */}
        <div style={{
          display: 'flex', gap: 12, marginBottom: 32, justifyContent: 'center',
        }}>
          {features.map((f) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + features.indexOf(f) * 0.15 }}
                style={{
                  flex: 1, padding: '16px 12px', borderRadius: 14, textAlign: 'center',
                  background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10, margin: '0 auto 8px',
                  background: `${f.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={18} color={f.color} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 500, color: theme.textSecondary }}>{f.label}</div>
              </motion.div>
            )
          })}
        </div>

        <InvestorButton onClick={() => navigate('/investor')} icon={<ArrowRight size={16} />}>
          Go to Dashboard
        </InvestorButton>

        <p style={{ fontSize: 11, color: theme.textTertiary, marginTop: 14 }}>
          Redirecting automatically...
        </p>
      </div>
    </motion.div>
  )
}
