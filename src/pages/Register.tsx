import { Routes, Route, Navigate } from 'react-router-dom'
import RegisterLayout from './register/RegisterLayout'
import PhoneScreen from './register/PhoneScreen'
import OTPScreen from './register/OTPScreen'
import BasicInfoScreen from './register/BasicInfoScreen'
import NafathScreen from './register/NafathScreen'

export default function Register() {
  return (
    <Routes>
      <Route element={<RegisterLayout />}>
        <Route index element={<PhoneScreen />} />
        <Route path="verify-otp" element={<OTPScreen />} />
        <Route path="info" element={<BasicInfoScreen />} />
        <Route path="verify-identity" element={<NafathScreen />} />
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Route>
    </Routes>
  )
}
