import { createContext } from 'react'
import { defaultDialogContext } from '../constants'
import { type IDialogContext } from '../types'

const DialogContext = createContext<IDialogContext>(defaultDialogContext)

export default DialogContext
