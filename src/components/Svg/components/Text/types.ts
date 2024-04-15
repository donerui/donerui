import { type IPoint } from '../..'

export interface ISvgTextProps {
  point?: IPoint<number | string>
  className?: string
  text?: string
  color?: string
  fontSize?: number
  fontFamily?: string
  fontWeight?: string
  textAnchor?: string
  dominantBaseline?: string
  rotate?: number
  format?: (value: string) => string
}
