import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import GreenCircles from './components/GreenCircles'
import { RegisterProvider } from './RegisterContext'
import { useI18n } from '../../i18n'

export default function RegisterLayout() {
  const navigate = useNavigate()
  const { t } = useI18n()

  return (
    <RegisterProvider>
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(155deg, #000814 0%, #001233 40%, #002E83 70%, #0052B9 100%)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <GreenCircles />

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
          <img src={logo} alt="FundMe" style={{ height: 72, objectFit: 'contain' }} />
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
            {t('register.alreadyHaveAccount')}{' '}
            <span
              onClick={() => navigate('/login')}
              style={{ color: '#fff', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 2 }}
            >
              {t('register.signIn')}
            </span>
          </p>
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
              background: '#fff',
              borderRadius: 16,
              padding: 40,
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
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
            {t('footer.encryption')}
          </p>
        </div>
      </div>
    </RegisterProvider>
  )
}
