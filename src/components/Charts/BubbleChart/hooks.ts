import { max } from 'lodash'
import { useContext, useEffect, useMemo, useState } from 'react'
import { BubbleChartContext, type UseBubbleChartReturnType } from '.'
import { useAxisScaler, useChart } from '..'

export function useBubbleChart (
  id: string,
  xAxisId?: string,
  sizeAxisId?: string,
  colorAxisId?: string
): UseBubbleChartReturnType {
  const chartHook = useChart()

  const context = useContext(BubbleChartContext)
  const {
    bubbles, addBubble
  } = context
  const data = useMemo(() => Object.values(bubbles), [bubbles])

  useAxisScaler(
    'x',
    xAxisId ?? '',
    data,
    (element) => element.xAxisId === xAxisId,
    { min: 0, max: chartHook.viewBox.width }
  )

  const [y, setY] = useState<number>(0)

  function getY (): void {
    const maxSize = max(Object.values(bubbles).map((bubble) => bubble.sizeRange.max * 2 + 2)) ?? 1

    const index = Object.keys(bubbles).indexOf(id)
    const y = index * maxSize
    setY(y)
  }

  useEffect(getY, [id, bubbles])

  return { ...chartHook, y, bubbles, addBubble }
}
