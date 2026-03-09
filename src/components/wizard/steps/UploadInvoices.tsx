import { useState } from 'react'
import { Upload, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import type { InvoiceRow, WizardData } from '../types'

interface Props {
  data: WizardData
  onChange: (patch: Partial<WizardData>) => void
}

const thStyle: React.CSSProperties = { fontSize: 12, fontWeight: 500, color: '#6B7280', padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid #E5E7EB' }
const tdStyle: React.CSSProperties = { fontSize: 13, color: '#111827', padding: '12px 14px', borderBottom: '1px solid #F3F4F6' }

export default function UploadInvoices({ data, onChange }: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const total = data.invoices.reduce((s, i) => s + i.amount, 0)

  function addDemo() {
    const next: InvoiceRow = {
      id: crypto.randomUUID(),
      number: `INV-${String(data.invoices.length + 1).padStart(3, '0')}`,
      client: ['Al Rajhi Corp', 'Saudi Aramco', 'SABIC', 'Ma\'aden'][data.invoices.length % 4],
      amount: [85000, 120000, 45000, 200000][data.invoices.length % 4],
      dueDate: '2025-05-15',
    }
    onChange({ invoices: [...data.invoices, next] })
  }

  function remove(id: string) {
    onChange({ invoices: data.invoices.filter((i) => i.id !== id) })
  }

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 6 }}>Upload Your Invoices</h2>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 28 }}>Add the invoices you want to finance</p>

      {/* Drag & Drop Zone */}
      <motion.button
        onClick={addDemo}
        onMouseEnter={() => setIsDragging(true)}
        onMouseLeave={() => setIsDragging(false)}
        animate={{ scale: isDragging ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
        style={{
          width: '100%',
          padding: 40,
          border: `2px dashed ${isDragging ? '#0D82F9' : '#D1D5DB'}`,
          borderRadius: 16,
          background: isDragging ? 'rgba(13,130,249,0.04)' : '#FAFAFA',
          cursor: 'pointer',
          textAlign: 'center',
          marginBottom: 24,
          transition: 'border-color 0.2s, background 0.2s',
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: isDragging ? 'rgba(13,130,249,0.12)' : '#EFF6FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <Upload size={28} color="#0D82F9" />
        </div>
        <p style={{ color: '#374151', fontSize: 16, fontWeight: 500 }}>
          Drag & drop files here
        </p>
        <p style={{ color: '#6B7280', fontSize: 14, marginTop: 4 }}>or click to browse</p>
        <p style={{ color: '#9CA3AF', fontSize: 13, marginTop: 8 }}>PDF, JPG, PNG up to 10MB</p>
        <p style={{ color: '#0D82F9', fontSize: 13, marginTop: 10, fontWeight: 500 }}>
          (Click to add a demo invoice)
        </p>
      </motion.button>

      {/* Table */}
      {data.invoices.length > 0 && (
        <div style={{ border: '1px solid #E5E5E5', borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F9FAFB' }}>
                <th style={thStyle}>Invoice #</th>
                <th style={thStyle}>Client</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Amount</th>
                <th style={thStyle}>Due Date</th>
                <th style={{ ...thStyle, width: 40 }} />
              </tr>
            </thead>
            <tbody>
              {data.invoices.map((inv) => (
                <motion.tr
                  key={inv.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <td style={tdStyle}>{inv.number}</td>
                  <td style={tdStyle}>{inv.client}</td>
                  <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 600 }}>{inv.amount.toLocaleString()} SAR</td>
                  <td style={tdStyle}>{inv.dueDate}</td>
                  <td style={tdStyle}>
                    <button onClick={() => remove(inv.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                      <Trash2 size={16} color="#EF4444" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Gradient Summary */}
      {data.invoices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'linear-gradient(135deg, #002E83, #0D82F9)',
            borderRadius: 14,
            padding: 22,
            color: '#fff',
          }}
        >
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>Total Invoice Value</p>
          <p style={{ fontSize: 28, fontWeight: 700 }}>{total.toLocaleString()} SAR</p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
            {data.invoices.length} invoice{data.invoices.length !== 1 ? 's' : ''} uploaded
          </p>
        </motion.div>
      )}
    </div>
  )
}
