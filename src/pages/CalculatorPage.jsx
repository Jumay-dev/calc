import React, { useEffect, useState } from "react"
import { 
    Container
 } from "semantic-ui-react"
import { HOST } from '../config/query'
import CategoryPoint from "../components/CategoryPoint"
import ContactForm from "../components/ContactForm"
import ModalCalculations from "../components/ModalCalculations"

function CalculatorPage() {
    const [ categories, setCategories ] = useState([])
    const [ customerInfo, setCustomerInfo ] = useState({
        name: '',
        phone: '',
        code: ''
    })
    let calculations = [];
    const [calcs, setCalcs] = useState([])

    useEffect(() => {
        fetch(`${HOST}/server.php?action=structure`)
        .then( res => res.json() )
        .then( res => {
            const reducedArray = res.splice(2)
            reducedArray.forEach( item => {
                item.category_content = item.category_content.splice(2)
            })
            setCategories(reducedArray)
        })
    }, [])



    return (
        <Container style={{
            display: "flex",
            flexDirection: "column"
        }}>
            <ContactForm 
                customerInfo={customerInfo}
                setCustomerInfo={setCustomerInfo}
            />
            
            {categories.map(item => 
            <CategoryPoint 
                calculations={calculations} 
                key={item.category} 
                item={item} 
                calcs={calcs}
                setCalcs={setCalcs}
            />)}
            
            <ModalCalculations
                customerInfo={customerInfo}
                calculations={calculations}
                calcs={calcs}
                setCalcs={setCalcs}
            />
        </Container>
    )
}

export default CalculatorPage