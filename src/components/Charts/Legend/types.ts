export interface ILegendContextValue {
  id: string
  label?: string
  color?: string
}

export type LegendContextValueMap = Record<string, ILegendContextValue>

export interface ILegendItemProps {
  label: string
  color: string
  active: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}

export interface ILegendProps {
  className?: string
  ItemComponent?: React.FC<ILegendItemProps>
}
