import { type IChartPoint, type IChartProps, type UseChartReturnType } from '..'
import { type IStrokeOptions, type SvgCurveType } from '../../Svg'

export interface ILineContextValue {
  xAxisId: string
  yAxisId: string
  points: IChartPoint[]
}

export type LineContextValueMap = Record<string, ILineContextValue>

export interface ILineChartContext {
  lines: LineContextValueMap
  addLine: (id: string, line: ILineContextValue) => void
}

export interface ILineChartProps extends IChartProps {
}

export type UseLineChartReturnType = UseChartReturnType & ILineChartContext

export interface ILineProps {
  data: any
  dataLabel?: string
  xAxisId?: string
  yAxisId?: string
  className?: string
  strokeOptions?: IStrokeOptions
  dotRadius?: number
  dotFill?: string
  dotStrokeOptions?: IStrokeOptions
  curvature?: SvgCurveType
  sort?: boolean | ((a: any, b: any) => number)
}
