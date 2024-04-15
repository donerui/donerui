import React, { useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { SvgCurve, SvgGroup, SvgLine, SvgPoint, SvgRectangle, SvgSector, SvgText, defaultViewBox, stringifyViewBox, type ISvgProps } from '..'
import { SvgContext, type IRectangle, type ISvgMouseCoordinates } from '../..'

export * from './constants'
export * from './types'
export * from './utils'

function Svg ({
  children,
  className,
  viewBox = defaultViewBox,
  viewBoxPadding = 0,
  pan = false,
  panSensitivity = 1,
  zoom = false,
  zoomSensitivity = 1,
  preserveAspectRatio = 'xMidYMid meet',
  flipY = false,
  onViewBoxChange,
  onZoomChange,
  onMouseMove
}: ISvgProps, ref: React.Ref<SVGSVGElement>): JSX.Element {
  const [currentViewBox, setCurrentViewBox] = useState<IRectangle>(viewBox)
  const [panning, setPanning] = useState<boolean>(false)

  const [zoomAmount, setZoomAmount] = useState<number>(1)

  const [mouseCoordinates, setMouseCoordinates] = useState<ISvgMouseCoordinates | undefined>()

  const handlePan = (e: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    if (!pan || e.buttons === 0 || e.ctrlKey) {
      if (panning) {
        setPanning(false)
      }

      return
    }

    const svg = e.currentTarget
    if (svg == null) return

    const { x, y, width, height } = currentViewBox

    const zoom = width / svg.clientWidth

    const dx = e.movementX * panSensitivity * zoom
    const dy = e.movementY * panSensitivity * zoom

    const x2 = x - dx
    const y2 = y + ((flipY) ? dy : -dy)

    setCurrentViewBox({ x: x2, y: y2, width, height })
    setPanning(true)
  }

  const handleZoom = (e: React.WheelEvent<SVGSVGElement>): void => {
    if (!zoom) return
    if (e.deltaY === 0) return

    const screenCTM = e.currentTarget?.getScreenCTM()
    if (screenCTM == null) return

    const deltaY = Math.sign(e.deltaY)
    const scale = deltaY * zoomSensitivity / 10

    let pt = new DOMPoint(e.clientX, e.clientY)
    pt = pt.matrixTransform(screenCTM.inverse())

    const { x, y, width, height } = currentViewBox

    const [xPropW, yPropH] = [(pt.x - x) / width, (pt.y - y) / height]

    let [width2, height2] = [width + width * scale, height + height * scale]
    width2 = Math.max(width2, 0.1)
    height2 = Math.max(height2, 0.1)

    const x2 = pt.x - xPropW * width2
    const y2 = pt.y - yPropH * height2

    setCurrentViewBox({ x: x2, y: y2, width: width2, height: height2 })
    setZoomAmount(width2 / viewBox.width)
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    handlePan(e)

    const mousePos = new DOMPoint(e.clientX, e.clientY)
    const screenCTM = e.currentTarget?.getScreenCTM()
    if (screenCTM == null) return

    const inSvgSpace = mousePos.matrixTransform(screenCTM.inverse())
    const inClientSpace = inSvgSpace.matrixTransform(screenCTM)

    setMouseCoordinates({
      inSvgSpace,
      inClientSpace
    })
  }

  const handleMouseExit = (): void => {
    setMouseCoordinates(undefined)
  }

  useEffect(() => {
    const minViewBoxSize = Math.min(viewBox.width - viewBox.x, viewBox.height - viewBox.y)
    if (minViewBoxSize <= 0) return

    const viewBoxWithPadding = {
      x: viewBox.x - viewBoxPadding,
      y: viewBox.y - viewBoxPadding,
      width: viewBox.width + (viewBoxPadding * 2),
      height: viewBox.height + (viewBoxPadding * 2)
    }

    setCurrentViewBox(viewBoxWithPadding)
  }, [viewBox, viewBoxPadding])

  useEffect(() => {
    onViewBoxChange?.(currentViewBox)
  }, [currentViewBox])

  useEffect(() => {
    onZoomChange?.(zoomAmount)
  }, [zoomAmount])

  useEffect(() => {
    onMouseMove?.(mouseCoordinates)
  }, [mouseCoordinates])

  const contextValue = useMemo(() => ({
    viewBox: currentViewBox,
    panning,
    flipY,
    zoom: zoomAmount,
    mouseCoordinates
  }), [currentViewBox, panning, flipY, zoomAmount, mouseCoordinates])

  return (
    <SvgContext.Provider
      value={contextValue}
    >
      <svg
        ref={ref}
        className={twMerge(
          flipY && '-scale-y-100',
          panning && 'cursor-grabbing',
          className
        )}
        viewBox={stringifyViewBox(currentViewBox)}
        preserveAspectRatio={preserveAspectRatio}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseExit}
        onWheel={handleZoom}
      >
        {children}
      </svg>
    </SvgContext.Provider>
  )
}

const forwardRefSvg: React.ForwardRefExoticComponent<ISvgProps & React.RefAttributes<SVGSVGElement>> & {
  Group: typeof SvgGroup
  Rectangle: typeof SvgRectangle
  Line: typeof SvgLine
  Point: typeof SvgPoint
  Curve: typeof SvgCurve
  Text: typeof SvgText
  Sector: typeof SvgSector
} = React.forwardRef(Svg) as any

forwardRefSvg.Group = SvgGroup
forwardRefSvg.Rectangle = SvgRectangle
forwardRefSvg.Line = SvgLine
forwardRefSvg.Point = SvgPoint
forwardRefSvg.Curve = SvgCurve
forwardRefSvg.Text = SvgText
forwardRefSvg.Sector = SvgSector

export default forwardRefSvg
