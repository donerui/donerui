import { type Limits } from '..'

export interface IRulerSnapData {
  x: number
  y: number
  xIndex: number
  yIndex: number
}

export interface IRulerProps {
  className?: string
  limits?: Limits<number>
  snap?: 'data' | { x?: number, y?: number }
  hideX?: boolean
  hideY?: boolean
}
