import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield } from 'lucide-react'
import { useInvestorTheme } from '../../../components/investor/InvestorThemeContext'
import { useInvestorOnboarding } from './InvestorOnboardingContext'
import InvestorButton from '../../../components/investor/register/InvestorButton'
import RadioGroup from './components/RadioGroup'
import YesNoQuestion from './components/YesNoQuestion'
import OnboardingStepper from './OnboardingStepper'

export default function AboutYouStep() {
  const { theme, isDark } = useInvestorTheme()
  const { state, updateAboutYou, setCurrentStep, completeProfile } = useInvestorOnboarding()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => { setCurrentStep(3) }, [])

  const a = state.aboutYou

  const canSubmit =
    a.isPEP !== null &&
    a.isPEPRelated !== null &&
    a.hasSeniorRole !== null &&
    a.sourceOfFunds !== '' &&
    a.annualIncome !== ''

  function handleSubmit() {
    const errs: Record<string, string> = {}
    if (a.isPEP === null) errs.pep = 'Required'
    if (a.isPEPRelated === null) errs.pepRelated = 'Required'
    if (a.hasSeniorRole === null) errs.seniorRole = 'Required'
    if (!a.sourceOfFunds) errs.sourceOfFunds = 'Please select your source of funds'
    if (!a.annualIncome) errs.annualIncome = 'Please select your annual income range'
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      completeProfile()
      navigate('/investor/onboarding/complete')
    }, 1200)
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
      <OnboardingStepper />

      {/* Back */}
      <button
        onClick={() => navigate('/investor/onboarding/investor-profile')}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
          color: theme.textSecondary, fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 20,
          fontFamily: 'inherit',
        }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: isDark ? 'rgba(167,139,250,0.12)' : 'rgba(167,139,250,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Shield size={20} color="#A78BFA" />
        </div>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: theme.textHeading, margin: 0 }}>About You</h2>
          <p style={{ fontSize: 12, color: theme.textSecondary, margin: 0 }}>Required regulatory checks</p>
        </div>
      </div>

      {/* Compliance notice */}
      <div style={{
        padding: '10px 14px', borderRadius: 10, marginBottom: 24,
        background: isDark ? 'rgba(13,130,249,0.06)' : 'rgba(13,130,249,0.04)',
        border: `1px solid ${isDark ? 'rgba(13,130,249,0.12)' : 'rgba(13,130,249,0.08)'}`,
        fontSize: 11, color: theme.textSecondary, lineHeight: 1.5,
      }}>
        These questions are required by Saudi Arabian Monetary Authority (SAMA) regulations for all investment platforms.
      </div>

      {/* PEP Questions */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: theme.textTertiary, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Political Exposure
        </div>
        <YesNoQuestion
          question="Are you a Politically Exposed Person (PEP)?"
          helperText="A PEP is someone who holds or has held a prominent public function"
          value={a.isPEP}
          onChange={(v) => { updateAboutYou({ isPEP: v }); setErrors({}) }}
        />
        <YesNoQuestion
          question="Are you related to or closely associated with a PEP?"
          value={a.isPEPRelated}
          onChange={(v) => { updateAboutYou({ isPEPRelated: v }); setErrors({}) }}
        />
        <YesNoQuestion
          question="Do you hold or have you held a senior government, military, or judicial role?"
          value={a.hasSeniorRole}
          onChange={(v) => { updateAboutYou({ hasSeniorRole: v }); setErrors({}) }}
        />
      </div>

      {/* Financial Questions */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: theme.textTertiary, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Financial Information
        </div>
        <RadioGroup
          label="Primary Source of Funds"
          helperText="Where does the money you plan to invest come from?"
          options={[
            { value: 'employment', label: 'Employment Income' },
            { value: 'savings', label: 'Personal Savings' },
            { value: 'inheritance', label: 'Inheritance' },
            { value: 'business', label: 'Business Revenue' },
            { value: 'other', label: 'Other' },
          ]}
          value={a.sourceOfFunds}
          onChange={(v) => { updateAboutYou({ sourceOfFunds: v }); setErrors({}) }}
          error={errors.sourceOfFunds}
          columns={2}
        />
        <RadioGroup
          label="Annual Income (SAR)"
          options={[
            { value: 'below_120k', label: 'Below 120,000' },
            { value: '120k_300k', label: '120,000 – 300,000' },
            { value: '300k_600k', label: '300,000 – 600,000' },
            { value: '600k_1m', label: '600,000 – 1,000,000' },
            { value: 'above_1m', label: 'Above 1,000,000' },
          ]}
          value={a.annualIncome}
          onChange={(v) => { updateAboutYou({ annualIncome: v }); setErrors({}) }}
          error={errors.annualIncome}
          columns={2}
        />
      </div>

      <InvestorButton onClick={handleSubmit} loading={loading} disabled={!canSubmit}>
        Complete Profile
      </InvestorButton>

      <p style={{ fontSize: 11, color: theme.textTertiary, textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>
        Your information is encrypted and handled in accordance with SAMA regulations
      </p>
    </motion.div>
  )
}
