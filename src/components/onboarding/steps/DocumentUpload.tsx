import { useState } from 'react'
import {
  Upload, CheckCircle2, Trash2, FileText, ArrowRight, ArrowLeft, Building2, Users,
  Receipt, Award, Calendar, TrendingUp, Briefcase, Clock,
  BarChart3, File,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { DocumentUploadData, UploadedDocument, DocumentType } from '../types'

export type DocSubStep = 'intro' | 'legal' | 'financial' | 'review' | 'success'

interface Props {
  data?: DocumentUploadData
  onComplete: (data: DocumentUploadData) => void
  onSubStepChange?: (subStep: DocSubStep) => void
}

// ─── Document Type Config ───────────────────────────────────

interface DocTypeConfig {
  type: DocumentType
  category: 'legal' | 'financial'
  nameEn: string
  nameAr: string
  description: string
  required: boolean
  formats: string[]
  maxMB: number
  icon: typeof FileText
}

const DOCUMENT_TYPES: DocTypeConfig[] = [
  // Legal
  { type: 'articles_of_association', category: 'legal', nameEn: 'Articles of Association', nameAr: 'عقد تأسيس الشركة', description: 'Company founding document with ownership structure', required: true, formats: ['pdf'], maxMB: 10, icon: FileText },
  { type: 'cr_certificate', category: 'legal', nameEn: 'Commercial Registration (CR)', nameAr: 'السجل التجاري', description: 'Valid CR certificate from Ministry of Commerce', required: true, formats: ['pdf', 'jpg', 'png'], maxMB: 5, icon: Building2 },
  { type: 'gosi_certificate', category: 'legal', nameEn: 'GOSI Certificate', nameAr: 'شهادة التأمينات الاجتماعية', description: 'Social insurance compliance certificate', required: true, formats: ['pdf', 'jpg', 'png'], maxMB: 5, icon: Users },
  { type: 'zatca_certificate', category: 'legal', nameEn: 'ZATCA Certificate', nameAr: 'شهادة الزكاة والدخل', description: 'Zakat, Tax and Customs Authority certificate', required: true, formats: ['pdf', 'jpg', 'png'], maxMB: 5, icon: Receipt },
  { type: 'chamber_certificate', category: 'legal', nameEn: 'Chamber of Commerce Certificate', nameAr: 'شهادة الغرفة التجارية', description: 'Chamber membership certificate', required: true, formats: ['pdf', 'jpg', 'png'], maxMB: 5, icon: Award },
  { type: 'loan_schedule', category: 'legal', nameEn: 'Loan Repayment Schedule', nameAr: 'جدول سداد القروض', description: 'Existing loan obligations (if applicable)', required: false, formats: ['pdf', 'xlsx'], maxMB: 10, icon: Calendar },
  // Financial
  { type: 'financial_statements', category: 'financial', nameEn: 'Audited Financial Statements', nameAr: 'القوائم المالية المدققة', description: 'Last 3 years of audited financial statements', required: true, formats: ['pdf'], maxMB: 20, icon: BarChart3 },
  { type: 'revenue_3_months', category: 'financial', nameEn: 'Last 3 Months Revenue', nameAr: 'إيرادات آخر 3 شهور', description: 'Revenue records for the past 3 months', required: true, formats: ['pdf', 'xlsx'], maxMB: 10, icon: TrendingUp },
  { type: 'projected_revenue', category: 'financial', nameEn: 'Projected Revenue (2025-2026)', nameAr: 'الإيرادات المتوقعة', description: 'Revenue projections for 2025 and 2026', required: true, formats: ['pdf', 'xlsx'], maxMB: 10, icon: TrendingUp },
  { type: 'business_profile', category: 'financial', nameEn: 'Business Model / Company Profile', nameAr: 'نموذج العمل / ملف الشركة', description: 'Company overview, business model, and profile', required: true, formats: ['pdf', 'pptx', 'docx'], maxMB: 20, icon: Briefcase },
  { type: 'aging_schedule', category: 'financial', nameEn: 'Receivables & Payables Aging', nameAr: 'جدول أعمار الذمم', description: 'Aging schedule for receivables and payables', required: true, formats: ['pdf', 'xlsx'], maxMB: 10, icon: Clock },
]

const LEGAL_DOCS = DOCUMENT_TYPES.filter((d) => d.category === 'legal')
const FINANCIAL_DOCS = DOCUMENT_TYPES.filter((d) => d.category === 'financial')
const REQUIRED_LEGAL = LEGAL_DOCS.filter((d) => d.required)
const REQUIRED_FINANCIAL = FINANCIAL_DOCS.filter((d) => d.required)

// ─── Illustration ───────────────────────────────────────────

function DocumentIllustration() {
  return (
    <svg width="200" height="150" viewBox="0 0 200 160" fill="none">
      <path d="M30 50 L30 130 C30 135 35 140 40 140 L160 140 C165 140 170 135 170 130 L170 60 L120 60 L110 50 L40 50 C35 50 30 55 30 60 Z" fill="url(#foldGrad)" />
      <path d="M30 60 L30 50 C30 45 35 40 40 40 L105 40 L115 50 L30 50 Z" fill="#0052B9" />
      <rect x="70" y="20" width="50" height="65" rx="4" fill="white" stroke="#E5E5E5" strokeWidth="2" />
      <rect x="78" y="30" width="34" height="3" rx="1" fill="#E5E5E5" />
      <rect x="78" y="38" width="26" height="3" rx="1" fill="#E5E5E5" />
      <rect x="85" y="30" width="50" height="65" rx="4" fill="white" stroke="#E5E5E5" strokeWidth="2" />
      <rect x="93" y="40" width="34" height="3" rx="1" fill="#E5E5E5" />
      <rect x="100" y="40" width="50" height="65" rx="4" fill="white" stroke="#E5E5E5" strokeWidth="2" />
      <rect x="108" y="50" width="34" height="3" rx="1" fill="#0D82F9" />
      <rect x="108" y="58" width="26" height="3" rx="1" fill="#E5E5E5" />
      <rect x="108" y="66" width="30" height="3" rx="1" fill="#E5E5E5" />
      <circle cx="140" cy="95" r="10" fill="#80FF00" />
      <path d="M135 95 L138 98 L145 91" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="55" cy="90" r="18" fill="#0D82F9" />
      <path d="M55 82 L55 98 M48 89 L55 82 L62 89" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <motion.circle animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 2 }} cx="170" cy="45" r="4" fill="#80FF00" />
      <motion.circle animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }} cx="40" cy="35" r="3" fill="#FBBF24" />
      <defs>
        <linearGradient id="foldGrad" x1="30" y1="40" x2="170" y2="140">
          <stop offset="0%" stopColor="#0D82F9" />
          <stop offset="100%" stopColor="#002E83" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// ─── Helpers ────────────────────────────────────────────────

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

