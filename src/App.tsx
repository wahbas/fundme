import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import OnboardingChecklist from './components/dashboard/OnboardingChecklist'
import QuickStats from './components/dashboard/QuickStats'
import FinancingOptions from './components/dashboard/FinancingOptions'
import RecentApplication from './components/dashboard/RecentApplication'
import QuickActions from './components/dashboard/QuickActions'
import RepaymentSchedule from './components/dashboard/RepaymentSchedule'
import SupportCards from './components/dashboard/SupportCards'
import FinancingProducts from './components/dashboard/FinancingProducts'
import HowFundMeWorks from './components/dashboard/HowFundMeWorks'
import SupportWidget from './components/dashboard/SupportWidget'
import FloatingHelpButton from './components/dashboard/FloatingHelpButton'
import Footer from './components/layout/Footer'

export type UserState = 'first-time' | 'verified'

const DEMO_BUTTONS: { state: UserState; label: string; activeColor: string }[] = [
  { state: 'first-time', label: 'Not Verified', activeColor: '#1B2A3D' },
  { state: 'verified', label: 'Verified', activeColor: '#10B981' },
]

function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  const stateParam = searchParams.get('state') as UserState | null
  const legacyVerified = searchParams.get('verified') === 'true'
  const userState: UserState = stateParam === 'verified' || legacyVerified ? 'verified' : 'first-time'
  const hasSubmitted = searchParams.get('submitted') === 'true'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  function setUserState(s: UserState) {
    setSearchParams(s === 'first-time' ? {} : { state: s })
  }

  const verified = userState === 'verified'
  const firstTime = userState === 'first-time'

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar verified={verified} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((c) => !c)} />
      <main
        style={{
          marginLeft: sidebarCollapsed ? 72 : 240,
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
          minHeight: '100vh',
          background: '#F8FAFC',
          padding: 0,
        }}
      >
        <div
          style={{
            background: '#F8FAFC',
            borderRadius: 0,
            minHeight: '100vh',
            padding: '28px 32px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            minWidth: 0,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <Header showNewLoanButton={firstTime} showVerifiedLoanButton={verified} />

            {/* Demo Toggle — compact pill style */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 24,
                padding: '4px 6px',
                background: '#fff',
                borderRadius: 20,
                border: '1px dashed #E2E8F0',
              }}
            >
              <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, paddingLeft: 8 }}>Demo:</span>
              {DEMO_BUTTONS.map((btn) => (
                <button
                  key={btn.state}
                  onClick={() => setUserState(btn.state)}
                  style={{
                    padding: '4px 12px',
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: 14,
                    background: userState === btn.state ? btn.activeColor : 'transparent',
                    color: userState === btn.state ? '#fff' : '#94A3B8',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {verified ? (
              <>
                <QuickStats hasLoans={hasSubmitted} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>
                  {/* Left column — scrolls naturally */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                    {hasSubmitted ? <RecentApplication /> : <FinancingOptions />}
                    <RepaymentSchedule />
                  </div>
                  {/* Right column — sticky on scroll */}
                  <div style={{ position: 'sticky', top: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <QuickActions />
                    <SupportCards verified />
                  </div>
                </div>
              </>
            ) : (
              /* First-time user: widget-based dashboard grid */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {/* Row 1: Complete Profile (75%) + Support (25%) */}
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 20 }}>
                  <OnboardingChecklist />
                  <SupportWidget />
                </div>

                {/* Spacer divider */}
                <div style={{ height: 1, background: '#E2E8F0' }} />

                {/* Row 2: Financing Products (full width) */}
                <FinancingProducts />

                {/* Spacer divider */}
                <div style={{ height: 1, background: '#E2E8F0' }} />

                {/* Row 3: How FundMe Works (full width) */}
                <HowFundMeWorks />
              </div>
            )}
          </div>
          <Footer />
        </div>
      </main>

      {/* Floating help button — always visible */}
      <FloatingHelpButton />
    </div>
  )
}

export default App
