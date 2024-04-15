import { createContext } from 'react'
import { defaultScatterChartContext, type IScatterChartContext } from '.'

export const ScatterChartContext = createContext<IScatterChartContext>(defaultScatterChartContext)
