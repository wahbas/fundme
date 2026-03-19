import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import LoanApplication from './pages/LoanApplication.tsx'
import RequestFinancing from './pages/RequestFinancing.tsx'
import Onboarding from './pages/Onboarding.tsx'
import Register from './pages/Register.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/apply" element={<LoanApplication />} />
        <Route path="/request-financing" element={<RequestFinancing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/register/*" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
