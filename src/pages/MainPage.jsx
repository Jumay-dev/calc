import React from "react"
import { Button } from "semantic-ui-react"
import { Link } from "react-router-dom"

function MainPage() {
    return (
        <div id="main--wrapper">
            <Button as={Link} to="/calculator">Подсчет памятника</Button>
            <Button as={Link} to="/about">Контакты</Button>
            <Button>+7 (800) 222-62-85</Button>
        </div>
    )
}

export default MainPage