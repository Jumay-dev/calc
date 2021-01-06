import React, { useEffect, useState } from "react"
import { 
    Container, 
    Header,
    Dropdown,
    Card,
    Grid,
    Image,
    Button
 } from "semantic-ui-react"
import { HOST } from '../config/query'
import CategoryPoint from "../components/CategoryPoint"

function CalculatorPage() {
    const [ categories, setCategories ] = useState([])
    // const [ calculations, setCalculations ] = useState([])
    let calculations = [];

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
        <div>
            <Container>
                {categories.map(item => <CategoryPoint calculations={calculations} key={item.category} item={item} />)}
            </Container>
        </div>
    )
}

export default CalculatorPage