import { useEffect, useRef } from 'react'
import { useChart } from '..'
import { Svg } from '../../Svg'
import { type IChartSvgProps } from './types'

export * from './types'

function ChartSvg (props: IChartSvgProps): JSX.Element {
  const { children, viewBoxPadding, onMouseMove } = props
  const { setMouseCoordinates, viewBox, setViewBox } = useChart()

  const mouseTimeoutRef = useRef<NodeJS.Timeout>()
  const resizeTimeoutRef = useRef<NodeJS.Timeout>()
  const svgRef = useRef<SVGSVGElement>(null)

  const onResize = (): void => {
    if (resizeTimeoutRef.current != null) clearTimeout(resizeTimeoutRef.current)

    const w = svgRef.current?.clientWidth
    const h = svgRef.current?.clientHeight

    if (w == null || h == null) return

    let width: number, height: number

    const padding = viewBoxPadding ?? 0
    const aspect = w / h

    if (w > h) {
      width = 100
      const paddedWidth = width + padding * 2
      const paddedHeight = paddedWidth / aspect
      height = paddedHeight - padding * 2
    } else {
      height = 100
      const paddedHeight = height + padding * 2
      const paddedWidth = paddedHeight * aspect
      width = paddedWidth - padding * 2
    }

    resizeTimeoutRef.current = setTimeout(() => {
      setViewBox({ x: 0, y: 0, width, height })
    }, 100)
  }

  useEffect(() => {
    const observer = new ResizeObserver(onResize)
    observer.observe(svgRef.current as any)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Svg
      {...props}
      ref={svgRef}
      viewBox={viewBox}
      onMouseMove={(mc) => {
        onMouseMove?.(mc)

        if (mouseTimeoutRef.current != null) clearTimeout(mouseTimeoutRef.current)
        mouseTimeoutRef.current = setTimeout(() => {
          setMouseCoordinates(mc)
        }, 10)
      }}
      preserveAspectRatio='xMidYMid meet'
    >
      {children}
    </Svg>
  )
}

export default ChartSvg
