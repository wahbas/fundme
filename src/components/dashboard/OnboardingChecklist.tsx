import { useNavigate } from 'react-router-dom'
import { CheckCircle2, ShieldCheck, Building2, Landmark, FileUp, UserPlus } from 'lucide-react'
import { motion } from 'framer-motion'

interface StepProps {
  icon: React.ElementType
  title: string
  description: string
  status: 'completed' | 'current' | 'pending'
  timeLabel?: string
  actionLabel?: string
  iconGradient?: string
  onAction?: () => void
  index: number
}

function Step({ icon: Icon, title, description, status, timeLabel, actionLabel, iconGradient, onAction, index }: StepProps) {
  const isCompleted = status === 'completed'
  const isCurrent = status === 'current'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '14px 16px',
        borderRadius: 12,
        borderLeft: `4px solid ${isCompleted ? '#22C55E' : isCurrent ? '#0D82F9' : 'transparent'}`,
        background: isCompleted ? '#F0FDF4' : isCurrent ? '#EFF6FF' : 'transparent',
      }}
    >
      <div
        style={{
          width: 40, height: 40, borderRadius: '50%', flexShrink: 0, marginRight: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isCompleted ? '#22C55E' : isCurrent ? (iconGradient || 'linear-gradient(135deg, #0D82F9, #8B5CF6)') : '#F3F4F6',
        }}
      >
        {isCompleted ? (
          <CheckCircle2 size={20} color="#fff" />
        ) : (
          <Icon size={20} color={isCurrent ? '#fff' : '#9CA3AF'} />
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: status === 'pending' ? '#9CA3AF' : '#111', marginBottom: 2 }}>
          {title}
        </h4>
        <p style={{ fontSize: 12, color: status === 'pending' ? '#C4C4C4' : '#888' }}>{description}</p>
      </div>

      {isCompleted && (
        <span style={{ padding: '4px 12px', fontSize: 12, fontWeight: 500, color: '#15803D', background: '#DCFCE7', borderRadius: 6 }}>
          Completed
        </span>
      )}

      {isCurrent && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {timeLabel && (
            <span style={{ padding: '4px 12px', fontSize: 12, fontWeight: 500, color: '#0D82F9', border: '1px solid rgba(13,130,249,0.3)', borderRadius: 20 }}>
              {timeLabel}
            </span>
          )}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onAction}
            style={{
              padding: '8px 20px', fontSize: 13, fontWeight: 600, color: '#fff',
              background: '#002E83', borderRadius: 8, border: 'none', cursor: 'pointer',
            }}
          >
            {actionLabel}
          </motion.button>
        </div>
      )}

      {status === 'pending' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {timeLabel && (
            <span style={{ padding: '4px 12px', fontSize: 12, color: '#999', border: '1px solid #E5E7EB', borderRadius: 20 }}>
              {timeLabel}
            </span>
          )}
          <button
            style={{
              padding: '8px 20px', fontSize: 13, fontWeight: 500, color: '#999',
              border: '1px solid #D1D5DB', borderRadius: 8, background: 'transparent', cursor: 'default',
            }}
          >
            {actionLabel}
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default function OnboardingChecklist() {
  const navigate = useNavigate()

  const steps = [
    {
      icon: UserPlus,
      title: 'Create Account',
      description: 'Set up your FundMe profile',
      status: 'completed' as const,
      iconGradient: 'linear-gradient(135deg, #F472B6, #EC4899)',
    },
    {
      icon: ShieldCheck,
      title: 'Verify Your Identity',
      description: 'Nafath biometric verification',
      status: 'current' as const,
      timeLabel: '2 min',
      actionLabel: 'Verify Now',
      iconGradient: 'linear-gradient(135deg, #0D82F9, #6366F1)',
      stepId: 'verify-identity',
    },
    {
      icon: Building2,
      title: 'Verify Your Business',
      description: 'Connect your Commercial Registration',
      status: 'pending' as const,
      timeLabel: '3 min',
      actionLabel: 'Verify',
      iconGradient: 'linear-gradient(135deg, #06B6D4, #0D82F9)',
      stepId: 'verify-business',
    },
    {
      icon: Landmark,
      title: 'Connect Your Bank',
      description: 'Link your business bank account',
      status: 'pending' as const,
      timeLabel: 'Instant',
      actionLabel: 'Connect',
      iconGradient: 'linear-gradient(135deg, #0D82F9, #06B6D4)',
      stepId: 'connect-bank',
    },
    {
      icon: FileUp,
      title: 'Upload Documents',
      description: 'Add required business documents',
      status: 'pending' as const,
      timeLabel: '5 min',
      actionLabel: 'Upload',
      iconGradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
      stepId: 'upload-documents',
    },
  ]

  return (
    <section
      style={{
        background: '#fff',
        borderRadius: 16,
        padding: '28px 32px',
        marginBottom: 20,
        border: '1px solid #F0F0F0',
      }}
    >
      <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111', marginBottom: 4 }}>
        Complete Your Profile to Get Started
      </h3>
      <p style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>
        This helps us find the best financing options for you
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {steps.map((step, i) => (
          <Step
            key={step.title}
            index={i}
            icon={step.icon}
            title={step.title}
            description={step.description}
            status={step.status}
            timeLabel={step.timeLabel}
            actionLabel={step.actionLabel}
            iconGradient={step.iconGradient}
            onAction={'stepId' in step ? () => navigate(`/onboarding?step=${step.stepId}`) : undefined}
          />
        ))}
      </div>
    </section>
  )
}
