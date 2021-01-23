import React from 'react'
import { 
  Button, 
  Header, 
  Modal, 
  Input, 
  Loader, 
  Table,
  Dimmer
} from 'semantic-ui-react'
import { HOST } from '../config/query'

function CaculationsTable({calcs}) {
  
  function summator(array) {
    if (array.length >= 2) {
      return array.reduce( (a, b) => +a.price + +b.price)
    } else {
      if (array.length === 0) {
        return 0
      }
      return array[0].price
    }
  }
  return (
    <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Название</Table.HeaderCell>
        <Table.HeaderCell>Стоимость</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {calcs ? calcs.map(row => (
      <Table.Row key={row.offer_name}>
        <Table.Cell>{row.offer_name}</Table.Cell>
        <Table.Cell>{row.price} ₽</Table.Cell>
      </Table.Row>
      )) : null}

      <Table.Row key="summ" warning>
        <Table.Cell>Итого</Table.Cell>
        <Table.Cell>{summator(calcs)} ₽</Table.Cell>
      </Table.Row>

    </Table.Body>
  </Table>
  )
}

function ModalContent(
  {
    customerInfo, 
    calcs,
    code,
    setCode
  }) {
  return (
    <Modal.Content>
      <Modal.Description>
        <p>
          Пожалуйста, проверьте правильность вашего заказа и контактных данных!
        </p>
        <p>
          {customerInfo.name}
        </p>
        <p>
          {customerInfo.phone}
        </p>
        <CaculationsTable
          calcs={calcs}
          customerInfo={customerInfo}
        />
        <Input onChange={(e, {value}) => console.log(value)} value={code} name="code" label="Код"/>
      </Modal.Description>
    </Modal.Content>
  )
}

function ModalCalculations({calcs, customerInfo}) {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [code, setCode] = React.useState('')

  function applyHandler() {
    const data = {
      info: customerInfo,
      order: calcs,
      code
    }

    setLoading(true)
    fetch(`${HOST}/server.php?action=order`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then( res => res.json())
    .then( res => {
      if (res.success) {
        setLoading(false)
        setOpen(false)
      }
    })
    
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="teal" style={{margin: 0, marginTop: "2em", marginBottom: 10, padding: "1em"}}>Рассчитать</Button>}
    >
      <Modal.Header>Предварительный рассчет</Modal.Header>

      <ModalContent 
        calcs={calcs}
        customerInfo={customerInfo}
        code={code}
        setCode={setCode}
      />
      {loading ? 
      <Dimmer active>
        <Loader content='Отправка...' />
      </Dimmer> : null}

      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Отменить
        </Button>
        <Button
          content="Подвердить"
          labelPosition='right'
          icon='checkmark'
          onClick={applyHandler}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default ModalCalculations