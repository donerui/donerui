import {
  createContext,
  type JSX,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface MenuContextValue {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const MenuContext = createContext<MenuContextValue | undefined>(undefined)

export interface MenuProviderProps {
  children: ReactNode
  defaultIsOpen?: boolean
  isOpen?: boolean
  onOpenChange?: (value: boolean) => void
}

export default function MenuProvider({
  children,
  defaultIsOpen = false,
  isOpen,
  onOpenChange,
}: MenuProviderProps): JSX.Element {
  const isControlled = isOpen !== undefined
  const [isOpenInternal, setIsOpenInternal] = useState(
    isControlled ? isOpen : defaultIsOpen,
  )

  function handleOpen(value: boolean): void {
    if (isControlled) {
      onOpenChange?.(value)
    } else {
      setIsOpenInternal(value)
    }
  }

  useEffect(() => {
    if (isControlled) {
      setIsOpenInternal(isOpen)
    }
  }, [isOpen])

  return (
    <MenuContext.Provider
      value={{ isOpen: isOpenInternal, setIsOpen: handleOpen }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export function useMenu(): MenuContextValue {
  const context = useContext(MenuContext)
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider')
  }
  return context
}
