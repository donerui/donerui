import { createContext } from 'react'
import { defaultBubbleChartContext, type IBubbleChartContext } from '.'

export const BubbleChartContext = createContext<IBubbleChartContext>(defaultBubbleChartContext)
