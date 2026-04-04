import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Building2 } from 'lucide-react'
import { useInvestorTheme } from '../../../components/investor/InvestorThemeContext'
import { useInvestorRegister } from './InvestorRegisterContext'
import InvestorGlassCard from '../../../components/investor/register/InvestorGlassCard'
import InvestorButton from '../../../components/investor/register/InvestorButton'

const types = [
  {
    id: 'individual' as const,
    icon: User,
    title: 'Individual Investor',
    description: 'Invest as a personal Saudi investor with your own capital',
  },
  {
    id: 'institutional' as const,
    icon: Building2,
    title: 'Institutional Investor',
    description: 'Invest on behalf of your organization or fund',
  },
]

export default function InvestorTypeScreen() {
  const { theme } = useInvestorTheme()
  const { data, setInvestorType } = useInvestorRegister()
  const navigate = useNavigate()

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: theme.textHeading, marginBottom: 6 }}>
          How will you invest?
        </h2>
        <p style={{ fontSize: 14, color: theme.textSecondary, margin: 0 }}>
          Choose your investor profile to get started
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {types.map((t) => {
          const Icon = t.icon
          const isSelected = data.investorType === t.id
          return (
            <InvestorGlassCard
              key={t.id}
              hoverable
              selected={isSelected}
              onClick={() => setInvestorType(t.id)}
              padding="20px 24px"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: isSelected ? 'rgba(13,130,249,0.15)' : 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} color={isSelected ? theme.blue : theme.textSecondary} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: theme.textHeading, marginBottom: 2 }}>
                    {t.title}
                  </div>
                  <div style={{ fontSize: 12, color: theme.textSecondary, lineHeight: 1.4 }}>
                    {t.description}
                  </div>
                </div>
                {/* Radio indicator */}
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    border: `2px solid ${isSelected ? theme.blue : 'rgba(255,255,255,0.15)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'border-color 0.2s',
                    flexShrink: 0,
                  }}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{ width: 10, height: 10, borderRadius: '50%', background: theme.blue }}
                    />
                  )}
                </div>
              </div>
            </InvestorGlassCard>
          )
        })}
      </div>

      <InvestorButton
        onClick={() => navigate('/investor/register/phone')}
        disabled={!data.investorType}
      >
        Continue
      </InvestorButton>
    </motion.div>
  )
}
