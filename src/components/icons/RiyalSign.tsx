/**
 * Saudi Riyal Currency Sign
 * Official symbol adopted by SAMA in 2022.
 * Stroke-based SVG icon with sm/md/lg sizes.
 */

const sizes = {
  sm: { width: 12, height: 12, strokeWidth: 2.5, gap: 3 },
  md: { width: 16, height: 16, strokeWidth: 2.2, gap: 4 },
  lg: { width: 22, height: 22, strokeWidth: 2, gap: 6 },
}

type RiyalSize = 'sm' | 'md' | 'lg'

interface RiyalSignProps {
  size?: RiyalSize
  color?: string
}

export default function RiyalSign({ size = 'md', color = '#94A3B8' }: RiyalSignProps) {
  const s = sizes[size]
  return (
    <svg
      width={s.width}
      height={s.height}
      viewBox="0 0 24 24"
      fill="none"
      style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: s.gap, position: 'relative', top: -1 }}
      aria-label="SAR"
    >
      <path
        d="M2.5 8.5H6.5M2.5 12.5H6.5M9 4V20M9 4L4 8M9 20L14 16M14.5 8.5H20.5M14.5 12.5H18.5M14.5 8.5V16.5L18 20"
        stroke={color}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
