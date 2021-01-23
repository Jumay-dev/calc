import React from "react"
import { Container, Button } from "semantic-ui-react"
import { Link } from 'react-router-dom'

function AboutPage() {
    return (
        <Container style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            justifyContent: "space-between"
        }}>
            <div>
                <h1>Контакты</h1>
                <Container text>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit magnam laudantium id, tempora ratione blanditiis, quam doloribus tenetur maiores amet, pariatur neque placeat consectetur nobis eos! Impedit consectetur eaque voluptatum.
                </Container>
            </div>
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

export default AboutPage