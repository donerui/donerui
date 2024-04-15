import { Transition } from '@headlessui/react'
import { Fragment, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { type ITransitionOptions } from '../../Transition/types'
import { type IDurationTransitionProps, type IToastRenderProps } from '../types'
import { ToastIcon } from '../utils'

export function DefaultToastTransition ({
  children,
  show,
  afterLeave
}: ITransitionOptions): JSX.Element {
  return (
    <Transition
      as={Fragment}
      show={show}
      appear
      enter='duration-150'
      enterFrom="opacity-0 scale-0"
      enterTo="opacity-100 scale-100"
      leave='duration-150'
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-0"
      afterLeave={afterLeave}
    >
      {children}
    </Transition>
  )
}

export function DefaultDurationTransition ({
  isShowing,
  duration
}: IDurationTransitionProps): JSX.Element {
  return (
    <Transition
      as="span"
      show={isShowing}
      appear
      className={twMerge(
        'absolute bottom-0 left-0 h-1 ease-linear bg-white/50 backdrop-filter backdrop-brightness-50'
      )}
      enterFrom="w-full"
      enterTo="w-0"
      style={{ transitionDuration: `${duration}ms` }}
    />
  )
}

function _DefaultToastRenderComponent ({
  data,
  type,
  className,
  duration,
  durationValid,
  isShowingTransition,
  onClick,
  Icon,
  DurationTransitionComponent = DefaultDurationTransition
}: IToastRenderProps, ref: React.ForwardedRef<any>): JSX.Element {
  return (
    <div
      ref={ref}
      className={twMerge(
        'relative flex items-center gap-2 px-4 py-3 rounded cursor-pointer overflow-hidden bg-gray-200 text-black/75',
        'hover:bg-gray-300',
        className
      )}
      onClick={() => {
        if (onClick !== undefined) {
          onClick()
        }
      }}
    >
      <ToastIcon
        className="w-6 h-6"
        icon={Icon}
        type={type}
      />

      <span>{data.toString()}</span>

      {(durationValid === true) && (
        <DurationTransitionComponent
          isShowing={isShowingTransition}
          duration={duration}
        />
      )}
    </div>
  )
}

export const DefaultToastRenderComponent = forwardRef(_DefaultToastRenderComponent)
