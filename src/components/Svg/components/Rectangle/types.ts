import type { IRectangle, IStrokeOptions } from '../..'

export interface ISvgRectangleProps {
  rect: IRectangle
  className?: string
  fill?: string
  strokeOptions?: IStrokeOptions
  cornerRadius?: number
}
