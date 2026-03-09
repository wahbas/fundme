import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import WelcomeSection from './components/dashboard/WelcomeSection'
import OnboardingChecklist from './components/dashboard/OnboardingChecklist'
import QuickStats from './components/dashboard/QuickStats'
import BenefitsRow from './components/dashboard/BenefitsRow'
import FinancingPotential from './components/dashboard/FinancingPotential'
import FinancingOptions from './components/dashboard/FinancingOptions'
import RecentActivity from './components/dashboard/RecentActivity'
import RecentRequests from './components/dashboard/RecentRequests'
import SupportCards from './components/dashboard/SupportCards'
import ReviewStatusBanner from './components/dashboard/ReviewStatusBanner'
import Footer from './components/layout/Footer'

export type UserState = 'first-time' | 'under-review' | 'verified'

const DEMO_BUTTONS: { state: UserState; label: string; activeColor: string }[] = [
  { state: 'first-time', label: 'First-Time User', activeColor: '#002E83' },
  { state: 'under-review', label: 'Under Review', activeColor: '#F59E0B' },
  { state: 'verified', label: 'Verified User', activeColor: '#22C55E' },
]

function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  const stateParam = searchParams.get('state') as UserState | null
  // Backwards compat: ?verified=true → verified
  const legacyVerified = searchParams.get('verified') === 'true'
  const userState: UserState = stateParam || (legacyVerified ? 'verified' : 'first-time')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  function setUserState(s: UserState) {
    setSearchParams(s === 'first-time' ? {} : { state: s })
  }

  const verified = userState === 'verified'
  const underReview = userState === 'under-review'

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar verified={verified || underReview} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((c) => !c)} />
      <main
        style={{
          marginLeft: sidebarCollapsed ? 56 : 192,
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
          minHeight: '100vh',
          padding: 20,
          background: 'linear-gradient(135deg, #001233 0%, #0052B9 100%)',
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 24,
            minHeight: 'calc(100vh - 40px)',
            padding: '28px 32px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            minWidth: 0,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <Header />

            {/* Demo Toggle */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 20,
                padding: '10px 16px',
                background: '#F8FAFC',
                borderRadius: 10,
                border: '1px dashed #D1D5DB',
              }}
            >
              <span style={{ fontSize: 13, color: '#666', fontWeight: 500 }}>Demo Mode:</span>
              {DEMO_BUTTONS.map((btn) => (
                <button
                  key={btn.state}
                  onClick={() => setUserState(btn.state)}
                  style={{
                    padding: '6px 14px',
                    fontSize: 12,
                    fontWeight: 600,
                    borderRadius: 6,
                    background: userState === btn.state ? btn.activeColor : '#fff',
                    color: userState === btn.state ? '#fff' : '#666',
                    border: userState === btn.state ? 'none' : '1px solid #D1D5DB',
                    cursor: 'pointer',
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {!underReview && <WelcomeSection userState={userState} />}

            {verified ? (
              <>
                <FinancingPotential verified />
                <QuickStats />
                <RecentRequests />
                <FinancingOptions />
                <RecentActivity />
              </>
            ) : underReview ? (
              <>
                <ReviewStatusBanner />
                <FinancingOptions underReview />
              </>
            ) : (
              <>
                <OnboardingChecklist />
                <BenefitsRow />
                <FinancingPotential />
              </>
            )}

            <SupportCards verified={verified} />
          </div>
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default App
