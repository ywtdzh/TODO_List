import React, {Component} from 'react';
import {ControlLabel, FormControl, FormGroup, PageHeader, Table, Checkbox} from "react-bootstrap";
import api from './api.js';

class ListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderBy: 'updatedAt',
            order: 'DESC',
            list: [],
            page: 1
        };
    }

    OrderByHandler = (e) => {
        this.setState({
            orderBy: e.target.value
        });
    };

    DESCHandler = (e) => {
        this.setState({
            order: e.target.checked ? 'DESC' : 'ASC'
        });
    };

    getList = () => {
        let page = this;
        api.getTodos(function (response) {
            page.setState({
                list: response.data
            });
        });
    };

    componentDidMount() {
        this.getList();
        this.timeID = setInterval(this.getList, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timeID);
    }

    pageHandler = (e) => {
        this.setState({
            page: parseInt('0' + e.target.value)
        });
    };

    render() {
        let page = this;
        let list = this.state.list.map(item => {
            //解除对state中item的引用
            return {
                id: item.id,
                title: item.title,
                description: item.description,
                status: item.status,
                priority: item.priority,
                expiredDate: item.expiredDate,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            }
        });
        if (list.length > 0)
            list = list.sort((a, b) => {
                let valueDelta = a[this.state.orderBy] > b[this.state.orderBy] ? 1 :
                    a[this.state.orderBy] < b[this.state.orderBy] ? -1 : 0;
                return this.state.order === 'DESC' ? -valueDelta : valueDelta;
            });
        let origin = list.map(item => {
            return {
                id: item.id,
                title: item.title,
                description: item.description,
                status: item.status,
                priority: item.priority,
                expiredDate: item.expiredDate,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            }
        });
        list = list.map((item, index) => {
            item.status = item.status === 0 ? "未完成" : "已完成";
            switch (item.priority) {
                case 1:
                    item.priority = "一般";
                    break;
                case 2:
                    item.priority = "严重";
                    break;
                case 3:
                    item.priority = "紧迫";
                    break;
                default:
                    item.priority = "宽松";
            }

            function dateWrapper(dateStr) {
                let date = new Date(dateStr);
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            }

            item.expiredDate = dateWrapper(item.expiredDate);
            item.updatedAt = dateWrapper(item.updatedAt);
            return <tr key={index} onClick={page.props.edit.bind(undefined, origin[index])}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.status}</td>
                <td>{item.priority}</td>
                <td>{item.expiredDate}</td>
                <td>{item.updatedAt}</td>
            </tr>;
        });
        return (
            <div>
                <PageHeader>
                    待办事项列表
                    <small>
                        &nbsp;点击具体事项以查看
                    </small>
                </PageHeader>
                <form>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>排序规则</ControlLabel>
                        <FormControl componentClass="select" placeholder="select" onChange={this.OrderByHandler}>
                            <option value="title">标题</option>
                            <option value="description">内容</option>
                            <option value="status">状态</option>
                            <option value="priority">优先级</option>
                            <option value="expiredDate">截止日期</option>
                            <option value="updatedAt">更新时间</option>
                        </FormControl>
                        <Checkbox checked={this.state.order === 'DESC' ? "checked" : ""}
                                  onChange={this.DESCHandler}>降序</Checkbox>
                    </FormGroup>
                    <FormGroup>
                        第<input type={"text"} inline onChange={this.pageHandler} value={this.state.page}/>页
                    </FormGroup>
                </form>
                <Table striped bordered condensed hover responsive>
                    <colgroup width="15%"/>
                    <colgroup width="50%"/>
                    <colgroup span={4}/>
                    <thead>
                    <tr>
                        <th>标题</th>
                        <th>详情</th>
                        <th>状态</th>
                        <th>优先级</th>
                        <th>截止日期</th>
                        <th>更新时间</th>
                    </tr>
                    </thead>
                    <tbody style={{"wordBreak": "break-all", "wordWrap": "break-all"}}>
                    {list.slice(this.state.page > 0 ? 10 * (this.state.page - 1) : 10 * (this.state.page),
                        this.state.page > 0 ? 10 * (this.state.page) : 10 * (this.state.page + 1))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ListPage;
