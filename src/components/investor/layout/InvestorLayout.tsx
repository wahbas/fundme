import { useInvestorTheme } from '../InvestorThemeContext'
import InvestorSidebar from './InvestorSidebar'
import InvestorTopbar from './InvestorTopbar'

interface InvestorLayoutProps {
  children: React.ReactNode
  activeTab: 'dashboard' | 'opportunities' | 'portfolio' | 'wallet'
  userName?: string
  tier?: 'BASIC' | 'VIP'
}

export default function InvestorLayout({
  children,
  activeTab,
  userName,
  tier,
}: InvestorLayoutProps) {
  const { theme } = useInvestorTheme()

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '220px 1fr',
        gridTemplateRows: 'auto 1fr',
        height: '100vh',
        width: '100%',
        background: theme.pageBg,
      }}
    >
      {/* Topbar spans full width */}
      <InvestorTopbar userName={userName} tier={tier} />

      {/* Sidebar */}
      <InvestorSidebar activeTab={activeTab} />

      {/* Main content area */}
      <main
        style={{
          gridColumn: '2',
          gridRow: '2',
          overflow: 'auto',
          padding: '0 32px 40px 24px',
          background: theme.pageBg,
          scrollBehavior: 'smooth',
          scrollbarWidth: 'thin',
          scrollbarColor: `${theme.scrollbarThumb} transparent`,
        }}
      >
        {children}
      </main>

      {/* Scrollbar styling for webkit browsers */}
      <style>{`
        [style*="overflow: auto"]::-webkit-scrollbar {
          width: 8px;
        }
        [style*="overflow: auto"]::-webkit-scrollbar-track {
          background: transparent;
        }
        [style*="overflow: auto"]::-webkit-scrollbar-thumb {
          background: ${theme.scrollbarThumb};
          border-radius: 4px;
        }
        [style*="overflow: auto"]::-webkit-scrollbar-thumb:hover {
          background: ${theme.isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'};
        }
      `}</style>
    </div>
  )
}
