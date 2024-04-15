import { type IToasterContext } from '../types'
import { DefaultDurationTransition, DefaultToastRenderComponent, DefaultToastTransition } from './ToastDefaults'

export const toastContainerPositions = {
  'top-left': 'top-2 left-2',
  'top-right': 'top-2 right-2',
  'bottom-left': 'bottom-2 left-2',
  'bottom-right': 'bottom-2 right-2',
  'top-center': 'top-2 left-1/2 transform -translate-x-1/2',
  'bottom-center': 'bottom-2 left-1/2 transform -translate-x-1/2',
  center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  'top-stretch': 'top-2 left-2 right-2',
  'bottom-stretch': 'bottom-2 left-2 right-2',
  'center-stretch': 'top-1/2 left-2 right-2 transform -translate-y-1/2',
  stretch: 'top-2 left-2 bottom-2 right-2',
  'inner-top': 'top-2 left-1/2 -translate-x-1/2',
  'inner-bottom': 'bottom-2 left-1/2 -translate-x-1/2',
  'inner-left': 'left-2 top-2',
  'inner-right': 'right-2 top-2',
  'outer-top': 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  'outer-bottom': 'top-full left-1/2 -translate-x-1/2 mt-2',
  'outer-left': 'right-full mr-2',
  'outer-right': 'left-full ml-2'
}

export const defaultToasterContext: IToasterContext = {
  toasts: [],
  createToast: () => {},
  removeToast: () => {},
  updateToast: () => {},
  getToast: () => undefined
}

export { DefaultDurationTransition, DefaultToastRenderComponent, DefaultToastTransition }
