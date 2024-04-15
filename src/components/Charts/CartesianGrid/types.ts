import { type Limits } from '..'

export interface ICartesianGridProps {
  className?: string
  limits?: Limits<number>
  spacingX?: number
  spacingY?: number
  strokeWidth?: number
}
