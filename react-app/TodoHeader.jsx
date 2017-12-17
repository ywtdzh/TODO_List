import React, {Component} from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import api from './api.js';

class TodoHeader extends Component{
    render(){
        return (<Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">TODO-List</a>
                </Navbar.Brand>
                <Navbar.Toggle/>
            </Navbar.Header>
            <TodoCollapse
                altPageHandler={this.props.altPageHandler}
                username={this.props.username}
                isLoggedIn={this.props.isLoggedIn}/>
        </Navbar>);
    }
}

class TodoCollapse extends Component {
    render() {
        return (<Navbar.Collapse>
            {this.props.isLoggedIn ?
                <Nav>
                    <NavItem eventKey={1} href="#" onClick={()=>this.props.altPageHandler(0)}>创建</NavItem>
                    <NavItem eventKey={2} href="#" onClick={()=>this.props.altPageHandler(1)}>查看</NavItem>
                </Nav> : <Nav/>
            }
            {this.props.isLoggedIn ?
                <Nav pullRight>
                    <Navbar.Text>你好!&nbsp;{this.props.username}</Navbar.Text>
                    <NavItem eventKey={1} href="#" onClick={()=>api.logout(()=>location.reload())}>退出</NavItem>
                </Nav> :
                <Nav pullRight>
                    <NavItem eventKey={1} href="#" onClick={()=>location.href='/page/login'}>登录</NavItem>
                    <NavItem eventKey={2} href="#" onClick={()=>location.href='/page/login?register=true'}>注册</NavItem>
                </Nav>
            }
        </Navbar.Collapse>);
    }
}

export default TodoHeader;