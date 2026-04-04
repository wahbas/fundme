import { createContext, useContext, useState, type ReactNode } from 'react'

interface InvestorRegisterData {
  investorType: 'individual' | 'institutional' | null
  phone: string
  otp: string
  nationalId: string
  email: string
  password: string
  nafathStatus: 'pending' | 'verified' | 'failed'
  nafathNumber: string
  currentStep: number
}

interface InvestorRegisterContextValue {
  data: InvestorRegisterData
  setInvestorType: (type: 'individual' | 'institutional') => void
  setPhone: (phone: string) => void
  setOtp: (otp: string) => void
  setNationalId: (id: string) => void
  setEmail: (email: string) => void
  setPassword: (pw: string) => void
  setNafathStatus: (status: 'pending' | 'verified' | 'failed') => void
  setNafathNumber: (num: string) => void
  setCurrentStep: (step: number) => void
  reset: () => void
}

const defaultData: InvestorRegisterData = {
  investorType: null,
  phone: '',
  otp: '',
  nationalId: '',
  email: '',
  password: '',
  nafathStatus: 'pending',
  nafathNumber: '',
  currentStep: 0,
}

const InvestorRegisterContext = createContext<InvestorRegisterContextValue | null>(null)

export function InvestorRegisterProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<InvestorRegisterData>({ ...defaultData })

  return (
    <InvestorRegisterContext.Provider
      value={{
        data,
        setInvestorType: (type) => setData((p) => ({ ...p, investorType: type })),
        setPhone: (phone) => setData((p) => ({ ...p, phone })),
        setOtp: (otp) => setData((p) => ({ ...p, otp })),
        setNationalId: (id) => setData((p) => ({ ...p, nationalId: id })),
        setEmail: (email) => setData((p) => ({ ...p, email })),
        setPassword: (pw) => setData((p) => ({ ...p, password: pw })),
        setNafathStatus: (status) => setData((p) => ({ ...p, nafathStatus: status })),
        setNafathNumber: (num) => setData((p) => ({ ...p, nafathNumber: num })),
        setCurrentStep: (step) => setData((p) => ({ ...p, currentStep: step })),
        reset: () => setData({ ...defaultData }),
      }}
    >
      {children}
    </InvestorRegisterContext.Provider>
  )
}

export function useInvestorRegister() {
  const ctx = useContext(InvestorRegisterContext)
  if (!ctx) throw new Error('useInvestorRegister must be used within InvestorRegisterProvider')
  return ctx
}
