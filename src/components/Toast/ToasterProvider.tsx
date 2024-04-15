import { useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import ToasterContext from './contexts'
import { type IToastOptions, type IToastProps } from './types'

function ToasterProvider ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  const [toasts, setToasts] = useState<IToastProps[]>([])

  function removeToast (id: string): void {
    const toast = toasts.find((t) => t.id === id)
    if (toast !== undefined) {
      setToasts((prevToasts) => [...prevToasts.filter((t) => t.id !== id)])
    }
  }

  function createToast (options: IToastOptions): string {
    const id = uuidv4()
    setToasts((prevToasts) => [
      ...prevToasts,
      {
        id,
        ...options
      }
    ])

    return id
  }

  function updateToast (id: string, options: IToastOptions): void {
    setToasts((prevToasts) => prevToasts.map((toast) => {
      if (toast.id === id) {
        return {
          ...toast,
          ...options
        }
      }

      return toast
    }))
  }

  function getToast (id: string): IToastProps | undefined {
    return toasts.find((t) => t.id === id)
  }

  const contextValue = useMemo(() => ({
    toasts,
    createToast,
    removeToast,
    updateToast,
    getToast
  }), [toasts])

  return (
    <ToasterContext.Provider value={contextValue}>
      {children}
    </ToasterContext.Provider>
  )
}

export default ToasterProvider
