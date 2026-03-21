import { useRef, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FileText, Clock, CheckCircle, XCircle, Send,
  TrendingUp, Gift, Plus, Briefcase, Building2,
  CheckCircle2, ArrowRight, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { motion } from 'framer-motion'
import RiyalSign from '../icons/RiyalSign'

// ─── Types ────────────────────────────────────────────────────

type RequestStatus =
  | 'submitted' | 'under-review' | 'offer-ready' | 'approved'
  | 'funding' | 'funded' | 'rejected'

type ProductType = 'working-capital' | 'invoice-financing' | 'sadad-invoice'

interface FinancingRequest {
  id: string
  referenceNumber: string
  productType: ProductType
  amountRequested: number
  status: RequestStatus
  submittedAt: Date
  nextAction?: string
}

// ─── Config ───────────────────────────────────────────────────

const statusConfig: Record<RequestStatus, { label: string; color: string; bg: string; icon: React.ElementType; action: string }> = {
  submitted:      { label: 'Submitted',    color: '#1D4ED8', bg: '#DBEAFE', icon: Send,        action: 'Track Status' },
  'under-review': { label: 'Under Review', color: '#B45309', bg: '#FEF3C7', icon: Clock,       action: 'Track Status' },
  'offer-ready':  { label: 'Offer Ready',  color: '#0E7490', bg: '#CFFAFE', icon: Gift,        action: 'View Offer' },
  approved:       { label: 'Approved',     color: '#047857', bg: '#D1FAE5', icon: CheckCircle,  action: 'Accept & Sign' },
  funding:        { label: 'Funding',      color: '#1D4ED8', bg: '#DBEAFE', icon: TrendingUp,   action: 'View Details' },
  funded:         { label: 'Funded',       color: '#047857', bg: '#D1FAE5', icon: CheckCircle2, action: 'View Loan' },
  rejected:       { label: 'Rejected',     color: '#B91C1C', bg: '#FEE2E2', icon: XCircle,     action: 'Reapply' },
}

const productLabels: Record<ProductType, string> = {
  'working-capital': 'Working Capital',
  'invoice-financing': 'Invoice Financing',
  'sadad-invoice': 'SADAD Invoice',
}

const productIcons: Record<ProductType, React.ElementType> = {
  'working-capital': Briefcase,
  'invoice-financing': FileText,
  'sadad-invoice': Building2,
}

// ─── Mock data (5 requests) ──────────────────────────────────

const MOCK_REQUESTS: FinancingRequest[] = [
  {
    id: '1',
    referenceNumber: '#REQ-2025-00142',
    productType: 'working-capital',
    amountRequested: 150000,
    status: 'under-review',
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    referenceNumber: '#REQ-2025-00138',
    productType: 'sadad-invoice',
    amountRequested: 85000,
    status: 'offer-ready',
    submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    nextAction: 'Review and accept your offer',
  },
  {
    id: '3',
    referenceNumber: '#REQ-2025-00135',
    productType: 'invoice-financing',
    amountRequested: 200000,
    status: 'funding',
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    referenceNumber: '#REQ-2025-00127',
    productType: 'working-capital',
    amountRequested: 300000,
    status: 'funded',
    submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: '5',
    referenceNumber: '#REQ-2025-00119',
    productType: 'sadad-invoice',
    amountRequested: 45000,
    status: 'approved',
    submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
]

// ─── Helpers ──────────────────────────────────────────────────

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

const CARD_WIDTH = 300
const GAP = 16

// ─── Hide scrollbar CSS (injected once) ──────────────────────

const scrollbarStyleId = 'recent-requests-scrollbar'

function ensureScrollbarStyles() {
  if (document.getElementById(scrollbarStyleId)) return
  const style = document.createElement('style')
  style.id = scrollbarStyleId
  style.textContent = `
    .rr-scroll {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .rr-scroll::-webkit-scrollbar {
      display: none;
    }
  `
  document.head.appendChild(style)
}

// ─── Request Card ─────────────────────────────────────────────

function RequestCard({ request, index }: { request: FinancingRequest; index: number }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const status = statusConfig[request.status]
  const StatusIcon = status.icon
  const ProductIcon = productIcons[request.productType]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/requests/${request.id}`)}
      style={{
        width: CARD_WIDTH,
        minWidth: CARD_WIDTH,
        flexShrink: 0,
        background: '#fff',
        borderRadius: 16,
        border: `1px solid ${hovered ? status.color + '40' : '#E5E7EB'}`,
        padding: 22,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: hovered ? '0 4px 16px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      {/* Top: icon + status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            background: '#F3F4F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ProductIcon size={20} color="#6B7280" />
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '4px 10px',
            borderRadius: 20,
            background: status.bg,
            color: status.color,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          <StatusIcon size={12} />
          {status.label}
        </div>
      </div>

      {/* Product + ref */}
      <p style={{ fontSize: 15, fontWeight: 600, color: '#111827', marginBottom: 3 }}>
        {productLabels[request.productType]}
      </p>
      <p style={{ fontSize: 12, color: '#9CA3AF', fontFamily: 'monospace', marginBottom: 16 }}>
        {request.referenceNumber}
      </p>

      {/* Amount */}
      <p style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 6 }}>
        {request.amountRequested.toLocaleString()} <RiyalSign size="sm" />
      </p>

      {/* Bottom area — fixed height, swaps content on hover */}
      <div style={{ marginTop: 'auto', minHeight: 60, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        {hovered ? (
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/requests/${request.id}`)
            }}
            style={{
              width: '100%',
              padding: '10px 0',
              background: status.color,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            {status.action}
            <ArrowRight size={14} />
          </button>
        ) : (
          <>
            <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: request.nextAction ? 10 : 0 }}>{timeAgo(request.submittedAt)}</p>
            {request.nextAction && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  paddingTop: 10,
                  borderTop: '1px solid #F3F4F6',
                }}
              >
                <div style={{ width: 6, height: 6, background: '#0D82F9', borderRadius: '50%', flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: '#0D82F9', fontWeight: 500, lineHeight: 1.4 }}>
                  {request.nextAction}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  )
}

