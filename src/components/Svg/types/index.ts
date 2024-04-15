export type Alignment = 'left' | 'right' | 'top' | 'down' | 'center'

export interface IPoint<T> {
  x: T
  y: T
}

export interface IRectangle {
  x: number
  y: number
  width: number
  height: number
}

export interface IStrokeOptions {
  stroke?: string
  strokeWidth?: number
  strokeDasharray?: string
}
