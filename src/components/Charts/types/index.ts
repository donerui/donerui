export interface ValueLabel {
  value: number
  label: string
}

export type DataType = 'string' | 'number'

export type IChartPoint = Record<string, ValueLabel>

export interface SnappedData {
  x?: number
  y?: number
  data?: any
}

export interface MinMax<T> { min: T, max: T }

export type Limits<T> = {
  x: MinMax<T>
  y: MinMax<T>
} | 'auto'
