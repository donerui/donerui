import { type IToastType } from '../types'
import ToastIcon from './ToastIcon'

export function ConvertPromiseTypeToToastType (promiseState: 'pending' | 'resolved' | 'rejected' | null): IToastType {
  switch (promiseState) {
    case 'pending':
      return 'loading'
    case 'resolved':
      return 'success'
    case 'rejected':
      return 'error'
    default:
      return 'default'
  }
}

export { ToastIcon }
