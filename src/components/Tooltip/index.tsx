import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Transition from '../Transition'
import { DefaultTooltipRenderComponent } from './constants'
import { type ITooltipProps } from './types'

function Tooltip ({
  children,
  className,
  data,
  position = 'top',
  trigger = 'hover',
  onShow,
  onHide,
  TransitionComponent = Transition,
  RenderComponent = DefaultTooltipRenderComponent
}: ITooltipProps): JSX.Element {
  const [show, setShow] = useState<boolean>(false)

  const showTooltip = (): void => {
    setShow(true)
    onShow?.()
  }

  const hideTooltip = (): void => {
    setShow(false)
    onHide?.()
  }

  return (
    <div
      className={twMerge(
        'relative'
      )}
      onMouseEnter={trigger === 'hover' ? showTooltip : undefined}
      onMouseLeave={trigger === 'hover' ? hideTooltip : undefined}
      onClick={trigger === 'click' ? () => { setShow((prev) => !prev) } : undefined}
    >
      {children}

      <TransitionComponent
        show={show}
        appear
        beforeEnter={showTooltip}
        afterLeave={hideTooltip}
      >
        <RenderComponent
          data={data}
          position={position}
          className={className}
        />
      </TransitionComponent>
    </div>
  )
}

export default Tooltip
