import { useMenu } from './MenuContext'
import { type MenuTriggerProps } from './types'

import Trigger from '../Trigger'

export default function MenuTrigger (props: MenuTriggerProps): JSX.Element {
  const { setIsOpen } = useMenu()

  return (
    <Trigger
      onTrigger={setIsOpen}
      {...props}
    />
  )
}
