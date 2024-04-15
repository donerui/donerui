import { type DataType, type MinMax, type ValueLabel } from '..'
import { type IStrokeOptions, type ISvgTextProps } from '../../Svg'

export type AxisDimension = 'x' | 'y' | 'color' | 'size' | string

export interface IAxisData {
  id: string
  dimension: AxisDimension
  dataKey?: string
  dataType?: DataType
  scale?: number
  ticks?: ValueLabel[]
}

export type AxesData = Record<AxisDimension, Record<string, IAxisData>>

export interface IUseAxisReturnType {
  id: string
  dimension: AxisDimension
  dataKey: string
  dataType: DataType
  scale: number
  ticks: ValueLabel[]
}

export interface IAxisProps {
  id: string
  dimension: AxisDimension
  dataKey?: string
  dataType?: DataType
  className?: string
  strokeOptions?: IStrokeOptions
  tickCount?: number
  tickPrecision?: number
  tickLimits?: MinMax<number>
  tickLabelOptions?: ISvgTextProps
  hidden?: boolean
}
