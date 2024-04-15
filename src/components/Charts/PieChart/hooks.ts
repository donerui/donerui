import { useContext } from 'react'
import { PieChartContext, type UsePieChartReturnType } from '.'
import { useChart } from '..'

export function usePieChart (
): UsePieChartReturnType {
  const chartHook = useChart()

  const context = useContext(PieChartContext)

  const {
    pies, addPie
  } = context

  return { ...chartHook, pies, addPie }
}
