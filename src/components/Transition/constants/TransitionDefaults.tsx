import { Transition } from '@headlessui/react'
import { type ITransitionOptions } from '../types'

export function DefaultTransition ({
  children,
  className,
  show,
  appear,
  beforeEnter,
  afterEnter,
  beforeLeave,
  afterLeave
}: ITransitionOptions): JSX.Element {
  return (
    <Transition
      as="div"
      show={show}
      appear={appear}
      className={className}
      enter='duration-150'
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave='duration-150'
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      beforeEnter={beforeEnter}
      afterEnter={afterEnter}
      beforeLeave={beforeLeave}
      afterLeave={afterLeave}
    >
      {children}
    </Transition>
  )
}
