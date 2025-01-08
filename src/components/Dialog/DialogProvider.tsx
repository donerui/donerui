import { useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import DialogContext from './contexts'
import Dialog from './Dialog'
import { type IDialogOptions, type IDialogProps } from './types'

function DialogProvider ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  const [dialogs, setDialogs] = useState<IDialogProps[]>([])

  function removeDialog (id: string): void {
    setDialogs((prevDialogs) => prevDialogs.filter((d) => d.id !== id))
  }

  function createDialog (options: IDialogOptions): string {
    const id = uuidv4()
    setDialogs((prevDialogs) => [
      ...prevDialogs,
      {
        id,
        isOpen: true,
        ...options
      }
    ])
    return id
  }

  function updateDialog (id: string, options: IDialogOptions): void {
    setDialogs((prevDialogs) => prevDialogs.map((dialog) => {
      if (dialog.id === id) {
        return {
          ...dialog,
          ...options
        }
      }
      return dialog
    }))
  }

  function getDialog (id: string): IDialogProps | undefined {
    return dialogs.find((d) => d.id === id)
  }

  const contextValue = useMemo(() => ({
    dialogs,
    createDialog,
    removeDialog,
    updateDialog,
    getDialog
  }), [dialogs])

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      {dialogs.map((dialog) => (
        <Dialog key={dialog.id} {...dialog} />
      ))}
    </DialogContext.Provider>
  )
}

export default DialogProvider
