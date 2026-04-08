import { type CSSProperties, forwardRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import Transition from '../Transition'
import { useMenu } from './MenuContext'
import type { MenuProps } from './types'

const positionClasses = {
  top: 'bottom-full mb-2',
  'top-right': 'bottom-full right-0 mb-2',
  'top-left': 'bottom-full left-0 mb-2',
  bottom: 'top-full mt-2',
  'bottom-right': 'top-full right-0 mt-2',
  'bottom-left': 'top-full left-0 mt-2',
  left: 'right-full top-0 mr-2',
  right: 'left-full top-0 ml-2',
}

export default forwardRef<HTMLDivElement, MenuProps>(function Menu(
  {
    children,
    className,
    style,
    portal,
    reference,
    repositionToReference = true,
    sameWidthAsReference = true,
    position = 'bottom',
    TransitionComponent = Transition,
  },
  ref,
): ReactNode {
  const { isOpen } = useMenu()

  const portalEl =
    portal !== undefined
      ? typeof portal === 'string'
        ? document.getElementById(portal)
        : portal
      : undefined
  const referenceEl =
    reference !== undefined
      ? typeof reference === 'string'
        ? document.getElementById(reference)
        : reference
      : undefined

  const internalStyle: CSSProperties = {}
  if (referenceEl != null && portalEl != null) {
    const referenceRect = referenceEl.getBoundingClientRect()
    const portalRect = portalEl.getBoundingClientRect()

    if (repositionToReference) {
      internalStyle.position = 'absolute'

      switch (position) {
        case 'top':
          internalStyle.bottom =
            portalRect.height -
            referenceRect.height +
            (referenceRect.top - portalRect.top)
          internalStyle.left = referenceRect.left - portalRect.left
          if (sameWidthAsReference) {
            internalStyle.width = referenceRect.width
          }
          break
        case 'left':
          console.log(referenceRect, portalRect)
          internalStyle.top = referenceRect.top - portalRect.top
          internalStyle.right = portalRect.right - referenceRect.left
          break
        case 'right':
          internalStyle.top = referenceRect.top - portalRect.top
          internalStyle.left = referenceRect.right - portalRect.left
          break
        default:
          internalStyle.top =
            referenceRect.height + (referenceRect.top - portalRect.top)
          internalStyle.left = referenceRect.left - portalRect.left
          if (sameWidthAsReference) {
            internalStyle.width = referenceRect.width
          }
      }
    }
  }

  const menu = (
    <TransitionComponent show={isOpen}>
      <div
        ref={ref}
        className={twMerge(
          'absolute z-50',
          positionClasses[position],
          className,
        )}
        style={{ ...internalStyle, ...style }}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {children}
      </div>
    </TransitionComponent>
  )

  return portalEl != null ? createPortal(menu, portalEl) : menu
})
