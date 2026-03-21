import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface Theme {
  // Backgrounds
  bgPrimary: string
  bgCard: string
  bgInput: string
  bgHover: string
  bgPage: string
  // Text
  textPrimary: string
  textSecondary: string
  textMuted: string
  textHeading: string
  // Borders
  border: string
  borderLight: string
  // Sidebar
  sidebarBg: string
  sidebarHover: string
  // Shadows
  shadow: string
  shadowMd: string
  // Specific
  cardBg: string
  cardBorder: string
  inputBg: string
  inputBorder: string
  inputFocusBorder: string
  // Status (unchanged across themes)
  blue: string
  green: string
  red: string
  orange: string
  ctaGreen: string
  // Mode flag
  isDark: boolean
}

const lightTheme: Theme = {
  bgPrimary: '#F8FAFC',
  bgCard: '#FFFFFF',
  bgInput: '#F8FAFC',
  bgHover: '#F1F5F9',
  bgPage: '#F8FAFC',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  textHeading: '#0F172A',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  sidebarBg: '#1B2A3D',
  sidebarHover: 'rgba(255,255,255,0.08)',
  shadow: '0 1px 3px rgba(0,0,0,0.04)',
  shadowMd: '0 4px 16px rgba(0,0,0,0.06)',
  cardBg: '#FFFFFF',
  cardBorder: '#E2E8F0',
  inputBg: '#F8FAFC',
  inputBorder: '#F1F5F9',
  inputFocusBorder: '#2563EB',
  blue: '#2563EB',
  green: '#10B981',
  red: '#EF4444',
  orange: '#F59E0B',
  ctaGreen: '#7CFF01',
  isDark: false,
}

const darkTheme: Theme = {
  bgPrimary: '#0F172A',
  bgCard: '#1E293B',
  bgInput: '#1E293B',
  bgHover: '#334155',
  bgPage: '#0F172A',
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  textHeading: '#F1F5F9',
  border: '#334155',
  borderLight: '#1E293B',
  sidebarBg: '#0B1120',
  sidebarHover: 'rgba(255,255,255,0.06)',
  shadow: '0 1px 3px rgba(0,0,0,0.2)',
  shadowMd: '0 4px 16px rgba(0,0,0,0.3)',
  cardBg: '#1E293B',
  cardBorder: '#334155',
  inputBg: '#0F172A',
  inputBorder: '#334155',
  inputFocusBorder: '#3B82F6',
  blue: '#3B82F6',
  green: '#10B981',
  red: '#EF4444',
  orange: '#F59E0B',
  ctaGreen: '#7CFF01',
  isDark: true,
}

interface ThemeContextValue {
  theme: Theme
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('fundme-dark-mode') === 'true')

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [isDark])

  function toggleTheme() {
    setIsDark(prev => {
      const next = !prev
      localStorage.setItem('fundme-dark-mode', String(next))
      return next
    })
  }

  const theme = isDark ? darkTheme : lightTheme

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
