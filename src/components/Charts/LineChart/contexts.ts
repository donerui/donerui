import { createContext } from 'react'
import { defaultLineChartContext, type ILineChartContext } from '.'

export const LineChartContext = createContext<ILineChartContext>(defaultLineChartContext)
