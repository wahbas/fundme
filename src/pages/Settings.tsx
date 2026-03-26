import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ArrowLeftRight, LogOut, ChevronRight, ChevronLeft } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import FloatingHelpButton from '../components/dashboard/FloatingHelpButton'
import MobileTabBar from '../components/layout/MobileTabBar'
import { useTheme } from '../ThemeContext'
import { useI18n } from '../i18n'

export default function Settings() {
  const [searchParams] = useSearchParams()
  const stateParam = searchParams.get('state')
  const verified = stateParam === 'verified' || searchParams.get('verified') === 'true'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const navigate = useNavigate()
  const { theme, isDark, toggleTheme } = useTheme()
  const { t, lang, setLang, isRTL } = useI18n()

  const pillStyle = (active: boolean): React.CSSProperties => ({
    padding: '8px 20px',
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 600,
    border: active ? 'none' : `1px solid ${theme.border}`,
    background: active ? '#2563EB' : theme.inputBg,
    color: active ? '#fff' : theme.textSecondary,
    cursor: 'pointer',
    transition: 'background 0.2s, color 0.2s',
  })

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar verified={verified} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} />
      <main style={{
        marginLeft: isRTL ? 0 : (sidebarCollapsed ? 72 : 240),
        marginRight: isRTL ? (sidebarCollapsed ? 72 : 240) : 0,
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        flex: 1, minWidth: 0, overflow: 'hidden', minHeight: '100vh', background: theme.bgPrimary, padding: 0,
      }}>
        <div style={{ background: theme.bgPrimary, minHeight: '100vh', padding: '28px 32px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="inner-page-header"><Header /></div>

            <h1 style={{ fontSize: 22, fontWeight: 700, color: theme.textPrimary, marginBottom: 24 }}>{t('settings.title')}</h1>

            {/* Card 1: Appearance */}
            <div style={{
              background: theme.cardBg,
              border: `1px solid ${theme.border}`,
              borderRadius: 16,
              padding: 28,
              boxShadow: theme.shadow,
              marginBottom: 20,
            }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary, marginBottom: 20 }}>{t('settings.appearance')}</h2>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: theme.textPrimary, marginBottom: 4 }}>{t('settings.darkMode')}</p>
                  <p style={{ fontSize: 12, color: theme.textMuted }}>{t('settings.switchDarkTheme')}</p>
                </div>

                {/* Toggle switch */}
                <div
                  onClick={toggleTheme}
                  style={{
                    width: 48,
                    height: 24,
                    borderRadius: 12,
                    background: isDark ? '#7CFF01' : '#E2E8F0',
                    transition: 'background 0.2s',
                    cursor: 'pointer',
                    position: 'relative',
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: '#fff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    position: 'absolute',
                    top: 2,
                    left: 0,
                    transform: isDark ? 'translateX(26px)' : 'translateX(2px)',
                    transition: 'transform 0.2s',
                  }} />
                </div>
              </div>
            </div>

            {/* Card 2: Language & Region */}
            <div style={{
              background: theme.cardBg,
              border: `1px solid ${theme.border}`,
              borderRadius: 16,
              padding: 28,
              boxShadow: theme.shadow,
              marginBottom: 20,
            }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary, marginBottom: 20 }}>{t('settings.languageRegion')}</h2>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: theme.textPrimary, marginBottom: 4 }}>{t('settings.language')}</p>
                  <p style={{ fontSize: 12, color: theme.textMuted }}>{t('settings.switchLanguage')}</p>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => setLang('en')} style={pillStyle(lang === 'en')}>
                    EN
                  </button>
                  <button onClick={() => setLang('ar')} style={pillStyle(lang === 'ar')}>
                    عربية
                  </button>
                </div>
              </div>
            </div>
            {/* Card 3: Account */}
            <div style={{
              background: theme.cardBg,
              border: `1px solid ${theme.border}`,
              borderRadius: 16,
              padding: 28,
              boxShadow: theme.shadow,
              marginBottom: 20,
            }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary, marginBottom: 20 }}>{t('settings.account' as any) || 'Account'}</h2>

              {/* Switch Profile */}
              <div
                onClick={() => {/* switch profile action */}}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 0', cursor: 'pointer',
                  borderBottom: `1px solid ${theme.borderLight}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, background: 'rgba(37,99,235,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <ArrowLeftRight size={18} color="#2563EB" />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: theme.textPrimary, marginBottom: 2 }}>{t('nav.switchProfile')}</p>
                    <p style={{ fontSize: 12, color: theme.textMuted }}>{t('settings.switchProfileDesc' as any) || 'Switch to another business profile'}</p>
                  </div>
                </div>
                {isRTL ? <ChevronLeft size={18} color={theme.textMuted} /> : <ChevronRight size={18} color={theme.textMuted} />}
              </div>

              {/* Sign Out */}
              <div
                onClick={() => navigate('/login')}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 0', cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, background: 'rgba(239,68,68,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <LogOut size={18} color="#EF4444" />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: '#EF4444', marginBottom: 2 }}>{t('settings.signOut' as any) || 'Sign Out'}</p>
                    <p style={{ fontSize: 12, color: theme.textMuted }}>{t('settings.signOutDesc' as any) || 'Log out of your account'}</p>
                  </div>
                </div>
                {isRTL ? <ChevronLeft size={18} color={theme.textMuted} /> : <ChevronRight size={18} color={theme.textMuted} />}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </main>
      <FloatingHelpButton />
      <MobileTabBar />
    </div>
  )
}
