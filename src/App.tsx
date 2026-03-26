import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useTheme } from './ThemeContext'
import { useI18n } from './i18n'
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
import MakePaymentModal from './components/dashboard/MakePaymentModal'
import ContactSupportModal from './components/dashboard/ContactSupportModal'
import Footer from './components/layout/Footer'
import MobileTabBar from './components/layout/MobileTabBar'

export type UserState = 'first-time' | 'verified'

function App() {
  const { theme } = useTheme()
  const { t, isRTL } = useI18n()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const stateParam = searchParams.get('state') as UserState | null
  const legacyVerified = searchParams.get('verified') === 'true'
  const userState: UserState = stateParam === 'verified' || legacyVerified ? 'verified' : 'first-time'
  const hasSubmitted = searchParams.get('submitted') === 'true'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [supportModalOpen, setSupportModalOpen] = useState(false)

  function setUserState(s: UserState) {
    setSearchParams(s === 'first-time' ? {} : { state: s })
  }

  const verified = userState === 'verified'
  const firstTime = userState === 'first-time'

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar verified={verified} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((c) => !c)} activeTab="home" />
      <main
        style={{
          marginLeft: isRTL ? 0 : (sidebarCollapsed ? 72 : 240),
          marginRight: isRTL ? (sidebarCollapsed ? 72 : 240) : 0,
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
          minHeight: '100vh',
          background: theme.bgPrimary,
          padding: 0,
        }}
      >
        <div
          style={{
            background: theme.bgPrimary,
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
              className="demo-toggle"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 24,
                padding: '4px 6px',
                background: theme.cardBg,
                borderRadius: 20,
                border: `1px dashed ${theme.border}`,
              }}
            >
              <span style={{ fontSize: 11, color: theme.textMuted, fontWeight: 500, paddingLeft: 8 }}>{t('dashboard.demo')}</span>
              {([
                { state: 'first-time' as UserState, label: t('dashboard.notVerified'), activeColor: '#1B2A3D' },
                { state: 'verified' as UserState, label: t('dashboard.verified'), activeColor: '#10B981' },
              ]).map((btn) => (
                <button
                  key={btn.state}
                  onClick={() => setUserState(btn.state)}
                  style={{
                    padding: '4px 12px',
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: 14,
                    background: userState === btn.state ? btn.activeColor : 'transparent',
                    color: userState === btn.state ? '#fff' : theme.textMuted,
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
                {/* Mobile-only: full-width request financing CTA */}
                <button
                  className="mobile-financing-cta"
                  onClick={() => navigate('/request-financing')}
                  style={{
                    display: 'none', width: '100%', padding: '14px 0',
                    background: '#2563EB', color: '#fff', fontWeight: 700, fontSize: 15,
                    borderRadius: 12, border: 'none', cursor: 'pointer',
                    alignItems: 'center', justifyContent: 'center', gap: 8,
                    marginBottom: 16,
                  }}
                >
                  + {t('header.newLoanRequest')}
                </button>
                {hasSubmitted ? <RecentApplication headerOnly /> : null}
                <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>
                  {/* Left column */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                    {hasSubmitted ? <RecentApplication cardsOnly /> : <FinancingOptions />}
                    <RepaymentSchedule onPayClick={() => setPaymentModalOpen(true)} />
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
                <div className="onboarding-grid" style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 20 }}>
                  <OnboardingChecklist />
                  <SupportWidget />
                </div>

                {/* Spacer divider */}
                <div style={{ height: 1, background: theme.border }} />

                {/* Row 2: Financing Products + Quick Actions */}
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: theme.textPrimary, margin: '0 0 4px' }}>
                    {t('financing.products')}
                  </h3>
                  <p style={{ fontSize: 12, color: theme.textSecondary, margin: '0 0 16px' }}>
                    {t('product.completeToApply')}
                  </p>
                  <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <FinancingProducts hideHeader />
                    </div>
                    <div style={{ width: 340, flexShrink: 0 }}>
                      <QuickActions />
                    </div>
                  </div>
                </div>

                {/* Spacer divider */}
                <div style={{ height: 1, background: theme.border }} />

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

      {/* Mobile bottom tab bar */}
      <MobileTabBar />

      {/* Modals */}
      <MakePaymentModal open={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} />
      <ContactSupportModal open={supportModalOpen} onClose={() => setSupportModalOpen(false)} />
    </div>
  )
}

export default App
