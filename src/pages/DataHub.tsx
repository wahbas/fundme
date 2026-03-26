import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload, Plus, ChevronDown, Filter, CheckCircle2, AlertCircle,
  FileText, TrendingUp, Landmark, Building2,
} from 'lucide-react'
import { useTheme } from '../ThemeContext'
import { useI18n } from '../i18n'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import FloatingHelpButton from '../components/dashboard/FloatingHelpButton'
import MobileTabBar from '../components/layout/MobileTabBar'

/* ─── Data ─── */

interface BankConnection {
  name: string
  syncInfo: string
  status: 'connected' | 'reconnect'
  statusLabel: string
}

const BANKS: BankConnection[] = [
  { name: 'Al Rajhi Bank', syncInfo: 'Last synced 2 hours ago.', status: 'connected', statusLabel: 'connected' },
  { name: 'Saudi National Bank', syncInfo: 'Sync failed 5 days ago – please reconnect.', status: 'reconnect', statusLabel: 'reconnectRequired' },
]

interface DocCategory {
  icon: typeof FileText
  iconColor: string
  label: string
  completed: number
  total: number
  docs: { name: string; status: 'uploaded' | 'missing' }[]
}

const DOC_CATEGORIES: DocCategory[] = [
  {
    icon: Building2,
    iconColor: '#2563EB',
    label: 'legalDocs',
    completed: 2,
    total: 7,
    docs: [
      { name: 'Commercial Registration', status: 'uploaded' },
      { name: 'Articles of Association', status: 'uploaded' },
      { name: 'Board Resolution', status: 'missing' },
      { name: 'Authorized Signatory List', status: 'missing' },
      { name: 'National Address Certificate', status: 'missing' },
      { name: 'GOSI Certificate', status: 'missing' },
      { name: 'Zakat Certificate', status: 'missing' },
    ],
  },
  {
    icon: TrendingUp,
    iconColor: '#2563EB',
    label: 'financialDocs',
    completed: 0,
    total: 6,
    docs: [
      { name: 'Bank Statements (Last 6 months)', status: 'missing' },
      { name: 'Audited Financial Statements', status: 'missing' },
      { name: 'VAT Returns', status: 'missing' },
      { name: 'Income Statement', status: 'missing' },
      { name: 'Balance Sheet', status: 'missing' },
      { name: 'Cash Flow Statement', status: 'missing' },
    ],
  },
]

/* ─── Components ─── */

function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const pct = total > 0 ? (completed / total) * 100 : 0
  return (
    <div style={{ flex: 1, height: 6, borderRadius: 3, background: '#E2E8F0' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ height: 6, borderRadius: 3, background: '#2563EB' }}
      />
    </div>
  )
}

function SectionCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { theme } = useTheme()
  return (
    <motion.div
      className="datahub-section"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      style={{
        background: theme.cardBg,
        border: `1px solid ${theme.border}`,
        borderRadius: 12,
        padding: 28,
        boxShadow: theme.shadow,
      }}
    >
      {children}
    </motion.div>
  )
}

