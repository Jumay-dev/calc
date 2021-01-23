import React from 'react'
import { 
    Input,
    Container
} from 'semantic-ui-react'

const inputStyle = {
    marginBottom: '2em'
}

function ContactForm( { customerInfo, setCustomerInfo }) {
    // const changeHandler = (e, data) => setCustomerInfo(prev => {name: data.value, ...prev})
    function changeHandler(e, data) {
        console.log(e.target.name)

        let currentInfo = {...customerInfo}
        currentInfo[e.target.name] = data.value
        
        setCustomerInfo(currentInfo)
    }
    return (
        <Container style={{
            display: "flex",
            flexDirection: "column"
        }}>
            <h1>Расчет заказа</h1>
            <Input onChange={changeHandler} value={customerInfo.name} name="name" label="ФИО" style={inputStyle}/>
            <Input onChange={changeHandler} value={customerInfo.phone} name="phone" label="Номер телефона" style={inputStyle}/>
        </Container>
    )
}

export default ContactForm