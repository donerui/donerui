import { type IDialogContext } from '../types'
import { DefaultDialogRenderComponent, DefaultModalTransition } from './DialogDefaults'

export const defaultDialogContext: IDialogContext = {
  dialogs: [],
  createDialog: () => '',
  removeDialog: () => {},
  updateDialog: () => {},
  getDialog: () => undefined
}

export { DefaultDialogRenderComponent, DefaultModalTransition }