// ─── Document Row ───────────────────────────────────────────

function DocumentRow({
  config, doc, isUploading, onUpload, onDelete,
}: {
  config: DocTypeConfig
  doc?: UploadedDocument
  isUploading: boolean
  onUpload: (type: DocumentType) => void
  onDelete: (id: string) => void
}) {
  const Icon = config.icon
  return (
    <div style={{
      padding: 16, borderRadius: 12, marginBottom: 8,
      border: `1.5px ${doc ? 'solid' : 'dashed'} ${doc ? '#D1FAE5' : '#E5E7EB'}`,
      background: doc ? '#F0FDF4' : '#fff',
      transition: 'all 0.2s',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10, flexShrink: 0,
          background: doc ? '#D1FAE5' : '#F3F4F6',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {doc ? <CheckCircle2 size={18} color="#047857" /> : <Icon size={18} color="#6B7280" />}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{config.nameEn}</h4>
                {!config.required && (
                  <span style={{ fontSize: 10, color: '#9CA3AF' }}>(Optional)</span>
                )}
              </div>
              <p style={{ fontSize: 11, color: '#9CA3AF' }}>{config.nameAr}</p>
            </div>
            {config.required && !doc && (
              <span style={{
                fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 10, flexShrink: 0,
                background: '#FEE2E2', color: '#EF4444',
              }}>Required</span>
            )}
          </div>

          {doc ? (
            <motion.div
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                <File size={13} color="#9CA3AF" />
                <span style={{ color: '#374151', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.fileName}</span>
                <span style={{ color: '#D1D5DB' }}>({formatSize(doc.fileSize)})</span>
              </div>
              <button onClick={() => onDelete(doc.id)} style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer' }}>
                <Trash2 size={14} color="#EF4444" />
              </button>
            </motion.div>
          ) : isUploading ? (
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, height: 4, background: '#E5E7EB', borderRadius: 2, overflow: 'hidden' }}>
                <motion.div
                  animate={{ width: ['0%', '70%', '90%'] }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  style={{ height: '100%', background: '#0D82F9', borderRadius: 2 }}
                />
              </div>
              <span style={{ fontSize: 11, color: '#9CA3AF' }}>Uploading...</span>
            </div>
          ) : (
            <div style={{ marginTop: 6 }}>
              <button
                onClick={() => onUpload(config.type)}
                style={{
                  fontSize: 12, fontWeight: 600, color: '#0D82F9', background: 'none',
                  border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: 0,
                }}
              >
                <Upload size={13} />
                Upload file
              </button>
              <p style={{ fontSize: 10, color: '#D1D5DB', marginTop: 2 }}>
                {config.formats.map((f) => f.toUpperCase()).join(', ')} • Max {config.maxMB}MB
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Intro Screen ───────────────────────────────────────────

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ padding: '16px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
        <DocumentIllustration />
      </div>

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Upload Business Documents</h2>
        <p style={{ fontSize: 14, color: '#6B7280', maxWidth: 380, margin: '0 auto', lineHeight: 1.6 }}>
          We need some documents to verify your business and assess your financing eligibility
        </p>
      </div>

      {/* Two-step overview */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, background: '#EFF6FF', borderRadius: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12, flexShrink: 0,
            background: 'linear-gradient(135deg, #002E83, #0D82F9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FileText size={24} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>Step 1: Legal Documents</h3>
            <p style={{ fontSize: 12, color: '#6B7280' }}>{REQUIRED_LEGAL.length} required • CR, GOSI, ZATCA, etc.</p>
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#0D82F9' }}>~3 min</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, background: '#F5F3FF', borderRadius: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12, flexShrink: 0,
            background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <BarChart3 size={24} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>Step 2: Financial Documents</h3>
            <p style={{ fontSize: 12, color: '#6B7280' }}>{REQUIRED_FINANCIAL.length} required • Statements, revenue, etc.</p>
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#8B5CF6' }}>~5 min</span>
        </div>
      </div>

      {/* Tips */}
      <div style={{ background: '#F9FAFB', borderRadius: 14, padding: 20, marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 12 }}>Tips for faster approval:</h3>
        {[
          'Ensure all documents are clear and readable',
          'Certificates should be valid and not expired',
          'Financial statements must be audited',
          'PDF format is preferred for most documents',
        ].map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: i < 3 ? 8 : 0 }}>
            <CheckCircle2 size={15} color="#22C55E" style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 13, color: '#6B7280' }}>{t}</p>
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={onStart}
        style={{
          width: '100%', padding: '14px 0', background: '#002E83', color: '#fff', fontWeight: 600,
          fontSize: 15, borderRadius: 12, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
      >
        <Upload size={20} />
        Start Uploading
      </motion.button>
    </div>
  )
}

// ─── Upload Sub-step Screen ─────────────────────────────────

function UploadSubStep({
  title, subtitle, icon: Icon, gradientFrom, gradientTo,
  docTypes, documents, uploadingType, uploadedCount, requiredCount,
  onUpload, onDelete, onNext, onBack, nextLabel, isComplete,
}: {
  title: string; subtitle: string
  icon: typeof FileText; gradientFrom: string; gradientTo: string
  docTypes: DocTypeConfig[]
  documents: UploadedDocument[]
  uploadingType: DocumentType | null
  uploadedCount: number; requiredCount: number
  onUpload: (type: DocumentType) => void
  onDelete: (id: string) => void
  onNext: () => void; onBack: () => void
  nextLabel: string; isComplete: boolean
}) {
  return (
    <div style={{ padding: '8px 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14, flexShrink: 0,
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={24} color="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>{title}</h2>
          <p style={{ fontSize: 13, color: '#9CA3AF' }}>{subtitle}</p>
        </div>
      </div>

      {/* Progress for this sub-step */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: '#9CA3AF' }}>{uploadedCount} of {requiredCount} required uploaded</span>
          {isComplete && (
            <span style={{
              fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 10,
              background: '#D1FAE5', color: '#047857',
            }}>All Done</span>
          )}
        </div>
        <div style={{ height: 4, background: '#F3F4F6', borderRadius: 2, overflow: 'hidden' }}>
          <motion.div
            animate={{ width: `${requiredCount > 0 ? (uploadedCount / requiredCount) * 100 : 0}%` }}
            transition={{ duration: 0.4 }}
            style={{ height: '100%', borderRadius: 2, background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})` }}
          />
        </div>
      </div>

      {/* Document list */}
      <div style={{ marginBottom: 24 }}>
        {docTypes.map((dt) => (
          <DocumentRow
            key={dt.type}
            config={dt}
            doc={documents.find((d) => d.docType === dt.type)}
            isUploading={uploadingType === dt.type}
            onUpload={onUpload}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={onBack}
          style={{
            padding: '12px 20px', background: '#fff', color: '#374151', fontWeight: 600,
            fontSize: 14, borderRadius: 12, border: '1px solid #D1D5DB', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <motion.button
          whileHover={isComplete ? { scale: 1.02 } : undefined}
          whileTap={isComplete ? { scale: 0.98 } : undefined}
          onClick={onNext}
          disabled={!isComplete}
          style={{
            flex: 1, padding: '12px 0', fontWeight: 600, fontSize: 15, borderRadius: 12,
            border: 'none', cursor: isComplete ? 'pointer' : 'not-allowed',
            background: isComplete ? '#002E83' : '#D1D5DB', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          {nextLabel}
          <ArrowRight size={18} />
        </motion.button>
      </div>
    </div>
  )
}

// ─── Review Screen ──────────────────────────────────────────

function ReviewScreen({
  documents, onSubmit, onBack,
}: {
  documents: UploadedDocument[]
  onSubmit: () => void
  onBack: () => void
}) {
  const legalUploaded = documents.filter((d) => d.category === 'legal')
  const financialUploaded = documents.filter((d) => d.category === 'financial')

  function ReviewCategory({ label, icon: Icon, color, docs }: { label: string; icon: typeof FileText; color: string; docs: UploadedDocument[] }) {
    return (
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Icon size={16} color={color} />
          <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{label}</span>
          <span style={{
            fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 10,
            background: '#D1FAE5', color: '#047857',
          }}>{docs.length} files</span>
        </div>
        {docs.map((doc) => {
          const config = DOCUMENT_TYPES.find((d) => d.type === doc.docType)
          return (
            <div key={doc.id} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
              background: '#F9FAFB', borderRadius: 10, marginBottom: 6,
            }}>
              <CheckCircle2 size={14} color="#047857" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: '#111827' }}>{config?.nameEn}</p>
                <p style={{ fontSize: 10, color: '#9CA3AF' }}>{doc.fileName} • {formatSize(doc.fileSize)}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div style={{ padding: '16px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            width: 64, height: 64, borderRadius: '50%', background: '#D1FAE5', margin: '0 auto 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <CheckCircle2 size={32} color="#047857" />
        </motion.div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 6 }}>Review & Submit</h2>
        <p style={{ fontSize: 14, color: '#6B7280' }}>
          All required documents uploaded. Review before submitting.
        </p>
      </div>

      {/* Summary */}
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: 20, marginBottom: 20 }}>
        <ReviewCategory label="Legal Documents" icon={FileText} color="#0D82F9" docs={legalUploaded} />
        <ReviewCategory label="Financial Documents" icon={BarChart3} color="#8B5CF6" docs={financialUploaded} />
      </div>

      {/* Bank statements note */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 10, padding: 14, marginBottom: 24,
        background: '#F0FDF4', border: '1px solid #D1FAE5', borderRadius: 12,
      }}>
        <CheckCircle2 size={16} color="#047857" style={{ flexShrink: 0, marginTop: 1 }} />
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#047857' }}>Bank Statements Retrieved Automatically</p>
          <p style={{ fontSize: 10, color: '#059669', marginTop: 1 }}>
            Via Open Banking from the previous step.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={onBack}
          style={{
            padding: '12px 20px', background: '#fff', color: '#374151', fontWeight: 600,
            fontSize: 14, borderRadius: 12, border: '1px solid #D1D5DB', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          <ArrowLeft size={16} />
          Edit
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={onSubmit}
          style={{
            flex: 1, padding: '14px 0', background: '#80FF00', color: '#002E83', fontWeight: 700,
            fontSize: 15, borderRadius: 12, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          Submit All Documents
          <ArrowRight size={18} />
        </motion.button>
      </div>
    </div>
  )
}

// ─── Success Screen ─────────────────────────────────────────

function SuccessScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div style={{ textAlign: 'center', padding: '24px 0' }}>
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          width: 80, height: 80, borderRadius: '50%', background: '#80FF00', margin: '0 auto 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <CheckCircle2 size={40} color="#002E83" />
      </motion.div>

      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 6 }}>Documents Submitted!</h2>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 28 }}>
        Your documents have been submitted for review. We'll notify you once they're verified.
      </p>

      <div style={{ background: '#F9FAFB', borderRadius: 16, padding: 24, marginBottom: 28, textAlign: 'left' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <FileText size={16} color="#0D82F9" />
          What happens next?
        </h3>
        {[
          { title: 'Document Review', desc: 'Our team will review your documents within 1-2 business days' },
          { title: 'Credit Assessment', desc: 'We\'ll assess your business for financing eligibility' },
          { title: 'Account Activation', desc: 'Once approved, you can start requesting financing' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: i < 2 ? 16 : 0 }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%', background: '#0D82F9', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, flexShrink: 0,
            }}>{i + 1}</div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{item.title}</p>
              <p style={{ fontSize: 12, color: '#9CA3AF' }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={onContinue}
        style={{
          width: '100%', padding: '14px 0', background: '#80FF00', color: '#002E83', fontWeight: 700,
          fontSize: 15, borderRadius: 12, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
      >
        Complete Onboarding
        <ArrowRight size={18} />
      </motion.button>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────

export default function DocumentUpload({ data, onComplete, onSubStepChange }: Props) {
  const [step, _setStep] = useState<DocSubStep>(data?.submittedAt ? 'success' : 'intro')

  function setStep(s: DocSubStep) {
    _setStep(s)
    onSubStepChange?.(s)
  }
  const [documents, setDocuments] = useState<UploadedDocument[]>(data?.documents || [])
  const [uploadingType, setUploadingType] = useState<DocumentType | null>(null)

  // Counts
  const uploadedLegal = REQUIRED_LEGAL.filter((d) => documents.some((doc) => doc.docType === d.type)).length
  const uploadedFinancial = REQUIRED_FINANCIAL.filter((d) => documents.some((doc) => doc.docType === d.type)).length
  const legalComplete = uploadedLegal === REQUIRED_LEGAL.length
  const financialComplete = uploadedFinancial === REQUIRED_FINANCIAL.length
  const allComplete = legalComplete && financialComplete

  function handleUpload(type: DocumentType) {
    const config = DOCUMENT_TYPES.find((d) => d.type === type)
    if (!config) return
    setUploadingType(type)
    setTimeout(() => {
      const doc: UploadedDocument = {
        id: 'doc-' + Date.now(),
        docType: type,
        category: config.category,
        fileName: `${config.nameEn.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Date.now()}.pdf`,
        fileSize: Math.floor(200000 + Math.random() * 2000000),
        uploadedAt: new Date(),
        status: 'uploaded',
      }
      setDocuments((prev) => {
        const filtered = prev.filter((d) => d.docType !== type)
        return [...filtered, doc]
      })
      setUploadingType(null)
    }, 1500)
  }

  function handleDelete(id: string) {
    setDocuments((prev) => prev.filter((d) => d.id !== id))
  }

  function handleSubmit() {
    onComplete({
      documents,
      legalDocumentsComplete: legalComplete,
      financialDocumentsComplete: financialComplete,
      allRequiredUploaded: allComplete,
      submittedAt: new Date(),
      reviewStatus: 'submitted',
    })
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {step === 'intro' && (
            <IntroScreen onStart={() => setStep('legal')} />
          )}

          {step === 'legal' && (
            <UploadSubStep
              title="Legal Documents"
              subtitle="Upload your company's legal certificates"
              icon={FileText} gradientFrom="#002E83" gradientTo="#0D82F9"
              docTypes={LEGAL_DOCS} documents={documents}
              uploadingType={uploadingType}
              uploadedCount={uploadedLegal} requiredCount={REQUIRED_LEGAL.length}
              onUpload={handleUpload} onDelete={handleDelete}
              onNext={() => setStep('financial')}
              onBack={() => setStep('intro')}
              nextLabel="Next: Financial Documents"
              isComplete={legalComplete}
            />
          )}

          {step === 'financial' && (
            <UploadSubStep
              title="Financial Documents"
              subtitle="Upload financial statements and reports"
              icon={BarChart3} gradientFrom="#8B5CF6" gradientTo="#EC4899"
              docTypes={FINANCIAL_DOCS} documents={documents}
              uploadingType={uploadingType}
              uploadedCount={uploadedFinancial} requiredCount={REQUIRED_FINANCIAL.length}
              onUpload={handleUpload} onDelete={handleDelete}
              onNext={() => setStep('review')}
              onBack={() => setStep('legal')}
              nextLabel="Review & Submit"
              isComplete={financialComplete}
            />
          )}

          {step === 'review' && (
            <ReviewScreen
              documents={documents}
              onSubmit={() => setStep('success')}
              onBack={() => setStep('financial')}
            />
          )}

          {step === 'success' && (
            <SuccessScreen onContinue={handleSubmit} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
