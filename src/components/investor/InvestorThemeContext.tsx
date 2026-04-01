import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface InvestorTheme {
  // Mode
  isDark: boolean
  isVip: boolean

  // Page backgrounds
  pageBg: string

  // Card styling
  cardBg: string
  cardBorder: string
  cardShadow: string
  cardRadius: string
  cardBlur: string
  cardBeforeDisplay: string

  // Text
  textPrimary: string
  textSecondary: string
  textTertiary: string
  textHeading: string

  // Brand colors (same in both themes)
  blue: string
  navy: string
  green: string
  lime: string
  red: string

  // Gold (VIP)
  gold300: string
  gold400: string
  gold500: string
  gold600: string

  // UI elements
  borderColor: string
  hoverBg: string
  inputBg: string
  inputBorder: string
  buttonBg: string
  buttonBorder: string
  buttonText: string
  investBtnBg: string
  investBtnText: string

  // Sidebar
  sidebarBg: string
  navText: string
  navActiveText: string
  navActiveBg: string
  navHoverBg: string

  // Topbar
  topbarBg: string

  // Chart
  chartGrid: string
  chartAxisText: string
  chartAreaFill: string

  // Progress bar
  progressBg: string
  progressFill: string

  // Badges
  badgeTrendingBg: string
  badgeTrendingText: string
  badgeNewBg: string
  badgeNewText: string
  badgeHotBg: string
  badgeHotText: string

  // Scrollbar
  scrollbarThumb: string
}

// Dark theme base
const darkThemeBase: InvestorTheme = {
  isDark: true,
  isVip: false,
  pageBg: 'linear-gradient(110.9deg, #000000 2.8%, #0052B9 245.19%)',
  cardBg: 'rgba(0, 48, 107, 0.2)',
  cardBorder: 'rgba(255,255,255,0.14)',
  cardShadow: 'none',
  cardRadius: '30px',
  cardBlur: 'blur(32px)',
  cardBeforeDisplay: 'block',
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.45)',
  textTertiary: 'rgba(255,255,255,0.3)',
  textHeading: '#ffffff',
  blue: '#0D82F9',
  navy: '#002E83',
  green: '#2DD4A0',
  lime: '#34D399',
  red: '#F75555',
  gold300: '#E8C872',
  gold400: '#D4A843',
  gold500: '#C4922A',
  gold600: '#A67B1E',
  borderColor: 'rgba(255,255,255,0.14)',
  hoverBg: 'rgba(13,130,249,0.1)',
  inputBg: 'rgba(0, 48, 107, 0.2)',
  inputBorder: 'rgba(255,255,255,0.14)',
  buttonBg: '#0D82F9',
  buttonBorder: 'rgba(255,255,255,0.14)',
  buttonText: '#ffffff',
  investBtnBg: '#fff',
  investBtnText: '#0a0a0a',
  sidebarBg: 'transparent',
  navText: '#8c94a6',
  navActiveText: '#fff',
  navActiveBg: 'rgba(13,130,249,0.1)',
  navHoverBg: 'rgba(13,130,249,0.05)',
  topbarBg: 'rgba(0, 0, 0, 0.3)',
  chartGrid: 'rgba(255,255,255,0.06)',
  chartAxisText: 'rgba(255,255,255,0.45)',
  chartAreaFill: 'rgba(13,130,249,0.1)',
  progressBg: 'repeating-linear-gradient(-45deg, rgba(13,130,249,0.15), rgba(13,130,249,0.15) 4px, rgba(13,130,249,0.06) 4px, rgba(13,130,249,0.06) 8px)',
  progressFill: '#0D82F9',
  badgeTrendingBg: 'rgba(45,212,160,0.2)',
  badgeTrendingText: '#2DD4A0',
  badgeNewBg: 'rgba(13,130,249,0.2)',
  badgeNewText: '#0D82F9',
  badgeHotBg: 'rgba(247,85,85,0.2)',
  badgeHotText: '#F75555',
  scrollbarThumb: 'rgba(255,255,255,0.2)',
}

