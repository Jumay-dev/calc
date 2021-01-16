import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

function ModalExampleModal() {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="teal">Рассчитать</Button>}
    >
      <Modal.Header>Предварительный рассчет</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Предварительный рассчет</Header>
          <p>
            We've found the following gravatar image associated with your e-mail
            address.
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Отменить
        </Button>
        <Button
          content="Подвердить"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleModal