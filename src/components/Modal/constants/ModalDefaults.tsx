import { Transition } from '@headlessui/react'
import { type ITransitionOptions } from '../../Transition/types'

export function DefaultModalTransition ({
  children,
  onClick,
  show
}: ITransitionOptions): JSX.Element {
  return (
    <Transition
      show={show}
      as="div"
      className="duration-500"
      enterFrom="opacity-0 translate-y-4"
      enterTo="opacity-100 translate-y-0"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-4"
      onClick={onClick}
    >
      {children}
    </Transition>
  )
}
