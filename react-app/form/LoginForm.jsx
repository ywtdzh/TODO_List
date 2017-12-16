import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import api from '../api.js';
import {Button, ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import FieldInputGroup from './FieldInputGroup.jsx'

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: ''
        };
    }

    getValidationPassword = () => {
        const length = this.state.password.length;
        if (length > 5)
            return 'success';
        else
            return 'error';
    };

    getValidationEmail = () => {
        const email = this.state.email;
        return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+[\.][a-zA-Z0-9_-]+$/.test(email) ?
            'success' :
            'error';
    };

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    };

    submitRegister = (e) => {
        e.preventDefault();
        let form = this;
        if (this.getValidationEmail() !== 'success') {
            form.setState({
                errorMessage: '电子邮件地址格式不正确'
            });
            return;
        }
        if (this.getValidationPassword() !== 'success') {
            form.setState({
                errorMessage: '密码格式不正确'
            });
            return;
        }
        api.register(this.state.username,
            this.state.password,
            this.state.email,
            function (response) {
                if (response.data === true) {
                    form.setState({
                        errorMessage: null
                    });
                    location.href = '/index';
                }
                else if (/username/.test(response.data))
                    form.setState({
                        errorMessage: '用户名已被注册'
                    });
                else if (/email/.test(response.data))
                    form.setState({
                        errorMessage: '电子邮件地址已被注册'
                    });
                else
                    form.setState({
                        errorMessage: '网络异常'
                    });
            });
    };

    render() {
        return (
            <form>
                <FieldInputGroup
                    controlId={"username"}
                    value={this.state.username}
                    label={"用户名"}
                    type={"text"}
                    placeholder={"请输入用户名"}
                    onChange={this.handleInputChange}
                />
                <FieldInputGroup
                    validationState={this.getValidationEmail()}
                    controlId={"email"}
                    value={this.state.email}
                    label={"电子邮件地址"}
                    type={"text"}
                    placeholder={"请输入电子邮件地址"}
                    onChange={this.handleInputChange}
                />
                <FieldInputGroup
                    validationState={this.getValidationPassword()}
                    controlId={"password"}
                    value={this.state.password}
                    label={"密码"}
                    type={"password"}
                    placeholder={"请输入密码"}
                    onChange={this.handleInputChange}
                />
                <FormGroup>
                    <Button type={"submit"}
                            onClick={this.submitRegister}
                            className={"btn-block"}>
                        立即注册
                    </Button>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>{this.state.errorMessage ? '错误:' : ''}</ControlLabel>
                    <FormControl.Static>
                        {this.state.errorMessage}
                    </FormControl.Static>
                </FormGroup>
            </form>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        });
    };

    loginHandler = (e) => {
        e.preventDefault();
        let form = this;
        api.login(this.state.username,
            this.state.password,
            function (response) {
                if (response.data === true) {
                    form.setState({
                        errorMessage: null
                    });
                    location.href = '/index';
                } else
                    form.setState({
                        errorMessage: '用户名或密码错误'
                    });
            });
    };

    render() {
        return (
            <form>
                <FieldInputGroup
                    controlId={"username"}
                    value={this.state.username}
                    label={"用户名"}
                    type={"text"}
                    placeHolder={"请输入用户名"}
                    onChange={this.changeHandler}
                />
                <FieldInputGroup
                    controlId={"password"}
                    value={this.state.password}
                    label={"密码"}
                    type={"password"}
                    placeHolder={"请输入密码"}
                    onChange={this.changeHandler}
                />
                <FormGroup>
                    <Button type={"submit"}
                            onClick={this.loginHandler}
                            className={"btn-block"}>
                        立即登录
                    </Button>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>{this.state.errorMessage ? '错误:' : ''}</ControlLabel>
                    <FormControl.Static>
                        {this.state.errorMessage}
                    </FormControl.Static>
                </FormGroup>
            </form>
        );
    }
}

export {RegisterForm, LoginForm};