import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

/* ─────────────────────────────────────────────
   Profile Status Model
   ─────────────────────────────────────────────
   NOT_STARTED  → user registered + Nafath done, but hasn't touched profile
   IN_PROGRESS  → user started filling but hasn't finished all steps
   COMPLETED    → all 3 steps done (Identity ✔ + Investor Profile ✔ + About You ✔)
*/

export type ProfileStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'

export interface InvestorProfileData {
  // Step 1: Education
  educationLevel: string
  fieldOfStudy: string

  // Step 2: Employment
  employmentStatus: string
  employer: string
  jobTitle: string
  monthlyIncome: string

  // Step 3: Investment Knowledge
  investmentExperience: string
  riskTolerance: string
  investmentGoal: string
  previousPlatforms: string
}

export interface AboutYouData {
  isPEP: boolean | null               // Politically Exposed Person
  isPEPRelated: boolean | null        // Related to a PEP
  hasSeniorRole: boolean | null       // Senior gov/military/judicial role
  hasOtherBrokerage: boolean | null   // Accounts at other brokerages
  sourceOfFunds: string               // Employment / Savings / Inheritance / Business / Other
  annualIncome: string                // Range selection
}

interface OnboardingState {
  profileStatus: ProfileStatus
  currentStep: number  // 1=Identity(done), 2=InvestorProfile, 3=AboutYou
  investorProfile: InvestorProfileData
  aboutYou: AboutYouData
}

interface OnboardingContextValue {
  state: OnboardingState
  setCurrentStep: (step: number) => void
  updateInvestorProfile: (data: Partial<InvestorProfileData>) => void
  updateAboutYou: (data: Partial<AboutYouData>) => void
  completeProfile: () => void
  getCompletionPercent: () => number
}

const STORAGE_KEY = 'fundme-investor-onboarding'

const defaultProfile: InvestorProfileData = {
  educationLevel: '',
  fieldOfStudy: '',
  employmentStatus: '',
  employer: '',
  jobTitle: '',
  monthlyIncome: '',
  investmentExperience: '',
  riskTolerance: '',
  investmentGoal: '',
  previousPlatforms: '',
}

const defaultAboutYou: AboutYouData = {
  isPEP: null,
  isPEPRelated: null,
  hasSeniorRole: null,
  hasOtherBrokerage: null,
  sourceOfFunds: '',
  annualIncome: '',
}

function loadState(): OnboardingState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch { /* ignore */ }
  return {
    profileStatus: 'NOT_STARTED',
    currentStep: 2,
    investorProfile: { ...defaultProfile },
    aboutYou: { ...defaultAboutYou },
  }
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null)

export function InvestorOnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(loadState)

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  function setCurrentStep(step: number) {
    setState((s) => ({
      ...s,
      currentStep: step,
      profileStatus: s.profileStatus === 'NOT_STARTED' ? 'IN_PROGRESS' : s.profileStatus,
    }))
  }

  function updateInvestorProfile(data: Partial<InvestorProfileData>) {
    setState((s) => ({
      ...s,
      investorProfile: { ...s.investorProfile, ...data },
      profileStatus: s.profileStatus === 'NOT_STARTED' ? 'IN_PROGRESS' : s.profileStatus,
    }))
  }

  function updateAboutYou(data: Partial<AboutYouData>) {
    setState((s) => ({
      ...s,
      aboutYou: { ...s.aboutYou, ...data },
      profileStatus: s.profileStatus === 'NOT_STARTED' ? 'IN_PROGRESS' : s.profileStatus,
    }))
  }

  function completeProfile() {
    setState((s) => ({ ...s, profileStatus: 'COMPLETED' }))
    localStorage.setItem('fundme-investor-profile-complete', 'true')
  }

  function getCompletionPercent(): number {
    // Identity (Nafath) = 33%, Investor Profile = 33%, About You = 34%
    const nafathDone = localStorage.getItem('fundme-investor-nafath-verified') === 'true'
    let pct = nafathDone ? 33 : 0

    const p = state.investorProfile
    const profileFields = [p.educationLevel, p.employmentStatus, p.monthlyIncome, p.investmentExperience, p.riskTolerance, p.investmentGoal]
    const profileFilled = profileFields.filter(Boolean).length
    pct += Math.round((profileFilled / profileFields.length) * 33)

    const a = state.aboutYou
    const aboutFields = [a.isPEP !== null, a.isPEPRelated !== null, a.hasSeniorRole !== null, a.sourceOfFunds, a.annualIncome]
    const aboutFilled = aboutFields.filter(Boolean).length
    pct += Math.round((aboutFilled / aboutFields.length) * 34)

    return Math.min(pct, 100)
  }

  return (
    <OnboardingContext.Provider value={{ state, setCurrentStep, updateInvestorProfile, updateAboutYou, completeProfile, getCompletionPercent }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useInvestorOnboarding() {
  const ctx = useContext(OnboardingContext)
  if (!ctx) throw new Error('useInvestorOnboarding must be used within InvestorOnboardingProvider')
  return ctx
}

export function getProfileStatus(): ProfileStatus {
  const complete = localStorage.getItem('fundme-investor-profile-complete') === 'true'
  if (complete) return 'COMPLETED'
  const nafathDone = localStorage.getItem('fundme-investor-nafath-verified') === 'true'
  if (!nafathDone) return 'NOT_STARTED'
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return parsed.profileStatus || 'NOT_STARTED'
    }
  } catch { /* ignore */ }
  return 'NOT_STARTED'
}
