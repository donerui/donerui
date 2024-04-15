import { useEffect, useId, useState } from 'react'
import { dataSelector, type IChartPoint, type IPieProps } from '..'
import { useTimeoutEffect } from '../../../hooks'
import { Svg, defaultPositionCentered } from '../../Svg'
import { usePieChart } from './hooks'

function Pie ({
  data,
  dataLabel,
  dataKey = 'value',
  labelKey = 'label',
  position = defaultPositionCentered,
  fill = 'none',
  strokeOptions,
  innerRadius = 0,
  outerRadius = 5,
  anglePadding = 0,
  sort = true
}: IPieProps): JSX.Element {
  const id = useId()

  const {
    focusedDataset,
    setTooltipData,
    setLegendValue,
    addPie
  } = usePieChart()

  const faded = focusedDataset != null && focusedDataset !== id

  const [pieces, setPieces] = useState<IChartPoint[]>([])
  const [scaledPieces, setScaledPieces] = useState<IChartPoint[]>([])

  const [angleScale, setAngleScale] = useState<number>(1)

  function getPieces (): void {
    if (data == null || dataKey == null) {
      if (pieces.length > 0) {
        setPieces([])
      }
    } else {
      let _pieces: IChartPoint[] = data.map((d: any) => {
        const angle = dataSelector(d, dataKey)
        const label = dataSelector(d, labelKey) ?? angle.toString()

        const pt: IChartPoint = {
          angle: {
            value: angle,
            label
          },
          payload: {
            value: d,
            label: 'payload'
          }
        }

        return pt
      })

      if (sort !== false) {
        if (sort === true) {
          _pieces = _pieces.sort((a, b) => a.angle.value - b.angle.value)
        } else {
          _pieces = _pieces.sort(sort)
        }
      }

      let cumulativeAngle = 0
      _pieces = _pieces.map((piece) => {
        const _piece: IChartPoint = {
          ...piece,
          cumulativeAngle: {
            value: cumulativeAngle,
            label: cumulativeAngle.toString()
          }
        }

        cumulativeAngle += _piece.angle.value

        return _piece
      })

      const totalAngle = cumulativeAngle
      setAngleScale(360 / totalAngle)

      setPieces(_pieces)
    }
  }

  function scalePieces (): void {
    const _scaledPieces = pieces.map((piece) => {
      const pt: IChartPoint = {
        angle: {
          ...piece.angle,
          value: piece.angle.value * angleScale
        },
        cumulativeAngle: {
          ...piece.cumulativeAngle,
          value: piece.cumulativeAngle.value * angleScale
        }
      }

      return pt
    })

    setScaledPieces(_scaledPieces)
  }

  useTimeoutEffect(scalePieces, 10, [pieces, angleScale])

  useEffect(getPieces, [data])
  useEffect(() => {
    addPie(id, {
      dataKey,
      angles: pieces
    })

    setLegendValue(id, { id, color: fill ?? strokeOptions?.stroke, label: dataLabel })
  }, [pieces, dataKey])

  return (
    <Svg.Group id='pie'>
      <Svg.Group id='pie-pieces'>
        {scaledPieces.map((piece, i) => (
          <Svg.Sector
            key={piece.angle.value}
            className={faded ? 'opacity-25' : ''}
            point={position}
            fill={fill}
            strokeOptions={strokeOptions}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={piece.cumulativeAngle.value}
            endAngle={piece.cumulativeAngle.value + piece.angle.value}
            anglePadding={anglePadding}
            label={piece.angle.label}
            showLabel={faded ? false : 'hover'}
            onMouseEnter={() => {
              setTooltipData({
                data: pieces[i].payload
              })
            }}
            onMouseLeave={() => {
              setTooltipData()
            }}
          />
        ))}
      </Svg.Group>
    </Svg.Group>
  )
}

export default Pie
