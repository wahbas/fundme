import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, GraduationCap, Briefcase, LineChart } from 'lucide-react'
import { useInvestorTheme } from '../../../components/investor/InvestorThemeContext'
import { useInvestorOnboarding } from './InvestorOnboardingContext'
import InvestorButton from '../../../components/investor/register/InvestorButton'
import InvestorInput from '../../../components/investor/register/InvestorInput'
import RadioGroup from './components/RadioGroup'
import OnboardingStepper from './OnboardingStepper'

type SubStep = 'education' | 'employment' | 'knowledge'

export default function InvestorProfileStep() {
  const { theme, isDark } = useInvestorTheme()
  const { state, updateInvestorProfile, setCurrentStep } = useInvestorOnboarding()
  const navigate = useNavigate()
  const [subStep, setSubStep] = useState<SubStep>('education')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => { setCurrentStep(2) }, [])

  const p = state.investorProfile

  function validateAndNext() {
    const errs: Record<string, string> = {}

    if (subStep === 'education') {
      if (!p.educationLevel) errs.educationLevel = 'Please select your education level'
      if (Object.keys(errs).length) { setErrors(errs); return }
      setErrors({})
      setSubStep('employment')
    } else if (subStep === 'employment') {
      if (!p.employmentStatus) errs.employmentStatus = 'Please select your employment status'
      if (!p.monthlyIncome) errs.monthlyIncome = 'Please select your income range'
      if (Object.keys(errs).length) { setErrors(errs); return }
      setErrors({})
      setSubStep('knowledge')
    } else {
      if (!p.investmentExperience) errs.investmentExperience = 'Please select your experience level'
      if (!p.riskTolerance) errs.riskTolerance = 'Please select your risk tolerance'
      if (!p.investmentGoal) errs.investmentGoal = 'Please select your investment goal'
      if (Object.keys(errs).length) { setErrors(errs); return }
      setErrors({})
      navigate('/investor/onboarding/about-you')
    }
  }

  function handleBack() {
    if (subStep === 'education') navigate('/investor/onboarding')
    else if (subStep === 'employment') setSubStep('education')
    else setSubStep('employment')
  }

  const subStepLabels: Record<SubStep, { icon: typeof GraduationCap; title: string; subtitle: string }> = {
    education: { icon: GraduationCap, title: 'Education', subtitle: 'Tell us about your academic background' },
    employment: { icon: Briefcase, title: 'Employment', subtitle: 'Your current professional status' },
    knowledge: { icon: LineChart, title: 'Investment Knowledge', subtitle: 'Your investing experience and goals' },
  }

  const current = subStepLabels[subStep]
  const SubIcon = current.icon

  return (
    <motion.div key={subStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
      <OnboardingStepper />

      {/* Back */}
      <button
        onClick={handleBack}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
          color: theme.textSecondary, fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 20,
          fontFamily: 'inherit',
        }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Sub-step header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: isDark ? 'rgba(13,130,249,0.12)' : 'rgba(13,130,249,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <SubIcon size={20} color={theme.blue} />
        </div>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: theme.textHeading, margin: 0 }}>{current.title}</h2>
          <p style={{ fontSize: 12, color: theme.textSecondary, margin: 0 }}>{current.subtitle}</p>
        </div>
      </div>

      {/* Sub-step content */}
      {subStep === 'education' && (
        <>
          <RadioGroup
            label="Education Level"
            options={[
              { value: 'high_school', label: 'High School' },
              { value: 'diploma', label: 'Diploma' },
              { value: 'bachelors', label: "Bachelor's Degree" },
              { value: 'masters', label: "Master's Degree" },
              { value: 'phd', label: 'PhD or Doctorate' },
            ]}
            value={p.educationLevel}
            onChange={(v) => { updateInvestorProfile({ educationLevel: v }); setErrors({}) }}
            error={errors.educationLevel}
          />
          <InvestorInput
            label="Field of Study (Optional)"
            value={p.fieldOfStudy}
            onChange={(v) => updateInvestorProfile({ fieldOfStudy: v })}
            placeholder="e.g. Finance, Engineering, Law"
          />
        </>
      )}

      {subStep === 'employment' && (
        <>
          <RadioGroup
            label="Employment Status"
            options={[
              { value: 'employed', label: 'Employed' },
              { value: 'self_employed', label: 'Self-Employed / Business Owner' },
              { value: 'retired', label: 'Retired' },
              { value: 'student', label: 'Student' },
              { value: 'unemployed', label: 'Not Currently Employed' },
            ]}
            value={p.employmentStatus}
            onChange={(v) => { updateInvestorProfile({ employmentStatus: v }); setErrors({}) }}
            error={errors.employmentStatus}
          />
          {(p.employmentStatus === 'employed' || p.employmentStatus === 'self_employed') && (
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1 }}>
                <InvestorInput
                  label="Employer / Company"
                  value={p.employer}
                  onChange={(v) => updateInvestorProfile({ employer: v })}
                  placeholder="Company name"
                />
              </div>
              <div style={{ flex: 1 }}>
                <InvestorInput
                  label="Job Title"
                  value={p.jobTitle}
                  onChange={(v) => updateInvestorProfile({ jobTitle: v })}
                  placeholder="Your role"
                />
              </div>
            </div>
          )}
          <RadioGroup
            label="Monthly Income (SAR)"
            helperText="This helps us recommend suitable opportunities"
            options={[
              { value: 'below_10k', label: 'Below 10,000' },
              { value: '10k_25k', label: '10,000 – 25,000' },
              { value: '25k_50k', label: '25,000 – 50,000' },
              { value: '50k_100k', label: '50,000 – 100,000' },
              { value: 'above_100k', label: 'Above 100,000' },
            ]}
            value={p.monthlyIncome}
            onChange={(v) => { updateInvestorProfile({ monthlyIncome: v }); setErrors({}) }}
            error={errors.monthlyIncome}
            columns={2}
          />
        </>
      )}

      {subStep === 'knowledge' && (
        <>
          <RadioGroup
            label="Investment Experience"
            helperText="How long have you been investing?"
            options={[
              { value: 'none', label: 'No experience', description: 'I am new to investing' },
              { value: 'beginner', label: 'Less than 2 years', description: 'Basic understanding of markets' },
              { value: 'intermediate', label: '2 – 5 years', description: 'Regular investing experience' },
              { value: 'advanced', label: 'More than 5 years', description: 'Extensive market knowledge' },
            ]}
            value={p.investmentExperience}
            onChange={(v) => { updateInvestorProfile({ investmentExperience: v }); setErrors({}) }}
            error={errors.investmentExperience}
          />
          <RadioGroup
            label="Risk Tolerance"
            helperText="How comfortable are you with potential losses?"
            options={[
              { value: 'conservative', label: 'Conservative', description: 'Preserve capital, minimal risk' },
              { value: 'moderate', label: 'Moderate', description: 'Balance between growth and safety' },
              { value: 'aggressive', label: 'Aggressive', description: 'Higher returns, accept higher risk' },
            ]}
            value={p.riskTolerance}
            onChange={(v) => { updateInvestorProfile({ riskTolerance: v }); setErrors({}) }}
            error={errors.riskTolerance}
          />
          <RadioGroup
            label="Primary Investment Goal"
            options={[
              { value: 'income', label: 'Regular Income', description: 'Steady returns from investments' },
              { value: 'growth', label: 'Capital Growth', description: 'Long-term wealth building' },
              { value: 'diversification', label: 'Diversification', description: 'Spread risk across asset classes' },
              { value: 'sharia', label: 'Sharia-Compliant Returns', description: 'Ethical, Islamic finance focused' },
            ]}
            value={p.investmentGoal}
            onChange={(v) => { updateInvestorProfile({ investmentGoal: v }); setErrors({}) }}
            error={errors.investmentGoal}
          />
          <InvestorInput
            label="Other Platforms (Optional)"
            value={p.previousPlatforms}
            onChange={(v) => updateInvestorProfile({ previousPlatforms: v })}
            placeholder="e.g. Riyad Capital, Derayah, etc."
          />
        </>
      )}

      <div style={{ marginTop: 24 }}>
        <InvestorButton onClick={validateAndNext}>
          {subStep === 'knowledge' ? 'Continue to About You' : 'Next'}
        </InvestorButton>
      </div>

      {/* Sub-step indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 14 }}>
        {(['education', 'employment', 'knowledge'] as SubStep[]).map((s) => (
          <div key={s} style={{
            width: s === subStep ? 20 : 6, height: 6, borderRadius: 3,
            background: s === subStep ? theme.blue : isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
            transition: 'all 0.3s',
          }} />
        ))}
      </div>
    </motion.div>
  )
}
