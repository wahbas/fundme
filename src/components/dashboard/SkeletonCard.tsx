const shimmerStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, #E2E8F0 25%, #F1F5F9 50%, #E2E8F0 75%)',
  backgroundSize: '800px 100%',
  animation: 'shimmer 2s ease-in-out infinite',
  borderRadius: 6,
}

function SkeletonRow() {
  return (
    <div style={rowStyle}>
      <div style={{ ...shimmerStyle, width: 32, height: 32, borderRadius: 8, flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ ...shimmerStyle, height: 10, width: '65%' }} />
        <div style={{ ...shimmerStyle, height: 8, width: '35%' }} />
      </div>
      <div style={{ ...shimmerStyle, height: 11, width: 60, marginLeft: 'auto', flexShrink: 0 }} />
    </div>
  )
}

interface SkeletonCardProps {
  title: string
  emptyIcon: React.ReactNode
  emptyTitle: string
  emptySubtitle: string
  rows?: number
}

export default function SkeletonCard({ title, emptyIcon, emptyTitle, emptySubtitle, rows = 3 }: SkeletonCardProps) {
  return (
    <div style={cardStyle}>
      {/* Shimmer keyframes */}
      <style>{`@keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }`}</style>

      {/* Header */}
      <div style={headerStyle}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', margin: 0 }}>{title}</h3>
        <span style={badgeStyle}>Available after approval</span>
      </div>

      {/* Skeleton rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}

      {/* Empty message */}
      <div style={emptyStyle}>
        <div style={emptyIconStyle}>{emptyIcon}</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#1E293B', marginBottom: 2 }}>{emptyTitle}</div>
        <div style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center' }}>{emptySubtitle}</div>
      </div>
    </div>
  )
}

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderRadius: 14,
  padding: '18px 20px',
}

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 12,
}

const badgeStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  color: '#2563EB',
  background: '#EFF6FF',
  padding: '3px 10px',
  borderRadius: 10,
}

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '9px 0',
  borderBottom: '1px solid #E2E8F0',
}

const emptyStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px 0 2px',
}

const emptyIconStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  background: '#F5F7FA',
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 8,
}
