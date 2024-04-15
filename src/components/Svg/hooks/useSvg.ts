import { useContext } from 'react'
import { type UseSvgReturnType } from '.'
import { SvgContext } from '..'

export const useSVG = (): UseSvgReturnType => {
  const context = useContext(SvgContext)

  return context
}
