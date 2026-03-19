import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { WizardData } from '../../../pages/RequestFinancing'

interface Props {
  data: WizardData
  onChange: (p: Partial<WizardData>) => void
}

// ─── Custom SVG icons (stroke-only, 1.5px weight) ────────────

function GovernmentIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 21H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 21V9L12 4L19 9V21" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="9" y="13" width="6" height="8" rx="0.5" stroke={color} strokeWidth="1.5" />
      <path d="M12 4V2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function UtilitiesIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TelecomIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="7" y="2" width="10" height="20" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M11 18H13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 6H14" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

function BanksIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 21H21M4 21V10L12 5L20 10V21" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="8" y="13" width="3" height="8" stroke={color} strokeWidth="1.3" />
      <rect x="13" y="13" width="3" height="8" stroke={color} strokeWidth="1.3" />
    </svg>
  )
}

function ServicesIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

function OthersIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="12" r="2" fill={color} />
      <circle cx="12" cy="12" r="2" fill={color} />
      <circle cx="18" cy="12" r="2" fill={color} />
    </svg>
  )
}

// ─── Category definitions ─────────────────────────────────────

const categories = [
  { id: 'government', label: 'Government', Icon: GovernmentIcon, iconColor: '#B45309', bg: '#FEF3C7' },
  { id: 'utilities', label: 'Utilities', Icon: UtilitiesIcon, iconColor: '#7C3AED', bg: '#EDE9FE' },
  { id: 'telecom', label: 'Telecom', Icon: TelecomIcon, iconColor: '#4F46E5', bg: '#E0E7FF' },
  { id: 'banks', label: 'Banks', Icon: BanksIcon, iconColor: '#059669', bg: '#D1FAE5' },
  { id: 'services', label: 'Services', Icon: ServicesIcon, iconColor: '#DB2777', bg: '#FCE7F3' },
  { id: 'others', label: 'Others', Icon: OthersIcon, iconColor: '#64748B', bg: '#F1F5F9' },
]

export default function SelectCategory({ data, onChange }: Props) {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 6, textAlign: 'center' }}>
        Select Bill Category
      </h2>
      <p style={{ fontSize: 14, color: '#475569', marginBottom: 32, textAlign: 'center' }}>
        Choose a category to browse billers
      </p>

      {/* Category list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {categories.map((cat, i) => {
          const isSelected = data.category === cat.id
          const { Icon } = cat

          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.03, duration: 0.35, ease: 'easeOut' }}
              onClick={() => onChange({ category: cat.id, biller: '', billerCode: '', selectedBills: [], financingType: {}, partialAmounts: {} })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                width: '100%',
                padding: isSelected ? '15.5px 19.5px' : '16px 20px',
                background: isSelected ? 'rgba(37, 99, 235, 0.03)' : '#fff',
                border: isSelected ? '2px solid #2563EB' : '1.5px solid #E2E8F0',
                borderRadius: 12,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#CBD5E1'
                  e.currentTarget.style.background = '#FAFBFC'
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#E2E8F0'
                  e.currentTarget.style.background = '#fff'
                }
              }}
            >
              {/* Icon box */}
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: cat.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon color={cat.iconColor} />
              </div>

              {/* Label */}
              <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: '#0F172A' }}>
                {cat.label}
              </span>

              {/* Arrow */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: isSelected ? '#2563EB' : '#F5F7FA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background 0.2s',
                }}
              >
                <ChevronRight size={14} color={isSelected ? '#fff' : '#94A3B8'} />
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
