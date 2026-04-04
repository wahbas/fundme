import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import BlueCircles from '../../../components/investor/register/BlueCircles'
import { InvestorOnboardingProvider } from './InvestorOnboardingContext'
import { useInvestorTheme } from '../../../components/investor/InvestorThemeContext'

export default function InvestorOnboardingLayout() {
  const navigate = useNavigate()
  const { theme } = useInvestorTheme()

  return (
    <InvestorOnboardingProvider>
      <div
        style={{
          minHeight: '100vh',
          background: theme.pageBg,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <BlueCircles />

        {/* Top Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 32px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <img src={logo} alt="FundMe" style={{ height: 60, objectFit: 'contain' }} />
          <button
            onClick={() => {
              // Allow logout / exit but warn
              if (confirm('Your progress will be saved. You can resume later.')) {
                navigate('/login')
              }
            }}
            style={{
              background: 'none',
              border: `1px solid rgba(255,255,255,0.15)`,
              borderRadius: 8,
              padding: '6px 14px',
              color: 'rgba(255,255,255,0.5)',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Save & Exit
          </button>
        </div>

        {/* Card */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '0 20px 40px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 600,
              background: theme.cardBg,
              border: `1px solid ${theme.cardBorder}`,
              borderRadius: theme.cardRadius,
              backdropFilter: theme.cardBlur,
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
              padding: '36px 40px',
            }}
          >
            <Outlet />
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '0 20px 24px', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: 0.5, margin: 0 }}>
            SAMA Regulated · Protected by 256-bit SSL encryption
          </p>
        </div>
      </div>
    </InvestorOnboardingProvider>
  )
}
