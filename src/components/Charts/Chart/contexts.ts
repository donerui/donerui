import { createContext } from 'react'
import { defaultChartContext, type IChartContext } from '.'

export const ChartContext = createContext<IChartContext>(defaultChartContext)
