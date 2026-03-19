import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, TrendingUp, Handshake, CreditCard, Landmark } from 'lucide-react'
import type { SadadWizardData } from '../../../pages/RequestFinancing'

interface Props {
  data: SadadWizardData
  onChange: (p: Partial<SadadWizardData>) => void
}

interface QuestionDef {
  key: keyof SadadWizardData
  title: string
  subtitle: string
  icon: React.ReactNode
  options: { value: string; label: string; desc?: string }[]
}

const questions: QuestionDef[] = [
  {
    key: 'purpose',
    title: 'What is the purpose of financing?',
    subtitle: 'This helps us understand your needs',
    icon: <Target size={22} color="#fff" />,
    options: [
      { value: 'working-capital', label: 'Increase working capital', desc: 'Fund day-to-day operations' },
      { value: 'new-projects', label: 'Fund new projects', desc: 'Expand or launch new initiatives' },
      { value: 'repay', label: 'Repay existing obligations', desc: 'Settle existing debts' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    key: 'revenue',
    title: 'What is your annual revenue?',
    subtitle: 'Total revenue for the last 12 months (SAR)',
    icon: <TrendingUp size={22} color="#fff" />,
    options: [
      { value: '<1M', label: 'Less than 1M' },
      { value: '1-5M', label: '1M – 5M' },
      { value: '5-20M', label: '5M – 20M' },
      { value: '>20M', label: 'More than 20M' },
    ],
  },
  {
    key: 'contracts',
    title: 'Do you have active contracts?',
    subtitle: 'Current contracts or ongoing projects',
    icon: <Handshake size={22} color="#fff" />,
    options: [
      { value: 'gov', label: 'Yes — Government contracts' },
      { value: 'private', label: 'Yes — Private sector contracts' },
      { value: 'none', label: 'No active contracts' },
    ],
  },
  {
    key: 'debt',
    title: 'Any current debt obligations?',
    subtitle: 'Outstanding loans or credit facilities',
    icon: <CreditCard size={22} color="#fff" />,
    options: [
      { value: 'none', label: 'None' },
      { value: 'short', label: 'Short-term', desc: 'Less than 1 year' },
      { value: 'long', label: 'Long-term', desc: 'More than 1 year' },
      { value: 'both', label: 'Both', desc: 'Short and long-term' },
    ],
  },
  {
    key: 'bankBalance',
    title: 'Average bank balance?',
    subtitle: 'Average balance for the last 12 months (SAR)',
    icon: <Landmark size={22} color="#fff" />,
    options: [
      { value: '<500K', label: 'Less than 500K' },
      { value: '500K-2M', label: '500K – 2M' },
      { value: '>2M', label: 'More than 2M' },
    ],
  },
]

export default function SadadBusinessProfile({ data, onChange }: Props) {
  const [qIdx, setQIdx] = useState(() => {
    const firstUnanswered = questions.findIndex((q) => !data[q.key])
    return firstUnanswered === -1 ? questions.length - 1 : firstUnanswered
  })
  const [dir, setDir] = useState(1)

  const q = questions[qIdx]
  const total = questions.length
  const answered = questions.filter((qq) => Boolean(data[qq.key])).length

  function select(value: string) {
    onChange({ [q.key]: value })
    if (qIdx < total - 1) {
      setTimeout(() => {
        setDir(1)
        setQIdx((i) => i + 1)
      }, 350)
    }
  }

  function goTo(idx: number) {
    setDir(idx > qIdx ? 1 : -1)
    setQIdx(idx)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 480 }}>
      {/* Question dots + counter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {questions.map((qq, i) => {
            const isAnswered = Boolean(data[qq.key])
            const isActive = i === qIdx
            return (
              <button
                key={qq.key}
                onClick={() => goTo(i)}
                style={{
                  width: isActive ? 28 : 10,
                  height: 10,
                  borderRadius: 5,
                  background: isActive
                    ? '#2563EB'
                    : isAnswered
                      ? '#2563EB'
                      : '#E2E8F0',
                  opacity: isActive ? 1 : isAnswered ? 0.4 : 1,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  padding: 0,
                }}
              />
            )
          })}
        </div>
        <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>
          {qIdx + 1} / {total}
        </span>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={qIdx}
          initial={{ opacity: 0, y: dir * 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: dir * -30 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          {/* Icon + Title */}
          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                width: 48, height: 48, borderRadius: 14,
                background: '#2563EB',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20, boxShadow: '0 4px 16px rgba(37,99,235,0.25)',
              }}
            >
              {q.icon}
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
              {q.title}
            </h2>
            <p style={{ fontSize: 14, color: '#94A3B8' }}>{q.subtitle}</p>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((opt, i) => {
              const isSelected = data[q.key] === opt.value
              return (
                <motion.button
                  key={opt.value}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => select(opt.value)}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    width: '100%', padding: '16px 20px',
                    borderRadius: 12,
                    border: isSelected ? '2px solid #2563EB' : '1px solid #E2E8F0',
                    background: isSelected ? 'rgba(37,99,235,0.04)' : '#fff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s',
                    boxShadow: isSelected ? '0 0 0 3px rgba(37,99,235,0.08)' : '0 1px 3px rgba(0,0,0,0.03)',
                  }}
                >
                  {/* Key badge */}
                  <div style={{
                    width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                    background: isSelected ? '#2563EB' : '#F8FAFC',
                    border: isSelected ? 'none' : '1px solid #E2E8F0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700,
                    color: isSelected ? '#fff' : '#94A3B8',
                    transition: 'all 0.15s',
                  }}>
                    {String.fromCharCode(65 + i)}
                  </div>

                  <div style={{ flex: 1 }}>
                    <span style={{
                      fontSize: 14, fontWeight: isSelected ? 600 : 500,
                      color: isSelected ? '#2563EB' : '#0F172A',
                      display: 'block',
                    }}>
                      {opt.label}
                    </span>
                    {opt.desc && (
                      <span style={{ fontSize: 12, color: '#94A3B8', marginTop: 2, display: 'block' }}>
                        {opt.desc}
                      </span>
                    )}
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        width: 22, height: 22, borderRadius: '50%',
                        background: '#2563EB',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {answered === total && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: 'center', marginTop: 32,
            fontSize: 13, color: '#10B981', fontWeight: 500,
          }}
        >
          All questions answered — click Continue to proceed
        </motion.p>
      )}
    </div>
  )
}
