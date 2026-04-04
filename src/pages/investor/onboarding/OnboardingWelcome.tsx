import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, ArrowRight } from 'lucide-react'
import { useInvestorTheme } from '../../../components/investor/InvestorThemeContext'
import { useInvestorOnboarding } from './InvestorOnboardingContext'
import InvestorButton from '../../../components/investor/register/InvestorButton'
import OnboardingStepper from './OnboardingStepper'

export default function OnboardingWelcome() {
  const { theme, isDark } = useInvestorTheme()
  const { state } = useInvestorOnboarding()
  const navigate = useNavigate()

  const isResume = state.profileStatus === 'IN_PROGRESS'

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <OnboardingStepper />

      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        {/* Shield icon */}
        <div style={{
          width: 64, height: 64, borderRadius: '50%', margin: '0 auto 20px',
          background: isDark ? 'rgba(13,130,249,0.12)' : 'rgba(13,130,249,0.06)',
          border: `1.5px solid ${isDark ? 'rgba(13,130,249,0.2)' : 'rgba(13,130,249,0.12)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ShieldCheck size={28} color={theme.blue} />
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textHeading, marginBottom: 8 }}>
          {isResume ? 'Welcome back' : 'Complete your profile'}
        </h2>
        <p style={{ fontSize: 14, color: theme.textSecondary, margin: 0, lineHeight: 1.6 }}>
          {isResume
            ? 'Pick up where you left off to unlock your investor dashboard'
            : 'As a SAMA-regulated platform, we need a few more details to verify your investor eligibility'
          }
        </p>
      </div>

      {/* What we need */}
      <div style={{
        padding: '18px 20px', borderRadius: 14, marginBottom: 28,
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: theme.textSecondary, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          What we'll ask
        </div>
        {[
          { label: 'Education & Employment', desc: 'Your professional background', time: '2 min' },
          { label: 'Investment Knowledge', desc: 'Your experience and goals', time: '1 min' },
          { label: 'Regulatory Questions', desc: 'Required compliance checks', time: '1 min' },
        ].map((item, i) => (
          <div key={item.label} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
            borderTop: i > 0 ? `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}` : 'none',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: isDark ? 'rgba(13,130,249,0.1)' : 'rgba(13,130,249,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: theme.blue,
            }}>
              {i + 1}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: theme.textHeading }}>{item.label}</div>
              <div style={{ fontSize: 11, color: theme.textTertiary }}>{item.desc}</div>
            </div>
            <span style={{ fontSize: 11, color: theme.textTertiary }}>{item.time}</span>
          </div>
        ))}
      </div>

      <InvestorButton onClick={() => navigate('/investor/onboarding/investor-profile')} icon={<ArrowRight size={16} />}>
        {isResume ? 'Resume' : 'Get Started'}
      </InvestorButton>

      <p style={{ fontSize: 11, color: theme.textTertiary, textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>
        This takes approximately 4 minutes. Your progress is saved automatically.
      </p>
    </motion.div>
  )
}
