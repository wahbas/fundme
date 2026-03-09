import { CheckCircle2, FileText, Plus } from 'lucide-react'

const documents = [
  { id: 'cr', name: 'Commercial Registration (CR)', required: true, uploaded: true },
  { id: 'vat', name: 'VAT Certificate', required: true, uploaded: true },
  { id: 'bank', name: 'Bank Statements (6 months)', required: true, uploaded: false },
  { id: 'financials', name: 'Financial Statements', required: false, uploaded: false },
  { id: 'contracts', name: 'Business Contracts', required: false, uploaded: false },
]

export default function StepDocuments() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: '#111', marginBottom: 6 }}>
          Upload Required Documents
        </h2>
        <p style={{ fontSize: 14, color: '#888' }}>We need these documents to process your application</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {documents.map((doc) => (
          <div
            key={doc.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 16,
              borderRadius: 12,
              border: `2px solid ${doc.uploaded ? '#BBF7D0' : '#E5E7EB'}`,
              background: doc.uploaded ? '#F0FDF4' : '#fff',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: doc.uploaded ? '#DCFCE7' : '#F3F4F6',
                }}
              >
                {doc.uploaded ? (
                  <CheckCircle2 size={20} color="#16A34A" />
                ) : (
                  <FileText size={20} color="#9CA3AF" />
                )}
              </div>
              <div>
                <p style={{ fontWeight: 500, color: '#111', fontSize: 14 }}>
                  {doc.name}
                  {doc.required && <span style={{ color: '#EF4444', marginLeft: 4 }}>*</span>}
                </p>
                {doc.uploaded && (
                  <p style={{ fontSize: 12, color: '#16A34A' }}>Uploaded from profile</p>
                )}
              </div>
            </div>

            {doc.uploaded ? (
              <button
                style={{
                  fontSize: 13,
                  color: '#888',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Replace
              </button>
            ) : (
              <button
                style={{
                  padding: '8px 20px',
                  background: '#002E83',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 500,
                  borderRadius: 8,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Upload
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Additional Documents */}
      <div
        style={{
          border: '2px dashed #D1D5DB',
          borderRadius: 12,
          padding: 32,
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <Plus size={32} color="#9CA3AF" style={{ margin: '0 auto 8px' }} />
        <p style={{ color: '#555', fontSize: 14 }}>Add additional supporting documents</p>
        <p style={{ color: '#9CA3AF', fontSize: 13, marginTop: 4 }}>PDF, JPG, PNG up to 10MB each</p>
      </div>
    </div>
  )
}