// ─── New Request Card ─────────────────────────────────────────

function NewRequestCard() {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate('/request-financing')}
      style={{
        width: CARD_WIDTH,
        minWidth: CARD_WIDTH,
        flexShrink: 0,
        background: '#FAFAFA',
        borderRadius: 16,
        border: '2px dashed #E5E7EB',
        padding: 22,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#0D82F9' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#E5E7EB' }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: '50%',
          background: '#F3F4F6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Plus size={20} color="#9CA3AF" />
      </div>
      <span style={{ fontSize: 13, fontWeight: 500, color: '#9CA3AF' }}>New Request</span>
    </button>
  )
}

// ─── Nav Arrow ───────────────────────────────────────────────

function NavArrow({ direction, onClick, visible }: { direction: 'left' | 'right'; onClick: () => void; visible: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        ...(direction === 'left' ? { left: 0 } : { right: 0 }),
        zIndex: 10,
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: '#fff',
        border: '1px solid #E5E7EB',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.2s',
      }}
    >
      {direction === 'left' ? <ChevronLeft size={20} color="#374151" /> : <ChevronRight size={20} color="#374151" />}
    </button>
  )
}

// ─── Empty State ──────────────────────────────────────────────

function EmptyState() {
  const navigate = useNavigate()
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 16,
        border: '1px solid #E5E7EB',
        padding: 40,
        textAlign: 'center',
        marginBottom: 24,
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          margin: '0 auto 16px',
          background: '#F3F4F6',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FileText size={32} color="#9CA3AF" />
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 6 }}>
        No Financing Requests Yet
      </h3>
      <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 20 }}>
        Start your first financing request to get funding for your business.
      </p>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/request-financing')}
        style={{
          padding: '10px 24px',
          background: '#0D82F9',
          color: '#fff',
          fontWeight: 600,
          fontSize: 14,
          borderRadius: 10,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Request Financing
      </motion.button>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────

const STATUS_FILTERS: { value: RequestStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'under-review', label: 'Under Review' },
  { value: 'offer-ready', label: 'Offer Ready' },
  { value: 'approved', label: 'Approved' },
  { value: 'funding', label: 'Funding' },
  { value: 'funded', label: 'Funded' },
  { value: 'rejected', label: 'Rejected' },
]

export default function RecentRequests({ showEmpty }: { showEmpty?: boolean }) {
  const allRequests = showEmpty ? [] : MOCK_REQUESTS
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [activeFilter, setActiveFilter] = useState<RequestStatus | 'all'>('all')

  const requests = activeFilter === 'all'
    ? allRequests
    : allRequests.filter((r) => r.status === activeFilter)

  useEffect(() => { ensureScrollbarStyles() }, [])

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    // Small delay so the DOM has laid out
    const timer = setTimeout(updateScrollState, 50)
    const el = scrollRef.current
    if (!el) return () => clearTimeout(timer)
    el.addEventListener('scroll', updateScrollState, { passive: true })
    const ro = new ResizeObserver(updateScrollState)
    ro.observe(el)
    return () => {
      clearTimeout(timer)
      el.removeEventListener('scroll', updateScrollState)
      ro.disconnect()
    }
  }, [requests.length, updateScrollState])

  function scroll(dir: 'left' | 'right') {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -(CARD_WIDTH + GAP) : (CARD_WIDTH + GAP), behavior: 'smooth' })
  }

  function handleFilterChange(f: RequestStatus | 'all') {
    setActiveFilter(f)
    // Reset scroll when filter changes
    if (scrollRef.current) scrollRef.current.scrollLeft = 0
  }

  if (allRequests.length === 0) {
    return <EmptyState />
  }

  return (
    <div style={{ marginBottom: 24, width: '100%', minWidth: 0 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>Recent Requests</h3>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 13,
            color: '#0D82F9',
            fontWeight: 500,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          View All
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Status filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {STATUS_FILTERS.map((f) => {
          const active = activeFilter === f.value
          const count = f.value === 'all'
            ? allRequests.length
            : allRequests.filter((r) => r.status === f.value).length
          if (f.value !== 'all' && count === 0) return null
          return (
            <button
              key={f.value}
              onClick={() => handleFilterChange(f.value)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: active ? '#002E83' : '#F3F4F6',
                color: active ? '#fff' : '#6B7280',
                transition: 'background 0.2s, color 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {f.label}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  background: active ? 'rgba(255,255,255,0.2)' : '#E5E7EB',
                  color: active ? '#fff' : '#9CA3AF',
                  borderRadius: 10,
                  padding: '1px 7px',
                  minWidth: 20,
                  textAlign: 'center',
                }}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* No results for this filter */}
      {requests.length === 0 && (
        <div style={{ textAlign: 'center', padding: '32px 0', color: '#9CA3AF', fontSize: 13 }}>
          No requests with this status
        </div>
      )}

      {/* Carousel wrapper */}
      {requests.length > 0 && (
        <div style={{ position: 'relative', width: '100%' }}>
          <NavArrow direction="left" onClick={() => scroll('left')} visible={canScrollLeft} />
          <NavArrow direction="right" onClick={() => scroll('right')} visible={canScrollRight} />

          <div
            ref={scrollRef}
            className="rr-scroll"
            style={{
              display: 'flex',
              gap: GAP,
              overflowX: 'auto',
              overflowY: 'visible',
              width: '100%',
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            {requests.map((req, i) => (
              <RequestCard key={req.id} request={req} index={i} />
            ))}
            <NewRequestCard />
          </div>
        </div>
      )}
    </div>
  )
}
