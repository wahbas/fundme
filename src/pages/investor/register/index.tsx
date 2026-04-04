import { Routes, Route, Navigate } from 'react-router-dom'
import InvestorRegisterLayout from './InvestorRegisterLayout'
import InvestorTypeScreen from './InvestorTypeScreen'
import InvestorPhoneScreen from './InvestorPhoneScreen'
import InvestorOTPScreen from './InvestorOTPScreen'
import InvestorNationalIdScreen from './InvestorNationalIdScreen'
import InvestorPasswordScreen from './InvestorPasswordScreen'
import InvestorNafathScreen from './InvestorNafathScreen'

export default function InvestorRegister() {
  return (
    <Routes>
      <Route element={<InvestorRegisterLayout />}>
        <Route index element={<InvestorTypeScreen />} />
        <Route path="phone" element={<InvestorPhoneScreen />} />
        <Route path="verify-otp" element={<InvestorOTPScreen />} />
        <Route path="national-id" element={<InvestorNationalIdScreen />} />
        <Route path="password" element={<InvestorPasswordScreen />} />
        <Route path="verify-identity" element={<InvestorNafathScreen />} />
        <Route path="*" element={<Navigate to="/investor/register" replace />} />
      </Route>
    </Routes>
  )
}
