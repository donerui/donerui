import type { IPoint, IStrokeOptions } from '../..'

export interface ISvgPointProps {
  point: IPoint<number | string>
  className?: string
  radius?: number
  interactionRadius?: number
  strokeOptions?: IStrokeOptions
  fill?: string
}
