import { type IRectangle } from '../..'

export const stringifyViewBox = (viewBox: IRectangle): string => {
  const { x, y, width, height } = viewBox
  return `${x} ${y} ${width} ${height}`
}
