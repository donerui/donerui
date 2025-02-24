import { createContext, useContext, useState, type ReactNode } from 'react'

interface MenuContextValue {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MenuContext = createContext<MenuContextValue | undefined>(undefined)

export default function MenuProvider ({ children }: { children: ReactNode }): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MenuContext.Provider>
  )
}

export function useMenu (): MenuContextValue {
  const context = useContext(MenuContext)
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider')
  }
  return context
}
