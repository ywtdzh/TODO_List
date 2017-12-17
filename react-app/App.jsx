import React, {Component} from 'react'
import {render} from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import TodoHeader from "./TodoHeader.jsx";
import api from './api.js';
import TodoPostForm from './form/TodoPostForm.jsx';
import {Col, Grid, PageHeader, Row} from "react-bootstrap";
import ListPage from './ListPage.jsx';
import TodoEditor from "./TodoEditor.jsx";

class App extends Component {
    constructor(props) {
        super(props);
        let app = this;
        this.state = {
            isLoggedIn: null,
            page: 0
        };
        api.getUser(function (res) {
            if (res.data.id !== undefined) {
                app.setState({
                    isLoggedIn: true,
                    username: res.data.username
                });
            } else
                app.setState({
                    isLoggedIn: false
                });
        });
    }

    altPageHandler = (page) => {
        this.setState({
            page: page
        });
    };

    postCompleteHandler = () => {
        this.setState({
            page: 1
        });
    };

    editHandler = (item) => {
        this.setState({
            page: 2,
            todoItem: item
        });
    };

    mainPage = () => {
        if (this.state.isLoggedIn === false)
            return <Col><PageHeader> 您还未登录,不能使用该功能!
                <small><a href="/page/login">点此登录</a></small>
            </PageHeader></Col>;
        else if (this.state.page === 0)
            return <Col smOffset={2} sm={8}
                        mdOffset={3} md={6}>
                <TodoPostForm
                    complete={this.postCompleteHandler}
                /></Col>;
        else if (this.state.page === 1)
            return <Col>
                <ListPage edit={this.editHandler}/>
            </Col>;
        else if (this.state.page === 2)
            return <Col><TodoEditor item={this.state.todoItem} complete={this.postCompleteHandler}/></Col>;
        else
            return <div/>;
    };

    render() {
        return (
            <div>
                <TodoHeader
                    username={this.state.username}
                    isLoggedIn={this.state.isLoggedIn}
                    altPageHandler={this.altPageHandler}
                />
                <Grid><Row>
                    {this.mainPage()}
                </Row></Grid>
            </div>
        );
    }
}

render(
    <App/>,
    document.getElementById('root')
);