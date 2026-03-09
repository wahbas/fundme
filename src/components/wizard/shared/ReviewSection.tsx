import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface ReviewSectionProps {
  title: string
  onEdit?: () => void
  items: { label: string; value: string }[]
}

export default function ReviewSection({ title, onEdit, items }: ReviewSectionProps) {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '14px 18px',
          background: '#F9FAFB',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{title}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {onEdit && (
            <span
              onClick={(e) => { e.stopPropagation(); onEdit() }}
              style={{ fontSize: 13, color: '#0D82F9', fontWeight: 500, cursor: 'pointer' }}
            >
              Edit
            </span>
          )}
          {open ? <ChevronUp size={16} color="#888" /> : <ChevronDown size={16} color="#888" />}
        </div>
      </button>
      {open && (
        <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((item) => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ color: '#888' }}>{item.label}</span>
              <span style={{ fontWeight: 500, color: '#111' }}>{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
