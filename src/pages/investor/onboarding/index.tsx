import { Routes, Route, Navigate } from 'react-router-dom'
import InvestorOnboardingLayout from './InvestorOnboardingLayout'
import OnboardingWelcome from './OnboardingWelcome'
import InvestorProfileStep from './InvestorProfileStep'
import AboutYouStep from './AboutYouStep'
import CompletionScreen from './CompletionScreen'

export default function InvestorOnboarding() {
  return (
    <Routes>
      <Route element={<InvestorOnboardingLayout />}>
        <Route index element={<OnboardingWelcome />} />
        <Route path="investor-profile" element={<InvestorProfileStep />} />
        <Route path="about-you" element={<AboutYouStep />} />
        <Route path="complete" element={<CompletionScreen />} />
        <Route path="*" element={<Navigate to="/investor/onboarding" replace />} />
      </Route>
    </Routes>
  )
}
