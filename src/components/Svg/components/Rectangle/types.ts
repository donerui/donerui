import { type IRectangle, type IStrokeOptions } from '../..'

export interface ISvgRectangleProps {
  rect: IRectangle
  className?: string
  fill?: string
  strokeOptions?: IStrokeOptions
  cornerRadius?: number
}
