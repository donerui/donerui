import { useContext, useEffect } from 'react'
import { calculateAxisScale, type AxisDimension, type IUseAxisReturnType } from '.'
import { ChartContext, useChart, type MinMax } from '..'

export function useAxis (
  dimension: AxisDimension,
  id: string
): IUseAxisReturnType | undefined {
  const { axes } = useContext(ChartContext)
  const axis = axes[dimension]?.[id]

  if (axis == null) {
    return undefined
  }

  return {
    id,
    dimension,
    dataKey: axis?.dataKey ?? '',
    dataType: axis?.dataType ?? 'string',
    scale: axis?.scale ?? 1,
    ticks: axis?.ticks ?? []
  }
}

export function useAxisScaler (
  dimension: AxisDimension,
  axisId: string,
  data: any[],
  dataFilterer: (element: any) => boolean,
  range: MinMax<number>
): void {
  const chartHook = useChart()
  const { setAxis } = chartHook

  const axis = useAxis(dimension, axisId ?? '')

  function scaleAxis (): void {
    if (axis == null) return
    if (axisId == null || axis.dataKey == null) return

    const dataBelongToAxis = data.filter(dataFilterer)

    const points = dataBelongToAxis.flatMap((element) => element.points)
    const [ticks, scale] = calculateAxisScale(points, axis.dataType, dimension, range)

    setAxis({ ...axis, ticks, scale })
  }

  useEffect(scaleAxis, [
    range.min,
    range.max,
    axisId,
    axis?.dataKey,
    axis?.dataType,
    setAxis,
    data
  ])
}
