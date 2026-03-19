import { useState } from 'react'
import { ChevronUp, ChevronDown, Upload, FileCheck, X } from 'lucide-react'
import type { WizardData } from '../../../pages/RequestFinancing'

interface Props {
  data: WizardData
  onChange: (p: Partial<WizardData>) => void
}

interface DocDef {
  id: string
  name: string
  description: string
}

const legalDocs: DocDef[] = [
  { id: 'cr', name: 'Commercial Registration', description: 'Valid CR certificate' },
  { id: 'aoa', name: 'Articles of Association', description: 'Company formation documents' },
  { id: 'auth', name: 'Authorization Letter', description: 'Signed authorization' },
]

const financialDocs: DocDef[] = [
  { id: 'bank', name: 'Bank Statements', description: 'Last 6 months' },
  { id: 'fin', name: 'Financial Statements', description: 'Last fiscal year' },
  { id: 'vat', name: 'VAT Returns', description: 'Last 4 quarters' },
]

function DocRow({ doc, uploaded, onUpload, onRemove }: {
  doc: DocDef
  uploaded: boolean
  onUpload: () => void
  onRemove: () => void
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 20px', borderTop: '1px solid #F1F5F9',
    }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 500, color: '#0F172A', marginBottom: 2 }}>{doc.name}</p>
        <p style={{ fontSize: 12, color: '#94A3B8' }}>{doc.description}</p>
      </div>
      {uploaded ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <FileCheck size={16} color="#10B981" />
            <span style={{ fontSize: 12, color: '#10B981', fontWeight: 500 }}>Uploaded</span>
          </div>
          <button
            onClick={onRemove}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 2,
              color: '#94A3B8', fontSize: 12,
            }}
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          onClick={onUpload}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', background: '#fff',
            border: '1px solid #E2E8F0', borderRadius: 8,
            fontSize: 13, color: '#475569', cursor: 'pointer',
            transition: 'border-color 0.15s, color 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#2563EB'
            e.currentTarget.style.color = '#2563EB'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E2E8F0'
            e.currentTarget.style.color = '#475569'
          }}
        >
          <Upload size={14} />
          Upload
        </button>
      )}
    </div>
  )
}

function DocGroup({ title, docs, uploadedDocs, onUpload, onRemove, defaultOpen = true }: {
  title: string
  docs: DocDef[]
  uploadedDocs: string[]
  onUpload: (id: string) => void
  onRemove: (id: string) => void
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const uploadedCount = docs.filter((d) => uploadedDocs.includes(d.id)).length

  return (
    <div style={{
      background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14,
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', padding: '16px 20px', background: 'none', border: 'none',
          cursor: 'pointer', textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FileCheck size={18} color="#2563EB" />
          <span style={{ fontSize: 15, fontWeight: 600, color: '#0F172A' }}>{title}</span>
          <span style={{ fontSize: 12, color: '#94A3B8' }}>({uploadedCount}/{docs.length})</span>
        </div>
        {open ? <ChevronUp size={18} color="#94A3B8" /> : <ChevronDown size={18} color="#94A3B8" />}
      </button>
      {open && (
        <div>
          {docs.map((doc) => (
            <DocRow
              key={doc.id}
              doc={doc}
              uploaded={uploadedDocs.includes(doc.id)}
              onUpload={() => onUpload(doc.id)}
              onRemove={() => onRemove(doc.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Documents({ data, onChange }: Props) {
  const totalDocs = legalDocs.length + financialDocs.length
  const uploadedCount = data.uploadedDocs.length

  function handleUpload(id: string) {
    if (!data.uploadedDocs.includes(id)) {
      onChange({ uploadedDocs: [...data.uploadedDocs, id] })
    }
  }

  function handleRemove(id: string) {
    onChange({ uploadedDocs: data.uploadedDocs.filter((d) => d !== id) })
  }

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 6, textAlign: 'center' }}>Required Documents</h2>
      <p style={{ fontSize: 14, color: '#475569', marginBottom: 32, textAlign: 'center' }}>
        Upload your business documents to proceed ({uploadedCount}/{totalDocs} uploaded)
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <DocGroup
          title="Legal Documents"
          docs={legalDocs}
          uploadedDocs={data.uploadedDocs}
          onUpload={handleUpload}
          onRemove={handleRemove}
        />
        <DocGroup
          title="Financial Documents"
          docs={financialDocs}
          uploadedDocs={data.uploadedDocs}
          onUpload={handleUpload}
          onRemove={handleRemove}
        />
      </div>
    </div>
  )
}