// Light theme base
const lightThemeBase: InvestorTheme = {
  isDark: false,
  isVip: false,
  pageBg: '#F5F7FA',
  cardBg: '#FFFFFF',
  cardBorder: '#E8ECF2',
  cardShadow: '0 1px 3px rgba(0,20,60,0.06), 0 4px 16px rgba(0,20,60,0.04)',
  cardRadius: '20px',
  cardBlur: 'none',
  cardBeforeDisplay: 'none',
  textPrimary: '#1a2332',
  textSecondary: '#8a9aae',
  textTertiary: '#5a6a7e',
  textHeading: '#1a2332',
  blue: '#0D82F9',
  navy: '#002E83',
  green: '#0E9F6E',
  lime: '#34D399',
  red: '#F75555',
  gold300: '#E8C872',
  gold400: '#D4A843',
  gold500: '#C4922A',
  gold600: '#A67B1E',
  borderColor: '#E8ECF2',
  hoverBg: '#F5F7FA',
  inputBg: '#FFFFFF',
  inputBorder: '#E8ECF2',
  buttonBg: '#0D82F9',
  buttonBorder: '#E8ECF2',
  buttonText: '#ffffff',
  investBtnBg: '#0D82F9',
  investBtnText: '#fff',
  sidebarBg: '#FFFFFF',
  navText: '#8a9aae',
  navActiveText: '#0D82F9',
  navActiveBg: 'rgba(13,130,249,0.08)',
  navHoverBg: 'rgba(13,130,249,0.04)',
  topbarBg: '#FFFFFF',
  chartGrid: 'rgba(0,20,60,0.06)',
  chartAxisText: '#8a9aae',
  chartAreaFill: 'rgba(13,130,249,0.08)',
  progressBg: 'repeating-linear-gradient(-45deg, rgba(13,130,249,0.08), rgba(13,130,249,0.08) 4px, rgba(13,130,249,0.04) 4px, rgba(13,130,249,0.04) 8px)',
  progressFill: '#0D82F9',
  badgeTrendingBg: 'rgba(14,159,110,0.1)',
  badgeTrendingText: '#0E9F6E',
  badgeNewBg: 'rgba(13,130,249,0.1)',
  badgeNewText: '#0D82F9',
  badgeHotBg: 'rgba(247,85,85,0.1)',
  badgeHotText: '#F75555',
  scrollbarThumb: 'rgba(0,0,0,0.2)',
}

// VIP theme overrides
function applyVipOverrides(theme: InvestorTheme): InvestorTheme {
  return {
    ...theme,
    isVip: true,
    green: theme.gold500,
    navActiveBg: theme.isDark ? `rgba(212, 168, 67, 0.15)` : `rgba(212, 168, 67, 0.08)`,
    investBtnBg: theme.isDark
      ? 'linear-gradient(135deg, #D4A843 0%, #E8C872 100%)'
      : 'linear-gradient(135deg, #C4922A 0%, #D4A843 100%)',
    progressFill: theme.gold500,
    badgeTrendingBg: theme.isDark ? 'rgba(212, 168, 67, 0.2)' : 'rgba(212, 168, 67, 0.1)',
    badgeTrendingText: theme.gold400,
  }
}

interface InvestorThemeContextValue {
  theme: InvestorTheme
  isDark: boolean
  isVip: boolean
  toggleTheme: () => void
  toggleVip: () => void
}

const InvestorThemeContext = createContext<InvestorThemeContextValue>({
  theme: lightThemeBase,
  isDark: false,
  isVip: false,
  toggleTheme: () => {},
  toggleVip: () => {},
})

export function InvestorThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('fundme-investor-dark-mode') === 'true')
  const [isVip, setIsVip] = useState(() => localStorage.getItem('fundme-investor-vip-mode') === 'true')

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-investor-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-investor-theme')
    }
  }, [isDark])

  useEffect(() => {
    if (isVip) {
      document.documentElement.setAttribute('data-investor-vip', 'true')
    } else {
      document.documentElement.removeAttribute('data-investor-vip')
    }
  }, [isVip])

  function toggleTheme() {
    setIsDark(prev => {
      const next = !prev
      localStorage.setItem('fundme-investor-dark-mode', String(next))
      return next
    })
  }

  function toggleVip() {
    setIsVip(prev => {
      const next = !prev
      localStorage.setItem('fundme-investor-vip-mode', String(next))
      return next
    })
  }

  const baseTheme = isDark ? darkThemeBase : lightThemeBase
  const theme = isVip ? applyVipOverrides(baseTheme) : baseTheme

  return (
    <InvestorThemeContext.Provider value={{ theme, isDark, isVip, toggleTheme, toggleVip }}>
      {children}
    </InvestorThemeContext.Provider>
  )
}

export function useInvestorTheme() {
  return useContext(InvestorThemeContext)
}
