import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import WelcomeSection from './components/dashboard/WelcomeSection'
import OnboardingChecklist from './components/dashboard/OnboardingChecklist'
import QuickStats from './components/dashboard/QuickStats'
import FinancingPotential from './components/dashboard/FinancingPotential'
import FinancingOptions from './components/dashboard/FinancingOptions'
import RecentActivity from './components/dashboard/RecentActivity'
import RecentRequests from './components/dashboard/RecentRequests'
import SupportCards from './components/dashboard/SupportCards'
import FinancingProducts from './components/dashboard/FinancingProducts'
import HowFundMeWorks from './components/dashboard/HowFundMeWorks'
import SupportWidget from './components/dashboard/SupportWidget'
import ApplicationStatus from './components/dashboard/ApplicationStatus'
import QuickActions from './components/dashboard/QuickActions'
import SkeletonCard from './components/dashboard/SkeletonCard'
import FloatingHelpButton from './components/dashboard/FloatingHelpButton'
import Footer from './components/layout/Footer'

export type UserState = 'first-time' | 'under-review' | 'verified'

const DEMO_BUTTONS: { state: UserState; label: string; activeColor: string }[] = [
  { state: 'first-time', label: 'First-Time', activeColor: '#1B2A3D' },
  { state: 'under-review', label: 'Under Review', activeColor: '#F59E0B' },
  { state: 'verified', label: 'Verified', activeColor: '#10B981' },
]

function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  const stateParam = searchParams.get('state') as UserState | null
  const legacyVerified = searchParams.get('verified') === 'true'
  const userState: UserState = stateParam || (legacyVerified ? 'verified' : 'first-time')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  function setUserState(s: UserState) {
    setSearchParams(s === 'first-time' ? {} : { state: s })
  }

  const verified = userState === 'verified'
  const underReview = userState === 'under-review'
  const firstTime = userState === 'first-time'

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar verified={verified || underReview} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((c) => !c)} />
      <main
        style={{
          marginLeft: sidebarCollapsed ? 72 : 240,
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
          minHeight: '100vh',
          background: verified ? 'linear-gradient(135deg, #001233 0%, #0052B9 100%)' : '#F5F7FA',
          padding: verified ? 20 : 0,
        }}
      >
        <div
          style={{
            background: verified ? '#fff' : '#F5F7FA',
            borderRadius: verified ? 24 : 0,
            minHeight: verified ? 'calc(100vh - 40px)' : '100vh',
            padding: '28px 32px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            minWidth: 0,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <Header showNewLoanButton={firstTime || underReview} disableNewLoanButton={underReview} />

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
                <WelcomeSection userState={userState} />
                <FinancingPotential verified />
                <QuickStats />
                <RecentRequests />
                <FinancingOptions />
                <RecentActivity />
                <SupportCards verified />
              </>
            ) : underReview ? (
              /* Under review layout */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Row 1: Status Hero (40%) + Recent Transactions skeleton (60%) */}
                <div style={{ display: 'grid', gridTemplateColumns: '60% 1fr', gap: 20, alignItems: 'stretch' }}>
                  <ApplicationStatus />
                  <SkeletonCard
                    title="Recent Transactions"
                    emptyIcon={
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 4V16M12 16L7 11M12 16L17 11" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 19H20" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    }
                    emptyTitle="No transactions yet"
                    emptySubtitle="Your financing activity will show up here"
                  />
                </div>

                {/* Row 2: Explore Financing Options + Quick Actions */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'stretch' }}>
                  <FinancingProducts lockText="Available after approval" />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <QuickActions />
                  </div>
                </div>

                {/* Row 3: Upcoming Repayments + Your Support */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'stretch' }}>
                  <SkeletonCard
                    title="Upcoming Repayments"
                    emptyIcon={
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="5" width="18" height="16" rx="2" stroke="#94A3B8" strokeWidth="1.5" />
                        <path d="M3 10H21" stroke="#94A3B8" strokeWidth="1.5" />
                        <path d="M8 3V6M16 3V6" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    }
                    emptyTitle="Your repayments will appear here"
                    emptySubtitle="Once approved, track all upcoming payments in one place"
                    rows={5}
                  />
                  <SupportWidget underReview />
                </div>
              </div>
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
