import { useEffect, useState } from 'react'
import Modal from '../Modal'
import { DefaultDialogRenderComponent, DefaultModalTransition } from './constants'
import { useDialog } from './hooks'
import { type IDialogProps } from './types'

function Dialog ({
  id,
  isOpen,
  modalProps,
  RenderComponent = DefaultDialogRenderComponent,
  ...props
}: IDialogProps): JSX.Element {
  const { removeDialog } = useDialog()
  const [internalIsOpen, setInternalIsOpen] = useState(false)

  useEffect(() => {
    setInternalIsOpen(isOpen)
  }, [isOpen])

  return (
    <Modal
      isOpen={internalIsOpen}
      onClose={() => {
        setInternalIsOpen(false)
      }}
      {...modalProps}
      transitionProps={{
        TransitionComponent: DefaultModalTransition,
        afterLeave: () => {
          removeDialog(id)
        }
      }}
    >
      <RenderComponent className='min-w-80' {...props} />
    </Modal>
  )
}

export default Dialog
