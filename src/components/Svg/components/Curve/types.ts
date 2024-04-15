import { type ISvgLineProps } from '..'

export type SvgCurveType = 'linear' | 'monotoneX' | 'monotoneY' | 'natural' | 'step' | 'stepBefore' | 'stepAfter' | 'basis' | 'cardinal' | 'catmullRom' | 'catmullRomClosed' | 'catmullRomOpen'

export interface ISvgCurveProps extends ISvgLineProps {
  curvature?: SvgCurveType
}
