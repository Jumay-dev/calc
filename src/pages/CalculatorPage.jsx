import React, { useEffect, useState } from "react"
import { 
    Container, 
    Header,
    Dropdown
 } from "semantic-ui-react"
import { HOST } from '../config/query'

function CalculatorPage() {
    const [ categories, setCategories ] = useState([])
    useEffect(() => {
        fetch(`${HOST}/server.php?action=structure`)
        .then( res => res.json() )
        .then( res => {
            const reducedArray = res.splice(2)
            let separatedArray = []
            reducedArray.forEach( item => {
                item.category_content = item.category_content.splice(2)
            })
            setCategories(reducedArray)
        })
    }, [])

    function CategoryPoint({item}) {
        let categoryOptions = []
        item.category_content.forEach( item => {
            categoryOptions.push(  {
                key: item,
                text: item,
                value: item,
              })
        })
        return (
            <Container key={item.category}>
                <Header>{item[1]}</Header>
                <Dropdown
                    placeholder={item.category}
                    fluid
                    selection
                    options={categoryOptions}
                />
            </Container>
        )
    }

    return (
        <div>
            <Container>
                {categories.map(item => <CategoryPoint item={item} />)}
            </Container>
        </div>
    )
}

export default CalculatorPage