function DocCategoryRow({ cat }: { cat: DocCategory }) {
  const { theme } = useTheme()
  const { t } = useI18n()
  const [expanded, setExpanded] = useState(false)
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null)
  const Icon = cat.icon
  const pct = cat.total > 0 ? (cat.completed / cat.total) * 100 : 0
  const allDone = cat.completed === cat.total

  const handleUpload = (docName: string) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.pdf,.jpg,.jpeg,.png'
    input.onchange = () => {
      setUploadingDoc(docName)
      setTimeout(() => setUploadingDoc(null), 1500)
    }
    input.click()
  }

  return (
    <div style={{ borderTop: `1px solid ${theme.border}` }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%', padding: '18px 0', background: 'transparent', border: 'none',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14,
        }}
      >
        <div style={{
          width: 42, height: 42, borderRadius: 12,
          background: allDone ? 'linear-gradient(135deg, #10B981, #059669)' : '#EFF6FF',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          {allDone
            ? <CheckCircle2 size={18} color="#fff" />
            : <Icon size={18} color={cat.iconColor} />
          }
        </div>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary, margin: 0 }}>
              {t(`dataHub.${cat.label}` as any)}
            </p>
            {!allDone && (
              <span style={{
                fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 10,
                background: '#FEF3C7', color: '#D97706',
              }}>
                {cat.total - cat.completed} missing
              </span>
            )}
            {allDone && (
              <span style={{
                fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 10,
                background: '#DCFCE7', color: '#166534',
              }}>
                Complete
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 100, height: 5, borderRadius: 3, background: '#E2E8F0' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5 }}
                style={{
                  height: 5, borderRadius: 3,
                  background: allDone ? '#10B981' : pct > 0 ? '#2563EB' : '#E2E8F0',
                }}
              />
            </div>
            <span style={{ fontSize: 12, color: theme.textMuted, fontWeight: 500 }}>{cat.completed} / {cat.total}</span>
          </div>
        </div>
        <ChevronDown
          size={18}
          color="#94A3B8"
          style={{ transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: 20, paddingLeft: 14, paddingRight: 4, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {cat.docs.map(doc => {
                const uploaded = doc.status === 'uploaded'
                const isUploading = uploadingDoc === doc.name
                return (
                  <div
                    key={doc.name}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 14px', borderRadius: 10,
                      background: uploaded ? 'rgba(37,99,235,0.04)' : theme.cardBg,
                      border: `1px solid ${uploaded ? 'rgba(37,99,235,0.12)' : theme.border}`,
                    }}
                  >
                    {/* Status icon */}
                    {uploaded ? (
                      <div style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <CheckCircle2 size={15} color="#2563EB" />
                      </div>
                    ) : (
                      <div style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <AlertCircle size={15} color="#D97706" />
                      </div>
                    )}

                    {/* Doc name */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{
                        fontSize: 13, fontWeight: uploaded ? 500 : 400,
                        color: uploaded ? theme.textPrimary : theme.textSecondary,
                      }}>
                        {doc.name}
                      </span>
                    </div>

                    {/* Action */}
                    {uploaded ? (
                      <span style={{
                        fontSize: 11, fontWeight: 600, color: '#2563EB',
                        background: '#EFF6FF', padding: '3px 10px', borderRadius: 6,
                      }}>
                        Uploaded
                      </span>
                    ) : isUploading ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          style={{
                            width: 14, height: 14,
                            border: '2px solid #E2E8F0', borderTopColor: '#2563EB', borderRadius: '50%',
                          }}
                        />
                        <span style={{ fontSize: 11, color: theme.textMuted }}>Uploading...</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleUpload(doc.name)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 5,
                          padding: '5px 12px', borderRadius: 8,
                          background: '#7CFF01', color: '#0F172A',
                          border: 'none', cursor: 'pointer',
                          fontSize: 12, fontWeight: 600,
                        }}
                      >
                        <Upload size={13} />
                        Upload
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Page ─── */

export default function DataHub() {
  const { theme } = useTheme()
  const { t, isRTL } = useI18n()
  const [searchParams] = useSearchParams()
  const stateParam = searchParams.get('state')
  const verified = stateParam === 'verified' || searchParams.get('verified') === 'true'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [docTab, setDocTab] = useState<'legal' | 'financial'>('legal')
  const [showMissingOnly, setShowMissingOnly] = useState(false)

  const totalCompleted = DOC_CATEGORIES.reduce((s, c) => s + c.completed, 0)
  const totalDocs = DOC_CATEGORIES.reduce((s, c) => s + c.total, 0)

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar verified={verified} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} activeTab="data-hub" />
      <main style={{
        marginLeft: isRTL ? 0 : (sidebarCollapsed ? 72 : 240),
        marginRight: isRTL ? (sidebarCollapsed ? 72 : 240) : 0,
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        flex: 1, minWidth: 0, overflow: 'hidden', minHeight: '100vh', background: theme.bgPrimary, padding: 0,
      }}>
        <div style={{ background: theme.bgPrimary, minHeight: '100vh', padding: '28px 32px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="inner-page-header"><Header /></div>

            {/* ── Section 1: Upload Documents ── */}
            <SectionCard delay={0.05}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, background: '#EFF6FF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Upload size={20} color="#2563EB" />
                </div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: theme.textPrimary, marginBottom: 4 }}>Upload Documents</h3>
                  <p style={{ fontSize: 13, color: theme.textMuted }}>Upload the required documents to complete your financing application.</p>
                </div>
              </div>

              {/* Doc tabs */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <button
                  onClick={() => setDocTab('legal')}
                  style={{
                    padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                    background: docTab === 'legal' ? '#EFF6FF' : '#fff',
                    color: docTab === 'legal' ? '#2563EB' : '#94A3B8',
                    border: `1px solid ${docTab === 'legal' ? '#BFDBFE' : '#E2E8F0'}`,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                  }}
                >
                  <Building2 size={14} />
                  Legal: {DOC_CATEGORIES[0].completed} / {DOC_CATEGORIES[0].total}
                </button>
                <button
                  onClick={() => setDocTab('financial')}
                  style={{
                    padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                    background: docTab === 'financial' ? '#EFF6FF' : '#fff',
                    color: docTab === 'financial' ? '#2563EB' : '#94A3B8',
                    border: `1px solid ${docTab === 'financial' ? '#BFDBFE' : '#E2E8F0'}`,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                  }}
                >
                  <TrendingUp size={14} />
                  Financial: {DOC_CATEGORIES[1].completed} / {DOC_CATEGORIES[1].total}
                </button>
              </div>

              {/* Progress bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <ProgressBar completed={totalCompleted} total={totalDocs} />
                <span style={{ fontSize: 13, color: theme.textMuted, whiteSpace: 'nowrap' }}>{totalCompleted} / {totalDocs} completed</span>
              </div>

              {/* CTA */}
              <button style={{
                width: '100%', padding: '12px 20px', background: '#2563EB', color: '#fff', fontWeight: 600,
                fontSize: 14, borderRadius: 10, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <Plus size={16} />
                Upload New Document
              </button>
            </SectionCard>

            {/* ── Section 2: Bank Connections ── */}
            <SectionCard delay={0.12}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, background: '#EFF6FF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Landmark size={20} color="#2563EB" />
                </div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: theme.textPrimary, marginBottom: 4 }}>{t('dataHub.bankConnections')}</h3>
                  <p style={{ fontSize: 13, color: theme.textMuted }}>Connect and manage your bank accounts</p>
                </div>
              </div>

              <div className="bank-connections-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                {BANKS.map(bank => {
                  const isConnected = bank.status === 'connected'
                  return (
                    <div key={bank.name} style={{
                      border: `1px solid ${isConnected ? theme.border : '#FDE68A'}`,
                      borderRadius: 12, padding: 20,
                      background: isConnected ? theme.cardBg : '#FFFBEB',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 10, background: '#F1F5F9',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <Landmark size={18} color="#64748B" />
                        </div>
                        <div>
                          <p style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary }}>{bank.name}</p>
                          <p style={{ fontSize: 12, color: isConnected ? '#94A3B8' : '#D97706' }}>{bank.syncInfo}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
                        {isConnected ? (
                          <>
                            <CheckCircle2 size={16} color="#2563EB" />
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#2563EB' }}>{t(`dataHub.${bank.statusLabel}` as any)}</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle size={16} color="#D97706" />
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#D97706' }}>{t(`dataHub.${bank.statusLabel}` as any)}</span>
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* CTA */}
              <button style={{
                width: '100%', padding: '12px 20px', background: '#2563EB', color: '#fff', fontWeight: 600,
                fontSize: 14, borderRadius: 10, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <Plus size={16} />
                Connect Bank
              </button>
            </SectionCard>

            {/* ── Section 3: Required Documents ── */}
            <SectionCard delay={0.19}>
              <div className="datahub-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, background: '#EFF6FF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <FileText size={20} color="#2563EB" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: theme.textPrimary, marginBottom: 4 }}>Required Documents</h3>
                    <p style={{ fontSize: 13, color: theme.textMuted }}>You still have {totalDocs - totalCompleted} documents to upload</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMissingOnly(!showMissingOnly)}
                  style={{
                    padding: '8px 16px', background: showMissingOnly ? '#EFF6FF' : '#fff',
                    border: `1px solid ${showMissingOnly ? '#BFDBFE' : '#E2E8F0'}`,
                    borderRadius: 8, fontSize: 13, fontWeight: 600,
                    color: showMissingOnly ? '#2563EB' : '#64748B',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                  }}
                >
                  <Filter size={14} />
                  Show Missing Only
                </button>
              </div>

              {DOC_CATEGORIES.map(cat => <DocCategoryRow key={cat.label} cat={cat} />)}
            </SectionCard>
          </div>
          <Footer />
        </div>
      </main>
      <FloatingHelpButton />
      <MobileTabBar />
    </div>
  )
}
