import { useContext } from 'react'
import { SvgContext } from '..'
import type { UseSvgReturnType } from '.'

export const useSVG = (): UseSvgReturnType => {
  const context = useContext(SvgContext)

  return context
}
