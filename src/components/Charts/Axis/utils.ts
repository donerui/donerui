import { maxBy, minBy, uniqBy } from 'lodash'
import { type DataType, type IChartPoint, type MinMax, type ValueLabel } from '..'
import { clamp } from '../../../utils'

export function segmentateAxis (
  scale: number,
  ticks: ValueLabel[],
  tickCount: number,
  tickLimits: { min: number, max: number }
): ValueLabel[] {
  const newSegments = []

  const minVal = 0
  const maxVal = maxBy(ticks, 'value')?.value ?? minVal

  const maxSegments = maxVal
  const segmentCount = clamp(tickCount + 1, 2, maxSegments)

  const range = maxVal - minVal
  if (range === 0) {
    const label = minVal.toFixed(0)
    newSegments.push({ value: minVal, label })
    return newSegments
  }

  const basicInterval = range / (segmentCount - 1)

  const tickPrecision = Math.pow(10, Math.floor(Math.log10(basicInterval)))
  const maxTick = Math.ceil(maxVal / tickPrecision) * tickPrecision
  const interval = maxTick / (segmentCount - 1)

  let i = 0
  while (newSegments.length < segmentCount) {
    const value = i * interval
    const closest = Math.round(value / interval) * interval
    const adjustedClosest = closest * scale

    i++
    if (adjustedClosest < tickLimits.min) continue

    if (scale < 1) {
      if (closest > tickLimits.max) {
        newSegments.push({
          value: tickLimits.max * scale,
          label: tickLimits.max.toFixed(0)
        })
        break
      }
    } else {
      if (adjustedClosest > tickLimits.max) break
    }

    const label = closest.toFixed(0)
    newSegments.push({ value: adjustedClosest, label })
  }

  return newSegments
}

export function calculateAxisScale<T> (
  points: IChartPoint[],
  dataType: DataType,
  dataKey: string,
  range: MinMax<T>
): [ValueLabel[], number] {
  let scale = 1

  let selectedPoints = points
  if (dataType === 'string') {
    selectedPoints = uniqBy(selectedPoints, `${dataKey}.label`)

    const count = selectedPoints.length
    scale = ((typeof range.max === 'number' ? range.max : 100) / 10) / (count - 1)
  } else {
    const minimum = minBy(selectedPoints, `${dataKey}.value`)?.[dataKey].value ?? 0
    const maximum = maxBy(selectedPoints, `${dataKey}.value`)?.[dataKey].value ?? minimum

    const diff = Math.max(Math.abs(minimum), Math.abs(maximum))
    const rangeIsNumber = typeof range.min === 'number' && typeof range.max === 'number'
    if (rangeIsNumber) {
      const rangeDiff = Math.abs(Number(range.max) - Number(range.min))
      scale = rangeDiff / diff
    } else {
      scale = 1 / diff
    }
  }

  return [selectedPoints.map((p) => p[dataKey]), scale]
}
