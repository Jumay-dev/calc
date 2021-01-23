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

function Offers(
    { 
        offers, 
        calculations,
        calcs,
        setCalcs
     }) {
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
            
            let currentCalcs = calcs.slice(0)
            currentCalcs.push({
                file_name: separated,
                price: offerInfo[1],
                offer_name: offerInfo[0],
                name: offer.name
            })
            setCalcs(currentCalcs)

            setChecked(offer)
        }

        function resetOffer() {
            const found = calculations.find(item => item.name === offer.name)
            const index = calculations.indexOf(found)
            if (index > -1) {
                calculations.splice(index, 1);
            }
            
            let currentCalcs = calcs.slice(0)
            const stateFound = currentCalcs.find(item => item.name === offer.name)
            const stateIndex = currentCalcs.indexOf(stateFound)
            if (stateIndex > -1) {
                currentCalcs.splice(stateIndex, 1);
            }
            setCalcs(currentCalcs)
            
            setChecked(false)
        }

        return (
            <Grid.Column>
                <Card style={{
                    height: 400
                }}>
                    <div style={{
                        overflow: "hidden",
                        height: 250,
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <Image 
                        src={offer.path}
                        style={{
                            height: 250
                        }}
                        />
                    </div>
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
            return offers.map( offer => (
                <OfferCard key={offer.path} offer={offer}/>
            ))
        }
        else {
            return <OfferCard offer={isChecked} />
        }
    }

    return (
        <Grid style={{
            margin: 0,
            padding: 0
        }}
        doubling 
        columns={3} 
        centered>
            <OffersSeeder offers={offers}/>            
        </Grid>
    )
}

export default Offers