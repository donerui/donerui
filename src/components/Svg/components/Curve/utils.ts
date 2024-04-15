import { line } from 'd3'
import { curveInterpolators, type SvgCurveType } from '.'

export function curveGenerator (points: Array<[number, number]>, curvature: SvgCurveType): string {
  const curveFunction = line().curve(curveInterpolators[curvature])
  return curveFunction(points) ?? ''
}
