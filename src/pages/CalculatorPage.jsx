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
            console.log(res)
            const reducedArray = res.splice(2)
            let separatedArray = []
            reducedArray.forEach( item => {
                let currentItem = item.split(' ')
                if (currentItem[0] === 'Категория') separatedArray.push(currentItem)
            })
            setCategories(separatedArray)
        })
    }, [])

    function CategoryPoint({item}) {
        return (
            <Container key={item[1]}>
                <Header>{item[1]}</Header>
                <Dropdown
                    placeholder={item[1]}
                    fluid
                    selection
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