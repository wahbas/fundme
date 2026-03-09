import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import ProgressStepper from '../components/loan/ProgressStepper'
import StepLoanDetails from '../components/loan/StepLoanDetails'
import StepBusinessInfo from '../components/loan/StepBusinessInfo'
import StepFinancialInfo from '../components/loan/StepFinancialInfo'
import StepDocuments from '../components/loan/StepDocuments'
import StepReview from '../components/loan/StepReview'
import SuccessScreen from '../components/loan/SuccessScreen'
import FormNavigation from '../components/loan/FormNavigation'

export default function LoanApplication() {
  const [currentStep, setCurrentStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const totalSteps = 5
  const navigate = useNavigate()

  function handleSubmit() {
    setSubmitted(true)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar verified collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((c) => !c)} />
      <main
        style={{
          marginLeft: sidebarCollapsed ? 56 : 192,
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          flex: 1,
          minHeight: '100vh',
          padding: 20,
          background: 'linear-gradient(135deg, #001233 0%, #0052B9 100%)',
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 24,
            minHeight: 'calc(100vh - 40px)',
            padding: '28px 32px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {submitted ? (
            <SuccessScreen onBackToDashboard={() => navigate('/')} />
          ) : (
            <>
              <div style={{ flex: 1 }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
                  <div>
                    <button
                      onClick={() => navigate('/')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        color: '#888',
                        fontSize: 14,
                        marginBottom: 8,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <ArrowLeft size={20} />
                      Back to Dashboard
                    </button>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111' }}>Apply for Financing</h1>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 13, color: '#999' }}>Application ID</p>
                    <p style={{ fontFamily: 'monospace', color: '#111', fontWeight: 600 }}>#APP-2025-00142</p>
                  </div>
                </div>

                {/* Progress Stepper */}
                <ProgressStepper currentStep={currentStep} />

                {/* Form Content */}
                <div style={{ maxWidth: 720, margin: '32px auto 0' }}>
                  {currentStep === 1 && <StepLoanDetails />}
                  {currentStep === 2 && <StepBusinessInfo />}
                  {currentStep === 3 && <StepFinancialInfo />}
                  {currentStep === 4 && <StepDocuments />}
                  {currentStep === 5 && <StepReview />}
                </div>
              </div>

              {/* Navigation Buttons */}
              <FormNavigation
                currentStep={currentStep}
                totalSteps={totalSteps}
                onNext={() => setCurrentStep((s) => Math.min(s + 1, totalSteps))}
                onBack={() => setCurrentStep((s) => Math.max(s - 1, 1))}
                onSubmit={handleSubmit}
              />
            </>
          )}
        </div>
      </main>
    </div>
  )
}
