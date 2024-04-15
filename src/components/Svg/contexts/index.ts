import { createContext } from 'react'
import { defaultSvgContext, type ISvgContext } from '..'

export * from './constants'
export * from './types'

export const SvgContext = createContext<ISvgContext>(defaultSvgContext)
