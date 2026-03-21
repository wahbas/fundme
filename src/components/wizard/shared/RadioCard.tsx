import { motion } from 'framer-motion'
import { useTheme } from '../../../ThemeContext'

interface RadioCardProps {
  selected: boolean
  onClick: () => void
  label: string
  description?: string
}

export default function RadioCard({ selected, onClick, label, description }: RadioCardProps) {
  const { theme } = useTheme()
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        width: '100%',
        padding: '14px 18px',
        borderRadius: 12,
        border: `2px solid ${selected ? '#0D82F9' : theme.border}`,
        background: selected ? 'rgba(13,130,249,0.05)' : theme.cardBg,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'border-color 0.2s, background 0.2s',
      }}
    >
      {/* Custom radio */}
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          border: `2px solid ${selected ? '#0D82F9' : '#D1D5DB'}`,
          background: selected ? '#0D82F9' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.2s',
        }}
      >
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }}
          />
        )}
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 500, color: theme.textPrimary, marginBottom: description ? 2 : 0 }}>{label}</p>
        {description && <p style={{ fontSize: 13, color: theme.textMuted }}>{description}</p>}
      </div>
    </motion.button>
  )
}
