import { Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useChart, type ITooltipProps } from '..'
import { useTimeoutEffect } from '../../../hooks'

export * from './types'

function Tooltip ({
  className
}: ITooltipProps): JSX.Element {
  const { mouseCoordinates, tooltipData, setTooltipData } = useChart()

  const [x, setX] = useState<number | undefined>()
  const [y, setY] = useState<number | undefined>()

  useEffect(() => {
    if (mouseCoordinates == null) {
      setTooltipData()
    } else {
      if (tooltipData?.position == null) {
        setX(mouseCoordinates.inClientSpace.x)
        setY(mouseCoordinates.inClientSpace.y)
      }
    }
  }, [mouseCoordinates])

  useTimeoutEffect(() => {
    if (tooltipData?.position?.x != null) setX(tooltipData?.position?.x)
  }, 100, [tooltipData?.position?.x])

  useTimeoutEffect(() => {
    if (tooltipData?.position?.y != null) setY(tooltipData?.position?.y)
  }, 100, [tooltipData?.position?.y])

  return (x == null || y == null || tooltipData?.data == null)
    ? (<Fragment />)
    : (
      <div
        className={twMerge(
          'flex gap-4 duration-150 pointer-events-none',
          className
        )}
        style={{
          position: 'fixed',
          top: y + 20,
          left: x + 20
        }}
      >
        <Transition show appear>
          <div
            className='flex flex-col gap-1 px-4 py-2 rounded shadow bg-gray-500/75 backdrop-blur-lg'
          >
            <div
              className='grid grid-cols-[auto_1fr] gap-x-4'
            >
              {Object.entries(tooltipData.data.value).map(([key, value]) => {
                return (
                  <Fragment
                    key={key}
                  >
                    <span className='font-bold auto-cols-min'>
                      {key}:
                    </span>
                    <span className='font-light'>
                      {value as any}
                    </span>
                  </Fragment>
                )
              })}
            </div>
          </div>
        </Transition>
      </div>
      )
}

export default Tooltip
