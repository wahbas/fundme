import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import FloatingHelpButton from '../components/dashboard/FloatingHelpButton'
import { useTheme } from '../ThemeContext'

export default function Settings() {
  const [searchParams] = useSearchParams()
  const stateParam = searchParams.get('state')
  const verified = stateParam === 'verified' || searchParams.get('verified') === 'true'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const { theme, isDark, toggleTheme } = useTheme()
  const [language, setLanguage] = useState<'en' | 'ar'>(() => (localStorage.getItem('fundme-language') as 'en' | 'ar') || 'en')

  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr')
  }, [language])

  function handleLanguageChange(lang: 'en' | 'ar') {
    setLanguage(lang)
    localStorage.setItem('fundme-language', lang)
  }

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
        marginLeft: sidebarCollapsed ? 72 : 240,
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        flex: 1, minWidth: 0, overflow: 'hidden', minHeight: '100vh', background: theme.bgPrimary, padding: 0,
      }}>
        <div style={{ background: theme.bgPrimary, minHeight: '100vh', padding: '28px 32px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Header />

            <h1 style={{ fontSize: 22, fontWeight: 700, color: theme.textPrimary, marginBottom: 24 }}>Settings</h1>

            {/* Card 1: Appearance */}
            <div style={{
              background: theme.cardBg,
              border: `1px solid ${theme.border}`,
              borderRadius: 16,
              padding: 28,
              boxShadow: theme.shadow,
              marginBottom: 20,
            }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary, marginBottom: 20 }}>Appearance</h2>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: theme.textPrimary, marginBottom: 4 }}>Dark Mode</p>
                  <p style={{ fontSize: 12, color: theme.textMuted }}>Switch to dark theme</p>
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
              <h2 style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary, marginBottom: 20 }}>Language &amp; Region</h2>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: theme.textPrimary, marginBottom: 4 }}>Language</p>
                  <p style={{ fontSize: 12, color: theme.textMuted }}>Switch between English and Arabic</p>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => handleLanguageChange('en')} style={pillStyle(language === 'en')}>
                    EN
                  </button>
                  <button onClick={() => handleLanguageChange('ar')} style={pillStyle(language === 'ar')}>
                    عربية
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </main>
      <FloatingHelpButton />
    </div>
  )
}
