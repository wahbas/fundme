import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import '@emran-alhaddad/saudi-riyal-font/index.css'
import { ThemeProvider } from './ThemeContext'
import { I18nProvider } from './i18n'
import App from './App.tsx'
import LoanApplication from './pages/LoanApplication.tsx'
import RequestFinancing from './pages/RequestFinancing.tsx'
import Onboarding from './pages/Onboarding.tsx'
import Register from './pages/Register.tsx'
import MyLoans from './pages/MyLoans.tsx'
import DataHub from './pages/DataHub.tsx'
import MyProfile from './pages/MyProfile.tsx'
import LoanDetails from './pages/LoanDetails.tsx'
import Login from './pages/Login.tsx'
import Notifications from './pages/Notifications.tsx'
import Settings from './pages/Settings.tsx'
import ForgotPassword from './pages/ForgotPassword.tsx'
import { InvestorThemeProvider } from './components/investor/InvestorThemeContext.tsx'
import InvestorDashboard from './pages/investor/InvestorDashboard.tsx'
import InvestorOpportunities from './pages/investor/InvestorOpportunities.tsx'
import InvestorPortfolio from './pages/investor/InvestorPortfolio.tsx'
import InvestorWallet from './pages/investor/InvestorWallet.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
    <I18nProvider>
    <BrowserRouter>
      <Routes>
        {/* Borrower routes */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register/*" element={<Register />} />
        <Route path="/dashboard" element={<App />} />
        <Route path="/apply" element={<LoanApplication />} />
        <Route path="/request-financing" element={<RequestFinancing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/my-loans" element={<MyLoans />} />
        <Route path="/my-loans/:loanId" element={<LoanDetails />} />
        <Route path="/data-hub" element={<DataHub />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />

        {/* Investor routes */}
        <Route path="/investor" element={<InvestorThemeProvider><InvestorDashboard /></InvestorThemeProvider>} />
        <Route path="/investor/opportunities" element={<InvestorThemeProvider><InvestorOpportunities /></InvestorThemeProvider>} />
        <Route path="/investor/portfolio" element={<InvestorThemeProvider><InvestorPortfolio /></InvestorThemeProvider>} />
        <Route path="/investor/wallet" element={<InvestorThemeProvider><InvestorWallet /></InvestorThemeProvider>} />
      </Routes>
    </BrowserRouter>
    </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
)
