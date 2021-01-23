import React, {useState} from 'react'
import { HOST } from '../config/query'
import { 
    Container, 
    Header,
    Dropdown,
    Card,
    Grid,
    Image,
    Button
 } from "semantic-ui-react"
 import Offers from "../components/Offers"

function CategoryPoint(
    { 
        item, 
        calculations,
        calcs,
        setCalcs
     }) {
    const [offers, setOffers] = useState([])
    const [point, setPoint] = useState()

    let categoryOptions = []
    let categoryBody = item.category.split(' ')
    item.category_content.forEach( elem => {
        categoryOptions.push({
            key: elem,
            text: elem,
            value: `${item.category}/${elem}`,
          })
    })

    function changeHandler(e, {value}) {
        setPoint(value)

        fetch(`${HOST}/server.php?action=get_file_names&directory=${value}`)
        .then( res => res.json() )
        .then( res => {
            console.log(res)
            setOffers(res)
        } )
    }

    return (
        <div key={categoryBody[1]}>
            <Header>{categoryBody[1]}</Header>
            <Dropdown
                placeholder={categoryBody[1]}
                fluid
                selection
                options={categoryOptions}
                onChange={changeHandler}
            />
            <Offers 
            offers={offers} 
            point={point}
            calculations={calculations}
            calcs={calcs}
            setCalcs={setCalcs}
            />
        </div>
    )
}

export default CategoryPoint