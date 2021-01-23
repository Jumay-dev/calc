import React from "react"
import { Container, Button } from "semantic-ui-react"
import { Link } from 'react-router-dom'

function Page404() {
    return (
        <Container text>
            Страница не найдена
            <Button 
                color="teal"
                basic
                style={{margin: 0, marginBottom: "2em", padding: "1em"}}
                as={Link}
                to="/"
            >
                Назад
            </Button>
        </Container>
    )
}

export default Page404