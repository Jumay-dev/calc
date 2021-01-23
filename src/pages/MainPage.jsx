import React from "react"
import { Button, Container } from "semantic-ui-react"
import { Link } from "react-router-dom"

const buttonStyle = {
    marginBottom: "2em",
    padding: "1em"
}

function MainPage() {
    return (
        <Container style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh"
        }}>
            <Button style={buttonStyle}  color="teal" as={Link} to="/calculator">Подсчет памятника</Button>
            <Button style={buttonStyle}  color="teal" as={Link} to="/about">Контакты</Button>
            <Button href="tel:+78002226285" style={buttonStyle} >+7 (800) 222-62-85</Button>
        </Container>
    )
}

export default MainPage