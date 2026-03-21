import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
    <I18nProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
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
      </Routes>
    </BrowserRouter>
    </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
)
