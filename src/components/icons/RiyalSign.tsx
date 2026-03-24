/**
 * Saudi Riyal Currency Sign — NEW official symbol (U+20C1)
 * Uses the bundled @emran-alhaddad/saudi-riyal-font package.
 * Symbol position: always LEFT of the number (per SAMA rules).
 */

const fontSizes = {
  sm: 11,
  md: 14,
  lg: 20,
  xl: 28,
}

const gaps = {
  sm: 2,
  md: 3,
  lg: 4,
  xl: 6,
}

type RiyalSize = 'sm' | 'md' | 'lg' | 'xl'

interface RiyalSignProps {
  size?: RiyalSize
  color?: string
  bold?: boolean
}

export default function RiyalSign({ size = 'md', color = 'currentColor', bold = false }: RiyalSignProps) {
  return (
    <span
      style={{
        fontFamily: bold ? 'saudi_riyal_bold' : 'saudi_riyal',
        fontSize: fontSizes[size],
        color,
        display: 'inline-block',
        verticalAlign: 'middle',
        marginInlineStart: gaps[size],
        lineHeight: 1,
        position: 'relative',
        top: -1,
      }}
      aria-label="SAR"
    >
      {'\ue900'}
    </span>
  )
}
