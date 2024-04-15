import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import Transition from '../Transition'
import { DefaultModalTransition } from './constants'
import { type IModalProps } from './types'

function Modal ({
  children,
  className,
  isOpen,
  closeOnEsc = true,
  closeOnOutsideClick = true,
  onOpen,
  onClose,
  TransitionComponent = DefaultModalTransition
}: IModalProps): JSX.Element {
  useEffect(() => {
    if (isOpen) {
      onOpen?.()
    }
  }, [isOpen, onOpen])

  return (
    <div
      className={twMerge(
        'fixed top-0 left-0 !m-0 z-50 w-screen h-screen bg-black/50 duration-500',
        'flex items-center justify-center',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        className
      )}
      onClick={() => {
        if (closeOnOutsideClick) {
          onClose?.()
        }
      }}
      onKeyDown={(e) => {
        if (closeOnEsc && e.key === 'Escape') {
          onClose?.()
        }
      }}
    >
      <Transition
        show={isOpen}
        onClick={(e) => { e.stopPropagation() }}
        TransitionComponent={TransitionComponent}
      >
        {children}
      </Transition>
    </div>
  )
}

export default Modal
