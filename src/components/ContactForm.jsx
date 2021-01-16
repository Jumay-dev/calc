import React from 'react'
import { 
    Input,
    Container
 } from 'semantic-ui-react'

function ContactForm( { customerInfo, setCustomerInfo }) {
    // const changeHandler = (e, data) => setCustomerInfo(prev => {name: data.value, ...prev})
    function changeHandler(e, data) {
        console.log(e.target.name)

        let currentInfo = {...customerInfo}
        currentInfo[e.target.name] = data.value
        
        setCustomerInfo(currentInfo)
    }
    return (
        <Container>
            <Input onChange={changeHandler} value={customerInfo.name} name="name" label="ФИО"/>
            <Input onChange={changeHandler} value={customerInfo.phone} name="phone" label="Номер телефона"/>
            <Input onChange={changeHandler} value={customerInfo.code} name="code" label="Код"/>
        </Container>
    )
}

export default ContactForm