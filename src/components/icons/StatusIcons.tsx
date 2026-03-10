import { motion } from 'framer-motion'

interface IconProps {
  size?: number
}

export function CelebrationIcon({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="12" fill="#10B981" />
      <path d="M9 14.5L12.5 18L19 10.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Sparkle accents */}
      <path d="M24 4L25 6.5L27.5 5L25.5 7.5L24 4Z" fill="#2563EB" opacity="0.6" />
      <circle cx="3" cy="8" r="1.5" fill="#93C5FD" opacity="0.5" />
      <circle cx="25" cy="22" r="1" fill="#93C5FD" opacity="0.4" />
    </svg>
  )
}

export function SubmittedStepIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" fill="#10B981" />
      <path d="M10 16.5L14 20.5L22 12.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function InReviewStepIcon({ size = 32 }: IconProps) {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* Pulse ring */}
      <motion.div
        animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2px solid #2563EB',
        }}
      />
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ position: 'relative', zIndex: 1 }}>
        <circle cx="16" cy="16" r="14" fill="#2563EB" />
        {/* Magnifying glass */}
        <circle cx="14" cy="14" r="5" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M18 18L22 22" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function DecisionStepIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke="#CBD5E1" strokeWidth="1.5" fill="none" />
      {/* Flag */}
      <path d="M13 10V22" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 10H20L17.5 13.5L20 17H13" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function StatusDocIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="2" width="14" height="18" rx="2" stroke="#2563EB" strokeWidth="1.5" />
      <path d="M9 7H15" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 11H15" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 15H12" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
