import { type IChartPoint, type IChartProps, type MinMax, type UseChartReturnType } from '..'
import { type IStrokeOptions } from '../../Svg'

export interface IBubbleContextValue {
  xAxisId: string
  sizeAxisId?: string
  sizeRange: MinMax<number>
  colorAxisId?: string
  colorRange: MinMax<string>
  points: IChartPoint[]
}

export type BubbleContextValueMap = Record<string, IBubbleContextValue>

export interface IBubbleChartContext {
  bubbles: BubbleContextValueMap
  addBubble: (id: string, bubble: IBubbleContextValue) => void
}

export interface IBubbleChartProps extends IChartProps {
}

export type UseBubbleChartReturnType = UseChartReturnType & IBubbleChartContext & {
  y: number
}

export interface IBubbleProps {
  data: any
  dataLabel?: string
  xAxisId?: string
  sizeAxisId?: string
  sizeRange?: MinMax<number>
  colorAxisId?: string
  colorRange?: MinMax<string>
  className?: string
  strokeOptions?: IStrokeOptions
  dotRadius?: number
  dotFill?: string
  sort?: boolean | ((a: any, b: any) => number)
}
