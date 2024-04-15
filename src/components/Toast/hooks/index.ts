import React from 'react'
import ToasterContext from '../contexts'

export function useToaster (): React.ContextType<typeof ToasterContext> {
  const context = React.useContext(ToasterContext)
  if (context === undefined) {
    throw new Error('useToaster must be used within a ToasterProvider')
  }

  return context
}
