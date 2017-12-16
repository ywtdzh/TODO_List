import React, {Component} from 'react'
import {render} from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import TodoHeader from "./TodoHeader.jsx";
import api from './api.js';
import TodoPostForm from './form/TodoPostForm.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        let app = this;
        this.state = {
            isLoggedIn: false
        };
        api.getUser(function (res) {
            if (res.data.id !== undefined) {
                app.setState({
                    isLoggedIn: true,
                    username: res.data.username
                });
            }
        });
    }

    render() {
        return (
            <div>
                <TodoHeader
                    username={this.state.username}
                    isLoggedIn={this.state.isLoggedIn}/>
                <TodoPostForm />
            </div>
        );
    }
}

render(
    <App/>,
    document.getElementById('root')
);