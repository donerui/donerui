import { useEffect, useState } from 'react'

import Transition from '../Transition'
import { DefaultDurationTransition, DefaultToastRenderComponent, DefaultToastTransition } from './constants'
import { useToaster } from './hooks'
import { type IToastProps } from './types'
import { ConvertPromiseTypeToToastType } from './utils'

function Toast ({
  id,
  type,
  data,
  className,
  duration = 5000,
  animation,
  removeOnClick = true,
  onClick,
  Icon,
  TransitionComponent = DefaultToastTransition,
  DurationTransitionComponent = DefaultDurationTransition,
  RenderComponent = DefaultToastRenderComponent
}: IToastProps): JSX.Element {
  const isPromise = typeof data !== 'string' && data.promise instanceof Promise

  const { removeToast, getToast } = useToaster()
  const toastProps = getToast(id)

  const [isShowing, setIsShowing] = useState<boolean>(true)
  const [toastData, setToastData] = useState<string>(isPromise ? data.loading : data)
  const [promiseState, setPromiseState] = useState<'pending' | 'resolved' | 'rejected' | null>(isPromise ? 'pending' : null)
  const [toastDuration, setToastDuration] = useState<number>(isPromise ? Infinity : duration)

  const durationValid = toastDuration > 0 && toastDuration < Infinity

  const onToastClick = (): void => {
    if (onClick !== undefined) {
      onClick(toastProps)
    }

    if (removeOnClick) {
      setIsShowing(false)
    }
  }

  const handlePromise = (): void => {
    if (isPromise) {
      data.promise
        .then((res: any) => {
          if (typeof data.success === 'function') {
            setToastData(data.success(res))
          } else {
            setToastData(data.success)
          }

          setPromiseState('resolved')
        })
        .catch((err: any) => {
          if (typeof data.error === 'function') {
            setToastData(data.error(err))
          } else {
            setToastData(data.error)
          }

          setPromiseState('rejected')
        })
        .finally(() => {
          setToastDuration(duration)
        })
    }
  }

  useEffect(() => {
    const timeout = setTimeout(handlePromise, 100)

    return () => { clearTimeout(timeout) }
  }, [data])

  useEffect(() => {
    setIsShowing(true)

    if (durationValid) {
      const timer = setTimeout(() => {
        setIsShowing(false)
      }, duration)

      return () => { clearTimeout(timer) }
    }

    return () => { }
  }, [durationValid])

  return (
    <Transition
      show={isShowing}
      appear
      afterLeave={() => { removeToast(id) }}
      animation={animation}
      TransitionComponent={TransitionComponent}
    >
      <RenderComponent
        id={id}
        data={toastData}
        type={isPromise ? ConvertPromiseTypeToToastType(promiseState) : type}
        className={className}
        duration={toastDuration}
        durationValid={durationValid}
        isShowingTransition={isShowing}
        onClick={onToastClick}
        Icon={Icon}
        DurationTransitionComponent={DurationTransitionComponent}
      />
    </Transition>
  )
}

export default Toast
