import { type IPoint, type IStrokeOptions, type ISvgTextProps } from '../..'

export interface ISvgSectorProps {
  className?: string
  point?: IPoint<number | string>
  fill?: string
  strokeOptions?: IStrokeOptions
  innerRadius?: number
  outerRadius?: number
  startAngle?: number
  endAngle?: number
  anglePadding?: number
  showLabel?: boolean | 'hover' | 'click'
  label?: string
  LabelComponent?: React.FC<ISvgSectorLabelProps>
  onMouseEnter?: (e: React.MouseEvent<SVGGElement>) => void
  onMouseLeave?: (e: React.MouseEvent<SVGGElement>) => void
  onClick?: (e: React.MouseEvent<SVGGElement>) => void
}

export interface ISvgSectorLabelProps extends ISvgTextProps {
  className?: string
  point: IPoint<number>
  angle?: number
  radius?: number
  lineLength?: number
  lineGap?: number
}
