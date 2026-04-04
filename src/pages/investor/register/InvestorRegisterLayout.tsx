import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import BlueCircles from '../../../components/investor/register/BlueCircles'
import { InvestorRegisterProvider } from './InvestorRegisterContext'
import { useInvestorTheme } from '../../../components/investor/InvestorThemeContext'

export default function InvestorRegisterLayout() {
  const navigate = useNavigate()
  const { theme } = useInvestorTheme()

  return (
    <InvestorRegisterProvider>
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
          <img
            src={logo}
            alt="FundMe"
            style={{ height: 72, objectFit: 'contain', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              Already have an account?{' '}
              <span
                onClick={() => navigate('/login')}
                style={{
                  color: '#fff',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  textUnderlineOffset: 2,
                }}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>

        {/* Card */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 20px 40px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 520,
              background: theme.cardBg,
              border: `1px solid ${theme.cardBorder}`,
              borderRadius: theme.cardRadius,
              backdropFilter: theme.cardBlur,
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
              padding: 40,
            }}
          >
            <Outlet />
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: 'center',
            padding: '0 20px 24px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: 0.5 }}>
            Protected by 256-bit SSL encryption
          </p>
        </div>
      </div>
    </InvestorRegisterProvider>
  )
}
