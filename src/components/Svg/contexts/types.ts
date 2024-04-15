import { type IRectangle } from '..'

export interface ISvgMouseCoordinates {
  inSvgSpace: DOMPoint
  inClientSpace: DOMPoint
}

export interface ISvgContext {
  viewBox: IRectangle
  panning: boolean
  flipY: boolean
  zoom: number
  mouseCoordinates?: ISvgMouseCoordinates
}
