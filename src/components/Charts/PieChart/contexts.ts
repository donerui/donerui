import { createContext } from 'react'
import { defaultPieChartContext, type IPieChartContext } from '.'

export const PieChartContext = createContext<IPieChartContext>(defaultPieChartContext)
