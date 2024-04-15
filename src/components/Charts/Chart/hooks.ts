import { useContext } from 'react'
import { ChartContext, type UseChartReturnType } from '.'

export function useChart (): UseChartReturnType {
  const chartContext = useContext(ChartContext)

  return chartContext
}
