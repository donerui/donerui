import { useState } from 'react'
import Transition from '../Transition'
import Trigger from '../Trigger'
import { DefaultTooltipRenderComponent } from './constants'
import { type ITooltipProps } from './types'

function Tooltip ({
  children,
  className,
  data,
  position = 'top',
  onShow,
  onHide,
  TransitionComponent = Transition,
  RenderComponent = DefaultTooltipRenderComponent,
  ...rest
}: ITooltipProps): JSX.Element {
  const [show, setShow] = useState<boolean>(false)

  function onTrigger (show: boolean): void {
    setShow(show)
    if (show) {
      onShow?.()
    } else {
      onHide?.()
    }
  }

  return (
    <Trigger
      onTrigger={onTrigger}
      {...rest}
    >
      {children}

      <TransitionComponent
        show={show}
      >
        <RenderComponent
          data={data}
          position={position}
          className={className}
        />
      </TransitionComponent>
    </Trigger>
  )
}

export default Tooltip
