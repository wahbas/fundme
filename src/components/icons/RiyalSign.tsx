/**
 * Saudi Riyal Currency Sign — NEW official symbol
 * Uses the bundled @emran-alhaddad/saudi-riyal-font package via CSS classes.
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

export default function RiyalSign({ size = 'md', color, bold = false }: RiyalSignProps) {
  return (
    <span
      className={bold ? 'icon-saudi_riyal_bold' : 'icon-saudi_riyal'}
      style={{
        fontSize: fontSizes[size],
        color: color || 'currentColor',
        display: 'inline-block',
        verticalAlign: 'middle',
        marginInlineStart: gaps[size],
        lineHeight: 1,
        position: 'relative',
        top: -1,
      }}
      aria-label="SAR"
    />
  )
}
