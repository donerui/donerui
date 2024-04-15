import { type IChartPoint, type IChartProps, type UseChartReturnType } from '..'
import { type IPoint, type IStrokeOptions } from '../../Svg'

export interface IPieContextValue {
  dataKey: string
  angles: IChartPoint[]
}

export type PieContextValueMap = Record<string, IPieContextValue>

export interface IPieChartContext {
  pies: PieContextValueMap
  addPie: (id: string, pie: IPieContextValue) => void
}

export interface IPieChartProps extends IChartProps {
}

export type UsePieChartReturnType = UseChartReturnType & IPieChartContext

export interface IPieProps {
  data: any
  dataLabel?: string
  dataKey?: string
  labelKey?: string
  angleAxisId?: string
  className?: string
  position?: IPoint<number | string>
  fill?: string
  strokeOptions?: IStrokeOptions
  innerRadius?: number
  outerRadius?: number
  anglePadding?: number
  sort?: boolean | ((a: any, b: any) => number)
}
