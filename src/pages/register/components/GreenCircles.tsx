export default function GreenCircles() {
  return (
    <svg
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <circle cx="1320" cy="120" r="180" stroke="#80FF00" strokeWidth="1.5" opacity="0.07" />
      <circle cx="1320" cy="120" r="260" stroke="#80FF00" strokeWidth="1" opacity="0.04" />
      <circle cx="80" cy="750" r="200" stroke="#80FF00" strokeWidth="1.5" opacity="0.06" />
      <circle cx="80" cy="750" r="300" stroke="#80FF00" strokeWidth="1" opacity="0.03" />
      <circle cx="720" cy="50" r="80" stroke="#80FF00" strokeWidth="1" opacity="0.04" />
      <circle cx="1100" cy="700" r="120" stroke="#80FF00" strokeWidth="1.5" opacity="0.05" />
    </svg>
  )
}
