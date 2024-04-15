import type React from 'react'
import { type AnimatecssAnimation, type ITransitionOptions, type MagiccssAnimation } from '../../Transition/types'

export type IToastType =
  | 'default'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'loading'

export interface IDurationTransitionProps {
  isShowing: boolean
  duration: number
}

export interface IToastOptions {
  type?: IToastType
  data:
  | string
  | {
    promise: Promise<any>
    loading: string
    success: string | ((data: string) => string)
    error: string | ((error: Error) => string)
  }
  | any
  className?: string
  containerId?: string
  duration?: number
  hidden?: boolean
  animation?: {
    enter: AnimatecssAnimation | MagiccssAnimation
    exit: AnimatecssAnimation | MagiccssAnimation
  }
  removeOnClick?: boolean
  onClick?: (toast: IToastProps | undefined) => void
  Icon?: React.FunctionComponent<any> | JSX.Element | string
  TransitionComponent?: React.ComponentType<ITransitionOptions>
  DurationTransitionComponent?: React.ComponentType<IDurationTransitionProps>
  RenderComponent?: React.ComponentType<IToastRenderProps>
}

export interface IToastProps extends IToastOptions {
  id: string
}

export interface IToastRenderProps {
  id: string
  data: any
  type?: IToastType
  className?: string
  containerId?: string
  duration: number
  durationValid?: boolean
  isShowingTransition: boolean
  hidden?: boolean
  removeOnClick?: boolean
  onClick?: () => void
  Icon?: React.FunctionComponent<any> | JSX.Element | string
  DurationTransitionComponent?: React.ComponentType<IDurationTransitionProps>
}

export type IToasterContainerPosition =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'top-stretch'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'center'
  | 'center-stretch'
  | 'bottom-stretch'
  | 'stretch'
  | 'outer-top'
  | 'outer-bottom'
  | 'outer-left'
  | 'outer-right'

export interface IToasterContainerProps {
  id?: string
  className?: string
  position?: IToasterContainerPosition
  reverseOrder?: boolean
  maxToasts?: number
  animation?: AnimatecssAnimation
  ToastComponent?: React.ComponentType<IToastProps>
}

export interface IToasterContext {
  toasts: IToastProps[]
  createToast: (options: IToastOptions) => void
  removeToast: (id: string) => void
  updateToast: (id: string, options: IToastOptions) => void
  getToast: (id: string) => IToastProps | undefined
}
