import { type ContextType, useContext } from 'react'
import DialogContext from '../contexts'

export function useDialog (): ContextType<typeof DialogContext> {
  const context = useContext(DialogContext)
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider')
  }

  return context
}
