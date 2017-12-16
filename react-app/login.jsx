import React, {Component} from 'react'
import {render} from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import {RegisterForm, LoginForm} from "./form/LoginForm.jsx";
import {Col, Grid, Navbar, Row} from "react-bootstrap";

class LoginPage extends Component {
    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">TODO-List</a>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                </Navbar>
                <Grid>
                    <Row>
                        <Col smOffset={2} sm={8}
                             mdOffset={4} md={4}>
                            {window.register ?
                                <RegisterForm/> :
                                <LoginForm/>}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

render(
    <LoginPage/>,
    document.getElementById('root')
);