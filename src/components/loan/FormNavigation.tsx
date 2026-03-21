import { ArrowLeft, ArrowRight, Send } from 'lucide-react'
import { useTheme } from '../../ThemeContext'

interface FormNavigationProps {
  currentStep: number
  totalSteps: number
  onNext: () => void
  onBack: () => void
  onSubmit: () => void
}

export default function FormNavigation({ currentStep, totalSteps, onNext, onBack, onSubmit }: FormNavigationProps) {
  const { theme } = useTheme()
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        paddingTop: 24,
        borderTop: `1px solid ${theme.borderLight}`,
      }}
    >
      {currentStep > 1 ? (
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 24px',
            color: theme.textSecondary,
            fontSize: 14,
            fontWeight: 500,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={20} />
          Previous
        </button>
      ) : (
        <div />
      )}

      {currentStep < totalSteps ? (
        <button
          onClick={onNext}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 32px',
            background: '#002E83',
            color: '#fff',
            fontWeight: 600,
            fontSize: 14,
            borderRadius: 12,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Continue
          <ArrowRight size={20} />
        </button>
      ) : (
        <button
          onClick={onSubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 32px',
            background: '#80FF00',
            color: '#002E83',
            fontWeight: 700,
            fontSize: 14,
            borderRadius: 12,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Submit Application
          <Send size={20} />
        </button>
      )}
    </div>
  )
}
