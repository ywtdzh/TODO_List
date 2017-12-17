import React, {Component} from 'react';
import FieldInputGroup from './form/FieldInputGroup.jsx';
import api from './api.js';
import {Button, FormGroup, PageHeader} from "react-bootstrap";

class TodoEditor extends Component {
    constructor(props) {
        super(props);
        let item = props.item;
        this.state = {
            id: item.id,
            title: item.title,
            description: item.description,
            status: item.status,
            priority: item.priority,
            expiredDate: item.expiredDate,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        };
    }

    changeHandler = (event) => {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    };

    submitHandler = (e) => {
        e.preventDefault();
        let page = this;
        api.editTodo(
            this.state.id,
            this.state.title,
            this.state.description,
            function () {
                page.props.complete();
            }
        );
    };

    markHandler = (e) => {
        e.preventDefault();
        let page = this;
        api.altStatus(this.state.id, -1, function () {
            page.props.complete();
        });
    };

    delHandler = (e) => {
        e.preventDefault();
        let page = this;
        api.delTodo(this.state.id, function () {
            page.props.complete();
        });
    };

    returnHandler = (e) => {
        e.preventDefault();
        this.props.complete();
    };

    render() {
        return <form>
            <FormGroup><PageHeader>{this.state.title}</PageHeader></FormGroup>
            <FieldInputGroup
                controlId={"title"}
                value={this.state.title}
                label={"待办事项标题"}
                type={"text"}
                placeholder={"请输入标题"}
                onChange={this.changeHandler}
            />
            <FieldInputGroup
                controlId={"description"}
                value={this.state.description}
                label={"待办事项详情"}
                componentClass={"textarea"}
                placeholder={"请输入具体内容"}
                onChange={this.changeHandler}
            />
            <FormGroup>
                <Button
                    bsStyle={"success"}
                    onClick={this.markHandler}
                    disabled={this.state.status === -1}
                    block
                >
                    标记为已完成
                </Button>
                <Button
                    bsStyle={"danger"}
                    onClick={this.delHandler}
                    disabled={this.state.status === -1}
                    block
                >
                    删除条目
                </Button>
                <Button
                    bsStyle={"info"}
                    onClick={this.submitHandler}
                    disabled={this.state.status === -1}
                    block
                >
                    提交修改
                </Button>
                <Button
                    onClick={this.returnHandler}
                    block
                >
                    返回
                </Button>
            </FormGroup>
        </form>
    }
}

export default TodoEditor;