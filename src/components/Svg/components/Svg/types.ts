import { type IRectangle, type ISvgMouseCoordinates } from '../..'

export interface ISvgProps {
  children?: React.ReactNode
  className?: string
  viewBox?: IRectangle
  viewBoxPadding?: number
  pan?: boolean
  panSensitivity?: number
  zoom?: boolean
  zoomSensitivity?: number
  preserveAspectRatio?: string
  flipY?: boolean
  onViewBoxChange?: (viewBox: IRectangle) => void
  onZoomChange?: (zoom: number) => void
  onMouseMove?: (mouseCoordinates?: ISvgMouseCoordinates) => void
}
