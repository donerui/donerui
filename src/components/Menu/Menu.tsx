import { useRef, type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import Transition from '../Transition'
import { useMenu } from './MenuContext'
import { type MenuProps } from './types'

export default function Menu ({
  children,
  className,
  portal,
  position = 'bottom',
  TransitionComponent = Transition
}: MenuProps): ReactNode {
  const { isOpen } = useMenu()

  const menuRef = useRef<HTMLDivElement>(null)

  const positionClasses = {
    top: 'bottom-full mb-2',
    'top-right': 'bottom-full right-0 mb-2',
    'top-left': 'bottom-full left-0 mb-2',
    bottom: 'top-full mt-2',
    'bottom-right': 'top-full right-0 mt-2',
    'bottom-left': 'top-full left-0 mt-2',
    left: 'right-full top-0 mr-2',
    right: 'left-full top-0 ml-2'
  }[position]

  return (
    <TransitionComponent
      show={isOpen}
    >
      <div
        ref={menuRef}
        className={twMerge(
          'absolute z-50',
          positionClasses,
          className
        )}
        onClick={(e) => { e.stopPropagation() }}
      >
        {children}
      </div>
    </TransitionComponent>
  )
}
