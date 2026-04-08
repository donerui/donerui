import type { IPoint, IStrokeOptions } from '../..'

export interface ISvgLineProps {
  points: Array<IPoint<number>>
  className?: string
  strokeOptions?: IStrokeOptions
}
