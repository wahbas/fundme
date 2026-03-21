import { Briefcase, FileText, Building2, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../../../ThemeContext'
import type { Product } from '../types'

interface Props {
  value: Product
  onChange: (p: Product) => void
}

const products: {
  id: Product
  icon: React.ElementType
  gradient: string
  name: string
  desc: string
  detail: string
  selectedBg: string
  selectedBorder: string
  popular?: boolean
}[] = [
  {
    id: 'working-capital',
    icon: Briefcase,
    gradient: 'linear-gradient(135deg, #0D82F9, #06B6D4)',
    name: 'Working Capital',
    desc: 'Quick financing for daily operations and business growth',
    detail: 'Up to 300,000 ر.س \u2022 6\u201324 months',
    selectedBg: '#EFF6FF',
    selectedBorder: '#0D82F9',
  },
  {
    id: 'invoice',
    icon: FileText,
    gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    name: 'Invoice Financing',
    desc: 'Convert outstanding invoices into immediate cash',
    detail: 'Up to 200,000 ر.س \u2022 Based on invoice terms',
    selectedBg: '#F5F3FF',
    selectedBorder: '#8B5CF6',
  },
  {
    id: 'sadad',
    icon: Building2,
    gradient: 'linear-gradient(135deg, #002E83, #0D82F9)',
    name: 'SADAD Invoice Financing',
    desc: 'Finance unpaid government & service bills via SADAD',
    detail: 'Up to 500,000 ر.س \u2022 Flexible terms',
    selectedBg: '#EFF6FF',
    selectedBorder: '#002E83',
    popular: true,
  },
]

export default function ChooseProduct({ value, onChange }: Props) {
  const { theme } = useTheme()
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textPrimary, marginBottom: 6 }}>Choose Your Product</h2>
      <p style={{ fontSize: 14, color: theme.textMuted, marginBottom: 28 }}>Select the financing product that best fits your business needs</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {products.map((p) => {
          const selected = value === p.id
          const Icon = p.icon
          return (
            <motion.button
              key={p.id}
              onClick={() => onChange(p.id)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
                width: '100%',
                padding: 20,
                borderRadius: 16,
                border: `2px solid ${selected ? p.selectedBorder : theme.border}`,
                background: selected ? p.selectedBg : theme.cardBg,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.2s, background 0.2s',
                boxShadow: selected ? '0 4px 20px rgba(0,0,0,0.08)' : theme.shadow,
                position: 'relative',
              }}
            >
              {/* Gradient Icon */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: p.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
              >
                <Icon size={28} color="#fff" />
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <p style={{ fontSize: 17, fontWeight: 600, color: theme.textPrimary }}>{p.name}</p>
                  {p.popular && (
                    <span
                      style={{
                        padding: '2px 10px',
                        background: '#80FF00',
                        color: '#002E83',
                        fontSize: 11,
                        fontWeight: 700,
                        borderRadius: 20,
                      }}
                    >
                      Popular
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 13, color: theme.textMuted, marginBottom: 6 }}>{p.desc}</p>
                <p style={{ fontSize: 13, color: '#0D82F9', fontWeight: 500 }}>{p.detail}</p>
              </div>

              {/* Selection indicator */}
              <div style={{ flexShrink: 0, marginTop: 4 }}>
                {selected ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    <CheckCircle2 size={28} color="#0D82F9" />
                  </motion.div>
                ) : (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      border: '2px solid #D1D5DB',
                    }}
                  />
                )}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
