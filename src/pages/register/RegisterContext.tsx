import { createContext, useContext, useState, type ReactNode } from 'react'

interface RegisterData {
  phone: string
  nationalId: string
  email: string
}

interface RegisterContextValue {
  data: RegisterData
  setPhone: (phone: string) => void
  setBasicInfo: (info: { nationalId: string; email: string }) => void
}

const RegisterContext = createContext<RegisterContextValue | null>(null)

export function RegisterProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<RegisterData>({ phone: '', nationalId: '', email: '' })

  return (
    <RegisterContext.Provider
      value={{
        data,
        setPhone: (phone) => setData((p) => ({ ...p, phone })),
        setBasicInfo: (info) => setData((p) => ({ ...p, ...info })),
      }}
    >
      {children}
    </RegisterContext.Provider>
  )
}

export function useRegister() {
  const ctx = useContext(RegisterContext)
  if (!ctx) throw new Error('useRegister must be used within RegisterProvider')
  return ctx
}
