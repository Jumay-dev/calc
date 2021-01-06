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

function CalculatorPage() {
    const [ categories, setCategories ] = useState([])
    const [ calculations, setCalculations ] = useState()

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

    function CategoryPoint({ item }) {
        const [offers, setOffers] = useState([])
        const [point, setPoint] = useState()

        let categoryOptions = []
        let categoryBody = item.category.split(' ')
        item.category_content.forEach( elem => {
            categoryOptions.push(  {
                key: elem,
                text: elem,
                value: `${item.category}/${elem}`,
              })
        })

        function Offers({ offers }) {
            const [ isChecked, setChecked ] = useState(false)
            
            function OfferCard({ offer }) {
                const separated = offer.name.split('.')
                const offerInfo = separated[0].split('-')

                function clickHandler() {
                    setChecked(offer)
                }

                function resetOffer() {
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
                            <Button basic color='green' onClick={clickHandler}>
                                Выбрать
                            </Button>
                            <Button basic color='red' onClick={resetOffer}>
                                Отменить
                            </Button>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                )
            }

            function OffersSeeder({offers}) {
                if (!isChecked) {
                    return offers.map( offer => (
                        <OfferCard offer={offer}/>
                    ))
                }
                else {
                    return <OfferCard offer={isChecked} />
                }
            }

            return (
                <Grid doubling columns={3} centered>
                    <OffersSeeder offers={offers}/>            
                </Grid>
            )
        }

        function changeHandler(e, {value}) {
            console.log(value)
            setPoint(value)

            fetch(`${HOST}/server.php?action=get_file_names&directory=${value}`)
            .then( res => res.json() )
            .then( res => {
                console.log(res)
                setOffers(res)
            } )
        }

        return (
            <Container key={categoryBody[1]}>
                <Header>{categoryBody[1]}</Header>
                <Dropdown
                    placeholder={categoryBody[1]}
                    fluid
                    selection
                    options={categoryOptions}
                    onChange={changeHandler}
                />
                <Offers offers={offers} point={point}/>
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