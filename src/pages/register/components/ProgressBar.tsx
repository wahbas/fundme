interface Props {
  current: number
  total?: number
}

export default function ProgressBar({ current, total = 4 }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
      <div style={{ display: 'flex', gap: 4, flex: 1 }}>
        {Array.from({ length: total }, (_, i) => {
          const step = i + 1
          const isDone = step < current
          const isActive = step === current

          return (
            <div
              key={step}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: '#E2E8F0',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  borderRadius: 2,
                  width: isDone ? '100%' : isActive ? '60%' : '0%',
                  background: 'linear-gradient(90deg, #002E83, #0D82F9)',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
          )
        })}
      </div>
      <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500, flexShrink: 0 }}>
        {current}/{total}
      </span>
    </div>
  )
}
