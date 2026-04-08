import type { JSX } from 'react'
import Trigger from '../Trigger'
import { useMenu } from './MenuContext'
import type { MenuTriggerProps } from './types'

export default function MenuTrigger(props: MenuTriggerProps): JSX.Element {
  const { setIsOpen } = useMenu()

  return <Trigger className="relative" onTrigger={setIsOpen} {...props} />
}
