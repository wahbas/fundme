import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../../../ThemeContext'

interface ReviewSectionProps {
  title: string
  onEdit?: () => void
  items: { label: string; value: string }[]
}

export default function ReviewSection({ title, onEdit, items }: ReviewSectionProps) {
  const { theme } = useTheme()
  const [open, setOpen] = useState(true)
  return (
    <div style={{ border: `1px solid ${theme.border}`, borderRadius: 12, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '14px 18px',
          background: theme.bgPrimary,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary }}>{title}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {onEdit && (
            <span
              onClick={(e) => { e.stopPropagation(); onEdit() }}
              style={{ fontSize: 13, color: '#0D82F9', fontWeight: 500, cursor: 'pointer' }}
            >
              Edit
            </span>
          )}
          {open ? <ChevronUp size={16} color={theme.textMuted} /> : <ChevronDown size={16} color={theme.textMuted} />}
        </div>
      </button>
      {open && (
        <div style={{ padding: '14px 18px', background: theme.cardBg, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((item) => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ color: theme.textMuted }}>{item.label}</span>
              <span style={{ fontWeight: 500, color: theme.textPrimary }}>{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
