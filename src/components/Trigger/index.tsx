import { useRef, useState } from 'react'
import { type TriggerProps } from './types'

export * from './types'

export default function Trigger ({
  children,
  className,
  enableOnClick = true,
  enableOnHover = true,
  enableOnFocus = true,
  enableHoverDelay = 600,
  disableOnClick = true,
  disableOnMouseLeave = true,
  disableOnBlur = true,
  disableHoverDelay = 600,
  onTrigger
}: TriggerProps): JSX.Element {
  const [isTriggered, setIsTriggered] = useState(false)

  const actionTimeout = useRef<NodeJS.Timeout>()
  const focusedByClick = useRef(false)

  function onAction (action: boolean, delay = 0): void {
    if (actionTimeout.current != null) {
      clearTimeout(actionTimeout.current)
    }

    if (delay === 0) {
      focusedByClick.current = false
      setIsTriggered(action)
      onTrigger?.(action)
    } else {
      actionTimeout.current = setTimeout(() => {
        focusedByClick.current = false
        setIsTriggered(action)
        onTrigger?.(action)
      }, delay)
    }
  }

  function handleClick (): void {
    if (enableOnClick || disableOnClick) {
      onAction(!isTriggered, 0)
    }
  }

  function handleMouseEnter (): void {
    if (enableOnHover) {
      onAction(true, enableHoverDelay)
    }
  }

  function handleMouseLeave (): void {
    if (disableOnMouseLeave) {
      onAction(false, disableHoverDelay)
    }
  }

  function handleFocus (): void {
    if (enableOnFocus && !focusedByClick.current) {
      onAction(true, 0)
    }
  }

  function handleBlur (): void {
    if (disableOnBlur) {
      onAction(false, 0)
    }
  }

  function handleMouseDown (): void {
    focusedByClick.current = true
  }

  return (
    <div
      className={className}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
    </div>
  )
}
