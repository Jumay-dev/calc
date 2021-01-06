import React, {useState} from 'react'
import { 
    Container, 
    Header,
    Dropdown,
    Card,
    Grid,
    Image,
    Button
 } from "semantic-ui-react"

function Offers({ offers, calculations }) {
    const [ isChecked, setChecked ] = useState()
    
    function OfferCard({ offer }) {
        const separated = offer.name.split('.')
        const offerInfo = separated[0].split('-')

        function clickHandler() {
            calculations.push({
                    file_name: separated,
                    price: offerInfo[1],
                    offer_name: offerInfo[0],
                    name: offer.name
                })

            setChecked(offer)
        }

        function resetOffer() {
            const found = calculations.find(item => item.name === offer.name)
            const index = calculations.indexOf(found)
            if (index > -1) {
                calculations.splice(index, 1);
            }
            setChecked(false)
        }

        return (
            <Grid.Column>
                <Card>
                    <Image src={offer.path} wrapped ui={false} />
                    <Card.Content>
                    <Card.Header>{offerInfo[0]}</Card.Header>
                    <Card.Description>
                        Цена: {offerInfo[1]} ₽
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <Button basic color='green' onClick={clickHandler} disabled={isChecked}>
                        Выбрать
                    </Button>
                    {isChecked ? <Button basic color='red' onClick={resetOffer}>
                        Отменить
                    </Button> : null}
                    </Card.Content>
                </Card>
            </Grid.Column>
        )
    }

    function OffersSeeder({offers}) {
        // console.log('seeder', offers)
        // console.log('isChecked', isChecked)

        if (!isChecked) {
            console.log('false', isChecked)
            return offers.map( offer => (
                <OfferCard key={offer.path} offer={offer}/>
            ))
        }
        else {
            console.log('true')
            return <OfferCard offer={isChecked} />
        }
    }

    return (
        <Grid doubling columns={3} centered>
            <OffersSeeder offers={offers}/>            
        </Grid>
    )
}

export default Offers