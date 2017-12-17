import React, {Component} from 'react';
import api from '../api.js';
import FieldInputGroup from './FieldInputGroup.jsx';
import {Button, ControlLabel, FormControl, FormGroup, PageHeader} from "react-bootstrap";

class TodoPostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            priority: 0,
            timestamp: 0
        };
    }

    changeHandler = (event) => {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    };

    postHandler = (e) => {
        e.preventDefault();
        let page = this;
        let timestamp = Date.parse(this.state.deadline);
        timestamp = timestamp > Date.now() ?
            timestamp : undefined;

        api.postTodo(
            this.state.title,
            this.state.description,
            timestamp / 1000, //ms to s
            this.state.priority,
            function () {
                page.props.complete();
            }
        )
    };

    render() {
        return (
            <form>
                <FormGroup><PageHeader> 创建待办事项 </PageHeader></FormGroup>
                <FieldInputGroup
                    controlId={"title"}
                    label={"待办事项标题"}
                    value={this.state.title}
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
                <FieldInputGroup
                    controlId={"deadline"}
                    value={this.state.deadline}
                    label={"截止日期"}
                    type={"date"}
                    placeholder={"请输入截止日期"}
                    onChange={this.changeHandler}
                />
                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>待办事项优先级</ControlLabel>
                    <FormControl
                        componentClass="select"
                        onChange={this.changeHandler}
                        value={this.state.priority}
                        name={"priority"}>
                        <option value="0">宽松</option>
                        <option value="1">一般</option>
                        <option value="2">严重</option>
                        <option value="3">紧迫</option>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <Button
                        bsStyle={"info"}
                        onClick={this.postHandler}
                        block
                    >
                        提交
                    </Button>
                </FormGroup>
            </form>
        );
    }
}

export default TodoPostForm;