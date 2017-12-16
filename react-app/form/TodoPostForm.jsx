import React, {Component} from 'react';
import api from '../api.js';
import FieldInputGroup from './FieldInputGroup.jsx';
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";

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

    initForm = () => {
        this.setState({
            title: '',
            description: '',
            priority: 0,
            timestamp: 0
        });
    };

    changeHandler = (event) => {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    };

    postHandler = () => {
        api.postTodo(
            this.state.title,
            this.state.description,
            this.state.timestamp,
            this.state.priority,
            function (response) {
                //todo
            }
        )
    };

    render() {
        return (
            <form>
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
                <FieldInputGroup //todo timestamp
                    controlId={"title"}
                    value={this.state.title}
                    label={"待办事项标题"}
                    type={"text"}
                    placeholder={"请输入标题"}
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
            </form>
        );
    }
}

export default TodoPostForm;